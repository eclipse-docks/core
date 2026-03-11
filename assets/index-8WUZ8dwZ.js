const nd="modulepreload",ld=function(t){return"/"+t},$n={},Ot=function(e,i,r){let o=Promise.resolve();if(i&&i.length>0){let c=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");o=c(i.map(h=>{if(h=ld(h),h in $n)return;$n[h]=!0;const u=h.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${f}`))return;const m=document.createElement("link");if(m.rel=u?"stylesheet":nd,u||(m.as="script"),m.crossOrigin="",m.href=h,l&&m.setAttribute("nonce",l),document.head.appendChild(m),u)return new Promise((g,b)=>{m.addEventListener("load",g),m.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${h}`)))})}))}function s(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return o.then(a=>{for(const l of a||[])l.status==="rejected"&&s(l.reason);return e().catch(s)})};class Da{constructor(e){this.children=[],this.variables=e,this.proxy=new Proxy(e,this)}get(e,i){return e[i]||this.parent?.getProxy()[i]}set(e,i,r){e[i]=r}put(e,i){this.variables[e]=i}getProxy(){return this.proxy}createChild(e={}){const i=new Da(e);return i.parent=this,this.children.push(i),i}getChildren(){return this.children}getParent(){return this.parent}destroy(){const e=this.parent?.children.indexOf(this);e!==void 0&&e>=0&&this.parent?.children.splice(e,1),this.parent=void 0}}const $t=new Da({}),xi=$t.createChild({});const _o=globalThis,Oa=_o.ShadowRoot&&(_o.ShadyCSS===void 0||_o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ia=Symbol(),Sn=new WeakMap;let Il=class{constructor(e,i,r){if(this._$cssResult$=!0,r!==Ia)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=i}get styleSheet(){let e=this.o;const i=this.t;if(Oa&&e===void 0){const r=i!==void 0&&i.length===1;r&&(e=Sn.get(i)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&Sn.set(i,e))}return e}toString(){return this.cssText}};const cd=t=>new Il(typeof t=="string"?t:t+"",void 0,Ia),C=(t,...e)=>{const i=t.length===1?t[0]:e.reduce((r,o,s)=>r+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[s+1],t[0]);return new Il(i,t,Ia)},dd=(t,e)=>{if(Oa)t.adoptedStyleSheets=e.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of e){const r=document.createElement("style"),o=_o.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=i.cssText,t.appendChild(r)}},En=Oa?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let i="";for(const r of e.cssRules)i+=r.cssText;return cd(i)})(t):t;const{is:hd,defineProperty:ud,getOwnPropertyDescriptor:pd,getOwnPropertyNames:fd,getOwnPropertySymbols:md,getPrototypeOf:gd}=Object,cs=globalThis,An=cs.trustedTypes,bd=An?An.emptyScript:"",wd=cs.reactiveElementPolyfillSupport,Wr=(t,e)=>t,Mo={toAttribute(t,e){switch(e){case Boolean:t=t?bd:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=t!==null;break;case Number:i=t===null?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch{i=null}}return i}},Pa=(t,e)=>!hd(t,e),Ln={attribute:!0,type:String,converter:Mo,reflect:!1,useDefault:!1,hasChanged:Pa};Symbol.metadata??=Symbol("metadata"),cs.litPropertyMetadata??=new WeakMap;let Ji=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,i=Ln){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(e,i),!i.noAccessor){const r=Symbol(),o=this.getPropertyDescriptor(e,r,i);o!==void 0&&ud(this.prototype,e,o)}}static getPropertyDescriptor(e,i,r){const{get:o,set:s}=pd(this.prototype,e)??{get(){return this[i]},set(a){this[i]=a}};return{get:o,set(a){const l=o?.call(this);s?.call(this,a),this.requestUpdate(e,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ln}static _$Ei(){if(this.hasOwnProperty(Wr("elementProperties")))return;const e=gd(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Wr("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Wr("properties"))){const i=this.properties,r=[...fd(i),...md(i)];for(const o of r)this.createProperty(o,i[o])}const e=this[Symbol.metadata];if(e!==null){const i=litPropertyMetadata.get(e);if(i!==void 0)for(const[r,o]of i)this.elementProperties.set(r,o)}this._$Eh=new Map;for(const[i,r]of this.elementProperties){const o=this._$Eu(i,r);o!==void 0&&this._$Eh.set(o,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const i=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const o of r)i.unshift(En(o))}else e!==void 0&&i.push(En(e));return i}static _$Eu(e,i){const r=i.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,i=this.constructor.elementProperties;for(const r of i.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return dd(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,i,r){this._$AK(e,r)}_$ET(e,i){const r=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,r);if(o!==void 0&&r.reflect===!0){const s=(r.converter?.toAttribute!==void 0?r.converter:Mo).toAttribute(i,r.type);this._$Em=e,s==null?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(e,i){const r=this.constructor,o=r._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const s=r.getPropertyOptions(o),a=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Mo;this._$Em=o;const l=a.fromAttribute(i,s.type);this[o]=l??this._$Ej?.get(o)??l,this._$Em=null}}requestUpdate(e,i,r,o=!1,s){if(e!==void 0){const a=this.constructor;if(o===!1&&(s=this[e]),r??=a.getPropertyOptions(e),!((r.hasChanged??Pa)(s,i)||r.useDefault&&r.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,r))))return;this.C(e,i,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,i,{useDefault:r,reflect:o,wrapped:s},a){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??i??this[e]),s!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(i=void 0),this._$AL.set(e,i)),o===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,s]of this._$Ep)this[o]=s;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[o,s]of r){const{wrapped:a}=s,l=this[o];a!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,s,l)}}let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(i)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(i)}willUpdate(e){}_$AE(e){this._$EO?.forEach(i=>i.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(i=>this._$ET(i,this[i])),this._$EM()}updated(e){}firstUpdated(e){}};Ji.elementStyles=[],Ji.shadowRootOptions={mode:"open"},Ji[Wr("elementProperties")]=new Map,Ji[Wr("finalized")]=new Map,wd?.({ReactiveElement:Ji}),(cs.reactiveElementVersions??=[]).push("2.1.2");const Ma=globalThis,_n=t=>t,No=Ma.trustedTypes,Tn=No?No.createPolicy("lit-html",{createHTML:t=>t}):void 0,Pl="$lit$",ii=`lit$${Math.random().toFixed(9).slice(2)}$`,Ml="?"+ii,vd=`<${Ml}>`,Oi=document,Zr=()=>Oi.createComment(""),Qr=t=>t===null||typeof t!="object"&&typeof t!="function",Na=Array.isArray,yd=t=>Na(t)||typeof t?.[Symbol.iterator]=="function",Ts=`[ 	
\f\r]`,zr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,zn=/-->/g,Rn=/>/g,Si=RegExp(`>|${Ts}(?:([^\\s"'>=/]+)(${Ts}*=${Ts}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Dn=/'/g,On=/"/g,Nl=/^(?:script|style|textarea|title)$/i,xd=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),p=xd(1),Ft=Symbol.for("lit-noChange"),R=Symbol.for("lit-nothing"),In=new WeakMap,zi=Oi.createTreeWalker(Oi,129);function Fl(t,e){if(!Na(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Tn!==void 0?Tn.createHTML(e):e}const kd=(t,e)=>{const i=t.length-1,r=[];let o,s=e===2?"<svg>":e===3?"<math>":"",a=zr;for(let l=0;l<i;l++){const c=t[l];let h,u,f=-1,m=0;for(;m<c.length&&(a.lastIndex=m,u=a.exec(c),u!==null);)m=a.lastIndex,a===zr?u[1]==="!--"?a=zn:u[1]!==void 0?a=Rn:u[2]!==void 0?(Nl.test(u[2])&&(o=RegExp("</"+u[2],"g")),a=Si):u[3]!==void 0&&(a=Si):a===Si?u[0]===">"?(a=o??zr,f=-1):u[1]===void 0?f=-2:(f=a.lastIndex-u[2].length,h=u[1],a=u[3]===void 0?Si:u[3]==='"'?On:Dn):a===On||a===Dn?a=Si:a===zn||a===Rn?a=zr:(a=Si,o=void 0);const g=a===Si&&t[l+1].startsWith("/>")?" ":"";s+=a===zr?c+vd:f>=0?(r.push(h),c.slice(0,f)+Pl+c.slice(f)+ii+g):c+ii+(f===-2?l:g)}return[Fl(t,s+(t[i]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};class Jr{constructor({strings:e,_$litType$:i},r){let o;this.parts=[];let s=0,a=0;const l=e.length-1,c=this.parts,[h,u]=kd(e,i);if(this.el=Jr.createElement(h,r),zi.currentNode=this.el.content,i===2||i===3){const f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(o=zi.nextNode())!==null&&c.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(const f of o.getAttributeNames())if(f.endsWith(Pl)){const m=u[a++],g=o.getAttribute(f).split(ii),b=/([.?@])?(.*)/.exec(m);c.push({type:1,index:s,name:b[2],strings:g,ctor:b[1]==="."?$d:b[1]==="?"?Sd:b[1]==="@"?Ed:hs}),o.removeAttribute(f)}else f.startsWith(ii)&&(c.push({type:6,index:s}),o.removeAttribute(f));if(Nl.test(o.tagName)){const f=o.textContent.split(ii),m=f.length-1;if(m>0){o.textContent=No?No.emptyScript:"";for(let g=0;g<m;g++)o.append(f[g],Zr()),zi.nextNode(),c.push({type:2,index:++s});o.append(f[m],Zr())}}}else if(o.nodeType===8)if(o.data===Ml)c.push({type:2,index:s});else{let f=-1;for(;(f=o.data.indexOf(ii,f+1))!==-1;)c.push({type:7,index:s}),f+=ii.length-1}s++}}static createElement(e,i){const r=Oi.createElement("template");return r.innerHTML=e,r}}function ar(t,e,i=t,r){if(e===Ft)return e;let o=r!==void 0?i._$Co?.[r]:i._$Cl;const s=Qr(e)?void 0:e._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(t),o._$AT(t,i,r)),r!==void 0?(i._$Co??=[])[r]=o:i._$Cl=o),o!==void 0&&(e=ar(t,o._$AS(t,e.values),o,r)),e}class Cd{constructor(e,i){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:i},parts:r}=this._$AD,o=(e?.creationScope??Oi).importNode(i,!0);zi.currentNode=o;let s=zi.nextNode(),a=0,l=0,c=r[0];for(;c!==void 0;){if(a===c.index){let h;c.type===2?h=new ds(s,s.nextSibling,this,e):c.type===1?h=new c.ctor(s,c.name,c.strings,this,e):c.type===6&&(h=new Ad(s,this,e)),this._$AV.push(h),c=r[++l]}a!==c?.index&&(s=zi.nextNode(),a++)}return zi.currentNode=Oi,o}p(e){let i=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,i),i+=r.strings.length-2):r._$AI(e[i])),i++}}let ds=class Bl{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,i,r,o){this.type=2,this._$AH=R,this._$AN=void 0,this._$AA=e,this._$AB=i,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&e?.nodeType===11&&(e=i.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,i=this){e=ar(this,e,i),Qr(e)?e===R||e==null||e===""?(this._$AH!==R&&this._$AR(),this._$AH=R):e!==this._$AH&&e!==Ft&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):yd(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==R&&Qr(this._$AH)?this._$AA.nextSibling.data=e:this.T(Oi.createTextNode(e)),this._$AH=e}$(e){const{values:i,_$litType$:r}=e,o=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=Jr.createElement(Fl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(i);else{const s=new Cd(o,this),a=s.u(this.options);s.p(i),this.T(a),this._$AH=s}}_$AC(e){let i=In.get(e.strings);return i===void 0&&In.set(e.strings,i=new Jr(e)),i}k(e){Na(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let r,o=0;for(const s of e)o===i.length?i.push(r=new Bl(this.O(Zr()),this.O(Zr()),this,this.options)):r=i[o],r._$AI(s),o++;o<i.length&&(this._$AR(r&&r._$AB.nextSibling,o),i.length=o)}_$AR(e=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);e!==this._$AB;){const r=_n(e).nextSibling;_n(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},hs=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,i,r,o,s){this.type=1,this._$AH=R,this._$AN=void 0,this.element=e,this.name=i,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=R}_$AI(e,i=this,r,o){const s=this.strings;let a=!1;if(s===void 0)e=ar(this,e,i,0),a=!Qr(e)||e!==this._$AH&&e!==Ft,a&&(this._$AH=e);else{const l=e;let c,h;for(e=s[0],c=0;c<s.length-1;c++)h=ar(this,l[r+c],i,c),h===Ft&&(h=this._$AH[c]),a||=!Qr(h)||h!==this._$AH[c],h===R?e=R:e!==R&&(e+=(h??"")+s[c+1]),this._$AH[c]=h}a&&!o&&this.j(e)}j(e){e===R?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},$d=class extends hs{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===R?void 0:e}},Sd=class extends hs{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==R)}},Ed=class extends hs{constructor(e,i,r,o,s){super(e,i,r,o,s),this.type=5}_$AI(e,i=this){if((e=ar(this,e,i,0)??R)===Ft)return;const r=this._$AH,o=e===R&&r!==R||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,s=e!==R&&(r===R||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ad=class{constructor(e,i,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=i,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){ar(this,e)}};const Ld={I:ds},_d=Ma.litHtmlPolyfillSupport;_d?.(Jr,ds),(Ma.litHtmlVersions??=[]).push("3.3.2");const ae=(t,e,i)=>{const r=i?.renderBefore??e;let o=r._$litPart$;if(o===void 0){const s=i?.renderBefore??null;r._$litPart$=o=new ds(e.insertBefore(Zr(),s),s,void 0,i??{})}return o._$AI(t),o};const Fa=globalThis;let Di=class extends Ji{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ae(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ft}};Di._$litElement$=!0,Di.finalized=!0,Fa.litElementHydrateSupport?.({LitElement:Di});const Td=Fa.litElementPolyfillSupport;Td?.({LitElement:Di});(Fa.litElementVersions??=[]).push("4.2.2");const zd=!1,Ul="app-toolbars-main",Cr="app-toolbars-main-right",Vl="app-toolbars-main-center",ql="app-toolbars-bottom",us="app-toolbars-bottom-center",no="app-toolbars-bottom-end",Hl="system-views",Fo="system.layouts",ri="editor-area-main",Bo="sidebar-main",Wl="sidebar-main-bottom",jl="sidebar-auxiliary",Ba="panel-bottom",Rd="command-save",Kl=!1;var Ua=(t=>(t[t.LEFT=0]="LEFT",t[t.MIDDLE=1]="MIDDLE",t[t.RIGHT=2]="RIGHT",t[t.BACK=3]="BACK",t[t.FORWARD=4]="FORWARD",t))(Ua||{});const Dd=Object.freeze(Object.defineProperty({__proto__:null,COMMAND_SAVE:Rd,EDITOR_AREA_MAIN:ri,HIDE_DOT_RESOURCE:Kl,MouseButton:Ua,PANEL_BOTTOM:Ba,SIDEBAR_AUXILIARY:jl,SIDEBAR_MAIN:Bo,SIDEBAR_MAIN_BOTTOM:Wl,SYSTEM_LAYOUTS:Fo,SYSTEM_VIEWS:Hl,TOOLBAR_BOTTOM:ql,TOOLBAR_BOTTOM_CENTER:us,TOOLBAR_BOTTOM_END:no,TOOLBAR_MAIN:Ul,TOOLBAR_MAIN_CENTER:Vl,TOOLBAR_MAIN_RIGHT:Cr},Symbol.toStringTag,{value:"Module"}));var Rw=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Od(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var To={exports:{}};var Id=To.exports,Pn;function Pd(){return Pn||(Pn=1,(function(t){(function(e,i){t.exports?t.exports=i():e.Toastify=i()})(Id,function(e){var i=function(a){return new i.lib.init(a)},r="1.12.0";i.defaults={oldestFirst:!0,text:"Toastify is awesome!",node:void 0,duration:3e3,selector:void 0,callback:function(){},destination:void 0,newWindow:!1,close:!1,gravity:"toastify-top",positionLeft:!1,position:"",backgroundColor:"",avatar:"",className:"",stopOnFocus:!0,onClick:function(){},offset:{x:0,y:0},escapeMarkup:!0,ariaLive:"polite",style:{background:""}},i.lib=i.prototype={toastify:r,constructor:i,init:function(a){return a||(a={}),this.options={},this.toastElement=null,this.options.text=a.text||i.defaults.text,this.options.node=a.node||i.defaults.node,this.options.duration=a.duration===0?0:a.duration||i.defaults.duration,this.options.selector=a.selector||i.defaults.selector,this.options.callback=a.callback||i.defaults.callback,this.options.destination=a.destination||i.defaults.destination,this.options.newWindow=a.newWindow||i.defaults.newWindow,this.options.close=a.close||i.defaults.close,this.options.gravity=a.gravity==="bottom"?"toastify-bottom":i.defaults.gravity,this.options.positionLeft=a.positionLeft||i.defaults.positionLeft,this.options.position=a.position||i.defaults.position,this.options.backgroundColor=a.backgroundColor||i.defaults.backgroundColor,this.options.avatar=a.avatar||i.defaults.avatar,this.options.className=a.className||i.defaults.className,this.options.stopOnFocus=a.stopOnFocus===void 0?i.defaults.stopOnFocus:a.stopOnFocus,this.options.onClick=a.onClick||i.defaults.onClick,this.options.offset=a.offset||i.defaults.offset,this.options.escapeMarkup=a.escapeMarkup!==void 0?a.escapeMarkup:i.defaults.escapeMarkup,this.options.ariaLive=a.ariaLive||i.defaults.ariaLive,this.options.style=a.style||i.defaults.style,a.backgroundColor&&(this.options.style.background=a.backgroundColor),this},buildToast:function(){if(!this.options)throw"Toastify is not initialized";var a=document.createElement("div");a.className="toastify on "+this.options.className,this.options.position?a.className+=" toastify-"+this.options.position:this.options.positionLeft===!0?(a.className+=" toastify-left",console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.")):a.className+=" toastify-right",a.className+=" "+this.options.gravity,this.options.backgroundColor&&console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');for(var l in this.options.style)a.style[l]=this.options.style[l];if(this.options.ariaLive&&a.setAttribute("aria-live",this.options.ariaLive),this.options.node&&this.options.node.nodeType===Node.ELEMENT_NODE)a.appendChild(this.options.node);else if(this.options.escapeMarkup?a.innerText=this.options.text:a.innerHTML=this.options.text,this.options.avatar!==""){var c=document.createElement("img");c.src=this.options.avatar,c.className="toastify-avatar",this.options.position=="left"||this.options.positionLeft===!0?a.appendChild(c):a.insertAdjacentElement("afterbegin",c)}if(this.options.close===!0){var h=document.createElement("button");h.type="button",h.setAttribute("aria-label","Close"),h.className="toast-close",h.innerHTML="&#10006;",h.addEventListener("click",(function(E){E.stopPropagation(),this.removeElement(this.toastElement),window.clearTimeout(this.toastElement.timeOutValue)}).bind(this));var u=window.innerWidth>0?window.innerWidth:screen.width;(this.options.position=="left"||this.options.positionLeft===!0)&&u>360?a.insertAdjacentElement("afterbegin",h):a.appendChild(h)}if(this.options.stopOnFocus&&this.options.duration>0){var f=this;a.addEventListener("mouseover",function(E){window.clearTimeout(a.timeOutValue)}),a.addEventListener("mouseleave",function(){a.timeOutValue=window.setTimeout(function(){f.removeElement(a)},f.options.duration)})}if(typeof this.options.destination<"u"&&a.addEventListener("click",(function(E){E.stopPropagation(),this.options.newWindow===!0?window.open(this.options.destination,"_blank"):window.location=this.options.destination}).bind(this)),typeof this.options.onClick=="function"&&typeof this.options.destination>"u"&&a.addEventListener("click",(function(E){E.stopPropagation(),this.options.onClick()}).bind(this)),typeof this.options.offset=="object"){var m=o("x",this.options),g=o("y",this.options),b=this.options.position=="left"?m:"-"+m,y=this.options.gravity=="toastify-top"?g:"-"+g;a.style.transform="translate("+b+","+y+")"}return a},showToast:function(){this.toastElement=this.buildToast();var a;if(typeof this.options.selector=="string"?a=document.getElementById(this.options.selector):this.options.selector instanceof HTMLElement||typeof ShadowRoot<"u"&&this.options.selector instanceof ShadowRoot?a=this.options.selector:a=document.body,!a)throw"Root element is not defined";var l=i.defaults.oldestFirst?a.firstChild:a.lastChild;return a.insertBefore(this.toastElement,l),i.reposition(),this.options.duration>0&&(this.toastElement.timeOutValue=window.setTimeout((function(){this.removeElement(this.toastElement)}).bind(this),this.options.duration)),this},hideToast:function(){this.toastElement.timeOutValue&&clearTimeout(this.toastElement.timeOutValue),this.removeElement(this.toastElement)},removeElement:function(a){a.className=a.className.replace(" on",""),window.setTimeout((function(){this.options.node&&this.options.node.parentNode&&this.options.node.parentNode.removeChild(this.options.node),a.parentNode&&a.parentNode.removeChild(a),this.options.callback.call(a),i.reposition()}).bind(this),400)}},i.reposition=function(){for(var a={top:15,bottom:15},l={top:15,bottom:15},c={top:15,bottom:15},h=document.getElementsByClassName("toastify"),u,f=0;f<h.length;f++){s(h[f],"toastify-top")===!0?u="toastify-top":u="toastify-bottom";var m=h[f].offsetHeight;u=u.substr(9,u.length-1);var g=15,b=window.innerWidth>0?window.innerWidth:screen.width;b<=360?(h[f].style[u]=c[u]+"px",c[u]+=m+g):s(h[f],"toastify-left")===!0?(h[f].style[u]=a[u]+"px",a[u]+=m+g):(h[f].style[u]=l[u]+"px",l[u]+=m+g)}return this};function o(a,l){return l.offset[a]?isNaN(l.offset[a])?l.offset[a]:l.offset[a]+"px":"0px"}function s(a,l){return!a||typeof l!="string"?!1:!!(a.className&&a.className.trim().split(/\s+/gi).indexOf(l)>-1)}return i.lib.init.prototype=i.lib,i})})(To)),To.exports}var Md=Pd();const Nd=Od(Md),Mn={debug:0,info:1,warning:2,error:3};let Fd="debug";const tr={log:console.log.bind(console),info:console.info.bind(console),warn:console.warn.bind(console),error:console.error.bind(console),debug:console.debug.bind(console)};let Uo=null;const aa=[];function Rr(t){if(t===null)return"null";if(t===void 0)return"undefined";if(typeof t=="string")return t;if(typeof t=="number"||typeof t=="boolean")return String(t);if(t instanceof Error)return`${t.name}: ${t.message}`;try{return JSON.stringify(t)}catch{return String(t)}}class Bd{constructor(e){this.source=e}info(e){this.log(e,"info")}warning(e){this.log(e,"warning")}warn(e){this.log(e,"warning")}error(e){this.log(e,"error")}debug(e){this.log(e,"debug")}log(e,i){er(this.source,e,i)}}function Ud(t){return Mn[t]>=Mn[Fd]}function er(t,e,i){Ud(i)&&(Uo?Uo(t,e,i):(aa.push({source:t,message:e,level:i}),tr[i==="error"?"error":i==="warning"?"warn":i==="debug"?"debug":"log"](`[${t}] ${e}`)))}function Vd(){console.log=function(...t){tr.log.apply(console,t),er("Console",t.map(e=>Rr(e)).join(" "),"info")},console.info=function(...t){tr.info.apply(console,t),er("Console",t.map(e=>Rr(e)).join(" "),"info")},console.warn=function(...t){tr.warn.apply(console,t),er("Console",t.map(e=>Rr(e)).join(" "),"warning")},console.error=function(...t){tr.error.apply(console,t),er("Console",t.map(e=>Rr(e)).join(" "),"error")},console.debug=function(...t){tr.debug.apply(console,t),er("Console",t.map(e=>Rr(e)).join(" "),"debug")}}Vd();function qd(t){for(Uo=t;aa.length>0;){const e=aa.shift();e&&t(e.source,e.message,e.level)}}function Hd(){Uo=null}function Qe(t){return new Bd(t)}const Z=Qe("System");$t.put("logger",Z);const Va=Qe("Toast"),Wd=4e3,jd={duration:Wd,gravity:"bottom",position:"right",close:!0},qa=(t,e)=>{Nd({...jd,text:t,style:e}).showToast()},oi=t=>{Va.info(t),qa(t,{background:"var(--wa-color-brand-50)",color:"var(--wa-color-brand-on)"})},At=t=>{Va.error(t),qa(t,{background:"var(--wa-color-danger-50)",color:"var(--wa-color-danger-on)"})},Kd=t=>{Va.warn(t),qa(t,{background:"var(--wa-color-warning-50)",color:"var(--wa-color-warning-on)"})};class Gd{constructor(){this.subscriptions=new Map,this.tokenCounter=0}subscribe(e,i){this.subscriptions.has(e)||this.subscriptions.set(e,new Map);const r=`token_${++this.tokenCounter}_${Date.now()}`;return this.subscriptions.get(e).set(r,i),r}unsubscribe(e){for(const[i,r]of this.subscriptions.entries())if(r.has(e)){r.delete(e),r.size===0&&this.subscriptions.delete(i);return}}publish(e,i){const r=this.subscriptions.get(e);return!r||r.size===0?!1:(queueMicrotask(()=>{r.forEach(o=>{try{o(i)}catch(s){console.error(`Error in event callback for topic "${e}":`,s)}})}),!0)}clearAllSubscriptions(){this.subscriptions.clear()}clearSubscriptions(e){this.subscriptions.delete(e)}}const Ha=new Gd,It=(t,e)=>Ha.subscribe(t,e),Xd=t=>{Ha.unsubscribe(t)},F=(t,e)=>Ha.publish(t,e),Yd="eclipse-lyra-persistence",Br="keyval",Zd=1;let zs=null;function Nn(){return zs||(zs=new Promise((t,e)=>{const i=indexedDB.open(Yd,Zd);i.onerror=()=>e(i.error),i.onsuccess=()=>t(i.result),i.onupgradeneeded=r=>{r.target.result.createObjectStore(Br)}})),zs}class Qd{async persistObject(e,i){const r=await Nn();return new Promise((o,s)=>{const l=r.transaction(Br,"readwrite").objectStore(Br),c=i==null?l.delete(e):l.put(i,e);c.onsuccess=()=>o(),c.onerror=()=>s(c.error)})}async getObject(e){const i=await Nn();return new Promise((r,o)=>{const a=i.transaction(Br,"readonly").objectStore(Br).get(e);a.onsuccess=()=>r(a.result),a.onerror=()=>o(a.error)})}}const Ae=new Qd;$t.put("persistenceService",Ae);const Zi=".geospace/settings.json",Rs="dialogSettings",Li="events/settings/changed";function Gl(t,e){if(e){for(const[i,r]of Object.entries(e))if(r&&typeof r=="object"){const o=t[i];o?.properties&&r.properties?Gl(o.properties,r.properties):t[i]={...r,properties:r.properties?{...r.properties}:void 0}}}}class Jd{constructor(){this.mergedSchema={type:"object",properties:{}}}async checkSettings(){this.appSettings||(this.appSettings=await Ae.getObject(Zi),this.appSettings||(this.appSettings={},await Ae.persistObject(Zi,this.appSettings)),F(Li,this.appSettings))}registerSchema(e){const i=e.properties??(e.type==="object"?{}:void 0);i&&(this.mergedSchema.properties||(this.mergedSchema.properties={}),Gl(this.mergedSchema.properties,i))}getCategories(){const e=this.mergedSchema.properties;return e?Object.entries(e).filter(([,i])=>i&&typeof i=="object").map(([i,r])=>({id:i,label:r.title??i,order:typeof r.order=="number"?r.order:0,schema:r})).sort((i,r)=>i.order-r.order):[]}getSchemaForCategory(e){return this.mergedSchema.properties?.[e]}getSchemaForSettingKey(e){const i=e.split(".").filter(Boolean);if(i.length===0)return this.mergedSchema;let r=this.mergedSchema;for(const o of i)if(r=r?.properties?.[o],!r)return;return r}traversePath(e,i,r){if(i.length===0)return null;let o=e;const s=i.length-1;for(let a=0;a<s;a++){const l=i[a];if(o[l]===void 0){if(!r)return null;o[l]={}}if(o[l]===null||typeof o[l]!="object")return null;o=o[l]}return{parent:o,key:i[s]}}async getAt(e){await this.checkSettings();const i=e.split(".").filter(Boolean);if(i.length===0)return this.appSettings;const r=this.traversePath(this.appSettings,i,!1);if(r)return r.parent[r.key]}async setAt(e,i){await this.checkSettings();const r=e.split(".").filter(Boolean);if(r.length===0)return;const o=this.traversePath(this.appSettings,r,!0);o&&(o.parent[o.key]=i,await Ae.persistObject(Zi,this.appSettings),F(Li,this.appSettings))}async get(e){return await this.checkSettings(),this.appSettings[e]}async set(e,i){await this.checkSettings(),this.appSettings[e]=i,await Ae.persistObject(Zi,this.appSettings),F(Li,this.appSettings)}async getAll(){return await this.checkSettings(),this.appSettings}async setAll(e){this.appSettings=e,await Ae.persistObject(Zi,this.appSettings),F(Li,this.appSettings)}async getDialogSetting(e){return await this.checkSettings(),(this.appSettings[Rs]||{})[e]}async setDialogSetting(e,i){await this.checkSettings();const r=this.appSettings[Rs]||{};r[e]=i,this.appSettings[Rs]=r,await Ae.persistObject(Zi,this.appSettings),F(Li,this.appSettings)}}const ct=new Jd;$t.put("appSettings",ct);var th=Object.defineProperty,eh=(t,e,i)=>e in t?th(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,Ds=(t,e,i)=>(eh(t,typeof e!="symbol"?e+"":e,i),i),ih=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Os=(t,e)=>{if(Object(e)!==e)throw TypeError('Cannot use the "in" operator on this value');return t.has(e)},wo=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Fn=(t,e,i)=>(ih(t,e,"access private method"),i);function Xl(t,e){return Object.is(t,e)}let nt=null,jr=!1,zo=1;const Vo=Symbol("SIGNAL");function ir(t){const e=nt;return nt=t,e}function rh(){return nt}function oh(){return jr}const Wa={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function ps(t){if(jr)throw new Error(typeof ngDevMode<"u"&&ngDevMode?"Assertion error: signal read during notification phase":"");if(nt===null)return;nt.consumerOnSignalRead(t);const e=nt.nextProducerIndex++;if(nr(nt),e<nt.producerNode.length&&nt.producerNode[e]!==t&&na(nt)){const i=nt.producerNode[e];fs(i,nt.producerIndexOfThis[e])}nt.producerNode[e]!==t&&(nt.producerNode[e]=t,nt.producerIndexOfThis[e]=na(nt)?Ql(t,nt,e):0),nt.producerLastReadVersion[e]=t.version}function sh(){zo++}function Yl(t){if(!(!t.dirty&&t.lastCleanEpoch===zo)){if(!t.producerMustRecompute(t)&&!dh(t)){t.dirty=!1,t.lastCleanEpoch=zo;return}t.producerRecomputeValue(t),t.dirty=!1,t.lastCleanEpoch=zo}}function Zl(t){if(t.liveConsumerNode===void 0)return;const e=jr;jr=!0;try{for(const i of t.liveConsumerNode)i.dirty||nh(i)}finally{jr=e}}function ah(){return nt?.consumerAllowSignalWrites!==!1}function nh(t){var e;t.dirty=!0,Zl(t),(e=t.consumerMarkedDirty)==null||e.call(t.wrapper??t)}function lh(t){return t&&(t.nextProducerIndex=0),ir(t)}function ch(t,e){if(ir(e),!(!t||t.producerNode===void 0||t.producerIndexOfThis===void 0||t.producerLastReadVersion===void 0)){if(na(t))for(let i=t.nextProducerIndex;i<t.producerNode.length;i++)fs(t.producerNode[i],t.producerIndexOfThis[i]);for(;t.producerNode.length>t.nextProducerIndex;)t.producerNode.pop(),t.producerLastReadVersion.pop(),t.producerIndexOfThis.pop()}}function dh(t){nr(t);for(let e=0;e<t.producerNode.length;e++){const i=t.producerNode[e],r=t.producerLastReadVersion[e];if(r!==i.version||(Yl(i),r!==i.version))return!0}return!1}function Ql(t,e,i){var r;if(ja(t),nr(t),t.liveConsumerNode.length===0){(r=t.watched)==null||r.call(t.wrapper);for(let o=0;o<t.producerNode.length;o++)t.producerIndexOfThis[o]=Ql(t.producerNode[o],t,o)}return t.liveConsumerIndexOfThis.push(i),t.liveConsumerNode.push(e)-1}function fs(t,e){var i;if(ja(t),nr(t),typeof ngDevMode<"u"&&ngDevMode&&e>=t.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${e} is out of bounds of ${t.liveConsumerNode.length} consumers)`);if(t.liveConsumerNode.length===1){(i=t.unwatched)==null||i.call(t.wrapper);for(let o=0;o<t.producerNode.length;o++)fs(t.producerNode[o],t.producerIndexOfThis[o])}const r=t.liveConsumerNode.length-1;if(t.liveConsumerNode[e]=t.liveConsumerNode[r],t.liveConsumerIndexOfThis[e]=t.liveConsumerIndexOfThis[r],t.liveConsumerNode.length--,t.liveConsumerIndexOfThis.length--,e<t.liveConsumerNode.length){const o=t.liveConsumerIndexOfThis[e],s=t.liveConsumerNode[e];nr(s),s.producerIndexOfThis[o]=e}}function na(t){var e;return t.consumerIsAlwaysLive||(((e=t?.liveConsumerNode)==null?void 0:e.length)??0)>0}function nr(t){t.producerNode??(t.producerNode=[]),t.producerIndexOfThis??(t.producerIndexOfThis=[]),t.producerLastReadVersion??(t.producerLastReadVersion=[])}function ja(t){t.liveConsumerNode??(t.liveConsumerNode=[]),t.liveConsumerIndexOfThis??(t.liveConsumerIndexOfThis=[])}function Jl(t){if(Yl(t),ps(t),t.value===la)throw t.error;return t.value}function hh(t){const e=Object.create(uh);e.computation=t;const i=()=>Jl(e);return i[Vo]=e,i}const Is=Symbol("UNSET"),Ps=Symbol("COMPUTING"),la=Symbol("ERRORED"),uh={...Wa,value:Is,dirty:!0,error:null,equal:Xl,producerMustRecompute(t){return t.value===Is||t.value===Ps},producerRecomputeValue(t){if(t.value===Ps)throw new Error("Detected cycle in computations.");const e=t.value;t.value=Ps;const i=lh(t);let r,o=!1;try{r=t.computation.call(t.wrapper),o=e!==Is&&e!==la&&t.equal.call(t.wrapper,e,r)}catch(s){r=la,t.error=s}finally{ch(t,i)}if(o){t.value=e;return}t.value=r,t.version++}};function ph(){throw new Error}let fh=ph;function mh(){fh()}function gh(t){const e=Object.create(vh);e.value=t;const i=()=>(ps(e),e.value);return i[Vo]=e,i}function bh(){return ps(this),this.value}function wh(t,e){ah()||mh(),t.equal.call(t.wrapper,t.value,e)||(t.value=e,yh(t))}const vh={...Wa,equal:Xl,value:void 0};function yh(t){t.version++,sh(),Zl(t)}const mt=Symbol("node");var wt;(t=>{var e,i,r,o;class s{constructor(c,h={}){wo(this,i),Ds(this,e);const f=gh(c)[Vo];if(this[mt]=f,f.wrapper=this,h){const m=h.equals;m&&(f.equal=m),f.watched=h[t.subtle.watched],f.unwatched=h[t.subtle.unwatched]}}get(){if(!(0,t.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return bh.call(this[mt])}set(c){if(!(0,t.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(oh())throw new Error("Writes to signals not permitted during Watcher callback");const h=this[mt];wh(h,c)}}e=mt,i=new WeakSet,t.isState=l=>typeof l=="object"&&Os(i,l),t.State=s;class a{constructor(c,h){wo(this,o),Ds(this,r);const f=hh(c)[Vo];if(f.consumerAllowSignalWrites=!0,this[mt]=f,f.wrapper=this,h){const m=h.equals;m&&(f.equal=m),f.watched=h[t.subtle.watched],f.unwatched=h[t.subtle.unwatched]}}get(){if(!(0,t.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return Jl(this[mt])}}r=mt,o=new WeakSet,t.isComputed=l=>typeof l=="object"&&Os(o,l),t.Computed=a,(l=>{var c,h,u,f;function m($){let L,S=null;try{S=ir(null),L=$()}finally{ir(S)}return L}l.untrack=m;function g($){var L;if(!(0,t.isComputed)($)&&!(0,t.isWatcher)($))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return((L=$[mt].producerNode)==null?void 0:L.map(S=>S.wrapper))??[]}l.introspectSources=g;function b($){var L;if(!(0,t.isComputed)($)&&!(0,t.isState)($))throw new TypeError("Called introspectSinks without a Signal argument");return((L=$[mt].liveConsumerNode)==null?void 0:L.map(S=>S.wrapper))??[]}l.introspectSinks=b;function y($){if(!(0,t.isComputed)($)&&!(0,t.isState)($))throw new TypeError("Called hasSinks without a Signal argument");const L=$[mt].liveConsumerNode;return L?L.length>0:!1}l.hasSinks=y;function E($){if(!(0,t.isComputed)($)&&!(0,t.isWatcher)($))throw new TypeError("Called hasSources without a Computed or Watcher argument");const L=$[mt].producerNode;return L?L.length>0:!1}l.hasSources=E;class _{constructor(L){wo(this,h),wo(this,u),Ds(this,c);let S=Object.create(Wa);S.wrapper=this,S.consumerMarkedDirty=L,S.consumerIsAlwaysLive=!0,S.consumerAllowSignalWrites=!1,S.producerNode=[],this[mt]=S}watch(...L){if(!(0,t.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");Fn(this,u,f).call(this,L);const S=this[mt];S.dirty=!1;const O=ir(S);for(const it of L)ps(it[mt]);ir(O)}unwatch(...L){if(!(0,t.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");Fn(this,u,f).call(this,L);const S=this[mt];nr(S);for(let O=S.producerNode.length-1;O>=0;O--)if(L.includes(S.producerNode[O].wrapper)){fs(S.producerNode[O],S.producerIndexOfThis[O]);const it=S.producerNode.length-1;if(S.producerNode[O]=S.producerNode[it],S.producerIndexOfThis[O]=S.producerIndexOfThis[it],S.producerNode.length--,S.producerIndexOfThis.length--,S.nextProducerIndex--,O<S.producerNode.length){const Gt=S.producerIndexOfThis[O],Et=S.producerNode[O];ja(Et),Et.liveConsumerIndexOfThis[Gt]=O}}}getPending(){if(!(0,t.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[mt].producerNode.filter(S=>S.dirty).map(S=>S.wrapper)}}c=mt,h=new WeakSet,u=new WeakSet,f=function($){for(const L of $)if(!(0,t.isComputed)(L)&&!(0,t.isState)(L))throw new TypeError("Called watch/unwatch without a Computed or State argument")},t.isWatcher=$=>Os(h,$),l.Watcher=_;function A(){var $;return($=rh())==null?void 0:$.wrapper}l.currentComputed=A,l.watched=Symbol("watched"),l.unwatched=Symbol("unwatched")})(t.subtle||(t.subtle={}))})(wt||(wt={}));let Ms=!1;const Bn=new wt.subtle.Watcher(()=>{Ms||(Ms=!0,queueMicrotask(()=>{Ms=!1;for(const t of Bn.getPending())t.get();Bn.watch()}))}),xh=Symbol("SignalWatcherBrand"),kh=new FinalizationRegistry(t=>{t.unwatch(...wt.subtle.introspectSources(t))}),Un=new WeakMap;function Ch(t){return t[xh]===!0?(console.warn("SignalWatcher should not be applied to the same class more than once."),t):class extends t{constructor(){super(...arguments),this._$St=new Map,this._$So=new wt.State(0),this._$Si=!1}_$Sl(){var e,i;const r=[],o=[];this._$St.forEach((a,l)=>{(a?.beforeUpdate?r:o).push(l)});const s=(e=this.h)===null||e===void 0?void 0:e.getPending().filter(a=>a!==this._$Su&&!this._$St.has(a));r.forEach(a=>a.get()),(i=this._$Su)===null||i===void 0||i.get(),s.forEach(a=>a.get()),o.forEach(a=>a.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(this.h!==void 0)return;this._$Su=new wt.Computed(()=>{this._$So.get(),super.performUpdate()});const e=this.h=new wt.subtle.Watcher(function(){const i=Un.get(this);i!==void 0&&(i._$Si===!1&&(new Set(this.getPending()).has(i._$Su)?i.requestUpdate():i._$Sv()),this.watch())});Un.set(e,this),kh.register(this,e),e.watch(this._$Su),e.watch(...Array.from(this._$St).map(([i])=>i))}_$Sp(){if(this.h===void 0)return;let e=!1;this.h.unwatch(...wt.subtle.introspectSources(this.h).filter(i=>{var r;const o=((r=this._$St.get(i))===null||r===void 0?void 0:r.manualDispose)!==!0;return o&&this._$St.delete(i),e||(e=!o),o})),e||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(e,i){var r;this._$S_();const o=new wt.Computed(()=>{e()});return this.h.watch(o),this._$St.set(o,i),(r=i?.beforeUpdate)!==null&&r!==void 0&&r?wt.subtle.untrack(()=>o.get()):this.updateComplete.then(()=>wt.subtle.untrack(()=>o.get())),()=>{this._$St.delete(o),this.h.unwatch(o),this.isConnected===!1&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected===!1&&this._$Sp()})}}}const me={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},$r=t=>(...e)=>({_$litDirective$:t,values:e});let Sr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,i,r){this._$Ct=e,this._$AM=i,this._$Ci=r}_$AS(e,i){return this.update(e,i)}update(e,i){return this.render(...i)}};const{I:$h}=Ld,Vn=t=>t,Sh=(t,e)=>t?._$litType$!==void 0,tc=t=>t.strings===void 0,qn=()=>document.createComment(""),Dr=(t,e,i)=>{const r=t._$AA.parentNode,o=e===void 0?t._$AB:e._$AA;if(i===void 0){const s=r.insertBefore(qn(),o),a=r.insertBefore(qn(),o);i=new $h(s,a,t,t.options)}else{const s=i._$AB.nextSibling,a=i._$AM,l=a!==t;if(l){let c;i._$AQ?.(t),i._$AM=t,i._$AP!==void 0&&(c=t._$AU)!==a._$AU&&i._$AP(c)}if(s!==o||l){let c=i._$AA;for(;c!==s;){const h=Vn(c).nextSibling;Vn(r).insertBefore(c,o),c=h}}}return i},Ei=(t,e,i=t)=>(t._$AI(e,i),t),Eh={},ec=(t,e=Eh)=>t._$AH=e,Ah=t=>t._$AH,Ns=t=>{t._$AR(),t._$AA.remove()};const Kr=(t,e)=>{const i=t._$AN;if(i===void 0)return!1;for(const r of i)r._$AO?.(e,!1),Kr(r,e);return!0},qo=t=>{let e,i;do{if((e=t._$AM)===void 0)break;i=e._$AN,i.delete(t),t=e}while(i?.size===0)},ic=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(i===void 0)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),Th(e)}};function Lh(t){this._$AN!==void 0?(qo(this),this._$AM=t,ic(this)):this._$AM=t}function _h(t,e=!1,i=0){const r=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(e)if(Array.isArray(r))for(let s=i;s<r.length;s++)Kr(r[s],!1),qo(r[s]);else r!=null&&(Kr(r,!1),qo(r));else Kr(this,t)}const Th=t=>{t.type==me.CHILD&&(t._$AP??=_h,t._$AQ??=Lh)};class zh extends Sr{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,i,r){super._$AT(e,i,r),ic(this),this.isConnected=e._$AU}_$AO(e,i=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),i&&(Kr(this,e),qo(this))}setValue(e){if(tc(this._$Ct))this._$Ct._$AI(e,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=e,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}let Fs=!1;const Hn=new wt.subtle.Watcher(async()=>{Fs||(Fs=!0,queueMicrotask(()=>{Fs=!1;for(const t of Hn.getPending())t.get();Hn.watch()}))});wt.State;wt.Computed;const ki=(t,e)=>new wt.State(t,e);class Rh{constructor(){this.globalNameRemaps=new Map,this.appNameRemaps=new Map}setGlobalNameRemap(e,i){this.globalNameRemaps.set(e,this.normalizeTargets(i))}resetForTesting(){this.globalNameRemaps.clear(),this.appNameRemaps.clear()}applyAppNameRemaps(e){if(this.appNameRemaps.clear(),!!e)for(const i of e)this.appNameRemaps.set(i.name,this.normalizeTargets(i.targets))}getEffectiveTargets(e,i){const r=i.name;if(!r)return[e];const o=this.appNameRemaps.get(r);if(o)return o.length>0?o:[];const s=this.globalNameRemaps.get(r);return s?s.length>0?s:[]:[e]}listNameRemaps(){const e={},i=new Set([...this.globalNameRemaps.keys(),...this.appNameRemaps.keys()]);for(const r of i)e[r]={appTargets:this.appNameRemaps.get(r),globalTargets:this.globalNameRemaps.get(r)};return e}normalizeTargets(e){const i=new Set,r=[];for(const o of e)!o||i.has(o)||(i.add(o),r.push(o));return r}}const Ho=new Rh;$t.put("contributionTargetMappingRegistry",Ho);const we="events/contributionregistry/contributionsChanged";class Dh{constructor(){this.contributions=new Map}registerContribution(e,i){const r=this.getOrCreateSlot(e);if("command"in i){const s=i;s.disabled instanceof Function&&(s.disabled=new wt.Computed(s.disabled))}r.push(i),F(we,{target:e,contributions:r});const o=Ho.getEffectiveTargets(e,i);for(const s of o){if(s===e)continue;const a=this.getContributions(s);F(we,{target:s,contributions:a})}}getContributions(e){const i=[];for(const[r,o]of this.contributions.entries()){const s=o;for(const a of s)Ho.getEffectiveTargets(r,a).includes(e)&&i.push(a)}return i.length===0&&this.getOrCreateSlot(e),i}getOrCreateSlot(e){return this.contributions.has(e)||this.contributions.set(e,[]),this.contributions.get(e)}}const H=new Dh;$t.put("contributionRegistry",H);const ee=ki(null),Gr=ki(null),ca=ki(null),da=ki(0),Le=ki(void 0);ki({name:"",timestamp:0});class Oh{constructor(){this.tasks=[],this.updateCounter=0}notifyUpdate(){this.updateCounter++,da.set(this.updateCounter)}run(e,i){const r=this.createProgressMonitor(e);try{this.tasks.push(r),this.notifyUpdate(),i(r)}finally{this.tasks.splice(this.tasks.indexOf(r),1),this.notifyUpdate()}}async runAsync(e,i){const r=this.createProgressMonitor(e);return this.tasks.push(r),this.notifyUpdate(),i(r).finally(()=>{this.tasks.splice(this.tasks.indexOf(r),1),this.notifyUpdate()})}createProgressMonitor(e){const i={name:e,message:"",currentStep:0,totalSteps:-1,progress:-1};return new Proxy(i,{set:(r,o,s)=>(r[o]=s,this.notifyUpdate(),!0)})}getActiveTasks(){return this.tasks}}const lr=new Oh;$t.put("taskService",lr);const Wo="language",to="en";function Ih(t,e){return e?t.replace(/\{(\w+)\}/g,(i,r)=>e[r]!==void 0?e[r]:i):t}const Ro=new Set([to]),Ka=ki(Ro);let Ga=null;function Ph(t){let e=!1;for(const i of t){const r=i.toLowerCase().replace("-","_");Ro.has(r)||(Ro.add(r),e=!0)}if(e&&(Ka.set(new Set(Ro)),Ga===null)){const i=ms();i!==Ii.get()&&Ii.set(i)}}function ms(){const t=navigator.languages?.length?navigator.languages:[navigator.language||to],e=Ka.get();for(const i of t){const r=i.split("-")[0].toLowerCase();if(e.has(r))return r}return to}const Ii=ki(ms());async function Mh(){const t=await ct.get(Wo);Ga=t??null,Ii.set(t||ms())}It(Li,t=>{Ga=t?.[Wo]??null,Ii.set(t?.[Wo]||ms())});Mh();async function Er(t,e=!1){const i={};await Promise.all(Object.entries(t).map(async([a,l])=>{const c=await l(),h=c&&"default"in c?c.default:c,m=(a.match(/\.([a-zA-Z-_]+)\.json$/)?.[1]??to).toLowerCase().replace("-","_");i[m]=h})),Ph(Object.keys(i));const r=a=>{const c=Ii.get().toLowerCase().replace("-","_"),[h,u]=c.split("_"),f=u?[`${h}_${u}`,h]:[h];f.push(to);for(const m of f){const g=i[m];if(g&&a in g)return g[a]}return a},o=Object.assign({},{then:void 0,catch:void 0,finally:void 0}),s={get(a,l){if(l in a)return a[l];const c=r(l),h=(u=>Ih(r(l),u));return h.toString=()=>e?r(l):c,h.valueOf=()=>e?r(l):c,h[Symbol.toPrimitive]=()=>e?r(l):c,e&&(h.toJSON=()=>r(l)),h}};return new Proxy(o,s)}const Nh=Qe("EsmShService"),ut=class ut{isEsmShUrl(e){try{const i=new URL(e);return i.hostname==="esm.sh"||i.hostname==="raw.esm.sh"}catch{return!1}}isSourceIdentifier(e){return this.isEsmShUrl(e)||this.isHttpUrl(e)?!1:this.parseSource(e)!==null}isHttpUrl(e){try{const i=new URL(e);return i.protocol==="http:"||i.protocol==="https:"}catch{return!1}}parseSource(e){return!e||typeof e!="string"||(e=e.trim(),this.isHttpUrl(e))?null:e.startsWith(ut.GITHUB_PREFIX)?this.parseGitHubSource(e):e.startsWith(ut.JSR_PREFIX)?this.parseJsrSource(e):e.startsWith(ut.PR_PREFIX)?this.parsePrSource(e):this.parseNpmSource(e)}parseGitHubSource(e){const r=e.substring(ut.GITHUB_PREFIX.length).split("/");if(r.length<2)return null;const o=r[0],s=r[1];let a,l,c;const h=s.match(/^(.+?)(@(.+))?$/);return h?(a=h[1],l=h[3],r.length>2&&(c=r.slice(2).join("/")),{type:"github",owner:o,repo:a,version:l,path:c}):null}parseJsrSource(e){const i=e.substring(ut.JSR_PREFIX.length);if(!i.startsWith("@"))return null;const r=i.split("/");if(r.length<2)return null;const o=r[0],s=r[1];let a,l,c;const h=s.match(/^(.+?)(@(.+))?$/);return h?(a=`${o}/${h[1]}`,l=h[3],r.length>2&&(c=r.slice(2).join("/")),{type:"jsr",package:a,version:l,path:c}):null}parsePrSource(e){const r=e.substring(ut.PR_PREFIX.length).split("/");if(r.length<2)return null;const o=r[0],s=r[1];let a,l;const c=s.match(/^(.+?)@(.+)$/);return c?(a=c[1],l=c[2]):a=s,{type:"pr",owner:o,repo:a,commit:l}}parseNpmSource(e){const i=e.split("/"),r=i[0];let o,s,a;const l=r.match(/^(.+?)(@(.+))?$/);return l?(o=l[1],s=l[3],i.length>1&&(a=i.slice(1).join("/")),{type:"npm",package:o,version:s,path:a}):null}buildEsmShUrl(e,i){let r=ut.ESM_SH_BASE;switch(e.type){case"npm":r+=`/${e.package}`,e.version&&(r+=`@${e.version}`),e.path&&(r+=`/${e.path}`);break;case"github":r+=`/${ut.GITHUB_PREFIX}${e.owner}/${e.repo}`,e.version&&(r+=`@${e.version}`),e.path&&(r+=`/${e.path}`);break;case"jsr":r+=`/${ut.JSR_PREFIX}${e.package}`,e.version&&(r+=`@${e.version}`),e.path&&(r+=`/${e.path}`);break;case"pr":r+=`/${ut.PR_PREFIX}${e.owner}/${e.repo}`,e.commit&&(r+=`@${e.commit}`);break}const o=[];if(i?.deps){const s=Object.entries(i.deps).map(([a,l])=>`${a}@${l}`).join(",");o.push(`deps=${encodeURIComponent(s)}`)}return i?.target&&o.push(`target=${encodeURIComponent(i.target)}`),i?.dev&&o.push("dev"),i?.bundle===!1?o.push("bundle=false"):i?.bundle===!0&&o.push("bundle"),o.length>0&&(r+=`?${o.join("&")}`),r}normalizeToEsmSh(e,i){if(this.isEsmShUrl(e)||this.isHttpUrl(e))return e;const r=this.parseSource(e);return r?this.buildEsmShUrl(r,i):(Nh.warn(`Could not parse source identifier: ${e}`),e)}extractPackageName(e){const i=this.parseSource(e);if(!i)return null;switch(i.type){case"npm":return i.package||null;case"github":return`${i.owner}/${i.repo}`;case"jsr":return i.package||null;case"pr":return`${i.owner}/${i.repo}`}}isGitHubUrl(e){try{const i=new URL(e);return i.hostname==="github.com"||i.hostname==="www.github.com"}catch{return e.startsWith("https://github.com/")||e.startsWith("http://github.com/")}}convertGitHubUrlToSource(e){try{const r=new URL(e).pathname.split("/").filter(h=>h);if(r.length<2)throw new Error("Invalid GitHub URL format");const o=r[0];let s=r[1].replace(/\.git$/,""),a,l;r.length>2&&(r[2]==="blob"||r[2]==="tree"?(a=r[3]||"main",r[2]==="blob"&&r.length>4&&(l=r.slice(4).join("/"))):r[2]==="commit"?a=r[3]:l=r.slice(2).join("/"));let c=`${ut.GITHUB_PREFIX}${o}/${s}`;return a&&(c+=`@${a}`),l&&(c+=`/${l}`),c}catch{const i=e.match(/github\.com\/([^\/]+)\/([^\/]+)/);return i?`${ut.GITHUB_PREFIX}${i[1]}/${i[2].replace(/\.git$/,"")}`:e}}async fetchGitHubPackageJson(e){if(e.type!=="github")throw new Error("Source must be a GitHub source");const i=e.owner,r=e.repo,o=e.version||"main",s=`https://raw.githubusercontent.com/${i}/${r}/${o}/package.json`,a=await fetch(s);if(!a.ok)throw new Error(`Failed to fetch package.json: ${a.statusText}`);return await a.json()}};ut.ESM_SH_BASE="https://esm.sh",ut.GITHUB_PREFIX="gh/",ut.JSR_PREFIX="jsr/",ut.PR_PREFIX="pr/";let ha=ut;const Te=new ha;$t.put("esmShService",Te);const rc="events/commandregistry/commandRegistered";class Fh{constructor(e,i,r,o,s){this.id=e,this.name=i,this.description=r,this.parameters=o||[],this.output=s||[]}}class Bh{constructor(){this.commands={},this.handlers=new Map}registerHandler(e,i){this.handlers.has(e)||this.handlers.set(e,[]);const r=this.handlers.get(e);r.push(i),r.sort((o,s)=>(s.ranking??0)-(o.ranking??0))}getHandler(e){return this.handlers.get(e)}createExecutionContext(e){return{params:e||{},activePart:ee.get(),activeEditor:Gr.get()}}execute(e,i={}){const r=this.getHandler(e);if(!r)throw Z.debug(`[CommandRegistry] No handlers registered for command: ${e}`),new Error(`No handlers registered for command: ${e}`);const o=this.getCommand(e),s=i.params?` params: ${JSON.stringify(i.params)}`:"";Z.debug(`[CommandRegistry] Executing command: ${e}${o?` (${o.name})`:""}${s}`);for(const a of r)if(a.canExecute===void 0||a.canExecute(i))try{const l=a.execute(i);return Z.debug(`[CommandRegistry] Command executed successfully: ${e} (result: ${l})`),l}catch(l){const c=l instanceof Error?l.message:String(l);throw Z.error(`[CommandRegistry] Command execution failed: ${e} - ${c}`),l}Z.error(`[CommandRegistry] No handler found to execute command: ${e}`)}createAndRegisterCommand(e,i,r,o,s){const a=new Fh(e,i,r,o);this.registerCommand(a),s&&this.registerHandler(e,s)}registerCommand(e){this.commands[e.id]=e,F(rc,e)}hasCommand(e){return e in this.commands}listCommands(e){return e?Object.values(this.commands).filter(i=>(li.getHandler(i.id)||[]).some(o=>o.canExecute===void 0||o.canExecute(e))).reduce((i,r)=>(i[r.id]=r,i),{}):this.commands}getCommand(e){return this.commands[e]}registerAll(e){const i=e.command.id;this.registerCommand(e.command),e.handler&&this.registerHandler(i,e.handler),e.contribution&&e.contribution.target&&H.registerContribution(e.contribution.target,{command:i,...e.contribution})}}const li=new Bh;$t.put("commandRegistry",li);const St=t=>{li.registerAll(t)},Ur="events/extensionsregistry/extensionsConfigChanged",Or="extensions",Wn="extensions.external";class Uh{constructor(){this.extensions={},this.loadedExtensions=new Set,this.loadingPromises=new Map,It(Li,()=>{this.extensionsSettings=void 0,this.checkExtensionsConfig().then()}),this.loadPersistedExternalExtensions().then(()=>{this.checkExtensionsConfig().then()})}async loadPersistedExternalExtensions(){try{const e=await ct.get(Wn);e&&Array.isArray(e)&&e.forEach(i=>{this.extensions[i.id]=i})}catch(e){Z.error(`Failed to load persisted external extensions: ${e}`)}}async savePersistedExternalExtensions(){try{const e=Object.values(this.extensions).filter(i=>i.external);await ct.set(Wn,e)}catch(e){Z.error(`Failed to save persisted external extensions: ${e}`)}}async checkExtensionsConfig(){this.extensionsSettings||(this.extensionsSettings=await ct.get(Or),this.extensionsSettings||(await ct.set(Or,[]),this.extensionsSettings=await ct.get(Or)),F(Ur,this.extensionsSettings))}registerExtension(e){this.extensions[e.id]=e,Z.debug(`Registered extension: ${e.id}`),e.external&&this.savePersistedExternalExtensions().catch(i=>{Z.error(`Failed to persist external extension: ${i}`)}),F(Ur,this.extensionsSettings)}async loadExtensionFromUrl(e,i){Z.info(`Loading extension from URL: ${e}...`);try{let r=e,o=`Extension from ${e}`;if(Te.isSourceIdentifier(e)){const a=Te.extractPackageName(e);a&&(o=`Extension: ${a}`),r=Te.normalizeToEsmSh(e),Z.debug(`Converted source identifier to esm.sh URL: ${e} -> ${r}`)}const s=i||`url:${r}`;if(this.isEnabled(s))return Z.info(`Extension from URL ${r} is already enabled`),s;if(!this.extensions[s]){const a={id:s,name:o,description:`Extension loaded from: ${e}`,url:r};this.registerExtension(a),Z.info(`Registered extension from URL: ${s}`)}return this.enable(s,!1),Z.info(`Successfully enabled extension from URL: ${r}`),s}catch(r){throw Z.error(`Failed to load extension from URL ${e}: ${r}`),r}}getExtensions(){return Object.values(this.extensions)}async loadEnabledExtensions(){await this.checkExtensionsConfig();const i=(this.extensionsSettings??[]).filter(r=>this.isEnabled(r.id)&&this.extensions[r.id]).map(r=>this.load(r.id).catch(o=>{At("Extension could not be loaded: "+o.message)}));await Promise.all(i)}isEnabled(e){return this.checkExtensionsConfig(),!!this.extensionsSettings?.find(i=>i.id===e&&i.enabled)}isLoaded(e){return this.loadedExtensions.has(e)}enable(e,i=!1){this.isEnabled(e)||(Z.debug(`Loading extension: ${e}`),this.load(e).then(()=>{this.updateEnablement(e,!0,i)}).catch(r=>{Z.error(`Could not load extension: ${e}: ${r}`)}))}async load(e,i=[]){if(this.loadedExtensions.has(e))return;const r=this.loadingPromises.get(e);if(r)return r;if(i.includes(e)){const a=[...i,e].join(" → ");throw new Error(`Circular dependency detected: ${a}`)}const o=this.extensions[e];if(!o)throw new Error("Extension not found: "+e);const s=(async()=>{try{if(Z.debug(`Loading extension: ${e}`),o.dependencies&&o.dependencies.length>0){const l=[...i,e];for(const c of o.dependencies)await this.load(c,l),this.isEnabled(c)||(await this.updateEnablementAsync(c,!0,!1),Z.debug(`Auto-enabled dependency: ${c}`))}const a=await lr.runAsync("Loading extension: "+o.name,async()=>{if(o.loader)return o.loader();if(o.url){let l=o.url;return Te.isSourceIdentifier(o.url)&&(l=Te.normalizeToEsmSh(o.url),Z.debug(`Normalized extension URL: ${o.url} -> ${l}`)),import(l)}});if(this.loadedExtensions.add(e),a?.default instanceof Function)try{a.default(xi.getProxy())}catch(l){throw Z.error(`Error executing extension function for ${e}: ${l}`),l}}catch(a){throw this.loadedExtensions.delete(e),a}finally{this.loadingPromises.delete(e)}})();return this.loadingPromises.set(e,s),s}disable(e,i=!1){this.isEnabled(e)&&this.updateEnablement(e,!1,i)}updateEnablement(e,i,r){this.checkExtensionsConfig().then(()=>{const o=this.extensionsSettings?.find(s=>s.id==e);o?o.enabled=i:this.extensionsSettings?.push({id:e,enabled:i}),ct.set(Or,this.extensionsSettings).then(()=>{if(r){const s=this.extensions[e];oi(i?s.name+" enabled.":s.name+" disabled  - Please restart to take effect")}F(Ur,this.extensionsSettings)})})}async updateEnablementAsync(e,i,r){await this.checkExtensionsConfig();const o=this.extensionsSettings?.find(s=>s.id==e);if(o?o.enabled=i:this.extensionsSettings?.push({id:e,enabled:i}),await ct.set(Or,this.extensionsSettings),r){const s=this.extensions[e];oi(i?s.name+" enabled.":s.name+" disabled  - Please restart to take effect")}F(Ur,this.extensionsSettings)}}const st=new Uh;$t.put("extensionRegistry",st);const jn=["alt","ctrl","meta","shift"],oc={CTRL:"ctrl",CONTROL:"ctrl",ALT:"alt",OPTION:"alt",SHIFT:"shift",META:"meta",CMD:"meta",COMMAND:"meta",WIN:"meta",WINDOWS:"meta"},Vh={ctrl:"Ctrl",alt:"Alt",shift:"Shift",meta:"Cmd"},qh={SPACE:" ",ESC:"ESCAPE",RETURN:"ENTER",LEFT:"ARROWLEFT",RIGHT:"ARROWRIGHT",UP:"ARROWUP",DOWN:"ARROWDOWN",DEL:"DELETE",INS:"INSERT",PAGEUP:"PAGEUP",PAGEDOWN:"PAGEDOWN"},Hh=new Set(Object.keys(oc));function Kn(t){return qh[t]??t}class Wh{constructor(){this.bindings=new Map,this.enabled=!0,document.addEventListener("keydown",this.handleKeyDown.bind(this),!0),this.registerExistingCommandBindings(),It(rc,e=>{e.keyBinding&&this.registerKeyBinding(e.id,e.keyBinding)})}registerExistingCommandBindings(){const e=li.listCommands();Object.values(e).forEach(i=>{i.keyBinding&&this.registerKeyBinding(i.id,i.keyBinding)})}parseKeyBinding(e){if(!e||e.trim()==="")return null;const i=e.toUpperCase().split("+").map(a=>a.trim());if(i.length===0)return null;const r=i[i.length-1],o=i.slice(0,-1);if(i.length===1&&Hh.has(r))return null;const s={ctrl:!1,alt:!1,shift:!1,meta:!1};for(const a of o){const l=oc[a];if(l===void 0)return null;s[l]=!0}return s.key=Kn(r),s}getBindingKey(e){return[...jn.filter(r=>e[r]),e.key.toUpperCase()].join("+")}registerKeyBinding(e,i){const r=this.parseKeyBinding(i);if(!r)return Z.error(`Invalid key binding: ${i}`),!1;r.commandId=e;const o=this.getBindingKey(r);this.bindings.has(o)||this.bindings.set(o,[]);const s=this.bindings.get(o);if(s.find(c=>c.commandId===e))return Z.error(`Key binding ${i} already registered for command ${e}`),!1;const l=s.find(c=>c.commandId!==e);return l?(Z.warn(`Key binding ${i} already used by command ${l.commandId}; refusing for ${e}`),!1):(s.push(r),!0)}unregisterKeyBinding(e,i){if(i){const r=this.parseKeyBinding(i);if(r){const o=this.getBindingKey(r),s=this.bindings.get(o);if(s){const a=s.filter(l=>l.commandId!==e);a.length===0?this.bindings.delete(o):this.bindings.set(o,a)}}}else for(const[r,o]of this.bindings.entries()){const s=o.filter(a=>a.commandId!==e);s.length===0?this.bindings.delete(r):this.bindings.set(r,s)}}getKeyBindingsForCommand(e){const i=[];for(const r of this.bindings.values())for(const o of r)o.commandId===e&&i.push(this.formatKeyBinding(o));return i.sort()}formatKeyBinding(e){const i=jn.filter(o=>e[o]).map(o=>Vh[o]),r=e.key.length===1?e.key.toUpperCase():e.key.charAt(0).toUpperCase()+e.key.slice(1).toLowerCase();return i.push(r),i.join("+")}handleKeyDown(e){if(!this.enabled)return;const i={commandId:"",key:Kn(e.key.toUpperCase()),ctrl:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:e.metaKey},r=this.getBindingKey(i),o=this.bindings.get(r);if(o&&o.length>0){const s=o[0];try{e.preventDefault(),e.stopPropagation();const a=li.createExecutionContext({});li.execute(s.commandId,a),Z.debug(`Executed command via key binding: ${s.commandId}`)}catch(a){Z.error(`Failed to execute command ${s.commandId}: ${a.message}`)}}}setEnabled(e){this.enabled=e}isEnabled(){return this.enabled}getAllBindings(){const e=new Map;for(const[i,r]of this.bindings)e.set(i,[...r]);return e}clearAll(){this.bindings.clear()}}const sc=new Wh;$t.put("keyBindingManager",sc);let ua=class extends Sr{constructor(e){if(super(e),this.it=R,e.type!==me.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===R||e==null)return this._t=void 0,this.it=e;if(e===Ft)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const i=[e];return i.raw=i,this._t={_$litType$:this.constructor.resultType,strings:i,values:[]}}};ua.directiveName="unsafeHTML",ua.resultType=1;const We=$r(ua);function Xa(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Wi=Xa();function ac(t){Wi=t}var _i={exec:()=>null};function B(t,e=""){let i=typeof t=="string"?t:t.source,r={replace:(o,s)=>{let a=typeof s=="string"?s:s.source;return a=a.replace(Dt.caret,"$1"),i=i.replace(o,a),r},getRegex:()=>new RegExp(i,e)};return r}var jh=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Dt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}>`)},Kh=/^(?:[ \t]*(?:\n|$))+/,Gh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Xh=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,lo=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Yh=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ya=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,nc=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,lc=B(nc).replace(/bull/g,Ya).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Zh=B(nc).replace(/bull/g,Ya).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Za=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Qh=/^[^\n]+/,Qa=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Jh=B(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Qa).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),tu=B(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ya).getRegex(),gs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ja=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,eu=B("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ja).replace("tag",gs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),cc=B(Za).replace("hr",lo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",gs).getRegex(),iu=B(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",cc).getRegex(),tn={blockquote:iu,code:Gh,def:Jh,fences:Xh,heading:Yh,hr:lo,html:eu,lheading:lc,list:tu,newline:Kh,paragraph:cc,table:_i,text:Qh},Gn=B("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",lo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",gs).getRegex(),ru={...tn,lheading:Zh,table:Gn,paragraph:B(Za).replace("hr",lo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Gn).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",gs).getRegex()},ou={...tn,html:B(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ja).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:_i,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:B(Za).replace("hr",lo).replace("heading",` *#{1,6} *[^
]`).replace("lheading",lc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},su=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,au=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,dc=/^( {2,}|\\)\n(?!\s*$)/,nu=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,bs=/[\p{P}\p{S}]/u,en=/[\s\p{P}\p{S}]/u,hc=/[^\s\p{P}\p{S}]/u,lu=B(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,en).getRegex(),uc=/(?!~)[\p{P}\p{S}]/u,cu=/(?!~)[\s\p{P}\p{S}]/u,du=/(?:[^\s\p{P}\p{S}]|~)/u,pc=/(?![*_])[\p{P}\p{S}]/u,hu=/(?![*_])[\s\p{P}\p{S}]/u,uu=/(?:[^\s\p{P}\p{S}]|[*_])/u,pu=B(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",jh?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),fc=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,fu=B(fc,"u").replace(/punct/g,bs).getRegex(),mu=B(fc,"u").replace(/punct/g,uc).getRegex(),mc="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",gu=B(mc,"gu").replace(/notPunctSpace/g,hc).replace(/punctSpace/g,en).replace(/punct/g,bs).getRegex(),bu=B(mc,"gu").replace(/notPunctSpace/g,du).replace(/punctSpace/g,cu).replace(/punct/g,uc).getRegex(),wu=B("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,hc).replace(/punctSpace/g,en).replace(/punct/g,bs).getRegex(),vu=B(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,pc).getRegex(),yu="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",xu=B(yu,"gu").replace(/notPunctSpace/g,uu).replace(/punctSpace/g,hu).replace(/punct/g,pc).getRegex(),ku=B(/\\(punct)/,"gu").replace(/punct/g,bs).getRegex(),Cu=B(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),$u=B(Ja).replace("(?:-->|$)","-->").getRegex(),Su=B("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",$u).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),jo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Eu=B(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",jo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),gc=B(/^!?\[(label)\]\[(ref)\]/).replace("label",jo).replace("ref",Qa).getRegex(),bc=B(/^!?\[(ref)\](?:\[\])?/).replace("ref",Qa).getRegex(),Au=B("reflink|nolink(?!\\()","g").replace("reflink",gc).replace("nolink",bc).getRegex(),Xn=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,rn={_backpedal:_i,anyPunctuation:ku,autolink:Cu,blockSkip:pu,br:dc,code:au,del:_i,delLDelim:_i,delRDelim:_i,emStrongLDelim:fu,emStrongRDelimAst:gu,emStrongRDelimUnd:wu,escape:su,link:Eu,nolink:bc,punctuation:lu,reflink:gc,reflinkSearch:Au,tag:Su,text:nu,url:_i},Lu={...rn,link:B(/^!?\[(label)\]\((.*?)\)/).replace("label",jo).getRegex(),reflink:B(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",jo).getRegex()},pa={...rn,emStrongRDelimAst:bu,emStrongLDelim:mu,delLDelim:vu,delRDelim:xu,url:B(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Xn).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:B(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Xn).getRegex()},_u={...pa,br:B(dc).replace("{2,}","*").getRegex(),text:B(pa.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},vo={normal:tn,gfm:ru,pedantic:ou},Ir={normal:rn,gfm:pa,breaks:_u,pedantic:Lu},Tu={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Yn=t=>Tu[t];function Ee(t,e){if(e){if(Dt.escapeTest.test(t))return t.replace(Dt.escapeReplace,Yn)}else if(Dt.escapeTestNoEncode.test(t))return t.replace(Dt.escapeReplaceNoEncode,Yn);return t}function Zn(t){try{t=encodeURI(t).replace(Dt.percentDecode,"%")}catch{return null}return t}function Qn(t,e){let i=t.replace(Dt.findPipe,(s,a,l)=>{let c=!1,h=a;for(;--h>=0&&l[h]==="\\";)c=!c;return c?"|":" |"}),r=i.split(Dt.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),e)if(r.length>e)r.splice(e);else for(;r.length<e;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(Dt.slashPipe,"|");return r}function Pr(t,e,i){let r=t.length;if(r===0)return"";let o=0;for(;o<r&&t.charAt(r-o-1)===e;)o++;return t.slice(0,r-o)}function zu(t,e){if(t.indexOf(e[1])===-1)return-1;let i=0;for(let r=0;r<t.length;r++)if(t[r]==="\\")r++;else if(t[r]===e[0])i++;else if(t[r]===e[1]&&(i--,i<0))return r;return i>0?-2:-1}function Ru(t,e=0){let i=e,r="";for(let o of t)if(o==="	"){let s=4-i%4;r+=" ".repeat(s),i+=s}else r+=o,i++;return r}function Jn(t,e,i,r,o){let s=e.href,a=e.title||null,l=t[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let c={type:t[0].charAt(0)==="!"?"image":"link",raw:i,href:s,title:a,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,c}function Du(t,e,i){let r=t.match(i.other.indentCodeCompensation);if(r===null)return e;let o=r[1];return e.split(`
`).map(s=>{let a=s.match(i.other.beginningSpace);if(a===null)return s;let[l]=a;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var Ko=class{options;rules;lexer;constructor(t){this.options=t||Wi}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let i=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?i:Pr(i,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let i=e[0],r=Du(i,e[3]||"",this.rules);return{type:"code",raw:i,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:r}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let i=e[2].trim();if(this.rules.other.endingHash.test(i)){let r=Pr(i,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(i=r.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:i,tokens:this.lexer.inline(i)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Pr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let i=Pr(e[0],`
`).split(`
`),r="",o="",s=[];for(;i.length>0;){let a=!1,l=[],c;for(c=0;c<i.length;c++)if(this.rules.other.blockquoteStart.test(i[c]))l.push(i[c]),a=!0;else if(!a)l.push(i[c]);else break;i=i.slice(c);let h=l.join(`
`),u=h.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${h}`:h,o=o?`${o}
${u}`:u;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,s,!0),this.lexer.state.top=f,i.length===0)break;let m=s.at(-1);if(m?.type==="code")break;if(m?.type==="blockquote"){let g=m,b=g.raw+`
`+i.join(`
`),y=this.blockquote(b);s[s.length-1]=y,r=r.substring(0,r.length-g.raw.length)+y.raw,o=o.substring(0,o.length-g.text.length)+y.text;break}else if(m?.type==="list"){let g=m,b=g.raw+`
`+i.join(`
`),y=this.list(b);s[s.length-1]=y,r=r.substring(0,r.length-m.raw.length)+y.raw,o=o.substring(0,o.length-g.raw.length)+y.raw,i=b.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(t){let e=this.rules.block.list.exec(t);if(e){let i=e[1].trim(),r=i.length>1,o={type:"list",raw:"",ordered:r,start:r?+i.slice(0,-1):"",loose:!1,items:[]};i=r?`\\d{1,9}\\${i.slice(-1)}`:`\\${i}`,this.options.pedantic&&(i=r?i:"[*+-]");let s=this.rules.other.listItemRegex(i),a=!1;for(;t;){let c=!1,h="",u="";if(!(e=s.exec(t))||this.rules.block.hr.test(t))break;h=e[0],t=t.substring(h.length);let f=Ru(e[2].split(`
`,1)[0],e[1].length),m=t.split(`
`,1)[0],g=!f.trim(),b=0;if(this.options.pedantic?(b=2,u=f.trimStart()):g?b=e[1].length+1:(b=f.search(this.rules.other.nonSpaceChar),b=b>4?1:b,u=f.slice(b),b+=e[1].length),g&&this.rules.other.blankLine.test(m)&&(h+=m+`
`,t=t.substring(m.length+1),c=!0),!c){let y=this.rules.other.nextBulletRegex(b),E=this.rules.other.hrRegex(b),_=this.rules.other.fencesBeginRegex(b),A=this.rules.other.headingBeginRegex(b),$=this.rules.other.htmlBeginRegex(b),L=this.rules.other.blockquoteBeginRegex(b);for(;t;){let S=t.split(`
`,1)[0],O;if(m=S,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),O=m):O=m.replace(this.rules.other.tabCharGlobal,"    "),_.test(m)||A.test(m)||$.test(m)||L.test(m)||y.test(m)||E.test(m))break;if(O.search(this.rules.other.nonSpaceChar)>=b||!m.trim())u+=`
`+O.slice(b);else{if(g||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||_.test(f)||A.test(f)||E.test(f))break;u+=`
`+m}g=!m.trim(),h+=S+`
`,t=t.substring(S.length+1),f=O.slice(b)}}o.loose||(a?o.loose=!0:this.rules.other.doubleBlankLine.test(h)&&(a=!0)),o.items.push({type:"list_item",raw:h,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),o.raw+=h}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let c of o.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let h=this.rules.other.listTaskCheckbox.exec(c.raw);if(h){let u={type:"checkbox",raw:h[0]+" ",checked:h[0]!=="[ ]"};c.checked=u.checked,o.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=u.raw+c.tokens[0].raw,c.tokens[0].text=u.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(u)):c.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):c.tokens.unshift(u)}}if(!o.loose){let h=c.tokens.filter(f=>f.type==="space"),u=h.length>0&&h.some(f=>this.rules.other.anyLine.test(f.raw));o.loose=u}}if(o.loose)for(let c of o.items){c.loose=!0;for(let h of c.tokens)h.type==="text"&&(h.type="paragraph")}return o}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let i=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:i,raw:e[0],href:r,title:o}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let i=Qn(e[1]),r=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:e[0],header:[],align:[],rows:[]};if(i.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?s.align.push("right"):this.rules.other.tableAlignCenter.test(a)?s.align.push("center"):this.rules.other.tableAlignLeft.test(a)?s.align.push("left"):s.align.push(null);for(let a=0;a<i.length;a++)s.header.push({text:i[a],tokens:this.lexer.inline(i[a]),header:!0,align:s.align[a]});for(let a of o)s.rows.push(Qn(a,s.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[c]})));return s}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let i=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:i,tokens:this.lexer.inline(i)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let i=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(i)){if(!this.rules.other.endAngleBracket.test(i))return;let s=Pr(i.slice(0,-1),"\\");if((i.length-s.length)%2===0)return}else{let s=zu(e[2],"()");if(s===-2)return;if(s>-1){let a=(e[0].indexOf("!")===0?5:4)+e[1].length+s;e[2]=e[2].substring(0,s),e[0]=e[0].substring(0,a).trim(),e[3]=""}}let r=e[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=e[3]?e[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(i)?r=r.slice(1):r=r.slice(1,-1)),Jn(e,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let i;if((i=this.rules.inline.reflink.exec(t))||(i=this.rules.inline.nolink.exec(t))){let r=(i[2]||i[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=e[r.toLowerCase()];if(!o){let s=i[0].charAt(0);return{type:"text",raw:s,text:s}}return Jn(i,o,i[0],this.lexer,this.rules)}}emStrong(t,e,i=""){let r=this.rules.inline.emStrongLDelim.exec(t);if(!(!r||r[3]&&i.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!i||this.rules.inline.punctuation.exec(i))){let o=[...r[0]].length-1,s,a,l=o,c=0,h=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(h.lastIndex=0,e=e.slice(-1*t.length+o);(r=h.exec(e))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(a=[...s].length,r[3]||r[4]){l+=a;continue}else if((r[5]||r[6])&&o%3&&!((o+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let u=[...r[0]][0].length,f=t.slice(0,o+r.index+u+a);if(Math.min(o,a)%2){let g=f.slice(1,-1);return{type:"em",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}let m=f.slice(2,-2);return{type:"strong",raw:f,text:m,tokens:this.lexer.inlineTokens(m)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let i=e[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(i),o=this.rules.other.startingSpaceChar.test(i)&&this.rules.other.endingSpaceChar.test(i);return r&&o&&(i=i.substring(1,i.length-1)),{type:"codespan",raw:e[0],text:i}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t,e,i=""){let r=this.rules.inline.delLDelim.exec(t);if(r&&(!r[1]||!i||this.rules.inline.punctuation.exec(i))){let o=[...r[0]].length-1,s,a,l=o,c=this.rules.inline.delRDelim;for(c.lastIndex=0,e=e.slice(-1*t.length+o);(r=c.exec(e))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s||(a=[...s].length,a!==o))continue;if(r[3]||r[4]){l+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l);let h=[...r[0]][0].length,u=t.slice(0,o+r.index+h+a),f=u.slice(o,-o);return{type:"del",raw:u,text:f,tokens:this.lexer.inlineTokens(f)}}}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let i,r;return e[2]==="@"?(i=e[1],r="mailto:"+i):(i=e[1],r=i),{type:"link",raw:e[0],text:i,href:r,tokens:[{type:"text",raw:i,text:i}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let i,r;if(e[2]==="@")i=e[0],r="mailto:"+i;else{let o;do o=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(o!==e[0]);i=e[0],e[1]==="www."?r="http://"+e[0]:r=e[0]}return{type:"link",raw:e[0],text:i,href:r,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let i=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:i}}}},ge=class fa{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Wi,this.options.tokenizer=this.options.tokenizer||new Ko,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let i={other:Dt,block:vo.normal,inline:Ir.normal};this.options.pedantic?(i.block=vo.pedantic,i.inline=Ir.pedantic):this.options.gfm&&(i.block=vo.gfm,this.options.breaks?i.inline=Ir.breaks:i.inline=Ir.gfm),this.tokenizer.rules=i}static get rules(){return{block:vo,inline:Ir}}static lex(e,i){return new fa(i).lex(e)}static lexInline(e,i){return new fa(i).inlineTokens(e)}lex(e){e=e.replace(Dt.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let i=0;i<this.inlineQueue.length;i++){let r=this.inlineQueue[i];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,i=[],r=!1){for(this.options.pedantic&&(e=e.replace(Dt.tabCharGlobal,"    ").replace(Dt.spaceLine,""));e;){let o;if(this.options.extensions?.block?.some(a=>(o=a.call({lexer:this},e,i))?(e=e.substring(o.raw.length),i.push(o),!0):!1))continue;if(o=this.tokenizer.space(e)){e=e.substring(o.raw.length);let a=i.at(-1);o.raw.length===1&&a!==void 0?a.raw+=`
`:i.push(o);continue}if(o=this.tokenizer.code(e)){e=e.substring(o.raw.length);let a=i.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+o.raw,a.text+=`
`+o.text,this.inlineQueue.at(-1).src=a.text):i.push(o);continue}if(o=this.tokenizer.fences(e)){e=e.substring(o.raw.length),i.push(o);continue}if(o=this.tokenizer.heading(e)){e=e.substring(o.raw.length),i.push(o);continue}if(o=this.tokenizer.hr(e)){e=e.substring(o.raw.length),i.push(o);continue}if(o=this.tokenizer.blockquote(e)){e=e.substring(o.raw.length),i.push(o);continue}if(o=this.tokenizer.list(e)){e=e.substring(o.raw.length),i.push(o);continue}if(o=this.tokenizer.html(e)){e=e.substring(o.raw.length),i.push(o);continue}if(o=this.tokenizer.def(e)){e=e.substring(o.raw.length);let a=i.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+o.raw,a.text+=`
`+o.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},i.push(o));continue}if(o=this.tokenizer.table(e)){e=e.substring(o.raw.length),i.push(o);continue}if(o=this.tokenizer.lheading(e)){e=e.substring(o.raw.length),i.push(o);continue}let s=e;if(this.options.extensions?.startBlock){let a=1/0,l=e.slice(1),c;this.options.extensions.startBlock.forEach(h=>{c=h.call({lexer:this},l),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(s=e.substring(0,a+1))}if(this.state.top&&(o=this.tokenizer.paragraph(s))){let a=i.at(-1);r&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+o.raw,a.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):i.push(o),r=s.length!==e.length,e=e.substring(o.raw.length);continue}if(o=this.tokenizer.text(e)){e=e.substring(o.raw.length);let a=i.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+o.raw,a.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):i.push(o);continue}if(e){let a="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,i}inline(e,i=[]){return this.inlineQueue.push({src:e,tokens:i}),i}inlineTokens(e,i=[]){let r=e,o=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)c.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,l="";for(;e;){a||(l=""),a=!1;let c;if(this.options.extensions?.inline?.some(u=>(c=u.call({lexer:this},e,i))?(e=e.substring(c.raw.length),i.push(c),!0):!1))continue;if(c=this.tokenizer.escape(e)){e=e.substring(c.raw.length),i.push(c);continue}if(c=this.tokenizer.tag(e)){e=e.substring(c.raw.length),i.push(c);continue}if(c=this.tokenizer.link(e)){e=e.substring(c.raw.length),i.push(c);continue}if(c=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(c.raw.length);let u=i.at(-1);c.type==="text"&&u?.type==="text"?(u.raw+=c.raw,u.text+=c.text):i.push(c);continue}if(c=this.tokenizer.emStrong(e,r,l)){e=e.substring(c.raw.length),i.push(c);continue}if(c=this.tokenizer.codespan(e)){e=e.substring(c.raw.length),i.push(c);continue}if(c=this.tokenizer.br(e)){e=e.substring(c.raw.length),i.push(c);continue}if(c=this.tokenizer.del(e,r,l)){e=e.substring(c.raw.length),i.push(c);continue}if(c=this.tokenizer.autolink(e)){e=e.substring(c.raw.length),i.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(e))){e=e.substring(c.raw.length),i.push(c);continue}let h=e;if(this.options.extensions?.startInline){let u=1/0,f=e.slice(1),m;this.options.extensions.startInline.forEach(g=>{m=g.call({lexer:this},f),typeof m=="number"&&m>=0&&(u=Math.min(u,m))}),u<1/0&&u>=0&&(h=e.substring(0,u+1))}if(c=this.tokenizer.inlineText(h)){e=e.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),a=!0;let u=i.at(-1);u?.type==="text"?(u.raw+=c.raw,u.text+=c.text):i.push(c);continue}if(e){let u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return i}},Go=class{options;parser;constructor(t){this.options=t||Wi}space(t){return""}code({text:t,lang:e,escaped:i}){let r=(e||"").match(Dt.notSpaceStart)?.[0],o=t.replace(Dt.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Ee(r)+'">'+(i?o:Ee(o,!0))+`</code></pre>
`:"<pre><code>"+(i?o:Ee(o,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,i=t.start,r="";for(let a=0;a<t.items.length;a++){let l=t.items[a];r+=this.listitem(l)}let o=e?"ol":"ul",s=e&&i!==1?' start="'+i+'"':"";return"<"+o+s+`>
`+r+"</"+o+`>
`}listitem(t){return`<li>${this.parser.parse(t.tokens)}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",i="";for(let o=0;o<t.header.length;o++)i+=this.tablecell(t.header[o]);e+=this.tablerow({text:i});let r="";for(let o=0;o<t.rows.length;o++){let s=t.rows[o];i="";for(let a=0;a<s.length;a++)i+=this.tablecell(s[a]);r+=this.tablerow({text:i})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+r+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),i=t.header?"th":"td";return(t.align?`<${i} align="${t.align}">`:`<${i}>`)+e+`</${i}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${Ee(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:i}){let r=this.parser.parseInline(i),o=Zn(t);if(o===null)return r;t=o;let s='<a href="'+t+'"';return e&&(s+=' title="'+Ee(e)+'"'),s+=">"+r+"</a>",s}image({href:t,title:e,text:i,tokens:r}){r&&(i=this.parser.parseInline(r,this.parser.textRenderer));let o=Zn(t);if(o===null)return Ee(i);t=o;let s=`<img src="${t}" alt="${Ee(i)}"`;return e&&(s+=` title="${Ee(e)}"`),s+=">",s}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:Ee(t.text)}},on=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},be=class ma{options;renderer;textRenderer;constructor(e){this.options=e||Wi,this.options.renderer=this.options.renderer||new Go,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new on}static parse(e,i){return new ma(i).parse(e)}static parseInline(e,i){return new ma(i).parseInline(e)}parse(e){let i="";for(let r=0;r<e.length;r++){let o=e[r];if(this.options.extensions?.renderers?.[o.type]){let a=o,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){i+=l||"";continue}}let s=o;switch(s.type){case"space":{i+=this.renderer.space(s);break}case"hr":{i+=this.renderer.hr(s);break}case"heading":{i+=this.renderer.heading(s);break}case"code":{i+=this.renderer.code(s);break}case"table":{i+=this.renderer.table(s);break}case"blockquote":{i+=this.renderer.blockquote(s);break}case"list":{i+=this.renderer.list(s);break}case"checkbox":{i+=this.renderer.checkbox(s);break}case"html":{i+=this.renderer.html(s);break}case"def":{i+=this.renderer.def(s);break}case"paragraph":{i+=this.renderer.paragraph(s);break}case"text":{i+=this.renderer.text(s);break}default:{let a='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return i}parseInline(e,i=this.renderer){let r="";for(let o=0;o<e.length;o++){let s=e[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let a=s;switch(a.type){case"escape":{r+=i.text(a);break}case"html":{r+=i.html(a);break}case"link":{r+=i.link(a);break}case"image":{r+=i.image(a);break}case"checkbox":{r+=i.checkbox(a);break}case"strong":{r+=i.strong(a);break}case"em":{r+=i.em(a);break}case"codespan":{r+=i.codespan(a);break}case"br":{r+=i.br(a);break}case"del":{r+=i.del(a);break}case"text":{r+=i.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},Vr=class{options;block;constructor(t){this.options=t||Wi}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?ge.lex:ge.lexInline}provideParser(){return this.block?be.parse:be.parseInline}},Ou=class{defaults=Xa();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=be;Renderer=Go;TextRenderer=on;Lexer=ge;Tokenizer=Ko;Hooks=Vr;constructor(...t){this.use(...t)}walkTokens(t,e){let i=[];for(let r of t)switch(i=i.concat(e.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)i=i.concat(this.walkTokens(s.tokens,e));for(let s of o.rows)for(let a of s)i=i.concat(this.walkTokens(a.tokens,e));break}case"list":{let o=r;i=i.concat(this.walkTokens(o.items,e));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let a=o[s].flat(1/0);i=i.concat(this.walkTokens(a,e))}):o.tokens&&(i=i.concat(this.walkTokens(o.tokens,e)))}}return i}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(i=>{let r={...i};if(r.async=this.defaults.async||r.async||!1,i.extensions&&(i.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=e.renderers[o.name];s?e.renderers[o.name]=function(...a){let l=o.renderer.apply(this,a);return l===!1&&(l=s.apply(this,a)),l}:e.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=e[o.level];s?s.unshift(o.tokenizer):e[o.level]=[o.tokenizer],o.start&&(o.level==="block"?e.startBlock?e.startBlock.push(o.start):e.startBlock=[o.start]:o.level==="inline"&&(e.startInline?e.startInline.push(o.start):e.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(e.childTokens[o.name]=o.childTokens)}),r.extensions=e),i.renderer){let o=this.defaults.renderer||new Go(this.defaults);for(let s in i.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let a=s,l=i.renderer[a],c=o[a];o[a]=(...h)=>{let u=l.apply(o,h);return u===!1&&(u=c.apply(o,h)),u||""}}r.renderer=o}if(i.tokenizer){let o=this.defaults.tokenizer||new Ko(this.defaults);for(let s in i.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let a=s,l=i.tokenizer[a],c=o[a];o[a]=(...h)=>{let u=l.apply(o,h);return u===!1&&(u=c.apply(o,h)),u}}r.tokenizer=o}if(i.hooks){let o=this.defaults.hooks||new Vr;for(let s in i.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let a=s,l=i.hooks[a],c=o[a];Vr.passThroughHooks.has(s)?o[a]=h=>{if(this.defaults.async&&Vr.passThroughHooksRespectAsync.has(s))return(async()=>{let f=await l.call(o,h);return c.call(o,f)})();let u=l.call(o,h);return c.call(o,u)}:o[a]=(...h)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(o,h);return f===!1&&(f=await c.apply(o,h)),f})();let u=l.apply(o,h);return u===!1&&(u=c.apply(o,h)),u}}r.hooks=o}if(i.walkTokens){let o=this.defaults.walkTokens,s=i.walkTokens;r.walkTokens=function(a){let l=[];return l.push(s.call(this,a)),o&&(l=l.concat(o.call(this,a))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return ge.lex(t,e??this.defaults)}parser(t,e){return be.parse(t,e??this.defaults)}parseMarkdown(t){return(e,i)=>{let r={...i},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=t),o.async)return(async()=>{let a=o.hooks?await o.hooks.preprocess(e):e,l=await(o.hooks?await o.hooks.provideLexer():t?ge.lex:ge.lexInline)(a,o),c=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(c,o.walkTokens));let h=await(o.hooks?await o.hooks.provideParser():t?be.parse:be.parseInline)(c,o);return o.hooks?await o.hooks.postprocess(h):h})().catch(s);try{o.hooks&&(e=o.hooks.preprocess(e));let a=(o.hooks?o.hooks.provideLexer():t?ge.lex:ge.lexInline)(e,o);o.hooks&&(a=o.hooks.processAllTokens(a)),o.walkTokens&&this.walkTokens(a,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():t?be.parse:be.parseInline)(a,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(a){return s(a)}}}onError(t,e){return i=>{if(i.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let r="<p>An error occurred:</p><pre>"+Ee(i.message+"",!0)+"</pre>";return e?Promise.resolve(r):r}if(e)return Promise.reject(i);throw i}}},Pi=new Ou;function j(t,e){return Pi.parse(t,e)}j.options=j.setOptions=function(t){return Pi.setOptions(t),j.defaults=Pi.defaults,ac(j.defaults),j};j.getDefaults=Xa;j.defaults=Wi;j.use=function(...t){return Pi.use(...t),j.defaults=Pi.defaults,ac(j.defaults),j};j.walkTokens=function(t,e){return Pi.walkTokens(t,e)};j.parseInline=Pi.parseInline;j.Parser=be;j.parser=be.parse;j.Renderer=Go;j.TextRenderer=on;j.Lexer=ge;j.lexer=ge.lex;j.Tokenizer=Ko;j.Hooks=Vr;j.parse=j;j.options;j.setOptions;j.use;j.walkTokens;j.parseInline;be.parse;ge.lex;const wc=(t,e)=>{const i=new wt.subtle.Watcher(async()=>{try{await 0,e(t.get())}finally{i.watch(t)}});return i.watch(t),t.get(),()=>{i.unwatch(t)}};Object.defineProperty(Di.prototype,"model",{enumerable:!0,configurable:!0,writable:!0});const Iu=Ch(Di);class co extends Iu{constructor(){super(...arguments),this.signalCleanups=new Set,this.eventSubscriptions=new Set}connectedCallback(){super.connectedCallback(),this.doBeforeUI()}disconnectedCallback(){super.disconnectedCallback(),this.eventSubscriptions.forEach(e=>Xd(e)),this.eventSubscriptions.clear(),this.signalCleanups.forEach(e=>e()),this.signalCleanups.clear()}subscribe(e,i){const r=It(e,i.bind(this));this.eventSubscriptions.add(r)}showInfo(e){oi(e)}showError(e){At(e)}nobubble(e){return i=>{i.stopPropagation(),e.bind(this)(i)}}command(e,i={}){return()=>{this.executeCommand(e,i)}}executeCommand(e,i){const r=li.createExecutionContext(i);li.execute(e,r)}watch(e,i){const r=wc(e,i.bind(this));this.signalCleanups.add(r)}firstUpdated(e){super.firstUpdated(e),this.doInitUI()}updateIdle(){requestIdleCallback(()=>this.requestUpdate())}updateLater(){requestAnimationFrame(()=>this.requestUpdate())}doBeforeUI(){}doInitUI(){}withRefresh(e){e(),this.updateLater()}}class Ci extends co{constructor(){super(...arguments),this.settingsKey=null}buildDOMTreePath(){const e=[];let i=this;for(;i&&i!==document.body&&i!==document.documentElement;){const r=i.getAttribute("id");if(r){e.unshift(`#${r}`);break}const o=i.tagName.toLowerCase(),s=i.parentElement;if(!s)break;const l=Array.from(s.children).filter(c=>c.tagName.toLowerCase()===o).indexOf(i);l>=0?e.unshift(`${o}:${l}`):e.unshift(o),i=s}return e.length>0?e.join(" > "):null}initializeSettingsKey(){if(!this.settingsKey){const e=this.tagName.toLowerCase(),i=this.getAttribute("id");if(i){this.settingsKey=`${e}:${i}`;return}const r=this.buildDOMTreePath();r&&(this.settingsKey=`${e}:${r}`)}}async getDialogSetting(){if(this.initializeSettingsKey(),!!this.settingsKey)return await ct.getDialogSetting(this.settingsKey)}async setDialogSetting(e){this.initializeSettingsKey(),this.settingsKey&&await ct.setDialogSetting(this.settingsKey,e)}}const Cn=class Cn extends Ci{dispose(){}getResult(){}renderMessage(e,i=!1){if(i){const r=j.parse(e,{async:!1});return p`<div class="dialog-message" style="white-space: normal;">${We(r)}</div>`}return p`<div class="dialog-message" style="white-space: pre-line;">${e}</div>`}};Cn.styles=[C`
            .dialog-message {
                margin-bottom: 0.5rem;
                color: var(--wa-color-text-normal);
            }
        `];let je=Cn;const Ai=Qe("DialogService"),cr="dialogs",ws={id:"ok",label:"OK",variant:"primary"},vc={id:"cancel",label:"Cancel",variant:"default"},Pu={id:"close",label:"Close",variant:"default"};let Qi=null;function Mu(){return(!Qi||!document.body.contains(Qi))&&(Qi=document.createElement("div"),Qi.id="global-dialog-container",document.body.appendChild(Qi)),Qi}class Nu{constructor(){this.contributions=new Map,this.contributionsChangeScheduled=!1,this.loadContributions(),It(we,e=>{e.target===cr&&(this.contributionsChangeScheduled||(this.contributionsChangeScheduled=!0,queueMicrotask(()=>{this.contributionsChangeScheduled=!1,this.loadContributions()})))})}loadContributions(){const e=H.getContributions(cr);this.contributions.clear();for(const i of e){if(!i.id){Ai.warn("Dialog contribution missing id, skipping");continue}if(!i.component){Ai.warn(`Dialog contribution "${i.id}" has no component function, skipping`);continue}if(!i.onButton){Ai.warn(`Dialog contribution "${i.id}" has no onButton callback, skipping`);continue}this.contributions.set(i.id,i)}}async open(e,i){const r=this.contributions.get(e);if(!r)throw Ai.error(`Dialog "${e}" not found`),new Error(`Dialog "${e}" not found`);return new Promise(o=>{const s=Mu();let a=!0,l=null;const c=async()=>{if(a){if(a=!1,l)try{await l.dispose()}catch(g){const b=g instanceof Error?g.message:String(g);Ai.error(`Error disposing dialog content for "${e}": ${b}`)}try{const g=l?l.getResult():void 0;await r.onButton("close",g,f)}catch(g){const b=g instanceof Error?g.message:String(g);Ai.error(`Error executing close callback for dialog "${e}": ${b}`)}ae(p``,s),o()}},h=async g=>{try{const b=l?l.getResult():void 0;await r.onButton(g,b,f)!==!1&&c()}catch(b){const y=b instanceof Error?b.message:String(b);Ai.error(`Error executing button callback for dialog "${e}": ${y}`),c()}},u=r.buttons&&r.buttons.length>0?r.buttons:[ws];i&&typeof i=="object"&&(i.close=c);const f={...i,close:c},m=p`
                <wa-dialog label="${r.label||e}" open @wa-request-close=${c}>
                    <style>
                        .dialog-service-content {
                            display: flex;
                            flex-direction: column;
                            gap: 1rem;
                            padding: 1rem;
                            min-width: 400px;
                        }
                        
                        .dialog-service-footer {
                            display: flex;
                            gap: 0.5rem;
                            justify-content: flex-end;
                            margin-top: 1rem;
                            padding-top: 1rem;
                            border-top: 1px solid var(--wa-color-neutral-20);
                        }

                        :host-context(.wa-light) .dialog-service-footer {
                            border-top-color: var(--wa-color-neutral-80);
                        }
                    </style>
                    
                    <div class="dialog-service-content" 
                         @dialog-ok=${()=>{const g=u.find(b=>b.id==="ok");g&&h(g.id)}}
                         @dialog-cancel=${()=>{const g=u.find(b=>b.id==="cancel");g?h(g.id):c()}}>
                        ${r.component(i)}
                        
                        <div class="dialog-service-footer">
                            ${u.map(g=>p`
                                <wa-button 
                                    variant="${g.variant||"default"}"
                                    ?disabled=${g.disabled}
                                    @click=${()=>h(g.id)}
                                >
                                    ${g.label}
                                </wa-button>
                            `)}
                        </div>
                    </div>
                </wa-dialog>
            `;ae(m,s),(async()=>{const g=Array.from(s.querySelectorAll("*"));for(const b of g)if(b instanceof je){await b.updateComplete,l=b;break}})()})}getDialogIds(){return Array.from(this.contributions.keys())}hasDialog(e){return this.contributions.has(e)}}const sn=new Nu;$t.put("dialogService",sn);class an extends Ci{}const v=t=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};const Fu={attribute:!0,type:String,converter:Mo,reflect:!1,hasChanged:Pa},Bu=(t=Fu,e,i)=>{const{kind:r,metadata:o}=i;let s=globalThis.litPropertyMetadata.get(o);if(s===void 0&&globalThis.litPropertyMetadata.set(o,s=new Map),r==="setter"&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),r==="accessor"){const{name:a}=i;return{set(l){const c=e.get.call(this);e.set.call(this,l),this.requestUpdate(a,c,t,!0,l)},init(l){return l!==void 0&&this.C(a,void 0,t,l),l}}}if(r==="setter"){const{name:a}=i;return function(l){const c=this[a];e.call(this,l),this.requestUpdate(a,c,t,!0,l)}}throw Error("Unsupported decorator location: "+r)};function d(t){return(e,i)=>typeof i=="object"?Bu(t,e,i):((r,o,s)=>{const a=o.hasOwnProperty(s);return o.constructor.createProperty(s,r),a?Object.getOwnPropertyDescriptor(o,s):void 0})(t,e,i)}function w(t){return d({...t,state:!0,attribute:!1})}function vs(t){return(e,i)=>{const r=typeof e=="function"?e:e[i];Object.assign(r,t)}}const yc=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,i),i);function x(t,e){return(i,r,o)=>{const s=a=>a.renderRoot?.querySelector(t)??null;return yc(i,r,{get(){return s(this)}})}}function Uu(t){return(e,i)=>yc(e,i,{async get(){return await this.updateComplete,this.renderRoot?.querySelector(t)??null}})}var Vu=Object.defineProperty,qu=(t,e,i,r)=>{for(var o=void 0,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=a(e,i,o)||o);return o&&Vu(e,i,o),o};class Qt extends an{constructor(){super(...arguments),this.dirty=!1,this.isEditor=!1}getCommandStack(){return this.commandStack}renderToolbar(){return R}updateToolbar(){this.dispatchEvent(new CustomEvent("part-toolbar-changed",{bubbles:!0,composed:!0}))}activateContainingTab(){let e=this,i=null,r=null;for(;e;){const o=e.tagName?.toLowerCase();if(o==="wa-tab-panel"&&(i=e.getAttribute("name")),o==="lyra-tabs"){r=e;break}const s=e.parentElement;if(s)e=s;else{const a=e.getRootNode();e=a instanceof ShadowRoot?a.host:null}}r&&i!=null&&i!==""&&r.activate(i)}renderContextMenu(){return R}updateContextMenu(){this.dispatchEvent(new CustomEvent("part-contextmenu-changed",{bubbles:!0,composed:!0}))}updated(e){super.updated(e),e.has("dirty")&&e.get("dirty")!==void 0&&this.dispatchEvent(new CustomEvent("dirty",{detail:this.dirty,bubbles:!0}))}doClose(){}disconnectedCallback(){super.disconnectedCallback()}close(){this.doClose()}connectedCallback(){super.connectedCallback()}save(){}isDirty(){return this.dirty}markDirty(e){this.dirty=e,ca.set(null),ca.set(this),ee.set(null),ee.set(this)}}qu([d()],Qt.prototype,"dirty");const te="events/filesys/workspaceChanged",ti="events/filesys/workspaceConnected",Nt=Qe("WorkspaceService");class xc{constructor(){this.state={}}getWorkspacePath(){const e=[];let i=this,r;for(;i;){e.push(i.getName());const s=i.getParent();s||(r=i),i=s}e.reverse();const o=typeof Y?.getWorkspaceSync=="function"?Y.getWorkspaceSync():void 0;if(o&&r&&"isDirectChild"in o&&typeof o.isDirectChild=="function"&&o.isDirectChild(r)){const s=o.getFolderNameForDirectory(r);if(s&&e.length>0)return e.length>1?s+"/"+e.slice(1).join("/"):s}return e.shift(),e.join("/")}getWorkspace(){let e=this;for(;e;){const i=e.getParent();if(i)e=i;else break}return e}}var nn=(t=>(t[t.TEXT=0]="TEXT",t[t.BINARY=1]="BINARY",t))(nn||{}),kc=(t=>(t[t.BASE64=0]="BASE64",t))(kc||{});class qe extends xc{}class Re extends xc{}class Hu extends Re{constructor(e,i="/"){super(),this.displayName=i,this.entriesByName=new Map(e.map(r=>[r.getName(),r]))}getFolderNameForDirectory(e){for(const[i,r]of this.entriesByName)if(r===e)return i}isDirectChild(e){return this.getFolderNameForDirectory(e)!==void 0}getName(){return this.displayName}getParent(){}async listChildren(e){return Array.from(this.entriesByName.values())}async getResource(e,i){if(!e||!e.trim())return null;const r=e.indexOf("/"),o=r>=0?e.slice(0,r).trim():e.trim(),s=r>=0?e.slice(r+1).trim():"",a=this.entriesByName.get(o);return a?s?a.getResource(s,i):a:null}touch(){for(const e of this.entriesByName.values())e.touch()}async delete(e,i){throw new Error("Delete not supported on workspace root")}async copyTo(e){throw new Error("Copy not supported on workspace root")}async rename(e){throw new Error("Rename not supported on workspace root")}getFolderByName(e){return this.entriesByName.get(e)}}const tl="workspace_data",ls=class ls{constructor(){this._currentWorkspace=void 0,this.folders=[],this.contributions=new Map;let e;this.initPromise=new Promise(i=>{e=i}),this.loadPersistedWorkspace(e)}getWorkspaceSync(){return this._currentWorkspace}registerContribution(e){this.contributions.set(e.type,e)}getContributions(){return Array.from(this.contributions.values())}async loadPersistedWorkspace(e){Nt.debug("Restoring workspace from persistence");try{const i=await Ae.getObject(tl);if(i||(this.workspace=Promise.resolve(void 0),this._currentWorkspace=void 0),i?.folders&&Array.isArray(i.folders)&&i.folders.length>0){const r=i.folders.map(s=>({type:s.type,data:s.data}));await this.resolveFolders(r);const o=this.buildComposite();this.workspace=Promise.resolve(o),this._currentWorkspace=o??void 0,o&&(F(ti,o),Nt.debug("Workspace restored from persisted folders")),e();return}if(i&&i.type&&i.data!==void 0){const r=this.contributions.get(i.type);if(r?.restore)try{const o=await r.restore(i.data);if(o){this.folders=[{type:i.type,data:i.data,directory:o}];const s=this.buildComposite();this.workspace=Promise.resolve(s),this._currentWorkspace=s??void 0,this.currentType=i.type,await this.persistFolders(),F(ti,s),Nt.debug("Workspace restored from legacy format")}}catch(o){Nt.error("Failed to restore legacy workspace:",o)}}this.workspace||(this.workspace=Promise.resolve(void 0),this._currentWorkspace=void 0),e()}finally{if(this.folders.length===0)try{await this.connectFolder({indexeddb:!0,name:ls.DEFAULT_INDEXEDDB_FOLDER_NAME}),Nt.debug("Connected default IndexedDB workspace")}catch(i){Nt.warn("Failed to connect default IndexedDB folder",i)}}}async resolveFolders(e){this.folders=[];for(const i of e){const r=this.contributions.get(i.type);if(r?.restore)try{const o=await r.restore(i.data);o&&this.folders.push({type:i.type,data:i.data,directory:o})}catch(o){Nt.warn(`Failed to restore folder (${i.type}):`,o)}}}buildComposite(){if(this.folders.length!==0)return new Hu(this.folders.map(e=>e.directory))}async persistFolders(){const e=this.folders.length>0?{folders:this.folders.map(i=>({type:i.type,data:i.data}))}:null;await Ae.persistObject(tl,e),await Ae.persistObject("workspace",null),Nt.debug(`Persisted ${this.folders.length} folder(s)`)}async getFolders(){return await this.initPromise,this.folders.map(e=>({name:e.directory.getName(),type:e.type}))}async getFolderInfoForDirectory(e){await this.initPromise;const i=this.folders.find(a=>a.directory===e);if(!i)return;const r=i.data&&typeof i.data=="object"&&i.data.name||i.directory.getName(),s=this.contributions.get(i.type)?.name??i.type;return{name:r,type:i.type,backendName:s}}async updateFolderName(e,i){await this.initPromise;const r=this.folders.find(s=>s.directory===e);if(!r)return;r.data&&typeof r.data=="object"?r.data={...r.data,name:i}:r.data={name:i},await this.persistFolders();const o=this.buildComposite();this.workspace=Promise.resolve(o),this._currentWorkspace=o??void 0,F(ti,o),Nt.debug(`Updated folder name: ${i}`)}async connectFolder(e){await this.initPromise;const i=Array.from(this.contributions.values()).find(c=>c.canHandle(e));if(!i)throw new Error("No workspace contribution can handle this input");const r=e?.name??i.type;Nt.debug(`Connecting workspace: ${i.type}, ${r}`);const o=await i.connect(e),s=i.persist?await i.persist(o):e;this.folders.push({type:i.type,data:s,directory:o}),await this.persistFolders(),this.currentType=this.folders.length===1?i.type:void 0;const a=this.buildComposite();this.workspace=Promise.resolve(a),this._currentWorkspace=a,F(ti,a);const l=o.getName();return Nt.info(`Workspace connected: ${i.type} (${l})`),a}async disconnectFolder(e){await this.initPromise;const i=this.folders.findIndex(s=>s.directory===e);if(i<0)return;const r=this.folders[i];Nt.debug(`Disconnecting folder: ${r.directory.getName()} (${r.type})`),this.folders.splice(i,1),await this.persistFolders(),this.folders.length>0?this.currentType=this.folders[0].type:(this.currentType=void 0,Nt.info("Workspace disconnected"));const o=this.buildComposite();this.workspace=Promise.resolve(o),this._currentWorkspace=o??void 0,F(ti,o)}async connectWorkspace(e){return this.connectFolder(e)}async getWorkspace(){if(await this.initPromise,!this.workspace)throw new Error("No workspace connected.");return await this.workspace}isConnected(){return this.folders.length>0}getWorkspaceType(){return this.currentType}async disconnectWorkspace(){await this.initPromise,this.workspace=Promise.resolve(void 0),this._currentWorkspace=void 0,this.folders=[],this.currentType=void 0,await this.persistFolders(),F(ti,void 0),Nt.info("Workspace disconnected")}};ls.DEFAULT_INDEXEDDB_FOLDER_NAME="My Folder";let ga=ls;const Y=new ga;$t.put("workspaceService",Y);class ba extends qe{constructor(e,i){super(),this.fileHandle=e,this.parent=i}getName(){return this.fileHandle.name}getParent(){return this.parent}async delete(){return this.getParent().delete(this.getName())}async getContents(e){const i=await this.fileHandle.getFile();return!e||e?.contentType==nn.TEXT?await i.text():e?.encoding==kc.BASE64||e?.uri?URL.createObjectURL(i):e?.blob?i:i.stream()}async size(){try{return(await this.fileHandle.getFile()).size}catch{return null}}async saveContents(e,i){const r=await this.fileHandle.createWritable();if(e&&typeof e.pipeTo=="function")await e.pipeTo(r);else{const o=r.getWriter();try{await o.write(e)}finally{await o.close()}}}async copyTo(e){const i=await this.getContents({blob:!0});await(await this.getWorkspace().getResource(e,{create:!0})).saveContents(i)}async rename(e){const i=this.getParent();if(!i)throw new Error("Cannot rename root resource");if(this.getName()!==e){if(!("move"in this.fileHandle)||typeof this.fileHandle.move!="function")throw new Error("File rename not supported in this browser. Please use a browser with File System Access API move() support.");try{await this.fileHandle.move(e)}catch(r){throw r.name==="NotAllowedError"||r.message?.includes("not allowed")||r.message?.includes("user agent")?new Error("File rename failed: The operation took too long and user activation expired. Please try again."):r}await i.listChildren(!0),F(te,Y.getWorkspaceSync()??this.getWorkspace())}}}class ze extends Re{constructor(e,i){super(),this.dirHandle=e,this.parent=i}getHandle(){return this.dirHandle}getParent(){return this.parent}getName(){return this.dirHandle.name}async listChildren(e=!1){return e||!this.files?this.loadingPromise?this.loadingPromise:(this.loadingPromise=(async()=>{try{const i={};try{for await(const r of this.dirHandle.values()){const s=r.kind==="file"?new ba(r,this):new ze(r,this);i[s.getName()]=s}}catch(r){if(r.name==="NotFoundError")return this.files={},[];throw r}return this.files=i,Object.values(this.files)}finally{this.loadingPromise=void 0}})(),this.loadingPromise):Object.values(this.files)}async getResource(e,i){if(!e)throw new Error("No path provided");const r=e.split("/");let o=this,s=!1;try{for(let a=0;a<r.length;a++){let l=r[a];if(l&&(l=l.trim()),!l)break;if(o instanceof ze){if(await o.listChildren(),!o.files)return null;const c=o.files[l];if(c)o=c;else if(i?.create)if(s=!0,a<r.length-1)try{const h=await o.dirHandle.getDirectoryHandle(l,{create:!0}),u=new ze(h,o);o.files[l]=u,o=u,o instanceof ze&&await o.listChildren();continue}catch(h){throw h.name==="NotFoundError"?new Error(`Directory not found or not accessible: ${r.slice(0,a+1).join("/")}`):h}else try{const h=await o.dirHandle.getFileHandle(l,{create:!0}),u=new ba(h,o);return o.files[l]=u,u}catch(h){throw h.name==="NotFoundError"?new Error(`File not found or not accessible: ${r.join("/")}`):h}else return null}}}finally{s&&F(te,Y.getWorkspaceSync()??this.getWorkspace())}return o}touch(){F(te,Y.getWorkspaceSync()??this.getWorkspace())}async delete(e,i=!0){if(!e){const r=this.getParent();return r instanceof ze&&(await r.listChildren(),r.files&&delete r.files[this.getName()]),this.files=void 0,this.loadingPromise=void 0,r?.delete(this.getName())}return this.dirHandle.removeEntry(e,{recursive:i}).then(async()=>{this.files&&delete this.files[e],F(te,Y.getWorkspaceSync()??this.getWorkspace())})}async copyTo(e){for(const i of await this.listChildren()){const r=[e,i.getName()].join("/");await i.copyTo(r)}}async rename(e){const i=this.getParent();if(!i)throw new Error("Cannot rename workspace root");if(this.getName()!==e){if(!("move"in this.dirHandle)||typeof this.dirHandle.move!="function")throw new Error("Directory rename not supported in this browser. Please use a browser with File System Access API move() support.");try{await this.dirHandle.move(e)}catch(r){throw r.name==="NotAllowedError"||r.message?.includes("not allowed")||r.message?.includes("user agent")?new Error("Directory rename failed: The operation took too long and user activation expired. Please try again."):r}await i.listChildren(!0),F(te,Y.getWorkspaceSync()??this.getWorkspace())}}}Y.registerContribution({type:"filesystem",name:"fs",canHandle(t){return t&&"kind"in t&&t.kind==="directory"},async connect(t){return new ze(t)},async restore(t){if(t&&"kind"in t&&t.kind==="directory")return new ze(t,void 0)},async persist(t){return t instanceof ze?t.getHandle():null}});const el=Object.freeze(Object.defineProperty({__proto__:null,FileSysDirHandleResource:ze,FileSysFileHandleResource:ba},Symbol.toStringTag,{value:"Module"})),Wu=".opfs";async function il(){if(typeof navigator>"u"||!navigator.storage?.getDirectory)throw new Error("OPFS is not available in this environment");return await navigator.storage.getDirectory()}class Bs extends Re{constructor(e){super(),this.inner=e}getName(){return Wu}getParent(){return this.inner.getParent()}async listChildren(e){return this.inner.listChildren(e)}async getResource(e,i){return this.inner.getResource(e,i)}touch(){this.inner.touch()}async delete(e,i){return this.inner.delete(e,i)}async copyTo(e){return this.inner.copyTo(e)}async rename(e){return this.inner.rename(e)}}Y.registerContribution({type:"opfs",name:"opfs",canHandle(t){return t&&typeof t=="object"&&t.opfs===!0},async connect(t){const e=await il(),r=(await Ot(()=>Promise.resolve().then(()=>el),[])).FileSysDirHandleResource,o=new r(e);return new Bs(o)},async restore(t){if(t&&typeof t=="object"&&t.opfs===!0){const e=await il(),r=(await Ot(()=>Promise.resolve().then(()=>el),void 0)).FileSysDirHandleResource,o=new r(e);return new Bs(o)}},async persist(t){return t instanceof Bs?{opfs:!0}:null}});const ju="eclipse-lyra-workspace-idb",Ut="files";let Us=null;async function hi(){if(typeof indexedDB>"u")throw new Error("IndexedDB is not available in this environment");return Us||(Us=new Promise((t,e)=>{const i=indexedDB.open(ju,1);i.onerror=()=>e(i.error),i.onsuccess=()=>t(i.result),i.onupgradeneeded=r=>{const o=r.target.result;o.objectStoreNames.contains(Ut)||o.createObjectStore(Ut)}})),Us}async function Ku(){const t="IndexedDB",e=await Y.getFolders(),i=new Set(e.filter(o=>o.type==="indexeddb").map(o=>o.name));if(!i.has(t))return t;let r=1;for(;i.has(`${t} (${r})`);)r+=1;return`${t} (${r})`}function dr(t){return t?t.split("/").filter(Boolean).join("/"):""}function qr(t,e){const i=dr(t),r=dr(e);return i?r?`${i}/${r}`:i:r}function hr(t,e){const i=dr(e);return i?`${t}/${i}`:t}function Gu(t,e){const i=dr(e);return i?`${t}/${i}/`:`${t}/`}async function Do(t,e){const o=(await hi()).transaction(Ut,"readonly").objectStore(Ut),s=e?hr(t,e):t;return await new Promise((a,l)=>{const c=o.get(s);c.onsuccess=()=>a(c.result),c.onerror=()=>l(c.error)})}async function Xr(t,e,i){const s=(await hi()).transaction(Ut,"readwrite").objectStore(Ut),a=e?hr(t,e):t;await new Promise((l,c)=>{const h=s.put(i,a);h.onsuccess=()=>l(),h.onerror=()=>c(h.error)})}async function rl(t,e){const o=(await hi()).transaction(Ut,"readwrite").objectStore(Ut),s=e?hr(t,e):t;await new Promise((a,l)=>{const c=o.delete(s);c.onsuccess=()=>a(),c.onerror=()=>l(c.error)})}async function Xu(t,e){const o=(await hi()).transaction(Ut,"readwrite").objectStore(Ut),s=hr(t,e),a=s+"/",l=o.openCursor();await new Promise((c,h)=>{l.onerror=()=>h(l.error),l.onsuccess=u=>{const f=u.target.result;if(!f){c();return}const m=String(f.key);(m===s||m.startsWith(a))&&f.delete(),f.continue()}})}async function Yu(t,e,i){const s=(await hi()).transaction(Ut,"readwrite").objectStore(Ut),a=hr(t,e),l=hr(t,i),c=s.openCursor(),h=[];await new Promise((u,f)=>{c.onerror=()=>f(c.error),c.onsuccess=m=>{const g=m.target.result;if(!g){u();return}const b=String(g.key);if(b===a||b.startsWith(a+"/")){const y=b.slice(a.length),E=l+y,_=g.value;h.push(()=>{g.delete(),s.put(_,E)})}g.continue()}});for(const u of h)u()}async function Zu(t,e){const o=(await hi()).transaction(Ut,"readonly").objectStore(Ut),s=Gu(t,e),a=o.openCursor(),l=new Set,c=new Map;await new Promise((u,f)=>{a.onerror=()=>f(a.error),a.onsuccess=m=>{const g=m.target.result;if(!g){u();return}const b=String(g.key),y=g.value;if(!b.startsWith(s)){g.continue();return}const E=b.slice(s.length);if(!E){g.continue();return}const _=E.indexOf("/"),A=_===-1?E:E.slice(0,_);_===-1?y.type==="dir"?l.add(A):c.set(A,y):l.add(A),g.continue()}});const h=[];for(const u of l)h.push({name:u,entry:{type:"dir"},type:"dir"});for(const[u,f]of c)l.has(u)||h.push({name:u,entry:f,type:"file"});return h}function Qu(t){return t instanceof _e?t.getRootId():""}class Vs extends qe{constructor(e,i){super(),this.path=dr(e),this.parent=i}getName(){const e=this.path.split("/");return e[e.length-1]||""}getParent(){return this.parent}getRootId(){return Qu(this.parent)}async delete(){await rl(this.getRootId(),this.path),F(te,Y.getWorkspaceSync()??this.getWorkspace())}async getContents(e){const i=await Do(this.getRootId(),this.path);let r=i?.content;if(typeof r=="string"){const s=new Blob([r],{type:i?.mimeType||"text/plain"});r=s,i&&(i.content=s,await Xr(this.getRootId(),this.path,i))}if(!e||e.contentType===nn.TEXT)return r?await r.text():"";let o;return r?o=r:o=new Blob([],{type:i?.mimeType}),e.blob?o:e.uri?URL.createObjectURL(o):o.stream()}async saveContents(e,i){let r,o;if(e instanceof Blob)r=e,o=e.type||void 0;else if(typeof e=="string")o="text/plain",r=new Blob([e],{type:o});else{const s=String(e??"");o="text/plain",r=new Blob([s],{type:o})}await Xr(this.getRootId(),this.path,{type:"file",content:r,mimeType:o}),F(te,Y.getWorkspaceSync()??this.getWorkspace())}async size(){const i=(await Do(this.getRootId(),this.path))?.content;return i?i.size:null}async copyTo(e){const i=await this.getContents({blob:!0}),r=await this.getWorkspace().getResource(e,{create:!0});if(!r)throw new Error(`Failed to create target file: ${e}`);await r.saveContents(i)}async rename(e){if(this.getName()===e)return;const i=this.getParent(),r=i instanceof _e?i.getPath():"",o=qr(r,e),s=this.getRootId(),a=await Do(s,this.path);if(!a)throw new Error("File not found in IndexedDB");await rl(s,this.path),await Xr(s,o,a),F(te,Y.getWorkspaceSync()??this.getWorkspace())}}class _e extends Re{constructor(e,i){super(),this.path=dr(e),this.parent=i}getPath(){return this.path}getName(){if(!this.path)return"";const e=this.path.split("/");return e[e.length-1]}getParent(){return this.parent}getRoot(){const e=this.getParent();return e?e.getRoot():this}getRootId(){const e=this.getRoot();return e instanceof Oo?e.getRootId():""}async listChildren(e){const i=await Zu(this.getRootId(),this.path),r=[];for(const o of i){const s=qr(this.path,o.name);o.type==="dir"?r.push(new _e(s,this)):r.push(new Vs(s,this))}return r}async getResource(e,i){if(!e)throw new Error("No path provided");const r=e.split("/").filter(s=>s.trim());let o=this;for(let s=0;s<r.length;s++){const a=r[s],l=s===r.length-1,c=o.getPath(),h=qr(c,a),u=this.getRootId(),f=await Do(u,h);if(!f){if(!i?.create)return null;if(l)return await Xr(u,h,{type:"file",content:new Blob([])}),F(te,Y.getWorkspaceSync()??this.getWorkspace()),new Vs(h,o);await Xr(u,h,{type:"dir"}),o=new _e(h,o);continue}if(l)return f.type==="dir"?new _e(h,o):new Vs(h,o);if(f.type!=="dir")return null;o=new _e(h,o)}return o}touch(){F(te,Y.getWorkspaceSync()??this.getWorkspace())}async delete(e,i=!0){if(!e){const o=this.getParent();if(o instanceof _e){await o.delete(this.getName());return}return}const r=qr(this.path,e);await Xu(this.getRootId(),r),F(te,Y.getWorkspaceSync()??this.getWorkspace())}async copyTo(e){for(const i of await this.listChildren(!1)){const r=[e,i.getName()].join("/");await i.copyTo(r)}}async rename(e){if(this.getName()===e)return;const i=this.getParent();if(!(i instanceof _e))throw new Error("Cannot rename IndexedDB root directory");const r=this.getPath(),o=qr(i.getPath(),e);await Yu(this.getRootId(),r,o),F(te,Y.getWorkspaceSync()??this.getWorkspace())}}class Oo extends _e{constructor(e,i){super(""),this.displayName=e||"IndexedDB",this.rootId=i}getRootId(){return this.rootId}getName(){return this.displayName}getParent(){}async rename(e){const i=String(e??"").trim();!i||i===this.displayName||(this.displayName=i,await Y.updateFolderName(this,i))}}function Ju(){return typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():"default-"+Math.random().toString(36).slice(2)+Date.now().toString(36)}Y.registerContribution({type:"indexeddb",name:"idb",canHandle(t){return t&&typeof t=="object"&&t.indexeddb===!0},async connect(t){await hi();const e=t.name&&String(t.name).trim(),i=e&&e.length>0?e:await Ku(),r=Ju();return new Oo(i,r)},async restore(t){if(t&&typeof t=="object"&&t.indexeddb===!0&&t.rootId){await hi();const e=t.name&&String(t.name).trim()||"IndexedDB";return new Oo(e,String(t.rootId))}},async persist(t){return t instanceof Oo?{indexeddb:!0,name:t.getName(),rootId:t.getRootId()}:null}});class tp{constructor(){this.editorInputHandlers=[],this.listenersAttached=!1,this.cachedIconContributions=null,It(ti,()=>{}),It(we,e=>{e.target==="system.icons"&&(this.cachedIconContributions=null)})}getSortedIconContributions(){if(this.cachedIconContributions!==null)return this.cachedIconContributions;const e=H.getContributions("system.icons");return this.cachedIconContributions=[...e].sort((i,r)=>{const o=i.priority??0,s=r.priority??0;return s!==o?s-o:i.label.localeCompare(r.label)}),this.cachedIconContributions}setupEventListeners(e){if(this.listenersAttached)return;this.listenersAttached=!0;const i=s=>{const a=s.detail;a&&Array.from(a.querySelectorAll("*")).filter(c=>c instanceof Qt).forEach(c=>{ee.set(c),c.isEditor&&Gr.set(c)})};e.addEventListener("tab-shown",i);const r=s=>{const a=s.detail;Array.from(a.querySelectorAll("*")).filter(c=>c instanceof Qt).forEach(c=>{ee.get()==c&&ee.set(null),Gr.get()==c&&Gr.set(null)})};e.addEventListener("tab-closed",r);const o=s=>{const l=s.closest("wa-tab-panel").getAttribute("name");e.markDirty(l,s.isDirty())};this.signalCleanup=wc(ca,o)}registerEditorInputHandler(e){this.editorInputHandlers.push({definition:e,initialized:!1}),this.editorInputHandlers.sort((i,r)=>{const o=i.definition.ranking??0;return(r.definition.ranking??0)-o})}async ensureHandlerInitialized(e){const i=e.definition;!i.lazyInit||e.initialized||(e.lazyInitPromise||(e.lazyInitPromise=Promise.resolve(i.lazyInit()).then(()=>{e.initialized=!0,e.lazyInitPromise=void 0}).catch(r=>{throw e.lazyInitPromise=void 0,r})),await e.lazyInitPromise)}getEditorOptionsForInput(e){const i=new Set,r=[];for(const o of this.editorInputHandlers){const s=o.definition;!s.canHandle(e)||i.has(s.editorId)||(i.add(s.editorId),r.push({editorId:s.editorId,title:s.label,icon:s.icon}))}return r}async handleInput(e,i){if(i!==void 0){const r=this.editorInputHandlers.find(o=>o.definition.editorId===i);if(r){await this.ensureHandlerInitialized(r);const o=await r.definition.handle(e);return o&&(o.editorId=r.definition.editorId),o}return}for(let r=0;r<this.editorInputHandlers.length;r++){const o=this.editorInputHandlers[r],s=o.definition;if(s.canHandle(e)){await this.ensureHandlerInitialized(o);const a=await s.handle(e);return a&&(a.editorId=s.editorId),a}}}getEditorArea(){return document.querySelector(`lyra-tabs#${ri}`)}async loadEditor(e,i){if(!e||("component"in e||(e=await this.handleInput(e,i)),!e||!("component"in e)))return;const r=e.editorId??i;r&&(e.editorId=r),await this.openTab({name:e.key,editorId:r,label:e.title,icon:e.icon,closable:!0,noOverflow:e.noOverflow,component:e.component})}async openTab(e){const i=this.getEditorArea();if(!i){console.error("Editor area not found. The split pane system may not be initialized yet.");return}if(this.setupEventListeners(i),i.has(e.name)){i.activate(e.name);return}i.open(e)}getFileIcon(e){const i=e.includes(".")?e.split(".").pop()?.toLowerCase()||"":e.toLowerCase(),r=this.getSortedIconContributions();if(r.length===0)return"file";for(const o of r)if(o.mappings&&o.mappings[i])return o.mappings[i];return"file"}}const ur=new tp;$t.put("editorRegistry",ur);H.registerContribution("system.icons",{label:"Default File Icons",mappings:{pdf:"file-pdf",md:"book",txt:"file-lines",ts:"code",tsx:"code",js:"code",jsx:"code",json:"file-code",geojson:"file-code",py:"python",html:"code",htm:"code",css:"code",scss:"code",sass:"code",xml:"file-code",yaml:"file-code",yml:"file-code",sql:"database",kml:"file-code",gpx:"file-code",jpg:"image",jpeg:"image",png:"image",gif:"image",svg:"image",webp:"image",bmp:"image",ico:"image"},priority:0});const Xt=Qe("MarketplaceRegistry"),ol="events/marketplaceregistry/changed",sl="marketplace.catalogUrls";class ep{constructor(){this.catalogUrls=[],this.loadingPromises=new Map,this.loadCatalogUrls().then(()=>{this.refreshCatalogs().catch(e=>{Xt.error(`Failed to refresh catalogs on init: ${e.message}`)})})}async loadCatalogUrls(){try{const e=await ct.get(sl);this.catalogUrls=Array.isArray(e)?e:[]}catch(e){Xt.error(`Failed to load catalog URLs: ${e}`),this.catalogUrls=[]}}async saveCatalogUrls(){await ct.set(sl,this.catalogUrls),F(ol,{type:"catalogs",urls:this.catalogUrls})}async addCatalogUrl(e){if(!this.isValidUrl(e))throw new Error(`Invalid catalog URL: ${e}`);if(this.catalogUrls.includes(e)){Xt.debug(`Catalog URL already exists: ${e}`);return}this.catalogUrls.push(e),await this.saveCatalogUrls(),Xt.debug(`Added catalog URL: ${e}`);try{await this.refreshCatalogs()}catch(i){Xt.warn(`Failed to refresh catalogs immediately after adding: ${i}`)}}async addCatalogUrls(e){let i=0;for(const r of e){if(!this.isValidUrl(r)){Xt.warn(`Skipping invalid catalog URL: ${r}`);continue}this.catalogUrls.includes(r)||(this.catalogUrls.push(r),Xt.debug(`Added catalog URL: ${r}`),i++)}if(i!==0){await this.saveCatalogUrls();try{await this.refreshCatalogs()}catch(r){Xt.warn(`Failed to refresh catalogs after adding URLs: ${r}`)}}}async removeCatalogUrl(e){const i=this.catalogUrls.indexOf(e);i!==-1&&(this.catalogUrls.splice(i,1),await this.saveCatalogUrls(),Xt.info(`Removed catalog URL: ${e}`))}getCatalogUrls(){return[...this.catalogUrls]}isValidUrl(e){try{const i=new URL(e);return i.protocol==="http:"||i.protocol==="https:"}catch{return!1}}async fetchCatalog(e){const i=this.loadingPromises.get(e);if(i)return i;const r=(async()=>{try{const o=await fetch(e,{method:"GET",headers:{Accept:"application/json"}});if(!o.ok)throw new Error(`HTTP ${o.status}: ${o.statusText}`);const s=await o.json();if(!s.extensions||!Array.isArray(s.extensions))throw new Error("Invalid catalog format: extensions array is required");return{name:s.name,description:s.description,extensions:s.extensions||[]}}catch(o){throw Xt.error(`Failed to fetch catalog from ${e}: ${o}`),o}finally{this.loadingPromises.delete(e)}})();return this.loadingPromises.set(e,r),r}async refreshCatalogs(){const e=this.catalogUrls.map(o=>this.fetchCatalog(o).catch(s=>(Xt.warn(`Failed to refresh catalog ${o}: ${s.message}`),null))),i=await Promise.allSettled(e);let r=0;i.forEach(o=>{if(o.status==="fulfilled"&&o.value){const s=o.value;s.extensions&&s.extensions.forEach(a=>{if(!st.getExtensions().find(l=>l.id===a.id)){const l={...a,external:!0};st.registerExtension(l),r++}})}}),Xt.debug(`Refreshed ${this.catalogUrls.length} catalogs, ${r} extensions registered`),r>0&&Xt.info(`Marketplace: ${r} new extension(s) available`),F(ol,{type:"refreshed"})}getMarketplaceExtension(e){const i=st.getExtensions().find(r=>r.id===e);if(i&&i.external)return i}isMarketplaceExtension(e){const i=st.getExtensions().find(r=>r.id===e);return i!==void 0&&i.external===!0}}const Cc=new ep;$t.put("marketplaceRegistry",Cc);var al={name:"@eclipse-lyra/app",version:"0.0.0",description:"Default app template built on Appspace. Use as a starting point for downstream applications.",dependencies:{"@eclipse-lyra/core":"0.0.0","@eclipse-lyra/extension-ai-system":"0.0.0","@eclipse-lyra/extension-command-palette":"0.0.0","@eclipse-lyra/extension-command-shell":"0.0.0","@eclipse-lyra/extension-dataviewer":"0.0.0","@eclipse-lyra/extension-sqleditor":"0.0.0","@eclipse-lyra/extension-duckdb":"0.0.0","@eclipse-lyra/extension-pglite":"0.0.0","@eclipse-lyra/extension-github-service":"0.0.0","@eclipse-lyra/extension-howto-system":"0.0.0","@eclipse-lyra/extension-in-browser-ml":"0.0.0","@eclipse-lyra/extension-linuxterminal":"0.0.0","@eclipse-lyra/extension-md-editor":"0.0.0","@eclipse-lyra/extension-media-viewer":"0.0.0","@eclipse-lyra/extension-memory-usage":"0.0.0","@eclipse-lyra/extension-monaco-editor":"0.0.0","@eclipse-lyra/extension-notebook":"0.0.0","@eclipse-lyra/extension-python-runtime":"0.0.0","@eclipse-lyra/extension-rag-system":"0.0.0","@eclipse-lyra/extension-settings-tree":"0.0.0","@eclipse-lyra/extension-utils":"0.0.0","@eclipse-lyra/extension-webdav":"0.0.0","@eclipse-lyra/extension-webllm":"0.0.0","@eclipse-lyra/extension-webmcp":"0.0.0","pace-js":"1.2.4"},marketplaceCatalogUrls:["https://raw.githubusercontent.com/kispace-io/appspace-marketplace/main/catalogs/extensions.json","https://raw.githubusercontent.com/kispace-io/appspace-marketplace/main/catalogs/apps.json"]};const M=Qe("AppLoader");function nl(t){if(!t)return"standard";const e=t.layout??t.layoutId;return typeof e=="object"?e.id:e??"standard"}function ip(t){const e={};for(const[i,r]of Object.entries(t))e[i]=typeof r=="boolean"?r?"true":"false":r;return e}function Ve(t){return t instanceof Error?t.message:String(t)}function rp(t){try{const i=new URL(t).pathname.split("/").filter(Boolean);return i.length>0?i[i.length-1]:void 0}catch{const e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:void 0}}function op(){const e=window.location.pathname.split("/").filter(Boolean);if(e.length===0)return;const i=e[0];if(!(!i||i==="index.html"||i.endsWith(".html")))return i}const ei=class ei{constructor(){this.apps=new Map,this.started=!1,this.container=document.body,this.systemRequiredExtensions=new Set}registerApp(e,i){if(i?.hostConfig===!0&&typeof al<"u"){const r=al;e.name===void 0&&(e.name=r.name),e.version===void 0&&(e.version=r.version),e.description===void 0&&(e.description=r.description),e.dependencies===void 0&&(e.dependencies=r.dependencies),e.marketplaceCatalogUrls===void 0&&(e.marketplaceCatalogUrls=r.marketplaceCatalogUrls)}e.name=e.name??"app",e.version=e.version??"0.0.0",this.apps.has(e.name)&&M.warn(`App '${e.name}' is already registered. Overwriting.`),e.marketplaceCatalogUrls?.length&&Cc.addCatalogUrls(e.marketplaceCatalogUrls).catch(()=>{}),this.apps.set(e.name,e),i?.defaultAppName&&(this.defaultAppName=i.defaultAppName),i?.container&&(this.container=i.container),i?.autoStart&&!this.started&&this.start()}registerSystemRequiredExtension(e){this.systemRequiredExtensions.add(e)}async loadAppFromUrl(e){M.info(`Loading app from URL: ${e}...`);try{const i=await import(e);if(!i.default)throw new Error(`Module at ${e} does not have a default export`);const r=i.default;if(!r.name||!r.version)throw new Error(`Module at ${e} does not export a valid AppDefinition (name and version required)`);return M.info(`Successfully loaded app definition from URL: ${r.name}`),r}catch(i){throw M.error(`Failed to load app from URL ${e}: ${Ve(i)}`),i}}async start(){if(this.started){M.debug("AppLoader already started");return}this.started=!0;const e=new URLSearchParams(window.location.search),i=e.get("app"),r=e.get("appId"),o=op(),s=this.apps.size;let a;if(i&&(a=rp(i),a&&M.info(`Extracted app ID from URL path: ${a}`)),o&&M.info(`Extracted app ID from current page path: ${o}`),i)try{M.info(`URL parameter 'app' found: ${i}, attempting to load extension or app`);try{await st.loadExtensionFromUrl(i),M.info(`Successfully loaded extension from URL: ${i}`)}catch(c){M.info(`Failed to load as extension, trying as app definition: ${Ve(c)}`);try{const h=await this.loadAppFromUrl(i);if(this.registerApp(h),!h.name)throw new Error("App from URL has no name after registration");await this.loadApp(h.name,this.container),M.info(`Successfully loaded app from URL: ${i}`);return}catch(h){throw M.error(`Failed to load from URL as both extension and app: ${Ve(h)}`),h}}}catch(c){M.error(`Failed to load from URL parameter, falling back to default app: ${Ve(c)}`)}const l=await this.selectAppToLoad({appIdFromUrl:r,appIdFromPath:o,appIdFromAppUrl:a,appsBeforeExtension:s});if(!l)throw new Error("No apps registered");await this.loadApp(l,this.container)}findAppNameBySegment(e){if(this.apps.has(e))return e;for(const i of this.apps.values())if(i.path===e||i.name&&i.name.endsWith("/"+e))return i.name??void 0}async loadApp(e,i){const r=this.apps.get(e);if(!r)throw new Error(`App '${e}' not found. Make sure it's registered.`);if(this.currentApp&&(M.info(`Disposing current app: ${this.currentApp.name}`),this.currentApp.dispose&&await this.currentApp.dispose(),this.currentApp.extensions&&this.currentApp.extensions.length>0&&(M.info(`Disabling ${this.currentApp.extensions.length} extensions...`),this.currentApp.extensions.forEach(s=>{st.disable(s)}))),Ho.applyAppNameRemaps(r.remaps),r.remaps?.length){const s=new Set;for(const a of r.remaps)for(const l of a.targets)s.add(l);for(const a of s){const l=H.getContributions(a);F(we,{target:a,contributions:l})}}r.contributions&&(M.info("Registering app contributions..."),r.contributions.ui&&(r.contributions.ui.forEach(s=>{const a=s.target;a&&H.registerContribution(a,s)}),M.info(`Registered ${r.contributions.ui.length} UI contributions`)),r.contributions.extensions&&(r.contributions.extensions.forEach(s=>{st.registerExtension(s)}),M.info(`Registered ${r.contributions.extensions.length} app extensions`)));const o=new Set(r.extensions||[]);this.systemRequiredExtensions.forEach(s=>o.add(s)),r.extensions=Array.from(o),await st.loadEnabledExtensions(),r.extensions.length>0&&r.extensions.forEach(s=>{st.enable(s)}),r.initialize&&(M.info(`Initializing ${r.name}...`),await r.initialize()),this.currentApp=r,M.info(`App ${r.name} loaded successfully`),this.preferredLayoutId=await this.getPreferredLayoutId(),this.updateDocumentMetadata(r),i&&this.renderApp(i),window.dispatchEvent(new CustomEvent("app-loaded",{detail:{appName:r.name}}))}updateDocumentMetadata(e){if(document.title=e.name??"",e.metadata?.favicon){const i=e.metadata.favicon;let r=document.querySelector("link[rel*='icon']");r||(r=document.createElement("link"),r.rel="icon",document.head.appendChild(r)),r.type="image/svg+xml",r.href=i}}renderApp(e){if(!this.currentApp)throw new Error("No app loaded. Call loadApp() first.");const i=this.preferredLayoutId??nl(this.currentApp),r=H.getContributions(Fo);let o=r.find(c=>c.id===i);if(o||(M.warn(`Layout '${i}' not found, falling back to 'standard'`),o=r.find(c=>c.id==="standard")),!o)throw new Error(`No layout found for layoutId '${i}' and no 'standard' layout registered.`);const s=o.component;let a={};s&&typeof s=="object"&&"tag"in s&&s.attributes&&(a={...s.attributes});const l=this.currentApp?.layout;if(typeof l=="object"&&l.id===i&&l.props&&Object.assign(a,ip(l.props)),e.innerHTML="",typeof s=="string"){const c=document.createElement(s);for(const[h,u]of Object.entries(a))c.setAttribute(h,u);e.appendChild(c)}else if(s&&typeof s=="object"&&"tag"in s){const c=document.createElement(s.tag);for(const[h,u]of Object.entries(a))c.setAttribute(h,u);e.appendChild(c)}else if(typeof s=="function")ae(s(),e);else throw new Error(`Layout '${o.id}' has invalid component.`);o.onShow&&requestAnimationFrame(()=>{Promise.resolve(o.onShow()).catch(c=>M.error(`Layout onShow failed for '${o.id}': ${Ve(c)}`))})}getCurrentApp(){return this.currentApp}getRegisteredApps(){return Array.from(this.apps.values())}async getPreferredAppId(){try{return await ct.get(ei.PREFERRED_APP_KEY)}catch(e){M.debug(`Failed to get preferred app ID from settings: ${Ve(e)}`);return}}async setPreferredAppId(e){if(!this.apps.has(e))throw new Error(`App '${e}' not found. Make sure it's registered.`);try{await ct.set(ei.PREFERRED_APP_KEY,e),this.defaultAppName=e,M.info(`Set preferred app to: ${e}`)}catch(i){throw M.error(`Failed to persist preferred app: ${Ve(i)}`),i}}getRegisteredLayouts(){return H.getContributions(Fo)}getCurrentLayoutId(){return this.preferredLayoutId??nl(this.currentApp)}async getPreferredLayoutId(){try{return await ct.get(ei.PREFERRED_LAYOUT_KEY)}catch(e){M.debug(`Failed to get preferred layout ID: ${Ve(e)}`);return}}async setPreferredLayoutId(e){if(!this.getRegisteredLayouts().some(r=>r.id===e))throw new Error(`Layout '${e}' not found.`);try{await ct.set(ei.PREFERRED_LAYOUT_KEY,e),this.preferredLayoutId=e,M.info(`Set preferred layout to: ${e}`),this.currentApp&&this.container&&this.renderApp(this.container),window.dispatchEvent(new CustomEvent("layout-changed",{detail:{layoutId:e}}))}catch(r){throw M.error(`Failed to persist preferred layout: ${Ve(r)}`),r}}async selectAppToLoad(e){const{appIdFromUrl:i,appIdFromPath:r,appIdFromAppUrl:o,appsBeforeExtension:s}=e;if(i){const c=this.findAppNameBySegment(i)??i;if(this.apps.has(c))return M.info(`Loading app specified by URL parameter 'appId': ${c}`),c;M.warn(`App '${i}' from URL parameter not found`)}if(r){const c=this.findAppNameBySegment(r);if(c)return M.info(`Loading app from URL path: ${r}`),c;M.debug(`App for path '${r}' not found, continuing search`)}if(o){const c=this.findAppNameBySegment(o)??o;if(this.apps.has(c))return M.info(`Loading app using segment from app URL path: ${c}`),c}if(this.apps.size>s){const c=Array.from(this.apps.values()).slice(s);if(c.length>0){const h=c[0];return M.info(`Loading app registered by extension: ${h.name}`),h.name}}const a=await this.getPreferredAppId();if(a&&this.apps.has(a))return M.info(`Loading preferred app from settings: ${a}`),a;if(this.defaultAppName&&this.apps.has(this.defaultAppName))return this.defaultAppName;this.defaultAppName&&M.warn(`Default app '${this.defaultAppName}' not found`);const l=this.getRegisteredApps();if(l.length>0)return l[0].name}};ei.PREFERRED_APP_KEY="preferredAppName",ei.PREFERRED_LAYOUT_KEY="preferredLayoutId";let wa=ei;const si=new wa;$t.put("appLoaderService",si);var sp=Object.defineProperty,ap=Object.getOwnPropertyDescriptor,ho=(t,e,i,r)=>{for(var o=r>1?void 0:r?ap(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=(r?a(e,i,o):a(o))||o);return r&&o&&sp(e,i,o),o};let Mi=class extends je{constructor(){super(...arguments),this.message="",this.defaultValue="",this.markdown=!1,this.inputValue=""}async firstUpdated(t){super.firstUpdated(t),this.inputValue=this.defaultValue,await this.updateComplete;const e=this.shadowRoot?.querySelector("wa-input");if(e){const i=e.shadowRoot?.querySelector("input");i&&(i.focus(),i.select())}}getResult(){return this.inputValue}handleInput(t){this.inputValue=t.target.value}handleKeyDown(t){t.key==="Enter"?(t.preventDefault(),this.dispatchEvent(new CustomEvent("dialog-ok",{bubbles:!0,composed:!0}))):t.key==="Escape"&&(t.preventDefault(),this.dispatchEvent(new CustomEvent("dialog-cancel",{bubbles:!0,composed:!0})))}render(){return p`
            ${this.renderMessage(this.message,this.markdown)}
            <wa-input
                value="${this.inputValue}"
                @input=${this.handleInput}
                @keydown=${this.handleKeyDown}
                autofocus
            ></wa-input>
        `}};Mi.styles=[...je.styles,C`
            wa-input {
                width: 100%;
            }
        `];ho([d({type:String})],Mi.prototype,"message",2);ho([d({type:String,attribute:"default-value"})],Mi.prototype,"defaultValue",2);ho([d({type:Boolean})],Mi.prototype,"markdown",2);ho([w()],Mi.prototype,"inputValue",2);Mi=ho([v("lyra-prompt-dialog-content")],Mi);H.registerContribution(cr,{id:"prompt",label:"Input",buttons:[ws,vc],component:t=>t?p`
            <lyra-prompt-dialog-content 
                .message="${t.message}"
                .defaultValue="${t.defaultValue}"
                .markdown="${t.markdown}"
            ></lyra-prompt-dialog-content>
        `:p`<div>Error: No prompt dialog state</div>`,onButton:async(t,e,i)=>(i&&(t==="ok"?i.resolve(e||""):i.resolve(null)),!0)});async function np(t,e="",i=!1){return new Promise(r=>{sn.open("prompt",{message:t,defaultValue:e,markdown:i,resolve:r})})}var lp=Object.defineProperty,cp=Object.getOwnPropertyDescriptor,ln=(t,e,i,r)=>{for(var o=r>1?void 0:r?cp(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=(r?a(e,i,o):a(o))||o);return r&&o&&lp(e,i,o),o};let Xo=class extends je{constructor(){super(...arguments),this.message="",this.markdown=!1}render(){return p`
            ${this.renderMessage(this.message,this.markdown)}
        `}};ln([d({type:String})],Xo.prototype,"message",2);ln([d({type:Boolean})],Xo.prototype,"markdown",2);Xo=ln([v("lyra-info-dialog-content")],Xo);H.registerContribution(cr,{id:"info",label:"Information",buttons:[ws],component:t=>t?p`
            <lyra-info-dialog-content 
                .message="${t.message}"
                .markdown="${t.markdown}"
            ></lyra-info-dialog-content>
        `:p`<div>Error: No info dialog state</div>`,onButton:async(t,e,i)=>(i&&i.resolve&&i.resolve(),!0)});var dp=Object.defineProperty,hp=Object.getOwnPropertyDescriptor,cn=(t,e,i,r)=>{for(var o=r>1?void 0:r?hp(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=(r?a(e,i,o):a(o))||o);return r&&o&&dp(e,i,o),o};let Yo=class extends je{constructor(){super(...arguments),this.message="",this.markdown=!1}getResult(){return!1}render(){return p`
            ${this.renderMessage(this.message,this.markdown)}
        `}};cn([d({type:String})],Yo.prototype,"message",2);cn([d({type:Boolean})],Yo.prototype,"markdown",2);Yo=cn([v("lyra-confirm-dialog-content")],Yo);H.registerContribution(cr,{id:"confirm",label:"Confirm",buttons:[ws,vc],component:t=>t?p`
            <lyra-confirm-dialog-content 
                .message="${t.message}"
                .markdown="${t.markdown}"
            ></lyra-confirm-dialog-content>
        `:p`<div>Error: No confirm dialog state</div>`,onButton:async(t,e,i)=>(i&&(t==="ok"?i.resolve(!0):i.resolve(!1)),!0)});async function $c(t,e=!1){return new Promise(i=>{sn.open("confirm",{message:t,markdown:e,resolve:i})})}var up=Object.defineProperty,pp=Object.getOwnPropertyDescriptor,ji=(t,e,i,r)=>{for(var o=r>1?void 0:r?pp(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=(r?a(e,i,o):a(o))||o);return r&&o&&up(e,i,o),o};let Ke=class extends je{constructor(){super(...arguments),this.title="",this.message="",this.markdown=!1,this.actions=[],this.currentTitle="",this.currentMessage="",this.dialogElement=null}async firstUpdated(t){super.firstUpdated(t),this.currentTitle=this.title,this.currentMessage=this.message,await this.updateComplete;const e=this.closest("wa-dialog");e&&(this.dialogElement=e,this.updateDialogLabel());const i=this.closest(".dialog-service-content");if(i){const r=i.parentElement?.querySelector(".dialog-service-footer");r&&(r.style.display="none")}}updated(t){super.updated(t),t.has("title")&&(this.currentTitle=this.title,this.updateDialogLabel()),t.has("message")&&(this.currentMessage=this.message)}updateDialogLabel(){this.dialogElement&&this.dialogElement.setAttribute("label",this.currentTitle)}updateDialog(t,e,i){this.currentTitle=t,this.currentMessage=e,this.actions=[...i],this.updateDialogLabel(),this.requestUpdate()}handleActionClick(t){t.callback()}handleClose(){this.closest("wa-dialog")&&this.resolveCallback&&this.resolveCallback()}render(){const t=this.actions.filter(i=>i.label!=="Close"),e=this.actions.filter(i=>i.label==="Close");return p`
            <div class="dialog-content">
                <wa-scroller class="dialog-scroller">
                    ${this.renderMessage(this.currentMessage,this.markdown)}
                </wa-scroller>
                
                <div class="dialog-actions">
                    <div class="dialog-actions-left">
                        ${t.map(i=>p`
                            <wa-button 
                                variant="${i.variant||"default"}"
                                ?disabled=${i.disabled}
                                @click=${()=>this.handleActionClick(i)}
                            >
                                ${i.label}
                            </wa-button>
                        `)}
                    </div>
                    <div class="dialog-actions-right">
                        ${e.map(i=>p`
                            <wa-button 
                                variant="${i.variant||"primary"}"
                                @click=${()=>{this.handleActionClick(i),this.handleClose()}}
                            >
                                ${i.label}
                            </wa-button>
                        `)}
                    </div>
                </div>
            </div>
        `}};Ke.styles=[...je.styles,C`
            :host {
                display: block;
            }

            :host-context(.dialog-service-content) {
                padding: 0;
            }
            
            .dialog-content {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                min-width: 400px;
                max-width: 600px;
                height: 500px;
                padding: 1rem;
            }
            
            .dialog-scroller {
                flex: 1;
                overflow-y: auto;
            }
            
            .dialog-actions {
                display: flex;
                gap: 0.5rem;
                justify-content: space-between;
                margin-top: 0.5rem;
            }
            
            .dialog-actions-left,
            .dialog-actions-right {
                display: flex;
                gap: 0.5rem;
            }
        `];ji([d({type:String})],Ke.prototype,"title",2);ji([d({type:String})],Ke.prototype,"message",2);ji([d({type:Boolean})],Ke.prototype,"markdown",2);ji([w()],Ke.prototype,"actions",2);ji([w()],Ke.prototype,"currentTitle",2);ji([w()],Ke.prototype,"currentMessage",2);Ke=ji([v("lyra-navigable-info-dialog-content")],Ke);H.registerContribution(cr,{id:"navigable-info",label:"Information",buttons:[Pu],component:t=>{if(!t)return p`<div>Error: No navigable info dialog state</div>`;const e=p`
            <lyra-navigable-info-dialog-content 
                .title="${t.title}"
                .message="${t.message}"
                .markdown="${t.markdown}"
            ></lyra-navigable-info-dialog-content>
        `;return(async()=>{const i=document.querySelector("lyra-navigable-info-dialog-content");i&&(await i.updateComplete,i.actions=t.actions||[],i.resolveCallback=t.resolve,t.updateDialogRef&&(t.updateDialogRef.current=(r,o,s)=>{i.updateDialog(r,o,s)}))})(),e},onButton:async(t,e,i)=>i&&t==="close"&&i.resolve?(i.resolve(),!0):!1});const fp="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='2'%20y='2'%20width='28'%20height='28'%20fill='%23FFCA28'/%3e%3cpath%20d='M19%2025.2879L21.0615%2023.9237C21.2231%2024.4313%2022.2462%2025.6368%2023.5385%2025.6368C24.8308%2025.6368%2025.4308%2024.931%2025.4308%2024.463C25.4308%2023.1878%2024.1112%2022.7382%2023.4774%2022.5223C23.374%2022.4871%2023.289%2022.4581%2023.2308%2022.4328C23.2009%2022.4198%2023.1558%2022.4025%2023.0979%2022.3804C22.393%2022.1111%2019.7923%2021.1175%2019.7923%2018.2373C19.7923%2015.065%2022.8538%2014.7002%2023.5462%2014.7002C23.9991%2014.7002%2026.1769%2014.7557%2027.2615%2016.7939L25.2615%2018.1898C24.8231%2017.3015%2024.0946%2017.0081%2023.6462%2017.0081C22.5385%2017.0081%2022.3077%2017.8201%2022.3077%2018.1898C22.3077%2019.227%2023.5112%2019.6919%2024.5273%2020.0844C24.7932%2020.1871%2025.0462%2020.2848%2025.2615%2020.3866C26.3692%2020.91%2028%2021.7666%2028%2024.463C28%2025.8136%2026.8672%2028.0002%2024.0154%2028.0002C20.1846%2028.0002%2019.1692%2025.7003%2019%2025.2879Z'%20fill='%233E3E3E'/%3e%3cpath%20d='M9%2025.5587L11.1487%2024.1953C11.317%2024.7026%2011.9713%2025.638%2012.9205%2025.638C13.8698%2025.638%2014.3557%2024.663%2014.3557%2024.1953V15.0002H16.9982V24.1953C17.041%2025.4636%2016.3376%2028.0002%2013.2332%2028.0002C10.379%2028.0002%209.19242%2026.3039%209%2025.5587Z'%20fill='%233E3E3E'/%3e%3c/svg%3e",mp="/assets/jupyter-C78Cpfql.svg",gp="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20aria-hidden='true'%3e%3crect%20x='4'%20y='3'%20width='12'%20height='8'%20rx='1.25'%20ry='1.25'%20fill='none'%20stroke='currentColor'%20stroke-width='1.25'%20stroke-linejoin='round'/%3e%3cline%20x1='2'%20y1='20'%20x2='18'%20y2='20'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='20'%20y1='2'%20x2='20'%20y2='22'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3c/svg%3e",bp="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20aria-hidden='true'%3e%3crect%20x='10'%20y='4'%20width='12'%20height='16'%20rx='1.25'%20ry='1.25'%20fill='none'%20stroke='currentColor'%20stroke-width='1.25'%20stroke-linejoin='round'/%3e%3cline%20x1='2.5'%20y1='2'%20x2='2.5'%20y2='9'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='2.5'%20y1='15'%20x2='2.5'%20y2='22'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3c/svg%3e",wp="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20aria-hidden='true'%3e%3crect%20x='8'%20y='4'%20width='8'%20height='8'%20rx='1.25'%20ry='1.25'%20fill='none'%20stroke='currentColor'%20stroke-width='1.25'%20stroke-linejoin='round'/%3e%3cline%20x1='2.5'%20y1='2'%20x2='2.5'%20y2='22'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='21.5'%20y1='2'%20x2='21.5'%20y2='22'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='6'%20y1='20'%20x2='18'%20y2='20'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3c/svg%3e",vp="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20aria-hidden='true'%3e%3crect%20x='8'%20y='4'%20width='8'%20height='16'%20rx='1.25'%20ry='1.25'%20fill='none'%20stroke='currentColor'%20stroke-width='1.25'%20stroke-linejoin='round'/%3e%3cline%20x1='2.5'%20y1='2'%20x2='2.5'%20y2='22'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='21.5'%20y1='2'%20x2='21.5'%20y2='22'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3c/svg%3e",yp="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M13.0164%202C10.8193%202%209.03825%203.72453%209.03825%205.85185V8.51852H15.9235V9.25926H5.97814C3.78107%209.25926%202%2010.9838%202%2013.1111L2%2018.8889C2%2021.0162%203.78107%2022.7407%205.97814%2022.7407H8.27322V19.4815C8.27322%2017.3542%2010.0543%2015.6296%2012.2514%2015.6296H19.5956C21.4547%2015.6296%2022.9617%2014.1704%2022.9617%2012.3704V5.85185C22.9617%203.72453%2021.1807%202%2018.9836%202H13.0164ZM12.0984%206.74074C12.8589%206.74074%2013.4754%206.14378%2013.4754%205.40741C13.4754%204.67103%2012.8589%204.07407%2012.0984%204.07407C11.3378%204.07407%2010.7213%204.67103%2010.7213%205.40741C10.7213%206.14378%2011.3378%206.74074%2012.0984%206.74074Z'%20fill='url(%23paint0_linear_87_8204)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M18.9834%2030C21.1805%2030%2022.9616%2028.2755%2022.9616%2026.1482V23.4815L16.0763%2023.4815L16.0763%2022.7408L26.0217%2022.7408C28.2188%2022.7408%2029.9998%2021.0162%2029.9998%2018.8889V13.1111C29.9998%2010.9838%2028.2188%209.25928%2026.0217%209.25928L23.7266%209.25928V12.5185C23.7266%2014.6459%2021.9455%2016.3704%2019.7485%2016.3704L12.4042%2016.3704C10.5451%2016.3704%209.03809%2017.8296%209.03809%2019.6296L9.03809%2026.1482C9.03809%2028.2755%2010.8192%2030%2013.0162%2030H18.9834ZM19.9015%2025.2593C19.1409%2025.2593%2018.5244%2025.8562%2018.5244%2026.5926C18.5244%2027.329%2019.1409%2027.9259%2019.9015%2027.9259C20.662%2027.9259%2021.2785%2027.329%2021.2785%2026.5926C21.2785%2025.8562%2020.662%2025.2593%2019.9015%2025.2593Z'%20fill='url(%23paint1_linear_87_8204)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_87_8204'%20x1='12.4809'%20y1='2'%20x2='12.4809'%20y2='22.7407'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23327EBD'/%3e%3cstop%20offset='1'%20stop-color='%231565A7'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_87_8204'%20x1='19.519'%20y1='9.25928'%20x2='19.519'%20y2='30'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FFDA4B'/%3e%3cstop%20offset='1'%20stop-color='%23F9C600'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";var or=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}};var dn=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}};const va=new Set,rr=new Map;let Ti,hn="ltr",un="en";const Sc=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(Sc){const t=new MutationObserver(Ac);hn=document.documentElement.dir||"ltr",un=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function Ec(...t){t.map(e=>{const i=e.$code.toLowerCase();rr.has(i)?rr.set(i,Object.assign(Object.assign({},rr.get(i)),e)):rr.set(i,e),Ti||(Ti=e)}),Ac()}function Ac(){Sc&&(hn=document.documentElement.dir||"ltr",un=document.documentElement.lang||navigator.language),[...va.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}let xp=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){va.add(this.host)}hostDisconnected(){va.delete(this.host)}dir(){return`${this.host.dir||hn}`.toLowerCase()}lang(){return`${this.host.lang||un}`.toLowerCase()}getTranslationData(e){var i,r;const o=new Intl.Locale(e.replace(/_/g,"-")),s=o?.language.toLowerCase(),a=(r=(i=o?.region)===null||i===void 0?void 0:i.toLowerCase())!==null&&r!==void 0?r:"",l=rr.get(`${s}-${a}`),c=rr.get(s);return{locale:o,language:s,region:a,primary:l,secondary:c}}exists(e,i){var r;const{primary:o,secondary:s}=this.getTranslationData((r=i.lang)!==null&&r!==void 0?r:this.lang());return i=Object.assign({includeFallback:!1},i),!!(o&&o[e]||s&&s[e]||i.includeFallback&&Ti&&Ti[e])}term(e,...i){const{primary:r,secondary:o}=this.getTranslationData(this.lang());let s;if(r&&r[e])s=r[e];else if(o&&o[e])s=o[e];else if(Ti&&Ti[e])s=Ti[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof s=="function"?s(...i):s}date(e,i){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),i).format(e)}number(e,i){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),i).format(e)}relativeTime(e,i,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(e,i)}};var Lc={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};Ec(Lc);var kp=Lc;var W=class extends xp{};Ec(kp);var Cp=C`
  :host {
    --control-box-size: 3rem;
    --icon-size: calc(var(--control-box-size) * 0.625);

    display: inline-flex;
    position: relative;
    cursor: pointer;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  img[aria-hidden='true'] {
    display: none;
  }

  .control-box {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: calc(50% - var(--control-box-size) / 2);
    right: calc(50% - var(--control-box-size) / 2);
    width: var(--control-box-size);
    height: var(--control-box-size);
    font-size: calc(var(--icon-size) * 0.75);
    background: none;
    border: solid var(--wa-border-width-s) currentColor;
    background-color: rgb(0 0 0 / 50%);
    border-radius: var(--wa-border-radius-circle);
    color: white;
    pointer-events: none;
    transition: opacity var(--wa-transition-normal) var(--wa-transition-easing);
  }

  @media (hover: hover) {
    :host([play]:hover) .control-box {
      opacity: 1;
    }
  }

  :where(:host([play]:not(:hover))) .control-box {
    opacity: 0;
  }

  :host([play]) slot[name='play-icon'],
  :host(:not([play])) slot[name='pause-icon'] {
    display: none;
  }

  /* Show control box on keyboard focus */
  .animated-image {
    &:focus {
      outline: none;
    }

    &:focus-visible .control-box {
      opacity: 1;
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }
`;function k(t,e){const i={waitUntilFirstUpdate:!1,...e};return(r,o)=>{const{update:s}=r,a=Array.isArray(t)?t:[t];r.update=function(l){a.forEach(c=>{const h=c;if(l.has(h)){const u=l.get(h),f=this[h];u!==f&&(!i.waitUntilFirstUpdate||this.hasUpdated)&&this[o](u,f)}}),s.call(this,l)}}}var $p=Object.defineProperty,Sp=Object.getOwnPropertyDescriptor,_c=t=>{throw TypeError(t)},n=(t,e,i,r)=>{for(var o=r>1?void 0:r?Sp(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=(r?a(e,i,o):a(o))||o);return r&&o&&$p(e,i,o),o},Tc=(t,e,i)=>e.has(t)||_c("Cannot "+i),Ep=(t,e,i)=>(Tc(t,e,"read from private field"),e.get(t)),Ap=(t,e,i)=>e.has(t)?_c("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),Lp=(t,e,i,r)=>(Tc(t,e,"write to private field"),e.set(t,i),i);var _p=C`
  :host {
    box-sizing: border-box !important;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit !important;
  }

  [hidden] {
    display: none !important;
  }
`,Io,z=class extends Di{constructor(){super(),Ap(this,Io,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,i)=>{if(this.internals?.states)try{i?this.internals.states.add(e):this.internals.states.delete(e)}catch(r){if(String(r).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw r}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let t=this.constructor;for(let[e,i]of t.elementProperties)i.default==="inherit"&&i.initial!==void 0&&typeof e=="string"&&this.customStates.set(`initial-${e}-${i.initial}`,!0)}static get styles(){const t=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[_p,...t]}attributeChangedCallback(t,e,i){Ep(this,Io)||(this.constructor.elementProperties.forEach((r,o)=>{r.reflect&&this[o]!=null&&this.initialReflectedProperties.set(o,this[o])}),Lp(this,Io,!0)),super.attributeChangedCallback(t,e,i)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,i)=>{t.has(i)&&this[i]==null&&(this[i]=e)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(e){if(this.didSSR&&!this.hasUpdated){const i=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});i.error=e,this.dispatchEvent(i)}throw e}}relayNativeEvent(t,e){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...e}))}};Io=new WeakMap;n([d()],z.prototype,"dir",2);n([d()],z.prototype,"lang",2);n([d({type:Boolean,reflect:!0,attribute:"did-ssr"})],z.prototype,"didSSR",2);const zc="important",Tp=" !"+zc,rt=$r(class extends Sr{constructor(t){if(super(t),t.type!==me.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const r=t[i];return r==null?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(t,[e]){const{style:i}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const r of this.ft)e[r]==null&&(this.ft.delete(r),r.includes("-")?i.removeProperty(r):i[r]=null);for(const r in e){const o=e[r];if(o!=null){this.ft.add(r);const s=typeof o=="string"&&o.endsWith(Tp);r.includes("-")||s?i.setProperty(r,s?o.slice(0,-11):o,s?zc:""):i[r]=o}}return Ft}});var ve=class extends z{constructor(){super(...arguments),this.localize=new W(this),this.isLoaded=!1}handleClick(){this.play=!this.play}handleKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.play=!this.play)}handleLoad(){const t=document.createElement("canvas"),{width:e,height:i}=this.animatedImage;t.width=e,t.height=i,t.getContext("2d").drawImage(this.animatedImage,0,0,e,i),this.frozenFrame=t.toDataURL("image/gif"),this.isLoaded||(this.dispatchEvent(new dn),this.isLoaded=!0)}handleError(){this.dispatchEvent(new or)}handlePlayChange(){this.play&&(this.animatedImage.src="",this.animatedImage.src=this.src)}handleSrcChange(){this.isLoaded=!1}render(){const e=`${this.localize.term(this.play?"pauseAnimation":"playAnimation")} ${this.alt}`;return p`
      <div
        class="animated-image"
        tabindex="0"
        role="button"
        aria-pressed=${this.play?"true":"false"}
        aria-label=${e}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <img
          class="animated"
          src=${this.src}
          alt=${this.alt}
          crossorigin="anonymous"
          aria-hidden=${this.play?"false":"true"}
          role="presentation"
          @load=${this.handleLoad}
          @error=${this.handleError}
        />

        ${this.isLoaded?p`
              <img
                class="frozen"
                src=${this.frozenFrame}
                alt=${this.alt}
                aria-hidden=${this.play?"true":"false"}
                role="presentation"
              />

              <div part="control-box" class="control-box" aria-hidden="true">
                <slot name="play-icon">
                  <wa-icon
                    name="play"
                    library="system"
                    variant="solid"
                    class="default"
                    style=${rt({"margin-inline-start":"3px"})}
                  ></wa-icon>
                </slot>
                <slot name="pause-icon">
                  <wa-icon name="pause" library="system" variant="solid" class="default"></wa-icon>
                </slot>
              </div>
            `:""}
      </div>
    `}};ve.css=Cp;n([x(".animated")],ve.prototype,"animatedImage",2);n([w()],ve.prototype,"frozenFrame",2);n([w()],ve.prototype,"isLoaded",2);n([d()],ve.prototype,"src",2);n([d()],ve.prototype,"alt",2);n([d({type:Boolean,reflect:!0})],ve.prototype,"play",2);n([k("play",{waitUntilFirstUpdate:!0})],ve.prototype,"handlePlayChange",1);n([k("src")],ve.prototype,"handleSrcChange",1);ve=n([v("wa-animated-image")],ve);var zp=C`
  :host {
    --primary-color: currentColor;
    --primary-opacity: 1;
    --secondary-color: currentColor;
    --secondary-opacity: 0.4;
    --rotate-angle: 0deg;

    box-sizing: content-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: -0.125em;
  }

  /* Standard */
  :host(:not([auto-width])) {
    width: 1.25em;
    height: 1em;
  }

  /* Auto-width */
  :host([auto-width]) {
    width: auto;
    height: 1em;
  }

  svg {
    height: 1em;
    overflow: visible;
    width: auto;

    /* Duotone colors with path-specific opacity fallback */
    path[data-duotone-primary] {
      color: var(--primary-color);
      opacity: var(--path-opacity, var(--primary-opacity));
    }

    path[data-duotone-secondary] {
      color: var(--secondary-color);
      opacity: var(--path-opacity, var(--secondary-opacity));
    }
  }

  /* Rotation */
  :host([rotate]) {
    transform: rotate(var(--rotate-angle, 0deg));
  }

  /* Flipping */
  :host([flip='x']) {
    transform: scaleX(-1);
  }
  :host([flip='y']) {
    transform: scaleY(-1);
  }
  :host([flip='both']) {
    transform: scale(-1, -1);
  }

  /* Rotation and Flipping combined */
  :host([rotate][flip='x']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleX(-1);
  }
  :host([rotate][flip='y']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleY(-1);
  }
  :host([rotate][flip='both']) {
    transform: rotate(var(--rotate-angle, 0deg)) scale(-1, -1);
  }

  /* Animations */
  :host([animation='beat']) {
    animation-name: beat;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='fade']) {
    animation-name: fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
  }

  :host([animation='beat-fade']) {
    animation-name: beat-fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
  }

  :host([animation='bounce']) {
    animation-name: bounce;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
  }

  :host([animation='flip']) {
    animation-name: flip;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='shake']) {
    animation-name: shake;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-pulse']) {
    animation-name: spin-pulse;
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, steps(8));
  }

  :host([animation='spin-reverse']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, reverse);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  /* Keyframes */
  @media (prefers-reduced-motion: reduce) {
    :host([animation='beat']),
    :host([animation='bounce']),
    :host([animation='fade']),
    :host([animation='beat-fade']),
    :host([animation='flip']),
    :host([animation='shake']),
    :host([animation='spin']),
    :host([animation='spin-pulse']),
    :host([animation='spin-reverse']) {
      animation: none !important;
      transition: none !important;
    }
  }
  @keyframes beat {
    0%,
    90% {
      transform: scale(1);
    }
    45% {
      transform: scale(var(--beat-scale, 1.25));
    }
  }

  @keyframes fade {
    50% {
      opacity: var(--fade-opacity, 0.4);
    }
  }

  @keyframes beat-fade {
    0%,
    100% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(var(--beat-fade-scale, 1.125));
    }
  }

  @keyframes bounce {
    0% {
      transform: scale(1, 1) translateY(0);
    }
    10% {
      transform: scale(var(--bounce-start-scale-x, 1.1), var(--bounce-start-scale-y, 0.9)) translateY(0);
    }
    30% {
      transform: scale(var(--bounce-jump-scale-x, 0.9), var(--bounce-jump-scale-y, 1.1))
        translateY(var(--bounce-height, -0.5em));
    }
    50% {
      transform: scale(var(--bounce-land-scale-x, 1.05), var(--bounce-land-scale-y, 0.95)) translateY(0);
    }
    57% {
      transform: scale(1, 1) translateY(var(--bounce-rebound, -0.125em));
    }
    64% {
      transform: scale(1, 1) translateY(0);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }

  @keyframes flip {
    50% {
      transform: rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -180deg));
    }
  }

  @keyframes shake {
    0% {
      transform: rotate(-15deg);
    }
    4% {
      transform: rotate(15deg);
    }
    8%,
    24% {
      transform: rotate(-18deg);
    }
    12%,
    28% {
      transform: rotate(18deg);
    }
    16% {
      transform: rotate(-22deg);
    }
    20% {
      transform: rotate(22deg);
    }
    32% {
      transform: rotate(-12deg);
    }
    36% {
      transform: rotate(12deg);
    }
    40%,
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-pulse {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;function Rp(t){return`data:image/svg+xml,${encodeURIComponent(t)}`}var qs={solid:{check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',file:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/></svg>',"file-audio":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/></svg>',"file-code":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z"/></svg>',"file-excel":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/></svg>',"file-image":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/></svg>',"file-pdf":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>',"file-powerpoint":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/></svg>',"file-video":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>',"file-word":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"/></svg>',"file-zipper":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',plus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',upload:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},Dp={name:"system",resolver:(t,e="classic",i="solid")=>{let o=qs[i][t]??qs.regular[t]??qs.regular["circle-question"];return o?Rp(o):""}},Op=Dp;var ya="",xa="";function ll(t){ya=t}function Ip(t=""){if(!ya){const e=document.querySelector("[data-webawesome]");if(e?.hasAttribute("data-webawesome")){const i=new URL(e.getAttribute("data-webawesome")??"",window.location.href).pathname;ll(i)}else{const r=[...document.getElementsByTagName("script")].find(o=>o.src.endsWith("webawesome.js")||o.src.endsWith("webawesome.loader.js")||o.src.endsWith("webawesome.ssr-loader.js"));if(r){const o=String(r.getAttribute("src"));ll(o.split("/").slice(0,-1).join("/"))}}}return ya.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}function Pp(t){xa=t}function Mp(){if(!xa){const t=document.querySelector("[data-fa-kit-code]");t&&Pp(t.getAttribute("data-fa-kit-code")||"")}return xa}var cl="7.1.0";function Np(t,e,i){const r=Mp(),o=r.length>0;let s="solid";return e==="notdog"&&(i==="solid"&&(s="notdog-solid"),i==="duo-solid"&&(s="notdog-duo-solid")),e==="notdog-duo"&&(s="notdog-duo-solid"),e==="chisel"&&(s="chisel-regular"),e==="etch"&&(s="etch-solid"),e==="jelly"&&(s="jelly-regular",i==="duo-regular"&&(s="jelly-duo-regular"),i==="fill-regular"&&(s="jelly-fill-regular")),e==="jelly-duo"&&(s="jelly-duo-regular"),e==="jelly-fill"&&(s="jelly-fill-regular"),e==="slab"&&((i==="solid"||i==="regular")&&(s="slab-regular"),i==="press-regular"&&(s="slab-press-regular")),e==="slab-press"&&(s="slab-press-regular"),e==="thumbprint"&&(s="thumbprint-light"),e==="whiteboard"&&(s="whiteboard-semibold"),e==="utility"&&(s="utility-semibold"),e==="utility-duo"&&(s="utility-duo-semibold"),e==="utility-fill"&&(s="utility-fill-semibold"),e==="classic"&&(i==="thin"&&(s="thin"),i==="light"&&(s="light"),i==="regular"&&(s="regular"),i==="solid"&&(s="solid")),e==="sharp"&&(i==="thin"&&(s="sharp-thin"),i==="light"&&(s="sharp-light"),i==="regular"&&(s="sharp-regular"),i==="solid"&&(s="sharp-solid")),e==="duotone"&&(i==="thin"&&(s="duotone-thin"),i==="light"&&(s="duotone-light"),i==="regular"&&(s="duotone-regular"),i==="solid"&&(s="duotone")),e==="sharp-duotone"&&(i==="thin"&&(s="sharp-duotone-thin"),i==="light"&&(s="sharp-duotone-light"),i==="regular"&&(s="sharp-duotone-regular"),i==="solid"&&(s="sharp-duotone-solid")),e==="brands"&&(s="brands"),o?`https://ka-p.fontawesome.com/releases/v${cl}/svgs/${s}/${t}.svg?token=${encodeURIComponent(r)}`:`https://ka-f.fontawesome.com/releases/v${cl}/svgs/${s}/${t}.svg`}var Fp={name:"default",resolver:(t,e="classic",i="solid")=>Np(t,e,i),mutator:(t,e)=>{if(e?.family&&!t.hasAttribute("data-duotone-initialized")){const{family:i,variant:r}=e;if(i==="duotone"||i==="sharp-duotone"||i==="notdog-duo"||i==="notdog"&&r==="duo-solid"||i==="jelly-duo"||i==="jelly"&&r==="duo-regular"||i==="utility-duo"||i==="thumbprint"){const o=[...t.querySelectorAll("path")],s=o.find(l=>!l.hasAttribute("opacity")),a=o.find(l=>l.hasAttribute("opacity"));if(!s||!a)return;if(s.setAttribute("data-duotone-primary",""),a.setAttribute("data-duotone-secondary",""),e.swapOpacity&&s&&a){const l=a.getAttribute("opacity")||"0.4";s.style.setProperty("--path-opacity",l),a.style.setProperty("--path-opacity","1")}t.setAttribute("data-duotone-initialized","")}}}},Bp=Fp;var Up="classic",Zo=[Bp,Op],Qo=[];function Vp(t){Qo.push(t)}function qp(t){Qo=Qo.filter(e=>e!==t)}function Hs(t){return Zo.find(e=>e.name===t)}function Hp(t,e){Wp(t),Zo.push({name:t,resolver:e.resolver,mutator:e.mutator,spriteSheet:e.spriteSheet}),Qo.forEach(i=>{i.library===t&&i.setIcon()})}function Wp(t){Zo=Zo.filter(e=>e.name!==t)}function jp(){return Up}var Mr=Symbol(),yo=Symbol(),Ws,js=new Map,yt=class extends z{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.rotate=0,this.resolveIcon=async(t,e)=>{let i;if(e?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=p`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;const r=this.shadowRoot.querySelector("[part='svg']");return typeof e.mutator=="function"&&e.mutator(r,this),this.svg}try{if(i=await fetch(t,{mode:"cors"}),!i.ok)return i.status===410?Mr:yo}catch{return yo}try{const r=document.createElement("div");r.innerHTML=await i.text();const o=r.firstElementChild;if(o?.tagName?.toLowerCase()!=="svg")return Mr;Ws||(Ws=new DOMParser);const a=Ws.parseFromString(o.outerHTML,"text/html").body.querySelector("svg");return a?(a.part.add("svg"),document.adoptNode(a)):Mr}catch{return Mr}}}connectedCallback(){super.connectedCallback(),Vp(this)}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),qp(this)}getIconSource(){const t=Hs(this.library),e=this.family||jp();return this.name&&t?{url:t.resolver(this.name,e,this.variant,this.autoWidth),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){const{url:t,fromLibrary:e}=this.getIconSource(),i=e?Hs(this.library):void 0;if(!t){this.svg=null;return}let r=js.get(t);r||(r=this.resolveIcon(t,i),js.set(t,r));const o=await r;if(o===yo&&js.delete(t),t===this.getIconSource().url){if(Sh(o)){this.svg=o;return}switch(o){case yo:case Mr:this.svg=null,this.dispatchEvent(new or);break;default:this.svg=o.cloneNode(!0),i?.mutator?.(this.svg,this),this.dispatchEvent(new dn)}}}updated(t){super.updated(t);const e=Hs(this.library);this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`);const i=this.shadowRoot?.querySelector("svg");i&&e?.mutator?.(i,this)}render(){return this.hasUpdated?this.svg:p`<svg part="svg" width="16" height="16"></svg>`}};yt.css=zp;n([w()],yt.prototype,"svg",2);n([d({reflect:!0})],yt.prototype,"name",2);n([d({reflect:!0})],yt.prototype,"family",2);n([d({reflect:!0})],yt.prototype,"variant",2);n([d({attribute:"auto-width",type:Boolean,reflect:!0})],yt.prototype,"autoWidth",2);n([d({attribute:"swap-opacity",type:Boolean,reflect:!0})],yt.prototype,"swapOpacity",2);n([d()],yt.prototype,"src",2);n([d()],yt.prototype,"label",2);n([d({reflect:!0})],yt.prototype,"library",2);n([d({type:Number,reflect:!0})],yt.prototype,"rotate",2);n([d({type:String,reflect:!0})],yt.prototype,"flip",2);n([d({type:String,reflect:!0})],yt.prototype,"animation",2);n([k("label")],yt.prototype,"handleLabelChange",1);n([k(["family","name","library","variant","src","autoWidth","swapOpacity"],{waitUntilFirstUpdate:!0})],yt.prototype,"setIcon",1);yt=n([v("wa-icon")],yt);var dl=class extends Event{constructor(){super("wa-start",{bubbles:!0,cancelable:!1,composed:!0})}};var Kp=class extends Event{constructor(){super("wa-finish",{bubbles:!0,cancelable:!1,composed:!0})}};var Gp=class extends Event{constructor(){super("wa-cancel",{bubbles:!0,cancelable:!1,composed:!0})}};var Xp=C`
  :host {
    display: contents;
  }
`;const Yp=[{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.2,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.4,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -30px, 0) scaleY(1.1)"},{offset:.43,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -30px, 0) scaleY(1.1)"},{offset:.53,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.7,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -15px, 0) scaleY(1.05)"},{offset:.8,"transition-timing-function":"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0) scaleY(0.95)"},{offset:.9,transform:"translate3d(0, -4px, 0) scaleY(1.02)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"}],Zp=[{offset:0,opacity:"1"},{offset:.25,opacity:"0"},{offset:.5,opacity:"1"},{offset:.75,opacity:"0"},{offset:1,opacity:"1"}],Qp=[{offset:0,transform:"translateX(0)"},{offset:.065,transform:"translateX(-6px) rotateY(-9deg)"},{offset:.185,transform:"translateX(5px) rotateY(7deg)"},{offset:.315,transform:"translateX(-3px) rotateY(-5deg)"},{offset:.435,transform:"translateX(2px) rotateY(3deg)"},{offset:.5,transform:"translateX(0)"}],Jp=[{offset:0,transform:"scale(1)"},{offset:.14,transform:"scale(1.3)"},{offset:.28,transform:"scale(1)"},{offset:.42,transform:"scale(1.3)"},{offset:.7,transform:"scale(1)"}],tf=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.111,transform:"translate3d(0, 0, 0)"},{offset:.222,transform:"skewX(-12.5deg) skewY(-12.5deg)"},{offset:.33299999999999996,transform:"skewX(6.25deg) skewY(6.25deg)"},{offset:.444,transform:"skewX(-3.125deg) skewY(-3.125deg)"},{offset:.555,transform:"skewX(1.5625deg) skewY(1.5625deg)"},{offset:.6659999999999999,transform:"skewX(-0.78125deg) skewY(-0.78125deg)"},{offset:.777,transform:"skewX(0.390625deg) skewY(0.390625deg)"},{offset:.888,transform:"skewX(-0.1953125deg) skewY(-0.1953125deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],ef=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.5,transform:"scale3d(1.05, 1.05, 1.05)"},{offset:1,transform:"scale3d(1, 1, 1)"}],rf=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.3,transform:"scale3d(1.25, 0.75, 1)"},{offset:.4,transform:"scale3d(0.75, 1.25, 1)"},{offset:.5,transform:"scale3d(1.15, 0.85, 1)"},{offset:.65,transform:"scale3d(0.95, 1.05, 1)"},{offset:.75,transform:"scale3d(1.05, 0.95, 1)"},{offset:1,transform:"scale3d(1, 1, 1)"}],of=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(-10px, 0, 0)"},{offset:.2,transform:"translate3d(10px, 0, 0)"},{offset:.3,transform:"translate3d(-10px, 0, 0)"},{offset:.4,transform:"translate3d(10px, 0, 0)"},{offset:.5,transform:"translate3d(-10px, 0, 0)"},{offset:.6,transform:"translate3d(10px, 0, 0)"},{offset:.7,transform:"translate3d(-10px, 0, 0)"},{offset:.8,transform:"translate3d(10px, 0, 0)"},{offset:.9,transform:"translate3d(-10px, 0, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],sf=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(-10px, 0, 0)"},{offset:.2,transform:"translate3d(10px, 0, 0)"},{offset:.3,transform:"translate3d(-10px, 0, 0)"},{offset:.4,transform:"translate3d(10px, 0, 0)"},{offset:.5,transform:"translate3d(-10px, 0, 0)"},{offset:.6,transform:"translate3d(10px, 0, 0)"},{offset:.7,transform:"translate3d(-10px, 0, 0)"},{offset:.8,transform:"translate3d(10px, 0, 0)"},{offset:.9,transform:"translate3d(-10px, 0, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],af=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(0, -10px, 0)"},{offset:.2,transform:"translate3d(0, 10px, 0)"},{offset:.3,transform:"translate3d(0, -10px, 0)"},{offset:.4,transform:"translate3d(0, 10px, 0)"},{offset:.5,transform:"translate3d(0, -10px, 0)"},{offset:.6,transform:"translate3d(0, 10px, 0)"},{offset:.7,transform:"translate3d(0, -10px, 0)"},{offset:.8,transform:"translate3d(0, 10px, 0)"},{offset:.9,transform:"translate3d(0, -10px, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],nf=[{offset:.2,transform:"rotate3d(0, 0, 1, 15deg)"},{offset:.4,transform:"rotate3d(0, 0, 1, -10deg)"},{offset:.6,transform:"rotate3d(0, 0, 1, 5deg)"},{offset:.8,transform:"rotate3d(0, 0, 1, -5deg)"},{offset:1,transform:"rotate3d(0, 0, 1, 0deg)"}],lf=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.1,transform:"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)"},{offset:.2,transform:"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)"},{offset:.3,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.4,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.5,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.6,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.7,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.8,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.9,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:1,transform:"scale3d(1, 1, 1)"}],cf=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.15,transform:"translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)"},{offset:.3,transform:"translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)"},{offset:.45,transform:"translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)"},{offset:.6,transform:"translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)"},{offset:.75,transform:"translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],df=[{offset:0,transform:"translateY(-1200px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],hf=[{offset:0,transform:"translateX(-2000px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],uf=[{offset:0,transform:"translateX(2000px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],pf=[{offset:0,transform:"translateY(1200px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],ff=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateY(700px) scale(0.7)",opacity:"0.7"}],mf=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateX(-2000px) scale(0.7)",opacity:"0.7"}],gf=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateX(2000px) scale(0.7)",opacity:"0.7"}],bf=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateY(-700px) scale(0.7)",opacity:"0.7"}],wf=[{offset:0,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.2,transform:"scale3d(1.1, 1.1, 1.1)"},{offset:.2,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.4,transform:"scale3d(0.9, 0.9, 0.9)"},{offset:.4,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"scale3d(1.03, 1.03, 1.03)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.8,transform:"scale3d(0.97, 0.97, 0.97)"},{offset:.8,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,opacity:"1",transform:"scale3d(1, 1, 1)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],vf=[{offset:0,opacity:"0",transform:"translate3d(0, -3000px, 0) scaleY(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(0, 25px, 0) scaleY(0.9)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(0, -10px, 0) scaleY(0.95)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(0, 5px, 0) scaleY(0.985)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],yf=[{offset:0,opacity:"0",transform:"translate3d(-3000px, 0, 0) scaleX(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(25px, 0, 0) scaleX(1)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(-10px, 0, 0) scaleX(0.98)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(5px, 0, 0) scaleX(0.995)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],xf=[{offset:0,opacity:"0",transform:"translate3d(3000px, 0, 0) scaleX(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(-25px, 0, 0) scaleX(1)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(10px, 0, 0) scaleX(0.98)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(-5px, 0, 0) scaleX(0.995)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],kf=[{offset:0,opacity:"0",transform:"translate3d(0, 3000px, 0) scaleY(5)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(0, 10px, 0) scaleY(0.95)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(0, -5px, 0) scaleY(0.985)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],Cf=[{offset:.2,transform:"scale3d(0.9, 0.9, 0.9)"},{offset:.5,opacity:"1",transform:"scale3d(1.1, 1.1, 1.1)"},{offset:.55,opacity:"1",transform:"scale3d(1.1, 1.1, 1.1)"},{offset:1,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"}],$f=[{offset:.2,transform:"translate3d(0, 10px, 0) scaleY(0.985)"},{offset:.4,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:.45,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:1,opacity:"0",transform:"translate3d(0, 2000px, 0) scaleY(3)"}],Sf=[{offset:.2,opacity:"1",transform:"translate3d(20px, 0, 0) scaleX(0.9)"},{offset:1,opacity:"0",transform:"translate3d(-2000px, 0, 0) scaleX(2)"}],Ef=[{offset:.2,opacity:"1",transform:"translate3d(-20px, 0, 0) scaleX(0.9)"},{offset:1,opacity:"0",transform:"translate3d(2000px, 0, 0) scaleX(2)"}],Af=[{offset:.2,transform:"translate3d(0, -10px, 0) scaleY(0.985)"},{offset:.4,opacity:"1",transform:"translate3d(0, 20px, 0) scaleY(0.9)"},{offset:.45,opacity:"1",transform:"translate3d(0, 20px, 0) scaleY(0.9)"},{offset:1,opacity:"0",transform:"translate3d(0, -2000px, 0) scaleY(3)"}],Lf=[{offset:0,opacity:"0"},{offset:1,opacity:"1"}],_f=[{offset:0,opacity:"0",transform:"translate3d(-100%, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Tf=[{offset:0,opacity:"0",transform:"translate3d(100%, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],zf=[{offset:0,opacity:"0",transform:"translate3d(0, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Rf=[{offset:0,opacity:"0",transform:"translate3d(0, -2000px, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Df=[{offset:0,opacity:"0",transform:"translate3d(-100%, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Of=[{offset:0,opacity:"0",transform:"translate3d(-2000px, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],If=[{offset:0,opacity:"0",transform:"translate3d(100%, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Pf=[{offset:0,opacity:"0",transform:"translate3d(2000px, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Mf=[{offset:0,opacity:"0",transform:"translate3d(-100%, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Nf=[{offset:0,opacity:"0",transform:"translate3d(100%, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Ff=[{offset:0,opacity:"0",transform:"translate3d(0, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Bf=[{offset:0,opacity:"0",transform:"translate3d(0, 2000px, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Uf=[{offset:0,opacity:"1"},{offset:1,opacity:"0"}],Vf=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(-100%, 100%, 0)"}],qf=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(100%, 100%, 0)"}],Hf=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, 100%, 0)"}],Wf=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, 2000px, 0)"}],jf=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(-100%, 0, 0)"}],Kf=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(-2000px, 0, 0)"}],Gf=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(100%, 0, 0)"}],Xf=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(2000px, 0, 0)"}],Yf=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(-100%, -100%, 0)"}],Zf=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(100%, -100%, 0)"}],Qf=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, -100%, 0)"}],Jf=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, -2000px, 0)"}],tm=[{offset:0,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)",easing:"ease-out"},{offset:.4,transform:`perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -190deg)`,easing:"ease-out"},{offset:.5,transform:`perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -170deg)`,easing:"ease-in"},{offset:.8,transform:`perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)
      rotate3d(0, 1, 0, 0deg)`,easing:"ease-in"},{offset:1,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)",easing:"ease-in"}],em=[{offset:0,transform:"perspective(400px) rotate3d(1, 0, 0, 90deg)",easing:"ease-in",opacity:"0"},{offset:.4,transform:"perspective(400px) rotate3d(1, 0, 0, -20deg)",easing:"ease-in"},{offset:.6,transform:"perspective(400px) rotate3d(1, 0, 0, 10deg)",opacity:"1"},{offset:.8,transform:"perspective(400px) rotate3d(1, 0, 0, -5deg)"},{offset:1,transform:"perspective(400px)"}],im=[{offset:0,transform:"perspective(400px) rotate3d(0, 1, 0, 90deg)",easing:"ease-in",opacity:"0"},{offset:.4,transform:"perspective(400px) rotate3d(0, 1, 0, -20deg)",easing:"ease-in"},{offset:.6,transform:"perspective(400px) rotate3d(0, 1, 0, 10deg)",opacity:"1"},{offset:.8,transform:"perspective(400px) rotate3d(0, 1, 0, -5deg)"},{offset:1,transform:"perspective(400px)"}],rm=[{offset:0,transform:"perspective(400px)"},{offset:.3,transform:"perspective(400px) rotate3d(1, 0, 0, -20deg)",opacity:"1"},{offset:1,transform:"perspective(400px) rotate3d(1, 0, 0, 90deg)",opacity:"0"}],om=[{offset:0,transform:"perspective(400px)"},{offset:.3,transform:"perspective(400px) rotate3d(0, 1, 0, -15deg)",opacity:"1"},{offset:1,transform:"perspective(400px) rotate3d(0, 1, 0, 90deg)",opacity:"0"}],sm=[{offset:0,transform:"translate3d(-100%, 0, 0) skewX(30deg)",opacity:"0"},{offset:.6,transform:"skewX(-20deg)",opacity:"1"},{offset:.8,transform:"skewX(5deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],am=[{offset:0,transform:"translate3d(100%, 0, 0) skewX(-30deg)",opacity:"0"},{offset:.6,transform:"skewX(20deg)",opacity:"1"},{offset:.8,transform:"skewX(-5deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],nm=[{offset:0,opacity:"1"},{offset:1,transform:"translate3d(-100%, 0, 0) skewX(-30deg)",opacity:"0"}],lm=[{offset:0,opacity:"1"},{offset:1,transform:"translate3d(100%, 0, 0) skewX(30deg)",opacity:"0"}],cm=[{offset:0,transform:"rotate3d(0, 0, 1, -200deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],dm=[{offset:0,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],hm=[{offset:0,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],um=[{offset:0,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],pm=[{offset:0,transform:"rotate3d(0, 0, 1, -90deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],fm=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 200deg)",opacity:"0"}],mm=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"}],gm=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"}],bm=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"}],wm=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 90deg)",opacity:"0"}],vm=[{offset:0,transform:"translate3d(0, -100%, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],ym=[{offset:0,transform:"translate3d(-100%, 0, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],xm=[{offset:0,transform:"translate3d(100%, 0, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],km=[{offset:0,transform:"translate3d(0, 100%, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],Cm=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(0, 100%, 0)"}],$m=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(-100%, 0, 0)"}],Sm=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(100%, 0, 0)"}],Em=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(0, -100%, 0)"}],Am=[{offset:0,easing:"ease-in-out"},{offset:.2,transform:"rotate3d(0, 0, 1, 80deg)",easing:"ease-in-out"},{offset:.4,transform:"rotate3d(0, 0, 1, 60deg)",easing:"ease-in-out",opacity:"1"},{offset:.6,transform:"rotate3d(0, 0, 1, 80deg)",easing:"ease-in-out"},{offset:.8,transform:"rotate3d(0, 0, 1, 60deg)",easing:"ease-in-out",opacity:"1"},{offset:1,transform:"translate3d(0, 700px, 0)",opacity:"0"}],Lm=[{offset:0,opacity:"0",transform:"scale(0.1) rotate(30deg)","transform-origin":"center bottom"},{offset:.5,transform:"rotate(-10deg)"},{offset:.7,transform:"rotate(3deg)"},{offset:1,opacity:"1",transform:"scale(1)"}],_m=[{offset:0,opacity:"0",transform:"translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Tm=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)"}],zm=[{offset:0,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:.5,opacity:"1"}],Rm=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Dm=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Om=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Im=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Pm=[{offset:0,opacity:"1"},{offset:.5,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:1,opacity:"0"}],Mm=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:1,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Nm=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0)"},{offset:1,opacity:"0",transform:"scale(0.1) translate3d(-2000px, 0, 0)"}],Fm=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0)"},{offset:1,opacity:"0",transform:"scale(0.1) translate3d(2000px, 0, 0)"}],Bm=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:1,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Rc={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",easeInSine:"cubic-bezier(0.47, 0, 0.745, 0.715)",easeOutSine:"cubic-bezier(0.39, 0.575, 0.565, 1)",easeInOutSine:"cubic-bezier(0.445, 0.05, 0.55, 0.95)",easeInQuad:"cubic-bezier(0.55, 0.085, 0.68, 0.53)",easeOutQuad:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",easeInOutQuad:"cubic-bezier(0.455, 0.03, 0.515, 0.955)",easeInCubic:"cubic-bezier(0.55, 0.055, 0.675, 0.19)",easeOutCubic:"cubic-bezier(0.215, 0.61, 0.355, 1)",easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1)",easeInQuart:"cubic-bezier(0.895, 0.03, 0.685, 0.22)",easeOutQuart:"cubic-bezier(0.165, 0.84, 0.44, 1)",easeInOutQuart:"cubic-bezier(0.77, 0, 0.175, 1)",easeInQuint:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",easeOutQuint:"cubic-bezier(0.23, 1, 0.32, 1)",easeInOutQuint:"cubic-bezier(0.86, 0, 0.07, 1)",easeInExpo:"cubic-bezier(0.95, 0.05, 0.795, 0.035)",easeOutExpo:"cubic-bezier(0.19, 1, 0.22, 1)",easeInOutExpo:"cubic-bezier(1, 0, 0, 1)",easeInCirc:"cubic-bezier(0.6, 0.04, 0.98, 0.335)",easeOutCirc:"cubic-bezier(0.075, 0.82, 0.165, 1)",easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.15, 0.86)",easeInBack:"cubic-bezier(0.6, -0.28, 0.735, 0.045)",easeOutBack:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",easeInOutBack:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"},Um=Object.freeze(Object.defineProperty({__proto__:null,backInDown:df,backInLeft:hf,backInRight:uf,backInUp:pf,backOutDown:ff,backOutLeft:mf,backOutRight:gf,backOutUp:bf,bounce:Yp,bounceIn:wf,bounceInDown:vf,bounceInLeft:yf,bounceInRight:xf,bounceInUp:kf,bounceOut:Cf,bounceOutDown:$f,bounceOutLeft:Sf,bounceOutRight:Ef,bounceOutUp:Af,easings:Rc,fadeIn:Lf,fadeInBottomLeft:_f,fadeInBottomRight:Tf,fadeInDown:zf,fadeInDownBig:Rf,fadeInLeft:Df,fadeInLeftBig:Of,fadeInRight:If,fadeInRightBig:Pf,fadeInTopLeft:Mf,fadeInTopRight:Nf,fadeInUp:Ff,fadeInUpBig:Bf,fadeOut:Uf,fadeOutBottomLeft:Vf,fadeOutBottomRight:qf,fadeOutDown:Hf,fadeOutDownBig:Wf,fadeOutLeft:jf,fadeOutLeftBig:Kf,fadeOutRight:Gf,fadeOutRightBig:Xf,fadeOutTopLeft:Yf,fadeOutTopRight:Zf,fadeOutUp:Qf,fadeOutUpBig:Jf,flash:Zp,flip:tm,flipInX:em,flipInY:im,flipOutX:rm,flipOutY:om,headShake:Qp,heartBeat:Jp,hinge:Am,jackInTheBox:Lm,jello:tf,lightSpeedInLeft:sm,lightSpeedInRight:am,lightSpeedOutLeft:nm,lightSpeedOutRight:lm,pulse:ef,rollIn:_m,rollOut:Tm,rotateIn:cm,rotateInDownLeft:dm,rotateInDownRight:hm,rotateInUpLeft:um,rotateInUpRight:pm,rotateOut:fm,rotateOutDownLeft:mm,rotateOutDownRight:gm,rotateOutUpLeft:bm,rotateOutUpRight:wm,rubberBand:rf,shake:of,shakeX:sf,shakeY:af,slideInDown:vm,slideInLeft:ym,slideInRight:xm,slideInUp:km,slideOutDown:Cm,slideOutLeft:$m,slideOutRight:Sm,slideOutUp:Em,swing:nf,tada:lf,wobble:cf,zoomIn:zm,zoomInDown:Rm,zoomInLeft:Dm,zoomInRight:Om,zoomInUp:Im,zoomOut:Pm,zoomOutDown:Mm,zoomOutLeft:Nm,zoomOutRight:Fm,zoomOutUp:Bm},Symbol.toStringTag,{value:"Module"}));var dt=class extends z{constructor(){super(...arguments),this.hasStarted=!1,this.name="none",this.play=!1,this.delay=0,this.direction="normal",this.duration=1e3,this.easing="linear",this.endDelay=0,this.fill="auto",this.iterations=1/0,this.iterationStart=0,this.playbackRate=1,this.handleAnimationFinish=()=>{this.play=!1,this.hasStarted=!1,this.dispatchEvent(new Kp)},this.handleAnimationCancel=()=>{this.play=!1,this.hasStarted=!1,this.dispatchEvent(new Gp)}}get currentTime(){return this.animation?.currentTime??0}set currentTime(t){this.animation&&(this.animation.currentTime=t)}connectedCallback(){super.connectedCallback(),this.createAnimation()}disconnectedCallback(){super.disconnectedCallback(),this.destroyAnimation()}handleSlotChange(){this.destroyAnimation(),this.createAnimation()}async createAnimation(){const t=Rc[this.easing]??this.easing,e=this.keyframes??Um[this.name],r=(await this.defaultSlot).assignedElements()[0];return!r||!e?!1:(this.destroyAnimation(),this.animation=r.animate(e,{delay:this.delay,direction:this.direction,duration:this.duration,easing:t,endDelay:this.endDelay,fill:this.fill,iterationStart:this.iterationStart,iterations:this.iterations}),this.animation.playbackRate=this.playbackRate,this.animation.addEventListener("cancel",this.handleAnimationCancel),this.animation.addEventListener("finish",this.handleAnimationFinish),this.play?(this.hasStarted=!0,this.dispatchEvent(new dl)):this.animation.pause(),!0)}destroyAnimation(){this.animation&&(this.animation.cancel(),this.animation.removeEventListener("cancel",this.handleAnimationCancel),this.animation.removeEventListener("finish",this.handleAnimationFinish),this.hasStarted=!1)}handleAnimationChange(){this.hasUpdated&&this.createAnimation()}handlePlayChange(){return this.animation?(this.play&&!this.hasStarted&&(this.hasStarted=!0,this.dispatchEvent(new dl)),this.play?this.animation.play():this.animation.pause(),!0):!1}handlePlaybackRateChange(){this.animation&&(this.animation.playbackRate=this.playbackRate)}cancel(){this.animation?.cancel()}finish(){this.animation?.finish()}render(){return p` <slot @slotchange=${this.handleSlotChange}></slot> `}};dt.css=Xp;n([Uu("slot")],dt.prototype,"defaultSlot",2);n([d()],dt.prototype,"name",2);n([d({type:Boolean,reflect:!0})],dt.prototype,"play",2);n([d({type:Number})],dt.prototype,"delay",2);n([d()],dt.prototype,"direction",2);n([d({type:Number})],dt.prototype,"duration",2);n([d()],dt.prototype,"easing",2);n([d({attribute:"end-delay",type:Number})],dt.prototype,"endDelay",2);n([d()],dt.prototype,"fill",2);n([d({type:Number})],dt.prototype,"iterations",2);n([d({attribute:"iteration-start",type:Number})],dt.prototype,"iterationStart",2);n([d({attribute:!1})],dt.prototype,"keyframes",2);n([d({attribute:"playback-rate",type:Number})],dt.prototype,"playbackRate",2);n([k(["name","delay","direction","duration","easing","endDelay","fill","iterations","iterationsStart","keyframes"])],dt.prototype,"handleAnimationChange",1);n([k("play")],dt.prototype,"handlePlayChange",1);n([k("playbackRate")],dt.prototype,"handlePlaybackRateChange",1);dt=n([v("wa-animation")],dt);var Vm=C`
  :host {
    --size: 3rem;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--size);
    height: var(--size);
    color: var(--wa-color-neutral-on-normal);
    font: inherit;
    font-size: calc(var(--size) * 0.4);
    vertical-align: middle;
    background-color: var(--wa-color-neutral-fill-normal);
    border-radius: var(--wa-border-radius-circle);
    user-select: none;
    -webkit-user-select: none;
  }

  :host([shape='square']) {
    border-radius: 0;
  }

  :host([shape='rounded']) {
    border-radius: var(--wa-border-radius-m);
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .initials {
    line-height: 1;
    text-transform: uppercase;
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
    border-radius: inherit;
  }
`;var Oe=class extends z{constructor(){super(...arguments),this.hasError=!1,this.image="",this.label="",this.initials="",this.loading="eager",this.shape="circle"}handleImageChange(){this.hasError=!1}handleImageLoadError(){this.hasError=!0,this.dispatchEvent(new or)}render(){const t=p`
      <img
        part="image"
        class="image"
        src="${this.image}"
        loading="${this.loading}"
        role="img"
        aria-label=${this.label}
        @error="${this.handleImageLoadError}"
      />
    `;let e=p``;return this.initials?e=p`<div part="initials" class="initials" role="img" aria-label=${this.label}>
        ${this.initials}
      </div>`:e=p`
        <slot name="icon" part="icon" class="icon" role="img" aria-label=${this.label}>
          <wa-icon name="user" library="system" variant="solid"></wa-icon>
        </slot>
      `,p` ${this.image&&!this.hasError?t:e} `}};Oe.css=Vm;n([w()],Oe.prototype,"hasError",2);n([d()],Oe.prototype,"image",2);n([d()],Oe.prototype,"label",2);n([d()],Oe.prototype,"initials",2);n([d()],Oe.prototype,"loading",2);n([d({reflect:!0})],Oe.prototype,"shape",2);n([k("image")],Oe.prototype,"handleImageChange",1);Oe=n([v("wa-avatar")],Oe);var ys=C`
  :where(:root),
  .wa-neutral,
  :host([variant='neutral']) {
    --wa-color-fill-loud: var(--wa-color-neutral-fill-loud);
    --wa-color-fill-normal: var(--wa-color-neutral-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-neutral-fill-quiet);
    --wa-color-border-loud: var(--wa-color-neutral-border-loud);
    --wa-color-border-normal: var(--wa-color-neutral-border-normal);
    --wa-color-border-quiet: var(--wa-color-neutral-border-quiet);
    --wa-color-on-loud: var(--wa-color-neutral-on-loud);
    --wa-color-on-normal: var(--wa-color-neutral-on-normal);
    --wa-color-on-quiet: var(--wa-color-neutral-on-quiet);
  }

  .wa-brand,
  :host([variant='brand']) {
    --wa-color-fill-loud: var(--wa-color-brand-fill-loud);
    --wa-color-fill-normal: var(--wa-color-brand-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-brand-fill-quiet);
    --wa-color-border-loud: var(--wa-color-brand-border-loud);
    --wa-color-border-normal: var(--wa-color-brand-border-normal);
    --wa-color-border-quiet: var(--wa-color-brand-border-quiet);
    --wa-color-on-loud: var(--wa-color-brand-on-loud);
    --wa-color-on-normal: var(--wa-color-brand-on-normal);
    --wa-color-on-quiet: var(--wa-color-brand-on-quiet);
  }

  .wa-success,
  :host([variant='success']) {
    --wa-color-fill-loud: var(--wa-color-success-fill-loud);
    --wa-color-fill-normal: var(--wa-color-success-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-success-fill-quiet);
    --wa-color-border-loud: var(--wa-color-success-border-loud);
    --wa-color-border-normal: var(--wa-color-success-border-normal);
    --wa-color-border-quiet: var(--wa-color-success-border-quiet);
    --wa-color-on-loud: var(--wa-color-success-on-loud);
    --wa-color-on-normal: var(--wa-color-success-on-normal);
    --wa-color-on-quiet: var(--wa-color-success-on-quiet);
  }

  .wa-warning,
  :host([variant='warning']) {
    --wa-color-fill-loud: var(--wa-color-warning-fill-loud);
    --wa-color-fill-normal: var(--wa-color-warning-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-warning-fill-quiet);
    --wa-color-border-loud: var(--wa-color-warning-border-loud);
    --wa-color-border-normal: var(--wa-color-warning-border-normal);
    --wa-color-border-quiet: var(--wa-color-warning-border-quiet);
    --wa-color-on-loud: var(--wa-color-warning-on-loud);
    --wa-color-on-normal: var(--wa-color-warning-on-normal);
    --wa-color-on-quiet: var(--wa-color-warning-on-quiet);
  }

  .wa-danger,
  :host([variant='danger']) {
    --wa-color-fill-loud: var(--wa-color-danger-fill-loud);
    --wa-color-fill-normal: var(--wa-color-danger-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-danger-fill-quiet);
    --wa-color-border-loud: var(--wa-color-danger-border-loud);
    --wa-color-border-normal: var(--wa-color-danger-border-normal);
    --wa-color-border-quiet: var(--wa-color-danger-border-quiet);
    --wa-color-on-loud: var(--wa-color-danger-on-loud);
    --wa-color-on-normal: var(--wa-color-danger-on-normal);
    --wa-color-on-quiet: var(--wa-color-danger-on-quiet);
  }
`;var qm=C`
  :host {
    --pulse-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));

    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.375em 0.625em;
    color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
    font-size: max(var(--wa-font-size-2xs), 0.75em);
    font-weight: var(--wa-font-weight-semibold);
    line-height: 1;
    white-space: nowrap;
    background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
    border-color: transparent;
    border-radius: var(--wa-border-radius-s);
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) {
    --pulse-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));

    color: var(--wa-color-on-quiet, var(--wa-color-brand-on-quiet));
    background-color: transparent;
    border-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));
  }

  :host([appearance='filled']) {
    --pulse-color: var(--wa-color-fill-normal, var(--wa-color-brand-fill-normal));

    color: var(--wa-color-on-normal, var(--wa-color-brand-on-normal));
    background-color: var(--wa-color-fill-normal, var(--wa-color-brand-fill-normal));
    border-color: transparent;
  }

  :host([appearance='filled-outlined']) {
    --pulse-color: var(--wa-color-border-normal, var(--wa-color-brand-border-normal));

    color: var(--wa-color-on-normal, var(--wa-color-brand-on-normal));
    background-color: var(--wa-color-fill-normal, var(--wa-color-brand-fill-normal));
    border-color: var(--wa-color-border-normal, var(--wa-color-brand-border-normal));
  }

  :host([appearance='accent']) {
    --pulse-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));

    color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
    background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
    border-color: transparent;
  }

  /* Pill modifier */
  :host([pill]) {
    border-radius: var(--wa-border-radius-pill);
  }

  /* Pulse attention */
  :host([attention='pulse']) {
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  /* Bounce attention */
  :host([attention='bounce']) {
    animation: bounce 1s cubic-bezier(0.28, 0.84, 0.42, 1) infinite;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-5px);
    }
    60% {
      transform: translateY(-2px);
    }
  }

  ::slotted(wa-icon) {
    margin-inline-end: var(--wa-space-2xs, 0.25em);
    opacity: 90%;
    line-height: 1;
    height: 0.85em;
  }
`;var Ni=class extends z{constructor(){super(...arguments),this.variant="brand",this.appearance="accent",this.pill=!1,this.attention="none"}render(){return p` <slot part="base" role="status"></slot>`}};Ni.css=[ys,qm];n([d({reflect:!0})],Ni.prototype,"variant",2);n([d({reflect:!0})],Ni.prototype,"appearance",2);n([d({type:Boolean,reflect:!0})],Ni.prototype,"pill",2);n([d({reflect:!0})],Ni.prototype,"attention",2);Ni=n([v("wa-badge")],Ni);var Hm=C`
  .breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`;var pr=class extends z{constructor(){super(...arguments),this.localize=new W(this),this.separatorDir=this.localize.dir(),this.label=""}getSeparator(){const e=this.separatorSlot.assignedElements({flatten:!0})[0].cloneNode(!0);return[e,...e.querySelectorAll("[id]")].forEach(i=>i.removeAttribute("id")),e.setAttribute("data-default",""),e.slot="separator",e}handleSlotChange(){const t=[...this.defaultSlot.assignedElements({flatten:!0})].filter(e=>e.tagName.toLowerCase()==="wa-breadcrumb-item");t.forEach((e,i)=>{const r=e.querySelector('[slot="separator"]');r===null?e.append(this.getSeparator()):r.hasAttribute("data-default")&&r.replaceWith(this.getSeparator()),i===t.length-1?e.setAttribute("aria-current","page"):e.removeAttribute("aria-current")})}render(){return this.separatorDir!==this.localize.dir()&&(this.separatorDir=this.localize.dir(),this.updateComplete.then(()=>this.handleSlotChange())),p`
      <nav part="base" class="breadcrumb" aria-label=${this.label}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </nav>

      <span hidden aria-hidden="true">
        <slot name="separator">
          <wa-icon
            name=${this.localize.dir()==="rtl"?"chevron-left":"chevron-right"}
            library="system"
            variant="solid"
          ></wa-icon>
        </slot>
      </span>
    `}};pr.css=Hm;n([x("slot")],pr.prototype,"defaultSlot",2);n([x('slot[name="separator"]')],pr.prototype,"separatorSlot",2);n([d()],pr.prototype,"label",2);pr=n([v("wa-breadcrumb")],pr);var Wm=C`
  :host {
    color: var(--wa-color-text-link);
    display: inline-flex;
    align-items: center;
    font: inherit;
    font-weight: var(--wa-font-weight-action);
    line-height: var(--wa-line-height-normal);
    white-space: nowrap;
  }

  :host(:last-of-type) {
    color: var(--wa-color-text-quiet);
  }

  .label {
    display: inline-block;
    font: inherit;
    text-decoration: none;
    color: currentColor;
    background: none;
    border: none;
    border-radius: var(--wa-border-radius-m);
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: color var(--wa-transition-normal) var(--wa-transition-easing);
  }

  @media (hover: hover) {
    :host(:not(:last-of-type)) .label:hover {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
    }
  }

  :host(:not(:last-of-type)) .label:active {
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
  }

  .label:focus {
    outline: none;
  }

  .label:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  .start,
  .end {
    display: none;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .start,
  .end {
    display: inline-flex;
    color: var(--wa-color-text-quiet);
  }

  ::slotted([slot='start']) {
    margin-inline-end: var(--wa-space-s);
  }

  ::slotted([slot='end']) {
    margin-inline-start: var(--wa-space-s);
  }

  :host(:last-of-type) .separator {
    display: none;
  }

  .separator {
    color: var(--wa-color-text-quiet);
    display: inline-flex;
    align-items: center;
    margin: 0 var(--wa-space-s);
    user-select: none;
    -webkit-user-select: none;
  }
`;const T=t=>t??R;var Ge=class extends z{constructor(){super(...arguments),this.renderType="button",this.rel="noreferrer noopener"}setRenderType(){const t=this.defaultSlot.assignedElements({flatten:!0}).filter(e=>e.tagName.toLowerCase()==="wa-dropdown").length>0;if(this.href){this.renderType="link";return}if(t){this.renderType="dropdown";return}this.renderType="button"}hrefChanged(){this.setRenderType()}handleSlotChange(){this.setRenderType()}render(){return p`
      <span part="start" class="start">
        <slot name="start"></slot>
      </span>

      ${this.renderType==="link"?p`
            <a
              part="label"
              class="label label-link"
              href="${this.href}"
              target="${T(this.target?this.target:void 0)}"
              rel=${T(this.target?this.rel:void 0)}
            >
              <slot></slot>
            </a>
          `:""}
      ${this.renderType==="button"?p`
            <button part="label" type="button" class="label label-button">
              <slot @slotchange=${this.handleSlotChange}></slot>
            </button>
          `:""}
      ${this.renderType==="dropdown"?p`
            <div part="label" class="label label-dropdown">
              <slot @slotchange=${this.handleSlotChange}></slot>
            </div>
          `:""}

      <span part="end" class="end">
        <slot name="end"></slot>
      </span>

      <span part="separator" class="separator" aria-hidden="true">
        <slot name="separator"></slot>
      </span>
    `}};Ge.css=Wm;n([x("slot:not([name])")],Ge.prototype,"defaultSlot",2);n([w()],Ge.prototype,"renderType",2);n([d()],Ge.prototype,"href",2);n([d()],Ge.prototype,"target",2);n([d()],Ge.prototype,"rel",2);n([k("href",{waitUntilFirstUpdate:!0})],Ge.prototype,"hrefChanged",1);Ge=n([v("wa-breadcrumb-item")],Ge);var uo=()=>({checkValidity(t){const e=t.input,i={message:"",isValid:!0,invalidKeys:[]};if(!e)return i;let r=!0;if("checkValidity"in e&&(r=e.checkValidity()),r)return i;if(i.isValid=!1,"validationMessage"in e&&(i.message=e.validationMessage),!("validity"in e))return i.invalidKeys.push("customError"),i;for(const o in e.validity){if(o==="valid")continue;const s=o;e.validity[s]&&i.invalidKeys.push(s)}return i}});var pn=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}};var jm=()=>({observedAttributes:["custom-error"],checkValidity(t){const e={message:"",isValid:!0,invalidKeys:[]};return t.customError&&(e.message=t.customError,e.isValid=!1,e.invalidKeys=["customError"]),e}}),J=class extends z{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=t=>{t.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new pn))},this.handleInteraction=t=>{const e=this.emittedEvents;e.includes(t.type)||e.push(t.type),e.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[jm()]}static get observedAttributes(){const t=new Set(super.observedAttributes||[]);for(const e of this.validators)if(e.observedAttributes)for(const i of e.observedAttributes)t.add(i);return[...t]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(t=>{this.addEventListener(t,this.handleInteraction)})}firstUpdated(...t){super.firstUpdated(...t),this.updateValidity()}willUpdate(t){if(t.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),t.has("value")||t.has("disabled")){const e=this.value;if(Array.isArray(e)){if(this.name){const i=new FormData;for(const r of e)i.append(this.name,r);this.setValue(i,i)}}else this.setValue(e,e)}t.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),this.updateValidity(),super.willUpdate(t)}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(t){t?this.setAttribute("form",t):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...t){const e=t[0],i=t[1];let r=t[2];r||(r=this.validationTarget),this.internals.setValidity(e,i,r||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){const t=!!this.required,e=this.internals.validity.valid,i=this.hasInteracted;this.customStates.set("required",t),this.customStates.set("optional",!t),this.customStates.set("invalid",!e),this.customStates.set("valid",e),this.customStates.set("user-invalid",!e&&i),this.customStates.set("user-valid",e&&i)}setCustomValidity(t){if(!t){this.customError=null,this.setValidity({});return}this.customError=t,this.setValidity({customError:!0},t,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(t){this.disabled=t,this.updateValidity()}formStateRestoreCallback(t,e){this.value=t,e==="restore"&&this.resetValidity(),this.updateValidity()}setValue(...t){const[e,i]=t;this.internals.setFormValue(e,i)}get allValidators(){const t=this.constructor.validators||[],e=this.validators||[];return[...t,...e]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}const t=this.allValidators;if(!t?.length)return;const e={customError:!!this.customError},i=this.validationTarget||this.input||void 0;let r="";for(const o of t){const{isValid:s,message:a,invalidKeys:l}=o.checkValidity(this);s||(r||(r=a),l?.length>=0&&l.forEach(c=>e[c]=!0))}r||(r=this.validationMessage),this.setValidity(e,r,i)}};J.formAssociated=!0;n([d({reflect:!0})],J.prototype,"name",2);n([d({type:Boolean})],J.prototype,"disabled",2);n([d({state:!0,attribute:!1})],J.prototype,"valueHasChanged",2);n([d({state:!0,attribute:!1})],J.prototype,"hasInteracted",2);n([d({attribute:"custom-error",reflect:!0})],J.prototype,"customError",2);n([d({attribute:!1,state:!0,type:Object})],J.prototype,"validity",1);var Km=C`
  @layer wa-component {
    :host {
      display: inline-block;

      /* Workaround because Chrome doesn't like :host(:has()) below
       * https://issues.chromium.org/issues/40062355
       * Firefox doesn't like this nested rule, so both are needed */
      &:has(wa-badge) {
        position: relative;
      }
    }

    /* Apply relative positioning only when needed to position wa-badge
     * This avoids creating a new stacking context for every button */
    :host(:has(wa-badge)) {
      position: relative;
    }
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    transition-property: background, border, box-shadow, color, opacity;
    transition-duration: var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    cursor: pointer;
    padding: 0 var(--wa-form-control-padding-inline);
    font-family: inherit;
    font-size: inherit;
    font-weight: var(--wa-font-weight-action);
    line-height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
    height: var(--wa-form-control-height);
    width: 100%;

    background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
    border-color: transparent;
    color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
  }

  /* Appearance modifiers */
  :host([appearance='plain']) {
    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='outlined']) {
    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled']) {
    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled-outlined']) {
    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='accent']) {
    .button {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
        var(--wa-color-mix-active)
      );
    }
  }

  /* Focus states */
  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled state */
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;

    /* When disabled, prevent mouse events from bubbling up from children */
    .button {
      pointer-events: none;
    }
  }

  /* Keep it last so Safari doesn't stop parsing this block */
  .button::-moz-focus-inner {
    border: 0;
  }

  /* Icon buttons */
  .button.is-icon-button {
    outline-offset: 2px;
    width: var(--wa-form-control-height);
    aspect-ratio: 1;
  }

  .button.is-icon-button:has(wa-icon) {
    width: auto;
  }

  /* Pill modifier */
  :host([pill]) .button {
    border-radius: var(--wa-border-radius-pill);
  }

  /*
   * Label
   */

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .label {
    display: inline-block;
  }

  .is-icon-button .label {
    display: flex;
  }

  .label::slotted(wa-icon) {
    align-self: center;
  }

  /*
   * Caret modifier
   */

  wa-icon[part='caret'] {
    display: flex;
    align-self: center;
    align-items: center;

    &::part(svg) {
      width: 0.875em;
      height: 0.875em;
    }

    .button:has(&) .end {
      display: none;
    }
  }

  /*
   * Loading modifier
   */

  .loading {
    position: relative;
    cursor: wait;

    .start,
    .label,
    .end,
    .caret {
      visibility: hidden;
    }

    wa-spinner {
      --indicator-color: currentColor;
      --track-color: color-mix(in oklab, currentColor, transparent 90%);

      position: absolute;
      font-size: 1em;
      height: 1em;
      width: 1em;
      top: calc(50% - 0.5em);
      left: calc(50% - 0.5em);
    }
  }

  /*
   * Badges
   */

  .button ::slotted(wa-badge) {
    border-color: var(--wa-color-surface-default);
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  :host(:dir(rtl)) ::slotted(wa-badge) {
    translate: -50% -50%;
  }

  /*
  * Button spacing
  */

  slot[name='start']::slotted(*) {
    margin-inline-end: 0.75em;
  }

  slot[name='end']::slotted(*),
  .button:not(.visually-hidden-label) [part='caret'] {
    margin-inline-start: 0.75em;
  }

  /*
   * Button group border radius modifications
   */

  /* Remove border radius from all grouped buttons by default */
  :host(.wa-button-group__button) .button {
    border-radius: 0;
  }

  /* Horizontal orientation */
  :host(.wa-button-group__horizontal.wa-button-group__button-first) .button {
    border-start-start-radius: var(--wa-form-control-border-radius);
    border-end-start-radius: var(--wa-form-control-border-radius);
  }

  :host(.wa-button-group__horizontal.wa-button-group__button-last) .button {
    border-start-end-radius: var(--wa-form-control-border-radius);
    border-end-end-radius: var(--wa-form-control-border-radius);
  }

  /* Vertical orientation */
  :host(.wa-button-group__vertical) {
    flex: 1 1 auto;
  }

  :host(.wa-button-group__vertical) .button {
    width: 100%;
    justify-content: start;
  }

  :host(.wa-button-group__vertical.wa-button-group__button-first) .button {
    border-start-start-radius: var(--wa-form-control-border-radius);
    border-start-end-radius: var(--wa-form-control-border-radius);
  }

  :host(.wa-button-group__vertical.wa-button-group__button-last) .button {
    border-end-start-radius: var(--wa-form-control-border-radius);
    border-end-end-radius: var(--wa-form-control-border-radius);
  }

  /* Handle pill modifier for button groups */
  :host([pill].wa-button-group__horizontal.wa-button-group__button-first) .button {
    border-start-start-radius: var(--wa-border-radius-pill);
    border-end-start-radius: var(--wa-border-radius-pill);
  }

  :host([pill].wa-button-group__horizontal.wa-button-group__button-last) .button {
    border-start-end-radius: var(--wa-border-radius-pill);
    border-end-end-radius: var(--wa-border-radius-pill);
  }

  :host([pill].wa-button-group__vertical.wa-button-group__button-first) .button {
    border-start-start-radius: var(--wa-border-radius-pill);
    border-start-end-radius: var(--wa-border-radius-pill);
  }

  :host([pill].wa-button-group__vertical.wa-button-group__button-last) .button {
    border-end-start-radius: var(--wa-border-radius-pill);
    border-end-end-radius: var(--wa-border-radius-pill);
  }
`;var jt=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=i=>{const r=i.target;(this.slotNames.includes("[default]")&&!r.name||r.name&&this.slotNames.includes(r.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===Node.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===Node.ELEMENT_NODE){const e=t;if(e.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};var Tt=C`
  :host([size='small']),
  .wa-size-s {
    font-size: var(--wa-font-size-s);
  }

  :host([size='medium']),
  .wa-size-m {
    font-size: var(--wa-font-size-m);
  }

  :host([size='large']),
  .wa-size-l {
    font-size: var(--wa-font-size-l);
  }
`;const D=$r(class extends Sr{constructor(t){if(super(t),t.type!==me.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in e)e[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(e)}const i=t.element.classList;for(const r of this.st)r in e||(i.remove(r),this.st.delete(r));for(const r in e){const o=!!e[r];o===this.st.has(r)||this.nt?.has(r)||(o?(i.add(r),this.st.add(r)):(i.remove(r),this.st.delete(r)))}return Ft}});const Dc=Symbol.for(""),Gm=t=>{if(t?.r===Dc)return t?._$litStatic$},hl=(t,...e)=>({_$litStatic$:e.reduce((i,r,o)=>i+(s=>{if(s._$litStatic$!==void 0)return s._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${s}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(r)+t[o+1],t[0]),r:Dc}),ul=new Map,Xm=t=>(e,...i)=>{const r=i.length;let o,s;const a=[],l=[];let c,h=0,u=!1;for(;h<r;){for(c=e[h];h<r&&(s=i[h],(o=Gm(s))!==void 0);)c+=o+e[++h],u=!0;h!==r&&l.push(s),a.push(c),h++}if(h===r&&a.push(e[r]),u){const f=a.join("$$lit$$");(e=ul.get(f))===void 0&&(a.raw=a,ul.set(f,e=a)),i=l}return t(e,...i)},Ks=Xm(p);var G=class extends J{constructor(){super(...arguments),this.assumeInteractionOn=["click"],this.hasSlotController=new jt(this,"[default]","start","end"),this.localize=new W(this),this.invalid=!1,this.isIconButton=!1,this.title="",this.variant="neutral",this.appearance="accent",this.size="medium",this.withCaret=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type="button"}static get validators(){return[...super.validators,uo()]}constructLightDOMButton(){const t=document.createElement("button");for(const e of this.attributes)e.name!=="style"&&t.setAttribute(e.name,e.value);return t.type=this.type,t.style.position="absolute !important",t.style.width="0 !important",t.style.height="0 !important",t.style.clipPath="inset(50%) !important",t.style.overflow="hidden !important",t.style.whiteSpace="nowrap !important",this.name&&(t.name=this.name),t.value=this.value||"",t}handleClick(t){if(this.disabled||this.loading){t.preventDefault(),t.stopImmediatePropagation();return}if(this.type!=="submit"&&this.type!=="reset"||!this.getForm())return;const i=this.constructLightDOMButton();this.parentElement?.append(i),i.click(),i.remove()}handleInvalid(){this.dispatchEvent(new pn)}handleLabelSlotChange(){const t=this.labelSlot.assignedNodes({flatten:!0});let e=!1,i=!1,r=!1,o=!1;[...t].forEach(s=>{if(s.nodeType===Node.ELEMENT_NODE){const a=s;a.localName==="wa-icon"?(i=!0,e||(e=a.label!==void 0)):o=!0}else s.nodeType===Node.TEXT_NODE&&(s.textContent?.trim()||"").length>0&&(r=!0)}),this.isIconButton=i&&!r&&!o,this.isIconButton&&!e&&console.warn('Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.updateValidity()}setValue(...t){}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){const t=this.isLink(),e=t?hl`a`:hl`button`;return Ks`
      <${e}
        part="base"
        class=${D({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:this.localize.dir()==="rtl","has-label":this.hasSlotController.test("[default]"),"has-start":this.hasSlotController.test("start"),"has-end":this.hasSlotController.test("end"),"is-icon-button":this.isIconButton})}
        ?disabled=${T(t?void 0:this.disabled)}
        type=${T(t?void 0:this.type)}
        title=${this.title}
        name=${T(t?void 0:this.name)}
        value=${T(t?void 0:this.value)}
        href=${T(t?this.href:void 0)}
        target=${T(t?this.target:void 0)}
        download=${T(t?this.download:void 0)}
        rel=${T(t&&this.rel?this.rel:void 0)}
        role=${T(t?void 0:"button")}
        aria-disabled=${T(t&&this.disabled?"true":void 0)}
        tabindex=${this.disabled?"-1":"0"}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret?Ks`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              `:""}
        ${this.loading?Ks`<wa-spinner part="spinner"></wa-spinner>`:""}
      </${e}>
    `}};G.shadowRootOptions={...J.shadowRootOptions,delegatesFocus:!0};G.css=[Km,ys,Tt];n([x(".button")],G.prototype,"button",2);n([x("slot:not([name])")],G.prototype,"labelSlot",2);n([w()],G.prototype,"invalid",2);n([w()],G.prototype,"isIconButton",2);n([d()],G.prototype,"title",2);n([d({reflect:!0})],G.prototype,"variant",2);n([d({reflect:!0})],G.prototype,"appearance",2);n([d({reflect:!0})],G.prototype,"size",2);n([d({attribute:"with-caret",type:Boolean,reflect:!0})],G.prototype,"withCaret",2);n([d({type:Boolean})],G.prototype,"disabled",2);n([d({type:Boolean,reflect:!0})],G.prototype,"loading",2);n([d({type:Boolean,reflect:!0})],G.prototype,"pill",2);n([d()],G.prototype,"type",2);n([d({reflect:!0})],G.prototype,"name",2);n([d({reflect:!0})],G.prototype,"value",2);n([d({reflect:!0})],G.prototype,"href",2);n([d()],G.prototype,"target",2);n([d()],G.prototype,"rel",2);n([d()],G.prototype,"download",2);n([d({attribute:"formaction"})],G.prototype,"formAction",2);n([d({attribute:"formenctype"})],G.prototype,"formEnctype",2);n([d({attribute:"formmethod"})],G.prototype,"formMethod",2);n([d({attribute:"formnovalidate",type:Boolean})],G.prototype,"formNoValidate",2);n([d({attribute:"formtarget"})],G.prototype,"formTarget",2);n([k("disabled",{waitUntilFirstUpdate:!0})],G.prototype,"handleDisabledChange",1);G=n([v("wa-button")],G);var Ym=C`
  :host {
    --track-width: 2px;
    --track-color: var(--wa-color-neutral-fill-normal);
    --indicator-color: var(--wa-color-brand-fill-loud);
    --speed: 2s;

    /*
      Resizing a spinner element using anything but font-size will break the animation because the animation uses em
      units. Therefore, if a spinner is used in a flex container without \`flex: none\` applied, the spinner can
      grow/shrink and break the animation. The use of \`flex: none\` on the host element prevents this by always having
      the spinner sized according to its actual dimensions.
    */
    flex: none;
    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  svg {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    animation: spin var(--speed) linear infinite;
  }

  .track {
    stroke: var(--track-color);
  }

  .indicator {
    stroke: var(--indicator-color);
    stroke-dasharray: 75, 100;
    stroke-dashoffset: -5;
    animation: dash 1.5s ease-in-out infinite;
    stroke-linecap: round;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;var ka=class extends z{constructor(){super(...arguments),this.localize=new W(this)}render(){return p`
      <svg
        part="base"
        role="progressbar"
        aria-label=${this.localize.term("loading")}
        fill="none"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
        <circle class="indicator" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
      </svg>
    `}};ka.css=Ym;ka=n([v("wa-spinner")],ka);var Zm=C`
  :host {
    display: inline-flex;
  }

  .button-group {
    display: flex;
    position: relative;
    isolation: isolate;
    flex-wrap: wrap;
    gap: 1px;

    @media (hover: hover) {
      > :hover,
      &::slotted(:hover) {
        z-index: 1;
      }
    }

    /* Focus and checked are always on top */
    > :focus,
    &::slotted(:focus),
    > [aria-checked='true'],
    &::slotted([aria-checked='true']),
    > [checked],
    &::slotted([checked]) {
      z-index: 2 !important;
    }
  }
  :host([orientation='vertical']) .button-group {
    flex-direction: column;
  }

  /* Button groups with at least one outlined button will not have a gap and instead have borders overlap */
  .button-group.has-outlined {
    gap: 0;

    &:not([aria-orientation='vertical']):not(.button-group-vertical)::slotted(:not(:first-child)) {
      margin-inline-start: calc(-1 * var(--border-width));
    }

    &:is([aria-orientation='vertical'], .button-group-vertical)::slotted(:not(:first-child)) {
      margin-block-start: calc(-1 * var(--border-width));
    }
  }
`;var ui=class extends z{constructor(){super(...arguments),this.disableRole=!1,this.hasOutlined=!1,this.label="",this.orientation="horizontal"}updated(t){super.updated(t),t.has("orientation")&&(this.setAttribute("aria-orientation",this.orientation),this.updateClassNames())}handleFocus(t){Nr(t.target)?.classList.add("button-focus")}handleBlur(t){Nr(t.target)?.classList.remove("button-focus")}handleMouseOver(t){Nr(t.target)?.classList.add("button-hover")}handleMouseOut(t){Nr(t.target)?.classList.remove("button-hover")}handleSlotChange(){this.updateClassNames()}updateClassNames(){const t=[...this.defaultSlot.assignedElements({flatten:!0})];this.hasOutlined=!1,t.forEach(e=>{const i=t.indexOf(e),r=Nr(e);r&&(r.appearance==="outlined"&&(this.hasOutlined=!0),r.classList.add("wa-button-group__button"),r.classList.toggle("wa-button-group__horizontal",this.orientation==="horizontal"),r.classList.toggle("wa-button-group__vertical",this.orientation==="vertical"),r.classList.toggle("wa-button-group__button-first",i===0),r.classList.toggle("wa-button-group__button-inner",i>0&&i<t.length-1),r.classList.toggle("wa-button-group__button-last",i===t.length-1),r.classList.toggle("wa-button-group__button-radio",r.tagName.toLowerCase()==="wa-radio-button"))})}render(){return p`
      <slot
        part="base"
        class=${D({"button-group":!0,"has-outlined":this.hasOutlined})}
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        aria-orientation=${this.orientation}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
        @slotchange=${this.handleSlotChange}
      ></slot>
    `}};ui.css=[Zm];n([x("slot")],ui.prototype,"defaultSlot",2);n([w()],ui.prototype,"disableRole",2);n([w()],ui.prototype,"hasOutlined",2);n([d()],ui.prototype,"label",2);n([d({reflect:!0})],ui.prototype,"orientation",2);ui=n([v("wa-button-group")],ui);function Nr(t){const e="wa-button, wa-radio-button";return t.closest(e)??t.querySelector(e)}var Qm=C`
  :host {
    display: flex;
    position: relative;
    align-items: stretch;
    border-radius: var(--wa-panel-border-radius);
    background-color: var(--wa-color-fill-quiet, var(--wa-color-brand-fill-quiet));
    border-color: var(--wa-color-border-quiet, var(--wa-color-brand-border-quiet));
    border-style: var(--wa-panel-border-style);
    border-width: var(--wa-panel-border-width);
    color: var(--wa-color-text-normal);
    padding: 1em;
  }

  /* Appearance modifiers */
  :host([appearance~='plain']) {
    background-color: transparent;
    border-color: transparent;
  }

  :host([appearance~='outlined']) {
    background-color: transparent;
    border-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));
  }

  :host([appearance~='filled']) {
    background-color: var(--wa-color-fill-quiet, var(--wa-color-brand-fill-quiet));
    border-color: transparent;
  }

  :host([appearance~='filled-outlined']) {
    border-color: var(--wa-color-border-quiet, var(--wa-color-brand-border-quiet));
  }

  :host([appearance~='accent']) {
    color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
    background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
    border-color: transparent;

    [part~='icon'] {
      color: currentColor;
    }
  }

  [part~='icon'] {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-on-quiet);
    font-size: 1.25em;
  }

  ::slotted([slot='icon']) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  [part~='message'] {
    flex: 1 1 auto;
    display: block;
    overflow: hidden;
  }
`;var fr=class extends z{constructor(){super(...arguments),this.variant="brand",this.size="medium"}render(){return p`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>
    `}};fr.css=[Qm,ys,Tt];n([d({reflect:!0})],fr.prototype,"variant",2);n([d({reflect:!0})],fr.prototype,"appearance",2);n([d({reflect:!0})],fr.prototype,"size",2);fr=n([v("wa-callout")],fr);var Jm=C`
  :host {
    --spacing: var(--wa-space-l);

    /* Internal calculated properties */
    --inner-border-radius: calc(var(--wa-panel-border-radius) - var(--wa-panel-border-width));

    display: flex;
    flex-direction: column;
    background-color: var(--wa-color-surface-default);
    border-color: var(--wa-color-surface-border);
    border-radius: var(--wa-panel-border-radius);
    border-style: var(--wa-panel-border-style);
    box-shadow: var(--wa-shadow-s);
    border-width: var(--wa-panel-border-width);
    color: var(--wa-color-text-normal);
  }

  /* Appearance modifiers */
  :host([appearance='plain']) {
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
  }

  :host([appearance='outlined']) {
    background-color: var(--wa-color-surface-default);
    border-color: var(--wa-color-surface-border);
  }

  :host([appearance='filled']) {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: transparent;
  }

  :host([appearance='filled-outlined']) {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-surface-border);
  }

  :host([appearance='accent']) {
    color: var(--wa-color-neutral-on-loud);
    background-color: var(--wa-color-neutral-fill-loud);
    border-color: transparent;
  }

  /* Take care of top and bottom radii */
  .media,
  :host(:not([with-media])) .header,
  :host(:not([with-media], [with-header])) .body {
    border-start-start-radius: var(--inner-border-radius);
    border-start-end-radius: var(--inner-border-radius);
  }

  :host(:not([with-footer])) .body,
  .footer {
    border-end-start-radius: var(--inner-border-radius);
    border-end-end-radius: var(--inner-border-radius);
  }

  .media {
    display: flex;
    overflow: hidden;

    &::slotted(*) {
      display: block;
      width: 100%;
      border-radius: 0 !important;
    }
  }

  /* Round all corners for plain appearance */
  :host([appearance='plain']) .media {
    border-radius: var(--inner-border-radius);

    &::slotted(*) {
      border-radius: inherit !important;
    }
  }

  .header {
    display: block;
    border-block-end-style: inherit;
    border-block-end-color: var(--wa-color-surface-border);
    border-block-end-width: var(--wa-panel-border-width);
    padding: calc(var(--spacing) / 2) var(--spacing);
  }

  .body {
    display: block;
    padding: var(--spacing);
  }

  .footer {
    display: block;
    border-block-start-style: inherit;
    border-block-start-color: var(--wa-color-surface-border);
    border-block-start-width: var(--wa-panel-border-width);
    padding: var(--spacing);
  }

  /* Push slots to sides when the action slots renders */
  .has-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  :host(:not([with-header])) .header,
  :host(:not([with-footer])) .footer,
  :host(:not([with-media])) .media {
    display: none;
  }

  /* Orientation Styles */
  :host([orientation='horizontal']) {
    flex-direction: row;

    .media {
      border-start-start-radius: var(--inner-border-radius);
      border-end-start-radius: var(--inner-border-radius);
      border-start-end-radius: 0;

      &::slotted(*) {
        block-size: 100%;
        inline-size: 100%;
        object-fit: cover;
      }
    }
  }

  :host([orientation='horizontal']) ::slotted([slot='body']) {
    display: block;
    height: 100%;
    margin: 0;
  }

  :host([orientation='horizontal']) ::slotted([slot='actions']) {
    display: flex;
    align-items: center;
    padding: var(--spacing);
  }
`;var pi=class extends z{constructor(){super(...arguments),this.hasSlotController=new jt(this,"footer","header","media","header-actions","footer-actions","actions"),this.appearance="outlined",this.withHeader=!1,this.withMedia=!1,this.withFooter=!1,this.orientation="vertical"}updated(){!this.withHeader&&this.hasSlotController.test("header")&&(this.withHeader=!0),!this.withMedia&&this.hasSlotController.test("media")&&(this.withMedia=!0),!this.withFooter&&this.hasSlotController.test("footer")&&(this.withFooter=!0)}render(){return this.orientation==="horizontal"?p`
        <slot name="media" part="media" class="media"></slot>
        <slot part="body" class="body"></slot>
        <slot name="actions" part="actions" class="actions"></slot>
      `:p`
      <slot name="media" part="media" class="media"></slot>

      ${this.hasSlotController.test("header-actions")?p` <header part="header" class="header has-actions">
            <slot name="header"></slot>
            <slot name="header-actions"></slot>
          </header>`:p` <header part="header" class="header">
            <slot name="header"></slot>
          </header>`}

      <slot part="body" class="body"></slot>
      ${this.hasSlotController.test("footer-actions")?p` <footer part="footer" class="footer has-actions">
            <slot name="footer"></slot>
            <slot name="footer-actions"></slot>
          </footer>`:p` <footer part="footer" class="footer">
            <slot name="footer"></slot>
          </footer>`}
    `}};pi.css=[Tt,Jm];n([d({reflect:!0})],pi.prototype,"appearance",2);n([d({attribute:"with-header",type:Boolean,reflect:!0})],pi.prototype,"withHeader",2);n([d({attribute:"with-media",type:Boolean,reflect:!0})],pi.prototype,"withMedia",2);n([d({attribute:"with-footer",type:Boolean,reflect:!0})],pi.prototype,"withFooter",2);n([d({reflect:!0})],pi.prototype,"orientation",2);pi=n([v("wa-card")],pi);var tg=class extends Event{constructor(t){super("wa-slide-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};const eg="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";let ig=(t=21)=>{let e="",i=crypto.getRandomValues(new Uint8Array(t|=0));for(;t--;)e+=eg[i[t]&63];return e};function N(t,e,i){const r=o=>Object.is(o,-0)?0:o;return t<e?r(e):t>i?r(i):r(t)}function xs(t=""){return`${t}${ig()}`}var rg=class{constructor(t,e){this.timerId=0,this.activeInteractions=0,this.paused=!1,this.stopped=!0,this.pause=()=>{this.activeInteractions++||(this.paused=!0,this.host.requestUpdate())},this.resume=()=>{--this.activeInteractions||(this.paused=!1,this.host.requestUpdate())},t.addController(this),this.host=t,this.tickCallback=e}hostConnected(){this.host.addEventListener("mouseenter",this.pause),this.host.addEventListener("mouseleave",this.resume),this.host.addEventListener("focusin",this.pause),this.host.addEventListener("focusout",this.resume),this.host.addEventListener("touchstart",this.pause,{passive:!0}),this.host.addEventListener("touchend",this.resume)}hostDisconnected(){this.stop(),this.host.removeEventListener("mouseenter",this.pause),this.host.removeEventListener("mouseleave",this.resume),this.host.removeEventListener("focusin",this.pause),this.host.removeEventListener("focusout",this.resume),this.host.removeEventListener("touchstart",this.pause),this.host.removeEventListener("touchend",this.resume)}start(t){this.stop(),this.stopped=!1,this.timerId=window.setInterval(()=>{this.paused||this.tickCallback()},t)}stop(){clearInterval(this.timerId),this.stopped=!0,this.host.requestUpdate()}};var og=C`
  :host {
    --aspect-ratio: 16 / 9;
    --scroll-hint: 0px;
    --slide-gap: var(--wa-space-m, 1rem); /* fallback value is necessary */

    display: flex;
  }

  .carousel {
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    grid-template-rows: 1fr min-content;
    grid-template-areas:
      '. slides .'
      '. pagination .';
    gap: var(--wa-space-m);
    align-items: center;
    min-height: 100%;
    min-width: 100%;
    position: relative;
  }

  .pagination {
    grid-area: pagination;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--wa-space-s);
  }

  .slides {
    grid-area: slides;

    display: grid;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-items: center;
    overflow: auto;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    aspect-ratio: calc(var(--aspect-ratio) * var(--slides-per-page));
    border-radius: var(--wa-border-radius-m);

    --slide-size: calc((100% - (var(--slides-per-page) - 1) * var(--slide-gap)) / var(--slides-per-page));
  }

  @media (prefers-reduced-motion) {
    :where(.slides) {
      scroll-behavior: auto;
    }
  }

  .slides-horizontal {
    grid-auto-flow: column;
    grid-auto-columns: var(--slide-size);
    grid-auto-rows: 100%;
    column-gap: var(--slide-gap);
    scroll-snap-type: x mandatory;
    scroll-padding-inline: var(--scroll-hint);
    padding-inline: var(--scroll-hint);
    overflow-y: hidden;
  }

  .slides-vertical {
    grid-auto-flow: row;
    grid-auto-columns: 100%;
    grid-auto-rows: var(--slide-size);
    row-gap: var(--slide-gap);
    scroll-snap-type: y mandatory;
    scroll-padding-block: var(--scroll-hint);
    padding-block: var(--scroll-hint);
    overflow-x: hidden;
  }

  .slides-dragging,
  .slides-dropping {
    scroll-snap-type: unset;
  }

  :host([vertical]) ::slotted(wa-carousel-item) {
    height: 100%;
  }

  .slides::-webkit-scrollbar {
    display: none;
  }

  .navigation {
    grid-area: navigation;
    display: contents;
    font-size: var(--wa-font-size-l);
  }

  .navigation-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--wa-border-radius-m);
    font-size: inherit;
    color: var(--wa-color-text-quiet);
    padding: var(--wa-space-xs);
    cursor: pointer;
    transition: var(--wa-transition-normal) color;
    appearance: none;
  }

  .navigation-button-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .navigation-button-disabled::part(base) {
    pointer-events: none;
  }

  .navigation-button-previous {
    grid-column: 1;
    grid-row: 1;
  }

  .navigation-button-next {
    grid-column: 3;
    grid-row: 1;
  }

  .pagination-item {
    display: block;
    cursor: pointer;
    background: none;
    border: 0;
    border-radius: var(--wa-border-radius-circle);
    width: var(--wa-space-s);
    height: var(--wa-space-s);
    background-color: var(--wa-color-neutral-fill-normal);
    padding: 0;
    margin: 0;
    transition: transform var(--wa-transition-slow);
  }

  .pagination-item-active {
    background-color: var(--wa-form-control-activated-color);
    transform: scale(1.25);
  }

  /* Focus styles */
  .slides:focus-visible,
  .navigation-button:focus-visible,
  .pagination-item:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }
`;function ye(t,e){return new Promise(i=>{function r(o){o.target===t&&(t.removeEventListener(e,r),i())}t.addEventListener(e,r)})}async function Jo(t,e,i){return t.animate(e,i).finished.catch(()=>{})}function tt(t,e){return new Promise(i=>{const r=new AbortController,{signal:o}=r;if(t.classList.contains(e))return;t.classList.remove(e),t.classList.add(e);let s=()=>{t.classList.remove(e),i(),r.abort()};t.addEventListener("animationend",s,{once:!0,signal:o}),t.addEventListener("animationcancel",s,{once:!0,signal:o})})}function ts(t){return t=t.toString().toLowerCase(),t.indexOf("ms")>-1?parseFloat(t)||0:t.indexOf("s")>-1?(parseFloat(t)||0)*1e3:parseFloat(t)||0}function pl(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function*sg(t,e){if(t!==void 0){let i=0;for(const r of t)yield e(r,i++)}}function*ag(t,e,i=1){const r=e===void 0?0:t;e??=t;for(let o=r;i>0?o<e:e<o;o+=i)yield o}(()=>{const t=(r,o)=>{let s=0;return function(...a){window.clearTimeout(s),s=window.setTimeout(()=>{r.call(this,...a)},o)}},e=(r,o,s)=>{const a=r[o];r[o]=function(...l){a.call(this,...l),s.call(this,a,...l)}};if(!("onscrollend"in window)){const r=new Set,o=new WeakMap,s=l=>{r.add(l.pointerId)},a=l=>{r.delete(l.pointerId)};document.addEventListener("pointerdown",s),document.addEventListener("pointerup",a),e(EventTarget.prototype,"addEventListener",function(l,c){if(c!=="scroll")return;const h=t(()=>{r.size?h():this.dispatchEvent(new Event("scrollend"))},100);l.call(this,"scroll",h,{passive:!0}),o.set(this,h)}),e(EventTarget.prototype,"removeEventListener",function(l,c){if(c!=="scroll")return;const h=o.get(this);h&&l.call(this,"scroll",h,{passive:!0})})}})();var et=class extends z{constructor(){super(...arguments),this.loop=!1,this.slides=0,this.currentSlide=0,this.navigation=!1,this.pagination=!1,this.autoplay=!1,this.autoplayInterval=3e3,this.slidesPerPage=1,this.slidesPerMove=1,this.orientation="horizontal",this.mouseDragging=!1,this.activeSlide=0,this.scrolling=!1,this.dragging=!1,this.autoplayController=new rg(this,()=>this.next()),this.dragStartPosition=[-1,-1],this.localize=new W(this),this.pendingSlideChange=!1,this.handleMouseDrag=t=>{this.dragging||(this.scrollContainer.style.setProperty("scroll-snap-type","none"),this.dragging=!0,this.dragStartPosition=[t.clientX,t.clientY]),this.scrollContainer.scrollBy({left:-t.movementX,top:-t.movementY,behavior:"instant"})},this.handleMouseDragEnd=()=>{const t=this.scrollContainer;document.removeEventListener("pointermove",this.handleMouseDrag,{capture:!0});const e=t.scrollLeft,i=t.scrollTop;t.style.removeProperty("scroll-snap-type"),t.style.setProperty("overflow","hidden");const r=t.scrollLeft,o=t.scrollTop;t.style.removeProperty("overflow"),t.style.setProperty("scroll-snap-type","none"),t.scrollTo({left:e,top:i,behavior:"instant"}),requestAnimationFrame(async()=>{(e!==r||i!==o)&&(t.scrollTo({left:r,top:o,behavior:pl()?"auto":"smooth"}),await ye(t,"scrollend")),t.style.removeProperty("scroll-snap-type"),this.dragging=!1,this.dragStartPosition=[-1,-1],this.handleScrollEnd()})},this.handleSlotChange=t=>{t.some(i=>[...i.addedNodes,...i.removedNodes].some(r=>this.isCarouselItem(r)&&!r.hasAttribute("data-clone")))&&this.initializeSlides(),this.requestUpdate()}}connectedCallback(){super.connectedCallback(),this.setAttribute("role","region"),this.setAttribute("aria-label",this.localize.term("carousel"))}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect()}firstUpdated(){this.initializeSlides(),this.mutationObserver=new MutationObserver(this.handleSlotChange),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}willUpdate(t){(t.has("slidesPerMove")||t.has("slidesPerPage"))&&(this.slidesPerMove=Math.min(this.slidesPerMove,this.slidesPerPage))}getPageCount(){const t=this.getSlides().length,{slidesPerPage:e,slidesPerMove:i,loop:r}=this,o=r?t/i:(t-e)/i+1;return Math.ceil(o)}getCurrentPage(){return Math.ceil(this.activeSlide/this.slidesPerMove)}canScrollNext(){return this.loop||this.getCurrentPage()<this.getPageCount()-1}canScrollPrev(){return this.loop||this.getCurrentPage()>0}getSlides({excludeClones:t=!0}={}){return[...this.children].filter(e=>this.isCarouselItem(e)&&(!t||!e.hasAttribute("data-clone")))}handleClick(t){if(this.dragging&&this.dragStartPosition[0]>0&&this.dragStartPosition[1]>0){const e=Math.abs(this.dragStartPosition[0]-t.clientX),i=Math.abs(this.dragStartPosition[1]-t.clientY);Math.sqrt(e*e+i*i)>=10&&t.preventDefault()}}handleKeyDown(t){if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key)){const e=t.target,i=this.localize.dir()==="rtl",r=e.closest('[part~="pagination-item"]')!==null,o=t.key==="ArrowDown"||!i&&t.key==="ArrowRight"||i&&t.key==="ArrowLeft",s=t.key==="ArrowUp"||!i&&t.key==="ArrowLeft"||i&&t.key==="ArrowRight";t.preventDefault(),s&&this.previous(),o&&this.next(),t.key==="Home"&&this.goToSlide(0),t.key==="End"&&this.goToSlide(this.getSlides().length-1),r&&this.updateComplete.then(()=>{const a=this.shadowRoot?.querySelector('[part~="pagination-item-active"]');a&&a.focus()})}}handleMouseDragStart(t){this.mouseDragging&&t.button===0&&(t.preventDefault(),document.addEventListener("pointermove",this.handleMouseDrag,{capture:!0,passive:!0}),document.addEventListener("pointerup",this.handleMouseDragEnd,{capture:!0,once:!0}))}handleScroll(){this.scrolling=!0,this.pendingSlideChange||this.synchronizeSlides()}synchronizeSlides(){const t=new IntersectionObserver(e=>{t.disconnect();for(const l of e){const c=l.target;c.toggleAttribute("inert",!l.isIntersecting),c.classList.toggle("--in-view",l.isIntersecting),c.setAttribute("aria-hidden",l.isIntersecting?"false":"true")}const i=e.find(l=>l.isIntersecting);if(!i)return;const r=this.getSlides({excludeClones:!1}),o=this.getSlides().length,s=r.indexOf(i.target),a=this.loop?s-this.slidesPerPage:s;if(i&&(this.activeSlide=(Math.ceil(a/this.slidesPerMove)*this.slidesPerMove+o)%o,!this.scrolling&&this.loop&&i.target.hasAttribute("data-clone"))){const l=Number(i.target.getAttribute("data-clone"));this.goToSlide(l,"instant")}},{root:this.scrollContainer,threshold:.6});this.getSlides({excludeClones:!1}).forEach(e=>{t.observe(e)})}handleScrollEnd(){!this.scrolling||this.dragging||(this.synchronizeSlides(),this.scrolling=!1,this.pendingSlideChange=!1,this.synchronizeSlides())}isCarouselItem(t){return t instanceof Element&&t.tagName.toLowerCase()==="wa-carousel-item"}initializeSlides(){this.getSlides({excludeClones:!1}).forEach((t,e)=>{t.classList.remove("--in-view"),t.classList.remove("--is-active"),t.setAttribute("aria-label",this.localize.term("slideNum",e+1)),t.hasAttribute("data-clone")&&t.remove()}),this.updateSlidesSnap(),this.loop&&this.createClones(),this.goToSlide(this.activeSlide,"auto"),this.synchronizeSlides()}createClones(){const t=this.getSlides(),e=this.slidesPerPage,i=t.slice(-e),r=t.slice(0,e);i.reverse().forEach((o,s)=>{const a=o.cloneNode(!0);a.setAttribute("data-clone",String(t.length-s-1)),this.prepend(a)}),r.forEach((o,s)=>{const a=o.cloneNode(!0);a.setAttribute("data-clone",String(s)),this.append(a)})}handleSlideChange(){const t=this.getSlides();t.forEach((e,i)=>{e.classList.toggle("--is-active",i===this.activeSlide)}),this.hasUpdated&&this.dispatchEvent(new tg({index:this.activeSlide,slide:t[this.activeSlide]}))}updateSlidesSnap(){const t=this.getSlides(),e=this.slidesPerMove;t.forEach((i,r)=>{(r+e)%e===0?i.style.removeProperty("scroll-snap-align"):i.style.setProperty("scroll-snap-align","none")})}handleAutoplayChange(){this.autoplayController.stop(),this.autoplay&&this.autoplayController.start(this.autoplayInterval)}previous(t="smooth"){this.goToSlide(this.activeSlide-this.slidesPerMove,t)}next(t="smooth"){this.goToSlide(this.activeSlide+this.slidesPerMove,t)}goToSlide(t,e="smooth"){const{slidesPerPage:i,loop:r}=this,o=this.getSlides(),s=this.getSlides({excludeClones:!1});if(!o.length)return;const a=r?(t+o.length)%o.length:N(t,0,o.length-i);this.activeSlide=a;const l=this.localize.dir()==="rtl",c=N(t+(r?i:0)+(l?i-1:0),0,s.length-1),h=s[c];this.scrollToSlide(h,pl()?"auto":e)}scrollToSlide(t,e="smooth"){this.pendingSlideChange=!0,window.requestAnimationFrame(()=>{if(!this.scrollContainer)return;const i=this.scrollContainer,r=i.getBoundingClientRect(),o=t.getBoundingClientRect(),s=o.left-r.left,a=o.top-r.top;s||a?(this.pendingSlideChange=!0,i.scrollTo({left:s+i.scrollLeft,top:a+i.scrollTop,behavior:e})):this.pendingSlideChange=!1})}render(){const{slidesPerMove:t,scrolling:e}=this;let i=0,r=0,o=!1,s=!1;this.hasUpdated&&(i=this.getPageCount(),r=this.getCurrentPage(),o=this.canScrollPrev(),s=this.canScrollNext());const a=this.localize.dir()==="rtl";return p`
      <div part="base" class="carousel">
        <div
          id="scroll-container"
          part="scroll-container"
          class="${D({slides:!0,"slides-horizontal":this.orientation==="horizontal","slides-vertical":this.orientation==="vertical","slides-dragging":this.dragging})}"
          style=${rt({"--slides-per-page":this.slidesPerPage})}
          aria-busy="${e?"true":"false"}"
          aria-atomic="true"
          tabindex="0"
          @keydown=${this.handleKeyDown}
          @mousedown="${this.handleMouseDragStart}"
          @scroll="${this.handleScroll}"
          @scrollend=${this.handleScrollEnd}
          @click=${this.handleClick}
        >
          <slot @slotchange=${()=>this.requestUpdate()}></slot>
        </div>

        ${this.navigation?p`
              <div part="navigation" class="navigation">
                <button
                  part="navigation-button navigation-button-previous"
                  class="${D({"navigation-button":!0,"navigation-button-previous":!0,"navigation-button-disabled":!o})}"
                  aria-label="${this.localize.term("previousSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${o?"false":"true"}"
                  @click=${o?()=>this.previous():null}
                >
                  <slot name="previous-icon">
                    <wa-icon library="system" name="${a?"chevron-right":"chevron-left"}"></wa-icon>
                  </slot>
                </button>

                <button
                  part="navigation-button navigation-button-next"
                  class=${D({"navigation-button":!0,"navigation-button-next":!0,"navigation-button-disabled":!s})}
                  aria-label="${this.localize.term("nextSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${s?"false":"true"}"
                  @click=${s?()=>this.next():null}
                >
                  <slot name="next-icon">
                    <wa-icon library="system" name="${a?"chevron-left":"chevron-right"}"></wa-icon>
                  </slot>
                </button>
              </div>
            `:""}
        ${this.pagination?p`
              <div part="pagination" role="tablist" class="pagination" aria-controls="scroll-container">
                ${sg(ag(i),l=>{const c=l===r;return p`
                    <button
                      part="pagination-item ${c?"pagination-item-active":""}"
                      class="${D({"pagination-item":!0,"pagination-item-active":c})}"
                      role="tab"
                      aria-selected="${c?"true":"false"}"
                      aria-label="${this.localize.term("goToSlide",l+1,i)}"
                      tabindex=${c?"0":"-1"}
                      @click=${()=>this.goToSlide(l*t)}
                      @keydown=${this.handleKeyDown}
                    ></button>
                  `})}
              </div>
            `:p``}
      </div>
    `}};et.css=og;n([d({type:Boolean,reflect:!0})],et.prototype,"loop",2);n([d({type:Number,reflect:!0})],et.prototype,"slides",2);n([d({type:Number,reflect:!0})],et.prototype,"currentSlide",2);n([d({type:Boolean,reflect:!0})],et.prototype,"navigation",2);n([d({type:Boolean,reflect:!0})],et.prototype,"pagination",2);n([d({type:Boolean,reflect:!0})],et.prototype,"autoplay",2);n([d({type:Number,attribute:"autoplay-interval"})],et.prototype,"autoplayInterval",2);n([d({type:Number,attribute:"slides-per-page"})],et.prototype,"slidesPerPage",2);n([d({type:Number,attribute:"slides-per-move"})],et.prototype,"slidesPerMove",2);n([d()],et.prototype,"orientation",2);n([d({type:Boolean,reflect:!0,attribute:"mouse-dragging"})],et.prototype,"mouseDragging",2);n([x(".slides")],et.prototype,"scrollContainer",2);n([x(".pagination")],et.prototype,"paginationContainer",2);n([w()],et.prototype,"activeSlide",2);n([w()],et.prototype,"scrolling",2);n([w()],et.prototype,"dragging",2);n([vs({passive:!0})],et.prototype,"handleScroll",1);n([k("loop",{waitUntilFirstUpdate:!0}),k("slidesPerPage",{waitUntilFirstUpdate:!0})],et.prototype,"initializeSlides",1);n([k("activeSlide")],et.prototype,"handleSlideChange",1);n([k("slidesPerMove")],et.prototype,"updateSlidesSnap",1);n([k("autoplay")],et.prototype,"handleAutoplayChange",1);et=n([v("wa-carousel")],et);var ng=C`
  :host {
    --aspect-ratio: inherit;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-height: 100%;
    aspect-ratio: var(--aspect-ratio);
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }

  ::slotted(img) {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }
`;var Ca=class extends z{connectedCallback(){super.connectedCallback(),this.setAttribute("role","group")}render(){return p` <slot></slot> `}};Ca.css=ng;Ca=n([v("wa-carousel-item")],Ca);var ks=(t={})=>{let{validationElement:e,validationProperty:i}=t;e||(e=Object.assign(document.createElement("input"),{required:!0})),i||(i="value");const r={observedAttributes:["required"],message:e.validationMessage,checkValidity(o){const s={message:"",isValid:!0,invalidKeys:[]};return(o.required??o.hasAttribute("required"))&&!o[i]&&(s.message=typeof r.message=="function"?r.message(o):r.message||"",s.isValid=!1,s.invalidKeys.push("valueMissing")),s}};return r};var Ne=C`
  :host {
    display: flex;
    flex-direction: column;
  }

  /* Treat wrapped labels, inputs, and hints as direct children of the host element */
  [part~='form-control'] {
    display: contents;
  }

  /* Label */
  :is([part~='form-control-label'], [part~='label']):has(*:not(:empty)),
  :is([part~='form-control-label'], [part~='label']).has-label {
    display: inline-flex;
    color: var(--wa-form-control-label-color);
    font-weight: var(--wa-form-control-label-font-weight);
    line-height: var(--wa-form-control-label-line-height);
    margin-block-end: 0.5em;
  }

  :host([required]) :is([part~='form-control-label'], [part~='label'])::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
    color: var(--wa-form-control-required-content-color);
  }

  /* Help text */
  [part~='hint'] {
    display: block;
    color: var(--wa-form-control-hint-color);
    font-weight: var(--wa-form-control-hint-font-weight);
    line-height: var(--wa-form-control-hint-line-height);
    margin-block-start: 0.5em;
    font-size: var(--wa-font-size-smaller);

    &:not(.has-slotted, .has-hint) {
      display: none;
    }
  }
`;var lg=C`
  :host {
    --checked-icon-color: var(--wa-color-brand-on-loud);
    --checked-icon-scale: 0.8;

    display: inline-flex;
    color: var(--wa-form-control-value-color);
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    user-select: none;
    -webkit-user-select: none;
  }

  [part~='control'] {
    display: inline-flex;
    flex: 0 0 auto;
    position: relative;
    align-items: center;
    justify-content: center;
    width: var(--wa-form-control-toggle-size);
    height: var(--wa-form-control-toggle-size);
    border-color: var(--wa-form-control-border-color);
    border-radius: min(
      calc(var(--wa-form-control-toggle-size) * 0.375),
      var(--wa-border-radius-s)
    ); /* min prevents entirely circular checkbox */
    border-style: var(--wa-border-style);
    border-width: var(--wa-form-control-border-width);
    background-color: var(--wa-form-control-background-color);
    transition:
      background var(--wa-transition-normal),
      border-color var(--wa-transition-fast),
      box-shadow var(--wa-transition-fast),
      color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);

    margin-inline-end: 0.5em;
  }

  [part~='base'] {
    display: flex;
    align-items: flex-start;
    position: relative;
    color: currentColor;
    vertical-align: middle;
    cursor: pointer;
  }

  [part~='label'] {
    display: inline;
  }

  /* Checked */
  [part~='control']:has(:checked, :indeterminate) {
    color: var(--checked-icon-color);
    border-color: var(--wa-form-control-activated-color);
    background-color: var(--wa-form-control-activated-color);
  }

  /* Focus */
  [part~='control']:has(> input:focus-visible:not(:disabled)) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled */
  :host [part~='base']:has(input:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  input {
    position: absolute;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    pointer-events: none;
  }

  [part~='icon'] {
    display: flex;
    scale: var(--checked-icon-scale);

    /* Without this, Safari renders the icon slightly to the left */
    &::part(svg) {
      translate: 0.0009765625em;
    }

    input:not(:checked, :indeterminate) + & {
      visibility: hidden;
    }
  }

  :host([required]) [part~='label']::after {
    content: var(--wa-form-control-required-content);
    color: var(--wa-form-control-required-content-color);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }
`;const Fi=$r(class extends Sr{constructor(t){if(super(t),t.type!==me.PROPERTY&&t.type!==me.ATTRIBUTE&&t.type!==me.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!tc(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===Ft||e===R)return e;const i=t.element,r=t.name;if(t.type===me.PROPERTY){if(e===i[r])return Ft}else if(t.type===me.BOOLEAN_ATTRIBUTE){if(!!e===i.hasAttribute(r))return Ft}else if(t.type===me.ATTRIBUTE&&i.getAttribute(r)===e+"")return Ft;return ec(t),e}});var pt=class extends J{constructor(){super(...arguments),this.hasSlotController=new jt(this,"hint"),this.title="",this.name="",this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.indeterminate=!1,this.checked=this.hasAttribute("checked"),this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint=""}static get validators(){const t=[ks({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...t]}get value(){const t=this._value||"on";return this.checked?t:null}set value(t){this._value=t}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleDefaultCheckedChange(){!this.hasInteracted&&this.checked!==this.defaultChecked&&(this.checked=this.defaultChecked,this.handleValueOrCheckedChange())}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(t){super.willUpdate(t),t.has("defaultChecked")&&(this.hasInteracted||(this.checked=this.defaultChecked)),(t.has("value")||t.has("checked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this.checked=this.defaultChecked,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){const t=this.hasSlotController.test("hint"),e=this.hint?!0:!!t,i=!this.checked&&this.indeterminate,r=i?"indeterminate":"check",o=i?"indeterminate":"check";return p`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${T(this._value)}
            .indeterminate=${Fi(this.indeterminate)}
            .checked=${Fi(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${o}-icon icon" library="system" name=${r}></wa-icon>
        </span>

        <slot part="label"></slot>
      </label>

      <slot
        id="hint"
        part="hint"
        name="hint"
        aria-hidden=${e?"false":"true"}
        class="${D({"has-slotted":e})}"
      >
        ${this.hint}
      </slot>
    `}};pt.css=[Ne,Tt,lg];pt.shadowRootOptions={...J.shadowRootOptions,delegatesFocus:!0};n([x('input[type="checkbox"]')],pt.prototype,"input",2);n([d()],pt.prototype,"title",2);n([d({reflect:!0})],pt.prototype,"name",2);n([d({reflect:!0})],pt.prototype,"value",1);n([d({reflect:!0})],pt.prototype,"size",2);n([d({type:Boolean})],pt.prototype,"disabled",2);n([d({type:Boolean,reflect:!0})],pt.prototype,"indeterminate",2);n([d({type:Boolean,attribute:!1})],pt.prototype,"checked",2);n([d({type:Boolean,reflect:!0,attribute:"checked"})],pt.prototype,"defaultChecked",2);n([d({type:Boolean,reflect:!0})],pt.prototype,"required",2);n([d()],pt.prototype,"hint",2);n([k("defaultChecked")],pt.prototype,"handleDefaultCheckedChange",1);n([k(["checked","indeterminate"])],pt.prototype,"handleStateChange",1);n([k("disabled")],pt.prototype,"handleDisabledChange",1);pt=n([v("wa-checkbox")],pt);var cg=C`
  :host {
    --grid-width: 17em;
    --grid-height: 12em;
    --grid-handle-size: 1.25em;
    --slider-height: 1em;
    --slider-handle-size: calc(var(--slider-height) + 0.25em);
  }

  .color-picker {
    background-color: var(--wa-color-surface-raised);
    border-radius: var(--wa-border-radius-m);
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
    border-color: var(--wa-color-surface-border);
    box-shadow: var(--wa-shadow-m);
    color: var(--color);
    font: inherit;
    font-size: inherit;
    user-select: none;
    width: var(--grid-width);
    -webkit-user-select: none;
  }

  .grid {
    position: relative;
    height: var(--grid-height);
    background-image:
      linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%),
      linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
    border-top-left-radius: calc(var(--wa-border-radius-m) - var(--wa-border-width-s));
    border-top-right-radius: calc(var(--wa-border-radius-m) - var(--wa-border-width-s));
    cursor: crosshair;
    forced-color-adjust: none;
  }

  .grid-handle {
    position: absolute;
    width: var(--grid-handle-size);
    height: var(--grid-handle-size);
    border-radius: var(--wa-border-radius-circle);
    box-shadow: 0 0 0 0.0625rem rgba(0, 0, 0, 0.2);
    border: solid 0.125rem white;
    margin-top: calc(var(--grid-handle-size) / -2);
    margin-left: calc(var(--grid-handle-size) / -2);
    transition: scale var(--wa-transition-normal) var(--wa-transition-easing);
  }

  .grid-handle-dragging {
    cursor: none;
    scale: 1.5;
  }

  .grid-handle:focus-visible {
    outline: var(--wa-focus-ring);
  }

  .controls {
    padding: 0.75em;
    display: flex;
    align-items: center;
  }

  .sliders {
    flex: 1 1 auto;
  }

  .slider {
    position: relative;
    height: var(--slider-height);
    border-radius: var(--wa-border-radius-s);
    box-shadow: inset 0 0 0 0.0625rem rgba(0, 0, 0, 0.2);
    forced-color-adjust: none;
  }

  .slider:not(:last-of-type) {
    margin-bottom: 0.75em;
  }

  .slider-handle {
    position: absolute;
    top: calc(50% - var(--slider-handle-size) / 2);
    width: var(--slider-handle-size);
    height: var(--slider-handle-size);
    border-radius: var(--wa-border-radius-circle);
    border: solid 0.125rem white;
    box-shadow: 0 0 0 0.0625rem rgba(0, 0, 0, 0.2);
    margin-left: calc(var(--slider-handle-size) / -2);
  }

  .slider-handle:focus-visible {
    outline: var(--wa-focus-ring);
  }

  .hue {
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0) 0%,
      rgb(255, 255, 0) 17%,
      rgb(0, 255, 0) 33%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255) 67%,
      rgb(255, 0, 255) 83%,
      rgb(255, 0, 0) 100%
    );
  }

  .alpha .alpha-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .preview {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 3em;
    height: 3em;
    border: none;
    border-radius: var(--wa-border-radius-circle);
    background: none;
    font-size: inherit;
    margin-inline-start: 0.75em;
    cursor: copy;
    forced-color-adjust: none;
  }

  .preview:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 0 0.0625rem rgba(0, 0, 0, 0.2);

    /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
    background-color: var(--preview-color);
  }

  .preview:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  .preview-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 0.0625rem rgba(0, 0, 0, 0.125);
  }

  .preview-color-copied {
    animation: pulse 850ms;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--wa-color-brand-fill-loud);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  .user-input {
    display: flex;
    align-items: center;
    padding: 0 0.75em 0.75em 0.75em;
  }

  .user-input wa-input {
    min-width: 0; /* fix input width in Safari */
    flex: 1 1 auto;

    &::part(form-control-label) {
      /* Visually hidden */
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      clip: rect(0 0 0 0) !important;
      clip-path: inset(50%) !important;
      border: none !important;
      overflow: hidden !important;
      white-space: nowrap !important;
      padding: 0 !important;
    }
  }

  .user-input wa-button-group {
    margin-inline-start: 0.75em;

    &::part(base) {
      flex-wrap: nowrap;
    }
  }

  .user-input wa-button:first-of-type {
    min-width: 3em;
    max-width: 3em;
  }

  .swatches {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(1.5em, 100%), 1fr));
    grid-gap: 0.5em;
    justify-items: center;
    border-block-start: var(--wa-form-control-border-style) var(--wa-form-control-border-width)
      var(--wa-color-surface-border);
    padding: 0.5em;
    forced-color-adjust: none;
  }

  .swatch {
    position: relative;
    aspect-ratio: 1 / 1;
    width: 100%;
    border-radius: var(--wa-border-radius-s);
  }

  .swatch .swatch-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 0.0625rem rgba(0, 0, 0, 0.125);
    border-radius: inherit;
    cursor: pointer;
  }

  .swatch:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  .transparent-bg {
    background-image:
      linear-gradient(45deg, var(--wa-color-neutral-fill-normal) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--wa-color-neutral-fill-normal) 75%),
      linear-gradient(45deg, transparent 75%, var(--wa-color-neutral-fill-normal) 75%),
      linear-gradient(45deg, var(--wa-color-neutral-fill-normal) 25%, transparent 25%);
    background-size: 0.5rem 0.5rem;
    background-position:
      0 0,
      0 0,
      -0.25rem -0.25rem,
      0.25rem 0.25rem;
  }

  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;

    .grid,
    .grid-handle,
    .slider,
    .slider-handle,
    .preview,
    .swatch,
    .swatch-color {
      pointer-events: none;
    }
  }

  /*
   * Color dropdown
   */

  .color-dropdown {
    display: contents;
  }

  .color-dropdown::part(panel) {
    max-height: none;
    background-color: var(--wa-color-surface-raised);
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    overflow: visible;
  }

  .trigger {
    display: block;
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: inherit;
    forced-color-adjust: none;
    width: var(--wa-form-control-height);
    height: var(--wa-form-control-height);
    border-radius: var(--wa-form-control-border-radius);
  }

  .trigger:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    box-shadow:
      inset 0 0 0 var(--wa-form-control-border-width) var(--wa-form-control-border-color),
      inset 0 0 0 calc(var(--wa-form-control-border-width) * 3) var(--wa-color-surface-default);
  }

  .trigger-empty:before {
    background-color: transparent;
  }

  .trigger:focus-visible {
    outline: none;
  }

  .trigger:focus-visible:not(.trigger:disabled) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  :host([disabled]) :is(.label, .trigger) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .form-control.form-control-has-label .label {
    cursor: pointer;
    display: inline-block;
  }
`;function Yr(t,e){function i(o){const s=t.getBoundingClientRect(),a=t.ownerDocument.defaultView,l=s.left+a.pageXOffset,c=s.top+a.pageYOffset,h=o.pageX-l,u=o.pageY-c;e?.onMove&&e.onMove(h,u)}function r(){document.removeEventListener("pointermove",i),document.removeEventListener("pointerup",r),e?.onStop&&e.onStop()}document.addEventListener("pointermove",i,{passive:!0}),document.addEventListener("pointerup",r),e?.initialEvent instanceof PointerEvent&&i(e.initialEvent)}var Gs=typeof window<"u"&&"ontouchstart"in window,xo=class{constructor(t,e){this.isActive=!1,this.isDragging=!1,this.handleDragStart=i=>{const r="touches"in i?i.touches[0].clientX:i.clientX,o="touches"in i?i.touches[0].clientY:i.clientY;this.isDragging||!Gs&&i.buttons>1||(this.isDragging=!0,document.addEventListener("pointerup",this.handleDragStop),document.addEventListener("pointermove",this.handleDragMove),document.addEventListener("pointercancel",this.handleDragStop),document.addEventListener("touchend",this.handleDragStop),document.addEventListener("touchmove",this.handleDragMove),document.addEventListener("touchcancel",this.handleDragStop),this.options.start(r,o))},this.handleDragStop=i=>{const r="changedTouches"in i?i.changedTouches[0].clientX:i.clientX,o="changedTouches"in i?i.changedTouches[0].clientY:i.clientY;this.isDragging=!1,document.removeEventListener("pointerup",this.handleDragStop),document.removeEventListener("pointermove",this.handleDragMove),document.removeEventListener("pointercancel",this.handleDragStop),document.removeEventListener("touchend",this.handleDragStop),document.removeEventListener("touchmove",this.handleDragMove),document.removeEventListener("touchcancel",this.handleDragStop),this.options.stop(r,o)},this.handleDragMove=i=>{const r="touches"in i?i.touches[0].clientX:i.clientX,o="touches"in i?i.touches[0].clientY:i.clientY;window.getSelection()?.removeAllRanges(),this.options.move(r,o)},this.element=t,this.options={start:()=>{},stop:()=>{},move:()=>{},...e},this.start()}start(){this.isActive||(this.element.addEventListener("pointerdown",this.handleDragStart),Gs&&this.element.addEventListener("touchstart",this.handleDragStart),this.isActive=!0)}stop(){document.removeEventListener("pointerup",this.handleDragStop),document.removeEventListener("pointermove",this.handleDragMove),document.removeEventListener("pointercancel",this.handleDragStop),document.removeEventListener("touchend",this.handleDragStop),document.removeEventListener("touchmove",this.handleDragMove),document.removeEventListener("touchcancel",this.handleDragStop),this.element.removeEventListener("pointerdown",this.handleDragStart),Gs&&this.element.removeEventListener("touchstart",this.handleDragStart),this.isActive=!1,this.isDragging=!1}toggle(t){(t!==void 0?t:!this.isActive)?this.start():this.stop()}};var Oc=C`
  .wa-visually-hidden:not(:focus-within),
  .wa-visually-hidden-force,
  .wa-visually-hidden-hint::part(hint),
  .wa-visually-hidden-label::part(label),
  .wa-visually-hidden-label::part(form-control-label) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
`;function vt(t,e){dg(t)&&(t="100%");const i=hg(t);return t=e===360?t:Math.min(e,Math.max(0,parseFloat(t))),i&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:(e===360?t=(t<0?t%e+e:t%e)/parseFloat(String(e)):t=t%e/parseFloat(String(e)),t)}function ko(t){return Math.min(1,Math.max(0,t))}function dg(t){return typeof t=="string"&&t.indexOf(".")!==-1&&parseFloat(t)===1}function hg(t){return typeof t=="string"&&t.indexOf("%")!==-1}function Ic(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function Co(t){return Number(t)<=1?`${Number(t)*100}%`:t}function Ri(t){return t.length===1?"0"+t:String(t)}function ug(t,e,i){return{r:vt(t,255)*255,g:vt(e,255)*255,b:vt(i,255)*255}}function fl(t,e,i){t=vt(t,255),e=vt(e,255),i=vt(i,255);const r=Math.max(t,e,i),o=Math.min(t,e,i);let s=0,a=0;const l=(r+o)/2;if(r===o)a=0,s=0;else{const c=r-o;switch(a=l>.5?c/(2-r-o):c/(r+o),r){case t:s=(e-i)/c+(e<i?6:0);break;case e:s=(i-t)/c+2;break;case i:s=(t-e)/c+4;break}s/=6}return{h:s,s:a,l}}function Xs(t,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?t+(e-t)*(6*i):i<1/2?e:i<2/3?t+(e-t)*(2/3-i)*6:t}function pg(t,e,i){let r,o,s;if(t=vt(t,360),e=vt(e,100),i=vt(i,100),e===0)o=i,s=i,r=i;else{const a=i<.5?i*(1+e):i+e-i*e,l=2*i-a;r=Xs(l,a,t+1/3),o=Xs(l,a,t),s=Xs(l,a,t-1/3)}return{r:r*255,g:o*255,b:s*255}}function ml(t,e,i){t=vt(t,255),e=vt(e,255),i=vt(i,255);const r=Math.max(t,e,i),o=Math.min(t,e,i);let s=0;const a=r,l=r-o,c=r===0?0:l/r;if(r===o)s=0;else{switch(r){case t:s=(e-i)/l+(e<i?6:0);break;case e:s=(i-t)/l+2;break;case i:s=(t-e)/l+4;break}s/=6}return{h:s,s:c,v:a}}function fg(t,e,i){t=vt(t,360)*6,e=vt(e,100),i=vt(i,100);const r=Math.floor(t),o=t-r,s=i*(1-e),a=i*(1-o*e),l=i*(1-(1-o)*e),c=r%6,h=[i,a,s,s,l,i][c],u=[l,i,i,a,s,s][c],f=[s,s,l,i,i,a][c];return{r:h*255,g:u*255,b:f*255}}function gl(t,e,i,r){const o=[Ri(Math.round(t).toString(16)),Ri(Math.round(e).toString(16)),Ri(Math.round(i).toString(16))];return r&&o[0].startsWith(o[0].charAt(1))&&o[1].startsWith(o[1].charAt(1))&&o[2].startsWith(o[2].charAt(1))?o[0].charAt(0)+o[1].charAt(0)+o[2].charAt(0):o.join("")}function mg(t,e,i,r,o){const s=[Ri(Math.round(t).toString(16)),Ri(Math.round(e).toString(16)),Ri(Math.round(i).toString(16)),Ri(bg(r))];return o&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))&&s[3].startsWith(s[3].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0)+s[3].charAt(0):s.join("")}function gg(t,e,i,r){const o=t/100,s=e/100,a=i/100,l=r/100,c=255*(1-o)*(1-l),h=255*(1-s)*(1-l),u=255*(1-a)*(1-l);return{r:c,g:h,b:u}}function bl(t,e,i){let r=1-t/255,o=1-e/255,s=1-i/255,a=Math.min(r,o,s);return a===1?(r=0,o=0,s=0):(r=(r-a)/(1-a)*100,o=(o-a)/(1-a)*100,s=(s-a)/(1-a)*100),a*=100,{c:Math.round(r),m:Math.round(o),y:Math.round(s),k:Math.round(a)}}function bg(t){return Math.round(parseFloat(t)*255).toString(16)}function wl(t){return Zt(t)/255}function Zt(t){return parseInt(t,16)}function wg(t){return{r:t>>16,g:(t&65280)>>8,b:t&255}}const $a={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function vg(t){let e={r:0,g:0,b:0},i=1,r=null,o=null,s=null,a=!1,l=!1;return typeof t=="string"&&(t=kg(t)),typeof t=="object"&&(Yt(t.r)&&Yt(t.g)&&Yt(t.b)?(e=ug(t.r,t.g,t.b),a=!0,l=String(t.r).substr(-1)==="%"?"prgb":"rgb"):Yt(t.h)&&Yt(t.s)&&Yt(t.v)?(r=Co(t.s),o=Co(t.v),e=fg(t.h,r,o),a=!0,l="hsv"):Yt(t.h)&&Yt(t.s)&&Yt(t.l)?(r=Co(t.s),s=Co(t.l),e=pg(t.h,r,s),a=!0,l="hsl"):Yt(t.c)&&Yt(t.m)&&Yt(t.y)&&Yt(t.k)&&(e=gg(t.c,t.m,t.y,t.k),a=!0,l="cmyk"),Object.prototype.hasOwnProperty.call(t,"a")&&(i=t.a)),i=Ic(i),{ok:a,format:t.format||l,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:i}}const yg="[-\\+]?\\d+%?",xg="[-\\+]?\\d*\\.\\d+%?",ai="(?:"+xg+")|(?:"+yg+")",Ys="[\\s|\\(]+("+ai+")[,|\\s]+("+ai+")[,|\\s]+("+ai+")\\s*\\)?",$o="[\\s|\\(]+("+ai+")[,|\\s]+("+ai+")[,|\\s]+("+ai+")[,|\\s]+("+ai+")\\s*\\)?",se={CSS_UNIT:new RegExp(ai),rgb:new RegExp("rgb"+Ys),rgba:new RegExp("rgba"+$o),hsl:new RegExp("hsl"+Ys),hsla:new RegExp("hsla"+$o),hsv:new RegExp("hsv"+Ys),hsva:new RegExp("hsva"+$o),cmyk:new RegExp("cmyk"+$o),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function kg(t){if(t=t.trim().toLowerCase(),t.length===0)return!1;let e=!1;if($a[t])t=$a[t],e=!0;else if(t==="transparent")return{r:0,g:0,b:0,a:0,format:"name"};let i=se.rgb.exec(t);return i?{r:i[1],g:i[2],b:i[3]}:(i=se.rgba.exec(t),i?{r:i[1],g:i[2],b:i[3],a:i[4]}:(i=se.hsl.exec(t),i?{h:i[1],s:i[2],l:i[3]}:(i=se.hsla.exec(t),i?{h:i[1],s:i[2],l:i[3],a:i[4]}:(i=se.hsv.exec(t),i?{h:i[1],s:i[2],v:i[3]}:(i=se.hsva.exec(t),i?{h:i[1],s:i[2],v:i[3],a:i[4]}:(i=se.cmyk.exec(t),i?{c:i[1],m:i[2],y:i[3],k:i[4]}:(i=se.hex8.exec(t),i?{r:Zt(i[1]),g:Zt(i[2]),b:Zt(i[3]),a:wl(i[4]),format:e?"name":"hex8"}:(i=se.hex6.exec(t),i?{r:Zt(i[1]),g:Zt(i[2]),b:Zt(i[3]),format:e?"name":"hex"}:(i=se.hex4.exec(t),i?{r:Zt(i[1]+i[1]),g:Zt(i[2]+i[2]),b:Zt(i[3]+i[3]),a:wl(i[4]+i[4]),format:e?"name":"hex8"}:(i=se.hex3.exec(t),i?{r:Zt(i[1]+i[1]),g:Zt(i[2]+i[2]),b:Zt(i[3]+i[3]),format:e?"name":"hex"}:!1))))))))))}function Yt(t){return typeof t=="number"?!Number.isNaN(t):se.CSS_UNIT.test(t)}class ot{constructor(e="",i={}){if(e instanceof ot)return e;typeof e=="number"&&(e=wg(e)),this.originalInput=e;const r=vg(e);this.originalInput=e,this.r=r.r,this.g=r.g,this.b=r.b,this.a=r.a,this.roundA=Math.round(100*this.a)/100,this.format=i.format??r.format,this.gradientType=i.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=r.ok}isDark(){return this.getBrightness()<128}isLight(){return!this.isDark()}getBrightness(){const e=this.toRgb();return(e.r*299+e.g*587+e.b*114)/1e3}getLuminance(){const e=this.toRgb();let i,r,o;const s=e.r/255,a=e.g/255,l=e.b/255;return s<=.03928?i=s/12.92:i=Math.pow((s+.055)/1.055,2.4),a<=.03928?r=a/12.92:r=Math.pow((a+.055)/1.055,2.4),l<=.03928?o=l/12.92:o=Math.pow((l+.055)/1.055,2.4),.2126*i+.7152*r+.0722*o}getAlpha(){return this.a}setAlpha(e){return this.a=Ic(e),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){const{s:e}=this.toHsl();return e===0}toHsv(){const e=ml(this.r,this.g,this.b);return{h:e.h*360,s:e.s,v:e.v,a:this.a}}toHsvString(){const e=ml(this.r,this.g,this.b),i=Math.round(e.h*360),r=Math.round(e.s*100),o=Math.round(e.v*100);return this.a===1?`hsv(${i}, ${r}%, ${o}%)`:`hsva(${i}, ${r}%, ${o}%, ${this.roundA})`}toHsl(){const e=fl(this.r,this.g,this.b);return{h:e.h*360,s:e.s,l:e.l,a:this.a}}toHslString(){const e=fl(this.r,this.g,this.b),i=Math.round(e.h*360),r=Math.round(e.s*100),o=Math.round(e.l*100);return this.a===1?`hsl(${i}, ${r}%, ${o}%)`:`hsla(${i}, ${r}%, ${o}%, ${this.roundA})`}toHex(e=!1){return gl(this.r,this.g,this.b,e)}toHexString(e=!1){return"#"+this.toHex(e)}toHex8(e=!1){return mg(this.r,this.g,this.b,this.a,e)}toHex8String(e=!1){return"#"+this.toHex8(e)}toHexShortString(e=!1){return this.a===1?this.toHexString(e):this.toHex8String(e)}toRgb(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){const e=Math.round(this.r),i=Math.round(this.g),r=Math.round(this.b);return this.a===1?`rgb(${e}, ${i}, ${r})`:`rgba(${e}, ${i}, ${r}, ${this.roundA})`}toPercentageRgb(){const e=i=>`${Math.round(vt(i,255)*100)}%`;return{r:e(this.r),g:e(this.g),b:e(this.b),a:this.a}}toPercentageRgbString(){const e=i=>Math.round(vt(i,255)*100);return this.a===1?`rgb(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%)`:`rgba(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%, ${this.roundA})`}toCmyk(){return{...bl(this.r,this.g,this.b)}}toCmykString(){const{c:e,m:i,y:r,k:o}=bl(this.r,this.g,this.b);return`cmyk(${e}, ${i}, ${r}, ${o})`}toName(){if(this.a===0)return"transparent";if(this.a<1)return!1;const e="#"+gl(this.r,this.g,this.b,!1);for(const[i,r]of Object.entries($a))if(e===r)return i;return!1}toString(e){const i=!!e;e=e??this.format;let r=!1;const o=this.a<1&&this.a>=0;return!i&&o&&(e.startsWith("hex")||e==="name")?e==="name"&&this.a===0?this.toName():this.toRgbString():(e==="rgb"&&(r=this.toRgbString()),e==="prgb"&&(r=this.toPercentageRgbString()),(e==="hex"||e==="hex6")&&(r=this.toHexString()),e==="hex3"&&(r=this.toHexString(!0)),e==="hex4"&&(r=this.toHex8String(!0)),e==="hex8"&&(r=this.toHex8String()),e==="name"&&(r=this.toName()),e==="hsl"&&(r=this.toHslString()),e==="hsv"&&(r=this.toHsvString()),e==="cmyk"&&(r=this.toCmykString()),r||this.toHexString())}toNumber(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new ot(this.toString())}lighten(e=10){const i=this.toHsl();return i.l+=e/100,i.l=ko(i.l),new ot(i)}brighten(e=10){const i=this.toRgb();return i.r=Math.max(0,Math.min(255,i.r-Math.round(255*-(e/100)))),i.g=Math.max(0,Math.min(255,i.g-Math.round(255*-(e/100)))),i.b=Math.max(0,Math.min(255,i.b-Math.round(255*-(e/100)))),new ot(i)}darken(e=10){const i=this.toHsl();return i.l-=e/100,i.l=ko(i.l),new ot(i)}tint(e=10){return this.mix("white",e)}shade(e=10){return this.mix("black",e)}desaturate(e=10){const i=this.toHsl();return i.s-=e/100,i.s=ko(i.s),new ot(i)}saturate(e=10){const i=this.toHsl();return i.s+=e/100,i.s=ko(i.s),new ot(i)}greyscale(){return this.desaturate(100)}spin(e){const i=this.toHsl(),r=(i.h+e)%360;return i.h=r<0?360+r:r,new ot(i)}mix(e,i=50){const r=this.toRgb(),o=new ot(e).toRgb(),s=i/100,a={r:(o.r-r.r)*s+r.r,g:(o.g-r.g)*s+r.g,b:(o.b-r.b)*s+r.b,a:(o.a-r.a)*s+r.a};return new ot(a)}analogous(e=6,i=30){const r=this.toHsl(),o=360/i,s=[this];for(r.h=(r.h-(o*e>>1)+720)%360;--e;)r.h=(r.h+o)%360,s.push(new ot(r));return s}complement(){const e=this.toHsl();return e.h=(e.h+180)%360,new ot(e)}monochromatic(e=6){const i=this.toHsv(),{h:r}=i,{s:o}=i;let{v:s}=i;const a=[],l=1/e;for(;e--;)a.push(new ot({h:r,s:o,v:s})),s=(s+l)%1;return a}splitcomplement(){const e=this.toHsl(),{h:i}=e;return[this,new ot({h:(i+72)%360,s:e.s,l:e.l}),new ot({h:(i+216)%360,s:e.s,l:e.l})]}onBackground(e){const i=this.toRgb(),r=new ot(e).toRgb(),o=i.a+r.a*(1-i.a);return new ot({r:(i.r*i.a+r.r*r.a*(1-i.a))/o,g:(i.g*i.a+r.g*r.a*(1-i.a))/o,b:(i.b*i.a+r.b*r.a*(1-i.a))/o,a:o})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(e){const i=this.toHsl(),{h:r}=i,o=[this],s=360/e;for(let a=1;a<e;a++)o.push(new ot({h:(r+a*s)%360,s:i.s,l:i.l}));return o}equals(e){const i=new ot(e);return this.format==="cmyk"||i.format==="cmyk"?this.toCmykString()===i.toCmykString():this.toRgbString()===i.toRgbString()}}var I=class extends J{constructor(){super(),this.hasSlotController=new jt(this,"hint","label"),this.isSafeValue=!1,this.localize=new W(this),this.hasFocus=!1,this.isDraggingGridHandle=!1,this.isEmpty=!0,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this._value=null,this.defaultValue=this.getAttribute("value")||null,this.withLabel=!1,this.withHint=!1,this.hasEyeDropper=!1,this.label="",this.hint="",this.format="hex",this.size="medium",this.withoutFormatToggle=!1,this.name=null,this.disabled=!1,this.open=!1,this.opacity=!1,this.uppercase=!1,this.swatches="",this.required=!1,this.handleFocusIn=()=>{this.hasFocus=!0},this.handleFocusOut=()=>{this.hasFocus=!1},this.reportValidityAfterShow=()=>{this.removeEventListener("invalid",this.emitInvalid),this.reportValidity(),this.addEventListener("invalid",this.emitInvalid)},this.handleKeyDown=t=>{this.open&&t.key==="Escape"&&(t.stopPropagation(),this.hide(),this.focus())},this.handleDocumentKeyDown=t=>{if(t.key==="Escape"&&this.open){t.stopPropagation(),this.focus(),this.hide();return}t.key==="Tab"&&setTimeout(()=>{const e=this.getRootNode()instanceof ShadowRoot?document.activeElement?.shadowRoot?.activeElement:document.activeElement;(!this||e?.closest(this.tagName.toLowerCase())!==this)&&this.hide()})},this.handleDocumentMouseDown=t=>{const i=t.composedPath().some(r=>r instanceof Element&&(r.closest(".color-picker")||r===this.trigger));this&&!i&&this.hide()},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut)}static get validators(){const t=[ks()];return[...super.validators,...t]}get validationTarget(){return this.popup?.active?this.input:this.trigger}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("preview-color-copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("preview-color-copied")})}handleFormatToggle(){const t=["hex","rgb","hsl","hsv"],e=(t.indexOf(this.format)+1)%t.length;this.format=t[e],this.setColor(this.value||""),this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})}handleAlphaDrag(t){const e=this.shadowRoot.querySelector(".slider.alpha"),i=e.querySelector(".slider-handle"),{width:r}=e.getBoundingClientRect();let o=this.value,s=this.value;i.focus(),t.preventDefault(),Yr(e,{onMove:a=>{this.alpha=N(a/r*100,0,100),this.syncValues(),this.value!==s&&(s=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))},onStop:()=>{this.value!==o&&(o=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))},initialEvent:t})}handleHueDrag(t){const e=this.shadowRoot.querySelector(".slider.hue"),i=e.querySelector(".slider-handle"),{width:r}=e.getBoundingClientRect();let o=this.value,s=this.value;i.focus(),t.preventDefault(),Yr(e,{onMove:a=>{this.hue=N(a/r*360,0,360),this.syncValues(),this.value!==s&&(s=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input"))}))},onStop:()=>{this.value!==o&&(o=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))},initialEvent:t})}handleGridDrag(t){const e=this.shadowRoot.querySelector(".grid"),i=e.querySelector(".grid-handle"),{width:r,height:o}=e.getBoundingClientRect();let s=this.value,a=this.value;i.focus(),t.preventDefault(),this.isDraggingGridHandle=!0,Yr(e,{onMove:(l,c)=>{this.saturation=N(l/r*100,0,100),this.brightness=N(100-c/o*100,0,100),this.syncValues(),this.value!==a&&(a=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))},onStop:()=>{this.isDraggingGridHandle=!1,this.value!==s&&(s=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))},initialEvent:t})}handleAlphaKeyDown(t){const e=t.shiftKey?10:1,i=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.alpha=N(this.alpha-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.alpha=N(this.alpha+e,0,100),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.alpha=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.alpha=100,this.syncValues()),this.value!==i&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleHueKeyDown(t){const e=t.shiftKey?10:1,i=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.hue=N(this.hue-e,0,360),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.hue=N(this.hue+e,0,360),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.hue=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.hue=360,this.syncValues()),this.value!==i&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleGridKeyDown(t){const e=t.shiftKey?10:1,i=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.saturation=N(this.saturation-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.saturation=N(this.saturation+e,0,100),this.syncValues()),t.key==="ArrowUp"&&(t.preventDefault(),this.brightness=N(this.brightness+e,0,100),this.syncValues()),t.key==="ArrowDown"&&(t.preventDefault(),this.brightness=N(this.brightness-e,0,100),this.syncValues()),this.value!==i&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleInputChange(t){const e=t.target,i=this.value;t.stopPropagation(),this.input.value?(this.setColor(e.value),e.value=this.value||""):this.value="",this.value!==i&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleInputInput(t){this.updateValidity(),t.stopPropagation()}handleInputKeyDown(t){if(t.key==="Enter"){const e=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==e&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),setTimeout(()=>this.input.select())):this.hue=0}}handleTouchMove(t){t.preventDefault()}parseColor(t){if(!t||t.trim()==="")return null;const e=new ot(t);if(!e.isValid)return null;const i=e.toHsl(),r=e.toRgb(),o=e.toHsv();if(!r||r.r==null||r.g==null||r.b==null)return null;const s={h:i.h||0,s:(i.s||0)*100,l:(i.l||0)*100,a:i.a||0},a=e.toHexString(),l=e.toHex8String(),c={h:o.h||0,s:(o.s||0)*100,v:(o.v||0)*100,a:o.a||0};return{hsl:{h:s.h,s:s.s,l:s.l,string:this.setLetterCase(`hsl(${Math.round(s.h)}, ${Math.round(s.s)}%, ${Math.round(s.l)}%)`)},hsla:{h:s.h,s:s.s,l:s.l,a:s.a,string:this.setLetterCase(`hsla(${Math.round(s.h)}, ${Math.round(s.s)}%, ${Math.round(s.l)}%, ${s.a.toFixed(2).toString()})`)},hsv:{h:c.h,s:c.s,v:c.v,string:this.setLetterCase(`hsv(${Math.round(c.h)}, ${Math.round(c.s)}%, ${Math.round(c.v)}%)`)},hsva:{h:c.h,s:c.s,v:c.v,a:c.a,string:this.setLetterCase(`hsva(${Math.round(c.h)}, ${Math.round(c.s)}%, ${Math.round(c.v)}%, ${c.a.toFixed(2).toString()})`)},rgb:{r:r.r,g:r.g,b:r.b,string:this.setLetterCase(`rgb(${Math.round(r.r)}, ${Math.round(r.g)}, ${Math.round(r.b)})`)},rgba:{r:r.r,g:r.g,b:r.b,a:r.a||0,string:this.setLetterCase(`rgba(${Math.round(r.r)}, ${Math.round(r.g)}, ${Math.round(r.b)}, ${(r.a||0).toFixed(2).toString()})`)},hex:this.setLetterCase(a),hexa:this.setLetterCase(l)}}setColor(t){const e=this.parseColor(t);return e===null?!1:(this.hue=e.hsva.h,this.saturation=e.hsva.s,this.brightness=e.hsva.v,this.alpha=this.opacity?e.hsva.a*100:100,this.syncValues(),!0)}setLetterCase(t){return typeof t!="string"?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){const t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);t!==null&&(this.format==="hsl"?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?t.hsva.string:t.hsv.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=!0,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=!1)}handleAfterHide(){this.previewButton.classList.remove("preview-color-copied"),this.updateValidity()}handleAfterShow(){this.updateValidity()}handleEyeDropper(){if(!this.hasEyeDropper)return;new EyeDropper().open().then(e=>{const i=this.value;this.setColor(e.sRGBHex),this.value!==i&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}).catch(()=>{})}selectSwatch(t){const e=this.value;this.disabled||(this.setColor(t),this.value!==e&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getHexString(t,e,i,r=100){const o=new ot(`hsva(${t}, ${e}%, ${i}%, ${r/100})`);return o.isValid?o.toHex8String():""}stopNestedEventPropagation(t){t.stopImmediatePropagation()}handleFormatChange(){this.syncValues()}handleOpacityChange(){this.alpha=100}willUpdate(t){super.willUpdate(t),t.has("value")&&this.handleValueChange(t.get("value")||"",this.value||"")}handleValueChange(t,e){if(this.isEmpty=!e,e||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){const i=this.parseColor(e);i!==null?(this.inputValue=this.value||"",this.hue=i.hsva.h,this.saturation=i.hsva.s,this.brightness=i.hsva.v,this.alpha=i.hsva.a*100,this.syncValues()):this.inputValue=t??""}this.requestUpdate()}focus(t){this.trigger.focus(t)}blur(){const t=this.trigger;this.hasFocus&&(t.focus({preventScroll:!0}),t.blur()),this.popup?.active&&this.hide()}getFormattedValue(t="hex"){const e=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(e===null)return"";switch(t){case"hex":return e.hex;case"hexa":return e.hexa;case"rgb":return e.rgb.string;case"rgba":return e.rgba.string;case"hsl":return e.hsl.string;case"hsla":return e.hsla.string;case"hsv":return e.hsv.string;case"hsva":return e.hsva.string;default:return""}}reportValidity(){return!this.validity.valid&&!this.open?(this.addEventListener("wa-after-show",this.reportValidityAfterShow,{once:!0}),this.show(),this.disabled||this.dispatchEvent(new pn),!1):super.reportValidity()}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}firstUpdated(t){super.firstUpdated(t),this.hasEyeDropper="EyeDropper"in window}handleTriggerClick(){this.open?this.hide():(this.show(),this.focus())}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault()}updateAccessibleTrigger(){const t=this.trigger;t&&(t.setAttribute("aria-haspopup","true"),t.setAttribute("aria-expanded",this.open?"true":"false"))}async show(){if(!this.open)return this.open=!0,ye(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,ye(this,"wa-after-hide")}addOpenListeners(){this.base.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){this.base&&this.base.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown)}async handleOpenChange(){if(this.disabled){this.open=!1;return}this.updateAccessibleTrigger(),this.open?(this.dispatchEvent(new CustomEvent("wa-show")),this.addOpenListeners(),await this.updateComplete,this.base.hidden=!1,this.popup.active=!0,await tt(this.popup.popup,"show-with-scale"),this.dispatchEvent(new CustomEvent("wa-after-show"))):(this.dispatchEvent(new CustomEvent("wa-hide")),this.removeOpenListeners(),await tt(this.popup.popup,"hide-with-scale"),this.base.hidden=!0,this.popup.active=!1,this.dispatchEvent(new CustomEvent("wa-after-hide")))}render(){const t=this.hasUpdated?this.withLabel||this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.withHint||this.hasSlotController.test("hint"):this.withHint,i=this.label?!0:!!t,r=this.hint?!0:!!e,o=this.saturation,s=100-this.brightness,a=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(c=>c.trim()!==""),l=p`
      <div
        part="base"
        class=${D({"color-picker":!0})}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex="-1"
      >
        <div
          part="grid"
          class="grid"
          style=${rt({backgroundColor:this.getHexString(this.hue,100,100)})}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${D({"grid-handle":!0,"grid-handle-dragging":this.isDraggingGridHandle})}
            style=${rt({top:`${s}%`,left:`${o}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            role="application"
            aria-label="HSV"
            tabindex=${T(this.disabled?void 0:"0")}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="controls">
          <div class="sliders">
            <div
              part="slider hue-slider"
              class="hue slider"
              @pointerdown=${this.handleHueDrag}
              @touchmove=${this.handleTouchMove}
            >
              <span
                part="slider-handle hue-slider-handle"
                class="slider-handle"
                style=${rt({left:`${this.hue===0?0:100/(360/this.hue)}%`,backgroundColor:this.getHexString(this.hue,100,100)})}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${T(this.disabled?void 0:"0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity?p`
                  <div
                    part="slider opacity-slider"
                    class="alpha slider transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="alpha-gradient"
                      style=${rt({backgroundImage:`linear-gradient(
                          to right,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,0)} 0%,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,100)} 100%
                        )`})}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="slider-handle"
                      style=${rt({left:`${this.alpha}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${T(this.disabled?void 0:"0")}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                `:""}
          </div>

          <button
            type="button"
            part="preview"
            class="preview transparent-bg"
            aria-label=${this.localize.term("copy")}
            style=${rt({"--preview-color":this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            @click=${this.handleCopy}
          ></button>
        </div>

        <div class="user-input" aria-live="polite">
          <wa-input
            part="input"
            type="text"
            name=${this.name}
            size="small"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            .value=${this.isEmpty?"":this.inputValue}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-label=${this.localize.term("currentValue")}
            @keydown=${this.handleInputKeyDown}
            @change=${this.handleInputChange}
            @input=${this.handleInputInput}
            @blur=${this.stopNestedEventPropagation}
            @focus=${this.stopNestedEventPropagation}
          ></wa-input>

          <wa-button-group>
            ${this.withoutFormatToggle?"":p`
                  <wa-button
                    part="format-button"
                    size="small"
                    appearance="outlined"
                    aria-label=${this.localize.term("toggleColorFormat")}
                    exportparts="
                      base:format-button__base,
                      start:format-button__start,
                      label:format-button__label,
                      end:format-button__end,
                      caret:format-button__caret
                    "
                    @click=${this.handleFormatToggle}
                    @blur=${this.stopNestedEventPropagation}
                    @focus=${this.stopNestedEventPropagation}
                  >
                    ${this.setLetterCase(this.format)}
                  </wa-button>
                `}
            ${this.hasEyeDropper?p`
                  <wa-button
                    part="eyedropper-button"
                    size="small"
                    appearance="outlined"
                    exportparts="
                      base:eyedropper-button__base,
                      start:eyedropper-button__start,
                      label:eyedropper-button__label,
                      end:eyedropper-button__end,
                      caret:eyedropper-button__caret
                    "
                    @click=${this.handleEyeDropper}
                    @blur=${this.stopNestedEventPropagation}
                    @focus=${this.stopNestedEventPropagation}
                  >
                    <wa-icon
                      library="system"
                      name="eyedropper"
                      variant="solid"
                      label=${this.localize.term("selectAColorFromTheScreen")}
                    ></wa-icon>
                  </wa-button>
                `:""}
          </wa-button-group>
        </div>

        ${a.length>0?p`
              <div part="swatches" class="swatches">
                ${a.map(c=>{const h=this.parseColor(c);return h?p`
                    <div
                      part="swatch"
                      class="swatch transparent-bg"
                      tabindex=${T(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${c}
                      @click=${()=>this.selectSwatch(c)}
                      @keydown=${u=>!this.disabled&&u.key==="Enter"&&this.setColor(h.hexa)}
                    >
                      <div class="swatch-color" style=${rt({backgroundColor:h.hexa})}></div>
                    </div>
                  `:""})}
              </div>
            `:""}
      </div>
    `;return p`
      <div
        class=${D({container:!0,"form-control":!0,"form-control-has-label":i})}
        part="trigger-container form-control"
      >
        <div
          part="form-control-label"
          class=${D({label:!0,"has-label":i})}
          id="form-control-label"
        >
          <slot name="label">${this.label}</slot>
        </div>

        <button
          id="trigger"
          part="trigger form-control-input"
          class=${D({trigger:!0,"trigger-empty":this.isEmpty,"transparent-bg":!0,"form-control-input":!0})}
          style=${rt({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
          type="button"
          aria-labelledby="form-control-label"
          aria-describedby="hint"
          .disabled=${this.disabled}
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
        ></button>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${D({"has-slotted":r})}
          >${this.hint}</slot
        >
      </div>

      <wa-popup
        class="color-popup"
        anchor="trigger"
        placement="bottom-start"
        distance="0"
        skidding="0"
        sync="width"
        flip
        flip-fallback-strategy="best-fit"
        shift
        shift-padding="10"
        aria-disabled=${this.disabled?"true":"false"}
        @wa-after-show=${this.handleAfterShow}
        @wa-after-hide=${this.handleAfterHide}
      >
        ${l}
      </wa-popup>
    `}};I.css=[Oc,Tt,Ne,cg];I.shadowRootOptions={...J.shadowRootOptions,delegatesFocus:!0};n([x('[part~="base"]')],I.prototype,"base",2);n([x('[part~="input"]')],I.prototype,"input",2);n([x('[part~="form-control-label"]')],I.prototype,"triggerLabel",2);n([x('[part~="form-control-input"]')],I.prototype,"triggerButton",2);n([x(".color-popup")],I.prototype,"popup",2);n([x('[part~="preview"]')],I.prototype,"previewButton",2);n([x('[part~="trigger"]')],I.prototype,"trigger",2);n([w()],I.prototype,"hasFocus",2);n([w()],I.prototype,"isDraggingGridHandle",2);n([w()],I.prototype,"isEmpty",2);n([w()],I.prototype,"inputValue",2);n([w()],I.prototype,"hue",2);n([w()],I.prototype,"saturation",2);n([w()],I.prototype,"brightness",2);n([w()],I.prototype,"alpha",2);n([w()],I.prototype,"value",1);n([d({attribute:"value",reflect:!0})],I.prototype,"defaultValue",2);n([d({attribute:"with-label",reflect:!0,type:Boolean})],I.prototype,"withLabel",2);n([d({attribute:"with-hint",reflect:!0,type:Boolean})],I.prototype,"withHint",2);n([w()],I.prototype,"hasEyeDropper",2);n([d()],I.prototype,"label",2);n([d({attribute:"hint"})],I.prototype,"hint",2);n([d()],I.prototype,"format",2);n([d({reflect:!0})],I.prototype,"size",2);n([d({attribute:"without-format-toggle",type:Boolean})],I.prototype,"withoutFormatToggle",2);n([d({reflect:!0})],I.prototype,"name",2);n([d({type:Boolean})],I.prototype,"disabled",2);n([d({type:Boolean,reflect:!0})],I.prototype,"open",2);n([d({type:Boolean})],I.prototype,"opacity",2);n([d({type:Boolean})],I.prototype,"uppercase",2);n([d()],I.prototype,"swatches",2);n([d({type:Boolean,reflect:!0})],I.prototype,"required",2);n([vs({passive:!1})],I.prototype,"handleTouchMove",1);n([k("format",{waitUntilFirstUpdate:!0})],I.prototype,"handleFormatChange",1);n([k("opacity")],I.prototype,"handleOpacityChange",1);n([k("value")],I.prototype,"handleValueChange",1);n([k("open",{waitUntilFirstUpdate:!0})],I.prototype,"handleOpenChange",1);I=n([v("wa-color-picker")],I);var Pc=class extends Event{constructor(){super("wa-clear",{bubbles:!0,cancelable:!1,composed:!0})}};function fn(t,e){const i=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!i&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&Cg(e)})}function Cg(t){let e=null;if("form"in t&&(e=t.form),!e&&"getForm"in t&&(e=t.getForm()),!e)return;const i=[...e.elements];if(i.length===1){e.requestSubmit(null);return}const r=i.find(o=>o.type==="submit"&&!o.matches(":disabled"));r&&(["input","button"].includes(r.localName)?e.requestSubmit(r):r.click())}var $g=C`
  :host {
    border-width: 0;
  }

  .text-field {
    display: flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    transition: inherit;
    height: var(--wa-form-control-height);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    cursor: text;
    color: var(--wa-form-control-value-color);
    font-size: var(--wa-form-control-value-font-size);
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    vertical-align: middle;
    width: 100%;
    transition:
      background-color var(--wa-transition-normal),
      border var(--wa-transition-normal),
      outline var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    background-color: var(--wa-form-control-background-color);
    box-shadow: var(--box-shadow);
    padding: 0 var(--wa-form-control-padding-inline);

    &:focus-within {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }

    /* Style disabled inputs */
    &:has(:disabled) {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .text-field {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .text-field {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .text-field {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  :host([pill]) .text-field {
    border-radius: var(--wa-border-radius-pill) !important;
  }

  .text-field {
    /* Show autofill styles over the entire text field, not just the native <input> */
    &:has(:autofill),
    &:has(:-webkit-autofill) {
      background-color: var(--wa-color-brand-fill-quiet) !important;
    }

    input,
    textarea {
      /*
      Fixes an alignment issue with placeholders.
      https://github.com/shoelace-style/webawesome/issues/342
    */
      height: 100%;

      padding: 0;
      border: none;
      outline: none;
      box-shadow: none;
      margin: 0;
      cursor: inherit;
      -webkit-appearance: none;
      font: inherit;

      /* Turn off Safari's autofill styles */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-background-clip: text;
        background-color: transparent;
        -webkit-text-fill-color: inherit;
      }
    }
  }

  input {
    flex: 1 1 auto;
    min-width: 0;
    height: 100%;
    transition: inherit;

    /* prettier-ignore */
    background-color: rgb(118 118 118 / 0); /* ensures proper placeholder styles in webkit's date input */
    height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
    padding-block: 0;
    color: inherit;

    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }

    &:focus {
      outline: none;
    }
  }

  textarea {
    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }
  }

  .start,
  .end {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;

    &::slotted(wa-icon) {
      color: var(--wa-color-neutral-on-quiet);
    }
  }

  .start::slotted(*) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  .end::slotted(*) {
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  /*
   * Clearable + Password Toggle
   */

  .clear,
  .password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    background: none;
    padding: 0;
    transition: var(--wa-transition-normal) color;
    cursor: pointer;
    margin-inline-start: var(--wa-form-control-padding-inline);

    @media (hover: hover) {
      &:hover {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
      }
    }

    &:active {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
    }

    &:focus {
      outline: none;
    }
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  :host([without-spin-buttons]) input[type='number'] {
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      display: none;
    }
  }
`;var P=class extends J{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new jt(this,"hint","label"),this.localize=new W(this),this.title="",this.type="text",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="medium",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.withClear=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.withoutSpinButtons=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,uo()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}handleChange(t){this.value=this.input.value,this.relayNativeEvent(t,{bubbles:!0,composed:!0})}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.updateComplete.then(()=>{this.dispatchEvent(new Pc),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})),this.input.focus()}handleInput(){this.value=this.input.value}handleKeyDown(t){fn(t,this)}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}updated(t){super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,i="none"){this.input.setSelectionRange(t,e,i)}setRangeText(t,e,i,r="preserve"){const o=e??this.input.selectionStart,s=i??this.input.selectionEnd;this.input.setRangeText(t,o,s,r),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,i=this.label?!0:!!t,r=this.hint?!0:!!e,o=this.withClear&&!this.disabled&&!this.readonly,s=this.hasUpdated&&o&&(typeof this.value=="number"||this.value&&this.value.length>0);return p`
      <label
        part="form-control-label label"
        class=${D({label:!0,"has-label":i})}
        for="input"
        aria-hidden=${i?"false":"true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="text-field">
        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
          id="input"
          class="control"
          type=${this.type==="password"&&this.passwordVisible?"text":this.type}
          title=${this.title}
          name=${T(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${T(this.placeholder)}
          minlength=${T(this.minlength)}
          maxlength=${T(this.maxlength)}
          min=${T(this.min)}
          max=${T(this.max)}
          step=${T(this.step)}
          .value=${Fi(this.value??"")}
          autocapitalize=${T(this.autocapitalize)}
          autocomplete=${T(this.autocomplete)}
          autocorrect=${T(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${T(this.pattern)}
          enterkeyhint=${T(this.enterkeyhint)}
          inputmode=${T(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        ${s?p`
              <button
                part="clear-button"
                class="clear"
                type="button"
                aria-label=${this.localize.term("clearEntry")}
                @click=${this.handleClearClick}
                tabindex="-1"
              >
                <slot name="clear-icon">
                  <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                </slot>
              </button>
            `:""}
        ${this.passwordToggle&&!this.disabled?p`
              <button
                part="password-toggle-button"
                class="password-toggle"
                type="button"
                aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                @click=${this.handlePasswordToggle}
                tabindex="-1"
              >
                ${this.passwordVisible?p`
                      <slot name="hide-password-icon">
                        <wa-icon name="eye-slash" library="system" variant="regular"></wa-icon>
                      </slot>
                    `:p`
                      <slot name="show-password-icon">
                        <wa-icon name="eye" library="system" variant="regular"></wa-icon>
                      </slot>
                    `}
              </button>
            `:""}

        <slot name="end" part="end" class="end"></slot>
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${D({"has-slotted":r})}
        aria-hidden=${r?"false":"true"}
        >${this.hint}</slot
      >
    `}};P.css=[Tt,Ne,$g];P.shadowRootOptions={...J.shadowRootOptions,delegatesFocus:!0};n([x("input")],P.prototype,"input",2);n([d()],P.prototype,"title",2);n([d({reflect:!0})],P.prototype,"type",2);n([w()],P.prototype,"value",1);n([d({attribute:"value",reflect:!0})],P.prototype,"defaultValue",2);n([d({reflect:!0})],P.prototype,"size",2);n([d({reflect:!0})],P.prototype,"appearance",2);n([d({type:Boolean,reflect:!0})],P.prototype,"pill",2);n([d()],P.prototype,"label",2);n([d({attribute:"hint"})],P.prototype,"hint",2);n([d({attribute:"with-clear",type:Boolean})],P.prototype,"withClear",2);n([d()],P.prototype,"placeholder",2);n([d({type:Boolean,reflect:!0})],P.prototype,"readonly",2);n([d({attribute:"password-toggle",type:Boolean})],P.prototype,"passwordToggle",2);n([d({attribute:"password-visible",type:Boolean})],P.prototype,"passwordVisible",2);n([d({attribute:"without-spin-buttons",type:Boolean})],P.prototype,"withoutSpinButtons",2);n([d({type:Boolean,reflect:!0})],P.prototype,"required",2);n([d()],P.prototype,"pattern",2);n([d({type:Number})],P.prototype,"minlength",2);n([d({type:Number})],P.prototype,"maxlength",2);n([d()],P.prototype,"min",2);n([d()],P.prototype,"max",2);n([d()],P.prototype,"step",2);n([d()],P.prototype,"autocapitalize",2);n([d()],P.prototype,"autocorrect",2);n([d()],P.prototype,"autocomplete",2);n([d({type:Boolean})],P.prototype,"autofocus",2);n([d()],P.prototype,"enterkeyhint",2);n([d({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],P.prototype,"spellcheck",2);n([d()],P.prototype,"inputmode",2);n([d({attribute:"with-label",type:Boolean})],P.prototype,"withLabel",2);n([d({attribute:"with-hint",type:Boolean})],P.prototype,"withHint",2);n([k("step",{waitUntilFirstUpdate:!0})],P.prototype,"handleStepChange",1);P=n([v("wa-input")],P);var Mc=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};var Sg=C`
  :host {
    --arrow-color: black;
    --arrow-size: var(--wa-tooltip-arrow-size);
    --show-duration: 100ms;
    --hide-duration: 100ms;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);

    /* Clear UA styles for [popover] */
    :where(&) {
      inset: unset;
      padding: unset;
      margin: unset;
      width: unset;
      height: unset;
      color: unset;
      background: unset;
      border: unset;
      overflow: unset;
    }
  }

  .popup-fixed {
    position: fixed;
  }

  .popup:not(.popup-active) {
    display: none;
  }

  .arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: 3;
  }

  :host([data-current-placement~='left']) .arrow {
    rotate: -45deg;
  }

  :host([data-current-placement~='right']) .arrow {
    rotate: 135deg;
  }

  :host([data-current-placement~='bottom']) .arrow {
    rotate: 225deg;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge-visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: 899;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }

  /* Built-in animations */
  .show {
    animation: show var(--show-duration) ease;
  }

  .hide {
    animation: show var(--hide-duration) ease reverse;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .show-with-scale {
    animation: show-with-scale var(--show-duration) ease;
  }

  .hide-with-scale {
    animation: show-with-scale var(--hide-duration) ease reverse;
  }

  @keyframes show-with-scale {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }
`;const fi=Math.min,Jt=Math.max,es=Math.round,So=Math.floor,De=t=>({x:t,y:t}),Eg={left:"right",right:"left",bottom:"top",top:"bottom"},Ag={start:"end",end:"start"};function Sa(t,e,i){return Jt(t,fi(e,i))}function Ar(t,e){return typeof t=="function"?t(e):t}function mi(t){return t.split("-")[0]}function Lr(t){return t.split("-")[1]}function Nc(t){return t==="x"?"y":"x"}function mn(t){return t==="y"?"height":"width"}const Lg=new Set(["top","bottom"]);function He(t){return Lg.has(mi(t))?"y":"x"}function gn(t){return Nc(He(t))}function _g(t,e,i){i===void 0&&(i=!1);const r=Lr(t),o=gn(t),s=mn(o);let a=o==="x"?r===(i?"end":"start")?"right":"left":r==="start"?"bottom":"top";return e.reference[s]>e.floating[s]&&(a=is(a)),[a,is(a)]}function Tg(t){const e=is(t);return[Ea(t),e,Ea(e)]}function Ea(t){return t.replace(/start|end/g,e=>Ag[e])}const vl=["left","right"],yl=["right","left"],zg=["top","bottom"],Rg=["bottom","top"];function Dg(t,e,i){switch(t){case"top":case"bottom":return i?e?yl:vl:e?vl:yl;case"left":case"right":return e?zg:Rg;default:return[]}}function Og(t,e,i,r){const o=Lr(t);let s=Dg(mi(t),i==="start",r);return o&&(s=s.map(a=>a+"-"+o),e&&(s=s.concat(s.map(Ea)))),s}function is(t){return t.replace(/left|right|bottom|top/g,e=>Eg[e])}function Ig(t){return{top:0,right:0,bottom:0,left:0,...t}}function Fc(t){return typeof t!="number"?Ig(t):{top:t,right:t,bottom:t,left:t}}function rs(t){const{x:e,y:i,width:r,height:o}=t;return{width:r,height:o,top:i,left:e,right:e+r,bottom:i+o,x:e,y:i}}function xl(t,e,i){let{reference:r,floating:o}=t;const s=He(e),a=gn(e),l=mn(a),c=mi(e),h=s==="y",u=r.x+r.width/2-o.width/2,f=r.y+r.height/2-o.height/2,m=r[l]/2-o[l]/2;let g;switch(c){case"top":g={x:u,y:r.y-o.height};break;case"bottom":g={x:u,y:r.y+r.height};break;case"right":g={x:r.x+r.width,y:f};break;case"left":g={x:r.x-o.width,y:f};break;default:g={x:r.x,y:r.y}}switch(Lr(e)){case"start":g[a]-=m*(i&&h?-1:1);break;case"end":g[a]+=m*(i&&h?-1:1);break}return g}async function Pg(t,e){var i;e===void 0&&(e={});const{x:r,y:o,platform:s,rects:a,elements:l,strategy:c}=t,{boundary:h="clippingAncestors",rootBoundary:u="viewport",elementContext:f="floating",altBoundary:m=!1,padding:g=0}=Ar(e,t),b=Fc(g),E=l[m?f==="floating"?"reference":"floating":f],_=rs(await s.getClippingRect({element:(i=await(s.isElement==null?void 0:s.isElement(E)))==null||i?E:E.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(l.floating)),boundary:h,rootBoundary:u,strategy:c})),A=f==="floating"?{x:r,y:o,width:a.floating.width,height:a.floating.height}:a.reference,$=await(s.getOffsetParent==null?void 0:s.getOffsetParent(l.floating)),L=await(s.isElement==null?void 0:s.isElement($))?await(s.getScale==null?void 0:s.getScale($))||{x:1,y:1}:{x:1,y:1},S=rs(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:A,offsetParent:$,strategy:c}):A);return{top:(_.top-S.top+b.top)/L.y,bottom:(S.bottom-_.bottom+b.bottom)/L.y,left:(_.left-S.left+b.left)/L.x,right:(S.right-_.right+b.right)/L.x}}const Mg=async(t,e,i)=>{const{placement:r="bottom",strategy:o="absolute",middleware:s=[],platform:a}=i,l=s.filter(Boolean),c=await(a.isRTL==null?void 0:a.isRTL(e));let h=await a.getElementRects({reference:t,floating:e,strategy:o}),{x:u,y:f}=xl(h,r,c),m=r,g={},b=0;for(let E=0;E<l.length;E++){var y;const{name:_,fn:A}=l[E],{x:$,y:L,data:S,reset:O}=await A({x:u,y:f,initialPlacement:r,placement:m,strategy:o,middlewareData:g,rects:h,platform:{...a,detectOverflow:(y=a.detectOverflow)!=null?y:Pg},elements:{reference:t,floating:e}});u=$??u,f=L??f,g={...g,[_]:{...g[_],...S}},O&&b<=50&&(b++,typeof O=="object"&&(O.placement&&(m=O.placement),O.rects&&(h=O.rects===!0?await a.getElementRects({reference:t,floating:e,strategy:o}):O.rects),{x:u,y:f}=xl(h,m,c)),E=-1)}return{x:u,y:f,placement:m,strategy:o,middlewareData:g}},Ng=t=>({name:"arrow",options:t,async fn(e){const{x:i,y:r,placement:o,rects:s,platform:a,elements:l,middlewareData:c}=e,{element:h,padding:u=0}=Ar(t,e)||{};if(h==null)return{};const f=Fc(u),m={x:i,y:r},g=gn(o),b=mn(g),y=await a.getDimensions(h),E=g==="y",_=E?"top":"left",A=E?"bottom":"right",$=E?"clientHeight":"clientWidth",L=s.reference[b]+s.reference[g]-m[g]-s.floating[b],S=m[g]-s.reference[g],O=await(a.getOffsetParent==null?void 0:a.getOffsetParent(h));let it=O?O[$]:0;(!it||!await(a.isElement==null?void 0:a.isElement(O)))&&(it=l.floating[$]||s.floating[b]);const Gt=L/2-S/2,Et=it/2-y[b]/2-1,zt=fi(f[_],Et),de=fi(f[A],Et),Rt=zt,he=it-y[b]-de,ht=it/2-y[b]/2+Gt,$i=Sa(Rt,ht,he),Ue=!c.arrow&&Lr(o)!=null&&ht!==$i&&s.reference[b]/2-(ht<Rt?zt:de)-y[b]/2<0,ue=Ue?ht<Rt?ht-Rt:ht-he:0;return{[g]:m[g]+ue,data:{[g]:$i,centerOffset:ht-$i-ue,...Ue&&{alignmentOffset:ue}},reset:Ue}}}),Fg=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var i,r;const{placement:o,middlewareData:s,rects:a,initialPlacement:l,platform:c,elements:h}=e,{mainAxis:u=!0,crossAxis:f=!0,fallbackPlacements:m,fallbackStrategy:g="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:y=!0,...E}=Ar(t,e);if((i=s.arrow)!=null&&i.alignmentOffset)return{};const _=mi(o),A=He(l),$=mi(l)===l,L=await(c.isRTL==null?void 0:c.isRTL(h.floating)),S=m||($||!y?[is(l)]:Tg(l)),O=b!=="none";!m&&O&&S.push(...Og(l,y,b,L));const it=[l,...S],Gt=await c.detectOverflow(e,E),Et=[];let zt=((r=s.flip)==null?void 0:r.overflows)||[];if(u&&Et.push(Gt[_]),f){const ht=_g(o,a,L);Et.push(Gt[ht[0]],Gt[ht[1]])}if(zt=[...zt,{placement:o,overflows:Et}],!Et.every(ht=>ht<=0)){var de,Rt;const ht=(((de=s.flip)==null?void 0:de.index)||0)+1,$i=it[ht];if($i&&(!(f==="alignment"?A!==He($i):!1)||zt.every(pe=>He(pe.placement)===A?pe.overflows[0]>0:!0)))return{data:{index:ht,overflows:zt},reset:{placement:$i}};let Ue=(Rt=zt.filter(ue=>ue.overflows[0]<=0).sort((ue,pe)=>ue.overflows[1]-pe.overflows[1])[0])==null?void 0:Rt.placement;if(!Ue)switch(g){case"bestFit":{var he;const ue=(he=zt.filter(pe=>{if(O){const Je=He(pe.placement);return Je===A||Je==="y"}return!0}).map(pe=>[pe.placement,pe.overflows.filter(Je=>Je>0).reduce((Je,ad)=>Je+ad,0)]).sort((pe,Je)=>pe[1]-Je[1])[0])==null?void 0:he[0];ue&&(Ue=ue);break}case"initialPlacement":Ue=l;break}if(o!==Ue)return{reset:{placement:Ue}}}return{}}}},Bg=new Set(["left","top"]);async function Ug(t,e){const{placement:i,platform:r,elements:o}=t,s=await(r.isRTL==null?void 0:r.isRTL(o.floating)),a=mi(i),l=Lr(i),c=He(i)==="y",h=Bg.has(a)?-1:1,u=s&&c?-1:1,f=Ar(e,t);let{mainAxis:m,crossAxis:g,alignmentAxis:b}=typeof f=="number"?{mainAxis:f,crossAxis:0,alignmentAxis:null}:{mainAxis:f.mainAxis||0,crossAxis:f.crossAxis||0,alignmentAxis:f.alignmentAxis};return l&&typeof b=="number"&&(g=l==="end"?b*-1:b),c?{x:g*u,y:m*h}:{x:m*h,y:g*u}}const Vg=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var i,r;const{x:o,y:s,placement:a,middlewareData:l}=e,c=await Ug(e,t);return a===((i=l.offset)==null?void 0:i.placement)&&(r=l.arrow)!=null&&r.alignmentOffset?{}:{x:o+c.x,y:s+c.y,data:{...c,placement:a}}}}},qg=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:i,y:r,placement:o,platform:s}=e,{mainAxis:a=!0,crossAxis:l=!1,limiter:c={fn:_=>{let{x:A,y:$}=_;return{x:A,y:$}}},...h}=Ar(t,e),u={x:i,y:r},f=await s.detectOverflow(e,h),m=He(mi(o)),g=Nc(m);let b=u[g],y=u[m];if(a){const _=g==="y"?"top":"left",A=g==="y"?"bottom":"right",$=b+f[_],L=b-f[A];b=Sa($,b,L)}if(l){const _=m==="y"?"top":"left",A=m==="y"?"bottom":"right",$=y+f[_],L=y-f[A];y=Sa($,y,L)}const E=c.fn({...e,[g]:b,[m]:y});return{...E,data:{x:E.x-i,y:E.y-r,enabled:{[g]:a,[m]:l}}}}}},Hg=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var i,r;const{placement:o,rects:s,platform:a,elements:l}=e,{apply:c=()=>{},...h}=Ar(t,e),u=await a.detectOverflow(e,h),f=mi(o),m=Lr(o),g=He(o)==="y",{width:b,height:y}=s.floating;let E,_;f==="top"||f==="bottom"?(E=f,_=m===(await(a.isRTL==null?void 0:a.isRTL(l.floating))?"start":"end")?"left":"right"):(_=f,E=m==="end"?"top":"bottom");const A=y-u.top-u.bottom,$=b-u.left-u.right,L=fi(y-u[E],A),S=fi(b-u[_],$),O=!e.middlewareData.shift;let it=L,Gt=S;if((i=e.middlewareData.shift)!=null&&i.enabled.x&&(Gt=$),(r=e.middlewareData.shift)!=null&&r.enabled.y&&(it=A),O&&!m){const zt=Jt(u.left,0),de=Jt(u.right,0),Rt=Jt(u.top,0),he=Jt(u.bottom,0);g?Gt=b-2*(zt!==0||de!==0?zt+de:Jt(u.left,u.right)):it=y-2*(Rt!==0||he!==0?Rt+he:Jt(u.top,u.bottom))}await c({...e,availableWidth:Gt,availableHeight:it});const Et=await a.getDimensions(l.floating);return b!==Et.width||y!==Et.height?{reset:{rects:!0}}:{}}}};function Cs(){return typeof window<"u"}function _r(t){return Bc(t)?(t.nodeName||"").toLowerCase():"#document"}function ie(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function Fe(t){var e;return(e=(Bc(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Bc(t){return Cs()?t instanceof Node||t instanceof ie(t).Node:!1}function xe(t){return Cs()?t instanceof Element||t instanceof ie(t).Element:!1}function Ie(t){return Cs()?t instanceof HTMLElement||t instanceof ie(t).HTMLElement:!1}function kl(t){return!Cs()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof ie(t).ShadowRoot}const Wg=new Set(["inline","contents"]);function po(t){const{overflow:e,overflowX:i,overflowY:r,display:o}=ke(t);return/auto|scroll|overlay|hidden|clip/.test(e+r+i)&&!Wg.has(o)}const jg=new Set(["table","td","th"]);function Kg(t){return jg.has(_r(t))}const Gg=[":popover-open",":modal"];function $s(t){return Gg.some(e=>{try{return t.matches(e)}catch{return!1}})}const Xg=["transform","translate","scale","rotate","perspective"],Yg=["transform","translate","scale","rotate","perspective","filter"],Zg=["paint","layout","strict","content"];function Ss(t){const e=bn(),i=xe(t)?ke(t):t;return Xg.some(r=>i[r]?i[r]!=="none":!1)||(i.containerType?i.containerType!=="normal":!1)||!e&&(i.backdropFilter?i.backdropFilter!=="none":!1)||!e&&(i.filter?i.filter!=="none":!1)||Yg.some(r=>(i.willChange||"").includes(r))||Zg.some(r=>(i.contain||"").includes(r))}function Qg(t){let e=gi(t);for(;Ie(e)&&!mr(e);){if(Ss(e))return e;if($s(e))return null;e=gi(e)}return null}function bn(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const Jg=new Set(["html","body","#document"]);function mr(t){return Jg.has(_r(t))}function ke(t){return ie(t).getComputedStyle(t)}function Es(t){return xe(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function gi(t){if(_r(t)==="html")return t;const e=t.assignedSlot||t.parentNode||kl(t)&&t.host||Fe(t);return kl(e)?e.host:e}function Uc(t){const e=gi(t);return mr(e)?t.ownerDocument?t.ownerDocument.body:t.body:Ie(e)&&po(e)?e:Uc(e)}function gr(t,e,i){var r;e===void 0&&(e=[]),i===void 0&&(i=!0);const o=Uc(t),s=o===((r=t.ownerDocument)==null?void 0:r.body),a=ie(o);if(s){const l=Aa(a);return e.concat(a,a.visualViewport||[],po(o)?o:[],l&&i?gr(l):[])}return e.concat(o,gr(o,[],i))}function Aa(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Vc(t){const e=ke(t);let i=parseFloat(e.width)||0,r=parseFloat(e.height)||0;const o=Ie(t),s=o?t.offsetWidth:i,a=o?t.offsetHeight:r,l=es(i)!==s||es(r)!==a;return l&&(i=s,r=a),{width:i,height:r,$:l}}function wn(t){return xe(t)?t:t.contextElement}function sr(t){const e=wn(t);if(!Ie(e))return De(1);const i=e.getBoundingClientRect(),{width:r,height:o,$:s}=Vc(e);let a=(s?es(i.width):i.width)/r,l=(s?es(i.height):i.height)/o;return(!a||!Number.isFinite(a))&&(a=1),(!l||!Number.isFinite(l))&&(l=1),{x:a,y:l}}const tb=De(0);function qc(t){const e=ie(t);return!bn()||!e.visualViewport?tb:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function eb(t,e,i){return e===void 0&&(e=!1),!i||e&&i!==ie(t)?!1:e}function Bi(t,e,i,r){e===void 0&&(e=!1),i===void 0&&(i=!1);const o=t.getBoundingClientRect(),s=wn(t);let a=De(1);e&&(r?xe(r)&&(a=sr(r)):a=sr(t));const l=eb(s,i,r)?qc(s):De(0);let c=(o.left+l.x)/a.x,h=(o.top+l.y)/a.y,u=o.width/a.x,f=o.height/a.y;if(s){const m=ie(s),g=r&&xe(r)?ie(r):r;let b=m,y=Aa(b);for(;y&&r&&g!==b;){const E=sr(y),_=y.getBoundingClientRect(),A=ke(y),$=_.left+(y.clientLeft+parseFloat(A.paddingLeft))*E.x,L=_.top+(y.clientTop+parseFloat(A.paddingTop))*E.y;c*=E.x,h*=E.y,u*=E.x,f*=E.y,c+=$,h+=L,b=ie(y),y=Aa(b)}}return rs({width:u,height:f,x:c,y:h})}function As(t,e){const i=Es(t).scrollLeft;return e?e.left+i:Bi(Fe(t)).left+i}function Hc(t,e){const i=t.getBoundingClientRect(),r=i.left+e.scrollLeft-As(t,i),o=i.top+e.scrollTop;return{x:r,y:o}}function ib(t){let{elements:e,rect:i,offsetParent:r,strategy:o}=t;const s=o==="fixed",a=Fe(r),l=e?$s(e.floating):!1;if(r===a||l&&s)return i;let c={scrollLeft:0,scrollTop:0},h=De(1);const u=De(0),f=Ie(r);if((f||!f&&!s)&&((_r(r)!=="body"||po(a))&&(c=Es(r)),Ie(r))){const g=Bi(r);h=sr(r),u.x=g.x+r.clientLeft,u.y=g.y+r.clientTop}const m=a&&!f&&!s?Hc(a,c):De(0);return{width:i.width*h.x,height:i.height*h.y,x:i.x*h.x-c.scrollLeft*h.x+u.x+m.x,y:i.y*h.y-c.scrollTop*h.y+u.y+m.y}}function rb(t){return Array.from(t.getClientRects())}function ob(t){const e=Fe(t),i=Es(t),r=t.ownerDocument.body,o=Jt(e.scrollWidth,e.clientWidth,r.scrollWidth,r.clientWidth),s=Jt(e.scrollHeight,e.clientHeight,r.scrollHeight,r.clientHeight);let a=-i.scrollLeft+As(t);const l=-i.scrollTop;return ke(r).direction==="rtl"&&(a+=Jt(e.clientWidth,r.clientWidth)-o),{width:o,height:s,x:a,y:l}}const Cl=25;function sb(t,e){const i=ie(t),r=Fe(t),o=i.visualViewport;let s=r.clientWidth,a=r.clientHeight,l=0,c=0;if(o){s=o.width,a=o.height;const u=bn();(!u||u&&e==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}const h=As(r);if(h<=0){const u=r.ownerDocument,f=u.body,m=getComputedStyle(f),g=u.compatMode==="CSS1Compat"&&parseFloat(m.marginLeft)+parseFloat(m.marginRight)||0,b=Math.abs(r.clientWidth-f.clientWidth-g);b<=Cl&&(s-=b)}else h<=Cl&&(s+=h);return{width:s,height:a,x:l,y:c}}const ab=new Set(["absolute","fixed"]);function nb(t,e){const i=Bi(t,!0,e==="fixed"),r=i.top+t.clientTop,o=i.left+t.clientLeft,s=Ie(t)?sr(t):De(1),a=t.clientWidth*s.x,l=t.clientHeight*s.y,c=o*s.x,h=r*s.y;return{width:a,height:l,x:c,y:h}}function $l(t,e,i){let r;if(e==="viewport")r=sb(t,i);else if(e==="document")r=ob(Fe(t));else if(xe(e))r=nb(e,i);else{const o=qc(t);r={x:e.x-o.x,y:e.y-o.y,width:e.width,height:e.height}}return rs(r)}function Wc(t,e){const i=gi(t);return i===e||!xe(i)||mr(i)?!1:ke(i).position==="fixed"||Wc(i,e)}function lb(t,e){const i=e.get(t);if(i)return i;let r=gr(t,[],!1).filter(l=>xe(l)&&_r(l)!=="body"),o=null;const s=ke(t).position==="fixed";let a=s?gi(t):t;for(;xe(a)&&!mr(a);){const l=ke(a),c=Ss(a);!c&&l.position==="fixed"&&(o=null),(s?!c&&!o:!c&&l.position==="static"&&!!o&&ab.has(o.position)||po(a)&&!c&&Wc(t,a))?r=r.filter(u=>u!==a):o=l,a=gi(a)}return e.set(t,r),r}function cb(t){let{element:e,boundary:i,rootBoundary:r,strategy:o}=t;const a=[...i==="clippingAncestors"?$s(e)?[]:lb(e,this._c):[].concat(i),r],l=a[0],c=a.reduce((h,u)=>{const f=$l(e,u,o);return h.top=Jt(f.top,h.top),h.right=fi(f.right,h.right),h.bottom=fi(f.bottom,h.bottom),h.left=Jt(f.left,h.left),h},$l(e,l,o));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function db(t){const{width:e,height:i}=Vc(t);return{width:e,height:i}}function hb(t,e,i){const r=Ie(e),o=Fe(e),s=i==="fixed",a=Bi(t,!0,s,e);let l={scrollLeft:0,scrollTop:0};const c=De(0);function h(){c.x=As(o)}if(r||!r&&!s)if((_r(e)!=="body"||po(o))&&(l=Es(e)),r){const g=Bi(e,!0,s,e);c.x=g.x+e.clientLeft,c.y=g.y+e.clientTop}else o&&h();s&&!r&&o&&h();const u=o&&!r&&!s?Hc(o,l):De(0),f=a.left+l.scrollLeft-c.x-u.x,m=a.top+l.scrollTop-c.y-u.y;return{x:f,y:m,width:a.width,height:a.height}}function Zs(t){return ke(t).position==="static"}function Sl(t,e){if(!Ie(t)||ke(t).position==="fixed")return null;if(e)return e(t);let i=t.offsetParent;return Fe(t)===i&&(i=i.ownerDocument.body),i}function jc(t,e){const i=ie(t);if($s(t))return i;if(!Ie(t)){let o=gi(t);for(;o&&!mr(o);){if(xe(o)&&!Zs(o))return o;o=gi(o)}return i}let r=Sl(t,e);for(;r&&Kg(r)&&Zs(r);)r=Sl(r,e);return r&&mr(r)&&Zs(r)&&!Ss(r)?i:r||Qg(t)||i}const ub=async function(t){const e=this.getOffsetParent||jc,i=this.getDimensions,r=await i(t.floating);return{reference:hb(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function pb(t){return ke(t).direction==="rtl"}const Po={convertOffsetParentRelativeRectToViewportRelativeRect:ib,getDocumentElement:Fe,getClippingRect:cb,getOffsetParent:jc,getElementRects:ub,getClientRects:rb,getDimensions:db,getScale:sr,isElement:xe,isRTL:pb};function Kc(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function fb(t,e){let i=null,r;const o=Fe(t);function s(){var l;clearTimeout(r),(l=i)==null||l.disconnect(),i=null}function a(l,c){l===void 0&&(l=!1),c===void 0&&(c=1),s();const h=t.getBoundingClientRect(),{left:u,top:f,width:m,height:g}=h;if(l||e(),!m||!g)return;const b=So(f),y=So(o.clientWidth-(u+m)),E=So(o.clientHeight-(f+g)),_=So(u),$={rootMargin:-b+"px "+-y+"px "+-E+"px "+-_+"px",threshold:Jt(0,fi(1,c))||1};let L=!0;function S(O){const it=O[0].intersectionRatio;if(it!==c){if(!L)return a();it?a(!1,it):r=setTimeout(()=>{a(!1,1e-7)},1e3)}it===1&&!Kc(h,t.getBoundingClientRect())&&a(),L=!1}try{i=new IntersectionObserver(S,{...$,root:o.ownerDocument})}catch{i=new IntersectionObserver(S,$)}i.observe(t)}return a(!0),s}function Gc(t,e,i,r){r===void 0&&(r={});const{ancestorScroll:o=!0,ancestorResize:s=!0,elementResize:a=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:c=!1}=r,h=wn(t),u=o||s?[...h?gr(h):[],...gr(e)]:[];u.forEach(_=>{o&&_.addEventListener("scroll",i,{passive:!0}),s&&_.addEventListener("resize",i)});const f=h&&l?fb(h,i):null;let m=-1,g=null;a&&(g=new ResizeObserver(_=>{let[A]=_;A&&A.target===h&&g&&(g.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var $;($=g)==null||$.observe(e)})),i()}),h&&!c&&g.observe(h),g.observe(e));let b,y=c?Bi(t):null;c&&E();function E(){const _=Bi(t);y&&!Kc(y,_)&&i(),y=_,b=requestAnimationFrame(E)}return i(),()=>{var _;u.forEach(A=>{o&&A.removeEventListener("scroll",i),s&&A.removeEventListener("resize",i)}),f?.(),(_=g)==null||_.disconnect(),g=null,c&&cancelAnimationFrame(b)}}const Xc=Vg,Yc=qg,Zc=Fg,El=Hg,mb=Ng,Qc=(t,e,i)=>{const r=new Map,o={platform:Po,...i},s={...o.platform,_c:r};return Mg(t,e,{...o,platform:s})};function gb(t){return bb(t)}function Qs(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function bb(t){for(let e=t;e;e=Qs(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Qs(t);e;e=Qs(e)){if(!(e instanceof Element))continue;const i=getComputedStyle(e);if(i.display!=="contents"&&(i.position!=="static"||Ss(i)||e.tagName==="BODY"))return e}return null}function Al(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var Eo=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),X=class extends z{constructor(){super(...arguments),this.localize=new W(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom");let r=0,o=0,s=0,a=0,l=0,c=0,h=0,u=0;i?t.top<e.top?(r=t.left,o=t.bottom,s=t.right,a=t.bottom,l=e.left,c=e.top,h=e.right,u=e.top):(r=e.left,o=e.bottom,s=e.right,a=e.bottom,l=t.left,c=t.top,h=t.right,u=t.top):t.left<e.left?(r=t.right,o=t.top,s=e.left,a=e.top,l=t.right,c=t.bottom,h=e.left,u=e.bottom):(r=e.right,o=e.top,s=t.left,a=t.top,l=e.right,c=e.bottom,h=t.left,u=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${o}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${u}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||Al(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||!this.isConnected||(this.popup?.showPopover?.(),this.cleanup=Gc(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl||!this.popup)return;const t=[Xc({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(El({apply:({rects:r})=>{const o=this.sync==="width"||this.sync==="both",s=this.sync==="height"||this.sync==="both";this.popup.style.width=o?`${r.reference.width}px`:"",this.popup.style.height=s?`${r.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let e;Eo&&!Al(this.anchor)&&this.boundary==="scroll"&&(e=gr(this.anchorEl).filter(r=>r instanceof Element)),this.flip&&t.push(Zc({boundary:this.flipBoundary||e,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(Yc({boundary:this.shiftBoundary||e,padding:this.shiftPadding})),this.autoSize?t.push(El({boundary:this.autoSizeBoundary||e,padding:this.autoSizePadding,apply:({availableWidth:r,availableHeight:o})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${o}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${r}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(mb({element:this.arrowEl,padding:this.arrowPadding}));const i=Eo?r=>Po.getOffsetParent(r,gb):Po.getOffsetParent;Qc(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:Eo?"absolute":"fixed",platform:{...Po,getOffsetParent:i}}).then(({x:r,y:o,middlewareData:s,placement:a})=>{const l=this.localize.dir()==="rtl",c={top:"bottom",right:"left",bottom:"top",left:"right"}[a.split("-")[0]];if(this.setAttribute("data-current-placement",a),Object.assign(this.popup.style,{left:`${r}px`,top:`${o}px`}),this.arrow){const h=s.arrow.x,u=s.arrow.y;let f="",m="",g="",b="";if(this.arrowPlacement==="start"){const y=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";f=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",m=l?y:"",b=l?"":y}else if(this.arrowPlacement==="end"){const y=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";m=l?"":y,b=l?y:"",g=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(b=typeof h=="number"?"calc(50% - var(--arrow-size-diagonal))":"",f=typeof u=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(b=typeof h=="number"?`${h}px`:"",f=typeof u=="number"?`${u}px`:"");Object.assign(this.arrowEl.style,{top:f,right:m,bottom:g,left:b,[c]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new Mc)}render(){return p`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${D({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${D({popup:!0,"popup-active":this.active,"popup-fixed":!Eo,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?p`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};X.css=Sg;n([x(".popup")],X.prototype,"popup",2);n([x(".arrow")],X.prototype,"arrowEl",2);n([d()],X.prototype,"anchor",2);n([d({type:Boolean,reflect:!0})],X.prototype,"active",2);n([d({reflect:!0})],X.prototype,"placement",2);n([d()],X.prototype,"boundary",2);n([d({type:Number})],X.prototype,"distance",2);n([d({type:Number})],X.prototype,"skidding",2);n([d({type:Boolean})],X.prototype,"arrow",2);n([d({attribute:"arrow-placement"})],X.prototype,"arrowPlacement",2);n([d({attribute:"arrow-padding",type:Number})],X.prototype,"arrowPadding",2);n([d({type:Boolean})],X.prototype,"flip",2);n([d({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],X.prototype,"flipFallbackPlacements",2);n([d({attribute:"flip-fallback-strategy"})],X.prototype,"flipFallbackStrategy",2);n([d({type:Object})],X.prototype,"flipBoundary",2);n([d({attribute:"flip-padding",type:Number})],X.prototype,"flipPadding",2);n([d({type:Boolean})],X.prototype,"shift",2);n([d({type:Object})],X.prototype,"shiftBoundary",2);n([d({attribute:"shift-padding",type:Number})],X.prototype,"shiftPadding",2);n([d({attribute:"auto-size"})],X.prototype,"autoSize",2);n([d()],X.prototype,"sync",2);n([d({type:Object})],X.prototype,"autoSizeBoundary",2);n([d({attribute:"auto-size-padding",type:Number})],X.prototype,"autoSizePadding",2);n([d({attribute:"hover-bridge",type:Boolean})],X.prototype,"hoverBridge",2);X=n([v("wa-popup")],X);var wb=C`
  :host {
    --divider-width: 0.125rem;
    --handle-size: 2.5rem;

    display: block;
    position: relative;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  .before,
  .after {
    display: block;

    &::slotted(img),
    &::slotted(svg) {
      display: block;
      max-width: 100% !important;
      height: auto;
    }

    &::slotted(:not(img, svg)) {
      isolation: isolate;
    }
  }

  .after {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  /* Disable pointer-events while dragging. This is especially important for iframes. */
  :host(:state(dragging)) {
    .before,
    .after {
      pointer-events: none;
    }
  }

  .divider {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: var(--divider-width);
    height: 100%;
    background-color: var(--wa-color-surface-default);
    translate: calc(var(--divider-width) / -2);
    cursor: ew-resize;
  }

  .handle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: calc(50% - (var(--handle-size) / 2));
    width: var(--handle-size);
    height: var(--handle-size);
    background-color: var(--wa-color-surface-default);
    border-radius: var(--wa-border-radius-circle);
    font-size: calc(var(--handle-size) * 0.4);
    color: var(--wa-color-neutral-on-quiet);
    cursor: inherit;
    z-index: 10;
  }

  .handle:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }
`;var br=class extends z{constructor(){super(...arguments),this.localize=new W(this),this.position=50}handleDrag(t){const{width:e}=this.getBoundingClientRect(),i=this.localize.dir()==="rtl";t.preventDefault(),Yr(this,{onMove:r=>{this.customStates.set("dragging",!0),this.position=parseFloat(N(r/e*100,0,100).toFixed(2)),i&&(this.position=100-this.position)},onStop:()=>{this.customStates.set("dragging",!1)},initialEvent:t})}handleKeyDown(t){const e=this.matches(":dir(ltr)"),i=this.localize.dir()==="rtl";if(["ArrowLeft","ArrowRight","Home","End"].includes(t.key)){const r=t.shiftKey?10:1;let o=this.position;t.preventDefault(),(e&&t.key==="ArrowLeft"||i&&t.key==="ArrowRight")&&(o-=r),(e&&t.key==="ArrowRight"||i&&t.key==="ArrowLeft")&&(o+=r),t.key==="Home"&&(o=0),t.key==="End"&&(o=100),o=N(o,0,100),this.position=o}}handlePositionChange(){this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}render(){const t=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return p`
      <div id="comparison" class="image" part="base">
        <div part="before" class="before">
          <slot name="before"></slot>
        </div>

        <div
          part="after"
          class="after"
          style=${rt({clipPath:t?`inset(0 0 0 ${100-this.position}%)`:`inset(0 ${100-this.position}% 0 0)`})}
        >
          <slot name="after"></slot>
        </div>
      </div>

      <div
        part="divider"
        class="divider"
        style=${rt({left:t?`${100-this.position}%`:`${this.position}%`})}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <div
          part="handle"
          class="handle"
          role="scrollbar"
          aria-valuenow=${this.position}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-controls="comparison"
          tabindex="0"
        >
          <slot name="handle">
            <wa-icon library="system" name="grip-vertical" variant="solid"></wa-icon>
          </slot>
        </div>
      </div>
    `}};br.css=wb;n([x(".handle")],br.prototype,"handle",2);n([d({type:Number,reflect:!0})],br.prototype,"position",2);n([k("position",{waitUntilFirstUpdate:!0})],br.prototype,"handlePositionChange",1);br=n([v("wa-comparison")],br);var vb=class extends Event{constructor(t){super("wa-copy",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var yb=C`
  :host {
    display: inline-block;
    color: var(--wa-color-neutral-on-quiet);
  }

  .button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    border-radius: var(--wa-form-control-border-radius);
    color: inherit;
    font-size: inherit;
    padding: 0.5em;
    cursor: pointer;
    transition: color var(--wa-transition-fast) var(--wa-transition-easing);
  }

  @media (hover: hover) {
    .button:hover:not([disabled]) {
      background-color: var(--wa-color-neutral-fill-quiet);
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
    }
  }

  .button:focus-visible:not([disabled]) {
    background-color: var(--wa-color-neutral-fill-quiet);
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
  }

  .button:active:not([disabled]) {
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
  }

  slot[name='success-icon'] {
    color: var(--wa-color-success-on-quiet);
  }

  slot[name='error-icon'] {
    color: var(--wa-color-danger-on-quiet);
  }

  .button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  .button[disabled] {
    opacity: 0.5;
    cursor: not-allowed !important;
  }

  slot {
    display: inline-flex;
  }

  .show {
    animation: show 100ms ease;
  }

  .hide {
    animation: show 100ms ease reverse;
  }

  @keyframes show {
    from {
      scale: 0.25;
      opacity: 0.25;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }
`;var xt=class extends z{constructor(){super(...arguments),this.localize=new W(this),this.isCopying=!1,this.status="rest",this.value="",this.from="",this.disabled=!1,this.copyLabel="",this.successLabel="",this.errorLabel="",this.feedbackDuration=1e3,this.tooltipPlacement="top"}get currentLabel(){return this.status==="success"?this.successLabel||this.localize.term("copied"):this.status==="error"?this.errorLabel||this.localize.term("error"):this.copyLabel||this.localize.term("copy")}async handleCopy(){if(this.disabled||this.isCopying)return;this.isCopying=!0;let t=this.value;if(this.from){const e=this.getRootNode(),i=this.from.includes("."),r=this.from.includes("[")&&this.from.includes("]");let o=this.from,s="";i?[o,s]=this.from.trim().split("."):r&&([o,s]=this.from.trim().replace(/\]$/,"").split("["));const a="getElementById"in e?e.getElementById(o):null;a?r?t=a.getAttribute(s)||"":i?t=a[s]||"":t=a.textContent||"":(this.showStatus("error"),this.dispatchEvent(new or))}if(!t)this.showStatus("error"),this.dispatchEvent(new or);else try{await navigator.clipboard.writeText(t),this.showStatus("success"),this.dispatchEvent(new vb({value:t}))}catch{this.showStatus("error"),this.dispatchEvent(new or)}}async showStatus(t){const e=t==="success"?this.successIcon:this.errorIcon;await tt(this.copyIcon,"hide"),this.copyIcon.hidden=!0,this.status=t,e.hidden=!1,await tt(e,"show"),setTimeout(async()=>{await tt(e,"hide"),e.hidden=!0,this.status="rest",this.copyIcon.hidden=!1,await tt(this.copyIcon,"show"),this.isCopying=!1},this.feedbackDuration)}render(){return p`
      <button
        class="button"
        part="button"
        type="button"
        id="copy-button"
        ?disabled=${this.disabled}
        @click=${this.handleCopy}
      >
        <!-- Render a visually hidden label to appease the accessibility checking gods -->
        <span class="wa-visually-hidden">${this.currentLabel}</span>
        <slot part="copy-icon" name="copy-icon">
          <wa-icon library="system" name="copy" variant="regular"></wa-icon>
        </slot>
        <slot part="success-icon" name="success-icon" variant="solid" hidden>
          <wa-icon library="system" name="check"></wa-icon>
        </slot>
        <slot part="error-icon" name="error-icon" variant="solid" hidden>
          <wa-icon library="system" name="xmark"></wa-icon>
        </slot>
        <wa-tooltip
          class=${D({"copy-button":!0,"copy-button-success":this.status==="success","copy-button-error":this.status==="error"})}
          for="copy-button"
          placement=${this.tooltipPlacement}
          ?disabled=${this.disabled}
          exportparts="
            base:tooltip__base,
            base__popup:tooltip__base__popup,
            base__arrow:tooltip__base__arrow,
            body:tooltip__body
          "
          >${this.currentLabel}</wa-tooltip
        >
      </button>
    `}};xt.css=[Oc,yb];n([x('slot[name="copy-icon"]')],xt.prototype,"copyIcon",2);n([x('slot[name="success-icon"]')],xt.prototype,"successIcon",2);n([x('slot[name="error-icon"]')],xt.prototype,"errorIcon",2);n([x("wa-tooltip")],xt.prototype,"tooltip",2);n([w()],xt.prototype,"isCopying",2);n([w()],xt.prototype,"status",2);n([d()],xt.prototype,"value",2);n([d()],xt.prototype,"from",2);n([d({type:Boolean,reflect:!0})],xt.prototype,"disabled",2);n([d({attribute:"copy-label"})],xt.prototype,"copyLabel",2);n([d({attribute:"success-label"})],xt.prototype,"successLabel",2);n([d({attribute:"error-label"})],xt.prototype,"errorLabel",2);n([d({attribute:"feedback-duration",type:Number})],xt.prototype,"feedbackDuration",2);n([d({attribute:"tooltip-placement"})],xt.prototype,"tooltipPlacement",2);xt=n([v("wa-copy-button")],xt);var xb=C`
  :host {
    --max-width: 30ch;

    /** These styles are added so we don't interfere in the DOM. */
    display: inline-block;
    position: absolute;

    /** Defaults for inherited CSS properties */
    color: var(--wa-tooltip-content-color);
    font-size: var(--wa-tooltip-font-size);
    line-height: var(--wa-tooltip-line-height);
    text-align: start;
    white-space: normal;
  }

  .tooltip {
    --arrow-size: var(--wa-tooltip-arrow-size);
    --arrow-color: var(--wa-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: 1000;
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--wa-tooltip-border-radius);
    background-color: var(--wa-tooltip-background-color);
    border: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    padding: 0.25em 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  .tooltip::part(arrow) {
    border-bottom: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    border-right: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
  }
`;var Ki=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};var Gi=class extends Event{constructor(t){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}};var Xi=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}};var Yi=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}};var at=class extends z{constructor(){super(...arguments),this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const t=!!this.anchor?.matches(":hover"),e=this.matches(":hover");if(t||e)return;clearTimeout(this.hoverTimeout),t||e||(this.hoverTimeout=window.setTimeout(()=>{this.hide()},this.hideDelay))}}}connectedCallback(){super.connectedCallback(),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.addEventListener("mouseout",this.handleMouseOut),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=xs("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}addToAriaLabelledBy(t,e){const r=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);r.includes(e)||(r.push(e),t.setAttribute("aria-labelledby",r.join(" ")))}removeFromAriaLabelledBy(t,e){const o=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(s=>s!==e);o.length>0?t.setAttribute("aria-labelledby",o.join(" ")):t.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;const t=new Ki;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),this.body.hidden=!1,this.popup.active=!0,await tt(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new Yi)}else{const t=new Gi;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),await tt(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new Xi)}}handleForChange(){const t=this.getRootNode();if(!t)return;const e=this.for?t.getElementById(this.for):null,i=this.anchor;if(e===i)return;const{signal:r}=this.eventController;e&&(this.addToAriaLabelledBy(e,this.id),e.addEventListener("blur",this.handleBlur,{capture:!0,signal:r}),e.addEventListener("focus",this.handleFocus,{capture:!0,signal:r}),e.addEventListener("click",this.handleClick,{signal:r}),e.addEventListener("mouseover",this.handleMouseOver,{signal:r}),e.addEventListener("mouseout",this.handleMouseOut,{signal:r})),i&&(this.removeFromAriaLabelledBy(i,this.id),i.removeEventListener("blur",this.handleBlur,{capture:!0}),i.removeEventListener("focus",this.handleFocus,{capture:!0}),i.removeEventListener("click",this.handleClick),i.removeEventListener("mouseover",this.handleMouseOver),i.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=e}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,ye(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,ye(this,"wa-after-hide")}render(){return p`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${D({tooltip:!0,"tooltip-open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        flip
        shift
        ?arrow=${!this.withoutArrow}
        hover-bridge
        .anchor=${this.anchor}
      >
        <div part="body" class="body">
          <slot></slot>
        </div>
      </wa-popup>
    `}};at.css=xb;at.dependencies={"wa-popup":X};n([x("slot:not([name])")],at.prototype,"defaultSlot",2);n([x(".body")],at.prototype,"body",2);n([x("wa-popup")],at.prototype,"popup",2);n([d()],at.prototype,"placement",2);n([d({type:Boolean,reflect:!0})],at.prototype,"disabled",2);n([d({type:Number})],at.prototype,"distance",2);n([d({type:Boolean,reflect:!0})],at.prototype,"open",2);n([d({type:Number})],at.prototype,"skidding",2);n([d({attribute:"show-delay",type:Number})],at.prototype,"showDelay",2);n([d({attribute:"hide-delay",type:Number})],at.prototype,"hideDelay",2);n([d()],at.prototype,"trigger",2);n([d({attribute:"without-arrow",type:Boolean,reflect:!0})],at.prototype,"withoutArrow",2);n([d()],at.prototype,"for",2);n([w()],at.prototype,"anchor",2);n([k("open",{waitUntilFirstUpdate:!0})],at.prototype,"handleOpenChange",1);n([k("for")],at.prototype,"handleForChange",1);n([k(["distance","placement","skidding"])],at.prototype,"handleOptionsChange",1);n([k("disabled")],at.prototype,"handleDisabledChange",1);at=n([v("wa-tooltip")],at);var kb=C`
  :host {
    --spacing: var(--wa-space-m);
    --show-duration: 200ms;
    --hide-duration: 200ms;

    display: block;
  }

  details {
    display: block;
    overflow-anchor: none;
    border: var(--wa-panel-border-width) var(--wa-color-surface-border) var(--wa-panel-border-style);
    background-color: var(--wa-color-surface-default);
    border-radius: var(--wa-panel-border-radius);
    color: var(--wa-color-text-normal);

    /* Print styles */
    @media print {
      background: none;
      border: solid var(--wa-border-width-s) var(--wa-color-surface-border);

      summary {
        list-style: none;
      }
    }
  }

  /* Appearance modifiers */
  :host([appearance='plain']) details {
    background-color: transparent;
    border-color: transparent;
    border-radius: 0;
  }

  :host([appearance='outlined']) details {
    background-color: var(--wa-color-surface-default);
    border-color: var(--wa-color-surface-border);
  }

  :host([appearance='filled']) details {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: transparent;
  }

  :host([appearance='filled-outlined']) details {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-border-quiet);
  }

  :host([disabled]) details {
    opacity: 0.5;
    cursor: not-allowed;
  }

  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing);
    padding: var(--spacing); /* Add padding here */
    border-radius: calc(var(--wa-panel-border-radius) - var(--wa-panel-border-width));
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;

    &::marker,
    &::-webkit-details-marker {
      display: none;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: calc(var(--wa-panel-border-width) + var(--wa-focus-ring-offset));
    }
  }

  :host([open]) summary {
    border-end-start-radius: 0;
    border-end-end-radius: 0;
  }

  /* 'Start' icon placement */
  :host([icon-placement='start']) summary {
    flex-direction: row-reverse;
    justify-content: start;
  }

  [part~='icon'] {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-text-quiet);
    transition: rotate var(--wa-transition-normal) var(--wa-transition-easing);
  }

  :host([open]) [part~='icon'] {
    rotate: 90deg;
  }

  :host([open]:dir(rtl)) [part~='icon'] {
    rotate: -90deg;
  }

  :host([open]) slot[name='expand-icon'],
  :host(:not([open])) slot[name='collapse-icon'] {
    display: none;
  }

  .body.animating {
    overflow: hidden;
  }

  .content {
    display: block;
    padding-block-start: var(--spacing);
    padding-inline: var(--spacing); /* Add horizontal padding */
    padding-block-end: var(--spacing); /* Add bottom padding */
  }
`;var Pt=class extends z{constructor(){super(...arguments),this.localize=new W(this),this.isAnimating=!1,this.open=!1,this.disabled=!1,this.appearance="outlined",this.iconPlacement="end"}disconnectedCallback(){super.disconnectedCallback(),this.detailsObserver?.disconnect()}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(t=>{for(const e of t)e.type==="attributes"&&e.attributeName==="open"&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}updated(t){t.has("isAnimating")&&this.customStates.set("animating",this.isAnimating)}handleSummaryClick(t){t.composedPath().some(r=>{if(!(r instanceof HTMLElement))return!1;const o=r.tagName?.toLowerCase();return["a","button","input","textarea","select"].includes(o)?!0:r instanceof J?!("disabled"in r)||!r.disabled:!1})||(t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus()))}handleSummaryKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.open?this.hide():this.show()),(t.key==="ArrowUp"||t.key==="ArrowLeft")&&(t.preventDefault(),this.hide()),(t.key==="ArrowDown"||t.key==="ArrowRight")&&(t.preventDefault(),this.show())}closeOthersWithSameName(){if(!this.name)return;this.getRootNode().querySelectorAll(`wa-details[name="${this.name}"]`).forEach(i=>{i!==this&&i.open&&(i.open=!1)})}async handleOpenChange(){if(this.open){this.details.open=!0;const t=new Ki;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1,this.details.open=!1;return}this.closeOthersWithSameName(),this.isAnimating=!0;const e=ts(getComputedStyle(this.body).getPropertyValue("--show-duration"));await Jo(this.body,[{height:"0",opacity:"0"},{height:`${this.body.scrollHeight}px`,opacity:"1"}],{duration:e,easing:"linear"}),this.body.style.height="auto",this.isAnimating=!1,this.dispatchEvent(new Yi)}else{const t=new Gi;if(this.dispatchEvent(t),t.defaultPrevented){this.details.open=!0,this.open=!0;return}this.isAnimating=!0;const e=ts(getComputedStyle(this.body).getPropertyValue("--hide-duration"));await Jo(this.body,[{height:`${this.body.scrollHeight}px`,opacity:"1"},{height:"0",opacity:"0"}],{duration:e,easing:"linear"}),this.body.style.height="auto",this.isAnimating=!1,this.details.open=!1,this.dispatchEvent(new Xi)}}async show(){if(!(this.open||this.disabled))return this.open=!0,ye(this,"wa-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=!1,ye(this,"wa-after-hide")}render(){const t=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return p`
      <details part="base">
        <summary
          part="header"
          role="button"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="content"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary">${this.summary}</slot>

          <span part="icon">
            <slot name="expand-icon">
              <wa-icon library="system" variant="solid" name=${t?"chevron-left":"chevron-right"}></wa-icon>
            </slot>
            <slot name="collapse-icon">
              <wa-icon library="system" variant="solid" name=${t?"chevron-left":"chevron-right"}></wa-icon>
            </slot>
          </span>
        </summary>

        <div
          class=${D({body:!0,animating:this.isAnimating})}
          role="region"
          aria-labelledby="header"
        >
          <slot part="content" id="content" class="content"></slot>
        </div>
      </details>
    `}};Pt.css=kb;n([x("details")],Pt.prototype,"details",2);n([x("summary")],Pt.prototype,"header",2);n([x(".body")],Pt.prototype,"body",2);n([x(".expand-icon-slot")],Pt.prototype,"expandIconSlot",2);n([w()],Pt.prototype,"isAnimating",2);n([d({type:Boolean,reflect:!0})],Pt.prototype,"open",2);n([d()],Pt.prototype,"summary",2);n([d({reflect:!0})],Pt.prototype,"name",2);n([d({type:Boolean,reflect:!0})],Pt.prototype,"disabled",2);n([d({reflect:!0})],Pt.prototype,"appearance",2);n([d({attribute:"icon-placement",reflect:!0})],Pt.prototype,"iconPlacement",2);n([k("open",{waitUntilFirstUpdate:!0})],Pt.prototype,"handleOpenChange",1);Pt=n([v("wa-details")],Pt);var Cb=C`
  :host {
    --width: 31rem;
    --spacing: var(--wa-space-l);
    --show-duration: 200ms;
    --hide-duration: 200ms;

    display: none;
  }

  :host([open]) {
    display: block;
  }

  .dialog {
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: var(--width);
    max-width: calc(100% - var(--wa-space-2xl));
    max-height: calc(100% - var(--wa-space-2xl));
    background-color: var(--wa-color-surface-raised);
    border-radius: var(--wa-panel-border-radius);
    border: none;
    box-shadow: var(--wa-shadow-l);
    padding: 0;
    margin: auto;

    &.show {
      animation: show-dialog var(--show-duration) ease;

      &::backdrop {
        animation: show-backdrop var(--show-duration, 200ms) ease;
      }
    }

    &.hide {
      animation: show-dialog var(--hide-duration) ease reverse;

      &::backdrop {
        animation: show-backdrop var(--hide-duration, 200ms) ease reverse;
      }
    }

    &.pulse {
      animation: pulse 250ms ease;
    }
  }

  .dialog:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog {
      max-height: 80vh;
    }
  }

  .open {
    display: flex;
    opacity: 1;
  }

  .header {
    flex: 0 0 auto;
    display: flex;
    flex-wrap: nowrap;

    padding-inline-start: var(--spacing);
    padding-block-end: 0;

    /* Subtract the close button's padding so that the X is visually aligned with the edges of the dialog content */
    padding-inline-end: calc(var(--spacing) - var(--wa-form-control-padding-block));
    padding-block-start: calc(var(--spacing) - var(--wa-form-control-padding-block));
  }

  .title {
    align-self: center;
    flex: 1 1 auto;
    font-family: inherit;
    font-size: var(--wa-font-size-l);
    font-weight: var(--wa-font-weight-heading);
    line-height: var(--wa-line-height-condensed);
    margin: 0;
  }

  .header-actions {
    align-self: start;
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--wa-space-2xs);
    padding-inline-start: var(--spacing);
  }

  .header-actions wa-button,
  .header-actions ::slotted(wa-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .body {
    flex: 1 1 auto;
    display: block;
    padding: var(--spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  .footer {
    flex: 0 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: var(--wa-space-xs);
    justify-content: end;
    padding: var(--spacing);
    padding-block-start: 0;
  }

  .footer ::slotted(wa-button:not(:first-of-type)) {
    margin-inline-start: var(--wa-spacing-xs);
  }

  .dialog::backdrop {
    /*
      NOTE: the ::backdrop element doesn't inherit properly in Safari yet, but it will in 17.4! At that time, we can
      remove the fallback values here.
    */
    background-color: var(--wa-color-overlay-modal, rgb(0 0 0 / 0.25));
  }

  @keyframes pulse {
    0% {
      scale: 1;
    }
    50% {
      scale: 1.02;
    }
    100% {
      scale: 1;
    }
  }

  @keyframes show-dialog {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes show-backdrop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (forced-colors: active) {
    .dialog {
      border: solid 1px white;
    }
  }
`;function $b(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}var La=new Set;function Sb(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Eb(){const t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t}function os(t){if(La.add(t),!document.documentElement.classList.contains("wa-scroll-lock")){const e=Sb()+Eb();let i=getComputedStyle(document.documentElement).scrollbarGutter;(!i||i==="auto")&&(i="stable"),e<2&&(i=""),document.documentElement.style.setProperty("--wa-scroll-lock-gutter",i),document.documentElement.classList.add("wa-scroll-lock"),document.documentElement.style.setProperty("--wa-scroll-lock-size",`${e}px`)}}function ss(t){La.delete(t),La.size===0&&(document.documentElement.classList.remove("wa-scroll-lock"),document.documentElement.style.removeProperty("--wa-scroll-lock-size"))}function _a(t,e,i="vertical",r="smooth"){const o=$b(t,e),s=o.top+e.scrollTop,a=o.left+e.scrollLeft,l=e.scrollLeft,c=e.scrollLeft+e.offsetWidth,h=e.scrollTop,u=e.scrollTop+e.offsetHeight;(i==="horizontal"||i==="both")&&(a<l?e.scrollTo({left:a,behavior:r}):a+t.clientWidth>c&&e.scrollTo({left:a-e.offsetWidth+t.clientWidth,behavior:r})),(i==="vertical"||i==="both")&&(s<h?e.scrollTo({top:s,behavior:r}):s+t.clientHeight>u&&e.scrollTo({top:s-e.offsetHeight+t.clientHeight,behavior:r}))}function Ls(t){return t.split(" ").map(e=>e.trim()).filter(e=>e!=="")}var Xe=class extends z{constructor(){super(...arguments),this.localize=new W(this),this.hasSlotController=new jt(this,"footer","header-actions","label"),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&(t.preventDefault(),t.stopPropagation(),this.requestClose(this.dialog))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.dialog.showModal(),os(this))}disconnectedCallback(){super.disconnectedCallback(),ss(this),this.removeOpenListeners()}async requestClose(t){const e=new Gi({source:t});if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0,tt(this.dialog,"pulse");return}this.removeOpenListeners(),await tt(this.dialog,"hide"),this.open=!1,this.dialog.close(),ss(this);const i=this.originalTrigger;typeof i?.focus=="function"&&setTimeout(()=>i.focus()),this.dispatchEvent(new Xi)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDialogCancel(t){t.preventDefault(),!this.dialog.classList.contains("hide")&&t.target===this.dialog&&this.requestClose(this.dialog)}handleDialogClick(t){const i=t.target.closest('[data-dialog="close"]');i&&(t.stopPropagation(),this.requestClose(i))}async handleDialogPointerDown(t){t.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await tt(this.dialog,"pulse"))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open&&(this.open=!0,this.requestClose(this.dialog))}async show(){const t=new Ki;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),os(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&typeof e.focus=="function"?e.focus():this.dialog.focus()}),await tt(this.dialog,"show"),this.dispatchEvent(new Yi)}render(){const t=!this.withoutHeader,e=this.hasSlotController.test("footer");return p`
      <dialog
        part="dialog"
        class=${D({dialog:!0,open:this.open})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${t?p`
              <header part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length>0?this.label:"​"} </slot>
                </h2>
                <div part="header-actions" class="header-actions">
                  <slot name="header-actions"></slot>
                  <wa-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="close"
                    appearance="plain"
                    @click="${i=>this.requestClose(i.target)}"
                  >
                    <wa-icon
                      name="xmark"
                      label=${this.localize.term("close")}
                      library="system"
                      variant="solid"
                    ></wa-icon>
                  </wa-button>
                </div>
              </header>
            `:""}

        <div part="body" class="body"><slot></slot></div>

        ${e?p`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:""}
      </dialog>
    `}};Xe.css=Cb;n([x(".dialog")],Xe.prototype,"dialog",2);n([d({type:Boolean,reflect:!0})],Xe.prototype,"open",2);n([d({reflect:!0})],Xe.prototype,"label",2);n([d({attribute:"without-header",type:Boolean,reflect:!0})],Xe.prototype,"withoutHeader",2);n([d({attribute:"light-dismiss",type:Boolean})],Xe.prototype,"lightDismiss",2);n([k("open",{waitUntilFirstUpdate:!0})],Xe.prototype,"handleOpenChange",1);Xe=n([v("wa-dialog")],Xe);document.addEventListener("click",t=>{const e=t.target.closest("[data-dialog]");if(e instanceof Element){const[i,r]=Ls(e.getAttribute("data-dialog")||"");if(i==="open"&&r?.length){const s=e.getRootNode().getElementById(r);s?.localName==="wa-dialog"?s.open=!0:console.warn(`A dialog with an ID of "${r}" could not be found in this document.`)}}});document.addEventListener("pointerdown",()=>{});var Ab=C`
  :host {
    --color: var(--wa-color-surface-border);
    --width: var(--wa-border-width-s);
    --spacing: var(--wa-space-m);
  }

  :host(:not([orientation='vertical'])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([orientation='vertical']) {
    display: inline-block;
    height: 100%;
    border-inline-start: solid var(--width) var(--color);
    margin: 0 var(--spacing);
    min-block-size: 1lh;
  }
`;var eo=class extends z{constructor(){super(...arguments),this.orientation="horizontal"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.orientation)}};eo.css=Ab;n([d({reflect:!0})],eo.prototype,"orientation",2);n([k("orientation")],eo.prototype,"handleVerticalChange",1);eo=n([v("wa-divider")],eo);var Lb=C`
  :host {
    --size: 25rem;
    --spacing: var(--wa-space-l);
    --show-duration: 200ms;
    --hide-duration: 200ms;

    display: none;
  }

  :host([open]) {
    display: block;
  }

  .drawer {
    display: flex;
    flex-direction: column;
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    background-color: var(--wa-color-surface-raised);
    border: none;
    box-shadow: var(--wa-shadow-l);
    overflow: auto;
    padding: 0;
    margin: 0;
    animation-duration: var(--show-duration);
    animation-timing-function: ease;

    &.show::backdrop {
      animation: show-backdrop var(--show-duration, 200ms) ease;
    }

    &.hide::backdrop {
      animation: show-backdrop var(--hide-duration, 200ms) ease reverse;
    }

    &.show.top {
      animation: show-drawer-from-top var(--show-duration) ease;
    }

    &.hide.top {
      animation: show-drawer-from-top var(--hide-duration) ease reverse;
    }

    &.show.end {
      animation: show-drawer-from-end var(--show-duration) ease;

      &:dir(rtl) {
        animation-name: show-drawer-from-start;
      }
    }

    &.hide.end {
      animation: show-drawer-from-end var(--hide-duration) ease reverse;

      &:dir(rtl) {
        animation-name: show-drawer-from-start;
      }
    }

    &.show.bottom {
      animation: show-drawer-from-bottom var(--show-duration) ease;
    }

    &.hide.bottom {
      animation: show-drawer-from-bottom var(--hide-duration) ease reverse;
    }

    &.show.start {
      animation: show-drawer-from-start var(--show-duration) ease;

      &:dir(rtl) {
        animation-name: show-drawer-from-end;
      }
    }

    &.hide.start {
      animation: show-drawer-from-start var(--hide-duration) ease reverse;

      &:dir(rtl) {
        animation-name: show-drawer-from-end;
      }
    }

    &.pulse {
      animation: pulse 250ms ease;
    }
  }

  .drawer:focus {
    outline: none;
  }

  .top {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .end {
    top: 0;
    inset-inline-end: 0;
    bottom: auto;
    inset-inline-start: auto;
    width: var(--size);
    height: 100%;
  }

  .bottom {
    top: auto;
    inset-inline-end: auto;
    bottom: 0;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .start {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: var(--size);
    height: 100%;
  }

  .header {
    display: flex;
    flex-wrap: nowrap;
    padding-inline-start: var(--spacing);
    padding-block-end: 0;

    /* Subtract the close button's padding so that the X is visually aligned with the edges of the dialog content */
    padding-inline-end: calc(var(--spacing) - var(--wa-form-control-padding-block));
    padding-block-start: calc(var(--spacing) - var(--wa-form-control-padding-block));
  }

  .title {
    align-self: center;
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--wa-font-size-l);
    font-weight: var(--wa-font-weight-heading);
    line-height: var(--wa-line-height-condensed);
    margin: 0;
  }

  .header-actions {
    align-self: start;
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--wa-space-2xs);
    padding-inline-start: var(--spacing);
  }

  .header-actions wa-button,
  .header-actions ::slotted(wa-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .body {
    flex: 1 1 auto;
    display: block;
    padding: var(--spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  .footer {
    display: flex;
    flex-wrap: wrap;
    gap: var(--wa-space-xs);
    justify-content: end;
    padding: var(--spacing);
    padding-block-start: 0;
  }

  .footer ::slotted(wa-button:not(:last-of-type)) {
    margin-inline-end: var(--wa-spacing-xs);
  }

  .drawer::backdrop {
    /*
        NOTE: the ::backdrop element doesn't inherit properly in Safari yet, but it will in 17.4! At that time, we can
        remove the fallback values here.
      */
    background-color: var(--wa-color-overlay-modal, rgb(0 0 0 / 0.25));
  }

  @keyframes pulse {
    0% {
      scale: 1;
    }
    50% {
      scale: 1.01;
    }
    100% {
      scale: 1;
    }
  }

  @keyframes show-drawer {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes show-drawer-from-top {
    from {
      opacity: 0;
      translate: 0 -100%;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-drawer-from-end {
    from {
      opacity: 0;
      translate: 100%;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-drawer-from-bottom {
    from {
      opacity: 0;
      translate: 0 100%;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-drawer-from-start {
    from {
      opacity: 0;
      translate: -100% 0;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-backdrop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (forced-colors: active) {
    .drawer {
      border: solid 1px white;
    }
  }
`;var Pe=class extends z{constructor(){super(...arguments),this.localize=new W(this),this.hasSlotController=new jt(this,"footer","header-actions","label"),this.open=!1,this.label="",this.placement="end",this.withoutHeader=!1,this.lightDismiss=!0,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&(t.preventDefault(),t.stopPropagation(),this.requestClose(this.drawer))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.drawer.showModal(),os(this))}disconnectedCallback(){super.disconnectedCallback(),ss(this),this.removeOpenListeners()}async requestClose(t){const e=new Gi({source:t});if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0,tt(this.drawer,"pulse");return}this.removeOpenListeners(),await tt(this.drawer,"hide"),this.open=!1,this.drawer.close(),ss(this);const i=this.originalTrigger;typeof i?.focus=="function"&&setTimeout(()=>i.focus()),this.dispatchEvent(new Xi)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDialogCancel(t){t.preventDefault(),!this.drawer.classList.contains("hide")&&t.target===this.drawer&&this.requestClose(this.drawer)}handleDialogClick(t){const i=t.target.closest('[data-drawer="close"]');i&&(t.stopPropagation(),this.requestClose(i))}async handleDialogPointerDown(t){t.target===this.drawer&&(this.lightDismiss?this.requestClose(this.drawer):await tt(this.drawer,"pulse"))}handleOpenChange(){this.open&&!this.drawer.open?this.show():this.drawer.open&&(this.open=!0,this.requestClose(this.drawer))}async show(){const t=new Ki;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.drawer.showModal(),os(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&typeof e.focus=="function"?e.focus():this.drawer.focus()}),await tt(this.drawer,"show"),this.dispatchEvent(new Yi)}render(){const t=!this.withoutHeader,e=this.hasSlotController.test("footer");return p`
      <dialog
        part="dialog"
        class=${D({drawer:!0,open:this.open,top:this.placement==="top",end:this.placement==="end",bottom:this.placement==="bottom",start:this.placement==="start"})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${t?p`
              <header part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length>0?this.label:"​"} </slot>
                </h2>
                <div part="header-actions" class="header-actions">
                  <slot name="header-actions"></slot>
                  <wa-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="close"
                    appearance="plain"
                    @click="${i=>this.requestClose(i.target)}"
                  >
                    <wa-icon
                      name="xmark"
                      label=${this.localize.term("close")}
                      library="system"
                      variant="solid"
                    ></wa-icon>
                  </wa-button>
                </div>
              </header>
            `:""}

        <div part="body" class="body"><slot></slot></div>

        ${e?p`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:""}
      </dialog>
    `}};Pe.css=Lb;n([x(".drawer")],Pe.prototype,"drawer",2);n([d({type:Boolean,reflect:!0})],Pe.prototype,"open",2);n([d({reflect:!0})],Pe.prototype,"label",2);n([d({reflect:!0})],Pe.prototype,"placement",2);n([d({attribute:"without-header",type:Boolean,reflect:!0})],Pe.prototype,"withoutHeader",2);n([d({attribute:"light-dismiss",type:Boolean})],Pe.prototype,"lightDismiss",2);n([k("open",{waitUntilFirstUpdate:!0})],Pe.prototype,"handleOpenChange",1);Pe=n([v("wa-drawer")],Pe);document.addEventListener("click",t=>{const e=t.target.closest("[data-drawer]");if(e instanceof Element){const[i,r]=Ls(e.getAttribute("data-drawer")||"");if(i==="open"&&r?.length){const s=e.getRootNode().getElementById(r);s?.localName==="wa-drawer"?s.open=!0:console.warn(`A drawer with an ID of "${r}" could not be found in this document.`)}}});document.body.addEventListener("pointerdown",()=>{});var _b=class extends Event{constructor(t){super("wa-select",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}};var Tb=C`
  :host {
    --show-duration: 50ms;
    --hide-duration: 50ms;
    display: contents;
  }

  #menu {
    display: flex;
    flex-direction: column;
    width: max-content;
    margin: 0;
    padding: 0.25em;
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    background-color: var(--wa-color-surface-raised);
    box-shadow: var(--wa-shadow-m);
    color: var(--wa-color-text-normal);
    text-align: start;
    user-select: none;
    overflow: auto;
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;

    &.show {
      animation: show var(--show-duration) ease;
    }

    &.hide {
      animation: show var(--hide-duration) ease reverse;
    }

    ::slotted(h1),
    ::slotted(h2),
    ::slotted(h3),
    ::slotted(h4),
    ::slotted(h5),
    ::slotted(h6) {
      display: block !important;
      margin: 0.25em 0 !important;
      padding: 0.25em 0.75em !important;
      color: var(--wa-color-text-quiet) !important;
      font-family: var(--wa-font-family-body) !important;
      font-weight: var(--wa-font-weight-semibold) !important;
      font-size: var(--wa-font-size-smaller) !important;
    }

    ::slotted(wa-divider) {
      --spacing: 0.25em; /* Component-specific, left as-is */
    }
  }

  wa-popup[data-current-placement^='top'] #menu {
    transform-origin: bottom;
  }

  wa-popup[data-current-placement^='bottom'] #menu {
    transform-origin: top;
  }

  wa-popup[data-current-placement^='left'] #menu {
    transform-origin: right;
  }

  wa-popup[data-current-placement^='right'] #menu {
    transform-origin: left;
  }

  wa-popup[data-current-placement='left-start'] #menu {
    transform-origin: right top;
  }

  wa-popup[data-current-placement='left-end'] #menu {
    transform-origin: right bottom;
  }

  wa-popup[data-current-placement='right-start'] #menu {
    transform-origin: left top;
  }

  wa-popup[data-current-placement='right-end'] #menu {
    transform-origin: left bottom;
  }

  @keyframes show {
    from {
      scale: 0.9;
      opacity: 0;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }
`;function*Jc(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*Jc(t.shadowRoot.activeElement)))}var Js=new Set,Bt=class extends z{constructor(){super(...arguments),this.submenuCleanups=new Map,this.localize=new W(this),this.userTypedQuery="",this.openSubmenuStack=[],this.open=!1,this.size="medium",this.placement="bottom-start",this.distance=0,this.skidding=0,this.handleDocumentKeyDown=async t=>{const e=this.localize.dir()==="rtl";if(t.key==="Escape"){const u=this.getTrigger();t.preventDefault(),t.stopPropagation(),this.open=!1,u?.focus();return}const i=[...Jc()].find(u=>u.localName==="wa-dropdown-item"),r=i?.localName==="wa-dropdown-item",o=this.getCurrentSubmenuItem(),s=!!o;let a,l,c;s?(a=this.getSubmenuItems(o),l=a.find(u=>u.active||u===i),c=l?a.indexOf(l):-1):(a=this.getItems(),l=a.find(u=>u.active||u===i),c=l?a.indexOf(l):-1);let h;if(t.key==="ArrowUp"&&(t.preventDefault(),t.stopPropagation(),c>0?h=a[c-1]:h=a[a.length-1]),t.key==="ArrowDown"&&(t.preventDefault(),t.stopPropagation(),c!==-1&&c<a.length-1?h=a[c+1]:h=a[0]),t.key===(e?"ArrowLeft":"ArrowRight")&&r&&l&&l.hasSubmenu){t.preventDefault(),t.stopPropagation(),l.submenuOpen=!0,this.addToSubmenuStack(l),setTimeout(()=>{const u=this.getSubmenuItems(l);u.length>0&&(u.forEach((f,m)=>f.active=m===0),u[0].focus())},0);return}if(t.key===(e?"ArrowRight":"ArrowLeft")&&s){t.preventDefault(),t.stopPropagation();const u=this.removeFromSubmenuStack();u&&(u.submenuOpen=!1,setTimeout(()=>{u.focus(),u.active=!0,(u.slot==="submenu"?this.getSubmenuItems(u.parentElement):this.getItems()).forEach(m=>{m!==u&&(m.active=!1)})},0));return}if((t.key==="Home"||t.key==="End")&&(t.preventDefault(),t.stopPropagation(),h=t.key==="Home"?a[0]:a[a.length-1]),t.key==="Tab"&&await this.hideMenu(),t.key.length===1&&!(t.metaKey||t.ctrlKey||t.altKey)&&!(t.key===" "&&this.userTypedQuery==="")&&(clearTimeout(this.userTypedTimeout),this.userTypedTimeout=setTimeout(()=>{this.userTypedQuery=""},1e3),this.userTypedQuery+=t.key,a.some(u=>{const f=(u.textContent||"").trim().toLowerCase(),m=this.userTypedQuery.trim().toLowerCase();return f.startsWith(m)?(h=u,!0):!1})),h){t.preventDefault(),t.stopPropagation(),a.forEach(u=>u.active=u===h),h.focus();return}(t.key==="Enter"||t.key===" "&&this.userTypedQuery==="")&&r&&l&&(t.preventDefault(),t.stopPropagation(),l.hasSubmenu?(l.submenuOpen=!0,this.addToSubmenuStack(l),setTimeout(()=>{const u=this.getSubmenuItems(l);u.length>0&&(u.forEach((f,m)=>f.active=m===0),u[0].focus())},0)):this.makeSelection(l))},this.handleDocumentPointerDown=t=>{t.composedPath().some(r=>r instanceof HTMLElement?r===this||r.closest('wa-dropdown, [part="submenu"]'):!1)||(this.open=!1)},this.handleGlobalMouseMove=t=>{const e=this.getCurrentSubmenuItem();if(!e?.submenuOpen||!e.submenuElement)return;const i=e.submenuElement.getBoundingClientRect(),r=this.localize.dir()==="rtl",o=r?i.right:i.left,s=r?Math.max(t.clientX,o):Math.min(t.clientX,o),a=Math.max(i.top,Math.min(t.clientY,i.bottom));e.submenuElement.style.setProperty("--safe-triangle-cursor-x",`${s}px`),e.submenuElement.style.setProperty("--safe-triangle-cursor-y",`${a}px`);const l=t.composedPath(),c=e.matches(":hover"),h=!!e.submenuElement?.matches(":hover"),u=c||!!l.find(m=>m===e),f=h||!!l.find(m=>m instanceof HTMLElement&&m.closest('[part="submenu"]')===e.submenuElement);!u&&!f&&setTimeout(()=>{!c&&!h&&(e.submenuOpen=!1)},100)}}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.userTypedTimeout),this.closeAllSubmenus(),this.submenuCleanups.forEach(t=>t()),this.submenuCleanups.clear(),document.removeEventListener("mousemove",this.handleGlobalMouseMove)}firstUpdated(){this.syncAriaAttributes()}async updated(t){if(t.has("open")){const e=t.get("open");if(e===this.open||e===void 0&&this.open===!1)return;this.customStates.set("open",this.open),this.open?await this.showMenu():(this.closeAllSubmenus(),await this.hideMenu())}t.has("size")&&this.syncItemSizes()}getItems(t=!1){const e=(this.defaultSlot?.assignedElements({flatten:!0})??[]).filter(i=>i.localName==="wa-dropdown-item");return t?e:e.filter(i=>!i.disabled)}getSubmenuItems(t,e=!1){const i=t.shadowRoot?.querySelector('slot[name="submenu"]')||t.querySelector('slot[name="submenu"]');if(!i)return[];const r=i.assignedElements({flatten:!0}).filter(o=>o.localName==="wa-dropdown-item");return e?r:r.filter(o=>!o.disabled)}syncItemSizes(){(this.defaultSlot?.assignedElements({flatten:!0})??[]).filter(e=>e.localName==="wa-dropdown-item").forEach(e=>e.size=this.size)}addToSubmenuStack(t){const e=this.openSubmenuStack.indexOf(t);e!==-1?this.openSubmenuStack=this.openSubmenuStack.slice(0,e+1):this.openSubmenuStack.push(t)}removeFromSubmenuStack(){return this.openSubmenuStack.pop()}getCurrentSubmenuItem(){return this.openSubmenuStack.length>0?this.openSubmenuStack[this.openSubmenuStack.length-1]:void 0}closeAllSubmenus(){this.getItems(!0).forEach(e=>{e.submenuOpen=!1}),this.openSubmenuStack=[]}closeSiblingSubmenus(t){const e=t.closest('wa-dropdown-item:not([slot="submenu"])');let i;e?i=this.getSubmenuItems(e,!0):i=this.getItems(!0),i.forEach(r=>{r!==t&&r.submenuOpen&&(r.submenuOpen=!1)}),this.openSubmenuStack.includes(t)||this.openSubmenuStack.push(t)}getTrigger(){return this.querySelector('[slot="trigger"]')}async showMenu(){if(!this.getTrigger()||!this.popup||!this.menu)return;const e=new Ki;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}if(this.popup.active)return;Js.forEach(r=>r.open=!1),this.popup.active=!0,this.open=!0,Js.add(this),this.syncAriaAttributes(),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("pointerdown",this.handleDocumentPointerDown),document.addEventListener("mousemove",this.handleGlobalMouseMove),this.menu.classList.remove("hide"),await tt(this.menu,"show");const i=this.getItems();i.length>0&&(i.forEach((r,o)=>r.active=o===0),i[0].focus()),this.dispatchEvent(new Yi)}async hideMenu(){if(!this.popup||!this.menu)return;const t=new Gi({source:this});if(this.dispatchEvent(t),t.defaultPrevented){this.open=!0;return}this.open=!1,Js.delete(this),this.syncAriaAttributes(),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("pointerdown",this.handleDocumentPointerDown),document.removeEventListener("mousemove",this.handleGlobalMouseMove),this.menu.classList.remove("show"),await tt(this.menu,"hide"),this.popup.active=this.open,this.dispatchEvent(new Xi)}handleMenuClick(t){const e=t.target.closest("wa-dropdown-item");if(!(!e||e.disabled)){if(e.hasSubmenu){e.submenuOpen||(this.closeSiblingSubmenus(e),this.addToSubmenuStack(e),e.submenuOpen=!0),t.stopPropagation();return}this.makeSelection(e)}}async handleMenuSlotChange(){const t=this.getItems(!0);await Promise.all(t.map(r=>r.updateComplete)),this.syncItemSizes();const e=t.some(r=>r.type==="checkbox"),i=t.some(r=>r.hasSubmenu);t.forEach((r,o)=>{r.active=o===0,r.checkboxAdjacent=e,r.submenuAdjacent=i})}handleTriggerClick(){this.open=!this.open}handleSubmenuOpening(t){const e=t.detail.item;this.closeSiblingSubmenus(e),this.addToSubmenuStack(e),this.setupSubmenuPosition(e),this.processSubmenuItems(e)}setupSubmenuPosition(t){if(!t.submenuElement)return;this.cleanupSubmenuPosition(t);const e=Gc(t,t.submenuElement,()=>{this.positionSubmenu(t),this.updateSafeTriangleCoordinates(t)});this.submenuCleanups.set(t,e);const i=t.submenuElement.querySelector('slot[name="submenu"]');i&&(i.removeEventListener("slotchange",Bt.handleSubmenuSlotChange),i.addEventListener("slotchange",Bt.handleSubmenuSlotChange),Bt.handleSubmenuSlotChange({target:i}))}static handleSubmenuSlotChange(t){const e=t.target;if(!e)return;const i=e.assignedElements().filter(s=>s.localName==="wa-dropdown-item");if(i.length===0)return;const r=i.some(s=>s.hasSubmenu),o=i.some(s=>s.type==="checkbox");i.forEach(s=>{s.submenuAdjacent=r,s.checkboxAdjacent=o})}processSubmenuItems(t){if(!t.submenuElement)return;const e=this.getSubmenuItems(t,!0),i=e.some(r=>r.hasSubmenu);e.forEach(r=>{r.submenuAdjacent=i})}cleanupSubmenuPosition(t){const e=this.submenuCleanups.get(t);e&&(e(),this.submenuCleanups.delete(t))}positionSubmenu(t){if(!t.submenuElement)return;const i=this.localize.dir()==="rtl"?"left-start":"right-start";Qc(t,t.submenuElement,{placement:i,middleware:[Xc({mainAxis:0,crossAxis:-5}),Zc({fallbackStrategy:"bestFit"}),Yc({padding:8})]}).then(({x:r,y:o,placement:s})=>{t.submenuElement.setAttribute("data-placement",s),Object.assign(t.submenuElement.style,{left:`${r}px`,top:`${o}px`})})}updateSafeTriangleCoordinates(t){if(!t.submenuElement||!t.submenuOpen)return;if(document.activeElement?.matches(":focus-visible")){t.submenuElement.style.setProperty("--safe-triangle-visible","none");return}t.submenuElement.style.setProperty("--safe-triangle-visible","block");const i=t.submenuElement.getBoundingClientRect(),r=this.localize.dir()==="rtl";t.submenuElement.style.setProperty("--safe-triangle-submenu-start-x",`${r?i.right:i.left}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-start-y",`${i.top}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-end-x",`${r?i.right:i.left}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-end-y",`${i.bottom}px`)}makeSelection(t){const e=this.getTrigger();if(t.disabled)return;t.type==="checkbox"&&(t.checked=!t.checked);const i=new _b({item:t});this.dispatchEvent(i),i.defaultPrevented||(this.open=!1,e?.focus())}async syncAriaAttributes(){const t=this.getTrigger();let e;t&&(t.localName==="wa-button"?(await customElements.whenDefined("wa-button"),await t.updateComplete,e=t.shadowRoot.querySelector('[part="base"]')):e=t,e.hasAttribute("id")||e.setAttribute("id",xs("wa-dropdown-trigger-")),e.setAttribute("aria-haspopup","menu"),e.setAttribute("aria-expanded",this.open?"true":"false"),this.menu?.setAttribute("aria-expanded","false"))}render(){let t=this.hasUpdated?this.popup?.active:this.open;return p`
      <wa-popup
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        ?active=${t}
        flip
        flip-fallback-strategy="best-fit"
        shift
        shift-padding="10"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot
          name="trigger"
          slot="anchor"
          @click=${this.handleTriggerClick}
          @slotchange=${this.syncAriaAttributes}
        ></slot>
        <div
          id="menu"
          part="menu"
          role="menu"
          tabindex="-1"
          aria-orientation="vertical"
          @click=${this.handleMenuClick}
          @submenu-opening=${this.handleSubmenuOpening}
        >
          <slot @slotchange=${this.handleMenuSlotChange}></slot>
        </div>
      </wa-popup>
    `}};Bt.css=[Tt,Tb];n([x("slot:not([name])")],Bt.prototype,"defaultSlot",2);n([x("#menu")],Bt.prototype,"menu",2);n([x("wa-popup")],Bt.prototype,"popup",2);n([d({type:Boolean,reflect:!0})],Bt.prototype,"open",2);n([d({reflect:!0})],Bt.prototype,"size",2);n([d({reflect:!0})],Bt.prototype,"placement",2);n([d({type:Number})],Bt.prototype,"distance",2);n([d({type:Number})],Bt.prototype,"skidding",2);Bt=n([v("wa-dropdown")],Bt);var zb=C`
  :host {
    display: flex;
    position: relative;
    align-items: center;
    padding: 0.5em 1em;
    border-radius: var(--wa-border-radius-s);
    isolation: isolate;
    color: var(--wa-color-text-normal);
    line-height: var(--wa-line-height-condensed);
    cursor: pointer;
    transition:
      var(--wa-transition-fast) background-color var(--wa-transition-easing),
      var(--wa-transition-fast) color var(--wa-transition-easing);
  }

  @media (hover: hover) {
    :host(:hover:not(:state(disabled))) {
      background-color: var(--wa-color-neutral-fill-normal);
    }
  }

  :host(:focus-visible) {
    z-index: 1;
    outline: var(--wa-focus-ring);
    background-color: var(--wa-color-neutral-fill-normal);
  }

  :host(:state(disabled)) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Danger variant */
  :host([variant='danger']),
  :host([variant='danger']) #details {
    color: var(--wa-color-danger-on-quiet);
  }

  @media (hover: hover) {
    :host([variant='danger']:hover) {
      background-color: var(--wa-color-danger-fill-normal);
      color: var(--wa-color-danger-on-normal);
    }
  }

  :host([variant='danger']:focus-visible) {
    background-color: var(--wa-color-danger-fill-normal);
    color: var(--wa-color-danger-on-normal);
  }

  :host([checkbox-adjacent]) {
    padding-inline-start: 2em;
  }

  /* Only add padding when item actually has a submenu */
  :host([submenu-adjacent]:not(:state(has-submenu))) #details {
    padding-inline-end: 0;
  }

  :host(:state(has-submenu)[submenu-adjacent]) #details {
    padding-inline-end: 1.75em;
  }

  #check {
    visibility: hidden;
    margin-inline-start: -1.5em;
    margin-inline-end: 0.5em;
    font-size: var(--wa-font-size-smaller);
  }

  :host(:state(checked)) #check {
    visibility: visible;
  }

  #icon ::slotted(*) {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    margin-inline-end: 0.75em !important;
    font-size: var(--wa-font-size-smaller);
  }

  #label {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #details {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: end;
    color: var(--wa-color-text-quiet);
    font-size: var(--wa-font-size-smaller) !important;
  }

  #details ::slotted(*) {
    margin-inline-start: 2em !important;
  }

  /* Submenu indicator icon */
  #submenu-indicator {
    position: absolute;
    inset-inline-end: 1em;
    color: var(--wa-color-neutral-on-quiet);
    font-size: var(--wa-font-size-smaller);
  }

  /* Flip chevron icon when RTL */
  :host(:dir(rtl)) #submenu-indicator {
    transform: scaleX(-1);
  }

  /* Submenu styles */
  #submenu {
    display: flex;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    flex-direction: column;
    width: max-content;
    margin: 0;
    padding: 0.25em;
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    background-color: var(--wa-color-surface-raised);
    box-shadow: var(--wa-shadow-m);
    color: var(--wa-color-text-normal);
    text-align: start;
    user-select: none;

    /* Override default popover styles */
    &[popover] {
      margin: 0;
      inset: auto;
      padding: 0.25em;
      overflow: visible;
      border-radius: var(--wa-border-radius-m);
    }

    &.show {
      animation: submenu-show var(--show-duration, 50ms) ease;
    }

    &.hide {
      animation: submenu-show var(--show-duration, 50ms) ease reverse;
    }

    /* Submenu placement transform origins */
    &[data-placement^='top'] {
      transform-origin: bottom;
    }

    &[data-placement^='bottom'] {
      transform-origin: top;
    }

    &[data-placement^='left'] {
      transform-origin: right;
    }

    &[data-placement^='right'] {
      transform-origin: left;
    }

    &[data-placement='left-start'] {
      transform-origin: right top;
    }

    &[data-placement='left-end'] {
      transform-origin: right bottom;
    }

    &[data-placement='right-start'] {
      transform-origin: left top;
    }

    &[data-placement='right-end'] {
      transform-origin: left bottom;
    }

    /* Safe triangle styling */
    &::before {
      display: none;
      z-index: 9;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: transparent;
      content: '';
      clip-path: polygon(
        var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
        var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
        var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
      );
      pointer-events: auto; /* Enable mouse events on the triangle */
    }

    &[data-visible]::before {
      display: block;
    }
  }

  ::slotted(wa-dropdown-item) {
    font-size: inherit;
  }

  ::slotted(wa-divider) {
    --spacing: 0.25em;
  }

  @keyframes submenu-show {
    from {
      scale: 0.9;
      opacity: 0;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }
`;var Mt=class extends z{constructor(){super(...arguments),this.hasSlotController=new jt(this,"[default]","start","end"),this.active=!1,this.variant="default",this.size="medium",this.checkboxAdjacent=!1,this.submenuAdjacent=!1,this.type="normal",this.checked=!1,this.disabled=!1,this.submenuOpen=!1,this.hasSubmenu=!1,this.handleSlotChange=()=>{this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState(),this.hasSubmenu?(this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",this.submenuOpen?"true":"false")):(this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"))}}connectedCallback(){super.connectedCallback(),this.addEventListener("mouseenter",this.handleMouseEnter.bind(this)),this.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}disconnectedCallback(){super.disconnectedCallback(),this.closeSubmenu(),this.removeEventListener("mouseenter",this.handleMouseEnter),this.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}firstUpdated(){this.setAttribute("tabindex","-1"),this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState()}updated(t){t.has("active")&&(this.setAttribute("tabindex",this.active?"0":"-1"),this.customStates.set("active",this.active)),t.has("checked")&&(this.setAttribute("aria-checked",this.checked?"true":"false"),this.customStates.set("checked",this.checked)),t.has("disabled")&&(this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.customStates.set("disabled",this.disabled)),t.has("type")&&(this.type==="checkbox"?this.setAttribute("role","menuitemcheckbox"):this.setAttribute("role","menuitem")),t.has("submenuOpen")&&(this.customStates.set("submenu-open",this.submenuOpen),this.submenuOpen?this.openSubmenu():this.closeSubmenu())}updateHasSubmenuState(){this.customStates.set("has-submenu",this.hasSubmenu)}async openSubmenu(){const t=this.submenuElement;!this.hasSubmenu||!t||!this.isConnected||(this.notifyParentOfOpening(),t.showPopover?.(),t.hidden=!1,t.setAttribute("data-visible",""),this.submenuOpen=!0,this.setAttribute("aria-expanded","true"),await tt(t,"show"),setTimeout(()=>{const e=this.getSubmenuItems();e.length>0&&(e.forEach((i,r)=>i.active=r===0),e[0].focus())},0))}notifyParentOfOpening(){const t=new CustomEvent("submenu-opening",{bubbles:!0,composed:!0,detail:{item:this}});this.dispatchEvent(t);const e=this.parentElement;e&&[...e.children].filter(r=>r!==this&&r.localName==="wa-dropdown-item"&&r.getAttribute("slot")===this.getAttribute("slot")&&r.submenuOpen).forEach(r=>{r.submenuOpen=!1})}async closeSubmenu(){const t=this.submenuElement;!this.hasSubmenu||!t||(this.submenuOpen=!1,this.setAttribute("aria-expanded","false"),t.hidden||(await tt(t,"hide"),t?.isConnected&&(t.hidden=!0,t.removeAttribute("data-visible"),t.hidePopover?.())))}getSubmenuItems(){return[...this.children].filter(t=>t.localName==="wa-dropdown-item"&&t.getAttribute("slot")==="submenu"&&!t.hasAttribute("disabled"))}handleMouseEnter(){this.hasSubmenu&&!this.disabled&&(this.notifyParentOfOpening(),this.submenuOpen=!0)}render(){return p`
      ${this.type==="checkbox"?p`
            <wa-icon
              id="check"
              part="checkmark"
              exportparts="svg:checkmark__svg"
              library="system"
              name="check"
            ></wa-icon>
          `:""}

      <span id="icon" part="icon">
        <slot name="icon"></slot>
      </span>

      <span id="label" part="label">
        <slot></slot>
      </span>

      <span id="details" part="details">
        <slot name="details"></slot>
      </span>

      ${this.hasSubmenu?p`
            <wa-icon
              id="submenu-indicator"
              part="submenu-icon"
              exportparts="svg:submenu-icon__svg"
              library="system"
              name="chevron-right"
            ></wa-icon>
          `:""}
      ${this.hasSubmenu?p`
            <div
              id="submenu"
              part="submenu"
              popover="manual"
              role="menu"
              tabindex="-1"
              aria-orientation="vertical"
              hidden
            >
              <slot name="submenu"></slot>
            </div>
          `:""}
    `}};Mt.css=zb;n([x("#submenu")],Mt.prototype,"submenuElement",2);n([d({type:Boolean})],Mt.prototype,"active",2);n([d({reflect:!0})],Mt.prototype,"variant",2);n([d({reflect:!0})],Mt.prototype,"size",2);n([d({attribute:"checkbox-adjacent",type:Boolean,reflect:!0})],Mt.prototype,"checkboxAdjacent",2);n([d({attribute:"submenu-adjacent",type:Boolean,reflect:!0})],Mt.prototype,"submenuAdjacent",2);n([d()],Mt.prototype,"value",2);n([d({reflect:!0})],Mt.prototype,"type",2);n([d({type:Boolean})],Mt.prototype,"checked",2);n([d({type:Boolean,reflect:!0})],Mt.prototype,"disabled",2);n([d({type:Boolean,reflect:!0})],Mt.prototype,"submenuOpen",2);n([w()],Mt.prototype,"hasSubmenu",2);Mt=n([v("wa-dropdown-item")],Mt);var io=class extends z{constructor(){super(...arguments),this.localize=new W(this),this.value=0,this.unit="byte",this.display="short"}static get styles(){return[]}render(){if(isNaN(this.value))return"";const t=["","kilo","mega","giga","tera"],e=["","kilo","mega","giga","tera","peta"],i=this.unit==="bit"?t:e,r=Math.max(0,Math.min(Math.floor(Math.log10(this.value)/3),i.length-1)),o=i[r]+this.unit,s=parseFloat((this.value/Math.pow(1e3,r)).toPrecision(3));return this.localize.number(s,{style:"unit",unit:o,unitDisplay:this.display})}};n([d({type:Number})],io.prototype,"value",2);n([d()],io.prototype,"unit",2);n([d()],io.prototype,"display",2);io=n([v("wa-format-bytes")],io);var Vt=class extends z{constructor(){super(...arguments),this.localize=new W(this),this.date=new Date,this.hourFormat="auto"}static get styles(){return[]}render(){const t=new Date(this.date),e=this.hourFormat==="auto"?void 0:this.hourFormat==="12";if(isNaN(t.getMilliseconds()))return;const i=this.localize.date(t,{weekday:this.weekday,era:this.era,year:this.year,month:this.month,day:this.day,hour:this.hour,minute:this.minute,second:this.second,timeZoneName:this.timeZoneName,timeZone:this.timeZone,hour12:e});return p`<time datetime=${t.toISOString()}>${i}</time>`}};n([d()],Vt.prototype,"date",2);n([d()],Vt.prototype,"weekday",2);n([d()],Vt.prototype,"era",2);n([d()],Vt.prototype,"year",2);n([d()],Vt.prototype,"month",2);n([d()],Vt.prototype,"day",2);n([d()],Vt.prototype,"hour",2);n([d()],Vt.prototype,"minute",2);n([d()],Vt.prototype,"second",2);n([d({attribute:"time-zone-name"})],Vt.prototype,"timeZoneName",2);n([d({attribute:"time-zone"})],Vt.prototype,"timeZone",2);n([d({attribute:"hour-format"})],Vt.prototype,"hourFormat",2);Vt=n([v("wa-format-date")],Vt);var ne=class extends z{constructor(){super(...arguments),this.localize=new W(this),this.value=0,this.type="decimal",this.withoutGrouping=!1,this.currency="USD",this.currencyDisplay="symbol"}static get styles(){return[]}render(){return isNaN(this.value)?"":this.localize.number(this.value,{style:this.type,currency:this.currency,currencyDisplay:this.currencyDisplay,useGrouping:!this.withoutGrouping,minimumIntegerDigits:this.minimumIntegerDigits,minimumFractionDigits:this.minimumFractionDigits,maximumFractionDigits:this.maximumFractionDigits,minimumSignificantDigits:this.minimumSignificantDigits,maximumSignificantDigits:this.maximumSignificantDigits})}};n([d({type:Number})],ne.prototype,"value",2);n([d()],ne.prototype,"type",2);n([d({attribute:"without-grouping",type:Boolean})],ne.prototype,"withoutGrouping",2);n([d()],ne.prototype,"currency",2);n([d({attribute:"currency-display"})],ne.prototype,"currencyDisplay",2);n([d({attribute:"minimum-integer-digits",type:Number})],ne.prototype,"minimumIntegerDigits",2);n([d({attribute:"minimum-fraction-digits",type:Number})],ne.prototype,"minimumFractionDigits",2);n([d({attribute:"maximum-fraction-digits",type:Number})],ne.prototype,"maximumFractionDigits",2);n([d({attribute:"minimum-significant-digits",type:Number})],ne.prototype,"minimumSignificantDigits",2);n([d({attribute:"maximum-significant-digits",type:Number})],ne.prototype,"maximumSignificantDigits",2);ne=n([v("wa-format-number")],ne);var Ll=class extends Event{constructor(t){super("wa-include-error",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Rb=C`
  :host {
    display: block;
  }
`;var ta=new Map;function Db(t,e="cors"){const i=ta.get(t);if(i!==void 0)return Promise.resolve(i);const r=fetch(t,{mode:e}).then(async o=>{const s={ok:o.ok,status:o.status,html:await o.text()};return ta.set(t,s),s});return ta.set(t,r),r}var Ui=class extends z{constructor(){super(...arguments),this.mode="cors",this.allowScripts=!1}executeScript(t){const e=document.createElement("script");[...t.attributes].forEach(i=>e.setAttribute(i.name,i.value)),e.textContent=t.textContent,t.parentNode.replaceChild(e,t)}async handleSrcChange(){try{const t=this.src,e=await Db(t,this.mode);if(t!==this.src)return;if(!e.ok){this.dispatchEvent(new Ll({status:e.status}));return}this.innerHTML=e.html,this.allowScripts&&[...this.querySelectorAll("script")].forEach(i=>this.executeScript(i)),this.dispatchEvent(new dn)}catch{this.dispatchEvent(new Ll({status:-1}))}}render(){return p`<slot></slot>`}};Ui.css=Rb;n([d()],Ui.prototype,"src",2);n([d()],Ui.prototype,"mode",2);n([d({attribute:"allow-scripts",type:Boolean})],Ui.prototype,"allowScripts",2);n([k("src")],Ui.prototype,"handleSrcChange",1);Ui=n([v("wa-include")],Ui);var Ob=class extends Event{constructor(t){super("wa-intersect",{bubbles:!1,cancelable:!1,composed:!0}),this.detail=t}};var Ib=C`
  :host {
    display: contents;
  }
`;var Ce=class extends z{constructor(){super(...arguments),this.intersectionObserver=null,this.observedElements=new Map,this.root=null,this.rootMargin="0px",this.threshold="0",this.intersectClass="",this.once=!1,this.disabled=!1}connectedCallback(){super.connectedCallback(),this.disabled||this.updateComplete.then(()=>{this.startObserver()})}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}handleSlotChange(){this.disabled||this.startObserver()}parseThreshold(){return Ls(this.threshold).map(e=>{const i=parseFloat(e);return isNaN(i)?0:N(i,0,1)})}resolveRoot(){if(!this.root)return null;try{const e=this.getRootNode().getElementById(this.root);return e||console.warn(`Root element with ID "${this.root}" could not be found.`,this),e}catch{return console.warn(`Invalid selector for root: "${this.root}"`,this),null}}startObserver(){if(this.stopObserver(),this.disabled)return;const t=this.parseThreshold(),e=this.resolveRoot();this.intersectionObserver=new IntersectionObserver(r=>{r.forEach(o=>{const s=this.observedElements.get(o.target)??!1,a=o.isIntersecting;this.observedElements.set(o.target,a),this.intersectClass&&(a?o.target.classList.add(this.intersectClass):o.target.classList.remove(this.intersectClass));const l=new Ob({entry:o});this.dispatchEvent(l),a&&!s&&this.once&&(this.intersectionObserver?.unobserve(o.target),this.observedElements.delete(o.target))})},{root:e,rootMargin:this.rootMargin,threshold:t});const i=this.shadowRoot.querySelector("slot");i!==null&&i.assignedElements({flatten:!0}).forEach(o=>{this.intersectionObserver?.observe(o),this.observedElements.set(o,!1)})}stopObserver(){this.intersectClass&&this.observedElements.forEach((t,e)=>{e.classList.remove(this.intersectClass)}),this.intersectionObserver?.disconnect(),this.intersectionObserver=null,this.observedElements.clear()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}handleOptionsChange(){this.startObserver()}render(){return p` <slot @slotchange=${this.handleSlotChange}></slot> `}};Ce.css=Ib;n([d()],Ce.prototype,"root",2);n([d({attribute:"root-margin"})],Ce.prototype,"rootMargin",2);n([d()],Ce.prototype,"threshold",2);n([d({attribute:"intersect-class"})],Ce.prototype,"intersectClass",2);n([d({type:Boolean,reflect:!0})],Ce.prototype,"once",2);n([d({type:Boolean,reflect:!0})],Ce.prototype,"disabled",2);n([k("disabled",{waitUntilFirstUpdate:!0})],Ce.prototype,"handleDisabledChange",1);n([k("root",{waitUntilFirstUpdate:!0}),k("rootMargin",{waitUntilFirstUpdate:!0}),k("threshold",{waitUntilFirstUpdate:!0})],Ce.prototype,"handleOptionsChange",1);Ce=n([v("wa-intersection-observer")],Ce);var Pb=class extends Event{constructor(t){super("wa-mutation",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Mb=C`
  :host {
    display: contents;
  }
`;var $e=class extends z{constructor(){super(...arguments),this.attrOldValue=!1,this.charData=!1,this.charDataOldValue=!1,this.childList=!1,this.disabled=!1,this.handleMutation=t=>{this.dispatchEvent(new Pb({mutationList:t}))}}connectedCallback(){super.connectedCallback(),typeof MutationObserver<"u"&&(this.mutationObserver=new MutationObserver(this.handleMutation),this.disabled||this.startObserver())}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}startObserver(){const t=typeof this.attr=="string"&&this.attr.length>0,e=t&&this.attr!=="*"?this.attr.split(" "):void 0;try{this.mutationObserver.observe(this,{subtree:!0,childList:this.childList,attributes:t,attributeFilter:e,attributeOldValue:this.attrOldValue,characterData:this.charData,characterDataOldValue:this.charDataOldValue})}catch{}}stopObserver(){this.mutationObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}handleChange(){this.stopObserver(),this.startObserver()}render(){return p` <slot></slot> `}};$e.css=Mb;n([d({reflect:!0})],$e.prototype,"attr",2);n([d({attribute:"attr-old-value",type:Boolean,reflect:!0})],$e.prototype,"attrOldValue",2);n([d({attribute:"char-data",type:Boolean,reflect:!0})],$e.prototype,"charData",2);n([d({attribute:"char-data-old-value",type:Boolean,reflect:!0})],$e.prototype,"charDataOldValue",2);n([d({attribute:"child-list",type:Boolean,reflect:!0})],$e.prototype,"childList",2);n([d({type:Boolean,reflect:!0})],$e.prototype,"disabled",2);n([k("disabled")],$e.prototype,"handleDisabledChange",1);n([k("attr",{waitUntilFirstUpdate:!0}),k("attr-old-value",{waitUntilFirstUpdate:!0}),k("char-data",{waitUntilFirstUpdate:!0}),k("char-data-old-value",{waitUntilFirstUpdate:!0}),k("childList",{waitUntilFirstUpdate:!0})],$e.prototype,"handleChange",1);$e=n([v("wa-mutation-observer")],$e);var Nb=C`
  .number-field {
    display: flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    height: var(--wa-form-control-height);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    cursor: text;
    color: var(--wa-form-control-value-color);
    font-size: inherit;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    vertical-align: middle;
    width: 100%;
    transition:
      background-color var(--wa-transition-normal),
      border var(--wa-transition-normal),
      outline var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    background-color: var(--wa-form-control-background-color);
    padding: 0;

    &:focus-within {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }

    /* Style disabled inputs */
    &:has(input:disabled) {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) {
    .number-field {
      background-color: var(--wa-form-control-background-color);
      border-color: var(--wa-form-control-border-color);
    }

    .stepper {
      color: var(--wa-color-neutral-on-quiet);

      @media (hover: hover) {
        &:hover:not(:disabled) {
          color: var(--wa-color-neutral-on-quiet);
          background-color: var(--wa-color-neutral-fill-quiet);
        }
      }

      &:active:not(:disabled) {
        color: color-mix(in oklab, var(--wa-color-neutral-on-quiet), var(--wa-color-mix-active));
        background-color: color-mix(in oklab, var(--wa-color-neutral-fill-quiet), var(--wa-color-mix-active));
      }
    }
  }

  :host([appearance='filled']) {
    .number-field {
      background-color: var(--wa-color-neutral-fill-quiet);
      border-color: var(--wa-color-neutral-fill-quiet);
    }

    .stepper {
      color: var(--wa-color-neutral-on-quiet);

      @media (hover: hover) {
        &:hover:not(:disabled) {
          color: var(--wa-color-neutral-on-normal);
          background-color: var(--wa-color-neutral-fill-normal);
        }
      }

      &:active:not(:disabled) {
        color: color-mix(in oklab, var(--wa-color-neutral-on-normal), var(--wa-color-mix-active));
        background-color: color-mix(in oklab, var(--wa-color-neutral-fill-normal), var(--wa-color-mix-active));
      }
    }
  }

  :host([appearance='filled-outlined']) {
    .number-field {
      background-color: var(--wa-color-neutral-fill-quiet);
      border-color: var(--wa-form-control-border-color);
    }

    .stepper {
      color: var(--wa-color-neutral-on-quiet);

      @media (hover: hover) {
        &:hover:not(:disabled) {
          color: var(--wa-color-neutral-on-normal);
          background-color: var(--wa-color-neutral-fill-normal);
        }
      }

      &:active:not(:disabled) {
        color: color-mix(in oklab, var(--wa-color-neutral-on-normal), var(--wa-color-mix-active));
        background-color: color-mix(in oklab, var(--wa-color-neutral-fill-normal), var(--wa-color-mix-active));
      }
    }
  }

  :host([pill]) {
    .number-field,
    .stepper {
      border-radius: var(--wa-border-radius-pill);
    }
  }

  .number-field {
    /* Show autofill styles over the entire number field, not just the native <input> */
    &:has(:autofill),
    &:has(:-webkit-autofill) {
      background-color: var(--wa-color-brand-fill-quiet) !important;
    }

    input {
      flex: auto;
      height: 100%;
      width: auto;
      min-width: 0;
      margin: 0;
      padding: 0 var(--wa-form-control-padding-inline);
      outline: none;
      box-shadow: none;
      border: none;
      background-color: transparent;
      font: inherit;
      transition: inherit;
      cursor: inherit;
      -webkit-appearance: none;

      /* Center-align and use tabular numbers for better alignment */
      text-align: center;
      font-variant-numeric: tabular-nums;

      /* Hide the number spinners in Firefox */
      -moz-appearance: textfield;

      /* Hide the number spinners in Chrome/Safari */
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
        display: none;
      }

      /* Turn off Safari's autofill styles */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-background-clip: text;
        background-color: transparent;
        -webkit-text-fill-color: inherit;
      }
    }

    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }

    &:focus {
      outline: none;
    }
  }

  .start,
  .end {
    display: inline-flex;
    flex: 1;
    align-items: center;
    cursor: default;

    &::slotted(wa-icon) {
      color: var(--wa-color-neutral-on-quiet);
    }
  }

  .start {
    justify-content: start;
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  .end {
    justify-content: end;
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  /*
   * Steppers - horizontal layout with minus on start, plus on end
   */

  .stepper {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1;
    height: calc(100% - var(--wa-form-control-border-width) * 2);
    flex: 0 0 auto;
    border: none;
    border-radius: calc(var(--wa-form-control-border-radius) - var(--wa-form-control-border-width) * 2);
    background: transparent;
    cursor: pointer;
    margin: var(--wa-form-control-border-width);
    padding: 0;
    font-size: inherit;
    transition-property: background-color, color;
    transition-duration: var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:focus {
      outline: none;
    }
  }

  :host([without-steppers]) .stepper {
    display: none;
  }
`;var Q=class extends J{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new jt(this,"hint","label"),this.localize=new W(this),this.title="",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="medium",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.placeholder="",this.readonly=!1,this.required=!1,this.step=1,this.withoutSteppers=!1,this.inputmode="numeric",this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,uo()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}get isAtMin(){if(this.min===void 0)return!1;const t=parseFloat(this.value||"");return!isNaN(t)&&t<=this.min}get isAtMax(){if(this.max===void 0)return!1;const t=parseFloat(this.value||"");return!isNaN(t)&&t>=this.max}handleChange(t){this.value=this.input.value,this.relayNativeEvent(t,{bubbles:!0,composed:!0})}handleInput(){this.value=this.input.value}handleKeyDown(t){fn(t,this),(t.key==="ArrowUp"||t.key==="ArrowDown")&&requestAnimationFrame(()=>{this.value!==this.input.value&&(this.value=this.input.value)})}handleStepperClick(t){this.disabled||this.readonly||(t==="up"?this.input.stepUp():this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.input.focus())}maintainFocusOnPointerDown(t){t.preventDefault(),this.input.focus()}updated(t){super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,i=this.label?!0:!!t,r=this.hint?!0:!!e;return p`
      <label
        part="form-control-label label"
        class=${D({label:!0,"has-label":i})}
        for="input"
        aria-hidden=${i?"false":"true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="number-field">
        ${this.withoutSteppers?"":p`
              <button
                part="stepper stepper-decrement"
                class="stepper stepper-decrement"
                type="button"
                tabindex="-1"
                aria-label=${this.localize.term("decrement")}
                ?disabled=${this.disabled||this.readonly||this.isAtMin}
                @pointerdown=${this.maintainFocusOnPointerDown}
                @click=${()=>this.handleStepperClick("down")}
              >
                <slot name="decrement-icon">
                  <wa-icon name="minus" library="system"></wa-icon>
                </slot>
              </button>
            `}

        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
          id="input"
          class="control"
          type="number"
          inputmode=${T(this.inputmode)}
          title=${this.title}
          name=${T(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${T(this.placeholder)}
          min=${T(this.min)}
          max=${T(this.max)}
          step=${T(this.step)}
          .value=${Fi(this.value??"")}
          autocomplete=${T(this.autocomplete)}
          ?autofocus=${this.autofocus}
          enterkeyhint=${T(this.enterkeyhint)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        <slot name="end" part="end" class="end"></slot>

        ${this.withoutSteppers?"":p`
              <button
                part="stepper stepper-increment"
                class="stepper stepper-increment"
                type="button"
                tabindex="-1"
                aria-label=${this.localize.term("increment")}
                ?disabled=${this.disabled||this.readonly||this.isAtMax}
                @pointerdown=${this.maintainFocusOnPointerDown}
                @click=${()=>this.handleStepperClick("up")}
              >
                <slot name="increment-icon">
                  <wa-icon name="plus" library="system"></wa-icon>
                </slot>
              </button>
            `}
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${D({"has-slotted":r})}
        aria-hidden=${r?"false":"true"}
        >${this.hint}</slot
      >
    `}};Q.css=[Tt,Ne,Nb];Q.shadowRootOptions={...J.shadowRootOptions,delegatesFocus:!0};n([x("input")],Q.prototype,"input",2);n([d()],Q.prototype,"title",2);n([w()],Q.prototype,"value",1);n([d({attribute:"value",reflect:!0})],Q.prototype,"defaultValue",2);n([d({reflect:!0})],Q.prototype,"size",2);n([d({reflect:!0})],Q.prototype,"appearance",2);n([d({type:Boolean,reflect:!0})],Q.prototype,"pill",2);n([d()],Q.prototype,"label",2);n([d({attribute:"hint"})],Q.prototype,"hint",2);n([d()],Q.prototype,"placeholder",2);n([d({type:Boolean,reflect:!0})],Q.prototype,"readonly",2);n([d({type:Boolean,reflect:!0})],Q.prototype,"required",2);n([d({type:Number})],Q.prototype,"min",2);n([d({type:Number})],Q.prototype,"max",2);n([d()],Q.prototype,"step",2);n([d({attribute:"without-steppers",type:Boolean})],Q.prototype,"withoutSteppers",2);n([d()],Q.prototype,"autocomplete",2);n([d({type:Boolean})],Q.prototype,"autofocus",2);n([d()],Q.prototype,"enterkeyhint",2);n([d()],Q.prototype,"inputmode",2);n([d({attribute:"with-label",type:Boolean})],Q.prototype,"withLabel",2);n([d({attribute:"with-hint",type:Boolean})],Q.prototype,"withHint",2);n([k("step",{waitUntilFirstUpdate:!0})],Q.prototype,"handleStepChange",1);Q=n([v("wa-number-input")],Q);var Fb=C`
  :host {
    display: block;
    color: var(--wa-color-text-normal);
    -webkit-user-select: none;
    user-select: none;

    position: relative;
    display: flex;
    align-items: center;
    font: inherit;
    padding: 0.5em 1em 0.5em 0.25em;
    line-height: var(--wa-line-height-condensed);
    transition: fill var(--wa-transition-normal) var(--wa-transition-easing);
    cursor: pointer;
  }

  :host(:focus) {
    outline: none;
  }

  @media (hover: hover) {
    :host(:not([disabled], :state(current)):is(:state(hover), :hover)) {
      background-color: var(--wa-color-neutral-fill-normal);
      color: var(--wa-color-neutral-on-normal);
    }
  }

  :host(:state(current)),
  :host([disabled]:state(current)) {
    background-color: var(--wa-color-brand-fill-loud);
    color: var(--wa-color-brand-on-loud);
    opacity: 1;
  }

  :host([disabled]) {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .label {
    flex: 1 1 auto;
    display: inline-block;
  }

  .check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--wa-font-size-smaller);
    visibility: hidden;
    width: 2em;
  }

  :host(:state(selected)) .check {
    visibility: visible;
  }

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .start::slotted(*) {
    margin-inline-end: 0.5em;
  }

  .end::slotted(*) {
    margin-inline-start: 0.5em;
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`;function Hr(t,e=0){if(!t||!globalThis.Node)return"";if(typeof t[Symbol.iterator]=="function")return(Array.isArray(t)?t:[...t]).map(o=>Hr(o,--e)).join("");let i=t;if(i.nodeType===Node.TEXT_NODE)return i.textContent??"";if(i.nodeType===Node.ELEMENT_NODE){let r=i;if(r.hasAttribute("slot")||r.matches("style, script"))return"";if(r instanceof HTMLSlotElement){let o=r.assignedNodes({flatten:!0});if(o.length>0)return Hr(o,--e)}return e>-1?Hr(r,--e):r.textContent??""}return i.hasChildNodes()?Hr(i.childNodes,--e):""}var Se=class extends z{constructor(){super(...arguments),this.localize=new W(this),this.isInitialized=!1,this.current=!1,this.value="",this.disabled=!1,this.selected=!1,this.defaultSelected=!1,this._label="",this.defaultLabel="",this.handleHover=t=>{t.type==="mouseenter"?this.customStates.set("hover",!0):t.type==="mouseleave"&&this.customStates.set("hover",!1)}}set label(t){const e=this._label;this._label=t||"",this._label!==e&&this.requestUpdate("label",e)}get label(){return this._label?this._label:(this.defaultLabel||this.updateDefaultLabel(),this.defaultLabel)}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false"),this.addEventListener("mouseenter",this.handleHover),this.addEventListener("mouseleave",this.handleHover),this.updateDefaultLabel()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mouseenter",this.handleHover),this.removeEventListener("mouseleave",this.handleHover)}handleDefaultSlotChange(){this.updateDefaultLabel(),this.isInitialized?(customElements.whenDefined("wa-select").then(()=>{const t=this.closest("wa-select");t&&(t.handleDefaultSlotChange(),t.selectionChanged?.())}),customElements.whenDefined("wa-combobox").then(()=>{const t=this.closest("wa-combobox");t&&(t.handleDefaultSlotChange(),t.selectionChanged?.())})):this.isInitialized=!0}willUpdate(t){if(t.has("defaultSelected")&&!this.closest("wa-combobox, wa-select")?.hasInteracted){const e=this.selected;this.selected=this.defaultSelected,this.requestUpdate("selected",e)}super.willUpdate(t)}updated(t){super.updated(t),t.has("disabled")&&this.setAttribute("aria-disabled",this.disabled?"true":"false"),t.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.customStates.set("selected",this.selected),this.handleDefaultSlotChange()),t.has("value")&&(typeof this.value!="string"&&(this.value=String(this.value)),this.handleDefaultSlotChange()),t.has("current")&&this.customStates.set("current",this.current)}updateDefaultLabel(){let t=this.defaultLabel;this.defaultLabel=Hr(this).trim();let e=this.defaultLabel!==t;return!this._label&&e&&this.requestUpdate("label",t),e}render(){return p`
      <wa-icon
        part="checked-icon"
        class="check"
        name="check"
        library="system"
        variant="solid"
        aria-hidden="true"
      ></wa-icon>
      <slot part="start" name="start" class="start"></slot>
      <slot part="label" class="label" @slotchange=${this.handleDefaultSlotChange}></slot>
      <slot part="end" name="end" class="end"></slot>
    `}};Se.css=Fb;n([x(".label")],Se.prototype,"defaultSlot",2);n([w()],Se.prototype,"current",2);n([d({reflect:!0})],Se.prototype,"value",2);n([d({type:Boolean})],Se.prototype,"disabled",2);n([d({type:Boolean,attribute:!1})],Se.prototype,"selected",2);n([d({type:Boolean,attribute:"selected"})],Se.prototype,"defaultSelected",2);n([d()],Se.prototype,"label",1);n([w()],Se.prototype,"defaultLabel",2);Se=n([v("wa-option")],Se);var Bb=C`
  :host {
    --arrow-size: 0.375rem;
    --max-width: 25rem;
    --show-duration: 100ms;
    --hide-duration: 100ms;

    /* Internal calculated properties */
    --arrow-diagonal-size: calc((var(--arrow-size) * sin(45deg)));

    display: contents;

    /** Defaults for inherited CSS properties */
    font-size: var(--wa-font-size-m);
    line-height: var(--wa-line-height-normal);
    text-align: start;
    white-space: normal;
  }

  /* The native dialog element */
  .dialog {
    display: none;
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    overflow: visible;
    pointer-events: none;

    &:focus {
      outline: none;
    }

    &[open] {
      display: block;
    }
  }

  /* The <wa-popup> element */
  .popover {
    --arrow-size: inherit;
    --show-duration: inherit;
    --hide-duration: inherit;

    pointer-events: auto;

    &::part(arrow) {
      background-color: var(--wa-color-surface-default);
      border-top: none;
      border-left: none;
      border-bottom: solid var(--wa-panel-border-width) var(--wa-color-surface-border);
      border-right: solid var(--wa-panel-border-width) var(--wa-color-surface-border);
      box-shadow: none;
    }
  }

  .popover[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .popover[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .popover[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .popover[placement^='right']::part(popup) {
    transform-origin: left;
  }

  /* Body */
  .body {
    display: flex;
    flex-direction: column;
    width: max-content;
    max-width: var(--max-width);
    padding: var(--wa-space-l);
    background-color: var(--wa-color-surface-default);
    border: var(--wa-panel-border-width) solid var(--wa-color-surface-border);
    border-radius: var(--wa-panel-border-radius);
    border-style: var(--wa-panel-border-style);
    box-shadow: var(--wa-shadow-l);
    color: var(--wa-color-text-normal);
    user-select: none;
    -webkit-user-select: none;
  }
`;var ea=new Set,kt=class extends z{constructor(){super(...arguments),this.anchor=null,this.placement="top",this.open=!1,this.distance=8,this.skidding=0,this.for=null,this.withoutArrow=!1,this.eventController=new AbortController,this.handleAnchorClick=()=>{this.open=!this.open},this.handleBodyClick=t=>{t.target.closest('[data-popover="close"]')&&(t.stopPropagation(),this.open=!1)},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&(t.preventDefault(),this.open=!1,this.anchor&&typeof this.anchor.focus=="function"&&this.anchor.focus())},this.handleDocumentClick=t=>{this.anchor&&t.composedPath().includes(this.anchor)||t.composedPath().includes(this)||(this.open=!1)}}connectedCallback(){super.connectedCallback(),this.id||(this.id=xs("wa-popover-")),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.for&&this.anchor&&(this.anchor=null,this.handleForChange())}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.eventController.abort()}firstUpdated(){this.open&&(this.dialog.show(),this.popup.active=!0,this.popup.reposition())}updated(t){t.has("open")&&this.customStates.set("open",this.open)}async handleOpenChange(){if(this.open){const t=new Ki;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}ea.forEach(e=>e.open=!1),document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),document.addEventListener("click",this.handleDocumentClick,{signal:this.eventController.signal}),this.dialog.show(),this.popup.active=!0,ea.add(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&typeof e.focus=="function"?e.focus():this.dialog.focus()}),await tt(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new Yi)}else{const t=new Gi;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!0;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("click",this.handleDocumentClick),ea.delete(this),await tt(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.dialog.close(),this.dispatchEvent(new Xi)}}handleForChange(){const t=this.getRootNode();if(!t)return;const e=this.for?t.getElementById(this.for):null,i=this.anchor;if(e===i)return;const{signal:r}=this.eventController;e&&e.addEventListener("click",this.handleAnchorClick,{signal:r}),i&&i.removeEventListener("click",this.handleAnchorClick),this.anchor=e,this.for&&!e&&console.warn(`A popover was assigned to an element with an ID of "${this.for}" but the element could not be found.`,this)}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}async show(){if(!this.open)return this.open=!0,ye(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,ye(this,"wa-after-hide")}render(){return p`
      <dialog part="dialog" class="dialog">
        <wa-popup
          part="popup"
          exportparts="
            popup:popup__popup,
            arrow:popup__arrow
          "
          class=${D({popover:!0,"popover-open":this.open})}
          placement=${this.placement}
          distance=${this.distance}
          skidding=${this.skidding}
          flip
          shift
          ?arrow=${!this.withoutArrow}
          .anchor=${this.anchor}
        >
          <div part="body" class="body" @click=${this.handleBodyClick}>
            <slot></slot>
          </div>
        </wa-popup>
      </dialog>
    `}};kt.css=Bb;kt.dependencies={"wa-popup":X};n([x("dialog")],kt.prototype,"dialog",2);n([x(".body")],kt.prototype,"body",2);n([x("wa-popup")],kt.prototype,"popup",2);n([w()],kt.prototype,"anchor",2);n([d()],kt.prototype,"placement",2);n([d({type:Boolean,reflect:!0})],kt.prototype,"open",2);n([d({type:Number})],kt.prototype,"distance",2);n([d({type:Number})],kt.prototype,"skidding",2);n([d()],kt.prototype,"for",2);n([d({attribute:"without-arrow",type:Boolean,reflect:!0})],kt.prototype,"withoutArrow",2);n([k("open",{waitUntilFirstUpdate:!0})],kt.prototype,"handleOpenChange",1);n([k("for")],kt.prototype,"handleForChange",1);n([k(["distance","placement","skidding"])],kt.prototype,"handleOptionsChange",1);kt=n([v("wa-popover")],kt);var Ub=C`
  :host {
    --track-height: 1rem;
    --track-color: var(--wa-color-neutral-fill-normal);
    --indicator-color: var(--wa-color-brand-fill-loud);

    display: flex;
  }

  .progress-bar {
    flex: 1 1 auto;
    display: flex;
    position: relative;
    overflow: hidden;
    height: var(--track-height);
    border-radius: var(--wa-border-radius-pill);
    background-color: var(--track-color);
    color: var(--wa-color-brand-on-loud);
    font-size: var(--wa-font-size-s);
  }

  .indicator {
    width: var(--percentage);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--indicator-color);
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    line-height: 1;
    font-weight: var(--wa-font-weight-semibold);
    transition: all var(--wa-transition-slow, 200ms) var(--wa-transition-easing, ease);
    user-select: none;
    -webkit-user-select: none;
  }

  /* Indeterminate */
  :host([indeterminate]) .indicator {
    position: absolute;
    inset-block: 0;
    inline-size: 50%;
    animation: wa-progress-indeterminate 2.5s infinite cubic-bezier(0.37, 0, 0.63, 1);
  }

  @media (forced-colors: active) {
    .progress-bar {
      outline: solid 1px SelectedItem;
      background-color: var(--wa-color-surface-default);
    }

    .indicator {
      outline: solid 1px SelectedItem;
      background-color: SelectedItem;
    }
  }

  @keyframes wa-progress-indeterminate {
    0% {
      inset-inline-start: -50%;
    }

    75%,
    100% {
      inset-inline-start: 100%;
    }
  }
`;var wr=class extends z{constructor(){super(...arguments),this.localize=new W(this),this.value=0,this.indeterminate=!1,this.label=""}updated(t){t.has("value")&&requestAnimationFrame(()=>{this.style.setProperty("--percentage",`${N(this.value,0,100)}%`)})}render(){return p`
      <div
        part="base"
        class="progress-bar"
        role="progressbar"
        title=${T(this.title)}
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate?"0":this.value}
      >
        <div part="indicator" class="indicator">
          ${this.indeterminate?"":p` <slot part="label" class="label"></slot> `}
        </div>
      </div>
    `}};wr.css=Ub;n([d({type:Number,reflect:!0})],wr.prototype,"value",2);n([d({type:Boolean,reflect:!0})],wr.prototype,"indeterminate",2);n([d()],wr.prototype,"label",2);wr=n([v("wa-progress-bar")],wr);var Vb=C`
  :host {
    --size: 8rem;
    --track-width: 0.25em; /* avoid using rems here */
    --track-color: var(--wa-color-neutral-fill-normal);
    --indicator-width: var(--track-width);
    --indicator-color: var(--wa-color-brand-fill-loud);
    --indicator-transition-duration: 0.35s;

    display: inline-flex;
  }

  .progress-ring {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .image {
    width: var(--size);
    height: var(--size);
    rotate: -90deg;
    transform-origin: 50% 50%;
  }

  .track,
  .indicator {
    --radius: calc(var(--size) / 2 - max(var(--track-width), var(--indicator-width)) * 0.5);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    fill: none;
    r: var(--radius);
    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
  }

  .track {
    stroke: var(--track-color);
    stroke-width: var(--track-width);
  }

  .indicator {
    stroke: var(--indicator-color);
    stroke-width: var(--indicator-width);
    stroke-linecap: round;
    transition-property: stroke-dashoffset;
    transition-duration: var(--indicator-transition-duration);
    stroke-dasharray: var(--circumference) var(--circumference);
    stroke-dashoffset: calc(var(--circumference) - var(--percentage) * var(--circumference));
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    user-select: none;
    -webkit-user-select: none;
  }
`;var Vi=class extends z{constructor(){super(...arguments),this.localize=new W(this),this.value=0,this.label=""}updated(t){if(super.updated(t),t.has("value")){const e=parseFloat(getComputedStyle(this.indicator).getPropertyValue("r")),i=2*Math.PI*e,r=i-this.value/100*i;this.indicatorOffset=`${r}px`}}render(){return p`
      <div
        part="base"
        class="progress-ring"
        role="progressbar"
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-describedby="label"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.value}"
        style=${rt({"--percentage":this.value/100})}
      >
        <svg class="image">
          <circle part="track" class="track"></circle>
          <circle
            part="indicator"
            class="indicator"
            style=${rt({"stroke-dashoffset":this.indicatorOffset})}
          ></circle>
        </svg>

        <slot id="label" part="label" class="label"></slot>
      </div>
    `}};Vi.css=Vb;n([x(".indicator")],Vi.prototype,"indicator",2);n([w()],Vi.prototype,"indicatorOffset",2);n([d({type:Number,reflect:!0})],Vi.prototype,"value",2);n([d()],Vi.prototype,"label",2);Vi=n([v("wa-progress-ring")],Vi);var qb=C`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
  }

  canvas {
    width: 100%;
    height: 100%;
    /* We force a near-instant transition so we can listen for transitionend when the color changes */
    transition: color 1ms;
  }
`,ia,re=class extends z{constructor(){super(...arguments),this.value="",this.label="",this.size=128,this.fill="",this.background="",this.radius=0,this.errorCorrection="H",this.generated=!1}firstUpdated(t){super.firstUpdated(t),this.hasUpdated&&this.generate()}generate(){if(!this.hasUpdated)return;if(!ia){Ot(()=>import("./qr-creator.es6.min-DtlEF1Ls.js"),[]).then(e=>{ia=e.default,this.generate()});return}this.canvas.style.maxWidth=`${this.size}px`,this.canvas.style.maxHeight=`${this.size}px`;const t=getComputedStyle(this);ia.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill||t.color,background:this.background||null,size:this.size*2},this.canvas),this.generated=!0}render(){return p`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${this.label?.length>0?this.label:this.value}
        @transitionend=${t=>{t.propertyName==="color"&&this.generate()}}
      ></canvas>
    `}};re.css=qb;n([x("canvas")],re.prototype,"canvas",2);n([d()],re.prototype,"value",2);n([d()],re.prototype,"label",2);n([d({type:Number})],re.prototype,"size",2);n([d()],re.prototype,"fill",2);n([d()],re.prototype,"background",2);n([d({type:Number})],re.prototype,"radius",2);n([d({attribute:"error-correction"})],re.prototype,"errorCorrection",2);n([w()],re.prototype,"generated",2);n([k(["background","errorCorrection","fill","radius","size","value"],{waitUntilFirstUpdate:!0})],re.prototype,"generate",1);re=n([v("wa-qr-code")],re);var Hb=C`
  :host {
    --checked-icon-color: var(--wa-form-control-activated-color);
    --checked-icon-scale: 0.7;

    color: var(--wa-form-control-value-color);
    display: inline-flex;
    flex-direction: row;
    align-items: top;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  :host(:not(:state(checked))) svg circle {
    opacity: 0;
  }

  [part~='label'] {
    display: inline;
  }

  [part~='hint'] {
    margin-block-start: 0.5em;
  }

  /* Default spacing for default appearance radios */
  :host([appearance='default']) {
    margin-block: 0.375em; /* Half of the original 0.75em gap on each side */
  }

  :host([appearance='default'][data-wa-radio-horizontal]) {
    margin-block: 0;
    margin-inline: 0.5em; /* Half of the original 1em gap on each side */
  }

  /* Remove margin from first/last items to prevent extra space */
  :host([appearance='default'][data-wa-radio-first]) {
    margin-block-start: 0;
    margin-inline-start: 0;
  }

  :host([appearance='default'][data-wa-radio-last]) {
    margin-block-end: 0;
    margin-inline-end: 0;
  }

  /* Button appearance have no spacing, they get handled by the overlap margins below */
  :host([appearance='button']) {
    margin: 0;
    align-items: center;
    min-height: var(--wa-form-control-height);
    background-color: var(--wa-color-surface-default);
    border: var(--wa-form-control-border-width) var(--wa-form-control-border-style) var(--wa-form-control-border-color);
    border-radius: var(--wa-border-radius-m);
    padding: 0 var(--wa-form-control-padding-inline);
    transition:
      background-color var(--wa-transition-fast),
      border-color var(--wa-transition-fast);
  }

  /* Default appearance */
  :host([appearance='default']) {
    .control {
      flex: 0 0 auto;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--wa-form-control-toggle-size);
      height: var(--wa-form-control-toggle-size);
      border-color: var(--wa-form-control-border-color);
      border-radius: 50%;
      border-style: var(--wa-form-control-border-style);
      border-width: var(--wa-form-control-border-width);
      background-color: var(--wa-form-control-background-color);
      color: transparent;
      transition:
        background var(--wa-transition-normal),
        border-color var(--wa-transition-fast),
        box-shadow var(--wa-transition-fast),
        color var(--wa-transition-fast);
      transition-timing-function: var(--wa-transition-easing);

      margin-inline-end: 0.5em;
    }

    .checked-icon {
      display: flex;
      fill: currentColor;
      width: var(--wa-form-control-toggle-size);
      height: var(--wa-form-control-toggle-size);
      scale: var(--checked-icon-scale);
    }
  }

  /* Button appearance */
  :host([appearance='button']) {
    .control {
      display: none;
    }
  }

  /* Checked */
  :host(:state(checked)) .control {
    color: var(--checked-icon-color);
    border-color: var(--wa-form-control-activated-color);
    background-color: var(--wa-form-control-background-color);
  }

  /* Focus */
  :host(:focus-visible) .control {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled */
  :host(:state(disabled)) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Horizontal grouping - remove inner border radius */
  :host([appearance='button'][data-wa-radio-horizontal][data-wa-radio-inner]) {
    border-radius: 0;
  }

  :host([appearance='button'][data-wa-radio-horizontal][data-wa-radio-first]) {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([appearance='button'][data-wa-radio-horizontal][data-wa-radio-last]) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* Vertical grouping - remove inner border radius */
  :host([appearance='button'][data-wa-radio-vertical][data-wa-radio-inner]) {
    border-radius: 0;
  }

  :host([appearance='button'][data-wa-radio-vertical][data-wa-radio-first]) {
    border-end-start-radius: 0;
    border-end-end-radius: 0;
  }

  :host([appearance='button'][data-wa-radio-vertical][data-wa-radio-last]) {
    border-start-start-radius: 0;
    border-start-end-radius: 0;
  }

  @media (hover: hover) {
    :host([appearance='button']:hover:not(:state(disabled), :state(checked))) {
      background-color: color-mix(in srgb, var(--wa-color-surface-default) 95%, var(--wa-color-mix-hover));
    }
  }

  :host([appearance='button']:focus-visible) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  :host([appearance='button']:state(checked)) {
    border-color: var(--wa-form-control-activated-color);
    background-color: var(--wa-color-brand-fill-quiet);
  }

  :host([appearance='button']:state(checked):focus-visible) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Button overlap margins */
  :host([appearance='button'][data-wa-radio-horizontal]:not([data-wa-radio-first])) {
    margin-inline-start: calc(-1 * var(--wa-form-control-border-width));
  }

  :host([appearance='button'][data-wa-radio-vertical]:not([data-wa-radio-first])) {
    margin-block-start: calc(-1 * var(--wa-form-control-border-width));
  }

  /* Ensure interactive states are visible above adjacent buttons */
  :host([appearance='button']:hover),
  :host([appearance='button']:state(checked)) {
    position: relative;
    z-index: 1;
  }

  :host([appearance='button']:focus-visible) {
    z-index: 2;
  }
`;var Ye=class extends J{constructor(){super(),this.checked=!1,this.forceDisabled=!1,this.appearance="default",this.disabled=!1,this.handleClick=()=>{!this.disabled&&!this.forceDisabled&&(this.checked=!0)},this.addEventListener("click",this.handleClick)}connectedCallback(){super.connectedCallback(),this.setInitialAttributes()}setInitialAttributes(){this.setAttribute("role","radio"),this.tabIndex=0,this.setAttribute("aria-disabled",this.disabled||this.forceDisabled?"true":"false")}updated(t){if(super.updated(t),t.has("checked")&&(this.customStates.set("checked",this.checked),this.setAttribute("aria-checked",this.checked?"true":"false"),!this.disabled&&!this.forceDisabled&&(this.tabIndex=this.checked?0:-1)),t.has("disabled")||t.has("forceDisabled")){const e=this.disabled||this.forceDisabled;this.customStates.set("disabled",e),this.setAttribute("aria-disabled",e?"true":"false"),e?this.tabIndex=-1:this.tabIndex=this.checked?0:-1}}setValue(){}render(){return p`
      <span part="control" class="control">
        ${this.checked?p`
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" part="checked-icon" class="checked-icon">
                <circle cx="8" cy="8" r="8" />
              </svg>
            `:""}
      </span>

      <slot part="label" class="label"></slot>
    `}};Ye.css=[Ne,Tt,Hb];n([w()],Ye.prototype,"checked",2);n([w()],Ye.prototype,"forceDisabled",2);n([d({reflect:!0})],Ye.prototype,"value",2);n([d({reflect:!0})],Ye.prototype,"appearance",2);n([d({reflect:!0})],Ye.prototype,"size",2);n([d({type:Boolean})],Ye.prototype,"disabled",2);Ye=n([v("wa-radio")],Ye);var Wb=C`
  :host {
    display: block;
  }

  .form-control {
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
  }

  .label {
    padding: 0;
  }

  .radio-group-required .label::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }

  [part~='form-control-input'] {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 0; /* Radios handle their own spacing */
  }

  /* Horizontal */
  :host([orientation='horizontal']) [part~='form-control-input'] {
    flex-direction: row;
  }

  /* Help text */
  [part~='hint'] {
    margin-block-start: 0.5em;
  }
`;var Lt=class extends J{constructor(){super(),this.hasSlotController=new jt(this,"hint","label"),this.label="",this.hint="",this.name=null,this.disabled=!1,this.orientation="vertical",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.required=!1,this.withLabel=!1,this.withHint=!1,this.handleRadioClick=t=>{const e=t.target.closest("wa-radio");if(!e||e.disabled||e.forceDisabled||this.disabled)return;const i=this.value;this.value=e.value,e.checked=!0;const r=this.getAllRadios();for(const o of r)e!==o&&(o.checked=!1,o.setAttribute("tabindex","-1"));this.value!==i&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})},this.addEventListener("keydown",this.handleKeyDown),this.addEventListener("click",this.handleRadioClick)}static get validators(){const t=[ks({validationElement:Object.assign(document.createElement("input"),{required:!0,type:"radio",name:xs("__wa-radio")})})];return[...super.validators,...t]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){typeof t=="number"&&(t=String(t)),this.valueHasChanged=!0,this._value=t}get validationTarget(){const t=this.querySelector(":is(wa-radio):not([disabled])");if(t)return t}updated(t){(t.has("disabled")||t.has("size")||t.has("value"))&&this.syncRadioElements()}formResetCallback(...t){this.value=this.defaultValue,super.formResetCallback(...t),this.syncRadioElements()}getAllRadios(){return[...this.querySelectorAll("wa-radio")]}handleLabelClick(){this.focus()}async syncRadioElements(){const t=this.getAllRadios();if(t.forEach((e,i)=>{this.size&&e.setAttribute("size",this.size),e.toggleAttribute("data-wa-radio-horizontal",this.orientation!=="vertical"),e.toggleAttribute("data-wa-radio-vertical",this.orientation==="vertical"),e.toggleAttribute("data-wa-radio-first",i===0),e.toggleAttribute("data-wa-radio-inner",i!==0&&i!==t.length-1),e.toggleAttribute("data-wa-radio-last",i===t.length-1),e.forceDisabled=this.disabled}),await Promise.all(t.map(async e=>{await e.updateComplete,!e.disabled&&e.value===this.value?e.checked=!0:e.checked=!1})),this.disabled)t.forEach(e=>{e.tabIndex=-1});else{const e=t.filter(r=>!r.disabled),i=e.find(r=>r.checked);e.length>0&&(i?e.forEach(r=>{r.tabIndex=r.checked?0:-1}):e.forEach((r,o)=>{r.tabIndex=o===0?0:-1})),t.filter(r=>r.disabled).forEach(r=>{r.tabIndex=-1})}}handleKeyDown(t){if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key)||this.disabled)return;const e=this.getAllRadios().filter(l=>!l.disabled);if(e.length<=0)return;t.preventDefault();const i=this.value,r=e.find(l=>l.checked)??e[0],o=t.key===" "?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1;let s=e.indexOf(r)+o;s||(s=0),s<0&&(s=e.length-1),s>e.length-1&&(s=0);const a=e.some(l=>l.tagName.toLowerCase()==="wa-radio-button");this.getAllRadios().forEach(l=>{l.checked=!1,a||l.setAttribute("tabindex","-1")}),this.value=e[s].value,e[s].checked=!0,a?e[s].shadowRoot.querySelector("button").focus():(e[s].setAttribute("tabindex","0"),e[s].focus()),this.value!==i&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),t.preventDefault()}focus(t){if(this.disabled)return;const e=this.getAllRadios(),i=e.find(s=>s.checked),r=e.find(s=>!s.disabled),o=i||r;o&&o.focus(t)}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,i=this.label?!0:!!t,r=this.hint?!0:!!e;return p`
      <fieldset
        part="form-control"
        class=${D({"form-control":!0,"form-control-radio-group":!0,"form-control-has-label":i})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="hint"
        aria-errormessage="error-message"
        aria-orientation=${this.orientation}
      >
        <label
          part="form-control-label"
          id="label"
          class=${D({label:!0,"has-label":i})}
          aria-hidden=${i?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <slot part="form-control-input" @slotchange=${this.syncRadioElements}></slot>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${D({"has-slotted":r})}
          aria-hidden=${r?"false":"true"}
          >${this.hint}</slot
        >
      </fieldset>
    `}};Lt.css=[Tt,Ne,Wb];Lt.shadowRootOptions={...J.shadowRootOptions,delegatesFocus:!0};n([x("slot:not([name])")],Lt.prototype,"defaultSlot",2);n([d()],Lt.prototype,"label",2);n([d({attribute:"hint"})],Lt.prototype,"hint",2);n([d({reflect:!0})],Lt.prototype,"name",2);n([d({type:Boolean,reflect:!0})],Lt.prototype,"disabled",2);n([d({reflect:!0})],Lt.prototype,"orientation",2);n([w()],Lt.prototype,"value",1);n([d({attribute:"value",reflect:!0})],Lt.prototype,"defaultValue",2);n([d({reflect:!0})],Lt.prototype,"size",2);n([d({type:Boolean,reflect:!0})],Lt.prototype,"required",2);n([d({type:Boolean,attribute:"with-label"})],Lt.prototype,"withLabel",2);n([d({type:Boolean,attribute:"with-hint"})],Lt.prototype,"withHint",2);Lt=n([v("wa-radio-group")],Lt);var _l=class extends Event{constructor(t){super("wa-hover",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var jb=C`
  :host {
    --symbol-color: var(--wa-color-neutral-on-quiet);
    --symbol-color-active: var(--wa-color-yellow-70);
    --symbol-spacing: 0.125em;

    display: inline-flex;
  }

  .rating {
    position: relative;
    display: inline-flex;
    border-radius: var(--wa-border-radius-m);
    vertical-align: middle;
  }

  .rating:focus {
    outline: none;
  }

  .rating:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  .symbols {
    display: inline-flex;
    gap: 0.125em;
    position: relative;
    line-height: 0;
    color: var(--symbol-color);
    white-space: nowrap;
    cursor: pointer;
  }

  .symbols > * {
    padding: var(--symbol-spacing);
  }

  .symbol-active,
  .partial-filled {
    color: var(--symbol-color-active);
  }

  .partial-symbol-container {
    position: relative;
  }

  .partial-filled {
    position: absolute;
    top: var(--symbol-spacing);
    left: var(--symbol-spacing);
  }

  .symbol {
    transition: scale var(--wa-transition-normal) var(--wa-transition-easing);
    pointer-events: none;
  }

  .symbol-hover {
    scale: 1.2;
  }

  .rating-readonly .symbols {
    cursor: default;
  }

  :host([disabled]) .symbol-hover,
  .rating-readonly .symbol-hover {
    scale: none;
  }

  :host([disabled]) {
    opacity: 0.5;
  }

  :host([disabled]) .symbols {
    cursor: not-allowed;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    .symbol-active {
      color: SelectedItem;
    }
  }
`;var Ct=class extends z{constructor(){super(...arguments),this.localize=new W(this),this.hoverValue=0,this.isHovering=!1,this.label="",this.value=0,this.max=5,this.precision=1,this.readonly=!1,this.disabled=!1,this.getSymbol=(t,e)=>e?'<wa-icon name="star" library="system" variant="solid"></wa-icon>':'<wa-icon name="star" library="system" variant="regular"></wa-icon>',this.size="medium"}getValueFromMousePosition(t){return this.getValueFromXCoordinate(t.clientX)}getValueFromTouchPosition(t){return this.getValueFromXCoordinate(t.touches[0].clientX)}getValueFromXCoordinate(t){const e=this.localize.dir()==="rtl",{left:i,right:r,width:o}=this.rating.getBoundingClientRect(),s=e?this.roundToPrecision((r-t)/o*this.max,this.precision):this.roundToPrecision((t-i)/o*this.max,this.precision);return N(s,0,this.max)}handleClick(t){this.disabled||(this.setValue(this.getValueFromMousePosition(t)),this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}setValue(t){this.disabled||this.readonly||(this.value=t===this.value?0:t,this.isHovering=!1)}handleKeyDown(t){const e=this.matches(":dir(ltr)"),i=this.localize.dir()==="rtl",r=this.value;if(!(this.disabled||this.readonly)){if(t.key==="ArrowDown"||e&&t.key==="ArrowLeft"||i&&t.key==="ArrowRight"){const o=t.shiftKey?1:this.precision;this.value=Math.max(0,this.value-o),t.preventDefault()}if(t.key==="ArrowUp"||e&&t.key==="ArrowRight"||i&&t.key==="ArrowLeft"){const o=t.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+o),t.preventDefault()}t.key==="Home"&&(this.value=0,t.preventDefault()),t.key==="End"&&(this.value=this.max,t.preventDefault()),this.value!==r&&this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}}handleMouseEnter(t){this.isHovering=!0,this.hoverValue=this.getValueFromMousePosition(t)}handleMouseMove(t){this.hoverValue=this.getValueFromMousePosition(t)}handleMouseLeave(){this.isHovering=!1}handleTouchStart(t){this.isHovering=!0,this.hoverValue=this.getValueFromTouchPosition(t),t.preventDefault()}handleTouchMove(t){this.hoverValue=this.getValueFromTouchPosition(t)}handleTouchEnd(t){this.isHovering=!1,this.setValue(this.hoverValue),this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),t.preventDefault()}roundToPrecision(t,e=.5){const i=1/e;return Math.ceil(t*i)/i}handleHoverValueChange(){this.dispatchEvent(new _l({phase:"move",value:this.hoverValue}))}handleIsHoveringChange(){this.dispatchEvent(new _l({phase:this.isHovering?"start":"end",value:this.hoverValue}))}focus(t){this.rating.focus(t)}blur(){this.rating.blur()}render(){const t=this.hasUpdated?this.localize.dir()==="rtl":this.dir,e=Array.from(Array(this.max).keys());let i=0;return this.disabled||this.readonly?i=this.value:i=this.isHovering?this.hoverValue:this.value,p`
      <div
        part="base"
        class=${D({rating:!0,"rating-readonly":this.readonly,"rating-disabled":this.disabled})}
        role="slider"
        aria-label=${this.label}
        aria-disabled=${this.disabled?"true":"false"}
        aria-readonly=${this.readonly?"true":"false"}
        aria-valuenow=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        tabindex=${this.disabled||this.readonly?"-1":"0"}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mouseenter=${this.handleMouseEnter}
        @touchstart=${this.handleTouchStart}
        @mouseleave=${this.handleMouseLeave}
        @touchend=${this.handleTouchEnd}
        @mousemove=${this.handleMouseMove}
        @touchmove=${this.handleTouchMove}
      >
        <span class="symbols">
          ${e.map(r=>{const o=i>=r+1;return i>r&&i<r+1?p`
                <span
                  class=${D({symbol:!0,"partial-symbol-container":!0,"symbol-hover":this.isHovering&&Math.ceil(i)===r+1})}
                  role="presentation"
                >
                  <div
                    style=${rt({clipPath:t?`inset(0 ${(i-r)*100}% 0 0)`:`inset(0 0 0 ${(i-r)*100}%)`})}
                  >
                    ${We(this.getSymbol(r+1,!1))}
                  </div>
                  <div
                    class="partial-filled"
                    style=${rt({clipPath:t?`inset(0 0 0 ${100-(i-r)*100}%)`:`inset(0 ${100-(i-r)*100}% 0 0)`})}
                  >
                    ${We(this.getSymbol(r+1,!0))}
                  </div>
                </span>
              `:p`
              <span
                class=${D({symbol:!0,"symbol-hover":this.isHovering&&Math.ceil(i)===r+1,"symbol-active":i>=r+1})}
                role="presentation"
              >
                ${We(this.getSymbol(r+1,o))}
              </span>
            `})}
        </span>
      </div>
    `}};Ct.css=[Tt,jb];n([x(".rating")],Ct.prototype,"rating",2);n([w()],Ct.prototype,"hoverValue",2);n([w()],Ct.prototype,"isHovering",2);n([d()],Ct.prototype,"label",2);n([d({type:Number})],Ct.prototype,"value",2);n([d({type:Number})],Ct.prototype,"max",2);n([d({type:Number})],Ct.prototype,"precision",2);n([d({type:Boolean,reflect:!0})],Ct.prototype,"readonly",2);n([d({type:Boolean,reflect:!0})],Ct.prototype,"disabled",2);n([d()],Ct.prototype,"getSymbol",2);n([d({reflect:!0})],Ct.prototype,"size",2);n([vs({passive:!0})],Ct.prototype,"handleTouchMove",1);n([k("hoverValue")],Ct.prototype,"handleHoverValueChange",1);n([k("isHovering")],Ct.prototype,"handleIsHoveringChange",1);Ct=n([v("wa-rating")],Ct);var Kb=[{max:276e4,value:6e4,unit:"minute"},{max:72e6,value:36e5,unit:"hour"},{max:5184e5,value:864e5,unit:"day"},{max:24192e5,value:6048e5,unit:"week"},{max:28512e6,value:2592e6,unit:"month"},{max:1/0,value:31536e6,unit:"year"}],bi=class extends z{constructor(){super(...arguments),this.localize=new W(this),this.isoTime="",this.relativeTime="",this.date=new Date,this.format="long",this.numeric="auto",this.sync=!1}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.updateTimeout)}render(){const t=new Date,e=new Date(this.date);if(isNaN(e.getMilliseconds()))return this.relativeTime="",this.isoTime="","";const i=e.getTime()-t.getTime(),{unit:r,value:o}=Kb.find(s=>Math.abs(i)<s.max);if(this.isoTime=e.toISOString(),this.relativeTime=this.localize.relativeTime(Math.round(i/o),r,{numeric:this.numeric,style:this.format}),clearTimeout(this.updateTimeout),this.sync){let s;r==="minute"?s=Ao("second"):r==="hour"?s=Ao("minute"):r==="day"?s=Ao("hour"):s=Ao("day"),this.updateTimeout=setTimeout(()=>this.requestUpdate(),s)}return p`<time datetime=${this.isoTime}>${this.relativeTime}</time>`}};n([w()],bi.prototype,"isoTime",2);n([w()],bi.prototype,"relativeTime",2);n([d()],bi.prototype,"date",2);n([d()],bi.prototype,"format",2);n([d()],bi.prototype,"numeric",2);n([d({type:Boolean})],bi.prototype,"sync",2);bi=n([v("wa-relative-time")],bi);function Ao(t){const i={second:1e3,minute:6e4,hour:36e5,day:864e5}[t];return i-Date.now()%i}var Gb=class extends Event{constructor(t){super("wa-resize",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Xb=C`
  :host {
    display: contents;
  }
`;var ro=class extends z{constructor(){super(...arguments),this.observedElements=[],this.disabled=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>{this.dispatchEvent(new Gb({entries:t}))}),this.disabled||this.updateComplete.then(()=>{this.startObserver()})}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}handleSlotChange(){this.disabled||this.startObserver()}startObserver(){const t=this.shadowRoot.querySelector("slot");if(t!==null){const e=t.assignedElements({flatten:!0});this.observedElements.forEach(i=>this.resizeObserver.unobserve(i)),this.observedElements=[],e.forEach(i=>{this.resizeObserver.observe(i),this.observedElements.push(i)})}}stopObserver(){this.resizeObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}render(){return p` <slot @slotchange=${this.handleSlotChange}></slot> `}};ro.css=Xb;n([d({type:Boolean,reflect:!0})],ro.prototype,"disabled",2);n([k("disabled",{waitUntilFirstUpdate:!0})],ro.prototype,"handleDisabledChange",1);ro=n([v("wa-resize-observer")],ro);var Yb=C`
  :host {
    --shadow-color: var(--wa-color-surface-default);
    --shadow-size: 2rem;

    /* private (defined dynamically) */
    --start-shadow-opacity: 0;
    --end-shadow-opacity: 0;

    display: block;
    position: relative;
    max-width: 100%;
    isolation: isolate;
  }

  :host([orientation='vertical']) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  #content {
    z-index: 1; /* below shadows */
    border-radius: inherit;
    scroll-behavior: smooth;
    scrollbar-width: thin;

    /* Prevent text in mobile Safari from being larger when the container width larger than the viewport */
    -webkit-text-size-adjust: 100%;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  :host([without-scrollbar]) #content {
    scrollbar-width: none;
  }

  :host([orientation='horizontal']) #content {
    overflow-x: auto;
    overflow-y: hidden;
  }

  :host([orientation='vertical']) #content {
    flex: 1 1 auto;
    min-height: 0; /* This is crucial for flex children to respect overflow */
    overflow-x: hidden;
    overflow-y: auto;
  }

  #start-shadow,
  #end-shadow {
    z-index: 2;
  }

  #start-shadow {
    opacity: var(--start-shadow-opacity);
  }

  #end-shadow {
    opacity: var(--end-shadow-opacity);
  }

  /* Horizontal shadows */
  :host([orientation='horizontal']) {
    #start-shadow,
    #end-shadow {
      position: absolute;
      top: 0;
      bottom: 0;
      width: var(--shadow-size);
      pointer-events: none;
    }

    #start-shadow {
      &:dir(ltr) {
        left: 0;
        background: linear-gradient(to right, var(--shadow-color), transparent 100%);
      }

      &:dir(rtl) {
        right: 0;
        background: linear-gradient(to left, var(--shadow-color), transparent 100%);
      }
    }

    #end-shadow {
      &:dir(ltr) {
        right: 0;
        background: linear-gradient(to left, var(--shadow-color), transparent 100%);
      }

      &:dir(rtl) {
        left: 0;
        background: linear-gradient(to right, var(--shadow-color), transparent 100%);
      }
    }
  }

  /* Vertical shadows */
  :host([orientation='vertical']) {
    #start-shadow,
    #end-shadow {
      position: absolute;
      right: 0;
      left: 0;
      height: var(--shadow-size);
      pointer-events: none;
    }

    #start-shadow {
      top: 0;
      background: linear-gradient(to bottom, var(--shadow-color), transparent 100%);
    }

    #end-shadow {
      bottom: 0;
      background: linear-gradient(to top, var(--shadow-color), transparent 100%);
    }
  }
`;var Ze=class extends z{constructor(){super(...arguments),this.localize=new W(this),this.resizeObserver=new ResizeObserver(()=>this.updateScroll()),this.canScroll=!1,this.orientation="horizontal",this.withoutScrollbar=!1,this.withoutShadow=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.disconnect()}handleKeyDown(t){t.key==="Home"&&(t.preventDefault(),this.content.scrollTo({left:this.orientation==="horizontal"?0:void 0,top:this.orientation==="vertical"?0:void 0})),t.key==="End"&&(t.preventDefault(),this.content.scrollTo({left:this.orientation==="horizontal"?this.content.scrollWidth:void 0,top:this.orientation==="vertical"?this.content.scrollHeight:void 0}))}handleSlotChange(){this.updateScroll()}updateScroll(){if(this.orientation==="horizontal"){const t=Math.ceil(this.content.clientWidth),e=Math.abs(Math.ceil(this.content.scrollLeft)),r=Math.ceil(this.content.scrollWidth)-t;this.canScroll=r>0;const o=Math.min(1,e/(r*.05)),s=Math.min(1,(r-e)/(r*.05));this.style.setProperty("--start-shadow-opacity",String(o||0)),this.style.setProperty("--end-shadow-opacity",String(s||0))}else{const t=Math.ceil(this.content.clientHeight),e=Math.abs(Math.ceil(this.content.scrollTop)),r=Math.ceil(this.content.scrollHeight)-t;this.canScroll=r>0;const o=Math.min(1,e/(r*.05)),s=Math.min(1,(r-e)/(r*.05));this.style.setProperty("--start-shadow-opacity",String(o||0)),this.style.setProperty("--end-shadow-opacity",String(s||0))}}render(){return p`
      ${this.withoutShadow?"":p`
            <div id="start-shadow" part="start-shadow" aria-hidden="true"></div>
            <div id="end-shadow" part="end-shadow" aria-hidden="true"></div>
          `}

      <div
        id="content"
        part="content"
        role="region"
        aria-label=${this.localize.term("scrollableRegion")}
        aria-orientation=${this.orientation}
        tabindex=${this.canScroll?"0":"-1"}
        @keydown=${this.handleKeyDown}
        @scroll=${this.updateScroll}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};Ze.css=[Yb];n([x("#content")],Ze.prototype,"content",2);n([w()],Ze.prototype,"canScroll",2);n([d({reflect:!0})],Ze.prototype,"orientation",2);n([d({attribute:"without-scrollbar",type:Boolean,reflect:!0})],Ze.prototype,"withoutScrollbar",2);n([d({attribute:"without-shadow",type:Boolean,reflect:!0})],Ze.prototype,"withoutShadow",2);n([vs({passive:!0})],Ze.prototype,"updateScroll",1);Ze=n([v("wa-scroller")],Ze);var Zb=C`
  :host {
    --tag-max-size: 10ch;
    --show-duration: 100ms;
    --hide-duration: 100ms;
  }

  /* Add ellipses to multi select options */
  :host wa-tag::part(content) {
    display: initial;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: var(--tag-max-size);
  }

  :host .disabled [part~='combobox'] {
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  :host .enabled:is(.open, :focus-within) [part~='combobox'] {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;

    /* Pass through from select to the popup */
    --show-duration: inherit;
    --hide-duration: inherit;

    &::part(popup) {
      z-index: 900;
    }

    &[data-current-placement^='top']::part(popup) {
      transform-origin: bottom;
    }

    &[data-current-placement^='bottom']::part(popup) {
      transform-origin: top;
    }
  }

  /* Combobox */
  .combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    align-items: center;
    justify-content: start;

    min-height: var(--wa-form-control-height);

    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    color: var(--wa-form-control-value-color);
    cursor: pointer;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    overflow: hidden;
    padding: 0 var(--wa-form-control-padding-inline);
    position: relative;
    vertical-align: middle;
    transition:
      background-color var(--wa-transition-normal),
      border var(--wa-transition-normal),
      outline var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);

    :host([multiple]) .select:not(.placeholder-visible) & {
      padding-inline-start: 0;
      padding-block: calc(var(--wa-form-control-height) * 0.1 - var(--wa-form-control-border-width));
    }

    /* Pills */
    :host([pill]) & {
      border-radius: var(--wa-border-radius-pill);
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .combobox {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .combobox {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .combobox {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  .display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    line-height: var(--wa-form-control-value-line-height);
    color: var(--wa-form-control-value-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
    }
  }

  /* Visually hide the display input when multiple is enabled */
  :host([multiple]) .select:not(.placeholder-visible) .display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .value-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    padding: 0;
    margin: 0;
  }

  .tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: 0.25em;
    gap: 0.25em;

    &::slotted(wa-tag) {
      cursor: pointer !important;
    }

    .disabled &,
    .disabled &::slotted(wa-tag) {
      cursor: not-allowed !important;
    }
  }

  /* Start and End */

  .start,
  .end {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
  }

  .end::slotted(*) {
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  .start::slotted(*) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  :host([multiple]) .start::slotted(*) {
    margin-inline: var(--wa-form-control-padding-inline);
  }

  /* Clear button */
  [part~='clear-button'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    background: none;
    padding: 0;
    transition: color var(--wa-transition-normal);
    cursor: pointer;
    margin-inline-start: var(--wa-form-control-padding-inline);

    &:focus {
      outline: none;
    }

    @media (hover: hover) {
      &:hover {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
      }
    }

    &:active {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
    }
  }

  /* Expand icon */
  .expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
    transition: rotate var(--wa-transition-slow) ease;
    rotate: 0deg;
    margin-inline-start: var(--wa-form-control-padding-inline);

    .open & {
      rotate: -180deg;
    }
  }

  /* Listbox */
  .listbox {
    display: block;
    position: relative;
    font: inherit;
    box-shadow: var(--wa-shadow-m);
    background: var(--wa-color-surface-raised);
    border-color: var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
    padding-block: 0.5em;
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);

    &::slotted(wa-divider) {
      --spacing: 0.5em;
    }
  }

  slot:not([name])::slotted(small) {
    display: block;
    font-size: var(--wa-font-size-smaller);
    font-weight: var(--wa-font-weight-semibold);
    color: var(--wa-color-text-quiet);
    padding-block: 0.5em;
    padding-inline: 2.25em;
  }
`;var U=class extends J{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new jt(this,"hint","label"),this.localize=new W(this),this.selectionOrder=new Map,this.typeToSelectString="",this.displayLabel="",this.selectedOptions=[],this.name="",this._defaultValue=null,this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.required=!1,this.getTag=t=>p`
        <wa-tag
          part="tag"
          exportparts="
            base:tag__base,
            content:tag__content,
            remove-button:tag__remove-button,
            remove-button__base:tag__remove-button__base
          "
          ?pill=${this.pill}
          size=${this.size}
          with-remove
          data-value=${t.value}
          @wa-remove=${e=>this.handleTagRemove(e,t)}
        >
          ${t.label}
        </wa-tag>
      `,this.handleDocumentFocusIn=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{const e=t.target,i=e.closest('[part~="clear-button"]')!==null,r=e.closest("wa-button")!==null;if(!(i||r)){if(t.key==="Escape"&&this.open&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){const o=this.getAllOptions(),s=o.indexOf(this.currentOption);let a=Math.max(0,s);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(a=s+1,a>o.length-1&&(a=0)):t.key==="ArrowUp"?(a=s-1,a<0&&(a=o.length-1)):t.key==="Home"?a=0:t.key==="End"&&(a=o.length-1),this.setCurrentOption(o[a])}if(t.key?.length===1||t.key==="Backspace"){const o=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(const s of o)if(s.label.toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(s);break}}}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()}}static get validators(){const t=[ks({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...t]}get validationTarget(){return this.valueInput}set defaultValue(t){this._defaultValue=this.convertDefaultValue(t)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}convertDefaultValue(t){return!(this.multiple||this.hasAttribute("multiple"))&&Array.isArray(t)&&(t=t[0]),t}set value(t){let e=this.value;t instanceof FormData&&(t=t.getAll(this.name)),t!=null&&!Array.isArray(t)&&(t=[t]),this._value=t??null,this.value!==e&&(this.valueHasChanged=!0,this.requestUpdate("value",e))}get value(){let t=this._value??this.defaultValue??null;t!=null&&(t=Array.isArray(t)?t:[t]),t==null?this.optionValues=new Set(null):this.optionValues=new Set(this.getAllOptions().filter(i=>!i.disabled).map(i=>i.value));let e=t;return t!=null&&(e=t.filter(i=>this.optionValues.has(i)),e=this.multiple?e:e[0],e=e??null),e}connectedCallback(){super.connectedCallback(),this.handleDefaultSlotChange(),this.open=!1}updateDefaultValue(){const e=this.getAllOptions().filter(i=>i.hasAttribute("selected")||i.defaultSelected);if(e.length>0){const i=e.map(r=>r.value);this._defaultValue=this.multiple?i:i[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.displayInput.setSelectionRange(0,0)}handleLabelClick(){this.displayInput.focus()}handleComboboxClick(t){t.preventDefault()}handleComboboxMouseDown(t){const i=t.composedPath().some(r=>r instanceof Element&&r.tagName.toLowerCase()==="wa-button");this.disabled||i||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){t.stopPropagation(),this.handleDocumentKeyDown(t)}handleClearClick(t){t.stopPropagation(),this.value!==null&&(this.selectionOrder.clear(),this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new Pc),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){const i=t.target.closest("wa-option");i&&!i.disabled&&(this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(i):this.setSelectedOptions(i),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){customElements.get("wa-option")||customElements.whenDefined("wa-option").then(()=>this.handleDefaultSlotChange());const t=this.getAllOptions();this.optionValues=void 0,this.updateDefaultValue();let e=this.value;if(e==null||!this.valueHasChanged&&!this.hasInteracted){this.selectionChanged();return}Array.isArray(e)||(e=[e]);const i=t.filter(r=>e.includes(r.value));this.setSelectedOptions(i)}handleTagRemove(t,e){if(t.stopPropagation(),this.disabled)return;this.hasInteracted=!0,this.valueHasChanged=!0;let i=e;if(!i){const r=t.target.closest("wa-tag[data-value]");if(r){const o=r.dataset.value;i=this.selectedOptions.find(s=>s.value===o)}}i&&(this.toggleOptionSelection(i,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this?.querySelectorAll?[...this.querySelectorAll("wa-option")]:[]}getFirstOption(){return this.querySelector("wa-option")}setCurrentOption(t){this.getAllOptions().forEach(i=>{i.current=!1,i.tabIndex=-1}),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus())}setSelectedOptions(t){const e=this.getAllOptions(),i=Array.isArray(t)?t:[t];e.forEach(r=>{i.includes(r)||(r.selected=!1)}),i.length&&i.forEach(r=>r.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){e===!0||e===!1?t.selected=e:t.selected=!t.selected,this.selectionChanged()}selectionChanged(){const e=this.getAllOptions().filter(a=>{if(!this.hasInteracted&&!this.valueHasChanged){const l=this.defaultValue,c=Array.isArray(l)?l:[l];return a.hasAttribute("selected")||a.defaultSelected||a.selected||c?.includes(a.value)}return a.selected}),i=new Set(e.map(a=>a.value));for(const a of this.selectionOrder.keys())i.has(a)||this.selectionOrder.delete(a);let o=(this.selectionOrder.size>0?Math.max(...this.selectionOrder.values()):-1)+1;for(const a of e)this.selectionOrder.has(a.value)||this.selectionOrder.set(a.value,o++);this.selectedOptions=e.sort((a,l)=>{const c=this.selectionOrder.get(a.value)??0,h=this.selectionOrder.get(l.value)??0;return c-h});let s=new Set(this.selectedOptions.map(a=>a.value));if(s.size>0||this._value){const a=this._value;if(this._value==null){let l=this.defaultValue??[];this._value=Array.isArray(l)?l:[l]}this._value=this._value?.filter(l=>!this.optionValues?.has(l))??null,this._value?.unshift(...s),this.requestUpdate("value",a)}if(this.multiple)this.placeholder&&!this.value?.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{const a=this.selectedOptions[0];this.displayLabel=a?.label??""}this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){const i=this.getTag(t,e);return i?typeof i=="string"?We(i):i:null}else if(e===this.maxOptionsVisible)return p`
          <wa-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
            >+${this.selectedOptions.length-e}</wa-tag
          >
        `;return null})}updated(t){super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value],i=t.filter(r=>e.includes(r.value));this.setSelectedOptions(i),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption());const t=new Ki;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await tt(this.popup.popup,"show"),this.currentOption&&_a(this.currentOption,this.listbox,"vertical","auto"),this.dispatchEvent(new Yi)}else{const t=new Gi;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.removeOpenListeners(),await tt(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.dispatchEvent(new Xi)}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,ye(this,"wa-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,ye(this,"wa-after-hide")}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}formResetCallback(){this.selectionOrder.clear(),this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,i=this.label?!0:!!t,r=this.hint?!0:!!e,o=(this.hasUpdated||zd)&&this.withClear&&!this.disabled&&this.value&&this.value.length>0,s=!!(this.placeholder&&(!this.value||this.value.length===0));return p`
      <div
        part="form-control"
        class=${D({"form-control":!0,"form-control-has-label":i})}
      >
        <label
          id="label"
          part="form-control-label label"
          class=${D({label:!0,"has-label":i})}
          aria-hidden=${i?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${D({select:!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple,"placeholder-visible":s})}
            placement=${this.placement}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
              @click=${this.handleComboboxClick}
            >
              <slot part="start" name="start" class="start"></slot>

              <input
                part="display-input"
                class="display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                ?required=${this.required}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-invalid=${!this.validity.valid}
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="hint"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
              />

              <!-- Tags need to wait for first hydration before populating otherwise it will create a hydration mismatch. -->
              ${this.multiple&&this.hasUpdated?p`<div part="tags" class="tags" @wa-remove=${this.handleTagRemove}>${this.tags}</div>`:""}

              <input
                class="value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
              />

              ${o?p`
                    <button
                      part="clear-button"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="end" part="end" class="end"></slot>

              <slot name="expand-icon" part="expand-icon" class="expand-icon">
                <wa-icon library="system" name="chevron-down" variant="solid"></wa-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
            >
              <slot @slotchange=${this.handleDefaultSlotChange}></slot>
            </div>
          </wa-popup>
        </div>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${D({"has-slotted":r})}
          aria-hidden=${r?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};U.css=[Zb,Ne,Tt];n([x(".select")],U.prototype,"popup",2);n([x(".combobox")],U.prototype,"combobox",2);n([x(".display-input")],U.prototype,"displayInput",2);n([x(".value-input")],U.prototype,"valueInput",2);n([x(".listbox")],U.prototype,"listbox",2);n([w()],U.prototype,"displayLabel",2);n([w()],U.prototype,"currentOption",2);n([w()],U.prototype,"selectedOptions",2);n([w()],U.prototype,"optionValues",2);n([d({reflect:!0})],U.prototype,"name",2);n([d({attribute:!1})],U.prototype,"defaultValue",1);n([d({attribute:"value",reflect:!1})],U.prototype,"value",1);n([d({reflect:!0})],U.prototype,"size",2);n([d()],U.prototype,"placeholder",2);n([d({type:Boolean,reflect:!0})],U.prototype,"multiple",2);n([d({attribute:"max-options-visible",type:Number})],U.prototype,"maxOptionsVisible",2);n([d({type:Boolean})],U.prototype,"disabled",2);n([d({attribute:"with-clear",type:Boolean})],U.prototype,"withClear",2);n([d({type:Boolean,reflect:!0})],U.prototype,"open",2);n([d({reflect:!0})],U.prototype,"appearance",2);n([d({type:Boolean,reflect:!0})],U.prototype,"pill",2);n([d()],U.prototype,"label",2);n([d({reflect:!0})],U.prototype,"placement",2);n([d({attribute:"hint"})],U.prototype,"hint",2);n([d({attribute:"with-label",type:Boolean})],U.prototype,"withLabel",2);n([d({attribute:"with-hint",type:Boolean})],U.prototype,"withHint",2);n([d({type:Boolean,reflect:!0})],U.prototype,"required",2);n([d({attribute:!1})],U.prototype,"getTag",2);n([k("disabled",{waitUntilFirstUpdate:!0})],U.prototype,"handleDisabledChange",1);n([k("value",{waitUntilFirstUpdate:!0})],U.prototype,"handleValueChange",1);n([k("open",{waitUntilFirstUpdate:!0})],U.prototype,"handleOpenChange",1);U=n([v("wa-select")],U);var Qb=class extends Event{constructor(){super("wa-remove",{bubbles:!0,cancelable:!1,composed:!0})}};var Jb=C`
  @layer wa-component {
    :host {
      display: inline-flex;
      gap: 0.5em;
      border-radius: var(--wa-border-radius-m);
      align-items: center;
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
      border-style: var(--wa-border-style);
      border-width: var(--wa-border-width-s);
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      font-size: inherit;
      line-height: 1;
      white-space: nowrap;
      user-select: none;
      -webkit-user-select: none;
      height: calc(var(--wa-form-control-height) * 0.8);
      line-height: calc(var(--wa-form-control-height) - var(--wa-form-control-border-width) * 2);
      padding: 0 0.75em;
    }

    /* Appearance modifiers */
    :host([appearance='outlined']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }

    :host([appearance='filled']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: transparent;
    }

    :host([appearance='filled-outlined']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }

    :host([appearance='accent']) {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
  }

  .content {
    font-size: var(--wa-font-size-smaller);
  }

  [part='remove-button'] {
    line-height: 1;
  }

  [part='remove-button']::part(base) {
    padding: 0;
    height: 1em;
    width: 1em;
    color: currentColor;
  }

  @media (hover: hover) {
    :host(:hover) > [part='remove-button']::part(base) {
      background-color: transparent;
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
    }
  }

  :host(:active) > [part='remove-button']::part(base) {
    background-color: transparent;
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
  }

  /*
   * Pill modifier
   */
  :host([pill]) {
    border-radius: var(--wa-border-radius-pill);
  }
`;var wi=class extends z{constructor(){super(...arguments),this.localize=new W(this),this.variant="neutral",this.appearance="filled-outlined",this.size="medium",this.pill=!1,this.withRemove=!1}handleRemoveClick(){this.dispatchEvent(new Qb)}render(){return p`
      <slot part="content" class="content"></slot>

      ${this.withRemove?p`
            <wa-button
              part="remove-button"
              exportparts="base:remove-button__base"
              class="remove"
              appearance="plain"
              @click=${this.handleRemoveClick}
              tabindex="-1"
            >
              <wa-icon name="xmark" library="system" variant="solid" label=${this.localize.term("remove")}></wa-icon>
            </wa-button>
          `:""}
    `}};wi.css=[Jb,ys,Tt];n([d({reflect:!0})],wi.prototype,"variant",2);n([d({reflect:!0})],wi.prototype,"appearance",2);n([d({reflect:!0})],wi.prototype,"size",2);n([d({type:Boolean,reflect:!0})],wi.prototype,"pill",2);n([d({attribute:"with-remove",type:Boolean})],wi.prototype,"withRemove",2);wi=n([v("wa-tag")],wi);var t0=C`
  :host {
    --color: var(--wa-color-neutral-fill-normal);
    --sheen-color: color-mix(in oklab, var(--color), var(--wa-color-surface-raised));

    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 1rem;
  }

  .indicator {
    flex: 1 1 auto;
    background: var(--color);
    border-radius: var(--wa-border-radius-pill);
  }

  :host([effect='sheen']) .indicator {
    background: linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));
    background-size: 400% 100%;
    animation: sheen 8s ease-in-out infinite;
  }

  :host([effect='pulse']) .indicator {
    animation: pulse 2s ease-in-out 0.5s infinite;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    :host {
      --color: GrayText;
    }
  }

  @keyframes sheen {
    0% {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`;var as=class extends z{constructor(){super(...arguments),this.effect="none"}render(){return p` <div part="indicator" class="indicator"></div> `}};as.css=t0;n([d({reflect:!0})],as.prototype,"effect",2);as=n([v("wa-skeleton")],as);var e0=C`
  :host {
    --track-size: 0.5em;
    --thumb-width: 1.4em;
    --thumb-height: 1.4em;
    --marker-width: 0.1875em;
    --marker-height: 0.1875em;
  }

  :host([orientation='vertical']) {
    width: auto;
  }

  #label:has(~ .vertical) {
    display: block;
    order: 2;
    max-width: none;
    text-align: center;
  }

  #description:has(~ .vertical) {
    order: 3;
    text-align: center;
  }

  /* Add extra space between slider and label, when present */
  #label:has(*:not(:empty)) ~ #slider {
    &.horizontal {
      margin-block-start: 0.5em;
    }
    &.vertical {
      margin-block-end: 0.5em;
    }
  }

  #slider {
    touch-action: none;

    &:focus {
      outline: none;
    }

    &:focus-visible:not(.disabled) #thumb,
    &:focus-visible:not(.disabled) #thumb-min,
    &:focus-visible:not(.disabled) #thumb-max {
      outline: var(--wa-focus-ring);
      /* intentionally no offset due to border */
    }
  }

  #track {
    position: relative;
    border-radius: 9999px;
    background: var(--wa-color-neutral-fill-normal);
    isolation: isolate;
  }

  /* Orientation */
  .horizontal #track {
    height: var(--track-size);
  }

  .vertical #track {
    order: 1;
    width: var(--track-size);
    height: 200px;
  }

  /* Disabled */
  .disabled #track {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Indicator */
  #indicator {
    position: absolute;
    border-radius: inherit;
    background-color: var(--wa-form-control-activated-color);

    &:dir(ltr) {
      right: calc(100% - max(var(--start), var(--end)));
      left: min(var(--start), var(--end));
    }

    &:dir(rtl) {
      right: min(var(--start), var(--end));
      left: calc(100% - max(var(--start), var(--end)));
    }
  }

  .horizontal #indicator {
    top: 0;
    height: 100%;
  }

  .vertical #indicator {
    top: calc(100% - var(--end));
    bottom: var(--start);
    left: 0;
    width: 100%;
  }

  /* Thumbs */
  #thumb,
  #thumb-min,
  #thumb-max {
    z-index: 3;
    position: absolute;
    width: var(--thumb-width);
    height: var(--thumb-height);
    border: solid 0.125em var(--wa-color-surface-default);
    border-radius: 50%;
    background-color: var(--wa-form-control-activated-color);
    cursor: pointer;
  }

  .disabled #thumb,
  .disabled #thumb-min,
  .disabled #thumb-max {
    cursor: inherit;
  }

  .horizontal #thumb,
  .horizontal #thumb-min,
  .horizontal #thumb-max {
    top: calc(50% - var(--thumb-height) / 2);

    &:dir(ltr) {
      right: auto;
      left: calc(var(--position) - var(--thumb-width) / 2);
    }

    &:dir(rtl) {
      right: calc(var(--position) - var(--thumb-width) / 2);
      left: auto;
    }
  }

  .vertical #thumb,
  .vertical #thumb-min,
  .vertical #thumb-max {
    bottom: calc(var(--position) - var(--thumb-height) / 2);
    left: calc(50% - var(--thumb-width) / 2);
  }

  /* Range-specific thumb styles */
  :host([range]) {
    #thumb-min:focus-visible,
    #thumb-max:focus-visible {
      z-index: 4; /* Ensure focused thumb appears on top */
      outline: var(--wa-focus-ring);
      /* intentionally no offset due to border */
    }
  }

  /* Markers */
  #markers {
    pointer-events: none;
  }

  .marker {
    z-index: 2;
    position: absolute;
    width: var(--marker-width);
    height: var(--marker-height);
    border-radius: 50%;
    background-color: var(--wa-color-surface-default);
  }

  .marker:first-of-type,
  .marker:last-of-type {
    display: none;
  }

  .horizontal .marker {
    top: calc(50% - var(--marker-height) / 2);
    left: calc(var(--position) - var(--marker-width) / 2);
  }

  .vertical .marker {
    top: calc(var(--position) - var(--marker-height) / 2);
    left: calc(50% - var(--marker-width) / 2);
  }

  /* Marker labels */
  #references {
    position: relative;

    slot {
      display: flex;
      justify-content: space-between;
      height: 100%;
    }

    ::slotted(*) {
      color: var(--wa-color-text-quiet);
      font-size: 0.875em;
      line-height: 1;
    }
  }

  .horizontal {
    #references {
      margin-block-start: 0.5em;
    }
  }

  .vertical {
    display: flex;
    margin-inline: auto;

    #track {
      order: 1;
    }

    #references {
      order: 2;
      width: min-content;
      margin-inline-start: 0.75em;

      slot {
        flex-direction: column;
      }
    }
  }

  .vertical #references slot {
    flex-direction: column;
  }
`;var i0=()=>{const t=Object.assign(document.createElement("input"),{type:"range",required:!0});return{observedAttributes:["required","min","max","step"],checkValidity(e){const i={message:"",isValid:!0,invalidKeys:[]},r=(o,s,a,l)=>{const c=document.createElement("input");return c.type="range",c.min=String(s),c.max=String(a),c.step=String(l),c.value=String(o),c.checkValidity(),c.validationMessage};if(e.required&&!e.hasInteracted)return i.isValid=!1,i.invalidKeys.push("valueMissing"),i.message=t.validationMessage||"Please fill out this field.",i;if(e.isRange){const o=e.minValue,s=e.maxValue;if(o<e.min)return i.isValid=!1,i.invalidKeys.push("rangeUnderflow"),i.message=r(o,e.min,e.max,e.step)||`Value must be greater than or equal to ${e.min}.`,i;if(s>e.max)return i.isValid=!1,i.invalidKeys.push("rangeOverflow"),i.message=r(s,e.min,e.max,e.step)||`Value must be less than or equal to ${e.max}.`,i;if(e.step&&e.step!==1){const a=(o-e.min)%e.step!==0,l=(s-e.min)%e.step!==0;if(a||l){i.isValid=!1,i.invalidKeys.push("stepMismatch");const c=a?o:s;return i.message=r(c,e.min,e.max,e.step)||`Value must be a multiple of ${e.step}.`,i}}}else{const o=e.value;if(o<e.min)return i.isValid=!1,i.invalidKeys.push("rangeUnderflow"),i.message=r(o,e.min,e.max,e.step)||`Value must be greater than or equal to ${e.min}.`,i;if(o>e.max)return i.isValid=!1,i.invalidKeys.push("rangeOverflow"),i.message=r(o,e.min,e.max,e.step)||`Value must be less than or equal to ${e.max}.`,i;if(e.step&&e.step!==1&&(o-e.min)%e.step!==0)return i.isValid=!1,i.invalidKeys.push("stepMismatch"),i.message=r(o,e.min,e.max,e.step)||`Value must be a multiple of ${e.step}.`,i}return i}}},V=class extends J{constructor(){super(...arguments),this.draggableThumbMin=null,this.draggableThumbMax=null,this.hasSlotController=new jt(this,"hint","label"),this.localize=new W(this),this.activeThumb=null,this.lastTrackPosition=null,this.label="",this.hint="",this.minValue=0,this.maxValue=50,this.defaultValue=this.getAttribute("value")==null?this.minValue:Number(this.getAttribute("value")),this._value=this.defaultValue,this.range=!1,this.disabled=!1,this.readonly=!1,this.orientation="horizontal",this.size="medium",this.min=0,this.max=100,this.step=1,this.required=!1,this.tooltipDistance=8,this.tooltipPlacement="top",this.withMarkers=!1,this.withTooltip=!1}static get validators(){return[...super.validators,i0()]}get focusableAnchor(){return this.isRange?this.thumbMin||this.slider:this.slider}get validationTarget(){return this.focusableAnchor}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){t=Number(t)??this.minValue,this._value!==t&&(this.valueHasChanged=!0,this._value=t)}get isRange(){return this.range}firstUpdated(){this.isRange?(this.draggableThumbMin=new xo(this.thumbMin,{start:()=>{this.activeThumb="min",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.minValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(t,e)=>{this.setThumbValueFromCoordinates(t,e,"min")},stop:()=>{this.minValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableThumbMax=new xo(this.thumbMax,{start:()=>{this.activeThumb="max",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.maxValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(t,e)=>{this.setThumbValueFromCoordinates(t,e,"max")},stop:()=>{this.maxValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableTrack=new xo(this.track,{start:(t,e)=>{if(this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.activeThumb)this.valueWhenDraggingStarted=this.activeThumb==="min"?this.minValue:this.maxValue;else{const i=this.getValueFromCoordinates(t,e),r=Math.abs(i-this.minValue),o=Math.abs(i-this.maxValue);if(r===o)if(i>this.maxValue)this.activeThumb="max";else if(i<this.minValue)this.activeThumb="min";else{const s=this.localize.dir()==="rtl",a=this.orientation==="vertical",l=a?e:t,c=this.lastTrackPosition||l;this.lastTrackPosition=l;const h=l>c!==s&&!a||l<c&&a;this.activeThumb=h?"max":"min"}else this.activeThumb=r<=o?"min":"max";this.valueWhenDraggingStarted=this.activeThumb==="min"?this.minValue:this.maxValue}this.customStates.set("dragging",!0),this.setThumbValueFromCoordinates(t,e,this.activeThumb),this.showRangeTooltips()},move:(t,e)=>{this.activeThumb&&this.setThumbValueFromCoordinates(t,e,this.activeThumb)},stop:()=>{this.activeThumb&&(this.activeThumb==="min"?this.minValue:this.maxValue)!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}})):this.draggableTrack=new xo(this.slider,{start:(t,e)=>{this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.value,this.customStates.set("dragging",!0),this.setValueFromCoordinates(t,e),this.showTooltip()},move:(t,e)=>{this.setValueFromCoordinates(t,e)},stop:()=>{this.value!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideTooltip(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0}})}updated(t){if(t.has("range")&&this.requestUpdate(),this.isRange?(t.has("minValue")||t.has("maxValue"))&&(this.minValue=N(this.minValue,this.min,this.maxValue),this.maxValue=N(this.maxValue,this.minValue,this.max),this.updateFormValue()):t.has("value")&&(this.value=N(this.value,this.min,this.max),this.setValue(String(this.value))),(t.has("min")||t.has("max"))&&(this.isRange?(this.minValue=N(this.minValue,this.min,this.max),this.maxValue=N(this.maxValue,this.min,this.max)):this.value=N(this.value,this.min,this.max)),t.has("disabled")&&this.customStates.set("disabled",this.disabled),t.has("disabled")||t.has("readonly")){const e=!(this.disabled||this.readonly);this.isRange&&(this.draggableThumbMin&&this.draggableThumbMin.toggle(e),this.draggableThumbMax&&this.draggableThumbMax.toggle(e)),this.draggableTrack&&this.draggableTrack.toggle(e)}super.updated(t)}formDisabledCallback(t){this.disabled=t}formResetCallback(){this.isRange?(this.minValue=parseFloat(this.getAttribute("min-value")??String(this.min)),this.maxValue=parseFloat(this.getAttribute("max-value")??String(this.max))):this.value=parseFloat(this.getAttribute("value")??String(this.min)),this.hasInteracted=!1,super.formResetCallback()}clampAndRoundToStep(t){const e=(String(this.step).split(".")[1]||"").replace(/0+$/g,"").length,i=Number(this.step),r=Number(this.min),o=Number(this.max);return t=Math.round(t/i)*i,t=N(t,r,o),parseFloat(t.toFixed(e))}getPercentageFromValue(t){return(t-this.min)/(this.max-this.min)*100}getValueFromCoordinates(t,e){const i=this.localize.dir()==="rtl",r=this.orientation==="vertical",{top:o,right:s,bottom:a,left:l,height:c,width:h}=this.trackBoundingClientRect,u=r?e:t,f=r?{start:o,end:a,size:c}:{start:l,end:s,size:h},g=(r||i?f.end-u:u-f.start)/f.size;return this.clampAndRoundToStep(this.min+(this.max-this.min)*g)}handleBlur(){this.isRange?requestAnimationFrame(()=>{const t=this.shadowRoot?.activeElement;t===this.thumbMin||t===this.thumbMax||this.hideRangeTooltips()}):this.hideTooltip(),this.customStates.set("focused",!1),this.dispatchEvent(new FocusEvent("blur",{bubbles:!0,composed:!0}))}handleFocus(t){const e=t.target;this.isRange?(e===this.thumbMin?this.activeThumb="min":e===this.thumbMax&&(this.activeThumb="max"),this.showRangeTooltips()):this.showTooltip(),this.customStates.set("focused",!0),this.dispatchEvent(new FocusEvent("focus",{bubbles:!0,composed:!0}))}handleKeyDown(t){const e=this.localize.dir()==="rtl",i=t.target;if(this.disabled||this.readonly||this.isRange&&(i===this.thumbMin?this.activeThumb="min":i===this.thumbMax&&(this.activeThumb="max"),!this.activeThumb))return;const r=this.isRange?this.activeThumb==="min"?this.minValue:this.maxValue:this.value;let o=r;switch(t.key){case"ArrowUp":case(e?"ArrowLeft":"ArrowRight"):t.preventDefault(),o=this.clampAndRoundToStep(r+this.step);break;case"ArrowDown":case(e?"ArrowRight":"ArrowLeft"):t.preventDefault(),o=this.clampAndRoundToStep(r-this.step);break;case"Home":t.preventDefault(),o=this.isRange&&this.activeThumb==="min"?this.min:this.isRange?this.minValue:this.min;break;case"End":t.preventDefault(),o=this.isRange&&this.activeThumb==="max"?this.max:this.isRange?this.maxValue:this.max;break;case"PageUp":t.preventDefault();const s=Math.max(r+(this.max-this.min)/10,r+this.step);o=this.clampAndRoundToStep(s);break;case"PageDown":t.preventDefault();const a=Math.min(r-(this.max-this.min)/10,r-this.step);o=this.clampAndRoundToStep(a);break;case"Enter":fn(t,this);return}o!==r&&(this.isRange?(this.activeThumb==="min"?o>this.maxValue?(this.maxValue=o,this.minValue=o):this.minValue=Math.max(this.min,o):o<this.minValue?(this.minValue=o,this.maxValue=o):this.maxValue=Math.min(this.max,o),this.updateFormValue()):this.value=N(o,this.min,this.max),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0)}handleLabelPointerDown(t){t.preventDefault(),this.disabled||(this.isRange?this.thumbMin?.focus():this.slider.focus())}setValueFromCoordinates(t,e){const i=this.value;this.value=this.getValueFromCoordinates(t,e),this.value!==i&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})}setThumbValueFromCoordinates(t,e,i){const r=this.getValueFromCoordinates(t,e),o=i==="min"?this.minValue:this.maxValue;i==="min"?r>this.maxValue?(this.maxValue=r,this.minValue=r):this.minValue=Math.max(this.min,r):r<this.minValue?(this.minValue=r,this.maxValue=r):this.maxValue=Math.min(this.max,r),o!==(i==="min"?this.minValue:this.maxValue)&&(this.updateFormValue(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}showTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!0)}hideTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!1)}showRangeTooltips(){if(!this.withTooltip)return;const t=this.shadowRoot?.getElementById("tooltip-thumb-min"),e=this.shadowRoot?.getElementById("tooltip-thumb-max");this.activeThumb==="min"?(t&&(t.open=!0),e&&(e.open=!1)):this.activeThumb==="max"&&(e&&(e.open=!0),t&&(t.open=!1))}hideRangeTooltips(){if(!this.withTooltip)return;const t=this.shadowRoot?.getElementById("tooltip-thumb-min"),e=this.shadowRoot?.getElementById("tooltip-thumb-max");t&&(t.open=!1),e&&(e.open=!1)}updateFormValue(){if(this.isRange){const t=new FormData;t.append(this.name||"",String(this.minValue)),t.append(this.name||"",String(this.maxValue)),this.setValue(t)}}focus(){this.isRange?this.thumbMin?.focus():this.slider.focus()}blur(){this.isRange?document.activeElement===this.thumbMin?this.thumbMin.blur():document.activeElement===this.thumbMax&&this.thumbMax.blur():this.slider.blur()}stepDown(){if(this.isRange){const t=this.clampAndRoundToStep(this.minValue-this.step);this.minValue=N(t,this.min,this.maxValue),this.updateFormValue()}else{const t=this.clampAndRoundToStep(this.value-this.step);this.value=t}}stepUp(){if(this.isRange){const t=this.clampAndRoundToStep(this.maxValue+this.step);this.maxValue=N(t,this.minValue,this.max),this.updateFormValue()}else{const t=this.clampAndRoundToStep(this.value+this.step);this.value=t}}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("hint"),i=this.label?!0:!!t,r=this.hint?!0:!!e,o=this.hasSlotController.test("reference"),s=D({small:this.size==="small",medium:this.size==="medium",large:this.size==="large",horizontal:this.orientation==="horizontal",vertical:this.orientation==="vertical",disabled:this.disabled}),a=[];if(this.withMarkers)for(let m=this.min;m<=this.max;m+=this.step)a.push(this.getPercentageFromValue(m));const l=p`
      <label
        id="label"
        part="label"
        for=${this.isRange?"thumb-min":"text-box"}
        class=${D({vh:!i,"has-label":i})}
        @pointerdown=${this.handleLabelPointerDown}
      >
        <slot name="label">${this.label}</slot>
      </label>
    `,c=p`
      <div
        id="hint"
        part="hint"
        class=${D({"has-slotted":r})}
      >
        <slot name="hint">${this.hint}</slot>
      </div>
    `,h=this.withMarkers?p`
          <div id="markers" part="markers">
            ${a.map(m=>p`<span part="marker" class="marker" style=${rt({"--position":`${m}%`})}></span>`)}
          </div>
        `:"",u=o?p`
          <div id="references" part="references" aria-hidden="true">
            <slot name="reference"></slot>
          </div>
        `:"",f=(m,g)=>this.withTooltip?p`
            <wa-tooltip
              id=${`tooltip${m!=="thumb"?"-"+m:""}`}
              part="tooltip"
              exportparts="
                base:tooltip__base,
                body:tooltip__body,
                arrow:tooltip__arrow
              "
              trigger="manual"
              distance=${this.tooltipDistance}
              placement=${this.tooltipPlacement}
              for=${m}
              activation="manual"
              dir=${this.localize.dir()}
            >
              <span aria-hidden="true">
                ${typeof this.valueFormatter=="function"?this.valueFormatter(g):this.localize.number(g)}
              </span>
            </wa-tooltip>
          `:"";if(this.isRange){const m=N(this.getPercentageFromValue(this.minValue),0,100),g=N(this.getPercentageFromValue(this.maxValue),0,100);return p`
        ${l}

        <div id="slider" part="slider" class=${s}>
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style=${rt({"--start":`${Math.min(m,g)}%`,"--end":`${Math.max(m,g)}%`})}
            ></div>

            ${h}

            <span
              id="thumb-min"
              part="thumb thumb-min"
              style=${rt({"--position":`${m}%`})}
              role="slider"
              aria-valuemin=${this.min}
              aria-valuenow=${this.minValue}
              aria-valuetext=${typeof this.valueFormatter=="function"?this.valueFormatter(this.minValue):this.localize.number(this.minValue)}
              aria-valuemax=${this.max}
              aria-label="${this.label?`${this.label} (minimum value)`:"Minimum value"}"
              aria-orientation=${this.orientation}
              aria-disabled=${this.disabled?"true":"false"}
              aria-readonly=${this.readonly?"true":"false"}
              tabindex=${this.disabled?-1:0}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            ></span>

            <span
              id="thumb-max"
              part="thumb thumb-max"
              style=${rt({"--position":`${g}%`})}
              role="slider"
              aria-valuemin=${this.min}
              aria-valuenow=${this.maxValue}
              aria-valuetext=${typeof this.valueFormatter=="function"?this.valueFormatter(this.maxValue):this.localize.number(this.maxValue)}
              aria-valuemax=${this.max}
              aria-label="${this.label?`${this.label} (maximum value)`:"Maximum value"}"
              aria-orientation=${this.orientation}
              aria-disabled=${this.disabled?"true":"false"}
              aria-readonly=${this.readonly?"true":"false"}
              tabindex=${this.disabled?-1:0}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            ></span>
          </div>

          ${u} ${c}
        </div>

        ${f("thumb-min",this.minValue)} ${f("thumb-max",this.maxValue)}
      `}else{const m=N(this.getPercentageFromValue(this.value),0,100),g=N(this.getPercentageFromValue(typeof this.indicatorOffset=="number"?this.indicatorOffset:this.min),0,100);return p`
        ${l}

        <div
          id="slider"
          part="slider"
          class=${s}
          role="slider"
          aria-disabled=${this.disabled?"true":"false"}
          aria-readonly=${this.disabled?"true":"false"}
          aria-orientation=${this.orientation}
          aria-valuemin=${this.min}
          aria-valuenow=${this.value}
          aria-valuetext=${typeof this.valueFormatter=="function"?this.valueFormatter(this.value):this.localize.number(this.value)}
          aria-valuemax=${this.max}
          aria-labelledby="label"
          aria-describedby="hint"
          tabindex=${this.disabled?-1:0}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        >
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style=${rt({"--start":`${g}%`,"--end":`${m}%`})}
            ></div>

            ${h}
            <span id="thumb" part="thumb" style=${rt({"--position":`${m}%`})}></span>
          </div>

          ${u} ${c}
        </div>

        ${f("thumb",this.value)}
      `}}};V.formAssociated=!0;V.observeSlots=!0;V.css=[Tt,Ne,e0];n([x("#slider")],V.prototype,"slider",2);n([x("#thumb")],V.prototype,"thumb",2);n([x("#thumb-min")],V.prototype,"thumbMin",2);n([x("#thumb-max")],V.prototype,"thumbMax",2);n([x("#track")],V.prototype,"track",2);n([x("#tooltip")],V.prototype,"tooltip",2);n([d()],V.prototype,"label",2);n([d({attribute:"hint"})],V.prototype,"hint",2);n([d({reflect:!0})],V.prototype,"name",2);n([d({type:Number,attribute:"min-value"})],V.prototype,"minValue",2);n([d({type:Number,attribute:"max-value"})],V.prototype,"maxValue",2);n([d({attribute:"value",reflect:!0,type:Number})],V.prototype,"defaultValue",2);n([w()],V.prototype,"value",1);n([d({type:Boolean,reflect:!0})],V.prototype,"range",2);n([d({type:Boolean})],V.prototype,"disabled",2);n([d({type:Boolean,reflect:!0})],V.prototype,"readonly",2);n([d({reflect:!0})],V.prototype,"orientation",2);n([d({reflect:!0})],V.prototype,"size",2);n([d({attribute:"indicator-offset",type:Number})],V.prototype,"indicatorOffset",2);n([d({type:Number})],V.prototype,"min",2);n([d({type:Number})],V.prototype,"max",2);n([d({type:Number})],V.prototype,"step",2);n([d({type:Boolean,reflect:!0})],V.prototype,"required",2);n([d({type:Boolean})],V.prototype,"autofocus",2);n([d({attribute:"tooltip-distance",type:Number})],V.prototype,"tooltipDistance",2);n([d({attribute:"tooltip-placement",reflect:!0})],V.prototype,"tooltipPlacement",2);n([d({attribute:"with-markers",type:Boolean})],V.prototype,"withMarkers",2);n([d({attribute:"with-tooltip",type:Boolean})],V.prototype,"withTooltip",2);n([d({attribute:!1})],V.prototype,"valueFormatter",2);V=n([v("wa-slider")],V);var r0=C`
  :host {
    --divider-width: 0.25rem;
    --divider-hit-area: 0.75rem;
    --min: 0%;
    --max: 100%;

    display: grid;
  }

  .start,
  .end {
    overflow: hidden;
  }

  .divider {
    flex: 0 0 var(--divider-width);
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: var(--wa-color-neutral-border-normal);
    color: var(--wa-color-neutral-on-normal);
    z-index: 1;
  }

  .divider:focus {
    outline: none;
  }

  :host(:not([disabled])) .divider:focus-visible {
    outline: var(--wa-focus-ring);
  }

  :host([disabled]) .divider {
    cursor: not-allowed;
  }

  /* Horizontal */
  :host(:not([orientation='vertical'], [disabled])) .divider {
    cursor: col-resize;
  }

  :host(:not([orientation='vertical'])) .divider::after {
    display: flex;
    content: '';
    position: absolute;
    height: 100%;
    left: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    width: var(--divider-hit-area);
  }

  /* Vertical */
  :host([orientation='vertical']) {
    flex-direction: column;
  }

  :host([orientation='vertical']:not([disabled])) .divider {
    cursor: row-resize;
  }

  :host([orientation='vertical']) .divider::after {
    content: '';
    position: absolute;
    width: 100%;
    top: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    height: var(--divider-hit-area);
  }

  @media (forced-colors: active) {
    .divider {
      outline: solid 1px transparent;
    }
  }
`;var qt=class extends z{constructor(){super(...arguments),this.isCollapsed=!1,this.localize=new W(this),this.positionBeforeCollapsing=0,this.position=50,this.orientation="horizontal",this.disabled=!1,this.snapThreshold=12}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>this.handleResize(t)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.unobserve(this)}detectSize(){const{width:t,height:e}=this.getBoundingClientRect();this.size=this.orientation==="vertical"?e:t}percentageToPixels(t){return this.size*(t/100)}pixelsToPercentage(t){return t/this.size*100}handleDrag(t){const e=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";this.disabled||(t.cancelable&&t.preventDefault(),Yr(this,{onMove:(i,r)=>{let o=this.orientation==="vertical"?r:i;this.primary==="end"&&(o=this.size-o),this.snap&&this.snap.split(" ").forEach(a=>{let l;a.endsWith("%")?l=this.size*(parseFloat(a)/100):l=parseFloat(a),e&&this.orientation==="horizontal"&&(l=this.size-l),o>=l-this.snapThreshold&&o<=l+this.snapThreshold&&(o=l)}),this.position=N(this.pixelsToPercentage(o),0,100)},initialEvent:t}))}handleKeyDown(t){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","Enter"].includes(t.key)){let e=this.position;const i=(t.shiftKey?10:1)*(this.primary==="end"?-1:1);if(t.preventDefault(),(t.key==="ArrowLeft"&&this.orientation==="horizontal"||t.key==="ArrowUp"&&this.orientation==="vertical")&&(e-=i),(t.key==="ArrowRight"&&this.orientation==="horizontal"||t.key==="ArrowDown"&&this.orientation==="vertical")&&(e+=i),t.key==="Home"&&(e=this.primary==="end"?100:0),t.key==="End"&&(e=this.primary==="end"?0:100),t.key==="Enter")if(this.isCollapsed)e=this.positionBeforeCollapsing,this.isCollapsed=!1;else{const r=this.position;e=0,requestAnimationFrame(()=>{this.isCollapsed=!0,this.positionBeforeCollapsing=r})}this.position=N(e,0,100)}}handleResize(t){const{width:e,height:i}=t[0].contentRect;this.size=this.orientation==="vertical"?i:e,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute("position-in-pixels")),this.positionInPixels=Number(this.getAttribute("position-in-pixels")),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels))}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.positionInPixels=this.percentageToPixels(this.position),this.isCollapsed=!1,this.positionBeforeCollapsing=0,this.dispatchEvent(new Mc)}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels)}handleVerticalChange(){this.detectSize()}render(){const t=this.orientation==="vertical"?"gridTemplateRows":"gridTemplateColumns",e=this.orientation==="vertical"?"gridTemplateColumns":"gridTemplateRows",i=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl",r=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,o="auto";return this.style||(this.style={}),this.primary==="end"?i&&this.orientation==="horizontal"?this.style[t]=`${r} var(--divider-width) ${o}`:this.style[t]=`${o} var(--divider-width) ${r}`:i&&this.orientation==="horizontal"?this.style[t]=`${o} var(--divider-width) ${r}`:this.style[t]=`${r} var(--divider-width) ${o}`,this.style[e]="",p`
      <slot name="start" part="panel start" class="start"></slot>

      <div
        part="divider"
        class="divider"
        tabindex=${T(this.disabled?void 0:"0")}
        role="separator"
        aria-valuenow=${this.position}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label=${this.localize.term("resize")}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <slot name="divider"></slot>
      </div>

      <slot name="end" part="panel end" class="end"></slot>
    `}};qt.css=r0;n([x(".divider")],qt.prototype,"divider",2);n([d({type:Number,reflect:!0})],qt.prototype,"position",2);n([d({attribute:"position-in-pixels",type:Number})],qt.prototype,"positionInPixels",2);n([d({reflect:!0})],qt.prototype,"orientation",2);n([d({type:Boolean,reflect:!0})],qt.prototype,"disabled",2);n([d()],qt.prototype,"primary",2);n([d()],qt.prototype,"snap",2);n([d({type:Number,attribute:"snap-threshold"})],qt.prototype,"snapThreshold",2);n([k("position")],qt.prototype,"handlePositionChange",1);n([k("positionInPixels")],qt.prototype,"handlePositionInPixelsChange",1);n([k("vertical")],qt.prototype,"handleVerticalChange",1);qt=n([v("wa-split-panel")],qt);var o0=C`
  :host {
    --height: var(--wa-form-control-toggle-size);
    --width: calc(var(--height) * 1.75);
    --thumb-size: 0.75em;

    display: inline-flex;
    line-height: var(--wa-form-control-value-line-height);
  }

  label {
    position: relative;
    display: flex;
    align-items: center;
    font: inherit;
    color: var(--wa-form-control-value-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch {
    flex: 0 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--height);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    transition-property: translate, background, border-color, box-shadow;
    transition-duration: var(--wa-transition-normal);
    transition-timing-function: var(--wa-transition-easing);
  }

  .switch .thumb {
    aspect-ratio: 1 / 1;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--wa-form-control-border-color);
    border-radius: 50%;
    translate: calc((var(--width) - var(--height)) / -2);
    transition: inherit;
  }

  .input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Focus */
  label:not(.disabled) .input:focus-visible ~ .switch .thumb {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Checked */
  .checked .switch {
    background-color: var(--wa-form-control-activated-color);
    border-color: var(--wa-form-control-activated-color);
  }

  .checked .switch .thumb {
    background-color: var(--wa-color-surface-default);
    translate: calc((var(--width) - var(--height)) / 2);
  }

  /* Disabled */
  label:has(> :disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [part~='label'] {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) [part~='label']::after {
    content: var(--wa-form-control-required-content);
    color: var(--wa-form-control-required-content-color);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }

  @media (forced-colors: active) {
    :checked:enabled + .switch:hover .thumb,
    :checked + .switch .thumb {
      background-color: ButtonText;
    }
  }
`;var ft=class extends J{constructor(){super(...arguments),this.hasSlotController=new jt(this,"hint"),this.title="",this.name=null,this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.checked=this.hasAttribute("checked"),this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint="",this.withHint=!1}static get validators(){return[...super.validators,uo()]}get value(){return this._value??"on"}set value(t){this._value=t}firstUpdated(t){super.firstUpdated(t),this.handleValueOrCheckedChange()}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleKeyDown(t){t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=!0,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}willUpdate(t){super.willUpdate(t),t.has("defaultChecked")&&(this.hasInteracted||(this.checked=this.defaultChecked)),(t.has("value")||t.has("checked"))&&this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleDefaultCheckedChange(){!this.hasInteracted&&this.checked!==this.defaultChecked&&(this.checked=this.defaultChecked,this.handleValueOrCheckedChange())}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked),this.customStates.set("checked",this.checked),this.updateValidity()}handleDisabledChange(){this.updateValidity()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}setValue(t,e){if(!this.checked){this.internals.setFormValue(null,null);return}this.internals.setFormValue(t??"on",e)}formResetCallback(){this.checked=this.defaultChecked,super.formResetCallback(),this.handleValueOrCheckedChange()}render(){const t=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,e=this.hint?!0:!!t;return p`
      <label
        part="base"
        class=${D({checked:this.checked,disabled:this.disabled})}
      >
        <input
          class="input"
          type="checkbox"
          title=${this.title}
          name=${this.name}
          value=${T(this.value)}
          .checked=${Fi(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="switch"
          aria-checked=${this.checked?"true":"false"}
          aria-describedby="hint"
          @click=${this.handleClick}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch">
          <span part="thumb" class="thumb"></span>
        </span>

        <slot part="label" class="label"></slot>
      </label>

      <slot
        id="hint"
        name="hint"
        part="hint"
        class=${D({"has-slotted":e})}
        aria-hidden=${e?"false":"true"}
        >${this.hint}</slot
      >
    `}};ft.shadowRootOptions={...J.shadowRootOptions,delegatesFocus:!0};ft.css=[Ne,Tt,o0];n([x('input[type="checkbox"]')],ft.prototype,"input",2);n([d()],ft.prototype,"title",2);n([d({reflect:!0})],ft.prototype,"name",2);n([d({reflect:!0})],ft.prototype,"value",1);n([d({reflect:!0})],ft.prototype,"size",2);n([d({type:Boolean})],ft.prototype,"disabled",2);n([d({type:Boolean,attribute:!1})],ft.prototype,"checked",2);n([d({type:Boolean,attribute:"checked",reflect:!0})],ft.prototype,"defaultChecked",2);n([d({type:Boolean,reflect:!0})],ft.prototype,"required",2);n([d({attribute:"hint"})],ft.prototype,"hint",2);n([d({attribute:"with-hint",type:Boolean})],ft.prototype,"withHint",2);n([k("defaultChecked")],ft.prototype,"handleDefaultCheckedChange",1);n([k(["checked"])],ft.prototype,"handleStateChange",1);n([k("disabled",{waitUntilFirstUpdate:!0})],ft.prototype,"handleDisabledChange",1);ft=n([v("wa-switch")],ft);var s0=C`
  :host {
    display: inline-block;
    color: var(--wa-color-neutral-on-quiet);
    font-weight: var(--wa-font-weight-action);
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font: inherit;
    padding: 1em 1.5em;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    transition: color var(--wa-transition-fast) var(--wa-transition-easing);

    ::slotted(wa-icon:first-child) {
      margin-inline-end: 0.5em;
    }

    ::slotted(wa-icon:last-child) {
      margin-inline-start: 0.5em;
    }
  }

  @media (hover: hover) {
    :host(:hover:not([disabled])) .tab {
      color: currentColor;
    }
  }

  :host(:focus) {
    outline: transparent;
  }

  :host(:focus-visible) .tab {
    outline: var(--wa-focus-ring);
    outline-offset: calc(-1 * var(--wa-border-width-l) - var(--wa-focus-ring-offset));
  }

  :host([active]:not([disabled])) {
    color: var(--wa-color-brand-on-quiet);
  }

  :host([disabled]) .tab {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (forced-colors: active) {
    :host([active]:not([disabled])) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`;var a0=0,Me=class extends z{constructor(){super(...arguments),this.attrId=++a0,this.componentId=`wa-tab-${this.attrId}`,this.panel="",this.active=!1,this.disabled=!1,this.tabIndex=0}connectedCallback(){this.slot||(this.slot="nav"),super.connectedCallback(),this.setAttribute("role","tab")}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0}render(){return this.id=this.id?.length>0?this.id:this.componentId,p`
      <div
        part="base"
        class=${D({tab:!0,"tab-active":this.active})}
      >
        <slot></slot>
      </div>
    `}};Me.css=s0;n([x(".tab")],Me.prototype,"tab",2);n([d({reflect:!0})],Me.prototype,"panel",2);n([d({type:Boolean,reflect:!0})],Me.prototype,"active",2);n([d({type:Boolean,reflect:!0})],Me.prototype,"disabled",2);n([d({type:Number,reflect:!0})],Me.prototype,"tabIndex",2);n([k("active")],Me.prototype,"handleActiveChange",1);n([k("disabled")],Me.prototype,"handleDisabledChange",1);Me=n([v("wa-tab")],Me);var n0=class extends Event{constructor(t){super("wa-tab-hide",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var l0=class extends Event{constructor(t){super("wa-tab-show",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var c0=C`
  :host {
    --indicator-color: var(--wa-color-brand-fill-loud);
    --track-color: var(--wa-color-neutral-fill-normal);
    --track-width: 0.125rem;

    /* Private */
    --safe-track-width: max(0.5px, round(var(--track-width), 0.5px));

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tabs {
    display: flex;
    position: relative;
  }

  .indicator {
    position: absolute;
  }

  .tab-group-has-scroll-controls .nav-container {
    position: relative;
    padding: 0 1.5em;
  }

  .body {
    display: block;
  }

  .scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1.5em;
  }

  .scroll-button-start {
    inset-inline-start: 0;
  }

  .scroll-button-end {
    inset-inline-end: 0;
  }

  /*
    * Top
    */

  .tab-group-top {
    flex-direction: column;
  }

  .tab-group-top .nav-container {
    order: 1;
  }

  .tab-group-top .nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group-top .nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group-top .tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--safe-track-width) var(--track-color);
  }

  .tab-group-top .indicator {
    bottom: calc(-1 * var(--safe-track-width));
    border-bottom: solid var(--safe-track-width) var(--indicator-color);
  }

  .tab-group-top .body {
    order: 2;
  }

  .tab-group-top ::slotted(wa-tab[active]) {
    border-block-end: solid var(--safe-track-width) var(--indicator-color);
    margin-block-end: calc(-1 * var(--safe-track-width));
  }

  .tab-group-top ::slotted(wa-tab-panel) {
    --padding: var(--wa-space-xl) 0;
  }

  /*
    * Bottom
    */

  .tab-group-bottom {
    flex-direction: column;
  }

  .tab-group-bottom .nav-container {
    order: 2;
  }

  .tab-group-bottom .nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group-bottom .nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group-bottom .tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--safe-track-width) var(--track-color);
  }

  .tab-group-bottom .indicator {
    top: calc(-1 * var(--safe-track-width));
    border-top: solid var(--safe-track-width) var(--indicator-color);
  }

  .tab-group-bottom .body {
    order: 1;
  }

  .tab-group-bottom ::slotted(wa-tab[active]) {
    border-block-start: solid var(--safe-track-width) var(--indicator-color);
    margin-block-start: calc(-1 * var(--safe-track-width));
  }

  .tab-group-bottom ::slotted(wa-tab-panel) {
    --padding: var(--wa-space-xl) 0;
  }

  /*
    * Start
    */

  .tab-group-start {
    flex-direction: row;
  }

  .tab-group-start .nav-container {
    order: 1;
  }

  .tab-group-start .tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--safe-track-width) var(--track-color);
  }

  .tab-group-start .indicator {
    inset-inline-end: calc(-1 * var(--safe-track-width));
    border-right: solid var(--safe-track-width) var(--indicator-color);
  }

  .tab-group-start .body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group-start ::slotted(wa-tab[active]) {
    border-inline-end: solid var(--safe-track-width) var(--indicator-color);
    margin-inline-end: calc(-1 * var(--safe-track-width));
  }

  .tab-group-start ::slotted(wa-tab-panel) {
    --padding: 0 var(--wa-space-xl);
  }

  /*
    * End
    */

  .tab-group-end {
    flex-direction: row;
  }

  .tab-group-end .nav-container {
    order: 2;
  }

  .tab-group-end .tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--safe-track-width) var(--track-color);
  }

  .tab-group-end .indicator {
    inset-inline-start: calc(-1 * var(--safe-track-width));
    border-inline-start: solid var(--safe-track-width) var(--indicator-color);
  }

  .tab-group-end .body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group-end ::slotted(wa-tab[active]) {
    border-inline-start: solid var(--safe-track-width) var(--indicator-color);
    margin-inline-start: calc(-1 * var(--safe-track-width));
  }

  .tab-group-end ::slotted(wa-tab-panel) {
    --padding: 0 var(--wa-space-xl);
  }
`;var oe=class extends z{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new W(this),this.hasScrollControls=!1,this.active="",this.placement="top",this.activation="auto",this.withoutScrollControls=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.updateScrollControls()}),this.mutationObserver=new MutationObserver(t=>{t.some(i=>!["aria-labelledby","aria-controls"].includes(i.attributeName))&&setTimeout(()=>this.setAriaLabels());const e=t.filter(i=>i.target.closest("wa-tab-group")===this);if(e.some(i=>i.attributeName==="disabled"))this.syncTabsAndPanels();else if(e.some(i=>i.attributeName==="active")){const r=e.filter(o=>o.attributeName==="active"&&o.target.tagName.toLowerCase()==="wa-tab").map(o=>o.target).find(o=>o.active);r&&r.closest("wa-tab-group")===this&&this.setActiveTab(r)}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),new IntersectionObserver((e,i)=>{if(e[0].intersectionRatio>0){if(this.setAriaLabels(),this.active){const r=this.tabs.find(o=>o.panel===this.active);r&&this.setActiveTab(r)}else this.setActiveTab(this.getActiveTab()??this.tabs[0],{emitEvents:!1});i.unobserve(e[0].target)}}).observe(this.tabGroup)})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect(),this.nav&&this.resizeObserver?.unobserve(this.nav)}getAllTabs(){return[...this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()].filter(e=>e.tagName.toLowerCase()==="wa-tab")}getAllPanels(){return[...this.body.assignedElements()].filter(t=>t.tagName.toLowerCase()==="wa-tab-panel")}getActiveTab(){return this.tabs.find(t=>t.active)}handleClick(t){const i=t.target.closest("wa-tab");i?.closest("wa-tab-group")===this&&i!==null&&this.setActiveTab(i,{scrollBehavior:"smooth"})}handleKeyDown(t){const i=t.target.closest("wa-tab");if(i?.closest("wa-tab-group")===this){if(["Enter"," "].includes(t.key)){i!==null&&(this.setActiveTab(i,{scrollBehavior:"smooth"}),t.preventDefault());return}if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key)){const o=this.tabs.find(l=>l.matches(":focus")),s=this.localize.dir()==="rtl";let a=null;if(o?.tagName.toLowerCase()==="wa-tab"){if(t.key==="Home")a=this.focusableTabs[0];else if(t.key==="End")a=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&t.key===(s?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&t.key==="ArrowUp"){const l=this.tabs.findIndex(c=>c===o);a=this.findNextFocusableTab(l,"backward")}else if(["top","bottom"].includes(this.placement)&&t.key===(s?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&t.key==="ArrowDown"){const l=this.tabs.findIndex(c=>c===o);a=this.findNextFocusableTab(l,"forward")}if(!a)return;a.tabIndex=0,a.focus({preventScroll:!0}),this.activation==="auto"?this.setActiveTab(a,{scrollBehavior:"smooth"}):this.tabs.forEach(l=>{l.tabIndex=l===a?0:-1}),["top","bottom"].includes(this.placement)&&_a(a,this.nav,"horizontal"),t.preventDefault()}}}}findNextFocusableTab(t,e){let i=null;const r=e==="forward"?1:-1;let o=t+r;for(;t<this.tabs.length;){if(i=this.tabs[o]||null,i===null){e==="forward"?i=this.focusableTabs[0]:i=this.focusableTabs[this.focusableTabs.length-1];break}if(!i.disabled)break;o+=r}return i}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(t,e){if(e={emitEvents:!0,scrollBehavior:"auto",...e},t.closest("wa-tab-group")===this&&t!==this.activeTab&&!t.disabled){const i=this.activeTab;this.active=t.panel,this.activeTab=t,this.tabs.forEach(r=>{r.active=r===this.activeTab,r.tabIndex=r===this.activeTab?0:-1}),this.panels.forEach(r=>r.active=r.name===this.activeTab?.panel),["top","bottom"].includes(this.placement)&&_a(this.activeTab,this.nav,"horizontal",e.scrollBehavior),e.emitEvents&&(i&&this.dispatchEvent(new n0({name:i.panel})),this.dispatchEvent(new l0({name:this.activeTab.panel})))}}setAriaLabels(){this.tabs.forEach(t=>{const e=this.panels.find(i=>i.name===t.panel);e&&(t.setAttribute("aria-controls",e.getAttribute("id")),e.setAttribute("aria-labelledby",t.getAttribute("id")))})}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(t=>!t.disabled),this.panels=this.getAllPanels(),this.updateComplete.then(()=>this.updateScrollControls())}updateActiveTab(){const t=this.tabs.find(e=>e.panel===this.active);t&&this.setActiveTab(t,{scrollBehavior:"smooth"})}updateScrollControls(){this.withoutScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1}render(){const t=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return p`
      <div
        part="base"
        class=${D({"tab-group":!0,"tab-group-top":this.placement==="top","tab-group-bottom":this.placement==="bottom","tab-group-start":this.placement==="start","tab-group-end":this.placement==="end","tab-group-has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="nav-container" part="nav">
          ${this.hasScrollControls?p`
                <wa-button
                  part="scroll-button scroll-button-start"
                  exportparts="base:scroll-button__base"
                  class="scroll-button scroll-button-start"
                  appearance="plain"
                  @click=${this.handleScrollToStart}
                >
                  <wa-icon
                    name=${t?"chevron-right":"chevron-left"}
                    library="system"
                    variant="solid"
                    label=${this.localize.term("scrollToStart")}
                  ></wa-icon>
                </wa-button>
              `:""}

          <!-- We have a focus listener because in Firefox (and soon to be Chrome) overflow containers are focusable. -->
          <div class="nav" @focus=${()=>this.activeTab?.focus({preventScroll:!0})}>
            <div part="tabs" class="tabs" role="tablist">
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls?p`
                <wa-button
                  part="scroll-button scroll-button-end"
                  class="scroll-button scroll-button-end"
                  exportparts="base:scroll-button__base"
                  appearance="plain"
                  @click=${this.handleScrollToEnd}
                >
                  <wa-icon
                    name=${t?"chevron-left":"chevron-right"}
                    library="system"
                    variant="solid"
                    label=${this.localize.term("scrollToEnd")}
                  ></wa-icon>
                </wa-button>
              `:""}
        </div>

        <slot part="body" class="body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `}};oe.css=c0;n([x(".tab-group")],oe.prototype,"tabGroup",2);n([x(".body")],oe.prototype,"body",2);n([x(".nav")],oe.prototype,"nav",2);n([w()],oe.prototype,"hasScrollControls",2);n([d({reflect:!0})],oe.prototype,"active",2);n([d()],oe.prototype,"placement",2);n([d()],oe.prototype,"activation",2);n([d({attribute:"without-scroll-controls",type:Boolean})],oe.prototype,"withoutScrollControls",2);n([k("active")],oe.prototype,"updateActiveTab",1);n([k("withoutScrollControls",{waitUntilFirstUpdate:!0})],oe.prototype,"updateScrollControls",1);oe=n([v("wa-tab-group")],oe);var d0=C`
  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`;var h0=0,vr=class extends z{constructor(){super(...arguments),this.attrId=++h0,this.componentId=`wa-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel")}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true")}render(){return p`
      <slot
        part="base"
        class=${D({"tab-panel":!0,"tab-panel-active":this.active})}
      ></slot>
    `}};vr.css=d0;n([d({reflect:!0})],vr.prototype,"name",2);n([d({type:Boolean,reflect:!0})],vr.prototype,"active",2);n([k("active")],vr.prototype,"handleActiveChange",1);vr=n([v("wa-tab-panel")],vr);var u0=C`
  :host {
    border-width: 0;
  }

  .textarea {
    display: grid;
    align-items: center;
    margin: 0;
    border: none;
    outline: none;
    cursor: inherit;
    font: inherit;
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    -webkit-appearance: none;

    &:focus-within {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .textarea {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .textarea {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .textarea {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  textarea {
    display: block;
    width: 100%;
    border: none;
    background: transparent;
    font: inherit;
    color: inherit;
    padding: calc(var(--wa-form-control-padding-block) - ((1lh - 1em) / 2)) var(--wa-form-control-padding-inline); /* accounts for the larger line height of textarea content */
    min-height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
    box-shadow: none;
    margin: 0;

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }

    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &:focus {
      outline: none;
    }
  }

  /* Shared textarea and size-adjuster positioning */
  .control,
  .size-adjuster {
    grid-area: 1 / 1 / 2 / 2;
  }

  .size-adjuster {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
    padding: 0;
  }

  textarea::-webkit-search-decoration,
  textarea::-webkit-search-cancel-button,
  textarea::-webkit-search-results-button,
  textarea::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  /*
   * Resize types
   */

  :host([resize='none']) textarea {
    resize: none;
  }

  textarea,
  :host([resize='vertical']) textarea {
    resize: vertical;
  }

  :host([resize='horizontal']) textarea {
    resize: horizontal;
  }

  :host([resize='both']) textarea {
    resize: both;
  }

  :host([resize='auto']) textarea {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }
`;var q=class extends J{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new jt(this,"hint","label"),this.title="",this.name=null,this._value=null,this.defaultValue=this.getAttribute("value")??"",this.size="medium",this.appearance="outlined",this.label="",this.hint="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,uo()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaDimensions()),this.updateComplete.then(()=>{if(this.setTextareaDimensions(),this.resizeObserver.observe(this.input),this.didSSR&&this.input&&this.value!==this.input.value){const t=this.input.value;this.value=t}})}disconnectedCallback(){super.disconnectedCallback(),this.input&&this.resizeObserver?.unobserve(this.input)}handleBlur(){this.checkValidity()}handleChange(t){this.valueHasChanged=!0,this.value=this.input.value,this.setTextareaDimensions(),this.checkValidity(),this.relayNativeEvent(t,{bubbles:!0,composed:!0})}handleInput(t){this.valueHasChanged=!0,this.value=this.input.value,this.relayNativeEvent(t,{bubbles:!0,composed:!0})}setTextareaDimensions(){if(this.resize==="none"){this.base.style.width="",this.base.style.height="";return}if(this.resize==="auto"){this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`,this.base.style.width="",this.base.style.height="";return}if(this.input.style.width){const t=Number(this.input.style.width.split(/px/)[0])+2;this.base.style.width=`${t}px`}if(this.input.style.height){const t=Number(this.input.style.height.split(/px/)[0])+2;this.base.style.height=`${t}px`}}handleRowsChange(){this.setTextareaDimensions()}async handleValueChange(){await this.updateComplete,this.checkValidity(),this.setTextareaDimensions()}updated(t){t.has("resize")&&this.setTextareaDimensions(),super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(t){if(t){typeof t.top=="number"&&(this.input.scrollTop=t.top),typeof t.left=="number"&&(this.input.scrollLeft=t.left);return}return{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,e,i="none"){this.input.setSelectionRange(t,e,i)}setRangeText(t,e,i,r="preserve"){const o=e??this.input.selectionStart,s=i??this.input.selectionEnd;this.input.setRangeText(t,o,s,r),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaDimensions())}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,i=this.label?!0:!!t,r=this.hint?!0:!!e;return p`
      <label
        part="form-control-label label"
        class=${D({label:!0,"has-label":i})}
        for="input"
        aria-hidden=${i?"false":"true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="textarea">
        <textarea
          part="textarea"
          id="input"
          class="control"
          title=${this.title}
          name=${T(this.name)}
          .value=${Fi(this.value)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${T(this.placeholder)}
          rows=${T(this.rows)}
          minlength=${T(this.minlength)}
          maxlength=${T(this.maxlength)}
          autocapitalize=${T(this.autocapitalize)}
          autocorrect=${T(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${T(this.spellcheck)}
          enterkeyhint=${T(this.enterkeyhint)}
          inputmode=${T(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        ></textarea>

        <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
        <div part="textarea-adjuster" class="size-adjuster" ?hidden=${this.resize!=="auto"}></div>
      </div>

      <slot
        id="hint"
        name="hint"
        part="hint"
        aria-hidden=${r?"false":"true"}
        class=${D({"has-slotted":r})}
        >${this.hint}</slot
      >
    `}};q.css=[u0,Ne,Tt];n([x(".control")],q.prototype,"input",2);n([x('[part~="base"]')],q.prototype,"base",2);n([x(".size-adjuster")],q.prototype,"sizeAdjuster",2);n([d()],q.prototype,"title",2);n([d({reflect:!0})],q.prototype,"name",2);n([w()],q.prototype,"value",1);n([d({attribute:"value",reflect:!0})],q.prototype,"defaultValue",2);n([d({reflect:!0})],q.prototype,"size",2);n([d({reflect:!0})],q.prototype,"appearance",2);n([d()],q.prototype,"label",2);n([d({attribute:"hint"})],q.prototype,"hint",2);n([d()],q.prototype,"placeholder",2);n([d({type:Number})],q.prototype,"rows",2);n([d({reflect:!0})],q.prototype,"resize",2);n([d({type:Boolean})],q.prototype,"disabled",2);n([d({type:Boolean,reflect:!0})],q.prototype,"readonly",2);n([d({type:Boolean,reflect:!0})],q.prototype,"required",2);n([d({type:Number})],q.prototype,"minlength",2);n([d({type:Number})],q.prototype,"maxlength",2);n([d()],q.prototype,"autocapitalize",2);n([d()],q.prototype,"autocorrect",2);n([d()],q.prototype,"autocomplete",2);n([d({type:Boolean})],q.prototype,"autofocus",2);n([d()],q.prototype,"enterkeyhint",2);n([d({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],q.prototype,"spellcheck",2);n([d()],q.prototype,"inputmode",2);n([d({attribute:"with-label",type:Boolean})],q.prototype,"withLabel",2);n([d({attribute:"with-hint",type:Boolean})],q.prototype,"withHint",2);n([k("rows",{waitUntilFirstUpdate:!0})],q.prototype,"handleRowsChange",1);n([k("value",{waitUntilFirstUpdate:!0})],q.prototype,"handleValueChange",1);q=n([v("wa-textarea")],q);var p0=class extends Event{constructor(t){super("wa-selection-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var f0=C`
  :host {
    /*
     * These are actually used by tree item, but we define them here so they can more easily be set and all tree items
     * stay consistent.
     */
    --indent-guide-color: var(--wa-color-surface-border);
    --indent-guide-offset: 0;
    --indent-guide-style: solid;
    --indent-guide-width: 0;
    --indent-size: var(--wa-space-l);

    display: block;

    /*
     * Tree item indentation uses the "em" unit to increment its width on each level, so setting the font size to zero
     * here removes the indentation for all the nodes on the first level.
     */
    font-size: 0;
  }
`;var m0=class extends Event{constructor(){super("wa-lazy-change",{bubbles:!0,cancelable:!1,composed:!0})}};var g0=class extends Event{constructor(){super("wa-lazy-load",{bubbles:!0,cancelable:!1,composed:!0})}};var b0=class extends Event{constructor(){super("wa-expand",{bubbles:!0,cancelable:!1,composed:!0})}};var w0=class extends Event{constructor(){super("wa-after-expand",{bubbles:!0,cancelable:!1,composed:!0})}};var v0=class extends Event{constructor(){super("wa-collapse",{bubbles:!0,cancelable:!1,composed:!0})}};var y0=class extends Event{constructor(){super("wa-after-collapse",{bubbles:!0,cancelable:!1,composed:!0})}};var x0=C`
  :host {
    --show-duration: 200ms;
    --hide-duration: 200ms;

    display: block;
    color: var(--wa-color-text-normal);
    outline: 0;
    z-index: 0;
  }

  :host(:focus) {
    outline: none;
  }

  slot:not([name])::slotted(wa-icon) {
    margin-inline-end: var(--wa-space-xs);
  }

  .tree-item {
    position: relative;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    cursor: default;
    user-select: none;
    -webkit-user-select: none;
  }

  .checkbox {
    line-height: var(--wa-form-control-value-line-height);
    pointer-events: none;
  }

  .expand-button,
  .checkbox,
  .label {
    font-family: inherit;
    font-size: var(--wa-font-size-m);
    font-weight: inherit;
  }

  .checkbox::part(base) {
    display: flex;
    align-items: center;
  }

  .indentation {
    display: block;
    width: 1em;
    flex-shrink: 0;
  }

  .expand-button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--wa-color-text-quiet);
    width: 2em;
    height: 2em;
    flex-shrink: 0;
    cursor: pointer;
  }

  .expand-button {
    transition: rotate var(--wa-transition-normal) var(--wa-transition-easing);
  }

  .tree-item-expanded .expand-button {
    rotate: 90deg;
  }

  .tree-item-expanded:dir(rtl) .expand-button {
    rotate: -90deg;
  }

  .tree-item-expanded:not(.tree-item-loading) slot[name='expand-icon'],
  .tree-item:not(.tree-item-expanded) slot[name='collapse-icon'] {
    display: none;
  }

  .tree-item:not(.tree-item-has-expand-button):not(.tree-item-loading) .expand-icon-slot {
    display: none;
  }

  .tree-item:not(.tree-item-has-expand-button):not(.tree-item-loading) .expand-button {
    cursor: default;
  }

  .tree-item-loading .expand-icon-slot wa-icon {
    display: none;
  }

  .expand-button-visible {
    cursor: pointer;
  }

  .item {
    display: flex;
    align-items: center;
    border-inline-start: solid 3px transparent;
  }

  :host([disabled]) .item {
    opacity: 0.5;
    outline: none;
    cursor: not-allowed;
  }

  :host(:focus-visible) .item {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
    z-index: 2;
  }

  :host(:not([aria-disabled='true'])) .tree-item-selected .item {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-inline-start-color: var(--wa-color-brand-fill-loud);
  }

  :host(:not([aria-disabled='true'])) .expand-button {
    color: var(--wa-color-text-quiet);
  }

  .label {
    display: flex;
    align-items: center;
    transition: color var(--wa-transition-normal) var(--wa-transition-easing);
  }

  .children {
    display: block;
    font-size: calc(1em + var(--indent-size, var(--wa-space-m)));
  }

  /* Indentation lines */
  .children {
    position: relative;
  }

  .children::before {
    content: '';
    position: absolute;
    top: var(--indent-guide-offset);
    bottom: var(--indent-guide-offset);
    inset-inline-start: calc(1em - (var(--indent-guide-width) / 2) - 1px);
    border-inline-end: var(--indent-guide-width) var(--indent-guide-style) var(--indent-guide-color);
    z-index: 1;
  }

  @media (forced-colors: active) {
    :host(:not([aria-disabled='true'])) .tree-item-selected .item {
      outline: dashed 1px SelectedItem;
    }
  }
`;function lt(t,e,i){return t?e(t):i?.(t)}var K=class extends z{constructor(){super(...arguments),this.localize=new W(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1}static isTreeItem(t){return t instanceof Element&&t.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children")}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange()}async animateCollapse(){this.dispatchEvent(new v0);const t=ts(getComputedStyle(this.childrenContainer).getPropertyValue("--hide-duration"));await Jo(this.childrenContainer,[{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],{duration:t,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.childrenContainer.hidden=!0,this.dispatchEvent(new y0)}isNestedItem(){const t=this.parentElement;return!!t&&K.isTreeItem(t)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0}willUpdate(t){t.has("selected")&&!t.has("indeterminate")&&(this.indeterminate=!1)}async animateExpand(){this.dispatchEvent(new b0),this.childrenContainer.hidden=!1;const t=ts(getComputedStyle(this.childrenContainer).getPropertyValue("--show-duration"));await Jo(this.childrenContainer,[{height:"0",opacity:"0",overflow:"hidden"},{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"}],{duration:t,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.childrenContainer.style.height="auto",this.dispatchEvent(new w0)}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand()}handleDisabledChange(){this.customStates.set("disabled",this.disabled),this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleExpandedState(){this.customStates.set("expanded",this.expanded)}handleIndeterminateStateChange(){this.customStates.set("indeterminate",this.indeterminate)}handleSelectedChange(){this.customStates.set("selected",this.selected),this.setAttribute("aria-selected",this.selected?"true":"false")}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false")}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=!0,this.dispatchEvent(new g0)):this.animateExpand():this.animateCollapse()}handleLazyChange(){this.dispatchEvent(new m0)}getChildrenItems({includeDisabled:t=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter(e=>K.isTreeItem(e)&&(t||!e.disabled)):[]}render(){const t=this.localize.dir()==="rtl",e=!this.loading&&(!this.isLeaf||this.lazy);return p`
      <div
        part="base"
        class="${D({"tree-item":!0,"tree-item-expanded":this.expanded,"tree-item-selected":this.selected,"tree-item-leaf":this.isLeaf,"tree-item-loading":this.loading,"tree-item-has-expand-button":e})}"
      >
        <div class="item" part="item">
          <div class="indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${D({"expand-button":!0,"expand-button-visible":e})}
            aria-hidden="true"
          >
            <slot class="expand-icon-slot" name="expand-icon">
              ${lt(this.loading,()=>p` <wa-spinner part="spinner" exportparts="base:spinner__base"></wa-spinner> `,()=>p`
                  <wa-icon name=${t?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
                `)}
            </slot>
            <slot class="expand-icon-slot" name="collapse-icon">
              <wa-icon name=${t?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
            </slot>
          </div>

          ${lt(this.selectable,()=>p`
              <wa-checkbox
                part="checkbox"
                exportparts="
                    base:checkbox__base,
                    control:checkbox__control,
                    checked-icon:checkbox__checked-icon,
                    indeterminate-icon:checkbox__indeterminate-icon,
                    label:checkbox__label
                  "
                class="checkbox"
                ?disabled="${this.disabled}"
                ?checked="${Fi(this.selected)}"
                ?indeterminate="${this.indeterminate}"
                tabindex="-1"
              ></wa-checkbox>
            `)}

          <slot class="label" part="label"></slot>
        </div>

        <div class="children" part="children" role="group">
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `}};K.css=x0;n([w()],K.prototype,"indeterminate",2);n([w()],K.prototype,"isLeaf",2);n([w()],K.prototype,"loading",2);n([w()],K.prototype,"selectable",2);n([d({type:Boolean,reflect:!0})],K.prototype,"expanded",2);n([d({type:Boolean,reflect:!0})],K.prototype,"selected",2);n([d({type:Boolean,reflect:!0})],K.prototype,"disabled",2);n([d({type:Boolean,reflect:!0})],K.prototype,"lazy",2);n([x("slot:not([name])")],K.prototype,"defaultSlot",2);n([x("slot[name=children]")],K.prototype,"childrenSlot",2);n([x(".item")],K.prototype,"itemElement",2);n([x(".children")],K.prototype,"childrenContainer",2);n([x(".expand-button slot")],K.prototype,"expandButtonSlot",2);n([k("loading",{waitUntilFirstUpdate:!0})],K.prototype,"handleLoadingChange",1);n([k("disabled")],K.prototype,"handleDisabledChange",1);n([k("expanded")],K.prototype,"handleExpandedState",1);n([k("indeterminate")],K.prototype,"handleIndeterminateStateChange",1);n([k("selected")],K.prototype,"handleSelectedChange",1);n([k("expanded",{waitUntilFirstUpdate:!0})],K.prototype,"handleExpandedChange",1);n([k("expanded",{waitUntilFirstUpdate:!0})],K.prototype,"handleExpandAnimation",1);n([k("lazy",{waitUntilFirstUpdate:!0})],K.prototype,"handleLazyChange",1);K=n([v("wa-tree-item")],K);function Tl(t,e=!1){function i(s){const a=s.getChildrenItems({includeDisabled:!1});if(a.length){const l=a.every(h=>h.selected),c=a.every(h=>!h.selected&&!h.indeterminate);s.selected=l,s.indeterminate=!l&&!c}}function r(s){const a=s.parentElement;K.isTreeItem(a)&&(i(a),r(a))}function o(s){for(const a of s.getChildrenItems())a.selected=e?s.selected||a.selected:!a.disabled&&s.selected,o(a);e&&i(s)}o(t),r(t)}var vi=class extends z{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new W(this),this.initTreeItem=t=>{t.updateComplete.then(()=>{t.selectable=this.selection==="multiple",["expand","collapse"].filter(e=>!!this.querySelector(`[slot="${e}-icon"]`)).forEach(e=>{const i=t.querySelector(`[slot="${e}-icon"]`),r=this.getExpandButtonIcon(e);r&&(i===null?t.append(r):i.hasAttribute("data-default")&&i.replaceWith(r))})})},this.handleTreeChanged=t=>{for(const e of t){const i=[...e.addedNodes].filter(K.isTreeItem),r=[...e.removedNodes].filter(K.isTreeItem);i.forEach(this.initTreeItem),this.lastFocusedItem&&r.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null)}},this.handleFocusOut=t=>{const e=t.relatedTarget;(!e||!this.contains(e))&&(this.tabIndex=0)},this.handleFocusIn=t=>{const e=t.target;t.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),K.isTreeItem(e)&&!e.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=e,this.tabIndex=-1,e.tabIndex=0)},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("wa-lazy-change",this.handleSlotChange)}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect()}getExpandButtonIcon(t){const i=(t==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:!0})[0];if(i){const r=i.cloneNode(!0);return[r,...r.querySelectorAll("[id]")].forEach(o=>o.removeAttribute("id")),r.setAttribute("data-default",""),r.slot=`${t}-icon`,r}return null}selectItem(t){const e=[...this.selectedItems];if(this.selection==="multiple")t.selected=!t.selected,t.lazy&&(t.expanded=!0),Tl(t);else if(this.selection==="single"||t.isLeaf){const r=this.getAllTreeItems();for(const o of r)o.selected=o===t}else this.selection==="leaf"&&(t.expanded=!t.expanded);const i=this.selectedItems;(e.length!==i.length||i.some(r=>!e.includes(r)))&&Promise.all(i.map(r=>r.updateComplete)).then(()=>{this.dispatchEvent(new p0({selection:i}))})}getAllTreeItems(){return[...this.querySelectorAll("wa-tree-item")]}focusItem(t){t?.focus()}handleKeyDown(t){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(t.key)||t.composedPath().some(o=>["input","textarea"].includes(o?.tagName?.toLowerCase())))return;const e=this.getFocusableItems(),i=this.matches(":dir(ltr)"),r=this.localize.dir()==="rtl";if(e.length>0){t.preventDefault();const o=e.findIndex(c=>c.matches(":focus")),s=e[o],a=c=>{const h=e[N(c,0,e.length-1)];this.focusItem(h)},l=c=>{s.expanded=c};t.key==="ArrowDown"?a(o+1):t.key==="ArrowUp"?a(o-1):i&&t.key==="ArrowRight"||r&&t.key==="ArrowLeft"?!s||s.disabled||s.expanded||s.isLeaf&&!s.lazy?a(o+1):l(!0):i&&t.key==="ArrowLeft"||r&&t.key==="ArrowRight"?!s||s.disabled||s.isLeaf||!s.expanded?a(o-1):l(!1):t.key==="Home"?a(0):t.key==="End"?a(e.length-1):(t.key==="Enter"||t.key===" ")&&(s.disabled||this.selectItem(s))}}handleClick(t){const e=t.target,i=e.closest("wa-tree-item"),r=t.composedPath().some(o=>o?.classList?.contains("expand-button"));!i||i.disabled||e!==this.clickTarget||(r?i.expanded=!i.expanded:this.selectItem(i))}handleMouseDown(t){this.clickTarget=t.target}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}async handleSelectionChange(){const t=this.selection==="multiple",e=this.getAllTreeItems();this.setAttribute("aria-multiselectable",t?"true":"false");for(const i of e)i.updateComplete.then(()=>{i.selectable=t});t&&(await this.updateComplete,[...this.querySelectorAll(":scope > wa-tree-item")].forEach(i=>{i.updateComplete.then(()=>{Tl(i,!0)})}))}get selectedItems(){const t=this.getAllTreeItems(),e=i=>i.selected;return t.filter(e)}getFocusableItems(){const t=this.getAllTreeItems(),e=new Set;return t.filter(i=>{if(i.disabled)return!1;const r=i.parentElement?.closest("[role=treeitem]");return r&&(!r.expanded||r.loading||e.has(r))&&e.add(i),!e.has(i)})}render(){return p`
      <div
        part="base"
        class="tree"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
        <span hidden aria-hidden="true"><slot name="expand-icon"></slot></span>
        <span hidden aria-hidden="true"><slot name="collapse-icon"></slot></span>
      </div>
    `}};vi.css=f0;n([x("slot:not([name])")],vi.prototype,"defaultSlot",2);n([x("slot[name=expand-icon]")],vi.prototype,"expandedIconSlot",2);n([x("slot[name=collapse-icon]")],vi.prototype,"collapsedIconSlot",2);n([d()],vi.prototype,"selection",2);n([k("selection")],vi.prototype,"handleSelectionChange",1);vi=n([v("wa-tree")],vi);var k0=C`
  :host {
    display: block;
    position: relative;
    aspect-ratio: 16 / 9;
    width: 100%;
    overflow: hidden;
    border-radius: var(--wa-border-radius-m);
  }

  #frame-container {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% / var(--zoom));
    height: calc(100% / var(--zoom));
    transform: scale(var(--zoom));
    transform-origin: 0 0;
  }

  #iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: inherit;
    /* Prevent the iframe from being selected, e.g. by a double click. Doesn't affect selection withing the iframe. */
    user-select: none;
    -webkit-user-select: none;
  }

  #controls {
    display: flex;
    position: absolute;
    bottom: 0.5em;
    align-items: center;
    font-weight: var(--wa-font-weight-semibold);
    padding: 0.25em 0.5em;
    gap: 0.5em;
    border-radius: var(--wa-border-radius-s);
    background: #000b;
    color: white;
    font-size: min(12px, 0.75em);
    user-select: none;
    -webkit-user-select: none;

    &:dir(ltr) {
      right: 0.5em;
    }

    &:dir(rtl) {
      left: 0.5em;
    }

    button {
      display: flex;
      align-items: center;
      padding: 0.25em;
      border: none;
      background: none;
      color: inherit;
      cursor: pointer;

      &:focus {
        outline: none;
      }

      &:focus-visible {
        outline: var(--wa-focus-ring);
        outline-offset: var(--wa-focus-ring-offset);
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }

    span {
      min-width: 4.5ch; /* extra space so numbers don't shift */
      font-variant-numeric: tabular-nums;
      text-align: center;
    }
  }
`;var Ht=class extends z{constructor(){super(...arguments),this.localize=new W(this),this.availableZoomLevels=[],this.allowfullscreen=!1,this.loading="eager",this.zoom=1,this.zoomLevels="25% 50% 75% 100% 125% 150% 175% 200%",this.withoutControls=!1,this.withoutInteraction=!1}get contentWindow(){return this.iframe?.contentWindow||null}get contentDocument(){return this.iframe?.contentDocument||null}parseZoomLevels(t){const e=Ls(t),i=[];for(const r of e){let o;if(r.endsWith("%")){const s=parseFloat(r.slice(0,-1));if(!isNaN(s))o=Math.max(0,s/100);else continue}else if(o=parseFloat(r),!isNaN(o))o=Math.max(0,o);else continue;i.push(o)}return[...new Set(i)].sort((r,o)=>r-o)}getCurrentZoomIndex(){if(this.availableZoomLevels.length===0)return-1;let t=0,e=Math.abs(this.availableZoomLevels[0]-this.zoom);for(let i=1;i<this.availableZoomLevels.length;i++){const r=Math.abs(this.availableZoomLevels[i]-this.zoom);r<e&&(e=r,t=i)}return t}isZoomInDisabled(){return this.availableZoomLevels.length===0?!1:this.getCurrentZoomIndex()>=this.availableZoomLevels.length-1}isZoomOutDisabled(){return this.availableZoomLevels.length===0?!1:this.getCurrentZoomIndex()<=0}updated(t){if(t.has("zoom")&&this.style.setProperty("--zoom",`${this.zoom}`),t.has("zoomLevels")&&(this.availableZoomLevels=this.parseZoomLevels(this.zoomLevels),this.availableZoomLevels.length>0)){const e=this.getCurrentZoomIndex();Math.abs(this.availableZoomLevels[e]-this.zoom)>.001&&(this.zoom=this.availableZoomLevels[e])}}zoomIn(){if(this.availableZoomLevels.length===0){this.zoom=Math.min(this.zoom+.05,2);return}const t=this.getCurrentZoomIndex();t<this.availableZoomLevels.length-1&&(this.zoom=this.availableZoomLevels[t+1])}zoomOut(){if(this.availableZoomLevels.length===0){this.zoom=Math.max(this.zoom-.05,0);return}const t=this.getCurrentZoomIndex();t>0&&(this.zoom=this.availableZoomLevels[t-1])}handleLoad(){this.dispatchEvent(new Event("load",{bubbles:!1,cancelable:!1,composed:!0}))}handleError(){this.dispatchEvent(new Event("error",{bubbles:!1,cancelable:!1,composed:!0}))}render(){return p`
      <div id="frame-container">
        <iframe
          id="iframe"
          part="iframe"
          ?inert=${this.withoutInteraction}
          ?allowfullscreen=${this.allowfullscreen}
          loading=${this.loading}
          referrerpolicy=${this.referrerpolicy}
          sandbox=${T(this.sandbox??void 0)}
          src=${T(this.src??void 0)}
          srcdoc=${T(this.srcdoc??void 0)}
          @load=${this.handleLoad}
          @error=${this.handleError}
        ></iframe>
      </div>

      ${this.withoutControls?"":p`
            <div id="controls" part="controls">
              <button
                part="zoom-out-button"
                aria-label=${this.localize.term("zoomOut")}
                @click=${this.zoomOut}
                ?disabled=${this.isZoomOutDisabled()}
              >
                <slot name="zoom-out-icon">
                  <wa-icon name="minus" label="Zoom out"></wa-icon>
                </slot>
              </button>
              <span>${this.localize.number(this.zoom,{style:"percent",maximumFractionDigits:1})}</span>
              <button
                part="zoom-in-button"
                aria-label=${this.localize.term("zoomIn")}
                @click=${this.zoomIn}
                ?disabled=${this.isZoomInDisabled()}
              >
                <slot name="zoom-in-icon">
                  <wa-icon name="plus" label="Zoom in"></wa-icon>
                </slot>
              </button>
            </div>
          `}
    `}};Ht.css=k0;n([x("#iframe")],Ht.prototype,"iframe",2);n([d()],Ht.prototype,"src",2);n([d()],Ht.prototype,"srcdoc",2);n([d({type:Boolean})],Ht.prototype,"allowfullscreen",2);n([d()],Ht.prototype,"loading",2);n([d()],Ht.prototype,"referrerpolicy",2);n([d()],Ht.prototype,"sandbox",2);n([d({type:Number,reflect:!0})],Ht.prototype,"zoom",2);n([d({attribute:"zoom-levels"})],Ht.prototype,"zoomLevels",2);n([d({type:Boolean,attribute:"without-controls",reflect:!0})],Ht.prototype,"withoutControls",2);n([d({type:Boolean,attribute:"without-interaction",reflect:!0})],Ht.prototype,"withoutInteraction",2);Ht=n([v("wa-zoomable-frame")],Ht);new MutationObserver(t=>{for(const{addedNodes:e}of t)for(const i of e)i.nodeType===Node.ELEMENT_NODE&&C0(i)});async function C0(t){const e=t instanceof Element?t.tagName.toLowerCase():"",i=e?.startsWith("wa-"),r=[...t.querySelectorAll(":not(:defined)")].map(a=>a.tagName.toLowerCase()).filter(a=>a.startsWith("wa-"));i&&!customElements.get(e)&&r.push(e);const o=[...new Set(r)],s=await Promise.allSettled(o.map(a=>$0(a)));for(const a of s)a.status==="rejected"&&console.warn(a.reason);await new Promise(requestAnimationFrame),t.dispatchEvent(new CustomEvent("wa-discovery-complete",{bubbles:!1,cancelable:!1,composed:!0}))}function $0(t){if(customElements.get(t))return Promise.resolve();const e=t.replace(/^wa-/i,""),i=Ip(`components/${e}/${e}.js`);return new Promise((r,o)=>{import(i).then(()=>r()).catch(()=>o(new Error(`Unable to autoload <${t}> from ${i}`)))})}Hp("lyra",{resolver:t=>new URL(Object.assign({"../icons/js.svg":fp,"../icons/jupyter.svg":mp,"../icons/layout-standard-bottom-panel.svg":gp,"../icons/layout-standard-bottom-sidebar.svg":bp,"../icons/layout-standard-full.svg":wp,"../icons/layout-standard.svg":vp,"../icons/python.svg":yp})[`../icons/${t}.svg`],import.meta.url).href,mutator:t=>{t.setAttribute("fill","currentColor"),t.setAttribute("stroke","currentColor")}});var S0=Object.defineProperty,E0=Object.getOwnPropertyDescriptor,Be=(t,e,i,r)=>{for(var o=r>1?void 0:r?E0(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=(r?a(e,i,o):a(o))||o);return r&&o&&S0(e,i,o),o};const A0=150;function ra(t,e,i,r,o){const a=`Toolbar ${t??"default"}`,l=i.filter(h=>h.slot===t&&r(h)),c=t==="start"?p`<slot name="start"></slot>`:t==="end"?p`<slot name="end"></slot>`:p`<slot></slot>`;return p`
        <wa-button-group orientation=${e} label=${a}>
            ${c}
            ${l.map(o)}
        </wa-button-group>
    `}let le=class extends Ci{constructor(){super(...arguments),this.position="start",this.orientation="horizontal",this.align="start",this.size="small",this.isEditor=!1,this.partToolbarContent=void 0,this.partToolbarRenderer=void 0,this.contributions=[],this.compact=!1,this.resizeObserver=null,this.resizeDebounceTimer=null,this.overflowCheckScheduled=!1,this.onResize=()=>{this.resizeDebounceTimer!==null&&clearTimeout(this.resizeDebounceTimer),this.resizeDebounceTimer=setTimeout(()=>{this.resizeDebounceTimer=null,this.updateCompactFromSpace()},A0)}}updateCompactFromSpace(){const t=this.shadowRoot?.querySelector(".toolbar-items");if(!t)return;const e=t.scrollWidth>t.clientWidth;this.compact!==e&&(this.compact=e,this.requestUpdate())}scheduleOverflowCheck(){this.overflowCheckScheduled||(this.overflowCheckScheduled=!0,requestAnimationFrame(()=>{this.overflowCheckScheduled=!1,this.updateCompactFromSpace()}))}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(this.onResize),this.resizeObserver.observe(this)}disconnectedCallback(){this.resizeObserver?.disconnect(),this.resizeObserver=null,this.resizeDebounceTimer!==null&&(clearTimeout(this.resizeDebounceTimer),this.resizeDebounceTimer=null),super.disconnectedCallback()}updated(t){super.updated?.(t),this.compact||this.scheduleOverflowCheck()}doBeforeUI(){const t=this.getAttribute("id");t&&this.loadContributions(t),It(we,e=>{if(!t)return;this.matchesTarget(t,e.target)&&(this.loadContributions(t),this.requestUpdate())})}matchesTarget(t,e){if(e===t)return!0;if(!t.includes(":"))return!1;const[i]=t.split(":");if(e===`${i}:*`)return!0;const r=e.split(":");if(r.length===2){const o=r[1];if(o==="system.editors"||o===".system.editors")return this.isEditor&&t.startsWith(`${i}:`)}return!1}loadContributions(t){const e=H.getContributions(t);if(!t.includes(":")){this.contributions=e;return}const[i]=t.split(":"),r=`${i}:*`,o=H.getContributions(r),s=[];if(this.isEditor){const a=["system.editors",".system.editors"];for(const l of a){const c=`${i}:${l}`,h=H.getContributions(c);s.push(...h)}}this.contributions=[...o,...s,...e]}isToolbarItem(t){return"command"in t||"component"in t}contributionCreator(t){if("command"in t){const e=t,i=!this.compact&&!!e.showLabel;return p`
                <wa-button @click=${()=>this.executeCommand(e.command,e.params||{})}
                           title=${e.label}
                           ?disabled="${e.disabled?.get()}"
                           appearance="plain" size=${this.size}>
                    <wa-icon name=${e.icon} label="${e.label}"></wa-icon>
                    ${i?e.label:""}
                </wa-button>
            `}if("component"in t){const e=t.component;return e instanceof Function?e():We(e)}return p`<span>unknown contribution type: ${typeof t}</span>`}render(){const t=this.partToolbarRenderer?this.partToolbarRenderer():this.partToolbarContent?this.partToolbarContent:"",e=this.orientation==="vertical"?"column":"row",i={start:"flex-start",center:"center",end:"flex-end"},r=this.contributionCreator.bind(this),o=this.isToolbarItem.bind(this);return p`
            <div class="toolbar-items" style=${rt({"flex-direction":e,"align-items":i[this.align],"justify-content":this.position})}>
                ${ra("start",this.orientation,this.contributions,o,r)}
                ${t}
                ${ra(void 0,this.orientation,this.contributions,o,r)}
                ${ra("end",this.orientation,this.contributions,o,r)}
            </div>
        `}};le.styles=C`
        :host {
            display: flex;
            flex-direction: row;
            --wa-form-control-padding-inline: var(--wa-space-2xs);
        }

        :host([orientation="vertical"]) {
            flex-direction: column;
        }

        .toolbar-items {
            display: flex;
            flex: 1;
            gap: var(--wa-space-2xs);
        }
    `;Be([d()],le.prototype,"position",2);Be([d({reflect:!0})],le.prototype,"orientation",2);Be([d({reflect:!0})],le.prototype,"align",2);Be([d({reflect:!0})],le.prototype,"size",2);Be([d({type:Boolean,attribute:"is-editor"})],le.prototype,"isEditor",2);Be([d({attribute:!1})],le.prototype,"partToolbarContent",2);Be([d({attribute:!1})],le.prototype,"partToolbarRenderer",2);Be([w()],le.prototype,"contributions",2);Be([w()],le.prototype,"compact",2);le=Be([v("lyra-toolbar")],le);const ci=()=>new L0;class L0{}const oa=new WeakMap,di=$r(class extends zh{render(t){return R}update(t,[e]){const i=e!==this.G;return i&&this.G!==void 0&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),R}rt(t){if(this.isConnected||(t=void 0),typeof this.G=="function"){const e=this.ht??globalThis;let i=oa.get(e);i===void 0&&(i=new WeakMap,oa.set(e,i)),i.get(this.G)!==void 0&&this.G.call(this.ht,void 0),i.set(this.G,t),t!==void 0&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return typeof this.G=="function"?oa.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var _0=Object.defineProperty,T0=Object.getOwnPropertyDescriptor,fo=(t,e,i,r)=>{for(var o=r>1?void 0:r?T0(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=(r?a(e,i,o):a(o))||o);return r&&o&&_0(e,i,o),o};let qi=class extends co{constructor(){super(...arguments),this.family="regular"}render(){if(!this.name)return"";const t=this.name.trim().split(/ +/),e=t.pop(),i=t.pop();return p`
            <wa-icon library="${i||R}" variant="${this.variant||R}"
                         family="${this.family||R}" name=${e} label="${this.label||this.name||R}"></wa-icon>`}};qi.styles=C`
        :host {
            display: contents;
        }
    `;fo([d()],qi.prototype,"name",2);fo([d()],qi.prototype,"family",2);fo([d()],qi.prototype,"variant",2);fo([d()],qi.prototype,"label",2);qi=fo([v("lyra-icon")],qi);var z0=Object.defineProperty,R0=Object.getOwnPropertyDescriptor,Kt=(t,e,i,r)=>{for(var o=r>1?void 0:r?R0(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=(r?a(e,i,o):a(o))||o);return r&&o&&z0(e,i,o),o};let _t=class extends co{constructor(){super(...arguments),this.cmd="",this.title="",this.label=!1,this.disabled=!1,this.appearance="plain",this.variant="neutral",this.size="small",this.params={},this.placement="bottom-start",this.dropdownContributions=[]}handleClick(t){if(!this.disabled){if(t&&t.stopPropagation(),this.action){this.action(t);return}if(this.cmd){const e=this.closest("wa-dropdown");e&&e.open!==void 0&&(e.open=!1),this.executeCommand(this.cmd,this.params)}}}handleSelect(t){const e=t.target;e&&e.open!==void 0&&(e.open=!1)}isInDropdown(){return!!this.closest("wa-dropdown, wa-dropdown-menu")}getKeybinding(){if(!this.cmd||this.action)return null;const t=sc.getKeyBindingsForCommand(this.cmd);return t.length>0?t[0]:null}doBeforeUI(){this.dropdown&&(this.loadDropdownContributions(),It(we,t=>{this.dropdown&&t.target===this.dropdown&&(this.dropdownContributions=t.contributions,this.requestUpdate())}))}loadDropdownContributions(){this.dropdown&&(this.dropdownContributions=H.getContributions(this.dropdown),this.requestUpdate())}renderContribution(t){if("command"in t){const e=t,i=e.disabled?.get();return p`
                <lyra-command 
                    cmd="${e.command}"
                    icon="${e.icon||""}"
                    .params=${e.params||{}}
                    ?disabled="${i}">
                    ${e.label}
                </lyra-command>
            `}if("component"in t){const i=t.component;return i instanceof Function?i():We(i)}return R}render(){const t=this.getKeybinding();return this.isInDropdown()?p`
                <wa-dropdown-item 
                    ?disabled=${this.disabled}
                    @click=${e=>this.handleClick(e)}>
                    <lyra-icon name="${this.icon}" label="${this.title}" slot="icon"></lyra-icon>
                    <slot></slot>
                    ${t?p`<span class="keybinding">${t}</span>`:""}
                </wa-dropdown-item>
            `:this.dropdown?p`
                <wa-dropdown 
                    placement=${this.placement}
                    @wa-select=${e=>this.handleSelect(e)}>
                    <wa-button 
                        slot="trigger"
                        appearance=${this.appearance}
                        variant=${this.variant}
                        size=${this.size}
                        ?disabled=${this.disabled}
                        with-caret
                        title=${t?`${this.title} (${t})`:this.title}>
                        <lyra-icon slot="start" name="${this.icon}" label="${this.title}"></lyra-icon>
                        <slot></slot>
                        ${this.label?this.title:R}
                    </wa-button>
                    
                    ${this.title?p`
                        <h6 style="padding: var(--wa-space-xs) var(--wa-space-s); margin: 0; color: var(--wa-color-neutral-50); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                            ${this.title}
                        </h6>
                    `:R}
                    
                    ${this.dropdownContributions.map(e=>this.renderContribution(e))}
                    
                    ${this.cmd?p`
                        <wa-divider></wa-divider>
                        <lyra-command 
                            cmd="${this.cmd}"
                            icon="${this.icon||""}"
                            .params=${this.params}
                            ?disabled=${this.disabled}>
                            <slot></slot>
                            ${this.title}
                        </lyra-command>
                    `:R}
                </wa-dropdown>
            `:p`
            <wa-button
                appearance=${this.appearance}
                variant=${this.variant}
                size=${this.size}
                ?disabled=${this.disabled}
                title=${t?`${this.title} (${t})`:this.title}
                @click=${e=>this.handleClick(e)}>
                <lyra-icon slot="start" name="${this.icon}" label="${this.title}"></lyra-icon>
                <slot></slot>
            </wa-button>
        `}};_t.styles=C`
        :host {
            display: inline-block;
        }

        .keybinding {
            margin-left: auto;
            padding: 2px 6px;
            background: var(--wa-color-neutral-15);
            border: 1px solid var(--wa-color-neutral-25);
            border-radius: 3px;
            font-size: 10px;
            font-family: monospace;
            opacity: 0.7;
        }

        :host-context(.wa-light) .keybinding {
            background: var(--wa-color-neutral-85);
            border: 1px solid var(--wa-color-neutral-75);
        }
    `;Kt([d()],_t.prototype,"cmd",2);Kt([d({type:Object,attribute:!1})],_t.prototype,"action",2);Kt([d()],_t.prototype,"title",2);Kt([d()],_t.prototype,"label",2);Kt([d()],_t.prototype,"icon",2);Kt([d({type:Boolean})],_t.prototype,"disabled",2);Kt([d()],_t.prototype,"appearance",2);Kt([d()],_t.prototype,"variant",2);Kt([d()],_t.prototype,"size",2);Kt([d({type:Object,attribute:!1})],_t.prototype,"params",2);Kt([d()],_t.prototype,"dropdown",2);Kt([d()],_t.prototype,"placement",2);Kt([w()],_t.prototype,"dropdownContributions",2);_t=Kt([v("lyra-command")],_t);var D0=Object.defineProperty,O0=Object.getOwnPropertyDescriptor,Tr=(t,e,i,r)=>{for(var o=r>1?void 0:r?O0(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=(r?a(e,i,o):a(o))||o);return r&&o&&D0(e,i,o),o};let yi=class extends Ci{constructor(){super(...arguments),this.isEditor=!1,this.partContextMenuRenderer=void 0,this.contributions=[],this.isOpen=!1,this.position={x:0,y:0},this.anchorRef=ci(),this.dropdownRef=ci(),this.boundHandleDocumentPointerDown=this.handleDocumentPointerDown.bind(this)}handleDocumentPointerDown(t){if(!this.isOpen)return;const e=t.composedPath();this.dropdownRef.value&&e.includes(this.dropdownRef.value)||e.some(i=>i.getAttribute?.("part")==="submenu")||this.onClose()}doBeforeUI(){const t=this.getAttribute("id");t&&this.loadContributions(t),It(we,e=>{if(!t)return;this.matchesTarget(t,e.target)&&(this.loadContributions(t),this.requestUpdate())})}matchesTarget(t,e){if(e===t)return!0;if(!t.includes(":"))return!1;const[i]=t.split(":");if(e===`${i}:*`)return!0;const r=e.split(":");if(r.length===2){const o=r[1];if(o==="system.editors"||o===".system.editors")return this.isEditor&&t.startsWith(`${i}:`)}return!1}loadContributions(t){const e=H.getContributions(t);if(!t.includes(":")){this.contributions=e;return}const[i]=t.split(":"),r=`${i}:*`,o=H.getContributions(r),s=[];if(this.isEditor){const a=["system.editors",".system.editors"];for(const l of a){const c=`${i}:${l}`,h=H.getContributions(c);s.push(...h)}}this.contributions=[...o,...s,...e]}getElementFromPoint(t,e){let i=document.elementFromPoint(t,e);if(!i)return null;for(;i;){const r=i.shadowRoot;if(r){const o=r.elementFromPoint(t,e);if(o&&o!==i){i=o;continue}}break}return i}triggerClickUnderCursor(t){const e=this.getElementFromPoint(t.clientX,t.clientY);if(e){const i=new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,clientX:t.clientX,clientY:t.clientY,screenX:t.screenX,screenY:t.screenY,button:0,buttons:0,detail:1,which:1});e.dispatchEvent(i)}}show(t,e){e&&this.triggerClickUnderCursor(e),this.position=t,this.isOpen=!0,this.updateComplete.then(()=>{document.addEventListener("pointerdown",this.boundHandleDocumentPointerDown,{capture:!0})})}onClose(){this.isOpen=!1,document.removeEventListener("pointerdown",this.boundHandleDocumentPointerDown,{capture:!0})}renderContribution(t){if("command"in t){const e=t,i=e.disabled?.get();return p`
                <lyra-command
                    cmd="${e.command}"
                    icon="${e.icon??""}"
                    .params=${e.params??{}}
                    ?disabled="${i}">
                    ${e.label}
                </lyra-command>
            `}else if("component"in t){const e=t.component;return e instanceof Function?e():We(e)}return R}render(){if(!this.isOpen)return R;const t=this.partContextMenuRenderer?this.partContextMenuRenderer():R;return p`
            <wa-dropdown
                ${di(this.dropdownRef)}
                ?open=${this.isOpen}
                @wa-after-hide=${this.onClose}>
                
                <div 
                    slot="trigger"
                    ${di(this.anchorRef)}
                    style="position: fixed; 
                           left: ${this.position.x}px; 
                           top: ${this.position.y}px; 
                           width: 1px; 
                           height: 1px; 
                           pointer-events: none;">
                </div>
                
                ${t}
                ${this.contributions.map(e=>this.renderContribution(e))}
            </wa-dropdown>
        `}};yi.styles=C`
        :host {
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
            pointer-events: none;
            z-index: 10000;
        }

        wa-dropdown {
            pointer-events: auto;
            min-width: 200px;
        }
        
        wa-dropdown::part(menu) {
            min-width: 200px;
        }
    `;Tr([d({type:Boolean,attribute:"is-editor"})],yi.prototype,"isEditor",2);Tr([d({attribute:!1})],yi.prototype,"partContextMenuRenderer",2);Tr([w()],yi.prototype,"contributions",2);Tr([w()],yi.prototype,"isOpen",2);Tr([w()],yi.prototype,"position",2);yi=Tr([v("lyra-contextmenu")],yi);const zl=(t,e,i)=>{const r=new Map;for(let o=e;o<=i;o++)r.set(t[o],o);return r},I0=$r(class extends Sr{constructor(t){if(super(t),t.type!==me.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let r;i===void 0?i=e:e!==void 0&&(r=e);const o=[],s=[];let a=0;for(const l of t)o[a]=r?r(l,a):a,s[a]=i(l,a),a++;return{values:s,keys:o}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,r]){const o=Ah(t),{values:s,keys:a}=this.dt(e,i,r);if(!Array.isArray(o))return this.ut=a,s;const l=this.ut??=[],c=[];let h,u,f=0,m=o.length-1,g=0,b=s.length-1;for(;f<=m&&g<=b;)if(o[f]===null)f++;else if(o[m]===null)m--;else if(l[f]===a[g])c[g]=Ei(o[f],s[g]),f++,g++;else if(l[m]===a[b])c[b]=Ei(o[m],s[b]),m--,b--;else if(l[f]===a[b])c[b]=Ei(o[f],s[b]),Dr(t,c[b+1],o[f]),f++,b--;else if(l[m]===a[g])c[g]=Ei(o[m],s[g]),Dr(t,o[f],o[m]),m--,g++;else if(h===void 0&&(h=zl(a,g,b),u=zl(l,f,m)),h.has(l[f]))if(h.has(l[m])){const y=u.get(a[g]),E=y!==void 0?o[y]:null;if(E===null){const _=Dr(t,o[f]);Ei(_,s[g]),c[g]=_}else c[g]=Ei(E,s[g]),Dr(t,o[f],E),o[y]=null;g++}else Ns(o[m]),m--;else Ns(o[f]),f++;for(;g<=b;){const y=Dr(t,c[b+1]);Ei(y,s[g]),c[g++]=y}for(;f<=m;){const y=o[f++];y!==null&&Ns(y)}return this.ut=a,ec(t,c),Ft}});var P0=Object.defineProperty,M0=Object.getOwnPropertyDescriptor,vn=(t,e,i,r)=>{for(var o=r>1?void 0:r?M0(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=(r?a(e,i,o):a(o))||o);return r&&o&&P0(e,i,o),o};let oo=class extends an{constructor(){super(...arguments),this.placement="top",this.contributions=[],this.tabGroup=ci(),this.containerId=null,this.resizeObservers=new WeakMap}doBeforeUI(){if(this.containerId=this.getAttribute("id"),!this.containerId)throw new Error("lyra-tabs requires an 'id' attribute to function");this.loadAndResolveContributions()}doInitUI(){this.updateComplete.then(()=>{this.activateNextAvailableTab(),this.tabGroup.value&&(this.tabGroup.value.addEventListener("wa-tab-show",t=>{const e=this.getTabPanel(t.detail.name);e&&(this.updateToolbarFromComponent(e),requestAnimationFrame(()=>{this.updateToolbarHeightVariable(e),this.setupToolbarResizeObserver(e)}),this.dispatchEvent(new CustomEvent("tab-shown",{detail:e})))}),this.tabGroup.value.addEventListener("part-toolbar-changed",t=>{const i=t.target.closest("wa-tab-panel");i&&(this.updateToolbarFromComponent(i),requestAnimationFrame(()=>this.updateToolbarHeightVariable(i)))}),this.tabGroup.value.addEventListener("part-contextmenu-changed",t=>{const i=t.target.closest("wa-tab-panel");i&&this.updateContextMenuFromComponent(i)}),this.tabGroup.value.addEventListener("click",t=>{const e=t.target,i=e.closest("wa-tab");if(i){const a=i.getAttribute("panel");if(a){const l=this.getTabPanel(a);if(l){const c=l.querySelector(".tab-content");if(c&&c.firstElementChild){const h=c.firstElementChild;h instanceof Qt&&ee.set(h)}}}return}const r=e.closest("wa-scroller.tab-content");if(!r)return;const o=r.closest("wa-tab-panel");if(!o)return;const s=o.querySelector(".tab-content");if(s&&s.firstElementChild){const a=s.firstElementChild;a instanceof Qt&&ee.set(a)}}),this.tabGroup.value.addEventListener("contextmenu",t=>{const e=t,i=e.target.closest("wa-scroller.tab-content");if(!i)return;e.preventDefault();const r=i.closest("wa-tab-panel");r&&requestAnimationFrame(()=>{this.updateContextMenuFromComponent(r);const o=r.querySelector("lyra-contextmenu");o&&o.show({x:e.clientX,y:e.clientY},e)})}))}),It(we,t=>{!this.containerId||t.target!==this.containerId||(this.loadAndResolveContributions(),this.requestUpdate(),this.updateComplete.then(()=>{this.activateNextAvailableTab()}))})}updated(t){if(super.updated(t),t.has("contributions")){const e=this.containerId===ri;this.contributions.forEach(i=>{const r=this.getTabPanel(i.name);if(!r)return;const o=r.querySelector(".tab-content");if(o&&o.firstElementChild){const s=o.firstElementChild;s instanceof Qt&&(s.tabContribution=i,s.isEditor=e)}requestAnimationFrame(()=>this.updateToolbarHeightVariable(r))})}}has(t){return this.tabGroup.value?!!this.getTabPanel(t):!1}activate(t){this.tabGroup.value&&this.tabGroup.value.setAttribute("active",t)}getActiveEditor(){return this.tabGroup.value?this.tabGroup.value.getAttribute("active"):null}open(t){if(this.contributions.find(i=>i.name===t.name)){this.activate(t.name);return}this.contributions.push(t),this.requestUpdate(),this.updateComplete.then(()=>{this.activate(t.name);const i=this.getTabPanel(t.name);if(i){const r=i.querySelector(".tab-content");if(r&&r.firstElementChild){const o=r.firstElementChild;o instanceof Qt&&(o.tabContribution=t,o.isEditor=this.containerId===ri)}requestAnimationFrame(()=>{this.updateToolbarFromComponent(i),this.updateToolbarHeightVariable(i),this.setupToolbarResizeObserver(i)})}})}handleTabAuxClick(t,e){t.button===Ua.MIDDLE&&e.closable&&this.closeTab(t,e.name)}async closeTab(t,e){if(t.stopPropagation(),this.isDirty(e)&&!await $c("Unsaved changes will be lost: Do you really want to close?"))return;const i=this.getTabPanel(e);if(!i)return;const r=this.contributions.find(s=>s.name===e);if(!r)return;this.cleanupTabInstance(i);const o=this.contributions.indexOf(r);o>-1&&this.contributions.splice(o,1),this.dispatchEvent(new CustomEvent("tab-closed",{detail:i})),this.requestUpdate(),this.updateComplete.then(()=>{this.activateNextAvailableTab()})}markDirty(t,e){this.getTab(t).classList.toggle("part-dirty",e)}isDirty(t){return this.getTab(t).classList.contains("part-dirty")}loadAndResolveContributions(){this.containerId&&(this.contributions=H.getContributions(this.containerId),this.requestUpdate())}cleanupTabInstance(t){const e=this.resizeObservers.get(t);e&&(e.disconnect(),this.resizeObservers.delete(t));const i=t.querySelector(".tab-content");if(i&&i.firstElementChild){const r=i.firstElementChild;"close"in r&&typeof r.close=="function"&&r.close()}}activateNextAvailableTab(){if(!this.tabGroup.value)return;const t=this.tabGroup.value.querySelectorAll("wa-tab");if(t.length>0){const e=t.item(0).getAttribute("panel");e&&this.tabGroup.value.setAttribute("active",e)}else this.tabGroup.value.removeAttribute("active")}getTabPanel(t){return this.tabGroup.value?this.tabGroup.value.querySelector(`wa-tab-panel[name='${t}']`):null}getTab(t){return this.tabGroup.value?this.tabGroup.value.querySelector(`wa-tab[panel='${t}']`):null}updateToolbarFromComponent(t){const e=t.querySelector(".tab-content");if(!e||!e.firstElementChild)return;const i=e.firstElementChild;if(!(i instanceof Qt)||!i.renderToolbar)return;const r=t.querySelector("lyra-toolbar");r&&(r.partToolbarRenderer=()=>i.renderToolbar(),r.requestUpdate())}updateContextMenuFromComponent(t){const e=t.querySelector(".tab-content");if(!e||!e.firstElementChild)return;const i=e.firstElementChild;if(!(i instanceof Qt)||!i.renderContextMenu)return;const r=t.querySelector("lyra-contextmenu");r&&(r.partContextMenuRenderer=()=>i.renderContextMenu(),r.requestUpdate())}updateToolbarHeightVariable(t){const e=t.querySelector(".tab-toolbar");if(!e)return;const i=e.offsetHeight;t.style.setProperty("--toolbar-height",`${i}px`)}setupToolbarResizeObserver(t){if(this.resizeObservers.has(t))return;const e=t.querySelector(".tab-toolbar");if(!e)return;const i=new ResizeObserver(()=>{this.updateToolbarHeightVariable(t)});i.observe(e),this.resizeObservers.set(t,i)}render(){const t=si.getCurrentApp();return p`
            <wa-tab-group ${di(this.tabGroup)} placement=${this.placement}>
                ${lt(this.contributions.length===0,()=>p`
                        <div class="empty-state">
                            ${lt(t,()=>p`
                                    <div class="empty-content">
                                        <h2 class="empty-title">${t.name}</h2>
                                        ${lt(t.description,()=>p`<p class="empty-description">${t.description}</p>`)}
                                    </div>
                                `,()=>p`
                                    <wa-icon name="folder-open" class="empty-icon"></wa-icon>
                                `)}
                        </div>
                    `,()=>I0(this.contributions,e=>e.name,e=>p`
                            <wa-tab panel="${e.name}"
                                    @auxclick="${i=>this.handleTabAuxClick(i,e)}">
                                <lyra-icon name="${e.icon}"></lyra-icon>
                                ${e.label}
                                ${lt(e.closable,()=>p`
                                    <wa-icon name="xmark" label="Close"  @click="${i=>this.closeTab(i,e.name)}"></wa-icon>
                                `)}
                            </wa-tab>
                            <wa-tab-panel name="${e.name}">
                                ${lt(e.toolbar!==!1,()=>p`
                                    <lyra-toolbar id="toolbar:${e.editorId??e.name}"
                                               class="tab-toolbar"
                                               ?is-editor="${this.containerId===ri}"></lyra-toolbar>
                                `)}
                                <wa-scroller class="tab-content" orientation="vertical">
                                    ${e.component?e.component(e.name):R}
                                </wa-scroller>
                                ${lt(e.contextMenu!==!1,()=>p`
                                    <lyra-contextmenu id="contextmenu:${e.name}"
                                                   ?is-editor="${this.containerId===ri}"></lyra-contextmenu>
                                `)}
                            </wa-tab-panel>
                        `))}
            </wa-tab-group>
        `}};oo.styles=C`
        :host {
            height: 100%;
            width: 100%;
        }

        wa-tab-group {
            height: 100%;
            width: 100%;
        }

        wa-tab-group::part(base) {
            display: grid;
            grid-template-rows: auto minmax(0, 1fr);
            height: 100%;
            width: 100%;
        }

        wa-tab-panel[active] {
            display: grid;
            grid-template-rows: minmax(0, 1fr);
            height: 100%;
            width: 100%;
            overflow: hidden;
            position: relative;
        }

        .tab-content {
            position: absolute;
            top: calc(var(--toolbar-height, 0px));
            right: 0;
            left: 0;
            height: calc(100% - var(--toolbar-height, 0px));
        }

        wa-tab::part(base) {
            padding: 3px 0.5rem;
        }

        wa-tab-panel {
            --padding: 0px;
        }

        .part-dirty::part(base) {
            font-style: italic;
            color: var(--wa-color-danger-fill-loud)
        }

        .empty-state {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            grid-row: 2;
        }

        .empty-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 2rem;
            gap: 0.75rem;
            opacity: 0.3;
        }

        .empty-title {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 500;
            color: var(--wa-color-text-quiet);
        }

        .empty-description {
            margin: 0;
            font-size: 1rem;
            color: var(--wa-color-text-quiet);
            max-width: 500px;
        }

        .empty-icon {
            font-size: 6rem;
            opacity: 0.2;
            color: var(--wa-color-text-quiet);
        }
    `;vn([d({reflect:!0})],oo.prototype,"placement",2);vn([w()],oo.prototype,"contributions",2);oo=vn([v("lyra-tabs")],oo);var N0=Object.defineProperty,F0=Object.getOwnPropertyDescriptor,mo=(t,e,i,r)=>{for(var o=r>1?void 0:r?F0(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=(r?a(e,i,o):a(o))||o);return r&&o&&N0(e,i,o),o};let yr=class extends Ci{constructor(){super(...arguments),this.orientation="horizontal",this.gridSizes=[],this.gridChildren=[],this.resizing=null,this.resizeOverlay=null,this.childrenLoaded=!1,this.childStylesApplied=!1,this.settingsLoaded=!1,this.handleResize=t=>{if(!this.resizing)return;const i=(this.orientation==="horizontal"?t.clientX:t.clientY)-this.resizing.startPos,r=[...this.resizing.startSizes];r[this.resizing.handleIndex]+=i,r[this.resizing.handleIndex+1]-=i;const o=this.orientation==="horizontal"?this.offsetWidth:this.offsetHeight,s=o*.05;if(r[this.resizing.handleIndex]>=s&&r[this.resizing.handleIndex+1]>=s){this.resizing.currentSizes=r;const a=r.map((l,c)=>{const u=`${(l/o*100).toFixed(2)}%`;return c===r.length-1?u:`${u} 4px`}).join(" ");this.orientation==="horizontal"?this.style.gridTemplateColumns=a:this.style.gridTemplateRows=a}},this.stopResize=async()=>{if(this.resizing?.currentSizes){const t=this.orientation==="horizontal"?this.offsetWidth:this.offsetHeight;this.gridSizes=this.resizing.currentSizes.map(e=>`${(e/t*100).toFixed(2)}%`),await this.saveSizes(),this.requestUpdate()}this.resizeOverlay&&(document.body.removeChild(this.resizeOverlay),this.resizeOverlay=null),this.resizing=null,document.removeEventListener("mousemove",this.handleResize),document.removeEventListener("mouseup",this.stopResize),document.body.style.cursor="",document.body.style.userSelect=""}}createRenderRoot(){return this}doBeforeUI(){this.childrenLoaded||(this.mutationObserver=new MutationObserver(()=>{this.childrenLoaded||this.loadChildren()}),this.mutationObserver.observe(this,{childList:!0,subtree:!1}),this.loadChildren())}async loadChildren(){const t=Array.from(this.children).filter(e=>e.tagName!=="STYLE"&&e.tagName!=="SCRIPT"&&!e.classList.contains("resize-handle"));if(t.length!==0){if(this.childrenLoaded=!0,this.mutationObserver&&(this.mutationObserver.disconnect(),this.mutationObserver=void 0),this.gridChildren=t,!this.settingsLoaded){this.settingsLoaded=!0;const e=await this.getDialogSetting();if(e&&Array.isArray(e.sizes)&&e.sizes.length===this.gridChildren.length){this.gridSizes=e.sizes,this.requestUpdate();return}}if(this.sizes)this.gridSizes=this.sizes.split(",").map(e=>e.trim());else{const e=`${100/this.gridChildren.length}%`;this.gridSizes=this.gridChildren.map(()=>e)}this.requestUpdate()}}async saveSizes(){this.gridSizes.length!==0&&await this.setDialogSetting({sizes:this.gridSizes,orientation:this.orientation})}updated(t){super.updated(t),t.has("gridChildren")&&!this.childStylesApplied&&this.gridChildren.length>0&&(this.childStylesApplied=!0,this.gridChildren.forEach((e,i)=>{e.style.overflow="hidden",e.style.height="100%",e.style.width="100%",e.style.gridColumn=this.orientation==="horizontal"?`${i*2+1}`:"1",e.style.gridRow=this.orientation==="vertical"?`${i*2+1}`:"1",e.style.display="flex",e.style.flexDirection="column"}))}startResize(t,e){if(t.preventDefault(),e>=this.gridChildren.length-1)return;const i=this.orientation==="horizontal"?t.clientX:t.clientY,r=this.orientation==="horizontal"?this.offsetWidth:this.offsetHeight,o=this.gridSizes.map(s=>s.endsWith("%")?parseFloat(s)/100*r:(s.endsWith("px"),parseFloat(s)));this.resizing={handleIndex:e,startPos:i,startSizes:o},this.resizeOverlay=document.createElement("div"),this.resizeOverlay.style.position="fixed",this.resizeOverlay.style.top="0",this.resizeOverlay.style.left="0",this.resizeOverlay.style.width="100%",this.resizeOverlay.style.height="100%",this.resizeOverlay.style.zIndex="9999",this.resizeOverlay.style.cursor=this.orientation==="horizontal"?"col-resize":"row-resize",document.body.appendChild(this.resizeOverlay),document.addEventListener("mousemove",this.handleResize),document.addEventListener("mouseup",this.stopResize),document.body.style.cursor=this.orientation==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none"}render(){if(this.gridChildren.length===0||this.gridSizes.length===0)return R;const t=this.gridSizes.flatMap((e,i)=>i===this.gridSizes.length-1?[e]:[e,"1px"]).join(" ");return this.style.display="grid",this.orientation==="horizontal"?(this.style.gridTemplateColumns=t,this.style.gridTemplateRows="100%"):(this.style.gridTemplateColumns="100%",this.style.gridTemplateRows=t),this.style.overflow="hidden",p`
            <style>
                .resize-handle {
                    position: relative;
                    z-index: 10;
                    background-color: var(--wa-color-neutral-border-quiet);
                    transition: background-color var(--wa-transition-fast);
                }
                
                .resize-handle:hover {
                    background-color: var(--wa-color-brand-fill-normal);
                }
            </style>
            
            ${this.gridChildren.map((e,i)=>{if(i<this.gridChildren.length-1){const r=this.orientation==="horizontal"?`${i*2+2}`:"1",o=this.orientation==="vertical"?`${i*2+2}`:"1";return p`
                        <div 
                            class="resize-handle"
                            style="
                                cursor: ${this.orientation==="horizontal"?"col-resize":"row-resize"};
                                grid-column: ${r};
                                grid-row: ${o};
                            "
                            @mousedown=${s=>this.startResize(s,i)}
                        ></div>
                    `}return R})}
        `}disconnectedCallback(){super.disconnectedCallback(),this.resizing&&this.stopResize(),this.mutationObserver&&(this.mutationObserver.disconnect(),this.mutationObserver=void 0)}connectedCallback(){super.connectedCallback(),this.style.height="100%",this.style.width="100%"}};mo([d()],yr.prototype,"orientation",2);mo([d()],yr.prototype,"sizes",2);mo([w()],yr.prototype,"gridSizes",2);mo([w()],yr.prototype,"gridChildren",2);yr=mo([v("lyra-resizable-grid")],yr);const Rl=(t,e)=>!t.leaf&&e.leaf?-1:t.leaf&&!e.leaf?1:t.label.localeCompare(e.label);var B0=Object.defineProperty,U0=Object.getOwnPropertyDescriptor,yn=(t,e,i,r)=>{for(var o=r>1?void 0:r?U0(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=(r?a(e,i,o):a(o))||o);return r&&o&&B0(e,i,o),o};const Lo=Qe("LyraFileBrowser"),fe=await Er(Object.assign({"./filebrowser.de.json":()=>Ot(()=>import("./filebrowser.de-BDyGxBGM.js"),[]),"./filebrowser.en.json":()=>Ot(()=>import("./filebrowser.en-DuKn3BNV.js"),[])})),V0=250;let so=class extends Qt{constructor(){super(...arguments),this.fileEditorOptions=[],this.treeRef=ci(),this.loadingNodes=new Set}doBeforeUI(){this.initializeWorkspace(),It(we,t=>{t.target==="system.icons"&&this.requestUpdate()}),this.subscribe(te,t=>this.onWorkspaceChanged(t)),this.subscribe(ti,t=>this.onWorkspaceConnected(t))}disconnectedCallback(){this.workspaceChangedDebounceId!==void 0&&(clearTimeout(this.workspaceChangedDebounceId),this.workspaceChangedDebounceId=void 0),this.pendingWorkspaceDir=void 0,super.disconnectedCallback()}firstUpdated(t){super.firstUpdated(t),this.setupDragAndDrop()}updated(t){super.updated(t),t.has("workspaceDir")&&this.workspaceDir&&this.setupDragAndDrop()}async initializeWorkspace(){const t=await Y.getWorkspace();await this.loadWorkspace(t??void 0)}renderToolbar(){return p`
            <lyra-command icon="folder-open" title="${fe.CONNECT_WORKSPACE}" dropdown="filebrowser.connections"></lyra-command>
            <lyra-command cmd="refresh_resource" icon="repeat" title="${fe.REFRESH_RESOURCE}"></lyra-command>
            <lyra-command cmd="touch" icon="plus" title="${fe.CREATE_NEW}" dropdown="filebrowser.create"></lyra-command>
        `}renderContextMenu(){const t=Le.get(),e=t instanceof qe?t:null,i=e&&this.fileEditorOptions.length>0;return p`
            <lyra-command cmd="open_editor" icon="folder-open">${fe.OPEN}</lyra-command>
            ${i?p`
                <wa-dropdown-item>
                    <lyra-icon name="folder-open" slot="icon"></lyra-icon>
                    ${fe.OPEN_WITH}
                    ${this.fileEditorOptions.map(r=>p`
                        <lyra-command
                            slot="submenu"
                            cmd="open_editor"
                            icon="${r.icon??"file"}"
                            .params=${{path:e.getWorkspacePath(),editorId:r.editorId}}>
                            ${r.title}
                        </lyra-command>
                    `)}
                </wa-dropdown-item>
            `:R}
            <lyra-command cmd="touch" icon="plus" dropdown="filebrowser.create">${fe.CREATE_NEW}</lyra-command>
        `}onWorkspaceChanged(t){this.pendingWorkspaceDir=t,this.workspaceChangedDebounceId!==void 0&&clearTimeout(this.workspaceChangedDebounceId),this.workspaceChangedDebounceId=setTimeout(()=>{this.workspaceChangedDebounceId=void 0;const e=this.pendingWorkspaceDir;this.pendingWorkspaceDir=void 0,e?this.applyWorkspaceChange(e):this.loadWorkspace(void 0,!0)},V0)}async applyWorkspaceChange(t){Le.set(void 0),await this.loadWorkspace(t,!0),await this.syncTreeSelection()}async onWorkspaceConnected(t){await this.loadWorkspace(t,!0)}async loadWorkspace(t,e=!1){this.workspaceDir=t,t?this.root=await this.resourceToTreeNode(t,!0,e):this.root=void 0}async syncTreeSelection(){await this.updateComplete;const e=this.treeRef.value?.querySelector("wa-tree")?.selectedItems||[];e.length>0&&Le.set(e[0].model?.data)}async resourceToTreeNode(t,e=!1,i=!1){const r=t instanceof qe,o={data:t,label:t.getName(),leaf:r,children:[]};if(t instanceof Re&&!t.getParent())try{const s=await Y.getFolderInfoForDirectory(t);s?.backendName&&(o.workspaceTag=s.backendName)}catch(s){Lo.debug("Failed to get workspace info for directory",s)}if(t instanceof Re&&e){for(const s of await t.listChildren(i)){const a=await this.resourceToTreeNode(s,!0);o.children.push(a)}o.children.sort(Rl)}return o}createTreeItems(t,e=!1){if(!t)return p``;const i=!t.leaf&&t.children.length===0,r=t.data,o=r instanceof qe,s=o?ur.getFileIcon(r.getName()):t.icon||"folder-open",a=t.workspaceTag;return p`
            <wa-tree-item 
                draggable=${o}
                @dragstart=${o?this.nobubble(l=>this.onDragStart(l,r)):void 0}
                @dblclick=${this.nobubble(this.onFileDoubleClicked)}
                @wa-lazy-load=${this.nobubble(l=>this.onLazyLoad(l,t))}
                .model=${t} 
                ?expanded=${e}
                ?lazy=${i}>
                <span class="tree-label">
                    <wa-icon name=${s} label="${t.leaf?fe.FILE:fe.FOLDER}"></wa-icon>
                    <span class="tree-label-text">${t.label}</span>
                    ${!t.leaf&&a?p`<wa-badge appearance="outlined" variant="neutral" style="font-size: var(--wa-font-size-xs);">${a}</wa-badge>`:null}
                </span>
                ${t.children.map(l=>this.createTreeItems(l,!1))}
            </wa-tree-item>`}onDragStart(t,e){if(!t.dataTransfer)return;const i=e.getWorkspacePath(),r=e.getName();if(t.dataTransfer.effectAllowed="copy",t.dataTransfer.setData("text/plain",i),t.dataTransfer.setData("application/x-workspace-file",i),t.dataTransfer.setData("text/uri-list",i),t.dataTransfer.setDragImage){const o=document.createElement("div");o.textContent=r,o.style.position="absolute",o.style.top="-1000px",o.style.padding="4px 8px",o.style.background="var(--wa-color-neutral-10)",o.style.border="1px solid var(--wa-color-neutral-30)",o.style.borderRadius="4px",document.body.appendChild(o),t.dataTransfer.setDragImage(o,0,0),setTimeout(()=>document.body.removeChild(o),0)}}async onLazyLoad(t,e){const i=e.data;i instanceof Re&&e.children.length===0&&await this.loadNodeChildren(e,i)}async loadNodeChildren(t,e){if(!this.loadingNodes.has(t)){this.loadingNodes.add(t);try{for(const i of await e.listChildren(!1)){Kl&&i.getName().startsWith(".");const r=await this.resourceToTreeNode(i,!1);t.children.push(r)}t.children.sort(Rl),this.requestUpdate()}catch(i){Lo.error("Failed to load directory children:",i)}finally{this.loadingNodes.delete(t)}}}async onFileDoubleClicked(t){const i=t.currentTarget.model.data;i instanceof qe&&(Le.set(i),this.executeCommand("open_editor",{}))}onSelectionChanged(t){const e=t.detail.selection;if(e&&e.length>0){const r=e[0].model.data;Le.set(r),r instanceof qe?(this.fileEditorOptions=ur.getEditorOptionsForInput(r),this.updateContextMenu()):(this.fileEditorOptions=[],this.updateContextMenu())}else Le.set(void 0),this.fileEditorOptions=[],this.updateContextMenu()}setupDragAndDrop(){const t=this.treeRef.value;if(!t)return;const e=s=>{if(!s.dataTransfer?.types.includes("Files"))return;s.preventDefault(),s.dataTransfer.dropEffect="copy",t.classList.add("drag-over");const l=s.target.closest("wa-tree-item");l&&l!==this.currentDropTarget&&(this.currentDropTarget?.classList.remove("drop-target"),this.currentDropTarget=l,l.classList.add("drop-target"))},i=s=>{s.dataTransfer?.types.includes("Files")&&(s.preventDefault(),t.classList.add("drag-over"))},r=s=>{const a=t.getBoundingClientRect(),l=s.clientX,c=s.clientY;(l<=a.left||l>=a.right||c<=a.top||c>=a.bottom)&&(t.classList.remove("drag-over"),this.currentDropTarget?.classList.remove("drop-target"),this.currentDropTarget=void 0)},o=async s=>{if(s.preventDefault(),t.classList.remove("drag-over"),this.currentDropTarget?.classList.remove("drop-target"),this.currentDropTarget=void 0,!s.dataTransfer||!this.workspaceDir)return;const a=Array.from(s.dataTransfer.files);if(a.length===0)return;const l=await this.getDropTarget(s);await this.handleFilesDrop(a,l)};t.removeEventListener("dragover",e),t.removeEventListener("dragenter",i),t.removeEventListener("dragleave",r),t.removeEventListener("drop",o),t.addEventListener("dragover",e),t.addEventListener("dragenter",i),t.addEventListener("dragleave",r),t.addEventListener("drop",o)}async getDropTarget(t){const i=t.target.closest("wa-tree-item");if(i){const o=i.model.data;if(o instanceof Re)return o;const s=o.getParent();if(s)return s}return this.workspaceDir}async handleFilesDrop(t,e){const i=t.length;let r=0,o=0,s=0;for(const a of t)try{const l=this.buildTargetPath(e,a.name);if(await this.workspaceDir.getResource(l)&&!await $c(fe.FILE_EXISTS_OVERWRITE({fileName:a.name}))){s++;continue}await(await this.workspaceDir.getResource(l,{create:!0})).saveContents(a),r++}catch(l){Lo.error(`Failed to upload ${a.name}:`,l),o++}Lo.info(`Uploaded ${r}/${i} files${s>0?`, ${s} skipped`:""}${o>0?`, ${o} failed`:""}`),await this.loadWorkspace(this.workspaceDir)}buildTargetPath(t,e){const i=t.getWorkspacePath();return i?`${i}/${e}`:e}render(){return p`
            <div class="tree" ${di(this.treeRef)} style="--drop-files-text: '${fe.DROP_FILES_HERE}'">
                ${lt(!this.workspaceDir,()=>p`
                    <lyra-no-content message="${fe.SELECT_WORKSPACE}"></lyra-no-content>`,()=>lt(this.root,()=>p`
                <wa-tree @wa-selection-change=${this.nobubble(this.onSelectionChanged)}
                         style="--indent-guide-width: 1px;">
                    ${this.root.children.map(t=>this.createTreeItems(t,!0))}
                </wa-tree>`,()=>p``))}
            </div>
        `}};so.styles=C`
        :host {
        }
        
        .tree {
            height: 100%;
            position: relative;
            transition: all 0.2s ease;
        }
        
        .tree.drag-over {
            background-color: var(--wa-color-brand-fill-quiet);
            outline: 2px dashed var(--wa-color-brand-border-normal);
            outline-offset: -4px;
            border-radius: var(--wa-border-radius-medium);
        }
        
        .tree.drag-over::before {
            content: var(--drop-files-text);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--wa-color-brand-fill-loud);
            color: var(--wa-color-brand-on-loud);
            padding: var(--wa-spacing-large);
            border-radius: var(--wa-border-radius-large);
            font-weight: bold;
            pointer-events: none;
            z-index: 1000;
            opacity: 0.3;
        }

        .tree-label {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }

        .tree-label-text {
            white-space: nowrap;
        }

        wa-tree-item.drop-target {
            background-color: var(--wa-color-brand-fill-loud);
            color: var(--wa-color-brand-on-loud);
            border-radius: var(--wa-border-radius-small);
            outline: 2px solid var(--wa-color-brand-border-loud);
            outline-offset: -2px;
        }
    `;yn([w()],so.prototype,"root",2);yn([w()],so.prototype,"fileEditorOptions",2);so=yn([v("lyra-filebrowser")],so);var q0=Object.getOwnPropertyDescriptor,H0=(t,e,i,r)=>{for(var o=r>1?void 0:r?q0(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=a(o)||o);return o};const Ta=await Er(Object.assign({"./tasks.de.json":()=>Ot(()=>import("./tasks.de-Bm0wNkDH.js"),[]),"./tasks.en.json":()=>Ot(()=>import("./tasks.en-eCglTKJa.js"),[])}));H.registerContribution(us,{component:"<lyra-tasks></lyra-tasks>"});let Fr=null;function td(){return Fr||(Fr=document.createElement("div"),Fr.id="progress-dialog-container",document.body.appendChild(Fr)),Fr}function Dl(){return td().querySelector("wa-dialog")}function W0(){ed(!0)}function ed(t=!1){const e=td(),i=lr.getActiveTasks();if(i.length===0){ae(p``,e);return}const o=Dl();if(!(t||o?.open===!0))return;const a=()=>{const h=Dl();h&&(h.open=!1)},l=()=>{ae(p``,e)},c=p`
        <wa-dialog 
            label="${Ta.ACTIVE_TASKS}" 
            open
            light-dismiss
            style="--width: 600px;"
            @wa-request-close=${a}
            @wa-after-hide=${l}
        >
            <style>
                .progress-dialog-content {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                
                .tasitem {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    padding: 1rem;
                    background: var(--wa-color-neutral-10);
                    border-radius: 8px;
                    border: 1px solid var(--wa-color-neutral-20);
                }
                
                :host-context(.wa-light) .tasitem {
                    background: var(--wa-color-neutral-95);
                    border: 1px solid var(--wa-color-neutral-85);
                }
                
                .tasheader {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                
                .tasname {
                    font-weight: 600;
                    font-size: 1rem;
                    color: var(--wa-color-neutral-90);
                }
                
                :host-context(.wa-light) .tasname {
                    color: var(--wa-color-neutral-10);
                }
                
                .tasmessage {
                    font-size: 0.875rem;
                    color: var(--wa-color-neutral-70);
                    margin-top: 0.25rem;
                }
                
                :host-context(.wa-light) .tasmessage {
                    color: var(--wa-color-neutral-30);
                }
                
                .tasprogress {
                    margin-top: 0.5rem;
                }
                
                wa-progress-bar {
                    --tracheight: 1.5rem;
                }
                
                wa-progress-bar::part(label) {
                    text-align: center;
                    width: 100%;
                    font-size: 0.875rem;
                }
                
                .no-tasks {
                    text-align: center;
                    padding: 2rem;
                    color: var(--wa-color-neutral-60);
                }
                
                :host-context(.wa-light) .no-tasks {
                    color: var(--wa-color-neutral-40);
                }
            </style>
            
            <div class="progress-dialog-content">
                ${i.map(h=>{const u=h.progress>=0||h.totalSteps>0,f=h.progress>=0?h.progress:h.totalSteps>0?Math.round(h.currentStep/h.totalSteps*100):0,m=h.progress<0&&h.totalSteps>0;return p`
                        <div class="tasitem">
                            <div class="tasheader">
                                <wa-icon name="hourglass" style="color: var(--wa-color-warning-fill-loud);"></wa-icon>
                                <div style="flex: 1;">
                                    <div class="tasname">${h.name}</div>
                                    ${h.message?p`
                                        <div class="tasmessage">${h.message}</div>
                                    `:""}
                                </div>
                            </div>
                            <div class="tasprogress">
                                ${u?p`
                                    <wa-progress-bar value="${f}">
                                        ${m?`${h.currentStep}/${h.totalSteps} - `:""}${f}%
                                    </wa-progress-bar>
                                `:p`
                                    <wa-progress-bar indeterminate></wa-progress-bar>
                                `}
                            </div>
                        </div>
                    `})}
            </div>
        </wa-dialog>
    `;ae(c,e)}let za=class extends Qt{doBeforeUI(){this.watch(da,()=>{ed(),this.requestUpdate()})}handleIndicatorClick(){W0()}render(){da.get();const e=lr.getActiveTasks().length;return e===0?p``:p`
            <div class="tasindicator" @click=${this.handleIndicatorClick} title="${Ta.ACTIVE_TASKS_TITLE({taskCount:e.toString()})}">
                <wa-spinner
                    style="font-size: 1rem; --indicator-color: var(--wa-color-warning-fill-loud);"
                    label="${Ta.ACTIVE_TASKS}"
                ></wa-spinner>
                <wa-badge appearance="outlined" variant="neutral" pill>${e}</wa-badge>
                <div class="tasbar-wrap"><wa-progress-bar indeterminate></wa-progress-bar></div>
            </div>
        `}};za.styles=C`
        :host {
            display: flex;
            align-items: center;
        }
        
        .tasindicator {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            transition: background-color 0.2s;
        }
        
        .tasindicator:hover {
            background: var(--wa-color-neutral-15);
        }
        
        :host-context(.wa-light) .tasindicator:hover {
            background: var(--wa-color-neutral-85);
        }
        
        .tascount {
            font-size: 0.875rem;
            color: var(--wa-color-neutral-70);
        }
        
        :host-context(.wa-light) .tascount {
            color: var(--wa-color-neutral-30);
        }
        
        .tasbar-wrap {
            width: 3rem;
        }
        
        .tasbar-wrap wa-progress-bar {
            --tracheight: 4px;
        }
    `;za=H0([v("lyra-tasks")],za);var j0=Object.getOwnPropertyDescriptor,K0=(t,e,i,r)=>{for(var o=r>1?void 0:r?j0(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=a(o)||o);return o};const sa=await Er(Object.assign({"./partname.de.json":()=>Ot(()=>import("./partname.de-iLAwhB2n.js"),[]),"./partname.en.json":()=>Ot(()=>import("./partname.en-DGb3aT7k.js"),[])}));H.registerContribution(us,{component:"<lyra-part-name></lyra-part-name>"});let Ol=class extends Ci{doBeforeUI(){this.watch(ee,()=>{this.requestUpdate()})}getPartName(){const t=ee.get();return t&&(t.tabContribution?.label||t.getAttribute("id"))||sa.NO_PART}render(){const e=ee.get()?.tabContribution?.icon||"box";return p`
            <wa-button 
                appearance="plain"
                size="small"
                title="${sa.ACTIVE_PART}">
                <lyra-icon slot="start" name="${e}" label="Part"></lyra-icon>
                ${this.getPartName()}
            </wa-button>
        `}};Ol=K0([v("lyra-part-name")],Ol);var G0=Object.defineProperty,X0=Object.getOwnPropertyDescriptor,go=(t,e,i,r)=>{for(var o=r>1?void 0:r?X0(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=(r?a(e,i,o):a(o))||o);return r&&o&&G0(e,i,o),o};const Y0=Qe("LyraExtensions"),gt=await Er(Object.assign({"./extensions.de.json":()=>Ot(()=>import("./extensions.de-C2K7_1Fj.js"),[]),"./extensions.en.json":()=>Ot(()=>import("./extensions.en-BWVq_zKr.js"),[])}));let Hi=class extends Qt{constructor(){super(...arguments),this.filterText="",this.showRegisterDialog=!1,this.registerExtensionData={}}doInitUI(){It(Ur,()=>{this.requestUpdate()})}onExtensionDblClick(){}enable(t){st.enable(t.id,!0),this.requestUpdate()}disable(t){st.disable(t.id,!0),this.requestUpdate()}isExtensionRequired(t){const e=si.getCurrentApp();return!e||!e.extensions?!1:e.extensions.includes(t)}selectionChanged(t){const e=t.detail.selection||[];e.length>0&&e[0].model?this.selectedExtension=e[0].model:this.selectedExtension=void 0}getFilteredExtensions(){if(!this.filterText.trim())return st.getExtensions();const t=this.filterText.toLowerCase();return st.getExtensions().filter(e=>String(e.name).toLowerCase().includes(t)||(e.description?String(e.description).toLowerCase().includes(t):!1)||e.id.toLowerCase().includes(t))}getGroupedExtensions(){const t=this.getFilteredExtensions(),e=[],i=[];return t.forEach(r=>{st.isEnabled(r.id)?e.push(r):i.push(r)}),e.sort((r,o)=>String(r.name).localeCompare(String(o.name))),i.sort((r,o)=>String(r.name).localeCompare(String(o.name))),{enabled:e,available:i}}isExternalExtension(t){return t.external===!0}handleFilterInput(t){this.filterText=t.target.value,this.requestUpdate()}clearFilter(){this.filterText="",this.requestUpdate()}async handleRegisterExtension(){try{const t=await np("Enter extension URL or source identifier:","",!1);if(!t)return;await lr.runAsync("Registering extension",async()=>{let e=t;Te.isGitHubUrl(t)&&(e=Te.convertGitHubUrlToSource(t));const i=Te.parseSource(e);i?.type==="github"?await this.fetchGitHubMetadata(i,e):(this.registerExtensionData={url:e,id:"",name:"",description:""},this.showRegisterDialog=!0,this.requestUpdate())})}catch(t){At(`Failed to register extension: ${t}`)}}async fetchGitHubMetadata(t,e){try{const i=await Te.fetchGitHubPackageJson(t),r=t.owner,o=t.repo,s=i.name||`ext.${r}-${o}`,a=i.name||`${r}/${o}`,l=i.description||"",c=i.version||"",h=i.author||(typeof i.author=="string"?i.author:i.author?.name)||"";this.registerExtensionData={id:s,name:a,description:l,url:e,version:c,author:h,icon:"puzzle-piece",external:!0},this.showRegisterDialog=!0,this.requestUpdate()}catch(i){Y0.warn(`Could not fetch package.json, using defaults: ${i}`),this.registerExtensionData={url:e,id:"",name:"",description:""},this.showRegisterDialog=!0,this.requestUpdate()}}async confirmRegisterExtension(){if(!this.registerExtensionData.url){At("URL is required");return}if(!this.registerExtensionData.id){At("Extension ID is required");return}if(!this.registerExtensionData.name){At("Extension name is required");return}try{await lr.runAsync("Registering extension",async()=>{const t={id:this.registerExtensionData.id,name:this.registerExtensionData.name,description:this.registerExtensionData.description,url:this.registerExtensionData.url,version:this.registerExtensionData.version,author:this.registerExtensionData.author,icon:this.registerExtensionData.icon||"puzzle-piece",external:!0};st.registerExtension(t),await st.loadExtensionFromUrl(this.registerExtensionData.url,t.id),oi(`Extension ${t.name} registered successfully`),this.showRegisterDialog=!1,this.registerExtensionData={},this.requestUpdate()})}catch(t){At(`Failed to register extension: ${t}`)}}cancelRegisterExtension(){this.showRegisterDialog=!1,this.registerExtensionData={},this.requestUpdate()}renderToolbar(){return p`
            <wa-input
                placeholder="${gt.FILTER_PLACEHOLDER}"
                .value=${this.filterText}
                @input=${t=>this.handleFilterInput(t)}
                @wa-clear=${()=>this.clearFilter()}
                with-clear
                size="small"
                style="width: 300px;">
                <wa-icon slot="start" name="magnifying-glass" label="Filter"></wa-icon>
            </wa-input>
            <wa-button 
                variant="primary" 
                appearance="plain"
                @click=${()=>this.handleRegisterExtension()}
                title="Register a new extension">
                <wa-icon name="plus" label="Add"></wa-icon>
                Register Extension
            </wa-button>
        `}render(){const t=this.getGroupedExtensions(),e=t.enabled.length>0||t.available.length>0;return p`
            ${lt(this.showRegisterDialog,()=>p`
                <wa-dialog 
                    label="Register Extension"
                    open
                    @wa-request-close=${()=>this.cancelRegisterExtension()}
                    style="--wa-dialog-width: 500px;">
                    <div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;">
                        <wa-input
                            label="Extension ID *"
                            .value=${this.registerExtensionData.id||""}
                            @input=${i=>{this.registerExtensionData.id=i.target.value,this.requestUpdate()}}
                            required
                            hint="Unique identifier for the extension (e.g., 'ext.my-extension')">
                        </wa-input>
                        
                        <wa-input
                            label="Name *"
                            .value=${this.registerExtensionData.name||""}
                            @input=${i=>{this.registerExtensionData.name=i.target.value,this.requestUpdate()}}
                            required
                            hint="Display name of the extension">
                        </wa-input>
                        
                        <wa-input
                            label="Description"
                            .value=${this.registerExtensionData.description||""}
                            @input=${i=>{this.registerExtensionData.description=i.target.value,this.requestUpdate()}}
                            hint="Description of what the extension does">
                        </wa-input>
                        
                        <wa-input
                            label="URL *"
                            .value=${this.registerExtensionData.url||""}
                            @input=${i=>{this.registerExtensionData.url=i.target.value,this.requestUpdate()}}
                            required
                            readonly
                            hint="Extension source URL or identifier">
                        </wa-input>
                        
                        <div style="display: flex; gap: 0.5rem;">
                            <wa-input
                                label="Version"
                                .value=${this.registerExtensionData.version||""}
                                @input=${i=>{this.registerExtensionData.version=i.target.value,this.requestUpdate()}}
                                style="flex: 1;"
                                hint="Extension version">
                            </wa-input>
                            
                            <wa-input
                                label="Author"
                                .value=${this.registerExtensionData.author||""}
                                @input=${i=>{this.registerExtensionData.author=i.target.value,this.requestUpdate()}}
                                style="flex: 1;"
                                hint="Extension author">
                            </wa-input>
                        </div>
                        
                        <wa-input
                            label="Icon"
                            .value=${this.registerExtensionData.icon||"puzzle-piece"}
                            @input=${i=>{this.registerExtensionData.icon=i.target.value,this.requestUpdate()}}
                            hint="Icon name (FontAwesome icon)">
                        </wa-input>
                        
                        <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1rem;">
                            <wa-button 
                                variant="default" 
                                @click=${()=>this.cancelRegisterExtension()}>
                                Cancel
                            </wa-button>
                            <wa-button 
                                variant="primary" 
                                @click=${()=>this.confirmRegisterExtension()}
                                ?disabled=${!this.registerExtensionData.id||!this.registerExtensionData.name||!this.registerExtensionData.url}>
                                Register
                            </wa-button>
                        </div>
                    </div>
                </wa-dialog>
            `)}
            <wa-split-panel position="30" class="extensions-split-panel">
                <div slot="start" class="extensions-tree-panel">
                    <wa-scroller class="extensions-tree-scroller" orientation="vertical">
                        <wa-tree 
                            selection="leaf"
                            style="--indent-guide-width: 1px;" 
                            @wa-selection-change="${this.selectionChanged}">
                            ${e?p`
                                ${t.enabled.length>0?p`
                                    <wa-tree-item expanded>
                                        <span>
                                            <wa-icon name="check-circle" style="color: var(--wa-color-success-50);"></wa-icon>
                                            ${gt.INSTALLED} (${t.enabled.length})
                                        </span>
                                        ${t.enabled.map(i=>{const r=this.isExternalExtension(i);return p`
                                                <wa-tree-item @dblclick=${this.nobubble(this.onExtensionDblClick)} .model=${i}>
                                                    <span><lyra-icon name="${i.icon}"></lyra-icon></span> ${i.name}${r?p` <span style="opacity: 0.6; font-size: 0.9em; margin-left: 0.5rem;">(External)</span>`:""}
                                                </wa-tree-item>
                                            `})}
                                    </wa-tree-item>
                                `:""}
                                ${t.available.length>0?p`
                                    <wa-tree-item expanded>
                                        <span>
                                            <wa-icon name="circle" style="color: var(--wa-color-neutral-50);"></wa-icon>
                                            ${gt.AVAILABLE} (${t.available.length})
                                        </span>
                                        ${t.available.map(i=>{const r=this.isExternalExtension(i);return p`
                                                <wa-tree-item @dblclick=${this.nobubble(this.onExtensionDblClick)} .model=${i}>
                                                    <span><lyra-icon name="${i.icon}"></lyra-icon></span> ${i.name}${r?p` <span style="opacity: 0.6; font-size: 0.9em; margin-left: 0.5rem;">(External)</span>`:""}
                                                </wa-tree-item>
                                            `})}
                                    </wa-tree-item>
                                `:""}
                            `:""}
                            ${e?"":p`
                                <div style="padding: 1em; text-align: center; opacity: 0.7;">
                                    ${gt.NO_MATCHES({filterText:this.filterText})}
                                </div>
                            `}
                        </wa-tree>
                    </wa-scroller>
                </div>
                <wa-scroller slot="end" class="extensions-detail-scroller" orientation="vertical">
                <div class="extensions-detail-content">
                    ${lt(this.selectedExtension,i=>{const r=this.isExternalExtension(i),o=st.isEnabled(i.id);return p`
                                <h1><lyra-icon name="${i.icon}"></lyra-icon> ${i.name}${r?" (External)":""}</h1>
                                ${lt(r,()=>p`
                                    <div class="marketplace-badge">
                                        <wa-icon name="store"></wa-icon>
                                        <span>${gt.EXTERNAL_EXTENSION}</span>
                                    </div>
                                `)}
                                <hr>
                                <div>
                                    ${lt(o,()=>p`
                                        <wa-button 
                                            title="${this.isExtensionRequired(i.id)?gt.REQUIRED_HINT:gt.DISABLE_TITLE}" 
                                            @click="${()=>this.disable(i)}"
                                            variant="danger" 
                                            appearance="plain"
                                            ?disabled=${this.isExtensionRequired(i.id)}>
                                            <wa-icon name="xmark" label="Uninstall"></wa-icon>&nbsp;${gt.UNINSTALL}
                                        </wa-button>
                                        ${lt(this.isExtensionRequired(i.id),()=>p`
                                            <div class="required-hint">
                                                <wa-icon name="info-circle" style="color: var(--wa-color-primary-50);"></wa-icon>
                                                <span>${gt.REQUIRED_HINT}</span>
                                            </div>
                                        `)}
                                    `,()=>p`
                                        <wa-button 
                                            title="${gt.ENABLE_TITLE}" 
                                            @click="${()=>this.enable(i)}"
                                            variant="brand" 
                                            appearance="plain">
                                            <wa-icon name="download" label="Install"></wa-icon>&nbsp;${gt.INSTALL}
                                        </wa-button>
                                    `)}
                                </div>

                                ${lt(i.experimental,()=>p`
                                    <div style="margin-top: 1em;">
                                        <wa-button size="small" variant="warning" appearance="plain">
                                            <wa-icon name="triangle-exclamation" label="Warning"></wa-icon>
                                        </wa-button>
                                        <small><i>${gt.EXPERIMENTAL}</i></small>
                                    </div>
                                `)}

                                ${lt(i.version||i.author,()=>p`
                                    <div style="margin-top: 1em; display: flex; flex-direction: column; gap: 0.5rem;">
                                        ${lt(i.version,()=>p`
                                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                                <wa-icon name="tag" style="font-size: 0.9em; opacity: 0.7;"></wa-icon>
                                                <span style="font-size: 0.9em; opacity: 0.8;">${gt.VERSION} <strong>${i.version}</strong></span>
                                            </div>
                                        `)}
                                        ${lt(i.author,()=>p`
                                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                                <wa-icon name="user" style="font-size: 0.9em; opacity: 0.7;"></wa-icon>
                                                <span style="font-size: 0.9em; opacity: 0.8;">${gt.AUTHOR} <strong>${i.author}</strong></span>
                                            </div>
                                        `)}
                                    </div>
                                `)}

                                <p style="margin-top: 1em;">${i.description}</p>

                                ${lt(i.dependencies&&i.dependencies.length>0,()=>p`
                                    <div style="margin-top: 1.5em;">
                                        <h3 style="margin-bottom: 0.5em;">
                                            <wa-icon name="puzzle-piece" style="font-size: 0.9em;"></wa-icon>
                                            ${gt.DEPENDENCIES}
                                        </h3>
                                        <div class="dependencies-list">
                                            ${i.dependencies.map(s=>{const a=st.getExtensions().find(c=>c.id===s),l=st.isEnabled(s);return p`
                                                    <div class="dependency-item">
                                                        <wa-icon 
                                                            name="${l?"check-circle":"circle"}" 
                                                            style="color: ${l?"var(--wa-color-success-50)":"var(--wa-color-neutral-50)"};">
                                                        </wa-icon>
                                                        <lyra-icon name="${a?.icon||"puzzle-piece"}"></lyra-icon>
                                                        <span>${a?.name||s}</span>
                                                        ${l?"":p`
                                                            <span class="dependency-badge">${gt.NOT_INSTALLED}</span>
                                                        `}
                                                    </div>
                                                `})}
                                        </div>
                                        <small style="opacity: 0.7; display: block; margin-top: 0.5em;">
                                            <wa-icon name="info-circle" style="font-size: 0.9em;"></wa-icon>
                                            ${gt.DEPENDENCIES_HINT}
                                        </small>
                                    </div>
                                `)}
                            `})}
                </div>
                </wa-scroller>
            </wa-split-panel>
        `}};Hi.styles=C`
        :host {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .extensions-split-panel {
            flex: 1;
            min-height: 0;
            height: 100%;
        }

        .extensions-tree-panel {
            display: flex;
            flex-direction: column;
            height: 100%;
            min-height: 0;
            overflow: hidden;
        }

        .extensions-tree-scroller {
            flex: 1;
            min-height: 0;
        }

        .extensions-detail-scroller {
            height: 100%;
            min-height: 0;
        }

        .extensions-detail-content {
            padding: 1em;
        }

        wa-tree-item > span {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        wa-tree-item:has(> wa-tree-item) {
            font-weight: 500;
        }

        .dependencies-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .dependency-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem;
            border-radius: 4px;
            background: var(--wa-color-surface-variant);
        }

        .dependency-item wa-icon:first-child {
            flex-shrink: 0;
        }

        .dependency-item icon {
            flex-shrink: 0;
        }

        .dependency-item span:not(.dependency-badge) {
            flex: 1;
        }

        .dependency-badge {
            font-size: 0.85rem;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            background: var(--wa-color-warning-100);
            color: var(--wa-color-warning-900);
        }

        .required-hint {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 0.75rem;
            padding: 0.5rem;
            border-radius: 4px;
            background: var(--wa-color-primary-10);
            color: var(--wa-color-primary-70);
            font-size: 0.875rem;
        }

        .required-hint wa-icon {
            flex-shrink: 0;
        }

        .required-hint span {
            line-height: 1.4;
        }

        .marketplace-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.375rem 0.875rem;
            border-radius: 4px;
            background: var(--wa-color-primary-10);
            color: var(--wa-color-primary-70);
            font-size: 0.875rem;
            font-weight: 500;
            margin-top: 0.75rem;
            margin-bottom: 0.5rem;
            border: 1px solid var(--wa-color-primary-30);
        }
    `;go([w()],Hi.prototype,"selectedExtension",2);go([w()],Hi.prototype,"filterText",2);go([w()],Hi.prototype,"showRegisterDialog",2);go([w()],Hi.prototype,"registerExtensionData",2);Hi=go([v("lyra-extensions")],Hi);var Z0=Object.defineProperty,Q0=Object.getOwnPropertyDescriptor,_s=(t,e,i,r)=>{for(var o=r>1?void 0:r?Q0(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=(r?a(e,i,o):a(o))||o);return r&&o&&Z0(e,i,o),o};const bt=await Er(Object.assign({"./logterminal.de.json":()=>Ot(()=>import("./logterminal.de-EcKGbnDh.js"),[]),"./logterminal.en.json":()=>Ot(()=>import("./logterminal.en-DpFjNbQM.js"),[])}));let xr=class extends Qt{constructor(){super(...arguments),this.messages=[],this.autoScroll=!0,this.filter="all",this.containerRef=ci()}connectedCallback(){super.connectedCallback(),this.loadSettings(),qd(this.log.bind(this))}disconnectedCallback(){super.disconnectedCallback(),Hd()}log(t,e,i="info"){const r={timestamp:new Date,level:i,source:t,message:e};this.messages=[...this.messages,r],this.updateToolbar(),this.autoScroll&&this.updateComplete.then(()=>{const o=this.containerRef.value;o&&(o.scrollTop=o.scrollHeight)})}clear(){this.messages=[],this.updateToolbar()}getFilteredMessages(){return this.filter==="all"?this.messages:this.messages.filter(t=>t.level===this.filter)}formatTimestamp(t){return t.toLocaleTimeString("en-US",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"})}getLevelIcon(t){switch(t){case"info":return"circle-info";case"warning":return"triangle-exclamation";case"error":return"circle-xmark";case"debug":return"bug"}}getLevelColor(t){switch(t){case"info":return"var(--wa-color-primary-text, #0066cc)";case"warning":return"var(--wa-color-warning-text, #ff9800)";case"error":return"var(--wa-color-danger-text, #dc3545)";case"debug":return"var(--wa-color-neutral-text-subtle, #6c757d)"}}renderToolbar(){const t=this.messages.filter(o=>o.level==="info").length,e=this.messages.filter(o=>o.level==="warning").length,i=this.messages.filter(o=>o.level==="error").length,r=this.messages.filter(o=>o.level==="debug").length;return p`
            <lyra-command 
                icon="list"
                title="${bt.ALL_LOGS}"
                appearance="${this.filter==="all"?"filled":"plain"}"
                variant="${this.filter==="all"?"brand":"neutral"}"
                .action=${()=>{this.filter="all",this.saveSettings(),this.updateToolbar()}}>
                ${bt.ALL} (${this.messages.length})
            </lyra-command>

            <lyra-command 
                icon="circle-info"
                title="${bt.INFO_LOGS}"
                appearance="${this.filter==="info"?"filled":"plain"}"
                variant="${this.filter==="info"?"brand":"neutral"}"
                .action=${()=>{this.filter="info",this.saveSettings(),this.updateToolbar()}}>
                ${bt.INFO}${t>0?` (${t})`:""}
            </lyra-command>

            <lyra-command 
                icon="triangle-exclamation"
                title="${bt.WARNING_LOGS}"
                appearance="${this.filter==="warning"?"filled":"plain"}"
                variant="${this.filter==="warning"?"brand":"neutral"}"
                .action=${()=>{this.filter="warning",this.saveSettings(),this.updateToolbar()}}>
                ${bt.WARNINGS}${e>0?` (${e})`:""}
            </lyra-command>

            <lyra-command 
                icon="circle-xmark"
                title="${bt.ERROR_LOGS}"
                appearance="${this.filter==="error"?"filled":"plain"}"
                variant="${this.filter==="error"?"brand":"neutral"}"
                .action=${()=>{this.filter="error",this.saveSettings(),this.updateToolbar()}}>
                ${bt.ERRORS}${i>0?` (${i})`:""}
            </lyra-command>

            <lyra-command 
                icon="bug"
                title="${bt.DEBUG_LOGS}"
                appearance="${this.filter==="debug"?"filled":"plain"}"
                variant="${this.filter==="debug"?"brand":"neutral"}"
                .action=${()=>{this.filter="debug",this.saveSettings(),this.updateToolbar()}}>
                ${bt.DEBUG}${r>0?` (${r})`:""}
            </lyra-command>

            <wa-divider orientation="vertical"></wa-divider>

            <lyra-command 
                icon="arrow-down" 
                title="${this.autoScroll?bt.AUTO_SCROLL_ENABLED:bt.AUTO_SCROLL_DISABLED}"
                appearance="${this.autoScroll?"filled":"plain"}"
                variant="${this.autoScroll?"brand":"neutral"}"
                .action=${()=>{this.autoScroll=!this.autoScroll,this.saveSettings(),this.updateToolbar()}}>
                ${this.autoScroll?bt.AUTO_SCROLL:bt.MANUAL}
            </lyra-command>

            <lyra-command 
                icon="trash" 
                title="${bt.CLEAR_LOGS}"
                .action=${()=>this.clear()}>
                ${bt.CLEAR}
            </lyra-command>
        `}render(){const t=this.getFilteredMessages();return p`
            <div class="log-terminal">
                <div class="messages" ${di(this.containerRef)}>
                    ${t.length===0?p`<div class="empty-state">${bt.NO_LOG_MESSAGES}</div>`:t.map(e=>p`
                            <div class="message" data-level="${e.level}">
                                <span class="timestamp">${this.formatTimestamp(e.timestamp)}</span>
                                <wa-icon 
                                    name="${this.getLevelIcon(e.level)}" 
                                    label="${e.level}"
                                    style="color: ${this.getLevelColor(e.level)}">
                                </wa-icon>
                                <span class="source">[${e.source}]</span>
                                <span class="text">${e.message}</span>
                            </div>
                        `)}
                </div>
            </div>
        `}async loadSettings(){const t=await this.getDialogSetting();t&&(typeof t.filter=="string"&&(t.filter==="all"||["info","warning","error","debug"].includes(t.filter))&&(this.filter=t.filter),typeof t.autoScroll=="boolean"&&(this.autoScroll=t.autoScroll),this.updateToolbar())}async saveSettings(){await this.setDialogSetting({filter:this.filter,autoScroll:this.autoScroll})}};xr.styles=C`
        :host {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
        }

        .log-terminal {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
        }

        .messages {
            flex: 1;
            overflow-y: auto;
            padding: 0.5rem;
            font-family: var(--wa-font-mono);
            font-size: 0.875rem;
            line-height: 1.5;
        }

        .message {
            display: flex;
            gap: 0.5rem;
            padding: 0.25rem 0.5rem;
            align-items: baseline;
            border-radius: var(--wa-border-radius-small);
        }

        .message:hover {
            background: var(--wa-color-neutral-background-hover);
        }

        .timestamp {
            color: var(--wa-color-neutral-text-subtle);
            font-size: 0.75rem;
            white-space: nowrap;
        }

        .source {
            color: var(--wa-color-primary-text);
            font-weight: 500;
            white-space: nowrap;
        }

        .text {
            color: var(--wa-color-neutral-text);
            word-break: breaword;
        }

        .message[data-level="error"] .text {
            color: var(--wa-color-danger-text);
        }

        .message[data-level="warning"] .text {
            color: var(--wa-color-warning-text);
        }

        .message[data-level="debug"] .text {
            color: var(--wa-color-neutral-text-subtle);
        }

        .empty-state {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: var(--wa-color-neutral-text-subtle);
            font-style: italic;
        }

        wa-icon {
            flex-shrink: 0;
        }
    `;_s([w()],xr.prototype,"messages",2);_s([w()],xr.prototype,"autoScroll",2);_s([w()],xr.prototype,"filter",2);xr=_s([v("lyra-log-terminal")],xr);var J0=Object.defineProperty,tw=Object.getOwnPropertyDescriptor,ce=(t,e,i,r)=>{for(var o=r>1?void 0:r?tw(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=(r?a(e,i,o):a(o))||o);return r&&o&&J0(e,i,o),o};const ew=await Er(Object.assign({"./fastviews.de.json":()=>Ot(()=>import("./fastviews.de-CU9Rj7sS.js"),[]),"./fastviews.en.json":()=>Ot(()=>import("./fastviews.en-DnZQwCTs.js"),[])}));let Wt=class extends co{constructor(){super(...arguments),this.target="",this.title="",this.disabled=!1,this.appearance="plain",this.size="small",this.placement="bottom-start",this.tabContributions=[],this.drawerOpen=!1,this.drawerSize="50vw",this.drawerRef=ci(),this.tabsRef=ci(),this.resizeHandleRef=ci(),this.resizing=null}getDrawerTabsId(){return`fastviews-drawer-tabs-${this.target}`}handleTabClick(t){if(!this.disabled)if(this.containerId){const e=document.querySelector(`lyra-tabs#${this.containerId}`);if(!e){console.error(`fastviews: Tab container with id "${this.containerId}" not found`);return}e.open(t)}else this.drawerOpen=!0,this.updateComplete.then(()=>{const e=this.tabsRef.value;e&&e.open(t)})}handleDrawerHide(){this.drawerOpen=!1}startResize(t){t.preventDefault(),t.stopPropagation();const e=this.drawerRef.value;if(!e)return;let r=(()=>{const a=e.shadowRoot?.querySelector('[part="panel"]');if(a&&a.offsetWidth>0)return a.offsetWidth;const h=(window.getComputedStyle(e).getPropertyValue("--size")||this.drawerSize).match(/^(\d+(?:\.\d+)?)(px|vw|vh|%)$/);if(h){const u=parseFloat(h[1]),f=h[2];if(f==="px")return u;if(f==="vw")return u/100*window.innerWidth;if(f==="vh")return u/100*window.innerHeight;if(f==="%")return u/100*window.innerWidth}return 0})();r===0&&(r=window.innerWidth*.5);const o=a=>{this.resizing&&(a.preventDefault(),a.stopPropagation(),this.resizing.rafId!==null&&cancelAnimationFrame(this.resizing.rafId),this.resizing.rafId=requestAnimationFrame(()=>{if(!this.resizing)return;const l=this.resizing.startX-a.clientX,c=Math.round(this.resizing.startSize+l),h=200,u=Math.round(window.innerWidth*.9);if(c>=h&&c<=u){this.drawerSize=`${c}px`;const f=this.drawerRef.value;f&&(f.style.setProperty("--size",this.drawerSize),f.style.setProperty("transition","none"))}this.resizing.rafId=null}))},s=()=>{if(this.resizing){this.resizing.rafId!==null&&(cancelAnimationFrame(this.resizing.rafId),this.resizing.rafId=null),document.removeEventListener("mousemove",this.resizing.handleMouseMove),document.removeEventListener("mouseup",this.resizing.handleMouseUp),document.body.style.cursor="",document.body.style.userSelect="";const a=this.drawerRef.value;a&&a.style.removeProperty("transition"),this.resizing=null}};this.resizing={startX:t.clientX,startSize:r,handleMouseMove:o,handleMouseUp:s,rafId:null},document.addEventListener("mousemove",o,{passive:!1}),document.addEventListener("mouseup",s,{passive:!1}),document.body.style.cursor="col-resize",document.body.style.userSelect="none"}doBeforeUI(){this.target&&(this.loadTabContributions(),It(we,t=>{this.target&&t.target===this.target&&this.loadTabContributions()}))}loadTabContributions(){if(!this.target)return;const t=H.getContributions(this.target);this.tabContributions=t.filter(e=>"name"in e),this.requestUpdate()}renderTabContribution(t){return p`
            <wa-dropdown-item 
                @click=${()=>this.handleTabClick(t)}>
                <lyra-icon name="${t.icon||""}" label="${t.label}" slot="icon"></lyra-icon>
                ${t.label}
            </wa-dropdown-item>
        `}render(){return!this.target||this.tabContributions.length===0?R:p`
            <wa-dropdown placement=${this.placement}>
                <wa-button 
                    slot="trigger"
                    appearance=${this.appearance}
                    size=${this.size}
                    ?disabled=${this.disabled}
                    with-caret
                    title=${this.title}>
                    <lyra-icon slot="start" name="${this.icon}" label="${this.title}"></lyra-icon>
                    <slot></slot>
                </wa-button>
                
                ${this.title?p`
                    <h6 style="padding: var(--wa-space-xs) var(--wa-space-s); margin: 0; color: var(--wa-color-neutral-50); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                        ${this.title}
                    </h6>
                `:R}
                
                ${this.tabContributions.map(t=>this.renderTabContribution(t))}
            </wa-dropdown>

            ${this.containerId?R:p`
                <wa-drawer 
                    ${di(this.drawerRef)}
                    label="${this.title||ew.FAST_VIEWS}"
                    placement="end"
                    ?open=${this.drawerOpen}
                    @wa-hide=${this.handleDrawerHide}
                    style="--size: ${this.drawerSize};">
                    <div 
                        ${di(this.resizeHandleRef)}
                        class="resize-handle"
                        @mousedown=${this.startResize}>
                    </div>
                    <lyra-tabs 
                        ${di(this.tabsRef)}
                        id="${this.getDrawerTabsId()}"
                        style="width: 100%; height: 100%; display: flex; flex-direction: column;">
                    </lyra-tabs>
                </wa-drawer>
            `}
        `}};Wt.styles=C`
        :host {
            display: inline-block;
        }

        wa-drawer {
            position: relative;
        }

        wa-drawer::part(panel) {
            position: relative;
        }

        .resize-handle {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            cursor: col-resize;
            z-index: 1000;
            background: transparent;
            transition: background-color 0.2s;
            user-select: none;
            touch-action: none;
        }

        .resize-handle:hover {
            background: var(--wa-color-brand-fill-loud);
        }

        .resize-handle:active {
            background: var(--wa-color-brand-fill-loud);
        }
    `;ce([d()],Wt.prototype,"target",2);ce([d()],Wt.prototype,"title",2);ce([d()],Wt.prototype,"icon",2);ce([d({type:Boolean})],Wt.prototype,"disabled",2);ce([d()],Wt.prototype,"appearance",2);ce([d()],Wt.prototype,"size",2);ce([d()],Wt.prototype,"placement",2);ce([d()],Wt.prototype,"containerId",2);ce([w()],Wt.prototype,"tabContributions",2);ce([w()],Wt.prototype,"drawerOpen",2);ce([w()],Wt.prototype,"drawerSize",2);Wt=ce([v("lyra-fastviews")],Wt);var iw=Object.getOwnPropertyDescriptor,rw=(t,e,i,r)=>{for(var o=r>1?void 0:r?iw(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=a(o)||o);return o};function ow(){let t=document.getElementById("global-dialog-container");return t||(t=document.createElement("div"),t.id="global-dialog-container",document.body.appendChild(t)),t}const id=t=>{try{return new Intl.DisplayNames([t],{type:"language"}).of(t)||t.toUpperCase()}catch{return t.toUpperCase()}},sw=()=>[...Ka.get()].sort(),aw=async()=>{const t=sw(),e=Ii.get();return new Promise(i=>{const r=ow();let o=!1;const s=()=>{const h=r.querySelector("wa-dialog");h&&!o&&(h.open=!1)},a=()=>{o||(o=!0,ae(p``,r),i())},l=async h=>{await ct.set(Wo,h),s()},c=p`
            <wa-dialog 
                label="Select Language" 
                open 
                light-dismiss
                @wa-request-close=${s}
                @wa-after-hide=${a}>
                <style>
                    .language-list {
                        display: flex;
                        flex-direction: column;
                        gap: 0.5rem;
                        padding: 1rem;
                        min-width: 300px;
                        max-height: 400px;
                        overflow-y: auto;
                    }
                    
                    .language-item {
                        display: flex;
                        align-items: center;
                        padding: 0.75rem;
                        border-radius: var(--wa-border-radius-small);
                        cursor: pointer;
                        transition: background-color 0.2s;
                    }
                    
                    .language-item:hover {
                        background-color: var(--wa-color-neutral-fill-quiet);
                    }
                    
                    .language-item.active {
                        background-color: var(--wa-color-brand-fill-quiet);
                        font-weight: 600;
                    }
                    
                    .language-code {
                        font-family: monospace;
                        margin-right: 0.75rem;
                        min-width: 3rem;
                        color: var(--wa-color-neutral-600);
                    }
                    
                    .language-name {
                        flex: 1;
                    }
                </style>
                
                <div class="language-list">
                    ${t.map(h=>p`
                        <div 
                            class="language-item ${h===e?"active":""}"
                            @click=${()=>l(h)}>
                            <span class="language-code">${h.toUpperCase()}</span>
                            <span class="language-name">${id(h)}</span>
                        </div>
                    `)}
                </div>
            </wa-dialog>
        `;ae(c,r)})};let Ra=class extends Ci{render(){const t=Ii.get(),e=id(t),i=`${t.toUpperCase()} ${e}`;return p`
            <wa-button 
                appearance="plain" 
                size="small"
                title="Current language: ${e}"
                @click=${()=>aw()}>
                ${i}
            </wa-button>
        `}};Ra.styles=C`
        :host {
            display: inline-block;
        }
    `;Ra=rw([v("lyra-language-selector")],Ra);var nw=Object.defineProperty,lw=Object.getOwnPropertyDescriptor,rd=(t,e,i,r)=>{for(var o=r>1?void 0:r?lw(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=(r?a(e,i,o):a(o))||o);return r&&o&&nw(e,i,o),o};let ns=class extends Ci{constructor(){super(...arguments),this.currentLayoutId="standard"}doBeforeUI(){this.currentLayoutId=si.getCurrentLayoutId();const t=()=>{this.currentLayoutId=si.getCurrentLayoutId(),this.requestUpdate()};return window.addEventListener("app-loaded",t),window.addEventListener("layout-changed",t),()=>{window.removeEventListener("app-loaded",t),window.removeEventListener("layout-changed",t)}}async handleSelect(t){const e=t.detail?.item?.value;if(!(!e||e===this.currentLayoutId))try{await si.setPreferredLayoutId(e)}catch(i){console.error("Failed to switch layout:",i)}}render(){const t=si.getRegisteredLayouts();if(t.length<=1)return p``;const i=t.find(r=>r.id===this.currentLayoutId)?.name??this.currentLayoutId;return p`
            <wa-dropdown
                placement="bottom-end"
                distance="4"
                size="small"
                @wa-select=${this.handleSelect}>
                <wa-button
                    slot="trigger"
                    appearance="plain"
                    size="small"
                    with-caret
                    title="Switch layout (current: ${i})">
                    <wa-icon name="table-cells" label="Layout"></wa-icon>
                </wa-button>
                ${t.map(r=>p`
                        <wa-dropdown-item
                            value="${r.id}"
                            type="checkbox"
                            ?checked=${r.id===this.currentLayoutId}>
                            ${r.icon?p`<lyra-icon slot="icon" name="${r.icon}" label="${r.name}"></lyra-icon>`:""}
                            ${r.name}
                        </wa-dropdown-item>
                    `)}
            </wa-dropdown>
        `}};ns.styles=C`
        :host {
            display: inline-block;
        }
    `;rd([w()],ns.prototype,"currentLayoutId",2);ns=rd([v("lyra-layout-switcher")],ns);var cw=Object.defineProperty,dw=Object.getOwnPropertyDescriptor,xn=(t,e,i,r)=>{for(var o=r>1?void 0:r?dw(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=(r?a(e,i,o):a(o))||o);return r&&o&&cw(e,i,o),o};let ao=class extends co{constructor(){super(...arguments),this.message="No content.",this.icon="info-circle"}render(){return p`
            <h3>
                <wa-icon name=${this.icon} label="${this.message}"></wa-icon>
                ${this.message}
            </h3>
        `}};ao.styles=C`
        :host {
            display: flex;
            margin: 10px;
        }

        * {
            flex: 1;
        }
    `;xn([d()],ao.prototype,"message",2);xn([d()],ao.prototype,"icon",2);ao=xn([v("lyra-no-content")],ao);const hw="view.filebrowser",uw="view.logTerminal",pw="toolbar.info",fw="toolbar.fastViews",mw="toolbar.languageSelector",gw="toolbar.appSwitcher";H.registerContribution(Bo,{name:hw,label:"Workspace",icon:"folder-open",component:t=>p`<lyra-filebrowser id="${t}"></lyra-filebrowser>`});H.registerContribution(Ba,{name:uw,label:"Log Messages",icon:"list",component:t=>p`<lyra-log-terminal id="${t}"></lyra-log-terminal>`});H.registerContribution(no,{name:pw,label:"Info",icon:"circle-info",command:"show_version_info",showLabel:!0});H.registerContribution(no,{name:fw,label:"Fast Views",component:'<lyra-fastviews target="system.fastviews-bottomend" icon="bolt" title="Fast Views"></lyra-fastviews>'});H.registerContribution(no,{name:mw,label:"Language",component:()=>p`<lyra-language-selector></lyra-language-selector>`});H.registerContribution(Cr,{name:gw,label:"App Switcher",component:()=>p`<lyra-layout-switcher></lyra-layout-switcher>`});var bw=Object.defineProperty,ww=Object.getOwnPropertyDescriptor,bo=(t,e,i,r)=>{for(var o=r>1?void 0:r?ww(e,i):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(o=(r?a(e,i,o):a(o))||o);return r&&o&&bw(e,i,o),o};let kr=class extends an{constructor(){super(...arguments),this.showBottomSidebar=!1,this.showBottomPanel=!1,this.showLeftSidebar=!0,this.showAuxSidebar=!0}createRenderRoot(){return this}getGridSizes(){return this.showLeftSidebar&&this.showAuxSidebar?"15%, 65%, 20%":this.showLeftSidebar?"15%, 85%":this.showAuxSidebar?"80%, 20%":"100%"}render(){return p`
            <style>
                *, *::before, *::after {
                    box-sizing: border-box;
                }
                
                html {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                }
                
                body {
                    height: 100%;
                    width: 100%;
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }
                
                lyra-standard-layout {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    width: 100%;
                }
                
                lyra-standard-layout .toolbar-top {
                    width: 100%;
                    display: grid;
                    grid-template-columns: 1fr 2fr 1fr;
                    align-items: center;
                    border-bottom: solid var(--wa-border-width-s) var(--wa-color-neutral-border-loud);
                    flex-shrink: 0;
                }
                
                lyra-standard-layout .toolbar-bottom {
                    width: 100%;
                    border-top: solid var(--wa-border-width-s) var(--wa-color-neutral-border-loud);
                    display: grid;
                    grid-template-columns: 1fr 2fr auto;
                    align-items: center;
                    flex-shrink: 0;
                    min-height: 32px;
                    padding: 0 var(--wa-space-s);
                    box-sizing: border-box;
                }
                
                lyra-standard-layout .main-layout {
                    flex: 1;
                    min-height: 0;
                }
                
                lyra-standard-layout .toolbar-end {
                    justify-self: end;
                }
            </style>
            
            <div class="toolbar-top">
                <lyra-toolbar id=${Ul}></lyra-toolbar>
                <lyra-toolbar id=${Vl}></lyra-toolbar>
                <lyra-toolbar class="toolbar-end" id=${Cr}></lyra-toolbar>
            </div>
            
            <lyra-resizable-grid 
                class="main-layout"
                id="main-layout" 
                orientation="horizontal" 
                sizes=${this.getGridSizes()}>
                
                ${this.showLeftSidebar?p`
                        ${this.showBottomSidebar?p`
                                <lyra-resizable-grid 
                                    id="left-sidebar-split" 
                                    orientation="vertical" 
                                    sizes="50%, 50%">
                                    <lyra-tabs id="${Bo}"></lyra-tabs>
                                    <lyra-tabs id="${Wl}"></lyra-tabs>
                                </lyra-resizable-grid>
                            `:p`<lyra-tabs id="${Bo}"></lyra-tabs>`}
                    `:R}
                
                ${this.showBottomPanel?p`
                        <lyra-resizable-grid 
                            id="editor-area-split" 
                            orientation="vertical" 
                            sizes="70%, 30%">
                            <lyra-tabs id="${ri}"></lyra-tabs>
                            <lyra-tabs id="${Ba}"></lyra-tabs>
                        </lyra-resizable-grid>
                    `:p`<lyra-tabs id="${ri}"></lyra-tabs>`}
                
                ${this.showAuxSidebar?p`<lyra-tabs id="${jl}"></lyra-tabs>`:R}
            </lyra-resizable-grid>
            
            <div class="toolbar-bottom">
                <lyra-toolbar id=${ql}></lyra-toolbar>
                <lyra-toolbar id=${us}></lyra-toolbar>
                <lyra-toolbar class="toolbar-end" id=${no}></lyra-toolbar>
            </div>
        `}};bo([d({type:Boolean,attribute:"show-bottom-sidebar"})],kr.prototype,"showBottomSidebar",2);bo([d({type:Boolean,attribute:"show-bottom-panel"})],kr.prototype,"showBottomPanel",2);bo([d({type:Boolean,attribute:"show-left-sidebar"})],kr.prototype,"showLeftSidebar",2);bo([d({type:Boolean,attribute:"show-aux-sidebar"})],kr.prototype,"showAuxSidebar",2);kr=bo([v("lyra-standard-layout")],kr);const vw=[{id:"standard",name:"Standard",label:"Standard",icon:"lyra layout-standard",component:"lyra-standard-layout"},{id:"standard-bottom-panel",name:"Standard (bottom panel)",label:"Standard (bottom panel)",icon:"lyra layout-standard-bottom-panel",component:{tag:"lyra-standard-layout",attributes:{"show-bottom-panel":"true"}}},{id:"standard-bottom-sidebar",name:"Standard (bottom sidebar)",label:"Standard (bottom sidebar)",icon:"lyra layout-standard-bottom-sidebar",component:{tag:"lyra-standard-layout",attributes:{"show-bottom-sidebar":"true"}}},{id:"standard-full",name:"Standard (panel + sidebar)",label:"Standard (panel + sidebar)",icon:"lyra layout-standard-full",component:{tag:"lyra-standard-layout",attributes:{"show-bottom-panel":"true","show-bottom-sidebar":"true"}}}];for(const t of vw)H.registerContribution(Fo,t);async function yw(t,e=!0){const i=await Y.getWorkspace();if(!i)return null;const r=t?.path;return e&&!r?null:{workspace:i,path:r||""}}function kn(t){return t&&typeof t.getContent=="function"&&typeof t.getSelection=="function"&&typeof t.getSnippet=="function"&&typeof t.getLanguage=="function"&&typeof t.getFilePath=="function"}function ni(t=!1){const e={filePath:null,language:null};return t?{...e,snippet:null,cursorLine:null}:e}async function xw(t,e=!0){const i=await yw(t,e);if(!i)return null;const{workspace:r,path:o}=i;if(!o)return null;try{const s=await r.getResource(o);return!s||!(s instanceof qe)?null:{workspace:r,path:o,file:s}}catch{return null}}St({command:{id:"disconnect_folder",name:"Disconnect folder",description:"Disconnects a folder from the workspace"},handler:{execute:async()=>{const t=Le.get();if(!(t instanceof Re&&t.getParent()===void 0)){At("Select a folder root to disconnect.");return}try{await Y.disconnectFolder(t)}catch(e){At(e.message)}}},contribution:{target:"contextmenu:filebrowser",label:"Disconnect folder",icon:"folder-minus",disabled:()=>{const t=Le.get();return!(t instanceof Re&&t.getParent()===void 0)}}});St({command:{id:"load_workspace",name:"Local Folder",description:"Connect to a local folder using File System Access API",parameters:[]},handler:{execute:async t=>{await window.showDirectoryPicker({mode:"readwrite"}).then(e=>Y.connectWorkspace(e)).catch(e=>{At(e.message)})}},contribution:{target:"filebrowser.connections",label:"Local Folder",icon:"folder-open"}});St({command:{id:"connect_opfs",name:"OPFS",description:"Connect to Origin Private File System (browser storage)",parameters:[]},handler:{execute:async()=>{try{await Y.connectFolder({opfs:!0})}catch(t){At(t.message)}}},contribution:{target:"filebrowser.connections",label:"OPFS (Browser Storage)",icon:"database"}});St({command:{id:"connect_indexeddb",name:"IndexedDB",description:"Connect to IndexedDB-backed workspace (browser storage)",parameters:[{name:"name",description:"Optional display name for this IndexedDB workspace root",required:!1}]},handler:{execute:async t=>{const e=t.params?.name;try{await Y.connectFolder({indexeddb:!0,name:e})}catch(i){At(i.message)}}},contribution:{target:"filebrowser.connections",label:"IndexedDB (Browser Storage)",icon:"database"}});St({command:{id:"refresh_resource",name:"Refresh resource",description:"Refreshes the connected folder of the selected resource, or the whole workspace if nothing is selected",parameters:[]},handler:{execute:async()=>{const t=Le.get();if(t){t.getWorkspace().touch();return}const e=await Y.getWorkspace();if(!e){At("No workspace selected.");return}e.touch()}}});St({command:{id:"open_editor",name:"Open editor",description:"Opens a file in an editor",parameters:[{name:"path",description:"The path of the file to open within the workspace; if omitted, the active selection is opened",required:!1},{name:"editorId",description:"Open with this editor id; if omitted, use default editor",required:!1}]},handler:{execute:async t=>{const e=t.params?.path,i=t.params?.editorId;let r=null;if(e)r=(await xw({path:e}))?.file??null;else{const o=Le.get();r=o instanceof qe?o:null}r&&await ur.loadEditor(r,i)}}});St({command:{id:"get_active_editor_content",name:"Get active editor content",description:"Gets the complete contents of the currently active editor. Returns null if no editor is active or if the editor is not a code editor.",parameters:[],output:[{name:"content",description:"the complete contents of the active editor, or null if no editor is active"},{name:"filePath",description:"the workspace path of the file in the active editor, or null if no editor is active"},{name:"language",description:"the programming language of the active editor, or null if no editor is active"}]},handler:{execute:async t=>{const e=t.activeEditor;if(!kn(e))return{...ni(),content:null};try{return{content:e.getContent(),filePath:e.getFilePath(),language:e.getLanguage()}}catch{return{...ni(),content:null}}}}});St({command:{id:"get_active_editor_selection",name:"Get active editor selection",description:"Gets the currently selected text in the active editor. Returns null if no editor is active, no selection exists, or if the editor is not a code editor.",parameters:[],output:[{name:"selection",description:"the selected text in the active editor, or null if no selection exists or no editor is active"},{name:"filePath",description:"the workspace path of the file in the active editor, or null if no editor is active"},{name:"language",description:"the programming language of the active editor, or null if no editor is active"}]},handler:{execute:async t=>{const e=t.activeEditor;if(!kn(e))return{...ni(),selection:null};try{return{selection:e.getSelection(),filePath:e.getFilePath(),language:e.getLanguage()}}catch{return{...ni(),selection:null}}}}});St({command:{id:"get_active_editor_snippet",name:"Get active editor snippet around cursor",description:"Gets a code snippet from the active editor with n lines before and n lines after the cursor position. Useful for getting context around the cursor without loading the entire file.",parameters:[{name:"lines",description:"number of lines to include before and after the cursor position (default: 5)",type:"number",required:!1}],output:[{name:"snippet",description:"the code snippet with n lines before and after the cursor, or null if no editor is active"},{name:"filePath",description:"the workspace path of the file in the active editor, or null if no editor is active"},{name:"language",description:"the programming language of the active editor, or null if no editor is active"},{name:"cursorLine",description:"the line number where the cursor is positioned (1-based), or null if no editor is active"}]},handler:{execute:async t=>{const e=t.activeEditor;if(!kn(e))return ni(!0);try{const i=t.params?.lines?parseInt(t.params.lines,10):5;if(isNaN(i)||i<0)return ni(!0);const r=e.getSnippet(i);return r?{snippet:r.snippet,filePath:e.getFilePath(),language:e.getLanguage(),cursorLine:r.cursorLine}:ni(!0)}catch{return ni(!0)}}}});St({command:{id:"show_version_info",name:"Show Version Info",description:"Shows application version information",parameters:[]},handler:{execute:async t=>{const e=si.getCurrentApp();if(!e){At("No app loaded");return}const i=e.dependencies??{},r=Object.keys(i).length>0,o=r?p`
                    <wa-tree style="--indent-guide-width: 1px;">
                        <wa-tree-item expanded>
                            <span>${e.name??""}</span>
                            ${Object.entries(i).map(([A,$])=>p`
                                <wa-tree-item>
                                    <span>${A} <small>${$}</small></span>
                                </wa-tree-item>
                            `)}
                        </wa-tree-item>
                    </wa-tree>
                `:p``;let s=null;const a=()=>(s||(s=document.getElementById("global-dialog-container")||document.createElement("div"),s.id||(s.id="global-dialog-container",document.body.appendChild(s))),s),l=()=>{s&&ae(p``,s)},c=A=>{const $=j.parse(A,{async:!1});return p`${We($)}`};let h=[];if(e.releaseHistory)if(typeof e.releaseHistory=="function")try{h=await e.releaseHistory()}catch(A){console.error("Failed to load release history from app:",A),h=[]}else h=e.releaseHistory;const u=e.version??"0.0.0",f=h.length>0?h.findIndex(A=>A.tag_name===u):-1,m=f>=0?f:0;let g=m;const b=A=>{if(h.length===0)return"";const $=h[A],L=$.tag_name===u;let S=`**Version:** ${$.tag_name}`;L&&(S+=" (Current)"),S+=`

`;const O=new Date($.published_at).toLocaleDateString();if(S+=`**Released:** ${O}

`,!L){const it=u.replace(/^v/,""),Gt=$.tag_name.replace(/^v/,""),Et=it.split(".").map(Number),zt=Gt.split(".").map(Number);let de=!1;for(let Rt=0;Rt<Math.max(Et.length,zt.length);Rt++){const he=Et[Rt]||0,ht=zt[Rt]||0;if(ht>he){de=!0;break}if(ht<he)break}de&&(S+=`⚠️ **Update available - reload page to update**

`)}return $.body&&(S+=`---

${$.body}`),S},y=()=>{l()},E=()=>{l()},_=A=>{const $=b(A),L=h.length>0,S=p`
                    <wa-dialog 
                        label="About ${e.name??""} - ${e.version??"0.0.0"}"
                        open 
                        light-dismiss
                        style="--width: 600px;"
                        @wa-request-close=${y}
                        @wa-after-hide=${E}
                    >
                        <style>
                            .dialog-content {
                                height: 600px;
                            }
                            
                            wa-tree-item > span small {
                                color: var(--wa-color-neutral-60);
                                font-size: 0.875em;
                                margin-left: 0.5rem;
                            }
                        </style>
                        <small>${e.description??""}</small>
                        <div class="dialog-content">
                            <wa-tab-group>
                                ${h.length>0?p`
                                    <wa-tab slot="nav" panel="release">Release History</wa-tab>
                                    <wa-tab-panel name="release">
                                        ${c($)}
                                    </wa-tab-panel>
                                `:""}
                                
                                ${r?p`
                                    <wa-tab slot="nav" panel="packages">NPM Packages</wa-tab>
                                    <wa-tab-panel name="packages">
                                        ${o}
                                    </wa-tab-panel>
                                `:""}
                            </wa-tab-group>
                        </div>
                        <div slot="footer">
                            ${L?p`
                                <wa-button 
                                    variant="default"
                                    ?disabled=${A===h.length-1}
                                    @click=${()=>{A<h.length-1&&(g=A+1,_(g))}}
                                >
                                    ← Previous
                                </wa-button>
                                <wa-button 
                                    variant="default"
                                    ?disabled=${A===0}
                                    @click=${()=>{A>0&&(g=A-1,_(g))}}
                                >
                                    Next →
                                </wa-button>
                            `:""}
                            <wa-button variant="primary" data-dialog="close">Close</wa-button>
                        </div>
                    </wa-dialog>
                `;ae(S,a())};return _(m),new Promise(A=>{const $=()=>{s?.querySelector("wa-dialog[open]")?setTimeout($,100):A()};$()})}}});St({command:{id:"save",name:"Save editor",description:"Saves the active/focused editor",keyBinding:"CTRL+S",parameters:[]},handler:{execute:async t=>{const e=Gr.get()||ee.get();e&&e.isDirty()&&e.save()}},contribution:{target:"toolbar:.system.editors",icon:"floppy-disk",label:"Save active editor",slot:"start",disabled:()=>{const t=ee.get();return!t||!t.isDirty()}}});const od="theme";async function sd(t){const e=document.documentElement;e.classList.remove("wa-dark","wa-light"),e.classList.add(t)}async function kw(){const t=await ct.get(od);await sd(t||"wa-dark")}async function Cw(t){await ct.set(od,t)}St({command:{id:"switch_theme",name:"Switch theme",description:"Switches between dark and light theme",parameters:[]},handler:{execute:async t=>{const i=document.documentElement.classList.contains("wa-dark")?"wa-light":"wa-dark";await sd(i),await Cw(i)}},contribution:{target:Cr,icon:"circle-half-stroke",label:"Theme Switcher"}});kw().catch(t=>{console.error("Failed to load theme preference:",t)});St({command:{id:"fullscreen",name:"Toggle fullscreen",description:"Toggles fullscreen mode",parameters:[]},handler:{execute:async t=>{document.fullscreenElement===document.body?await document.exitFullscreen():await document.body.requestFullscreen()}},contribution:{target:Cr,icon:"expand",label:"Fullscreen"}});St({command:{id:"open_extensions",name:"Open Extensions",description:"Opens the extensions registry",parameters:[]},handler:{execute:t=>{const e={title:"Extensions",data:{},key:"system.extensions",icon:"puzzle-piece",state:{},noOverflow:!0,component:()=>p`<lyra-extensions></lyra-extensions>`};ur.loadEditor(e,"extensions-editor").then()}},contribution:{target:Cr,icon:"puzzle-piece",label:"Open Extensions"}});St({command:{id:"list_extensions",name:"List extensions",description:"Lists all available extensions with their status (enabled/disabled)",parameters:[],output:[{name:"extensions",description:"array of extension objects with id, name, description, experimental flag, and enabled status"}]},handler:{execute:async t=>st.getExtensions().map(i=>({id:i.id,name:i.name,description:i.description,experimental:i.experimental,enabled:st.isEnabled(i.id)}))}});St({command:{id:"toast_message",name:"Toast message to user",description:"Shows a toast message",parameters:[{name:"message",description:"the message to toast",required:!0},{name:"type",description:"the toast type: info (default), or error",required:!1}]},handler:{execute:({params:{message:t,type:e}})=>{t&&(e==="error"?At(t):oi(t))}}});St({command:{id:"open_view_as_editor",name:"Open view as editor",description:"Opens a dashboard view in the editor area",parameters:[{name:"name",description:"View contribution name",required:!0},{name:"sourceContributionSlot",description:"source contribution slot (default: SYSTEM_VIEWS)",required:!1}]},handler:{execute:async({params:t})=>{const e=t?.name;if(!e)return;const i=t?.sourceContributionSlot??Hl,o=H.getContributions(i).find(s=>s.name===e);o?.component&&await ur.openTab(o)}}});$t.put("constants",Dd);xi.put("html",p);xi.put("render",ae);xi.put("toastInfo",oi);xi.put("toastError",At);xi.put("toastWarning",Kd);xi.put("publish",F);xi.put("subscribe",It);export{rt as $,R as A,$c as B,Li as C,jl as D,ri as E,ql as F,St as G,$t as H,ci as I,di as J,F as K,Qt as L,Vl as M,Ae as N,qe as O,Ba as P,Qe as Q,we as R,Hl as S,Cr as T,te as U,ti as V,wc as W,Gr as X,ca as Y,co as Z,Ot as _,C as a,no as a0,ki as a1,cd as a2,Z as a3,np as a4,oi as a5,Kd as a6,nn as a7,Re as a8,Le as a9,Xd as aa,Rw as ab,ae as ac,rc as ad,Di as b,p as c,H as d,st as e,Fo as f,Od as g,li as h,Er as i,Ul as j,si as k,ur as l,ct as m,d as n,lt as o,We as p,x as q,w as r,I0 as s,v as t,At as u,xi as v,Y as w,lr as x,Ci as y,It as z};
