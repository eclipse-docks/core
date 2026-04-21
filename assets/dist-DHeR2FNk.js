const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/fs-access-CnQJX8W1-Djn7yzTe.js","assets/fs-access-D-fDaJ8V-w6cEwJE-.js"])))=>i.map(i=>d[i]);
import{i as e,n as t,t as n}from"./chunk-DseTPa7n.js";import{_ as r,a as i,c as a,d as o,f as s,g as c,h as l,l as u,m as d,n as f,o as p,p as m,r as h,s as ee,t as g,u as _,v as te}from"./fs-access-D-fDaJ8V-w6cEwJE-.js";import{t as v}from"./preload-helper-ca-nBW7U.js";var ne=globalThis,re=ne.ShadowRoot&&(ne.ShadyCSS===void 0||ne.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,ie=Symbol(),ae=new WeakMap,oe=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==ie)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(re&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=ae.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&ae.set(t,e))}return e}toString(){return this.cssText}},se=e=>new oe(typeof e==`string`?e:e+``,void 0,ie),y=(e,...t)=>new oe(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,ie),ce=(e,t)=>{if(re)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=ne.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},le=re?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return se(t)})(e):e,{is:ue,defineProperty:de,getOwnPropertyDescriptor:fe,getOwnPropertyNames:pe,getOwnPropertySymbols:me,getPrototypeOf:he}=Object,ge=globalThis,_e=ge.trustedTypes,ve=_e?_e.emptyScript:``,ye=ge.reactiveElementPolyfillSupport,be=(e,t)=>e,xe={toAttribute(e,t){switch(t){case Boolean:e=e?ve:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},Se=(e,t)=>!ue(e,t),Ce={attribute:!0,type:String,converter:xe,reflect:!1,useDefault:!1,hasChanged:Se};Symbol.metadata??=Symbol(`metadata`),ge.litPropertyMetadata??=new WeakMap;var we=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Ce){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&de(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=fe(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ce}static _$Ei(){if(this.hasOwnProperty(be(`elementProperties`)))return;let e=he(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(be(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(be(`properties`))){let e=this.properties,t=[...pe(e),...me(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(le(e))}else e!==void 0&&t.push(le(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ce(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?xe:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?xe:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??Se)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};we.elementStyles=[],we.shadowRootOptions={mode:`open`},we[be(`elementProperties`)]=new Map,we[be(`finalized`)]=new Map,ye?.({ReactiveElement:we}),(ge.reactiveElementVersions??=[]).push(`2.1.2`);var Te=globalThis,Ee=e=>e,De=Te.trustedTypes,Oe=De?De.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,ke=`$lit$`,Ae=`lit$${Math.random().toFixed(9).slice(2)}$`,je=`?`+Ae,Me=`<${je}>`,Ne=document,Pe=()=>Ne.createComment(``),Fe=e=>e===null||typeof e!=`object`&&typeof e!=`function`,Ie=Array.isArray,Le=e=>Ie(e)||typeof e?.[Symbol.iterator]==`function`,Re=`[ 	
\f\r]`,ze=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Be=/-->/g,Ve=/>/g,He=RegExp(`>|${Re}(?:([^\\s"'>=/]+)(${Re}*=${Re}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),Ue=/'/g,We=/"/g,Ge=/^(?:script|style|textarea|title)$/i,b=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),Ke=Symbol.for(`lit-noChange`),x=Symbol.for(`lit-nothing`),qe=new WeakMap,Je=Ne.createTreeWalker(Ne,129);function Ye(e,t){if(!Ie(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return Oe===void 0?t:Oe.createHTML(t)}var Xe=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=ze;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===ze?c[1]===`!--`?o=Be:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=He):(Ge.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=He):o=Ve:o===He?c[0]===`>`?(o=i??ze,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?He:c[3]===`"`?We:Ue):o===We||o===Ue?o=He:o===Be||o===Ve?o=ze:(o=He,i=void 0);let d=o===He&&e[t+1].startsWith(`/>`)?` `:``;a+=o===ze?n+Me:l>=0?(r.push(s),n.slice(0,l)+ke+n.slice(l)+Ae+d):n+Ae+(l===-2?t:d)}return[Ye(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},Ze=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Xe(t,n);if(this.el=e.createElement(l,r),Je.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=Je.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(ke)){let t=u[o++],n=i.getAttribute(e).split(Ae),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?nt:r[1]===`?`?rt:r[1]===`@`?it:tt}),i.removeAttribute(e)}else e.startsWith(Ae)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(Ge.test(i.tagName)){let e=i.textContent.split(Ae),t=e.length-1;if(t>0){i.textContent=De?De.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],Pe()),Je.nextNode(),c.push({type:2,index:++a});i.append(e[t],Pe())}}}else if(i.nodeType===8)if(i.data===je)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(Ae,e+1))!==-1;)c.push({type:7,index:a}),e+=Ae.length-1}a++}}static createElement(e,t){let n=Ne.createElement(`template`);return n.innerHTML=e,n}};function Qe(e,t,n=e,r){if(t===Ke)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=Fe(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=Qe(e,i._$AS(e,t.values),i,r)),t}var $e=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??Ne).importNode(t,!0);Je.currentNode=r;let i=Je.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new et(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new at(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=Je.nextNode(),a++)}return Je.currentNode=Ne,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},et=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Qe(this,e,t),Fe(e)?e===x||e==null||e===``?(this._$AH!==x&&this._$AR(),this._$AH=x):e!==this._$AH&&e!==Ke&&this._(e):e._$litType$===void 0?e.nodeType===void 0?Le(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==x&&Fe(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ne.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Ze.createElement(Ye(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new $e(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=qe.get(e.strings);return t===void 0&&qe.set(e.strings,t=new Ze(e)),t}k(t){Ie(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(Pe()),this.O(Pe()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=Ee(e).nextSibling;Ee(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},tt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=x,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=x}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=Qe(this,e,t,0),a=!Fe(e)||e!==this._$AH&&e!==Ke,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=Qe(this,r[n+o],t,o),s===Ke&&(s=this._$AH[o]),a||=!Fe(s)||s!==this._$AH[o],s===x?e=x:e!==x&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},nt=class extends tt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===x?void 0:e}},rt=class extends tt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==x)}},it=class extends tt{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=Qe(this,e,t,0)??x)===Ke)return;let n=this._$AH,r=e===x&&n!==x||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==x&&(n===x||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},at=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Qe(this,e)}},ot={M:ke,P:Ae,A:je,C:1,L:Xe,R:$e,D:Le,V:Qe,I:et,H:tt,N:rt,U:it,B:nt,F:at},st=Te.litHtmlPolyfillSupport;st?.(Ze,et),(Te.litHtmlVersions??=[]).push(`3.3.2`);var ct=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new et(t.insertBefore(Pe(),e),e,void 0,n??{})}return i._$AI(e),i},lt=globalThis,ut=class extends we{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ct(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ke}};ut._$litElement$=!0,ut.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ut});var dt=lt.litElementPolyfillSupport;dt?.({LitElement:ut}),(lt.litElementVersions??=[]).push(`4.2.2`);var ft=e(n(((e,t)=>{(function(e,n){typeof t==`object`&&t.exports?t.exports=n():e.Toastify=n()})(e,function(e){var t=function(e){return new t.lib.init(e)};t.defaults={oldestFirst:!0,text:`Toastify is awesome!`,node:void 0,duration:3e3,selector:void 0,callback:function(){},destination:void 0,newWindow:!1,close:!1,gravity:`toastify-top`,positionLeft:!1,position:``,backgroundColor:``,avatar:``,className:``,stopOnFocus:!0,onClick:function(){},offset:{x:0,y:0},escapeMarkup:!0,ariaLive:`polite`,style:{background:``}},t.lib=t.prototype={toastify:`1.12.0`,constructor:t,init:function(e){return e||={},this.options={},this.toastElement=null,this.options.text=e.text||t.defaults.text,this.options.node=e.node||t.defaults.node,this.options.duration=e.duration===0?0:e.duration||t.defaults.duration,this.options.selector=e.selector||t.defaults.selector,this.options.callback=e.callback||t.defaults.callback,this.options.destination=e.destination||t.defaults.destination,this.options.newWindow=e.newWindow||t.defaults.newWindow,this.options.close=e.close||t.defaults.close,this.options.gravity=e.gravity===`bottom`?`toastify-bottom`:t.defaults.gravity,this.options.positionLeft=e.positionLeft||t.defaults.positionLeft,this.options.position=e.position||t.defaults.position,this.options.backgroundColor=e.backgroundColor||t.defaults.backgroundColor,this.options.avatar=e.avatar||t.defaults.avatar,this.options.className=e.className||t.defaults.className,this.options.stopOnFocus=e.stopOnFocus===void 0?t.defaults.stopOnFocus:e.stopOnFocus,this.options.onClick=e.onClick||t.defaults.onClick,this.options.offset=e.offset||t.defaults.offset,this.options.escapeMarkup=e.escapeMarkup===void 0?t.defaults.escapeMarkup:e.escapeMarkup,this.options.ariaLive=e.ariaLive||t.defaults.ariaLive,this.options.style=e.style||t.defaults.style,e.backgroundColor&&(this.options.style.background=e.backgroundColor),this},buildToast:function(){if(!this.options)throw`Toastify is not initialized`;var e=document.createElement(`div`);for(var t in e.className=`toastify on `+this.options.className,this.options.position?e.className+=` toastify-`+this.options.position:this.options.positionLeft===!0?(e.className+=` toastify-left`,console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.")):e.className+=` toastify-right`,e.className+=` `+this.options.gravity,this.options.backgroundColor&&console.warn(`DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.`),this.options.style)e.style[t]=this.options.style[t];if(this.options.ariaLive&&e.setAttribute(`aria-live`,this.options.ariaLive),this.options.node&&this.options.node.nodeType===Node.ELEMENT_NODE)e.appendChild(this.options.node);else if(this.options.escapeMarkup?e.innerText=this.options.text:e.innerHTML=this.options.text,this.options.avatar!==``){var r=document.createElement(`img`);r.src=this.options.avatar,r.className=`toastify-avatar`,this.options.position==`left`||this.options.positionLeft===!0?e.appendChild(r):e.insertAdjacentElement(`afterbegin`,r)}if(this.options.close===!0){var i=document.createElement(`button`);i.type=`button`,i.setAttribute(`aria-label`,`Close`),i.className=`toast-close`,i.innerHTML=`&#10006;`,i.addEventListener(`click`,function(e){e.stopPropagation(),this.removeElement(this.toastElement),window.clearTimeout(this.toastElement.timeOutValue)}.bind(this));var a=window.innerWidth>0?window.innerWidth:screen.width;(this.options.position==`left`||this.options.positionLeft===!0)&&a>360?e.insertAdjacentElement(`afterbegin`,i):e.appendChild(i)}if(this.options.stopOnFocus&&this.options.duration>0){var o=this;e.addEventListener(`mouseover`,function(t){window.clearTimeout(e.timeOutValue)}),e.addEventListener(`mouseleave`,function(){e.timeOutValue=window.setTimeout(function(){o.removeElement(e)},o.options.duration)})}if(this.options.destination!==void 0&&e.addEventListener(`click`,function(e){e.stopPropagation(),this.options.newWindow===!0?window.open(this.options.destination,`_blank`):window.location=this.options.destination}.bind(this)),typeof this.options.onClick==`function`&&this.options.destination===void 0&&e.addEventListener(`click`,function(e){e.stopPropagation(),this.options.onClick()}.bind(this)),typeof this.options.offset==`object`){var s=n(`x`,this.options),c=n(`y`,this.options),l=this.options.position==`left`?s:`-`+s,u=this.options.gravity==`toastify-top`?c:`-`+c;e.style.transform=`translate(`+l+`,`+u+`)`}return e},showToast:function(){this.toastElement=this.buildToast();var e=typeof this.options.selector==`string`?document.getElementById(this.options.selector):this.options.selector instanceof HTMLElement||typeof ShadowRoot<`u`&&this.options.selector instanceof ShadowRoot?this.options.selector:document.body;if(!e)throw`Root element is not defined`;var n=t.defaults.oldestFirst?e.firstChild:e.lastChild;return e.insertBefore(this.toastElement,n),t.reposition(),this.options.duration>0&&(this.toastElement.timeOutValue=window.setTimeout(function(){this.removeElement(this.toastElement)}.bind(this),this.options.duration)),this},hideToast:function(){this.toastElement.timeOutValue&&clearTimeout(this.toastElement.timeOutValue),this.removeElement(this.toastElement)},removeElement:function(e){e.className=e.className.replace(` on`,``),window.setTimeout(function(){this.options.node&&this.options.node.parentNode&&this.options.node.parentNode.removeChild(this.options.node),e.parentNode&&e.parentNode.removeChild(e),this.options.callback.call(e),t.reposition()}.bind(this),400)}},t.reposition=function(){for(var e={top:15,bottom:15},t={top:15,bottom:15},n={top:15,bottom:15},i=document.getElementsByClassName(`toastify`),a,o=0;o<i.length;o++){a=r(i[o],`toastify-top`)===!0?`toastify-top`:`toastify-bottom`;var s=i[o].offsetHeight;a=a.substr(9,a.length-1);var c=15;(window.innerWidth>0?window.innerWidth:screen.width)<=360?(i[o].style[a]=n[a]+`px`,n[a]+=s+c):r(i[o],`toastify-left`)===!0?(i[o].style[a]=e[a]+`px`,e[a]+=s+c):(i[o].style[a]=t[a]+`px`,t[a]+=s+c)}return this};function n(e,t){return t.offset[e]?isNaN(t.offset[e])?t.offset[e]:t.offset[e]+`px`:`0px`}function r(e,t){return!e||typeof t!=`string`?!1:!!(e.className&&e.className.trim().split(/\s+/gi).indexOf(t)>-1)}return t.lib.init.prototype=t.lib,t})}))(),1),pt=Object.defineProperty,mt=(e,t,n)=>t in e?pt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ht=(e,t,n)=>(mt(e,typeof t==`symbol`?t:t+``,n),n),gt=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},_t=(e,t)=>{if(Object(t)!==t)throw TypeError(`Cannot use the "in" operator on this value`);return e.has(t)},vt=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},yt=(e,t,n)=>(gt(e,t,`access private method`),n);function bt(e,t){return Object.is(e,t)}var xt=null,St=!1,Ct=1,wt=Symbol(`SIGNAL`);function Tt(e){let t=xt;return xt=e,t}function Et(){return xt}function Dt(){return St}var Ot={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function kt(e){if(St)throw Error(typeof ngDevMode<`u`&&ngDevMode?`Assertion error: signal read during notification phase`:``);if(xt===null)return;xt.consumerOnSignalRead(e);let t=xt.nextProducerIndex++;if(Vt(xt),t<xt.producerNode.length&&xt.producerNode[t]!==e&&Bt(xt)){let e=xt.producerNode[t];zt(e,xt.producerIndexOfThis[t])}xt.producerNode[t]!==e&&(xt.producerNode[t]=e,xt.producerIndexOfThis[t]=Bt(xt)?Rt(e,xt,t):0),xt.producerLastReadVersion[t]=e.version}function At(){Ct++}function jt(e){if(!(!e.dirty&&e.lastCleanEpoch===Ct)){if(!e.producerMustRecompute(e)&&!Lt(e)){e.dirty=!1,e.lastCleanEpoch=Ct;return}e.producerRecomputeValue(e),e.dirty=!1,e.lastCleanEpoch=Ct}}function Mt(e){if(e.liveConsumerNode===void 0)return;let t=St;St=!0;try{for(let t of e.liveConsumerNode)t.dirty||Pt(t)}finally{St=t}}function Nt(){return xt?.consumerAllowSignalWrites!==!1}function Pt(e){var t;e.dirty=!0,Mt(e),(t=e.consumerMarkedDirty)==null||t.call(e.wrapper??e)}function Ft(e){return e&&(e.nextProducerIndex=0),Tt(e)}function It(e,t){if(Tt(t),!(!e||e.producerNode===void 0||e.producerIndexOfThis===void 0||e.producerLastReadVersion===void 0)){if(Bt(e))for(let t=e.nextProducerIndex;t<e.producerNode.length;t++)zt(e.producerNode[t],e.producerIndexOfThis[t]);for(;e.producerNode.length>e.nextProducerIndex;)e.producerNode.pop(),e.producerLastReadVersion.pop(),e.producerIndexOfThis.pop()}}function Lt(e){Vt(e);for(let t=0;t<e.producerNode.length;t++){let n=e.producerNode[t],r=e.producerLastReadVersion[t];if(r!==n.version||(jt(n),r!==n.version))return!0}return!1}function Rt(e,t,n){var r;if(Ht(e),Vt(e),e.liveConsumerNode.length===0){(r=e.watched)==null||r.call(e.wrapper);for(let t=0;t<e.producerNode.length;t++)e.producerIndexOfThis[t]=Rt(e.producerNode[t],e,t)}return e.liveConsumerIndexOfThis.push(n),e.liveConsumerNode.push(t)-1}function zt(e,t){var n;if(Ht(e),Vt(e),typeof ngDevMode<`u`&&ngDevMode&&t>=e.liveConsumerNode.length)throw Error(`Assertion error: active consumer index ${t} is out of bounds of ${e.liveConsumerNode.length} consumers)`);if(e.liveConsumerNode.length===1){(n=e.unwatched)==null||n.call(e.wrapper);for(let t=0;t<e.producerNode.length;t++)zt(e.producerNode[t],e.producerIndexOfThis[t])}let r=e.liveConsumerNode.length-1;if(e.liveConsumerNode[t]=e.liveConsumerNode[r],e.liveConsumerIndexOfThis[t]=e.liveConsumerIndexOfThis[r],e.liveConsumerNode.length--,e.liveConsumerIndexOfThis.length--,t<e.liveConsumerNode.length){let n=e.liveConsumerIndexOfThis[t],r=e.liveConsumerNode[t];Vt(r),r.producerIndexOfThis[n]=t}}function Bt(e){return e.consumerIsAlwaysLive||(e?.liveConsumerNode?.length??0)>0}function Vt(e){e.producerNode??=[],e.producerIndexOfThis??=[],e.producerLastReadVersion??=[]}function Ht(e){e.liveConsumerNode??=[],e.liveConsumerIndexOfThis??=[]}function Ut(e){if(jt(e),kt(e),e.value===qt)throw e.error;return e.value}function Wt(e){let t=Object.create(Jt);t.computation=e;let n=()=>Ut(t);return n[wt]=t,n}var Gt=Symbol(`UNSET`),Kt=Symbol(`COMPUTING`),qt=Symbol(`ERRORED`),Jt={...Ot,value:Gt,dirty:!0,error:null,equal:bt,producerMustRecompute(e){return e.value===Gt||e.value===Kt},producerRecomputeValue(e){if(e.value===Kt)throw Error(`Detected cycle in computations.`);let t=e.value;e.value=Kt;let n=Ft(e),r,i=!1;try{r=e.computation.call(e.wrapper),i=t!==Gt&&t!==qt&&e.equal.call(e.wrapper,t,r)}catch(t){r=qt,e.error=t}finally{It(e,n)}if(i){e.value=t;return}e.value=r,e.version++}};function Yt(){throw Error()}var Xt=Yt;function Zt(){Xt()}function Qt(e){let t=Object.create(tn);t.value=e;let n=()=>(kt(t),t.value);return n[wt]=t,n}function $t(){return kt(this),this.value}function en(e,t){Nt()||Zt(),e.equal.call(e.wrapper,e.value,t)||(e.value=t,nn(e))}var tn={...Ot,equal:bt,value:void 0};function nn(e){e.version++,At(),Mt(e)}var rn=Symbol(`node`),an;(e=>{var t,n,r,i;class a{constructor(r,i={}){vt(this,n),ht(this,t);let a=Qt(r)[wt];if(this[rn]=a,a.wrapper=this,i){let t=i.equals;t&&(a.equal=t),a.watched=i[e.subtle.watched],a.unwatched=i[e.subtle.unwatched]}}get(){if(!(0,e.isState)(this))throw TypeError(`Wrong receiver type for Signal.State.prototype.get`);return $t.call(this[rn])}set(t){if(!(0,e.isState)(this))throw TypeError(`Wrong receiver type for Signal.State.prototype.set`);if(Dt())throw Error(`Writes to signals not permitted during Watcher callback`);let n=this[rn];en(n,t)}}t=rn,n=new WeakSet,e.isState=e=>typeof e==`object`&&_t(n,e),e.State=a;class o{constructor(t,n){vt(this,i),ht(this,r);let a=Wt(t)[wt];if(a.consumerAllowSignalWrites=!0,this[rn]=a,a.wrapper=this,n){let t=n.equals;t&&(a.equal=t),a.watched=n[e.subtle.watched],a.unwatched=n[e.subtle.unwatched]}}get(){if(!(0,e.isComputed)(this))throw TypeError(`Wrong receiver type for Signal.Computed.prototype.get`);return Ut(this[rn])}}r=rn,i=new WeakSet,e.isComputed=e=>typeof e==`object`&&_t(i,e),e.Computed=o,(t=>{var n,r,i,a;function o(e){let t,n=null;try{n=Tt(null),t=e()}finally{Tt(n)}return t}t.untrack=o;function s(t){if(!(0,e.isComputed)(t)&&!(0,e.isWatcher)(t))throw TypeError(`Called introspectSources without a Computed or Watcher argument`);return t[rn].producerNode?.map(e=>e.wrapper)??[]}t.introspectSources=s;function c(t){if(!(0,e.isComputed)(t)&&!(0,e.isState)(t))throw TypeError(`Called introspectSinks without a Signal argument`);return t[rn].liveConsumerNode?.map(e=>e.wrapper)??[]}t.introspectSinks=c;function l(t){if(!(0,e.isComputed)(t)&&!(0,e.isState)(t))throw TypeError(`Called hasSinks without a Signal argument`);let n=t[rn].liveConsumerNode;return n?n.length>0:!1}t.hasSinks=l;function u(t){if(!(0,e.isComputed)(t)&&!(0,e.isWatcher)(t))throw TypeError(`Called hasSources without a Computed or Watcher argument`);let n=t[rn].producerNode;return n?n.length>0:!1}t.hasSources=u;class d{constructor(e){vt(this,r),vt(this,i),ht(this,n);let t=Object.create(Ot);t.wrapper=this,t.consumerMarkedDirty=e,t.consumerIsAlwaysLive=!0,t.consumerAllowSignalWrites=!1,t.producerNode=[],this[rn]=t}watch(...t){if(!(0,e.isWatcher)(this))throw TypeError(`Called unwatch without Watcher receiver`);yt(this,i,a).call(this,t);let n=this[rn];n.dirty=!1;let r=Tt(n);for(let e of t)kt(e[rn]);Tt(r)}unwatch(...t){if(!(0,e.isWatcher)(this))throw TypeError(`Called unwatch without Watcher receiver`);yt(this,i,a).call(this,t);let n=this[rn];Vt(n);for(let e=n.producerNode.length-1;e>=0;e--)if(t.includes(n.producerNode[e].wrapper)){zt(n.producerNode[e],n.producerIndexOfThis[e]);let t=n.producerNode.length-1;if(n.producerNode[e]=n.producerNode[t],n.producerIndexOfThis[e]=n.producerIndexOfThis[t],n.producerNode.length--,n.producerIndexOfThis.length--,n.nextProducerIndex--,e<n.producerNode.length){let t=n.producerIndexOfThis[e],r=n.producerNode[e];Ht(r),r.liveConsumerIndexOfThis[t]=e}}}getPending(){if(!(0,e.isWatcher)(this))throw TypeError(`Called getPending without Watcher receiver`);return this[rn].producerNode.filter(e=>e.dirty).map(e=>e.wrapper)}}n=rn,r=new WeakSet,i=new WeakSet,a=function(t){for(let n of t)if(!(0,e.isComputed)(n)&&!(0,e.isState)(n))throw TypeError(`Called watch/unwatch without a Computed or State argument`)},e.isWatcher=e=>_t(r,e),t.Watcher=d;function f(){return Et()?.wrapper}t.currentComputed=f,t.watched=Symbol(`watched`),t.unwatched=Symbol(`unwatched`)})(e.subtle||={})})(an||={});var on=!1,sn=new an.subtle.Watcher(()=>{on||(on=!0,queueMicrotask(()=>{on=!1;for(let e of sn.getPending())e.get();sn.watch()}))}),cn=Symbol(`SignalWatcherBrand`),ln=new FinalizationRegistry(e=>{e.unwatch(...an.subtle.introspectSources(e))}),un=new WeakMap;function dn(e){return!0===e[cn]?(console.warn(`SignalWatcher should not be applied to the same class more than once.`),e):class extends e{constructor(){super(...arguments),this._$St=new Map,this._$So=new an.State(0),this._$Si=!1}_$Sl(){var e;let t=[],n=[];this._$St.forEach((e,r)=>{(e?.beforeUpdate?t:n).push(r)});let r=this.h?.getPending().filter(e=>e!==this._$Su&&!this._$St.has(e));t.forEach(e=>e.get()),(e=this._$Su)==null||e.get(),r.forEach(e=>e.get()),n.forEach(e=>e.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(this.h!==void 0)return;this._$Su=new an.Computed(()=>{this._$So.get(),super.performUpdate()});let e=this.h=new an.subtle.Watcher(function(){let e=un.get(this);e!==void 0&&(!1===e._$Si&&(new Set(this.getPending()).has(e._$Su)?e.requestUpdate():e._$Sv()),this.watch())});un.set(e,this),ln.register(this,e),e.watch(this._$Su),e.watch(...Array.from(this._$St).map(([e])=>e))}_$Sp(){if(this.h===void 0)return;let e=!1;this.h.unwatch(...an.subtle.introspectSources(this.h).filter(t=>{let n=!0!==this._$St.get(t)?.manualDispose;return n&&this._$St.delete(t),e||=!n,n})),e||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(e,t){var n;this._$S_();let r=new an.Computed(()=>{e()});return this.h.watch(r),this._$St.set(r,t),(n=t?.beforeUpdate)!=null&&n?an.subtle.untrack(()=>r.get()):this.updateComplete.then(()=>an.subtle.untrack(()=>r.get())),()=>{this._$St.delete(r),this.h.unwatch(r),!1===this.isConnected&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{!1===this.isConnected&&this._$Sp()})}}}var fn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},pn=e=>(...t)=>({_$litDirective$:e,values:t}),mn=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},{I:hn}=ot,gn=e=>e,_n=e=>e===null||typeof e!=`object`&&typeof e!=`function`,vn=(e,t)=>t===void 0?e?._$litType$!==void 0:e?._$litType$===t,yn=e=>e?._$litType$?.h!=null,bn=e=>e.strings===void 0,xn=()=>document.createComment(``),Sn=(e,t,n)=>{let r=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0)n=new hn(r.insertBefore(xn(),i),r.insertBefore(xn(),i),e,e.options);else{let t=n._$AB.nextSibling,a=n._$AM,o=a!==e;if(o){let t;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(t=e._$AU)!==a._$AU&&n._$AP(t)}if(t!==i||o){let e=n._$AA;for(;e!==t;){let t=gn(e).nextSibling;gn(r).insertBefore(e,i),e=t}}}return n},Cn=(e,t,n=e)=>(e._$AI(t,n),e),wn={},Tn=(e,t=wn)=>e._$AH=t,En=e=>e._$AH,Dn=e=>{e._$AR(),e._$AA.remove()},On=e=>{e._$AR()},kn=(e,t)=>{let n=e._$AN;if(n===void 0)return!1;for(let e of n)e._$AO?.(t,!1),kn(e,t);return!0},An=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},jn=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Pn(t)}};function Mn(e){this._$AN===void 0?this._$AM=e:(An(this),this._$AM=e,jn(this))}function Nn(e,t=!1,n=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(t)if(Array.isArray(r))for(let e=n;e<r.length;e++)kn(r[e],!1),An(r[e]);else r!=null&&(kn(r,!1),An(r));else kn(this,e)}var Pn=e=>{e.type==fn.CHILD&&(e._$AP??=Nn,e._$AQ??=Mn)},Fn=class extends mn{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),jn(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(kn(this,e),An(this))}setValue(e){if(bn(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}},In=!1,Ln=new an.subtle.Watcher(async()=>{In||(In=!0,queueMicrotask(()=>{In=!1;for(let e of Ln.getPending())e.get();Ln.watch()}))});an.State,an.Computed;var Rn=(e,t)=>new an.State(e,t),zn=m(`Toast`),Bn={duration:4e3,gravity:`bottom`,position:`right`,close:!0},Vn=(e,t)=>{(0,ft.default)({...Bn,text:e,style:t}).showToast()},Hn=e=>{zn.info(e),Vn(e,{background:`var(--wa-color-brand-50)`,color:`var(--wa-color-brand-on)`})},S=e=>{zn.error(e),Vn(e,{background:`var(--wa-color-danger-50)`,color:`var(--wa-color-danger-on)`})},Un=e=>{zn.warn(e),Vn(e,{background:`var(--wa-color-warning-50)`,color:`var(--wa-color-warning-on)`})},Wn=new class{constructor(){this.globalNameRemaps=new Map,this.appNameRemaps=new Map}setGlobalNameRemap(e,t){this.globalNameRemaps.set(e,this.normalizeTargets(t))}resetForTesting(){this.globalNameRemaps.clear(),this.appNameRemaps.clear()}applyAppNameRemaps(e){if(this.appNameRemaps.clear(),e)for(let t of e)this.appNameRemaps.set(t.name,this.normalizeTargets(t.targets))}getEffectiveTargets(e,t){let n=t.name;if(!n)return[e];let r=this.appNameRemaps.get(n);if(r)return r.length>0?r:[];let i=this.globalNameRemaps.get(n);return i?i.length>0?i:[]:[e]}listNameRemaps(){let e={},t=new Set([...this.globalNameRemaps.keys(),...this.appNameRemaps.keys()]);for(let n of t)e[n]={appTargets:this.appNameRemaps.get(n),globalTargets:this.globalNameRemaps.get(n)};return e}normalizeTargets(e){let t=new Set,n=[];for(let r of e)!r||t.has(r)||(t.add(r),n.push(r));return n}};c.put(`contributionTargetMappingRegistry`,Wn);var Gn=`events/contributionregistry/contributionsChanged`,C=new class{constructor(){this.contributions=new Map}registerContribution(e,t){let n=this.getOrCreateSlot(e);if(`command`in t){let e=t;e.disabled instanceof Function&&(e.disabled=new an.Computed(e.disabled))}n.push(t),_(Gn,{target:e,contributions:n});let r=Wn.getEffectiveTargets(e,t);for(let t of r)t!==e&&_(Gn,{target:t,contributions:this.getContributions(t)})}getContributions(e){let t=[];for(let[n,r]of this.contributions.entries()){let i=r;for(let r of i)Wn.getEffectiveTargets(n,r).includes(e)&&t.push(r)}return t.length===0&&this.getOrCreateSlot(e),t}getOrCreateSlot(e){return this.contributions.has(e)||this.contributions.set(e,[]),this.contributions.get(e)}};c.put(`contributionRegistry`,C);var Kn=Rn(null),qn=Rn(null),Jn=Rn(null),Yn=Rn(0),Xn=Rn(void 0);Rn({name:``,timestamp:0});var Zn=`events/commandregistry/commandRegistered`,Qn=class{constructor(e,t,n,r,i){this.id=e,this.name=t,this.description=n,this.parameters=r||[],this.output=i||[]}};function $n(e){if(e===void 0)return`undefined`;if(e===null)return`null`;if(typeof e==`string`)return e.length>300?`${e.slice(0,300)}…`:e;if(typeof e==`number`||typeof e==`boolean`)return String(e);try{let t=JSON.stringify(e);return t.length>300?`${t.slice(0,300)}…`:t}catch{return String(e)}}var er=new class{constructor(){this.commands={},this.handlers=new Map}registerHandler(e,t){this.handlers.has(e)||this.handlers.set(e,[]);let n=this.handlers.get(e);n.push(t),n.sort((e,t)=>(t.ranking??0)-(e.ranking??0))}getHandler(e){return this.handlers.get(e)}createExecutionContext(e){return{params:e||{},activePart:Kn.get(),activeEditor:qn.get()}}async execute(e,t={}){let n=this.getHandler(e);if(!n)throw d.debug(`[CommandRegistry] No handlers registered for command: ${e}`),Error(`No handlers registered for command: ${e}`);let r=this.getCommand(e),i=t.params?` params: ${JSON.stringify(t.params)}`:``;d.debug(`[CommandRegistry] Executing command: ${e}${r?` (${r.name})`:``}${i}`);for(let r of n)if(r.canExecute===void 0||r.canExecute(t))try{let n=r.execute(t),i=await Promise.resolve(n);return d.debug(`[CommandRegistry] Command executed successfully: ${e} (result: ${$n(i)})`),i}catch(t){let n=t instanceof Error?t.message:String(t);throw d.error(`[CommandRegistry] Command execution failed: ${e} - ${n}`),t}d.error(`[CommandRegistry] No handler found to execute command: ${e}`)}createAndRegisterCommand(e,t,n,r,i){let a=new Qn(e,t,n,r);this.registerCommand(a),i&&this.registerHandler(e,i)}registerCommand(e){this.commands[e.id]=e,_(Zn,e)}hasCommand(e){return e in this.commands}listCommands(e){return e?Object.values(this.commands).filter(t=>(er.getHandler(t.id)||[]).some(t=>t.canExecute===void 0||t.canExecute(e))).reduce((e,t)=>(e[t.id]=t,e),{}):this.commands}getCommand(e){return this.commands[e]}registerAll(e){let t=e.command.id;this.registerCommand(e.command),e.handler&&this.registerHandler(t,e.handler),e.contribution&&e.contribution.target&&C.registerContribution(e.contribution.target,{command:t,...e.contribution})}};c.put(`commandRegistry`,er);var w=e=>{er.registerAll(e)},tr=y`
    wa-tree-item::part(label) {
        flex: 1;
        min-width: 0;
    }
`,nr=(e,t)=>{let n=new an.subtle.Watcher(async()=>{try{await 0,t(e.get())}finally{n.watch(e)}});return n.watch(e),e.get(),()=>{n.unwatch(e)}};Object.defineProperty(ut.prototype,`model`,{enumerable:!0,configurable:!0,writable:!0});var rr=dn(ut),ir=class extends rr{constructor(...e){super(...e),this.signalCleanups=new Set,this.eventSubscriptions=new Set}static finalizeStyles(e){return[tr,...super.finalizeStyles(e)]}connectedCallback(){super.connectedCallback(),this.doBeforeUI()}disconnectedCallback(){this.doClose(),super.disconnectedCallback(),this.eventSubscriptions.forEach(e=>s(e)),this.eventSubscriptions.clear(),this.signalCleanups.forEach(e=>e()),this.signalCleanups.clear()}subscribe(e,t){let n=o(e,t.bind(this));this.eventSubscriptions.add(n)}showInfo(e){Hn(e)}showError(e){S(e)}nobubble(e){return t=>{t.stopPropagation(),e.bind(this)(t)}}command(e,t={}){return()=>{this.executeCommand(e,t)}}async executeCommand(e,t){let n=er.createExecutionContext(t);await er.execute(e,n)}watch(e,t){let n=nr(e,t.bind(this));this.signalCleanups.add(n)}firstUpdated(e){super.firstUpdated(e),this.doInitUI()}updateIdle(){requestIdleCallback(()=>this.requestUpdate())}updateLater(){requestAnimationFrame(()=>this.requestUpdate())}doBeforeUI(){}doInitUI(){}doClose(){}withRefresh(e){e(),this.updateLater()}},ar=class extends Event{constructor(){super(`wa-error`,{bubbles:!0,cancelable:!1,composed:!0})}},or=class extends Event{constructor(){super(`wa-load`,{bubbles:!0,cancelable:!1,composed:!0})}},sr=new Set,cr=new Map,lr,ur=`ltr`,dr=`en`,fr=typeof MutationObserver<`u`&&typeof document<`u`&&document.documentElement!==void 0;if(fr){let e=new MutationObserver(mr);ur=document.documentElement.dir||`ltr`,dr=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:[`dir`,`lang`]})}function pr(...e){e.map(e=>{let t=e.$code.toLowerCase();cr.has(t)?cr.set(t,Object.assign(Object.assign({},cr.get(t)),e)):cr.set(t,e),lr||=e}),mr()}function mr(){fr&&(ur=document.documentElement.dir||`ltr`,dr=document.documentElement.lang||navigator.language),[...sr.keys()].map(e=>{typeof e.requestUpdate==`function`&&e.requestUpdate()})}var hr=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){sr.add(this.host)}hostDisconnected(){sr.delete(this.host)}dir(){return`${this.host.dir||ur}`.toLowerCase()}lang(){return`${this.host.lang||dr}`.toLowerCase()}getTranslationData(e){let t=new Intl.Locale(e.replace(/_/g,`-`)),n=t?.language.toLowerCase(),r=(t?.region)?.toLowerCase()??``;return{locale:t,language:n,region:r,primary:cr.get(`${n}-${r}`),secondary:cr.get(n)}}exists(e,t){let{primary:n,secondary:r}=this.getTranslationData(t.lang??this.lang());return t=Object.assign({includeFallback:!1},t),!!(n&&n[e]||r&&r[e]||t.includeFallback&&lr&&lr[e])}term(e,...t){let{primary:n,secondary:r}=this.getTranslationData(this.lang()),i;if(n&&n[e])i=n[e];else if(r&&r[e])i=r[e];else if(lr&&lr[e])i=lr[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof i==`function`?i(...t):i}date(e,t){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),t).format(e)}number(e,t){return e=Number(e),isNaN(e)?``:new Intl.NumberFormat(this.lang(),t).format(e)}relativeTime(e,t,n){return new Intl.RelativeTimeFormat(this.lang(),n).format(e,t)}},gr={$code:`en`,$name:`English`,$dir:`ltr`,carousel:`Carousel`,clearEntry:`Clear entry`,close:`Close`,createOption:e=>`Create "${e}"`,copied:`Copied`,copy:`Copy`,currentValue:`Current value`,dropFileHere:`Drop file here or click to browse`,decrement:`Decrement`,dropFilesHere:`Drop files here or click to browse`,error:`Error`,goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:`Hide password`,increment:`Increment`,loading:`Loading`,nextSlide:`Next slide`,numCharacters:e=>e===1?`1 character`:`${e} characters`,numCharactersRemaining:e=>e===1?`1 character remaining`:`${e} characters remaining`,numOptionsSelected:e=>e===0?`No options selected`:e===1?`1 option selected`:`${e} options selected`,pauseAnimation:`Pause animation`,playAnimation:`Play animation`,previousSlide:`Previous slide`,progress:`Progress`,remove:`Remove`,resize:`Resize`,scrollableRegion:`Scrollable region`,scrollToEnd:`Scroll to end`,scrollToStart:`Scroll to start`,selectAColorFromTheScreen:`Select a color from the screen`,showPassword:`Show password`,slideNum:e=>`Slide ${e}`,toggleColorFormat:`Toggle color format`,zoomIn:`Zoom in`,zoomOut:`Zoom out`};pr(gr);var _r=gr,T=class extends hr{};pr(_r);var vr=y`
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
`;function E(e,t){let n={waitUntilFirstUpdate:!1,...t};return(t,r)=>{let{update:i}=t,a=Array.isArray(e)?e:[e];t.update=function(e){a.forEach(t=>{let i=t;if(e.has(i)){let t=e.get(i),a=this[i];t!==a&&(!n.waitUntilFirstUpdate||this.hasUpdated)&&this[r](t,a)}}),i.call(this,e)}}}var yr=Object.defineProperty,br=Object.getOwnPropertyDescriptor,xr=e=>{throw TypeError(e)},D=(e,t,n,r)=>{for(var i=r>1?void 0:r?br(t,n):t,a=e.length-1,o;a>=0;a--)(o=e[a])&&(i=(r?o(t,n,i):o(i))||i);return r&&i&&yr(t,n,i),i},Sr=(e,t,n)=>t.has(e)||xr(`Cannot `+n),Cr=(e,t,n)=>(Sr(e,t,`read from private field`),n?n.call(e):t.get(e)),wr=(e,t,n)=>t.has(e)?xr(`Cannot add the same private member more than once`):t instanceof WeakSet?t.add(e):t.set(e,n),Tr=(e,t,n,r)=>(Sr(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),O=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},Er={attribute:!0,type:String,converter:xe,reflect:!1,hasChanged:Se},Dr=(e=Er,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function k(e){return(t,n)=>typeof n==`object`?Dr(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function A(e){return k({...e,state:!0,attribute:!1})}function Or(e){return(t,n)=>{let r=typeof t==`function`?t:t[n];Object.assign(r,e)}}var kr=(e,t,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof t!=`object`&&Object.defineProperty(e,t,n),n);function j(e,t){return(n,r,i)=>{let a=t=>t.renderRoot?.querySelector(e)??null;if(t){let{get:e,set:t}=typeof r==`object`?n:i??(()=>{let e=Symbol();return{get(){return this[e]},set(t){this[e]=t}}})();return kr(n,r,{get(){let n=e.call(this);return n===void 0&&(n=a(this),(n!==null||this.hasUpdated)&&t.call(this,n)),n}})}return kr(n,r,{get(){return a(this)}})}}function Ar(e){return(t,n)=>kr(t,n,{async get(){return await this.updateComplete,this.renderRoot?.querySelector(e)??null}})}var jr=y`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,Mr,M=class extends ut{constructor(){super(),wr(this,Mr,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,t)=>{if(this.internals?.states)try{t?this.internals.states.add(e):this.internals.states.delete(e)}catch(e){if(String(e).includes(`must start with '--'`))console.error(`Your browser implements an outdated version of CustomStateSet. Consider using a polyfill`);else throw e}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error(`Element internals are not supported in your browser. Consider using a polyfill`)}this.customStates.set(`wa-defined`,!0);let e=this.constructor;for(let[t,n]of e.elementProperties)n.default===`inherit`&&n.initial!==void 0&&typeof t==`string`&&this.customStates.set(`initial-${t}-${n.initial}`,!0)}static get styles(){return[jr,...Array.isArray(this.css)?this.css:this.css?[this.css]:[]]}connectedCallback(){super.connectedCallback(),this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace(`wa-`,``)} `))}attributeChangedCallback(e,t,n){Cr(this,Mr)||(this.constructor.elementProperties.forEach((e,t)=>{e.reflect&&this[t]!=null&&this.initialReflectedProperties.set(t,this[t])}),Tr(this,Mr,!0)),super.attributeChangedCallback(e,t,n)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,n)=>{e.has(n)&&this[n]==null&&(this[n]=t)})}firstUpdated(e){super.firstUpdated(e),this.didSSR&&this.shadowRoot?.querySelectorAll(`slot`).forEach(e=>{e.dispatchEvent(new Event(`slotchange`,{bubbles:!0,composed:!1,cancelable:!1}))})}update(e){try{super.update(e)}catch(e){if(this.didSSR&&!this.hasUpdated){let t=new Event(`lit-hydration-error`,{bubbles:!0,composed:!0,cancelable:!1});t.error=e,this.dispatchEvent(t)}throw e}}relayNativeEvent(e,t){e.stopImmediatePropagation(),this.dispatchEvent(new e.constructor(e.type,{...e,...t}))}};Mr=new WeakMap,D([k()],M.prototype,`dir`,2),D([k()],M.prototype,`lang`,2),D([k({type:Boolean,reflect:!0,attribute:`did-ssr`})],M.prototype,`didSSR`,2);var Nr=`important`,Pr=` !`+Nr,N=pn(class extends mn{constructor(e){if(super(e),e.type!==fn.ATTRIBUTE||e.name!==`style`||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,n)=>{let r=e[n];return r==null?t:t+`${n=n.includes(`-`)?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,`-$&`).toLowerCase()}:${r};`},``)}update(e,[t]){let{style:n}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let e of this.ft)t[e]??(this.ft.delete(e),e.includes(`-`)?n.removeProperty(e):n[e]=null);for(let e in t){let r=t[e];if(r!=null){this.ft.add(e);let t=typeof r==`string`&&r.endsWith(Pr);e.includes(`-`)||t?n.setProperty(e,t?r.slice(0,-11):r,t?Nr:``):n[e]=r}}return Ke}}),Fr=class extends M{constructor(){super(...arguments),this.localize=new T(this),this.isLoaded=!1}handleClick(){this.play=!this.play}handleKeyDown(e){(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),this.play=!this.play)}handleLoad(){let e=document.createElement(`canvas`),{width:t,height:n}=this.animatedImage;e.width=t,e.height=n,e.getContext(`2d`).drawImage(this.animatedImage,0,0,t,n),this.frozenFrame=e.toDataURL(`image/gif`),this.isLoaded||=(this.dispatchEvent(new or),!0)}handleError(){this.dispatchEvent(new ar)}handlePlayChange(){this.play&&(this.animatedImage.src=``,this.animatedImage.src=this.src)}handleSrcChange(){this.isLoaded=!1}render(){let e=`${this.localize.term(this.play?`pauseAnimation`:`playAnimation`)} ${this.alt}`;return b`
      <div
        class="animated-image"
        tabindex="0"
        role="button"
        aria-pressed=${this.play?`true`:`false`}
        aria-label=${e}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <img
          class="animated"
          src=${this.src}
          alt=${this.alt}
          crossorigin="anonymous"
          aria-hidden=${this.play?`false`:`true`}
          role="presentation"
          @load=${this.handleLoad}
          @error=${this.handleError}
        />

        ${this.isLoaded?b`
              <img
                class="frozen"
                src=${this.frozenFrame}
                alt=${this.alt}
                aria-hidden=${this.play?`true`:`false`}
                role="presentation"
              />

              <div part="control-box" class="control-box" aria-hidden="true">
                <slot name="play-icon">
                  <wa-icon
                    name="play"
                    library="system"
                    variant="solid"
                    class="default"
                    style=${N({"margin-inline-start":`3px`})}
                  ></wa-icon>
                </slot>
                <slot name="pause-icon">
                  <wa-icon name="pause" library="system" variant="solid" class="default"></wa-icon>
                </slot>
              </div>
            `:``}
      </div>
    `}};Fr.css=vr,D([j(`.animated`)],Fr.prototype,`animatedImage`,2),D([A()],Fr.prototype,`frozenFrame`,2),D([A()],Fr.prototype,`isLoaded`,2),D([k()],Fr.prototype,`src`,2),D([k()],Fr.prototype,`alt`,2),D([k({type:Boolean,reflect:!0})],Fr.prototype,`play`,2),D([E(`play`,{waitUntilFirstUpdate:!0})],Fr.prototype,`handlePlayChange`,1),D([E(`src`)],Fr.prototype,`handleSrcChange`,1),Fr=D([O(`wa-animated-image`)],Fr);var Ir=y`
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
`;function Lr(e){return`data:image/svg+xml,${encodeURIComponent(e)}`}var Rr={solid:{check:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>`,"chevron-down":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>`,"chevron-left":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>`,"chevron-right":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>`,circle:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>`,eyedropper:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>`,file:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/></svg>`,"file-audio":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/></svg>`,"file-code":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z"/></svg>`,"file-excel":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/></svg>`,"file-image":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/></svg>`,"file-pdf":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>`,"file-powerpoint":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/></svg>`,"file-video":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>`,"file-word":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"/></svg>`,"file-zipper":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z"/></svg>`,"grip-vertical":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>`,indeterminate:`<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>`,minus:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>`,pause:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>`,play:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>`,plus:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>`,star:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>`,upload:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"/></svg>`,user:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>`,xmark:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>`},regular:{"circle-question":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>`,"circle-xmark":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>`,copy:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>`,eye:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>`,"eye-slash":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>`,star:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>`}},zr={name:`system`,resolver:(e,t=`classic`,n=`solid`)=>{let r=Rr[n][e]??Rr.regular[e]??Rr.regular[`circle-question`];return r?Lr(r):``}},Br=``,Vr=``,Hr=``;function Ur(e){Br=e}function Wr(e=``){if(!Br){let e=document.querySelector(`[data-webawesome]`);if(e?.hasAttribute(`data-webawesome`)){let t=new URL(e.getAttribute(`data-webawesome`)??``,window.location.href).pathname;Ur(t)}else{let e=[...document.getElementsByTagName(`script`)].find(e=>e.src.endsWith(`webawesome.js`)||e.src.endsWith(`webawesome.loader.js`)||e.src.endsWith(`webawesome.ssr-loader.js`));e&&Ur(String(e.getAttribute(`src`)).split(`/`).slice(0,-1).join(`/`))}}return Br.replace(/\/$/,``)+(e?`/${e.replace(/^\//,``)}`:``)}function Gr(){return Vr.replace(/\/$/,``)}function Kr(e){Hr=e}function qr(){if(!Hr){let e=document.querySelector(`[data-fa-kit-code]`);e&&Kr(e.getAttribute(`data-fa-kit-code`)||``)}return Hr}var Jr=`7.2.0`;function Yr(e,t,n){let r=`solid`;return t===`chisel`&&(r=`chisel-regular`),t===`etch`&&(r=`etch-solid`),t===`graphite`&&(r=`graphite-thin`),t===`jelly`&&(r=`jelly-regular`,n===`duo-regular`&&(r=`jelly-duo-regular`),n===`fill-regular`&&(r=`jelly-fill-regular`)),t===`jelly-duo`&&(r=`jelly-duo-regular`),t===`jelly-fill`&&(r=`jelly-fill-regular`),t===`notdog`&&(n===`solid`&&(r=`notdog-solid`),n===`duo-solid`&&(r=`notdog-duo-solid`)),t===`notdog-duo`&&(r=`notdog-duo-solid`),t===`slab`&&((n===`solid`||n===`regular`)&&(r=`slab-regular`),n===`press-regular`&&(r=`slab-press-regular`)),t===`slab-press`&&(r=`slab-press-regular`),t===`thumbprint`&&(r=`thumbprint-light`),t===`utility`&&(r=`utility-semibold`),t===`utility-duo`&&(r=`utility-duo-semibold`),t===`utility-fill`&&(r=`utility-fill-semibold`),t===`whiteboard`&&(r=`whiteboard-semibold`),t===`classic`&&(n===`thin`&&(r=`thin`),n===`light`&&(r=`light`),n===`regular`&&(r=`regular`),n===`solid`&&(r=`solid`)),t===`duotone`&&(n===`thin`&&(r=`duotone-thin`),n===`light`&&(r=`duotone-light`),n===`regular`&&(r=`duotone-regular`),n===`solid`&&(r=`duotone`)),t===`sharp`&&(n===`thin`&&(r=`sharp-thin`),n===`light`&&(r=`sharp-light`),n===`regular`&&(r=`sharp-regular`),n===`solid`&&(r=`sharp-solid`)),t===`sharp-duotone`&&(n===`thin`&&(r=`sharp-duotone-thin`),n===`light`&&(r=`sharp-duotone-light`),n===`regular`&&(r=`sharp-duotone-regular`),n===`solid`&&(r=`sharp-duotone-solid`)),t===`brands`&&(r=`brands`),r}function Xr(e,t,n){let r=Yr(e,t,n),i=Gr();if(i)return`${i}/${r}/${e}.svg`;let a=qr();return a.length>0?`https://ka-p.fontawesome.com/releases/v${Jr}/svgs/${r}/${e}.svg?token=${encodeURIComponent(a)}`:`https://ka-f.fontawesome.com/releases/v${Jr}/svgs/${r}/${e}.svg`}var Zr={name:`default`,resolver:(e,t=`classic`,n=`solid`)=>Xr(e,t,n),mutator:(e,t)=>{if(t?.family&&!e.hasAttribute(`data-duotone-initialized`)){let{family:n,variant:r}=t;if(n===`duotone`||n===`sharp-duotone`||n===`notdog-duo`||n===`notdog`&&r===`duo-solid`||n===`jelly-duo`||n===`jelly`&&r===`duo-regular`||n===`utility-duo`||n===`thumbprint`){let n=[...e.querySelectorAll(`path`)],r=n.find(e=>!e.hasAttribute(`opacity`)),i=n.find(e=>e.hasAttribute(`opacity`));if(!r||!i)return;if(r.setAttribute(`data-duotone-primary`,``),i.setAttribute(`data-duotone-secondary`,``),t.swapOpacity&&r&&i){let e=i.getAttribute(`opacity`)||`0.4`;r.style.setProperty(`--path-opacity`,e),i.style.setProperty(`--path-opacity`,`1`)}e.setAttribute(`data-duotone-initialized`,``)}}}},Qr=`classic`,$r=[Zr,zr],ei=[];function ti(e){ei.push(e)}function ni(e){ei=ei.filter(t=>t!==e)}function ri(e){return $r.find(t=>t.name===e)}function ii(e,t){ai(e),$r.push({name:e,resolver:t.resolver,mutator:t.mutator,spriteSheet:t.spriteSheet}),ei.forEach(t=>{t.library===e&&t.setIcon()})}function ai(e){$r=$r.filter(t=>t.name!==e)}function oi(){return Qr}var si=Symbol(),ci=Symbol(),li,ui=new Map,di=class extends M{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label=``,this.library=`default`,this.rotate=0,this.resolveIcon=async(e,t)=>{let n;if(t?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=b`<svg part="svg">
        <use part="use" href="${e}"></use>
      </svg>`,await this.updateComplete;let n=this.shadowRoot.querySelector(`[part='svg']`);return typeof t.mutator==`function`&&t.mutator(n,this),this.svg}try{if(n=await fetch(e,{mode:`cors`}),!n.ok)return n.status===410?si:ci}catch{return ci}try{let e=document.createElement(`div`);e.innerHTML=await n.text();let t=e.firstElementChild;if(t?.tagName?.toLowerCase()!==`svg`)return si;li||=new DOMParser;let r=li.parseFromString(t.outerHTML,`text/html`).body.querySelector(`svg`);return r?(r.part.add(`svg`),document.adoptNode(r)):si}catch{return si}}}connectedCallback(){super.connectedCallback(),ti(this)}firstUpdated(e){super.firstUpdated(e),this.hasAttribute(`rotate`)&&this.style.setProperty(`--rotate-angle`,`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),ni(this)}async getIconSource(){let e=ri(this.library),t=this.family||oi();if(this.name&&e){let n;try{n=await e.resolver(this.name,t,this.variant,this.autoWidth)}catch{n=void 0}return{url:n,fromLibrary:!0}}return{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label==`string`&&this.label.length>0?(this.setAttribute(`role`,`img`),this.setAttribute(`aria-label`,this.label),this.removeAttribute(`aria-hidden`)):(this.removeAttribute(`role`),this.removeAttribute(`aria-label`),this.setAttribute(`aria-hidden`,`true`))}async setIcon(){let{url:e,fromLibrary:t}=await this.getIconSource(),n=t?ri(this.library):void 0;if(!e){this.svg=null;return}let r=ui.get(e);r||(r=this.resolveIcon(e,n),ui.set(e,r));let i=await r;if(i===ci&&ui.delete(e),e===(await this.getIconSource()).url){if(vn(i)){this.svg=i;return}switch(i){case ci:case si:this.svg=null,this.dispatchEvent(new ar);break;default:this.svg=i.cloneNode(!0),n?.mutator?.(this.svg,this),this.dispatchEvent(new or)}}}updated(e){super.updated(e);let t=ri(this.library);this.hasAttribute(`rotate`)&&this.style.setProperty(`--rotate-angle`,`${this.rotate}deg`);let n=this.shadowRoot?.querySelector(`svg`);n&&t?.mutator?.(n,this)}render(){return this.hasUpdated?this.svg:b`<svg part="svg" width="16" height="16"></svg>`}};di.css=Ir,D([A()],di.prototype,`svg`,2),D([k({reflect:!0})],di.prototype,`name`,2),D([k({reflect:!0})],di.prototype,`family`,2),D([k({reflect:!0})],di.prototype,`variant`,2),D([k({attribute:`auto-width`,type:Boolean,reflect:!0})],di.prototype,`autoWidth`,2),D([k({attribute:`swap-opacity`,type:Boolean,reflect:!0})],di.prototype,`swapOpacity`,2),D([k()],di.prototype,`src`,2),D([k()],di.prototype,`label`,2),D([k({reflect:!0})],di.prototype,`library`,2),D([k({type:Number,reflect:!0})],di.prototype,`rotate`,2),D([k({type:String,reflect:!0})],di.prototype,`flip`,2),D([k({type:String,reflect:!0})],di.prototype,`animation`,2),D([E(`label`)],di.prototype,`handleLabelChange`,1),D([E([`family`,`name`,`library`,`variant`,`src`,`autoWidth`,`swapOpacity`],{waitUntilFirstUpdate:!0})],di.prototype,`setIcon`,1),di=D([O(`wa-icon`)],di);var fi=class extends Event{constructor(){super(`wa-start`,{bubbles:!0,cancelable:!1,composed:!0})}},pi=class extends Event{constructor(){super(`wa-finish`,{bubbles:!0,cancelable:!1,composed:!0})}},mi=class extends Event{constructor(){super(`wa-cancel`,{bubbles:!0,cancelable:!1,composed:!0})}},hi=y`
  :host {
    display: contents;
  }
`,gi=[{offset:0,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`,transform:`translate3d(0, 0, 0)`},{offset:.2,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`,transform:`translate3d(0, 0, 0)`},{offset:.4,easing:`cubic-bezier(0.755, 0.05, 0.855, 0.06)`,transform:`translate3d(0, -30px, 0) scaleY(1.1)`},{offset:.43,easing:`cubic-bezier(0.755, 0.05, 0.855, 0.06)`,transform:`translate3d(0, -30px, 0) scaleY(1.1)`},{offset:.53,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`,transform:`translate3d(0, 0, 0)`},{offset:.7,easing:`cubic-bezier(0.755, 0.05, 0.855, 0.06)`,transform:`translate3d(0, -15px, 0) scaleY(1.05)`},{offset:.8,"transition-timing-function":`cubic-bezier(0.215, 0.61, 0.355, 1)`,transform:`translate3d(0, 0, 0) scaleY(0.95)`},{offset:.9,transform:`translate3d(0, -4px, 0) scaleY(1.02)`},{offset:1,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`,transform:`translate3d(0, 0, 0)`}],_i=[{offset:0,opacity:`1`},{offset:.25,opacity:`0`},{offset:.5,opacity:`1`},{offset:.75,opacity:`0`},{offset:1,opacity:`1`}],vi=[{offset:0,transform:`translateX(0)`},{offset:.065,transform:`translateX(-6px) rotateY(-9deg)`},{offset:.185,transform:`translateX(5px) rotateY(7deg)`},{offset:.315,transform:`translateX(-3px) rotateY(-5deg)`},{offset:.435,transform:`translateX(2px) rotateY(3deg)`},{offset:.5,transform:`translateX(0)`}],yi=[{offset:0,transform:`scale(1)`},{offset:.14,transform:`scale(1.3)`},{offset:.28,transform:`scale(1)`},{offset:.42,transform:`scale(1.3)`},{offset:.7,transform:`scale(1)`}],bi=[{offset:0,transform:`translate3d(0, 0, 0)`},{offset:.111,transform:`translate3d(0, 0, 0)`},{offset:.222,transform:`skewX(-12.5deg) skewY(-12.5deg)`},{offset:.33299999999999996,transform:`skewX(6.25deg) skewY(6.25deg)`},{offset:.444,transform:`skewX(-3.125deg) skewY(-3.125deg)`},{offset:.555,transform:`skewX(1.5625deg) skewY(1.5625deg)`},{offset:.6659999999999999,transform:`skewX(-0.78125deg) skewY(-0.78125deg)`},{offset:.777,transform:`skewX(0.390625deg) skewY(0.390625deg)`},{offset:.888,transform:`skewX(-0.1953125deg) skewY(-0.1953125deg)`},{offset:1,transform:`translate3d(0, 0, 0)`}],xi=[{offset:0,transform:`scale3d(1, 1, 1)`},{offset:.5,transform:`scale3d(1.05, 1.05, 1.05)`},{offset:1,transform:`scale3d(1, 1, 1)`}],Si=[{offset:0,transform:`scale3d(1, 1, 1)`},{offset:.3,transform:`scale3d(1.25, 0.75, 1)`},{offset:.4,transform:`scale3d(0.75, 1.25, 1)`},{offset:.5,transform:`scale3d(1.15, 0.85, 1)`},{offset:.65,transform:`scale3d(0.95, 1.05, 1)`},{offset:.75,transform:`scale3d(1.05, 0.95, 1)`},{offset:1,transform:`scale3d(1, 1, 1)`}],Ci=[{offset:0,transform:`translate3d(0, 0, 0)`},{offset:.1,transform:`translate3d(-10px, 0, 0)`},{offset:.2,transform:`translate3d(10px, 0, 0)`},{offset:.3,transform:`translate3d(-10px, 0, 0)`},{offset:.4,transform:`translate3d(10px, 0, 0)`},{offset:.5,transform:`translate3d(-10px, 0, 0)`},{offset:.6,transform:`translate3d(10px, 0, 0)`},{offset:.7,transform:`translate3d(-10px, 0, 0)`},{offset:.8,transform:`translate3d(10px, 0, 0)`},{offset:.9,transform:`translate3d(-10px, 0, 0)`},{offset:1,transform:`translate3d(0, 0, 0)`}],wi=[{offset:0,transform:`translate3d(0, 0, 0)`},{offset:.1,transform:`translate3d(-10px, 0, 0)`},{offset:.2,transform:`translate3d(10px, 0, 0)`},{offset:.3,transform:`translate3d(-10px, 0, 0)`},{offset:.4,transform:`translate3d(10px, 0, 0)`},{offset:.5,transform:`translate3d(-10px, 0, 0)`},{offset:.6,transform:`translate3d(10px, 0, 0)`},{offset:.7,transform:`translate3d(-10px, 0, 0)`},{offset:.8,transform:`translate3d(10px, 0, 0)`},{offset:.9,transform:`translate3d(-10px, 0, 0)`},{offset:1,transform:`translate3d(0, 0, 0)`}],Ti=[{offset:0,transform:`translate3d(0, 0, 0)`},{offset:.1,transform:`translate3d(0, -10px, 0)`},{offset:.2,transform:`translate3d(0, 10px, 0)`},{offset:.3,transform:`translate3d(0, -10px, 0)`},{offset:.4,transform:`translate3d(0, 10px, 0)`},{offset:.5,transform:`translate3d(0, -10px, 0)`},{offset:.6,transform:`translate3d(0, 10px, 0)`},{offset:.7,transform:`translate3d(0, -10px, 0)`},{offset:.8,transform:`translate3d(0, 10px, 0)`},{offset:.9,transform:`translate3d(0, -10px, 0)`},{offset:1,transform:`translate3d(0, 0, 0)`}],Ei=[{offset:.2,transform:`rotate3d(0, 0, 1, 15deg)`},{offset:.4,transform:`rotate3d(0, 0, 1, -10deg)`},{offset:.6,transform:`rotate3d(0, 0, 1, 5deg)`},{offset:.8,transform:`rotate3d(0, 0, 1, -5deg)`},{offset:1,transform:`rotate3d(0, 0, 1, 0deg)`}],Di=[{offset:0,transform:`scale3d(1, 1, 1)`},{offset:.1,transform:`scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)`},{offset:.2,transform:`scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)`},{offset:.3,transform:`scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)`},{offset:.4,transform:`scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)`},{offset:.5,transform:`scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)`},{offset:.6,transform:`scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)`},{offset:.7,transform:`scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)`},{offset:.8,transform:`scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)`},{offset:.9,transform:`scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)`},{offset:1,transform:`scale3d(1, 1, 1)`}],Oi=[{offset:0,transform:`translate3d(0, 0, 0)`},{offset:.15,transform:`translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)`},{offset:.3,transform:`translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)`},{offset:.45,transform:`translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)`},{offset:.6,transform:`translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)`},{offset:.75,transform:`translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)`},{offset:1,transform:`translate3d(0, 0, 0)`}],ki=[{offset:0,transform:`translateY(-1200px) scale(0.7)`,opacity:`0.7`},{offset:.8,transform:`translateY(0px) scale(0.7)`,opacity:`0.7`},{offset:1,transform:`scale(1)`,opacity:`1`}],Ai=[{offset:0,transform:`translateX(-2000px) scale(0.7)`,opacity:`0.7`},{offset:.8,transform:`translateX(0px) scale(0.7)`,opacity:`0.7`},{offset:1,transform:`scale(1)`,opacity:`1`}],ji=[{offset:0,transform:`translateX(2000px) scale(0.7)`,opacity:`0.7`},{offset:.8,transform:`translateX(0px) scale(0.7)`,opacity:`0.7`},{offset:1,transform:`scale(1)`,opacity:`1`}],Mi=[{offset:0,transform:`translateY(1200px) scale(0.7)`,opacity:`0.7`},{offset:.8,transform:`translateY(0px) scale(0.7)`,opacity:`0.7`},{offset:1,transform:`scale(1)`,opacity:`1`}],Ni=[{offset:0,transform:`scale(1)`,opacity:`1`},{offset:.2,transform:`translateY(0px) scale(0.7)`,opacity:`0.7`},{offset:1,transform:`translateY(700px) scale(0.7)`,opacity:`0.7`}],Pi=[{offset:0,transform:`scale(1)`,opacity:`1`},{offset:.2,transform:`translateX(0px) scale(0.7)`,opacity:`0.7`},{offset:1,transform:`translateX(-2000px) scale(0.7)`,opacity:`0.7`}],Fi=[{offset:0,transform:`scale(1)`,opacity:`1`},{offset:.2,transform:`translateX(0px) scale(0.7)`,opacity:`0.7`},{offset:1,transform:`translateX(2000px) scale(0.7)`,opacity:`0.7`}],Ii=[{offset:0,transform:`scale(1)`,opacity:`1`},{offset:.2,transform:`translateY(0px) scale(0.7)`,opacity:`0.7`},{offset:1,transform:`translateY(-700px) scale(0.7)`,opacity:`0.7`}],Li=[{offset:0,opacity:`0`,transform:`scale3d(0.3, 0.3, 0.3)`},{offset:0,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:.2,transform:`scale3d(1.1, 1.1, 1.1)`},{offset:.2,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:.4,transform:`scale3d(0.9, 0.9, 0.9)`},{offset:.4,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:.6,opacity:`1`,transform:`scale3d(1.03, 1.03, 1.03)`},{offset:.6,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:.8,transform:`scale3d(0.97, 0.97, 0.97)`},{offset:.8,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:1,opacity:`1`,transform:`scale3d(1, 1, 1)`},{offset:1,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`}],Ri=[{offset:0,opacity:`0`,transform:`translate3d(0, -3000px, 0) scaleY(3)`},{offset:0,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:.6,opacity:`1`,transform:`translate3d(0, 25px, 0) scaleY(0.9)`},{offset:.6,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:.75,transform:`translate3d(0, -10px, 0) scaleY(0.95)`},{offset:.75,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:.9,transform:`translate3d(0, 5px, 0) scaleY(0.985)`},{offset:.9,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:1,transform:`translate3d(0, 0, 0)`},{offset:1,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`}],zi=[{offset:0,opacity:`0`,transform:`translate3d(-3000px, 0, 0) scaleX(3)`},{offset:0,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:.6,opacity:`1`,transform:`translate3d(25px, 0, 0) scaleX(1)`},{offset:.6,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:.75,transform:`translate3d(-10px, 0, 0) scaleX(0.98)`},{offset:.75,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:.9,transform:`translate3d(5px, 0, 0) scaleX(0.995)`},{offset:.9,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:1,transform:`translate3d(0, 0, 0)`},{offset:1,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`}],Bi=[{offset:0,opacity:`0`,transform:`translate3d(3000px, 0, 0) scaleX(3)`},{offset:0,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:.6,opacity:`1`,transform:`translate3d(-25px, 0, 0) scaleX(1)`},{offset:.6,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:.75,transform:`translate3d(10px, 0, 0) scaleX(0.98)`},{offset:.75,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:.9,transform:`translate3d(-5px, 0, 0) scaleX(0.995)`},{offset:.9,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:1,transform:`translate3d(0, 0, 0)`},{offset:1,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`}],Vi=[{offset:0,opacity:`0`,transform:`translate3d(0, 3000px, 0) scaleY(5)`},{offset:0,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:.6,opacity:`1`,transform:`translate3d(0, -20px, 0) scaleY(0.9)`},{offset:.6,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:.75,transform:`translate3d(0, 10px, 0) scaleY(0.95)`},{offset:.75,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:.9,transform:`translate3d(0, -5px, 0) scaleY(0.985)`},{offset:.9,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`},{offset:1,transform:`translate3d(0, 0, 0)`},{offset:1,easing:`cubic-bezier(0.215, 0.61, 0.355, 1)`}],Hi=[{offset:.2,transform:`scale3d(0.9, 0.9, 0.9)`},{offset:.5,opacity:`1`,transform:`scale3d(1.1, 1.1, 1.1)`},{offset:.55,opacity:`1`,transform:`scale3d(1.1, 1.1, 1.1)`},{offset:1,opacity:`0`,transform:`scale3d(0.3, 0.3, 0.3)`}],Ui=[{offset:.2,transform:`translate3d(0, 10px, 0) scaleY(0.985)`},{offset:.4,opacity:`1`,transform:`translate3d(0, -20px, 0) scaleY(0.9)`},{offset:.45,opacity:`1`,transform:`translate3d(0, -20px, 0) scaleY(0.9)`},{offset:1,opacity:`0`,transform:`translate3d(0, 2000px, 0) scaleY(3)`}],Wi=[{offset:.2,opacity:`1`,transform:`translate3d(20px, 0, 0) scaleX(0.9)`},{offset:1,opacity:`0`,transform:`translate3d(-2000px, 0, 0) scaleX(2)`}],Gi=[{offset:.2,opacity:`1`,transform:`translate3d(-20px, 0, 0) scaleX(0.9)`},{offset:1,opacity:`0`,transform:`translate3d(2000px, 0, 0) scaleX(2)`}],Ki=[{offset:.2,transform:`translate3d(0, -10px, 0) scaleY(0.985)`},{offset:.4,opacity:`1`,transform:`translate3d(0, 20px, 0) scaleY(0.9)`},{offset:.45,opacity:`1`,transform:`translate3d(0, 20px, 0) scaleY(0.9)`},{offset:1,opacity:`0`,transform:`translate3d(0, -2000px, 0) scaleY(3)`}],qi=[{offset:0,opacity:`0`},{offset:1,opacity:`1`}],Ji=[{offset:0,opacity:`0`,transform:`translate3d(-100%, 100%, 0)`},{offset:1,opacity:`1`,transform:`translate3d(0, 0, 0)`}],Yi=[{offset:0,opacity:`0`,transform:`translate3d(100%, 100%, 0)`},{offset:1,opacity:`1`,transform:`translate3d(0, 0, 0)`}],Xi=[{offset:0,opacity:`0`,transform:`translate3d(0, -100%, 0)`},{offset:1,opacity:`1`,transform:`translate3d(0, 0, 0)`}],Zi=[{offset:0,opacity:`0`,transform:`translate3d(0, -2000px, 0)`},{offset:1,opacity:`1`,transform:`translate3d(0, 0, 0)`}],Qi=[{offset:0,opacity:`0`,transform:`translate3d(-100%, 0, 0)`},{offset:1,opacity:`1`,transform:`translate3d(0, 0, 0)`}],$i=[{offset:0,opacity:`0`,transform:`translate3d(-2000px, 0, 0)`},{offset:1,opacity:`1`,transform:`translate3d(0, 0, 0)`}],ea=[{offset:0,opacity:`0`,transform:`translate3d(100%, 0, 0)`},{offset:1,opacity:`1`,transform:`translate3d(0, 0, 0)`}],ta=[{offset:0,opacity:`0`,transform:`translate3d(2000px, 0, 0)`},{offset:1,opacity:`1`,transform:`translate3d(0, 0, 0)`}],na=[{offset:0,opacity:`0`,transform:`translate3d(-100%, -100%, 0)`},{offset:1,opacity:`1`,transform:`translate3d(0, 0, 0)`}],ra=[{offset:0,opacity:`0`,transform:`translate3d(100%, -100%, 0)`},{offset:1,opacity:`1`,transform:`translate3d(0, 0, 0)`}],ia=[{offset:0,opacity:`0`,transform:`translate3d(0, 100%, 0)`},{offset:1,opacity:`1`,transform:`translate3d(0, 0, 0)`}],aa=[{offset:0,opacity:`0`,transform:`translate3d(0, 2000px, 0)`},{offset:1,opacity:`1`,transform:`translate3d(0, 0, 0)`}],oa=[{offset:0,opacity:`1`},{offset:1,opacity:`0`}],sa=[{offset:0,opacity:`1`,transform:`translate3d(0, 0, 0)`},{offset:1,opacity:`0`,transform:`translate3d(-100%, 100%, 0)`}],ca=[{offset:0,opacity:`1`,transform:`translate3d(0, 0, 0)`},{offset:1,opacity:`0`,transform:`translate3d(100%, 100%, 0)`}],la=[{offset:0,opacity:`1`},{offset:1,opacity:`0`,transform:`translate3d(0, 100%, 0)`}],ua=[{offset:0,opacity:`1`},{offset:1,opacity:`0`,transform:`translate3d(0, 2000px, 0)`}],da=[{offset:0,opacity:`1`},{offset:1,opacity:`0`,transform:`translate3d(-100%, 0, 0)`}],fa=[{offset:0,opacity:`1`},{offset:1,opacity:`0`,transform:`translate3d(-2000px, 0, 0)`}],pa=[{offset:0,opacity:`1`},{offset:1,opacity:`0`,transform:`translate3d(100%, 0, 0)`}],ma=[{offset:0,opacity:`1`},{offset:1,opacity:`0`,transform:`translate3d(2000px, 0, 0)`}],ha=[{offset:0,opacity:`1`,transform:`translate3d(0, 0, 0)`},{offset:1,opacity:`0`,transform:`translate3d(-100%, -100%, 0)`}],ga=[{offset:0,opacity:`1`,transform:`translate3d(0, 0, 0)`},{offset:1,opacity:`0`,transform:`translate3d(100%, -100%, 0)`}],_a=[{offset:0,opacity:`1`},{offset:1,opacity:`0`,transform:`translate3d(0, -100%, 0)`}],va=[{offset:0,opacity:`1`},{offset:1,opacity:`0`,transform:`translate3d(0, -2000px, 0)`}],ya=[{offset:0,transform:`perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)`,easing:`ease-out`},{offset:.4,transform:`perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -190deg)`,easing:`ease-out`},{offset:.5,transform:`perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -170deg)`,easing:`ease-in`},{offset:.8,transform:`perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)
      rotate3d(0, 1, 0, 0deg)`,easing:`ease-in`},{offset:1,transform:`perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)`,easing:`ease-in`}],ba=[{offset:0,transform:`perspective(400px) rotate3d(1, 0, 0, 90deg)`,easing:`ease-in`,opacity:`0`},{offset:.4,transform:`perspective(400px) rotate3d(1, 0, 0, -20deg)`,easing:`ease-in`},{offset:.6,transform:`perspective(400px) rotate3d(1, 0, 0, 10deg)`,opacity:`1`},{offset:.8,transform:`perspective(400px) rotate3d(1, 0, 0, -5deg)`},{offset:1,transform:`perspective(400px)`}],xa=[{offset:0,transform:`perspective(400px) rotate3d(0, 1, 0, 90deg)`,easing:`ease-in`,opacity:`0`},{offset:.4,transform:`perspective(400px) rotate3d(0, 1, 0, -20deg)`,easing:`ease-in`},{offset:.6,transform:`perspective(400px) rotate3d(0, 1, 0, 10deg)`,opacity:`1`},{offset:.8,transform:`perspective(400px) rotate3d(0, 1, 0, -5deg)`},{offset:1,transform:`perspective(400px)`}],Sa=[{offset:0,transform:`perspective(400px)`},{offset:.3,transform:`perspective(400px) rotate3d(1, 0, 0, -20deg)`,opacity:`1`},{offset:1,transform:`perspective(400px) rotate3d(1, 0, 0, 90deg)`,opacity:`0`}],Ca=[{offset:0,transform:`perspective(400px)`},{offset:.3,transform:`perspective(400px) rotate3d(0, 1, 0, -15deg)`,opacity:`1`},{offset:1,transform:`perspective(400px) rotate3d(0, 1, 0, 90deg)`,opacity:`0`}],wa=[{offset:0,transform:`translate3d(-100%, 0, 0) skewX(30deg)`,opacity:`0`},{offset:.6,transform:`skewX(-20deg)`,opacity:`1`},{offset:.8,transform:`skewX(5deg)`},{offset:1,transform:`translate3d(0, 0, 0)`}],Ta=[{offset:0,transform:`translate3d(100%, 0, 0) skewX(-30deg)`,opacity:`0`},{offset:.6,transform:`skewX(20deg)`,opacity:`1`},{offset:.8,transform:`skewX(-5deg)`},{offset:1,transform:`translate3d(0, 0, 0)`}],Ea=[{offset:0,opacity:`1`},{offset:1,transform:`translate3d(-100%, 0, 0) skewX(-30deg)`,opacity:`0`}],Da=[{offset:0,opacity:`1`},{offset:1,transform:`translate3d(100%, 0, 0) skewX(30deg)`,opacity:`0`}],Oa=[{offset:0,transform:`rotate3d(0, 0, 1, -200deg)`,opacity:`0`},{offset:1,transform:`translate3d(0, 0, 0)`,opacity:`1`}],ka=[{offset:0,transform:`rotate3d(0, 0, 1, -45deg)`,opacity:`0`},{offset:1,transform:`translate3d(0, 0, 0)`,opacity:`1`}],Aa=[{offset:0,transform:`rotate3d(0, 0, 1, 45deg)`,opacity:`0`},{offset:1,transform:`translate3d(0, 0, 0)`,opacity:`1`}],ja=[{offset:0,transform:`rotate3d(0, 0, 1, 45deg)`,opacity:`0`},{offset:1,transform:`translate3d(0, 0, 0)`,opacity:`1`}],Ma=[{offset:0,transform:`rotate3d(0, 0, 1, -90deg)`,opacity:`0`},{offset:1,transform:`translate3d(0, 0, 0)`,opacity:`1`}],Na=[{offset:0,opacity:`1`},{offset:1,transform:`rotate3d(0, 0, 1, 200deg)`,opacity:`0`}],Pa=[{offset:0,opacity:`1`},{offset:1,transform:`rotate3d(0, 0, 1, 45deg)`,opacity:`0`}],Fa=[{offset:0,opacity:`1`},{offset:1,transform:`rotate3d(0, 0, 1, -45deg)`,opacity:`0`}],Ia=[{offset:0,opacity:`1`},{offset:1,transform:`rotate3d(0, 0, 1, -45deg)`,opacity:`0`}],La=[{offset:0,opacity:`1`},{offset:1,transform:`rotate3d(0, 0, 1, 90deg)`,opacity:`0`}],Ra=[{offset:0,transform:`translate3d(0, -100%, 0)`,visibility:`visible`},{offset:1,transform:`translate3d(0, 0, 0)`}],za=[{offset:0,transform:`translate3d(-100%, 0, 0)`,visibility:`visible`},{offset:1,transform:`translate3d(0, 0, 0)`}],Ba=[{offset:0,transform:`translate3d(100%, 0, 0)`,visibility:`visible`},{offset:1,transform:`translate3d(0, 0, 0)`}],Va=[{offset:0,transform:`translate3d(0, 100%, 0)`,visibility:`visible`},{offset:1,transform:`translate3d(0, 0, 0)`}],Ha=[{offset:0,transform:`translate3d(0, 0, 0)`},{offset:1,visibility:`hidden`,transform:`translate3d(0, 100%, 0)`}],Ua=[{offset:0,transform:`translate3d(0, 0, 0)`},{offset:1,visibility:`hidden`,transform:`translate3d(-100%, 0, 0)`}],Wa=[{offset:0,transform:`translate3d(0, 0, 0)`},{offset:1,visibility:`hidden`,transform:`translate3d(100%, 0, 0)`}],Ga=[{offset:0,transform:`translate3d(0, 0, 0)`},{offset:1,visibility:`hidden`,transform:`translate3d(0, -100%, 0)`}],Ka=[{offset:0,easing:`ease-in-out`},{offset:.2,transform:`rotate3d(0, 0, 1, 80deg)`,easing:`ease-in-out`},{offset:.4,transform:`rotate3d(0, 0, 1, 60deg)`,easing:`ease-in-out`,opacity:`1`},{offset:.6,transform:`rotate3d(0, 0, 1, 80deg)`,easing:`ease-in-out`},{offset:.8,transform:`rotate3d(0, 0, 1, 60deg)`,easing:`ease-in-out`,opacity:`1`},{offset:1,transform:`translate3d(0, 700px, 0)`,opacity:`0`}],qa=[{offset:0,opacity:`0`,transform:`scale(0.1) rotate(30deg)`,"transform-origin":`center bottom`},{offset:.5,transform:`rotate(-10deg)`},{offset:.7,transform:`rotate(3deg)`},{offset:1,opacity:`1`,transform:`scale(1)`}],Ja=[{offset:0,opacity:`0`,transform:`translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)`},{offset:1,opacity:`1`,transform:`translate3d(0, 0, 0)`}],Ya=[{offset:0,opacity:`1`},{offset:1,opacity:`0`,transform:`translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)`}],Xa=[{offset:0,opacity:`0`,transform:`scale3d(0.3, 0.3, 0.3)`},{offset:.5,opacity:`1`}],Za=[{offset:0,opacity:`0`,transform:`scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)`,easing:`cubic-bezier(0.55, 0.055, 0.675, 0.19)`},{offset:.6,opacity:`1`,transform:`scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)`,easing:`cubic-bezier(0.175, 0.885, 0.32, 1)`}],Qa=[{offset:0,opacity:`0`,transform:`scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)`,easing:`cubic-bezier(0.55, 0.055, 0.675, 0.19)`},{offset:.6,opacity:`1`,transform:`scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)`,easing:`cubic-bezier(0.175, 0.885, 0.32, 1)`}],$a=[{offset:0,opacity:`0`,transform:`scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)`,easing:`cubic-bezier(0.55, 0.055, 0.675, 0.19)`},{offset:.6,opacity:`1`,transform:`scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)`,easing:`cubic-bezier(0.175, 0.885, 0.32, 1)`}],eo=[{offset:0,opacity:`0`,transform:`scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)`,easing:`cubic-bezier(0.55, 0.055, 0.675, 0.19)`},{offset:.6,opacity:`1`,transform:`scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)`,easing:`cubic-bezier(0.175, 0.885, 0.32, 1)`}],to=[{offset:0,opacity:`1`},{offset:.5,opacity:`0`,transform:`scale3d(0.3, 0.3, 0.3)`},{offset:1,opacity:`0`}],no=[{offset:.4,opacity:`1`,transform:`scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)`,easing:`cubic-bezier(0.55, 0.055, 0.675, 0.19)`},{offset:1,opacity:`0`,transform:`scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0)`,easing:`cubic-bezier(0.175, 0.885, 0.32, 1)`}],ro=[{offset:.4,opacity:`1`,transform:`scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0)`},{offset:1,opacity:`0`,transform:`scale(0.1) translate3d(-2000px, 0, 0)`}],io=[{offset:.4,opacity:`1`,transform:`scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0)`},{offset:1,opacity:`0`,transform:`scale(0.1) translate3d(2000px, 0, 0)`}],ao=[{offset:.4,opacity:`1`,transform:`scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)`,easing:`cubic-bezier(0.55, 0.055, 0.675, 0.19)`},{offset:1,opacity:`0`,transform:`scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0)`,easing:`cubic-bezier(0.175, 0.885, 0.32, 1)`}],oo={linear:`linear`,ease:`ease`,easeIn:`ease-in`,easeOut:`ease-out`,easeInOut:`ease-in-out`,easeInSine:`cubic-bezier(0.47, 0, 0.745, 0.715)`,easeOutSine:`cubic-bezier(0.39, 0.575, 0.565, 1)`,easeInOutSine:`cubic-bezier(0.445, 0.05, 0.55, 0.95)`,easeInQuad:`cubic-bezier(0.55, 0.085, 0.68, 0.53)`,easeOutQuad:`cubic-bezier(0.25, 0.46, 0.45, 0.94)`,easeInOutQuad:`cubic-bezier(0.455, 0.03, 0.515, 0.955)`,easeInCubic:`cubic-bezier(0.55, 0.055, 0.675, 0.19)`,easeOutCubic:`cubic-bezier(0.215, 0.61, 0.355, 1)`,easeInOutCubic:`cubic-bezier(0.645, 0.045, 0.355, 1)`,easeInQuart:`cubic-bezier(0.895, 0.03, 0.685, 0.22)`,easeOutQuart:`cubic-bezier(0.165, 0.84, 0.44, 1)`,easeInOutQuart:`cubic-bezier(0.77, 0, 0.175, 1)`,easeInQuint:`cubic-bezier(0.755, 0.05, 0.855, 0.06)`,easeOutQuint:`cubic-bezier(0.23, 1, 0.32, 1)`,easeInOutQuint:`cubic-bezier(0.86, 0, 0.07, 1)`,easeInExpo:`cubic-bezier(0.95, 0.05, 0.795, 0.035)`,easeOutExpo:`cubic-bezier(0.19, 1, 0.22, 1)`,easeInOutExpo:`cubic-bezier(1, 0, 0, 1)`,easeInCirc:`cubic-bezier(0.6, 0.04, 0.98, 0.335)`,easeOutCirc:`cubic-bezier(0.075, 0.82, 0.165, 1)`,easeInOutCirc:`cubic-bezier(0.785, 0.135, 0.15, 0.86)`,easeInBack:`cubic-bezier(0.6, -0.28, 0.735, 0.045)`,easeOutBack:`cubic-bezier(0.175, 0.885, 0.32, 1.275)`,easeInOutBack:`cubic-bezier(0.68, -0.55, 0.265, 1.55)`},so=t({backInDown:()=>ki,backInLeft:()=>Ai,backInRight:()=>ji,backInUp:()=>Mi,backOutDown:()=>Ni,backOutLeft:()=>Pi,backOutRight:()=>Fi,backOutUp:()=>Ii,bounce:()=>gi,bounceIn:()=>Li,bounceInDown:()=>Ri,bounceInLeft:()=>zi,bounceInRight:()=>Bi,bounceInUp:()=>Vi,bounceOut:()=>Hi,bounceOutDown:()=>Ui,bounceOutLeft:()=>Wi,bounceOutRight:()=>Gi,bounceOutUp:()=>Ki,easings:()=>oo,fadeIn:()=>qi,fadeInBottomLeft:()=>Ji,fadeInBottomRight:()=>Yi,fadeInDown:()=>Xi,fadeInDownBig:()=>Zi,fadeInLeft:()=>Qi,fadeInLeftBig:()=>$i,fadeInRight:()=>ea,fadeInRightBig:()=>ta,fadeInTopLeft:()=>na,fadeInTopRight:()=>ra,fadeInUp:()=>ia,fadeInUpBig:()=>aa,fadeOut:()=>oa,fadeOutBottomLeft:()=>sa,fadeOutBottomRight:()=>ca,fadeOutDown:()=>la,fadeOutDownBig:()=>ua,fadeOutLeft:()=>da,fadeOutLeftBig:()=>fa,fadeOutRight:()=>pa,fadeOutRightBig:()=>ma,fadeOutTopLeft:()=>ha,fadeOutTopRight:()=>ga,fadeOutUp:()=>_a,fadeOutUpBig:()=>va,flash:()=>_i,flip:()=>ya,flipInX:()=>ba,flipInY:()=>xa,flipOutX:()=>Sa,flipOutY:()=>Ca,headShake:()=>vi,heartBeat:()=>yi,hinge:()=>Ka,jackInTheBox:()=>qa,jello:()=>bi,lightSpeedInLeft:()=>wa,lightSpeedInRight:()=>Ta,lightSpeedOutLeft:()=>Ea,lightSpeedOutRight:()=>Da,pulse:()=>xi,rollIn:()=>Ja,rollOut:()=>Ya,rotateIn:()=>Oa,rotateInDownLeft:()=>ka,rotateInDownRight:()=>Aa,rotateInUpLeft:()=>ja,rotateInUpRight:()=>Ma,rotateOut:()=>Na,rotateOutDownLeft:()=>Pa,rotateOutDownRight:()=>Fa,rotateOutUpLeft:()=>Ia,rotateOutUpRight:()=>La,rubberBand:()=>Si,shake:()=>Ci,shakeX:()=>wi,shakeY:()=>Ti,slideInDown:()=>Ra,slideInLeft:()=>za,slideInRight:()=>Ba,slideInUp:()=>Va,slideOutDown:()=>Ha,slideOutLeft:()=>Ua,slideOutRight:()=>Wa,slideOutUp:()=>Ga,swing:()=>Ei,tada:()=>Di,wobble:()=>Oi,zoomIn:()=>Xa,zoomInDown:()=>Za,zoomInLeft:()=>Qa,zoomInRight:()=>$a,zoomInUp:()=>eo,zoomOut:()=>to,zoomOutDown:()=>no,zoomOutLeft:()=>ro,zoomOutRight:()=>io,zoomOutUp:()=>ao}),co=class extends M{constructor(){super(...arguments),this.hasStarted=!1,this.name=`none`,this.play=!1,this.delay=0,this.direction=`normal`,this.duration=1e3,this.easing=`linear`,this.endDelay=0,this.fill=`auto`,this.iterations=1/0,this.iterationStart=0,this.playbackRate=1,this.handleAnimationFinish=()=>{this.play=!1,this.hasStarted=!1,this.dispatchEvent(new pi)},this.handleAnimationCancel=()=>{this.play=!1,this.hasStarted=!1,this.dispatchEvent(new mi)}}get currentTime(){return this.animation?.currentTime??0}set currentTime(e){this.animation&&(this.animation.currentTime=e)}connectedCallback(){super.connectedCallback(),this.createAnimation()}disconnectedCallback(){super.disconnectedCallback(),this.destroyAnimation()}handleSlotChange(){this.destroyAnimation(),this.createAnimation()}async createAnimation(){let e=oo[this.easing]??this.easing,t=this.keyframes??so[this.name],n=(await this.defaultSlot).assignedElements()[0];return!n||!t?!1:(this.destroyAnimation(),this.animation=n.animate(t,{delay:this.delay,direction:this.direction,duration:this.duration,easing:e,endDelay:this.endDelay,fill:this.fill,iterationStart:this.iterationStart,iterations:this.iterations}),this.animation.playbackRate=this.playbackRate,this.animation.addEventListener(`cancel`,this.handleAnimationCancel),this.animation.addEventListener(`finish`,this.handleAnimationFinish),this.play?(this.hasStarted=!0,this.dispatchEvent(new fi)):this.animation.pause(),!0)}destroyAnimation(){this.animation&&(this.animation.cancel(),this.animation.removeEventListener(`cancel`,this.handleAnimationCancel),this.animation.removeEventListener(`finish`,this.handleAnimationFinish),this.hasStarted=!1)}handleAnimationChange(){this.hasUpdated&&this.createAnimation()}handlePlayChange(){return this.animation?(this.play&&!this.hasStarted&&(this.hasStarted=!0,this.dispatchEvent(new fi)),this.play?this.animation.play():this.animation.pause(),!0):!1}handlePlaybackRateChange(){this.animation&&(this.animation.playbackRate=this.playbackRate)}cancel(){this.animation?.cancel()}finish(){this.animation?.finish()}render(){return b` <slot @slotchange=${this.handleSlotChange}></slot> `}};co.css=hi,D([Ar(`slot`)],co.prototype,`defaultSlot`,2),D([k()],co.prototype,`name`,2),D([k({type:Boolean,reflect:!0})],co.prototype,`play`,2),D([k({type:Number})],co.prototype,`delay`,2),D([k()],co.prototype,`direction`,2),D([k({type:Number})],co.prototype,`duration`,2),D([k()],co.prototype,`easing`,2),D([k({attribute:`end-delay`,type:Number})],co.prototype,`endDelay`,2),D([k()],co.prototype,`fill`,2),D([k({type:Number})],co.prototype,`iterations`,2),D([k({attribute:`iteration-start`,type:Number})],co.prototype,`iterationStart`,2),D([k({attribute:!1})],co.prototype,`keyframes`,2),D([k({attribute:`playback-rate`,type:Number})],co.prototype,`playbackRate`,2),D([E([`name`,`delay`,`direction`,`duration`,`easing`,`endDelay`,`fill`,`iterations`,`iterationsStart`,`keyframes`])],co.prototype,`handleAnimationChange`,1),D([E(`play`)],co.prototype,`handlePlayChange`,1),D([E(`playbackRate`)],co.prototype,`handlePlaybackRateChange`,1),co=D([O(`wa-animation`)],co);var lo=y`
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
`,uo=class extends M{constructor(){super(...arguments),this.hasError=!1,this.image=``,this.label=``,this.initials=``,this.loading=`eager`,this.shape=`circle`}handleImageChange(){this.hasError=!1}handleImageLoadError(){this.hasError=!0,this.dispatchEvent(new ar)}render(){let e=b`
      <img
        part="image"
        class="image"
        src="${this.image}"
        loading="${this.loading}"
        role="img"
        aria-label=${this.label}
        @error="${this.handleImageLoadError}"
      />
    `,t=b``;return t=this.initials?b`<div part="initials" class="initials" role="img" aria-label=${this.label}>
        ${this.initials}
      </div>`:b`
        <slot name="icon" part="icon" class="icon" role="img" aria-label=${this.label}>
          <wa-icon name="user" library="system" variant="solid"></wa-icon>
        </slot>
      `,b` ${this.image&&!this.hasError?e:t} `}};uo.css=lo,D([A()],uo.prototype,`hasError`,2),D([k()],uo.prototype,`image`,2),D([k()],uo.prototype,`label`,2),D([k()],uo.prototype,`initials`,2),D([k()],uo.prototype,`loading`,2),D([k({reflect:!0})],uo.prototype,`shape`,2),D([E(`image`)],uo.prototype,`handleImageChange`,1),uo=D([O(`wa-avatar`)],uo);var fo=y`
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
`,po=y`
  :host {
    --pulse-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));

    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.375em 0.625em;
    color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
    font-size: max(var(--wa-font-size-3xs), 0.75em);
    font-weight: var(--wa-font-weight-semibold);
    line-height: 1;
    vertical-align: middle;
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

  /* Slots */
  slot[name='start']::slotted(*) {
    margin-inline-end: 0.375em;
  }

  slot[name='end']::slotted(*) {
    margin-inline-start: 0.375em;
  }
`,mo=class extends M{constructor(){super(...arguments),this.variant=`brand`,this.appearance=`accent`,this.pill=!1,this.attention=`none`}render(){return b`
      <span part="start">
        <slot name="start"></slot>
      </span>

      <span part="base" role="status">
        <slot></slot>
      </span>

      <span part="end">
        <slot name="end"></slot>
      </span>
    `}};mo.css=[fo,po],D([k({reflect:!0})],mo.prototype,`variant`,2),D([k({reflect:!0})],mo.prototype,`appearance`,2),D([k({type:Boolean,reflect:!0})],mo.prototype,`pill`,2),D([k({reflect:!0})],mo.prototype,`attention`,2),mo=D([O(`wa-badge`)],mo);var ho=y`
  .breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`,go=class extends M{constructor(){super(...arguments),this.localize=new T(this),this.separatorDir=this.localize.dir(),this.label=``}getSeparator(){let e=this.separatorSlot.assignedElements({flatten:!0})[0].cloneNode(!0);return[e,...e.querySelectorAll(`[id]`)].forEach(e=>e.removeAttribute(`id`)),e.setAttribute(`data-default`,``),e.slot=`separator`,e}handleSlotChange(){let e=[...this.defaultSlot.assignedElements({flatten:!0})].filter(e=>e.tagName.toLowerCase()===`wa-breadcrumb-item`);e.forEach((t,n)=>{let r=t.querySelector(`[slot="separator"]`);r===null?t.append(this.getSeparator()):r.hasAttribute(`data-default`)&&r.replaceWith(this.getSeparator()),n===e.length-1?t.setAttribute(`aria-current`,`page`):t.removeAttribute(`aria-current`)})}render(){return this.separatorDir!==this.localize.dir()&&(this.separatorDir=this.localize.dir(),this.updateComplete.then(()=>this.handleSlotChange())),b`
      <nav part="base" class="breadcrumb" aria-label=${this.label}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </nav>

      <span hidden aria-hidden="true">
        <slot name="separator">
          <wa-icon
            name=${this.localize.dir()===`rtl`?`chevron-left`:`chevron-right`}
            library="system"
            variant="solid"
          ></wa-icon>
        </slot>
      </span>
    `}};go.css=ho,D([j(`slot`)],go.prototype,`defaultSlot`,2),D([j(`slot[name="separator"]`)],go.prototype,`separatorSlot`,2),D([k()],go.prototype,`label`,2),go=D([O(`wa-breadcrumb`)],go);var _o=y`
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
`,P=e=>e??x,vo=class extends M{constructor(){super(...arguments),this.renderType=`button`,this.rel=`noreferrer noopener`}setRenderType(){let e=this.defaultSlot.assignedElements({flatten:!0}).filter(e=>e.tagName.toLowerCase()===`wa-dropdown`).length>0;if(this.href){this.renderType=`link`;return}if(e){this.renderType=`dropdown`;return}this.renderType=`button`}hrefChanged(){this.setRenderType()}handleSlotChange(){this.setRenderType()}render(){return b`
      <span part="start" class="start">
        <slot name="start"></slot>
      </span>

      ${this.renderType===`link`?b`
            <a
              part="label"
              class="label label-link"
              href="${this.href}"
              target="${P(this.target?this.target:void 0)}"
              rel=${P(this.target?this.rel:void 0)}
            >
              <slot></slot>
            </a>
          `:``}
      ${this.renderType===`button`?b`
            <button part="label" type="button" class="label label-button">
              <slot @slotchange=${this.handleSlotChange}></slot>
            </button>
          `:``}
      ${this.renderType===`dropdown`?b`
            <div part="label" class="label label-dropdown">
              <slot @slotchange=${this.handleSlotChange}></slot>
            </div>
          `:``}

      <span part="end" class="end">
        <slot name="end"></slot>
      </span>

      <span part="separator" class="separator" aria-hidden="true">
        <slot name="separator"></slot>
      </span>
    `}};vo.css=_o,D([j(`slot:not([name])`)],vo.prototype,`defaultSlot`,2),D([A()],vo.prototype,`renderType`,2),D([k()],vo.prototype,`href`,2),D([k()],vo.prototype,`target`,2),D([k()],vo.prototype,`rel`,2),D([E(`href`,{waitUntilFirstUpdate:!0})],vo.prototype,`hrefChanged`,1),vo=D([O(`wa-breadcrumb-item`)],vo);var yo=()=>({checkValidity(e){let t=e.input,n={message:``,isValid:!0,invalidKeys:[]};if(!t)return n;let r=!0;if(`checkValidity`in t&&(r=t.checkValidity()),r)return n;if(n.isValid=!1,`validationMessage`in t&&(n.message=t.validationMessage),!(`validity`in t))return n.invalidKeys.push(`customError`),n;for(let e in t.validity){if(e===`valid`)continue;let r=e;t.validity[r]&&n.invalidKeys.push(r)}return n}}),bo=class extends Event{constructor(){super(`wa-invalid`,{bubbles:!0,cancelable:!1,composed:!0})}},xo=()=>({observedAttributes:[`custom-error`],checkValidity(e){let t={message:``,isValid:!0,invalidKeys:[]};return e.customError&&(t.message=e.customError,t.isValid=!1,t.invalidKeys=[`customError`]),t}}),F=class extends M{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=[`input`],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=e=>{e.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new bo))},this.handleInteraction=e=>{let t=this.emittedEvents;t.includes(e.type)||t.push(e.type),t.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener(`invalid`,this.emitInvalid)}static get validators(){return[xo()]}static get observedAttributes(){let e=new Set(super.observedAttributes||[]);for(let t of this.validators)if(t.observedAttributes)for(let n of t.observedAttributes)e.add(n);return[...e]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(e=>{this.addEventListener(e,this.handleInteraction)})}firstUpdated(...e){super.firstUpdated(...e),this.updateValidity()}willUpdate(e){if(e.has(`customError`)&&(this.customError||=null,this.setCustomValidity(this.customError||``)),e.has(`value`)||e.has(`disabled`)||e.has(`defaultValue`)){let e=this.value;if(Array.isArray(e)){if(this.name){let t=new FormData;for(let n of e)t.append(this.name,n);this.setValue(t,t)}}else this.setValue(e,e)}e.has(`disabled`)&&(this.customStates.set(`disabled`,this.disabled),(this.hasAttribute(`disabled`)||!this.matches(`:disabled`))&&this.toggleAttribute(`disabled`,this.disabled)),super.willUpdate(e),this.updateValidity()}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(e){e?this.setAttribute(`form`,e):this.removeAttribute(`form`)}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...e){let t=e[0],n=e[1],r=e[2];r||=this.validationTarget,this.internals.setValidity(t,n,r||void 0),this.requestUpdate(`validity`),this.setCustomStates()}setCustomStates(){let e=!!this.required,t=this.internals.validity.valid,n=this.hasInteracted;this.customStates.set(`required`,e),this.customStates.set(`optional`,!e),this.customStates.set(`invalid`,!t),this.customStates.set(`valid`,t),this.customStates.set(`user-invalid`,!t&&n),this.customStates.set(`user-valid`,t&&n)}setCustomValidity(e){if(!e){this.customError=null,this.setValidity({});return}this.customError=e,this.setValidity({customError:!0},e,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(e){this.disabled=e,this.updateValidity()}formStateRestoreCallback(e,t){this.value=e,t===`restore`&&this.resetValidity(),this.updateValidity()}setValue(...e){let[t,n]=e;this.internals.setFormValue(t,n)}get allValidators(){let e=this.constructor.validators||[],t=this.validators||[];return[...e,...t]}resetValidity(){this.setCustomValidity(``),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute(`disabled`)||!this.willValidate){this.resetValidity();return}let e=this.allValidators;if(!e?.length)return;let t={customError:!!this.customError},n=this.validationTarget||this.input||void 0,r=``;for(let n of e){let{isValid:e,message:i,invalidKeys:a}=n.checkValidity(this);e||(r||=i,a?.length>=0&&a.forEach(e=>t[e]=!0))}r||=this.validationMessage,this.setValidity(t,r,n)}};F.formAssociated=!0,D([k({reflect:!0})],F.prototype,`name`,2),D([k({type:Boolean})],F.prototype,`disabled`,2),D([k({state:!0,attribute:!1})],F.prototype,`valueHasChanged`,2),D([k({state:!0,attribute:!1})],F.prototype,`hasInteracted`,2),D([k({attribute:`custom-error`,reflect:!0})],F.prototype,`customError`,2),D([k({attribute:!1,state:!0,type:Object})],F.prototype,`validity`,1);var So=class{constructor(e,...t){this.slotNames=[],this.handleSlotChange=e=>{let t=e.target;(this.slotNames.includes(`[default]`)&&!t.name||t.name&&this.slotNames.includes(t.name))&&this.host.requestUpdate()},(this.host=e).addController(this),this.slotNames=t}hasDefaultSlot(){return this.host.childNodes?[...this.host.childNodes].some(e=>{if(e.nodeType===Node.TEXT_NODE&&e.textContent.trim()!==``)return!0;if(e.nodeType===Node.ELEMENT_NODE){let t=e;if(t.tagName.toLowerCase()===`wa-visually-hidden`)return!1;if(!t.hasAttribute(`slot`))return!0}return!1}):!1}hasNamedSlot(e){return this.host.querySelector?.(`:scope > [slot="${e}"]`)!==null}test(e){return e===`[default]`?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot?.addEventListener?.(`slotchange`,this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot?.removeEventListener?.(`slotchange`,this.handleSlotChange)}},Co=y`
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
    line-height: calc(var(--wa-form-control-height) - var(--wa-form-control-border-width) * 2);
    height: var(--wa-form-control-height);
    width: 100%;

    background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
    border-color: transparent;
    color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
    border-start-start-radius: var(--_button-start-start-radius, var(--wa-form-control-border-radius));
    border-start-end-radius: var(--_button-start-end-radius, var(--wa-form-control-border-radius));
    border-end-start-radius: var(--_button-end-start-radius, var(--wa-form-control-border-radius));
    border-end-end-radius: var(--_button-end-end-radius, var(--wa-form-control-border-radius));
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
  }

  /* Appearance modifiers */
  :host([appearance='plain']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

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
    /* Indentation overrides for grouping outlined */
    margin-inline-start: var(--_button-horizontal-indent-outlined);
    margin-block-start: var(--_button-vertical-indent-outlined);

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
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

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
    /* Indentation overrides for grouping outlined */
    margin-inline-start: var(--_button-horizontal-indent-outlined);
    margin-block-start: var(--_button-vertical-indent-outlined);

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
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

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
    border-start-start-radius: var(--_button-start-start-radius, var(--wa-border-radius-pill));
    border-start-end-radius: var(--_button-start-end-radius, var(--wa-border-radius-pill));
    border-end-start-radius: var(--_button-end-start-radius, var(--wa-border-radius-pill));
    border-end-end-radius: var(--_button-end-end-radius, var(--wa-border-radius-pill));
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
`,wo=y`
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
`,I=pn(class extends mn{constructor(e){if(super(e),e.type!==fn.ATTRIBUTE||e.name!==`class`||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return` `+Object.keys(e).filter(t=>e[t]).join(` `)+` `}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(` `).split(/\s/).filter(e=>e!==``)));for(let e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}let n=e.element.classList;for(let e of this.st)e in t||(n.remove(e),this.st.delete(e));for(let e in t){let r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(n.add(e),this.st.add(e)):(n.remove(e),this.st.delete(e)))}return Ke}}),To=Symbol.for(``),Eo=e=>{if(e?.r===To)return e?._$litStatic$},Do=(e,...t)=>({_$litStatic$:t.reduce((t,n,r)=>t+(e=>{if(e._$litStatic$!==void 0)return e._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${e}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)})(n)+e[r+1],e[0]),r:To}),Oo=new Map,ko=(e=>(t,...n)=>{let r=n.length,i,a,o=[],s=[],c,l=0,u=!1;for(;l<r;){for(c=t[l];l<r&&(a=n[l],i=Eo(a))!==void 0;)c+=i+t[++l],u=!0;l!==r&&s.push(a),o.push(c),l++}if(l===r&&o.push(t[r]),u){let e=o.join(`$$lit$$`);(t=Oo.get(e))===void 0&&(o.raw=o,Oo.set(e,t=o)),n=s}return e(t,...n)})(b),L=class extends F{constructor(){super(...arguments),this.assumeInteractionOn=[`click`],this.hasSlotController=new So(this,`[default]`,`start`,`end`),this.localize=new T(this),this.invalid=!1,this.isIconButton=!1,this.title=``,this.variant=`neutral`,this.appearance=`accent`,this.size=`medium`,this.withCaret=!1,this.withStart=!1,this.withEnd=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type=`button`}static get validators(){return[...super.validators,yo()]}constructLightDOMButton(){let e=document.createElement(`button`);for(let t of this.attributes)t.name!==`style`&&e.setAttribute(t.name,t.value);return e.type=this.type,e.style.position=`absolute !important`,e.style.width=`0 !important`,e.style.height=`0 !important`,e.style.clipPath=`inset(50%) !important`,e.style.overflow=`hidden !important`,e.style.whiteSpace=`nowrap !important`,this.name&&(e.name=this.name),e.value=this.value||``,e}handleClick(e){if(this.disabled||this.loading){e.preventDefault(),e.stopImmediatePropagation();return}if(this.type!==`submit`&&this.type!==`reset`||!this.getForm())return;let t=this.constructLightDOMButton();this.parentElement?.append(t),t.click(),t.remove()}handleInvalid(){this.dispatchEvent(new bo)}handleLabelSlotChange(){let e=this.labelSlot.assignedNodes({flatten:!0}),t=!1,n=!1,r=!1,i=!1;[...e].forEach(e=>{if(e.nodeType===Node.ELEMENT_NODE){let r=e;r.localName===`wa-icon`?(n=!0,t||=r.label!==void 0):i=!0}else e.nodeType===Node.TEXT_NODE&&(e.textContent?.trim()||``).length>0&&(r=!0)}),this.isIconButton=n&&!r&&!i,this.customStates.set(`icon-button`,this.isIconButton),this.isIconButton&&!t&&console.warn(`Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.`,this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.customStates.set(`disabled`,this.disabled),this.updateValidity()}handleHrefChange(){this.customStates.set(`link`,this.isLink())}handleLoadingChange(){this.customStates.set(`loading`,this.loading)}setValue(...e){}click(){this.button.click()}focus(e){this.button.focus(e)}blur(){this.button.blur()}render(){let e=this.isLink(),t=e?Do`a`:Do`button`;return ko`
      <${t}
        part="base"
        class=${I({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:this.localize.dir()===`rtl`,"has-label":this.hasSlotController.test(`[default]`),"has-start":this.hasUpdated?this.hasSlotController.test(`start`):this.withStart,"has-end":this.hasUpdated?this.hasSlotController.test(`end`):this.withEnd,"is-icon-button":this.isIconButton})}
        ?disabled=${P(e?void 0:this.disabled)}
        type=${P(e?void 0:this.type)}
        title=${this.title}
        name=${P(e?void 0:this.name)}
        value=${P(e?void 0:this.value)}
        href=${P(e?this.href:void 0)}
        target=${P(e?this.target:void 0)}
        download=${P(e?this.download:void 0)}
        rel=${P(e&&this.rel?this.rel:void 0)}
        role=${P(e?void 0:`button`)}
        aria-disabled=${P(e&&this.disabled?`true`:void 0)}
        tabindex=${this.disabled?`-1`:`0`}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret?ko`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              `:``}
        ${this.loading?ko`<wa-spinner part="spinner"></wa-spinner>`:``}
      </${t}>
    `}};L.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0},L.css=[Co,fo,wo],D([j(`.button`)],L.prototype,`button`,2),D([j(`slot:not([name])`)],L.prototype,`labelSlot`,2),D([A()],L.prototype,`invalid`,2),D([A()],L.prototype,`isIconButton`,2),D([k()],L.prototype,`title`,2),D([k({reflect:!0})],L.prototype,`variant`,2),D([k({reflect:!0})],L.prototype,`appearance`,2),D([k({reflect:!0})],L.prototype,`size`,2),D([k({attribute:`with-caret`,type:Boolean,reflect:!0})],L.prototype,`withCaret`,2),D([k({attribute:`with-start`,type:Boolean})],L.prototype,`withStart`,2),D([k({attribute:`with-end`,type:Boolean})],L.prototype,`withEnd`,2),D([k({type:Boolean})],L.prototype,`disabled`,2),D([k({type:Boolean,reflect:!0})],L.prototype,`loading`,2),D([k({type:Boolean,reflect:!0})],L.prototype,`pill`,2),D([k()],L.prototype,`type`,2),D([k({reflect:!0})],L.prototype,`name`,2),D([k({reflect:!0})],L.prototype,`value`,2),D([k({reflect:!0})],L.prototype,`href`,2),D([k()],L.prototype,`target`,2),D([k()],L.prototype,`rel`,2),D([k()],L.prototype,`download`,2),D([k({attribute:`formaction`})],L.prototype,`formAction`,2),D([k({attribute:`formenctype`})],L.prototype,`formEnctype`,2),D([k({attribute:`formmethod`})],L.prototype,`formMethod`,2),D([k({attribute:`formnovalidate`,type:Boolean})],L.prototype,`formNoValidate`,2),D([k({attribute:`formtarget`})],L.prototype,`formTarget`,2),D([E(`disabled`,{waitUntilFirstUpdate:!0})],L.prototype,`handleDisabledChange`,1),D([E(`href`)],L.prototype,`handleHrefChange`,1),D([E(`loading`,{waitUntilFirstUpdate:!0})],L.prototype,`handleLoadingChange`,1),L=D([O(`wa-button`)],L),L.disableWarning?.(`change-in-update`);var Ao=y`
  :host {
    --track-width: 2px;
    --track-color: var(--wa-color-neutral-fill-normal);
    --indicator-color: var(--wa-color-brand-fill-loud);
    --speed: 2s;
    --size: 1em;

    /*
      Resizing a spinner element using anything but font-size will break the animation because the animation uses em
      units. Therefore, if a spinner is used in a flex container without \`flex: none\` applied, the spinner can
      grow/shrink and break the animation. The use of \`flex: none\` on the host element prevents this by always having
      the spinner sized according to its actual dimensions.
    */
    flex: none;
    display: inline-flex;
    width: var(--size);
    height: var(--size);
  }

  svg {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    animation: spin var(--speed) linear infinite;
  }

  .track,
  .indicator {
    --radius: calc(var(--size) / 2 - var(--track-width) / 2);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
    r: var(--radius);
    fill: none;
    stroke-width: var(--track-width);
  }

  .track {
    stroke: var(--track-color);
  }

  .indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: calc(0.597 * var(--circumference)), calc(0.796 * var(--circumference));
    stroke-dashoffset: calc(-0.04 * var(--circumference));
    animation: dash 1.5s ease-in-out infinite;
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
      stroke-dasharray: calc(0.008 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: calc(0.716 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: calc(-0.278 * var(--circumference));
    }
    100% {
      stroke-dasharray: calc(0.716 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: calc(-0.987 * var(--circumference));
    }
  }
`,jo=class extends M{constructor(){super(...arguments),this.localize=new T(this)}render(){return b`
      <svg
        part="base"
        role="progressbar"
        aria-label=${this.localize.term(`loading`)}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" />
        <circle class="indicator" />
      </svg>
    `}};jo.css=Ao,jo=D([O(`wa-spinner`)],jo);var Mo=y`
  :host {
    display: inline-flex;
  }

  .button-group {
    display: flex;
    position: relative;
    isolation: isolate;
    flex-wrap: wrap;

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

    :host([orientation='horizontal']) & {
      flex-direction: row;
    }

    :host([orientation='vertical']) & {
      flex-direction: column;
    }
  }

  /* Set custom properties to be inherited by slotted buttons */
  :host([orientation='horizontal']) {
    --_button-horizontal-indent: var(--wa-form-control-border-width);
    --_button-horizontal-indent-outlined: calc(var(--wa-form-control-border-width) * -1);
  }

  :host([orientation='vertical']) {
    --_button-vertical-indent: var(--wa-form-control-border-width);
    --_button-vertical-indent-outlined: calc(var(--wa-form-control-border-width) * -1);
  }

  /* All buttons that are not in front or at the end get their border radius removed */
  ::slotted(:not(:first-child):not(:last-child)) {
    --_button-start-start-radius: 0;
    --_button-start-end-radius: 0;
    --_button-end-start-radius: 0;
    --_button-end-end-radius: 0;
  }

  /* Remove leading and trailing buttons border radius individually */
  :host([orientation='horizontal']) {
    ::slotted(:first-child) {
      --_button-start-end-radius: 0;
      --_button-end-end-radius: 0;
    }

    ::slotted(:last-child) {
      --_button-start-start-radius: 0;
      --_button-end-start-radius: 0;
    }
  }

  :host([orientation='vertical']) {
    ::slotted(:first-child) {
      --_button-end-start-radius: 0;
      --_button-end-end-radius: 0;
    }

    ::slotted(:last-child) {
      --_button-start-start-radius: 0;
      --_button-start-end-radius: 0;
    }
  }
`,No=class extends M{constructor(){super(...arguments),this.disableRole=!1,this.hasOutlined=!1,this.label=``,this.orientation=`horizontal`}updated(e){super.updated(e),e.has(`orientation`)&&this.setAttribute(`aria-orientation`,this.orientation)}handleFocus(e){Po(e.target)?.classList.add(`button-focus`)}handleBlur(e){Po(e.target)?.classList.remove(`button-focus`)}handleMouseOver(e){Po(e.target)?.classList.add(`button-hover`)}handleMouseOut(e){Po(e.target)?.classList.remove(`button-hover`)}render(){return b`
      <slot
        part="base"
        class="button-group"
        role="${this.disableRole?`presentation`:`group`}"
        aria-label=${this.label}
        aria-orientation=${this.orientation}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      ></slot>
    `}};No.css=[Mo],D([j(`slot`)],No.prototype,`defaultSlot`,2),D([A()],No.prototype,`disableRole`,2),D([A()],No.prototype,`hasOutlined`,2),D([k()],No.prototype,`label`,2),D([k({reflect:!0})],No.prototype,`orientation`,2),No=D([O(`wa-button-group`)],No);function Po(e){let t=`wa-button, wa-radio-button`;return e.closest(t)??e.querySelector(t)}var Fo=y`
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
`,Io=class extends M{constructor(){super(...arguments),this.variant=`brand`,this.size=`medium`}render(){return b`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>
    `}};Io.css=[Fo,fo,wo],D([k({reflect:!0})],Io.prototype,`variant`,2),D([k({reflect:!0})],Io.prototype,`appearance`,2),D([k({reflect:!0})],Io.prototype,`size`,2),Io=D([O(`wa-callout`)],Io);var Lo=y`
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

  :host([orientation='horizontal']) .body slot::slotted(*) {
    display: block;
    height: 100%;
    margin: 0;
  }

  :host([orientation='horizontal']) slot[name='actions']::slotted(*) {
    display: flex;
    align-items: center;
    padding: var(--spacing);
  }
`,Ro=class extends M{constructor(){super(...arguments),this.hasSlotController=new So(this,`footer`,`header`,`media`,`header-actions`,`footer-actions`,`actions`),this.appearance=`outlined`,this.withHeader=!1,this.withMedia=!1,this.withFooter=!1,this.orientation=`vertical`}willUpdate(){!this.withHeader&&this.hasSlotController.test(`header`)&&(this.withHeader=!0),!this.withMedia&&this.hasSlotController.test(`media`)&&(this.withMedia=!0),!this.withFooter&&this.hasSlotController.test(`footer`)&&(this.withFooter=!0)}render(){return this.orientation===`horizontal`?b`
        <slot name="media" part="media" class="media"></slot>
        <div part="body" class="body"><slot></slot></div>
        <slot name="actions" part="actions" class="actions"></slot>
      `:b`
      <slot name="media" part="media" class="media"></slot>

      ${this.hasSlotController.test(`header-actions`)?b` <header part="header" class="header has-actions">
            <slot name="header"></slot>
            <slot name="header-actions"></slot>
          </header>`:b` <header part="header" class="header">
            <slot name="header"></slot>
          </header>`}

      <div part="body" class="body"><slot></slot></div>
      ${this.hasSlotController.test(`footer-actions`)?b` <footer part="footer" class="footer has-actions">
            <slot name="footer"></slot>
            <slot name="footer-actions"></slot>
          </footer>`:b` <footer part="footer" class="footer">
            <slot name="footer"></slot>
          </footer>`}
    `}};Ro.css=[wo,Lo],D([k({reflect:!0})],Ro.prototype,`appearance`,2),D([k({attribute:`with-header`,type:Boolean,reflect:!0})],Ro.prototype,`withHeader`,2),D([k({attribute:`with-media`,type:Boolean,reflect:!0})],Ro.prototype,`withMedia`,2),D([k({attribute:`with-footer`,type:Boolean,reflect:!0})],Ro.prototype,`withFooter`,2),D([k({reflect:!0})],Ro.prototype,`orientation`,2),Ro=D([O(`wa-card`)],Ro),Ro.disableWarning?.(`change-in-update`);var zo=class extends Event{constructor(e){super(`wa-slide-change`,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}},Bo=`useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict`,Vo=(e=21)=>{let t=``,n=crypto.getRandomValues(new Uint8Array(e|=0));for(;e--;)t+=Bo[n[e]&63];return t};function R(e,t,n){return(e=>Object.is(e,-0)?0:e)(e<t?t:e>n?n:e)}function Ho(e=``){return`${e}${Vo()}`}function Uo(e,t){return new Promise(n=>{function r(i){i.target===e&&(e.removeEventListener(t,r),n())}e.addEventListener(t,r)})}async function Wo(e,t,n){return e.animate(t,n).finished.catch(()=>{})}function z(e,t){return new Promise(n=>{let r=new AbortController,{signal:i}=r;if(e.classList.contains(t))return;e.classList.add(t);let a=!1,o=()=>{a||(a=!0,e.classList.remove(t),n(),r.abort())};e.addEventListener(`animationend`,o,{once:!0,signal:i}),e.addEventListener(`animationcancel`,o,{once:!0,signal:i}),requestAnimationFrame(()=>{!a&&e.getAnimations().length===0&&o()})})}function Go(e){return e=e.toString().toLowerCase(),e.indexOf(`ms`)>-1?parseFloat(e)||0:e.indexOf(`s`)>-1?(parseFloat(e)||0)*1e3:parseFloat(e)||0}function Ko(){return window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}var qo=class{constructor(e,t){this.timerId=0,this.activeInteractions=0,this.paused=!1,this.stopped=!0,this.pause=()=>{this.activeInteractions++||(this.paused=!0,this.host.requestUpdate())},this.resume=()=>{--this.activeInteractions||(this.paused=!1,this.host.requestUpdate())},e.addController(this),this.host=e,this.tickCallback=t}hostConnected(){this.host.addEventListener(`mouseenter`,this.pause),this.host.addEventListener(`mouseleave`,this.resume),this.host.addEventListener(`focusin`,this.pause),this.host.addEventListener(`focusout`,this.resume),this.host.addEventListener(`touchstart`,this.pause,{passive:!0}),this.host.addEventListener(`touchend`,this.resume)}hostDisconnected(){this.stop(),this.host.removeEventListener(`mouseenter`,this.pause),this.host.removeEventListener(`mouseleave`,this.resume),this.host.removeEventListener(`focusin`,this.pause),this.host.removeEventListener(`focusout`,this.resume),this.host.removeEventListener(`touchstart`,this.pause),this.host.removeEventListener(`touchend`,this.resume)}start(e){this.stop(),this.stopped=!1,this.timerId=window.setInterval(()=>{this.paused||this.tickCallback()},e)}stop(){clearInterval(this.timerId),this.stopped=!0,this.host.requestUpdate()}},Jo=y`
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
`;function*Yo(e,t){if(e!==void 0){let n=0;for(let r of e)yield t(r,n++)}}function*Xo(e,t,n=1){let r=t===void 0?0:e;t??=e;for(let e=r;n>0?e<t:t<e;e+=n)yield e}(()=>{let e=(e,t)=>{let n=0;return function(...r){window.clearTimeout(n),n=window.setTimeout(()=>{e.call(this,...r)},t)}},t=(e,t,n)=>{let r=e[t];e[t]=function(...e){r.call(this,...e),n.call(this,r,...e)}};if(!(`onscrollend`in window)){let n=new Set,r=new WeakMap;document.addEventListener(`pointerdown`,e=>{n.add(e.pointerId)}),document.addEventListener(`pointerup`,e=>{n.delete(e.pointerId)}),t(EventTarget.prototype,`addEventListener`,function(t,i){if(i!==`scroll`)return;let a=e(()=>{n.size?a():this.dispatchEvent(new Event(`scrollend`))},100);t.call(this,`scroll`,a,{passive:!0}),r.set(this,a)}),t(EventTarget.prototype,`removeEventListener`,function(e,t){if(t!==`scroll`)return;let n=r.get(this);n&&e.call(this,`scroll`,n,{passive:!0})})}})();var B=class extends M{constructor(){super(...arguments),this.loop=!1,this.slides=0,this.currentSlide=0,this.navigation=!1,this.pagination=!1,this.autoplay=!1,this.autoplayInterval=3e3,this.slidesPerPage=1,this.slidesPerMove=1,this.orientation=`horizontal`,this.mouseDragging=!1,this.activeSlide=0,this.scrolling=!1,this.dragging=!1,this.autoplayController=new qo(this,()=>this.next()),this.dragStartPosition=[-1,-1],this.localize=new T(this),this.pendingSlideChange=!1,this.handleMouseDrag=e=>{this.dragging||(this.scrollContainer.style.setProperty(`scroll-snap-type`,`none`),this.dragging=!0,this.dragStartPosition=[e.clientX,e.clientY]),this.scrollContainer.scrollBy({left:-e.movementX,top:-e.movementY,behavior:`instant`})},this.handleMouseDragEnd=()=>{let e=this.scrollContainer;document.removeEventListener(`pointermove`,this.handleMouseDrag,{capture:!0});let t=e.scrollLeft,n=e.scrollTop;e.style.removeProperty(`scroll-snap-type`),e.style.setProperty(`overflow`,`hidden`);let r=e.scrollLeft,i=e.scrollTop;e.style.removeProperty(`overflow`),e.style.setProperty(`scroll-snap-type`,`none`),e.scrollTo({left:t,top:n,behavior:`instant`}),requestAnimationFrame(async()=>{(t!==r||n!==i)&&(e.scrollTo({left:r,top:i,behavior:Ko()?`auto`:`smooth`}),await Uo(e,`scrollend`)),e.style.removeProperty(`scroll-snap-type`),this.dragging=!1,this.dragStartPosition=[-1,-1],this.handleScrollEnd()})},this.handleSlotChange=e=>{e.some(e=>[...e.addedNodes,...e.removedNodes].some(e=>this.isCarouselItem(e)&&!e.hasAttribute(`data-clone`)))&&this.initializeSlides(),this.requestUpdate()}}connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`region`),this.setAttribute(`aria-label`,this.localize.term(`carousel`))}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect(),this.resizeObserver?.disconnect()}firstUpdated(){this.initializeSlides(),this.mutationObserver=new MutationObserver(this.handleSlotChange),this.mutationObserver.observe(this,{childList:!0,subtree:!0}),this.resizeObserver=new ResizeObserver(()=>{(this.scrollContainer?.clientWidth||this.scrollContainer?.clientHeight)&&(this.synchronizeSlides(),this.resizeObserver?.disconnect(),this.resizeObserver=void 0)}),this.resizeObserver.observe(this)}willUpdate(e){(e.has(`slidesPerMove`)||e.has(`slidesPerPage`))&&(this.slidesPerMove=Math.min(this.slidesPerMove,this.slidesPerPage))}getPageCount(){let e=this.getSlides().length,{slidesPerPage:t,slidesPerMove:n,loop:r}=this,i=r?e/n:(e-t)/n+1;return Math.ceil(i)}getCurrentPage(){return Math.ceil(this.activeSlide/this.slidesPerMove)}canScrollNext(){return this.loop||this.getCurrentPage()<this.getPageCount()-1}canScrollPrev(){return this.loop||this.getCurrentPage()>0}getSlides({excludeClones:e=!0}={}){return[...this.children].filter(t=>this.isCarouselItem(t)&&(!e||!t.hasAttribute(`data-clone`)))}handleClick(e){if(this.dragging&&this.dragStartPosition[0]>0&&this.dragStartPosition[1]>0){let t=Math.abs(this.dragStartPosition[0]-e.clientX),n=Math.abs(this.dragStartPosition[1]-e.clientY);Math.sqrt(t*t+n*n)>=10&&e.preventDefault()}}handleKeyDown(e){if([`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`,`Home`,`End`].includes(e.key)){let t=e.target,n=this.localize.dir()===`rtl`,r=t.closest(`[part~="pagination-item"]`)!==null,i=e.key===`ArrowDown`||!n&&e.key===`ArrowRight`||n&&e.key===`ArrowLeft`,a=e.key===`ArrowUp`||!n&&e.key===`ArrowLeft`||n&&e.key===`ArrowRight`;e.preventDefault(),a&&this.previous(),i&&this.next(),e.key===`Home`&&this.goToSlide(0),e.key===`End`&&this.goToSlide(this.getSlides().length-1),r&&this.updateComplete.then(()=>{let e=this.shadowRoot?.querySelector(`[part~="pagination-item-active"]`);e&&e.focus()})}}handleMouseDragStart(e){this.mouseDragging&&e.button===0&&(e.preventDefault(),document.addEventListener(`pointermove`,this.handleMouseDrag,{capture:!0,passive:!0}),document.addEventListener(`pointerup`,this.handleMouseDragEnd,{capture:!0,once:!0}))}handleScroll(){this.scrolling=!0,this.pendingSlideChange||this.synchronizeSlides()}synchronizeSlides(){let e=new IntersectionObserver(t=>{e.disconnect();for(let e of t){let t=e.target;t.toggleAttribute(`inert`,!e.isIntersecting),t.classList.toggle(`--in-view`,e.isIntersecting),t.setAttribute(`aria-hidden`,e.isIntersecting?`false`:`true`)}let n=t.find(e=>e.isIntersecting);if(!n)return;let r=this.getSlides({excludeClones:!1}),i=this.getSlides().length,a=r.indexOf(n.target),o=this.loop?a-this.slidesPerPage:a;if(n&&(this.activeSlide=(Math.ceil(o/this.slidesPerMove)*this.slidesPerMove+i)%i,!this.scrolling&&this.loop&&n.target.hasAttribute(`data-clone`))){let e=Number(n.target.getAttribute(`data-clone`));this.goToSlide(e,`instant`)}},{root:this.scrollContainer,threshold:.6});this.getSlides({excludeClones:!1}).forEach(t=>{e.observe(t)})}handleScrollEnd(){!this.scrolling||this.dragging||(this.synchronizeSlides(),this.scrolling=!1,this.pendingSlideChange=!1,this.synchronizeSlides())}isCarouselItem(e){return e instanceof Element&&e.tagName.toLowerCase()===`wa-carousel-item`}initializeSlides(){this.getSlides({excludeClones:!1}).forEach((e,t)=>{e.classList.remove(`--in-view`),e.classList.remove(`--is-active`),e.setAttribute(`aria-label`,this.localize.term(`slideNum`,t+1)),e.hasAttribute(`data-clone`)&&e.remove()}),this.updateSlidesSnap(),this.loop&&this.createClones(),this.goToSlide(this.activeSlide,`auto`),this.synchronizeSlides()}createClones(){let e=this.getSlides(),t=this.slidesPerPage,n=e.slice(-t),r=e.slice(0,t);n.reverse().forEach((t,n)=>{let r=t.cloneNode(!0);r.setAttribute(`data-clone`,String(e.length-n-1)),this.prepend(r)}),r.forEach((e,t)=>{let n=e.cloneNode(!0);n.setAttribute(`data-clone`,String(t)),this.append(n)})}handleSlideChange(){let e=this.getSlides();e.forEach((e,t)=>{e.classList.toggle(`--is-active`,t===this.activeSlide)}),this.hasUpdated&&this.dispatchEvent(new zo({index:this.activeSlide,slide:e[this.activeSlide]}))}updateSlidesSnap(){let e=this.getSlides(),t=this.slidesPerMove;e.forEach((e,n)=>{(n+t)%t===0?e.style.removeProperty(`scroll-snap-align`):e.style.setProperty(`scroll-snap-align`,`none`)})}handleAutoplayChange(){this.autoplayController.stop(),this.autoplay&&this.autoplayController.start(this.autoplayInterval)}previous(e=`smooth`){this.goToSlide(this.activeSlide-this.slidesPerMove,e)}next(e=`smooth`){this.goToSlide(this.activeSlide+this.slidesPerMove,e)}goToSlide(e,t=`smooth`){let{slidesPerPage:n,loop:r}=this,i=this.getSlides(),a=this.getSlides({excludeClones:!1});if(!i.length)return;this.activeSlide=r?(e+i.length)%i.length:R(e,0,i.length-n);let o=this.localize.dir()===`rtl`,s=a[R(e+(r?n:0)+(o?n-1:0),0,a.length-1)];this.scrollToSlide(s,Ko()?`auto`:t)}scrollToSlide(e,t=`smooth`){this.pendingSlideChange=!0,window.requestAnimationFrame(()=>{if(!this.scrollContainer)return;let n=this.scrollContainer,r=n.getBoundingClientRect(),i=e.getBoundingClientRect(),a=i.left-r.left,o=i.top-r.top;a||o?(this.pendingSlideChange=!0,n.scrollTo({left:a+n.scrollLeft,top:o+n.scrollTop,behavior:t})):this.pendingSlideChange=!1})}render(){let{slidesPerMove:e,scrolling:t}=this,n=0,r=0,i=!1,a=!1;this.hasUpdated&&(n=this.getPageCount(),r=this.getCurrentPage(),i=this.canScrollPrev(),a=this.canScrollNext());let o=this.localize.dir()===`rtl`;return b`
      <div part="base" class="carousel">
        <div
          id="scroll-container"
          part="scroll-container"
          class="${I({slides:!0,"slides-horizontal":this.orientation===`horizontal`,"slides-vertical":this.orientation===`vertical`,"slides-dragging":this.dragging})}"
          style=${N({"--slides-per-page":this.slidesPerPage})}
          aria-busy="${t?`true`:`false`}"
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

        ${this.navigation?b`
              <div part="navigation" class="navigation">
                <button
                  part="navigation-button navigation-button-previous"
                  class="${I({"navigation-button":!0,"navigation-button-previous":!0,"navigation-button-disabled":!i})}"
                  aria-label="${this.localize.term(`previousSlide`)}"
                  aria-controls="scroll-container"
                  aria-disabled="${i?`false`:`true`}"
                  @click=${i?()=>this.previous():null}
                >
                  <slot name="previous-icon">
                    <wa-icon library="system" name="${o?`chevron-right`:`chevron-left`}"></wa-icon>
                  </slot>
                </button>

                <button
                  part="navigation-button navigation-button-next"
                  class=${I({"navigation-button":!0,"navigation-button-next":!0,"navigation-button-disabled":!a})}
                  aria-label="${this.localize.term(`nextSlide`)}"
                  aria-controls="scroll-container"
                  aria-disabled="${a?`false`:`true`}"
                  @click=${a?()=>this.next():null}
                >
                  <slot name="next-icon">
                    <wa-icon library="system" name="${o?`chevron-left`:`chevron-right`}"></wa-icon>
                  </slot>
                </button>
              </div>
            `:``}
        ${this.pagination?b`
              <div part="pagination" role="tablist" class="pagination" aria-controls="scroll-container">
                ${Yo(Xo(n),t=>{let i=t===r;return b`
                    <button
                      part="pagination-item ${i?`pagination-item-active`:``}"
                      class="${I({"pagination-item":!0,"pagination-item-active":i})}"
                      role="tab"
                      aria-selected="${i?`true`:`false`}"
                      aria-label="${this.localize.term(`goToSlide`,t+1,n)}"
                      tabindex=${i?`0`:`-1`}
                      @click=${()=>this.goToSlide(t*e)}
                      @keydown=${this.handleKeyDown}
                    ></button>
                  `})}
              </div>
            `:b``}
      </div>
    `}};B.css=Jo,D([k({type:Boolean,reflect:!0})],B.prototype,`loop`,2),D([k({type:Number,reflect:!0})],B.prototype,`slides`,2),D([k({type:Number,reflect:!0})],B.prototype,`currentSlide`,2),D([k({type:Boolean,reflect:!0})],B.prototype,`navigation`,2),D([k({type:Boolean,reflect:!0})],B.prototype,`pagination`,2),D([k({type:Boolean,reflect:!0})],B.prototype,`autoplay`,2),D([k({type:Number,attribute:`autoplay-interval`})],B.prototype,`autoplayInterval`,2),D([k({type:Number,attribute:`slides-per-page`})],B.prototype,`slidesPerPage`,2),D([k({type:Number,attribute:`slides-per-move`})],B.prototype,`slidesPerMove`,2),D([k()],B.prototype,`orientation`,2),D([k({type:Boolean,reflect:!0,attribute:`mouse-dragging`})],B.prototype,`mouseDragging`,2),D([j(`.slides`)],B.prototype,`scrollContainer`,2),D([j(`.pagination`)],B.prototype,`paginationContainer`,2),D([A()],B.prototype,`activeSlide`,2),D([A()],B.prototype,`scrolling`,2),D([A()],B.prototype,`dragging`,2),D([Or({passive:!0})],B.prototype,`handleScroll`,1),D([E(`loop`,{waitUntilFirstUpdate:!0}),E(`slidesPerPage`,{waitUntilFirstUpdate:!0})],B.prototype,`initializeSlides`,1),D([E(`activeSlide`)],B.prototype,`handleSlideChange`,1),D([E(`slidesPerMove`)],B.prototype,`updateSlidesSnap`,1),D([E(`autoplay`)],B.prototype,`handleAutoplayChange`,1),B=D([O(`wa-carousel`)],B);var Zo=y`
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
`,Qo=class extends M{connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`group`)}render(){return b` <slot></slot> `}};Qo.css=Zo,Qo=D([O(`wa-carousel-item`)],Qo);var $o=(e={})=>{let{validationElement:t,validationProperty:n}=e;t||=Object.assign(document.createElement(`input`),{required:!0}),n||=`value`;let r={observedAttributes:[`required`],message:t.validationMessage,checkValidity(e){let t={message:``,isValid:!0,invalidKeys:[]};return(e.required??e.hasAttribute(`required`))&&(e[n]||(t.message=typeof r.message==`function`?r.message(e):r.message||``,t.isValid=!1,t.invalidKeys.push(`valueMissing`))),t}};return r},es=y`
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
`,ts=y`
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
`,ns=pn(class extends mn{constructor(e){if(super(e),e.type!==fn.PROPERTY&&e.type!==fn.ATTRIBUTE&&e.type!==fn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!bn(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Ke||t===x)return t;let n=e.element,r=e.name;if(e.type===fn.PROPERTY){if(t===n[r])return Ke}else if(e.type===fn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Ke}else if(e.type===fn.ATTRIBUTE&&n.getAttribute(r)===t+``)return Ke;return Tn(e),t}}),rs=class extends F{constructor(){super(...arguments),this.hasSlotController=new So(this,`hint`),this.title=``,this.name=null,this._value=this.getAttribute(`value`)??null,this.size=`medium`,this.disabled=!1,this.indeterminate=!1,this._checked=null,this.defaultChecked=this.hasAttribute(`checked`),this.required=!1,this.hint=``}static get validators(){let e=[$o({validationProperty:`checked`,validationElement:Object.assign(document.createElement(`input`),{type:`checkbox`,required:!0})})];return[...super.validators,...e]}get value(){let e=this._value||`on`;return this.checked?e:null}set value(e){this._value=e}get checked(){return this.valueHasChanged?!!this._checked:this._checked??this.defaultChecked}set checked(e){this._checked=!!e,this.valueHasChanged=!0}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))})}connectedCallback(){super.connectedCallback(),this.handleDefaultCheckedChange()}handleDefaultCheckedChange(){this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set(`checked`,this.checked),this.customStates.set(`indeterminate`,this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set(`disabled`,this.disabled)}willUpdate(e){super.willUpdate(e),(e.has(`value`)||e.has(`checked`)||e.has(`defaultChecked`))&&this.handleValueOrCheckedChange()}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}render(){let e=this.hasSlotController.test(`hint`),t=this.hint?!0:!!e,n=!this.checked&&this.indeterminate,r=n?`indeterminate`:`check`,i=n?`indeterminate`:`check`;return b`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${P(this.name)}
            value=${P(this._value)}
            .indeterminate=${ns(this.indeterminate)}
            .checked=${ns(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?`true`:`false`}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${i}-icon icon" library="system" name=${r}></wa-icon>
        </span>

        <slot part="label"></slot>
      </label>

      <slot
        id="hint"
        part="hint"
        name="hint"
        aria-hidden=${t?`false`:`true`}
        class="${I({"has-slotted":t})}"
      >
        ${this.hint}
      </slot>
    `}};rs.css=[es,wo,ts],rs.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0},D([j(`input[type="checkbox"]`)],rs.prototype,`input`,2),D([k()],rs.prototype,`title`,2),D([k({reflect:!0})],rs.prototype,`name`,2),D([k({reflect:!0})],rs.prototype,`value`,1),D([k({reflect:!0})],rs.prototype,`size`,2),D([k({type:Boolean})],rs.prototype,`disabled`,2),D([k({type:Boolean,reflect:!0})],rs.prototype,`indeterminate`,2),D([k({type:Boolean,attribute:!1})],rs.prototype,`checked`,1),D([k({type:Boolean,reflect:!0,attribute:`checked`})],rs.prototype,`defaultChecked`,2),D([k({type:Boolean,reflect:!0})],rs.prototype,`required`,2),D([k()],rs.prototype,`hint`,2),D([E([`checked`,`defaultChecked`])],rs.prototype,`handleDefaultCheckedChange`,1),D([E([`checked`,`indeterminate`])],rs.prototype,`handleStateChange`,1),D([E(`disabled`)],rs.prototype,`handleDisabledChange`,1),rs=D([O(`wa-checkbox`)],rs),rs.disableWarning?.(`change-in-update`);var is=y`
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
`;function as(e,t){function n(n){let r=e.getBoundingClientRect(),i=e.ownerDocument.defaultView,a=r.left+i.pageXOffset,o=r.top+i.pageYOffset,s=n.pageX-a,c=n.pageY-o;t?.onMove&&t.onMove(s,c)}function r(){document.removeEventListener(`pointermove`,n),document.removeEventListener(`pointerup`,r),t?.onStop&&t.onStop()}document.addEventListener(`pointermove`,n,{passive:!0}),document.addEventListener(`pointerup`,r),t?.initialEvent instanceof PointerEvent&&n(t.initialEvent)}var os=typeof window<`u`&&`ontouchstart`in window,ss=class{constructor(e,t){this.isActive=!1,this.isDragging=!1,this.handleDragStart=e=>{let t=`touches`in e?e.touches[0].clientX:e.clientX,n=`touches`in e?e.touches[0].clientY:e.clientY;this.isDragging||!os&&e.buttons>1||(this.isDragging=!0,document.addEventListener(`pointerup`,this.handleDragStop),document.addEventListener(`pointermove`,this.handleDragMove),document.addEventListener(`pointercancel`,this.handleDragStop),document.addEventListener(`touchend`,this.handleDragStop),document.addEventListener(`touchmove`,this.handleDragMove),document.addEventListener(`touchcancel`,this.handleDragStop),this.options.start(t,n))},this.handleDragStop=e=>{let t=`changedTouches`in e?e.changedTouches[0].clientX:e.clientX,n=`changedTouches`in e?e.changedTouches[0].clientY:e.clientY;this.isDragging=!1,document.removeEventListener(`pointerup`,this.handleDragStop),document.removeEventListener(`pointermove`,this.handleDragMove),document.removeEventListener(`pointercancel`,this.handleDragStop),document.removeEventListener(`touchend`,this.handleDragStop),document.removeEventListener(`touchmove`,this.handleDragMove),document.removeEventListener(`touchcancel`,this.handleDragStop),this.options.stop(t,n)},this.handleDragMove=e=>{let t=`touches`in e?e.touches[0].clientX:e.clientX,n=`touches`in e?e.touches[0].clientY:e.clientY;window.getSelection()?.removeAllRanges(),this.options.move(t,n)},this.element=e,this.options={start:()=>void 0,stop:()=>void 0,move:()=>void 0,...t},this.start()}start(){this.isActive||=(this.element.addEventListener(`pointerdown`,this.handleDragStart),os&&this.element.addEventListener(`touchstart`,this.handleDragStart),!0)}stop(){document.removeEventListener(`pointerup`,this.handleDragStop),document.removeEventListener(`pointermove`,this.handleDragMove),document.removeEventListener(`pointercancel`,this.handleDragStop),document.removeEventListener(`touchend`,this.handleDragStop),document.removeEventListener(`touchmove`,this.handleDragMove),document.removeEventListener(`touchcancel`,this.handleDragStop),this.element.removeEventListener(`pointerdown`,this.handleDragStart),os&&this.element.removeEventListener(`touchstart`,this.handleDragStart),this.isActive=!1,this.isDragging=!1}toggle(e){(e===void 0?!this.isActive:e)?this.start():this.stop()}},cs=y`
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
`,ls=[];function us(e){ls.push(e)}function ds(e){for(let t=ls.length-1;t>=0;t--)if(ls[t]===e){ls.splice(t,1);break}}function fs(e){return ls.length>0&&ls[ls.length-1]===e}function ps(e,t){hs(e)&&(e=`100%`);let n=gs(e);return e=t===360?e:Math.min(t,Math.max(0,parseFloat(e))),n&&(e=parseInt(String(e*t),10)/100),Math.abs(e-t)<1e-6?1:(e=t===360?(e<0?e%t+t:e%t)/parseFloat(String(t)):e%t/parseFloat(String(t)),e)}function ms(e){return Math.min(1,Math.max(0,e))}function hs(e){return typeof e==`string`&&e.indexOf(`.`)!==-1&&parseFloat(e)===1}function gs(e){return typeof e==`string`&&e.indexOf(`%`)!==-1}function _s(e){return e=parseFloat(e),(isNaN(e)||e<0||e>1)&&(e=1),e}function vs(e){return Number(e)<=1?`${Number(e)*100}%`:e}function ys(e){return e.length===1?`0`+e:String(e)}function bs(e,t,n){return{r:ps(e,255)*255,g:ps(t,255)*255,b:ps(n,255)*255}}function xs(e,t,n){e=ps(e,255),t=ps(t,255),n=ps(n,255);let r=Math.max(e,t,n),i=Math.min(e,t,n),a=0,o=0,s=(r+i)/2;if(r===i)o=0,a=0;else{let c=r-i;switch(o=s>.5?c/(2-r-i):c/(r+i),r){case e:a=(t-n)/c+(t<n?6:0);break;case t:a=(n-e)/c+2;break;case n:a=(e-t)/c+4;break;default:break}a/=6}return{h:a,s:o,l:s}}function Ss(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*(6*n):n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function Cs(e,t,n){let r,i,a;if(e=ps(e,360),t=ps(t,100),n=ps(n,100),t===0)i=n,a=n,r=n;else{let o=n<.5?n*(1+t):n+t-n*t,s=2*n-o;r=Ss(s,o,e+1/3),i=Ss(s,o,e),a=Ss(s,o,e-1/3)}return{r:r*255,g:i*255,b:a*255}}function ws(e,t,n){e=ps(e,255),t=ps(t,255),n=ps(n,255);let r=Math.max(e,t,n),i=Math.min(e,t,n),a=0,o=r,s=r-i,c=r===0?0:s/r;if(r===i)a=0;else{switch(r){case e:a=(t-n)/s+(t<n?6:0);break;case t:a=(n-e)/s+2;break;case n:a=(e-t)/s+4;break;default:break}a/=6}return{h:a,s:c,v:o}}function Ts(e,t,n){e=ps(e,360)*6,t=ps(t,100),n=ps(n,100);let r=Math.floor(e),i=e-r,a=n*(1-t),o=n*(1-i*t),s=n*(1-(1-i)*t),c=r%6,l=[n,o,a,a,s,n][c],u=[s,n,n,o,a,a][c],d=[a,a,s,n,n,o][c];return{r:l*255,g:u*255,b:d*255}}function Es(e,t,n,r){let i=[ys(Math.round(e).toString(16)),ys(Math.round(t).toString(16)),ys(Math.round(n).toString(16))];return r&&i[0].startsWith(i[0].charAt(1))&&i[1].startsWith(i[1].charAt(1))&&i[2].startsWith(i[2].charAt(1))?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join(``)}function Ds(e,t,n,r,i){let a=[ys(Math.round(e).toString(16)),ys(Math.round(t).toString(16)),ys(Math.round(n).toString(16)),ys(As(r))];return i&&a[0].startsWith(a[0].charAt(1))&&a[1].startsWith(a[1].charAt(1))&&a[2].startsWith(a[2].charAt(1))&&a[3].startsWith(a[3].charAt(1))?a[0].charAt(0)+a[1].charAt(0)+a[2].charAt(0)+a[3].charAt(0):a.join(``)}function Os(e,t,n,r){let i=e/100,a=t/100,o=n/100,s=r/100;return{r:255*(1-i)*(1-s),g:255*(1-a)*(1-s),b:255*(1-o)*(1-s)}}function ks(e,t,n){let r=1-e/255,i=1-t/255,a=1-n/255,o=Math.min(r,i,a);return o===1?(r=0,i=0,a=0):(r=(r-o)/(1-o)*100,i=(i-o)/(1-o)*100,a=(a-o)/(1-o)*100),o*=100,{c:Math.round(r),m:Math.round(i),y:Math.round(a),k:Math.round(o)}}function As(e){return Math.round(parseFloat(e)*255).toString(16)}function js(e){return Ms(e)/255}function Ms(e){return parseInt(e,16)}function Ns(e){return{r:e>>16,g:(e&65280)>>8,b:e&255}}var Ps={aliceblue:`#f0f8ff`,antiquewhite:`#faebd7`,aqua:`#00ffff`,aquamarine:`#7fffd4`,azure:`#f0ffff`,beige:`#f5f5dc`,bisque:`#ffe4c4`,black:`#000000`,blanchedalmond:`#ffebcd`,blue:`#0000ff`,blueviolet:`#8a2be2`,brown:`#a52a2a`,burlywood:`#deb887`,cadetblue:`#5f9ea0`,chartreuse:`#7fff00`,chocolate:`#d2691e`,coral:`#ff7f50`,cornflowerblue:`#6495ed`,cornsilk:`#fff8dc`,crimson:`#dc143c`,cyan:`#00ffff`,darkblue:`#00008b`,darkcyan:`#008b8b`,darkgoldenrod:`#b8860b`,darkgray:`#a9a9a9`,darkgreen:`#006400`,darkgrey:`#a9a9a9`,darkkhaki:`#bdb76b`,darkmagenta:`#8b008b`,darkolivegreen:`#556b2f`,darkorange:`#ff8c00`,darkorchid:`#9932cc`,darkred:`#8b0000`,darksalmon:`#e9967a`,darkseagreen:`#8fbc8f`,darkslateblue:`#483d8b`,darkslategray:`#2f4f4f`,darkslategrey:`#2f4f4f`,darkturquoise:`#00ced1`,darkviolet:`#9400d3`,deeppink:`#ff1493`,deepskyblue:`#00bfff`,dimgray:`#696969`,dimgrey:`#696969`,dodgerblue:`#1e90ff`,firebrick:`#b22222`,floralwhite:`#fffaf0`,forestgreen:`#228b22`,fuchsia:`#ff00ff`,gainsboro:`#dcdcdc`,ghostwhite:`#f8f8ff`,goldenrod:`#daa520`,gold:`#ffd700`,gray:`#808080`,green:`#008000`,greenyellow:`#adff2f`,grey:`#808080`,honeydew:`#f0fff0`,hotpink:`#ff69b4`,indianred:`#cd5c5c`,indigo:`#4b0082`,ivory:`#fffff0`,khaki:`#f0e68c`,lavenderblush:`#fff0f5`,lavender:`#e6e6fa`,lawngreen:`#7cfc00`,lemonchiffon:`#fffacd`,lightblue:`#add8e6`,lightcoral:`#f08080`,lightcyan:`#e0ffff`,lightgoldenrodyellow:`#fafad2`,lightgray:`#d3d3d3`,lightgreen:`#90ee90`,lightgrey:`#d3d3d3`,lightpink:`#ffb6c1`,lightsalmon:`#ffa07a`,lightseagreen:`#20b2aa`,lightskyblue:`#87cefa`,lightslategray:`#778899`,lightslategrey:`#778899`,lightsteelblue:`#b0c4de`,lightyellow:`#ffffe0`,lime:`#00ff00`,limegreen:`#32cd32`,linen:`#faf0e6`,magenta:`#ff00ff`,maroon:`#800000`,mediumaquamarine:`#66cdaa`,mediumblue:`#0000cd`,mediumorchid:`#ba55d3`,mediumpurple:`#9370db`,mediumseagreen:`#3cb371`,mediumslateblue:`#7b68ee`,mediumspringgreen:`#00fa9a`,mediumturquoise:`#48d1cc`,mediumvioletred:`#c71585`,midnightblue:`#191970`,mintcream:`#f5fffa`,mistyrose:`#ffe4e1`,moccasin:`#ffe4b5`,navajowhite:`#ffdead`,navy:`#000080`,oldlace:`#fdf5e6`,olive:`#808000`,olivedrab:`#6b8e23`,orange:`#ffa500`,orangered:`#ff4500`,orchid:`#da70d6`,palegoldenrod:`#eee8aa`,palegreen:`#98fb98`,paleturquoise:`#afeeee`,palevioletred:`#db7093`,papayawhip:`#ffefd5`,peachpuff:`#ffdab9`,peru:`#cd853f`,pink:`#ffc0cb`,plum:`#dda0dd`,powderblue:`#b0e0e6`,purple:`#800080`,rebeccapurple:`#663399`,red:`#ff0000`,rosybrown:`#bc8f8f`,royalblue:`#4169e1`,saddlebrown:`#8b4513`,salmon:`#fa8072`,sandybrown:`#f4a460`,seagreen:`#2e8b57`,seashell:`#fff5ee`,sienna:`#a0522d`,silver:`#c0c0c0`,skyblue:`#87ceeb`,slateblue:`#6a5acd`,slategray:`#708090`,slategrey:`#708090`,snow:`#fffafa`,springgreen:`#00ff7f`,steelblue:`#4682b4`,tan:`#d2b48c`,teal:`#008080`,thistle:`#d8bfd8`,tomato:`#ff6347`,turquoise:`#40e0d0`,violet:`#ee82ee`,wheat:`#f5deb3`,white:`#ffffff`,whitesmoke:`#f5f5f5`,yellow:`#ffff00`,yellowgreen:`#9acd32`};function Fs(e){let t={r:0,g:0,b:0},n=1,r=null,i=null,a=null,o=!1,s=!1;return typeof e==`string`&&(e=Bs(e)),typeof e==`object`&&(Vs(e.r)&&Vs(e.g)&&Vs(e.b)?(t=bs(e.r,e.g,e.b),o=!0,s=String(e.r).substr(-1)===`%`?`prgb`:`rgb`):Vs(e.h)&&Vs(e.s)&&Vs(e.v)?(r=vs(e.s),i=vs(e.v),t=Ts(e.h,r,i),o=!0,s=`hsv`):Vs(e.h)&&Vs(e.s)&&Vs(e.l)?(r=vs(e.s),a=vs(e.l),t=Cs(e.h,r,a),o=!0,s=`hsl`):Vs(e.c)&&Vs(e.m)&&Vs(e.y)&&Vs(e.k)&&(t=Os(e.c,e.m,e.y,e.k),o=!0,s=`cmyk`),Object.prototype.hasOwnProperty.call(e,`a`)&&(n=e.a)),n=_s(n),{ok:o,format:e.format||s,r:Math.min(255,Math.max(t.r,0)),g:Math.min(255,Math.max(t.g,0)),b:Math.min(255,Math.max(t.b,0)),a:n}}var Is=`(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)`,Ls=`[\\s|\\(]+(`+Is+`)[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?`,Rs=`[\\s|\\(]+(`+Is+`)[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?`,zs={CSS_UNIT:new RegExp(Is),rgb:RegExp(`rgb`+Ls),rgba:RegExp(`rgba`+Rs),hsl:RegExp(`hsl`+Ls),hsla:RegExp(`hsla`+Rs),hsv:RegExp(`hsv`+Ls),hsva:RegExp(`hsva`+Rs),cmyk:RegExp(`cmyk`+Rs),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function Bs(e){if(e=e.trim().toLowerCase(),e.length===0)return!1;let t=!1;if(Ps[e])e=Ps[e],t=!0;else if(e===`transparent`)return{r:0,g:0,b:0,a:0,format:`name`};let n=zs.rgb.exec(e);return n?{r:n[1],g:n[2],b:n[3]}:(n=zs.rgba.exec(e),n?{r:n[1],g:n[2],b:n[3],a:n[4]}:(n=zs.hsl.exec(e),n?{h:n[1],s:n[2],l:n[3]}:(n=zs.hsla.exec(e),n?{h:n[1],s:n[2],l:n[3],a:n[4]}:(n=zs.hsv.exec(e),n?{h:n[1],s:n[2],v:n[3]}:(n=zs.hsva.exec(e),n?{h:n[1],s:n[2],v:n[3],a:n[4]}:(n=zs.cmyk.exec(e),n?{c:n[1],m:n[2],y:n[3],k:n[4]}:(n=zs.hex8.exec(e),n?{r:Ms(n[1]),g:Ms(n[2]),b:Ms(n[3]),a:js(n[4]),format:t?`name`:`hex8`}:(n=zs.hex6.exec(e),n?{r:Ms(n[1]),g:Ms(n[2]),b:Ms(n[3]),format:t?`name`:`hex`}:(n=zs.hex4.exec(e),n?{r:Ms(n[1]+n[1]),g:Ms(n[2]+n[2]),b:Ms(n[3]+n[3]),a:js(n[4]+n[4]),format:t?`name`:`hex8`}:(n=zs.hex3.exec(e),n?{r:Ms(n[1]+n[1]),g:Ms(n[2]+n[2]),b:Ms(n[3]+n[3]),format:t?`name`:`hex`}:!1))))))))))}function Vs(e){return typeof e==`number`?!Number.isNaN(e):zs.CSS_UNIT.test(e)}var Hs=class e{constructor(t=``,n={}){if(t instanceof e)return t;typeof t==`number`&&(t=Ns(t)),this.originalInput=t;let r=Fs(t);this.originalInput=t,this.r=r.r,this.g=r.g,this.b=r.b,this.a=r.a,this.roundA=Math.round(100*this.a)/100,this.format=n.format??r.format,this.gradientType=n.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=r.ok}isDark(){return this.getBrightness()<128}isLight(){return!this.isDark()}getBrightness(){let e=this.toRgb();return(e.r*299+e.g*587+e.b*114)/1e3}getLuminance(){let e=this.toRgb(),t,n,r,i=e.r/255,a=e.g/255,o=e.b/255;return t=i<=.03928?i/12.92:((i+.055)/1.055)**2.4,n=a<=.03928?a/12.92:((a+.055)/1.055)**2.4,r=o<=.03928?o/12.92:((o+.055)/1.055)**2.4,.2126*t+.7152*n+.0722*r}getAlpha(){return this.a}setAlpha(e){return this.a=_s(e),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){let{s:e}=this.toHsl();return e===0}toHsv(){let e=ws(this.r,this.g,this.b);return{h:e.h*360,s:e.s,v:e.v,a:this.a}}toHsvString(){let e=ws(this.r,this.g,this.b),t=Math.round(e.h*360),n=Math.round(e.s*100),r=Math.round(e.v*100);return this.a===1?`hsv(${t}, ${n}%, ${r}%)`:`hsva(${t}, ${n}%, ${r}%, ${this.roundA})`}toHsl(){let e=xs(this.r,this.g,this.b);return{h:e.h*360,s:e.s,l:e.l,a:this.a}}toHslString(){let e=xs(this.r,this.g,this.b),t=Math.round(e.h*360),n=Math.round(e.s*100),r=Math.round(e.l*100);return this.a===1?`hsl(${t}, ${n}%, ${r}%)`:`hsla(${t}, ${n}%, ${r}%, ${this.roundA})`}toHex(e=!1){return Es(this.r,this.g,this.b,e)}toHexString(e=!1){return`#`+this.toHex(e)}toHex8(e=!1){return Ds(this.r,this.g,this.b,this.a,e)}toHex8String(e=!1){return`#`+this.toHex8(e)}toHexShortString(e=!1){return this.a===1?this.toHexString(e):this.toHex8String(e)}toRgb(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){let e=Math.round(this.r),t=Math.round(this.g),n=Math.round(this.b);return this.a===1?`rgb(${e}, ${t}, ${n})`:`rgba(${e}, ${t}, ${n}, ${this.roundA})`}toPercentageRgb(){let e=e=>`${Math.round(ps(e,255)*100)}%`;return{r:e(this.r),g:e(this.g),b:e(this.b),a:this.a}}toPercentageRgbString(){let e=e=>Math.round(ps(e,255)*100);return this.a===1?`rgb(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%)`:`rgba(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%, ${this.roundA})`}toCmyk(){return{...ks(this.r,this.g,this.b)}}toCmykString(){let{c:e,m:t,y:n,k:r}=ks(this.r,this.g,this.b);return`cmyk(${e}, ${t}, ${n}, ${r})`}toName(){if(this.a===0)return`transparent`;if(this.a<1)return!1;let e=`#`+Es(this.r,this.g,this.b,!1);for(let[t,n]of Object.entries(Ps))if(e===n)return t;return!1}toString(e){let t=!!e;e??=this.format;let n=!1,r=this.a<1&&this.a>=0;return!t&&r&&(e.startsWith(`hex`)||e===`name`)?e===`name`&&this.a===0?this.toName():this.toRgbString():(e===`rgb`&&(n=this.toRgbString()),e===`prgb`&&(n=this.toPercentageRgbString()),(e===`hex`||e===`hex6`)&&(n=this.toHexString()),e===`hex3`&&(n=this.toHexString(!0)),e===`hex4`&&(n=this.toHex8String(!0)),e===`hex8`&&(n=this.toHex8String()),e===`name`&&(n=this.toName()),e===`hsl`&&(n=this.toHslString()),e===`hsv`&&(n=this.toHsvString()),e===`cmyk`&&(n=this.toCmykString()),n||this.toHexString())}toNumber(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new e(this.toString())}lighten(t=10){let n=this.toHsl();return n.l+=t/100,n.l=ms(n.l),new e(n)}brighten(t=10){let n=this.toRgb();return n.r=Math.max(0,Math.min(255,n.r-Math.round(255*-(t/100)))),n.g=Math.max(0,Math.min(255,n.g-Math.round(255*-(t/100)))),n.b=Math.max(0,Math.min(255,n.b-Math.round(255*-(t/100)))),new e(n)}darken(t=10){let n=this.toHsl();return n.l-=t/100,n.l=ms(n.l),new e(n)}tint(e=10){return this.mix(`white`,e)}shade(e=10){return this.mix(`black`,e)}desaturate(t=10){let n=this.toHsl();return n.s-=t/100,n.s=ms(n.s),new e(n)}saturate(t=10){let n=this.toHsl();return n.s+=t/100,n.s=ms(n.s),new e(n)}greyscale(){return this.desaturate(100)}spin(t){let n=this.toHsl(),r=(n.h+t)%360;return n.h=r<0?360+r:r,new e(n)}mix(t,n=50){let r=this.toRgb(),i=new e(t).toRgb(),a=n/100;return new e({r:(i.r-r.r)*a+r.r,g:(i.g-r.g)*a+r.g,b:(i.b-r.b)*a+r.b,a:(i.a-r.a)*a+r.a})}analogous(t=6,n=30){let r=this.toHsl(),i=360/n,a=[this];for(r.h=(r.h-(i*t>>1)+720)%360;--t;)r.h=(r.h+i)%360,a.push(new e(r));return a}complement(){let t=this.toHsl();return t.h=(t.h+180)%360,new e(t)}monochromatic(t=6){let n=this.toHsv(),{h:r}=n,{s:i}=n,{v:a}=n,o=[],s=1/t;for(;t--;)o.push(new e({h:r,s:i,v:a})),a=(a+s)%1;return o}splitcomplement(){let t=this.toHsl(),{h:n}=t;return[this,new e({h:(n+72)%360,s:t.s,l:t.l}),new e({h:(n+216)%360,s:t.s,l:t.l})]}onBackground(t){let n=this.toRgb(),r=new e(t).toRgb(),i=n.a+r.a*(1-n.a);return new e({r:(n.r*n.a+r.r*r.a*(1-n.a))/i,g:(n.g*n.a+r.g*r.a*(1-n.a))/i,b:(n.b*n.a+r.b*r.a*(1-n.a))/i,a:i})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(t){let n=this.toHsl(),{h:r}=n,i=[this],a=360/t;for(let o=1;o<t;o++)i.push(new e({h:(r+o*a)%360,s:n.s,l:n.l}));return i}equals(t){let n=new e(t);return this.format===`cmyk`||n.format===`cmyk`?this.toCmykString()===n.toCmykString():this.toRgbString()===n.toRgbString()}},V=class extends F{constructor(){super(),this.hasSlotController=new So(this,`hint`,`label`),this.isSafeValue=!1,this.localize=new T(this),this.hasFocus=!1,this.isDraggingGridHandle=!1,this.isEmpty=!0,this.inputValue=``,this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this._value=null,this.defaultValue=this.getAttribute(`value`)||null,this.withLabel=!1,this.withHint=!1,this.hasEyeDropper=!1,this.label=``,this.hint=``,this.format=`hex`,this.size=`medium`,this.placement=`bottom-start`,this.withoutFormatToggle=!1,this.name=null,this.disabled=!1,this.open=!1,this.opacity=!1,this.uppercase=!1,this.swatches=``,this.required=!1,this.handleFocusIn=()=>{this.hasFocus=!0},this.handleFocusOut=()=>{this.hasFocus=!1},this.reportValidityAfterShow=()=>{this.removeEventListener(`invalid`,this.emitInvalid),this.reportValidity(),this.addEventListener(`invalid`,this.emitInvalid)},this.handleKeyDown=e=>{this.open&&e.key===`Escape`&&fs(this)&&(e.stopPropagation(),this.hide(),this.focus())},this.handleDocumentKeyDown=e=>{if(e.key===`Escape`&&this.open&&fs(this)){e.stopPropagation(),this.focus(),this.hide();return}e.key===`Tab`&&setTimeout(()=>{let e=this.getRootNode()instanceof ShadowRoot?document.activeElement?.shadowRoot?.activeElement:document.activeElement;(!this||e?.closest(this.tagName.toLowerCase())!==this)&&this.hide()})},this.handleDocumentMouseDown=e=>{let t=e.composedPath().some(e=>e instanceof Element&&(e.closest(`.color-picker`)||e===this.trigger));this&&!t&&this.hide()},this.addEventListener(`focusin`,this.handleFocusIn),this.addEventListener(`focusout`,this.handleFocusOut)}static get validators(){let e=[$o()];return[...super.validators,...e]}get validationTarget(){return this.popup?.active?this.input:this.trigger}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(e){this._value!==e&&(this.valueHasChanged=!0,this._value=e)}handleCopy(){this.input.select(),document.execCommand(`copy`),this.previewButton.focus(),this.previewButton.classList.add(`preview-color-copied`),this.previewButton.addEventListener(`animationend`,()=>{this.previewButton.classList.remove(`preview-color-copied`)})}handleFormatToggle(){let e=[`hex`,`rgb`,`hsl`,`hsv`];this.format=e[(e.indexOf(this.format)+1)%e.length],this.setColor(this.value||``),this.updateComplete.then(()=>{this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0}))})}handleAlphaDrag(e){let t=this.shadowRoot.querySelector(`.slider.alpha`),n=t.querySelector(`.slider-handle`),{width:r}=t.getBoundingClientRect(),i=this.value,a=this.value;n.focus(),e.preventDefault(),as(t,{onMove:e=>{this.alpha=R(e/r*100,0,100),this.syncValues(),this.value!==a&&(a=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0}))}))},onStop:()=>{this.value!==i&&(i=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}))},initialEvent:e})}handleHueDrag(e){let t=this.shadowRoot.querySelector(`.slider.hue`),n=t.querySelector(`.slider-handle`),{width:r}=t.getBoundingClientRect(),i=this.value,a=this.value;n.focus(),e.preventDefault(),as(t,{onMove:e=>{this.hue=R(e/r*360,0,360),this.syncValues(),this.value!==a&&(a=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`))}))},onStop:()=>{this.value!==i&&(i=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}))},initialEvent:e})}handleGridDrag(e){let t=this.shadowRoot.querySelector(`.grid`),n=t.querySelector(`.grid-handle`),{width:r,height:i}=t.getBoundingClientRect(),a=this.value,o=this.value;n.focus(),e.preventDefault(),this.isDraggingGridHandle=!0,as(t,{onMove:(e,t)=>{this.saturation=R(e/r*100,0,100),this.brightness=R(100-t/i*100,0,100),this.syncValues(),this.value!==o&&(o=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0}))}))},onStop:()=>{this.isDraggingGridHandle=!1,this.value!==a&&(a=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}))},initialEvent:e})}handleAlphaKeyDown(e){let t=e.shiftKey?10:1,n=this.value;e.key===`ArrowLeft`&&(e.preventDefault(),this.alpha=R(this.alpha-t,0,100),this.syncValues()),e.key===`ArrowRight`&&(e.preventDefault(),this.alpha=R(this.alpha+t,0,100),this.syncValues()),e.key===`Home`&&(e.preventDefault(),this.alpha=0,this.syncValues()),e.key===`End`&&(e.preventDefault(),this.alpha=100,this.syncValues()),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))})}handleHueKeyDown(e){let t=e.shiftKey?10:1,n=this.value;e.key===`ArrowLeft`&&(e.preventDefault(),this.hue=R(this.hue-t,0,360),this.syncValues()),e.key===`ArrowRight`&&(e.preventDefault(),this.hue=R(this.hue+t,0,360),this.syncValues()),e.key===`Home`&&(e.preventDefault(),this.hue=0,this.syncValues()),e.key===`End`&&(e.preventDefault(),this.hue=360,this.syncValues()),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))})}handleGridKeyDown(e){let t=e.shiftKey?10:1,n=this.value;e.key===`ArrowLeft`&&(e.preventDefault(),this.saturation=R(this.saturation-t,0,100),this.syncValues()),e.key===`ArrowRight`&&(e.preventDefault(),this.saturation=R(this.saturation+t,0,100),this.syncValues()),e.key===`ArrowUp`&&(e.preventDefault(),this.brightness=R(this.brightness+t,0,100),this.syncValues()),e.key===`ArrowDown`&&(e.preventDefault(),this.brightness=R(this.brightness-t,0,100),this.syncValues()),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))})}handleInputChange(e){let t=e.target,n=this.value;e.stopPropagation(),this.input.value?(this.setColor(t.value),t.value=this.value||``):this.value=``,this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))})}handleInputInput(e){this.updateValidity(),e.stopPropagation()}handleInputKeyDown(e){if(e.key===`Enter`){let e=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==e&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}),setTimeout(()=>this.input.select())):this.hue=0}}handleTouchMove(e){e.preventDefault()}parseColor(e){if(!e||e.trim()===``)return null;let t=new Hs(e);if(!t.isValid)return null;let n=t.toHsl(),r=t.toRgb(),i=t.toHsv();if(!r||r.r==null||r.g==null||r.b==null)return null;let a={h:n.h||0,s:(n.s||0)*100,l:(n.l||0)*100,a:n.a||0},o=t.toHexString(),s=t.toHex8String(),c={h:i.h||0,s:(i.s||0)*100,v:(i.v||0)*100,a:i.a||0};return{hsl:{h:a.h,s:a.s,l:a.l,string:this.setLetterCase(`hsl(${Math.round(a.h)}, ${Math.round(a.s)}%, ${Math.round(a.l)}%)`)},hsla:{h:a.h,s:a.s,l:a.l,a:a.a,string:this.setLetterCase(`hsla(${Math.round(a.h)}, ${Math.round(a.s)}%, ${Math.round(a.l)}%, ${a.a.toFixed(2).toString()})`)},hsv:{h:c.h,s:c.s,v:c.v,string:this.setLetterCase(`hsv(${Math.round(c.h)}, ${Math.round(c.s)}%, ${Math.round(c.v)}%)`)},hsva:{h:c.h,s:c.s,v:c.v,a:c.a,string:this.setLetterCase(`hsva(${Math.round(c.h)}, ${Math.round(c.s)}%, ${Math.round(c.v)}%, ${c.a.toFixed(2).toString()})`)},rgb:{r:r.r,g:r.g,b:r.b,string:this.setLetterCase(`rgb(${Math.round(r.r)}, ${Math.round(r.g)}, ${Math.round(r.b)})`)},rgba:{r:r.r,g:r.g,b:r.b,a:r.a||0,string:this.setLetterCase(`rgba(${Math.round(r.r)}, ${Math.round(r.g)}, ${Math.round(r.b)}, ${(r.a||0).toFixed(2).toString()})`)},hex:this.setLetterCase(o),hexa:this.setLetterCase(s)}}setColor(e){let t=this.parseColor(e);return t===null?!1:(this.hue=t.hsva.h,this.saturation=t.hsva.s,this.brightness=t.hsva.v,this.alpha=this.opacity?t.hsva.a*100:100,this.syncValues(),!0)}setLetterCase(e){return typeof e==`string`?this.uppercase?e.toUpperCase():e.toLowerCase():``}async syncValues(){let e=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);e!==null&&(this.format===`hsl`?this.inputValue=this.opacity?e.hsla.string:e.hsl.string:this.format===`rgb`?this.inputValue=this.opacity?e.rgba.string:e.rgb.string:this.format===`hsv`?this.inputValue=this.opacity?e.hsva.string:e.hsv.string:this.inputValue=this.opacity?e.hexa:e.hex,this.isSafeValue=!0,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=!1)}handleAfterHide(){this.previewButton.classList.remove(`preview-color-copied`),this.updateValidity()}handleAfterShow(){this.updateValidity()}handleEyeDropper(){this.hasEyeDropper&&new EyeDropper().open().then(e=>{let t=this.value;this.setColor(e.sRGBHex),this.value!==t&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))})}).catch(()=>{})}selectSwatch(e){let t=this.value;this.disabled||(this.setColor(e),this.value!==t&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}))}getHexString(e,t,n,r=100){let i=new Hs(`hsva(${e}, ${t}%, ${n}%, ${r/100})`);return i.isValid?i.toHex8String():``}stopNestedEventPropagation(e){e.stopImmediatePropagation()}handleFormatChange(){this.syncValues()}handleOpacityChange(){this.alpha=100}willUpdate(e){super.willUpdate(e),e.has(`value`)&&this.handleValueChange(e.get(`value`)||``,this.value||``)}handleValueChange(e,t){if(this.isEmpty=!t,t||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){let n=this.parseColor(t);n===null?this.inputValue=e??``:(this.inputValue=this.value||``,this.hue=n.hsva.h,this.saturation=n.hsva.s,this.brightness=n.hsva.v,this.alpha=n.hsva.a*100,this.syncValues())}this.requestUpdate()}focus(e){this.trigger.focus(e)}blur(){let e=this.trigger;this.hasFocus&&(e.focus({preventScroll:!0}),e.blur()),this.popup?.active&&this.hide()}getFormattedValue(e=`hex`){let t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(t===null)return``;switch(e){case`hex`:return t.hex;case`hexa`:return t.hexa;case`rgb`:return t.rgb.string;case`rgba`:return t.rgba.string;case`hsl`:return t.hsl.string;case`hsla`:return t.hsla.string;case`hsv`:return t.hsv.string;case`hsva`:return t.hsva.string;default:return``}}reportValidity(){return!this.validity.valid&&!this.open?(this.addEventListener(`wa-after-show`,this.reportValidityAfterShow,{once:!0}),this.show(),this.disabled||this.dispatchEvent(new bo),!1):super.reportValidity()}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}firstUpdated(e){super.firstUpdated(e),this.hasEyeDropper=`EyeDropper`in window}handleTriggerClick(){this.open?this.hide():(this.show(),this.focus())}async handleTriggerKeyDown(e){if([` `,`Enter`].includes(e.key)){e.preventDefault(),this.handleTriggerClick();return}}handleTriggerKeyUp(e){e.key===` `&&e.preventDefault()}updateAccessibleTrigger(){let e=this.trigger;e&&(e.setAttribute(`aria-haspopup`,`true`),e.setAttribute(`aria-expanded`,this.open?`true`:`false`))}async show(){if(!this.open)return this.open=!0,Uo(this,`wa-after-show`)}async hide(){if(this.open)return this.open=!1,Uo(this,`wa-after-hide`)}addOpenListeners(){this.base.addEventListener(`keydown`,this.handleKeyDown),document.addEventListener(`keydown`,this.handleDocumentKeyDown),document.addEventListener(`mousedown`,this.handleDocumentMouseDown),us(this)}removeOpenListeners(){this.base&&this.base.removeEventListener(`keydown`,this.handleKeyDown),document.removeEventListener(`keydown`,this.handleDocumentKeyDown),document.removeEventListener(`mousedown`,this.handleDocumentMouseDown),ds(this)}async handleOpenChange(){if(this.disabled){this.open=!1;return}this.updateAccessibleTrigger(),this.open?(this.dispatchEvent(new CustomEvent(`wa-show`)),this.addOpenListeners(),await this.updateComplete,this.base.hidden=!1,this.popup.active=!0,await z(this.popup.popup,`show-with-scale`),this.dispatchEvent(new CustomEvent(`wa-after-show`))):(this.dispatchEvent(new CustomEvent(`wa-hide`)),this.removeOpenListeners(),await z(this.popup.popup,`hide-with-scale`),this.base.hidden=!0,this.popup.active=!1,this.dispatchEvent(new CustomEvent(`wa-after-hide`)))}render(){let e=this.hasUpdated?this.withLabel||this.hasSlotController.test(`label`):this.withLabel,t=this.hasUpdated?this.withHint||this.hasSlotController.test(`hint`):this.withHint,n=this.label?!0:!!e,r=this.hint?!0:!!t,i=this.saturation,a=100-this.brightness,o=Array.isArray(this.swatches)?this.swatches.map(e=>typeof e==`string`?{color:e,label:e}:e):this.swatches.split(`;`).filter(e=>e.trim()!==``).map(e=>({color:e.trim(),label:e.trim()})),s=b`
      <div
        part="base"
        class=${I({"color-picker":!0})}
        aria-disabled=${this.disabled?`true`:`false`}
        tabindex="-1"
      >
        <div
          part="grid"
          class="grid"
          style=${N({backgroundColor:this.getHexString(this.hue,100,100)})}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${I({"grid-handle":!0,"grid-handle-dragging":this.isDraggingGridHandle})}
            style=${N({top:`${a}%`,left:`${i}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            role="application"
            aria-label="HSV"
            tabindex=${P(this.disabled?void 0:`0`)}
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
                style=${N({left:`${this.hue===0?0:100/(360/this.hue)}%`,backgroundColor:this.getHexString(this.hue,100,100)})}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${P(this.disabled?void 0:`0`)}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity?b`
                  <div
                    part="slider opacity-slider"
                    class="alpha slider transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="alpha-gradient"
                      style=${N({backgroundImage:`linear-gradient(
                          to right,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,0)} 0%,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,100)} 100%
                        )`})}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="slider-handle"
                      style=${N({left:`${this.alpha}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${P(this.disabled?void 0:`0`)}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                `:``}
          </div>

          <button
            type="button"
            part="preview"
            class="preview transparent-bg"
            aria-label=${this.localize.term(`copy`)}
            style=${N({"--preview-color":this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
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
            .value=${this.isEmpty?``:this.inputValue}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-label=${this.localize.term(`currentValue`)}
            @keydown=${this.handleInputKeyDown}
            @change=${this.handleInputChange}
            @input=${this.handleInputInput}
            @blur=${this.stopNestedEventPropagation}
            @focus=${this.stopNestedEventPropagation}
          ></wa-input>

          <wa-button-group>
            ${this.withoutFormatToggle?``:b`
                  <wa-button
                    part="format-button"
                    size="small"
                    appearance="outlined"
                    aria-label=${this.localize.term(`toggleColorFormat`)}
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
            ${this.hasEyeDropper?b`
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
                      label=${this.localize.term(`selectAColorFromTheScreen`)}
                    ></wa-icon>
                  </wa-button>
                `:``}
          </wa-button-group>
        </div>

        ${o.length>0?b`
              <div part="swatches" class="swatches">
                ${o.map(e=>{let t=this.parseColor(e.color);return t?b`
                    <div
                      part="swatch"
                      class="swatch transparent-bg"
                      tabindex=${P(this.disabled?void 0:`0`)}
                      role="button"
                      aria-label=${e.label}
                      @click=${()=>this.selectSwatch(e.color)}
                      @keydown=${e=>!this.disabled&&e.key===`Enter`&&this.setColor(t.hexa)}
                    >
                      <div class="swatch-color" style=${N({backgroundColor:t.hexa})}></div>
                    </div>
                  `:``})}
              </div>
            `:``}
      </div>
    `;return b`
      <div
        class=${I({container:!0,"form-control":!0,"form-control-has-label":n})}
        part="trigger-container form-control"
      >
        <div
          part="form-control-label"
          class=${I({label:!0,"has-label":n})}
          id="form-control-label"
        >
          <slot name="label">${this.label}</slot>
        </div>

        <button
          id="trigger"
          part="trigger form-control-input"
          class=${I({trigger:!0,"trigger-empty":this.isEmpty,"transparent-bg":!0,"form-control-input":!0})}
          style=${N({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
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
          class=${I({"has-slotted":r})}
          >${this.hint}</slot
        >
      </div>

      <wa-popup
        class="color-popup"
        anchor="trigger"
        placement=${this.placement}
        distance="0"
        skidding="0"
        flip
        flip-fallback-strategy="best-fit"
        shift
        shift-padding="10"
        aria-disabled=${this.disabled?`true`:`false`}
        @wa-after-show=${this.handleAfterShow}
        @wa-after-hide=${this.handleAfterHide}
      >
        ${s}
      </wa-popup>
    `}};V.css=[cs,wo,es,is],V.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0},D([j(`[part~="base"]`)],V.prototype,`base`,2),D([j(`[part~="input"]`)],V.prototype,`input`,2),D([j(`[part~="form-control-label"]`)],V.prototype,`triggerLabel`,2),D([j(`[part~="form-control-input"]`)],V.prototype,`triggerButton`,2),D([j(`.color-popup`)],V.prototype,`popup`,2),D([j(`[part~="preview"]`)],V.prototype,`previewButton`,2),D([j(`[part~="trigger"]`)],V.prototype,`trigger`,2),D([A()],V.prototype,`hasFocus`,2),D([A()],V.prototype,`isDraggingGridHandle`,2),D([A()],V.prototype,`isEmpty`,2),D([A()],V.prototype,`inputValue`,2),D([A()],V.prototype,`hue`,2),D([A()],V.prototype,`saturation`,2),D([A()],V.prototype,`brightness`,2),D([A()],V.prototype,`alpha`,2),D([A()],V.prototype,`value`,1),D([k({attribute:`value`,reflect:!0})],V.prototype,`defaultValue`,2),D([k({attribute:`with-label`,reflect:!0,type:Boolean})],V.prototype,`withLabel`,2),D([k({attribute:`with-hint`,reflect:!0,type:Boolean})],V.prototype,`withHint`,2),D([A()],V.prototype,`hasEyeDropper`,2),D([k()],V.prototype,`label`,2),D([k({attribute:`hint`})],V.prototype,`hint`,2),D([k()],V.prototype,`format`,2),D([k({reflect:!0})],V.prototype,`size`,2),D([k({reflect:!0})],V.prototype,`placement`,2),D([k({attribute:`without-format-toggle`,type:Boolean})],V.prototype,`withoutFormatToggle`,2),D([k({reflect:!0})],V.prototype,`name`,2),D([k({type:Boolean})],V.prototype,`disabled`,2),D([k({type:Boolean,reflect:!0})],V.prototype,`open`,2),D([k({type:Boolean})],V.prototype,`opacity`,2),D([k({type:Boolean})],V.prototype,`uppercase`,2),D([k()],V.prototype,`swatches`,2),D([k({type:Boolean,reflect:!0})],V.prototype,`required`,2),D([Or({passive:!1})],V.prototype,`handleTouchMove`,1),D([E(`format`,{waitUntilFirstUpdate:!0})],V.prototype,`handleFormatChange`,1),D([E(`opacity`)],V.prototype,`handleOpacityChange`,1),D([E(`value`)],V.prototype,`handleValueChange`,1),D([E(`open`,{waitUntilFirstUpdate:!0})],V.prototype,`handleOpenChange`,1),V=D([O(`wa-color-picker`)],V),V.disableWarning?.(`change-in-update`);var Us=class extends Event{constructor(){super(`wa-clear`,{bubbles:!0,cancelable:!1,composed:!0})}};function Ws(e,t){let n=e.metaKey||e.ctrlKey||e.shiftKey||e.altKey;e.key===`Enter`&&!n&&setTimeout(()=>{!e.defaultPrevented&&!e.isComposing&&Gs(t)})}function Gs(e){let t=null;if(`form`in e&&(t=e.form),!t&&`getForm`in e&&(t=e.getForm()),!t)return;let n=[...t.elements];if(n.length===1){t.requestSubmit(null);return}let r=n.find(e=>e.type===`submit`&&!e.matches(`:disabled`));r&&([`input`,`button`].includes(r.localName)?t.requestSubmit(r):r.click())}var Ks=y`
  :host {
    border-width: 0;
  }

  :host(:focus) {
    outline: none;
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
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    background-color: var(--wa-form-control-background-color);
    box-shadow: var(--box-shadow);
    padding: 0 var(--wa-form-control-padding-inline);
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);

    &:focus-within {
      outline-color: var(--wa-color-focus);
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
`,H=class extends F{constructor(){super(...arguments),this.assumeInteractionOn=[`blur`,`input`],this.hasSlotController=new So(this,`hint`,`label`),this.localize=new T(this),this.title=``,this.type=`text`,this._value=null,this.defaultValue=this.getAttribute(`value`)||null,this.size=`medium`,this.appearance=`outlined`,this.pill=!1,this.label=``,this.hint=``,this.withClear=!1,this.placeholder=``,this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.withoutSpinButtons=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,yo()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(e){this._value!==e&&(this.valueHasChanged=!0,this._value=e)}handleChange(e){this.value=this.input.value,this.relayNativeEvent(e,{bubbles:!0,composed:!0})}handleClearClick(e){e.preventDefault(),this.value!==``&&(this.value=``,this.updateComplete.then(()=>{this.dispatchEvent(new Us),this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))})),this.input.focus()}handleInput(){this.value=this.input.value}handleKeyDown(e){Ws(e,this)}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}updated(e){super.updated(e),(e.has(`value`)||e.has(`defaultValue`))&&(this.customStates.set(`blank`,!this.value),this.updateValidity())}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(e,t,n=`none`){this.input.setSelectionRange(e,t,n)}setRangeText(e,t,n,r=`preserve`){let i=t??this.input.selectionStart,a=n??this.input.selectionEnd;this.input.setRangeText(e,i,a,r),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){`showPicker`in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=null,this.input&&(this.input.value=this.value),super.formResetCallback()}render(){let e=this.hasUpdated?this.hasSlotController.test(`label`):this.withLabel,t=this.hasUpdated?this.hasSlotController.test(`hint`):this.withHint,n=this.label?!0:!!e,r=this.hint?!0:!!t,i=this.withClear&&!this.disabled&&!this.readonly,a=this.hasUpdated&&i&&(typeof this.value==`number`||this.value&&this.value.length>0);return b`
      <label
        part="form-control-label label"
        class=${I({label:!0,"has-label":n})}
        for="input"
        aria-hidden=${n?`false`:`true`}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="text-field">
        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
          id="input"
          class="control"
          type=${this.type===`password`&&this.passwordVisible?`text`:this.type}
          title=${this.title}
          name=${P(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${P(this.placeholder)}
          minlength=${P(this.minlength)}
          maxlength=${P(this.maxlength)}
          min=${P(this.min)}
          max=${P(this.max)}
          step=${P(this.step)}
          .value=${ns(this.value??``)}
          autocapitalize=${P(this.autocapitalize)}
          autocomplete=${P(this.autocomplete)}
          autocorrect=${this.autocorrect?`on`:`off`}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${P(this.pattern)}
          enterkeyhint=${P(this.enterkeyhint)}
          inputmode=${P(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        ${a?b`
              <button
                part="clear-button"
                class="clear"
                type="button"
                aria-label=${this.localize.term(`clearEntry`)}
                @click=${this.handleClearClick}
                tabindex="-1"
              >
                <slot name="clear-icon">
                  <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                </slot>
              </button>
            `:``}
        ${this.passwordToggle&&!this.disabled?b`
              <button
                part="password-toggle-button"
                class="password-toggle"
                type="button"
                aria-label=${this.localize.term(this.passwordVisible?`hidePassword`:`showPassword`)}
                @click=${this.handlePasswordToggle}
                tabindex="-1"
              >
                ${this.passwordVisible?b`
                      <slot name="hide-password-icon">
                        <wa-icon name="eye-slash" library="system" variant="regular"></wa-icon>
                      </slot>
                    `:b`
                      <slot name="show-password-icon">
                        <wa-icon name="eye" library="system" variant="regular"></wa-icon>
                      </slot>
                    `}
              </button>
            `:``}

        <slot name="end" part="end" class="end"></slot>
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${I({"has-slotted":r})}
        aria-hidden=${r?`false`:`true`}
        >${this.hint}</slot
      >
    `}};H.css=[wo,es,Ks],H.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0},D([j(`input`)],H.prototype,`input`,2),D([k()],H.prototype,`title`,2),D([k({reflect:!0})],H.prototype,`type`,2),D([A()],H.prototype,`value`,1),D([k({attribute:`value`,reflect:!0})],H.prototype,`defaultValue`,2),D([k({reflect:!0})],H.prototype,`size`,2),D([k({reflect:!0})],H.prototype,`appearance`,2),D([k({type:Boolean,reflect:!0})],H.prototype,`pill`,2),D([k()],H.prototype,`label`,2),D([k({attribute:`hint`})],H.prototype,`hint`,2),D([k({attribute:`with-clear`,type:Boolean})],H.prototype,`withClear`,2),D([k()],H.prototype,`placeholder`,2),D([k({type:Boolean,reflect:!0})],H.prototype,`readonly`,2),D([k({attribute:`password-toggle`,type:Boolean})],H.prototype,`passwordToggle`,2),D([k({attribute:`password-visible`,type:Boolean})],H.prototype,`passwordVisible`,2),D([k({attribute:`without-spin-buttons`,type:Boolean,reflect:!0})],H.prototype,`withoutSpinButtons`,2),D([k({type:Boolean,reflect:!0})],H.prototype,`required`,2),D([k()],H.prototype,`pattern`,2),D([k({type:Number})],H.prototype,`minlength`,2),D([k({type:Number})],H.prototype,`maxlength`,2),D([k()],H.prototype,`min`,2),D([k()],H.prototype,`max`,2),D([k()],H.prototype,`step`,2),D([k()],H.prototype,`autocapitalize`,2),D([k({type:Boolean,converter:{fromAttribute:e=>!(!e||e===`off`),toAttribute:e=>e?`on`:`off`}})],H.prototype,`autocorrect`,2),D([k()],H.prototype,`autocomplete`,2),D([k({type:Boolean})],H.prototype,`autofocus`,2),D([k()],H.prototype,`enterkeyhint`,2),D([k({type:Boolean,converter:{fromAttribute:e=>!(!e||e===`false`),toAttribute:e=>e?`true`:`false`}})],H.prototype,`spellcheck`,2),D([k()],H.prototype,`inputmode`,2),D([k({attribute:`with-label`,type:Boolean})],H.prototype,`withLabel`,2),D([k({attribute:`with-hint`,type:Boolean})],H.prototype,`withHint`,2),D([E(`step`,{waitUntilFirstUpdate:!0})],H.prototype,`handleStepChange`,1),H=D([O(`wa-input`)],H),H.disableWarning?.(`change-in-update`);var qs=class extends Event{constructor(){super(`wa-reposition`,{bubbles:!0,cancelable:!1,composed:!0})}},Js=y`
  :host {
    --arrow-color: black;
    --arrow-size: var(--wa-tooltip-arrow-size);
    --popup-border-width: 0px;
    --show-duration: 100ms;
    --hide-duration: 100ms;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45) to calculate the length of the arrow after rotation.
     *
     * The diamond will be translated inward by --arrow-base-offset, the border thickness, to centralise it on
     * the inner edge of the popup border. This also means we need to increase the size of the arrow by the
     * same amount to compensate.
     *
     * A diamond shaped clipping mask is used to avoid overlap of popup content. This extends slightly inward so
     * the popup border is covered with no sub-pixel rounding artifacts. The diamond corners are mitred at 22.5º
     * to properly merge any arrow border with the popup border. The constant 1.4142 is derived from 1 + tan(22.5).
     *
     */
    --arrow-base-offset: var(--popup-border-width);
    --arrow-size-diagonal: calc((var(--arrow-size) + var(--arrow-base-offset)) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));
    --arrow-size-div: calc(var(--arrow-size-diagonal) * 2);
    --arrow-clipping-corner: calc(var(--arrow-base-offset) * 1.4142);

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
    width: var(--arrow-size-div);
    height: var(--arrow-size-div);
    background: var(--arrow-color);
    z-index: 3;
    clip-path: polygon(
      var(--arrow-clipping-corner) 100%,
      var(--arrow-base-offset) calc(100% - var(--arrow-base-offset)),
      calc(var(--arrow-base-offset) - 2px) calc(100% - var(--arrow-base-offset)),
      calc(100% - var(--arrow-base-offset)) calc(var(--arrow-base-offset) - 2px),
      calc(100% - var(--arrow-base-offset)) var(--arrow-base-offset),
      100% var(--arrow-clipping-corner),
      100% 100%
    );
    rotate: 45deg;
  }

  :host([data-current-placement|='left']) .arrow {
    rotate: -45deg;
  }

  :host([data-current-placement|='right']) .arrow {
    rotate: 135deg;
  }

  :host([data-current-placement|='bottom']) .arrow {
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
`,Ys=Math.min,Xs=Math.max,Zs=Math.round,Qs=Math.floor,$s=e=>({x:e,y:e}),ec={left:`right`,right:`left`,bottom:`top`,top:`bottom`};function tc(e,t,n){return Xs(e,Ys(t,n))}function nc(e,t){return typeof e==`function`?e(t):e}function rc(e){return e.split(`-`)[0]}function ic(e){return e.split(`-`)[1]}function ac(e){return e===`x`?`y`:`x`}function oc(e){return e===`y`?`height`:`width`}function sc(e){let t=e[0];return t===`t`||t===`b`?`y`:`x`}function cc(e){return ac(sc(e))}function lc(e,t,n){n===void 0&&(n=!1);let r=ic(e),i=cc(e),a=oc(i),o=i===`x`?r===(n?`end`:`start`)?`right`:`left`:r===`start`?`bottom`:`top`;return t.reference[a]>t.floating[a]&&(o=vc(o)),[o,vc(o)]}function uc(e){let t=vc(e);return[dc(e),t,dc(t)]}function dc(e){return e.includes(`start`)?e.replace(`start`,`end`):e.replace(`end`,`start`)}var fc=[`left`,`right`],pc=[`right`,`left`],mc=[`top`,`bottom`],hc=[`bottom`,`top`];function gc(e,t,n){switch(e){case`top`:case`bottom`:return n?t?pc:fc:t?fc:pc;case`left`:case`right`:return t?mc:hc;default:return[]}}function _c(e,t,n,r){let i=ic(e),a=gc(rc(e),n===`start`,r);return i&&(a=a.map(e=>e+`-`+i),t&&(a=a.concat(a.map(dc)))),a}function vc(e){let t=rc(e);return ec[t]+e.slice(t.length)}function yc(e){return{top:0,right:0,bottom:0,left:0,...e}}function bc(e){return typeof e==`number`?{top:e,right:e,bottom:e,left:e}:yc(e)}function xc(e){let{x:t,y:n,width:r,height:i}=e;return{width:r,height:i,top:n,left:t,right:t+r,bottom:n+i,x:t,y:n}}function Sc(e,t,n){let{reference:r,floating:i}=e,a=sc(t),o=cc(t),s=oc(o),c=rc(t),l=a===`y`,u=r.x+r.width/2-i.width/2,d=r.y+r.height/2-i.height/2,f=r[s]/2-i[s]/2,p;switch(c){case`top`:p={x:u,y:r.y-i.height};break;case`bottom`:p={x:u,y:r.y+r.height};break;case`right`:p={x:r.x+r.width,y:d};break;case`left`:p={x:r.x-i.width,y:d};break;default:p={x:r.x,y:r.y}}switch(ic(t)){case`start`:p[o]-=f*(n&&l?-1:1);break;case`end`:p[o]+=f*(n&&l?-1:1);break}return p}async function Cc(e,t){t===void 0&&(t={});let{x:n,y:r,platform:i,rects:a,elements:o,strategy:s}=e,{boundary:c=`clippingAncestors`,rootBoundary:l=`viewport`,elementContext:u=`floating`,altBoundary:d=!1,padding:f=0}=nc(t,e),p=bc(f),m=o[d?u===`floating`?`reference`:`floating`:u],h=xc(await i.getClippingRect({element:await(i.isElement==null?void 0:i.isElement(m))??!0?m:m.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(o.floating)),boundary:c,rootBoundary:l,strategy:s})),ee=u===`floating`?{x:n,y:r,width:a.floating.width,height:a.floating.height}:a.reference,g=await(i.getOffsetParent==null?void 0:i.getOffsetParent(o.floating)),_=await(i.isElement==null?void 0:i.isElement(g))&&await(i.getScale==null?void 0:i.getScale(g))||{x:1,y:1},te=xc(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:o,rect:ee,offsetParent:g,strategy:s}):ee);return{top:(h.top-te.top+p.top)/_.y,bottom:(te.bottom-h.bottom+p.bottom)/_.y,left:(h.left-te.left+p.left)/_.x,right:(te.right-h.right+p.right)/_.x}}var wc=50,Tc=async(e,t,n)=>{let{placement:r=`bottom`,strategy:i=`absolute`,middleware:a=[],platform:o}=n,s=o.detectOverflow?o:{...o,detectOverflow:Cc},c=await(o.isRTL==null?void 0:o.isRTL(t)),l=await o.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:d}=Sc(l,r,c),f=r,p=0,m={};for(let n=0;n<a.length;n++){let h=a[n];if(!h)continue;let{name:ee,fn:g}=h,{x:_,y:te,data:v,reset:ne}=await g({x:u,y:d,initialPlacement:r,placement:f,strategy:i,middlewareData:m,rects:l,platform:s,elements:{reference:e,floating:t}});u=_??u,d=te??d,m[ee]={...m[ee],...v},ne&&p<wc&&(p++,typeof ne==`object`&&(ne.placement&&(f=ne.placement),ne.rects&&(l=ne.rects===!0?await o.getElementRects({reference:e,floating:t,strategy:i}):ne.rects),{x:u,y:d}=Sc(l,f,c)),n=-1)}return{x:u,y:d,placement:f,strategy:i,middlewareData:m}},Ec=e=>({name:`arrow`,options:e,async fn(t){let{x:n,y:r,placement:i,rects:a,platform:o,elements:s,middlewareData:c}=t,{element:l,padding:u=0}=nc(e,t)||{};if(l==null)return{};let d=bc(u),f={x:n,y:r},p=cc(i),m=oc(p),h=await o.getDimensions(l),ee=p===`y`,g=ee?`top`:`left`,_=ee?`bottom`:`right`,te=ee?`clientHeight`:`clientWidth`,v=a.reference[m]+a.reference[p]-f[p]-a.floating[m],ne=f[p]-a.reference[p],re=await(o.getOffsetParent==null?void 0:o.getOffsetParent(l)),ie=re?re[te]:0;(!ie||!await(o.isElement==null?void 0:o.isElement(re)))&&(ie=s.floating[te]||a.floating[m]);let ae=v/2-ne/2,oe=ie/2-h[m]/2-1,se=Ys(d[g],oe),y=Ys(d[_],oe),ce=se,le=ie-h[m]-y,ue=ie/2-h[m]/2+ae,de=tc(ce,ue,le),fe=!c.arrow&&ic(i)!=null&&ue!==de&&a.reference[m]/2-(ue<ce?se:y)-h[m]/2<0,pe=fe?ue<ce?ue-ce:ue-le:0;return{[p]:f[p]+pe,data:{[p]:de,centerOffset:ue-de-pe,...fe&&{alignmentOffset:pe}},reset:fe}}}),Dc=function(e){return e===void 0&&(e={}),{name:`flip`,options:e,async fn(t){var n;let{placement:r,middlewareData:i,rects:a,initialPlacement:o,platform:s,elements:c}=t,{mainAxis:l=!0,crossAxis:u=!0,fallbackPlacements:d,fallbackStrategy:f=`bestFit`,fallbackAxisSideDirection:p=`none`,flipAlignment:m=!0,...h}=nc(e,t);if((n=i.arrow)!=null&&n.alignmentOffset)return{};let ee=rc(r),g=sc(o),_=rc(o)===o,te=await(s.isRTL==null?void 0:s.isRTL(c.floating)),v=d||(_||!m?[vc(o)]:uc(o)),ne=p!==`none`;!d&&ne&&v.push(..._c(o,m,p,te));let re=[o,...v],ie=await s.detectOverflow(t,h),ae=[],oe=i.flip?.overflows||[];if(l&&ae.push(ie[ee]),u){let e=lc(r,a,te);ae.push(ie[e[0]],ie[e[1]])}if(oe=[...oe,{placement:r,overflows:ae}],!ae.every(e=>e<=0)){let e=(i.flip?.index||0)+1,t=re[e];if(t&&(!(u===`alignment`&&g!==sc(t))||oe.every(e=>sc(e.placement)===g?e.overflows[0]>0:!0)))return{data:{index:e,overflows:oe},reset:{placement:t}};let n=oe.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0]?.placement;if(!n)switch(f){case`bestFit`:{let e=oe.filter(e=>{if(ne){let t=sc(e.placement);return t===g||t===`y`}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0]?.[0];e&&(n=e);break}case`initialPlacement`:n=o;break}if(r!==n)return{reset:{placement:n}}}return{}}}},Oc=new Set([`left`,`top`]);async function kc(e,t){let{placement:n,platform:r,elements:i}=e,a=await(r.isRTL==null?void 0:r.isRTL(i.floating)),o=rc(n),s=ic(n),c=sc(n)===`y`,l=Oc.has(o)?-1:1,u=a&&c?-1:1,d=nc(t,e),{mainAxis:f,crossAxis:p,alignmentAxis:m}=typeof d==`number`?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return s&&typeof m==`number`&&(p=s===`end`?m*-1:m),c?{x:p*u,y:f*l}:{x:f*l,y:p*u}}var Ac=function(e){return e===void 0&&(e=0),{name:`offset`,options:e,async fn(t){var n;let{x:r,y:i,placement:a,middlewareData:o}=t,s=await kc(t,e);return a===o.offset?.placement&&(n=o.arrow)!=null&&n.alignmentOffset?{}:{x:r+s.x,y:i+s.y,data:{...s,placement:a}}}}},jc=function(e){return e===void 0&&(e={}),{name:`shift`,options:e,async fn(t){let{x:n,y:r,placement:i,platform:a}=t,{mainAxis:o=!0,crossAxis:s=!1,limiter:c={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...l}=nc(e,t),u={x:n,y:r},d=await a.detectOverflow(t,l),f=sc(rc(i)),p=ac(f),m=u[p],h=u[f];if(o){let e=p===`y`?`top`:`left`,t=p===`y`?`bottom`:`right`,n=m+d[e],r=m-d[t];m=tc(n,m,r)}if(s){let e=f===`y`?`top`:`left`,t=f===`y`?`bottom`:`right`,n=h+d[e],r=h-d[t];h=tc(n,h,r)}let ee=c.fn({...t,[p]:m,[f]:h});return{...ee,data:{x:ee.x-n,y:ee.y-r,enabled:{[p]:o,[f]:s}}}}}},Mc=function(e){return e===void 0&&(e={}),{name:`size`,options:e,async fn(t){var n,r;let{placement:i,rects:a,platform:o,elements:s}=t,{apply:c=()=>{},...l}=nc(e,t),u=await o.detectOverflow(t,l),d=rc(i),f=ic(i),p=sc(i)===`y`,{width:m,height:h}=a.floating,ee,g;d===`top`||d===`bottom`?(ee=d,g=f===(await(o.isRTL==null?void 0:o.isRTL(s.floating))?`start`:`end`)?`left`:`right`):(g=d,ee=f===`end`?`top`:`bottom`);let _=h-u.top-u.bottom,te=m-u.left-u.right,v=Ys(h-u[ee],_),ne=Ys(m-u[g],te),re=!t.middlewareData.shift,ie=v,ae=ne;if((n=t.middlewareData.shift)!=null&&n.enabled.x&&(ae=te),(r=t.middlewareData.shift)!=null&&r.enabled.y&&(ie=_),re&&!f){let e=Xs(u.left,0),t=Xs(u.right,0),n=Xs(u.top,0),r=Xs(u.bottom,0);p?ae=m-2*(e!==0||t!==0?e+t:Xs(u.left,u.right)):ie=h-2*(n!==0||r!==0?n+r:Xs(u.top,u.bottom))}await c({...t,availableWidth:ae,availableHeight:ie});let oe=await o.getDimensions(s.floating);return m!==oe.width||h!==oe.height?{reset:{rects:!0}}:{}}}};function Nc(){return typeof window<`u`}function Pc(e){return Lc(e)?(e.nodeName||``).toLowerCase():`#document`}function Fc(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function Ic(e){return((Lc(e)?e.ownerDocument:e.document)||window.document)?.documentElement}function Lc(e){return Nc()?e instanceof Node||e instanceof Fc(e).Node:!1}function Rc(e){return Nc()?e instanceof Element||e instanceof Fc(e).Element:!1}function zc(e){return Nc()?e instanceof HTMLElement||e instanceof Fc(e).HTMLElement:!1}function Bc(e){return!Nc()||typeof ShadowRoot>`u`?!1:e instanceof ShadowRoot||e instanceof Fc(e).ShadowRoot}function Vc(e){let{overflow:t,overflowX:n,overflowY:r,display:i}=Qc(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&i!==`inline`&&i!==`contents`}function Hc(e){return/^(table|td|th)$/.test(Pc(e))}function Uc(e){try{if(e.matches(`:popover-open`))return!0}catch{}try{return e.matches(`:modal`)}catch{return!1}}var Wc=/transform|translate|scale|rotate|perspective|filter/,Gc=/paint|layout|strict|content/,Kc=e=>!!e&&e!==`none`,qc;function Jc(e){let t=Rc(e)?Qc(e):e;return Kc(t.transform)||Kc(t.translate)||Kc(t.scale)||Kc(t.rotate)||Kc(t.perspective)||!Xc()&&(Kc(t.backdropFilter)||Kc(t.filter))||Wc.test(t.willChange||``)||Gc.test(t.contain||``)}function Yc(e){let t=el(e);for(;zc(t)&&!Zc(t);){if(Jc(t))return t;if(Uc(t))return null;t=el(t)}return null}function Xc(){return qc??=typeof CSS<`u`&&CSS.supports&&CSS.supports(`-webkit-backdrop-filter`,`none`),qc}function Zc(e){return/^(html|body|#document)$/.test(Pc(e))}function Qc(e){return Fc(e).getComputedStyle(e)}function $c(e){return Rc(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function el(e){if(Pc(e)===`html`)return e;let t=e.assignedSlot||e.parentNode||Bc(e)&&e.host||Ic(e);return Bc(t)?t.host:t}function tl(e){let t=el(e);return Zc(t)?e.ownerDocument?e.ownerDocument.body:e.body:zc(t)&&Vc(t)?t:tl(t)}function nl(e,t,n){t===void 0&&(t=[]),n===void 0&&(n=!0);let r=tl(e),i=r===e.ownerDocument?.body,a=Fc(r);if(i){let e=rl(a);return t.concat(a,a.visualViewport||[],Vc(r)?r:[],e&&n?nl(e):[])}else return t.concat(r,nl(r,[],n))}function rl(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function il(e){let t=Qc(e),n=parseFloat(t.width)||0,r=parseFloat(t.height)||0,i=zc(e),a=i?e.offsetWidth:n,o=i?e.offsetHeight:r,s=Zs(n)!==a||Zs(r)!==o;return s&&(n=a,r=o),{width:n,height:r,$:s}}function al(e){return Rc(e)?e:e.contextElement}function ol(e){let t=al(e);if(!zc(t))return $s(1);let n=t.getBoundingClientRect(),{width:r,height:i,$:a}=il(t),o=(a?Zs(n.width):n.width)/r,s=(a?Zs(n.height):n.height)/i;return(!o||!Number.isFinite(o))&&(o=1),(!s||!Number.isFinite(s))&&(s=1),{x:o,y:s}}var sl=$s(0);function cl(e){let t=Fc(e);return!Xc()||!t.visualViewport?sl:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function ll(e,t,n){return t===void 0&&(t=!1),!n||t&&n!==Fc(e)?!1:t}function ul(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);let i=e.getBoundingClientRect(),a=al(e),o=$s(1);t&&(r?Rc(r)&&(o=ol(r)):o=ol(e));let s=ll(a,n,r)?cl(a):$s(0),c=(i.left+s.x)/o.x,l=(i.top+s.y)/o.y,u=i.width/o.x,d=i.height/o.y;if(a){let e=Fc(a),t=r&&Rc(r)?Fc(r):r,n=e,i=rl(n);for(;i&&r&&t!==n;){let e=ol(i),t=i.getBoundingClientRect(),r=Qc(i),a=t.left+(i.clientLeft+parseFloat(r.paddingLeft))*e.x,o=t.top+(i.clientTop+parseFloat(r.paddingTop))*e.y;c*=e.x,l*=e.y,u*=e.x,d*=e.y,c+=a,l+=o,n=Fc(i),i=rl(n)}}return xc({width:u,height:d,x:c,y:l})}function dl(e,t){let n=$c(e).scrollLeft;return t?t.left+n:ul(Ic(e)).left+n}function fl(e,t){let n=e.getBoundingClientRect();return{x:n.left+t.scrollLeft-dl(e,n),y:n.top+t.scrollTop}}function pl(e){let{elements:t,rect:n,offsetParent:r,strategy:i}=e,a=i===`fixed`,o=Ic(r),s=t?Uc(t.floating):!1;if(r===o||s&&a)return n;let c={scrollLeft:0,scrollTop:0},l=$s(1),u=$s(0),d=zc(r);if((d||!d&&!a)&&((Pc(r)!==`body`||Vc(o))&&(c=$c(r)),d)){let e=ul(r);l=ol(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}let f=o&&!d&&!a?fl(o,c):$s(0);return{width:n.width*l.x,height:n.height*l.y,x:n.x*l.x-c.scrollLeft*l.x+u.x+f.x,y:n.y*l.y-c.scrollTop*l.y+u.y+f.y}}function ml(e){return Array.from(e.getClientRects())}function hl(e){let t=Ic(e),n=$c(e),r=e.ownerDocument.body,i=Xs(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),a=Xs(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight),o=-n.scrollLeft+dl(e),s=-n.scrollTop;return Qc(r).direction===`rtl`&&(o+=Xs(t.clientWidth,r.clientWidth)-i),{width:i,height:a,x:o,y:s}}var gl=25;function _l(e,t){let n=Fc(e),r=Ic(e),i=n.visualViewport,a=r.clientWidth,o=r.clientHeight,s=0,c=0;if(i){a=i.width,o=i.height;let e=Xc();(!e||e&&t===`fixed`)&&(s=i.offsetLeft,c=i.offsetTop)}let l=dl(r);if(l<=0){let e=r.ownerDocument,t=e.body,n=getComputedStyle(t),i=e.compatMode===`CSS1Compat`&&parseFloat(n.marginLeft)+parseFloat(n.marginRight)||0,o=Math.abs(r.clientWidth-t.clientWidth-i);o<=gl&&(a-=o)}else l<=gl&&(a+=l);return{width:a,height:o,x:s,y:c}}function vl(e,t){let n=ul(e,!0,t===`fixed`),r=n.top+e.clientTop,i=n.left+e.clientLeft,a=zc(e)?ol(e):$s(1);return{width:e.clientWidth*a.x,height:e.clientHeight*a.y,x:i*a.x,y:r*a.y}}function yl(e,t,n){let r;if(t===`viewport`)r=_l(e,n);else if(t===`document`)r=hl(Ic(e));else if(Rc(t))r=vl(t,n);else{let n=cl(e);r={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return xc(r)}function bl(e,t){let n=el(e);return n===t||!Rc(n)||Zc(n)?!1:Qc(n).position===`fixed`||bl(n,t)}function xl(e,t){let n=t.get(e);if(n)return n;let r=nl(e,[],!1).filter(e=>Rc(e)&&Pc(e)!==`body`),i=null,a=Qc(e).position===`fixed`,o=a?el(e):e;for(;Rc(o)&&!Zc(o);){let t=Qc(o),n=Jc(o);!n&&t.position===`fixed`&&(i=null),(a?!n&&!i:!n&&t.position===`static`&&i&&(i.position===`absolute`||i.position===`fixed`)||Vc(o)&&!n&&bl(e,o))?r=r.filter(e=>e!==o):i=t,o=el(o)}return t.set(e,r),r}function Sl(e){let{element:t,boundary:n,rootBoundary:r,strategy:i}=e,a=[...n===`clippingAncestors`?Uc(t)?[]:xl(t,this._c):[].concat(n),r],o=yl(t,a[0],i),s=o.top,c=o.right,l=o.bottom,u=o.left;for(let e=1;e<a.length;e++){let n=yl(t,a[e],i);s=Xs(n.top,s),c=Ys(n.right,c),l=Ys(n.bottom,l),u=Xs(n.left,u)}return{width:c-u,height:l-s,x:u,y:s}}function Cl(e){let{width:t,height:n}=il(e);return{width:t,height:n}}function wl(e,t,n){let r=zc(t),i=Ic(t),a=n===`fixed`,o=ul(e,!0,a,t),s={scrollLeft:0,scrollTop:0},c=$s(0);function l(){c.x=dl(i)}if(r||!r&&!a)if((Pc(t)!==`body`||Vc(i))&&(s=$c(t)),r){let e=ul(t,!0,a,t);c.x=e.x+t.clientLeft,c.y=e.y+t.clientTop}else i&&l();a&&!r&&i&&l();let u=i&&!r&&!a?fl(i,s):$s(0);return{x:o.left+s.scrollLeft-c.x-u.x,y:o.top+s.scrollTop-c.y-u.y,width:o.width,height:o.height}}function Tl(e){return Qc(e).position===`static`}function El(e,t){if(!zc(e)||Qc(e).position===`fixed`)return null;if(t)return t(e);let n=e.offsetParent;return Ic(e)===n&&(n=n.ownerDocument.body),n}function Dl(e,t){let n=Fc(e);if(Uc(e))return n;if(!zc(e)){let t=el(e);for(;t&&!Zc(t);){if(Rc(t)&&!Tl(t))return t;t=el(t)}return n}let r=El(e,t);for(;r&&Hc(r)&&Tl(r);)r=El(r,t);return r&&Zc(r)&&Tl(r)&&!Jc(r)?n:r||Yc(e)||n}var Ol=async function(e){let t=this.getOffsetParent||Dl,n=this.getDimensions,r=await n(e.floating);return{reference:wl(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function kl(e){return Qc(e).direction===`rtl`}var Al={convertOffsetParentRelativeRectToViewportRelativeRect:pl,getDocumentElement:Ic,getClippingRect:Sl,getOffsetParent:Dl,getElementRects:Ol,getClientRects:ml,getDimensions:Cl,getScale:ol,isElement:Rc,isRTL:kl};function jl(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function Ml(e,t){let n=null,r,i=Ic(e);function a(){var e;clearTimeout(r),(e=n)==null||e.disconnect(),n=null}function o(s,c){s===void 0&&(s=!1),c===void 0&&(c=1),a();let l=e.getBoundingClientRect(),{left:u,top:d,width:f,height:p}=l;if(s||t(),!f||!p)return;let m=Qs(d),h=Qs(i.clientWidth-(u+f)),ee=Qs(i.clientHeight-(d+p)),g=Qs(u),_={rootMargin:-m+`px `+-h+`px `+-ee+`px `+-g+`px`,threshold:Xs(0,Ys(1,c))||1},te=!0;function v(t){let n=t[0].intersectionRatio;if(n!==c){if(!te)return o();n?o(!1,n):r=setTimeout(()=>{o(!1,1e-7)},1e3)}n===1&&!jl(l,e.getBoundingClientRect())&&o(),te=!1}try{n=new IntersectionObserver(v,{..._,root:i.ownerDocument})}catch{n=new IntersectionObserver(v,_)}n.observe(e)}return o(!0),a}function Nl(e,t,n,r){r===void 0&&(r={});let{ancestorScroll:i=!0,ancestorResize:a=!0,elementResize:o=typeof ResizeObserver==`function`,layoutShift:s=typeof IntersectionObserver==`function`,animationFrame:c=!1}=r,l=al(e),u=i||a?[...l?nl(l):[],...t?nl(t):[]]:[];u.forEach(e=>{i&&e.addEventListener(`scroll`,n,{passive:!0}),a&&e.addEventListener(`resize`,n)});let d=l&&s?Ml(l,n):null,f=-1,p=null;o&&(p=new ResizeObserver(e=>{let[r]=e;r&&r.target===l&&p&&t&&(p.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;(e=p)==null||e.observe(t)})),n()}),l&&!c&&p.observe(l),t&&p.observe(t));let m,h=c?ul(e):null;c&&ee();function ee(){let t=ul(e);h&&!jl(h,t)&&n(),h=t,m=requestAnimationFrame(ee)}return n(),()=>{var e;u.forEach(e=>{i&&e.removeEventListener(`scroll`,n),a&&e.removeEventListener(`resize`,n)}),d?.(),(e=p)==null||e.disconnect(),p=null,c&&cancelAnimationFrame(m)}}var Pl=Ac,Fl=jc,Il=Dc,Ll=Mc,Rl=Ec,zl=(e,t,n)=>{let r=new Map,i={platform:Al,...n},a={...i.platform,_c:r};return Tc(e,t,{...i,platform:a})};function Bl(e){return Hl(e)}function Vl(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function Hl(e){for(let t=e;t;t=Vl(t))if(t instanceof Element&&getComputedStyle(t).display===`none`)return null;for(let t=Vl(e);t;t=Vl(t)){if(!(t instanceof Element))continue;let e=getComputedStyle(t);if(e.display!==`contents`&&(e.position!==`static`||Jc(e)||t.tagName===`BODY`))return t}return null}function Ul(e){return typeof e==`object`&&!!e&&`getBoundingClientRect`in e&&(`contextElement`in e?e instanceof Element:!0)}var Wl=globalThis?.HTMLElement?.prototype.hasOwnProperty(`popover`),U=class extends M{constructor(){super(...arguments),this.localize=new T(this),this.active=!1,this.placement=`top`,this.boundary=`viewport`,this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement=`anchor`,this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements=``,this.flipFallbackStrategy=`best-fit`,this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),n=this.placement.includes(`top`)||this.placement.includes(`bottom`),r=0,i=0,a=0,o=0,s=0,c=0,l=0,u=0;n?e.top<t.top?(r=e.left,i=e.bottom,a=e.right,o=e.bottom,s=t.left,c=t.top,l=t.right,u=t.top):(r=t.left,i=t.bottom,a=t.right,o=t.bottom,s=e.left,c=e.top,l=e.right,u=e.top):e.left<t.left?(r=e.right,i=e.top,a=t.left,o=t.top,s=e.right,c=e.bottom,l=t.left,u=t.bottom):(r=t.right,i=t.top,a=e.left,o=e.top,s=t.right,c=t.bottom,l=e.left,u=e.bottom),this.style.setProperty(`--hover-bridge-top-left-x`,`${r}px`),this.style.setProperty(`--hover-bridge-top-left-y`,`${i}px`),this.style.setProperty(`--hover-bridge-top-right-x`,`${a}px`),this.style.setProperty(`--hover-bridge-top-right-y`,`${o}px`),this.style.setProperty(`--hover-bridge-bottom-left-x`,`${s}px`),this.style.setProperty(`--hover-bridge-bottom-left-y`,`${c}px`),this.style.setProperty(`--hover-bridge-bottom-right-x`,`${l}px`),this.style.setProperty(`--hover-bridge-bottom-right-y`,`${u}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has(`active`)&&(this.active?this.start():this.stop()),e.has(`anchor`)&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){await this.stop(),this.anchor&&typeof this.anchor==`string`?this.anchorEl=this.getRootNode().getElementById(this.anchor):this.anchor instanceof Element||Ul(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector(`[slot="anchor"]`),this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||!this.isConnected||(this.popup?.showPopover?.(),this.cleanup=Nl(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute(`data-current-placement`),this.style.removeProperty(`--auto-size-available-width`),this.style.removeProperty(`--auto-size-available-height`),requestAnimationFrame(()=>e())):e()})}reposition(){if(!this.active||!this.anchorEl||!this.popup)return;let e=[Pl({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?e.push(Ll({apply:({rects:e})=>{let t=this.sync===`width`||this.sync===`both`,n=this.sync===`height`||this.sync===`both`;this.popup.style.width=t?`${e.reference.width}px`:``,this.popup.style.height=n?`${e.reference.height}px`:``}})):(this.popup.style.width=``,this.popup.style.height=``);let t;Wl&&!Ul(this.anchor)&&this.boundary===`scroll`&&(t=nl(this.anchorEl).filter(e=>e instanceof Element)),this.flip&&e.push(Il({boundary:this.flipBoundary||t,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy===`best-fit`?`bestFit`:`initialPlacement`,padding:this.flipPadding})),this.shift&&e.push(Fl({boundary:this.shiftBoundary||t,padding:this.shiftPadding})),this.autoSize?e.push(Ll({boundary:this.autoSizeBoundary||t,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:t})=>{this.autoSize===`vertical`||this.autoSize===`both`?this.style.setProperty(`--auto-size-available-height`,`${t}px`):this.style.removeProperty(`--auto-size-available-height`),this.autoSize===`horizontal`||this.autoSize===`both`?this.style.setProperty(`--auto-size-available-width`,`${e}px`):this.style.removeProperty(`--auto-size-available-width`)}})):(this.style.removeProperty(`--auto-size-available-width`),this.style.removeProperty(`--auto-size-available-height`)),this.arrow&&e.push(Rl({element:this.arrowEl,padding:this.arrowPadding}));let n=Wl?e=>Al.getOffsetParent(e,Bl):Al.getOffsetParent;zl(this.anchorEl,this.popup,{placement:this.placement,middleware:e,strategy:Wl?`absolute`:`fixed`,platform:{...Al,getOffsetParent:n}}).then(({x:e,y:t,middlewareData:n,placement:r})=>{let i=this.localize.dir()===`rtl`,a={top:`bottom`,right:`left`,bottom:`top`,left:`right`}[r.split(`-`)[0]];if(this.setAttribute(`data-current-placement`,r),Object.assign(this.popup.style,{left:`${e}px`,top:`${t}px`}),this.arrow){let e=n.arrow.x,t=n.arrow.y,r=``,o=``,s=``,c=``;if(this.arrowPlacement===`start`){let n=typeof e==`number`?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:``;r=typeof t==`number`?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:``,o=i?n:``,c=i?``:n}else if(this.arrowPlacement===`end`){let n=typeof e==`number`?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:``;o=i?``:n,c=i?n:``,s=typeof t==`number`?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:``}else this.arrowPlacement===`center`?(c=typeof e==`number`?`calc(50% - var(--arrow-size-diagonal))`:``,r=typeof t==`number`?`calc(50% - var(--arrow-size-diagonal))`:``):(c=typeof e==`number`?`${e}px`:``,r=typeof t==`number`?`${t}px`:``);Object.assign(this.arrowEl.style,{top:r,right:o,bottom:s,left:c,[a]:`calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))`})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new qs)}render(){return b`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${I({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${I({popup:!0,"popup-active":this.active,"popup-fixed":!Wl,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?b`<div part="arrow" class="arrow" role="presentation"></div>`:``}
      </div>
    `}};U.css=Js,D([j(`.popup`)],U.prototype,`popup`,2),D([j(`.arrow`)],U.prototype,`arrowEl`,2),D([k()],U.prototype,`anchor`,2),D([k({type:Boolean,reflect:!0})],U.prototype,`active`,2),D([k({reflect:!0})],U.prototype,`placement`,2),D([k()],U.prototype,`boundary`,2),D([k({type:Number})],U.prototype,`distance`,2),D([k({type:Number})],U.prototype,`skidding`,2),D([k({type:Boolean})],U.prototype,`arrow`,2),D([k({attribute:`arrow-placement`})],U.prototype,`arrowPlacement`,2),D([k({attribute:`arrow-padding`,type:Number})],U.prototype,`arrowPadding`,2),D([k({type:Boolean})],U.prototype,`flip`,2),D([k({attribute:`flip-fallback-placements`,converter:{fromAttribute:e=>e.split(` `).map(e=>e.trim()).filter(e=>e!==``),toAttribute:e=>e.join(` `)}})],U.prototype,`flipFallbackPlacements`,2),D([k({attribute:`flip-fallback-strategy`})],U.prototype,`flipFallbackStrategy`,2),D([k({type:Object})],U.prototype,`flipBoundary`,2),D([k({attribute:`flip-padding`,type:Number})],U.prototype,`flipPadding`,2),D([k({type:Boolean})],U.prototype,`shift`,2),D([k({type:Object})],U.prototype,`shiftBoundary`,2),D([k({attribute:`shift-padding`,type:Number})],U.prototype,`shiftPadding`,2),D([k({attribute:`auto-size`})],U.prototype,`autoSize`,2),D([k()],U.prototype,`sync`,2),D([k({type:Object})],U.prototype,`autoSizeBoundary`,2),D([k({attribute:`auto-size-padding`,type:Number})],U.prototype,`autoSizePadding`,2),D([k({attribute:`hover-bridge`,type:Boolean})],U.prototype,`hoverBridge`,2),U=D([O(`wa-popup`)],U);var Gl=y`
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
`,Kl=class extends M{constructor(){super(...arguments),this.localize=new T(this),this.position=50}handleDrag(e){let{width:t}=this.getBoundingClientRect(),n=this.localize.dir()===`rtl`;e.preventDefault(),as(this,{onMove:e=>{this.customStates.set(`dragging`,!0),this.position=parseFloat(R(e/t*100,0,100).toFixed(2)),n&&(this.position=100-this.position)},onStop:()=>{this.customStates.set(`dragging`,!1)},initialEvent:e})}handleKeyDown(e){let t=this.matches(`:dir(ltr)`),n=this.localize.dir()===`rtl`;if([`ArrowLeft`,`ArrowRight`,`Home`,`End`].includes(e.key)){let r=e.shiftKey?10:1,i=this.position;e.preventDefault(),(t&&e.key===`ArrowLeft`||n&&e.key===`ArrowRight`)&&(i-=r),(t&&e.key===`ArrowRight`||n&&e.key===`ArrowLeft`)&&(i+=r),e.key===`Home`&&(i=0),e.key===`End`&&(i=100),i=R(i,0,100),this.position=i}}handlePositionChange(){this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}render(){let e=this.hasUpdated?this.localize.dir()===`rtl`:this.dir===`rtl`;return b`
      <div id="comparison" class="image" part="base">
        <div part="before" class="before">
          <slot name="before"></slot>
        </div>

        <div
          part="after"
          class="after"
          style=${N({clipPath:e?`inset(0 0 0 ${100-this.position}%)`:`inset(0 ${100-this.position}% 0 0)`})}
        >
          <slot name="after"></slot>
        </div>
      </div>

      <div
        part="divider"
        class="divider"
        style=${N({left:e?`${100-this.position}%`:`${this.position}%`})}
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
    `}};Kl.css=Gl,D([j(`.handle`)],Kl.prototype,`handle`,2),D([k({type:Number,reflect:!0})],Kl.prototype,`position`,2),D([E(`position`,{waitUntilFirstUpdate:!0})],Kl.prototype,`handlePositionChange`,1),Kl=D([O(`wa-comparison`)],Kl);var ql=class extends Event{constructor(e){super(`wa-copy`,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}},Jl=y`
  :host {
    display: inline-block;
    color: var(--wa-color-neutral-on-quiet);
  }

  .copy-button__trigger {
    display: inline-flex;
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
`,Yl=class extends M{constructor(){super(...arguments),this.hasSlotController=new So(this,`[default]`),this.localize=new T(this),this.isCopying=!1,this.status=`rest`,this.value=``,this.from=``,this.disabled=!1,this.copyLabel=``,this.successLabel=``,this.errorLabel=``,this.feedbackDuration=1e3,this.tooltipPlacement=`top`}get currentLabel(){return this.status===`success`?this.successLabel||this.localize.term(`copied`):this.status===`error`?this.errorLabel||this.localize.term(`error`):this.copyLabel||this.localize.term(`copy`)}handleStatusChange(){this.customStates.set(`success`,this.status===`success`),this.customStates.set(`error`,this.status===`error`)}async handleCopy(){if(this.disabled||this.isCopying)return;this.isCopying=!0;let e=this.value;if(this.from){let t=this.getRootNode(),n=this.from.includes(`.`),r=this.from.includes(`[`)&&this.from.includes(`]`),i=this.from,a=``;n?[i,a]=this.from.trim().split(`.`):r&&([i,a]=this.from.trim().replace(/\]$/,``).split(`[`));let o=`getElementById`in t?t.getElementById(i):null;o?e=r?o.getAttribute(a)||``:n?o[a]||``:o.textContent||``:(this.showStatus(`error`),this.dispatchEvent(new ar))}if(!e)this.showStatus(`error`),this.dispatchEvent(new ar);else try{await navigator.clipboard.writeText(e),this.showStatus(`success`),this.dispatchEvent(new ql({value:e}))}catch{this.showStatus(`error`),this.dispatchEvent(new ar)}}async showStatus(e){if(this.status=e,this.copyIcon){let t=e===`success`?this.successIcon:this.errorIcon;await z(this.copyIcon,`hide`),this.copyIcon.hidden=!0,t.hidden=!1,await z(t,`show`)}setTimeout(async()=>{if(this.copyIcon){let t=e===`success`?this.successIcon:this.errorIcon;await z(t,`hide`),t.hidden=!0,this.copyIcon.hidden=!1,await z(this.copyIcon,`show`)}this.status=`rest`,this.isCopying=!1},this.feedbackDuration)}render(){let e=this.hasSlotController.test(`[default]`);return b`
      <div class="copy-button__trigger" @click=${this.handleCopy}>
        <slot></slot>
        <button
          class="button"
          part="button"
          type="button"
          id="copy-button"
          ?disabled=${this.disabled}
          ?hidden=${e}
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
            class=${I({"copy-button":!0,"copy-button-success":this.status===`success`,"copy-button-error":this.status===`error`})}
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
      </div>
    `}};Yl.css=[jr,cs,Jl],D([j(`slot[name="copy-icon"]`)],Yl.prototype,`copyIcon`,2),D([j(`slot[name="success-icon"]`)],Yl.prototype,`successIcon`,2),D([j(`slot[name="error-icon"]`)],Yl.prototype,`errorIcon`,2),D([j(`wa-tooltip`)],Yl.prototype,`tooltip`,2),D([A()],Yl.prototype,`isCopying`,2),D([A()],Yl.prototype,`status`,2),D([k()],Yl.prototype,`value`,2),D([k()],Yl.prototype,`from`,2),D([k({type:Boolean,reflect:!0})],Yl.prototype,`disabled`,2),D([k({attribute:`copy-label`})],Yl.prototype,`copyLabel`,2),D([k({attribute:`success-label`})],Yl.prototype,`successLabel`,2),D([k({attribute:`error-label`})],Yl.prototype,`errorLabel`,2),D([k({attribute:`feedback-duration`,type:Number})],Yl.prototype,`feedbackDuration`,2),D([k({attribute:`tooltip-placement`})],Yl.prototype,`tooltipPlacement`,2),D([E(`status`)],Yl.prototype,`handleStatusChange`,1),Yl=D([O(`wa-copy-button`)],Yl);var Xl=y`
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

  .tooltip {
    --popup-border-width: var(--wa-tooltip-border-width);

    &::part(arrow) {
      border-bottom: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
      border-right: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    }
  }
`,Zl=class extends Event{constructor(){super(`wa-show`,{bubbles:!0,cancelable:!0,composed:!0})}},Ql=class extends Event{constructor(e){super(`wa-hide`,{bubbles:!0,cancelable:!0,composed:!0}),this.detail=e}},$l=class extends Event{constructor(){super(`wa-after-hide`,{bubbles:!0,cancelable:!1,composed:!0})}},eu=class extends Event{constructor(){super(`wa-after-show`,{bubbles:!0,cancelable:!1,composed:!0})}},W=class extends M{constructor(){super(...arguments),this.placement=`top`,this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger=`hover focus`,this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger(`focus`)&&this.hide()},this.handleClick=()=>{this.hasTrigger(`click`)&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger(`focus`)&&this.show()},this.handleDocumentKeyDown=e=>{e.key===`Escape`&&this.open&&fs(this)&&(e.preventDefault(),e.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger(`hover`)&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=()=>{if(this.hasTrigger(`hover`)){let e=!!this.anchor?.matches(`:hover`),t=this.matches(`:hover`);if(e||t)return;clearTimeout(this.hoverTimeout),e||t||(this.hoverTimeout=window.setTimeout(()=>{this.hide()},this.hideDelay))}}}connectedCallback(){super.connectedCallback(),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.addEventListener(`mouseout`,this.handleMouseOut),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||=Ho(`wa-tooltip-`),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`keydown`,this.handleDocumentKeyDown),ds(this),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(e){return this.trigger.split(` `).includes(e)}addToAriaLabelledBy(e,t){let n=(e.getAttribute(`aria-labelledby`)||``).split(/\s+/).filter(Boolean);n.includes(t)||(n.push(t),e.setAttribute(`aria-labelledby`,n.join(` `)))}removeFromAriaLabelledBy(e,t){let n=(e.getAttribute(`aria-labelledby`)||``).split(/\s+/).filter(Boolean).filter(e=>e!==t);n.length>0?e.setAttribute(`aria-labelledby`,n.join(` `)):e.removeAttribute(`aria-labelledby`)}async handleOpenChange(){if(this.open){if(this.disabled)return;let e=new Zl;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}document.addEventListener(`keydown`,this.handleDocumentKeyDown,{signal:this.eventController.signal}),us(this),this.body.hidden=!1,this.popup.active=!0,await z(this.popup.popup,`show-with-scale`),this.popup.reposition(),this.dispatchEvent(new eu)}else{let e=new Ql;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}document.removeEventListener(`keydown`,this.handleDocumentKeyDown),ds(this),await z(this.popup.popup,`hide-with-scale`),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new $l)}}handleForChange(){let e=this.getRootNode();if(!e)return;let t=this.for?e.getElementById(this.for):null,n=this.anchor;if(t===n)return;let{signal:r}=this.eventController;t&&(this.addToAriaLabelledBy(t,this.id),t.addEventListener(`blur`,this.handleBlur,{capture:!0,signal:r}),t.addEventListener(`focus`,this.handleFocus,{capture:!0,signal:r}),t.addEventListener(`click`,this.handleClick,{signal:r}),t.addEventListener(`mouseover`,this.handleMouseOver,{signal:r}),t.addEventListener(`mouseout`,this.handleMouseOut,{signal:r})),n&&(this.removeFromAriaLabelledBy(n,this.id),n.removeEventListener(`blur`,this.handleBlur,{capture:!0}),n.removeEventListener(`focus`,this.handleFocus,{capture:!0}),n.removeEventListener(`click`,this.handleClick),n.removeEventListener(`mouseover`,this.handleMouseOver),n.removeEventListener(`mouseout`,this.handleMouseOut)),this.anchor=t}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,Uo(this,`wa-after-show`)}async hide(){if(this.open)return this.open=!1,Uo(this,`wa-after-hide`)}render(){return b`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${I({tooltip:!0,"tooltip-open":this.open})}
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
    `}};W.css=Xl,W.dependencies={"wa-popup":U},D([j(`slot:not([name])`)],W.prototype,`defaultSlot`,2),D([j(`.body`)],W.prototype,`body`,2),D([j(`wa-popup`)],W.prototype,`popup`,2),D([k()],W.prototype,`placement`,2),D([k({type:Boolean,reflect:!0})],W.prototype,`disabled`,2),D([k({type:Number})],W.prototype,`distance`,2),D([k({type:Boolean,reflect:!0})],W.prototype,`open`,2),D([k({type:Number})],W.prototype,`skidding`,2),D([k({attribute:`show-delay`,type:Number})],W.prototype,`showDelay`,2),D([k({attribute:`hide-delay`,type:Number})],W.prototype,`hideDelay`,2),D([k()],W.prototype,`trigger`,2),D([k({attribute:`without-arrow`,type:Boolean,reflect:!0})],W.prototype,`withoutArrow`,2),D([k()],W.prototype,`for`,2),D([A()],W.prototype,`anchor`,2),D([E(`open`,{waitUntilFirstUpdate:!0})],W.prototype,`handleOpenChange`,1),D([E(`for`)],W.prototype,`handleForChange`,1),D([E([`distance`,`placement`,`skidding`])],W.prototype,`handleOptionsChange`,1),D([E(`disabled`)],W.prototype,`handleDisabledChange`,1),W=D([O(`wa-tooltip`)],W);var tu=y`
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
    box-sizing: border-box; /* Ensure contents don't overflow */
    padding-block-start: var(--spacing);
    padding-inline: var(--spacing); /* Add horizontal padding */
    padding-block-end: var(--spacing); /* Add bottom padding */
  }
`,nu=class extends M{constructor(){super(...arguments),this.localize=new T(this),this.animationGeneration=0,this.isAnimating=!1,this.open=!1,this.disabled=!1,this.appearance=`outlined`,this.iconPlacement=`end`}disconnectedCallback(){super.disconnectedCallback(),this.detailsObserver?.disconnect()}firstUpdated(){this.body.style.height=this.open?`auto`:`0`,this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(e=>{for(let t of e)t.type===`attributes`&&t.attributeName===`open`&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}updated(e){e.has(`isAnimating`)&&this.customStates.set(`animating`,this.isAnimating)}handleSummaryClick(e){e.composedPath().some(e=>{if(!(e instanceof HTMLElement))return!1;let t=e.tagName?.toLowerCase();return[`a`,`button`,`input`,`textarea`,`select`].includes(t)?!0:e instanceof F?!(`disabled`in e)||!e.disabled:!1})||(e.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus()))}handleSummaryKeyDown(e){(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),this.open?this.hide():this.show()),(e.key===`ArrowUp`||e.key===`ArrowLeft`)&&(e.preventDefault(),this.hide()),(e.key===`ArrowDown`||e.key===`ArrowRight`)&&(e.preventDefault(),this.show())}closeOthersWithSameName(){this.name&&this.getRootNode().querySelectorAll(`wa-details[name="${this.name}"]`).forEach(e=>{e!==this&&e.open&&(e.open=!1)})}async handleOpenChange(){this.animationGeneration++;let e=this.animationGeneration;if(this.open){this.details.open=!0;let t=new Zl;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1,this.details.open=!1;return}this.closeOthersWithSameName(),this.isAnimating=!0;let n=Go(getComputedStyle(this.body).getPropertyValue(`--show-duration`));if(await Wo(this.body,[{height:`0`,opacity:`0`},{height:`${this.body.scrollHeight}px`,opacity:`1`}],{duration:n,easing:`linear`}),this.animationGeneration!==e)return;this.body.style.height=`auto`,this.isAnimating=!1,this.dispatchEvent(new eu)}else{let t=new Ql;if(this.dispatchEvent(t),t.defaultPrevented){this.details.open=!0,this.open=!0;return}this.isAnimating=!0;let n=Go(getComputedStyle(this.body).getPropertyValue(`--hide-duration`));if(await Wo(this.body,[{height:`${this.body.scrollHeight}px`,opacity:`1`},{height:`0`,opacity:`0`}],{duration:n,easing:`linear`}),this.animationGeneration!==e)return;this.body.style.height=`0`,this.isAnimating=!1,this.details.open=!1,this.dispatchEvent(new $l)}}async show(){if(!(this.open||this.disabled))return this.open=!0,Uo(this,`wa-after-show`)}async hide(){if(!(!this.open||this.disabled))return this.open=!1,Uo(this,`wa-after-hide`)}render(){let e=this.hasUpdated?this.localize.dir()===`rtl`:this.dir===`rtl`;return b`
      <details part="base">
        <summary
          part="header"
          role="button"
          aria-expanded=${this.open?`true`:`false`}
          aria-controls="content"
          aria-disabled=${this.disabled?`true`:`false`}
          tabindex=${this.disabled?`-1`:`0`}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary">${this.summary}</slot>

          <span part="icon">
            <slot name="expand-icon">
              <wa-icon library="system" variant="solid" name=${e?`chevron-left`:`chevron-right`}></wa-icon>
            </slot>
            <slot name="collapse-icon">
              <wa-icon library="system" variant="solid" name=${e?`chevron-left`:`chevron-right`}></wa-icon>
            </slot>
          </span>
        </summary>

        <div
          class=${I({body:!0,animating:this.isAnimating})}
          role="region"
          aria-labelledby="header"
        >
          <slot part="content" id="content" class="content"></slot>
        </div>
      </details>
    `}};nu.css=tu,D([j(`details`)],nu.prototype,`details`,2),D([j(`summary`)],nu.prototype,`header`,2),D([j(`.body`)],nu.prototype,`body`,2),D([j(`.expand-icon-slot`)],nu.prototype,`expandIconSlot`,2),D([A()],nu.prototype,`isAnimating`,2),D([k({type:Boolean,reflect:!0})],nu.prototype,`open`,2),D([k()],nu.prototype,`summary`,2),D([k({reflect:!0})],nu.prototype,`name`,2),D([k({type:Boolean,reflect:!0})],nu.prototype,`disabled`,2),D([k({reflect:!0})],nu.prototype,`appearance`,2),D([k({attribute:`icon-placement`,reflect:!0})],nu.prototype,`iconPlacement`,2),D([E(`open`,{waitUntilFirstUpdate:!0})],nu.prototype,`handleOpenChange`,1),nu=D([O(`wa-details`)],nu);var ru=y`
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
    color: inherit;
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
`;function iu(e,t){return{top:Math.round(e.getBoundingClientRect().top-t.getBoundingClientRect().top),left:Math.round(e.getBoundingClientRect().left-t.getBoundingClientRect().left)}}var au=new Set;function ou(){let e=document.documentElement.clientWidth;return Math.abs(window.innerWidth-e)}function su(){let e=Number(getComputedStyle(document.body).paddingRight.replace(/px/,``));return isNaN(e)||!e?0:e}function cu(e){if(au.add(e),!document.documentElement.classList.contains(`wa-scroll-lock`)){let e=ou()+su(),t=getComputedStyle(document.documentElement).scrollbarGutter;(!t||t===`auto`)&&(t=`stable`),e<2&&(t=``),document.documentElement.style.setProperty(`--wa-scroll-lock-gutter`,t),document.documentElement.classList.add(`wa-scroll-lock`),document.documentElement.style.setProperty(`--wa-scroll-lock-size`,`${e}px`)}}function lu(e){au.delete(e),au.size===0&&(document.documentElement.classList.remove(`wa-scroll-lock`),document.documentElement.style.removeProperty(`--wa-scroll-lock-size`))}function uu(e,t,n=`vertical`,r=`smooth`){let i=iu(e,t),a=i.top+t.scrollTop,o=i.left+t.scrollLeft,s=t.scrollLeft,c=t.scrollLeft+t.offsetWidth,l=t.scrollTop,u=t.scrollTop+t.offsetHeight;(n===`horizontal`||n===`both`)&&(o<s?t.scrollTo({left:o,behavior:r}):o+e.clientWidth>c&&t.scrollTo({left:o-t.offsetWidth+e.clientWidth,behavior:r})),(n===`vertical`||n===`both`)&&(a<l?t.scrollTo({top:a,behavior:r}):a+e.clientHeight>u&&t.scrollTo({top:a-t.offsetHeight+e.clientHeight,behavior:r}))}function du(e){return e.split(` `).map(e=>e.trim()).filter(e=>e!==``)}var fu=class extends M{constructor(){super(...arguments),this.localize=new T(this),this.hasSlotController=new So(this,`footer`,`header-actions`,`label`),this.open=!1,this.label=``,this.withoutHeader=!1,this.lightDismiss=!1,this.withFooter=!1,this.handleDocumentKeyDown=e=>{e.key===`Escape`&&this.open&&fs(this)&&(e.preventDefault(),e.stopPropagation(),this.requestClose(this.dialog))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.dialog.showModal(),cu(this))}disconnectedCallback(){super.disconnectedCallback(),lu(this),this.removeOpenListeners()}async requestClose(e){let t=new Ql({source:e});if(this.dispatchEvent(t),t.defaultPrevented){this.open=!0,z(this.dialog,`pulse`);return}this.removeOpenListeners(),await z(this.dialog,`hide`),this.open=!1,this.dialog.close(),lu(this);let n=this.originalTrigger;typeof n?.focus==`function`&&setTimeout(()=>n.focus()),this.dispatchEvent(new $l)}addOpenListeners(){document.addEventListener(`keydown`,this.handleDocumentKeyDown),us(this)}removeOpenListeners(){document.removeEventListener(`keydown`,this.handleDocumentKeyDown),ds(this)}handleDialogCancel(e){e.preventDefault(),!this.dialog.classList.contains(`hide`)&&e.target===this.dialog&&fs(this)&&this.requestClose(this.dialog)}handleDialogClick(e){let t=e.target.closest(`[data-dialog="close"]`);t&&(e.stopPropagation(),this.requestClose(t))}async handleDialogPointerDown(e){e.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await z(this.dialog,`pulse`))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open&&(this.open=!0,this.requestClose(this.dialog))}async show(){let e=new Zl;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),cu(this),requestAnimationFrame(()=>{let e=this.querySelector(`[autofocus]`);e&&typeof e.focus==`function`?e.focus():this.dialog.focus()}),await z(this.dialog,`show`),this.dispatchEvent(new eu)}render(){let e=!this.withoutHeader,t=this.hasUpdated?this.hasSlotController.test(`footer`):this.withFooter;return b`
      <dialog
        part="dialog"
        class=${I({dialog:!0,open:this.open})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${e?b`
              <header part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length>0?this.label:`​`} </slot>
                </h2>
                <div part="header-actions" class="header-actions">
                  <slot name="header-actions"></slot>
                  <wa-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="close"
                    appearance="plain"
                    @click="${e=>this.requestClose(e.target)}"
                  >
                    <wa-icon
                      name="xmark"
                      label=${this.localize.term(`close`)}
                      library="system"
                      variant="solid"
                    ></wa-icon>
                  </wa-button>
                </div>
              </header>
            `:``}

        <div part="body" class="body"><slot></slot></div>

        ${t?b`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:``}
      </dialog>
    `}};fu.css=ru,D([j(`.dialog`)],fu.prototype,`dialog`,2),D([k({type:Boolean,reflect:!0})],fu.prototype,`open`,2),D([k({reflect:!0})],fu.prototype,`label`,2),D([k({attribute:`without-header`,type:Boolean,reflect:!0})],fu.prototype,`withoutHeader`,2),D([k({attribute:`light-dismiss`,type:Boolean})],fu.prototype,`lightDismiss`,2),D([k({attribute:`with-footer`,type:Boolean})],fu.prototype,`withFooter`,2),D([E(`open`,{waitUntilFirstUpdate:!0})],fu.prototype,`handleOpenChange`,1),fu=D([O(`wa-dialog`)],fu),document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-dialog]`);if(t instanceof Element){let[e,n]=du(t.getAttribute(`data-dialog`)||``);if(e===`open`&&n?.length){let e=t.getRootNode().getElementById(n);e?.localName===`wa-dialog`?e.open=!0:console.warn(`A dialog with an ID of "${n}" could not be found in this document.`)}}}),document.addEventListener(`pointerdown`,()=>{});var pu=y`
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
`,mu=class extends M{constructor(){super(...arguments),this.orientation=`horizontal`}connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`separator`)}handleVerticalChange(){this.setAttribute(`aria-orientation`,this.orientation)}};mu.css=pu,D([k({reflect:!0})],mu.prototype,`orientation`,2),D([E(`orientation`)],mu.prototype,`handleVerticalChange`,1),mu=D([O(`wa-divider`)],mu);var hu=y`
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
    color: inherit;
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
`,gu=class extends M{constructor(){super(...arguments),this.localize=new T(this),this.hasSlotController=new So(this,`footer`,`header-actions`,`label`),this.open=!1,this.label=``,this.placement=`end`,this.withoutHeader=!1,this.lightDismiss=!0,this.withFooter=!1,this.handleDocumentKeyDown=e=>{e.key===`Escape`&&this.open&&fs(this)&&(e.preventDefault(),e.stopPropagation(),this.requestClose(this.drawer))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.drawer.showModal(),cu(this))}disconnectedCallback(){super.disconnectedCallback(),lu(this),this.removeOpenListeners()}async requestClose(e){let t=new Ql({source:e});if(this.dispatchEvent(t),t.defaultPrevented){this.open=!0,z(this.drawer,`pulse`);return}this.removeOpenListeners(),await z(this.drawer,`hide`),this.open=!1,this.drawer.close(),lu(this);let n=this.originalTrigger;typeof n?.focus==`function`&&setTimeout(()=>n.focus()),this.dispatchEvent(new $l)}addOpenListeners(){document.addEventListener(`keydown`,this.handleDocumentKeyDown),us(this)}removeOpenListeners(){document.removeEventListener(`keydown`,this.handleDocumentKeyDown),ds(this)}handleDialogCancel(e){e.preventDefault(),!this.drawer.classList.contains(`hide`)&&e.target===this.drawer&&fs(this)&&this.requestClose(this.drawer)}handleDialogClick(e){let t=e.target.closest(`[data-drawer="close"]`);t&&(e.stopPropagation(),this.requestClose(t))}async handleDialogPointerDown(e){e.target===this.drawer&&(this.lightDismiss?this.requestClose(this.drawer):await z(this.drawer,`pulse`))}handleOpenChange(){this.open&&!this.drawer.open?this.show():this.drawer.open&&(this.open=!0,this.requestClose(this.drawer))}async show(){let e=new Zl;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.drawer.showModal(),cu(this),requestAnimationFrame(()=>{let e=this.querySelector(`[autofocus]`);e&&typeof e.focus==`function`?e.focus():this.drawer.focus()}),await z(this.drawer,`show`),this.dispatchEvent(new eu)}render(){let e=!this.withoutHeader,t=this.hasUpdated?this.hasSlotController.test(`footer`):this.withFooter;return b`
      <dialog
        part="dialog"
        class=${I({drawer:!0,open:this.open,top:this.placement===`top`,end:this.placement===`end`,bottom:this.placement===`bottom`,start:this.placement===`start`})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${e?b`
              <header part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length>0?this.label:`​`} </slot>
                </h2>
                <div part="header-actions" class="header-actions">
                  <slot name="header-actions"></slot>
                  <wa-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="close"
                    appearance="plain"
                    @click="${e=>this.requestClose(e.target)}"
                  >
                    <wa-icon
                      name="xmark"
                      label=${this.localize.term(`close`)}
                      library="system"
                      variant="solid"
                    ></wa-icon>
                  </wa-button>
                </div>
              </header>
            `:``}

        <div part="body" class="body"><slot></slot></div>

        ${t?b`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:``}
      </dialog>
    `}};gu.css=hu,D([j(`.drawer`)],gu.prototype,`drawer`,2),D([k({type:Boolean,reflect:!0})],gu.prototype,`open`,2),D([k({reflect:!0})],gu.prototype,`label`,2),D([k({reflect:!0})],gu.prototype,`placement`,2),D([k({attribute:`without-header`,type:Boolean,reflect:!0})],gu.prototype,`withoutHeader`,2),D([k({attribute:`light-dismiss`,type:Boolean})],gu.prototype,`lightDismiss`,2),D([k({attribute:`with-footer`,type:Boolean})],gu.prototype,`withFooter`,2),D([E(`open`,{waitUntilFirstUpdate:!0})],gu.prototype,`handleOpenChange`,1),gu=D([O(`wa-drawer`)],gu),document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-drawer]`);if(t instanceof Element){let[e,n]=du(t.getAttribute(`data-drawer`)||``);if(e===`open`&&n?.length){let e=t.getRootNode().getElementById(n);e?.localName===`wa-drawer`?e.open=!0:console.warn(`A drawer with an ID of "${n}" could not be found in this document.`)}}}),document.addEventListener(`pointerdown`,()=>{});var _u=class extends Event{constructor(e){super(`wa-select`,{bubbles:!0,cancelable:!0,composed:!0}),this.detail=e}},vu=y`
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
      color: var(--wa-color-text-quiet);
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
`;function*yu(e=document.activeElement){e!=null&&(yield e,`shadowRoot`in e&&e.shadowRoot&&e.shadowRoot.mode!==`closed`&&(yield*yu(e.shadowRoot.activeElement)))}var bu=new Set,xu=class extends M{constructor(){super(...arguments),this.submenuCleanups=new Map,this.localize=new T(this),this.userTypedQuery=``,this.openSubmenuStack=[],this.open=!1,this.size=`medium`,this.placement=`bottom-start`,this.distance=0,this.skidding=0,this.handleDocumentKeyDown=async e=>{let t=this.localize.dir()===`rtl`;if(e.key===`Escape`&&this.open&&fs(this)){let t=this.getTrigger();e.preventDefault(),e.stopPropagation(),this.open=!1,t?.focus({preventScroll:!0});return}let n=[...yu()].find(e=>e.localName===`wa-dropdown-item`),r=n?.localName===`wa-dropdown-item`,i=this.getCurrentSubmenuItem(),a=!!i,o,s,c;a?(o=this.getSubmenuItems(i),s=o.find(e=>e.active||e===n),c=s?o.indexOf(s):-1):(o=this.getItems(),s=o.find(e=>e.active||e===n),c=s?o.indexOf(s):-1);let l;if(e.key===`ArrowUp`&&(e.preventDefault(),e.stopPropagation(),l=c>0?o[c-1]:o[o.length-1]),e.key===`ArrowDown`&&(e.preventDefault(),e.stopPropagation(),l=c!==-1&&c<o.length-1?o[c+1]:o[0]),e.key===(t?`ArrowLeft`:`ArrowRight`)&&r&&s&&s.hasSubmenu){e.preventDefault(),e.stopPropagation(),s.submenuOpen=!0,this.addToSubmenuStack(s),setTimeout(()=>{let e=this.getSubmenuItems(s);e.length>0&&(e.forEach((e,t)=>e.active=t===0),e[0].focus({preventScroll:!0}))},0);return}if(e.key===(t?`ArrowRight`:`ArrowLeft`)&&a){e.preventDefault(),e.stopPropagation();let t=this.removeFromSubmenuStack();t&&(t.submenuOpen=!1,setTimeout(()=>{t.focus({preventScroll:!0}),t.active=!0,(t.slot===`submenu`?this.getSubmenuItems(t.parentElement):this.getItems()).forEach(e=>{e!==t&&(e.active=!1)})},0));return}if((e.key===`Home`||e.key===`End`)&&(e.preventDefault(),e.stopPropagation(),l=e.key===`Home`?o[0]:o[o.length-1]),e.key===`Tab`&&await this.hideMenu(),e.key.length===1&&!(e.metaKey||e.ctrlKey||e.altKey)&&!(e.key===` `&&this.userTypedQuery===``)&&(clearTimeout(this.userTypedTimeout),this.userTypedTimeout=setTimeout(()=>{this.userTypedQuery=``},1e3),this.userTypedQuery+=e.key,o.some(e=>{let t=(e.textContent||``).trim().toLowerCase(),n=this.userTypedQuery.trim().toLowerCase();return t.startsWith(n)?(l=e,!0):!1})),l){e.preventDefault(),e.stopPropagation(),o.forEach(e=>e.active=e===l),l.focus({preventScroll:!0});return}(e.key===`Enter`||e.key===` `&&this.userTypedQuery===``)&&r&&s&&(e.preventDefault(),e.stopPropagation(),s.hasSubmenu?(s.submenuOpen=!0,this.addToSubmenuStack(s),setTimeout(()=>{let e=this.getSubmenuItems(s);e.length>0&&(e.forEach((e,t)=>e.active=t===0),e[0].focus({preventScroll:!0}))},0)):this.makeSelection(s))},this.handleDocumentPointerDown=e=>{e.composedPath().some(e=>e instanceof HTMLElement?e===this||e.closest(`wa-dropdown, [part="submenu"]`):!1)||(this.open=!1)},this.handleGlobalMouseMove=e=>{let t=this.getCurrentSubmenuItem();if(!t?.submenuOpen||!t.submenuElement)return;let n=t.submenuElement.getBoundingClientRect(),r=this.localize.dir()===`rtl`,i=r?n.right:n.left,a=r?Math.max(e.clientX,i):Math.min(e.clientX,i),o=Math.max(n.top,Math.min(e.clientY,n.bottom));t.submenuElement.style.setProperty(`--safe-triangle-cursor-x`,`${a}px`),t.submenuElement.style.setProperty(`--safe-triangle-cursor-y`,`${o}px`);let s=e.composedPath(),c=t.matches(`:hover`),l=!!t.submenuElement?.matches(`:hover`),u=c||!!s.find(e=>e===t),d=l||!!s.find(e=>e instanceof HTMLElement&&e.closest(`[part="submenu"]`)===t.submenuElement);!u&&!d&&setTimeout(()=>{!c&&!l&&(t.submenuOpen=!1)},100)}}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.userTypedTimeout),this.closeAllSubmenus(),this.submenuCleanups.forEach(e=>e()),this.submenuCleanups.clear(),document.removeEventListener(`mousemove`,this.handleGlobalMouseMove),document.removeEventListener(`keydown`,this.handleDocumentKeyDown),document.removeEventListener(`pointerdown`,this.handleDocumentPointerDown),ds(this)}firstUpdated(){this.syncAriaAttributes()}async updated(e){if(e.has(`open`)){let t=e.get(`open`);if(t===this.open||t===void 0&&this.open===!1)return;this.customStates.set(`open`,this.open),this.open?await this.showMenu():(this.closeAllSubmenus(),await this.hideMenu())}e.has(`size`)&&this.syncItemSizes()}getItems(e=!1){let t=(this.defaultSlot?.assignedElements({flatten:!0})??[]).filter(e=>e.localName===`wa-dropdown-item`);return e?t:t.filter(e=>!e.disabled)}getSubmenuItems(e,t=!1){let n=e.shadowRoot?.querySelector(`slot[name="submenu"]`)||e.querySelector(`slot[name="submenu"]`);if(!n)return[];let r=n.assignedElements({flatten:!0}).filter(e=>e.localName===`wa-dropdown-item`);return t?r:r.filter(e=>!e.disabled)}syncItemSizes(){(this.defaultSlot?.assignedElements({flatten:!0})??[]).filter(e=>e.localName===`wa-dropdown-item`).forEach(e=>e.size=this.size)}addToSubmenuStack(e){let t=this.openSubmenuStack.indexOf(e);t===-1?this.openSubmenuStack.push(e):this.openSubmenuStack=this.openSubmenuStack.slice(0,t+1)}removeFromSubmenuStack(){return this.openSubmenuStack.pop()}getCurrentSubmenuItem(){return this.openSubmenuStack.length>0?this.openSubmenuStack[this.openSubmenuStack.length-1]:void 0}closeAllSubmenus(){this.getItems(!0).forEach(e=>{e.submenuOpen=!1}),this.openSubmenuStack=[]}closeSiblingSubmenus(e){let t=e.closest(`wa-dropdown-item:not([slot="submenu"])`),n;n=t?this.getSubmenuItems(t,!0):this.getItems(!0),n.forEach(t=>{t!==e&&t.submenuOpen&&(t.submenuOpen=!1)}),this.openSubmenuStack.includes(e)||this.openSubmenuStack.push(e)}getTrigger(){return this.querySelector(`[slot="trigger"]`)}async showMenu(){if(!this.getTrigger()||!this.popup||!this.menu)return;let e=new Zl;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}if(this.popup.active)return;bu.forEach(e=>e.open=!1),this.popup.active=!0,this.open=!0,bu.add(this),us(this),this.syncAriaAttributes(),document.addEventListener(`keydown`,this.handleDocumentKeyDown),document.addEventListener(`pointerdown`,this.handleDocumentPointerDown),document.addEventListener(`mousemove`,this.handleGlobalMouseMove),this.menu.classList.remove(`hide`),await z(this.menu,`show`);let t=this.getItems();t.length>0&&(t.forEach((e,t)=>e.active=t===0),t[0].focus({preventScroll:!0})),this.dispatchEvent(new eu)}async hideMenu(){if(!this.popup||!this.menu)return;let e=new Ql({source:this});if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0;return}this.open=!1,bu.delete(this),ds(this),this.syncAriaAttributes(),document.removeEventListener(`keydown`,this.handleDocumentKeyDown),document.removeEventListener(`pointerdown`,this.handleDocumentPointerDown),document.removeEventListener(`mousemove`,this.handleGlobalMouseMove),this.menu.classList.remove(`show`),await z(this.menu,`hide`),this.popup.active=this.open,this.dispatchEvent(new $l)}handleMenuClick(e){let t=e.target.closest(`wa-dropdown-item`);if(!(!t||t.disabled)){if(t.hasSubmenu){t.submenuOpen||=(this.closeSiblingSubmenus(t),this.addToSubmenuStack(t),!0),e.stopPropagation();return}this.makeSelection(t)}}async handleMenuSlotChange(){let e=this.getItems(!0);await Promise.all(e.map(e=>e.updateComplete)),this.syncItemSizes();let t=e.some(e=>e.type===`checkbox`),n=e.some(e=>e.hasSubmenu);e.forEach((e,r)=>{e.active=r===0,e.checkboxAdjacent=t,e.submenuAdjacent=n})}handleTriggerClick(){this.open=!this.open}handleSubmenuOpening(e){let t=e.detail.item;this.closeSiblingSubmenus(t),this.addToSubmenuStack(t),this.setupSubmenuPosition(t),this.processSubmenuItems(t)}setupSubmenuPosition(e){if(!e.submenuElement)return;this.cleanupSubmenuPosition(e);let t=Nl(e,e.submenuElement,()=>{this.positionSubmenu(e),this.updateSafeTriangleCoordinates(e)});this.submenuCleanups.set(e,t);let n=e.submenuElement.querySelector(`slot[name="submenu"]`);n&&(n.removeEventListener(`slotchange`,xu.handleSubmenuSlotChange),n.addEventListener(`slotchange`,xu.handleSubmenuSlotChange),xu.handleSubmenuSlotChange({target:n}))}static handleSubmenuSlotChange(e){let t=e.target;if(!t)return;let n=t.assignedElements().filter(e=>e.localName===`wa-dropdown-item`);if(n.length===0)return;let r=n.some(e=>e.hasSubmenu),i=n.some(e=>e.type===`checkbox`);n.forEach(e=>{e.submenuAdjacent=r,e.checkboxAdjacent=i})}processSubmenuItems(e){if(!e.submenuElement)return;let t=this.getSubmenuItems(e,!0),n=t.some(e=>e.hasSubmenu);t.forEach(e=>{e.submenuAdjacent=n})}cleanupSubmenuPosition(e){let t=this.submenuCleanups.get(e);t&&(t(),this.submenuCleanups.delete(e))}positionSubmenu(e){if(!e.submenuElement)return;let t=this.localize.dir()===`rtl`?`left-start`:`right-start`;zl(e,e.submenuElement,{placement:t,middleware:[Pl({mainAxis:0,crossAxis:-5}),Il({fallbackStrategy:`bestFit`}),Fl({padding:8})]}).then(({x:t,y:n,placement:r})=>{e.submenuElement.setAttribute(`data-placement`,r),Object.assign(e.submenuElement.style,{left:`${t}px`,top:`${n}px`})})}updateSafeTriangleCoordinates(e){if(!e.submenuElement||!e.submenuOpen)return;if(document.activeElement?.matches(`:focus-visible`)){e.submenuElement.style.setProperty(`--safe-triangle-visible`,`none`);return}e.submenuElement.style.setProperty(`--safe-triangle-visible`,`block`);let t=e.submenuElement.getBoundingClientRect(),n=this.localize.dir()===`rtl`;e.submenuElement.style.setProperty(`--safe-triangle-submenu-start-x`,`${n?t.right:t.left}px`),e.submenuElement.style.setProperty(`--safe-triangle-submenu-start-y`,`${t.top}px`),e.submenuElement.style.setProperty(`--safe-triangle-submenu-end-x`,`${n?t.right:t.left}px`),e.submenuElement.style.setProperty(`--safe-triangle-submenu-end-y`,`${t.bottom}px`)}makeSelection(e){let t=this.getTrigger();if(e.disabled)return;e.type===`checkbox`&&(e.checked=!e.checked);let n=new _u({item:e});this.dispatchEvent(n),n.defaultPrevented||(this.open=!1,t?.focus({preventScroll:!0}))}async syncAriaAttributes(){let e=this.getTrigger(),t;e&&(e.localName===`wa-button`?(await customElements.whenDefined(`wa-button`),await e.updateComplete,t=e.shadowRoot.querySelector(`[part="base"]`)):t=e,t.hasAttribute(`id`)||t.setAttribute(`id`,Ho(`wa-dropdown-trigger-`)),t.setAttribute(`aria-haspopup`,`menu`),t.setAttribute(`aria-expanded`,this.open?`true`:`false`),this.menu?.setAttribute(`aria-expanded`,`false`))}render(){let e=this.hasUpdated?this.popup?.active:this.open;return b`
      <wa-popup
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        ?active=${e}
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
    `}};xu.css=[wo,vu],D([j(`slot:not([name])`)],xu.prototype,`defaultSlot`,2),D([j(`#menu`)],xu.prototype,`menu`,2),D([j(`wa-popup`)],xu.prototype,`popup`,2),D([k({type:Boolean,reflect:!0})],xu.prototype,`open`,2),D([k({reflect:!0})],xu.prototype,`size`,2),D([k({reflect:!0})],xu.prototype,`placement`,2),D([k({type:Number})],xu.prototype,`distance`,2),D([k({type:Number})],xu.prototype,`skidding`,2),xu=D([O(`wa-dropdown`)],xu);var Su=y`
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

  :host(:state(disabled)),
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
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
`,Cu=class extends M{constructor(){super(...arguments),this.hasSlotController=new So(this,`[default]`,`start`,`end`),this.active=!1,this.variant=`default`,this.size=`medium`,this.checkboxAdjacent=!1,this.submenuAdjacent=!1,this.type=`normal`,this.checked=!1,this.disabled=!1,this.submenuOpen=!1,this.hasSubmenu=!1,this.handleSlotChange=()=>{this.hasSubmenu=this.hasSlotController.test(`submenu`),this.updateHasSubmenuState(),this.hasSubmenu?(this.setAttribute(`aria-haspopup`,`menu`),this.setAttribute(`aria-expanded`,this.submenuOpen?`true`:`false`)):(this.removeAttribute(`aria-haspopup`),this.removeAttribute(`aria-expanded`))},this.handleHostClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())},this.handleClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleHostClick),this.addEventListener(`mouseenter`,this.handleMouseEnter.bind(this)),this.shadowRoot.addEventListener(`click`,this.handleClick,{capture:!0}),this.shadowRoot.addEventListener(`slotchange`,this.handleSlotChange)}disconnectedCallback(){super.disconnectedCallback(),this.closeSubmenu(),this.removeEventListener(`click`,this.handleHostClick),this.removeEventListener(`mouseenter`,this.handleMouseEnter),this.shadowRoot.removeEventListener(`click`,this.handleClick,{capture:!0}),this.shadowRoot.removeEventListener(`slotchange`,this.handleSlotChange)}firstUpdated(){this.setAttribute(`tabindex`,`-1`),this.hasSubmenu=this.hasSlotController.test(`submenu`),this.updateHasSubmenuState()}updated(e){e.has(`active`)&&(this.setAttribute(`tabindex`,this.active?`0`:`-1`),this.customStates.set(`active`,this.active)),e.has(`checked`)&&(this.type===`checkbox`?this.setAttribute(`aria-checked`,this.checked?`true`:`false`):this.removeAttribute(`aria-checked`),this.customStates.set(`checked`,this.checked)),e.has(`disabled`)&&(this.setAttribute(`aria-disabled`,this.disabled?`true`:`false`),this.customStates.set(`disabled`,this.disabled),this.style.pointerEvents=this.disabled?`none`:``),e.has(`type`)&&(this.type===`checkbox`?(this.setAttribute(`role`,`menuitemcheckbox`),this.setAttribute(`aria-checked`,this.checked?`true`:`false`)):(this.setAttribute(`role`,`menuitem`),this.removeAttribute(`aria-checked`))),e.has(`submenuOpen`)&&(this.customStates.set(`submenu-open`,this.submenuOpen),this.submenuOpen?this.openSubmenu():this.closeSubmenu())}updateHasSubmenuState(){this.customStates.set(`has-submenu`,this.hasSubmenu)}async openSubmenu(){let e=this.submenuElement;!this.hasSubmenu||!e||!this.isConnected||(this.notifyParentOfOpening(),e.showPopover?.(),e.hidden=!1,e.setAttribute(`data-visible`,``),this.submenuOpen=!0,this.setAttribute(`aria-expanded`,`true`),await z(e,`show`),setTimeout(()=>{let e=this.getSubmenuItems();e.length>0&&(e.forEach((e,t)=>e.active=t===0),e[0].focus({preventScroll:!0}))},0))}notifyParentOfOpening(){let e=new CustomEvent(`submenu-opening`,{bubbles:!0,composed:!0,detail:{item:this}});this.dispatchEvent(e);let t=this.parentElement;t&&[...t.children].filter(e=>e!==this&&e.localName===`wa-dropdown-item`&&e.getAttribute(`slot`)===this.getAttribute(`slot`)&&e.submenuOpen).forEach(e=>{e.submenuOpen=!1})}async closeSubmenu(){let e=this.submenuElement;!this.hasSubmenu||!e||(this.submenuOpen=!1,this.setAttribute(`aria-expanded`,`false`),e.hidden||(await z(e,`hide`),e?.isConnected&&(e.hidden=!0,e.removeAttribute(`data-visible`),e.hidePopover?.())))}getSubmenuItems(){return[...this.children].filter(e=>e.localName===`wa-dropdown-item`&&e.getAttribute(`slot`)===`submenu`&&!e.hasAttribute(`disabled`))}handleMouseEnter(){this.hasSubmenu&&!this.disabled&&(this.notifyParentOfOpening(),this.submenuOpen=!0)}render(){return b`
      ${this.type===`checkbox`?b`
            <wa-icon
              id="check"
              part="checkmark"
              exportparts="svg:checkmark__svg"
              library="system"
              name="check"
            ></wa-icon>
          `:``}

      <span id="icon" part="icon">
        <slot name="icon"></slot>
      </span>

      <span id="label" part="label">
        <slot></slot>
      </span>

      <span id="details" part="details">
        <slot name="details"></slot>
      </span>

      ${this.hasSubmenu?b`
            <wa-icon
              id="submenu-indicator"
              part="submenu-icon"
              exportparts="svg:submenu-icon__svg"
              library="system"
              name="chevron-right"
            ></wa-icon>
          `:``}
      ${this.hasSubmenu?b`
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
          `:``}
    `}};Cu.css=Su,D([j(`#submenu`)],Cu.prototype,`submenuElement`,2),D([k({type:Boolean})],Cu.prototype,`active`,2),D([k({reflect:!0})],Cu.prototype,`variant`,2),D([k({reflect:!0})],Cu.prototype,`size`,2),D([k({attribute:`checkbox-adjacent`,type:Boolean,reflect:!0})],Cu.prototype,`checkboxAdjacent`,2),D([k({attribute:`submenu-adjacent`,type:Boolean,reflect:!0})],Cu.prototype,`submenuAdjacent`,2),D([k()],Cu.prototype,`value`,2),D([k({reflect:!0})],Cu.prototype,`type`,2),D([k({type:Boolean})],Cu.prototype,`checked`,2),D([k({type:Boolean,reflect:!0})],Cu.prototype,`disabled`,2),D([k({type:Boolean,reflect:!0})],Cu.prototype,`submenuOpen`,2),D([A()],Cu.prototype,`hasSubmenu`,2),Cu=D([O(`wa-dropdown-item`)],Cu);var wu=class extends M{constructor(){super(...arguments),this.localize=new T(this),this.value=0,this.unit=`byte`,this.display=`short`}static get styles(){return[]}render(){if(isNaN(this.value))return``;let e=this.unit===`bit`?[``,`kilo`,`mega`,`giga`,`tera`]:[``,`kilo`,`mega`,`giga`,`tera`,`peta`],t=Math.max(0,Math.min(Math.floor(Math.log10(this.value)/3),e.length-1)),n=e[t]+this.unit,r=parseFloat((this.value/1e3**t).toPrecision(3));return this.localize.number(r,{style:`unit`,unit:n,unitDisplay:this.display})}};D([k({type:Number})],wu.prototype,`value`,2),D([k()],wu.prototype,`unit`,2),D([k()],wu.prototype,`display`,2),wu=D([O(`wa-format-bytes`)],wu);var Tu=class extends M{constructor(){super(...arguments),this.localize=new T(this),this.date=new Date,this.hourFormat=`auto`}static get styles(){return[]}render(){let e=new Date(this.date),t=this.hourFormat===`auto`?void 0:this.hourFormat===`12`;if(isNaN(e.getMilliseconds()))return;let n=this.localize.date(e,{weekday:this.weekday,era:this.era,year:this.year,month:this.month,day:this.day,hour:this.hour,minute:this.minute,second:this.second,timeZoneName:this.timeZoneName,timeZone:this.timeZone,hour12:t});return b`<time datetime=${e.toISOString()}>${n}</time>`}};D([k()],Tu.prototype,`date`,2),D([k()],Tu.prototype,`weekday`,2),D([k()],Tu.prototype,`era`,2),D([k()],Tu.prototype,`year`,2),D([k()],Tu.prototype,`month`,2),D([k()],Tu.prototype,`day`,2),D([k()],Tu.prototype,`hour`,2),D([k()],Tu.prototype,`minute`,2),D([k()],Tu.prototype,`second`,2),D([k({attribute:`time-zone-name`})],Tu.prototype,`timeZoneName`,2),D([k({attribute:`time-zone`})],Tu.prototype,`timeZone`,2),D([k({attribute:`hour-format`})],Tu.prototype,`hourFormat`,2),Tu=D([O(`wa-format-date`)],Tu);var Eu=class extends M{constructor(){super(...arguments),this.localize=new T(this),this.value=0,this.type=`decimal`,this.withoutGrouping=!1,this.currency=`USD`,this.currencyDisplay=`symbol`}static get styles(){return[]}render(){return isNaN(this.value)?``:this.localize.number(this.value,{style:this.type,currency:this.currency,currencyDisplay:this.currencyDisplay,useGrouping:!this.withoutGrouping,minimumIntegerDigits:this.minimumIntegerDigits,minimumFractionDigits:this.minimumFractionDigits,maximumFractionDigits:this.maximumFractionDigits,minimumSignificantDigits:this.minimumSignificantDigits,maximumSignificantDigits:this.maximumSignificantDigits})}};D([k({type:Number})],Eu.prototype,`value`,2),D([k()],Eu.prototype,`type`,2),D([k({attribute:`without-grouping`,type:Boolean})],Eu.prototype,`withoutGrouping`,2),D([k()],Eu.prototype,`currency`,2),D([k({attribute:`currency-display`})],Eu.prototype,`currencyDisplay`,2),D([k({attribute:`minimum-integer-digits`,type:Number})],Eu.prototype,`minimumIntegerDigits`,2),D([k({attribute:`minimum-fraction-digits`,type:Number})],Eu.prototype,`minimumFractionDigits`,2),D([k({attribute:`maximum-fraction-digits`,type:Number})],Eu.prototype,`maximumFractionDigits`,2),D([k({attribute:`minimum-significant-digits`,type:Number})],Eu.prototype,`minimumSignificantDigits`,2),D([k({attribute:`maximum-significant-digits`,type:Number})],Eu.prototype,`maximumSignificantDigits`,2),Eu=D([O(`wa-format-number`)],Eu);var Du=class extends Event{constructor(e){super(`wa-include-error`,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}},Ou=y`
  :host {
    display: block;
  }
`,ku=new Map;function Au(e,t=`cors`){let n=ku.get(e);if(n!==void 0)return Promise.resolve(n);let r=fetch(e,{mode:t}).then(async t=>{let n={ok:t.ok,status:t.status,html:await t.text()};return ku.set(e,n),n});return ku.set(e,r),r}var ju=class extends M{constructor(){super(...arguments),this.mode=`cors`,this.allowScripts=!1}executeScript(e){let t=document.createElement(`script`);[...e.attributes].forEach(e=>t.setAttribute(e.name,e.value)),t.textContent=e.textContent,e.parentNode.replaceChild(t,e)}async handleSrcChange(){try{let e=this.src,t=await Au(e,this.mode);if(e!==this.src)return;if(!t.ok){this.dispatchEvent(new Du({status:t.status}));return}this.innerHTML=t.html,this.allowScripts&&[...this.querySelectorAll(`script`)].forEach(e=>this.executeScript(e)),this.dispatchEvent(new or)}catch{this.dispatchEvent(new Du({status:-1}))}}render(){return b`<slot></slot>`}};ju.css=Ou,D([k()],ju.prototype,`src`,2),D([k()],ju.prototype,`mode`,2),D([k({attribute:`allow-scripts`,type:Boolean})],ju.prototype,`allowScripts`,2),D([E(`src`)],ju.prototype,`handleSrcChange`,1),ju=D([O(`wa-include`)],ju);var Mu=class extends Event{constructor(e){super(`wa-intersect`,{bubbles:!1,cancelable:!1,composed:!0}),this.detail=e}},Nu=y`
  :host {
    display: contents;
  }
`,Pu=class extends M{constructor(){super(...arguments),this.intersectionObserver=null,this.observedElements=new Map,this.root=null,this.rootMargin=`0px`,this.threshold=`0`,this.intersectClass=``,this.once=!1,this.disabled=!1}connectedCallback(){super.connectedCallback(),this.disabled||this.updateComplete.then(()=>{this.startObserver()})}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}handleSlotChange(){this.disabled||this.startObserver()}parseThreshold(){return du(this.threshold).map(e=>{let t=parseFloat(e);return isNaN(t)?0:R(t,0,1)})}resolveRoot(){if(!this.root)return null;try{let e=this.getRootNode().getElementById(this.root);return e||console.warn(`Root element with ID "${this.root}" could not be found.`,this),e}catch{return console.warn(`Invalid selector for root: "${this.root}"`,this),null}}startObserver(){if(this.stopObserver(),this.disabled)return;let e=this.parseThreshold(),t=this.resolveRoot();this.intersectionObserver=new IntersectionObserver(e=>{e.forEach(e=>{let t=this.observedElements.get(e.target)??!1,n=e.isIntersecting;this.observedElements.set(e.target,n),this.intersectClass&&(n?e.target.classList.add(this.intersectClass):e.target.classList.remove(this.intersectClass));let r=new Mu({entry:e});this.dispatchEvent(r),n&&!t&&this.once&&(this.intersectionObserver?.unobserve(e.target),this.observedElements.delete(e.target))})},{root:t,rootMargin:this.rootMargin,threshold:e});let n=this.shadowRoot.querySelector(`slot`);n!==null&&n.assignedElements({flatten:!0}).forEach(e=>{this.intersectionObserver?.observe(e),this.observedElements.set(e,!1)})}stopObserver(){this.intersectClass&&this.observedElements.forEach((e,t)=>{t.classList.remove(this.intersectClass)}),this.intersectionObserver?.disconnect(),this.intersectionObserver=null,this.observedElements.clear()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}handleOptionsChange(){this.startObserver()}render(){return b` <slot @slotchange=${this.handleSlotChange}></slot> `}};Pu.css=Nu,D([k()],Pu.prototype,`root`,2),D([k({attribute:`root-margin`})],Pu.prototype,`rootMargin`,2),D([k()],Pu.prototype,`threshold`,2),D([k({attribute:`intersect-class`})],Pu.prototype,`intersectClass`,2),D([k({type:Boolean,reflect:!0})],Pu.prototype,`once`,2),D([k({type:Boolean,reflect:!0})],Pu.prototype,`disabled`,2),D([E(`disabled`,{waitUntilFirstUpdate:!0})],Pu.prototype,`handleDisabledChange`,1),D([E(`root`,{waitUntilFirstUpdate:!0}),E(`rootMargin`,{waitUntilFirstUpdate:!0}),E(`threshold`,{waitUntilFirstUpdate:!0})],Pu.prototype,`handleOptionsChange`,1),Pu=D([O(`wa-intersection-observer`)],Pu);var Fu=class extends Event{constructor(e){super(`wa-mutation`,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}},Iu=y`
  :host {
    display: contents;
  }
`,Lu=class extends M{constructor(){super(...arguments),this.attrOldValue=!1,this.charData=!1,this.charDataOldValue=!1,this.childList=!1,this.disabled=!1,this.handleMutation=e=>{this.dispatchEvent(new Fu({mutationList:e}))}}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.mutationObserver=new MutationObserver(this.handleMutation),this.disabled||this.startObserver())}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}startObserver(){let e=typeof this.attr==`string`&&this.attr.length>0,t=e&&this.attr!==`*`?this.attr.split(` `):void 0;try{this.mutationObserver.observe(this,{subtree:!0,childList:this.childList,attributes:e,attributeFilter:t,attributeOldValue:this.attrOldValue,characterData:this.charData,characterDataOldValue:this.charDataOldValue})}catch{}}stopObserver(){this.mutationObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}handleChange(){this.stopObserver(),this.startObserver()}render(){return b` <slot></slot> `}};Lu.css=Iu,D([k({reflect:!0})],Lu.prototype,`attr`,2),D([k({attribute:`attr-old-value`,type:Boolean,reflect:!0})],Lu.prototype,`attrOldValue`,2),D([k({attribute:`char-data`,type:Boolean,reflect:!0})],Lu.prototype,`charData`,2),D([k({attribute:`char-data-old-value`,type:Boolean,reflect:!0})],Lu.prototype,`charDataOldValue`,2),D([k({attribute:`child-list`,type:Boolean,reflect:!0})],Lu.prototype,`childList`,2),D([k({type:Boolean,reflect:!0})],Lu.prototype,`disabled`,2),D([E(`disabled`)],Lu.prototype,`handleDisabledChange`,1),D([E(`attr`,{waitUntilFirstUpdate:!0}),E(`attr-old-value`,{waitUntilFirstUpdate:!0}),E(`char-data`,{waitUntilFirstUpdate:!0}),E(`char-data-old-value`,{waitUntilFirstUpdate:!0}),E(`childList`,{waitUntilFirstUpdate:!0})],Lu.prototype,`handleChange`,1),Lu=D([O(`wa-mutation-observer`)],Lu);var Ru=y`
  :host(:focus) {
    outline: none;
  }

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
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    background-color: var(--wa-form-control-background-color);
    padding: 0;
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);

    &:focus-within {
      outline-color: var(--wa-color-focus);
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
`,G=class extends F{constructor(){super(...arguments),this.assumeInteractionOn=[`blur`,`input`],this.hasSlotController=new So(this,`hint`,`label`),this.localize=new T(this),this.title=``,this._value=null,this.defaultValue=this.getAttribute(`value`)||null,this.size=`medium`,this.appearance=`outlined`,this.pill=!1,this.label=``,this.hint=``,this.placeholder=``,this.readonly=!1,this.required=!1,this.step=1,this.withoutSteppers=!1,this.inputmode=`numeric`,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,yo()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(e){this._value!==e&&(this.valueHasChanged=!0,this._value=e)}get isAtMin(){if(this.min===void 0)return!1;let e=parseFloat(this.value||``);return!isNaN(e)&&e<=this.min}get isAtMax(){if(this.max===void 0)return!1;let e=parseFloat(this.value||``);return!isNaN(e)&&e>=this.max}handleChange(e){this.value=this.input.value,this.relayNativeEvent(e,{bubbles:!0,composed:!0})}handleInput(){this.value=this.input.value}handleKeyDown(e){Ws(e,this),(e.key===`ArrowUp`||e.key===`ArrowDown`)&&requestAnimationFrame(()=>{this.value!==this.input.value&&(this.value=this.input.value)})}handleStepperPointerUp(e,t){this.disabled||this.readonly||(e===`up`?this.input.stepUp():this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value),this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0})),t.pointerType!==`touch`&&this.input.focus())}handleStepperPointerDown(e){e.pointerType!==`touch`&&(e.preventDefault(),this.input.focus())}updated(e){super.updated(e),e.has(`value`)&&this.customStates.set(`blank`,!this.value)}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}render(){let e=this.hasUpdated?this.hasSlotController.test(`label`):this.withLabel,t=this.hasUpdated?this.hasSlotController.test(`hint`):this.withHint,n=this.label?!0:!!e,r=this.hint?!0:!!t;return b`
      <label
        part="form-control-label label"
        class=${I({label:!0,"has-label":n})}
        for="input"
        aria-hidden=${n?`false`:`true`}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="number-field">
        ${this.withoutSteppers?``:b`
              <button
                part="stepper stepper-decrement"
                class="stepper stepper-decrement"
                type="button"
                tabindex="-1"
                aria-label=${this.localize.term(`decrement`)}
                ?disabled=${this.disabled||this.readonly||this.isAtMin}
                @pointerdown=${this.handleStepperPointerDown}
                @pointerup=${e=>this.handleStepperPointerUp(`down`,e)}
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
          inputmode=${P(this.inputmode)}
          title=${this.title}
          name=${P(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${P(this.placeholder)}
          min=${P(this.min)}
          max=${P(this.max)}
          step=${P(this.step)}
          .value=${ns(this.value??``)}
          autocomplete=${P(this.autocomplete)}
          ?autofocus=${this.autofocus}
          enterkeyhint=${P(this.enterkeyhint)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        <slot name="end" part="end" class="end"></slot>

        ${this.withoutSteppers?``:b`
              <button
                part="stepper stepper-increment"
                class="stepper stepper-increment"
                type="button"
                tabindex="-1"
                aria-label=${this.localize.term(`increment`)}
                ?disabled=${this.disabled||this.readonly||this.isAtMax}
                @pointerdown=${this.handleStepperPointerDown}
                @pointerup=${e=>this.handleStepperPointerUp(`up`,e)}
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
        class=${I({"has-slotted":r})}
        aria-hidden=${r?`false`:`true`}
        >${this.hint}</slot
      >
    `}};G.css=[wo,es,Ru],G.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0},D([j(`input`)],G.prototype,`input`,2),D([k()],G.prototype,`title`,2),D([A()],G.prototype,`value`,1),D([k({attribute:`value`,reflect:!0})],G.prototype,`defaultValue`,2),D([k({reflect:!0})],G.prototype,`size`,2),D([k({reflect:!0})],G.prototype,`appearance`,2),D([k({type:Boolean,reflect:!0})],G.prototype,`pill`,2),D([k()],G.prototype,`label`,2),D([k({attribute:`hint`})],G.prototype,`hint`,2),D([k()],G.prototype,`placeholder`,2),D([k({type:Boolean,reflect:!0})],G.prototype,`readonly`,2),D([k({type:Boolean,reflect:!0})],G.prototype,`required`,2),D([k({type:Number})],G.prototype,`min`,2),D([k({type:Number})],G.prototype,`max`,2),D([k()],G.prototype,`step`,2),D([k({attribute:`without-steppers`,type:Boolean})],G.prototype,`withoutSteppers`,2),D([k()],G.prototype,`autocomplete`,2),D([k({type:Boolean})],G.prototype,`autofocus`,2),D([k()],G.prototype,`enterkeyhint`,2),D([k()],G.prototype,`inputmode`,2),D([k({attribute:`with-label`,type:Boolean})],G.prototype,`withLabel`,2),D([k({attribute:`with-hint`,type:Boolean})],G.prototype,`withHint`,2),D([E(`step`,{waitUntilFirstUpdate:!0})],G.prototype,`handleStepChange`,1),G=D([O(`wa-number-input`)],G),G.disableWarning?.(`change-in-update`);var zu=y`
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
    :host(:not(:state(disabled), :state(current)):is(:state(hover), :hover)) {
      background-color: var(--wa-color-neutral-fill-normal);
      color: var(--wa-color-neutral-on-normal);
    }
  }

  :host(:state(current)),
  :host(:state(disabled):state(current)) {
    background-color: var(--wa-color-brand-fill-loud);
    color: var(--wa-color-brand-on-loud);
    opacity: 1;
  }

  :host(:state(disabled)) {
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
`;function Bu(e,t=0){if(!e||!globalThis.Node)return``;if(typeof e[Symbol.iterator]==`function`)return(Array.isArray(e)?e:[...e]).map(e=>Bu(e,--t)).join(``);let n=e;if(n.nodeType===Node.TEXT_NODE)return n.textContent??``;if(n.nodeType===Node.ELEMENT_NODE){let e=n;if(e.hasAttribute(`slot`)||e.matches(`style, script`))return``;if(e instanceof HTMLSlotElement){let n=e.assignedNodes({flatten:!0});if(n.length>0)return Bu(n,--t)}return t>-1?Bu(e,--t):e.textContent??``}return n.hasChildNodes()?Bu(n.childNodes,--t):``}var Vu=class extends M{constructor(){super(...arguments),this.localize=new T(this),this.cachedDefaultLabel=``,this.isInitialized=!1,this.isDefaultLabelDirty=!0,this.current=!1,this.value=``,this.disabled=!1,this.selected=!1,this.defaultSelected=!1,this._label=``,this.handleHover=e=>{e.type===`mouseenter`?this.customStates.set(`hover`,!0):e.type===`mouseleave`&&this.customStates.set(`hover`,!1)}}set label(e){let t=this._label;this._label=e||``,this._label!==t&&this.requestUpdate(`label`,t)}get label(){return this._label?this._label:this.defaultLabel}get defaultLabel(){return(this.isDefaultLabelDirty||!this.cachedDefaultLabel)&&this.updateDefaultLabel(),this.cachedDefaultLabel}connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`option`),this.setAttribute(`aria-selected`,`false`),this.addEventListener(`mouseenter`,this.handleHover),this.addEventListener(`mouseleave`,this.handleHover)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`mouseenter`,this.handleHover),this.removeEventListener(`mouseleave`,this.handleHover)}handleDefaultSlotChange(){this.isDefaultLabelDirty=!0,this.isInitialized?(customElements.whenDefined(`wa-select`).then(()=>{let e=this.closest(`wa-select`);e&&e.handleDefaultSlotChange()}),customElements.whenDefined(`wa-combobox`).then(()=>{let e=this.closest(`wa-combobox`);e&&e.handleDefaultSlotChange()})):this.isInitialized=!0}willUpdate(e){if(e.has(`defaultSelected`)&&!this.closest(`wa-combobox, wa-select`)?.hasInteracted&&this.defaultSelected){let e=this.selected;this.selected=this.defaultSelected,this.requestUpdate(`selected`,e)}super.willUpdate(e)}updated(e){super.updated(e),e.has(`disabled`)&&(this.setAttribute(`aria-disabled`,this.disabled?`true`:`false`),this.customStates.set(`disabled`,this.disabled)),e.has(`selected`)&&(this.setAttribute(`aria-selected`,this.selected?`true`:`false`),this.customStates.set(`selected`,this.selected)),e.has(`value`)&&(typeof this.value!=`string`&&(this.value=String(this.value)),this.handleDefaultSlotChange()),e.has(`current`)&&this.customStates.set(`current`,this.current)}firstUpdated(e){if(super.firstUpdated(e),this.selected&&!this.defaultSelected){let e=this.closest(`wa-select, wa-combobox`);e&&!e.hasInteracted&&e.selectionChanged?.()}}updateDefaultLabel(){let e=this.cachedDefaultLabel;this.cachedDefaultLabel=Bu(this).trim(),this.isDefaultLabelDirty=!1;let t=this.cachedDefaultLabel!==e;return!this._label&&t&&this.requestUpdate(`label`,e),t}render(){return b`
      ${this.selected?b`<wa-icon
            part="checked-icon"
            class="check"
            name="check"
            library="system"
            variant="solid"
            aria-hidden="true"
          ></wa-icon>`:b`<span part="checked-icon" class="check" aria-hidden="true"></span>`}
      <slot part="start" name="start" class="start"></slot>
      <slot part="label" class="label" @slotchange=${this.handleDefaultSlotChange}></slot>
      <slot part="end" name="end" class="end"></slot>
    `}};Vu.css=zu,D([j(`.label`)],Vu.prototype,`defaultSlot`,2),D([A()],Vu.prototype,`current`,2),D([k({reflect:!0})],Vu.prototype,`value`,2),D([k({type:Boolean})],Vu.prototype,`disabled`,2),D([k({type:Boolean,attribute:!1})],Vu.prototype,`selected`,2),D([k({type:Boolean,attribute:`selected`})],Vu.prototype,`defaultSelected`,2),D([k()],Vu.prototype,`label`,1),Vu=D([O(`wa-option`)],Vu);var Hu=y`
  :host {
    --arrow-size: 0.375rem;
    --max-width: 25rem;
    --show-duration: 100ms;
    --hide-duration: 100ms;

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
    --popup-border-width: var(--wa-panel-border-width);
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
`,Uu=new Set,Wu=class extends M{constructor(){super(...arguments),this.anchor=null,this.placement=`top`,this.open=!1,this.distance=8,this.skidding=0,this.for=null,this.withoutArrow=!1,this.eventController=new AbortController,this.handleAnchorClick=()=>{this.open=!this.open},this.handleBodyClick=e=>{e.target.closest(`[data-popover="close"]`)&&(e.stopPropagation(),this.open=!1)},this.handleDocumentKeyDown=e=>{e.key===`Escape`&&this.open&&fs(this)&&(e.preventDefault(),e.stopPropagation(),this.open=!1,this.anchor&&typeof this.anchor.focus==`function`&&this.anchor.focus())},this.handleDocumentClick=e=>{this.anchor&&e.composedPath().includes(this.anchor)||e.composedPath().includes(this)||(this.open=!1)}}connectedCallback(){super.connectedCallback(),this.id||=Ho(`wa-popover-`),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.for&&this.anchor&&(this.anchor=null,this.handleForChange())}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`keydown`,this.handleDocumentKeyDown),ds(this),this.eventController.abort()}firstUpdated(){this.open&&(this.dialog.show(),this.popup.active=!0,this.popup.reposition())}updated(e){e.has(`open`)&&this.customStates.set(`open`,this.open)}async handleOpenChange(){if(this.open){let e=new Zl;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}Uu.forEach(e=>e.open=!1),document.addEventListener(`keydown`,this.handleDocumentKeyDown,{signal:this.eventController.signal}),document.addEventListener(`click`,this.handleDocumentClick,{signal:this.eventController.signal}),this.dialog.show(),this.popup.active=!0,Uu.add(this),us(this),requestAnimationFrame(()=>{let e=this.querySelector(`[autofocus]`);e&&typeof e.focus==`function`?e.focus():this.dialog.focus()}),await z(this.popup.popup,`show-with-scale`),this.popup.reposition(),this.dispatchEvent(new eu)}else{let e=new Ql;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0;return}document.removeEventListener(`keydown`,this.handleDocumentKeyDown),document.removeEventListener(`click`,this.handleDocumentClick),Uu.delete(this),ds(this),await z(this.popup.popup,`hide-with-scale`),this.popup.active=!1,this.dialog.close(),this.dispatchEvent(new $l)}}handleForChange(){let e=this.getRootNode();if(!e)return;let t=this.for?e.getElementById(this.for):null,n=this.anchor;if(t===n)return;let{signal:r}=this.eventController;t&&t.addEventListener(`click`,this.handleAnchorClick,{signal:r}),n&&n.removeEventListener(`click`,this.handleAnchorClick),this.anchor=t,this.for&&!t&&console.warn(`A popover was assigned to an element with an ID of "${this.for}" but the element could not be found.`,this)}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}async show(){if(!this.open)return this.open=!0,Uo(this,`wa-after-show`)}async hide(){if(this.open)return this.open=!1,Uo(this,`wa-after-hide`)}render(){return b`
      <dialog part="dialog" class="dialog">
        <wa-popup
          part="popup"
          exportparts="
            popup:popup__popup,
            arrow:popup__arrow
          "
          class=${I({popover:!0,"popover-open":this.open})}
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
    `}};Wu.css=Hu,Wu.dependencies={"wa-popup":U},D([j(`dialog`)],Wu.prototype,`dialog`,2),D([j(`.body`)],Wu.prototype,`body`,2),D([j(`wa-popup`)],Wu.prototype,`popup`,2),D([A()],Wu.prototype,`anchor`,2),D([k()],Wu.prototype,`placement`,2),D([k({type:Boolean,reflect:!0})],Wu.prototype,`open`,2),D([k({type:Number})],Wu.prototype,`distance`,2),D([k({type:Number})],Wu.prototype,`skidding`,2),D([k()],Wu.prototype,`for`,2),D([k({attribute:`without-arrow`,type:Boolean,reflect:!0})],Wu.prototype,`withoutArrow`,2),D([E(`open`,{waitUntilFirstUpdate:!0})],Wu.prototype,`handleOpenChange`,1),D([E(`for`)],Wu.prototype,`handleForChange`,1),D([E([`distance`,`placement`,`skidding`])],Wu.prototype,`handleOptionsChange`,1),Wu=D([O(`wa-popover`)],Wu);var Gu=y`
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
`,Ku=class extends M{constructor(){super(...arguments),this.localize=new T(this),this.value=0,this.indeterminate=!1,this.label=``}updated(e){e.has(`value`)&&requestAnimationFrame(()=>{this.style.setProperty(`--percentage`,`${R(this.value,0,100)}%`)})}render(){return b`
      <div
        part="base"
        class="progress-bar"
        role="progressbar"
        title=${P(this.title)}
        aria-label=${this.label.length>0?this.label:this.localize.term(`progress`)}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate?`0`:this.value}
      >
        <div part="indicator" class="indicator">
          ${this.indeterminate?``:b` <slot part="label" class="label"></slot> `}
        </div>
      </div>
    `}};Ku.css=Gu,D([k({type:Number,reflect:!0})],Ku.prototype,`value`,2),D([k({type:Boolean,reflect:!0})],Ku.prototype,`indeterminate`,2),D([k()],Ku.prototype,`label`,2),Ku=D([O(`wa-progress-bar`)],Ku);var qu=y`
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
`,Ju=class extends M{constructor(){super(...arguments),this.localize=new T(this),this.value=0,this.label=``}updated(e){if(super.updated(e),e.has(`value`)){let e=parseFloat(getComputedStyle(this.indicator).getPropertyValue(`r`)),t=2*Math.PI*e;this.indicatorOffset=`${t-this.value/100*t}px`}}render(){return b`
      <div
        part="base"
        class="progress-ring"
        role="progressbar"
        aria-label=${this.label.length>0?this.label:this.localize.term(`progress`)}
        aria-describedby="label"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.value}"
        style=${N({"--percentage":this.value/100})}
      >
        <svg class="image">
          <circle part="track" class="track"></circle>
          <circle
            part="indicator"
            class="indicator"
            style=${N({"stroke-dashoffset":this.indicatorOffset})}
          ></circle>
        </svg>

        <slot id="label" part="label" class="label"></slot>
      </div>
    `}};Ju.css=qu,D([j(`.indicator`)],Ju.prototype,`indicator`,2),D([A()],Ju.prototype,`indicatorOffset`,2),D([k({type:Number,reflect:!0})],Ju.prototype,`value`,2),D([k()],Ju.prototype,`label`,2),Ju=D([O(`wa-progress-ring`)],Ju),Ju.disableWarning?.(`change-in-update`);var Yu=y`
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
`,Xu,Zu=class extends M{constructor(){super(...arguments),this.value=``,this.label=``,this.size=128,this.fill=``,this.background=``,this.radius=0,this.errorCorrection=`H`,this.generated=!1}firstUpdated(e){super.firstUpdated(e),this.hasUpdated&&this.generate()}generate(){if(!this.hasUpdated)return;if(!Xu){v(()=>import(`./qr-creator.es6.min-COGdb-Ul.js`).then(e=>{Xu=e.default,this.generate()}),[]);return}this.canvas.style.maxWidth=`${this.size}px`,this.canvas.style.maxHeight=`${this.size}px`;let e=getComputedStyle(this);Xu.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill||e.color,background:this.background||null,size:this.size*2},this.canvas),this.generated=!0}render(){return b`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${this.label?.length>0?this.label:this.value}
        @transitionend=${e=>{e.propertyName===`color`&&this.generate()}}
      ></canvas>
    `}};Zu.css=Yu,D([j(`canvas`)],Zu.prototype,`canvas`,2),D([k()],Zu.prototype,`value`,2),D([k()],Zu.prototype,`label`,2),D([k({type:Number})],Zu.prototype,`size`,2),D([k()],Zu.prototype,`fill`,2),D([k()],Zu.prototype,`background`,2),D([k({type:Number})],Zu.prototype,`radius`,2),D([k({attribute:`error-correction`})],Zu.prototype,`errorCorrection`,2),D([A()],Zu.prototype,`generated`,2),D([E([`background`,`errorCorrection`,`fill`,`radius`,`size`,`value`],{waitUntilFirstUpdate:!0})],Zu.prototype,`generate`,1),Zu=D([O(`wa-qr-code`)],Zu);var Qu=y`
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
`,$u=class extends F{constructor(){super(),this.checked=!1,this.forceDisabled=!1,this.appearance=`default`,this.disabled=!1,this.handleClick=()=>{!this.disabled&&!this.forceDisabled&&(this.checked=!0)},this.addEventListener(`click`,this.handleClick)}connectedCallback(){super.connectedCallback(),this.setInitialAttributes()}setInitialAttributes(){this.setAttribute(`role`,`radio`),this.tabIndex=0,this.setAttribute(`aria-disabled`,this.disabled||this.forceDisabled?`true`:`false`)}updated(e){if(super.updated(e),e.has(`checked`)&&(this.customStates.set(`checked`,this.checked),this.setAttribute(`aria-checked`,this.checked?`true`:`false`),!this.disabled&&!this.forceDisabled&&(this.tabIndex=this.checked?0:-1)),e.has(`disabled`)||e.has(`forceDisabled`)){let e=this.disabled||this.forceDisabled;this.customStates.set(`disabled`,e),this.setAttribute(`aria-disabled`,e?`true`:`false`),e?this.tabIndex=-1:this.tabIndex=this.checked?0:-1}}setValue(){}render(){return b`
      <span part="control" class="control">
        ${this.checked?b`
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" part="checked-icon" class="checked-icon">
                <circle cx="8" cy="8" r="8" />
              </svg>
            `:``}
      </span>

      <slot part="label" class="label"></slot>
    `}};$u.css=[es,wo,Qu],D([A()],$u.prototype,`checked`,2),D([A()],$u.prototype,`forceDisabled`,2),D([k({reflect:!0})],$u.prototype,`value`,2),D([k({reflect:!0})],$u.prototype,`appearance`,2),D([k({reflect:!0})],$u.prototype,`size`,2),D([k({type:Boolean})],$u.prototype,`disabled`,2),$u=D([O(`wa-radio`)],$u),$u.disableWarning?.(`change-in-update`);var ed=y`
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
`,td=class extends F{constructor(){super(),this.hasSlotController=new So(this,`hint`,`label`),this.label=``,this.hint=``,this.name=null,this.disabled=!1,this.orientation=`vertical`,this._value=null,this.defaultValue=this.getAttribute(`value`)||null,this.required=!1,this.withLabel=!1,this.withHint=!1,this.handleRadioClick=e=>{let t=e.target.closest(`wa-radio`);if(!t||t.disabled||t.forceDisabled||this.disabled)return;let n=this.value;this.value=t.value,t.checked=!0;let r=this.getAllRadios();for(let e of r)t!==e&&(e.checked=!1,e.setAttribute(`tabindex`,`-1`));this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))})},this.addEventListener(`keydown`,this.handleKeyDown),this.addEventListener(`click`,this.handleRadioClick)}static get validators(){let e=[$o({validationElement:Object.assign(document.createElement(`input`),{required:!0,type:`radio`,name:Ho(`__wa-radio`)})})];return[...super.validators,...e]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(e){typeof e==`number`&&(e=String(e)),this.valueHasChanged=!0,this._value=e}get validationTarget(){let e=this.querySelector(`:is(wa-radio):not([disabled])`);if(e)return e}updated(e){(e.has(`disabled`)||e.has(`size`)||e.has(`value`)||e.has(`defaultValue`))&&this.syncRadioElements()}formResetCallback(...e){this._value=null,super.formResetCallback(...e),this.syncRadioElements()}getAllRadios(){return[...this.querySelectorAll(`wa-radio`)]}handleLabelClick(){this.focus()}async syncRadioElements(){let e=this.getAllRadios();if(e.forEach((t,n)=>{this.size&&t.setAttribute(`size`,this.size),t.toggleAttribute(`data-wa-radio-horizontal`,this.orientation!==`vertical`),t.toggleAttribute(`data-wa-radio-vertical`,this.orientation===`vertical`),t.toggleAttribute(`data-wa-radio-first`,n===0),t.toggleAttribute(`data-wa-radio-inner`,n!==0&&n!==e.length-1),t.toggleAttribute(`data-wa-radio-last`,n===e.length-1),t.forceDisabled=this.disabled}),await Promise.all(e.map(async e=>{await e.updateComplete,!e.disabled&&e.value===this.value?e.checked=!0:e.checked=!1})),this.disabled)e.forEach(e=>{e.tabIndex=-1});else{let t=e.filter(e=>!e.disabled),n=t.find(e=>e.checked);t.length>0&&(n?t.forEach(e=>{e.tabIndex=e.checked?0:-1}):t.forEach((e,t)=>{e.tabIndex=t===0?0:-1})),e.filter(e=>e.disabled).forEach(e=>{e.tabIndex=-1})}}handleKeyDown(e){if(![`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,` `].includes(e.key)||this.disabled)return;let t=this.getAllRadios().filter(e=>!e.disabled);if(t.length<=0)return;e.preventDefault();let n=this.value,r=t.find(e=>e.checked)??t[0],i=e.key===` `?0:[`ArrowUp`,`ArrowLeft`].includes(e.key)?-1:1,a=t.indexOf(r)+i;a||=0,a<0&&(a=t.length-1),a>t.length-1&&(a=0);let o=t.some(e=>e.tagName.toLowerCase()===`wa-radio-button`);this.getAllRadios().forEach(e=>{e.checked=!1,o||e.setAttribute(`tabindex`,`-1`)}),this.value=t[a].value,t[a].checked=!0,o?t[a].shadowRoot.querySelector(`button`).focus():(t[a].setAttribute(`tabindex`,`0`),t[a].focus()),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}),e.preventDefault()}focus(e){if(this.disabled)return;let t=this.getAllRadios(),n=t.find(e=>e.checked),r=t.find(e=>!e.disabled),i=n||r;i&&i.focus(e)}render(){let e=this.hasUpdated?this.hasSlotController.test(`label`):this.withLabel,t=this.hasUpdated?this.hasSlotController.test(`hint`):this.withHint,n=this.label?!0:!!e,r=this.hint?!0:!!t;return b`
      <fieldset
        part="form-control"
        class=${I({"form-control":!0,"form-control-radio-group":!0,"form-control-has-label":n})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="hint"
        aria-errormessage="error-message"
        aria-orientation=${this.orientation}
      >
        <label
          part="form-control-label"
          id="label"
          class=${I({label:!0,"has-label":n})}
          aria-hidden=${n?`false`:`true`}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <slot part="form-control-input" @slotchange=${this.syncRadioElements}></slot>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${I({"has-slotted":r})}
          aria-hidden=${r?`false`:`true`}
          >${this.hint}</slot
        >
      </fieldset>
    `}};td.css=[wo,es,ed],td.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0},D([j(`slot:not([name])`)],td.prototype,`defaultSlot`,2),D([k()],td.prototype,`label`,2),D([k({attribute:`hint`})],td.prototype,`hint`,2),D([k({reflect:!0})],td.prototype,`name`,2),D([k({type:Boolean,reflect:!0})],td.prototype,`disabled`,2),D([k({reflect:!0})],td.prototype,`orientation`,2),D([A()],td.prototype,`value`,1),D([k({attribute:`value`,reflect:!0})],td.prototype,`defaultValue`,2),D([k({reflect:!0})],td.prototype,`size`,2),D([k({type:Boolean,reflect:!0})],td.prototype,`required`,2),D([k({type:Boolean,attribute:`with-label`})],td.prototype,`withLabel`,2),D([k({type:Boolean,attribute:`with-hint`})],td.prototype,`withHint`,2),td=D([O(`wa-radio-group`)],td),td.disableWarning?.(`change-in-update`);var nd=class extends Event{constructor(e){super(`wa-hover`,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}},rd=y`
  :host {
    --symbol-color: var(--wa-color-neutral-on-quiet);
    --symbol-color-active: var(--wa-color-yellow-70);
    --symbol-spacing: 0.125em;

    display: inline-flex;
    border-radius: var(--wa-border-radius-m);
    vertical-align: middle;
    touch-action: none;
  }

  :host(:focus) {
    outline: none;
  }

  :host(:focus-visible) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  .rating {
    position: relative;
    display: inline-flex;
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
`,id=class extends mn{constructor(e){if(super(e),this.it=x,e.type!==fn.CHILD)throw Error(this.constructor.directiveName+`() can only be used in child bindings`)}render(e){if(e===x||e==null)return this._t=void 0,this.it=e;if(e===Ke)return e;if(typeof e!=`string`)throw Error(this.constructor.directiveName+`() called with a non-string value`);if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};id.directiveName=`unsafeHTML`,id.resultType=1;var ad=pn(id),od=class extends F{constructor(){super(...arguments),this.assumeInteractionOn=[`change`],this.localize=new T(this),this.hoverValue=0,this.isHovering=!1,this.name=null,this.label=``,this.value=0,this.defaultValue=0,this.max=5,this.precision=1,this.readonly=!1,this.disabled=!1,this.required=!1,this.getSymbol=(e,t)=>t?`<wa-icon name="star" library="system" variant="solid"></wa-icon>`:`<wa-icon name="star" library="system" variant="regular"></wa-icon>`,this.size=`medium`,this.handleClick=e=>{this.disabled||(this.setRatingValue(this.getValueFromXCoordinate(e.clientX)),this.updateComplete.then(()=>{this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}))},this.handleKeyDown=e=>{let t=this.matches(`:dir(ltr)`),n=this.localize.dir()===`rtl`,r=this.value;if(!(this.disabled||this.readonly)){if(e.key===`ArrowDown`||t&&e.key===`ArrowLeft`||n&&e.key===`ArrowRight`){let t=e.shiftKey?1:this.precision;this.value=Math.max(0,this.value-t),e.preventDefault()}if(e.key===`ArrowUp`||t&&e.key===`ArrowRight`||n&&e.key===`ArrowLeft`){let t=e.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+t),e.preventDefault()}e.key===`Home`&&(this.value=0,e.preventDefault()),e.key===`End`&&(this.value=this.max,e.preventDefault()),this.value!==r&&this.updateComplete.then(()=>{this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))})}},this.handlePointerEnter=e=>{this.isHovering=!0,this.hoverValue=this.getValueFromPointerPosition(e)},this.handlePointerMove=e=>{this.hoverValue=this.getValueFromPointerPosition(e)},this.handlePointerLeave=()=>{this.isHovering=!1},this.handlePointerDown=e=>{e.button===0&&(this.isHovering=!0,this.hoverValue=this.getValueFromPointerPosition(e),this.setPointerCapture(e.pointerId),e.preventDefault())},this.handlePointerUp=e=>{this.releasePointerCapture(e.pointerId),this.isHovering=!1}}static get validators(){return[...super.validators,$o()]}connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`slider`),this.setAttribute(`aria-valuenow`,String(this.value)),this.setAttribute(`aria-valuemin`,`0`),this.setAttribute(`aria-valuemax`,String(this.max)),this.setAttribute(`aria-disabled`,this.disabled?`true`:`false`),this.setAttribute(`aria-readonly`,this.readonly?`true`:`false`),this.label&&this.setAttribute(`aria-label`,this.label),!this.disabled&&!this.readonly?this.tabIndex=0:this.tabIndex=-1,this.addEventListener(`click`,this.handleClick),this.addEventListener(`keydown`,this.handleKeyDown),this.addEventListener(`pointerenter`,this.handlePointerEnter),this.addEventListener(`pointermove`,this.handlePointerMove),this.addEventListener(`pointerleave`,this.handlePointerLeave),this.addEventListener(`pointerdown`,this.handlePointerDown),this.addEventListener(`pointerup`,this.handlePointerUp)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`pointerenter`,this.handlePointerEnter),this.removeEventListener(`pointermove`,this.handlePointerMove),this.removeEventListener(`pointerleave`,this.handlePointerLeave),this.removeEventListener(`pointerdown`,this.handlePointerDown),this.removeEventListener(`pointerup`,this.handlePointerUp)}updated(e){super.updated(e),e.has(`value`)&&this.setAttribute(`aria-valuenow`,String(this.value)),e.has(`max`)&&this.setAttribute(`aria-valuemax`,String(this.max)),e.has(`disabled`)&&(this.setAttribute(`aria-disabled`,this.disabled?`true`:`false`),this.tabIndex=this.disabled||this.readonly?-1:0),e.has(`readonly`)&&(this.setAttribute(`aria-readonly`,this.readonly?`true`:`false`),this.tabIndex=this.disabled||this.readonly?-1:0),e.has(`label`)&&(this.label?this.setAttribute(`aria-label`,this.label):this.removeAttribute(`aria-label`))}getValueFromPointerPosition(e){return this.getValueFromXCoordinate(e.clientX)}getValueFromXCoordinate(e){let t=this.localize.dir()===`rtl`,{left:n,right:r,width:i}=this.getBoundingClientRect();return R(t?this.roundToPrecision((r-e)/i*this.max,this.precision):this.roundToPrecision((e-n)/i*this.max,this.precision),0,this.max)}setRatingValue(e){this.disabled||this.readonly||(this.value=e===this.value?0:e,this.isHovering=!1)}roundToPrecision(e,t=.5){let n=1/t;return Math.ceil(e*n)/n}handleHoverValueChange(){this.dispatchEvent(new nd({phase:`move`,value:this.hoverValue}))}handleIsHoveringChange(){this.dispatchEvent(new nd({phase:this.isHovering?`start`:`end`,value:this.hoverValue}))}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}render(){let e=this.hasUpdated?this.localize.dir()===`rtl`:this.dir,t=Array.from(Array(this.max).keys()),n=0;return n=this.disabled||this.readonly?this.value:this.isHovering?this.hoverValue:this.value,b`
      <div
        part="base"
        class=${I({rating:!0,"rating-readonly":this.readonly,"rating-disabled":this.disabled})}
      >
        <span class="symbols">
          ${t.map(t=>{let r=n>=t+1;return n>t&&n<t+1?b`
                <span
                  class=${I({symbol:!0,"partial-symbol-container":!0,"symbol-hover":this.isHovering&&Math.ceil(n)===t+1})}
                  role="presentation"
                >
                  <div
                    style=${N({clipPath:e?`inset(0 ${(n-t)*100}% 0 0)`:`inset(0 0 0 ${(n-t)*100}%)`})}
                  >
                    ${ad(this.getSymbol(t+1,!1))}
                  </div>
                  <div
                    class="partial-filled"
                    style=${N({clipPath:e?`inset(0 0 0 ${100-(n-t)*100}%)`:`inset(0 ${100-(n-t)*100}% 0 0)`})}
                  >
                    ${ad(this.getSymbol(t+1,!0))}
                  </div>
                </span>
              `:b`
              <span
                class=${I({symbol:!0,"symbol-hover":this.isHovering&&Math.ceil(n)===t+1,"symbol-active":n>=t+1})}
                role="presentation"
              >
                ${ad(this.getSymbol(t+1,r))}
              </span>
            `})}
        </span>
      </div>
    `}};od.css=[wo,rd],D([A()],od.prototype,`hoverValue`,2),D([A()],od.prototype,`isHovering`,2),D([k()],od.prototype,`name`,2),D([k()],od.prototype,`label`,2),D([k({type:Number})],od.prototype,`value`,2),D([k({type:Number,attribute:`default-value`})],od.prototype,`defaultValue`,2),D([k({type:Number})],od.prototype,`max`,2),D([k({type:Number})],od.prototype,`precision`,2),D([k({type:Boolean,reflect:!0})],od.prototype,`readonly`,2),D([k({type:Boolean,reflect:!0})],od.prototype,`disabled`,2),D([k({type:Boolean,reflect:!0})],od.prototype,`required`,2),D([k()],od.prototype,`getSymbol`,2),D([k({reflect:!0})],od.prototype,`size`,2),D([E(`hoverValue`)],od.prototype,`handleHoverValueChange`,1),D([E(`isHovering`)],od.prototype,`handleIsHoveringChange`,1),od=D([O(`wa-rating`)],od);var sd=[{max:276e4,value:6e4,unit:`minute`},{max:72e6,value:36e5,unit:`hour`},{max:5184e5,value:864e5,unit:`day`},{max:24192e5,value:6048e5,unit:`week`},{max:28512e6,value:2592e6,unit:`month`},{max:1/0,value:31536e6,unit:`year`}],cd=class extends M{constructor(){super(...arguments),this.localize=new T(this),this.isoTime=``,this.relativeTime=``,this.date=new Date,this.format=`long`,this.numeric=`auto`,this.sync=!1}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.updateTimeout)}render(){let e=new Date,t=new Date(this.date);if(isNaN(t.getMilliseconds()))return this.relativeTime=``,this.isoTime=``,``;let n=t.getTime()-e.getTime(),{unit:r,value:i}=sd.find(e=>Math.abs(n)<e.max);if(this.isoTime=t.toISOString(),this.relativeTime=this.localize.relativeTime(Math.round(n/i),r,{numeric:this.numeric,style:this.format}),clearTimeout(this.updateTimeout),this.sync){let e;e=ld(r===`minute`?`second`:r===`hour`?`minute`:r===`day`?`hour`:`day`),this.updateTimeout=setTimeout(()=>this.requestUpdate(),e)}return b`<time datetime=${this.isoTime}>${this.relativeTime}</time>`}};D([A()],cd.prototype,`isoTime`,2),D([A()],cd.prototype,`relativeTime`,2),D([k()],cd.prototype,`date`,2),D([k()],cd.prototype,`format`,2),D([k()],cd.prototype,`numeric`,2),D([k({type:Boolean})],cd.prototype,`sync`,2),cd=D([O(`wa-relative-time`)],cd);function ld(e){let t={second:1e3,minute:6e4,hour:36e5,day:864e5}[e];return t-Date.now()%t}var ud=class extends Event{constructor(e){super(`wa-resize`,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}},dd=y`
  :host {
    display: contents;
  }
`,fd=class extends M{constructor(){super(...arguments),this.observedElements=[],this.disabled=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>{this.dispatchEvent(new ud({entries:e}))}),this.disabled||this.updateComplete.then(()=>{this.startObserver()})}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}handleSlotChange(){this.disabled||this.startObserver()}startObserver(){let e=this.shadowRoot.querySelector(`slot`);if(e!==null){let t=e.assignedElements({flatten:!0});this.observedElements.forEach(e=>this.resizeObserver.unobserve(e)),this.observedElements=[],t.forEach(e=>{this.resizeObserver.observe(e),this.observedElements.push(e)})}}stopObserver(){this.resizeObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}render(){return b` <slot @slotchange=${this.handleSlotChange}></slot> `}};fd.css=dd,D([k({type:Boolean,reflect:!0})],fd.prototype,`disabled`,2),D([E(`disabled`,{waitUntilFirstUpdate:!0})],fd.prototype,`handleDisabledChange`,1),fd=D([O(`wa-resize-observer`)],fd);var pd=y`
  :host {
    --shadow-color: var(--wa-color-surface-default);
    --shadow-size: 2rem;

    /* private (defined dynamically) */
    --start-shadow-opacity: 0;
    --end-shadow-opacity: 0;

    display: block;
    position: relative;
    max-width: 100%;
    overflow: hidden;
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
`,md=class extends M{constructor(){super(...arguments),this.localize=new T(this),this.resizeObserver=null,this.canScroll=!1,this.orientation=`horizontal`,this.withoutScrollbar=!1,this.withoutShadow=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.updateScroll()),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect()}handleKeyDown(e){e.key===`Home`&&(e.preventDefault(),this.content.scrollTo({left:this.orientation===`horizontal`?0:void 0,top:this.orientation===`vertical`?0:void 0})),e.key===`End`&&(e.preventDefault(),this.content.scrollTo({left:this.orientation===`horizontal`?this.content.scrollWidth:void 0,top:this.orientation===`vertical`?this.content.scrollHeight:void 0}))}handleSlotChange(){this.updateScroll()}updateScroll(){if(this.orientation===`horizontal`){let e=Math.ceil(this.content.clientWidth),t=Math.abs(Math.ceil(this.content.scrollLeft)),n=Math.ceil(this.content.scrollWidth)-e;this.canScroll=n>0;let r=Math.min(1,t/(n*.05)),i=Math.min(1,(n-t)/(n*.05));this.style.setProperty(`--start-shadow-opacity`,String(r||0)),this.style.setProperty(`--end-shadow-opacity`,String(i||0))}else{let e=Math.ceil(this.content.clientHeight),t=Math.abs(Math.ceil(this.content.scrollTop)),n=Math.ceil(this.content.scrollHeight)-e;this.canScroll=n>0;let r=Math.min(1,t/(n*.05)),i=Math.min(1,(n-t)/(n*.05));this.style.setProperty(`--start-shadow-opacity`,String(r||0)),this.style.setProperty(`--end-shadow-opacity`,String(i||0))}}render(){return b`
      ${this.withoutShadow?``:b`
            <div id="start-shadow" part="start-shadow" aria-hidden="true"></div>
            <div id="end-shadow" part="end-shadow" aria-hidden="true"></div>
          `}

      <div
        id="content"
        part="content"
        role="region"
        aria-label=${this.localize.term(`scrollableRegion`)}
        aria-orientation=${this.orientation}
        tabindex=${this.canScroll?`0`:`-1`}
        @keydown=${this.handleKeyDown}
        @scroll=${this.updateScroll}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};md.css=[pd],D([j(`#content`)],md.prototype,`content`,2),D([A()],md.prototype,`canScroll`,2),D([k({reflect:!0})],md.prototype,`orientation`,2),D([k({attribute:`without-scrollbar`,type:Boolean,reflect:!0})],md.prototype,`withoutScrollbar`,2),D([k({attribute:`without-shadow`,type:Boolean,reflect:!0})],md.prototype,`withoutShadow`,2),D([Or({passive:!0})],md.prototype,`updateScroll`,1),md=D([O(`wa-scroller`)],md);var hd=y`
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
    outline-color: var(--wa-color-focus);
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
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);

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

  /* Manage spacing when tags are present */
  :host([multiple]) {
    --_padding-with-tags: calc(var(--wa-form-control-height) * 0.1 - var(--wa-form-control-border-width));

    & .combobox:has(.tags wa-tag) {
      padding-block: var(--_padding-with-tags);
      padding-inline-start: var(--_padding-with-tags);
    }
  }

  /* Visually hide the display input when multiple is enabled */
  :host([multiple]) .combobox:has(.tags wa-tag) .display-input {
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

  :host([multiple]) .combobox:has(.tags wa-tag) .start::slotted(*) {
    margin-inline-start: calc(var(--wa-form-control-padding-inline) - var(--_padding-with-tags));
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
`,K=class extends F{constructor(){super(...arguments),this.assumeInteractionOn=[`blur`,`input`],this.cachedOptions=null,this.hasSlotController=new So(this,`hint`,`label`),this.localize=new T(this),this.selectionOrder=new Map,this.typeToSelectString=``,this.slotChangePending=!1,this.displayLabel=``,this.selectedOptions=[],this.name=``,this._defaultValue=null,this.size=`medium`,this.placeholder=``,this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance=`outlined`,this.pill=!1,this.label=``,this.placement=`bottom`,this.hint=``,this.withLabel=!1,this.withHint=!1,this.required=!1,this.getTag=e=>b`
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
          data-value=${e.value}
          @wa-remove=${t=>this.handleTagRemove(t,e)}
        >
          ${e.label}
        </wa-tag>
      `,this.handleDocumentFocusIn=e=>{let t=e.composedPath();this&&!t.includes(this)&&this.hide()},this.handleDocumentKeyDown=e=>{let t=e.target,n=t.closest(`[part~="clear-button"]`)!==null,r=t.closest(`wa-button`)!==null;if(!(n||r)){if(e.key===`Escape`&&this.open&&fs(this)&&(e.preventDefault(),e.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),e.key===`Enter`||e.key===` `&&this.typeToSelectString===``){if(e.preventDefault(),e.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if([`ArrowUp`,`ArrowDown`,`Home`,`End`].includes(e.key)){let t=this.getAllOptions(),n=t.indexOf(this.currentOption),r=Math.max(0,n);if(e.preventDefault(),!this.open&&(this.show(),this.currentOption))return;e.key===`ArrowDown`?(r=n+1,r>t.length-1&&(r=0)):e.key===`ArrowUp`?(r=n-1,r<0&&(r=t.length-1)):e.key===`Home`?r=0:e.key===`End`&&(r=t.length-1),this.setCurrentOption(t[r])}if(e.key?.length===1||e.key===`Backspace`){let t=this.getAllOptions();if(e.metaKey||e.ctrlKey||e.altKey)return;if(!this.open){if(e.key===`Backspace`)return;this.show()}e.stopPropagation(),e.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString=``,1e3),e.key===`Backspace`?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=e.key.toLowerCase();for(let e of t)if(e.label.toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(e);break}}}},this.handleDocumentMouseDown=e=>{let t=e.composedPath();this&&!t.includes(this)&&this.hide()}}static get validators(){let e=[$o({validationElement:Object.assign(document.createElement(`select`),{required:!0})})];return[...super.validators,...e]}get validationTarget(){return this.valueInput}set defaultValue(e){this._defaultValue=this.convertDefaultValue(e)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}rawValuesEqual(e,t){return e==null&&t==null?!0:e==null||t==null||e.length!==t.length?!1:e.every((e,n)=>e===t[n])}convertDefaultValue(e){return!(this.multiple||this.hasAttribute(`multiple`))&&Array.isArray(e)&&(e=e[0]),e}set value(e){let t=this.value;e instanceof FormData&&(e=e.getAll(this.name)),e!=null&&!Array.isArray(e)&&(e=[e]);let n=this._value;this._value=e??null,this.rawValuesEqual(n,this._value)||(this.valueHasChanged=!0,this.requestUpdate(`value`,t))}get value(){let e=this._value??this.defaultValue??null;e!=null&&(e=Array.isArray(e)?e:[e]),this.optionValues=new Set(this.getAllOptions().filter(e=>!e.disabled).map(e=>e.value));let t=e;return e!=null&&(t=e.filter(e=>this.optionValues.has(e)),t=this.multiple?t:t[0],t??=null),t}connectedCallback(){super.connectedCallback(),this.processSlotChange(),this.open=!1}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.cachedOptions=null}updateDefaultValue(){let e=this.getAllOptions().filter(e=>e.hasAttribute(`selected`)||e.defaultSelected);if(e.length>0){let t=e.map(e=>e.value);this._defaultValue=this.multiple?t:t[0]}this.hasAttribute(`value`)&&(this._defaultValue=this.getAttribute(`value`)||null)}addOpenListeners(){document.addEventListener(`focusin`,this.handleDocumentFocusIn),document.addEventListener(`keydown`,this.handleDocumentKeyDown),document.addEventListener(`mousedown`,this.handleDocumentMouseDown),us(this),this.getRootNode()!==document&&this.getRootNode().addEventListener(`focusin`,this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener(`focusin`,this.handleDocumentFocusIn),document.removeEventListener(`keydown`,this.handleDocumentKeyDown),document.removeEventListener(`mousedown`,this.handleDocumentMouseDown),ds(this),this.getRootNode()!==document&&this.getRootNode().removeEventListener(`focusin`,this.handleDocumentFocusIn)}handleFocus(){this.displayInput.setSelectionRange(0,0)}handleLabelClick(){this.displayInput.focus()}handleComboboxClick(e){e.preventDefault()}handleComboboxMouseDown(e){let t=e.composedPath().some(e=>e instanceof Element&&e.tagName.toLowerCase()===`wa-button`);this.disabled||t||(e.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(e){e.stopPropagation(),this.handleDocumentKeyDown(e)}handleClearClick(e){e.stopPropagation(),this.hasInteracted=!0,this.valueHasChanged=!0,this.value!==null&&(this.displayLabel=``,this.selectionOrder.clear(),this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new Us),this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}))}handleClearMouseDown(e){e.stopPropagation(),e.preventDefault()}handleOptionClick(e){let t=e.target.closest(`wa-option`);t&&!t.disabled&&(this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(t):this.setSelectedOptions(t),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.requestUpdate(`value`),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){this.slotChangePending||(this.slotChangePending=!0,queueMicrotask(()=>{this.slotChangePending=!1,this.processSlotChange()}))}processSlotChange(){customElements.get(`wa-option`)||customElements.whenDefined(`wa-option`).then(()=>this.handleDefaultSlotChange()),this.cachedOptions=null;let e=this.getAllOptions();this.updateDefaultValue();let t=this.value;if(t==null||!this.valueHasChanged&&!this.hasInteracted){this.selectionChanged();return}Array.isArray(t)||(t=[t]);let n=e.filter(e=>t.includes(e.value));this.setSelectedOptions(n)}handleTagRemove(e,t){if(e.stopPropagation(),this.disabled)return;this.hasInteracted=!0,this.valueHasChanged=!0;let n=t;if(!n){let t=e.target.closest(`wa-tag[data-value]`);if(t){let e=t.dataset.value;n=this.selectedOptions.find(t=>t.value===e)}}n&&(this.toggleOptionSelection(n,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}))}getAllOptions(){return this.cachedOptions?this.cachedOptions:this?.querySelectorAll?(this.cachedOptions=[...this.querySelectorAll(`wa-option`)],this.cachedOptions):[]}getFirstOption(){return this.querySelector(`wa-option`)}setCurrentOption(e){this.getAllOptions().forEach(e=>{e.current=!1,e.tabIndex=-1}),e&&(this.currentOption=e,e.current=!0,e.tabIndex=0,e.focus({preventScroll:!0}))}setSelectedOptions(e){let t=this.getAllOptions(),n=Array.isArray(e)?e:[e];t.forEach(e=>{n.includes(e)||(e.selected=!1)}),n.length&&n.forEach(e=>e.selected=!0),this.selectionChanged()}toggleOptionSelection(e,t){t===!0||t===!1?e.selected=t:e.selected=!e.selected,this.selectionChanged()}selectionChanged(){let e=this.getAllOptions().filter(e=>{if(!this.hasInteracted&&!this.valueHasChanged){let t=this.defaultValue,n=Array.isArray(t)?t:[t];return e.hasAttribute(`selected`)||e.defaultSelected||e.selected||n?.includes(e.value)}return e.selected}),t=new Set(e.map(e=>e.value));for(let e of this.selectionOrder.keys())t.has(e)||this.selectionOrder.delete(e);let n=(this.selectionOrder.size>0?Math.max(...this.selectionOrder.values()):-1)+1;for(let t of e)this.selectionOrder.has(t.value)||this.selectionOrder.set(t.value,n++);this.selectedOptions=e.sort((e,t)=>(this.selectionOrder.get(e.value)??0)-(this.selectionOrder.get(t.value)??0));let r=new Set(this.selectedOptions.map(e=>e.value));if(r.size>0||this._value){let e=this._value;if(this._value==null){let e=this.defaultValue??[];this._value=Array.isArray(e)?e:[e]}this._value=this._value?.filter(e=>!this.optionValues?.has(e))??null,this._value?.unshift(...r),this.requestUpdate(`value`,e)}this.multiple?this.placeholder&&!this.value?.length?this.displayLabel=``:this.displayLabel=this.localize.term(`numOptionsSelected`,this.selectedOptions.length):this.displayLabel=this.selectedOptions[0]?.label??``,this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((e,t)=>{if(t<this.maxOptionsVisible||this.maxOptionsVisible<=0){let n=this.getTag(e,t);return n?typeof n==`string`?ad(n):n:null}else if(t===this.maxOptionsVisible)return b`
          <wa-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
            >+${this.selectedOptions.length-t}</wa-tag
          >
        `;return null})}updated(e){super.updated(e),(e.has(`value`)||e.has(`displayLabel`))&&this.customStates.set(`blank`,!this.value&&!this.displayLabel)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){let e=this.getAllOptions(),t=Array.isArray(this.value)?this.value:[this.value],n=e.filter(e=>t.includes(e.value));this.setSelectedOptions(n),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption());let e=new Zl;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await z(this.popup.popup,`show`),this.currentOption&&uu(this.currentOption,this.listbox,`vertical`,`auto`),this.dispatchEvent(new eu)}else{let e=new Ql;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.removeOpenListeners(),await z(this.popup.popup,`hide`),this.listbox.hidden=!0,this.popup.active=!1,this.dispatchEvent(new $l)}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,Uo(this,`wa-after-show`)}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,Uo(this,`wa-after-hide`)}focus(e){this.displayInput.focus(e)}blur(){this.displayInput.blur()}formResetCallback(){this.selectionOrder.clear(),this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))})}render(){let e=this.hasUpdated?this.hasSlotController.test(`label`):this.withLabel,t=this.hasUpdated?this.hasSlotController.test(`hint`):this.withHint,n=this.label?!0:!!e,r=this.hint?!0:!!t,i=(this.hasUpdated||!1)&&this.withClear&&!this.disabled&&(this.displayLabel||this.value&&this.value.length>0);return b`
      <div
        part="form-control"
        class=${I({"form-control":!0,"form-control-has-label":n})}
      >
        <label
          id="label"
          part="form-control-label label"
          class=${I({label:!0,"has-label":n})}
          aria-hidden=${n?`false`:`true`}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${I({select:!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple})}
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
                aria-expanded=${this.open?`true`:`false`}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?`true`:`false`}
                aria-describedby="hint"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
              />

              <!-- Tags need to wait for first hydration before populating otherwise it will create a hydration mismatch. -->
              ${this.multiple&&this.hasUpdated?b`<div part="tags" class="tags" @wa-remove=${this.handleTagRemove}>${this.tags}</div>`:``}

              <input
                class="value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(`, `):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
              />

              ${i?b`
                    <button
                      part="clear-button"
                      type="button"
                      aria-label=${this.localize.term(`clearEntry`)}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                      </slot>
                    </button>
                  `:``}

              <slot name="end" part="end" class="end"></slot>

              <slot name="expand-icon" part="expand-icon" class="expand-icon">
                <wa-icon library="system" name="chevron-down" variant="solid"></wa-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?`true`:`false`}
              aria-multiselectable=${this.multiple?`true`:`false`}
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
          class=${I({"has-slotted":r})}
          aria-hidden=${r?`false`:`true`}
          >${this.hint}</slot
        >
      </div>
    `}};K.css=[hd,es,wo],D([j(`.select`)],K.prototype,`popup`,2),D([j(`.combobox`)],K.prototype,`combobox`,2),D([j(`.display-input`)],K.prototype,`displayInput`,2),D([j(`.value-input`)],K.prototype,`valueInput`,2),D([j(`.listbox`)],K.prototype,`listbox`,2),D([A()],K.prototype,`displayLabel`,2),D([A()],K.prototype,`currentOption`,2),D([A()],K.prototype,`selectedOptions`,2),D([k({reflect:!0})],K.prototype,`name`,2),D([k({attribute:!1})],K.prototype,`defaultValue`,1),D([k({attribute:`value`,reflect:!1})],K.prototype,`value`,1),D([k({reflect:!0})],K.prototype,`size`,2),D([k()],K.prototype,`placeholder`,2),D([k({type:Boolean,reflect:!0})],K.prototype,`multiple`,2),D([k({attribute:`max-options-visible`,type:Number})],K.prototype,`maxOptionsVisible`,2),D([k({type:Boolean})],K.prototype,`disabled`,2),D([k({attribute:`with-clear`,type:Boolean})],K.prototype,`withClear`,2),D([k({type:Boolean,reflect:!0})],K.prototype,`open`,2),D([k({reflect:!0})],K.prototype,`appearance`,2),D([k({type:Boolean,reflect:!0})],K.prototype,`pill`,2),D([k()],K.prototype,`label`,2),D([k({reflect:!0})],K.prototype,`placement`,2),D([k({attribute:`hint`})],K.prototype,`hint`,2),D([k({attribute:`with-label`,type:Boolean})],K.prototype,`withLabel`,2),D([k({attribute:`with-hint`,type:Boolean})],K.prototype,`withHint`,2),D([k({type:Boolean,reflect:!0})],K.prototype,`required`,2),D([k({attribute:!1})],K.prototype,`getTag`,2),D([E(`disabled`,{waitUntilFirstUpdate:!0})],K.prototype,`handleDisabledChange`,1),D([E(`value`,{waitUntilFirstUpdate:!0})],K.prototype,`handleValueChange`,1),D([E(`open`,{waitUntilFirstUpdate:!0})],K.prototype,`handleOpenChange`,1),K=D([O(`wa-select`)],K),K.disableWarning?.(`change-in-update`);var gd=class extends Event{constructor(){super(`wa-remove`,{bubbles:!0,cancelable:!1,composed:!0})}},_d=y`
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
`,vd=class extends M{constructor(){super(...arguments),this.localize=new T(this),this.variant=`neutral`,this.appearance=`filled-outlined`,this.size=`medium`,this.pill=!1,this.withRemove=!1}handleRemoveClick(){this.dispatchEvent(new gd)}render(){return b`
      <slot part="content" class="content"></slot>

      ${this.withRemove?b`
            <wa-button
              part="remove-button"
              exportparts="base:remove-button__base"
              class="remove"
              appearance="plain"
              @click=${this.handleRemoveClick}
              tabindex="-1"
            >
              <wa-icon name="xmark" library="system" variant="solid" label=${this.localize.term(`remove`)}></wa-icon>
            </wa-button>
          `:``}
    `}};vd.css=[_d,fo,wo],D([k({reflect:!0})],vd.prototype,`variant`,2),D([k({reflect:!0})],vd.prototype,`appearance`,2),D([k({reflect:!0})],vd.prototype,`size`,2),D([k({type:Boolean,reflect:!0})],vd.prototype,`pill`,2),D([k({attribute:`with-remove`,type:Boolean})],vd.prototype,`withRemove`,2),vd=D([O(`wa-tag`)],vd);var yd=y`
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
`,bd=class extends M{constructor(){super(...arguments),this.effect=`none`}render(){return b` <div part="indicator" class="indicator"></div> `}};bd.css=yd,D([k({reflect:!0})],bd.prototype,`effect`,2),bd=D([O(`wa-skeleton`)],bd);var xd=y`
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
  #label.has-label ~ #slider {
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
`,Sd=()=>({observedAttributes:[`min`,`max`,`step`],checkValidity(e){let t={message:``,isValid:!0,invalidKeys:[]},n=(e,t,n,r)=>{let i=document.createElement(`input`);return i.type=`range`,i.min=String(t),i.max=String(n),i.step=String(r),i.value=String(e),i.checkValidity(),i.validationMessage};if(e.isRange){let r=e.minValue,i=e.maxValue;if(r<e.min)return t.isValid=!1,t.invalidKeys.push(`rangeUnderflow`),t.message=n(r,e.min,e.max,e.step)||`Value must be greater than or equal to ${e.min}.`,t;if(i>e.max)return t.isValid=!1,t.invalidKeys.push(`rangeOverflow`),t.message=n(i,e.min,e.max,e.step)||`Value must be less than or equal to ${e.max}.`,t;if(e.step&&e.step!==1){let a=(r-e.min)%e.step!==0,o=(i-e.min)%e.step!==0;if(a||o)return t.isValid=!1,t.invalidKeys.push(`stepMismatch`),t.message=n(a?r:i,e.min,e.max,e.step)||`Value must be a multiple of ${e.step}.`,t}}else{let r=e.value;if(r<e.min)return t.isValid=!1,t.invalidKeys.push(`rangeUnderflow`),t.message=n(r,e.min,e.max,e.step)||`Value must be greater than or equal to ${e.min}.`,t;if(r>e.max)return t.isValid=!1,t.invalidKeys.push(`rangeOverflow`),t.message=n(r,e.min,e.max,e.step)||`Value must be less than or equal to ${e.max}.`,t;if(e.step&&e.step!==1&&(r-e.min)%e.step!==0)return t.isValid=!1,t.invalidKeys.push(`stepMismatch`),t.message=n(r,e.min,e.max,e.step)||`Value must be a multiple of ${e.step}.`,t}return t}}),q=class extends F{constructor(){super(...arguments),this.draggableThumbMin=null,this.draggableThumbMax=null,this.hasSlotController=new So(this,`hint`,`label`),this.localize=new T(this),this.activeThumb=null,this.lastTrackPosition=null,this.label=``,this.hint=``,this.minValue=0,this.maxValue=50,this.defaultValue=this.getAttribute(`value`)==null?this.minValue:Number(this.getAttribute(`value`)),this._value=null,this.range=!1,this.disabled=!1,this.readonly=!1,this.orientation=`horizontal`,this.size=`medium`,this.min=0,this.max=100,this.step=1,this.tooltipDistance=8,this.tooltipPlacement=`top`,this.withMarkers=!1,this.withTooltip=!1,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,Sd()]}get focusableAnchor(){return this.isRange&&this.thumbMin||this.slider}get validationTarget(){return this.focusableAnchor}get value(){return this.valueHasChanged?R(this._value??this.minValue??0,this.min,this.max):R(this._value??this.defaultValue,this.min,this.max)}set value(e){e=Number(e)??this.minValue,this._value!==e&&(this.valueHasChanged=!0,this._value=e)}get isRange(){return this.range}firstUpdated(){this.isRange?(this.draggableThumbMin=new ss(this.thumbMin,{start:()=>{this.activeThumb=`min`,this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.minValue,this.customStates.set(`dragging`,!0),this.showRangeTooltips()},move:(e,t)=>{this.setThumbValueFromCoordinates(e,t,`min`)},stop:()=>{this.minValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set(`dragging`,!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableThumbMax=new ss(this.thumbMax,{start:()=>{this.activeThumb=`max`,this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.maxValue,this.customStates.set(`dragging`,!0),this.showRangeTooltips()},move:(e,t)=>{this.setThumbValueFromCoordinates(e,t,`max`)},stop:()=>{this.maxValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set(`dragging`,!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableTrack=new ss(this.track,{start:(e,t)=>{if(this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.activeThumb)this.valueWhenDraggingStarted=this.activeThumb===`min`?this.minValue:this.maxValue;else{let n=this.getValueFromCoordinates(e,t),r=Math.abs(n-this.minValue),i=Math.abs(n-this.maxValue);if(r===i)if(n>this.maxValue)this.activeThumb=`max`;else if(n<this.minValue)this.activeThumb=`min`;else{let n=this.localize.dir()===`rtl`,r=this.orientation===`vertical`,i=r?t:e,a=this.lastTrackPosition||i;this.lastTrackPosition=i,this.activeThumb=i>a!==n&&!r||i<a&&r?`max`:`min`}else this.activeThumb=r<=i?`min`:`max`;this.valueWhenDraggingStarted=this.activeThumb===`min`?this.minValue:this.maxValue}this.customStates.set(`dragging`,!0),this.setThumbValueFromCoordinates(e,t,this.activeThumb),this.showRangeTooltips()},move:(e,t)=>{this.activeThumb&&this.setThumbValueFromCoordinates(e,t,this.activeThumb)},stop:()=>{this.activeThumb&&(this.activeThumb===`min`?this.minValue:this.maxValue)!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set(`dragging`,!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}})):this.draggableTrack=new ss(this.slider,{start:(e,t)=>{this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.value,this.customStates.set(`dragging`,!0),this.setValueFromCoordinates(e,t),this.showTooltip()},move:(e,t)=>{this.setValueFromCoordinates(e,t)},stop:()=>{this.value!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideTooltip(),this.customStates.set(`dragging`,!1),this.valueWhenDraggingStarted=void 0}})}willUpdate(e){this.isRange&&(e.has(`minValue`)||e.has(`maxValue`)||e.has(`min`)||e.has(`max`))&&(this.minValue=R(this.minValue,this.min,this.maxValue),this.maxValue=R(this.maxValue,this.minValue,this.max)),super.willUpdate(e)}updated(e){if(this.isRange&&(e.has(`minValue`)||e.has(`maxValue`))&&this.updateFormValue(),e.has(`disabled`)||e.has(`readonly`)){let e=!(this.disabled||this.readonly);this.isRange&&(this.draggableThumbMin&&this.draggableThumbMin.toggle(e),this.draggableThumbMax&&this.draggableThumbMax.toggle(e)),this.draggableTrack&&this.draggableTrack.toggle(e)}super.updated(e)}formDisabledCallback(e){this.disabled=e}formResetCallback(){this.isRange?(this.minValue=parseFloat(this.getAttribute(`min-value`)??String(this.min)),this.maxValue=parseFloat(this.getAttribute(`max-value`)??String(this.max))):(this._value=null,this.defaultValue=this.defaultValue??parseFloat(this.getAttribute(`value`)??String(this.min))),this.valueHasChanged=!1,this.hasInteracted=!1,super.formResetCallback()}clampAndRoundToStep(e){let t=(String(this.step).split(`.`)[1]||``).replace(/0+$/g,``).length,n=Number(this.step),r=Number(this.min),i=Number(this.max);return e=Math.round(e/n)*n,e=R(e,r,i),parseFloat(e.toFixed(t))}getPercentageFromValue(e){return(e-this.min)/(this.max-this.min)*100}getValueFromCoordinates(e,t){let n=this.localize.dir()===`rtl`,r=this.orientation===`vertical`,{top:i,right:a,bottom:o,left:s,height:c,width:l}=this.trackBoundingClientRect,u=r?t:e,d=r?{start:i,end:o,size:c}:{start:s,end:a,size:l},f=(r||n?d.end-u:u-d.start)/d.size;return this.clampAndRoundToStep(this.min+(this.max-this.min)*f)}handleBlur(){this.isRange?requestAnimationFrame(()=>{let e=this.shadowRoot?.activeElement;e===this.thumbMin||e===this.thumbMax||this.hideRangeTooltips()}):this.hideTooltip(),this.customStates.set(`focused`,!1),this.dispatchEvent(new FocusEvent(`blur`,{bubbles:!0,composed:!0}))}handleFocus(e){let t=e.target;this.isRange?(t===this.thumbMin?this.activeThumb=`min`:t===this.thumbMax&&(this.activeThumb=`max`),this.showRangeTooltips()):this.showTooltip(),this.customStates.set(`focused`,!0),this.dispatchEvent(new FocusEvent(`focus`,{bubbles:!0,composed:!0}))}handleKeyDown(e){let t=this.localize.dir()===`rtl`,n=e.target;if(this.disabled||this.readonly||this.isRange&&(n===this.thumbMin?this.activeThumb=`min`:n===this.thumbMax&&(this.activeThumb=`max`),!this.activeThumb))return;let r=this.isRange?this.activeThumb===`min`?this.minValue:this.maxValue:this.value,i=r;switch(e.key){case`ArrowUp`:case t?`ArrowLeft`:`ArrowRight`:e.preventDefault(),i=this.clampAndRoundToStep(r+this.step);break;case`ArrowDown`:case t?`ArrowRight`:`ArrowLeft`:e.preventDefault(),i=this.clampAndRoundToStep(r-this.step);break;case`Home`:e.preventDefault(),i=this.isRange&&this.activeThumb===`min`?this.min:this.isRange?this.minValue:this.min;break;case`End`:e.preventDefault(),i=this.isRange&&this.activeThumb===`max`?this.max:this.isRange?this.maxValue:this.max;break;case`PageUp`:e.preventDefault();let n=Math.max(r+(this.max-this.min)/10,r+this.step);i=this.clampAndRoundToStep(n);break;case`PageDown`:e.preventDefault();let a=Math.min(r-(this.max-this.min)/10,r-this.step);i=this.clampAndRoundToStep(a);break;case`Enter`:Ws(e,this);return}i!==r&&(this.isRange?(this.activeThumb===`min`?i>this.maxValue?(this.maxValue=i,this.minValue=i):this.minValue=Math.max(this.min,i):i<this.minValue?(this.minValue=i,this.maxValue=i):this.maxValue=Math.min(this.max,i),this.updateFormValue()):this.value=R(i,this.min,this.max),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}),this.hasInteracted=!0)}handleLabelPointerDown(e){e.preventDefault(),this.disabled||(this.isRange?this.thumbMin?.focus():this.slider.focus())}setValueFromCoordinates(e,t){let n=this.value;this.value=this.getValueFromCoordinates(e,t),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0}))})}setThumbValueFromCoordinates(e,t,n){let r=this.getValueFromCoordinates(e,t),i=n===`min`?this.minValue:this.maxValue;n===`min`?r>this.maxValue?(this.maxValue=r,this.minValue=r):this.minValue=Math.max(this.min,r):r<this.minValue?(this.minValue=r,this.maxValue=r):this.maxValue=Math.min(this.max,r),i!==(n===`min`?this.minValue:this.maxValue)&&(this.updateFormValue(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0}))}))}showTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!0)}hideTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!1)}showRangeTooltips(){if(!this.withTooltip)return;let e=this.shadowRoot?.getElementById(`tooltip-thumb-min`),t=this.shadowRoot?.getElementById(`tooltip-thumb-max`);this.activeThumb===`min`?(e&&(e.open=!0),t&&(t.open=!1)):this.activeThumb===`max`&&(t&&(t.open=!0),e&&(e.open=!1))}hideRangeTooltips(){if(!this.withTooltip)return;let e=this.shadowRoot?.getElementById(`tooltip-thumb-min`),t=this.shadowRoot?.getElementById(`tooltip-thumb-max`);e&&(e.open=!1),t&&(t.open=!1)}updateFormValue(){if(this.isRange){let e=new FormData;e.append(this.name||``,String(this.minValue)),e.append(this.name||``,String(this.maxValue)),this.setValue(e)}}focus(){this.isRange?this.thumbMin?.focus():this.slider.focus()}blur(){this.isRange?document.activeElement===this.thumbMin?this.thumbMin.blur():document.activeElement===this.thumbMax&&this.thumbMax.blur():this.slider.blur()}stepDown(){this.isRange?(this.minValue=R(this.clampAndRoundToStep(this.minValue-this.step),this.min,this.maxValue),this.updateFormValue()):this.value=this.clampAndRoundToStep(this.value-this.step)}stepUp(){this.isRange?(this.maxValue=R(this.clampAndRoundToStep(this.maxValue+this.step),this.minValue,this.max),this.updateFormValue()):this.value=this.clampAndRoundToStep(this.value+this.step)}render(){let e=this.hasUpdated?this.hasSlotController.test(`label`):this.withLabel,t=this.hasUpdated?this.hasSlotController.test(`hint`):this.withHint,n=this.label?!0:!!e,r=this.hint?!0:!!t,i=this.hasSlotController.test(`reference`),a=I({small:this.size===`small`,medium:this.size===`medium`,large:this.size===`large`,horizontal:this.orientation===`horizontal`,vertical:this.orientation===`vertical`,disabled:this.disabled}),o=[];if(this.withMarkers)for(let e=this.min;e<=this.max;e+=this.step)o.push(this.getPercentageFromValue(e));let s=b`
      <label
        id="label"
        part="label"
        for=${this.isRange?`thumb-min`:`text-box`}
        class=${I({vh:!n,"has-label":n})}
        @pointerdown=${this.handleLabelPointerDown}
      >
        <slot name="label">${this.label}</slot>
      </label>
    `,c=b`
      <div
        id="hint"
        part="hint"
        class=${I({"has-slotted":r})}
      >
        <slot name="hint">${this.hint}</slot>
      </div>
    `,l=this.withMarkers?b`
          <div id="markers" part="markers">
            ${o.map(e=>b`<span part="marker" class="marker" style=${N({"--position":`${e}%`})}></span>`)}
          </div>
        `:``,u=i?b`
          <div id="references" part="references" aria-hidden="true">
            <slot name="reference"></slot>
          </div>
        `:``,d=(e,t)=>this.withTooltip?b`
            <wa-tooltip
              id=${`tooltip${e===`thumb`?``:`-`+e}`}
              part="tooltip"
              exportparts="
                base:tooltip__base,
                body:tooltip__body,
                arrow:tooltip__arrow
              "
              trigger="manual"
              distance=${this.tooltipDistance}
              placement=${this.tooltipPlacement}
              for=${e}
              activation="manual"
              dir=${this.localize.dir()}
            >
              <span aria-hidden="true">
                ${typeof this.valueFormatter==`function`?this.valueFormatter(t):this.localize.number(t)}
              </span>
            </wa-tooltip>
          `:``;if(this.isRange){let e=R(this.getPercentageFromValue(this.minValue),0,100),t=R(this.getPercentageFromValue(this.maxValue),0,100);return b`
        ${s}

        <div id="slider" part="slider" class=${a}>
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style=${N({"--start":`${Math.min(e,t)}%`,"--end":`${Math.max(e,t)}%`})}
            ></div>

            ${l}

            <span
              id="thumb-min"
              part="thumb thumb-min"
              style=${N({"--position":`${e}%`})}
              role="slider"
              aria-valuemin=${this.min}
              aria-valuenow=${this.minValue}
              aria-valuetext=${typeof this.valueFormatter==`function`?this.valueFormatter(this.minValue):this.localize.number(this.minValue)}
              aria-valuemax=${this.max}
              aria-label="${this.label?`${this.label} (minimum value)`:`Minimum value`}"
              aria-orientation=${this.orientation}
              aria-disabled=${this.disabled?`true`:`false`}
              aria-readonly=${this.readonly?`true`:`false`}
              tabindex=${this.disabled?-1:0}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            ></span>

            <span
              id="thumb-max"
              part="thumb thumb-max"
              style=${N({"--position":`${t}%`})}
              role="slider"
              aria-valuemin=${this.min}
              aria-valuenow=${this.maxValue}
              aria-valuetext=${typeof this.valueFormatter==`function`?this.valueFormatter(this.maxValue):this.localize.number(this.maxValue)}
              aria-valuemax=${this.max}
              aria-label="${this.label?`${this.label} (maximum value)`:`Maximum value`}"
              aria-orientation=${this.orientation}
              aria-disabled=${this.disabled?`true`:`false`}
              aria-readonly=${this.readonly?`true`:`false`}
              tabindex=${this.disabled?-1:0}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            ></span>
          </div>

          ${u} ${c}
        </div>

        ${d(`thumb-min`,this.minValue)} ${d(`thumb-max`,this.maxValue)}
      `}else{let e=R(this.getPercentageFromValue(this.value),0,100),t=R(this.getPercentageFromValue(typeof this.indicatorOffset==`number`?this.indicatorOffset:this.min),0,100);return b`
        ${s}

        <div
          id="slider"
          part="slider"
          class=${a}
          role="slider"
          aria-disabled=${this.disabled?`true`:`false`}
          aria-readonly=${this.disabled?`true`:`false`}
          aria-orientation=${this.orientation}
          aria-valuemin=${this.min}
          aria-valuenow=${this.value}
          aria-valuetext=${typeof this.valueFormatter==`function`?this.valueFormatter(this.value):this.localize.number(this.value)}
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
              style=${N({"--start":`${t}%`,"--end":`${e}%`})}
            ></div>

            ${l}
            <span id="thumb" part="thumb" style=${N({"--position":`${e}%`})}></span>
          </div>

          ${u} ${c}
        </div>

        ${d(`thumb`,this.value)}
      `}}};q.formAssociated=!0,q.observeSlots=!0,q.css=[wo,es,xd],D([j(`#slider`)],q.prototype,`slider`,2),D([j(`#thumb`)],q.prototype,`thumb`,2),D([j(`#thumb-min`)],q.prototype,`thumbMin`,2),D([j(`#thumb-max`)],q.prototype,`thumbMax`,2),D([j(`#track`)],q.prototype,`track`,2),D([j(`#tooltip`)],q.prototype,`tooltip`,2),D([k()],q.prototype,`label`,2),D([k({attribute:`hint`})],q.prototype,`hint`,2),D([k({reflect:!0})],q.prototype,`name`,2),D([k({type:Number,attribute:`min-value`})],q.prototype,`minValue`,2),D([k({type:Number,attribute:`max-value`})],q.prototype,`maxValue`,2),D([k({attribute:`value`,reflect:!0,type:Number})],q.prototype,`defaultValue`,2),D([A()],q.prototype,`value`,1),D([k({type:Boolean,reflect:!0})],q.prototype,`range`,2),D([k({type:Boolean})],q.prototype,`disabled`,2),D([k({type:Boolean,reflect:!0})],q.prototype,`readonly`,2),D([k({reflect:!0})],q.prototype,`orientation`,2),D([k({reflect:!0})],q.prototype,`size`,2),D([k({attribute:`indicator-offset`,type:Number})],q.prototype,`indicatorOffset`,2),D([k({type:Number})],q.prototype,`min`,2),D([k({type:Number})],q.prototype,`max`,2),D([k({type:Number})],q.prototype,`step`,2),D([k({type:Boolean})],q.prototype,`autofocus`,2),D([k({attribute:`tooltip-distance`,type:Number})],q.prototype,`tooltipDistance`,2),D([k({attribute:`tooltip-placement`,reflect:!0})],q.prototype,`tooltipPlacement`,2),D([k({attribute:`with-markers`,type:Boolean})],q.prototype,`withMarkers`,2),D([k({attribute:`with-tooltip`,type:Boolean})],q.prototype,`withTooltip`,2),D([k({attribute:`with-label`,type:Boolean})],q.prototype,`withLabel`,2),D([k({attribute:`with-hint`,type:Boolean})],q.prototype,`withHint`,2),D([k({attribute:!1})],q.prototype,`valueFormatter`,2),q=D([O(`wa-slider`)],q);var Cd=y`
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
`,wd=class extends M{constructor(){super(...arguments),this.isCollapsed=!1,this.localize=new T(this),this.positionBeforeCollapsing=0,this.position=50,this.orientation=`horizontal`,this.disabled=!1,this.snapThreshold=12}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>this.handleResize(e)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.unobserve(this)}detectSize(){let{width:e,height:t}=this.getBoundingClientRect();this.size=this.orientation===`vertical`?t:e}percentageToPixels(e){return this.size*(e/100)}pixelsToPercentage(e){return e/this.size*100}handleDrag(e){let t=this.hasUpdated?this.localize.dir()===`rtl`:this.dir===`rtl`;this.disabled||(e.cancelable&&e.preventDefault(),as(this,{onMove:(e,n)=>{let r=this.orientation===`vertical`?n:e;this.primary===`end`&&(r=this.size-r),this.snap&&this.snap.split(` `).forEach(e=>{let n;n=e.endsWith(`%`)?this.size*(parseFloat(e)/100):parseFloat(e),t&&this.orientation===`horizontal`&&(n=this.size-n),r>=n-this.snapThreshold&&r<=n+this.snapThreshold&&(r=n)}),this.position=R(this.pixelsToPercentage(r),0,100)},initialEvent:e}))}handleKeyDown(e){if(!this.disabled&&[`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`,`Home`,`End`,`Enter`].includes(e.key)){let t=this.position,n=(e.shiftKey?10:1)*(this.primary===`end`?-1:1);if(e.preventDefault(),(e.key===`ArrowLeft`&&this.orientation===`horizontal`||e.key===`ArrowUp`&&this.orientation===`vertical`)&&(t-=n),(e.key===`ArrowRight`&&this.orientation===`horizontal`||e.key===`ArrowDown`&&this.orientation===`vertical`)&&(t+=n),e.key===`Home`&&(t=this.primary===`end`?100:0),e.key===`End`&&(t=this.primary===`end`?0:100),e.key===`Enter`)if(this.isCollapsed)t=this.positionBeforeCollapsing,this.isCollapsed=!1;else{let e=this.position;t=0,requestAnimationFrame(()=>{this.isCollapsed=!0,this.positionBeforeCollapsing=e})}this.position=R(t,0,100)}}handleResize(e){let{width:t,height:n}=e[0].contentRect;if(this.size=this.orientation===`vertical`?n:t,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute(`position-in-pixels`)),this.positionInPixels=Number(this.getAttribute(`position-in-pixels`)),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary){let e=this.pixelsToPercentage(this.cachedPositionInPixels);this.position!==e&&(this.position=e)}}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position);let e=this.percentageToPixels(this.position);this.positionInPixels!==e&&(this.positionInPixels=e),this.isCollapsed=!1,this.positionBeforeCollapsing=0,this.dispatchEvent(new qs)}handlePositionInPixelsChange(){let e=this.pixelsToPercentage(this.positionInPixels);this.position!==e&&(this.position=e)}handleVerticalChange(){this.detectSize()}render(){let e=this.orientation===`vertical`?`gridTemplateRows`:`gridTemplateColumns`,t=this.orientation===`vertical`?`gridTemplateColumns`:`gridTemplateRows`,n=this.hasUpdated?this.localize.dir()===`rtl`:this.dir===`rtl`,r=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,i=`auto`;return this.style||={},this.primary===`end`?n&&this.orientation===`horizontal`?this.style[e]=`${r} var(--divider-width) ${i}`:this.style[e]=`${i} var(--divider-width) ${r}`:n&&this.orientation===`horizontal`?this.style[e]=`${i} var(--divider-width) ${r}`:this.style[e]=`${r} var(--divider-width) ${i}`,this.style[t]=``,b`
      <slot name="start" part="panel start" class="start"></slot>

      <div
        part="divider"
        class="divider"
        tabindex=${P(this.disabled?void 0:`0`)}
        role="separator"
        aria-valuenow=${this.position}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label=${this.localize.term(`resize`)}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <slot name="divider"></slot>
      </div>

      <slot name="end" part="panel end" class="end"></slot>
    `}};wd.css=Cd,D([j(`.divider`)],wd.prototype,`divider`,2),D([k({type:Number,reflect:!0})],wd.prototype,`position`,2),D([k({attribute:`position-in-pixels`,type:Number})],wd.prototype,`positionInPixels`,2),D([k({reflect:!0})],wd.prototype,`orientation`,2),D([k({type:Boolean,reflect:!0})],wd.prototype,`disabled`,2),D([k()],wd.prototype,`primary`,2),D([k()],wd.prototype,`snap`,2),D([k({type:Number,attribute:`snap-threshold`})],wd.prototype,`snapThreshold`,2),D([E(`position`)],wd.prototype,`handlePositionChange`,1),D([E(`positionInPixels`)],wd.prototype,`handlePositionInPixelsChange`,1),D([E(`vertical`)],wd.prototype,`handleVerticalChange`,1),wd=D([O(`wa-split-panel`)],wd);var Td=y`
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
`,Ed=class extends F{constructor(){super(...arguments),this.hasSlotController=new So(this,`hint`),this.title=``,this.name=null,this._value=this.getAttribute(`value`)??null,this.size=`medium`,this.disabled=!1,this._checked=null,this.defaultChecked=this.hasAttribute(`checked`),this.required=!1,this.hint=``,this.withHint=!1}static get validators(){return[...super.validators,yo()]}get value(){return this._value??`on`}set value(e){this._value=e}get checked(){return this.valueHasChanged?!!this._checked:this._checked??this.defaultChecked}set checked(e){this._checked=!!e,this.valueHasChanged=!0}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.updateComplete.then(()=>{this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))})}handleKeyDown(e){e.key===`ArrowLeft`&&(e.preventDefault(),this.checked=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0}))})),e.key===`ArrowRight`&&(e.preventDefault(),this.checked=!0,this.updateComplete.then(()=>{this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0}))}))}willUpdate(e){super.willUpdate(e),(e.has(`value`)||e.has(`checked`)||e.has(`defaultChecked`))&&this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked),this.customStates.set(`checked`,this.checked),this.updateValidity()}handleDisabledChange(){this.updateValidity()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}setValue(e,t){if(!this.checked){this.internals.setFormValue(null,null);return}this.internals.setFormValue(e??`on`,t)}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}render(){let e=this.hasUpdated?this.hasSlotController.test(`hint`):this.withHint,t=this.hint?!0:!!e;return b`
      <label
        part="base"
        class=${I({checked:this.checked,disabled:this.disabled})}
      >
        <input
          class="input"
          type="checkbox"
          title=${this.title}
          name=${P(this.name)}
          value=${P(this.value)}
          .checked=${ns(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="switch"
          aria-checked=${this.checked?`true`:`false`}
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
        class=${I({"has-slotted":t})}
        aria-hidden=${t?`false`:`true`}
        >${this.hint}</slot
      >
    `}};Ed.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0},Ed.css=[es,wo,Td],D([j(`input[type="checkbox"]`)],Ed.prototype,`input`,2),D([k()],Ed.prototype,`title`,2),D([k({reflect:!0})],Ed.prototype,`name`,2),D([k({reflect:!0})],Ed.prototype,`value`,1),D([k({reflect:!0})],Ed.prototype,`size`,2),D([k({type:Boolean})],Ed.prototype,`disabled`,2),D([k({type:Boolean,attribute:!1})],Ed.prototype,`checked`,1),D([k({type:Boolean,attribute:`checked`,reflect:!0})],Ed.prototype,`defaultChecked`,2),D([k({type:Boolean,reflect:!0})],Ed.prototype,`required`,2),D([k({attribute:`hint`})],Ed.prototype,`hint`,2),D([k({attribute:`with-hint`,type:Boolean})],Ed.prototype,`withHint`,2),D([E([`checked`,`defaultChecked`])],Ed.prototype,`handleStateChange`,1),D([E(`disabled`,{waitUntilFirstUpdate:!0})],Ed.prototype,`handleDisabledChange`,1),Ed=D([O(`wa-switch`)],Ed),Ed.disableWarning?.(`change-in-update`);var Dd=y`
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
`,Od=0,kd=class extends M{constructor(){super(...arguments),this.attrId=++Od,this.componentId=`wa-tab-${this.attrId}`,this.panel=``,this.active=!1,this.disabled=!1,this.tabIndex=0}connectedCallback(){this.slot||=`nav`,super.connectedCallback(),this.setAttribute(`role`,`tab`)}handleActiveChange(){this.setAttribute(`aria-selected`,this.active?`true`:`false`)}handleDisabledChange(){this.setAttribute(`aria-disabled`,this.disabled?`true`:`false`),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0}render(){return this.id=this.id?.length>0?this.id:this.componentId,b`
      <div
        part="base"
        class=${I({tab:!0,"tab-active":this.active})}
      >
        <slot></slot>
      </div>
    `}};kd.css=Dd,D([j(`.tab`)],kd.prototype,`tab`,2),D([k({reflect:!0})],kd.prototype,`panel`,2),D([k({type:Boolean,reflect:!0})],kd.prototype,`active`,2),D([k({type:Boolean,reflect:!0})],kd.prototype,`disabled`,2),D([k({type:Number,reflect:!0})],kd.prototype,`tabIndex`,2),D([E(`active`)],kd.prototype,`handleActiveChange`,1),D([E(`disabled`)],kd.prototype,`handleDisabledChange`,1),kd=D([O(`wa-tab`)],kd);var Ad=class extends Event{constructor(e){super(`wa-tab-hide`,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}},jd=class extends Event{constructor(e){super(`wa-tab-show`,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}},Md=y`
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

  .tab-group-top .body slot::slotted(wa-tab-panel) {
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

  .tab-group-bottom .body slot::slotted(wa-tab-panel) {
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

  .tab-group-start .body slot::slotted(wa-tab-panel) {
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

  .tab-group-end .body slot::slotted(wa-tab-panel) {
    --padding: 0 var(--wa-space-xl);
  }
`,Nd=class extends M{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new T(this),this.hasScrollControls=!1,this.active=``,this.placement=`top`,this.activation=`auto`,this.withoutScrollControls=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.updateScrollControls()}),this.mutationObserver=new MutationObserver(e=>{e.some(e=>![`aria-labelledby`,`aria-controls`].includes(e.attributeName))&&setTimeout(()=>this.setAriaLabels());let t=e.filter(e=>e.target.closest(`wa-tab-group`)===this);if(t.some(e=>e.attributeName===`disabled`))this.syncTabsAndPanels();else if(t.some(e=>e.attributeName===`active`)){let e=t.filter(e=>e.attributeName===`active`&&e.target.tagName.toLowerCase()===`wa-tab`).map(e=>e.target).find(e=>e.active);e&&e.closest(`wa-tab-group`)===this&&this.setActiveTab(e)}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),new IntersectionObserver((e,t)=>{if(e[0].intersectionRatio>0){if(this.setAriaLabels(),this.active){let e=this.tabs.find(e=>e.panel===this.active);e&&this.setActiveTab(e)}else this.setActiveTab(this.getActiveTab()??this.tabs[0],{emitEvents:!1});t.unobserve(e[0].target)}}).observe(this.tabGroup)})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect(),this.nav&&this.resizeObserver?.unobserve(this.nav)}getAllTabs(){return[...this.shadowRoot.querySelector(`slot[name="nav"]`).assignedElements()].filter(e=>e.tagName.toLowerCase()===`wa-tab`)}getAllPanels(){return[...this.defaultSlot.assignedElements()].filter(e=>e.tagName.toLowerCase()===`wa-tab-panel`)}getActiveTab(){return this.tabs.find(e=>e.active)}handleClick(e){let t=e.target.closest(`wa-tab`);t?.closest(`wa-tab-group`)===this&&t!==null&&this.setActiveTab(t,{scrollBehavior:`smooth`})}handleKeyDown(e){let t=e.target.closest(`wa-tab`);if(t?.closest(`wa-tab-group`)===this){if([`Enter`,` `].includes(e.key)){t!==null&&(this.setActiveTab(t,{scrollBehavior:`smooth`}),e.preventDefault());return}if([`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`,`Home`,`End`].includes(e.key)){let t=this.tabs.find(e=>e.matches(`:focus`)),n=this.localize.dir()===`rtl`,r=null;if(t?.tagName.toLowerCase()===`wa-tab`){if(e.key===`Home`)r=this.focusableTabs[0];else if(e.key===`End`)r=this.focusableTabs[this.focusableTabs.length-1];else if([`top`,`bottom`].includes(this.placement)&&e.key===(n?`ArrowRight`:`ArrowLeft`)||[`start`,`end`].includes(this.placement)&&e.key===`ArrowUp`){let e=this.tabs.findIndex(e=>e===t);r=this.findNextFocusableTab(e,`backward`)}else if([`top`,`bottom`].includes(this.placement)&&e.key===(n?`ArrowLeft`:`ArrowRight`)||[`start`,`end`].includes(this.placement)&&e.key===`ArrowDown`){let e=this.tabs.findIndex(e=>e===t);r=this.findNextFocusableTab(e,`forward`)}if(!r)return;r.tabIndex=0,r.focus({preventScroll:!0}),this.activation===`auto`?this.setActiveTab(r,{scrollBehavior:`smooth`}):this.tabs.forEach(e=>{e.tabIndex=e===r?0:-1}),[`top`,`bottom`].includes(this.placement)&&uu(r,this.nav,`horizontal`),e.preventDefault()}}}}findNextFocusableTab(e,t){let n=null,r=t===`forward`?1:-1,i=e+r;for(;e<this.tabs.length;){if(n=this.tabs[i]||null,n===null){n=t===`forward`?this.focusableTabs[0]:this.focusableTabs[this.focusableTabs.length-1];break}if(!n.disabled)break;i+=r}return n}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()===`rtl`?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:`smooth`})}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()===`rtl`?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:`smooth`})}setActiveTab(e,t){if(t={emitEvents:!0,scrollBehavior:`auto`,...t},e.closest(`wa-tab-group`)===this&&e!==this.activeTab&&!e.disabled){let n=this.activeTab;this.active=e.panel,this.activeTab=e,this.tabs.forEach(e=>{e.active=e===this.activeTab,e.tabIndex=e===this.activeTab?0:-1}),this.panels.forEach(e=>e.active=e.name===this.activeTab?.panel),[`top`,`bottom`].includes(this.placement)&&uu(this.activeTab,this.nav,`horizontal`,t.scrollBehavior),t.emitEvents&&(n&&this.dispatchEvent(new Ad({name:n.panel})),this.dispatchEvent(new jd({name:this.activeTab.panel})))}}setAriaLabels(){this.tabs.forEach(e=>{let t=this.panels.find(t=>t.name===e.panel);t&&(e.setAttribute(`aria-controls`,t.getAttribute(`id`)),t.setAttribute(`aria-labelledby`,e.getAttribute(`id`)))})}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(e=>!e.disabled),this.panels=this.getAllPanels(),this.updateComplete.then(()=>this.updateScrollControls())}updateActiveTab(){let e=this.tabs.find(e=>e.panel===this.active);e&&this.setActiveTab(e,{scrollBehavior:`smooth`})}updateScrollControls(){this.withoutScrollControls?this.hasScrollControls=!1:this.hasScrollControls=[`top`,`bottom`].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1}render(){let e=this.hasUpdated?this.localize.dir()===`rtl`:this.dir===`rtl`;return b`
      <div
        part="base"
        class=${I({"tab-group":!0,"tab-group-top":this.placement===`top`,"tab-group-bottom":this.placement===`bottom`,"tab-group-start":this.placement===`start`,"tab-group-end":this.placement===`end`,"tab-group-has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="nav-container" part="nav">
          ${this.hasScrollControls?b`
                <wa-button
                  part="scroll-button scroll-button-start"
                  exportparts="base:scroll-button__base"
                  class="scroll-button scroll-button-start"
                  appearance="plain"
                  @click=${this.handleScrollToStart}
                >
                  <wa-icon
                    name=${e?`chevron-right`:`chevron-left`}
                    library="system"
                    variant="solid"
                    label=${this.localize.term(`scrollToStart`)}
                  ></wa-icon>
                </wa-button>
              `:``}

          <!-- We have a focus listener because in Firefox (and soon to be Chrome) overflow containers are focusable. -->
          <div class="nav" @focus=${()=>this.activeTab?.focus({preventScroll:!0})}>
            <div part="tabs" class="tabs" role="tablist">
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls?b`
                <wa-button
                  part="scroll-button scroll-button-end"
                  class="scroll-button scroll-button-end"
                  exportparts="base:scroll-button__base"
                  appearance="plain"
                  @click=${this.handleScrollToEnd}
                >
                  <wa-icon
                    name=${e?`chevron-left`:`chevron-right`}
                    library="system"
                    variant="solid"
                    label=${this.localize.term(`scrollToEnd`)}
                  ></wa-icon>
                </wa-button>
              `:``}
        </div>

        <div part="body" class="body"><slot @slotchange=${this.syncTabsAndPanels}></slot></div>
      </div>
    `}};Nd.css=Md,D([j(`.tab-group`)],Nd.prototype,`tabGroup`,2),D([j(`.body slot`)],Nd.prototype,`defaultSlot`,2),D([j(`.nav`)],Nd.prototype,`nav`,2),D([A()],Nd.prototype,`hasScrollControls`,2),D([k({reflect:!0})],Nd.prototype,`active`,2),D([k()],Nd.prototype,`placement`,2),D([k()],Nd.prototype,`activation`,2),D([k({attribute:`without-scroll-controls`,type:Boolean})],Nd.prototype,`withoutScrollControls`,2),D([E(`active`)],Nd.prototype,`updateActiveTab`,1),D([E(`withoutScrollControls`,{waitUntilFirstUpdate:!0})],Nd.prototype,`updateScrollControls`,1),Nd=D([O(`wa-tab-group`)],Nd);var Pd=y`
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
`,Fd=0,Id=class extends M{constructor(){super(...arguments),this.attrId=++Fd,this.componentId=`wa-tab-panel-${this.attrId}`,this.name=``,this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute(`role`,`tabpanel`)}handleActiveChange(){this.setAttribute(`aria-hidden`,this.active?`false`:`true`)}render(){return b`
      <slot
        part="base"
        class=${I({"tab-panel":!0,"tab-panel-active":this.active})}
      ></slot>
    `}};Id.css=Pd,D([k({reflect:!0})],Id.prototype,`name`,2),D([k({type:Boolean,reflect:!0})],Id.prototype,`active`,2),D([E(`active`)],Id.prototype,`handleActiveChange`,1),Id=D([O(`wa-tab-panel`)],Id);var Ld=y`
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
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);

    &:focus-within {
      outline-color: var(--wa-color-focus);
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

  /*
   * Footer (hint + character count)
   */

  .footer {
    display: flex;
    align-items: baseline;
    gap: 1em;
  }

  .footer.has-count [part='hint'] {
    flex: 1 1 auto;
    min-width: 0;
  }

  .count {
    flex: 0 0 auto;
    color: var(--wa-form-control-hint-color);
    font-weight: var(--wa-form-control-hint-font-weight);
    line-height: var(--wa-form-control-hint-line-height);
    margin-block-start: 0.5em;
    font-size: var(--wa-font-size-smaller);
    margin-inline-start: auto;
  }
`,J=class extends F{constructor(){super(...arguments),this.assumeInteractionOn=[`blur`,`input`],this.hasSlotController=new So(this,`hint`,`label`),this.localize=new T(this),this.announcedCountText=``,this.title=``,this.name=null,this._value=null,this.defaultValue=this.getAttribute(`value`)??``,this.size=`medium`,this.appearance=`outlined`,this.label=``,this.hint=``,this.placeholder=``,this.rows=4,this.resize=`vertical`,this.disabled=!1,this.readonly=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1,this.withCount=!1}static get validators(){return[...super.validators,yo()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(e){this._value!==e&&(this.valueHasChanged=!0,this._value=e)}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{this.setTextareaDimensions(),this.updateResizeObserver(),this.didSSR&&this.input&&this.value!==this.input.value&&(this.value=this.input.value)})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.countAnnounceTimeout),this.resizeObserver?.disconnect(),this.resizeObserver=void 0}updateResizeObserver(){let e=this.resize!==`none`&&this.resize!==`auto`;e&&!this.resizeObserver&&this.input?(this.resizeObserver=new ResizeObserver(()=>this.setTextareaDimensions()),this.resizeObserver.observe(this.input)):!e&&this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=void 0)}handleBlur(){this.checkValidity()}handleChange(e){this.valueHasChanged=!0,this.value=this.input.value,this.setTextareaDimensions(),this.checkValidity(),this.relayNativeEvent(e,{bubbles:!0,composed:!0})}handleInput(e){this.valueHasChanged=!0,this.value=this.input.value,this.relayNativeEvent(e,{bubbles:!0,composed:!0}),this.scheduleCountAnnouncement()}scheduleCountAnnouncement(){clearTimeout(this.countAnnounceTimeout),this.countAnnounceTimeout=setTimeout(()=>{let e=(this.value??``).length;this.announcedCountText=this.maxlength==null?this.localize.term(`numCharacters`,e):this.localize.term(`numCharactersRemaining`,this.maxlength-e)},1e3)}setTextareaDimensions(){if(this.resize===`none`){this.base.style.width=``,this.base.style.height=``;return}if(this.resize===`auto`){this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height=`auto`,this.input.style.height=`${this.input.scrollHeight}px`,this.base.style.width=``,this.base.style.height=``;return}if(this.input.style.width){let e=Number(this.input.style.width.split(/px/)[0])+2;this.base.style.width=`${e}px`}if(this.input.style.height){let e=Number(this.input.style.height.split(/px/)[0])+2;this.base.style.height=`${e}px`}}handleRowsChange(){this.setTextareaDimensions()}async handleValueChange(){await this.updateComplete,this.checkValidity(),this.setTextareaDimensions()}updated(e){e.has(`resize`)&&(this.setTextareaDimensions(),this.updateResizeObserver()),super.updated(e),e.has(`value`)&&this.customStates.set(`blank`,!this.value)}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(e){if(e){typeof e.top==`number`&&(this.input.scrollTop=e.top),typeof e.left==`number`&&(this.input.scrollLeft=e.left);return}return{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(e,t,n=`none`){this.input.setSelectionRange(e,t,n)}setRangeText(e,t,n,r=`preserve`){let i=t??this.input.selectionStart,a=n??this.input.selectionEnd;this.input.setRangeText(e,i,a,r),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaDimensions())}formResetCallback(){this._value=null,this.input&&(this.input.value=this.value||``),super.formResetCallback()}render(){let e=this.hasUpdated?this.hasSlotController.test(`label`):this.withLabel,t=this.hasUpdated?this.hasSlotController.test(`hint`):this.withHint,n=this.label?!0:!!e,r=this.hint?!0:!!t,i=(this.value??``).length,a=this.maxlength==null?this.localize.term(`numCharacters`,i):this.localize.term(`numCharactersRemaining`,this.maxlength-i);return b`
      <label
        part="form-control-label label"
        class=${I({label:!0,"has-label":n})}
        for="input"
        aria-hidden=${n?`false`:`true`}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="textarea">
        <textarea
          part="textarea"
          id="input"
          class="control"
          title=${this.title}
          name=${P(this.name)}
          .value=${ns(this.value)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${P(this.placeholder)}
          rows=${P(this.rows)}
          minlength=${P(this.minlength)}
          maxlength=${P(this.maxlength)}
          autocapitalize=${P(this.autocapitalize)}
          autocorrect=${P(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${P(this.spellcheck)}
          enterkeyhint=${P(this.enterkeyhint)}
          inputmode=${P(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        ></textarea>

        <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
        <div part="textarea-adjuster" class="size-adjuster" ?hidden=${this.resize!==`auto`}></div>
      </div>

      <div
        class=${I({footer:!0,"has-count":this.withCount})}
      >
        <slot
          id="hint"
          name="hint"
          part="hint"
          aria-hidden=${r?`false`:`true`}
          class=${I({"has-slotted":r})}
          >${this.hint}</slot
        >

        ${this.withCount?b`
              <div part="count" class="count" aria-hidden="true">${a}</div>
              <div class="wa-visually-hidden-force" aria-live="polite">${this.announcedCountText}</div>
            `:``}
      </div>
    `}};J.css=[Ld,es,wo,cs],D([A()],J.prototype,`announcedCountText`,2),D([j(`.control`)],J.prototype,`input`,2),D([j(`[part~="base"]`)],J.prototype,`base`,2),D([j(`.size-adjuster`)],J.prototype,`sizeAdjuster`,2),D([k()],J.prototype,`title`,2),D([k({reflect:!0})],J.prototype,`name`,2),D([A()],J.prototype,`value`,1),D([k({attribute:`value`,reflect:!0})],J.prototype,`defaultValue`,2),D([k({reflect:!0})],J.prototype,`size`,2),D([k({reflect:!0})],J.prototype,`appearance`,2),D([k()],J.prototype,`label`,2),D([k({attribute:`hint`})],J.prototype,`hint`,2),D([k()],J.prototype,`placeholder`,2),D([k({type:Number})],J.prototype,`rows`,2),D([k({reflect:!0})],J.prototype,`resize`,2),D([k({type:Boolean})],J.prototype,`disabled`,2),D([k({type:Boolean,reflect:!0})],J.prototype,`readonly`,2),D([k({type:Boolean,reflect:!0})],J.prototype,`required`,2),D([k({type:Number})],J.prototype,`minlength`,2),D([k({type:Number})],J.prototype,`maxlength`,2),D([k()],J.prototype,`autocapitalize`,2),D([k({type:Boolean,converter:{fromAttribute:e=>!(!e||e===`off`),toAttribute:e=>e?`on`:`off`}})],J.prototype,`autocorrect`,2),D([k()],J.prototype,`autocomplete`,2),D([k({type:Boolean})],J.prototype,`autofocus`,2),D([k()],J.prototype,`enterkeyhint`,2),D([k({type:Boolean,converter:{fromAttribute:e=>!(!e||e===`false`),toAttribute:e=>e?`true`:`false`}})],J.prototype,`spellcheck`,2),D([k()],J.prototype,`inputmode`,2),D([k({attribute:`with-label`,type:Boolean})],J.prototype,`withLabel`,2),D([k({attribute:`with-hint`,type:Boolean})],J.prototype,`withHint`,2),D([k({attribute:`with-count`,type:Boolean,reflect:!0})],J.prototype,`withCount`,2),D([E(`rows`,{waitUntilFirstUpdate:!0})],J.prototype,`handleRowsChange`,1),D([E(`value`,{waitUntilFirstUpdate:!0})],J.prototype,`handleValueChange`,1),J=D([O(`wa-textarea`)],J),J.disableWarning?.(`change-in-update`);var Rd=class extends Event{constructor(e){super(`wa-selection-change`,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}},zd=y`
  :host {
    /*
     * These are actually used by tree item, but we define them here so they can more easily be set and all tree items
     * stay consistent.
     */
    --indent-guide-color: var(--wa-color-surface-border);
    --indent-guide-offset: 0;
    --indent-guide-style: solid;
    --indent-guide-width: 0;
    --indent-size: 2em;

    display: block;
  }
`,Bd=class extends Event{constructor(){super(`wa-lazy-change`,{bubbles:!0,cancelable:!1,composed:!0})}},Vd=class extends Event{constructor(){super(`wa-lazy-load`,{bubbles:!0,cancelable:!1,composed:!0})}},Hd=class extends Event{constructor(){super(`wa-collapse`,{bubbles:!0,cancelable:!1,composed:!0})}},Ud=class extends Event{constructor(){super(`wa-expand`,{bubbles:!0,cancelable:!1,composed:!0})}},Wd=class extends Event{constructor(){super(`wa-after-collapse`,{bubbles:!0,cancelable:!1,composed:!0})}},Gd=class extends Event{constructor(){super(`wa-after-expand`,{bubbles:!0,cancelable:!1,composed:!0})}},Kd=y`
  :host {
    /* Private - set by the component to control indentation depth */
    --indent: 0px;
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
    margin-inline-end: 0.5em;
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
    font-size: inherit;
    font-weight: inherit;
  }

  .checkbox::part(base) {
    display: flex;
    align-items: center;
  }

  .indentation {
    display: block;
    width: var(--indent);
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
    border-inline-start: solid 0.1875em transparent;
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
    inset-inline-start: calc(0.1875em + var(--indent) + 1em - (var(--indent-guide-width) / 2));
    border-inline-end: var(--indent-guide-width) var(--indent-guide-style) var(--indent-guide-color);
    z-index: 1;
  }

  @media (forced-colors: active) {
    :host(:not([aria-disabled='true'])) .tree-item-selected .item {
      outline: dashed 1px SelectedItem;
    }
  }
`;function qd(e,t,n){return e?t(e):n?.(e)}var Y=class extends M{constructor(){super(...arguments),this.localize=new T(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1,this.animationGeneration=0}static isTreeItem(e){return e instanceof Element&&e.getAttribute(`role`)===`treeitem`}connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`treeitem`),this.setAttribute(`tabindex`,`-1`),this.isNestedItem()&&(this.slot=`children`),this.updateIndentation()}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?`auto`:`0`,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange()}async animateCollapse(e){this.dispatchEvent(new Hd);let t=Go(getComputedStyle(this.childrenContainer).getPropertyValue(`--hide-duration`));await Wo(this.childrenContainer,[{height:`${this.childrenContainer.scrollHeight}px`,opacity:`1`,overflow:`hidden`},{height:`0`,opacity:`0`,overflow:`hidden`}],{duration:t,easing:`cubic-bezier(0.4, 0.0, 0.2, 1)`}),this.animationGeneration===e&&(this.childrenContainer.hidden=!0,this.dispatchEvent(new Wd))}isNestedItem(){let e=this.parentElement;return!!e&&Y.isTreeItem(e)}updateIndentation(){let e=0,t=this.parentElement;for(;t;)Y.isTreeItem(t)&&e++,t=t.parentElement;this.style.setProperty(`--indent`,`calc(${e} * var(--indent-size, 2em))`)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0}willUpdate(e){e.has(`selected`)&&!e.has(`indeterminate`)&&(this.indeterminate=!1)}async animateExpand(e){this.dispatchEvent(new Ud),this.childrenContainer.hidden=!1;let t=Go(getComputedStyle(this.childrenContainer).getPropertyValue(`--show-duration`));await Wo(this.childrenContainer,[{height:`0`,opacity:`0`,overflow:`hidden`},{height:`${this.childrenContainer.scrollHeight}px`,opacity:`1`,overflow:`hidden`}],{duration:t,easing:`cubic-bezier(0.4, 0.0, 0.2, 1)`}),this.animationGeneration===e&&(this.childrenContainer.style.height=`auto`,this.dispatchEvent(new Gd))}handleLoadingChange(){this.setAttribute(`aria-busy`,this.loading?`true`:`false`),this.loading||this.animateExpand(this.animationGeneration)}handleDisabledChange(){this.customStates.set(`disabled`,this.disabled),this.setAttribute(`aria-disabled`,this.disabled?`true`:`false`)}handleExpandedState(){this.customStates.set(`expanded`,this.expanded)}handleIndeterminateStateChange(){this.customStates.set(`indeterminate`,this.indeterminate)}handleSelectedChange(){this.customStates.set(`selected`,this.selected),this.setAttribute(`aria-selected`,this.selected?`true`:`false`)}handleExpandedChange(){this.isLeaf?this.removeAttribute(`aria-expanded`):this.setAttribute(`aria-expanded`,this.expanded?`true`:`false`)}handleExpandAnimation(){this.animationGeneration++;let e=this.animationGeneration;this.expanded?this.lazy?(this.loading=!0,this.dispatchEvent(new Vd)):this.animateExpand(e):this.animateCollapse(e)}handleLazyChange(){this.dispatchEvent(new Bd)}getChildrenItems({includeDisabled:e=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter(t=>Y.isTreeItem(t)&&(e||!t.disabled)):[]}render(){let e=this.localize.dir()===`rtl`,t=!this.loading&&(!this.isLeaf||this.lazy);return b`
      <div
        part="base"
        class="${I({"tree-item":!0,"tree-item-expanded":this.expanded,"tree-item-selected":this.selected,"tree-item-leaf":this.isLeaf,"tree-item-loading":this.loading,"tree-item-has-expand-button":t})}"
      >
        <div class="item" part="item">
          <div class="indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${I({"expand-button":!0,"expand-button-visible":t})}
            aria-hidden="true"
          >
            <slot class="expand-icon-slot" name="expand-icon">
              ${qd(this.loading,()=>b` <wa-spinner part="spinner" exportparts="base:spinner__base"></wa-spinner> `,()=>b`
                  <wa-icon name=${e?`chevron-left`:`chevron-right`} library="system" variant="solid"></wa-icon>
                `)}
            </slot>
            <slot class="expand-icon-slot" name="collapse-icon">
              <wa-icon name=${e?`chevron-left`:`chevron-right`} library="system" variant="solid"></wa-icon>
            </slot>
          </div>

          ${qd(this.selectable,()=>b`
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
                ?checked="${ns(this.selected)}"
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
    `}};Y.css=Kd,D([A()],Y.prototype,`indeterminate`,2),D([A()],Y.prototype,`isLeaf`,2),D([A()],Y.prototype,`loading`,2),D([A()],Y.prototype,`selectable`,2),D([k({type:Boolean,reflect:!0})],Y.prototype,`expanded`,2),D([k({type:Boolean,reflect:!0})],Y.prototype,`selected`,2),D([k({type:Boolean,reflect:!0})],Y.prototype,`disabled`,2),D([k({type:Boolean,reflect:!0})],Y.prototype,`lazy`,2),D([j(`slot:not([name])`)],Y.prototype,`defaultSlot`,2),D([j(`slot[name=children]`)],Y.prototype,`childrenSlot`,2),D([j(`.item`)],Y.prototype,`itemElement`,2),D([j(`.children`)],Y.prototype,`childrenContainer`,2),D([j(`.expand-button slot`)],Y.prototype,`expandButtonSlot`,2),D([E(`loading`,{waitUntilFirstUpdate:!0})],Y.prototype,`handleLoadingChange`,1),D([E(`disabled`)],Y.prototype,`handleDisabledChange`,1),D([E(`expanded`)],Y.prototype,`handleExpandedState`,1),D([E(`indeterminate`)],Y.prototype,`handleIndeterminateStateChange`,1),D([E(`selected`)],Y.prototype,`handleSelectedChange`,1),D([E(`expanded`,{waitUntilFirstUpdate:!0})],Y.prototype,`handleExpandedChange`,1),D([E(`expanded`,{waitUntilFirstUpdate:!0})],Y.prototype,`handleExpandAnimation`,1),D([E(`lazy`,{waitUntilFirstUpdate:!0})],Y.prototype,`handleLazyChange`,1),Y=D([O(`wa-tree-item`)],Y),Y.disableWarning?.(`change-in-update`);function Jd(e,t=!1){function n(e){let t=e.getChildrenItems({includeDisabled:!1});if(t.length){let n=t.every(e=>e.selected),r=t.every(e=>!e.selected&&!e.indeterminate);e.selected=n,e.indeterminate=!n&&!r}}function r(e){let t=e.parentElement;Y.isTreeItem(t)&&(n(t),r(t))}function i(e){for(let n of e.getChildrenItems())n.selected=t?e.selected||n.selected:!n.disabled&&e.selected,i(n);t&&n(e)}i(e),r(e)}var Yd=class extends M{constructor(){super(),this.selection=`single`,this.clickTarget=null,this.localize=new T(this),this.initTreeItem=e=>{e.updateComplete.then(()=>{e.selectable=this.selection===`multiple`,[`expand`,`collapse`].filter(e=>!!this.querySelector(`[slot="${e}-icon"]`)).forEach(t=>{let n=e.querySelector(`[slot="${t}-icon"]`),r=this.getExpandButtonIcon(t);r&&(n===null?e.append(r):n.hasAttribute(`data-default`)&&n.replaceWith(r))})})},this.handleTreeChanged=e=>{for(let t of e){let e=[...t.addedNodes].filter(Y.isTreeItem),n=[...t.removedNodes].filter(Y.isTreeItem);e.forEach(this.initTreeItem),this.lastFocusedItem&&n.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null)}},this.handleFocusOut=e=>{let t=e.relatedTarget;(!t||!this.contains(t))&&(this.tabIndex=0)},this.handleFocusIn=e=>{let t=e.target;e.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),Y.isTreeItem(t)&&!t.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=t,this.tabIndex=-1,t.tabIndex=0)},this.addEventListener(`focusin`,this.handleFocusIn),this.addEventListener(`focusout`,this.handleFocusOut),this.addEventListener(`wa-lazy-change`,this.handleSlotChange)}async connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`tree`),this.setAttribute(`tabindex`,`0`),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect()}getExpandButtonIcon(e){let t=(e===`expand`?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:!0})[0];if(t){let n=t.cloneNode(!0);return[n,...n.querySelectorAll(`[id]`)].forEach(e=>e.removeAttribute(`id`)),n.setAttribute(`data-default`,``),n.slot=`${e}-icon`,n}return null}selectItem(e){let t=[...this.selectedItems];if(this.selection===`multiple`)e.selected=!e.selected,e.lazy&&(e.expanded=!0),Jd(e);else if(this.selection===`single`||e.isLeaf){let t=this.getAllTreeItems();for(let n of t)n.selected=n===e}else this.selection===`leaf`&&(e.expanded=!e.expanded);let n=this.selectedItems;(t.length!==n.length||n.some(e=>!t.includes(e)))&&Promise.all(n.map(e=>e.updateComplete)).then(()=>{this.dispatchEvent(new Rd({selection:n}))})}getAllTreeItems(){return[...this.querySelectorAll(`wa-tree-item`)]}focusItem(e){e?.focus()}handleKeyDown(e){if(![`ArrowDown`,`ArrowUp`,`ArrowRight`,`ArrowLeft`,`Home`,`End`,`Enter`,` `].includes(e.key)||e.composedPath().some(e=>[`input`,`textarea`].includes(e?.tagName?.toLowerCase())))return;let t=this.getFocusableItems(),n=this.matches(`:dir(ltr)`),r=this.localize.dir()===`rtl`;if(t.length>0){e.preventDefault();let i=t.findIndex(e=>e.matches(`:focus`)),a=t[i],o=e=>{let n=t[R(e,0,t.length-1)];this.focusItem(n)},s=e=>{a.expanded=e};e.key===`ArrowDown`?o(i+1):e.key===`ArrowUp`?o(i-1):n&&e.key===`ArrowRight`||r&&e.key===`ArrowLeft`?!a||a.disabled||a.expanded||a.isLeaf&&!a.lazy?o(i+1):s(!0):n&&e.key===`ArrowLeft`||r&&e.key===`ArrowRight`?!a||a.disabled||a.isLeaf||!a.expanded?o(i-1):s(!1):e.key===`Home`?o(0):e.key===`End`?o(t.length-1):(e.key===`Enter`||e.key===` `)&&(a.disabled||this.selectItem(a))}}handleClick(e){let t=e.target,n=t.closest(`wa-tree-item`),r=e.composedPath().some(e=>e?.classList?.contains(`expand-button`));!n||n.disabled||t!==this.clickTarget||(r?n.expanded=!n.expanded:this.selectItem(n))}handleMouseDown(e){this.clickTarget=e.target}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}async handleSelectionChange(){let e=this.selection===`multiple`,t=this.getAllTreeItems();this.setAttribute(`aria-multiselectable`,e?`true`:`false`);for(let n of t)n.updateComplete.then(()=>{n.selectable=e});e&&(await this.updateComplete,[...this.querySelectorAll(`:scope > wa-tree-item`)].forEach(e=>{e.updateComplete.then(()=>{Jd(e,!0)})}))}get selectedItems(){return this.getAllTreeItems().filter(e=>e.selected)}getFocusableItems(){let e=this.getAllTreeItems(),t=new Set;return e.filter(e=>{if(e.disabled)return!1;let n=e.parentElement?.closest(`[role=treeitem]`);return n&&(!n.expanded||n.loading||t.has(n))&&t.add(e),!t.has(e)})}render(){return b`
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
    `}};Yd.css=zd,D([j(`slot:not([name])`)],Yd.prototype,`defaultSlot`,2),D([j(`slot[name=expand-icon]`)],Yd.prototype,`expandedIconSlot`,2),D([j(`slot[name=collapse-icon]`)],Yd.prototype,`collapsedIconSlot`,2),D([k()],Yd.prototype,`selection`,2),D([E(`selection`)],Yd.prototype,`handleSelectionChange`,1),Yd=D([O(`wa-tree`)],Yd);var Xd=y`
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
`,Zd=class{constructor(e,t){this.handleTransitionEnd=()=>{this.onThemeChange()},(this.host=e).addController(this),this.onThemeChange=t,this.hiddenElement=document.createElement(`div`),this.hiddenElement.setAttribute(`aria-hidden`,`true`),Object.assign(this.hiddenElement.style,{position:`absolute`,width:`0`,height:`0`,overflow:`hidden`,pointerEvents:`none`,opacity:`0`,color:`var(--wa-color-surface-default, transparent)`,transition:`color 0.001ms`})}hostConnected(){this.host.appendChild(this.hiddenElement),this.hiddenElement.addEventListener(`transitionend`,this.handleTransitionEnd)}hostDisconnected(){this.hiddenElement.removeEventListener(`transitionend`,this.handleTransitionEnd),this.hiddenElement.remove()}},Qd=class extends M{constructor(){super(),this.localize=new T(this),this.availableZoomLevels=[],this.themeObserver=new MutationObserver(()=>this.syncTheme()),this.allowfullscreen=!1,this.loading=`eager`,this.zoom=1,this.zoomLevels=`25% 50% 75% 100% 125% 150% 175% 200%`,this.withoutControls=!1,this.withoutInteraction=!1,this.withThemeSync=!1,new Zd(this,()=>this.syncTheme())}get contentWindow(){return this.iframe?.contentWindow||null}get contentDocument(){return this.iframe?.contentDocument||null}parseZoomLevels(e){let t=du(e),n=[];for(let e of t){let t;if(e.endsWith(`%`)){let n=parseFloat(e.slice(0,-1));if(!isNaN(n))t=Math.max(0,n/100);else continue}else if(t=parseFloat(e),!isNaN(t))t=Math.max(0,t);else continue;n.push(t)}return[...new Set(n)].sort((e,t)=>e-t)}getCurrentZoomIndex(){if(this.availableZoomLevels.length===0)return-1;let e=0,t=Math.abs(this.availableZoomLevels[0]-this.zoom);for(let n=1;n<this.availableZoomLevels.length;n++){let r=Math.abs(this.availableZoomLevels[n]-this.zoom);r<t&&(t=r,e=n)}return e}isZoomInDisabled(){return this.availableZoomLevels.length===0?!1:this.getCurrentZoomIndex()>=this.availableZoomLevels.length-1}isZoomOutDisabled(){return this.availableZoomLevels.length===0?!1:this.getCurrentZoomIndex()<=0}updated(e){if(e.has(`zoom`)&&this.style.setProperty(`--zoom`,`${this.zoom}`),e.has(`zoomLevels`)&&(this.availableZoomLevels=this.parseZoomLevels(this.zoomLevels),this.availableZoomLevels.length>0)){let e=this.getCurrentZoomIndex();Math.abs(this.availableZoomLevels[e]-this.zoom)>.001&&(this.zoom=this.availableZoomLevels[e])}e.has(`withThemeSync`)&&(this.withThemeSync?(this.themeObserver?.observe(document.documentElement,{attributes:!0,attributeFilter:[`class`]}),this.syncTheme()):this.themeObserver?.disconnect())}zoomIn(){if(this.availableZoomLevels.length===0){this.zoom=Math.min(this.zoom+.05,2);return}let e=this.getCurrentZoomIndex();e<this.availableZoomLevels.length-1&&(this.zoom=this.availableZoomLevels[e+1])}zoomOut(){if(this.availableZoomLevels.length===0){this.zoom=Math.max(this.zoom-.05,0);return}let e=this.getCurrentZoomIndex();e>0&&(this.zoom=this.availableZoomLevels[e-1])}disconnectedCallback(){super.disconnectedCallback(),this.themeObserver?.disconnect()}syncTheme(){if(this.withThemeSync)try{let e=this.contentDocument?.documentElement;if(!e)return;let t=[`wa-theme-`,`wa-brand-`,`wa-palette-`],n=new Set,r=new Set,i=this,a=!1;for(;i;){a||(i.classList.contains(`wa-dark`)?(n.add(`wa-dark`),a=!0):i.classList.contains(`wa-light`)&&(n.add(`wa-light`),a=!0));for(let e of i.classList)t.some(t=>e.startsWith(t))&&r.add(e);i=i.parentElement}e.classList.toggle(`wa-dark`,n.has(`wa-dark`)),e.classList.toggle(`wa-light`,n.has(`wa-light`));let o=Array.from(e.classList).filter(e=>t.some(t=>e.startsWith(t)));e.classList.remove(...o),e.classList.add(...r)}catch{}}handleLoad(){this.withThemeSync&&this.syncTheme(),this.dispatchEvent(new Event(`load`,{bubbles:!1,cancelable:!1,composed:!0}))}handleError(){this.dispatchEvent(new Event(`error`,{bubbles:!1,cancelable:!1,composed:!0}))}render(){return b`
      <div id="frame-container">
        <iframe
          id="iframe"
          part="iframe"
          ?inert=${this.withoutInteraction}
          ?allowfullscreen=${this.allowfullscreen}
          loading=${this.loading}
          referrerpolicy=${this.referrerpolicy}
          sandbox=${P(this.sandbox??void 0)}
          src=${P(this.src??void 0)}
          srcdoc=${P(this.srcdoc??void 0)}
          @load=${this.handleLoad}
          @error=${this.handleError}
        ></iframe>
      </div>

      ${this.withoutControls?``:b`
            <div id="controls" part="controls">
              <button
                part="zoom-out-button"
                aria-label=${this.localize.term(`zoomOut`)}
                @click=${this.zoomOut}
                ?disabled=${this.isZoomOutDisabled()}
              >
                <slot name="zoom-out-icon">
                  <wa-icon name="minus" label="Zoom out"></wa-icon>
                </slot>
              </button>
              <span>${this.localize.number(this.zoom,{style:`percent`,maximumFractionDigits:1})}</span>
              <button
                part="zoom-in-button"
                aria-label=${this.localize.term(`zoomIn`)}
                @click=${this.zoomIn}
                ?disabled=${this.isZoomInDisabled()}
              >
                <slot name="zoom-in-icon">
                  <wa-icon name="plus" label="Zoom in"></wa-icon>
                </slot>
              </button>
            </div>
          `}
    `}};Qd.css=Xd,D([j(`#iframe`)],Qd.prototype,`iframe`,2),D([k()],Qd.prototype,`src`,2),D([k()],Qd.prototype,`srcdoc`,2),D([k({type:Boolean})],Qd.prototype,`allowfullscreen`,2),D([k()],Qd.prototype,`loading`,2),D([k()],Qd.prototype,`referrerpolicy`,2),D([k()],Qd.prototype,`sandbox`,2),D([k({type:Number,reflect:!0})],Qd.prototype,`zoom`,2),D([k({attribute:`zoom-levels`})],Qd.prototype,`zoomLevels`,2),D([k({type:Boolean,attribute:`without-controls`,reflect:!0})],Qd.prototype,`withoutControls`,2),D([k({type:Boolean,attribute:`without-interaction`,reflect:!0})],Qd.prototype,`withoutInteraction`,2),D([k({type:Boolean,attribute:`with-theme-sync`,reflect:!0})],Qd.prototype,`withThemeSync`,2),Qd=D([O(`wa-zoomable-frame`)],Qd),new MutationObserver(e=>{for(let{addedNodes:t}of e)for(let e of t)e.nodeType===Node.ELEMENT_NODE&&$d(e)});async function $d(e){let t=e instanceof Element?e.tagName.toLowerCase():``,n=t?.startsWith(`wa-`),r=[...e.querySelectorAll(`:not(:defined)`)].map(e=>e.tagName.toLowerCase()).filter(e=>e.startsWith(`wa-`));n&&!customElements.get(t)&&r.push(t);let i=e.querySelectorAll(`[data-wa-preload]`),a=e instanceof Element&&e.hasAttribute(`data-wa-preload`)?[e,...i]:i;for(let e of a)r.push(...e.getAttribute(`data-wa-preload`).split(/\s+/).filter(e=>e.startsWith(`wa-`)));let o=[...new Set(r)],s=await Promise.allSettled(o.map(e=>ef(e)));for(let e of s)e.status===`rejected`&&console.warn(e.reason);await new Promise(requestAnimationFrame),e.dispatchEvent(new CustomEvent(`wa-discovery-complete`,{bubbles:!1,cancelable:!1,composed:!0}))}function ef(e){if(customElements.get(e))return Promise.resolve();let t=e.replace(/^wa-/i,``),n=Wr(`components/${t}/${t}.js`);return new Promise((t,r)=>{v(()=>import(n).then(()=>t()),[]).catch(()=>r(Error(`Unable to autoload <${e}> from ${n}`)))})}var tf=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20aria-hidden='true'%3e%3crect%20x='9.5'%20y='0.5'%20width='8'%20height='8'%20rx='1'%20fill='var(--wa-color-brand-fill-loud)'%20fill-opacity='0.28'%20stroke='var(--wa-color-brand-fill-loud)'%20stroke-opacity='0.9'%20stroke-width='1'%20stroke-linejoin='round'/%3e%3crect%20x='0.5'%20y='9.5'%20width='8'%20height='8'%20rx='1'%20fill='var(--wa-color-brand-fill-loud)'%20fill-opacity='0.28'%20stroke='var(--wa-color-brand-fill-loud)'%20stroke-opacity='0.9'%20stroke-width='1'%20stroke-linejoin='round'/%3e%3crect%20x='9.5'%20y='9.5'%20width='8'%20height='8'%20rx='1'%20fill='var(--wa-color-brand-fill-loud)'%20fill-opacity='0.28'%20stroke='var(--wa-color-brand-fill-loud)'%20stroke-opacity='0.9'%20stroke-width='1'%20stroke-linejoin='round'/%3e%3crect%20x='0.5'%20y='0.5'%20width='8'%20height='8'%20rx='1'%20fill='var(--wa-color-success-fill-loud)'%20fill-opacity='0.55'%20stroke='var(--wa-color-success-fill-loud)'%20stroke-opacity='1'%20stroke-width='1'/%3e%3c/svg%3e`,nf=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20aria-hidden='true'%3e%3cpath%20fill='none'%20stroke='currentColor'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'%20d='M14%202H6a2%202%200%200%200-2%202v16a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2V8z'/%3e%3cpolyline%20fill='none'%20stroke='currentColor'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'%20points='14%202%2014%208%2020%208'/%3e%3cline%20x1='12'%20y1='13'%20x2='12'%20y2='17'%20stroke='currentColor'%20stroke-width='1.5'%20stroke-linecap='round'/%3e%3cline%20x1='10'%20y1='15'%20x2='14'%20y2='15'%20stroke='currentColor'%20stroke-width='1.5'%20stroke-linecap='round'/%3e%3c/svg%3e`,rf=`data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='2'%20y='2'%20width='28'%20height='28'%20fill='%23FFCA28'/%3e%3cpath%20d='M19%2025.2879L21.0615%2023.9237C21.2231%2024.4313%2022.2462%2025.6368%2023.5385%2025.6368C24.8308%2025.6368%2025.4308%2024.931%2025.4308%2024.463C25.4308%2023.1878%2024.1112%2022.7382%2023.4774%2022.5223C23.374%2022.4871%2023.289%2022.4581%2023.2308%2022.4328C23.2009%2022.4198%2023.1558%2022.4025%2023.0979%2022.3804C22.393%2022.1111%2019.7923%2021.1175%2019.7923%2018.2373C19.7923%2015.065%2022.8538%2014.7002%2023.5462%2014.7002C23.9991%2014.7002%2026.1769%2014.7557%2027.2615%2016.7939L25.2615%2018.1898C24.8231%2017.3015%2024.0946%2017.0081%2023.6462%2017.0081C22.5385%2017.0081%2022.3077%2017.8201%2022.3077%2018.1898C22.3077%2019.227%2023.5112%2019.6919%2024.5273%2020.0844C24.7932%2020.1871%2025.0462%2020.2848%2025.2615%2020.3866C26.3692%2020.91%2028%2021.7666%2028%2024.463C28%2025.8136%2026.8672%2028.0002%2024.0154%2028.0002C20.1846%2028.0002%2019.1692%2025.7003%2019%2025.2879Z'%20fill='%233E3E3E'/%3e%3cpath%20d='M9%2025.5587L11.1487%2024.1953C11.317%2024.7026%2011.9713%2025.638%2012.9205%2025.638C13.8698%2025.638%2014.3557%2024.663%2014.3557%2024.1953V15.0002H16.9982V24.1953C17.041%2025.4636%2016.3376%2028.0002%2013.2332%2028.0002C10.379%2028.0002%209.19242%2026.3039%209%2025.5587Z'%20fill='%233E3E3E'/%3e%3c/svg%3e`,af=`data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='-22%200%20300%20300'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20preserveAspectRatio='xMidYMid'%3e%3cg%3e%3cpath%20d='M10.5838307,156.409656%20L10.5838307,156.196646%20L10.5838307,123.657627%20L17.7200527,123.657627%20L17.7200527,158.912657%20C18.0516208,161.753926%2017.8075656,164.63288%2017.0023629,167.377784%20C16.19722,170.122687%2014.8474392,172.677251%2013.0335946,174.88924%20C9.6624625,177.797086%205.34298451,179.369568%200.891381719,179.309391%20L0.145805038,173.983903%20C3.01718628,173.985518%205.78730255,172.922981%207.92105685,171.001585%20C9.83826599,168.76489%2010.5838307,165.729334%2010.5838307,156.409656%20Z%20M63.8037763,152.209035%20C63.8037763,156.203166%2063.8037763,159.771277%2064.1232613,162.860071%20L57.7859014,162.860071%20L57.3598815,156.522711%20C56.0343268,158.765028%2054.1386519,160.616318%2051.8656486,161.888456%20C49.5925854,163.160593%2047.0232464,163.808237%2044.4187946,163.765408%20C38.2412071,163.765408%2030.8919752,160.410366%2030.8919752,146.723715%20L30.8919752,123.983721%20L38.0281972,123.983721%20L38.0281972,145.285823%20C38.0281972,152.688352%2040.3181887,157.641058%2046.7620834,157.641058%20C48.0878176,157.655354%2049.4030239,157.404719%2050.6306575,156.903927%20C51.8582911,156.403136%2052.9735276,155.662296%2053.9110465,154.724777%20C54.8485056,153.787318%2055.5894046,152.672022%2056.0901963,151.444448%20C56.5909282,150.216815%2056.8415633,148.901549%2056.8273268,147.575814%20L56.8273268,123.717444%20L63.9634889,123.717444%20L63.9634889,151.996025%20L63.8037763,152.209035%20Z%20M77.330762,136.653806%20C77.330762,131.70104%2077.330762,127.653648%2077.0112304,123.979032%20L83.4018876,123.979032%20L83.7213726,130.635931%20C85.1452074,128.23088%2087.1949721,126.257257%2089.6521533,124.925482%20C92.1093944,123.593709%2094.8819333,122.953703%2097.6742718,123.073695%20C107.153723,123.073695%20114.289945,131.008713%20114.289945,142.831393%20C114.289945,156.784292%20105.715831,163.707504%2096.4493898,163.707504%20C94.0776877,163.813321%2091.7187865,163.305232%2089.6009496,162.232346%20C87.4831127,161.159401%2085.6780613,159.558028%2084.3604623,157.583154%20L84.3604623,178.885226%20L77.330762,178.885226%20L77.330762,136.813578%20L77.330762,136.653806%20Z%20M84.3604623,147.038594%20C84.3797833,148.004885%2084.4867369,148.967408%2084.6800071,149.914378%20C85.2842232,152.279021%2086.6597255,154.374666%2088.5887785,155.869683%20C90.5178913,157.364761%2092.8904309,158.173852%2095.3310427,158.168947%20C102.840047,158.168947%20107.260258,152.044597%20107.260258,143.150938%20C107.260258,135.375686%20103.106354,128.718758%2095.59735,128.718758%20C92.6257387,128.962101%2089.844945,130.280974%2087.7762781,132.428062%20C85.7076111,134.575149%2084.4931374,137.403079%2084.3604623,140.381689%20L84.3604623,147.038594%20Z%20M127.004503,123.94359%20L135.578617,146.896647%20C136.483954,149.452886%20137.442529,152.54168%20138.081618,154.831671%20C138.827183,152.488442%20139.625985,149.506124%20140.58462,146.736875%20L148.359872,123.94359%20L155.868876,123.94359%20L145.21784,151.636343%20C139.892293,164.950152%20136.643726,171.820127%20131.744199,175.97403%20C129.27643,178.228071%20126.267791,179.805756%20123.010354,180.553953%20L121.252929,174.589376%20C123.530581,173.840999%20125.645092,172.666304%20127.48382,171.127799%20C130.081872,169.010501%20132.14366,166.310102%20133.501635,163.246013%20C133.792288,162.715372%20133.990404,162.139031%20134.087428,161.541814%20C134.026892,160.899135%20133.865146,160.270094%20133.60817,159.677902%20L119.122716,123.837079%20L126.897968,123.837079%20L127.004503,123.94359%20Z%20M174.813541,112.770851%20L174.813541,123.954441%20L185.038557,123.954441%20L185.038557,129.279989%20L174.813541,129.279989%20L174.813541,150.262575%20C174.813541,155.055568%20176.198196,157.824817%20180.139089,157.824817%20C181.538758,157.847727%20182.935316,157.686579%20184.292992,157.345559%20L184.612537,162.671047%20C182.57671,163.376355%20180.428486,163.701283%20178.275118,163.629682%20C176.849069,163.718929%20175.420569,163.498622%20174.087657,162.983833%20C172.754744,162.469044%20171.549004,161.671976%20170.553103,160.647363%20C168.383883,157.745977%20167.394359,154.130491%20167.783854,150.528882%20L167.783854,129.226751%20L161.712742,129.226751%20L161.712742,123.901204%20L167.890329,123.901204%20L167.890329,114.421764%20L174.813541,112.770851%20Z%20M198.184399,144.647511%20C198.03988,146.453639%20198.289199,148.269577%20198.915189,149.969888%20C199.541179,151.670199%20200.528884,153.214267%20201.810114,154.495437%20C203.091285,155.776667%20204.635352,156.764373%20206.335664,157.390363%20C208.035975,158.016352%20209.851913,158.265672%20211.658041,158.121153%20C215.311153,158.202863%20218.940457,157.513288%20222.309077,156.097409%20L223.533958,161.422956%20C219.400274,163.12572%20214.955358,163.942168%20210.486396,163.819423%20C207.881107,163.997798%20205.268101,163.61054%20202.826592,162.684147%20C200.385023,161.757814%20198.172795,160.3143%20196.341489,158.452721%20C194.51022,156.591082%20193.103284,154.355345%20192.217196,151.898941%20C191.331104,149.442478%20190.986827,146.82349%20191.207978,144.221491%20C191.207978,132.505346%20198.184399,123.238905%20209.581059,123.238905%20C222.362314,123.238905%20225.557643,134.422495%20225.557643,141.558717%20C225.625954,142.658281%20225.625954,143.761016%20225.557643,144.860581%20L198.024687,144.860581%20L198.184399,144.647511%20Z%20M219.06051,139.322023%20C219.266043,137.898188%20219.163995,136.446897%20218.761184,135.065892%20C218.358433,133.684886%20217.664311,132.406228%20216.725656,131.316115%20C215.786941,130.226062%20214.625525,129.349856%20213.31959,128.746561%20C212.013656,128.143278%20210.59353,127.826939%20209.155039,127.818864%20C206.228949,128.030665%20203.487515,129.327603%20201.467959,131.455549%20C199.448402,133.583436%20198.296377,136.388874%20198.237697,139.322023%20L219.06051,139.322023%20Z%20M236.385366,136.053478%20C236.385366,131.473555%20236.385366,127.532637%20236.065834,123.911277%20L242.456492,123.911277%20L242.456492,131.526792%20L242.775977,131.526792%20C243.446769,129.176325%20244.83268,127.093027%20246.741335,125.566097%20C248.64999,124.039161%20250.986699,123.144369%20253.427072,123.005938%20C254.098762,122.917777%20254.779066,122.917777%20255.450756,123.005938%20L255.450756,129.66288%20C254.63688,129.568608%20253.814868,129.568608%20253.000992,129.66288%20C250.58353,129.756495%20248.282771,130.726973%20246.528505,132.393068%20C244.774238,134.059104%20243.686458,136.306745%20243.468304,138.716252%20C243.269171,139.805946%20243.162278,140.910475%20243.148819,142.018055%20L243.148819,162.734394%20L236.11909,162.734394%20L236.11909,136.106715%20L236.385366,136.053478%20Z'%20fill='%234E4E4E'%3e%3c/path%3e%3cpath%20d='M233.257943,16.9621357%20C233.476636,20.5398773%20232.625434,24.1017075%20230.812666,27.1939108%20C228.999898,30.286174%20226.307754,32.7687777%20223.079047,34.3255867%20C219.85034,35.8823358%20216.231324,36.4427655%20212.683013,35.9355136%20C209.134702,35.4282017%20205.817704,33.8761781%20203.154559,31.4770796%20C200.491421,29.0780409%20198.602703,25.9404959%20197.729013,22.4642047%20C196.855323,18.9879135%20197.036209,15.330196%20198.248625,11.9570899%20C199.461041,8.5839838%20201.650109,5.64808944%20204.536953,3.52346926%20C207.423803,1.39884909%20210.877782,0.181657262%20214.458814,0.0269503701%20C216.806708,-0.10224713%20219.156996,0.233972409%20221.374429,1.01627461%20C223.591922,1.79857323%20225.632893,3.01152758%20227.379981,4.58537259%20C229.12701,6.15922358%20230.54576,8.06291398%20231.554522,10.1869719%20C232.563283,12.3110298%20233.142196,14.6135829%20233.257943,16.9621357%20Z'%20fill='%23767677'%3e%3c/path%3e%3cpath%20d='M127.952969,225.540984%20C80.0236372,225.540984%2037.8984531,208.339518%2016.1170646,182.936721%20C24.5683135,205.78944%2039.8176362,225.504615%2059.8124569,239.428562%20C79.8070981,253.352629%20103.588124,260.816651%20127.952969,260.816651%20C152.318411,260.816651%20176.098839,253.352629%20196.094019,239.428562%20C216.0886,225.504615%20231.337863,205.78944%20239.789471,182.936721%20C218.061379,208.339518%20176.095848,225.540984%20127.952969,225.540984%20Z'%20fill='%23F37726'%3e%3c/path%3e%3cpath%20d='M127.952969,60.3543133%20C175.882898,60.3543133%20218.008142,77.5557785%20239.789471,102.958396%20C231.337863,80.1058563%20216.0886,60.3906823%20196.094019,46.4667348%20C176.098839,32.5427873%20152.318411,25.0784666%20127.952969,25.0784666%20C103.588124,25.0784666%2079.8070981,32.5427873%2059.8124569,46.4667348%20C39.8176362,60.3906823%2024.5683135,80.1058563%2016.1170646,102.958396%20C37.8984531,77.502541%2079.8106871,60.3543133%20127.952969,60.3543133%20Z'%20fill='%23F37726'%3e%3c/path%3e%3cpath%20d='M61.9716874,274.975202%20C62.2528294,279.48161%2061.186045,283.969713%2058.9072992,287.867658%20C56.6284936,291.765602%2053.2409116,294.896926%2049.1761363,296.862707%20C45.1113611,298.828488%2040.5533909,299.539717%2036.0829934,298.905772%20C31.6125362,298.271767%2027.4320141,296.321359%2024.0740419,293.30297%20C20.7160636,290.284582%2018.3326671,286.334835%2017.2274978,281.957035%20C16.1223339,277.579176%2016.3454363,272.971497%2017.868382,268.720869%20C19.3913284,264.470301%2022.1451683,260.769335%2025.7790187,258.089483%20C29.4129289,255.40962%2033.7623156,253.872201%2038.2730898,253.673106%20C41.2280121,253.515051%2044.1851476,253.940738%2046.9755719,254.925846%20C49.7659364,255.910962%2052.3349165,257.436187%2054.5356604,259.414404%20C56.7364042,261.392633%2058.5259031,263.785032%2059.8017495,266.455044%20C61.0776558,269.124996%2061.8150255,272.02022%2061.9716874,274.975202%20Z'%20fill='%239E9E9E'%3e%3c/path%3e%3cpath%20d='M21.5641016,54.5650606%20C18.9814831,54.6363631%2016.4354131,53.9424806%2014.2460944,52.570687%20C12.0567996,51.1988336%2010.3219858,49.2102622%209.25983722,46.8551295%20C8.19768984,44.499937%207.85562972,41.8832824%208.276674,39.3342215%20C8.69771827,36.7851606%209.86306631,34.4174662%2011.6261678,32.5289814%20C13.3892752,30.6404727%2015.6714246,29.3154324%2018.1856119,28.7204982%20C20.6997394,28.1255646%2023.3336813,28.2873008%2025.7562282,29.1853653%20C28.1787154,30.0834346%2030.2815979,31.6777312%2031.800363,33.767765%20C33.3191879,35.8578106%2034.1861222,38.3502842%2034.2921188,40.9317063%20C34.3930308,44.4222341%2033.113057,47.8117302%2030.7300493,50.3642007%20C28.3470417,52.916731%2025.0533134,54.4262842%2021.5641016,54.5650606%20Z'%20fill='%23616262'%3e%3c/path%3e%3c/g%3e%3c/svg%3e`,of=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20aria-hidden='true'%3e%3crect%20x='4'%20y='3'%20width='12'%20height='8'%20rx='1.25'%20ry='1.25'%20fill='none'%20stroke='currentColor'%20stroke-width='1.25'%20stroke-linejoin='round'/%3e%3cline%20x1='2'%20y1='20'%20x2='18'%20y2='20'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='20'%20y1='2'%20x2='20'%20y2='22'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3c/svg%3e`,sf=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20aria-hidden='true'%3e%3crect%20x='10'%20y='4'%20width='12'%20height='16'%20rx='1.25'%20ry='1.25'%20fill='none'%20stroke='currentColor'%20stroke-width='1.25'%20stroke-linejoin='round'/%3e%3cline%20x1='2.5'%20y1='2'%20x2='2.5'%20y2='9'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='2.5'%20y1='15'%20x2='2.5'%20y2='22'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3c/svg%3e`,cf=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20aria-hidden='true'%3e%3crect%20x='8'%20y='4'%20width='8'%20height='8'%20rx='1.25'%20ry='1.25'%20fill='none'%20stroke='currentColor'%20stroke-width='1.25'%20stroke-linejoin='round'/%3e%3cline%20x1='2.5'%20y1='2'%20x2='2.5'%20y2='22'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='21.5'%20y1='2'%20x2='21.5'%20y2='22'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='6'%20y1='20'%20x2='18'%20y2='20'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3c/svg%3e`,lf=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20aria-hidden='true'%3e%3crect%20x='8'%20y='4'%20width='8'%20height='16'%20rx='1.25'%20ry='1.25'%20fill='none'%20stroke='currentColor'%20stroke-width='1.25'%20stroke-linejoin='round'/%3e%3cline%20x1='2.5'%20y1='2'%20x2='2.5'%20y2='22'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='21.5'%20y1='2'%20x2='21.5'%20y2='22'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3c/svg%3e`,uf=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20width='16'%20height='16'%3e%3cpath%20fill-rule='evenodd'%20d='M8%200C3.58%200%200%203.58%200%208c0%203.54%202.29%206.53%205.47%207.59.4.07.55-.17.55-.38%200-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01%201.08.58%201.23.82.72%201.21%201.87.87%202.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95%200-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12%200%200%20.67-.21%202.2.82.64-.18%201.32-.27%202-.27.68%200%201.36.09%202%20.27%201.53-1.04%202.2-.82%202.2-.82.44%201.1.16%201.92.08%202.12.51.56.82%201.27.82%202.15%200%203.07-1.87%203.75-3.65%203.95.29.25.54.73.54%201.48%200%201.07-.01%201.93-.01%202.2%200%20.21.15.46.55.38A8.013%208.013%200%200016%208c0-4.42-3.58-8-8-8z'/%3e%3c/svg%3e`,df=`data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M13.0164%202C10.8193%202%209.03825%203.72453%209.03825%205.85185V8.51852H15.9235V9.25926H5.97814C3.78107%209.25926%202%2010.9838%202%2013.1111L2%2018.8889C2%2021.0162%203.78107%2022.7407%205.97814%2022.7407H8.27322V19.4815C8.27322%2017.3542%2010.0543%2015.6296%2012.2514%2015.6296H19.5956C21.4547%2015.6296%2022.9617%2014.1704%2022.9617%2012.3704V5.85185C22.9617%203.72453%2021.1807%202%2018.9836%202H13.0164ZM12.0984%206.74074C12.8589%206.74074%2013.4754%206.14378%2013.4754%205.40741C13.4754%204.67103%2012.8589%204.07407%2012.0984%204.07407C11.3378%204.07407%2010.7213%204.67103%2010.7213%205.40741C10.7213%206.14378%2011.3378%206.74074%2012.0984%206.74074Z'%20fill='url(%23paint0_linear_87_8204)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M18.9834%2030C21.1805%2030%2022.9616%2028.2755%2022.9616%2026.1482V23.4815L16.0763%2023.4815L16.0763%2022.7408L26.0217%2022.7408C28.2188%2022.7408%2029.9998%2021.0162%2029.9998%2018.8889V13.1111C29.9998%2010.9838%2028.2188%209.25928%2026.0217%209.25928L23.7266%209.25928V12.5185C23.7266%2014.6459%2021.9455%2016.3704%2019.7485%2016.3704L12.4042%2016.3704C10.5451%2016.3704%209.03809%2017.8296%209.03809%2019.6296L9.03809%2026.1482C9.03809%2028.2755%2010.8192%2030%2013.0162%2030H18.9834ZM19.9015%2025.2593C19.1409%2025.2593%2018.5244%2025.8562%2018.5244%2026.5926C18.5244%2027.329%2019.1409%2027.9259%2019.9015%2027.9259C20.662%2027.9259%2021.2785%2027.329%2021.2785%2026.5926C21.2785%2025.8562%2020.662%2025.2593%2019.9015%2025.2593Z'%20fill='url(%23paint1_linear_87_8204)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_87_8204'%20x1='12.4809'%20y1='2'%20x2='12.4809'%20y2='22.7407'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23327EBD'/%3e%3cstop%20offset='1'%20stop-color='%231565A7'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_87_8204'%20x1='19.519'%20y1='9.25928'%20x2='19.519'%20y2='30'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FFDA4B'/%3e%3cstop%20offset='1'%20stop-color='%23F9C600'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e`,ff=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20aria-hidden='true'%3e%3cline%20x1='1.5'%20y1='5.5'%20x2='22.5'%20y2='5.5'%20stroke='var(--wa-color-brand-fill-loud)'%20stroke-opacity='0.45'%20stroke-width='2.5'%20stroke-linecap='round'/%3e%3cline%20x1='1.5'%20y1='12'%20x2='22.5'%20y2='12'%20stroke='var(--wa-color-brand-fill-loud)'%20stroke-opacity='0.45'%20stroke-width='2.5'%20stroke-linecap='round'/%3e%3cline%20x1='1.5'%20y1='18.5'%20x2='22.5'%20y2='18.5'%20stroke='var(--wa-color-brand-fill-loud)'%20stroke-opacity='0.45'%20stroke-width='2.5'%20stroke-linecap='round'/%3e%3ccircle%20cx='16.75'%20cy='5.5'%20r='3.5'%20fill='var(--wa-color-success-fill-loud)'%20fill-opacity='0.85'%20stroke='var(--wa-color-success-fill-loud)'%20stroke-opacity='1'%20stroke-width='1'/%3e%3ccircle%20cx='7.25'%20cy='12'%20r='3.5'%20fill='var(--wa-color-success-fill-loud)'%20fill-opacity='0.85'%20stroke='var(--wa-color-success-fill-loud)'%20stroke-opacity='1'%20stroke-width='1'/%3e%3ccircle%20cx='14.25'%20cy='18.5'%20r='3.5'%20fill='var(--wa-color-success-fill-loud)'%20fill-opacity='0.85'%20stroke='var(--wa-color-success-fill-loud)'%20stroke-opacity='1'%20stroke-width='1'/%3e%3c/svg%3e`;ii(`docks`,{resolver:e=>new URL(Object.assign({"../icons/extensions.svg":tf,"../icons/file-plus.svg":nf,"../icons/js.svg":rf,"../icons/jupyter.svg":af,"../icons/layout-standard-bottom-panel.svg":of,"../icons/layout-standard-bottom-sidebar.svg":sf,"../icons/layout-standard-full.svg":cf,"../icons/layout-standard.svg":lf,"../icons/mark-github.svg":uf,"../icons/python.svg":df,"../icons/settings.svg":ff})[`../icons/${e}.svg`],import.meta.url).href,mutator:e=>{e.setAttribute(`fill`,`currentColor`),e.setAttribute(`stroke`,`currentColor`)}});function pf(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var mf=pf();function hf(e){mf=e}var gf={exec:()=>null};function X(e,t=``){let n=typeof e==`string`?e:e.source,r={replace:(e,t)=>{let i=typeof t==`string`?t:t.source;return i=i.replace(vf.caret,`$1`),n=n.replace(e,i),r},getRegex:()=>new RegExp(n,t)};return r}var _f=(()=>{try{return!0}catch{return!1}})(),vf={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,`i`),blockquoteBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}>`)},yf=/^(?:[ \t]*(?:\n|$))+/,bf=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,xf=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Sf=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Cf=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,wf=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,Tf=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ef=X(Tf).replace(/bull/g,wf).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,``).getRegex(),Df=X(Tf).replace(/bull/g,wf).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Of=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,kf=/^[^\n]+/,Af=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,jf=X(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace(`label`,Af).replace(`title`,/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Mf=X(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,wf).getRegex(),Nf=`address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul`,Pf=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ff=X(`^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))`,`i`).replace(`comment`,Pf).replace(`tag`,Nf).replace(`attribute`,/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),If=X(Of).replace(`hr`,Sf).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]`).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,Nf).getRegex(),Lf={blockquote:X(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace(`paragraph`,If).getRegex(),code:bf,def:jf,fences:xf,heading:Cf,hr:Sf,html:Ff,lheading:Ef,list:Mf,newline:yf,paragraph:If,table:gf,text:kf},Rf=X(`^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)`).replace(`hr`,Sf).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`blockquote`,` {0,3}>`).replace(`code`,`(?: {4}| {0,3}	)[^\\n]`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]`).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,Nf).getRegex(),zf={...Lf,lheading:Df,table:Rf,paragraph:X(Of).replace(`hr`,Sf).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`table`,Rf).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]`).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,Nf).getRegex()},Bf={...Lf,html:X(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace(`comment`,Pf).replace(/tag/g,`(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b`).getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:gf,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:X(Of).replace(`hr`,Sf).replace(`heading`,` *#{1,6} *[^
]`).replace(`lheading`,Ef).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`|fences`,``).replace(`|list`,``).replace(`|html`,``).replace(`|tag`,``).getRegex()},Vf=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Hf=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Uf=/^( {2,}|\\)\n(?!\s*$)/,Wf=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Gf=/[\p{P}\p{S}]/u,Kf=/[\s\p{P}\p{S}]/u,qf=/[^\s\p{P}\p{S}]/u,Jf=X(/^((?![*_])punctSpace)/,`u`).replace(/punctSpace/g,Kf).getRegex(),Yf=/(?!~)[\p{P}\p{S}]/u,Xf=/(?!~)[\s\p{P}\p{S}]/u,Zf=/(?:[^\s\p{P}\p{S}]|~)/u,Qf=X(/link|precode-code|html/,`g`).replace(`link`,/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace(`precode-`,_f?"(?<!`)()":"(^^|[^`])").replace(`code`,/(?<b>`+)[^`]+\k<b>(?!`)/).replace(`html`,/<(?! )[^<>]*?>/).getRegex(),$f=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,ep=X($f,`u`).replace(/punct/g,Gf).getRegex(),tp=X($f,`u`).replace(/punct/g,Yf).getRegex(),np=`^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)`,rp=X(np,`gu`).replace(/notPunctSpace/g,qf).replace(/punctSpace/g,Kf).replace(/punct/g,Gf).getRegex(),ip=X(np,`gu`).replace(/notPunctSpace/g,Zf).replace(/punctSpace/g,Xf).replace(/punct/g,Yf).getRegex(),ap=X(`^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)`,`gu`).replace(/notPunctSpace/g,qf).replace(/punctSpace/g,Kf).replace(/punct/g,Gf).getRegex(),op=X(/^~~?(?:((?!~)punct)|[^\s~])/,`u`).replace(/punct/g,Gf).getRegex(),sp=X(`^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,qf).replace(/punctSpace/g,Kf).replace(/punct/g,Gf).getRegex(),cp=X(/\\(punct)/,`gu`).replace(/punct/g,Gf).getRegex(),lp=X(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace(`scheme`,/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace(`email`,/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),up=X(Pf).replace(`(?:-->|$)`,`-->`).getRegex(),dp=X(`^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>`).replace(`comment`,up).replace(`attribute`,/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),fp=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,pp=X(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace(`label`,fp).replace(`href`,/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace(`title`,/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),mp=X(/^!?\[(label)\]\[(ref)\]/).replace(`label`,fp).replace(`ref`,Af).getRegex(),hp=X(/^!?\[(ref)\](?:\[\])?/).replace(`ref`,Af).getRegex(),gp=X(`reflink|nolink(?!\\()`,`g`).replace(`reflink`,mp).replace(`nolink`,hp).getRegex(),_p=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,vp={_backpedal:gf,anyPunctuation:cp,autolink:lp,blockSkip:Qf,br:Uf,code:Hf,del:gf,delLDelim:gf,delRDelim:gf,emStrongLDelim:ep,emStrongRDelimAst:rp,emStrongRDelimUnd:ap,escape:Vf,link:pp,nolink:hp,punctuation:Jf,reflink:mp,reflinkSearch:gp,tag:dp,text:Wf,url:gf},yp={...vp,link:X(/^!?\[(label)\]\((.*?)\)/).replace(`label`,fp).getRegex(),reflink:X(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace(`label`,fp).getRegex()},bp={...vp,emStrongRDelimAst:ip,emStrongLDelim:tp,delLDelim:op,delRDelim:sp,url:X(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace(`protocol`,_p).replace(`email`,/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:X(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace(`protocol`,_p).getRegex()},xp={...bp,br:X(Uf).replace(`{2,}`,`*`).getRegex(),text:X(bp.text).replace(`\\b_`,`\\b_| {2,}\\n`).replace(/\{2,\}/g,`*`).getRegex()},Sp={normal:Lf,gfm:zf,pedantic:Bf},Cp={normal:vp,gfm:bp,breaks:xp,pedantic:yp},wp={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},Tp=e=>wp[e];function Ep(e,t){if(t){if(vf.escapeTest.test(e))return e.replace(vf.escapeReplace,Tp)}else if(vf.escapeTestNoEncode.test(e))return e.replace(vf.escapeReplaceNoEncode,Tp);return e}function Dp(e){try{e=encodeURI(e).replace(vf.percentDecode,`%`)}catch{return null}return e}function Op(e,t){let n=e.replace(vf.findPipe,(e,t,n)=>{let r=!1,i=t;for(;--i>=0&&n[i]===`\\`;)r=!r;return r?`|`:` |`}).split(vf.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push(``);for(;r<n.length;r++)n[r]=n[r].trim().replace(vf.slashPipe,`|`);return n}function kp(e,t,n){let r=e.length;if(r===0)return``;let i=0;for(;i<r;){let a=e.charAt(r-i-1);if(a===t&&!n)i++;else if(a!==t&&n)i++;else break}return e.slice(0,r-i)}function Ap(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]===`\\`)r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function jp(e,t=0){let n=t,r=``;for(let t of e)if(t===`	`){let e=4-n%4;r+=` `.repeat(e),n+=e}else r+=t,n++;return r}function Mp(e,t,n,r,i){let a=t.href,o=t.title||null,s=e[1].replace(i.other.outputLinkReplace,`$1`);r.state.inLink=!0;let c={type:e[0].charAt(0)===`!`?`image`:`link`,raw:n,href:a,title:o,text:s,tokens:r.inlineTokens(s)};return r.state.inLink=!1,c}function Np(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let i=r[1];return t.split(`
`).map(e=>{let t=e.match(n.other.beginningSpace);if(t===null)return e;let[r]=t;return r.length>=i.length?e.slice(i.length):e}).join(`
`)}var Pp=class{options;rules;lexer;constructor(e){this.options=e||mf}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:`space`,raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=t[0].replace(this.rules.other.codeRemoveIndent,``);return{type:`code`,raw:t[0],codeBlockStyle:`indented`,text:this.options.pedantic?e:kp(e,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],n=Np(e,t[3]||``,this.rules);return{type:`code`,raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,`$1`):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=kp(e,`#`);(this.options.pedantic||!t||this.rules.other.endingSpaceChar.test(t))&&(e=t.trim())}return{type:`heading`,raw:t[0],depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:`hr`,raw:kp(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=kp(t[0],`
`).split(`
`),n=``,r=``,i=[];for(;e.length>0;){let t=!1,a=[],o;for(o=0;o<e.length;o++)if(this.rules.other.blockquoteStart.test(e[o]))a.push(e[o]),t=!0;else if(!t)a.push(e[o]);else break;e=e.slice(o);let s=a.join(`
`),c=s.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,``);n=n?`${n}
${s}`:s,r=r?`${r}
${c}`:c;let l=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(c,i,!0),this.lexer.state.top=l,e.length===0)break;let u=i.at(-1);if(u?.type===`code`)break;if(u?.type===`blockquote`){let t=u,a=t.raw+`
`+e.join(`
`),o=this.blockquote(a);i[i.length-1]=o,n=n.substring(0,n.length-t.raw.length)+o.raw,r=r.substring(0,r.length-t.text.length)+o.text;break}else if(u?.type===`list`){let t=u,a=t.raw+`
`+e.join(`
`),o=this.list(a);i[i.length-1]=o,n=n.substring(0,n.length-u.raw.length)+o.raw,r=r.substring(0,r.length-t.raw.length)+o.raw,e=a.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:`blockquote`,raw:n,tokens:i,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,i={type:`list`,raw:``,ordered:r,start:r?+n.slice(0,-1):``,loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:`[*+-]`);let a=this.rules.other.listItemRegex(n),o=!1;for(;e;){let n=!1,r=``,s=``;if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;r=t[0],e=e.substring(r.length);let c=jp(t[2].split(`
`,1)[0],t[1].length),l=e.split(`
`,1)[0],u=!c.trim(),d=0;if(this.options.pedantic?(d=2,s=c.trimStart()):u?d=t[1].length+1:(d=c.search(this.rules.other.nonSpaceChar),d=d>4?1:d,s=c.slice(d),d+=t[1].length),u&&this.rules.other.blankLine.test(l)&&(r+=l+`
`,e=e.substring(l.length+1),n=!0),!n){let t=this.rules.other.nextBulletRegex(d),n=this.rules.other.hrRegex(d),i=this.rules.other.fencesBeginRegex(d),a=this.rules.other.headingBeginRegex(d),o=this.rules.other.htmlBeginRegex(d),f=this.rules.other.blockquoteBeginRegex(d);for(;e;){let p=e.split(`
`,1)[0],m;if(l=p,this.options.pedantic?(l=l.replace(this.rules.other.listReplaceNesting,`  `),m=l):m=l.replace(this.rules.other.tabCharGlobal,`    `),i.test(l)||a.test(l)||o.test(l)||f.test(l)||t.test(l)||n.test(l))break;if(m.search(this.rules.other.nonSpaceChar)>=d||!l.trim())s+=`
`+m.slice(d);else{if(u||c.replace(this.rules.other.tabCharGlobal,`    `).search(this.rules.other.nonSpaceChar)>=4||i.test(c)||a.test(c)||n.test(c))break;s+=`
`+l}u=!l.trim(),r+=p+`
`,e=e.substring(p.length+1),c=m.slice(d)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(r)&&(o=!0)),i.items.push({type:`list_item`,raw:r,task:!!this.options.gfm&&this.rules.other.listIsTask.test(s),loose:!1,text:s,tokens:[]}),i.raw+=r}let s=i.items.at(-1);if(s)s.raw=s.raw.trimEnd(),s.text=s.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let e of i.items){if(this.lexer.state.top=!1,e.tokens=this.lexer.blockTokens(e.text,[]),e.task){if(e.text=e.text.replace(this.rules.other.listReplaceTask,``),e.tokens[0]?.type===`text`||e.tokens[0]?.type===`paragraph`){e.tokens[0].raw=e.tokens[0].raw.replace(this.rules.other.listReplaceTask,``),e.tokens[0].text=e.tokens[0].text.replace(this.rules.other.listReplaceTask,``);for(let e=this.lexer.inlineQueue.length-1;e>=0;e--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)){this.lexer.inlineQueue[e].src=this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask,``);break}}let t=this.rules.other.listTaskCheckbox.exec(e.raw);if(t){let n={type:`checkbox`,raw:t[0]+` `,checked:t[0]!==`[ ]`};e.checked=n.checked,i.loose?e.tokens[0]&&[`paragraph`,`text`].includes(e.tokens[0].type)&&`tokens`in e.tokens[0]&&e.tokens[0].tokens?(e.tokens[0].raw=n.raw+e.tokens[0].raw,e.tokens[0].text=n.raw+e.tokens[0].text,e.tokens[0].tokens.unshift(n)):e.tokens.unshift({type:`paragraph`,raw:n.raw,text:n.raw,tokens:[n]}):e.tokens.unshift(n)}}if(!i.loose){let t=e.tokens.filter(e=>e.type===`space`);i.loose=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw))}}if(i.loose)for(let e of i.items){e.loose=!0;for(let t of e.tokens)t.type===`text`&&(t.type=`paragraph`)}return i}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:`html`,block:!0,raw:t[0],pre:t[1]===`pre`||t[1]===`script`||t[1]===`style`,text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal,` `),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,`$1`).replace(this.rules.inline.anyPunctuation,`$1`):``,r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,`$1`):t[3];return{type:`def`,tag:e,raw:t[0],href:n,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Op(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,``).split(`|`),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,``).split(`
`):[],a={type:`table`,raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let e of r)this.rules.other.tableAlignRight.test(e)?a.align.push(`right`):this.rules.other.tableAlignCenter.test(e)?a.align.push(`center`):this.rules.other.tableAlignLeft.test(e)?a.align.push(`left`):a.align.push(null);for(let e=0;e<n.length;e++)a.header.push({text:n[e],tokens:this.lexer.inline(n[e]),header:!0,align:a.align[e]});for(let e of i)a.rows.push(Op(e,a.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:a.align[t]})));return a}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let e=t[1].trim();return{type:`heading`,raw:t[0],depth:t[2].charAt(0)===`=`?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:`paragraph`,raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:`text`,raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:`escape`,raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:`html`,raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let t=kp(e.slice(0,-1),`\\`);if((e.length-t.length)%2==0)return}else{let e=Ap(t[2],`()`);if(e===-2)return;if(e>-1){let n=(t[0].indexOf(`!`)===0?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,n).trim(),t[3]=``}}let n=t[2],r=``;if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(n);e&&(n=e[1],r=e[3])}else r=t[3]?t[3].slice(1,-1):``;return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(n=this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?n.slice(1):n.slice(1,-1)),Mp(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,`$1`),title:r&&r.replace(this.rules.inline.anyPunctuation,`$1`)},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let e=t[(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal,` `).toLowerCase()];if(!e){let e=n[0].charAt(0);return{type:`text`,raw:e,text:e}}return Mp(n,e,n[0],this.lexer,this.rules)}}emStrong(e,t,n=``){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||!r[1]&&!r[2]&&!r[3]&&!r[4]||r[4]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[3])||!n||this.rules.inline.punctuation.exec(n))){let n=[...r[0]].length-1,i,a,o=n,s=0,c=r[0][0]===`*`?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+n);(r=c.exec(t))!==null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(a=[...i].length,r[3]||r[4]){o+=a;continue}else if((r[5]||r[6])&&n%3&&!((n+a)%3)){s+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o+s);let t=[...r[0]][0].length,c=e.slice(0,n+r.index+t+a);if(Math.min(n,a)%2){let e=c.slice(1,-1);return{type:`em`,raw:c,text:e,tokens:this.lexer.inlineTokens(e)}}let l=c.slice(2,-2);return{type:`strong`,raw:c,text:l,tokens:this.lexer.inlineTokens(l)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal,` `),n=this.rules.other.nonSpaceChar.test(e),r=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return n&&r&&(e=e.substring(1,e.length-1)),{type:`codespan`,raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:`br`,raw:t[0]}}del(e,t,n=``){let r=this.rules.inline.delLDelim.exec(e);if(r&&(!r[1]||!n||this.rules.inline.punctuation.exec(n))){let n=[...r[0]].length-1,i,a,o=n,s=this.rules.inline.delRDelim;for(s.lastIndex=0,t=t.slice(-1*e.length+n);(r=s.exec(t))!==null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i||(a=[...i].length,a!==n))continue;if(r[3]||r[4]){o+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o);let t=[...r[0]][0].length,s=e.slice(0,n+r.index+t+a),c=s.slice(n,-n);return{type:`del`,raw:s,text:c,tokens:this.lexer.inlineTokens(c)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,n;return t[2]===`@`?(e=t[1],n=`mailto:`+e):(e=t[1],n=e),{type:`link`,raw:t[0],text:e,href:n,tokens:[{type:`text`,raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,n;if(t[2]===`@`)e=t[0],n=`mailto:`+e;else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??``;while(r!==t[0]);e=t[0],n=t[1]===`www.`?`http://`+t[0]:t[0]}return{type:`link`,raw:t[0],text:e,href:n,tokens:[{type:`text`,raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:`text`,raw:t[0],text:t[0],escaped:e}}}},Fp=class e{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||mf,this.options.tokenizer=this.options.tokenizer||new Pp,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:vf,block:Sp.normal,inline:Cp.normal};this.options.pedantic?(t.block=Sp.pedantic,t.inline=Cp.pedantic):this.options.gfm&&(t.block=Sp.gfm,this.options.breaks?t.inline=Cp.breaks:t.inline=Cp.gfm),this.tokenizer.rules=t}static get rules(){return{block:Sp,inline:Cp}}static lex(t,n){return new e(n).lex(t)}static lexInline(t,n){return new e(n).inlineTokens(t)}lex(e){e=e.replace(vf.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){for(this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(vf.tabCharGlobal,`    `).replace(vf.spaceLine,``));e;){let r;if(this.options.extensions?.block?.some(n=>(r=n.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let n=t.at(-1);r.raw.length===1&&n!==void 0?n.raw+=`
`:t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+r.raw,n.text+=`
`+r.text,this.inlineQueue.at(-1).src=n.text):t.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+r.raw,n.text+=`
`+r.raw,this.inlineQueue.at(-1).src=n.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},t.push(r));continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),t.push(r);continue}let i=e;if(this.options.extensions?.startBlock){let t=1/0,n=e.slice(1),r;this.options.extensions.startBlock.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(i=e.substring(0,t+1))}if(this.state.top&&(r=this.tokenizer.paragraph(i))){let a=t.at(-1);n&&a?.type===`paragraph`?(a.raw+=(a.raw.endsWith(`
`)?``:`
`)+r.raw,a.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):t.push(r),n=i.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let n=t.at(-1);n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+r.raw,n.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):t.push(r);continue}if(e){let t=`Infinite loop on byte: `+e.charCodeAt(0);if(this.options.silent){console.error(t);break}else throw Error(t)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let n=e,r=null;if(this.tokens.links){let e=Object.keys(this.tokens.links);if(e.length>0)for(;(r=this.tokenizer.rules.inline.reflinkSearch.exec(n))!==null;)e.includes(r[0].slice(r[0].lastIndexOf(`[`)+1,-1))&&(n=n.slice(0,r.index)+`[`+`a`.repeat(r[0].length-2)+`]`+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(r=this.tokenizer.rules.inline.anyPunctuation.exec(n))!==null;)n=n.slice(0,r.index)+`++`+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(r=this.tokenizer.rules.inline.blockSkip.exec(n))!==null;)i=r[2]?r[2].length:0,n=n.slice(0,r.index+i)+`[`+`a`.repeat(r[0].length-i-2)+`]`+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,o=``;for(;e;){a||(o=``),a=!1;let r;if(this.options.extensions?.inline?.some(n=>(r=n.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))continue;if(r=this.tokenizer.escape(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.tag(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.link(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(r.raw.length);let n=t.at(-1);r.type===`text`&&n?.type===`text`?(n.raw+=r.raw,n.text+=r.text):t.push(r);continue}if(r=this.tokenizer.emStrong(e,n,o)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.codespan(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.br(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.del(e,n,o)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.autolink(e)){e=e.substring(r.raw.length),t.push(r);continue}if(!this.state.inLink&&(r=this.tokenizer.url(e))){e=e.substring(r.raw.length),t.push(r);continue}let i=e;if(this.options.extensions?.startInline){let t=1/0,n=e.slice(1),r;this.options.extensions.startInline.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(i=e.substring(0,t+1))}if(r=this.tokenizer.inlineText(i)){e=e.substring(r.raw.length),r.raw.slice(-1)!==`_`&&(o=r.raw.slice(-1)),a=!0;let n=t.at(-1);n?.type===`text`?(n.raw+=r.raw,n.text+=r.text):t.push(r);continue}if(e){let t=`Infinite loop on byte: `+e.charCodeAt(0);if(this.options.silent){console.error(t);break}else throw Error(t)}}return t}},Ip=class{options;parser;constructor(e){this.options=e||mf}space(e){return``}code({text:e,lang:t,escaped:n}){let r=(t||``).match(vf.notSpaceStart)?.[0],i=e.replace(vf.endingNewline,``)+`
`;return r?`<pre><code class="language-`+Ep(r)+`">`+(n?i:Ep(i,!0))+`</code></pre>
`:`<pre><code>`+(n?i:Ep(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return``}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r=``;for(let t=0;t<e.items.length;t++){let n=e.items[t];r+=this.listitem(n)}let i=t?`ol`:`ul`,a=t&&n!==1?` start="`+n+`"`:``;return`<`+i+a+`>
`+r+`</`+i+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return`<input `+(e?`checked="" `:``)+`disabled="" type="checkbox"> `}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t=``,n=``;for(let t=0;t<e.header.length;t++)n+=this.tablecell(e.header[t]);t+=this.tablerow({text:n});let r=``;for(let t=0;t<e.rows.length;t++){let i=e.rows[t];n=``;for(let e=0;e<i.length;e++)n+=this.tablecell(i[e]);r+=this.tablerow({text:n})}return r&&=`<tbody>${r}</tbody>`,`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?`th`:`td`;return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ep(e,!0)}</code>`}br(e){return`<br>`}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),i=Dp(e);if(i===null)return r;e=i;let a=`<a href="`+e+`"`;return t&&(a+=` title="`+Ep(t)+`"`),a+=`>`+r+`</a>`,a}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let i=Dp(e);if(i===null)return Ep(n);e=i;let a=`<img src="${e}" alt="${Ep(n)}"`;return t&&(a+=` title="${Ep(t)}"`),a+=`>`,a}text(e){return`tokens`in e&&e.tokens?this.parser.parseInline(e.tokens):`escaped`in e&&e.escaped?e.text:Ep(e.text)}},Lp=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return``+e}image({text:e}){return``+e}br(){return``}checkbox({raw:e}){return e}},Rp=class e{options;renderer;textRenderer;constructor(e){this.options=e||mf,this.options.renderer=this.options.renderer||new Ip,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Lp}static parse(t,n){return new e(n).parse(t)}static parseInline(t,n){return new e(n).parseInline(t)}parse(e){this.renderer.parser=this;let t=``;for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let e=r,n=this.options.extensions.renderers[e.type].call({parser:this},e);if(n!==!1||![`space`,`hr`,`heading`,`code`,`table`,`blockquote`,`list`,`html`,`def`,`paragraph`,`text`].includes(e.type)){t+=n||``;continue}}let i=r;switch(i.type){case`space`:t+=this.renderer.space(i);break;case`hr`:t+=this.renderer.hr(i);break;case`heading`:t+=this.renderer.heading(i);break;case`code`:t+=this.renderer.code(i);break;case`table`:t+=this.renderer.table(i);break;case`blockquote`:t+=this.renderer.blockquote(i);break;case`list`:t+=this.renderer.list(i);break;case`checkbox`:t+=this.renderer.checkbox(i);break;case`html`:t+=this.renderer.html(i);break;case`def`:t+=this.renderer.def(i);break;case`paragraph`:t+=this.renderer.paragraph(i);break;case`text`:t+=this.renderer.text(i);break;default:{let e=`Token with "`+i.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let n=``;for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let e=this.options.extensions.renderers[i.type].call({parser:this},i);if(e!==!1||![`escape`,`html`,`link`,`image`,`strong`,`em`,`codespan`,`br`,`del`,`text`].includes(i.type)){n+=e||``;continue}}let a=i;switch(a.type){case`escape`:n+=t.text(a);break;case`html`:n+=t.html(a);break;case`link`:n+=t.link(a);break;case`image`:n+=t.image(a);break;case`checkbox`:n+=t.checkbox(a);break;case`strong`:n+=t.strong(a);break;case`em`:n+=t.em(a);break;case`codespan`:n+=t.codespan(a);break;case`br`:n+=t.br(a);break;case`del`:n+=t.del(a);break;case`text`:n+=t.text(a);break;default:{let e=`Token with "`+a.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return n}},zp=class{options;block;constructor(e){this.options=e||mf}static passThroughHooks=new Set([`preprocess`,`postprocess`,`processAllTokens`,`emStrongMask`]);static passThroughHooksRespectAsync=new Set([`preprocess`,`postprocess`,`processAllTokens`]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?Fp.lex:Fp.lexInline}provideParser(e=this.block){return e?Rp.parse:Rp.parseInline}},Bp=new class{defaults=pf();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Rp;Renderer=Ip;TextRenderer=Lp;Lexer=Fp;Tokenizer=Pp;Hooks=zp;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case`table`:{let e=r;for(let r of e.header)n=n.concat(this.walkTokens(r.tokens,t));for(let r of e.rows)for(let e of r)n=n.concat(this.walkTokens(e.tokens,t));break}case`list`:{let e=r;n=n.concat(this.walkTokens(e.items,t));break}default:{let e=r;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(r=>{let i=e[r].flat(1/0);n=n.concat(this.walkTokens(i,t))}):e.tokens&&(n=n.concat(this.walkTokens(e.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let n={...e};if(n.async=this.defaults.async||n.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw Error(`extension name required`);if(`renderer`in e){let n=t.renderers[e.name];n?t.renderers[e.name]=function(...t){let r=e.renderer.apply(this,t);return r===!1&&(r=n.apply(this,t)),r}:t.renderers[e.name]=e.renderer}if(`tokenizer`in e){if(!e.level||e.level!==`block`&&e.level!==`inline`)throw Error(`extension level must be 'block' or 'inline'`);let n=t[e.level];n?n.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&(e.level===`block`?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:e.level===`inline`&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}`childTokens`in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),n.extensions=t),e.renderer){let t=this.defaults.renderer||new Ip(this.defaults);for(let n in e.renderer){if(!(n in t))throw Error(`renderer '${n}' does not exist`);if([`options`,`parser`].includes(n))continue;let r=n,i=e.renderer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n||``}}n.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new Pp(this.defaults);for(let n in e.tokenizer){if(!(n in t))throw Error(`tokenizer '${n}' does not exist`);if([`options`,`rules`,`lexer`].includes(n))continue;let r=n,i=e.tokenizer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new zp;for(let n in e.hooks){if(!(n in t))throw Error(`hook '${n}' does not exist`);if([`options`,`block`].includes(n))continue;let r=n,i=e.hooks[r],a=t[r];zp.passThroughHooks.has(n)?t[r]=e=>{if(this.defaults.async&&zp.passThroughHooksRespectAsync.has(n))return(async()=>{let n=await i.call(t,e);return a.call(t,n)})();let r=i.call(t,e);return a.call(t,r)}:t[r]=(...e)=>{if(this.defaults.async)return(async()=>{let n=await i.apply(t,e);return n===!1&&(n=await a.apply(t,e)),n})();let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,r=e.walkTokens;n.walkTokens=function(e){let n=[];return n.push(r.call(this,e)),t&&(n=n.concat(t.call(this,e))),n}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Fp.lex(e,t??this.defaults)}parser(e,t){return Rp.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},i={...this.defaults,...r},a=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&r.async===!1)return a(Error(`marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.`));if(typeof t>`u`||t===null)return a(Error(`marked(): input parameter is undefined or null`));if(typeof t!=`string`)return a(Error(`marked(): input parameter is of type `+Object.prototype.toString.call(t)+`, string expected`));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let n=i.hooks?await i.hooks.preprocess(t):t,r=await(i.hooks?await i.hooks.provideLexer(e):e?Fp.lex:Fp.lexInline)(n,i),a=i.hooks?await i.hooks.processAllTokens(r):r;i.walkTokens&&await Promise.all(this.walkTokens(a,i.walkTokens));let o=await(i.hooks?await i.hooks.provideParser(e):e?Rp.parse:Rp.parseInline)(a,i);return i.hooks?await i.hooks.postprocess(o):o})().catch(a);try{i.hooks&&(t=i.hooks.preprocess(t));let n=(i.hooks?i.hooks.provideLexer(e):e?Fp.lex:Fp.lexInline)(t,i);i.hooks&&(n=i.hooks.processAllTokens(n)),i.walkTokens&&this.walkTokens(n,i.walkTokens);let r=(i.hooks?i.hooks.provideParser(e):e?Rp.parse:Rp.parseInline)(n,i);return i.hooks&&(r=i.hooks.postprocess(r)),r}catch(e){return a(e)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let e=`<p>An error occurred:</p><pre>`+Ep(n.message+``,!0)+`</pre>`;return t?Promise.resolve(e):e}if(t)return Promise.reject(n);throw n}}};function Z(e,t){return Bp.parse(e,t)}Z.options=Z.setOptions=function(e){return Bp.setOptions(e),Z.defaults=Bp.defaults,hf(Z.defaults),Z},Z.getDefaults=pf,Z.defaults=mf,Z.use=function(...e){return Bp.use(...e),Z.defaults=Bp.defaults,hf(Z.defaults),Z},Z.walkTokens=function(e,t){return Bp.walkTokens(e,t)},Z.parseInline=Bp.parseInline,Z.Parser=Rp,Z.parser=Rp.parse,Z.Renderer=Ip,Z.TextRenderer=Lp,Z.Lexer=Fp,Z.lexer=Fp.lex,Z.Tokenizer=Pp,Z.Hooks=zp,Z.parse=Z,Z.options,Z.setOptions,Z.use,Z.walkTokens,Z.parseInline,Rp.parse,Fp.lex;function Q(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var Vp=()=>new Hp,Hp=class{},Up=new WeakMap,Wp=pn(class extends Fn{render(e){return x}update(e,[t]){let n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),x}rt(e){if(this.isConnected||(e=void 0),typeof this.G==`function`){let t=this.ht??globalThis,n=Up.get(t);n===void 0&&(n=new WeakMap,Up.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return typeof this.G==`function`?Up.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Gp=(e,t,n)=>{let r=new Map;for(let i=t;i<=n;i++)r.set(e[i],i);return r},Kp=pn(class extends mn{constructor(e){if(super(e),e.type!==fn.CHILD)throw Error(`repeat() can only be used in text expressions`)}dt(e,t,n){let r;n===void 0?n=t:t!==void 0&&(r=t);let i=[],a=[],o=0;for(let t of e)i[o]=r?r(t,o):o,a[o]=n(t,o),o++;return{values:a,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,r]){let i=En(e),{values:a,keys:o}=this.dt(t,n,r);if(!Array.isArray(i))return this.ut=o,a;let s=this.ut??=[],c=[],l,u,d=0,f=i.length-1,p=0,m=a.length-1;for(;d<=f&&p<=m;)if(i[d]===null)d++;else if(i[f]===null)f--;else if(s[d]===o[p])c[p]=Cn(i[d],a[p]),d++,p++;else if(s[f]===o[m])c[m]=Cn(i[f],a[m]),f--,m--;else if(s[d]===o[m])c[m]=Cn(i[d],a[m]),Sn(e,c[m+1],i[d]),d++,m--;else if(s[f]===o[p])c[p]=Cn(i[f],a[p]),Sn(e,i[d],i[f]),f--,p++;else if(l===void 0&&(l=Gp(o,p,m),u=Gp(s,d,f)),l.has(s[d]))if(l.has(s[f])){let t=u.get(o[p]),n=t===void 0?null:i[t];if(n===null){let t=Sn(e,i[d]);Cn(t,a[p]),c[p]=t}else c[p]=Cn(n,a[p]),Sn(e,i[d],n),i[t]=null;p++}else Dn(i[f]),f--;else Dn(i[d]),d++;for(;p<=m;){let t=Sn(e,c[m+1]);Cn(t,a[p]),c[p++]=t}for(;d<=f;){let e=i[d++];e!==null&&Dn(e)}return this.ut=o,Tn(e,c),Ke}}),qp=Object.defineProperty,Jp=((e,t)=>{let n={};for(var r in e)qp(n,r,{get:e[r],enumerable:!0});return t||qp(n,Symbol.toStringTag,{value:`Module`}),n})({COMMAND_SAVE:()=>lm,EDITOR_AREA_MAIN:()=>im,HIDE_DOT_RESOURCE:()=>!1,MouseButton:()=>um,PANEL_BOTTOM:()=>cm,SIDEBAR_AUXILIARY:()=>sm,SIDEBAR_MAIN:()=>am,SIDEBAR_MAIN_BOTTOM:()=>om,SIDEBAR_MAIN_TOOLBAR:()=>tm,SYSTEM_LAYOUTS:()=>rm,SYSTEM_VIEWS:()=>nm,TOOLBAR_BOTTOM:()=>Qp,TOOLBAR_BOTTOM_CENTER:()=>$p,TOOLBAR_BOTTOM_END:()=>em,TOOLBAR_MAIN:()=>Yp,TOOLBAR_MAIN_CENTER:()=>Zp,TOOLBAR_MAIN_RIGHT:()=>Xp}),Yp=`app-toolbars-main`,Xp=`app-toolbars-main-right`,Zp=`app-toolbars-main-center`,Qp=`app-toolbars-bottom`,$p=`app-toolbars-bottom-center`,em=`app-toolbars-bottom-end`,tm=`sidebar-main-toolbar`,nm=`system-views`,rm=`system.layouts`,im=`editor-area-main`,am=`sidebar-main`,om=`sidebar-main-bottom`,sm=`sidebar-auxiliary`,cm=`panel-bottom`,lm=`command-save`,um=function(e){return e[e.LEFT=0]=`LEFT`,e[e.MIDDLE=1]=`MIDDLE`,e[e.RIGHT=2]=`RIGHT`,e[e.BACK=3]=`BACK`,e[e.FORWARD=4]=`FORWARD`,e}({}),dm=`.eclipse-docks/settings.json`,fm=`dialogSettings`,pm=`events/settings/changed`;function mm(e,t){if(t){for(let[n,r]of Object.entries(t))if(r&&typeof r==`object`){let t=e[n];t?.properties&&r.properties?mm(t.properties,r.properties):e[n]={...r,properties:r.properties?{...r.properties}:void 0}}}}var hm=new class{constructor(){this.mergedSchema={type:`object`,properties:{}}}async checkSettings(){this.appSettings||(this.appSettings=await a.getObject(dm),this.appSettings||(this.appSettings={},await a.persistObject(dm,this.appSettings)),_(pm,this.appSettings))}registerSchema(e){let t=e.properties??(e.type===`object`?{}:void 0);t&&(this.mergedSchema.properties||(this.mergedSchema.properties={}),mm(this.mergedSchema.properties,t))}getCategories(){let e=this.mergedSchema.properties;return e?Object.entries(e).filter(([,e])=>e&&typeof e==`object`).map(([e,t])=>({id:e,label:t.title??e,order:typeof t.order==`number`?t.order:0,schema:t})).sort((e,t)=>e.order-t.order):[]}getSchemaForCategory(e){return this.mergedSchema.properties?.[e]}getSchemaForSettingKey(e){let t=e.split(`.`).filter(Boolean);if(t.length===0)return this.mergedSchema;let n=this.mergedSchema;for(let e of t)if(n=n?.properties?.[e],!n)return;return n}traversePath(e,t,n){if(t.length===0)return null;let r=e,i=t.length-1;for(let e=0;e<i;e++){let i=t[e];if(r[i]===void 0){if(!n)return null;r[i]={}}if(r[i]===null||typeof r[i]!=`object`)return null;r=r[i]}return{parent:r,key:t[i]}}async getAt(e){await this.checkSettings();let t=e.split(`.`).filter(Boolean);if(t.length===0)return this.appSettings;let n=this.traversePath(this.appSettings,t,!1);if(n)return n.parent[n.key]}async setAt(e,t){await this.checkSettings();let n=e.split(`.`).filter(Boolean);if(n.length===0)return;let r=this.traversePath(this.appSettings,n,!0);r&&(r.parent[r.key]=t,await a.persistObject(dm,this.appSettings),_(pm,this.appSettings))}async get(e){return await this.checkSettings(),this.appSettings[e]}async set(e,t){await this.checkSettings(),this.appSettings[e]=t,await a.persistObject(dm,this.appSettings),_(pm,this.appSettings)}async getAll(){return await this.checkSettings(),this.appSettings}async setAll(e){this.appSettings=e,await a.persistObject(dm,this.appSettings),_(pm,this.appSettings)}async getDialogSetting(e){return await this.checkSettings(),(this.appSettings.dialogSettings||{})[e]}async setDialogSetting(e,t){await this.checkSettings();let n=this.appSettings.dialogSettings||{};n[e]=t,this.appSettings[fm]=n,await a.persistObject(dm,this.appSettings),_(pm,this.appSettings)}};c.put(`appSettings`,hm);var gm=new class{constructor(){this.tasks=[],this.updateCounter=0}notifyUpdate(){this.updateCounter++,Yn.set(this.updateCounter)}run(e,t){let n=this.createProgressMonitor(e);try{this.tasks.push(n),this.notifyUpdate(),t(n)}finally{this.tasks.splice(this.tasks.indexOf(n),1),this.notifyUpdate()}}async runAsync(e,t){let n=this.createProgressMonitor(e);return this.tasks.push(n),this.notifyUpdate(),t(n).finally(()=>{this.tasks.splice(this.tasks.indexOf(n),1),this.notifyUpdate()})}createProgressMonitor(e){return new Proxy({name:e,message:``,currentStep:0,totalSteps:-1,progress:-1},{set:(e,t,n)=>(e[t]=n,this.notifyUpdate(),!0)})}getActiveTasks(){return this.tasks}};c.put(`taskService`,gm);var _m=m(`EsmShService`),vm=new class e{static{this.ESM_SH_BASE=`https://esm.sh`}static{this.GITHUB_PREFIX=`gh/`}static{this.JSR_PREFIX=`jsr/`}static{this.PR_PREFIX=`pr/`}isEsmShUrl(e){try{let t=new URL(e);return t.hostname===`esm.sh`||t.hostname===`raw.esm.sh`}catch{return!1}}isSourceIdentifier(e){return this.isEsmShUrl(e)||this.isHttpUrl(e)?!1:this.parseSource(e)!==null}isHttpUrl(e){try{let t=new URL(e);return t.protocol===`http:`||t.protocol===`https:`}catch{return!1}}parseSource(t){return!t||typeof t!=`string`||(t=t.trim(),this.isHttpUrl(t))?null:t.startsWith(e.GITHUB_PREFIX)?this.parseGitHubSource(t):t.startsWith(e.JSR_PREFIX)?this.parseJsrSource(t):t.startsWith(e.PR_PREFIX)?this.parsePrSource(t):this.parseNpmSource(t)}parseGitHubSource(t){let n=t.substring(e.GITHUB_PREFIX.length).split(`/`);if(n.length<2)return null;let r=n[0],i=n[1],a,o,s,c=i.match(/^(.+?)(@(.+))?$/);return c?(a=c[1],o=c[3],n.length>2&&(s=n.slice(2).join(`/`)),{type:`github`,owner:r,repo:a,version:o,path:s}):null}parseJsrSource(t){let n=t.substring(e.JSR_PREFIX.length);if(!n.startsWith(`@`))return null;let r=n.split(`/`);if(r.length<2)return null;let i=r[0],a=r[1],o,s,c,l=a.match(/^(.+?)(@(.+))?$/);return l?(o=`${i}/${l[1]}`,s=l[3],r.length>2&&(c=r.slice(2).join(`/`)),{type:`jsr`,package:o,version:s,path:c}):null}parsePrSource(t){let n=t.substring(e.PR_PREFIX.length).split(`/`);if(n.length<2)return null;let r=n[0],i=n[1],a,o,s=i.match(/^(.+?)@(.+)$/);return s?(a=s[1],o=s[2]):a=i,{type:`pr`,owner:r,repo:a,commit:o}}parseNpmSource(e){let t=e.split(`/`),n=t[0],r,i,a,o=n.match(/^(.+?)(@(.+))?$/);return o?(r=o[1],i=o[3],t.length>1&&(a=t.slice(1).join(`/`)),{type:`npm`,package:r,version:i,path:a}):null}buildEsmShUrl(t,n){let r=e.ESM_SH_BASE;switch(t.type){case`npm`:r+=`/${t.package}`,t.version&&(r+=`@${t.version}`),t.path&&(r+=`/${t.path}`);break;case`github`:r+=`/${e.GITHUB_PREFIX}${t.owner}/${t.repo}`,t.version&&(r+=`@${t.version}`),t.path&&(r+=`/${t.path}`);break;case`jsr`:r+=`/${e.JSR_PREFIX}${t.package}`,t.version&&(r+=`@${t.version}`),t.path&&(r+=`/${t.path}`);break;case`pr`:r+=`/${e.PR_PREFIX}${t.owner}/${t.repo}`,t.commit&&(r+=`@${t.commit}`);break}let i=[];if(n?.deps){let e=Object.entries(n.deps).map(([e,t])=>`${e}@${t}`).join(`,`);i.push(`deps=${encodeURIComponent(e)}`)}return n?.target&&i.push(`target=${encodeURIComponent(n.target)}`),n?.dev&&i.push(`dev`),n?.bundle===!1?i.push(`bundle=false`):n?.bundle===!0&&i.push(`bundle`),i.length>0&&(r+=`?${i.join(`&`)}`),r}normalizeToEsmSh(e,t){if(this.isEsmShUrl(e)||this.isHttpUrl(e))return e;let n=this.parseSource(e);return n?this.buildEsmShUrl(n,t):(_m.warn(`Could not parse source identifier: ${e}`),e)}extractPackageName(e){let t=this.parseSource(e);if(!t)return null;switch(t.type){case`npm`:return t.package||null;case`github`:return`${t.owner}/${t.repo}`;case`jsr`:return t.package||null;case`pr`:return`${t.owner}/${t.repo}`}}isGitHubUrl(e){try{let t=new URL(e);return t.hostname===`github.com`||t.hostname===`www.github.com`}catch{return e.startsWith(`https://github.com/`)||e.startsWith(`http://github.com/`)}}convertGitHubUrlToSource(t){try{let n=new URL(t).pathname.split(`/`).filter(e=>e);if(n.length<2)throw Error(`Invalid GitHub URL format`);let r=n[0],i=n[1].replace(/\.git$/,``),a,o;n.length>2&&(n[2]===`blob`||n[2]===`tree`?(a=n[3]||`main`,n[2]===`blob`&&n.length>4&&(o=n.slice(4).join(`/`))):n[2]===`commit`?a=n[3]:o=n.slice(2).join(`/`));let s=`${e.GITHUB_PREFIX}${r}/${i}`;return a&&(s+=`@${a}`),o&&(s+=`/${o}`),s}catch{let n=t.match(/github\.com\/([^\/]+)\/([^\/]+)/);return n?`${e.GITHUB_PREFIX}${n[1]}/${n[2].replace(/\.git$/,``)}`:t}}async fetchGitHubPackageJson(e){if(e.type!==`github`)throw Error(`Source must be a GitHub source`);let t=`https://raw.githubusercontent.com/${e.owner}/${e.repo}/${e.version||`main`}/package.json`,n=await fetch(t);if(!n.ok)throw Error(`Failed to fetch package.json: ${n.statusText}`);return await n.json()}};c.put(`esmShService`,vm);var ym=`events/extensionsregistry/extensionsConfigChanged`,bm=`extensions`,xm=`extensions.external`,Sm=new class{constructor(){this.extensions={},this.loadedExtensions=new Set,this.loadingPromises=new Map,o(pm,()=>{this.extensionsSettings=void 0,this.checkExtensionsConfig().then()}),this.loadPersistedExternalExtensions().then(()=>{this.checkExtensionsConfig().then()})}async loadPersistedExternalExtensions(){try{let e=await hm.get(xm);e&&Array.isArray(e)&&e.forEach(e=>{this.extensions[e.id]=e})}catch(e){d.error(`Failed to load persisted external extensions: ${e}`)}}async savePersistedExternalExtensions(){try{let e=Object.values(this.extensions).filter(e=>e.external);await hm.set(xm,e)}catch(e){d.error(`Failed to save persisted external extensions: ${e}`)}}async checkExtensionsConfig(){this.extensionsSettings||(this.extensionsSettings=await hm.get(bm),this.extensionsSettings||=(await hm.set(bm,[]),await hm.get(bm)),_(ym,this.extensionsSettings))}registerExtension(e){this.extensions[e.id]=e,d.debug(`Registered extension: ${e.id}`),e.external&&this.savePersistedExternalExtensions().catch(e=>{d.error(`Failed to persist external extension: ${e}`)}),_(ym,this.extensionsSettings)}async loadExtensionFromUrl(e,t){d.info(`Loading extension from URL: ${e}...`);try{let n=e,r=`Extension from ${e}`;if(vm.isSourceIdentifier(e)){let t=vm.extractPackageName(e);t&&(r=`Extension: ${t}`),n=vm.normalizeToEsmSh(e),d.debug(`Converted source identifier to esm.sh URL: ${e} -> ${n}`)}let i=t||`url:${n}`;if(this.isEnabled(i))return d.info(`Extension from URL ${n} is already enabled`),i;if(!this.extensions[i]){let t={id:i,name:r,description:`Extension loaded from: ${e}`,url:n};this.registerExtension(t),d.info(`Registered extension from URL: ${i}`)}return await this.enableAsync(i,!1),d.info(`Successfully enabled extension from URL: ${n}`),i}catch(t){throw d.error(`Failed to load extension from URL ${e}: ${t}`),t}}getExtensions(){return Object.values(this.extensions)}async loadEnabledExtensions(){await this.checkExtensionsConfig();let e=(this.extensionsSettings??[]).filter(e=>this.isEnabled(e.id)&&this.extensions[e.id]).map(e=>this.load(e.id).catch(e=>{S(`Extension could not be loaded: `+e.message)}));await Promise.all(e)}isEnabled(e){return this.checkExtensionsConfig(),!!this.extensionsSettings?.find(t=>t.id===e&&t.enabled)}isLoaded(e){return this.loadedExtensions.has(e)}enable(e,t=!1){this.isEnabled(e)||(d.debug(`Loading extension: ${e}`),this.load(e).then(()=>this.updateEnablementAsync(e,!0,t)).catch(t=>{d.error(`Could not load extension: ${e}: ${t}`)}))}async enableAsync(e,t=!1){if(this.isEnabled(e)){if(!this.isLoaded(e)){d.debug(`Extension ${e} is enabled in settings but not loaded; loading now`);try{await this.load(e)}catch(t){throw d.error(`Could not load extension: ${e}: ${t}`),t}}return}d.debug(`Loading extension: ${e}`);try{await this.load(e),await this.updateEnablementAsync(e,!0,t)}catch(t){throw d.error(`Could not load extension: ${e}: ${t}`),t}}async load(e,t=[]){if(this.loadedExtensions.has(e))return;let n=this.loadingPromises.get(e);if(n)return n;if(t.includes(e)){let n=[...t,e].join(` → `);throw Error(`Circular dependency detected: ${n}`)}let i=this.extensions[e];if(!i)throw Error(`Extension not found: `+e);let a=(async()=>{try{if(d.debug(`Loading extension: ${e}`),i.dependencies&&i.dependencies.length>0){let n=[...t,e];for(let e of i.dependencies)await this.load(e,n),this.isEnabled(e)||(await this.updateEnablementAsync(e,!0,!1),d.debug(`Auto-enabled dependency: ${e}`))}let n=await gm.runAsync(`Loading extension: `+i.name,async()=>{if(i.loader)return i.loader();if(i.url){let e=i.url;return vm.isSourceIdentifier(i.url)&&(e=vm.normalizeToEsmSh(i.url),d.debug(`Normalized extension URL: ${i.url} -> ${e}`)),v(()=>import(e),[])}});if(n?.default instanceof Function)try{let e=n.default(r.getProxy());await Promise.resolve(e)}catch(t){throw d.error(`Error executing extension function for ${e}: ${t}`),t}this.loadedExtensions.add(e)}catch(t){throw this.loadedExtensions.delete(e),t}finally{this.loadingPromises.delete(e)}})();return this.loadingPromises.set(e,a),a}disable(e,t=!1){this.isEnabled(e)&&this.updateEnablementAsync(e,!1,t).catch(t=>{d.error(`Could not persist disable for extension ${e}: ${t}`)})}async updateEnablementAsync(e,t,n){await this.checkExtensionsConfig();let r=this.extensionsSettings?.find(t=>t.id==e);if(r?r.enabled=t:this.extensionsSettings?.push({id:e,enabled:t}),await hm.set(bm,this.extensionsSettings),n){let n=this.extensions[e];Hn(t?n.name+` enabled.`:n.name+` disabled  - Please restart to take effect`)}_(ym,this.extensionsSettings)}};c.put(`extensionRegistry`,Sm);var Cm=[`alt`,`ctrl`,`meta`,`shift`],wm={CTRL:`ctrl`,CONTROL:`ctrl`,ALT:`alt`,OPTION:`alt`,SHIFT:`shift`,META:`meta`,CMD:`meta`,COMMAND:`meta`,WIN:`meta`,WINDOWS:`meta`},Tm={ctrl:`Ctrl`,alt:`Alt`,shift:`Shift`,meta:`Cmd`},Em={SPACE:` `,ESC:`ESCAPE`,RETURN:`ENTER`,LEFT:`ARROWLEFT`,RIGHT:`ARROWRIGHT`,UP:`ARROWUP`,DOWN:`ARROWDOWN`,DEL:`DELETE`,INS:`INSERT`,PAGEUP:`PAGEUP`,PAGEDOWN:`PAGEDOWN`},Dm=new Set(Object.keys(wm));function Om(e){return Em[e]??e}var km=new class{constructor(){this.bindings=new Map,this.enabled=!0,document.addEventListener(`keydown`,this.handleKeyDown.bind(this),!0),this.registerExistingCommandBindings(),o(Zn,e=>{e.keyBinding&&this.registerKeyBinding(e.id,e.keyBinding)})}registerExistingCommandBindings(){let e=er.listCommands();Object.values(e).forEach(e=>{e.keyBinding&&this.registerKeyBinding(e.id,e.keyBinding)})}parseKeyBinding(e){if(!e||e.trim()===``)return null;let t=e.toUpperCase().split(`+`).map(e=>e.trim());if(t.length===0)return null;let n=t[t.length-1],r=t.slice(0,-1);if(t.length===1&&Dm.has(n))return null;let i={ctrl:!1,alt:!1,shift:!1,meta:!1};for(let e of r){let t=wm[e];if(t===void 0)return null;i[t]=!0}return i.key=Om(n),i}getBindingKey(e){return[...Cm.filter(t=>e[t]),e.key.toUpperCase()].join(`+`)}registerKeyBinding(e,t){let n=this.parseKeyBinding(t);if(!n)return d.error(`Invalid key binding: ${t}`),!1;n.commandId=e;let r=this.getBindingKey(n);this.bindings.has(r)||this.bindings.set(r,[]);let i=this.bindings.get(r);if(i.find(t=>t.commandId===e))return d.error(`Key binding ${t} already registered for command ${e}`),!1;let a=i.find(t=>t.commandId!==e);return a?(d.warn(`Key binding ${t} already used by command ${a.commandId}; refusing for ${e}`),!1):(i.push(n),!0)}unregisterKeyBinding(e,t){if(t){let n=this.parseKeyBinding(t);if(n){let t=this.getBindingKey(n),r=this.bindings.get(t);if(r){let n=r.filter(t=>t.commandId!==e);n.length===0?this.bindings.delete(t):this.bindings.set(t,n)}}}else for(let[t,n]of this.bindings.entries()){let r=n.filter(t=>t.commandId!==e);r.length===0?this.bindings.delete(t):this.bindings.set(t,r)}}getKeyBindingsForCommand(e){let t=[];for(let n of this.bindings.values())for(let r of n)r.commandId===e&&t.push(this.formatKeyBinding(r));return t.sort()}formatKeyBinding(e){let t=Cm.filter(t=>e[t]).map(e=>Tm[e]),n=e.key.length===1?e.key.toUpperCase():e.key.charAt(0).toUpperCase()+e.key.slice(1).toLowerCase();return t.push(n),t.join(`+`)}handleKeyDown(e){if(!this.enabled)return;let t={commandId:``,key:Om(e.key.toUpperCase()),ctrl:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:e.metaKey},n=this.getBindingKey(t),r=this.bindings.get(n);if(r&&r.length>0){let t=r[0];e.preventDefault(),e.stopPropagation();let n=er.createExecutionContext({});er.execute(t.commandId,n).then(()=>{d.debug(`Executed command via key binding: ${t.commandId}`)},e=>{let n=e instanceof Error?e.message:String(e);d.error(`Failed to execute command ${t.commandId}: ${n}`)})}}setEnabled(e){this.enabled=e}isEnabled(){return this.enabled}getAllBindings(){let e=new Map;for(let[t,n]of this.bindings)e.set(t,[...n]);return e}clearAll(){this.bindings.clear()}};c.put(`keyBindingManager`,km);var Am=class extends ir{constructor(...e){super(...e),this.settingsKey=null}buildDOMTreePath(){let e=[],t=this;for(;t&&t!==document.body&&t!==document.documentElement;){let n=t.getAttribute(`id`);if(n){e.unshift(`#${n}`);break}let r=t.tagName.toLowerCase(),i=t.parentElement;if(!i)break;let a=Array.from(i.children).filter(e=>e.tagName.toLowerCase()===r).indexOf(t);a>=0?e.unshift(`${r}:${a}`):e.unshift(r),t=i}return e.length>0?e.join(` > `):null}initializeSettingsKey(){if(!this.settingsKey){let e=this.tagName.toLowerCase(),t=this.getAttribute(`id`);if(t){this.settingsKey=`${e}:${t}`;return}let n=this.buildDOMTreePath();n&&(this.settingsKey=`${e}:${n}`)}}async getDialogSetting(){if(this.initializeSettingsKey(),this.settingsKey)return await hm.getDialogSetting(this.settingsKey)}async setDialogSetting(e){this.initializeSettingsKey(),this.settingsKey&&await hm.setDialogSetting(this.settingsKey,e)}},jm=class extends Am{static{this.styles=[y`
            .dialog-message {
                margin-bottom: 0.5rem;
                color: var(--wa-color-text-normal);
            }
        `]}dispose(){}getResult(){}renderMessage(e,t=!1){return t?b`<div class="dialog-message" style="white-space: normal;">${ad(Z.parse(e,{async:!1}))}</div>`:b`<div class="dialog-message" style="white-space: pre-line;">${e}</div>`}},Mm=m(`DialogService`),Nm=`dialogs`,Pm={id:`ok`,label:`OK`,variant:`primary`},Fm={id:`cancel`,label:`Cancel`,variant:`default`},Im={id:`close`,label:`Close`,variant:`default`},Lm=null;function Rm(){return(!Lm||!document.body.contains(Lm))&&(Lm=document.createElement(`div`),Lm.id=`global-dialog-container`,document.body.appendChild(Lm)),Lm}var zm=new class{constructor(){this.contributions=new Map,this.contributionsChangeScheduled=!1,this.loadContributions(),o(Gn,e=>{e.target===`dialogs`&&(this.contributionsChangeScheduled||(this.contributionsChangeScheduled=!0,queueMicrotask(()=>{this.contributionsChangeScheduled=!1,this.loadContributions()})))})}loadContributions(){let e=C.getContributions(Nm);this.contributions.clear();for(let t of e){if(!t.id){Mm.warn(`Dialog contribution missing id, skipping`);continue}if(!t.component){Mm.warn(`Dialog contribution "${t.id}" has no component function, skipping`);continue}if(!t.onButton){Mm.warn(`Dialog contribution "${t.id}" has no onButton callback, skipping`);continue}this.contributions.set(t.id,t)}}async open(e,t){let n=this.contributions.get(e);if(!n)throw Mm.error(`Dialog "${e}" not found`),Error(`Dialog "${e}" not found`);return new Promise(r=>{let i=Rm(),a=!0,o=null,s=async()=>{if(a){if(a=!1,o)try{await o.dispose()}catch(t){let n=t instanceof Error?t.message:String(t);Mm.error(`Error disposing dialog content for "${e}": ${n}`)}try{let e=o?o.getResult():void 0;await n.onButton(`close`,e,u)}catch(t){let n=t instanceof Error?t.message:String(t);Mm.error(`Error executing close callback for dialog "${e}": ${n}`)}ct(b``,i),r()}},c=async t=>{try{let e=o?o.getResult():void 0;await n.onButton(t,e,u)!==!1&&s()}catch(t){let n=t instanceof Error?t.message:String(t);Mm.error(`Error executing button callback for dialog "${e}": ${n}`),s()}},l=n.buttons&&n.buttons.length>0?n.buttons:[Pm];t&&typeof t==`object`&&(t.close=s);let u={...t,close:s};ct(b`
                <wa-dialog label="${n.label||e}" open @wa-request-close=${s}>
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
                         @dialog-ok=${()=>{let e=l.find(e=>e.id===`ok`);e&&c(e.id)}}
                         @dialog-cancel=${()=>{let e=l.find(e=>e.id===`cancel`);e?c(e.id):s()}}>
                        ${n.component(t)}
                        
                        <div class="dialog-service-footer">
                            ${l.map(e=>b`
                                <wa-button 
                                    variant="${e.variant||`default`}"
                                    ?disabled=${e.disabled}
                                    @click=${()=>c(e.id)}
                                >
                                    ${e.label}
                                </wa-button>
                            `)}
                        </div>
                    </div>
                </wa-dialog>
            `,i),(async()=>{let e=Array.from(i.querySelectorAll(`*`));for(let t of e)if(t instanceof jm){await t.updateComplete,o=t;break}})()})}getDialogIds(){return Array.from(this.contributions.keys())}hasDialog(e){return this.contributions.has(e)}};c.put(`dialogService`,zm);var Bm=`.opfs`;async function Vm(){if(typeof navigator>`u`||!navigator.storage?.getDirectory)throw Error(`OPFS is not available in this environment`);return await navigator.storage.getDirectory()}var Hm=class extends g{constructor(e){super(),this.inner=e}getName(){return Bm}getParent(){return this.inner.getParent()}async listChildren(e){return this.inner.listChildren(e)}async getResource(e,t){return this.inner.getResource(e,t)}touch(){this.inner.touch()}async delete(e,t){return this.inner.delete(e,t)}async copyTo(e){return this.inner.copyTo(e)}async rename(e){return this.inner.rename(e)}};u.registerContribution({type:`opfs`,name:`opfs`,canHandle(e){return e&&typeof e==`object`&&e.opfs===!0},async connect(e){let t=await Vm(),n=(await v(async()=>{let{FileSysDirHandleResource:e}=await import(`./fs-access-CnQJX8W1-Djn7yzTe.js`);return{FileSysDirHandleResource:e}},__vite__mapDeps([0,1]))).FileSysDirHandleResource;return new Hm(new n(t))},async restore(e){if(e&&typeof e==`object`&&e.opfs===!0){let e=await Vm(),t=(await v(async()=>{let{FileSysDirHandleResource:e}=await import(`./fs-access-CnQJX8W1-Djn7yzTe.js`);return{FileSysDirHandleResource:e}},__vite__mapDeps([0,1]))).FileSysDirHandleResource;return new Hm(new t(e))}},async persist(e){return e instanceof Hm?{opfs:!0}:null}});var Um=`eclipse-docks-workspace-idb`,Wm=`files`,Gm=null;async function Km(){if(typeof indexedDB>`u`)throw Error(`IndexedDB is not available in this environment`);return Gm||=new Promise((e,t)=>{let n=indexedDB.open(Um,1);n.onerror=()=>t(n.error),n.onsuccess=()=>e(n.result),n.onupgradeneeded=e=>{let t=e.target.result;t.objectStoreNames.contains(Wm)||t.createObjectStore(Wm)}}),Gm}async function qm(){let e=`IndexedDB`,t=await u.getFolders(),n=new Set(t.filter(e=>e.type===`indexeddb`).map(e=>e.name));if(!n.has(e))return e;let r=1;for(;n.has(`${e} (${r})`);)r+=1;return`${e} (${r})`}function Jm(e){return e?e.split(`/`).filter(Boolean).join(`/`):``}function Ym(e,t){let n=Jm(e),r=Jm(t);return n?r?`${n}/${r}`:n:r}function Xm(e,t){let n=Jm(t);return n?`${e}/${n}`:e}function Zm(e,t){let n=Jm(t);return n?`${e}/${n}/`:`${e}/`}async function Qm(e,t){let n=(await Km()).transaction(Wm,`readonly`).objectStore(Wm),r=t?Xm(e,t):e;return await new Promise((e,t)=>{let i=n.get(r);i.onsuccess=()=>e(i.result),i.onerror=()=>t(i.error)})}async function $m(e,t,n){let r=(await Km()).transaction(Wm,`readwrite`).objectStore(Wm),i=t?Xm(e,t):e;await new Promise((e,t)=>{let a=r.put(n,i);a.onsuccess=()=>e(),a.onerror=()=>t(a.error)})}async function eh(e,t){let n=(await Km()).transaction(Wm,`readwrite`).objectStore(Wm),r=t?Xm(e,t):e;await new Promise((e,t)=>{let i=n.delete(r);i.onsuccess=()=>e(),i.onerror=()=>t(i.error)})}async function th(e,t){let n=(await Km()).transaction(Wm,`readwrite`).objectStore(Wm),r=Xm(e,t),i=r+`/`,a=n.openCursor();await new Promise((e,t)=>{a.onerror=()=>t(a.error),a.onsuccess=t=>{let n=t.target.result;if(!n){e();return}let a=String(n.key);(a===r||a.startsWith(i))&&n.delete(),n.continue()}})}async function nh(e){await th(e,``)}async function rh(e,t,n){let r=(await Km()).transaction(Wm,`readwrite`).objectStore(Wm),i=Xm(e,t),a=Xm(e,n),o=r.openCursor(),s=[];await new Promise((e,t)=>{o.onerror=()=>t(o.error),o.onsuccess=t=>{let n=t.target.result;if(!n){e();return}let o=String(n.key);if(o===i||o.startsWith(i+`/`)){let e=a+o.slice(i.length),t=n.value;s.push(()=>{n.delete(),r.put(t,e)})}n.continue()}});for(let e of s)e()}async function ih(e,t){let n=(await Km()).transaction(Wm,`readonly`).objectStore(Wm),r=Zm(e,t),i=n.openCursor(),a=new Set,o=new Map;await new Promise((e,t)=>{i.onerror=()=>t(i.error),i.onsuccess=t=>{let n=t.target.result;if(!n){e();return}let i=String(n.key),s=n.value;if(!i.startsWith(r)){n.continue();return}let c=i.slice(r.length);if(!c){n.continue();return}let l=c.indexOf(`/`),u=l===-1?c:c.slice(0,l);l===-1?s.type===`dir`?a.add(u):o.set(u,s):a.add(u),n.continue()}});let s=[];for(let e of a)s.push({name:e,entry:{type:`dir`},type:`dir`});for(let[e,t]of o)a.has(e)||s.push({name:e,entry:t,type:`file`});return s}function ah(e){return e instanceof sh?e.getRootId():``}var oh=class extends f{constructor(e,t){super(),this.path=Jm(e),this.parent=t}getName(){let e=this.path.split(`/`);return e[e.length-1]||``}getParent(){return this.parent}getRootId(){return ah(this.parent)}async delete(){await eh(this.getRootId(),this.path),_(i,u.getWorkspaceSync()??this.getWorkspace())}async getContents(e){let t=await Qm(this.getRootId(),this.path),n=t?.content;if(typeof n==`string`){let e=new Blob([n],{type:t?.mimeType||`text/plain`});n=e,t&&(t.content=e,await $m(this.getRootId(),this.path,t))}if(!e||e.contentType===h.TEXT)return n?await n.text():``;let r;return r=n||new Blob([],{type:t?.mimeType}),e.blob?r:e.uri?URL.createObjectURL(r):r.stream()}async saveContents(e,t){let n,r;if(e instanceof Blob)n=e,r=e.type||void 0;else if(typeof e==`string`)r=`text/plain`,n=new Blob([e],{type:r});else if(e instanceof ReadableStream){let t=new Response(e);n=await t.blob(),r=t.headers.get(`content-type`)??void 0}else{let t=String(e??``);r=`text/plain`,n=new Blob([t],{type:r})}await $m(this.getRootId(),this.path,{type:`file`,content:n,mimeType:r}),_(i,u.getWorkspaceSync()??this.getWorkspace())}async size(){let e=(await Qm(this.getRootId(),this.path))?.content;return e?e.size:null}async copyTo(e){let t=await this.getContents({blob:!0}),n=await this.getWorkspace().getResource(e,{create:!0});if(!n)throw Error(`Failed to create target file: ${e}`);await n.saveContents(t)}async rename(e){if(this.getName()===e)return;let t=this.getParent(),n=Ym(t instanceof sh?t.getPath():``,e),r=this.getRootId(),a=await Qm(r,this.path);if(!a)throw Error(`File not found in IndexedDB`);await eh(r,this.path),await $m(r,n,a),_(i,u.getWorkspaceSync()??this.getWorkspace())}},sh=class e extends g{constructor(e,t){super(),this.path=Jm(e),this.parent=t}getPath(){return this.path}getName(){if(!this.path)return``;let e=this.path.split(`/`);return e[e.length-1]}getParent(){return this.parent}getRoot(){let e=this.getParent();return e?e.getRoot():this}getRootId(){let e=this.getRoot();return e instanceof ch?e.getRootId():``}async listChildren(t){let n=await ih(this.getRootId(),this.path),r=[];for(let t of n){let n=Ym(this.path,t.name);t.type===`dir`?r.push(new e(n,this)):r.push(new oh(n,this))}return r}async getResource(t,n){if(!t)throw Error(`No path provided`);let r=t.endsWith(`/`),a=t.split(`/`).filter(e=>e.trim()),o=this,s=!1;for(let t=0;t<a.length;t++){let c=a[t],l=t===a.length-1,d=Ym(o.getPath(),c),f=this.getRootId(),p=await Qm(f,d);if(!p){if(!n?.create)return null;if(l&&!r)return await $m(f,d,{type:`file`,content:new Blob([])}),s=!0,_(i,u.getWorkspaceSync()??this.getWorkspace()),new oh(d,o);await $m(f,d,{type:`dir`}),s=!0,o=new e(d,o);continue}if(l)return r?p.type===`dir`?new e(d,o):null:p.type===`dir`?new e(d,o):new oh(d,o);if(p.type!==`dir`)return null;o=new e(d,o)}return s&&_(i,u.getWorkspaceSync()??this.getWorkspace()),o}touch(){_(i,u.getWorkspaceSync()??this.getWorkspace())}async delete(t,n=!0){if(!t){let t=this.getParent();if(t instanceof e){await t.delete(this.getName());return}return}let r=Ym(this.path,t);await th(this.getRootId(),r),_(i,u.getWorkspaceSync()??this.getWorkspace())}async copyTo(e){for(let t of await this.listChildren(!1)){let n=[e,t.getName()].join(`/`);await t.copyTo(n)}}async rename(t){if(this.getName()===t)return;let n=this.getParent();if(!(n instanceof e))throw Error(`Cannot rename IndexedDB root directory`);let r=this.getPath(),a=Ym(n.getPath(),t);await rh(this.getRootId(),r,a),_(i,u.getWorkspaceSync()??this.getWorkspace())}},ch=class extends sh{constructor(e,t){super(``),this.displayName=e||`IndexedDB`,this.rootId=t}getRootId(){return this.rootId}getName(){return this.displayName}getParent(){}async rename(e){let t=String(e??``).trim();!t||t===this.displayName||(this.displayName=t,await u.updateFolderName(this,t))}};function lh(){return typeof crypto<`u`&&crypto.randomUUID?crypto.randomUUID():`default-`+Math.random().toString(36).slice(2)+Date.now().toString(36)}u.registerContribution({type:`indexeddb`,name:`idb`,canHandle(e){return e&&typeof e==`object`&&e.indexeddb===!0},async connect(e){await Km();let t=e.name&&String(e.name).trim();return new ch(t&&t.length>0?t:await qm(),lh())},async restore(e){if(e&&typeof e==`object`&&e.indexeddb===!0&&e.rootId)return await Km(),new ch(e.name&&String(e.name).trim()||`IndexedDB`,String(e.rootId))},async persist(e){return e instanceof ch?{indexeddb:!0,name:e.getName(),rootId:e.getRootId()}:null}});async function uh(e){return e instanceof ch?(await nh(e.getRootId()),!0):!1}var dh=m(`MarketplaceRegistry`),fh=`events/marketplaceregistry/changed`,ph=`marketplace.catalogUrls`,mh=new class{constructor(){this.catalogUrls=[],this.loadingPromises=new Map,this.loadCatalogUrls().then(()=>{this.refreshCatalogs().catch(e=>{dh.error(`Failed to refresh catalogs on init: ${e.message}`)})})}async loadCatalogUrls(){try{let e=await hm.get(ph);this.catalogUrls=Array.isArray(e)?e:[]}catch(e){dh.error(`Failed to load catalog URLs: ${e}`),this.catalogUrls=[]}}async saveCatalogUrls(){await hm.set(ph,this.catalogUrls),_(fh,{type:`catalogs`,urls:this.catalogUrls})}async addCatalogUrl(e){if(!this.isValidUrl(e))throw Error(`Invalid catalog URL: ${e}`);if(this.catalogUrls.includes(e)){dh.debug(`Catalog URL already exists: ${e}`);return}this.catalogUrls.push(e),await this.saveCatalogUrls(),dh.debug(`Added catalog URL: ${e}`);try{await this.refreshCatalogs()}catch(e){dh.warn(`Failed to refresh catalogs immediately after adding: ${e}`)}}async addCatalogUrls(e){let t=0;for(let n of e){if(!this.isValidUrl(n)){dh.warn(`Skipping invalid catalog URL: ${n}`);continue}this.catalogUrls.includes(n)||(this.catalogUrls.push(n),dh.debug(`Added catalog URL: ${n}`),t++)}if(t!==0){await this.saveCatalogUrls();try{await this.refreshCatalogs()}catch(e){dh.warn(`Failed to refresh catalogs after adding URLs: ${e}`)}}}async removeCatalogUrl(e){let t=this.catalogUrls.indexOf(e);t!==-1&&(this.catalogUrls.splice(t,1),await this.saveCatalogUrls(),dh.info(`Removed catalog URL: ${e}`))}getCatalogUrls(){return[...this.catalogUrls]}isValidUrl(e){try{let t=new URL(e);return t.protocol===`http:`||t.protocol===`https:`}catch{return!1}}async fetchCatalog(e){let t=this.loadingPromises.get(e);if(t)return t;let n=(async()=>{try{let t=await fetch(e,{method:`GET`,headers:{Accept:`application/json`}});if(!t.ok)throw Error(`HTTP ${t.status}: ${t.statusText}`);let n=await t.json();if(!n.extensions||!Array.isArray(n.extensions))throw Error(`Invalid catalog format: extensions array is required`);return{name:n.name,description:n.description,extensions:n.extensions||[]}}catch(t){throw dh.error(`Failed to fetch catalog from ${e}: ${t}`),t}finally{this.loadingPromises.delete(e)}})();return this.loadingPromises.set(e,n),n}async refreshCatalogs(){let e=this.catalogUrls.map(e=>this.fetchCatalog(e).catch(t=>(dh.warn(`Failed to refresh catalog ${e}: ${t.message}`),null))),t=await Promise.allSettled(e),n=0;t.forEach(e=>{if(e.status===`fulfilled`&&e.value){let t=e.value;t.extensions&&t.extensions.forEach(e=>{if(!Sm.getExtensions().find(t=>t.id===e.id)){let t={...e,external:!0};Sm.registerExtension(t),n++}})}}),dh.debug(`Refreshed ${this.catalogUrls.length} catalogs, ${n} extensions registered`),n>0&&dh.info(`Marketplace: ${n} new extension(s) available`),_(fh,{type:`refreshed`})}getMarketplaceExtension(e){let t=Sm.getExtensions().find(t=>t.id===e);if(t&&t.external)return t}isMarketplaceExtension(e){let t=Sm.getExtensions().find(t=>t.id===e);return t!==void 0&&t.external===!0}};c.put(`marketplaceRegistry`,mh);var $=m(`AppLoader`);function hh(e){if(!e)return`standard`;let t=e.layout??e.layoutId;return typeof t==`object`?t.id:t??`standard`}function gh(e){let t={};for(let[n,r]of Object.entries(e))t[n]=typeof r==`boolean`?r?`true`:`false`:r;return t}function _h(e){return e instanceof Error?e.message:String(e)}function vh(){let e=window.location.pathname.split(`/`).filter(Boolean);if(e.length===0)return;let t=e[0];if(!(!t||t===`index.html`||t.endsWith(`.html`)))return t}var yh=new class e{constructor(){this.apps=new Map,this.started=!1,this.container=document.body,this.systemRequiredExtensions=new Set}static{this.PREFERRED_APP_KEY=`preferredAppName`}static{this.PREFERRED_LAYOUT_KEY=`preferredLayoutId`}registerApp(e,t){if(t?.hostConfig===!0){let t={name:`@eclipse-docks/app`,version:`0.7.100`,description:`Default app template built on Eclipse Docks. Use as a starting point for downstream applications.`,dependencies:{"@eclipse-docks/core":`0.0.0`,"@eclipse-docks/extension-ai-system":`0.0.0`,"@eclipse-docks/extension-catalog":`0.0.0`,"@eclipse-docks/extension-command-palette":`0.0.0`,"@eclipse-docks/extension-command-shell":`0.0.0`,"@eclipse-docks/extension-cereusdb":`0.0.0`,"@eclipse-docks/extension-dataviewer":`0.0.0`,"@eclipse-docks/extension-duckdb":`0.0.0`,"@eclipse-docks/extension-github-service":`0.0.0`,"@eclipse-docks/extension-howto-system":`0.0.0`,"@eclipse-docks/extension-in-browser-ml":`0.0.0`,"@eclipse-docks/extension-linuxterminal":`0.0.0`,"@eclipse-docks/extension-md-editor":`0.0.0`,"@eclipse-docks/extension-media-viewer":`0.0.0`,"@eclipse-docks/extension-memory-usage":`0.0.0`,"@eclipse-docks/extension-monaco-editor":`0.0.0`,"@eclipse-docks/extension-notebook":`0.0.0`,"@eclipse-docks/extension-pglite":`0.0.0`,"@eclipse-docks/extension-plain-editor":`0.0.0`,"@eclipse-docks/extension-pwa":`0.0.0`,"@eclipse-docks/extension-python-runtime":`0.0.0`,"@eclipse-docks/extension-rag-system":`0.0.0`,"@eclipse-docks/extension-settings-tree":`0.0.0`,"@eclipse-docks/extension-sqleditor":`0.0.0`,"@eclipse-docks/extension-utils":`0.0.0`,"@eclipse-docks/extension-webdav":`0.0.0`,"@eclipse-docks/extension-webllm":`0.0.0`,"@eclipse-docks/extension-webmcp":`0.0.0`},marketplaceCatalogUrls:[`https://raw.githubusercontent.com/kispace-io/appspace-marketplace/main/catalogs/extensions.json`,`https://raw.githubusercontent.com/kispace-io/appspace-marketplace/main/catalogs/apps.json`]};e.name===void 0&&(e.name=t.name),e.version===void 0&&(e.version=t.version),e.description===void 0&&(e.description=t.description),e.dependencies===void 0&&(e.dependencies=t.dependencies),e.marketplaceCatalogUrls===void 0&&(e.marketplaceCatalogUrls=t.marketplaceCatalogUrls)}e.name=e.name??`app`,e.version=e.version??`0.0.0`,this.apps.has(e.name)&&$.warn(`App '${e.name}' is already registered. Overwriting.`),e.marketplaceCatalogUrls?.length&&mh.addCatalogUrls(e.marketplaceCatalogUrls).catch(()=>{}),this.apps.set(e.name,e),t?.defaultAppName&&(this.defaultAppName=t.defaultAppName),t?.container&&(this.container=t.container),t?.autoStart&&!this.started&&this.start()}registerSystemRequiredExtension(e){this.systemRequiredExtensions.add(e)}async start(){if(this.started){$.debug(`AppLoader already started`);return}this.started=!0;let e=new URLSearchParams(window.location.search).get(`appId`),t=vh();t&&$.info(`Extracted app ID from current page path: ${t}`);let n=await this.selectAppToLoad({appIdFromUrl:e,appIdFromPath:t});if(!n)throw Error(`No apps registered`);await this.loadApp(n,this.container)}findAppNameBySegment(e){if(this.apps.has(e))return e;for(let t of this.apps.values())if(t.path===e||t.name&&t.name.endsWith(`/`+e))return t.name??void 0}dispatchLoadProgress(e){window.dispatchEvent(new CustomEvent(`app-load-progress`,{detail:{message:e}}))}async loadApp(e,t){let n=this.apps.get(e);if(!n)throw Error(`App '${e}' not found. Make sure it's registered.`);if(this.dispatchLoadProgress(`Starting…`),this.currentApp&&($.info(`Disposing current app: ${this.currentApp.name}`),this.currentApp.dispose&&await this.currentApp.dispose(),this.currentApp.extensions&&this.currentApp.extensions.length>0&&($.info(`Disabling ${this.currentApp.extensions.length} extensions...`),this.currentApp.extensions.forEach(e=>{Sm.disable(e)}))),Wn.applyAppNameRemaps(n.remaps),n.remaps?.length){let e=new Set;for(let t of n.remaps)for(let n of t.targets)e.add(n);for(let t of e)_(Gn,{target:t,contributions:C.getContributions(t)})}n.contributions&&($.info(`Registering app contributions...`),n.contributions.ui&&(n.contributions.ui.forEach(e=>{let t=e.target;t&&C.registerContribution(t,e)}),$.info(`Registered ${n.contributions.ui.length} UI contributions`)),n.contributions.extensions&&(n.contributions.extensions.forEach(e=>{Sm.registerExtension(e)}),$.info(`Registered ${n.contributions.extensions.length} app extensions`)));let r=new Set(n.extensions||[]);this.systemRequiredExtensions.forEach(e=>r.add(e)),n.extensions=Array.from(r),this.dispatchLoadProgress(`Loading extensions…`),await Sm.loadEnabledExtensions(),n.extensions.length>0&&(this.dispatchLoadProgress(`Enabling extensions…`),await Promise.all(n.extensions.map(e=>Sm.enableAsync(e).catch(t=>{$.error(`Failed to load extension ${e}: ${_h(t)}`)})))),n.initialize&&(this.dispatchLoadProgress(`Initializing…`),$.info(`Initializing ${n.name}...`),await n.initialize()),this.currentApp=n,$.info(`App ${n.name} loaded successfully`),this.preferredLayoutId=await this.getPreferredLayoutId(),this.updateDocumentMetadata(n),t&&(this.dispatchLoadProgress(`Rendering layout…`),this.renderApp(t)),window.dispatchEvent(new CustomEvent(`app-loaded`,{detail:{appName:n.name}}))}updateDocumentMetadata(e){if(document.title=e.name??``,e.metadata?.favicon){let t=e.metadata.favicon,n=document.querySelector(`link[rel*='icon']`);n||(n=document.createElement(`link`),n.rel=`icon`,document.head.appendChild(n)),n.type=`image/svg+xml`,n.href=t}}renderApp(e){if(!this.currentApp)throw Error(`No app loaded. Call loadApp() first.`);let t=this.preferredLayoutId??hh(this.currentApp),n=C.getContributions(rm),r=n.find(e=>e.id===t);if(r||=($.warn(`Layout '${t}' not found, falling back to 'standard'`),n.find(e=>e.id===`standard`)),!r)throw Error(`No layout found for layoutId '${t}' and no 'standard' layout registered.`);let i=r.component,a={};i&&typeof i==`object`&&`tag`in i&&i.attributes&&(a={...i.attributes});let o=this.currentApp?.layout;if(typeof o==`object`&&o.id===t&&o.props&&Object.assign(a,gh(o.props)),e.innerHTML=``,typeof i==`string`){let t=document.createElement(i);for(let[e,n]of Object.entries(a))t.setAttribute(e,n);e.appendChild(t)}else if(i&&typeof i==`object`&&`tag`in i){let t=document.createElement(i.tag);for(let[e,n]of Object.entries(a))t.setAttribute(e,n);e.appendChild(t)}else if(typeof i==`function`)ct(i(),e);else throw Error(`Layout '${r.id}' has invalid component.`);r.onShow&&requestAnimationFrame(()=>{Promise.resolve(r.onShow()).catch(e=>$.error(`Layout onShow failed for '${r.id}': ${_h(e)}`))})}getCurrentApp(){return this.currentApp}getRegisteredApps(){return Array.from(this.apps.values())}async getPreferredAppId(){try{return await hm.get(e.PREFERRED_APP_KEY)}catch(e){$.debug(`Failed to get preferred app ID from settings: ${_h(e)}`);return}}async setPreferredAppId(t){if(!this.apps.has(t))throw Error(`App '${t}' not found. Make sure it's registered.`);try{await hm.set(e.PREFERRED_APP_KEY,t),this.defaultAppName=t,$.info(`Set preferred app to: ${t}`)}catch(e){throw $.error(`Failed to persist preferred app: ${_h(e)}`),e}}getRegisteredLayouts(){return C.getContributions(rm)}getCurrentLayoutId(){return this.preferredLayoutId??hh(this.currentApp)}async getPreferredLayoutId(){try{return await hm.get(e.PREFERRED_LAYOUT_KEY)}catch(e){$.debug(`Failed to get preferred layout ID: ${_h(e)}`);return}}async setPreferredLayoutId(t){if(!this.getRegisteredLayouts().some(e=>e.id===t))throw Error(`Layout '${t}' not found.`);try{await hm.set(e.PREFERRED_LAYOUT_KEY,t),this.preferredLayoutId=t,$.info(`Set preferred layout to: ${t}`),this.currentApp&&this.container&&this.renderApp(this.container),window.dispatchEvent(new CustomEvent(`layout-changed`,{detail:{layoutId:t}}))}catch(e){throw $.error(`Failed to persist preferred layout: ${_h(e)}`),e}}async selectAppToLoad(e){let{appIdFromUrl:t,appIdFromPath:n}=e;if(t){let e=this.findAppNameBySegment(t)??t;if(this.apps.has(e))return $.info(`Loading app specified by URL parameter 'appId': ${e}`),e;$.warn(`App '${t}' from URL parameter not found`)}if(n){let e=this.findAppNameBySegment(n);if(e)return $.info(`Loading app from URL path: ${n}`),e;$.debug(`App for path '${n}' not found, continuing search`)}let r=await this.getPreferredAppId();if(r&&this.apps.has(r))return $.info(`Loading preferred app from settings: ${r}`),r;if(this.defaultAppName&&this.apps.has(this.defaultAppName))return this.defaultAppName;this.defaultAppName&&$.warn(`Default app '${this.defaultAppName}' not found`);let i=this.getRegisteredApps();if(i.length>0)return i[0].name}};c.put(`appLoaderService`,yh);var bh=class extends jm{constructor(...e){super(...e),this.message=``,this.defaultValue=``,this.markdown=!1,this.inputValue=``}static{this.styles=[...jm.styles,y`
            wa-input {
                width: 100%;
            }
        `]}async firstUpdated(e){super.firstUpdated(e),this.inputValue=this.defaultValue,await this.updateComplete;let t=this.shadowRoot?.querySelector(`wa-input`);if(t){let e=t.shadowRoot?.querySelector(`input`);e&&(e.focus(),e.select())}}getResult(){return this.inputValue}handleInput(e){this.inputValue=e.target.value}handleKeyDown(e){e.key===`Enter`?(e.preventDefault(),this.dispatchEvent(new CustomEvent(`dialog-ok`,{bubbles:!0,composed:!0}))):e.key===`Escape`&&(e.preventDefault(),this.dispatchEvent(new CustomEvent(`dialog-cancel`,{bubbles:!0,composed:!0})))}render(){return b`
            ${this.renderMessage(this.message,this.markdown)}
            <wa-input
                value="${this.inputValue}"
                @input=${this.handleInput}
                @keydown=${this.handleKeyDown}
                autofocus
            ></wa-input>
        `}};Q([k({type:String})],bh.prototype,`message`,void 0),Q([k({type:String,attribute:`default-value`})],bh.prototype,`defaultValue`,void 0),Q([k({type:Boolean})],bh.prototype,`markdown`,void 0),Q([A()],bh.prototype,`inputValue`,void 0),bh=Q([O(`docks-prompt-dialog-content`)],bh),C.registerContribution(Nm,{id:`prompt`,label:`Input`,buttons:[Pm,Fm],component:e=>e?b`
            <docks-prompt-dialog-content 
                .message="${e.message}"
                .defaultValue="${e.defaultValue}"
                .markdown="${e.markdown}"
            ></docks-prompt-dialog-content>
        `:b`<div>Error: No prompt dialog state</div>`,onButton:async(e,t,n)=>(n&&(e===`ok`?n.resolve(t||``):n.resolve(null)),!0)});async function xh(e,t=``,n=!1){return new Promise(r=>{zm.open(`prompt`,{message:e,defaultValue:t,markdown:n,resolve:r})})}var Sh=class extends jm{constructor(...e){super(...e),this.message=``,this.markdown=!1}render(){return b`
            ${this.renderMessage(this.message,this.markdown)}
        `}};Q([k({type:String})],Sh.prototype,`message`,void 0),Q([k({type:Boolean})],Sh.prototype,`markdown`,void 0),Sh=Q([O(`docks-info-dialog-content`)],Sh),C.registerContribution(Nm,{id:`info`,label:`Information`,buttons:[Pm],component:e=>e?b`
            <docks-info-dialog-content 
                .message="${e.message}"
                .markdown="${e.markdown}"
            ></docks-info-dialog-content>
        `:b`<div>Error: No info dialog state</div>`,onButton:async(e,t,n)=>(n&&n.resolve&&n.resolve(),!0)});async function Ch(e,t,n=!1){return new Promise(r=>{zm.open(`info`,{title:e,message:t,markdown:n,resolve:r})})}var wh=class extends jm{constructor(...e){super(...e),this.message=``,this.markdown=!1}getResult(){return!1}render(){return b`
            ${this.renderMessage(this.message,this.markdown)}
        `}};Q([k({type:String})],wh.prototype,`message`,void 0),Q([k({type:Boolean})],wh.prototype,`markdown`,void 0),wh=Q([O(`docks-confirm-dialog-content`)],wh),C.registerContribution(Nm,{id:`confirm`,label:`Confirm`,buttons:[Pm,Fm],component:e=>e?b`
            <docks-confirm-dialog-content 
                .message="${e.message}"
                .markdown="${e.markdown}"
            ></docks-confirm-dialog-content>
        `:b`<div>Error: No confirm dialog state</div>`,onButton:async(e,t,n)=>(n&&(e===`ok`?n.resolve(!0):n.resolve(!1)),!0)});async function Th(e,t=!1){return new Promise(n=>{zm.open(`confirm`,{message:e,markdown:t,resolve:n})})}var Eh=class extends jm{constructor(...e){super(...e),this.title=``,this.message=``,this.markdown=!1,this.actions=[],this.currentTitle=``,this.currentMessage=``,this.dialogElement=null}async firstUpdated(e){super.firstUpdated(e),this.currentTitle=this.title,this.currentMessage=this.message,await this.updateComplete;let t=this.closest(`wa-dialog`);t&&(this.dialogElement=t,this.updateDialogLabel());let n=this.closest(`.dialog-service-content`);if(n){let e=n.parentElement?.querySelector(`.dialog-service-footer`);e&&(e.style.display=`none`)}}updated(e){super.updated(e),e.has(`title`)&&(this.currentTitle=this.title,this.updateDialogLabel()),e.has(`message`)&&(this.currentMessage=this.message)}updateDialogLabel(){this.dialogElement&&this.dialogElement.setAttribute(`label`,this.currentTitle)}updateDialog(e,t,n){this.currentTitle=e,this.currentMessage=t,this.actions=[...n],this.updateDialogLabel(),this.requestUpdate()}handleActionClick(e){e.callback()}handleClose(){this.closest(`wa-dialog`)&&this.resolveCallback&&this.resolveCallback()}static{this.styles=[...jm.styles,y`
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
        `]}render(){let e=this.actions.filter(e=>e.label!==`Close`),t=this.actions.filter(e=>e.label===`Close`);return b`
            <div class="dialog-content">
                <wa-scroller class="dialog-scroller">
                    ${this.renderMessage(this.currentMessage,this.markdown)}
                </wa-scroller>
                
                <div class="dialog-actions">
                    <div class="dialog-actions-left">
                        ${e.map(e=>b`
                            <wa-button 
                                variant="${e.variant||`default`}"
                                ?disabled=${e.disabled}
                                @click=${()=>this.handleActionClick(e)}
                            >
                                ${e.label}
                            </wa-button>
                        `)}
                    </div>
                    <div class="dialog-actions-right">
                        ${t.map(e=>b`
                            <wa-button 
                                variant="${e.variant||`primary`}"
                                @click=${()=>{this.handleActionClick(e),this.handleClose()}}
                            >
                                ${e.label}
                            </wa-button>
                        `)}
                    </div>
                </div>
            </div>
        `}};Q([k({type:String})],Eh.prototype,`title`,void 0),Q([k({type:String})],Eh.prototype,`message`,void 0),Q([k({type:Boolean})],Eh.prototype,`markdown`,void 0),Q([A()],Eh.prototype,`actions`,void 0),Q([A()],Eh.prototype,`currentTitle`,void 0),Q([A()],Eh.prototype,`currentMessage`,void 0),Eh=Q([O(`docks-navigable-info-dialog-content`)],Eh),C.registerContribution(Nm,{id:`navigable-info`,label:`Information`,buttons:[Im],component:e=>{if(!e)return b`<div>Error: No navigable info dialog state</div>`;let t=b`
            <docks-navigable-info-dialog-content 
                .title="${e.title}"
                .message="${e.message}"
                .markdown="${e.markdown}"
            ></docks-navigable-info-dialog-content>
        `;return(async()=>{let t=document.querySelector(`docks-navigable-info-dialog-content`);t&&(await t.updateComplete,t.actions=e.actions||[],t.resolveCallback=e.resolve,e.updateDialogRef&&(e.updateDialogRef.current=(e,n,r)=>{t.updateDialog(e,n,r)}))})(),t},onButton:async(e,t,n)=>n&&e===`close`&&n.resolve?(n.resolve(),!0):!1});var Dh=class extends jm{constructor(...e){super(...e),this.mode=`either`,this.selectedPath=null,this.rootNodes=[],this.loading=!1,this.loadError=null}static{this.styles=[...jm.styles,y`
      :host {
        min-width: 0;
        overflow-x: hidden;
        display: block;
      }

      .dialog-body {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        min-width: 0;
        min-height: 320px;
        max-height: 600px;
        overflow-x: hidden;
      }

      .browser-container {
        flex: 1;
        min-height: 240px;
        min-width: 0;
        overflow: hidden;
        overflow-x: hidden;
      }

      .browser-container wa-tree {
        min-width: 0;
        overflow-x: hidden;
      }

      .tree-label {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }

      .selection-info {
        font-size: 0.85em;
        opacity: 0.8;
      }
    `]}async doInitUI(){await this.loadWorkspaceTree()}firstUpdated(e){super.firstUpdated?.(e);let t=this.closest(`wa-dialog`);t&&t.setAttribute(`label`,this.dialogTitle)}updated(e){if(super.updated?.(e),e.has(`mode`)){let e=this.closest(`wa-dialog`);e&&e.setAttribute(`label`,this.dialogTitle)}}get dialogTitle(){return this.mode===`file`?`Choose a file`:this.mode===`directory`?`Choose a directory`:`Choose a file or directory`}getResult(){return this.selectedPath==null?null:`/`+this.selectedPath}async loadWorkspaceTree(){this.loading=!0,this.loadError=null;try{let e=await u.getWorkspace();if(!e){this.rootNodes=[];return}let t=await e.listChildren(!1),n=[];for(let e of t)n.push(await this.resourceToTreeNode(e,!1));n.sort((e,t)=>e.label.localeCompare(t.label)),this.rootNodes=n}catch(e){this.loadError=e instanceof Error?e.message:String(e),this.rootNodes=[]}finally{this.loading=!1}}async resourceToTreeNode(e,t=!0){let n=e instanceof f,r={resource:e,label:e.getName(),leaf:n,children:[]};if(e instanceof g&&t){for(let t of await e.listChildren(!1))r.children.push(await this.resourceToTreeNode(t,!1));r.children.sort((e,t)=>e.label.localeCompare(t.label))}return r}handleSelectionChange(e){let t=e.detail&&e.detail.selection||[];if(!t||t.length===0){this.selectedPath=null,this.requestUpdate();return}let n=t[0]?.model?.resource;if(!n){this.selectedPath=null,this.requestUpdate();return}let r=n instanceof g,i=n instanceof f;if(this.mode===`file`&&!i){this.selectedPath=null,this.requestUpdate();return}if(this.mode===`directory`&&i){let e=n.getParent?.();this.selectedPath=e?e.getWorkspacePath():null,this.requestUpdate();return}if(this.mode===`directory`&&!r){this.selectedPath=null,this.requestUpdate();return}let a=n.getWorkspacePath?.();this.selectedPath=typeof a==`string`?a:null,this.requestUpdate()}renderTreeNode(e){return b`
      <wa-tree-item .model=${e} ?leaf=${e.leaf}>
        ${e.label}
        ${e.children.map(e=>this.renderTreeNode(e))}
      </wa-tree-item>
    `}render(){return b`
      <div class="dialog-body">
        ${this.loadError?this.renderMessage(this.loadError,!1):null}

        <div class="browser-container">
          ${this.loading?b`<div>Loading workspace…</div>`:this.rootNodes.length>0?b`
                    <wa-tree @wa-selection-change=${e=>this.handleSelectionChange(e)}>
                      ${this.rootNodes.map(e=>this.renderTreeNode(e))}
                    </wa-tree>
                  `:b`<div>No workspace folders.</div>`}
        </div>

        <div class="selection-info">
          ${this.selectedPath?`Selected path: ${this.selectedPath}`:`No path selected yet.`}
        </div>
      </div>
    `}};Q([k({type:String})],Dh.prototype,`mode`,void 0),Q([A()],Dh.prototype,`selectedPath`,void 0),Q([A()],Dh.prototype,`rootNodes`,void 0),Q([A()],Dh.prototype,`loading`,void 0),Q([A()],Dh.prototype,`loadError`,void 0),Dh=Q([O(`docks-filebrowser-dialog`)],Dh),C.registerContribution(Nm,{id:`filebrowser-dialog`,label:`Select Path`,buttons:[Pm,Fm],component:e=>b`<docks-filebrowser-dialog .mode=${e?.mode??`either`}></docks-filebrowser-dialog>`,onButton:async(e,t,n)=>(n&&(e===`ok`?n.resolve(t||null):n.resolve(null)),!0)});function Oh(e=`either`){return new Promise(t=>{zm.open(`filebrowser-dialog`,{resolve:t,mode:e})})}function kh(e){let t=(e??``).trim();if(!t)return{name:``};let n=t.split(/\s+/);return n.length<=1?{name:t}:{name:n.pop(),library:n.join(` `)}}function Ah(e,t){let{name:n,library:r}=kh(e??``);return b`<wa-icon library=${r??x} name=${n} label=${t?.label??x} slot=${t?.slot??x}></wa-icon>`}var jh=150;function Mh(e,t,n,r,i){let a=`Toolbar ${e??`default`}`,o=n.filter(t=>t.slot===e&&r(t));return b`
        <wa-button-group orientation=${t} label=${a}>
            ${e===`start`?b`<slot name="start"></slot>`:e===`end`?b`<slot name="end"></slot>`:b`<slot></slot>`}
            ${o.map(i)}
        </wa-button-group>
    `}var Nh=class extends Am{constructor(...e){super(...e),this.position=`start`,this.orientation=`horizontal`,this.align=`start`,this.size=`small`,this.scopeTokens=[],this.partToolbarContent=void 0,this.partToolbarRenderer=void 0,this.contributions=[],this.compact=!1,this.resizeObserver=null,this.resizeDebounceTimer=null,this.overflowCheckScheduled=!1,this.onResize=()=>{this.resizeDebounceTimer!==null&&clearTimeout(this.resizeDebounceTimer),this.resizeDebounceTimer=setTimeout(()=>{this.resizeDebounceTimer=null,this.updateCompactFromSpace()},jh)}}updateCompactFromSpace(){let e=this.shadowRoot?.querySelector(`.toolbar-items`);if(!e)return;let t=e.scrollWidth>e.clientWidth;this.compact!==t&&(this.compact=t,this.requestUpdate())}scheduleOverflowCheck(){this.overflowCheckScheduled||(this.overflowCheckScheduled=!0,requestAnimationFrame(()=>{this.overflowCheckScheduled=!1,this.updateCompactFromSpace()}))}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(this.onResize),this.resizeObserver.observe(this)}disconnectedCallback(){this.resizeObserver?.disconnect(),this.resizeObserver=null,this.resizeDebounceTimer!==null&&(clearTimeout(this.resizeDebounceTimer),this.resizeDebounceTimer=null),super.disconnectedCallback()}updated(e){super.updated?.(e),this.compact||this.scheduleOverflowCheck(),e.has(`scopeTokens`)&&this.refreshContributions()}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===`id`&&t!==n&&this.refreshContributions()}doBeforeUI(){this.refreshContributions(),o(Gn,e=>{let t=this.getAttribute(`id`);t&&this.matchesTarget(t,e.target)&&(this.refreshContributions(),this.requestUpdate())})}refreshContributions(){let e=this.getAttribute(`id`);if(!e){this.contributions=[];return}this.loadContributions(e)}matchesTarget(e,t){if(t===e)return!0;if(!e.includes(`:`))return!1;let[n]=e.split(`:`);if(t===`${n}:*`)return!0;let r=t.split(`:`);if(r.length===2){let t=r[1];if(this.scopeTokens.includes(t))return e.startsWith(`${n}:`)}return!1}loadContributions(e){let t=C.getContributions(e);if(!e.includes(`:`)){this.contributions=t;return}let[n]=e.split(`:`),r=`${n}:*`,i=C.getContributions(r),a=[];for(let e of this.scopeTokens){let t=`${n}:${e}`,r=C.getContributions(t);a.push(...r)}this.contributions=[...i,...a,...t]}isToolbarItem(e){return`command`in e||`component`in e}contributionCreator(e){if(`command`in e){let t=e,n=!this.compact&&!!t.showLabel;return b`
                <wa-button @click=${()=>void this.executeCommand(t.command,t.params||{})}
                           title=${t.label}
                           ?disabled="${t.disabled?.get()}"
                           appearance="plain" size=${this.size}>
                    ${Ah(t.icon,{label:t.label})}
                    ${n?t.label:``}
                </wa-button>
            `}if(`component`in e){let t=e.component;return t instanceof Function?t():ad(t)}return b`<span>unknown contribution type: ${typeof e}</span>`}render(){let e=this.partToolbarRenderer?this.partToolbarRenderer():this.partToolbarContent?this.partToolbarContent:``,t=this.orientation===`vertical`?`column`:`row`,n={start:`flex-start`,center:`center`,end:`flex-end`},r=this.contributionCreator.bind(this),i=this.isToolbarItem.bind(this);return b`
            <div class="toolbar-items" style=${N({"flex-direction":t,"align-items":n[this.align],"justify-content":this.position})}>
                ${Mh(`start`,this.orientation,this.contributions,i,r)}
                ${e}
                ${Mh(void 0,this.orientation,this.contributions,i,r)}
                ${Mh(`end`,this.orientation,this.contributions,i,r)}
            </div>
        `}static{this.styles=y`
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
    `}};Q([k()],Nh.prototype,`position`,void 0),Q([k({reflect:!0})],Nh.prototype,`orientation`,void 0),Q([k({reflect:!0})],Nh.prototype,`align`,void 0),Q([k({reflect:!0})],Nh.prototype,`size`,void 0),Q([k({attribute:!1})],Nh.prototype,`scopeTokens`,void 0),Q([k({attribute:!1})],Nh.prototype,`partToolbarContent`,void 0),Q([k({attribute:!1})],Nh.prototype,`partToolbarRenderer`,void 0),Q([A()],Nh.prototype,`contributions`,void 0),Q([A()],Nh.prototype,`compact`,void 0),Nh=Q([O(`docks-toolbar`)],Nh);var Ph=class extends ir{constructor(...e){super(...e),this.cmd=``,this.title=``,this.label=!1,this.disabled=!1,this.appearance=`plain`,this.variant=`neutral`,this.size=`small`,this.params={},this.placement=`bottom-start`,this.dropdownContributions=[]}handleClick(e){if(!this.disabled){if(e&&e.stopPropagation(),this.action){this.action(e);return}if(this.cmd){let e=this.closest(`wa-dropdown`);e&&e.open!==void 0&&(e.open=!1),this.executeCommand(this.cmd,this.params)}}}handleSelect(e){let t=e.target;t&&t.open!==void 0&&(t.open=!1)}isInDropdown(){return!!this.closest(`wa-dropdown, wa-dropdown-menu`)}getKeybinding(){if(!this.cmd||this.action)return null;let e=km.getKeyBindingsForCommand(this.cmd);return e.length>0?e[0]:null}doBeforeUI(){this.dropdown&&(this.loadDropdownContributions(),o(Gn,e=>{this.dropdown&&e.target===this.dropdown&&(this.dropdownContributions=e.contributions,this.requestUpdate())}))}loadDropdownContributions(){this.dropdown&&(this.dropdownContributions=C.getContributions(this.dropdown),this.requestUpdate())}renderContribution(e){if(`command`in e){let t=e,n=t.disabled?.get();return b`
                <docks-command 
                    cmd="${t.command}"
                    icon="${t.icon||``}"
                    .params=${t.params||{}}
                    ?disabled="${n}">
                    ${t.label}
                </docks-command>
            `}if(`component`in e){let t=e.component;return t instanceof Function?t():ad(t)}return x}render(){let e=this.getKeybinding();return this.isInDropdown()?b`
                <wa-dropdown-item 
                    ?disabled=${this.disabled}
                    @click=${e=>this.handleClick(e)}>
                    ${Ah(this.icon,{label:this.title,slot:`icon`})}
                    <slot></slot>
                    ${e?b`<span class="keybinding">${e}</span>`:``}
                </wa-dropdown-item>
            `:this.dropdown?b`
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
                        title=${e?`${this.title} (${e})`:this.title}>
                        ${Ah(this.icon,{label:this.title,slot:`start`})}
                        <slot></slot>
                        ${this.label?this.title:x}
                    </wa-button>
                    
                    ${this.title?b`
                        <h6 style="padding: var(--wa-space-xs) var(--wa-space-s); margin: 0; color: var(--wa-color-neutral-50); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                            ${this.title}
                        </h6>
                    `:x}
                    
                    ${this.dropdownContributions.map(e=>this.renderContribution(e))}
                    
                    ${this.cmd?b`
                        <wa-divider></wa-divider>
                        <docks-command 
                            cmd="${this.cmd}"
                            icon="${this.icon||``}"
                            .params=${this.params}
                            ?disabled=${this.disabled}>
                            <slot></slot>
                            ${this.title}
                        </docks-command>
                    `:x}
                </wa-dropdown>
            `:b`
            <wa-button
                appearance=${this.appearance}
                variant=${this.variant}
                size=${this.size}
                ?disabled=${this.disabled}
                title=${e?`${this.title} (${e})`:this.title}
                @click=${e=>this.handleClick(e)}>
                ${Ah(this.icon,{label:this.title,slot:`start`})}
                <slot></slot>
            </wa-button>
        `}static{this.styles=y`
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
    `}};Q([k()],Ph.prototype,`cmd`,void 0),Q([k({type:Object,attribute:!1})],Ph.prototype,`action`,void 0),Q([k()],Ph.prototype,`title`,void 0),Q([k()],Ph.prototype,`label`,void 0),Q([k()],Ph.prototype,`icon`,void 0),Q([k({type:Boolean})],Ph.prototype,`disabled`,void 0),Q([k()],Ph.prototype,`appearance`,void 0),Q([k()],Ph.prototype,`variant`,void 0),Q([k()],Ph.prototype,`size`,void 0),Q([k({type:Object,attribute:!1})],Ph.prototype,`params`,void 0),Q([k()],Ph.prototype,`dropdown`,void 0),Q([k()],Ph.prototype,`placement`,void 0),Q([A()],Ph.prototype,`dropdownContributions`,void 0),Ph=Q([O(`docks-command`)],Ph);var Fh=class extends Am{constructor(...e){super(...e),this.scopeTokens=[],this.partContextMenuRenderer=void 0,this.contributions=[],this.isOpen=!1,this.position={x:0,y:0},this.anchorRef=Vp(),this.dropdownRef=Vp(),this.boundHandleDocumentPointerDown=this.handleDocumentPointerDown.bind(this)}handleDocumentPointerDown(e){if(!this.isOpen)return;let t=e.composedPath();this.dropdownRef.value&&t.includes(this.dropdownRef.value)||t.some(e=>e.getAttribute?.(`part`)===`submenu`)||this.onClose()}doBeforeUI(){this.refreshContributions(),o(Gn,e=>{let t=this.getAttribute(`id`);t&&this.matchesTarget(t,e.target)&&(this.refreshContributions(),this.requestUpdate())})}updated(e){super.updated?.(e),e.has(`scopeTokens`)&&this.refreshContributions()}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===`id`&&t!==n&&this.refreshContributions()}refreshContributions(){let e=this.getAttribute(`id`);if(!e){this.contributions=[];return}this.loadContributions(e)}matchesTarget(e,t){if(t===e)return!0;if(!e.includes(`:`))return!1;let[n]=e.split(`:`);if(t===`${n}:*`)return!0;let r=t.split(`:`);if(r.length===2){let t=r[1];if(this.scopeTokens.includes(t))return e.startsWith(`${n}:`)}return!1}loadContributions(e){let t=C.getContributions(e);if(!e.includes(`:`)){this.contributions=t;return}let[n]=e.split(`:`),r=`${n}:*`,i=C.getContributions(r),a=[];for(let e of this.scopeTokens){let t=`${n}:${e}`,r=C.getContributions(t);a.push(...r)}this.contributions=[...i,...a,...t]}hasMenuBody(){return this.refreshContributions(),this.contributions.length>0?!0:(this.partContextMenuRenderer?this.partContextMenuRenderer():x)!==x}getElementFromPoint(e,t){let n=document.elementFromPoint(e,t);if(!n)return null;for(;n;){let r=n.shadowRoot;if(r){let i=r.elementFromPoint(e,t);if(i&&i!==n){n=i;continue}}break}return n}triggerClickUnderCursor(e){let t=this.getElementFromPoint(e.clientX,e.clientY);if(t){let n=new MouseEvent(`click`,{bubbles:!0,cancelable:!0,view:window,clientX:e.clientX,clientY:e.clientY,screenX:e.screenX,screenY:e.screenY,button:0,buttons:0,detail:1,which:1});t.dispatchEvent(n)}}show(e,t){return this.hasMenuBody()?(t&&this.triggerClickUnderCursor(t),this.position=e,this.isOpen=!0,this.updateComplete.then(()=>{document.addEventListener(`pointerdown`,this.boundHandleDocumentPointerDown,{capture:!0})}),!0):!1}onClose(){this.isOpen=!1,document.removeEventListener(`pointerdown`,this.boundHandleDocumentPointerDown,{capture:!0})}renderContribution(e){if(`command`in e){let t=e,n=t.disabled?.get();return b`
                <docks-command
                    cmd="${t.command}"
                    icon="${t.icon??``}"
                    .params=${t.params??{}}
                    ?disabled="${n}">
                    ${t.label}
                </docks-command>
            `}else if(`component`in e){let t=e.component;return t instanceof Function?t():ad(t)}return x}render(){if(!this.isOpen)return x;let e=this.partContextMenuRenderer?this.partContextMenuRenderer():x;return b`
            <wa-dropdown
                ${Wp(this.dropdownRef)}
                ?open=${this.isOpen}
                @wa-after-hide=${this.onClose}>
                
                <div 
                    slot="trigger"
                    ${Wp(this.anchorRef)}
                    style="position: fixed; 
                           left: ${this.position.x}px; 
                           top: ${this.position.y}px; 
                           width: 1px; 
                           height: 1px; 
                           pointer-events: none;">
                </div>
                
                ${e}
                ${this.contributions.map(e=>this.renderContribution(e))}
            </wa-dropdown>
        `}static{this.styles=y`
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
    `}};Q([k({attribute:!1})],Fh.prototype,`scopeTokens`,void 0),Q([k({attribute:!1})],Fh.prototype,`partContextMenuRenderer`,void 0),Q([A()],Fh.prototype,`contributions`,void 0),Q([A()],Fh.prototype,`isOpen`,void 0),Q([A()],Fh.prototype,`position`,void 0),Fh=Q([O(`docks-contextmenu`)],Fh);var Ih=class extends Am{},Lh=class e extends Ih{constructor(...e){super(...e),this.scrollMode=`scroller`,this.dirty=!1,this.isEditor=!1,this.onContentContextMenu=e=>{let t=this.renderRoot.querySelector(`docks-contextmenu`);t&&t.show({x:e.clientX,y:e.clientY},e)&&e.preventDefault()}}getCommandStack(){return this.commandStack}renderToolbar(){return x}activateContainingTab(){let e=this,t=null,n=null;for(;e;){let r=e.tagName?.toLowerCase();if(r===`wa-tab-panel`&&(t=e.getAttribute(`name`)),r===`docks-tabs`){n=e;break}let i=e.parentElement;if(i)e=i;else{let t=e.getRootNode();e=t instanceof ShadowRoot?t.host:null}}n&&t!=null&&t!==``&&n.activate(t)}renderContextMenu(){return x}renderContent(){return x}getToolbarTarget(){let e=this.tabContribution?.editorId??this.id??this.tabContribution?.name;return e?`toolbar:${e}`:void 0}getContextMenuTarget(){let e=this.tabContribution?.editorId??this.id??this.tabContribution?.name;return e?`contextmenu:${e}`:void 0}syncIsEditorCapability(){let t=this.save!==e.prototype.save;t!==this.isEditor&&(this.isEditor=t)}maybeActivateForCoupledEditors(){let t=this.tabContribution?.coupledEditors;if(!t?.length)return;let n=qn.get();if(!(n instanceof e))return;let r=n.tabContribution?.editorId;!r||!t.includes(r)||this.activateContainingTab()}render(){let e=this.getToolbarTarget(),t=this.getContextMenuTarget(),n=this.tabContribution?.toolbar!==!1,r=this.tabContribution?.contextMenu!==!1,i=this.scrollMode,a=this.isEditor?[`system.editors`,`.system.editors`]:[],o=this.renderContent(),s=i===`scroller`?b`
                <wa-scroller class="part-content-scroll" orientation="vertical">
                    <div class="part-content-inner">${o}</div>
                </wa-scroller>
            `:b`<div class="part-content-inner">${o}</div>`;return b`
            <div class="part-shell">
                ${n?b`
                    <docks-toolbar
                        class="part-toolbar"
                        id=${P(e)}
                        .scopeTokens=${a}
                        .partToolbarRenderer=${()=>this.renderToolbar()}>
                    </docks-toolbar>
                `:x}
                <div class="part-content ${i===`native`?`native-scroll`:``}" @contextmenu=${r?this.onContentContextMenu:void 0}>
                    ${s}
                </div>
                ${r?b`
                    <docks-contextmenu
                        id=${P(t)}
                        .scopeTokens=${a}
                        .partContextMenuRenderer=${()=>this.renderContextMenu()}>
                    </docks-contextmenu>
                `:x}
            </div>
        `}updated(e){super.updated(e),this.syncIsEditorCapability(),e.has(`tabContribution`)&&this.maybeActivateForCoupledEditors(),e.has(`dirty`)&&e.get(`dirty`)!==void 0&&this.dispatchEvent(new CustomEvent(`dirty`,{detail:this.dirty,bubbles:!0}))}doClose(){}disconnectedCallback(){super.disconnectedCallback()}close(){this.doClose()}connectedCallback(){super.connectedCallback(),this.syncIsEditorCapability(),queueMicrotask(()=>this.syncIsEditorCapability()),this.watch(qn,()=>this.maybeActivateForCoupledEditors())}save(){}isDirty(){return this.dirty}markDirty(e){this.dirty=e,Jn.set(null),Jn.set(this),Kn.set(null),Kn.set(this)}static{this.baseStyles=y`
        :host {
            display: block;
        }

        .part-shell {
            display: grid;
            grid-template-rows: auto minmax(0, 1fr);
            height: 100%;
            width: 100%;
            position: relative;
            overflow: hidden;
        }

        .part-content {
            min-height: 0;
            overflow: hidden;
            position: relative;
        }

        .part-content.native-scroll {
            overflow: auto;
        }

        .part-content-scroll {
            width: 100%;
            height: 100%;
        }

        .part-content-inner {
            height: 100%;
            min-height: 100%;
        }

        .part-toolbar {
            min-height: 0;
        }
    `}static finalizeStyles(t){let n=super.finalizeStyles(t);return[e.baseStyles,...n]}};Q([k()],Lh.prototype,`dirty`,void 0),Q([k({attribute:!1})],Lh.prototype,`tabContribution`,void 0),Q([k({type:Boolean,attribute:!1})],Lh.prototype,`isEditor`,void 0);var Rh,zh=class extends Ih{static{Rh=this}constructor(...e){super(...e),this.placement=`top`,this.iconOnly=!1,this.withToolbar=!1,this.contributions=[],this.tabGroup=Vp(),this.containerId=null,this.tabGroupListenersAttached=!1}doBeforeUI(){if(this.containerId=this.getAttribute(`id`),!this.containerId)throw Error(`docks-tabs requires an 'id' attribute to function`);this.loadAndResolveContributions()}doInitUI(){this.updateComplete.then(()=>this.ensureTabGroupListenersAndActivate()),o(Gn,e=>{if(!this.containerId)return;let t=`${this.containerId}-toolbar`;e.target!==t&&e.target===this.containerId&&(this.loadAndResolveContributions(),this.requestUpdate(),this.updateComplete.then(()=>{this.activateNextAvailableTab()}))})}updated(e){super.updated(e),this.contributions.length>0&&this.tabGroup.value&&this.updateComplete.then(()=>this.ensureTabGroupListenersAndActivate()),e.has(`contributions`)&&(this.contributions.length===0&&(this.tabGroupListenersAttached=!1),this.contributions.forEach(e=>{let t=this.getTabPanel(e.name);if(!t)return;let n=this.getPartFromPanel(t);n&&(n.tabContribution=e)}))}has(e){return this.tabGroup.value?!!this.getTabPanel(e):!1}activate(e){if(!this.tabGroup.value)return;this.tabGroup.value.setAttribute(`active`,e);let t=this.getTabPanel(e);t&&this.syncActiveSignalsFromPanel(t)}getActiveEditor(){return this.tabGroup.value?this.tabGroup.value.getAttribute(`active`):null}open(e){if(this.contributions.find(t=>t.name===e.name)){this.activate(e.name);return}this.contributions.push(e),this.requestUpdate(),this.updateComplete.then(()=>{requestAnimationFrame(()=>{let t=this.getTabPanel(e.name);if(!t)return;let n=this.getPartFromPanel(t);n&&(n.tabContribution=e),this.activate(e.name)})})}handleTabAuxClick(e,t){e.button===um.MIDDLE&&t.closable&&this.closeTab(e,t.name)}async closeTab(e,t){if(e.stopPropagation(),this.isDirty(t)&&!await Th(`Unsaved changes will be lost: Do you really want to close?`))return;let n=this.getTabPanel(t);if(!n)return;let r=this.contributions.find(e=>e.name===t);if(!r)return;this.cleanupTabInstance(n),this.clearActiveSignalsIfPartInPanel(n);let i=this.contributions.indexOf(r);i>-1&&this.contributions.splice(i,1),this.requestUpdate(),this.updateComplete.then(()=>{this.activateNextAvailableTab()})}markDirty(e,t){let n=this.getTab(e);n&&n.classList.toggle(`part-dirty`,t)}isDirty(e){let t=this.getTab(e);return!!t&&t.classList.contains(`part-dirty`)}loadAndResolveContributions(){this.containerId&&(this.contributions=C.getContributions(this.containerId),this.requestUpdate())}cleanupTabInstance(e){let t=this.getPartFromPanel(e);t&&`close`in t&&typeof t.close==`function`&&t.close()}ensureTabGroupListenersAndActivate(){if(!this.tabGroup.value||this.tabGroupListenersAttached)return;this.tabGroupListenersAttached=!0;let e=this.tabGroup.value;e.addEventListener(`wa-tab-show`,e=>{let t=this.getTabPanel(e.detail.name);t&&this.syncActiveSignalsFromPanel(t)}),e.addEventListener(`click`,e=>{let t=e.target,n=t.closest(`wa-tab`);if(n){let e=n.getAttribute(`panel`);if(e){let t=this.getTabPanel(e);t&&this.syncActiveSignalsFromPanel(t)}return}let r=t.closest(`wa-tab-panel`);r&&this.syncActiveSignalsFromPanel(r)}),this.dirtySignalCleanup?.(),this.dirtySignalCleanup=nr(Jn,e=>{if(!e)return;let t=e.closest(`wa-tab-panel`);if(!t)return;let n=t.getAttribute(`name`);n&&this.markDirty(n,e.isDirty())}),this.activateNextAvailableTab()}disconnectedCallback(){this.dirtySignalCleanup?.(),this.dirtySignalCleanup=void 0,super.disconnectedCallback()}activateNextAvailableTab(){if(!this.tabGroup.value)return;let e=this.tabGroup.value.querySelectorAll(`wa-tab`);if(e.length>0){let t=e.item(0).getAttribute(`panel`);t&&this.tabGroup.value.setAttribute(`active`,t)}else this.tabGroup.value.removeAttribute(`active`)}getTabPanel(e){return this.tabGroup.value?this.tabGroup.value.querySelector(`wa-tab-panel[name='${e}']`):null}getTab(e){return this.tabGroup.value?this.tabGroup.value.querySelector(`wa-tab[panel='${e}']`):null}syncActiveSignalsFromPanel(e){let t=this.getPartFromPanel(e);t instanceof Lh&&(Kn.set(null),Kn.set(t),this.containerId===`editor-area-main`&&t.isEditor&&(qn.set(null),qn.set(t)))}clearActiveSignalsIfPartInPanel(e){let t=Array.from(e.querySelectorAll(`*`)).filter(e=>e instanceof Lh);for(let e of t)Kn.get()===e&&Kn.set(null),qn.get()===e&&qn.set(null)}getPartFromPanel(e){let t=e.firstElementChild;return t instanceof Lh?t:null}static{this.MAX_TAB_LABEL=16}truncateTabLabel(e){if(!e||e.length<=Rh.MAX_TAB_LABEL)return e;let t=Rh.MAX_TAB_LABEL-1,n=Math.floor(t/2);return e.slice(0,n)+`…`+e.slice(-(t-n))}withToolbarOrientation(){return this.placement===`start`||this.placement===`end`?`vertical`:`horizontal`}renderEmptyState(){let e=yh.getCurrentApp();return b`
            <div class="empty-state">
                ${qd(e,()=>b`
                        <div class="empty-content">
                            <h2 class="empty-title">${e.name}</h2>
                            ${qd(e.description,()=>b`<p class="empty-description">${e.description}</p>`)}
                        </div>
                    `,()=>b`<wa-icon name="folder-open" class="empty-icon"></wa-icon>`)}
            </div>
        `}render(){if(this.contributions.length===0)return this.renderEmptyState();let e=this.containerId?`${this.containerId}-toolbar`:``;return b`
            <wa-tab-group ${Wp(this.tabGroup)} placement=${this.placement}>
                ${Kp(this.contributions,e=>e.name,e=>{let t=e.label??e.name,n=this.truncateTabLabel(t);return b`
                        <wa-tab panel="${e.name}"
                                title="${t}"
                                @auxclick="${t=>this.handleTabAuxClick(t,e)}">
                            ${Ah(e.icon,{label:t})}
                            ${this.iconOnly?x:n}
                            ${qd(e.closable,()=>b`
                                <wa-icon name="xmark" label="Close"  @click="${t=>this.closeTab(t,e.name)}"></wa-icon>
                            `)}
                        </wa-tab>
                        <wa-tab-panel name="${e.name}">
                            ${e.component?e.component(e.name):x}
                        </wa-tab-panel>
                    `})}
                ${this.withToolbar&&e?b`
                        <div class="nav-toolbar-spacer" slot="nav" aria-hidden="true"></div>
                        <docks-toolbar
                            slot="nav"
                            id=${e}
                            orientation=${this.withToolbarOrientation()}
                            align="center"
                            size="large"
                        ></docks-toolbar>
                    `:x}
            </wa-tab-group>
        `}static{this.styles=y`
        :host {
            height: 100%;
            width: 100%;
        }

        wa-tab-group {
            height: 100%;
            width: 100%;
            min-height: 0;
        }

        :host(:is([placement="top"], [placement="bottom"])) wa-tab-group::part(base) {
            display: grid;
            grid-template-rows: auto minmax(0, 1fr);
            height: 100%;
            width: 100%;
        }

        :host(:is([placement="start"], [placement="end"])) wa-tab-group::part(base) {
            height: 100%;
            width: 100%;
            min-height: 0;
        }

        wa-tab-panel[active] {
            display: grid;
            grid-template-rows: minmax(0, 1fr);
            height: 100%;
            width: 100%;
            overflow: hidden;
            position: relative;
        }

        wa-tab-panel > * {
            width: 100%;
            height: 100%;
            min-height: 0;
        }

        wa-tab::part(base) {
            padding: 3px 0.5rem;
        }

        :host([icon-only]) wa-tab::part(base) {
            justify-content: center;
        }

        :host([icon-only]:is([placement="top"], [placement="bottom"])) wa-tab::part(base) {
            padding: var(--wa-space-s);
        }

        :host([icon-only]:is([placement="start"], [placement="end"])) wa-tab::part(base) {
            padding-inline: 0;
            padding-block: var(--wa-space-s);
        }

        :host([icon-only]) wa-tab wa-icon {
            font-size: var(--wa-font-size-l);
        }

        :host([icon-only]:is([placement="start"], [placement="end"])) wa-tab-group::part(nav),
        :host([icon-only]:is([placement="start"], [placement="end"])) wa-tab-group::part(tabs) {
            padding: 0;
            margin: 0;
        }

        :host([icon-only]:is([placement="start"], [placement="end"])) wa-tab-group::part(nav) {
            flex: 0 0 auto;
        }

        :host([with-toolbar]) .nav-toolbar-spacer {
            flex: 1 1 auto;
            min-height: 0;
            min-width: 0;
            pointer-events: none;
        }

        :host([with-toolbar]:is([placement="start"], [placement="end"])) wa-tab-group::part(nav) {
            display: grid;
            grid-template-rows: 1fr;
            height: 100%;
            min-height: 0;
        }

        :host([with-toolbar]:is([placement="start"], [placement="end"])) wa-tab-group::part(tabs) {
            display: flex;
            flex-direction: column;
            min-height: 0;
            height: 100%;
            flex: 1 1 auto;
            align-self: stretch;
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
    `}};Q([k({reflect:!0})],zh.prototype,`placement`,void 0),Q([k({type:Boolean,reflect:!0,attribute:`icon-only`})],zh.prototype,`iconOnly`,void 0),Q([k({type:Boolean,reflect:!0,attribute:`with-toolbar`})],zh.prototype,`withToolbar`,void 0),Q([A()],zh.prototype,`contributions`,void 0),zh=Rh=Q([O(`docks-tabs`)],zh);var Bh,Vh=class extends Am{static{Bh=this}constructor(...e){super(...e),this.orientation=`horizontal`,this.gridSizes=[],this.gridChildren=[],this.resizing=null,this.resizeOverlay=null,this.childrenLoaded=!1,this.childStylesApplied=!1,this.settingsLoaded=!1,this.handleResize=e=>{if(!this.resizing)return;let t=(this.orientation===`horizontal`?e.clientX:e.clientY)-this.resizing.startPos,n=[...this.resizing.startSizes];n[this.resizing.handleIndex]+=t,n[this.resizing.handleIndex+1]-=t;let r=this.orientation===`horizontal`?this.offsetWidth:this.offsetHeight,i=r*.05;if(n[this.resizing.handleIndex]>=i&&n[this.resizing.handleIndex+1]>=i){this.resizing.currentSizes=n;let e=n.map((e,t)=>{let i=`${(e/r*100).toFixed(2)}%`;return t===n.length-1?i:`${i} ${Bh.HANDLE_VISUAL_SIZE_PX}px`}).join(` `);this.orientation===`horizontal`?this.style.gridTemplateColumns=e:this.style.gridTemplateRows=e}},this.stopResize=async()=>{if(this.resizing?.currentSizes){let e=this.orientation===`horizontal`?this.offsetWidth:this.offsetHeight;this.gridSizes=this.resizing.currentSizes.map(t=>`${(t/e*100).toFixed(2)}%`),await this.saveSizes(),this.requestUpdate()}this.resizeOverlay&&=(document.body.removeChild(this.resizeOverlay),null),this.resizing=null,document.removeEventListener(`mousemove`,this.handleResize),document.removeEventListener(`mouseup`,this.stopResize),document.body.style.cursor=``,document.body.style.userSelect=``}}static{this.HANDLE_VISUAL_SIZE_PX=1}static{this.HANDLE_HITBOX_PADDING_PX=4}createRenderRoot(){return this}doBeforeUI(){this.childrenLoaded||(this.mutationObserver=new MutationObserver(()=>{this.childrenLoaded||this.loadChildren()}),this.mutationObserver.observe(this,{childList:!0,subtree:!1}),this.loadChildren())}async loadChildren(){let e=Array.from(this.children).filter(e=>e.tagName!==`STYLE`&&e.tagName!==`SCRIPT`&&!e.classList.contains(`resize-handle`));if(e.length!==0){if(this.childrenLoaded=!0,this.mutationObserver&&=(this.mutationObserver.disconnect(),void 0),this.gridChildren=e,!this.settingsLoaded){this.settingsLoaded=!0;let e=await this.getDialogSetting();if(e&&Array.isArray(e.sizes)&&e.sizes.length===this.gridChildren.length){this.gridSizes=e.sizes,this.requestUpdate();return}}if(this.sizes)this.gridSizes=this.sizes.split(`,`).map(e=>e.trim());else{let e=`${100/this.gridChildren.length}%`;this.gridSizes=this.gridChildren.map(()=>e)}this.requestUpdate()}}async saveSizes(){this.gridSizes.length!==0&&await this.setDialogSetting({sizes:this.gridSizes,orientation:this.orientation})}updated(e){super.updated(e),e.has(`gridChildren`)&&!this.childStylesApplied&&this.gridChildren.length>0&&(this.childStylesApplied=!0,this.gridChildren.forEach((e,t)=>{e.style.overflow=`hidden`,e.style.height=`100%`,e.style.width=`100%`,e.style.gridColumn=this.orientation===`horizontal`?`${t*2+1}`:`1`,e.style.gridRow=this.orientation===`vertical`?`${t*2+1}`:`1`,e.style.display=`flex`,e.style.flexDirection=`column`}))}startResize(e,t){if(e.preventDefault(),t>=this.gridChildren.length-1)return;let n=this.orientation===`horizontal`?e.clientX:e.clientY,r=this.orientation===`horizontal`?this.offsetWidth:this.offsetHeight;this.resizing={handleIndex:t,startPos:n,startSizes:this.gridSizes.map(e=>e.endsWith(`%`)?parseFloat(e)/100*r:(e.endsWith(`px`),parseFloat(e)))},this.resizeOverlay=document.createElement(`div`),this.resizeOverlay.style.position=`fixed`,this.resizeOverlay.style.top=`0`,this.resizeOverlay.style.left=`0`,this.resizeOverlay.style.width=`100%`,this.resizeOverlay.style.height=`100%`,this.resizeOverlay.style.zIndex=`9999`,this.resizeOverlay.style.cursor=this.orientation===`horizontal`?`col-resize`:`row-resize`,document.body.appendChild(this.resizeOverlay),document.addEventListener(`mousemove`,this.handleResize),document.addEventListener(`mouseup`,this.stopResize),document.body.style.cursor=this.orientation===`horizontal`?`col-resize`:`row-resize`,document.body.style.userSelect=`none`}render(){if(this.gridChildren.length===0||this.gridSizes.length===0)return x;let e=this.gridSizes.flatMap((e,t)=>t===this.gridSizes.length-1?[e]:[e,`${Bh.HANDLE_VISUAL_SIZE_PX}px`]).join(` `);return this.style.display=`grid`,this.orientation===`horizontal`?(this.style.gridTemplateColumns=e,this.style.gridTemplateRows=`100%`):(this.style.gridTemplateColumns=`100%`,this.style.gridTemplateRows=e),this.style.overflow=`hidden`,b`
            <style>
                .resize-handle {
                    position: relative;
                    z-index: 10;
                    background-color: var(--wa-color-neutral-border-quiet);
                    transition: background-color var(--wa-transition-fast);
                }

                .resize-handle::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                }

                .resize-handle.horizontal::before {
                    right: -${Bh.HANDLE_HITBOX_PADDING_PX}px;
                    left: -${Bh.HANDLE_HITBOX_PADDING_PX}px;
                }

                .resize-handle.vertical::before {
                    top: -${Bh.HANDLE_HITBOX_PADDING_PX}px;
                    bottom: -${Bh.HANDLE_HITBOX_PADDING_PX}px;
                }
                
                .resize-handle:hover {
                    background-color: var(--wa-color-brand-fill-normal);
                }
            </style>
            
            ${this.gridChildren.map((e,t)=>{if(t<this.gridChildren.length-1){let e=this.orientation===`horizontal`?`${t*2+2}`:`1`,n=this.orientation===`vertical`?`${t*2+2}`:`1`;return b`
                        <div 
                            class="resize-handle ${this.orientation===`horizontal`?`horizontal`:`vertical`}"
                            style="
                                cursor: ${this.orientation===`horizontal`?`col-resize`:`row-resize`};
                                grid-column: ${e};
                                grid-row: ${n};
                            "
                            @mousedown=${e=>this.startResize(e,t)}
                        ></div>
                    `}return x})}
        `}disconnectedCallback(){super.disconnectedCallback(),this.resizing&&this.stopResize(),this.mutationObserver&&=(this.mutationObserver.disconnect(),void 0)}connectedCallback(){super.connectedCallback(),this.style.height=`100%`,this.style.width=`100%`}};Q([k()],Vh.prototype,`orientation`,void 0),Q([k()],Vh.prototype,`sizes`,void 0),Q([A()],Vh.prototype,`gridSizes`,void 0),Q([A()],Vh.prototype,`gridChildren`,void 0),Vh=Bh=Q([O(`docks-resizable-grid`)],Vh);var Hh=class extends ir{constructor(...e){super(...e),this.message=`No content.`,this.icon=`info-circle`}render(){return b`
            <div class="empty" role="status">
                <div class="empty-icon-wrap" aria-hidden="true">
                    <wa-icon name=${this.icon} label=""></wa-icon>
                </div>
                <p class="empty-message">${this.message}</p>
            </div>
        `}static{this.styles=y`
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: var(--wa-space-xl) var(--wa-space-l);
        }

        .empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: var(--wa-space-m);
            max-width: min(28rem, 100%);
            text-align: center;
        }

        .empty-icon-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
            color: var(--wa-color-neutral-40);
        }

        .empty-icon-wrap wa-icon {
            font-size: 2rem;
            opacity: 0.9;
        }

        .empty-message {
            margin: 0;
            font-size: var(--wa-font-size-s);
            font-weight: 400;
            line-height: 1.5;
            color: var(--wa-color-neutral-60);
        }
    `}};Q([k()],Hh.prototype,`message`,void 0),Q([k()],Hh.prototype,`icon`,void 0),Hh=Q([O(`docks-no-content`)],Hh);var Uh=`language`;function Wh(e,t){return t?e.replace(/\{(\w+)\}/g,(e,n)=>t[n]===void 0?e:t[n]):e}var Gh=new Set([`en`]),Kh=Rn(Gh),qh=null;function Jh(e){let t=!1;for(let n of e){let e=n.toLowerCase().replace(`-`,`_`);Gh.has(e)||(Gh.add(e),t=!0)}if(t&&(Kh.set(new Set(Gh)),qh===null)){let e=Yh();e!==Xh.get()&&Xh.set(e)}}function Yh(){let e=navigator.languages?.length?navigator.languages:[navigator.language||`en`],t=Kh.get();for(let n of e){let e=n.split(`-`)[0].toLowerCase();if(t.has(e))return e}return`en`}var Xh=Rn(Yh());async function Zh(){let e=await hm.get(Uh);qh=e??null,Xh.set(e||Yh())}o(pm,e=>{qh=e?.language??null,Xh.set(e?.language||Yh())}),Zh();async function Qh(e,t=!1){let n={};await Promise.all(Object.entries(e).map(async([e,t])=>{let r=await t(),i=r&&`default`in r?r.default:r,a=(e.match(/\.([a-zA-Z-_]+)\.json$/)?.[1]??`en`).toLowerCase().replace(`-`,`_`);n[a]=i})),Jh(Object.keys(n));let r=e=>{let[t,r]=Xh.get().toLowerCase().replace(`-`,`_`).split(`_`),i=r?[`${t}_${r}`,t]:[t];i.push(`en`);for(let t of i){let r=n[t];if(r&&e in r)return r[e]}return e},i=Object.assign({},{then:void 0,catch:void 0,finally:void 0});return new Proxy(i,{get(e,n){if(n in e)return e[n];let i=r(n),a=(e=>Wh(r(n),e));return a.toString=()=>t?r(n):i,a.valueOf=()=>t?r(n):i,a[Symbol.toPrimitive]=()=>t?r(n):i,t&&(a.toJSON=()=>r(n)),a}})}var $h=new class{constructor(){this.editorInputHandlers=[],this.cachedIconContributions=null,o(p,()=>{}),o(Gn,e=>{e.target===`system.icons`&&(this.cachedIconContributions=null)})}getSortedIconContributions(){return this.cachedIconContributions===null&&(this.cachedIconContributions=[...C.getContributions(`system.icons`)].sort((e,t)=>{let n=e.priority??0,r=t.priority??0;return r===n?e.label.localeCompare(t.label):r-n})),this.cachedIconContributions}registerEditorInputHandler(e){this.editorInputHandlers.push({definition:e,initialized:!1}),this.editorInputHandlers.sort((e,t)=>{let n=e.definition.ranking??0;return(t.definition.ranking??0)-n})}async ensureHandlerInitialized(e){let t=e.definition;!t.lazyInit||e.initialized||(e.lazyInitPromise||=Promise.resolve(t.lazyInit()).then(()=>{e.initialized=!0,e.lazyInitPromise=void 0}).catch(t=>{throw e.lazyInitPromise=void 0,t}),await e.lazyInitPromise)}getEditorOptionsForInput(e){let t=new Set,n=[];for(let r of this.editorInputHandlers){let i=r.definition;!i.canHandle(e)||t.has(i.editorId)||(t.add(i.editorId),n.push({editorId:i.editorId,title:i.label,icon:i.icon}))}return n}async handleInput(e,t){if(t!==void 0){let n=this.editorInputHandlers.find(e=>e.definition.editorId===t);if(n){await this.ensureHandlerInitialized(n);let t=await n.definition.handle(e);return t&&(t.editorId=n.definition.editorId),t}return}for(let t=0;t<this.editorInputHandlers.length;t++){let n=this.editorInputHandlers[t],r=n.definition;if(r.canHandle(e)){await this.ensureHandlerInitialized(n);let t=await r.handle(e);return t&&(t.editorId=r.editorId),t}}}getEditorArea(){return document.querySelector(`docks-tabs#${im}`)}tabLabelForEditorInput(e){return e.data instanceof f?e.data.getName():e.title}async loadEditor(e,t){if(!e||(`component`in e||(e=await this.handleInput(e,t)),!e||!(`component`in e)))return;let n=e.editorId??t;n&&(e.editorId=n),await this.openTab({name:e.key,editorId:n,label:this.tabLabelForEditorInput(e),icon:e.icon,closable:!0,component:e.component})}async openTab(e){let t=this.getEditorArea();if(!t){console.error(`Editor area not found. The split pane system may not be initialized yet.`);return}if(t.has(e.name)){t.activate(e.name);return}t.open(e)}getFileIcon(e){let t=e.includes(`.`)?e.split(`.`).pop()?.toLowerCase()||``:e.toLowerCase(),n=this.getSortedIconContributions();if(n.length===0)return`file`;for(let e of n)if(e.mappings&&e.mappings[t])return e.mappings[t];return`file`}};c.put(`editorRegistry`,$h),C.registerContribution(`system.icons`,{label:`Default File Icons`,mappings:{pdf:`file-pdf`,md:`book`,txt:`file-lines`,ts:`code`,tsx:`code`,js:`code`,jsx:`code`,json:`file-code`,geojson:`file-code`,py:`docks python`,ipynb:`docks jupyter`,html:`code`,htm:`code`,css:`code`,scss:`code`,sass:`code`,xml:`file-code`,yaml:`file-code`,yml:`file-code`,sql:`database`,kml:`file-code`,gpx:`file-code`,jpg:`image`,jpeg:`image`,png:`image`,gif:`image`,svg:`image`,webp:`image`,bmp:`image`,ico:`image`},priority:0});var eg=(e,t)=>!e.leaf&&t.leaf?-1:e.leaf&&!t.leaf?1:e.label.localeCompare(t.label),tg,ng=m(`DocksFileBrowser`),rg=await Qh(Object.assign({"./filebrowser.de.json":()=>v(()=>import(`./filebrowser.de-GEf6Eilh-BkAK3aNW.js`),[]),"./filebrowser.en.json":()=>v(()=>import(`./filebrowser.en-o0Ad5f7Z-ClCpGyKo.js`),[])})),ig=250,ag=class extends Lh{static{tg=this}constructor(...e){super(...e),this.settingsLoaded=!1,this.fileEditorOptions=[],this.treeRef=Vp(),this.loadingNodes=new Set,this.treeBuildGeneration=0}static{this.SETTINGS_VERSION=1}static{this.SETTINGS_KEY_SELECTED_PATH=`selectedPath`}doBeforeUI(){this.initializeWorkspace(),o(Gn,e=>{e.target===`system.icons`&&this.requestUpdate()}),this.subscribe(i,e=>this.onWorkspaceChanged(e)),this.subscribe(p,e=>this.onWorkspaceConnected(e))}disconnectedCallback(){this.workspaceChangedDebounceId!==void 0&&(clearTimeout(this.workspaceChangedDebounceId),this.workspaceChangedDebounceId=void 0),this.pendingWorkspaceDir=void 0,super.disconnectedCallback()}firstUpdated(e){super.firstUpdated(e),this.setupDragAndDrop()}updated(e){super.updated(e),e.has(`workspaceDir`)&&this.workspaceDir&&this.setupDragAndDrop()}async initializeWorkspace(){let e=await u.getWorkspace();await this.loadWorkspace(e??void 0)}renderToolbar(){return b`
            <docks-command icon="folder-open" title="${rg.CONNECT_WORKSPACE}" dropdown="filebrowser.connections"></docks-command>
            <docks-command cmd="refresh_resource" icon="repeat" title="${rg.REFRESH_RESOURCE}"></docks-command>
            <docks-command icon="docks file-plus" title="${rg.CREATE_NEW}" dropdown="filebrowser.create"></docks-command>
        `}renderContextMenu(){let e=Xn.get(),t=e instanceof f?e:null,n=t&&this.fileEditorOptions.length>0;return b`
            <docks-command cmd="open_editor" icon="folder-open">${rg.OPEN}</docks-command>
            ${n?b`
                <wa-dropdown-item>
                    ${Ah(`folder-open`,{slot:`icon`})}
                    ${rg.OPEN_WITH}
                    ${this.fileEditorOptions.map(e=>b`
                        <docks-command
                            slot="submenu"
                            cmd="open_editor"
                            icon="${e.icon??`file`}"
                            .params=${{path:t.getWorkspacePath(),editorId:e.editorId}}>
                            ${e.title}
                        </docks-command>
                    `)}
                </wa-dropdown-item>
            `:x}
            <docks-command icon="docks file-plus" dropdown="filebrowser.create">${rg.CREATE_NEW}</docks-command>
        `}onWorkspaceChanged(e){this.pendingWorkspaceDir=e,this.workspaceChangedDebounceId!==void 0&&clearTimeout(this.workspaceChangedDebounceId),this.workspaceChangedDebounceId=setTimeout(()=>{this.workspaceChangedDebounceId=void 0;let e=this.pendingWorkspaceDir;this.pendingWorkspaceDir=void 0,e?this.applyWorkspaceChange(e):this.loadWorkspace(void 0,!0)},ig)}async applyWorkspaceChange(e){Xn.set(void 0),await this.loadWorkspace(e,!0),await this.syncTreeSelection()}async onWorkspaceConnected(e){Xn.set(void 0),await this.loadWorkspace(e,!0)}async loadWorkspace(e,t=!1){this.treeBuildGeneration+=1;let n=this.treeBuildGeneration;if(this.loadingNodes.clear(),this.workspaceDir=e,!e){this.root=void 0,this.settingsLoaded&&await this.persistSelectedPath(null);return}let r=await this.resourceToTreeNode(e,!0,t);n===this.treeBuildGeneration&&(this.root=r,await this.restoreSelectionFromSettings(),this.treeBuildGeneration)}async persistSelectedPath(e){await this.setDialogSetting({v:tg.SETTINGS_VERSION,[tg.SETTINGS_KEY_SELECTED_PATH]:e})}async restoreSelectionFromSettings(){if(this.settingsLoaded)return;this.settingsLoaded=!0;let e=(await this.getDialogSetting())?.[tg.SETTINGS_KEY_SELECTED_PATH];if(typeof e!=`string`||e.length===0)return;await this.updateComplete;let t=this.treeRef.value?.querySelector(`wa-tree`);if(t){if(typeof e==`string`&&e.length>0){let n=Array.from(t.querySelectorAll(`wa-tree-item`)).find(t=>{let n=(t?.model?.data)?.getWorkspacePath?.();return typeof n==`string`&&n===e});if(n){await this.selectTreeItem(n);return}}await this.selectFirstConnectedFolder(t)}}async selectTreeItem(e){let t=e.parentElement?.closest?.(`wa-tree-item`);for(;t;)t.expanded=!0,t=t.parentElement?.closest?.(`wa-tree-item`);e.selected=!0,await this.syncTreeSelection()}async selectFirstConnectedFolder(e){let t=Array.from(e.children).filter(e=>e instanceof HTMLElement&&e.tagName.toLowerCase()===`wa-tree-item`);if(t.length===0)return;let n=t.find(e=>e?.model?.data instanceof g)??t[0];await this.selectTreeItem(n)}async syncTreeSelection(){await this.updateComplete;let e=this.treeRef.value?.querySelector(`wa-tree`)?.selectedItems||[];e.length>0&&Xn.set(e[0].model?.data)}async resourceToTreeNode(e,t=!1,n=!1){let r=this.treeBuildGeneration,i=e instanceof f,a={data:e,label:e.getName(),leaf:i,children:[]};if(e instanceof g&&!e.getParent())try{let t=await u.getFolderInfoForDirectory(e);if(r!==this.treeBuildGeneration)return a.loaded=!a.leaf,a;t?.backendName&&(a.workspaceTag=t.backendName)}catch(e){ng.debug(`Failed to get workspace info for directory`,e)}if(e instanceof g&&t){try{let t=await e.listChildren(n);if(r!==this.treeBuildGeneration)return a.loaded=!0,a;for(let e of t){let t=await this.resourceToTreeNode(e,!0,n);if(r!==this.treeBuildGeneration)return a.loaded=!0,a;a.children.push(t)}a.children.sort(eg)}catch(t){if(r!==this.treeBuildGeneration||!await u.isResourceInCurrentWorkspace(e))return a.loaded=!0,a;a.loadError=t instanceof Error?t.message:String(t),ng.error(`Failed to load directory children:`,t)}a.loaded=!0}return e instanceof ee&&(a.placeholderNotice=e.getFailureReason()),a}createTreeItems(e,t=!1){if(!e)return b``;let n=!e.leaf&&!e.loaded,r=e.data,i=r instanceof f,a=!!r.getParent(),o=i?$h.getFileIcon(r.getName()):e.icon||`folder-open`,s=e.workspaceTag,c=e.loadError,l=e.placeholderNotice,u=c?rg.FOLDER_LOAD_FAILED({detail:c}):l?rg.FOLDER_UNAVAILABLE({detail:l}):null;return b`
            <wa-tree-item 
                draggable=${a}
                @dragstart=${a?this.nobubble(e=>this.onDragStart(e,r)):void 0}
                @dblclick=${this.nobubble(this.onFileDoubleClicked)}
                @wa-lazy-load=${this.nobubble(t=>this.onLazyLoad(t,e))}
                .model=${e} 
                ?expanded=${t}
                ?lazy=${n}>
                <div class="tree-item-rows">
                    <div class="tree-item-label-row">
                        <span class="tree-label">
                            ${Ah(o,{label:e.leaf?rg.FILE:rg.FOLDER})}
                            <span class="tree-label-text">${e.label}</span>
                            ${!e.leaf&&s?b`<wa-badge appearance="outlined" variant="neutral" style="font-size: var(--wa-font-size-xs);">${s}</wa-badge>`:null}
                        </span>
                    </div>
                    ${u?b`<div class="tree-item-detail-row tree-item-error-text">${u}</div>`:x}
                </div>
                ${e.children.map(e=>this.createTreeItems(e,!1))}
            </wa-tree-item>`}onDragStart(e,t){if(!e.dataTransfer||!t.getParent())return;let n=e.currentTarget?.closest(`wa-tree`),r=Array.isArray(n?.selectedItems)?n.selectedItems:[],i=[];if(r.length>0)for(let e of r){let t=e.model?.data;t&&t.getParent()&&i.push(t)}i.length===0&&i.push(t);let a=i.map(e=>e.getWorkspacePath()),o=i.length===1?i[0].getName():`${i.length} items`;e.dataTransfer.effectAllowed=`copyMove`;let s=a.join(`
`);if(e.dataTransfer.setData(`text/plain`,s),e.dataTransfer.setData(`application/x-workspace-file`,s),e.dataTransfer.setData(`text/uri-list`,s),e.dataTransfer.setDragImage){let t=document.createElement(`div`);t.textContent=o,t.style.position=`absolute`,t.style.top=`-1000px`,t.style.padding=`4px 8px`,t.style.background=`var(--wa-color-neutral-10)`,t.style.border=`1px solid var(--wa-color-neutral-30)`,t.style.borderRadius=`4px`,document.body.appendChild(t),e.dataTransfer.setDragImage(t,0,0),setTimeout(()=>document.body.removeChild(t),0)}}async onLazyLoad(e,t){let n=t.data;n instanceof g&&t.children.length===0&&await this.loadNodeChildren(t,n)}async loadNodeChildren(e,t){if(this.loadingNodes.has(e))return;let n=this.treeBuildGeneration;this.loadingNodes.add(e);try{let r=await t.listChildren(!1);if(n!==this.treeBuildGeneration)return;for(let t of r){let r=await this.resourceToTreeNode(t,!1);if(n!==this.treeBuildGeneration)return;e.children.push(r)}e.children.sort(eg),e.loaded=!0,this.requestUpdate()}catch(r){if(n!==this.treeBuildGeneration)return;if(!await u.isResourceInCurrentWorkspace(t)){e.loaded=!0,this.requestUpdate();return}e.loadError=r instanceof Error?r.message:String(r),ng.error(`Failed to load directory children:`,r),this.requestUpdate()}finally{this.loadingNodes.delete(e)}}async onFileDoubleClicked(e){let t=e.currentTarget,n=t.model;if(!n)return;let r=n.data;if(r instanceof f){Xn.set(r),this.executeCommand(`open_editor`,{});return}!n.leaf&&`expanded`in t&&(t.expanded=!t.expanded)}onSelectionChanged(e){let t=e.detail.selection;if(t&&t.length>0){let e=t[0].model.data;Xn.set(e);let n=e?.getWorkspacePath?.();typeof n==`string`?this.persistSelectedPath(n):this.persistSelectedPath(null),e instanceof f?this.fileEditorOptions=$h.getEditorOptionsForInput(e):this.fileEditorOptions=[]}else Xn.set(void 0),this.persistSelectedPath(null),this.fileEditorOptions=[]}getDirectoryDropTargetFromEvent(e){if(!this.workspaceDir)return;let t=e.target.closest(`wa-tree-item`);if(!t){let e=this.root?.children??[];if(e.length!==1)return;let t=e[0]?.data;return t instanceof g?t:void 0}let n=t.model?.data;if(n instanceof g)return n}setupDragAndDrop(){let e=this.treeRef.value;if(!e)return;let t=t=>{let n=t.dataTransfer?.types;if(!n)return;let r=n.includes(`Files`),i=n.includes(`application/x-workspace-file`);if(!r&&!i)return;if(!this.getDirectoryDropTargetFromEvent(t)){this.currentDropTarget?.classList.remove(`drop-target`),this.currentDropTarget=void 0,e.classList.remove(`drag-over`);return}t.preventDefault(),t.dataTransfer&&(i?t.dataTransfer.dropEffect=t.ctrlKey||t.metaKey?`copy`:`move`:t.dataTransfer.dropEffect=`copy`),e.classList.add(`drag-over`);let a=t.target.closest(`wa-tree-item`);if(!a){this.currentDropTarget?.classList.remove(`drop-target`),this.currentDropTarget=void 0;return}a!==this.currentDropTarget&&(this.currentDropTarget?.classList.remove(`drop-target`),this.currentDropTarget=a,a.classList.add(`drop-target`))},n=t=>{let n=t.dataTransfer?.types;if(!n)return;let r=n.includes(`Files`),i=n.includes(`application/x-workspace-file`);!r&&!i||this.getDirectoryDropTargetFromEvent(t)&&(t.preventDefault(),e.classList.add(`drag-over`))},r=t=>{let n=e.getBoundingClientRect(),r=t.clientX,i=t.clientY;(r<=n.left||r>=n.right||i<=n.top||i>=n.bottom)&&(e.classList.remove(`drag-over`),this.currentDropTarget?.classList.remove(`drop-target`),this.currentDropTarget=void 0)},i=async t=>{if(t.preventDefault(),e.classList.remove(`drag-over`),this.currentDropTarget?.classList.remove(`drop-target`),this.currentDropTarget=void 0,!t.dataTransfer||!this.workspaceDir)return;let n=this.getDirectoryDropTargetFromEvent(t);if(!n)return;let r=t.dataTransfer.types;if(r.includes(`Files`)){let e=Array.from(t.dataTransfer.files);if(e.length===0)return;await this.handleFilesDrop(e,n);return}if(r.includes(`application/x-workspace-file`)){await this.handleWorkspaceDrop(t,n);return}};e.removeEventListener(`dragover`,t),e.removeEventListener(`dragenter`,n),e.removeEventListener(`dragleave`,r),e.removeEventListener(`drop`,i),e.addEventListener(`dragover`,t),e.addEventListener(`dragenter`,n),e.addEventListener(`dragleave`,r),e.addEventListener(`drop`,i)}async handleWorkspaceDrop(e,t){if(!e.dataTransfer)return;let n=e.dataTransfer.getData(`application/x-workspace-file`);if(!n)return;let r=n.split(/\r?\n/).map(e=>e.trim()).filter(e=>!!e);if(r.length===0)return;let i=await u.getWorkspace();if(!i){ng.warn(`Workspace drop ignored because no workspace is connected`);return}let a=async n=>{let r=n.getWorkspace(),i=t.getWorkspace();return!r||!i?!1:r===i&&!(e.ctrlKey||e.metaKey)},o=new Set,s=t.getWorkspace(),c=0,l=0,d=[];for(let e of r)try{let t=await i.getResource(e);if(!t){ng.warn(`Workspace drop: source not found for path "${e}"`),l++;continue}d.push({path:e,resource:t});let n=t.getWorkspace();n&&o.add(n)}catch(t){ng.error(`Failed to handle workspace drop for "${e}":`,t),l++}if(d.length===0){l>0&&ng.info(`Workspace drop failed for ${l} item(s)`);return}let f=!1;if(s){for(let e of o)if(e!==s){f=!0;break}}if(f&&s)try{let e=Array.from(o),t=await u.getFolderInfoForDirectory(e[0]),n=await u.getFolderInfoForDirectory(s),r=t?.backendName??rg.UNKNOWN_BACKEND,i=n?.backendName??rg.UNKNOWN_BACKEND;if(!await Th(rg.DND_CROSS_CONNECTION_CONFIRM({count:String(d.length),srcBackend:r,destBackend:i})))return}catch(e){ng.debug(`Failed to resolve cross-connection info for DnD`,e)}for(let{path:e,resource:n}of d)try{let e=await a(n);await u.copyResource(n,t,{move:e}),c++}catch(t){ng.error(`Failed to handle workspace drop for "${e}":`,t),l++}ng.info(`Workspace drop completed: ${c}/${d.length} items ${l>0?`, ${l} failed`:``}`),await this.loadWorkspace(this.workspaceDir,!0)}async handleFilesDrop(e,t){let n=e.length,r=0,i=0,a=0;for(let n of e)try{let e=this.buildTargetPath(t,n.name);if(await this.workspaceDir.getResource(e)&&!await Th(rg.FILE_EXISTS_OVERWRITE({fileName:n.name}))){a++;continue}await(await this.workspaceDir.getResource(e,{create:!0})).saveContents(n),r++}catch(e){ng.error(`Failed to upload ${n.name}:`,e),i++}ng.info(`Uploaded ${r}/${n} files${a>0?`, ${a} skipped`:``}${i>0?`, ${i} failed`:``}`),await this.loadWorkspace(this.workspaceDir)}buildTargetPath(e,t){let n=e.getWorkspacePath();return n?`${n}/${t}`:t}renderContent(){return b`
            <div class="tree" ${Wp(this.treeRef)} style="--drop-files-text: '${rg.DROP_FILES_HERE}'">
                ${qd(!this.workspaceDir,()=>b`
                    <docks-no-content message="${rg.SELECT_WORKSPACE}"></docks-no-content>`,()=>qd(this.root,()=>b`
                <wa-tree @wa-selection-change=${this.nobubble(this.onSelectionChanged)}
                         style="--indent-guide-width: 1px;">
                    ${this.root.children.map(e=>this.createTreeItems(e,!0))}
                </wa-tree>`,()=>b``))}
            </div>
        `}static{this.styles=y`
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

        .tree-item-rows {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: var(--wa-space-2xs);
            min-width: 0;
            width: 100%;
        }

        .tree-item-label-row {
            min-width: 0;
        }

        .tree-item-detail-row {
            width: 100%;
            min-width: 0;
            box-sizing: border-box;
            overflow-wrap: anywhere;
        }

        .tree-item-error-text {
            font-size: var(--wa-font-size-s);
            line-height: var(--wa-line-height-normal);
            color: var(--wa-color-danger-text, #c62828);
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
    `}};Q([A()],ag.prototype,`root`,void 0),Q([A()],ag.prototype,`fileEditorOptions`,void 0),ag=tg=Q([O(`docks-filebrowser`)],ag);var og=await Qh(Object.assign({"./tasks.de.json":()=>v(()=>import(`./tasks.de-y2xPmQ1k-yWSBoRN-.js`),[]),"./tasks.en.json":()=>v(()=>import(`./tasks.en-BTbFrxJj-DYpTBWIM.js`),[])}));C.registerContribution($p,{component:`<docks-tasks></docks-tasks>`});var sg=null;function cg(){return sg||(sg=document.createElement(`div`),sg.id=`progress-dialog-container`,document.body.appendChild(sg)),sg}function lg(){return cg().querySelector(`wa-dialog`)}function ug(){dg(!0)}function dg(e=!1){let t=cg(),n=gm.getActiveTasks();if(n.length===0){ct(b``,t);return}let r=lg();(e||r?.open===!0)&&ct(b`
        <wa-dialog 
            label="${og.ACTIVE_TASKS}" 
            open
            light-dismiss
            style="--width: 600px;"
            @wa-request-close=${()=>{let e=lg();e&&(e.open=!1)}}
            @wa-after-hide=${()=>{ct(b``,t)}}
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
                ${n.map(e=>{let t=e.progress>=0||e.totalSteps>0,n=e.progress>=0?e.progress:e.totalSteps>0?Math.round(e.currentStep/e.totalSteps*100):0,r=e.progress<0&&e.totalSteps>0;return b`
                        <div class="tasitem">
                            <div class="tasheader">
                                <wa-icon name="hourglass" style="color: var(--wa-color-warning-fill-loud);"></wa-icon>
                                <div style="flex: 1;">
                                    <div class="tasname">${e.name}</div>
                                    ${e.message?b`
                                        <div class="tasmessage">${e.message}</div>
                                    `:``}
                                </div>
                            </div>
                            <div class="tasprogress">
                                ${t?b`
                                    <wa-progress-bar value="${n}">
                                        ${r?`${e.currentStep}/${e.totalSteps} - `:``}${n}%
                                    </wa-progress-bar>
                                `:b`
                                    <wa-progress-bar indeterminate></wa-progress-bar>
                                `}
                            </div>
                        </div>
                    `})}
            </div>
        </wa-dialog>
    `,t)}var fg=class extends Am{static{this.styles=y`
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
    `}doBeforeUI(){this.watch(Yn,()=>{dg(),this.requestUpdate()})}handleIndicatorClick(){ug()}render(){Yn.get();let e=gm.getActiveTasks().length;return e===0?b``:b`
            <div class="tasindicator" @click=${this.handleIndicatorClick} title="${og.ACTIVE_TASKS_TITLE({taskCount:e.toString()})}">
                <wa-spinner
                    style="font-size: 1rem; --indicator-color: var(--wa-color-warning-fill-loud);"
                    label="${og.ACTIVE_TASKS}"
                ></wa-spinner>
                <wa-badge appearance="outlined" variant="neutral" pill>${e}</wa-badge>
                <div class="tasbar-wrap"><wa-progress-bar indeterminate></wa-progress-bar></div>
            </div>
        `}};fg=Q([O(`docks-tasks`)],fg);var pg=await Qh(Object.assign({"./partname.de.json":()=>v(()=>import(`./partname.de-v76uEl0F-CqPEZ7br.js`),[]),"./partname.en.json":()=>v(()=>import(`./partname.en-By5aAawT-B9UD6UrQ.js`),[])}));function mg(){let e=Kn.get();return e&&(e.tabContribution?.label||e.getAttribute(`id`))||pg.NO_PART}var hg=250,gg=null;function _g(){let e=yh.getCurrentApp()?.name??``,t=Kn.get();if(!t){document.title=e;return}let n=t.tabContribution?.label||t.getAttribute(`id`)||pg.NO_PART;e?document.title=`${e} | ${n}`:document.title=n}function vg(){gg!==null&&clearTimeout(gg),gg=setTimeout(()=>{gg=null,_g()},hg)}nr(Kn,()=>vg()),window.addEventListener(`app-loaded`,()=>{gg!==null&&(clearTimeout(gg),gg=null),_g()});var yg=await Qh(Object.assign({"./partname.de.json":()=>v(()=>import(`./partname.de-v76uEl0F-CqPEZ7br.js`),[]),"./partname.en.json":()=>v(()=>import(`./partname.en-By5aAawT-B9UD6UrQ.js`),[])}));C.registerContribution($p,{component:`<docks-part-name></docks-part-name>`});var bg=class extends Am{doBeforeUI(){this.watch(Kn,()=>{this.requestUpdate()})}render(){let e=Kn.get()?.tabContribution?.icon||`box`;return b`
            <wa-button 
                appearance="plain"
                size="small"
                title="${yg.ACTIVE_PART}">
                ${Ah(e,{label:`Part`,slot:`start`})}
                ${mg()}
            </wa-button>
        `}};bg=Q([O(`docks-part-name`)],bg);var xg=m(`DocksExtensions`),Sg=await Qh(Object.assign({"./extensions.de.json":()=>v(()=>import(`./extensions.de-Ct1DIybE-CiTAOn-5.js`),[]),"./extensions.en.json":()=>v(()=>import(`./extensions.en-DRPFtVHT-C5GVFdU2.js`),[])})),Cg=class extends Lh{constructor(...e){super(...e),this.filterText=``,this.showRegisterDialog=!1,this.registerExtensionData={}}doInitUI(){o(ym,()=>{this.requestUpdate()})}onExtensionDblClick(){}enable(e){Sm.enable(e.id,!0),this.requestUpdate()}disable(e){Sm.disable(e.id,!0),this.requestUpdate()}isExtensionRequired(e){let t=yh.getCurrentApp();return!t||!t.extensions?!1:t.extensions.includes(e)}selectionChanged(e){let t=e.detail.selection||[];t.length>0&&t[0].model?this.selectedExtension=t[0].model:this.selectedExtension=void 0}getFilteredExtensions(){if(!this.filterText.trim())return Sm.getExtensions();let e=this.filterText.toLowerCase();return Sm.getExtensions().filter(t=>String(t.name).toLowerCase().includes(e)||(t.description?String(t.description).toLowerCase().includes(e):!1)||t.id.toLowerCase().includes(e))}getGroupedExtensions(){let e=this.getFilteredExtensions(),t=[],n=[];return e.forEach(e=>{Sm.isEnabled(e.id)?t.push(e):n.push(e)}),t.sort((e,t)=>String(e.name).localeCompare(String(t.name))),n.sort((e,t)=>String(e.name).localeCompare(String(t.name))),{enabled:t,available:n}}isExternalExtension(e){return e.external===!0}handleFilterInput(e){this.filterText=e.target.value,this.requestUpdate()}clearFilter(){this.filterText=``,this.requestUpdate()}async handleRegisterExtension(){try{let e=await xh(`Enter extension URL or source identifier:`,``,!1);if(!e)return;await gm.runAsync(`Registering extension`,async()=>{let t=e;vm.isGitHubUrl(e)&&(t=vm.convertGitHubUrlToSource(e));let n=vm.parseSource(t);n?.type===`github`?await this.fetchGitHubMetadata(n,t):(this.registerExtensionData={url:t,id:``,name:``,description:``},this.showRegisterDialog=!0,this.requestUpdate())})}catch(e){S(`Failed to register extension: ${e}`)}}async fetchGitHubMetadata(e,t){try{let n=await vm.fetchGitHubPackageJson(e),r=e.owner,i=e.repo;this.registerExtensionData={id:n.name||`ext.${r}-${i}`,name:n.name||`${r}/${i}`,description:n.description||``,url:t,version:n.version||``,author:n.author||(typeof n.author==`string`?n.author:n.author?.name)||``,icon:`puzzle-piece`,external:!0},this.showRegisterDialog=!0,this.requestUpdate()}catch(e){xg.warn(`Could not fetch package.json, using defaults: ${e}`),this.registerExtensionData={url:t,id:``,name:``,description:``},this.showRegisterDialog=!0,this.requestUpdate()}}async confirmRegisterExtension(){if(!this.registerExtensionData.url){S(`URL is required`);return}if(!this.registerExtensionData.id){S(`Extension ID is required`);return}if(!this.registerExtensionData.name){S(`Extension name is required`);return}try{await gm.runAsync(`Registering extension`,async()=>{let e={id:this.registerExtensionData.id,name:this.registerExtensionData.name,description:this.registerExtensionData.description,url:this.registerExtensionData.url,version:this.registerExtensionData.version,author:this.registerExtensionData.author,icon:this.registerExtensionData.icon||`puzzle-piece`,external:!0};Sm.registerExtension(e),await Sm.loadExtensionFromUrl(this.registerExtensionData.url,e.id),Hn(`Extension ${e.name} registered successfully`),this.showRegisterDialog=!1,this.registerExtensionData={},this.requestUpdate()})}catch(e){S(`Failed to register extension: ${e}`)}}cancelRegisterExtension(){this.showRegisterDialog=!1,this.registerExtensionData={},this.requestUpdate()}renderToolbar(){return b`
            <wa-input
                placeholder="${Sg.FILTER_PLACEHOLDER}"
                .value=${this.filterText}
                @input=${e=>this.handleFilterInput(e)}
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
        `}renderContent(){let e=this.getGroupedExtensions(),t=e.enabled.length>0||e.available.length>0;return b`
            ${qd(this.showRegisterDialog,()=>b`
                <wa-dialog 
                    label="Register Extension"
                    open
                    @wa-request-close=${()=>this.cancelRegisterExtension()}
                    style="--wa-dialog-width: 500px;">
                    <div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;">
                        <wa-input
                            label="Extension ID *"
                            .value=${this.registerExtensionData.id||``}
                            @input=${e=>{this.registerExtensionData.id=e.target.value,this.requestUpdate()}}
                            required
                            hint="Unique identifier for the extension (e.g., 'ext.my-extension')">
                        </wa-input>
                        
                        <wa-input
                            label="Name *"
                            .value=${this.registerExtensionData.name||``}
                            @input=${e=>{this.registerExtensionData.name=e.target.value,this.requestUpdate()}}
                            required
                            hint="Display name of the extension">
                        </wa-input>
                        
                        <wa-input
                            label="Description"
                            .value=${this.registerExtensionData.description||``}
                            @input=${e=>{this.registerExtensionData.description=e.target.value,this.requestUpdate()}}
                            hint="Description of what the extension does">
                        </wa-input>
                        
                        <wa-input
                            label="URL *"
                            .value=${this.registerExtensionData.url||``}
                            @input=${e=>{this.registerExtensionData.url=e.target.value,this.requestUpdate()}}
                            required
                            readonly
                            hint="Extension source URL or identifier">
                        </wa-input>
                        
                        <div style="display: flex; gap: 0.5rem;">
                            <wa-input
                                label="Version"
                                .value=${this.registerExtensionData.version||``}
                                @input=${e=>{this.registerExtensionData.version=e.target.value,this.requestUpdate()}}
                                style="flex: 1;"
                                hint="Extension version">
                            </wa-input>
                            
                            <wa-input
                                label="Author"
                                .value=${this.registerExtensionData.author||``}
                                @input=${e=>{this.registerExtensionData.author=e.target.value,this.requestUpdate()}}
                                style="flex: 1;"
                                hint="Extension author">
                            </wa-input>
                        </div>
                        
                        <wa-input
                            label="Icon"
                            .value=${this.registerExtensionData.icon||`puzzle-piece`}
                            @input=${e=>{this.registerExtensionData.icon=e.target.value,this.requestUpdate()}}
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
                            ${t?b`
                                ${e.enabled.length>0?b`
                                    <wa-tree-item expanded>
                                        <span>
                                            <wa-icon name="check-circle" style="color: var(--wa-color-success-50);"></wa-icon>
                                            ${Sg.INSTALLED} (${e.enabled.length})
                                        </span>
                                        ${e.enabled.map(e=>{let t=this.isExternalExtension(e);return b`
                                                <wa-tree-item @dblclick=${this.nobubble(this.onExtensionDblClick)} .model=${e}>
                                                    <span>${Ah(e.icon)}</span> ${e.name}${t?b` <span style="opacity: 0.6; font-size: 0.9em; margin-left: 0.5rem;">(External)</span>`:``}
                                                </wa-tree-item>
                                            `})}
                                    </wa-tree-item>
                                `:``}
                                ${e.available.length>0?b`
                                    <wa-tree-item expanded>
                                        <span>
                                            <wa-icon name="circle" style="color: var(--wa-color-neutral-50);"></wa-icon>
                                            ${Sg.AVAILABLE} (${e.available.length})
                                        </span>
                                        ${e.available.map(e=>{let t=this.isExternalExtension(e);return b`
                                                <wa-tree-item @dblclick=${this.nobubble(this.onExtensionDblClick)} .model=${e}>
                                                    <span>${Ah(e.icon)}</span> ${e.name}${t?b` <span style="opacity: 0.6; font-size: 0.9em; margin-left: 0.5rem;">(External)</span>`:``}
                                                </wa-tree-item>
                                            `})}
                                    </wa-tree-item>
                                `:``}
                            `:``}
                            ${t?``:b`
                                <div style="padding: 1em; text-align: center; opacity: 0.7;">
                                    ${Sg.NO_MATCHES({filterText:this.filterText})}
                                </div>
                            `}
                        </wa-tree>
                    </wa-scroller>
                </div>
                <wa-scroller slot="end" class="extensions-detail-scroller" orientation="vertical">
                <div class="extensions-detail-content">
                    ${qd(this.selectedExtension,e=>{let t=this.isExternalExtension(e),n=Sm.isEnabled(e.id);return b`
                                <h1>${Ah(e.icon)} ${e.name}${t?` (External)`:``}</h1>
                                ${qd(t,()=>b`
                                    <div class="marketplace-badge">
                                        <wa-icon name="store"></wa-icon>
                                        <span>${Sg.EXTERNAL_EXTENSION}</span>
                                    </div>
                                `)}
                                <hr>
                                <div>
                                    ${qd(n,()=>b`
                                        <wa-button 
                                            title="${this.isExtensionRequired(e.id)?Sg.REQUIRED_HINT:Sg.DISABLE_TITLE}" 
                                            @click="${()=>this.disable(e)}"
                                            variant="danger" 
                                            appearance="plain"
                                            ?disabled=${this.isExtensionRequired(e.id)}>
                                            <wa-icon name="xmark" label="Uninstall"></wa-icon>&nbsp;${Sg.UNINSTALL}
                                        </wa-button>
                                        ${qd(this.isExtensionRequired(e.id),()=>b`
                                            <div class="required-hint">
                                                <wa-icon name="info-circle" style="color: var(--wa-color-primary-50);"></wa-icon>
                                                <span>${Sg.REQUIRED_HINT}</span>
                                            </div>
                                        `)}
                                    `,()=>b`
                                        <wa-button 
                                            title="${Sg.ENABLE_TITLE}" 
                                            @click="${()=>this.enable(e)}"
                                            variant="brand" 
                                            appearance="plain">
                                            <wa-icon name="download" label="Install"></wa-icon>&nbsp;${Sg.INSTALL}
                                        </wa-button>
                                    `)}
                                </div>

                                ${qd(e.experimental,()=>b`
                                    <div style="margin-top: 1em;">
                                        <wa-button size="small" variant="warning" appearance="plain">
                                            <wa-icon name="triangle-exclamation" label="Warning"></wa-icon>
                                        </wa-button>
                                        <small><i>${Sg.EXPERIMENTAL}</i></small>
                                    </div>
                                `)}

                                ${qd(e.version||e.author,()=>b`
                                    <div style="margin-top: 1em; display: flex; flex-direction: column; gap: 0.5rem;">
                                        ${qd(e.version,()=>b`
                                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                                <wa-icon name="tag" style="font-size: 0.9em; opacity: 0.7;"></wa-icon>
                                                <span style="font-size: 0.9em; opacity: 0.8;">${Sg.VERSION} <strong>${e.version}</strong></span>
                                            </div>
                                        `)}
                                        ${qd(e.author,()=>b`
                                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                                <wa-icon name="user" style="font-size: 0.9em; opacity: 0.7;"></wa-icon>
                                                <span style="font-size: 0.9em; opacity: 0.8;">${Sg.AUTHOR} <strong>${e.author}</strong></span>
                                            </div>
                                        `)}
                                    </div>
                                `)}

                                <p style="margin-top: 1em;">${e.description}</p>

                                ${qd(e.dependencies&&e.dependencies.length>0,()=>b`
                                    <div style="margin-top: 1.5em;">
                                        <h3 style="margin-bottom: 0.5em;">
                                            <wa-icon name="puzzle-piece" style="font-size: 0.9em;"></wa-icon>
                                            ${Sg.DEPENDENCIES}
                                        </h3>
                                        <div class="dependencies-list">
                                            ${e.dependencies.map(e=>{let t=Sm.getExtensions().find(t=>t.id===e),n=Sm.isEnabled(e);return b`
                                                    <div class="dependency-item">
                                                        <wa-icon 
                                                            name="${n?`check-circle`:`circle`}" 
                                                            style="color: ${n?`var(--wa-color-success-50)`:`var(--wa-color-neutral-50)`};">
                                                        </wa-icon>
                                                        ${Ah(t?.icon??`puzzle-piece`)}
                                                        <span>${t?.name||e}</span>
                                                        ${n?``:b`
                                                            <span class="dependency-badge">${Sg.NOT_INSTALLED}</span>
                                                        `}
                                                    </div>
                                                `})}
                                        </div>
                                        <small style="opacity: 0.7; display: block; margin-top: 0.5em;">
                                            <wa-icon name="info-circle" style="font-size: 0.9em;"></wa-icon>
                                            ${Sg.DEPENDENCIES_HINT}
                                        </small>
                                    </div>
                                `)}
                            `})}
                </div>
                </wa-scroller>
            </wa-split-panel>
        `}static{this.styles=y`
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
    `}};Q([A()],Cg.prototype,`selectedExtension`,void 0),Q([A()],Cg.prototype,`filterText`,void 0),Q([A()],Cg.prototype,`showRegisterDialog`,void 0),Q([A()],Cg.prototype,`registerExtensionData`,void 0),Cg=Q([O(`docks-extensions`)],Cg);var wg=await Qh(Object.assign({"./logterminal.de.json":()=>v(()=>import(`./logterminal.de-DKp940Ox-D7O6oLMQ.js`),[]),"./logterminal.en.json":()=>v(()=>import(`./logterminal.en-Ci2nm0b2-BGakKSmc.js`),[])})),Tg=class extends Lh{constructor(...e){super(...e),this.messages=[],this.autoScroll=!0,this.filter=`all`,this.containerRef=Vp()}connectedCallback(){super.connectedCallback(),this.loadSettings(),l(this.log.bind(this))}disconnectedCallback(){super.disconnectedCallback(),te()}log(e,t,n=`info`){let r={timestamp:new Date,level:n,source:e,message:t};this.messages=[...this.messages,r],this.autoScroll&&this.updateComplete.then(()=>{let e=this.containerRef.value;e&&(e.scrollTop=e.scrollHeight)})}clear(){this.messages=[]}getFilteredMessages(){return this.filter===`all`?this.messages:this.messages.filter(e=>e.level===this.filter)}formatTimestamp(e){return e.toLocaleTimeString(`en-US`,{hour12:!1,hour:`2-digit`,minute:`2-digit`,second:`2-digit`})}getLevelIcon(e){switch(e){case`info`:return`circle-info`;case`warning`:return`triangle-exclamation`;case`error`:return`circle-xmark`;case`debug`:return`bug`}}getLevelColor(e){switch(e){case`info`:return`var(--wa-color-primary-text, #0066cc)`;case`warning`:return`var(--wa-color-warning-text, #ff9800)`;case`error`:return`var(--wa-color-danger-text, #dc3545)`;case`debug`:return`var(--wa-color-neutral-text-subtle, #6c757d)`}}renderToolbar(){let e=this.messages.filter(e=>e.level===`info`).length,t=this.messages.filter(e=>e.level===`warning`).length,n=this.messages.filter(e=>e.level===`error`).length,r=this.messages.filter(e=>e.level===`debug`).length;return b`
            <docks-command 
                icon="list"
                title="${wg.ALL_LOGS}"
                appearance="${this.filter===`all`?`filled`:`plain`}"
                variant="${this.filter===`all`?`brand`:`neutral`}"
                .action=${()=>{this.filter=`all`,this.saveSettings()}}>
                ${wg.ALL} (${this.messages.length})
            </docks-command>

            <docks-command 
                icon="circle-info"
                title="${wg.INFO_LOGS}"
                appearance="${this.filter===`info`?`filled`:`plain`}"
                variant="${this.filter===`info`?`brand`:`neutral`}"
                .action=${()=>{this.filter=`info`,this.saveSettings()}}>
                ${wg.INFO}${e>0?` (${e})`:``}
            </docks-command>

            <docks-command 
                icon="triangle-exclamation"
                title="${wg.WARNING_LOGS}"
                appearance="${this.filter===`warning`?`filled`:`plain`}"
                variant="${this.filter===`warning`?`brand`:`neutral`}"
                .action=${()=>{this.filter=`warning`,this.saveSettings()}}>
                ${wg.WARNINGS}${t>0?` (${t})`:``}
            </docks-command>

            <docks-command 
                icon="circle-xmark"
                title="${wg.ERROR_LOGS}"
                appearance="${this.filter===`error`?`filled`:`plain`}"
                variant="${this.filter===`error`?`brand`:`neutral`}"
                .action=${()=>{this.filter=`error`,this.saveSettings()}}>
                ${wg.ERRORS}${n>0?` (${n})`:``}
            </docks-command>

            <docks-command 
                icon="bug"
                title="${wg.DEBUG_LOGS}"
                appearance="${this.filter===`debug`?`filled`:`plain`}"
                variant="${this.filter===`debug`?`brand`:`neutral`}"
                .action=${()=>{this.filter=`debug`,this.saveSettings()}}>
                ${wg.DEBUG}${r>0?` (${r})`:``}
            </docks-command>

            <wa-divider orientation="vertical"></wa-divider>

            <docks-command 
                icon="arrow-down" 
                title="${this.autoScroll?wg.AUTO_SCROLL_ENABLED:wg.AUTO_SCROLL_DISABLED}"
                appearance="${this.autoScroll?`filled`:`plain`}"
                variant="${this.autoScroll?`brand`:`neutral`}"
                .action=${()=>{this.autoScroll=!this.autoScroll,this.saveSettings()}}>
                ${this.autoScroll?wg.AUTO_SCROLL:wg.MANUAL}
            </docks-command>

            <docks-command 
                icon="trash" 
                title="${wg.CLEAR_LOGS}"
                .action=${()=>this.clear()}>
                ${wg.CLEAR}
            </docks-command>
        `}renderContent(){let e=this.getFilteredMessages();return b`
            <div class="log-terminal">
                <div class="messages" ${Wp(this.containerRef)}>
                    ${e.length===0?b`<div class="empty-state">${wg.NO_LOG_MESSAGES}</div>`:e.map(e=>b`
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
        `}static{this.styles=y`
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
    `}async loadSettings(){let e=await this.getDialogSetting();e&&(typeof e.filter==`string`&&(e.filter===`all`||[`info`,`warning`,`error`,`debug`].includes(e.filter))&&(this.filter=e.filter),typeof e.autoScroll==`boolean`&&(this.autoScroll=e.autoScroll))}async saveSettings(){await this.setDialogSetting({filter:this.filter,autoScroll:this.autoScroll})}};Q([A()],Tg.prototype,`messages`,void 0),Q([A()],Tg.prototype,`autoScroll`,void 0),Q([A()],Tg.prototype,`filter`,void 0),Tg=Q([O(`docks-log-terminal`)],Tg);var Eg=await Qh(Object.assign({"./fastviews.de.json":()=>v(()=>import(`./fastviews.de-BFxFslBz-D93r-wVf.js`),[]),"./fastviews.en.json":()=>v(()=>import(`./fastviews.en-Cb4J_JXL-BB7AqsOS.js`),[])})),Dg=class extends ir{constructor(...e){super(...e),this.target=``,this.title=``,this.disabled=!1,this.appearance=`plain`,this.size=`small`,this.placement=`bottom-start`,this.tabContributions=[],this.drawerOpen=!1,this.drawerSize=`50vw`,this.drawerRef=Vp(),this.tabsRef=Vp(),this.resizeHandleRef=Vp(),this.resizing=null}getDrawerTabsId(){return`fastviews-drawer-tabs-${this.target}`}handleTabClick(e){if(!this.disabled)if(this.containerId){let t=document.querySelector(`docks-tabs#${this.containerId}`);if(!t){console.error(`fastviews: Tab container with id "${this.containerId}" not found`);return}t.open(e)}else this.drawerOpen=!0,this.updateComplete.then(()=>{let t=this.tabsRef.value;t&&t.open(e)})}handleDrawerHide(){this.drawerOpen=!1}startResize(e){e.preventDefault(),e.stopPropagation();let t=this.drawerRef.value;if(!t)return;let n=(()=>{let e=t.shadowRoot?.querySelector(`[part="panel"]`);if(e&&e.offsetWidth>0)return e.offsetWidth;let n=(window.getComputedStyle(t).getPropertyValue(`--size`)||this.drawerSize).match(/^(\d+(?:\.\d+)?)(px|vw|vh|%)$/);if(n){let e=parseFloat(n[1]),t=n[2];if(t===`px`)return e;if(t===`vw`)return e/100*window.innerWidth;if(t===`vh`)return e/100*window.innerHeight;if(t===`%`)return e/100*window.innerWidth}return 0})();n===0&&(n=window.innerWidth*.5);let r=e=>{this.resizing&&(e.preventDefault(),e.stopPropagation(),this.resizing.rafId!==null&&cancelAnimationFrame(this.resizing.rafId),this.resizing.rafId=requestAnimationFrame(()=>{if(!this.resizing)return;let t=this.resizing.startX-e.clientX,n=Math.round(this.resizing.startSize+t),r=Math.round(window.innerWidth*.9);if(n>=200&&n<=r){this.drawerSize=`${n}px`;let e=this.drawerRef.value;e&&(e.style.setProperty(`--size`,this.drawerSize),e.style.setProperty(`transition`,`none`))}this.resizing.rafId=null}))},i=()=>{if(this.resizing){this.resizing.rafId!==null&&(cancelAnimationFrame(this.resizing.rafId),this.resizing.rafId=null),document.removeEventListener(`mousemove`,this.resizing.handleMouseMove),document.removeEventListener(`mouseup`,this.resizing.handleMouseUp),document.body.style.cursor=``,document.body.style.userSelect=``;let e=this.drawerRef.value;e&&e.style.removeProperty(`transition`),this.resizing=null}};this.resizing={startX:e.clientX,startSize:n,handleMouseMove:r,handleMouseUp:i,rafId:null},document.addEventListener(`mousemove`,r,{passive:!1}),document.addEventListener(`mouseup`,i,{passive:!1}),document.body.style.cursor=`col-resize`,document.body.style.userSelect=`none`}doBeforeUI(){this.target&&(this.loadTabContributions(),o(Gn,e=>{this.target&&e.target===this.target&&this.loadTabContributions()}))}loadTabContributions(){this.target&&(this.tabContributions=C.getContributions(this.target).filter(e=>`name`in e),this.requestUpdate())}renderTabContribution(e){return b`
            <wa-dropdown-item 
                @click=${()=>this.handleTabClick(e)}>
                ${Ah(e.icon,{label:e.label,slot:`icon`})}
                ${e.label}
            </wa-dropdown-item>
        `}render(){return!this.target||this.tabContributions.length===0?x:b`
            <wa-dropdown placement=${this.placement}>
                <wa-button 
                    slot="trigger"
                    appearance=${this.appearance}
                    size=${this.size}
                    ?disabled=${this.disabled}
                    with-caret
                    title=${this.title}>
                    ${Ah(this.icon,{label:this.title,slot:`start`})}
                    <slot></slot>
                </wa-button>
                
                ${this.title?b`
                    <h6 style="padding: var(--wa-space-xs) var(--wa-space-s); margin: 0; color: var(--wa-color-neutral-50); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                        ${this.title}
                    </h6>
                `:x}
                
                ${this.tabContributions.map(e=>this.renderTabContribution(e))}
            </wa-dropdown>

            ${this.containerId?x:b`
                <wa-drawer 
                    ${Wp(this.drawerRef)}
                    label="${this.title||Eg.FAST_VIEWS}"
                    placement="end"
                    ?open=${this.drawerOpen}
                    @wa-hide=${this.handleDrawerHide}
                    style="--size: ${this.drawerSize};">
                    <div 
                        ${Wp(this.resizeHandleRef)}
                        class="resize-handle"
                        @mousedown=${this.startResize}>
                    </div>
                    <docks-tabs 
                        ${Wp(this.tabsRef)}
                        id="${this.getDrawerTabsId()}"
                        style="width: 100%; height: 100%; display: flex; flex-direction: column;">
                    </docks-tabs>
                </wa-drawer>
            `}
        `}static{this.styles=y`
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
    `}};Q([k()],Dg.prototype,`target`,void 0),Q([k()],Dg.prototype,`title`,void 0),Q([k()],Dg.prototype,`icon`,void 0),Q([k({type:Boolean})],Dg.prototype,`disabled`,void 0),Q([k()],Dg.prototype,`appearance`,void 0),Q([k()],Dg.prototype,`size`,void 0),Q([k()],Dg.prototype,`placement`,void 0),Q([k()],Dg.prototype,`containerId`,void 0),Q([A()],Dg.prototype,`tabContributions`,void 0),Q([A()],Dg.prototype,`drawerOpen`,void 0),Q([A()],Dg.prototype,`drawerSize`,void 0),Dg=Q([O(`docks-fastviews`)],Dg);function Og(){let e=document.getElementById(`global-dialog-container`);return e||(e=document.createElement(`div`),e.id=`global-dialog-container`,document.body.appendChild(e)),e}var kg=e=>{try{return new Intl.DisplayNames([e],{type:`language`}).of(e)||e.toUpperCase()}catch{return e.toUpperCase()}},Ag=()=>[...Kh.get()].sort(),jg=async()=>{let e=Ag(),t=Xh.get();return new Promise(n=>{let r=Og(),i=!1,a=()=>{let e=r.querySelector(`wa-dialog`);e&&!i&&(e.open=!1)},o=()=>{i||(i=!0,ct(b``,r),n())},s=async e=>{await hm.set(Uh,e),a()};ct(b`
            <wa-dialog 
                label="Select Language" 
                open 
                light-dismiss
                @wa-request-close=${a}
                @wa-after-hide=${o}>
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
                    ${e.map(e=>b`
                        <div 
                            class="language-item ${e===t?`active`:``}"
                            @click=${()=>s(e)}>
                            <span class="language-code">${e.toUpperCase()}</span>
                            <span class="language-name">${kg(e)}</span>
                        </div>
                    `)}
                </div>
            </wa-dialog>
        `,r)})},Mg=class extends Am{static{this.styles=y`
        :host {
            display: inline-block;
        }
    `}render(){let e=Xh.get(),t=kg(e);return b`
            <wa-button 
                appearance="plain" 
                size="small"
                title="Current language: ${t}"
                @click=${()=>jg()}>
                ${`${e.toUpperCase()} ${t}`}
            </wa-button>
        `}};Mg=Q([O(`docks-language-selector`)],Mg);var Ng=class extends Am{constructor(...e){super(...e),this.currentLayoutId=`standard`}doBeforeUI(){this.currentLayoutId=yh.getCurrentLayoutId();let e=()=>{this.currentLayoutId=yh.getCurrentLayoutId(),this.requestUpdate()};return window.addEventListener(`app-loaded`,e),window.addEventListener(`layout-changed`,e),()=>{window.removeEventListener(`app-loaded`,e),window.removeEventListener(`layout-changed`,e)}}async handleSelect(e){let t=e.detail?.item?.value;if(!(!t||t===this.currentLayoutId))try{await yh.setPreferredLayoutId(t)}catch(e){console.error(`Failed to switch layout:`,e)}}render(){let e=yh.getRegisteredLayouts();if(e.length<=1)return b``;let t=e.find(e=>e.id===this.currentLayoutId)?.name??this.currentLayoutId;return b`
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
                    title="Switch layout (current: ${t})">
                    <wa-icon name="table-cells" label="Layout"></wa-icon>
                </wa-button>
                ${e.map(e=>b`
                        <wa-dropdown-item
                            value="${e.id}"
                            type="checkbox"
                            ?checked=${e.id===this.currentLayoutId}>
                            ${Ah(e.icon,{label:e.name,slot:`icon`})}
                            ${e.name}
                        </wa-dropdown-item>
                    `)}
            </wa-dropdown>
        `}static{this.styles=y`
        :host {
            display: inline-block;
        }
    `}};Q([A()],Ng.prototype,`currentLayoutId`,void 0),Ng=Q([O(`docks-layout-switcher`)],Ng),C.registerContribution(am,{name:`view.filebrowser`,label:`Workspace`,icon:`folder`,component:e=>b`<docks-filebrowser id="${e}"></docks-filebrowser>`}),C.registerContribution(cm,{name:`view.logTerminal`,label:`Log Messages`,icon:`list`,component:e=>b`<docks-log-terminal id="${e}"></docks-log-terminal>`}),C.registerContribution(em,{name:`toolbar.info`,label:`Info`,icon:`circle-info`,command:`show_version_info`,showLabel:!0}),C.registerContribution(em,{name:`toolbar.fastViews`,label:`Fast Views`,component:`<docks-fastviews target="system.fastviews-bottomend" icon="bolt" title="Fast Views"></docks-fastviews>`}),C.registerContribution(em,{name:`toolbar.languageSelector`,label:`Language`,component:()=>b`<docks-language-selector></docks-language-selector>`}),C.registerContribution(Xp,{name:`toolbar.appSwitcher`,label:`App Switcher`,component:()=>b`<docks-layout-switcher></docks-layout-switcher>`}),C.registerContribution(tm,{command:`open_extensions`,icon:`docks extensions`,label:`Extensions`});var Pg=class extends Ih{constructor(...e){super(...e),this.showBottomSidebar=!1,this.showBottomPanel=!1,this.showLeftSidebar=!0,this.showAuxSidebar=!0}createRenderRoot(){return this}getGridSizes(){return this.showLeftSidebar&&this.showAuxSidebar?`20%, 60%, 20%`:this.showLeftSidebar?`20%, 80%`:this.showAuxSidebar?`80%, 20%`:`100%`}render(){return b`
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
                
                docks-standard-layout {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    width: 100%;
                }
                
                docks-standard-layout .toolbar-top {
                    width: 100%;
                    display: grid;
                    grid-template-columns: 1fr 2fr 1fr;
                    align-items: center;
                    border-bottom: solid var(--wa-border-width-s) var(--wa-color-neutral-border-loud);
                    flex-shrink: 0;
                    position: relative;
                    z-index: 100;
                }

                docks-standard-layout .toolbar-top > :nth-child(1) {
                    justify-self: start;
                }

                docks-standard-layout .toolbar-top > :nth-child(2) {
                    justify-self: center;
                }
                
                docks-standard-layout .toolbar-bottom {
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
                
                docks-standard-layout .main-layout {
                    flex: 1;
                    min-height: 0;
                }
                
                docks-standard-layout .toolbar-end {
                    justify-self: end;
                }
            </style>
            
            <div class="toolbar-top">
                <docks-toolbar id=${Yp}></docks-toolbar>
                <docks-toolbar id=${Zp}></docks-toolbar>
                <docks-toolbar class="toolbar-end" id=${Xp}></docks-toolbar>
            </div>
            
            <docks-resizable-grid 
                class="main-layout"
                id="main-layout" 
                orientation="horizontal" 
                sizes=${this.getGridSizes()}>
                
                ${this.showLeftSidebar?b`
                        ${this.showBottomSidebar?b`
                                <docks-resizable-grid 
                                    id="left-sidebar-split" 
                                    orientation="vertical" 
                                    sizes="50%, 50%">
                                    <docks-tabs id="${am}" placement="start" icon-only with-toolbar></docks-tabs>
                                    <docks-tabs id="${om}"  placement="start" icon-only></docks-tabs>
                                </docks-resizable-grid>
                            `:b`<docks-tabs id="${am}" placement="start" icon-only with-toolbar></docks-tabs>`}
                    `:x}
                
                ${this.showBottomPanel?b`
                        <docks-resizable-grid 
                            id="editor-area-split" 
                            orientation="vertical" 
                            sizes="70%, 30%">
                            <docks-tabs id="${im}"></docks-tabs>
                            <docks-tabs id="${cm}"></docks-tabs>
                        </docks-resizable-grid>
                    `:b`<docks-tabs id="${im}"></docks-tabs>`}
                
                ${this.showAuxSidebar?b`<docks-tabs id="${sm}"></docks-tabs>`:x}
            </docks-resizable-grid>
            
            <div class="toolbar-bottom">
                <docks-toolbar id=${Qp}></docks-toolbar>
                <docks-toolbar id=${$p}></docks-toolbar>
                <docks-toolbar class="toolbar-end" id=${em}></docks-toolbar>
            </div>
        `}};Q([k({type:Boolean,attribute:`show-bottom-sidebar`})],Pg.prototype,`showBottomSidebar`,void 0),Q([k({type:Boolean,attribute:`show-bottom-panel`})],Pg.prototype,`showBottomPanel`,void 0),Q([k({type:Boolean,attribute:`show-left-sidebar`})],Pg.prototype,`showLeftSidebar`,void 0),Q([k({type:Boolean,attribute:`show-aux-sidebar`})],Pg.prototype,`showAuxSidebar`,void 0),Pg=Q([O(`docks-standard-layout`)],Pg);for(let e of[{id:`standard`,name:`Standard`,label:`Standard`,icon:`docks layout-standard`,component:`docks-standard-layout`},{id:`standard-bottom-panel`,name:`Standard (bottom panel)`,label:`Standard (bottom panel)`,icon:`docks layout-standard-bottom-panel`,component:{tag:`docks-standard-layout`,attributes:{"show-bottom-panel":`true`}}},{id:`standard-bottom-sidebar`,name:`Standard (bottom sidebar)`,label:`Standard (bottom sidebar)`,icon:`docks layout-standard-bottom-sidebar`,component:{tag:`docks-standard-layout`,attributes:{"show-bottom-sidebar":`true`}}},{id:`standard-full`,name:`Standard (panel + sidebar)`,label:`Standard (panel + sidebar)`,icon:`docks layout-standard-full`,component:{tag:`docks-standard-layout`,attributes:{"show-bottom-panel":`true`,"show-bottom-sidebar":`true`}}}])C.registerContribution(rm,e);async function Fg(e,t=!0){let n=await u.getWorkspace();if(!n)return null;let r=e?.path;return t&&!r?null:{workspace:n,path:r||``}}function Ig(e){return e&&typeof e.getContent==`function`&&typeof e.getSelection==`function`&&typeof e.getSnippet==`function`&&typeof e.getLanguage==`function`&&typeof e.getFilePath==`function`}function Lg(e=!1){let t={filePath:null,language:null};return e?{...t,snippet:null,cursorLine:null}:t}async function Rg(e,t=!0){let n=await Fg(e,t);if(!n)return null;let{workspace:r,path:i}=n;if(!i)return null;try{let e=await r.getResource(i);return!e||!(e instanceof f)?null:{workspace:r,path:i,file:e}}catch{return null}}w({command:{id:`disconnect_folder`,name:`Disconnect folder`,description:`Disconnects a folder from the workspace`},handler:{execute:async()=>{let e=Xn.get();if(!(e instanceof g&&e.getParent()===void 0)){S(`Select a folder root to disconnect.`);return}try{let t=await u.getFolderInfoForDirectory(e);if(t?.type===`indexeddb`){if(!await Th(`Also delete "${t.name}" from browser storage?\n\nIf not deleted, the folder data and blobs remain in IndexedDB.`))return;await uh(e),Hn(`Deleted IndexedDB data for ${t.name}.`)}await u.disconnectFolder(e)}catch(e){S(e.message)}}},contribution:{target:`contextmenu:view.filebrowser`,label:`Disconnect folder`,icon:`folder-minus`,disabled:()=>{let e=Xn.get();return!(e instanceof g&&e.getParent()===void 0)}}}),w({command:{id:`load_workspace`,name:`Local Folder`,description:`Connect to a local folder using File System Access API`,parameters:[]},handler:{execute:async e=>{await window.showDirectoryPicker({mode:`readwrite`}).then(e=>u.connectWorkspace(e)).catch(e=>{S(e.message)})}},contribution:{target:`filebrowser.connections`,label:`Local Folder`,icon:`folder-open`}}),w({command:{id:`connect_opfs`,name:`OPFS`,description:`Connect to Origin Private File System (browser storage)`,parameters:[]},handler:{execute:async()=>{try{await u.connectFolder({opfs:!0})}catch(e){S(e.message)}}},contribution:{target:`filebrowser.connections`,label:`OPFS (Browser Storage)`,icon:`database`}}),w({command:{id:`connect_indexeddb`,name:`IndexedDB`,description:`Connect to IndexedDB-backed workspace (browser storage)`,parameters:[{name:`name`,description:`Optional display name for this IndexedDB workspace root`,required:!1}]},handler:{execute:async e=>{let t=e.params?.name;try{await u.connectFolder({indexeddb:!0,name:t})}catch(e){S(e.message)}}},contribution:{target:`filebrowser.connections`,label:`IndexedDB (Browser Storage)`,icon:`database`}}),w({command:{id:`refresh_resource`,name:`Refresh resource`,description:`Refreshes the connected folder of the selected resource, or the whole workspace if nothing is selected`,parameters:[]},handler:{execute:async()=>{let e=Xn.get();if(e){e.getWorkspace().touch();return}let t=await u.getWorkspace();if(!t){S(`No workspace selected.`);return}t.touch()}}}),w({command:{id:`open_editor`,name:`Open editor`,description:`Opens a file in an editor`,parameters:[{name:`path`,description:`The path of the file to open within the workspace; if omitted, the active selection is opened`,required:!1},{name:`editorId`,description:`Open with this editor id; if omitted, use default editor`,required:!1}]},handler:{execute:async e=>{let t=e.params?.path,n=e.params?.editorId,r=null;if(t)r=(await Rg({path:t}))?.file??null;else{let e=Xn.get();r=e instanceof f?e:null}r&&await $h.loadEditor(r,n)}}}),w({command:{id:`get_active_editor_content`,name:`Get active editor content`,description:`Gets the complete contents of the currently active editor. Returns null if no editor is active or if the editor is not a code editor.`,parameters:[],output:[{name:`content`,description:`the complete contents of the active editor, or null if no editor is active`},{name:`filePath`,description:`the workspace path of the file in the active editor, or null if no editor is active`},{name:`language`,description:`the programming language of the active editor, or null if no editor is active`}]},handler:{execute:async e=>{let t=e.activeEditor;if(!Ig(t))return{...Lg(),content:null};try{return{content:t.getContent(),filePath:t.getFilePath(),language:t.getLanguage()}}catch{return{...Lg(),content:null}}}}}),w({command:{id:`get_active_editor_selection`,name:`Get active editor selection`,description:`Gets the currently selected text in the active editor. Returns null if no editor is active, no selection exists, or if the editor is not a code editor.`,parameters:[],output:[{name:`selection`,description:`the selected text in the active editor, or null if no selection exists or no editor is active`},{name:`filePath`,description:`the workspace path of the file in the active editor, or null if no editor is active`},{name:`language`,description:`the programming language of the active editor, or null if no editor is active`}]},handler:{execute:async e=>{let t=e.activeEditor;if(!Ig(t))return{...Lg(),selection:null};try{return{selection:t.getSelection(),filePath:t.getFilePath(),language:t.getLanguage()}}catch{return{...Lg(),selection:null}}}}}),w({command:{id:`get_active_editor_snippet`,name:`Get active editor snippet around cursor`,description:`Gets a code snippet from the active editor with n lines before and n lines after the cursor position. Useful for getting context around the cursor without loading the entire file.`,parameters:[{name:`lines`,description:`number of lines to include before and after the cursor position (default: 5)`,type:`number`,required:!1}],output:[{name:`snippet`,description:`the code snippet with n lines before and after the cursor, or null if no editor is active`},{name:`filePath`,description:`the workspace path of the file in the active editor, or null if no editor is active`},{name:`language`,description:`the programming language of the active editor, or null if no editor is active`},{name:`cursorLine`,description:`the line number where the cursor is positioned (1-based), or null if no editor is active`}]},handler:{execute:async e=>{let t=e.activeEditor;if(!Ig(t))return Lg(!0);try{let n=e.params?.lines?parseInt(e.params.lines,10):5;if(isNaN(n)||n<0)return Lg(!0);let r=t.getSnippet(n);return r?{snippet:r.snippet,filePath:t.getFilePath(),language:t.getLanguage(),cursorLine:r.cursorLine}:Lg(!0)}catch{return Lg(!0)}}}});function zg(e,t){return e.replace(/^v/i,``)===t.replace(/^v/i,``)}w({command:{id:`show_version_info`,name:`Show Version Info`,description:`Shows application version information`,parameters:[]},handler:{execute:async e=>{let t=yh.getCurrentApp();if(!t){S(`No app loaded`);return}let n=t.dependencies??{},r=Object.keys(n).length>0,i=r?b`
                    <wa-tree style="--indent-guide-width: 1px;">
                        <wa-tree-item expanded>
                            <span>${t.name??``}</span>
                            ${Object.entries(n).map(([e,t])=>b`
                                <wa-tree-item>
                                    <span>${e} <small>${t}</small></span>
                                </wa-tree-item>
                            `)}
                        </wa-tree-item>
                    </wa-tree>
                `:b``,a=null,o=()=>(a||(a=document.getElementById(`global-dialog-container`)||document.createElement(`div`),a.id||(a.id=`global-dialog-container`,document.body.appendChild(a))),a),s=()=>{a&&ct(b``,a)},c=e=>b`${ad(Z.parse(e,{async:!1}))}`,l=[];if(t.releaseHistory)if(typeof t.releaseHistory==`function`)try{l=await t.releaseHistory()}catch(e){console.error(`Failed to load release history from app:`,e),l=[]}else l=t.releaseHistory;let u=t.version??`0.0.0`,d=l.length>0?l.findIndex(e=>zg(e.tag_name,u)):-1,f=d>=0?d:0,p=f,m=e=>{if(l.length===0)return``;let t=l[e],n=zg(t.tag_name,u),r=`**Version:** ${t.tag_name}`;n&&(r+=` (Current)`),r+=`

`;let i=new Date(t.published_at).toLocaleDateString();if(r+=`**Released:** ${i}\n\n`,!n){let e=u.replace(/^v/,``),n=t.tag_name.replace(/^v/,``),i=e.split(`.`).map(Number),a=n.split(`.`).map(Number),o=!1;for(let e=0;e<Math.max(i.length,a.length);e++){let t=i[e]||0,n=a[e]||0;if(n>t){o=!0;break}if(n<t)break}o&&(r+=`⚠️ **Update available - reload page to update**

`)}return t.body&&(r+=`---\n\n${t.body}`),r},h=()=>{s()},ee=()=>{s()},g=e=>{let n=m(e),a=l.length>0;ct(b`
                    <wa-dialog 
                        label="About ${t.name??``} - ${u}"
                        open 
                        light-dismiss
                        style="--width: 600px;"
                        @wa-request-close=${h}
                        @wa-after-hide=${ee}
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
                        <small>${t.description??``}</small>
                        <div class="dialog-content">
                            <wa-tab-group>
                                ${l.length>0?b`
                                    <wa-tab slot="nav" panel="release">Release History</wa-tab>
                                    <wa-tab-panel name="release">
                                        ${c(n)}
                                    </wa-tab-panel>
                                `:``}
                                
                                ${r?b`
                                    <wa-tab slot="nav" panel="packages">NPM Packages</wa-tab>
                                    <wa-tab-panel name="packages">
                                        ${i}
                                    </wa-tab-panel>
                                `:``}
                            </wa-tab-group>
                        </div>
                        <div slot="footer">
                            ${a?b`
                                <wa-button 
                                    variant="default"
                                    ?disabled=${e===l.length-1}
                                    @click=${()=>{e<l.length-1&&(p=e+1,g(p))}}
                                >
                                    ← Previous
                                </wa-button>
                                <wa-button 
                                    variant="default"
                                    ?disabled=${e===0}
                                    @click=${()=>{e>0&&(p=e-1,g(p))}}
                                >
                                    Next →
                                </wa-button>
                            `:``}
                            <wa-button variant="primary" data-dialog="close">Close</wa-button>
                        </div>
                    </wa-dialog>
                `,o())};return g(f),new Promise(e=>{let t=()=>{a?.querySelector(`wa-dialog[open]`)?setTimeout(t,100):e()};t()})}}}),w({command:{id:`save`,name:`Save editor`,description:`Saves the active/focused editor`,keyBinding:`CTRL+S`,parameters:[]},handler:{execute:async e=>{let t=Kn.get();t&&t.isDirty()&&t.save()}},contribution:{target:`toolbar:.system.editors`,icon:`floppy-disk`,label:`Save active editor`,slot:`start`,disabled:()=>{let e=Kn.get();return!e||!e.isDirty()}}});var Bg=`theme`;async function Vg(e){let t=document.documentElement;t.classList.remove(`wa-dark`,`wa-light`),t.classList.add(e)}async function Hg(){await Vg(await hm.get(Bg)||`wa-dark`)}async function Ug(e){await hm.set(Bg,e)}w({command:{id:`switch_theme`,name:`Switch theme`,description:`Switches between dark and light theme`,parameters:[]},handler:{execute:async e=>{let t=document.documentElement.classList.contains(`wa-dark`)?`wa-light`:`wa-dark`;await Vg(t),await Ug(t)}},contribution:{target:Xp,icon:`circle-half-stroke`,label:`Theme Switcher`}}),Hg().catch(e=>{console.error(`Failed to load theme preference:`,e)}),w({command:{id:`fullscreen`,name:`Toggle fullscreen`,description:`Toggles fullscreen mode`,parameters:[]},handler:{execute:async e=>{let t=document.documentElement;document.fullscreenElement===t?await document.exitFullscreen():await t.requestFullscreen()}},contribution:{target:Xp,icon:`expand`,label:`Fullscreen`}}),w({command:{id:`open_extensions`,name:`Open Extensions`,description:`Opens the extensions registry`,parameters:[]},handler:{execute:e=>{$h.loadEditor({title:`Extensions`,data:{},key:`system.extensions`,icon:`docks extensions`,state:{},component:e=>b`<docks-extensions id="${e}"></docks-extensions>`},`extensions-editor`).then()}}}),w({command:{id:`list_extensions`,name:`List extensions`,description:`Lists all available extensions with their status (enabled/disabled)`,parameters:[],output:[{name:`extensions`,description:`array of extension objects with id, name, description, experimental flag, and enabled status`}]},handler:{execute:async e=>Sm.getExtensions().map(e=>({id:e.id,name:e.name,description:e.description,experimental:e.experimental,enabled:Sm.isEnabled(e.id)}))}}),w({command:{id:`toast_message`,name:`Toast message to user`,description:`Shows a toast message`,parameters:[{name:`message`,description:`the message to toast`,required:!0},{name:`type`,description:`the toast type: info (default), or error`,required:!1}]},handler:{execute:({params:{message:e,type:t}})=>{e&&(t===`error`?S(e):Hn(e))}}});var Wg=`//#region src/core/js-runtime-worker.js
/**
* Worker entry for JsRuntime: receives code, evaluates in global scope, posts result or error.
* Kept as .js so the worker URL is never .ts (servers often map .ts to video/mp2t MIME type).
*/
self.onmessage = async function(e) {
	const code = e.data;
	try {
		let value = new Function(code)();
		if (value != null && typeof value.then === "function") value = await value;
		try {
			self.postMessage({
				type: "result",
				value
			});
		} catch {
			self.postMessage({
				type: "result",
				value: value === void 0 ? void 0 : String(value)
			});
		}
	} catch (err) {
		self.postMessage({
			type: "error",
			message: err instanceof Error ? err.message : String(err)
		});
	}
};
//#endregion

//# sourceMappingURL=js-runtime-worker-DAva_aXx.js.map`,Gg=typeof self<`u`&&self.Blob&&new Blob([`URL.revokeObjectURL(import.meta.url);`,Wg],{type:`text/javascript;charset=utf-8`});function Kg(e){let t;try{if(t=Gg&&(self.URL||self.webkitURL).createObjectURL(Gg),!t)throw``;let n=new Worker(t,{type:`module`,name:e?.name});return n.addEventListener(`error`,()=>{(self.URL||self.webkitURL).revokeObjectURL(t)}),n}catch{return new Worker(`data:text/javascript;charset=utf-8,`+encodeURIComponent(Wg),{type:`module`,name:e?.name})}}function qg(){let e=null,t=null;function n(){return e||(e=new Kg,e.onmessage=e=>{let n=t;t=null,n&&(e.data.type===`result`?n.resolve(e.data.value):n.reject(Error(e.data.message??`Unknown error`)))},e.onerror=e=>{let n=t;t=null,n&&n.reject(Error(e.message??`Worker error`))}),e}return{execute(e){return new Promise((r,i)=>{t={resolve:r,reject:i},n().postMessage(e)})},close(){e&&=(e.terminate(),null),t=null}}}async function Jg(e){if(e.code?.trim())return e.code.trim();if(!e.script)return S(`Provide 'script' (file path) or 'code'.`),null;let t=await u.getWorkspace();if(!t)return S(`No workspace selected.`),null;try{let n=await t.getResource(e.script);if(!n||!(n instanceof f))return S(`File not found: `+e.script),null;let r=await n.getContents();return typeof r==`string`?r:(S(`File is not a text file`),null)}catch(e){return S(`Failed to access file: ${e instanceof Error?e.message:String(e)}`),null}}w({command:{id:`js`,name:`Run JavaScript file`,description:`Runs a script via JsRuntime (inline or file). Return value or self.postMessage(value) is shown.`,parameters:[{name:`script`,description:`workspace path to a .js file`,required:!1},{name:`code`,description:`inline JavaScript`,required:!1}]},handler:{execute:async e=>{let t=await Jg(e.params??{});if(!t)return;let n=qg();try{let e=await n.execute(t);return e!==void 0&&Hn(String(e)),e}catch(e){S(e instanceof Error?e.message:String(e))}finally{n.close()}}}}),w({command:{id:`open_view_as_editor`,name:`Open view as editor`,description:`Opens a dashboard view in the editor area`,parameters:[{name:`name`,description:`View contribution name`,required:!0},{name:`sourceContributionSlot`,description:`source contribution slot (default: SYSTEM_VIEWS)`,required:!1}]},handler:{execute:async({params:e})=>{let t=e?.name;if(!t)return;let n=e?.sourceContributionSlot??`system-views`,r=C.getContributions(n).find(e=>e.name===t);r?.component&&await $h.openTab(r)}}});async function Yg(e){let t=await u.getWorkspace();if(!t)return S(`No workspace selected.`),null;try{let n=await t.getResource(e);return n instanceof f?n:(S(`File not found: `+e),null)}catch(e){return S(`Failed to access file: ${e.message??e}`),null}}async function Xg(e){try{let t=await e.getContents();return typeof t==`string`?t:(S(`File is not a text file`),null)}catch(e){return S(`Failed to read file: ${e.message??e}`),null}}async function Zg(e){let t=[],n=await e.listChildren(!0);for(let e of n){if(e instanceof f){t.push(e.getWorkspacePath());continue}e instanceof g&&t.push(...await Zg(e))}return t}w({command:{id:`cat`,name:`Cat - Show file contents`,description:`Shows the complete contents of a file`,parameters:[{name:`path`,description:`the path of the file to read`,required:!0}],output:[{name:`content`,description:`the complete contents of the file`}]},handler:{execute:async({params:e})=>{let t=e?.path;if(!t){S(`No file path provided.`);return}let n=await Yg(t);if(n)return Xg(n)}}}),w({command:{id:`exists`,name:`Exists`,description:`Checks if a file exists at the given path (like bash test -f)`,parameters:[{name:`path`,description:`Path of the file to check, relative to the workspace`,required:!0}],output:[{name:`exists`,description:`true if the file exists, false otherwise`}]},handler:{execute:async({params:e})=>{let t=await u.getWorkspace();if(!t)return!1;let n=e?.path;if(!n)return!1;try{return await t.getResource(n)instanceof f}catch{return!1}}}});function Qg(e){return e instanceof f||e instanceof g}var $g=()=>!Qg(Xn.get()),e_=()=>{let e=Xn.get();return!Qg(e)||e instanceof g&&e.getParent()===void 0};C.registerContribution(`filebrowser.create`,{name:`filebrowser.create.file`,command:`touch`,icon:`docks file-plus`,label:`Create File...`,params:{ask:!0}}),C.registerContribution(`filebrowser.create`,{name:`filebrowser.create.folder`,command:`mkdir`,icon:`folder-plus`,label:`Create Folder...`,params:{ask:!0}}),C.registerContribution(`toolbar:view.filebrowser`,{name:`toolbar.filebrowser.rename`,command:`mv`,icon:`pen`,label:`Rename`,disabled:$g}),C.registerContribution(`toolbar:view.filebrowser`,{name:`toolbar.filebrowser.delete`,command:`rm`,icon:`trash`,label:`Delete`,disabled:e_}),C.registerContribution(`contextmenu:view.filebrowser`,{name:`contextmenu.filebrowser.create-folder`,command:`mkdir`,icon:`folder-plus`,label:`Create Folder...`,params:{ask:!0}}),C.registerContribution(`contextmenu:view.filebrowser`,{name:`contextmenu.filebrowser.rename`,command:`mv`,icon:`pen`,label:`Rename`,disabled:$g}),C.registerContribution(`contextmenu:view.filebrowser`,{name:`contextmenu.filebrowser.delete`,command:`rm`,icon:`trash`,label:`Delete`,disabled:e_}),w({command:{id:`head`,name:`Head - Show first lines`,description:`Shows the first N lines of a file`,parameters:[{name:`path`,description:`the path of the file to read`,required:!0},{name:`lines`,description:`number of lines to show from the beginning (default: 10)`,type:`number`,required:!1}],output:[{name:`content`,description:`the first N lines of the file`}]},handler:{execute:async({params:e})=>{let t=e?.path;if(!t){S(`No file path provided.`);return}let n=await Yg(t);if(!n)return;let r=e?.lines?parseInt(e.lines,10):10;if(Number.isNaN(r)||r<1){S(`Number of lines must be a positive integer`);return}let i=await Xg(n);if(i)return i.split(`
`).slice(0,r).join(`
`)}}}),w({command:{id:`ls`,name:`List files`,description:`Lists files from a directory. If recursive is provided, it traverses from the provided directory down to all leaves. If no directory is provided, it will traverse from the workspace root.`,parameters:[{name:`path`,description:`the path of the directory to list, relative to the workspace. If not provided, uses workspace root`,required:!1},{name:`recursive`,description:`whether to recursively traverse all subdirectories`,type:`boolean`,required:!1}],output:[{name:`files`,description:`array of file objects with path and size information`}]},handler:{execute:async({params:e})=>{let t=await u.getWorkspace();if(!t)return S(`No workspace available`),[];let n=e?.path,r=e?.recursive===!0||e?.recursive===`true`;try{let e=t;if(n){let r=await t.getResource(n);if(!r)return S(`Path not found: ${n}`),[];if(!(r instanceof g))return S(`Path is not a directory: ${n}`),[];e=r}if(r){let n=await Zg(e),r=[];for(let e of n){let n=await t.getResource(e);n instanceof f&&r.push({path:e,size:await n.size()})}return r}let i=await e.listChildren(!0),a=[];for(let e of i)e instanceof f&&a.push({path:e.getWorkspacePath(),size:await e.size()});return a}catch(e){return S(`Failed to list files: ${e.message??e}`),[]}}}});function t_(e){return e.replace(/^\/+/,``).replace(/\/+$/,``)}function n_(){let e=Xn.get();if(e instanceof g)return e.getWorkspacePath();if(e instanceof f)return e.getParent()?.getWorkspacePath()}function r_(e,t){return e?`${e}/${t}`:t}async function i_(e){let t=await u.getWorkspace();if(!t){S(`No workspace selected.`);return}let n=`New Folder`,r=r_(e,n),i=await t.getResource(r);if(!i)return r;let a=0;for(;;){if(r=r_(e,`${n} (${a})`),i=await t.getResource(r),!i)return r;a++}}w({command:{id:`mkdir`,name:`mkdir - Create new folder`,description:`Creates a new folder within the workspace.`,parameters:[{name:`path`,description:`the folder path to create, relative to the workspace`,required:!1},{name:`ask`,description:`whether to prompt the user for the folder path`,required:!1}],output:[{name:`path`,description:`the path of the created folder`}]},handler:{execute:async({params:e})=>{let t=e?.ask,n=e?.path,r=await i_(n_());if(!r||(t||!n)&&(n=await xh(`Enter path to new folder:`,n||r),!n))return;let i=n.startsWith(`/`),a=t_(n);if(!a){S(`Folder path must not be empty.`);return}if(!i){let e=n_();e&&!a.startsWith(e+`/`)&&(a=`${e}/${a}`)}let o=await u.getWorkspace();if(!o){S(`No workspace selected.`);return}let s=await o.getResource(a);if(s instanceof g)return Hn(`Folder already exists: ${a}`),a;if(s instanceof f){S(`Cannot create folder. A file already exists at "${a}".`);return}if(!(await o.getResource(`${a}/`,{create:!0})instanceof g)){S(`Could not create folder: ${a}`);return}return Hn(`Folder created: ${a}`),a}}}),w({command:{id:`mv`,name:`mv - Rename a resource (file or directory)`,description:`Renames a resource (file or directory)`,keyBinding:`F2`,parameters:[{name:`path`,description:`the path of the resource within the workspace to rename or the currently active selection`,required:!1},{name:`newName`,description:`the new name for the resource`,required:!1}]},handler:{execute:async e=>{let t=await u.getWorkspace();if(!t){S(`No workspace selected.`);return}let n=e.params?.path,r=null;if(n&&(r=await t.getResource(n)),r||=Xn.get(),!r){S(`No resource to rename provided!`);return}let i=r.getName(),a=e.params?.newName??await xh(`Enter new name for "${i}":`,i);if(!(!a||a===i))try{await r.rename(a),Hn(`Resource renamed to: ${a}`)}catch(e){S(`Failed to rename ${i}: ${e.message??e}`)}}}}),w({command:{id:`rm`,name:`rm - Delete a resource (file or directory)`,description:`Deletes a resource (file or directory)`,keyBinding:`Delete`,parameters:[{name:`path`,description:`the path of the resource within the workspace to delete or the currently active selection`,required:!1},{name:`confirm`,description:`whether to ask the user to confirm the deletion, true by default`,required:!1}]},handler:{execute:async e=>{let t=await u.getWorkspace();if(!t){S(`No workspace selected.`);return}let n=e.params?.path,r=null;if(n&&(r=await t.getResource(n)),r||=Xn.get(),!r){S(`No resource to delete provided!`);return}if(r instanceof g&&r.getParent()===void 0){S(`Root folders cannot be deleted. Use "Disconnect folder" instead.`);return}let i=r.getWorkspacePath(),a=e.params?.confirm;if(!((a===void 0||a===!0)&&!await Th(`Are you sure you want to delete ${i}?`)))try{await r.delete(),Hn(`Resource deleted: `+i)}catch(e){S(`Resource ${i} could not be deleted: ${e.message??e}`)}}}}),w({command:{id:`tail`,name:`Tail - Show last lines`,description:`Shows the last N lines of a file`,parameters:[{name:`path`,description:`the path of the file to read`,required:!0},{name:`lines`,description:`number of lines to show from the end (default: 10)`,type:`number`,required:!1}],output:[{name:`content`,description:`the last N lines of the file`}]},handler:{execute:async({params:e})=>{let t=e?.path;if(!t){S(`No file path provided.`);return}let n=await Yg(t);if(!n)return;let r=e?.lines?parseInt(e.lines,10):10;if(Number.isNaN(r)||r<1){S(`Number of lines must be a positive integer`);return}let i=await Xg(n);if(i)return i.split(`
`).slice(-r).join(`
`)}}}),w({command:{id:`touch`,name:`Touch - Create new file`,description:`Creates a new file within the workspace. For .docks map files, use create_map_file instead.`,parameters:[{name:`path`,description:`the path including name of the file to be created, must be relative to the workspace`,required:!1},{name:`contents`,description:`the textual contents of the file`,required:!1},{name:`ask`,description:`whether to prompt the user for the file path`,required:!1},{name:`extension`,description:`required file extension (e.g., '.docks'), will be appended if missing`,required:!1}],output:[{name:`path`,description:`the path of the created file`}]},handler:{execute:async({params:e})=>{let t=e?.path,n=e?.contents,r=e?.ask,i=e?.extension;if((r||!t)&&(t=await xh(`Enter path to new file (directories will be created if not exist):`,t||``),!t))return;if(i&&!t.endsWith(i)&&(t+=i),t.startsWith(`/`))t=t.slice(1);else{let e=Xn.get(),n=e instanceof g?e.getWorkspacePath():e instanceof f?e.getParent()?.getWorkspacePath():void 0;n&&!t.startsWith(n+`/`)&&(t=n+`/`+t)}let a=await u.getWorkspace();if(!a){S(`No workspace selected.`);return}if(await a.getResource(t)&&!await Th(`File "${t}" already exists. Do you want to overwrite it?`))return;let o=await a.getResource(t,{create:!0});if(!(o instanceof f)){S(`Could not create file: `+t);return}return n&&await o.saveContents(n),Hn(`File created: ${t}`),t}}}),w({command:{id:`wc`,name:`Word count`,description:`Counts lines, words, and characters in a file`,parameters:[{name:`path`,description:`the path of the file to analyze`,required:!0}],output:[{name:`lines`,description:`number of lines in the file`},{name:`words`,description:`number of words in the file`},{name:`characters`,description:`number of characters in the file`}]},handler:{execute:async({params:e})=>{let t=e?.path;if(!t){S(`No file path provided.`);return}let n=await Yg(t);if(!n)return;let r=await Xg(n);if(!r)return;let i=r.split(`
`),a=r.trim(),o=a===``?0:a.split(/\s+/).filter(e=>e.length>0).length;return{lines:i.length,words:o,characters:r.length}}}});function a_(){return`downloaded-file-${new Date().toISOString().replace(/[:.]/g,`-`).replace(`T`,`_`).slice(0,-5)}`}function o_(e){if(e.startsWith(`data:`))return a_();try{let t=new URL(e).pathname.split(`/`).filter(e=>e.length>0),n=t[t.length-1];if(n?.includes(`.`)&&!n.includes(`;`))return n}catch{}return a_()}function s_(e){try{let{protocol:t}=new URL(e);return t===`http:`||t===`https:`||t===`data:`||t===`blob:`}catch{return!1}}w({command:{id:`wget`,name:`wget`,description:`Download a file from a URL to the workspace`,parameters:[{name:`url`,description:`the URL of the file to download`,required:!0},{name:`filename`,description:`optional filename to save as (will be auto-detected if not provided)`,required:!1},{name:`targetPath`,description:`workspace path where to save; if not provided, a file browser dialog is shown to pick a directory`,required:!1}]},handler:{canExecute:e=>{let t=e.params?.url;return!!(t&&s_(t))},execute:async e=>{let t=e.params?.url;if(!t){S(`No URL provided.`);return}let n=await u.getWorkspace();if(!n){S(`No workspace selected.`);return}let r=(typeof e.params?.filename==`string`?e.params.filename.trim():``)||o_(t),i,a=e.params?.targetPath;if(a){let e=await u.getFolders(),t=e.length>0?e[0].name:null,n=a.includes(`/`)?a:t?`${t}/${a}`:a,o=n.split(`/`).pop()??``;i=o.includes(`.`)&&o!==n?n:`${n.replace(/\/$/,``)}/${r}`}else{let e=await Oh(`directory`);if(e==null)return;i=`${e}/${r}`}await gm.runAsync(`Downloading file`,async a=>{a.message=`Starting download...`,a.progress=0;try{let o=await fetch(t,{mode:`cors`,credentials:`omit`});if(!o.ok){S(`Failed to download file: `+o.statusText);return}let s=e.params?.filename;if(!s){let e=o.headers.get(`content-disposition`);if(e){let t=e.match(/filename="?([^";\n]+)"?/);t?.[1]&&(s=t[1].trim())}}s||=r;let c=i.includes(`/`)?i.replace(/\/[^/]+$/,`/${s}`):s;a.message=`Downloading ${s}...`,a.progress=50,await(await n.getResource(c,{create:!0})).saveContents(o.body,{contentType:h.BINARY}),a.progress=100,Hn(`File downloaded: ${s}`)}catch(e){throw S(`Failed to download file: `+String(e)),e}})}}}),c.put(`constants`,Jp),r.put(`html`,b),r.put(`render`,ct),r.put(`toastInfo`,Hn),r.put(`toastError`,S),r.put(`toastWarning`,Un),r.put(`publish`,_),r.put(`subscribe`,o);export{Un as $,Kp as A,O as B,zm as C,Ch as D,Ah as E,ad as F,Kn as G,Zn as H,N as I,C as J,Xn as K,j as L,Wp as M,Q as N,xh as O,qd as P,Hn as Q,A as R,Th as S,Oh as T,Gn as U,ir as V,qn as W,w as X,Jn as Y,S as Z,Zp as _,y as _t,Am as a,On as at,yh as b,cm as c,Tn as ct,tm as d,mn as dt,nr as et,rm as f,ut as ft,Yp as g,b as gt,em as h,Ke as ht,jm as i,yn as it,Vp as j,gm as k,sm as l,Sn as lt,Qp as m,ct as mt,$h as n,Fn as nt,Lh as o,vn as ot,nm as p,x as pt,er as q,Qh as r,En as rt,im as s,_n as st,qg as t,Rn as tt,am as u,pn as ut,Xp as v,se as vt,Sm as w,hm as x,pm as y,k as z};