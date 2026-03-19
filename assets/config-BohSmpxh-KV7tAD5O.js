const $h="modulepreload",_h=function(t){return"/"+t},Al={},Ve=function(e,r,i){let s=Promise.resolve();if(r&&r.length>0){let l=function(d){return Promise.all(d.map(h=>Promise.resolve(h).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),n=o?.nonce||o?.getAttribute("nonce");s=l(r.map(d=>{if(d=_h(d),d in Al)return;Al[d]=!0;const h=d.endsWith(".css"),f=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${f}`))return;const g=document.createElement("link");if(g.rel=h?"stylesheet":$h,h||(g.as="script"),g.crossOrigin="",g.href=d,n&&g.setAttribute("nonce",n),document.head.appendChild(g),h)return new Promise((u,v)=>{g.addEventListener("load",u),g.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${d}`)))})}))}function a(o){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=o,window.dispatchEvent(n),!n.defaultPrevented)throw o}return s.then(o=>{for(const n of o||[])n.status==="rejected"&&a(n.reason);return e().catch(a)})};const $a=globalThis,Pn=$a.ShadowRoot&&($a.ShadyCSS===void 0||$a.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Nn=Symbol(),Ll=new WeakMap;let Wc=class{constructor(e,r,i){if(this._$cssResult$=!0,i!==Nn)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o;const r=this.t;if(Pn&&e===void 0){const i=r!==void 0&&r.length===1;i&&(e=Ll.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Ll.set(r,e))}return e}toString(){return this.cssText}};const Eh=t=>new Wc(typeof t=="string"?t:t+"",void 0,Nn),J=(t,...e)=>{const r=t.length===1?t[0]:e.reduce((i,s,a)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[a+1],t[0]);return new Wc(r,t,Nn)},Ah=(t,e)=>{if(Pn)t.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of e){const i=document.createElement("style"),s=$a.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=r.cssText,t.appendChild(i)}},zl=Pn?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(const i of e.cssRules)r+=i.cssText;return Eh(r)})(t):t;const{is:Lh,defineProperty:zh,getOwnPropertyDescriptor:Th,getOwnPropertyNames:Rh,getOwnPropertySymbols:Dh,getPrototypeOf:Ih}=Object,io=globalThis,Tl=io.trustedTypes,Oh=Tl?Tl.emptyScript:"",Ph=io.reactiveElementPolyfillSupport,Bs=(t,e)=>t,Ra={toAttribute(t,e){switch(e){case Boolean:t=t?Oh:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},Fn=(t,e)=>!Lh(t,e),Rl={attribute:!0,type:String,converter:Ra,reflect:!1,useDefault:!1,hasChanged:Fn};Symbol.metadata??=Symbol("metadata"),io.litPropertyMetadata??=new WeakMap;let Vi=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=Rl){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,r);s!==void 0&&zh(this.prototype,e,s)}}static getPropertyDescriptor(e,r,i){const{get:s,set:a}=Th(this.prototype,e)??{get(){return this[r]},set(o){this[r]=o}};return{get:s,set(o){const n=s?.call(this);a?.call(this,o),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Rl}static _$Ei(){if(this.hasOwnProperty(Bs("elementProperties")))return;const e=Ih(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Bs("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Bs("properties"))){const r=this.properties,i=[...Rh(r),...Dh(r)];for(const s of i)this.createProperty(s,r[s])}const e=this[Symbol.metadata];if(e!==null){const r=litPropertyMetadata.get(e);if(r!==void 0)for(const[i,s]of r)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[r,i]of this.elementProperties){const s=this._$Eu(r,i);s!==void 0&&this._$Eh.set(s,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const r=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)r.unshift(zl(s))}else e!==void 0&&r.push(zl(e));return r}static _$Eu(e,r){const i=r.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,r=this.constructor.elementProperties;for(const i of r.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ah(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,r,i){this._$AK(e,i)}_$ET(e,r){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const a=(i.converter?.toAttribute!==void 0?i.converter:Ra).toAttribute(r,i.type);this._$Em=e,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(e,r){const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const a=i.getPropertyOptions(s),o=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:Ra;this._$Em=s;const n=o.fromAttribute(r,a.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(e,r,i,s=!1,a){if(e!==void 0){const o=this.constructor;if(s===!1&&(a=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??Fn)(a,r)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,r,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:i,reflect:s,wrapped:a},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??r??this[e]),a!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(r=void 0),this._$AL.set(e,r)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,a]of this._$Ep)this[s]=a;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,a]of i){const{wrapped:o}=a,n=this[s];o!==!0||this._$AL.has(s)||n===void 0||this.C(s,void 0,a,n)}}let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(r)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(r)}willUpdate(e){}_$AE(e){this._$EO?.forEach(r=>r.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(r=>this._$ET(r,this[r])),this._$EM()}updated(e){}firstUpdated(e){}};Vi.elementStyles=[],Vi.shadowRootOptions={mode:"open"},Vi[Bs("elementProperties")]=new Map,Vi[Bs("finalized")]=new Map,Ph?.({ReactiveElement:Vi}),(io.reactiveElementVersions??=[]).push("2.1.2");const Bn=globalThis,Dl=t=>t,Da=Bn.trustedTypes,Il=Da?Da.createPolicy("lit-html",{createHTML:t=>t}):void 0,qc="$lit$",Wr=`lit$${Math.random().toFixed(9).slice(2)}$`,Hc="?"+Wr,Nh=`<${Hc}>`,ki=document,Hs=()=>ki.createComment(""),js=t=>t===null||typeof t!="object"&&typeof t!="function",Mn=Array.isArray,Fh=t=>Mn(t)||typeof t?.[Symbol.iterator]=="function",To=`[ 	
\f\r]`,Cs=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ol=/-->/g,Pl=/>/g,hi=RegExp(`>|${To}(?:([^\\s"'>=/]+)(${To}*=${To}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Nl=/'/g,Fl=/"/g,jc=/^(?:script|style|textarea|title)$/i,Bh=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),$=Bh(1),_e=Symbol.for("lit-noChange"),ht=Symbol.for("lit-nothing"),Bl=new WeakMap,wi=ki.createTreeWalker(ki,129);function Kc(t,e){if(!Mn(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Il!==void 0?Il.createHTML(e):e}const Mh=(t,e)=>{const r=t.length-1,i=[];let s,a=e===2?"<svg>":e===3?"<math>":"",o=Cs;for(let n=0;n<r;n++){const l=t[n];let d,h,f=-1,g=0;for(;g<l.length&&(o.lastIndex=g,h=o.exec(l),h!==null);)g=o.lastIndex,o===Cs?h[1]==="!--"?o=Ol:h[1]!==void 0?o=Pl:h[2]!==void 0?(jc.test(h[2])&&(s=RegExp("</"+h[2],"g")),o=hi):h[3]!==void 0&&(o=hi):o===hi?h[0]===">"?(o=s??Cs,f=-1):h[1]===void 0?f=-2:(f=o.lastIndex-h[2].length,d=h[1],o=h[3]===void 0?hi:h[3]==='"'?Fl:Nl):o===Fl||o===Nl?o=hi:o===Ol||o===Pl?o=Cs:(o=hi,s=void 0);const u=o===hi&&t[n+1].startsWith("/>")?" ":"";a+=o===Cs?l+Nh:f>=0?(i.push(d),l.slice(0,f)+qc+l.slice(f)+Wr+u):l+Wr+(f===-2?n:u)}return[Kc(t,a+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class Ks{constructor({strings:e,_$litType$:r},i){let s;this.parts=[];let a=0,o=0;const n=e.length-1,l=this.parts,[d,h]=Mh(e,r);if(this.el=Ks.createElement(d,i),wi.currentNode=this.el.content,r===2||r===3){const f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=wi.nextNode())!==null&&l.length<n;){if(s.nodeType===1){if(s.hasAttributes())for(const f of s.getAttributeNames())if(f.endsWith(qc)){const g=h[o++],u=s.getAttribute(f).split(Wr),v=/([.?@])?(.*)/.exec(g);l.push({type:1,index:a,name:v[2],strings:u,ctor:v[1]==="."?Vh:v[1]==="?"?Wh:v[1]==="@"?qh:ao}),s.removeAttribute(f)}else f.startsWith(Wr)&&(l.push({type:6,index:a}),s.removeAttribute(f));if(jc.test(s.tagName)){const f=s.textContent.split(Wr),g=f.length-1;if(g>0){s.textContent=Da?Da.emptyScript:"";for(let u=0;u<g;u++)s.append(f[u],Hs()),wi.nextNode(),l.push({type:2,index:++a});s.append(f[g],Hs())}}}else if(s.nodeType===8)if(s.data===Hc)l.push({type:2,index:a});else{let f=-1;for(;(f=s.data.indexOf(Wr,f+1))!==-1;)l.push({type:7,index:a}),f+=Wr.length-1}a++}}static createElement(e,r){const i=ki.createElement("template");return i.innerHTML=e,i}}function Xi(t,e,r=t,i){if(e===_e)return e;let s=i!==void 0?r._$Co?.[i]:r._$Cl;const a=js(e)?void 0:e._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),a===void 0?s=void 0:(s=new a(t),s._$AT(t,r,i)),i!==void 0?(r._$Co??=[])[i]=s:r._$Cl=s),s!==void 0&&(e=Xi(t,s._$AS(t,e.values),s,i)),e}class Uh{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:r},parts:i}=this._$AD,s=(e?.creationScope??ki).importNode(r,!0);wi.currentNode=s;let a=wi.nextNode(),o=0,n=0,l=i[0];for(;l!==void 0;){if(o===l.index){let d;l.type===2?d=new so(a,a.nextSibling,this,e):l.type===1?d=new l.ctor(a,l.name,l.strings,this,e):l.type===6&&(d=new Hh(a,this,e)),this._$AV.push(d),l=i[++n]}o!==l?.index&&(a=wi.nextNode(),o++)}return wi.currentNode=ki,s}p(e){let r=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,r),r+=i.strings.length-2):i._$AI(e[r])),r++}}let so=class Gc{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,i,s){this.type=2,this._$AH=ht,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Xi(this,e,r),js(e)?e===ht||e==null||e===""?(this._$AH!==ht&&this._$AR(),this._$AH=ht):e!==this._$AH&&e!==_e&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Fh(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ht&&js(this._$AH)?this._$AA.nextSibling.data=e:this.T(ki.createTextNode(e)),this._$AH=e}$(e){const{values:r,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=Ks.createElement(Kc(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(r);else{const a=new Uh(s,this),o=a.u(this.options);a.p(r),this.T(o),this._$AH=a}}_$AC(e){let r=Bl.get(e.strings);return r===void 0&&Bl.set(e.strings,r=new Ks(e)),r}k(e){Mn(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let i,s=0;for(const a of e)s===r.length?r.push(i=new Gc(this.O(Hs()),this.O(Hs()),this,this.options)):i=r[s],i._$AI(a),s++;s<r.length&&(this._$AR(i&&i._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){const i=Dl(e).nextSibling;Dl(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}};class ao{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,i,s,a){this.type=1,this._$AH=ht,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=ht}_$AI(e,r=this,i,s){const a=this.strings;let o=!1;if(a===void 0)e=Xi(this,e,r,0),o=!js(e)||e!==this._$AH&&e!==_e,o&&(this._$AH=e);else{const n=e;let l,d;for(e=a[0],l=0;l<a.length-1;l++)d=Xi(this,n[i+l],r,l),d===_e&&(d=this._$AH[l]),o||=!js(d)||d!==this._$AH[l],d===ht?e=ht:e!==ht&&(e+=(d??"")+a[l+1]),this._$AH[l]=d}o&&!s&&this.j(e)}j(e){e===ht?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Vh extends ao{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ht?void 0:e}}let Wh=class extends ao{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ht)}},qh=class extends ao{constructor(e,r,i,s,a){super(e,r,i,s,a),this.type=5}_$AI(e,r=this){if((e=Xi(this,e,r,0)??ht)===_e)return;const i=this._$AH,s=e===ht&&i!==ht||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==ht&&(i===ht||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Hh=class{constructor(e,r,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Xi(this,e)}};const jh={I:so},Kh=Bn.litHtmlPolyfillSupport;Kh?.(Ks,so),(Bn.litHtmlVersions??=[]).push("3.3.2");const Ge=(t,e,r)=>{const i=r?.renderBefore??e;let s=i._$litPart$;if(s===void 0){const a=r?.renderBefore??null;i._$litPart$=s=new so(e.insertBefore(Hs(),a),a,void 0,r??{})}return s._$AI(t),s};const Un=globalThis;let yi=class extends Vi{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ge(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return _e}};yi._$litElement$=!0,yi.finalized=!0,Un.litElementHydrateSupport?.({LitElement:yi});const Gh=Un.litElementPolyfillSupport;Gh?.({LitElement:yi});(Un.litElementVersions??=[]).push("4.2.2");const Zh=!1;class Xh{constructor(){this.subscriptions=new Map,this.tokenCounter=0}subscribe(e,r){this.subscriptions.has(e)||this.subscriptions.set(e,new Map);const i=`token_${++this.tokenCounter}_${Date.now()}`;return this.subscriptions.get(e).set(i,r),i}unsubscribe(e){for(const[r,i]of this.subscriptions.entries())if(i.has(e)){i.delete(e),i.size===0&&this.subscriptions.delete(r);return}}publish(e,r){const i=this.subscriptions.get(e);return!i||i.size===0?!1:(queueMicrotask(()=>{i.forEach(s=>{try{s(r)}catch(a){console.error(`Error in event callback for topic "${e}":`,a)}})}),!0)}clearAllSubscriptions(){this.subscriptions.clear()}clearSubscriptions(e){this.subscriptions.delete(e)}}const Vn=new Xh,xe=(t,e)=>Vn.subscribe(t,e),Yh=t=>{Vn.unsubscribe(t)},yt=(t,e)=>Vn.publish(t,e);var pa=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Zc(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var _a={exports:{}};var Qh=_a.exports,Ml;function Jh(){return Ml||(Ml=1,(function(t){(function(e,r){t.exports?t.exports=r():e.Toastify=r()})(Qh,function(e){var r=function(o){return new r.lib.init(o)},i="1.12.0";r.defaults={oldestFirst:!0,text:"Toastify is awesome!",node:void 0,duration:3e3,selector:void 0,callback:function(){},destination:void 0,newWindow:!1,close:!1,gravity:"toastify-top",positionLeft:!1,position:"",backgroundColor:"",avatar:"",className:"",stopOnFocus:!0,onClick:function(){},offset:{x:0,y:0},escapeMarkup:!0,ariaLive:"polite",style:{background:""}},r.lib=r.prototype={toastify:i,constructor:r,init:function(o){return o||(o={}),this.options={},this.toastElement=null,this.options.text=o.text||r.defaults.text,this.options.node=o.node||r.defaults.node,this.options.duration=o.duration===0?0:o.duration||r.defaults.duration,this.options.selector=o.selector||r.defaults.selector,this.options.callback=o.callback||r.defaults.callback,this.options.destination=o.destination||r.defaults.destination,this.options.newWindow=o.newWindow||r.defaults.newWindow,this.options.close=o.close||r.defaults.close,this.options.gravity=o.gravity==="bottom"?"toastify-bottom":r.defaults.gravity,this.options.positionLeft=o.positionLeft||r.defaults.positionLeft,this.options.position=o.position||r.defaults.position,this.options.backgroundColor=o.backgroundColor||r.defaults.backgroundColor,this.options.avatar=o.avatar||r.defaults.avatar,this.options.className=o.className||r.defaults.className,this.options.stopOnFocus=o.stopOnFocus===void 0?r.defaults.stopOnFocus:o.stopOnFocus,this.options.onClick=o.onClick||r.defaults.onClick,this.options.offset=o.offset||r.defaults.offset,this.options.escapeMarkup=o.escapeMarkup!==void 0?o.escapeMarkup:r.defaults.escapeMarkup,this.options.ariaLive=o.ariaLive||r.defaults.ariaLive,this.options.style=o.style||r.defaults.style,o.backgroundColor&&(this.options.style.background=o.backgroundColor),this},buildToast:function(){if(!this.options)throw"Toastify is not initialized";var o=document.createElement("div");o.className="toastify on "+this.options.className,this.options.position?o.className+=" toastify-"+this.options.position:this.options.positionLeft===!0?(o.className+=" toastify-left",console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.")):o.className+=" toastify-right",o.className+=" "+this.options.gravity,this.options.backgroundColor&&console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');for(var n in this.options.style)o.style[n]=this.options.style[n];if(this.options.ariaLive&&o.setAttribute("aria-live",this.options.ariaLive),this.options.node&&this.options.node.nodeType===Node.ELEMENT_NODE)o.appendChild(this.options.node);else if(this.options.escapeMarkup?o.innerText=this.options.text:o.innerHTML=this.options.text,this.options.avatar!==""){var l=document.createElement("img");l.src=this.options.avatar,l.className="toastify-avatar",this.options.position=="left"||this.options.positionLeft===!0?o.appendChild(l):o.insertAdjacentElement("afterbegin",l)}if(this.options.close===!0){var d=document.createElement("button");d.type="button",d.setAttribute("aria-label","Close"),d.className="toast-close",d.innerHTML="&#10006;",d.addEventListener("click",(function(x){x.stopPropagation(),this.removeElement(this.toastElement),window.clearTimeout(this.toastElement.timeOutValue)}).bind(this));var h=window.innerWidth>0?window.innerWidth:screen.width;(this.options.position=="left"||this.options.positionLeft===!0)&&h>360?o.insertAdjacentElement("afterbegin",d):o.appendChild(d)}if(this.options.stopOnFocus&&this.options.duration>0){var f=this;o.addEventListener("mouseover",function(x){window.clearTimeout(o.timeOutValue)}),o.addEventListener("mouseleave",function(){o.timeOutValue=window.setTimeout(function(){f.removeElement(o)},f.options.duration)})}if(typeof this.options.destination<"u"&&o.addEventListener("click",(function(x){x.stopPropagation(),this.options.newWindow===!0?window.open(this.options.destination,"_blank"):window.location=this.options.destination}).bind(this)),typeof this.options.onClick=="function"&&typeof this.options.destination>"u"&&o.addEventListener("click",(function(x){x.stopPropagation(),this.options.onClick()}).bind(this)),typeof this.options.offset=="object"){var g=s("x",this.options),u=s("y",this.options),v=this.options.position=="left"?g:"-"+g,b=this.options.gravity=="toastify-top"?u:"-"+u;o.style.transform="translate("+v+","+b+")"}return o},showToast:function(){this.toastElement=this.buildToast();var o;if(typeof this.options.selector=="string"?o=document.getElementById(this.options.selector):this.options.selector instanceof HTMLElement||typeof ShadowRoot<"u"&&this.options.selector instanceof ShadowRoot?o=this.options.selector:o=document.body,!o)throw"Root element is not defined";var n=r.defaults.oldestFirst?o.firstChild:o.lastChild;return o.insertBefore(this.toastElement,n),r.reposition(),this.options.duration>0&&(this.toastElement.timeOutValue=window.setTimeout((function(){this.removeElement(this.toastElement)}).bind(this),this.options.duration)),this},hideToast:function(){this.toastElement.timeOutValue&&clearTimeout(this.toastElement.timeOutValue),this.removeElement(this.toastElement)},removeElement:function(o){o.className=o.className.replace(" on",""),window.setTimeout((function(){this.options.node&&this.options.node.parentNode&&this.options.node.parentNode.removeChild(this.options.node),o.parentNode&&o.parentNode.removeChild(o),this.options.callback.call(o),r.reposition()}).bind(this),400)}},r.reposition=function(){for(var o={top:15,bottom:15},n={top:15,bottom:15},l={top:15,bottom:15},d=document.getElementsByClassName("toastify"),h,f=0;f<d.length;f++){a(d[f],"toastify-top")===!0?h="toastify-top":h="toastify-bottom";var g=d[f].offsetHeight;h=h.substr(9,h.length-1);var u=15,v=window.innerWidth>0?window.innerWidth:screen.width;v<=360?(d[f].style[h]=l[h]+"px",l[h]+=g+u):a(d[f],"toastify-left")===!0?(d[f].style[h]=o[h]+"px",o[h]+=g+u):(d[f].style[h]=n[h]+"px",n[h]+=g+u)}return this};function s(o,n){return n.offset[o]?isNaN(n.offset[o])?n.offset[o]:n.offset[o]+"px":"0px"}function a(o,n){return!o||typeof n!="string"?!1:!!(o.className&&o.className.trim().split(/\s+/gi).indexOf(n)>-1)}return r.lib.init.prototype=r.lib,r})})(_a)),_a.exports}var tu=Jh();const eu=Zc(tu);var ru=Object.defineProperty,iu=(t,e,r)=>e in t?ru(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Ro=(t,e,r)=>(iu(t,typeof e!="symbol"?e+"":e,r),r),su=(t,e,r)=>{if(!e.has(t))throw TypeError("Cannot "+r)},Do=(t,e)=>{if(Object(e)!==e)throw TypeError('Cannot use the "in" operator on this value');return t.has(e)},fa=(t,e,r)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,r)},Ul=(t,e,r)=>(su(t,e,"access private method"),r);function Xc(t,e){return Object.is(t,e)}let Zt=null,Ms=!1,Ea=1;const Ia=Symbol("SIGNAL");function Hi(t){const e=Zt;return Zt=t,e}function au(){return Zt}function ou(){return Ms}const Wn={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function oo(t){if(Ms)throw new Error(typeof ngDevMode<"u"&&ngDevMode?"Assertion error: signal read during notification phase":"");if(Zt===null)return;Zt.consumerOnSignalRead(t);const e=Zt.nextProducerIndex++;if(Yi(Zt),e<Zt.producerNode.length&&Zt.producerNode[e]!==t&&un(Zt)){const r=Zt.producerNode[e];no(r,Zt.producerIndexOfThis[e])}Zt.producerNode[e]!==t&&(Zt.producerNode[e]=t,Zt.producerIndexOfThis[e]=un(Zt)?Jc(t,Zt,e):0),Zt.producerLastReadVersion[e]=t.version}function nu(){Ea++}function Yc(t){if(!(!t.dirty&&t.lastCleanEpoch===Ea)){if(!t.producerMustRecompute(t)&&!uu(t)){t.dirty=!1,t.lastCleanEpoch=Ea;return}t.producerRecomputeValue(t),t.dirty=!1,t.lastCleanEpoch=Ea}}function Qc(t){if(t.liveConsumerNode===void 0)return;const e=Ms;Ms=!0;try{for(const r of t.liveConsumerNode)r.dirty||cu(r)}finally{Ms=e}}function lu(){return Zt?.consumerAllowSignalWrites!==!1}function cu(t){var e;t.dirty=!0,Qc(t),(e=t.consumerMarkedDirty)==null||e.call(t.wrapper??t)}function du(t){return t&&(t.nextProducerIndex=0),Hi(t)}function hu(t,e){if(Hi(e),!(!t||t.producerNode===void 0||t.producerIndexOfThis===void 0||t.producerLastReadVersion===void 0)){if(un(t))for(let r=t.nextProducerIndex;r<t.producerNode.length;r++)no(t.producerNode[r],t.producerIndexOfThis[r]);for(;t.producerNode.length>t.nextProducerIndex;)t.producerNode.pop(),t.producerLastReadVersion.pop(),t.producerIndexOfThis.pop()}}function uu(t){Yi(t);for(let e=0;e<t.producerNode.length;e++){const r=t.producerNode[e],i=t.producerLastReadVersion[e];if(i!==r.version||(Yc(r),i!==r.version))return!0}return!1}function Jc(t,e,r){var i;if(qn(t),Yi(t),t.liveConsumerNode.length===0){(i=t.watched)==null||i.call(t.wrapper);for(let s=0;s<t.producerNode.length;s++)t.producerIndexOfThis[s]=Jc(t.producerNode[s],t,s)}return t.liveConsumerIndexOfThis.push(r),t.liveConsumerNode.push(e)-1}function no(t,e){var r;if(qn(t),Yi(t),typeof ngDevMode<"u"&&ngDevMode&&e>=t.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${e} is out of bounds of ${t.liveConsumerNode.length} consumers)`);if(t.liveConsumerNode.length===1){(r=t.unwatched)==null||r.call(t.wrapper);for(let s=0;s<t.producerNode.length;s++)no(t.producerNode[s],t.producerIndexOfThis[s])}const i=t.liveConsumerNode.length-1;if(t.liveConsumerNode[e]=t.liveConsumerNode[i],t.liveConsumerIndexOfThis[e]=t.liveConsumerIndexOfThis[i],t.liveConsumerNode.length--,t.liveConsumerIndexOfThis.length--,e<t.liveConsumerNode.length){const s=t.liveConsumerIndexOfThis[e],a=t.liveConsumerNode[e];Yi(a),a.producerIndexOfThis[s]=e}}function un(t){var e;return t.consumerIsAlwaysLive||(((e=t?.liveConsumerNode)==null?void 0:e.length)??0)>0}function Yi(t){t.producerNode??(t.producerNode=[]),t.producerIndexOfThis??(t.producerIndexOfThis=[]),t.producerLastReadVersion??(t.producerLastReadVersion=[])}function qn(t){t.liveConsumerNode??(t.liveConsumerNode=[]),t.liveConsumerIndexOfThis??(t.liveConsumerIndexOfThis=[])}function td(t){if(Yc(t),oo(t),t.value===pn)throw t.error;return t.value}function pu(t){const e=Object.create(fu);e.computation=t;const r=()=>td(e);return r[Ia]=e,r}const Io=Symbol("UNSET"),Oo=Symbol("COMPUTING"),pn=Symbol("ERRORED"),fu={...Wn,value:Io,dirty:!0,error:null,equal:Xc,producerMustRecompute(t){return t.value===Io||t.value===Oo},producerRecomputeValue(t){if(t.value===Oo)throw new Error("Detected cycle in computations.");const e=t.value;t.value=Oo;const r=du(t);let i,s=!1;try{i=t.computation.call(t.wrapper),s=e!==Io&&e!==pn&&t.equal.call(t.wrapper,e,i)}catch(a){i=pn,t.error=a}finally{hu(t,r)}if(s){t.value=e;return}t.value=i,t.version++}};function mu(){throw new Error}let gu=mu;function bu(){gu()}function wu(t){const e=Object.create(xu);e.value=t;const r=()=>(oo(e),e.value);return r[Ia]=e,r}function vu(){return oo(this),this.value}function yu(t,e){lu()||bu(),t.equal.call(t.wrapper,t.value,e)||(t.value=e,ku(t))}const xu={...Wn,equal:Xc,value:void 0};function ku(t){t.version++,nu(),Qc(t)}const ee=Symbol("node");var ae;(t=>{var e,r,i,s;class a{constructor(l,d={}){fa(this,r),Ro(this,e);const f=wu(l)[Ia];if(this[ee]=f,f.wrapper=this,d){const g=d.equals;g&&(f.equal=g),f.watched=d[t.subtle.watched],f.unwatched=d[t.subtle.unwatched]}}get(){if(!(0,t.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return vu.call(this[ee])}set(l){if(!(0,t.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(ou())throw new Error("Writes to signals not permitted during Watcher callback");const d=this[ee];yu(d,l)}}e=ee,r=new WeakSet,t.isState=n=>typeof n=="object"&&Do(r,n),t.State=a;class o{constructor(l,d){fa(this,s),Ro(this,i);const f=pu(l)[Ia];if(f.consumerAllowSignalWrites=!0,this[ee]=f,f.wrapper=this,d){const g=d.equals;g&&(f.equal=g),f.watched=d[t.subtle.watched],f.unwatched=d[t.subtle.unwatched]}}get(){if(!(0,t.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return td(this[ee])}}i=ee,s=new WeakSet,t.isComputed=n=>typeof n=="object"&&Do(s,n),t.Computed=o,(n=>{var l,d,h,f;function g(S){let L,E=null;try{E=Hi(null),L=S()}finally{Hi(E)}return L}n.untrack=g;function u(S){var L;if(!(0,t.isComputed)(S)&&!(0,t.isWatcher)(S))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return((L=S[ee].producerNode)==null?void 0:L.map(E=>E.wrapper))??[]}n.introspectSources=u;function v(S){var L;if(!(0,t.isComputed)(S)&&!(0,t.isState)(S))throw new TypeError("Called introspectSinks without a Signal argument");return((L=S[ee].liveConsumerNode)==null?void 0:L.map(E=>E.wrapper))??[]}n.introspectSinks=v;function b(S){if(!(0,t.isComputed)(S)&&!(0,t.isState)(S))throw new TypeError("Called hasSinks without a Signal argument");const L=S[ee].liveConsumerNode;return L?L.length>0:!1}n.hasSinks=b;function x(S){if(!(0,t.isComputed)(S)&&!(0,t.isWatcher)(S))throw new TypeError("Called hasSources without a Computed or Watcher argument");const L=S[ee].producerNode;return L?L.length>0:!1}n.hasSources=x;class y{constructor(L){fa(this,d),fa(this,h),Ro(this,l);let E=Object.create(Wn);E.wrapper=this,E.consumerMarkedDirty=L,E.consumerIsAlwaysLive=!0,E.consumerAllowSignalWrites=!1,E.producerNode=[],this[ee]=E}watch(...L){if(!(0,t.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");Ul(this,h,f).call(this,L);const E=this[ee];E.dirty=!1;const R=Hi(E);for(const I of L)oo(I[ee]);Hi(R)}unwatch(...L){if(!(0,t.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");Ul(this,h,f).call(this,L);const E=this[ee];Yi(E);for(let R=E.producerNode.length-1;R>=0;R--)if(L.includes(E.producerNode[R].wrapper)){no(E.producerNode[R],E.producerIndexOfThis[R]);const I=E.producerNode.length-1;if(E.producerNode[R]=E.producerNode[I],E.producerIndexOfThis[R]=E.producerIndexOfThis[I],E.producerNode.length--,E.producerIndexOfThis.length--,E.nextProducerIndex--,R<E.producerNode.length){const U=E.producerIndexOfThis[R],O=E.producerNode[R];qn(O),O.liveConsumerIndexOfThis[U]=R}}}getPending(){if(!(0,t.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[ee].producerNode.filter(E=>E.dirty).map(E=>E.wrapper)}}l=ee,d=new WeakSet,h=new WeakSet,f=function(S){for(const L of S)if(!(0,t.isComputed)(L)&&!(0,t.isState)(L))throw new TypeError("Called watch/unwatch without a Computed or State argument")},t.isWatcher=S=>Do(d,S),n.Watcher=y;function k(){var S;return(S=au())==null?void 0:S.wrapper}n.currentComputed=k,n.watched=Symbol("watched"),n.unwatched=Symbol("unwatched")})(t.subtle||(t.subtle={}))})(ae||(ae={}));let Po=!1;const Vl=new ae.subtle.Watcher(()=>{Po||(Po=!0,queueMicrotask(()=>{Po=!1;for(const t of Vl.getPending())t.get();Vl.watch()}))}),Cu=Symbol("SignalWatcherBrand"),Su=new FinalizationRegistry(t=>{t.unwatch(...ae.subtle.introspectSources(t))}),Wl=new WeakMap;function $u(t){return t[Cu]===!0?(console.warn("SignalWatcher should not be applied to the same class more than once."),t):class extends t{constructor(){super(...arguments),this._$St=new Map,this._$So=new ae.State(0),this._$Si=!1}_$Sl(){var e,r;const i=[],s=[];this._$St.forEach((o,n)=>{(o?.beforeUpdate?i:s).push(n)});const a=(e=this.h)===null||e===void 0?void 0:e.getPending().filter(o=>o!==this._$Su&&!this._$St.has(o));i.forEach(o=>o.get()),(r=this._$Su)===null||r===void 0||r.get(),a.forEach(o=>o.get()),s.forEach(o=>o.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(this.h!==void 0)return;this._$Su=new ae.Computed(()=>{this._$So.get(),super.performUpdate()});const e=this.h=new ae.subtle.Watcher(function(){const r=Wl.get(this);r!==void 0&&(r._$Si===!1&&(new Set(this.getPending()).has(r._$Su)?r.requestUpdate():r._$Sv()),this.watch())});Wl.set(e,this),Su.register(this,e),e.watch(this._$Su),e.watch(...Array.from(this._$St).map(([r])=>r))}_$Sp(){if(this.h===void 0)return;let e=!1;this.h.unwatch(...ae.subtle.introspectSources(this.h).filter(r=>{var i;const s=((i=this._$St.get(r))===null||i===void 0?void 0:i.manualDispose)!==!0;return s&&this._$St.delete(r),e||(e=!s),s})),e||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(e,r){var i;this._$S_();const s=new ae.Computed(()=>{e()});return this.h.watch(s),this._$St.set(s,r),(i=r?.beforeUpdate)!==null&&i!==void 0&&i?ae.subtle.untrack(()=>s.get()):this.updateComplete.then(()=>ae.subtle.untrack(()=>s.get())),()=>{this._$St.delete(s),this.h.unwatch(s),this.isConnected===!1&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected===!1&&this._$Sp()})}}}const er={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},hs=t=>(...e)=>({_$litDirective$:t,values:e});let us=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,i){this._$Ct=e,this._$AM=r,this._$Ci=i}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};const{I:_u}=jh,ql=t=>t,Eu=(t,e)=>t?._$litType$!==void 0,ed=t=>t.strings===void 0,Hl=()=>document.createComment(""),Ss=(t,e,r)=>{const i=t._$AA.parentNode,s=e===void 0?t._$AB:e._$AA;if(r===void 0){const a=i.insertBefore(Hl(),s),o=i.insertBefore(Hl(),s);r=new _u(a,o,t,t.options)}else{const a=r._$AB.nextSibling,o=r._$AM,n=o!==t;if(n){let l;r._$AQ?.(t),r._$AM=t,r._$AP!==void 0&&(l=t._$AU)!==o._$AU&&r._$AP(l)}if(a!==s||n){let l=r._$AA;for(;l!==a;){const d=ql(l).nextSibling;ql(i).insertBefore(l,s),l=d}}}return r},ui=(t,e,r=t)=>(t._$AI(e,r),t),Au={},rd=(t,e=Au)=>t._$AH=e,Lu=t=>t._$AH,No=t=>{t._$AR(),t._$AA.remove()};const Us=(t,e)=>{const r=t._$AN;if(r===void 0)return!1;for(const i of r)i._$AO?.(e,!1),Us(i,e);return!0},Oa=t=>{let e,r;do{if((e=t._$AM)===void 0)break;r=e._$AN,r.delete(t),t=e}while(r?.size===0)},id=t=>{for(let e;e=t._$AM;t=e){let r=e._$AN;if(r===void 0)e._$AN=r=new Set;else if(r.has(t))break;r.add(t),Ru(e)}};function zu(t){this._$AN!==void 0?(Oa(this),this._$AM=t,id(this)):this._$AM=t}function Tu(t,e=!1,r=0){const i=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(e)if(Array.isArray(i))for(let a=r;a<i.length;a++)Us(i[a],!1),Oa(i[a]);else i!=null&&(Us(i,!1),Oa(i));else Us(this,t)}const Ru=t=>{t.type==er.CHILD&&(t._$AP??=Tu,t._$AQ??=zu)};class Du extends us{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,r,i){super._$AT(e,r,i),id(this),this.isConnected=e._$AU}_$AO(e,r=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),r&&(Us(this,e),Oa(this))}setValue(e){if(ed(this._$Ct))this._$Ct._$AI(e,this);else{const r=[...this._$Ct._$AH];r[this._$Ci]=e,this._$Ct._$AI(r,this,0)}}disconnected(){}reconnected(){}}let Fo=!1;const jl=new ae.subtle.Watcher(async()=>{Fo||(Fo=!0,queueMicrotask(()=>{Fo=!1;for(const t of jl.getPending())t.get();jl.watch()}))});ae.State;ae.Computed;const ci=(t,e)=>new ae.State(t,e);class Hn{constructor(e){this.children=[],this.variables=e,this.proxy=new Proxy(e,this)}get(e,r){return e[r]||this.parent?.getProxy()[r]}set(e,r,i){e[r]=i}put(e,r){this.variables[e]=r}getProxy(){return this.proxy}createChild(e={}){const r=new Hn(e);return r.parent=this,this.children.push(r),r}getChildren(){return this.children}getParent(){return this.parent}destroy(){const e=this.parent?.children.indexOf(this);e!==void 0&&e>=0&&this.parent?.children.splice(e,1),this.parent=void 0}}const pe=new Hn({}),di=pe.createChild({}),Kl={debug:0,info:1,warning:2,error:3};let Iu="debug";const Wi={log:console.log.bind(console),info:console.info.bind(console),warn:console.warn.bind(console),error:console.error.bind(console),debug:console.debug.bind(console)};let Pa=null;const fn=[];function br(t){if(t===null)return"null";if(t===void 0)return"undefined";if(typeof t=="string")return t;if(typeof t=="number"||typeof t=="boolean")return String(t);if(t instanceof Error)return`${t.name}: ${t.message}`;try{return JSON.stringify(t)}catch{return String(t)}}class Ou{constructor(e){this.source=e}info(e,...r){const i=r.length===0?e:`${e} ${r.map(s=>br(s)).join(" ")}`;this.log(i,"info")}warning(e,...r){const i=r.length===0?e:`${e} ${r.map(s=>br(s)).join(" ")}`;this.log(i,"warning")}warn(e,...r){const i=r.length===0?e:`${e} ${r.map(s=>br(s)).join(" ")}`;this.log(i,"warning")}error(e,...r){const i=r.length===0?e:`${e} ${r.map(s=>br(s)).join(" ")}`;this.log(i,"error")}debug(e,...r){const i=r.length===0?e:`${e} ${r.map(s=>br(s)).join(" ")}`;this.log(i,"debug")}log(e,r){qi(this.source,e,r)}}function Pu(t){return Kl[t]>=Kl[Iu]}function qi(t,e,r){Pu(r)&&(Pa?Pa(t,e,r):(fn.push({source:t,message:e,level:r}),Wi[r==="error"?"error":r==="warning"?"warn":r==="debug"?"debug":"log"](`[${t}] ${e}`)))}function Nu(){console.log=function(...t){Wi.log.apply(console,t),qi("Console",t.map(e=>br(e)).join(" "),"info")},console.info=function(...t){Wi.info.apply(console,t),qi("Console",t.map(e=>br(e)).join(" "),"info")},console.warn=function(...t){Wi.warn.apply(console,t),qi("Console",t.map(e=>br(e)).join(" "),"warning")},console.error=function(...t){Wi.error.apply(console,t),qi("Console",t.map(e=>br(e)).join(" "),"error")},console.debug=function(...t){Wi.debug.apply(console,t),qi("Console",t.map(e=>br(e)).join(" "),"debug")}}Nu();function Fu(t){for(Pa=t;fn.length>0;){const e=fn.shift();e&&t(e.source,e.message,e.level)}}function Bu(){Pa=null}function Br(t){return new Ou(t)}const Rt=Br("System");pe.put("logger",Rt);const jn=Br("Toast"),Mu=4e3,Uu={duration:Mu,gravity:"bottom",position:"right",close:!0},Kn=(t,e)=>{eu({...Uu,text:t,style:e}).showToast()},oe=t=>{jn.info(t),Kn(t,{background:"var(--wa-color-brand-50)",color:"var(--wa-color-brand-on)"})},at=t=>{jn.error(t),Kn(t,{background:"var(--wa-color-danger-50)",color:"var(--wa-color-danger-on)"})},Vu=t=>{jn.warn(t),Kn(t,{background:"var(--wa-color-warning-50)",color:"var(--wa-color-warning-on)"})};class Wu{constructor(){this.globalNameRemaps=new Map,this.appNameRemaps=new Map}setGlobalNameRemap(e,r){this.globalNameRemaps.set(e,this.normalizeTargets(r))}resetForTesting(){this.globalNameRemaps.clear(),this.appNameRemaps.clear()}applyAppNameRemaps(e){if(this.appNameRemaps.clear(),!!e)for(const r of e)this.appNameRemaps.set(r.name,this.normalizeTargets(r.targets))}getEffectiveTargets(e,r){const i=r.name;if(!i)return[e];const s=this.appNameRemaps.get(i);if(s)return s.length>0?s:[];const a=this.globalNameRemaps.get(i);return a?a.length>0?a:[]:[e]}listNameRemaps(){const e={},r=new Set([...this.globalNameRemaps.keys(),...this.appNameRemaps.keys()]);for(const i of r)e[i]={appTargets:this.appNameRemaps.get(i),globalTargets:this.globalNameRemaps.get(i)};return e}normalizeTargets(e){const r=new Set,i=[];for(const s of e)!s||r.has(s)||(r.add(s),i.push(s));return i}}const Na=new Wu;pe.put("contributionTargetMappingRegistry",Na);const ar="events/contributionregistry/contributionsChanged";class qu{constructor(){this.contributions=new Map}registerContribution(e,r){const i=this.getOrCreateSlot(e);if("command"in r){const a=r;a.disabled instanceof Function&&(a.disabled=new ae.Computed(a.disabled))}i.push(r),yt(ar,{target:e,contributions:i});const s=Na.getEffectiveTargets(e,r);for(const a of s){if(a===e)continue;const o=this.getContributions(a);yt(ar,{target:a,contributions:o})}}getContributions(e){const r=[];for(const[i,s]of this.contributions.entries()){const a=s;for(const o of a)Na.getEffectiveTargets(i,o).includes(e)&&r.push(o)}return r.length===0&&this.getOrCreateSlot(e),r}getOrCreateSlot(e){return this.contributions.has(e)||this.contributions.set(e,[]),this.contributions.get(e)}}const gt=new qu;pe.put("contributionRegistry",gt);const Ke=ci(null),Rs=ci(null),mn=ci(null),gn=ci(0),Jt=ci(void 0);ci({name:"",timestamp:0});const sd="events/commandregistry/commandRegistered";class Hu{constructor(e,r,i,s,a){this.id=e,this.name=r,this.description=i,this.parameters=s||[],this.output=a||[]}}class ju{constructor(){this.commands={},this.handlers=new Map}registerHandler(e,r){this.handlers.has(e)||this.handlers.set(e,[]);const i=this.handlers.get(e);i.push(r),i.sort((s,a)=>(a.ranking??0)-(s.ranking??0))}getHandler(e){return this.handlers.get(e)}createExecutionContext(e){return{params:e||{},activePart:Ke.get(),activeEditor:Rs.get()}}execute(e,r={}){const i=this.getHandler(e);if(!i)throw Rt.debug(`[CommandRegistry] No handlers registered for command: ${e}`),new Error(`No handlers registered for command: ${e}`);const s=this.getCommand(e),a=r.params?` params: ${JSON.stringify(r.params)}`:"";Rt.debug(`[CommandRegistry] Executing command: ${e}${s?` (${s.name})`:""}${a}`);for(const o of i)if(o.canExecute===void 0||o.canExecute(r))try{const n=o.execute(r);return Rt.debug(`[CommandRegistry] Command executed successfully: ${e} (result: ${n})`),n}catch(n){const l=n instanceof Error?n.message:String(n);throw Rt.error(`[CommandRegistry] Command execution failed: ${e} - ${l}`),n}Rt.error(`[CommandRegistry] No handler found to execute command: ${e}`)}createAndRegisterCommand(e,r,i,s,a){const o=new Hu(e,r,i,s);this.registerCommand(o),a&&this.registerHandler(e,a)}registerCommand(e){this.commands[e.id]=e,yt(sd,e)}hasCommand(e){return e in this.commands}listCommands(e){return e?Object.values(this.commands).filter(r=>(Kr.getHandler(r.id)||[]).some(s=>s.canExecute===void 0||s.canExecute(e))).reduce((r,i)=>(r[i.id]=i,r),{}):this.commands}getCommand(e){return this.commands[e]}registerAll(e){const r=e.command.id;this.registerCommand(e.command),e.handler&&this.registerHandler(r,e.handler),e.contribution&&e.contribution.target&&gt.registerContribution(e.contribution.target,{command:r,...e.contribution})}}const Kr=new ju;pe.put("commandRegistry",Kr);const Tt=t=>{Kr.registerAll(t)},ad=(t,e)=>{const r=new ae.subtle.Watcher(async()=>{try{await 0,e(t.get())}finally{r.watch(t)}});return r.watch(t),t.get(),()=>{r.unwatch(t)}};Object.defineProperty(yi.prototype,"model",{enumerable:!0,configurable:!0,writable:!0});const Ku=$u(yi);class lo extends Ku{constructor(){super(...arguments),this.signalCleanups=new Set,this.eventSubscriptions=new Set}connectedCallback(){super.connectedCallback(),this.doBeforeUI()}disconnectedCallback(){super.disconnectedCallback(),this.eventSubscriptions.forEach(e=>Yh(e)),this.eventSubscriptions.clear(),this.signalCleanups.forEach(e=>e()),this.signalCleanups.clear()}subscribe(e,r){const i=xe(e,r.bind(this));this.eventSubscriptions.add(i)}showInfo(e){oe(e)}showError(e){at(e)}nobubble(e){return r=>{r.stopPropagation(),e.bind(this)(r)}}command(e,r={}){return()=>{this.executeCommand(e,r)}}executeCommand(e,r){const i=Kr.createExecutionContext(r);Kr.execute(e,i)}watch(e,r){const i=ad(e,r.bind(this));this.signalCleanups.add(i)}firstUpdated(e){super.firstUpdated(e),this.doInitUI()}updateIdle(){requestIdleCallback(()=>this.requestUpdate())}updateLater(){requestAnimationFrame(()=>this.requestUpdate())}doBeforeUI(){}doInitUI(){}withRefresh(e){e(),this.updateLater()}}const X=t=>(e,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};const Gu={attribute:!0,type:String,converter:Ra,reflect:!1,hasChanged:Fn},Zu=(t=Gu,e,r)=>{const{kind:i,metadata:s}=r;let a=globalThis.litPropertyMetadata.get(s);if(a===void 0&&globalThis.litPropertyMetadata.set(s,a=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),a.set(r.name,t),i==="accessor"){const{name:o}=r;return{set(n){const l=e.get.call(this);e.set.call(this,n),this.requestUpdate(o,l,t,!0,n)},init(n){return n!==void 0&&this.C(o,void 0,t,n),n}}}if(i==="setter"){const{name:o}=r;return function(n){const l=this[o];e.call(this,n),this.requestUpdate(o,l,t,!0,n)}}throw Error("Unsupported decorator location: "+i)};function p(t){return(e,r)=>typeof r=="object"?Zu(t,e,r):((i,s,a)=>{const o=s.hasOwnProperty(a);return s.constructor.createProperty(a,i),o?Object.getOwnPropertyDescriptor(s,a):void 0})(t,e,r)}function Z(t){return p({...t,state:!0,attribute:!1})}function co(t){return(e,r)=>{const i=typeof e=="function"?e:e[r];Object.assign(i,t)}}const od=(t,e,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,r),r);function Q(t,e){return(r,i,s)=>{const a=o=>o.renderRoot?.querySelector(t)??null;return od(r,i,{get(){return a(this)}})}}function Xu(t){return(e,r)=>od(e,r,{async get(){return await this.updateComplete,this.renderRoot?.querySelector(t)??null}})}const nd="important",Yu=" !"+nd,Vt=hs(class extends us{constructor(t){if(super(t),t.type!==er.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{const i=t[r];return i==null?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:r}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?r.removeProperty(i):r[i]=null);for(const i in e){const s=e[i];if(s!=null){this.ft.add(i);const a=typeof s=="string"&&s.endsWith(Yu);i.includes("-")||a?r.setProperty(i,a?s.slice(0,-11):s,a?nd:""):r[i]=s}}return _e}});let bn=class extends us{constructor(e){if(super(e),this.it=ht,e.type!==er.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===ht||e==null)return this._t=void 0,this.it=e;if(e===_e)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};bn.directiveName="unsafeHTML",bn.resultType=1;const Dr=hs(bn);const Gr=()=>new Qu;class Qu{}const Bo=new WeakMap,Zr=hs(class extends Du{render(t){return ht}update(t,[e]){const r=e!==this.G;return r&&this.G!==void 0&&this.rt(void 0),(r||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),ht}rt(t){if(this.isConnected||(t=void 0),typeof this.G=="function"){const e=this.ht??globalThis;let r=Bo.get(e);r===void 0&&(r=new WeakMap,Bo.set(e,r)),r.get(this.G)!==void 0&&this.G.call(this.ht,void 0),r.set(this.G,t),t!==void 0&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return typeof this.G=="function"?Bo.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});function se(t,e,r){return t?e(t):r?.(t)}const Gl=(t,e,r)=>{const i=new Map;for(let s=e;s<=r;s++)i.set(t[s],s);return i},Ju=hs(class extends us{constructor(t){if(super(t),t.type!==er.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,e,r){let i;r===void 0?r=e:e!==void 0&&(i=e);const s=[],a=[];let o=0;for(const n of t)s[o]=i?i(n,o):o,a[o]=r(n,o),o++;return{values:a,keys:s}}render(t,e,r){return this.dt(t,e,r).values}update(t,[e,r,i]){const s=Lu(t),{values:a,keys:o}=this.dt(e,r,i);if(!Array.isArray(s))return this.ut=o,a;const n=this.ut??=[],l=[];let d,h,f=0,g=s.length-1,u=0,v=a.length-1;for(;f<=g&&u<=v;)if(s[f]===null)f++;else if(s[g]===null)g--;else if(n[f]===o[u])l[u]=ui(s[f],a[u]),f++,u++;else if(n[g]===o[v])l[v]=ui(s[g],a[v]),g--,v--;else if(n[f]===o[v])l[v]=ui(s[f],a[v]),Ss(t,l[v+1],s[f]),f++,v--;else if(n[g]===o[u])l[u]=ui(s[g],a[u]),Ss(t,s[f],s[g]),g--,u++;else if(d===void 0&&(d=Gl(o,u,v),h=Gl(n,f,g)),d.has(n[f]))if(d.has(n[g])){const b=h.get(o[u]),x=b!==void 0?s[b]:null;if(x===null){const y=Ss(t,s[f]);ui(y,a[u]),l[u]=y}else l[u]=ui(x,a[u]),Ss(t,s[f],x),s[b]=null;u++}else No(s[g]),g--;else No(s[f]),f++;for(;u<=v;){const b=Ss(t,l[v+1]);ui(b,a[u]),l[u++]=b}for(;f<=g;){const b=s[f++];b!==null&&No(b)}return this.ut=o,rd(t,l),_e}});const st=t=>t??ht;function Gn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Di=Gn();function ld(t){Di=t}var mi={exec:()=>null};function Ct(t,e=""){let r=typeof t=="string"?t:t.source,i={replace:(s,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(ve.caret,"$1"),r=r.replace(s,o),i},getRegex:()=>new RegExp(r,e)};return i}var tp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ve={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}>`)},ep=/^(?:[ \t]*(?:\n|$))+/,rp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ip=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ta=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,sp=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Zn=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,cd=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,dd=Ct(cd).replace(/bull/g,Zn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ap=Ct(cd).replace(/bull/g,Zn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Xn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,op=/^[^\n]+/,Yn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,np=Ct(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Yn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),lp=Ct(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Zn).getRegex(),ho="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Qn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,cp=Ct("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Qn).replace("tag",ho).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),hd=Ct(Xn).replace("hr",ta).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ho).getRegex(),dp=Ct(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",hd).getRegex(),Jn={blockquote:dp,code:rp,def:np,fences:ip,heading:sp,hr:ta,html:cp,lheading:dd,list:lp,newline:ep,paragraph:hd,table:mi,text:op},Zl=Ct("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ta).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ho).getRegex(),hp={...Jn,lheading:ap,table:Zl,paragraph:Ct(Xn).replace("hr",ta).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Zl).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ho).getRegex()},up={...Jn,html:Ct(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Qn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:mi,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ct(Xn).replace("hr",ta).replace("heading",` *#{1,6} *[^
]`).replace("lheading",dd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},pp=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,fp=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ud=/^( {2,}|\\)\n(?!\s*$)/,mp=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,uo=/[\p{P}\p{S}]/u,tl=/[\s\p{P}\p{S}]/u,pd=/[^\s\p{P}\p{S}]/u,gp=Ct(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,tl).getRegex(),fd=/(?!~)[\p{P}\p{S}]/u,bp=/(?!~)[\s\p{P}\p{S}]/u,wp=/(?:[^\s\p{P}\p{S}]|~)/u,md=/(?![*_])[\p{P}\p{S}]/u,vp=/(?![*_])[\s\p{P}\p{S}]/u,yp=/(?:[^\s\p{P}\p{S}]|[*_])/u,xp=Ct(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",tp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),gd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,kp=Ct(gd,"u").replace(/punct/g,uo).getRegex(),Cp=Ct(gd,"u").replace(/punct/g,fd).getRegex(),bd="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Sp=Ct(bd,"gu").replace(/notPunctSpace/g,pd).replace(/punctSpace/g,tl).replace(/punct/g,uo).getRegex(),$p=Ct(bd,"gu").replace(/notPunctSpace/g,wp).replace(/punctSpace/g,bp).replace(/punct/g,fd).getRegex(),_p=Ct("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,pd).replace(/punctSpace/g,tl).replace(/punct/g,uo).getRegex(),Ep=Ct(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,md).getRegex(),Ap="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",Lp=Ct(Ap,"gu").replace(/notPunctSpace/g,yp).replace(/punctSpace/g,vp).replace(/punct/g,md).getRegex(),zp=Ct(/\\(punct)/,"gu").replace(/punct/g,uo).getRegex(),Tp=Ct(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Rp=Ct(Qn).replace("(?:-->|$)","-->").getRegex(),Dp=Ct("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Rp).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Fa=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ip=Ct(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",Fa).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),wd=Ct(/^!?\[(label)\]\[(ref)\]/).replace("label",Fa).replace("ref",Yn).getRegex(),vd=Ct(/^!?\[(ref)\](?:\[\])?/).replace("ref",Yn).getRegex(),Op=Ct("reflink|nolink(?!\\()","g").replace("reflink",wd).replace("nolink",vd).getRegex(),Xl=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,el={_backpedal:mi,anyPunctuation:zp,autolink:Tp,blockSkip:xp,br:ud,code:fp,del:mi,delLDelim:mi,delRDelim:mi,emStrongLDelim:kp,emStrongRDelimAst:Sp,emStrongRDelimUnd:_p,escape:pp,link:Ip,nolink:vd,punctuation:gp,reflink:wd,reflinkSearch:Op,tag:Dp,text:mp,url:mi},Pp={...el,link:Ct(/^!?\[(label)\]\((.*?)\)/).replace("label",Fa).getRegex(),reflink:Ct(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Fa).getRegex()},wn={...el,emStrongRDelimAst:$p,emStrongLDelim:Cp,delLDelim:Ep,delRDelim:Lp,url:Ct(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Xl).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ct(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Xl).getRegex()},Np={...wn,br:Ct(ud).replace("{2,}","*").getRegex(),text:Ct(wn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ma={normal:Jn,gfm:hp,pedantic:up},$s={normal:el,gfm:wn,breaks:Np,pedantic:Pp},Fp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Yl=t=>Fp[t];function gr(t,e){if(e){if(ve.escapeTest.test(t))return t.replace(ve.escapeReplace,Yl)}else if(ve.escapeTestNoEncode.test(t))return t.replace(ve.escapeReplaceNoEncode,Yl);return t}function Ql(t){try{t=encodeURI(t).replace(ve.percentDecode,"%")}catch{return null}return t}function Jl(t,e){let r=t.replace(ve.findPipe,(a,o,n)=>{let l=!1,d=o;for(;--d>=0&&n[d]==="\\";)l=!l;return l?"|":" |"}),i=r.split(ve.splitPipe),s=0;if(i[0].trim()||i.shift(),i.length>0&&!i.at(-1)?.trim()&&i.pop(),e)if(i.length>e)i.splice(e);else for(;i.length<e;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(ve.slashPipe,"|");return i}function _s(t,e,r){let i=t.length;if(i===0)return"";let s=0;for(;s<i&&t.charAt(i-s-1)===e;)s++;return t.slice(0,i-s)}function Bp(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let i=0;i<t.length;i++)if(t[i]==="\\")i++;else if(t[i]===e[0])r++;else if(t[i]===e[1]&&(r--,r<0))return i;return r>0?-2:-1}function Mp(t,e=0){let r=e,i="";for(let s of t)if(s==="	"){let a=4-r%4;i+=" ".repeat(a),r+=a}else i+=s,r++;return i}function tc(t,e,r,i,s){let a=e.href,o=e.title||null,n=t[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;let l={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:a,title:o,text:n,tokens:i.inlineTokens(n)};return i.state.inLink=!1,l}function Up(t,e,r){let i=t.match(r.other.indentCodeCompensation);if(i===null)return e;let s=i[1];return e.split(`
`).map(a=>{let o=a.match(r.other.beginningSpace);if(o===null)return a;let[n]=o;return n.length>=s.length?a.slice(s.length):a}).join(`
`)}var Ba=class{options;rules;lexer;constructor(t){this.options=t||Di}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:_s(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],i=Up(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:i}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let i=_s(r,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(r=i.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:_s(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=_s(e[0],`
`).split(`
`),i="",s="",a=[];for(;r.length>0;){let o=!1,n=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))n.push(r[l]),o=!0;else if(!o)n.push(r[l]);else break;r=r.slice(l);let d=n.join(`
`),h=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${d}`:d,s=s?`${s}
${h}`:h;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,a,!0),this.lexer.state.top=f,r.length===0)break;let g=a.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let u=g,v=u.raw+`
`+r.join(`
`),b=this.blockquote(v);a[a.length-1]=b,i=i.substring(0,i.length-u.raw.length)+b.raw,s=s.substring(0,s.length-u.text.length)+b.text;break}else if(g?.type==="list"){let u=g,v=u.raw+`
`+r.join(`
`),b=this.list(v);a[a.length-1]=b,i=i.substring(0,i.length-g.raw.length)+b.raw,s=s.substring(0,s.length-u.raw.length)+b.raw,r=v.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),i=r.length>1,s={type:"list",raw:"",ordered:i,start:i?+r.slice(0,-1):"",loose:!1,items:[]};r=i?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=i?r:"[*+-]");let a=this.rules.other.listItemRegex(r),o=!1;for(;t;){let l=!1,d="",h="";if(!(e=a.exec(t))||this.rules.block.hr.test(t))break;d=e[0],t=t.substring(d.length);let f=Mp(e[2].split(`
`,1)[0],e[1].length),g=t.split(`
`,1)[0],u=!f.trim(),v=0;if(this.options.pedantic?(v=2,h=f.trimStart()):u?v=e[1].length+1:(v=f.search(this.rules.other.nonSpaceChar),v=v>4?1:v,h=f.slice(v),v+=e[1].length),u&&this.rules.other.blankLine.test(g)&&(d+=g+`
`,t=t.substring(g.length+1),l=!0),!l){let b=this.rules.other.nextBulletRegex(v),x=this.rules.other.hrRegex(v),y=this.rules.other.fencesBeginRegex(v),k=this.rules.other.headingBeginRegex(v),S=this.rules.other.htmlBeginRegex(v),L=this.rules.other.blockquoteBeginRegex(v);for(;t;){let E=t.split(`
`,1)[0],R;if(g=E,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),R=g):R=g.replace(this.rules.other.tabCharGlobal,"    "),y.test(g)||k.test(g)||S.test(g)||L.test(g)||b.test(g)||x.test(g))break;if(R.search(this.rules.other.nonSpaceChar)>=v||!g.trim())h+=`
`+R.slice(v);else{if(u||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||y.test(f)||k.test(f)||x.test(f))break;h+=`
`+g}u=!g.trim(),d+=E+`
`,t=t.substring(E.length+1),f=R.slice(v)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(o=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(h),loose:!1,text:h,tokens:[]}),s.raw+=d}let n=s.items.at(-1);if(n)n.raw=n.raw.trimEnd(),n.text=n.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let h=this.lexer.inlineQueue.length-1;h>=0;h--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)){this.lexer.inlineQueue[h].src=this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(l.raw);if(d){let h={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};l.checked=h.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=h.raw+l.tokens[0].raw,l.tokens[0].text=h.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(h)):l.tokens.unshift({type:"paragraph",raw:h.raw,text:h.raw,tokens:[h]}):l.tokens.unshift(h)}}if(!s.loose){let d=l.tokens.filter(f=>f.type==="space"),h=d.length>0&&d.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=h}}if(s.loose)for(let l of s.items){l.loose=!0;for(let d of l.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:i,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Jl(e[1]),i=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===i.length){for(let o of i)this.rules.other.tableAlignRight.test(o)?a.align.push("right"):this.rules.other.tableAlignCenter.test(o)?a.align.push("center"):this.rules.other.tableAlignLeft.test(o)?a.align.push("left"):a.align.push(null);for(let o=0;o<r.length;o++)a.header.push({text:r[o],tokens:this.lexer.inline(r[o]),header:!0,align:a.align[o]});for(let o of s)a.rows.push(Jl(o,a.header.length).map((n,l)=>({text:n,tokens:this.lexer.inline(n),header:!1,align:a.align[l]})));return a}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let a=_s(r.slice(0,-1),"\\");if((r.length-a.length)%2===0)return}else{let a=Bp(e[2],"()");if(a===-2)return;if(a>-1){let o=(e[0].indexOf("!")===0?5:4)+e[1].length+a;e[2]=e[2].substring(0,a),e[0]=e[0].substring(0,o).trim(),e[3]=""}}let i=e[2],s="";if(this.options.pedantic){let a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],s=a[3])}else s=e[3]?e[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?i=i.slice(1):i=i.slice(1,-1)),tc(e,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let i=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[i.toLowerCase()];if(!s){let a=r[0].charAt(0);return{type:"text",raw:a,text:a}}return tc(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let i=this.rules.inline.emStrongLDelim.exec(t);if(!(!i||i[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...i[0]].length-1,a,o,n=s,l=0,d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,e=e.slice(-1*t.length+s);(i=d.exec(e))!=null;){if(a=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!a)continue;if(o=[...a].length,i[3]||i[4]){n+=o;continue}else if((i[5]||i[6])&&s%3&&!((s+o)%3)){l+=o;continue}if(n-=o,n>0)continue;o=Math.min(o,o+n+l);let h=[...i[0]][0].length,f=t.slice(0,s+i.index+h+o);if(Math.min(s,o)%2){let u=f.slice(1,-1);return{type:"em",raw:f,text:u,tokens:this.lexer.inlineTokens(u)}}let g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return i&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t,e,r=""){let i=this.rules.inline.delLDelim.exec(t);if(i&&(!i[1]||!r||this.rules.inline.punctuation.exec(r))){let s=[...i[0]].length-1,a,o,n=s,l=this.rules.inline.delRDelim;for(l.lastIndex=0,e=e.slice(-1*t.length+s);(i=l.exec(e))!=null;){if(a=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!a||(o=[...a].length,o!==s))continue;if(i[3]||i[4]){n+=o;continue}if(n-=o,n>0)continue;o=Math.min(o,o+n);let d=[...i[0]][0].length,h=t.slice(0,s+i.index+d+o),f=h.slice(s,-s);return{type:"del",raw:h,text:f,tokens:this.lexer.inlineTokens(f)}}}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,i;return e[2]==="@"?(r=e[1],i="mailto:"+r):(r=e[1],i=r),{type:"link",raw:e[0],text:r,href:i,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,i;if(e[2]==="@")r=e[0],i="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?i="http://"+e[0]:i=e[0]}return{type:"link",raw:e[0],text:r,href:i,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},rr=class vn{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Di,this.options.tokenizer=this.options.tokenizer||new Ba,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:ve,block:ma.normal,inline:$s.normal};this.options.pedantic?(r.block=ma.pedantic,r.inline=$s.pedantic):this.options.gfm&&(r.block=ma.gfm,this.options.breaks?r.inline=$s.breaks:r.inline=$s.gfm),this.tokenizer.rules=r}static get rules(){return{block:ma,inline:$s}}static lex(e,r){return new vn(r).lex(e)}static lexInline(e,r){return new vn(r).inlineTokens(e)}lex(e){e=e.replace(ve.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let i=this.inlineQueue[r];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],i=!1){for(this.options.pedantic&&(e=e.replace(ve.tabCharGlobal,"    ").replace(ve.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(o=>(s=o.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let o=r.at(-1);s.raw.length===1&&o!==void 0?o.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let o=r.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.text,this.inlineQueue.at(-1).src=o.text):r.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let o=r.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.raw,this.inlineQueue.at(-1).src=o.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),r.push(s);continue}let a=e;if(this.options.extensions?.startBlock){let o=1/0,n=e.slice(1),l;this.options.extensions.startBlock.forEach(d=>{l=d.call({lexer:this},n),typeof l=="number"&&l>=0&&(o=Math.min(o,l))}),o<1/0&&o>=0&&(a=e.substring(0,o+1))}if(this.state.top&&(s=this.tokenizer.paragraph(a))){let o=r.at(-1);i&&o?.type==="paragraph"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):r.push(s),i=a.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let o=r.at(-1);o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):r.push(s);continue}if(e){let o="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let i=e,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let a;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)a=s[2]?s[2].length:0,i=i.slice(0,s.index+a)+"["+"a".repeat(s[0].length-a-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);i=this.options.hooks?.emStrongMask?.call({lexer:this},i)??i;let o=!1,n="";for(;e;){o||(n=""),o=!1;let l;if(this.options.extensions?.inline?.some(h=>(l=h.call({lexer:this},e,r))?(e=e.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(e)){e=e.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(e)){e=e.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(e)){e=e.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(l.raw.length);let h=r.at(-1);l.type==="text"&&h?.type==="text"?(h.raw+=l.raw,h.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(e,i,n)){e=e.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(e)){e=e.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(e)){e=e.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(e,i,n)){e=e.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(e)){e=e.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(e))){e=e.substring(l.raw.length),r.push(l);continue}let d=e;if(this.options.extensions?.startInline){let h=1/0,f=e.slice(1),g;this.options.extensions.startInline.forEach(u=>{g=u.call({lexer:this},f),typeof g=="number"&&g>=0&&(h=Math.min(h,g))}),h<1/0&&h>=0&&(d=e.substring(0,h+1))}if(l=this.tokenizer.inlineText(d)){e=e.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(n=l.raw.slice(-1)),o=!0;let h=r.at(-1);h?.type==="text"?(h.raw+=l.raw,h.text+=l.text):r.push(l);continue}if(e){let h="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(h);break}else throw new Error(h)}}return r}},Ma=class{options;parser;constructor(t){this.options=t||Di}space(t){return""}code({text:t,lang:e,escaped:r}){let i=(e||"").match(ve.notSpaceStart)?.[0],s=t.replace(ve.endingNewline,"")+`
`;return i?'<pre><code class="language-'+gr(i)+'">'+(r?s:gr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:gr(s,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,r=t.start,i="";for(let o=0;o<t.items.length;o++){let n=t.items[o];i+=this.listitem(n)}let s=e?"ol":"ul",a=e&&r!==1?' start="'+r+'"':"";return"<"+s+a+`>
`+i+"</"+s+`>
`}listitem(t){return`<li>${this.parser.parse(t.tokens)}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",r="";for(let s=0;s<t.header.length;s++)r+=this.tablecell(t.header[s]);e+=this.tablerow({text:r});let i="";for(let s=0;s<t.rows.length;s++){let a=t.rows[s];r="";for(let o=0;o<a.length;o++)r+=this.tablecell(a[o]);i+=this.tablerow({text:r})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+i+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),r=t.header?"th":"td";return(t.align?`<${r} align="${t.align}">`:`<${r}>`)+e+`</${r}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${gr(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let i=this.parser.parseInline(r),s=Ql(t);if(s===null)return i;t=s;let a='<a href="'+t+'"';return e&&(a+=' title="'+gr(e)+'"'),a+=">"+i+"</a>",a}image({href:t,title:e,text:r,tokens:i}){i&&(r=this.parser.parseInline(i,this.parser.textRenderer));let s=Ql(t);if(s===null)return gr(r);t=s;let a=`<img src="${t}" alt="${gr(r)}"`;return e&&(a+=` title="${gr(e)}"`),a+=">",a}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:gr(t.text)}},rl=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},ir=class yn{options;renderer;textRenderer;constructor(e){this.options=e||Di,this.options.renderer=this.options.renderer||new Ma,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new rl}static parse(e,r){return new yn(r).parse(e)}static parseInline(e,r){return new yn(r).parseInline(e)}parse(e){let r="";for(let i=0;i<e.length;i++){let s=e[i];if(this.options.extensions?.renderers?.[s.type]){let o=s,n=this.options.extensions.renderers[o.type].call({parser:this},o);if(n!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(o.type)){r+=n||"";continue}}let a=s;switch(a.type){case"space":{r+=this.renderer.space(a);break}case"hr":{r+=this.renderer.hr(a);break}case"heading":{r+=this.renderer.heading(a);break}case"code":{r+=this.renderer.code(a);break}case"table":{r+=this.renderer.table(a);break}case"blockquote":{r+=this.renderer.blockquote(a);break}case"list":{r+=this.renderer.list(a);break}case"checkbox":{r+=this.renderer.checkbox(a);break}case"html":{r+=this.renderer.html(a);break}case"def":{r+=this.renderer.def(a);break}case"paragraph":{r+=this.renderer.paragraph(a);break}case"text":{r+=this.renderer.text(a);break}default:{let o='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return r}parseInline(e,r=this.renderer){let i="";for(let s=0;s<e.length;s++){let a=e[s];if(this.options.extensions?.renderers?.[a.type]){let n=this.options.extensions.renderers[a.type].call({parser:this},a);if(n!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){i+=n||"";continue}}let o=a;switch(o.type){case"escape":{i+=r.text(o);break}case"html":{i+=r.html(o);break}case"link":{i+=r.link(o);break}case"image":{i+=r.image(o);break}case"checkbox":{i+=r.checkbox(o);break}case"strong":{i+=r.strong(o);break}case"em":{i+=r.em(o);break}case"codespan":{i+=r.codespan(o);break}case"br":{i+=r.br(o);break}case"del":{i+=r.del(o);break}case"text":{i+=r.text(o);break}default:{let n='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(n),"";throw new Error(n)}}}return i}},Ds=class{options;block;constructor(t){this.options=t||Di}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?rr.lex:rr.lexInline}provideParser(){return this.block?ir.parse:ir.parseInline}},Vp=class{defaults=Gn();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=ir;Renderer=Ma;TextRenderer=rl;Lexer=rr;Tokenizer=Ba;Hooks=Ds;constructor(...t){this.use(...t)}walkTokens(t,e){let r=[];for(let i of t)switch(r=r.concat(e.call(this,i)),i.type){case"table":{let s=i;for(let a of s.header)r=r.concat(this.walkTokens(a.tokens,e));for(let a of s.rows)for(let o of a)r=r.concat(this.walkTokens(o.tokens,e));break}case"list":{let s=i;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=i;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(a=>{let o=s[a].flat(1/0);r=r.concat(this.walkTokens(o,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let i={...r};if(i.async=this.defaults.async||i.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let a=e.renderers[s.name];a?e.renderers[s.name]=function(...o){let n=s.renderer.apply(this,o);return n===!1&&(n=a.apply(this,o)),n}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let a=e[s.level];a?a.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),i.extensions=e),r.renderer){let s=this.defaults.renderer||new Ma(this.defaults);for(let a in r.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;let o=a,n=r.renderer[o],l=s[o];s[o]=(...d)=>{let h=n.apply(s,d);return h===!1&&(h=l.apply(s,d)),h||""}}i.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Ba(this.defaults);for(let a in r.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;let o=a,n=r.tokenizer[o],l=s[o];s[o]=(...d)=>{let h=n.apply(s,d);return h===!1&&(h=l.apply(s,d)),h}}i.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Ds;for(let a in r.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;let o=a,n=r.hooks[o],l=s[o];Ds.passThroughHooks.has(a)?s[o]=d=>{if(this.defaults.async&&Ds.passThroughHooksRespectAsync.has(a))return(async()=>{let f=await n.call(s,d);return l.call(s,f)})();let h=n.call(s,d);return l.call(s,h)}:s[o]=(...d)=>{if(this.defaults.async)return(async()=>{let f=await n.apply(s,d);return f===!1&&(f=await l.apply(s,d)),f})();let h=n.apply(s,d);return h===!1&&(h=l.apply(s,d)),h}}i.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,a=r.walkTokens;i.walkTokens=function(o){let n=[];return n.push(a.call(this,o)),s&&(n=n.concat(s.call(this,o))),n}}this.defaults={...this.defaults,...i}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return rr.lex(t,e??this.defaults)}parser(t,e){return ir.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let i={...r},s={...this.defaults,...i},a=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&i.async===!1)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let o=s.hooks?await s.hooks.preprocess(e):e,n=await(s.hooks?await s.hooks.provideLexer():t?rr.lex:rr.lexInline)(o,s),l=s.hooks?await s.hooks.processAllTokens(n):n;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():t?ir.parse:ir.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(a);try{s.hooks&&(e=s.hooks.preprocess(e));let o=(s.hooks?s.hooks.provideLexer():t?rr.lex:rr.lexInline)(e,s);s.hooks&&(o=s.hooks.processAllTokens(o)),s.walkTokens&&this.walkTokens(o,s.walkTokens);let n=(s.hooks?s.hooks.provideParser():t?ir.parse:ir.parseInline)(o,s);return s.hooks&&(n=s.hooks.postprocess(n)),n}catch(o){return a(o)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let i="<p>An error occurred:</p><pre>"+gr(r.message+"",!0)+"</pre>";return e?Promise.resolve(i):i}if(e)return Promise.reject(r);throw r}}},Ci=new Vp;function Lt(t,e){return Ci.parse(t,e)}Lt.options=Lt.setOptions=function(t){return Ci.setOptions(t),Lt.defaults=Ci.defaults,ld(Lt.defaults),Lt};Lt.getDefaults=Gn;Lt.defaults=Di;Lt.use=function(...t){return Ci.use(...t),Lt.defaults=Ci.defaults,ld(Lt.defaults),Lt};Lt.walkTokens=function(t,e){return Ci.walkTokens(t,e)};Lt.parseInline=Ci.parseInline;Lt.Parser=ir;Lt.parser=ir.parse;Lt.Renderer=Ma;Lt.TextRenderer=rl;Lt.Lexer=rr;Lt.lexer=rr.lex;Lt.Tokenizer=Ba;Lt.Hooks=Ds;Lt.parse=Lt;Lt.options;Lt.setOptions;Lt.use;Lt.walkTokens;Lt.parseInline;ir.parse;rr.lex;var ec={name:"@eclipse-lyra/app",version:"0.0.0",description:"Default app template built on Appspace. Use as a starting point for downstream applications.",dependencies:{"@eclipse-lyra/core":"0.0.0","@eclipse-lyra/extension-ai-system":"0.0.0","@eclipse-lyra/extension-command-palette":"0.0.0","@eclipse-lyra/extension-command-shell":"0.0.0","@eclipse-lyra/extension-catalog":"0.0.0","@eclipse-lyra/extension-dataviewer":"0.0.0","@eclipse-lyra/extension-sqleditor":"0.0.0","@eclipse-lyra/extension-duckdb":"0.0.0","@eclipse-lyra/extension-pglite":"0.0.0","@eclipse-lyra/extension-github-service":"0.0.0","@eclipse-lyra/extension-howto-system":"0.0.0","@eclipse-lyra/extension-in-browser-ml":"0.0.0","@eclipse-lyra/extension-linuxterminal":"0.0.0","@eclipse-lyra/extension-md-editor":"0.0.0","@eclipse-lyra/extension-media-viewer":"0.0.0","@eclipse-lyra/extension-memory-usage":"0.0.0","@eclipse-lyra/extension-monaco-editor":"0.0.0","@eclipse-lyra/extension-notebook":"0.0.0","@eclipse-lyra/extension-python-runtime":"0.0.0","@eclipse-lyra/extension-rag-system":"0.0.0","@eclipse-lyra/extension-settings-tree":"0.0.0","@eclipse-lyra/extension-utils":"0.0.0","@eclipse-lyra/extension-webdav":"0.0.0","@eclipse-lyra/extension-webllm":"0.0.0","@eclipse-lyra/extension-webmcp":"0.0.0"},marketplaceCatalogUrls:["https://raw.githubusercontent.com/kispace-io/appspace-marketplace/main/catalogs/extensions.json","https://raw.githubusercontent.com/kispace-io/appspace-marketplace/main/catalogs/apps.json"]},Es;const yd="app-toolbars-main",ps="app-toolbars-main-right",xd="app-toolbars-main-center",kd="app-toolbars-bottom",po="app-toolbars-bottom-center",ea="app-toolbars-bottom-end",Cd="system-views",Ua="system.layouts",Gs="editor-area-main",Va="sidebar-main",Sd="sidebar-main-bottom",$d="sidebar-auxiliary",il="panel-bottom",Wp="command-save",_d=!1;var sl=(t=>(t[t.LEFT=0]="LEFT",t[t.MIDDLE=1]="MIDDLE",t[t.RIGHT=2]="RIGHT",t[t.BACK=3]="BACK",t[t.FORWARD=4]="FORWARD",t))(sl||{});const qp=Object.freeze(Object.defineProperty({__proto__:null,COMMAND_SAVE:Wp,EDITOR_AREA_MAIN:Gs,HIDE_DOT_RESOURCE:_d,MouseButton:sl,PANEL_BOTTOM:il,SIDEBAR_AUXILIARY:$d,SIDEBAR_MAIN:Va,SIDEBAR_MAIN_BOTTOM:Sd,SYSTEM_LAYOUTS:Ua,SYSTEM_VIEWS:Cd,TOOLBAR_BOTTOM:kd,TOOLBAR_BOTTOM_CENTER:po,TOOLBAR_BOTTOM_END:ea,TOOLBAR_MAIN:yd,TOOLBAR_MAIN_CENTER:xd,TOOLBAR_MAIN_RIGHT:ps},Symbol.toStringTag,{value:"Module"})),Hp="eclipse-lyra-persistence",Is="keyval",jp=1;let Mo=null;function rc(){return Mo||(Mo=new Promise((t,e)=>{const r=indexedDB.open(Hp,jp);r.onerror=()=>e(r.error),r.onsuccess=()=>t(r.result),r.onupgradeneeded=i=>{i.target.result.createObjectStore(Is)}})),Mo}class Kp{async persistObject(e,r){const i=await rc();return new Promise((s,a)=>{const n=i.transaction(Is,"readwrite").objectStore(Is),l=r==null?n.delete(e):n.put(r,e);l.onsuccess=()=>s(),l.onerror=()=>a(l.error)})}async getObject(e){const r=await rc();return new Promise((i,s)=>{const o=r.transaction(Is,"readonly").objectStore(Is).get(e);o.onsuccess=()=>i(o.result),o.onerror=()=>s(o.error)})}}const sr=new Kp;pe.put("persistenceService",sr);const Mi=".geospace/settings.json",Uo="dialogSettings",gi="events/settings/changed";function Ed(t,e){if(e){for(const[r,i]of Object.entries(e))if(i&&typeof i=="object"){const s=t[r];s?.properties&&i.properties?Ed(s.properties,i.properties):t[r]={...i,properties:i.properties?{...i.properties}:void 0}}}}class Gp{constructor(){this.mergedSchema={type:"object",properties:{}}}async checkSettings(){this.appSettings||(this.appSettings=await sr.getObject(Mi),this.appSettings||(this.appSettings={},await sr.persistObject(Mi,this.appSettings)),yt(gi,this.appSettings))}registerSchema(e){const r=e.properties??(e.type==="object"?{}:void 0);r&&(this.mergedSchema.properties||(this.mergedSchema.properties={}),Ed(this.mergedSchema.properties,r))}getCategories(){const e=this.mergedSchema.properties;return e?Object.entries(e).filter(([,r])=>r&&typeof r=="object").map(([r,i])=>({id:r,label:i.title??r,order:typeof i.order=="number"?i.order:0,schema:i})).sort((r,i)=>r.order-i.order):[]}getSchemaForCategory(e){return this.mergedSchema.properties?.[e]}getSchemaForSettingKey(e){const r=e.split(".").filter(Boolean);if(r.length===0)return this.mergedSchema;let i=this.mergedSchema;for(const s of r)if(i=i?.properties?.[s],!i)return;return i}traversePath(e,r,i){if(r.length===0)return null;let s=e;const a=r.length-1;for(let o=0;o<a;o++){const n=r[o];if(s[n]===void 0){if(!i)return null;s[n]={}}if(s[n]===null||typeof s[n]!="object")return null;s=s[n]}return{parent:s,key:r[a]}}async getAt(e){await this.checkSettings();const r=e.split(".").filter(Boolean);if(r.length===0)return this.appSettings;const i=this.traversePath(this.appSettings,r,!1);if(i)return i.parent[i.key]}async setAt(e,r){await this.checkSettings();const i=e.split(".").filter(Boolean);if(i.length===0)return;const s=this.traversePath(this.appSettings,i,!0);s&&(s.parent[s.key]=r,await sr.persistObject(Mi,this.appSettings),yt(gi,this.appSettings))}async get(e){return await this.checkSettings(),this.appSettings[e]}async set(e,r){await this.checkSettings(),this.appSettings[e]=r,await sr.persistObject(Mi,this.appSettings),yt(gi,this.appSettings)}async getAll(){return await this.checkSettings(),this.appSettings}async setAll(e){this.appSettings=e,await sr.persistObject(Mi,this.appSettings),yt(gi,this.appSettings)}async getDialogSetting(e){return await this.checkSettings(),(this.appSettings[Uo]||{})[e]}async setDialogSetting(e,r){await this.checkSettings();const i=this.appSettings[Uo]||{};i[e]=r,this.appSettings[Uo]=i,await sr.persistObject(Mi,this.appSettings),yt(gi,this.appSettings)}}const Xt=new Gp;pe.put("appSettings",Xt);class Zp{constructor(){this.tasks=[],this.updateCounter=0}notifyUpdate(){this.updateCounter++,gn.set(this.updateCounter)}run(e,r){const i=this.createProgressMonitor(e);try{this.tasks.push(i),this.notifyUpdate(),r(i)}finally{this.tasks.splice(this.tasks.indexOf(i),1),this.notifyUpdate()}}async runAsync(e,r){const i=this.createProgressMonitor(e);return this.tasks.push(i),this.notifyUpdate(),r(i).finally(()=>{this.tasks.splice(this.tasks.indexOf(i),1),this.notifyUpdate()})}createProgressMonitor(e){const r={name:e,message:"",currentStep:0,totalSteps:-1,progress:-1};return new Proxy(r,{set:(i,s,a)=>(i[s]=a,this.notifyUpdate(),!0)})}getActiveTasks(){return this.tasks}}const Xr=new Zp;pe.put("taskService",Xr);const Xp=Br("EsmShService"),ra=class Ne{isEsmShUrl(e){try{const r=new URL(e);return r.hostname==="esm.sh"||r.hostname==="raw.esm.sh"}catch{return!1}}isSourceIdentifier(e){return this.isEsmShUrl(e)||this.isHttpUrl(e)?!1:this.parseSource(e)!==null}isHttpUrl(e){try{const r=new URL(e);return r.protocol==="http:"||r.protocol==="https:"}catch{return!1}}parseSource(e){return!e||typeof e!="string"||(e=e.trim(),this.isHttpUrl(e))?null:e.startsWith(Ne.GITHUB_PREFIX)?this.parseGitHubSource(e):e.startsWith(Ne.JSR_PREFIX)?this.parseJsrSource(e):e.startsWith(Ne.PR_PREFIX)?this.parsePrSource(e):this.parseNpmSource(e)}parseGitHubSource(e){const i=e.substring(Ne.GITHUB_PREFIX.length).split("/");if(i.length<2)return null;const s=i[0],a=i[1];let o,n,l;const d=a.match(/^(.+?)(@(.+))?$/);return d?(o=d[1],n=d[3],i.length>2&&(l=i.slice(2).join("/")),{type:"github",owner:s,repo:o,version:n,path:l}):null}parseJsrSource(e){const r=e.substring(Ne.JSR_PREFIX.length);if(!r.startsWith("@"))return null;const i=r.split("/");if(i.length<2)return null;const s=i[0],a=i[1];let o,n,l;const d=a.match(/^(.+?)(@(.+))?$/);return d?(o=`${s}/${d[1]}`,n=d[3],i.length>2&&(l=i.slice(2).join("/")),{type:"jsr",package:o,version:n,path:l}):null}parsePrSource(e){const i=e.substring(Ne.PR_PREFIX.length).split("/");if(i.length<2)return null;const s=i[0],a=i[1];let o,n;const l=a.match(/^(.+?)@(.+)$/);return l?(o=l[1],n=l[2]):o=a,{type:"pr",owner:s,repo:o,commit:n}}parseNpmSource(e){const r=e.split("/"),i=r[0];let s,a,o;const n=i.match(/^(.+?)(@(.+))?$/);return n?(s=n[1],a=n[3],r.length>1&&(o=r.slice(1).join("/")),{type:"npm",package:s,version:a,path:o}):null}buildEsmShUrl(e,r){let i=Ne.ESM_SH_BASE;switch(e.type){case"npm":i+=`/${e.package}`,e.version&&(i+=`@${e.version}`),e.path&&(i+=`/${e.path}`);break;case"github":i+=`/${Ne.GITHUB_PREFIX}${e.owner}/${e.repo}`,e.version&&(i+=`@${e.version}`),e.path&&(i+=`/${e.path}`);break;case"jsr":i+=`/${Ne.JSR_PREFIX}${e.package}`,e.version&&(i+=`@${e.version}`),e.path&&(i+=`/${e.path}`);break;case"pr":i+=`/${Ne.PR_PREFIX}${e.owner}/${e.repo}`,e.commit&&(i+=`@${e.commit}`);break}const s=[];if(r?.deps){const a=Object.entries(r.deps).map(([o,n])=>`${o}@${n}`).join(",");s.push(`deps=${encodeURIComponent(a)}`)}return r?.target&&s.push(`target=${encodeURIComponent(r.target)}`),r?.dev&&s.push("dev"),r?.bundle===!1?s.push("bundle=false"):r?.bundle===!0&&s.push("bundle"),s.length>0&&(i+=`?${s.join("&")}`),i}normalizeToEsmSh(e,r){if(this.isEsmShUrl(e)||this.isHttpUrl(e))return e;const i=this.parseSource(e);return i?this.buildEsmShUrl(i,r):(Xp.warn(`Could not parse source identifier: ${e}`),e)}extractPackageName(e){const r=this.parseSource(e);if(!r)return null;switch(r.type){case"npm":return r.package||null;case"github":return`${r.owner}/${r.repo}`;case"jsr":return r.package||null;case"pr":return`${r.owner}/${r.repo}`}}isGitHubUrl(e){try{const r=new URL(e);return r.hostname==="github.com"||r.hostname==="www.github.com"}catch{return e.startsWith("https://github.com/")||e.startsWith("http://github.com/")}}convertGitHubUrlToSource(e){try{const i=new URL(e).pathname.split("/").filter(d=>d);if(i.length<2)throw new Error("Invalid GitHub URL format");const s=i[0];let a=i[1].replace(/\.git$/,""),o,n;i.length>2&&(i[2]==="blob"||i[2]==="tree"?(o=i[3]||"main",i[2]==="blob"&&i.length>4&&(n=i.slice(4).join("/"))):i[2]==="commit"?o=i[3]:n=i.slice(2).join("/"));let l=`${Ne.GITHUB_PREFIX}${s}/${a}`;return o&&(l+=`@${o}`),n&&(l+=`/${n}`),l}catch{const r=e.match(/github\.com\/([^\/]+)\/([^\/]+)/);return r?`${Ne.GITHUB_PREFIX}${r[1]}/${r[2].replace(/\.git$/,"")}`:e}}async fetchGitHubPackageJson(e){if(e.type!=="github")throw new Error("Source must be a GitHub source");const r=e.owner,i=e.repo,s=e.version||"main",a=`https://raw.githubusercontent.com/${r}/${i}/${s}/package.json`,o=await fetch(a);if(!o.ok)throw new Error(`Failed to fetch package.json: ${o.statusText}`);return await o.json()}};ra.ESM_SH_BASE="https://esm.sh";ra.GITHUB_PREFIX="gh/";ra.JSR_PREFIX="jsr/";ra.PR_PREFIX="pr/";let Yp=ra;const wr=new Yp;pe.put("esmShService",wr);const Os="events/extensionsregistry/extensionsConfigChanged",As="extensions",ic="extensions.external";class Qp{constructor(){this.extensions={},this.loadedExtensions=new Set,this.loadingPromises=new Map,xe(gi,()=>{this.extensionsSettings=void 0,this.checkExtensionsConfig().then()}),this.loadPersistedExternalExtensions().then(()=>{this.checkExtensionsConfig().then()})}async loadPersistedExternalExtensions(){try{const e=await Xt.get(ic);e&&Array.isArray(e)&&e.forEach(r=>{this.extensions[r.id]=r})}catch(e){Rt.error(`Failed to load persisted external extensions: ${e}`)}}async savePersistedExternalExtensions(){try{const e=Object.values(this.extensions).filter(r=>r.external);await Xt.set(ic,e)}catch(e){Rt.error(`Failed to save persisted external extensions: ${e}`)}}async checkExtensionsConfig(){this.extensionsSettings||(this.extensionsSettings=await Xt.get(As),this.extensionsSettings||(await Xt.set(As,[]),this.extensionsSettings=await Xt.get(As)),yt(Os,this.extensionsSettings))}registerExtension(e){this.extensions[e.id]=e,Rt.debug(`Registered extension: ${e.id}`),e.external&&this.savePersistedExternalExtensions().catch(r=>{Rt.error(`Failed to persist external extension: ${r}`)}),yt(Os,this.extensionsSettings)}async loadExtensionFromUrl(e,r){Rt.info(`Loading extension from URL: ${e}...`);try{let i=e,s=`Extension from ${e}`;if(wr.isSourceIdentifier(e)){const o=wr.extractPackageName(e);o&&(s=`Extension: ${o}`),i=wr.normalizeToEsmSh(e),Rt.debug(`Converted source identifier to esm.sh URL: ${e} -> ${i}`)}const a=r||`url:${i}`;if(this.isEnabled(a))return Rt.info(`Extension from URL ${i} is already enabled`),a;if(!this.extensions[a]){const o={id:a,name:s,description:`Extension loaded from: ${e}`,url:i};this.registerExtension(o),Rt.info(`Registered extension from URL: ${a}`)}return this.enable(a,!1),Rt.info(`Successfully enabled extension from URL: ${i}`),a}catch(i){throw Rt.error(`Failed to load extension from URL ${e}: ${i}`),i}}getExtensions(){return Object.values(this.extensions)}async loadEnabledExtensions(){await this.checkExtensionsConfig();const r=(this.extensionsSettings??[]).filter(i=>this.isEnabled(i.id)&&this.extensions[i.id]).map(i=>this.load(i.id).catch(s=>{at("Extension could not be loaded: "+s.message)}));await Promise.all(r)}isEnabled(e){return this.checkExtensionsConfig(),!!this.extensionsSettings?.find(r=>r.id===e&&r.enabled)}isLoaded(e){return this.loadedExtensions.has(e)}enable(e,r=!1){this.isEnabled(e)||(Rt.debug(`Loading extension: ${e}`),this.load(e).then(()=>{this.updateEnablement(e,!0,r)}).catch(i=>{Rt.error(`Could not load extension: ${e}: ${i}`)}))}async enableAsync(e,r=!1){if(!this.isEnabled(e)){Rt.debug(`Loading extension: ${e}`);try{await this.load(e),this.updateEnablement(e,!0,r)}catch(i){throw Rt.error(`Could not load extension: ${e}: ${i}`),i}}}async load(e,r=[]){if(this.loadedExtensions.has(e))return;const i=this.loadingPromises.get(e);if(i)return i;if(r.includes(e)){const o=[...r,e].join(" → ");throw new Error(`Circular dependency detected: ${o}`)}const s=this.extensions[e];if(!s)throw new Error("Extension not found: "+e);const a=(async()=>{try{if(Rt.debug(`Loading extension: ${e}`),s.dependencies&&s.dependencies.length>0){const n=[...r,e];for(const l of s.dependencies)await this.load(l,n),this.isEnabled(l)||(await this.updateEnablementAsync(l,!0,!1),Rt.debug(`Auto-enabled dependency: ${l}`))}const o=await Xr.runAsync("Loading extension: "+s.name,async()=>{if(s.loader)return s.loader();if(s.url){let n=s.url;return wr.isSourceIdentifier(s.url)&&(n=wr.normalizeToEsmSh(s.url),Rt.debug(`Normalized extension URL: ${s.url} -> ${n}`)),import(n)}});if(this.loadedExtensions.add(e),o?.default instanceof Function)try{o.default(di.getProxy())}catch(n){throw Rt.error(`Error executing extension function for ${e}: ${n}`),n}}catch(o){throw this.loadedExtensions.delete(e),o}finally{this.loadingPromises.delete(e)}})();return this.loadingPromises.set(e,a),a}disable(e,r=!1){this.isEnabled(e)&&this.updateEnablement(e,!1,r)}updateEnablement(e,r,i){this.checkExtensionsConfig().then(()=>{const s=this.extensionsSettings?.find(a=>a.id==e);s?s.enabled=r:this.extensionsSettings?.push({id:e,enabled:r}),Xt.set(As,this.extensionsSettings).then(()=>{if(i){const a=this.extensions[e];oe(r?a.name+" enabled.":a.name+" disabled  - Please restart to take effect")}yt(Os,this.extensionsSettings)})})}async updateEnablementAsync(e,r,i){await this.checkExtensionsConfig();const s=this.extensionsSettings?.find(a=>a.id==e);if(s?s.enabled=r:this.extensionsSettings?.push({id:e,enabled:r}),await Xt.set(As,this.extensionsSettings),i){const a=this.extensions[e];oe(r?a.name+" enabled.":a.name+" disabled  - Please restart to take effect")}yt(Os,this.extensionsSettings)}}const qt=new Qp;pe.put("extensionRegistry",qt);const sc=["alt","ctrl","meta","shift"],Ad={CTRL:"ctrl",CONTROL:"ctrl",ALT:"alt",OPTION:"alt",SHIFT:"shift",META:"meta",CMD:"meta",COMMAND:"meta",WIN:"meta",WINDOWS:"meta"},Jp={ctrl:"Ctrl",alt:"Alt",shift:"Shift",meta:"Cmd"},tf={SPACE:" ",ESC:"ESCAPE",RETURN:"ENTER",LEFT:"ARROWLEFT",RIGHT:"ARROWRIGHT",UP:"ARROWUP",DOWN:"ARROWDOWN",DEL:"DELETE",INS:"INSERT",PAGEUP:"PAGEUP",PAGEDOWN:"PAGEDOWN"},ef=new Set(Object.keys(Ad));function ac(t){return tf[t]??t}class rf{constructor(){this.bindings=new Map,this.enabled=!0,document.addEventListener("keydown",this.handleKeyDown.bind(this),!0),this.registerExistingCommandBindings(),xe(sd,e=>{e.keyBinding&&this.registerKeyBinding(e.id,e.keyBinding)})}registerExistingCommandBindings(){const e=Kr.listCommands();Object.values(e).forEach(r=>{r.keyBinding&&this.registerKeyBinding(r.id,r.keyBinding)})}parseKeyBinding(e){if(!e||e.trim()==="")return null;const r=e.toUpperCase().split("+").map(o=>o.trim());if(r.length===0)return null;const i=r[r.length-1],s=r.slice(0,-1);if(r.length===1&&ef.has(i))return null;const a={ctrl:!1,alt:!1,shift:!1,meta:!1};for(const o of s){const n=Ad[o];if(n===void 0)return null;a[n]=!0}return a.key=ac(i),a}getBindingKey(e){return[...sc.filter(i=>e[i]),e.key.toUpperCase()].join("+")}registerKeyBinding(e,r){const i=this.parseKeyBinding(r);if(!i)return Rt.error(`Invalid key binding: ${r}`),!1;i.commandId=e;const s=this.getBindingKey(i);this.bindings.has(s)||this.bindings.set(s,[]);const a=this.bindings.get(s);if(a.find(l=>l.commandId===e))return Rt.error(`Key binding ${r} already registered for command ${e}`),!1;const n=a.find(l=>l.commandId!==e);return n?(Rt.warn(`Key binding ${r} already used by command ${n.commandId}; refusing for ${e}`),!1):(a.push(i),!0)}unregisterKeyBinding(e,r){if(r){const i=this.parseKeyBinding(r);if(i){const s=this.getBindingKey(i),a=this.bindings.get(s);if(a){const o=a.filter(n=>n.commandId!==e);o.length===0?this.bindings.delete(s):this.bindings.set(s,o)}}}else for(const[i,s]of this.bindings.entries()){const a=s.filter(o=>o.commandId!==e);a.length===0?this.bindings.delete(i):this.bindings.set(i,a)}}getKeyBindingsForCommand(e){const r=[];for(const i of this.bindings.values())for(const s of i)s.commandId===e&&r.push(this.formatKeyBinding(s));return r.sort()}formatKeyBinding(e){const r=sc.filter(s=>e[s]).map(s=>Jp[s]),i=e.key.length===1?e.key.toUpperCase():e.key.charAt(0).toUpperCase()+e.key.slice(1).toLowerCase();return r.push(i),r.join("+")}handleKeyDown(e){if(!this.enabled)return;const r={commandId:"",key:ac(e.key.toUpperCase()),ctrl:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:e.metaKey},i=this.getBindingKey(r),s=this.bindings.get(i);if(s&&s.length>0){const a=s[0];try{e.preventDefault(),e.stopPropagation();const o=Kr.createExecutionContext({});Kr.execute(a.commandId,o),Rt.debug(`Executed command via key binding: ${a.commandId}`)}catch(o){Rt.error(`Failed to execute command ${a.commandId}: ${o.message}`)}}}setEnabled(e){this.enabled=e}isEnabled(){return this.enabled}getAllBindings(){const e=new Map;for(const[r,i]of this.bindings)e.set(r,[...i]);return e}clearAll(){this.bindings.clear()}}const Ld=new rf;pe.put("keyBindingManager",Ld);class Mr extends lo{constructor(){super(...arguments),this.settingsKey=null}buildDOMTreePath(){const e=[];let r=this;for(;r&&r!==document.body&&r!==document.documentElement;){const i=r.getAttribute("id");if(i){e.unshift(`#${i}`);break}const s=r.tagName.toLowerCase(),a=r.parentElement;if(!a)break;const n=Array.from(a.children).filter(l=>l.tagName.toLowerCase()===s).indexOf(r);n>=0?e.unshift(`${s}:${n}`):e.unshift(s),r=a}return e.length>0?e.join(" > "):null}initializeSettingsKey(){if(!this.settingsKey){const e=this.tagName.toLowerCase(),r=this.getAttribute("id");if(r){this.settingsKey=`${e}:${r}`;return}const i=this.buildDOMTreePath();i&&(this.settingsKey=`${e}:${i}`)}}async getDialogSetting(){if(this.initializeSettingsKey(),!!this.settingsKey)return await Xt.getDialogSetting(this.settingsKey)}async setDialogSetting(e){this.initializeSettingsKey(),this.settingsKey&&await Xt.setDialogSetting(this.settingsKey,e)}}const zd=class extends Mr{dispose(){}getResult(){}renderMessage(e,r=!1){if(r){const i=Lt.parse(e,{async:!1});return $`<div class="dialog-message" style="white-space: normal;">${Dr(i)}</div>`}return $`<div class="dialog-message" style="white-space: pre-line;">${e}</div>`}};zd.styles=[J`
            .dialog-message {
                margin-bottom: 0.5rem;
                color: var(--wa-color-text-normal);
            }
        `];let Ur=zd;const pi=Br("DialogService"),Si="dialogs",ia={id:"ok",label:"OK",variant:"primary"},al={id:"cancel",label:"Cancel",variant:"default"},sf={id:"close",label:"Close",variant:"default"};let Ui=null;function af(){return(!Ui||!document.body.contains(Ui))&&(Ui=document.createElement("div"),Ui.id="global-dialog-container",document.body.appendChild(Ui)),Ui}class of{constructor(){this.contributions=new Map,this.contributionsChangeScheduled=!1,this.loadContributions(),xe(ar,e=>{e.target===Si&&(this.contributionsChangeScheduled||(this.contributionsChangeScheduled=!0,queueMicrotask(()=>{this.contributionsChangeScheduled=!1,this.loadContributions()})))})}loadContributions(){const e=gt.getContributions(Si);this.contributions.clear();for(const r of e){if(!r.id){pi.warn("Dialog contribution missing id, skipping");continue}if(!r.component){pi.warn(`Dialog contribution "${r.id}" has no component function, skipping`);continue}if(!r.onButton){pi.warn(`Dialog contribution "${r.id}" has no onButton callback, skipping`);continue}this.contributions.set(r.id,r)}}async open(e,r){const i=this.contributions.get(e);if(!i)throw pi.error(`Dialog "${e}" not found`),new Error(`Dialog "${e}" not found`);return new Promise(s=>{const a=af();let o=!0,n=null;const l=async()=>{if(o){if(o=!1,n)try{await n.dispose()}catch(u){const v=u instanceof Error?u.message:String(u);pi.error(`Error disposing dialog content for "${e}": ${v}`)}try{const u=n?n.getResult():void 0;await i.onButton("close",u,f)}catch(u){const v=u instanceof Error?u.message:String(u);pi.error(`Error executing close callback for dialog "${e}": ${v}`)}Ge($``,a),s()}},d=async u=>{try{const v=n?n.getResult():void 0;await i.onButton(u,v,f)!==!1&&l()}catch(v){const b=v instanceof Error?v.message:String(v);pi.error(`Error executing button callback for dialog "${e}": ${b}`),l()}},h=i.buttons&&i.buttons.length>0?i.buttons:[ia];r&&typeof r=="object"&&(r.close=l);const f={...r,close:l},g=$`
                <wa-dialog label="${i.label||e}" open @wa-request-close=${l}>
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
                         @dialog-ok=${()=>{const u=h.find(v=>v.id==="ok");u&&d(u.id)}}
                         @dialog-cancel=${()=>{const u=h.find(v=>v.id==="cancel");u?d(u.id):l()}}>
                        ${i.component(r)}
                        
                        <div class="dialog-service-footer">
                            ${h.map(u=>$`
                                <wa-button 
                                    variant="${u.variant||"default"}"
                                    ?disabled=${u.disabled}
                                    @click=${()=>d(u.id)}
                                >
                                    ${u.label}
                                </wa-button>
                            `)}
                        </div>
                    </div>
                </wa-dialog>
            `;Ge(g,a),(async()=>{const u=Array.from(a.querySelectorAll("*"));for(const v of u)if(v instanceof Ur){await v.updateComplete,n=v;break}})()})}getDialogIds(){return Array.from(this.contributions.keys())}hasDialog(e){return this.contributions.has(e)}}const fo=new of;pe.put("dialogService",fo);const Me="events/filesys/workspaceChanged",Tr="events/filesys/workspaceConnected",me=Br("WorkspaceService");class Td{constructor(){this.state={}}getWorkspacePath(){const e=[];let r=this,i;for(;r;){e.push(r.getName());const a=r.getParent();a||(i=r),r=a}e.reverse();const s=typeof ft?.getWorkspaceSync=="function"?ft.getWorkspaceSync():void 0;if(s&&i&&"isDirectChild"in s&&typeof s.isDirectChild=="function"&&s.isDirectChild(i)){const a=s.getFolderNameForDirectory(i);if(a&&e.length>0)return e.length>1?a+"/"+e.slice(1).join("/"):a}return e.shift(),e.join("/")}getWorkspace(){let e=this;for(;e;){const r=e.getParent();if(r)e=r;else break}return e}}var sa=(t=>(t[t.TEXT=0]="TEXT",t[t.BINARY=1]="BINARY",t))(sa||{}),Rd=(t=>(t[t.BASE64=0]="BASE64",t))(Rd||{});class Bt extends Td{}class Nt extends Td{}class nf extends Nt{constructor(e,r="/"){super(),this.displayName=r,this.entriesByName=new Map(e.map(i=>[i.getName(),i]))}getFolderNameForDirectory(e){for(const[r,i]of this.entriesByName)if(i===e)return r}isDirectChild(e){return this.getFolderNameForDirectory(e)!==void 0}getName(){return this.displayName}getParent(){}async listChildren(e){return Array.from(this.entriesByName.values())}async getResource(e,r){const i=e?.replace(/^\/+/,"").trim();if(!i)return null;const s=i.indexOf("/"),a=s>=0?i.slice(0,s).trim():i.trim(),o=s>=0?i.slice(s+1).trim():"",n=this.entriesByName.get(a);return n?o?n.getResource(o,r):n:null}touch(){for(const e of this.entriesByName.values())e.touch()}async delete(e,r){throw new Error("Delete not supported on workspace root")}async copyTo(e){throw new Error("Copy not supported on workspace root")}async rename(e){throw new Error("Rename not supported on workspace root")}getFolderByName(e){return this.entriesByName.get(e)}}class Vo extends Nt{constructor(e){super(),this.backendType=e.backendType,this.persistedData=e.data,this.name=e.name}getName(){return this.name}getParent(){}async listChildren(e){return[]}async getResource(e,r){throw new Error(`Workspace backend "${this.backendType}" is not available in this environment.`)}touch(){}async delete(e,r){throw new Error(`Cannot modify workspace folder for missing backend "${this.backendType}".`)}async copyTo(e){throw new Error(`Cannot copy from workspace folder for missing backend "${this.backendType}".`)}async rename(e){throw new Error(`Cannot rename workspace folder for missing backend "${this.backendType}".`)}}const Wo="workspace_data",Dd=class Id{constructor(){this._currentWorkspace=void 0,this.folders=[],this.contributions=new Map,this.restoredTypes=new Set;let e;this.initPromise=new Promise(r=>{e=r}),this.loadPersistedWorkspace(e)}getWorkspaceSync(){return this._currentWorkspace}registerContribution(e){this.contributions.set(e.type,e),this.tryRestoreForContribution(e)}getContributions(){return Array.from(this.contributions.values())}async tryRestoreForContribution(e){if(await this.initPromise,this.restoredTypes.has(e.type))return;if(this.folders.filter(n=>n.type===e.type).some(n=>!(n.directory instanceof Vo))){this.restoredTypes.add(e.type);return}const s=await sr.getObject(Wo);if(!s?.folders||!Array.isArray(s.folders)){this.restoredTypes.add(e.type);return}const a=s.folders.filter(n=>n.type===e.type);if(a.length===0){this.restoredTypes.add(e.type);return}this.folders=this.folders.filter(n=>!(n.type===e.type&&n.directory instanceof Vo));for(const n of a)if(e.restore)try{const l=await e.restore(n.data);if(!l)continue;this.folders.push({type:e.type,data:n.data,directory:l})}catch(l){me.warn(`Failed to restore folder (${e.type}) on contribution registration:`,l)}if(this.folders.length===0){this.restoredTypes.add(e.type);return}const o=this.buildComposite();this.workspace=Promise.resolve(o),this._currentWorkspace=o??void 0,await this.persistFolders(),o&&(yt(Tr,o),me.debug(`Workspace folders restored for contribution type: ${e.type}`)),this.restoredTypes.add(e.type)}async loadPersistedWorkspace(e){me.debug("Restoring workspace from persistence");try{const r=await sr.getObject(Wo);if(r||(this.workspace=Promise.resolve(void 0),this._currentWorkspace=void 0),r?.folders&&Array.isArray(r.folders)&&r.folders.length>0){const i=r.folders.map(a=>({type:a.type,data:a.data}));await this.resolveFolders(i);const s=this.buildComposite();this.workspace=Promise.resolve(s),this._currentWorkspace=s??void 0,s&&(yt(Tr,s),me.debug("Workspace restored from persisted folders")),e();return}if(r&&r.type&&r.data!==void 0){const i=this.contributions.get(r.type);if(i?.restore)try{const s=await i.restore(r.data);if(s){this.folders=[{type:r.type,data:r.data,directory:s}];const a=this.buildComposite();this.workspace=Promise.resolve(a),this._currentWorkspace=a??void 0,this.currentType=r.type,await this.persistFolders(),yt(Tr,a),me.debug("Workspace restored from legacy format")}}catch(s){me.error("Failed to restore legacy workspace:",s)}}this.workspace||(this.workspace=Promise.resolve(void 0),this._currentWorkspace=void 0),e()}finally{if(this.folders.length===0)try{await this.connectFolder({indexeddb:!0,name:Id.DEFAULT_INDEXEDDB_FOLDER_NAME}),me.debug("Connected default IndexedDB workspace")}catch(r){me.warn("Failed to connect default IndexedDB folder",r)}}}async resolveFolders(e){this.folders=[];for(const r of e){const i=this.contributions.get(r.type);if(!i?.restore){const s=r.data&&typeof r.data=="object"&&r.data.name||`${r.type} (missing)`,a=new Vo({backendType:r.type,name:s,data:r.data});this.folders.push({type:r.type,data:r.data,directory:a});continue}try{const s=await i.restore(r.data);s&&this.folders.push({type:r.type,data:r.data,directory:s})}catch(s){me.warn(`Failed to restore folder (${r.type}):`,s)}}}buildComposite(){if(this.folders.length!==0)return new nf(this.folders.map(e=>e.directory))}async persistFolders(){const e=this.folders.length>0?{folders:this.folders.map(r=>({type:r.type,data:r.data}))}:null;await sr.persistObject(Wo,e),await sr.persistObject("workspace",null),me.debug(`Persisted ${this.folders.length} folder(s)`)}async getFolders(){return await this.initPromise,this.folders.map(e=>({name:e.directory.getName(),type:e.type}))}async getFolderInfoForDirectory(e){await this.initPromise;const r=this.folders.find(o=>o.directory===e);if(!r)return;const i=r.data&&typeof r.data=="object"&&r.data.name||r.directory.getName(),a=this.contributions.get(r.type)?.name??r.type;return{name:i,type:r.type,backendName:a}}async updateFolderName(e,r){await this.initPromise;const i=this.folders.find(a=>a.directory===e);if(!i)return;i.data&&typeof i.data=="object"?i.data={...i.data,name:r}:i.data={name:r},await this.persistFolders();const s=this.buildComposite();this.workspace=Promise.resolve(s),this._currentWorkspace=s??void 0,yt(Tr,s),me.debug(`Updated folder name: ${r}`)}async connectFolder(e){await this.initPromise;const r=Array.from(this.contributions.values()).find(l=>l.canHandle(e));if(!r)throw new Error("No workspace contribution can handle this input");const i=e?.name??r.type;me.debug(`Connecting workspace: ${r.type}, ${i}`);const s=await r.connect(e),a=r.persist?await r.persist(s):e;this.folders.push({type:r.type,data:a,directory:s}),await this.persistFolders(),this.currentType=this.folders.length===1?r.type:void 0;const o=this.buildComposite();this.workspace=Promise.resolve(o),this._currentWorkspace=o,yt(Tr,o);const n=s.getName();return me.info(`Workspace connected: ${r.type} (${n})`),o}async disconnectFolder(e){await this.initPromise;const r=this.folders.findIndex(a=>a.directory===e);if(r<0)return;const i=this.folders[r];me.debug(`Disconnecting folder: ${i.directory.getName()} (${i.type})`),this.folders.splice(r,1),await this.persistFolders(),this.folders.length>0?this.currentType=this.folders[0].type:(this.currentType=void 0,me.info("Workspace disconnected"));const s=this.buildComposite();this.workspace=Promise.resolve(s),this._currentWorkspace=s??void 0,yt(Tr,s)}async connectWorkspace(e){return this.connectFolder(e)}async getWorkspace(){if(await this.initPromise,!this.workspace)throw new Error("No workspace connected.");return await this.workspace}isConnected(){return this.folders.length>0}getWorkspaceType(){return this.currentType}async disconnectWorkspace(){await this.initPromise,this.workspace=Promise.resolve(void 0),this._currentWorkspace=void 0,this.folders=[],this.currentType=void 0,await this.persistFolders(),yt(Tr,void 0),me.info("Workspace disconnected")}async copyResource(e,r,i){await this.initPromise;const s=this._currentWorkspace;if(!s)throw new Error("No workspace connected.");const a=i?.newName??e.getName(),o=r.getWorkspacePath(),n=o?`${o}/${a}`:a,l=async(h,f)=>{const g=await h.getContents({blob:!0}),u=await s.getResource(f,{create:!0});if(!u)throw new Error(`Failed to create target file: ${f}`);await u.saveContents(g)},d=async(h,f)=>{for(const g of await h.listChildren(!1)){const u=`${f}/${g.getName()}`;g instanceof Bt?await l(g,u):g instanceof Nt&&await d(g,u)}};if(e instanceof Bt)await l(e,n);else if(e instanceof Nt)await d(e,n);else throw new Error("Unsupported resource type for copy operation.");i?.move&&await e.delete(void 0,!0)}};Dd.DEFAULT_INDEXEDDB_FOLDER_NAME="My Folder";let lf=Dd;const ft=new lf;pe.put("workspaceService",ft);class xn extends Bt{constructor(e,r){super(),this.fileHandle=e,this.parent=r}getName(){return this.fileHandle.name}getParent(){return this.parent}async delete(){return this.getParent().delete(this.getName())}async getContents(e){const r=await this.fileHandle.getFile();return!e||e?.contentType==sa.TEXT?await r.text():e?.encoding==Rd.BASE64||e?.uri?URL.createObjectURL(r):e?.blob?r:r.stream()}async size(){try{return(await this.fileHandle.getFile()).size}catch{return null}}async saveContents(e,r){const i=await this.fileHandle.createWritable();if(e&&typeof e.pipeTo=="function")await e.pipeTo(i);else{const s=i.getWriter();try{await s.write(e)}finally{await s.close()}}}async copyTo(e){const r=await this.getContents({blob:!0});await(await this.getWorkspace().getResource(e,{create:!0})).saveContents(r)}async rename(e){const r=this.getParent();if(!r)throw new Error("Cannot rename root resource");if(this.getName()!==e){if(!("move"in this.fileHandle)||typeof this.fileHandle.move!="function")throw new Error("File rename not supported in this browser. Please use a browser with File System Access API move() support.");try{await this.fileHandle.move(e)}catch(i){throw i.name==="NotAllowedError"||i.message?.includes("not allowed")||i.message?.includes("user agent")?new Error("File rename failed: The operation took too long and user activation expired. Please try again."):i}await r.listChildren(!0),yt(Me,ft.getWorkspaceSync()??this.getWorkspace())}}}class vr extends Nt{constructor(e,r){super(),this.dirHandle=e,this.parent=r}getHandle(){return this.dirHandle}getParent(){return this.parent}getName(){return this.dirHandle.name}async listChildren(e=!1){return e||!this.files?this.loadingPromise?this.loadingPromise:(this.loadingPromise=(async()=>{try{const r={};try{for await(const i of this.dirHandle.values()){const a=i.kind==="file"?new xn(i,this):new vr(i,this);r[a.getName()]=a}}catch(i){if(i.name==="NotFoundError")return this.files={},[];throw i}return this.files=r,Object.values(this.files)}finally{this.loadingPromise=void 0}})(),this.loadingPromise):Object.values(this.files)}async getResource(e,r){if(!e)throw new Error("No path provided");const i=e.split("/");let s=this,a=!1;try{for(let o=0;o<i.length;o++){let n=i[o];if(n&&(n=n.trim()),!n)break;if(s instanceof vr){if(await s.listChildren(),!s.files)return null;const l=s.files[n];if(l)s=l;else if(r?.create)if(a=!0,o<i.length-1)try{const d=await s.dirHandle.getDirectoryHandle(n,{create:!0}),h=new vr(d,s);s.files[n]=h,s=h,s instanceof vr&&await s.listChildren();continue}catch(d){throw d.name==="NotFoundError"?new Error(`Directory not found or not accessible: ${i.slice(0,o+1).join("/")}`):d}else try{const d=await s.dirHandle.getFileHandle(n,{create:!0}),h=new xn(d,s);return s.files[n]=h,h}catch(d){throw d.name==="NotFoundError"?new Error(`File not found or not accessible: ${i.join("/")}`):d}else return null}}}finally{a&&yt(Me,ft.getWorkspaceSync()??this.getWorkspace())}return s}touch(){yt(Me,ft.getWorkspaceSync()??this.getWorkspace())}async delete(e,r=!0){if(!e){const i=this.getParent();return i instanceof vr&&(await i.listChildren(),i.files&&delete i.files[this.getName()]),this.files=void 0,this.loadingPromise=void 0,i?.delete(this.getName())}return this.dirHandle.removeEntry(e,{recursive:r}).then(async()=>{this.files&&delete this.files[e],yt(Me,ft.getWorkspaceSync()??this.getWorkspace())})}async copyTo(e){for(const r of await this.listChildren()){const i=[e,r.getName()].join("/");await r.copyTo(i)}}async rename(e){const r=this.getParent();if(!r)throw new Error("Cannot rename workspace root");if(this.getName()!==e){if(!("move"in this.dirHandle)||typeof this.dirHandle.move!="function")throw new Error("Directory rename not supported in this browser. Please use a browser with File System Access API move() support.");try{await this.dirHandle.move(e)}catch(i){throw i.name==="NotAllowedError"||i.message?.includes("not allowed")||i.message?.includes("user agent")?new Error("Directory rename failed: The operation took too long and user activation expired. Please try again."):i}await r.listChildren(!0),yt(Me,ft.getWorkspaceSync()??this.getWorkspace())}}}ft.registerContribution({type:"filesystem",name:"fs",canHandle(t){return t&&"kind"in t&&t.kind==="directory"},async connect(t){return new vr(t)},async restore(t){if(t&&"kind"in t&&t.kind==="directory")return new vr(t,void 0)},async persist(t){return t instanceof vr?t.getHandle():null}});const oc=Object.freeze(Object.defineProperty({__proto__:null,FileSysDirHandleResource:vr,FileSysFileHandleResource:xn},Symbol.toStringTag,{value:"Module"})),cf=".opfs";async function nc(){if(typeof navigator>"u"||!navigator.storage?.getDirectory)throw new Error("OPFS is not available in this environment");return await navigator.storage.getDirectory()}class qo extends Nt{constructor(e){super(),this.inner=e}getName(){return cf}getParent(){return this.inner.getParent()}async listChildren(e){return this.inner.listChildren(e)}async getResource(e,r){return this.inner.getResource(e,r)}touch(){this.inner.touch()}async delete(e,r){return this.inner.delete(e,r)}async copyTo(e){return this.inner.copyTo(e)}async rename(e){return this.inner.rename(e)}}ft.registerContribution({type:"opfs",name:"opfs",canHandle(t){return t&&typeof t=="object"&&t.opfs===!0},async connect(t){const e=await nc(),i=(await Promise.resolve().then(()=>oc)).FileSysDirHandleResource,s=new i(e);return new qo(s)},async restore(t){if(t&&typeof t=="object"&&t.opfs===!0){const e=await nc(),i=(await Promise.resolve().then(()=>oc)).FileSysDirHandleResource,s=new i(e);return new qo(s)}},async persist(t){return t instanceof qo?{opfs:!0}:null}});const df="eclipse-lyra-workspace-idb",Ae="files";let Ho=null;async function Yr(){if(typeof indexedDB>"u")throw new Error("IndexedDB is not available in this environment");return Ho||(Ho=new Promise((t,e)=>{const r=indexedDB.open(df,1);r.onerror=()=>e(r.error),r.onsuccess=()=>t(r.result),r.onupgradeneeded=i=>{const s=i.target.result;s.objectStoreNames.contains(Ae)||s.createObjectStore(Ae)}})),Ho}async function hf(){const t="IndexedDB",e=await ft.getFolders(),r=new Set(e.filter(s=>s.type==="indexeddb").map(s=>s.name));if(!r.has(t))return t;let i=1;for(;r.has(`${t} (${i})`);)i+=1;return`${t} (${i})`}function Qi(t){return t?t.split("/").filter(Boolean).join("/"):""}function Ps(t,e){const r=Qi(t),i=Qi(e);return r?i?`${r}/${i}`:r:i}function Ji(t,e){const r=Qi(e);return r?`${t}/${r}`:t}function uf(t,e){const r=Qi(e);return r?`${t}/${r}/`:`${t}/`}async function Aa(t,e){const s=(await Yr()).transaction(Ae,"readonly").objectStore(Ae),a=e?Ji(t,e):t;return await new Promise((o,n)=>{const l=s.get(a);l.onsuccess=()=>o(l.result),l.onerror=()=>n(l.error)})}async function Vs(t,e,r){const a=(await Yr()).transaction(Ae,"readwrite").objectStore(Ae),o=e?Ji(t,e):t;await new Promise((n,l)=>{const d=a.put(r,o);d.onsuccess=()=>n(),d.onerror=()=>l(d.error)})}async function lc(t,e){const s=(await Yr()).transaction(Ae,"readwrite").objectStore(Ae),a=e?Ji(t,e):t;await new Promise((o,n)=>{const l=s.delete(a);l.onsuccess=()=>o(),l.onerror=()=>n(l.error)})}async function Od(t,e){const s=(await Yr()).transaction(Ae,"readwrite").objectStore(Ae),a=Ji(t,e),o=a+"/",n=s.openCursor();await new Promise((l,d)=>{n.onerror=()=>d(n.error),n.onsuccess=h=>{const f=h.target.result;if(!f){l();return}const g=String(f.key);(g===a||g.startsWith(o))&&f.delete(),f.continue()}})}async function pf(t){await Od(t,"")}async function ff(t,e,r){const a=(await Yr()).transaction(Ae,"readwrite").objectStore(Ae),o=Ji(t,e),n=Ji(t,r),l=a.openCursor(),d=[];await new Promise((h,f)=>{l.onerror=()=>f(l.error),l.onsuccess=g=>{const u=g.target.result;if(!u){h();return}const v=String(u.key);if(v===o||v.startsWith(o+"/")){const b=v.slice(o.length),x=n+b,y=u.value;d.push(()=>{u.delete(),a.put(y,x)})}u.continue()}});for(const h of d)h()}async function mf(t,e){const s=(await Yr()).transaction(Ae,"readonly").objectStore(Ae),a=uf(t,e),o=s.openCursor(),n=new Set,l=new Map;await new Promise((h,f)=>{o.onerror=()=>f(o.error),o.onsuccess=g=>{const u=g.target.result;if(!u){h();return}const v=String(u.key),b=u.value;if(!v.startsWith(a)){u.continue();return}const x=v.slice(a.length);if(!x){u.continue();return}const y=x.indexOf("/"),k=y===-1?x:x.slice(0,y);y===-1?b.type==="dir"?n.add(k):l.set(k,b):n.add(k),u.continue()}});const d=[];for(const h of n)d.push({name:h,entry:{type:"dir"},type:"dir"});for(const[h,f]of l)n.has(h)||d.push({name:h,entry:f,type:"file"});return d}function gf(t){return t instanceof tr?t.getRootId():""}class jo extends Bt{constructor(e,r){super(),this.path=Qi(e),this.parent=r}getName(){const e=this.path.split("/");return e[e.length-1]||""}getParent(){return this.parent}getRootId(){return gf(this.parent)}async delete(){await lc(this.getRootId(),this.path),yt(Me,ft.getWorkspaceSync()??this.getWorkspace())}async getContents(e){const r=await Aa(this.getRootId(),this.path);let i=r?.content;if(typeof i=="string"){const a=new Blob([i],{type:r?.mimeType||"text/plain"});i=a,r&&(r.content=a,await Vs(this.getRootId(),this.path,r))}if(!e||e.contentType===sa.TEXT)return i?await i.text():"";let s;return i?s=i:s=new Blob([],{type:r?.mimeType}),e.blob?s:e.uri?URL.createObjectURL(s):s.stream()}async saveContents(e,r){let i,s;if(e instanceof Blob)i=e,s=e.type||void 0;else if(typeof e=="string")s="text/plain",i=new Blob([e],{type:s});else if(e instanceof ReadableStream){const a=new Response(e);i=await a.blob(),s=a.headers.get("content-type")??void 0}else{const a=String(e??"");s="text/plain",i=new Blob([a],{type:s})}await Vs(this.getRootId(),this.path,{type:"file",content:i,mimeType:s}),yt(Me,ft.getWorkspaceSync()??this.getWorkspace())}async size(){const r=(await Aa(this.getRootId(),this.path))?.content;return r?r.size:null}async copyTo(e){const r=await this.getContents({blob:!0}),i=await this.getWorkspace().getResource(e,{create:!0});if(!i)throw new Error(`Failed to create target file: ${e}`);await i.saveContents(r)}async rename(e){if(this.getName()===e)return;const r=this.getParent(),i=r instanceof tr?r.getPath():"",s=Ps(i,e),a=this.getRootId(),o=await Aa(a,this.path);if(!o)throw new Error("File not found in IndexedDB");await lc(a,this.path),await Vs(a,s,o),yt(Me,ft.getWorkspaceSync()??this.getWorkspace())}}class tr extends Nt{constructor(e,r){super(),this.path=Qi(e),this.parent=r}getPath(){return this.path}getName(){if(!this.path)return"";const e=this.path.split("/");return e[e.length-1]}getParent(){return this.parent}getRoot(){const e=this.getParent();return e?e.getRoot():this}getRootId(){const e=this.getRoot();return e instanceof Ws?e.getRootId():""}async listChildren(e){const r=await mf(this.getRootId(),this.path),i=[];for(const s of r){const a=Ps(this.path,s.name);s.type==="dir"?i.push(new tr(a,this)):i.push(new jo(a,this))}return i}async getResource(e,r){if(!e)throw new Error("No path provided");const i=e.endsWith("/"),s=e.split("/").filter(n=>n.trim());let a=this,o=!1;for(let n=0;n<s.length;n++){const l=s[n],d=n===s.length-1,h=a.getPath(),f=Ps(h,l),g=this.getRootId(),u=await Aa(g,f);if(!u){if(!r?.create)return null;if(d&&!i)return await Vs(g,f,{type:"file",content:new Blob([])}),o=!0,new jo(f,a);await Vs(g,f,{type:"dir"}),o=!0,a=new tr(f,a);continue}if(d)return i?u.type!=="dir"?null:new tr(f,a):u.type==="dir"?new tr(f,a):new jo(f,a);if(u.type!=="dir")return null;a=new tr(f,a)}return o&&yt(Me,ft.getWorkspaceSync()??this.getWorkspace()),a}touch(){yt(Me,ft.getWorkspaceSync()??this.getWorkspace())}async delete(e,r=!0){if(!e){const s=this.getParent();if(s instanceof tr){await s.delete(this.getName());return}return}const i=Ps(this.path,e);await Od(this.getRootId(),i),yt(Me,ft.getWorkspaceSync()??this.getWorkspace())}async copyTo(e){for(const r of await this.listChildren(!1)){const i=[e,r.getName()].join("/");await r.copyTo(i)}}async rename(e){if(this.getName()===e)return;const r=this.getParent();if(!(r instanceof tr))throw new Error("Cannot rename IndexedDB root directory");const i=this.getPath(),s=Ps(r.getPath(),e);await ff(this.getRootId(),i,s),yt(Me,ft.getWorkspaceSync()??this.getWorkspace())}}class Ws extends tr{constructor(e,r){super(""),this.displayName=e||"IndexedDB",this.rootId=r}getRootId(){return this.rootId}getName(){return this.displayName}getParent(){}async rename(e){const r=String(e??"").trim();!r||r===this.displayName||(this.displayName=r,await ft.updateFolderName(this,r))}}function bf(){return typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():"default-"+Math.random().toString(36).slice(2)+Date.now().toString(36)}ft.registerContribution({type:"indexeddb",name:"idb",canHandle(t){return t&&typeof t=="object"&&t.indexeddb===!0},async connect(t){await Yr();const e=t.name&&String(t.name).trim(),r=e&&e.length>0?e:await hf(),i=bf();return new Ws(r,i)},async restore(t){if(t&&typeof t=="object"&&t.indexeddb===!0&&t.rootId){await Yr();const e=t.name&&String(t.name).trim()||"IndexedDB";return new Ws(e,String(t.rootId))}},async persist(t){return t instanceof Ws?{indexeddb:!0,name:t.getName(),rootId:t.getRootId()}:null}});async function wf(t){return t instanceof Ws?(await pf(t.getRootId()),!0):!1}const Oe=Br("MarketplaceRegistry"),cc="events/marketplaceregistry/changed",dc="marketplace.catalogUrls";class vf{constructor(){this.catalogUrls=[],this.loadingPromises=new Map,this.loadCatalogUrls().then(()=>{this.refreshCatalogs().catch(e=>{Oe.error(`Failed to refresh catalogs on init: ${e.message}`)})})}async loadCatalogUrls(){try{const e=await Xt.get(dc);this.catalogUrls=Array.isArray(e)?e:[]}catch(e){Oe.error(`Failed to load catalog URLs: ${e}`),this.catalogUrls=[]}}async saveCatalogUrls(){await Xt.set(dc,this.catalogUrls),yt(cc,{type:"catalogs",urls:this.catalogUrls})}async addCatalogUrl(e){if(!this.isValidUrl(e))throw new Error(`Invalid catalog URL: ${e}`);if(this.catalogUrls.includes(e)){Oe.debug(`Catalog URL already exists: ${e}`);return}this.catalogUrls.push(e),await this.saveCatalogUrls(),Oe.debug(`Added catalog URL: ${e}`);try{await this.refreshCatalogs()}catch(r){Oe.warn(`Failed to refresh catalogs immediately after adding: ${r}`)}}async addCatalogUrls(e){let r=0;for(const i of e){if(!this.isValidUrl(i)){Oe.warn(`Skipping invalid catalog URL: ${i}`);continue}this.catalogUrls.includes(i)||(this.catalogUrls.push(i),Oe.debug(`Added catalog URL: ${i}`),r++)}if(r!==0){await this.saveCatalogUrls();try{await this.refreshCatalogs()}catch(i){Oe.warn(`Failed to refresh catalogs after adding URLs: ${i}`)}}}async removeCatalogUrl(e){const r=this.catalogUrls.indexOf(e);r!==-1&&(this.catalogUrls.splice(r,1),await this.saveCatalogUrls(),Oe.info(`Removed catalog URL: ${e}`))}getCatalogUrls(){return[...this.catalogUrls]}isValidUrl(e){try{const r=new URL(e);return r.protocol==="http:"||r.protocol==="https:"}catch{return!1}}async fetchCatalog(e){const r=this.loadingPromises.get(e);if(r)return r;const i=(async()=>{try{const s=await fetch(e,{method:"GET",headers:{Accept:"application/json"}});if(!s.ok)throw new Error(`HTTP ${s.status}: ${s.statusText}`);const a=await s.json();if(!a.extensions||!Array.isArray(a.extensions))throw new Error("Invalid catalog format: extensions array is required");return{name:a.name,description:a.description,extensions:a.extensions||[]}}catch(s){throw Oe.error(`Failed to fetch catalog from ${e}: ${s}`),s}finally{this.loadingPromises.delete(e)}})();return this.loadingPromises.set(e,i),i}async refreshCatalogs(){const e=this.catalogUrls.map(s=>this.fetchCatalog(s).catch(a=>(Oe.warn(`Failed to refresh catalog ${s}: ${a.message}`),null))),r=await Promise.allSettled(e);let i=0;r.forEach(s=>{if(s.status==="fulfilled"&&s.value){const a=s.value;a.extensions&&a.extensions.forEach(o=>{if(!qt.getExtensions().find(n=>n.id===o.id)){const n={...o,external:!0};qt.registerExtension(n),i++}})}}),Oe.debug(`Refreshed ${this.catalogUrls.length} catalogs, ${i} extensions registered`),i>0&&Oe.info(`Marketplace: ${i} new extension(s) available`),yt(cc,{type:"refreshed"})}getMarketplaceExtension(e){const r=qt.getExtensions().find(i=>i.id===e);if(r&&r.external)return r}isMarketplaceExtension(e){const r=qt.getExtensions().find(i=>i.id===e);return r!==void 0&&r.external===!0}}const Pd=new vf;pe.put("marketplaceRegistry",Pd);const bt=Br("AppLoader");function hc(t){if(!t)return"standard";const e=t.layout??t.layoutId;return typeof e=="object"?e.id:e??"standard"}function yf(t){const e={};for(const[r,i]of Object.entries(t))e[r]=typeof i=="boolean"?i?"true":"false":i;return e}function mr(t){return t instanceof Error?t.message:String(t)}function xf(t){try{const r=new URL(t).pathname.split("/").filter(Boolean);return r.length>0?r[r.length-1]:void 0}catch{const e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:void 0}}function kf(){const e=window.location.pathname.split("/").filter(Boolean);if(e.length===0)return;const r=e[0];if(!(!r||r==="index.html"||r.endsWith(".html")))return r}const ol=class Ns{constructor(){this.apps=new Map,this.started=!1,this.container=document.body,this.systemRequiredExtensions=new Set}registerApp(e,r){if(r?.hostConfig===!0&&typeof ec<"u"){const i=ec;e.name===void 0&&(e.name=i.name),e.version===void 0&&(e.version=i.version),e.description===void 0&&(e.description=i.description),e.dependencies===void 0&&(e.dependencies=i.dependencies),e.marketplaceCatalogUrls===void 0&&(e.marketplaceCatalogUrls=i.marketplaceCatalogUrls)}e.name=e.name??"app",e.version=e.version??"0.0.0",this.apps.has(e.name)&&bt.warn(`App '${e.name}' is already registered. Overwriting.`),e.marketplaceCatalogUrls?.length&&Pd.addCatalogUrls(e.marketplaceCatalogUrls).catch(()=>{}),this.apps.set(e.name,e),r?.defaultAppName&&(this.defaultAppName=r.defaultAppName),r?.container&&(this.container=r.container),r?.autoStart&&!this.started&&this.start()}registerSystemRequiredExtension(e){this.systemRequiredExtensions.add(e)}async loadAppFromUrl(e){bt.info(`Loading app from URL: ${e}...`);try{const r=await import(e);if(!r.default)throw new Error(`Module at ${e} does not have a default export`);const i=r.default;if(!i.name||!i.version)throw new Error(`Module at ${e} does not export a valid AppDefinition (name and version required)`);return bt.info(`Successfully loaded app definition from URL: ${i.name}`),i}catch(r){throw bt.error(`Failed to load app from URL ${e}: ${mr(r)}`),r}}async start(){if(this.started){bt.debug("AppLoader already started");return}this.started=!0;const e=new URLSearchParams(window.location.search),r=e.get("app"),i=e.get("appId"),s=kf(),a=this.apps.size;let o;if(r&&(o=xf(r),o&&bt.info(`Extracted app ID from URL path: ${o}`)),s&&bt.info(`Extracted app ID from current page path: ${s}`),r)try{bt.info(`URL parameter 'app' found: ${r}, attempting to load extension or app`);try{await qt.loadExtensionFromUrl(r),bt.info(`Successfully loaded extension from URL: ${r}`)}catch(l){bt.info(`Failed to load as extension, trying as app definition: ${mr(l)}`);try{const d=await this.loadAppFromUrl(r);if(this.registerApp(d),!d.name)throw new Error("App from URL has no name after registration");await this.loadApp(d.name,this.container),bt.info(`Successfully loaded app from URL: ${r}`);return}catch(d){throw bt.error(`Failed to load from URL as both extension and app: ${mr(d)}`),d}}}catch(l){bt.error(`Failed to load from URL parameter, falling back to default app: ${mr(l)}`)}const n=await this.selectAppToLoad({appIdFromUrl:i,appIdFromPath:s,appIdFromAppUrl:o,appsBeforeExtension:a});if(!n)throw new Error("No apps registered");await this.loadApp(n,this.container)}findAppNameBySegment(e){if(this.apps.has(e))return e;for(const r of this.apps.values())if(r.path===e||r.name&&r.name.endsWith("/"+e))return r.name??void 0}dispatchLoadProgress(e){window.dispatchEvent(new CustomEvent("app-load-progress",{detail:{message:e}}))}async loadApp(e,r){const i=this.apps.get(e);if(!i)throw new Error(`App '${e}' not found. Make sure it's registered.`);if(this.dispatchLoadProgress("Starting…"),this.currentApp&&(bt.info(`Disposing current app: ${this.currentApp.name}`),this.currentApp.dispose&&await this.currentApp.dispose(),this.currentApp.extensions&&this.currentApp.extensions.length>0&&(bt.info(`Disabling ${this.currentApp.extensions.length} extensions...`),this.currentApp.extensions.forEach(a=>{qt.disable(a)}))),Na.applyAppNameRemaps(i.remaps),i.remaps?.length){const a=new Set;for(const o of i.remaps)for(const n of o.targets)a.add(n);for(const o of a){const n=gt.getContributions(o);yt(ar,{target:o,contributions:n})}}i.contributions&&(bt.info("Registering app contributions..."),i.contributions.ui&&(i.contributions.ui.forEach(a=>{const o=a.target;o&&gt.registerContribution(o,a)}),bt.info(`Registered ${i.contributions.ui.length} UI contributions`)),i.contributions.extensions&&(i.contributions.extensions.forEach(a=>{qt.registerExtension(a)}),bt.info(`Registered ${i.contributions.extensions.length} app extensions`)));const s=new Set(i.extensions||[]);this.systemRequiredExtensions.forEach(a=>s.add(a)),i.extensions=Array.from(s),this.dispatchLoadProgress("Loading extensions…"),await qt.loadEnabledExtensions(),i.extensions.length>0&&(this.dispatchLoadProgress("Enabling extensions…"),await Promise.all(i.extensions.map(a=>qt.enableAsync(a).catch(o=>{bt.error(`Failed to load extension ${a}: ${mr(o)}`)})))),i.initialize&&(this.dispatchLoadProgress("Initializing…"),bt.info(`Initializing ${i.name}...`),await i.initialize()),this.currentApp=i,bt.info(`App ${i.name} loaded successfully`),this.preferredLayoutId=await this.getPreferredLayoutId(),this.updateDocumentMetadata(i),r&&(this.dispatchLoadProgress("Rendering layout…"),this.renderApp(r)),window.dispatchEvent(new CustomEvent("app-loaded",{detail:{appName:i.name}}))}updateDocumentMetadata(e){if(document.title=e.name??"",e.metadata?.favicon){const r=e.metadata.favicon;let i=document.querySelector("link[rel*='icon']");i||(i=document.createElement("link"),i.rel="icon",document.head.appendChild(i)),i.type="image/svg+xml",i.href=r}}renderApp(e){if(!this.currentApp)throw new Error("No app loaded. Call loadApp() first.");const r=this.preferredLayoutId??hc(this.currentApp),i=gt.getContributions(Ua);let s=i.find(l=>l.id===r);if(s||(bt.warn(`Layout '${r}' not found, falling back to 'standard'`),s=i.find(l=>l.id==="standard")),!s)throw new Error(`No layout found for layoutId '${r}' and no 'standard' layout registered.`);const a=s.component;let o={};a&&typeof a=="object"&&"tag"in a&&a.attributes&&(o={...a.attributes});const n=this.currentApp?.layout;if(typeof n=="object"&&n.id===r&&n.props&&Object.assign(o,yf(n.props)),e.innerHTML="",typeof a=="string"){const l=document.createElement(a);for(const[d,h]of Object.entries(o))l.setAttribute(d,h);e.appendChild(l)}else if(a&&typeof a=="object"&&"tag"in a){const l=document.createElement(a.tag);for(const[d,h]of Object.entries(o))l.setAttribute(d,h);e.appendChild(l)}else if(typeof a=="function")Ge(a(),e);else throw new Error(`Layout '${s.id}' has invalid component.`);s.onShow&&requestAnimationFrame(()=>{Promise.resolve(s.onShow()).catch(l=>bt.error(`Layout onShow failed for '${s.id}': ${mr(l)}`))})}getCurrentApp(){return this.currentApp}getRegisteredApps(){return Array.from(this.apps.values())}async getPreferredAppId(){try{return await Xt.get(Ns.PREFERRED_APP_KEY)}catch(e){bt.debug(`Failed to get preferred app ID from settings: ${mr(e)}`);return}}async setPreferredAppId(e){if(!this.apps.has(e))throw new Error(`App '${e}' not found. Make sure it's registered.`);try{await Xt.set(Ns.PREFERRED_APP_KEY,e),this.defaultAppName=e,bt.info(`Set preferred app to: ${e}`)}catch(r){throw bt.error(`Failed to persist preferred app: ${mr(r)}`),r}}getRegisteredLayouts(){return gt.getContributions(Ua)}getCurrentLayoutId(){return this.preferredLayoutId??hc(this.currentApp)}async getPreferredLayoutId(){try{return await Xt.get(Ns.PREFERRED_LAYOUT_KEY)}catch(e){bt.debug(`Failed to get preferred layout ID: ${mr(e)}`);return}}async setPreferredLayoutId(e){if(!this.getRegisteredLayouts().some(i=>i.id===e))throw new Error(`Layout '${e}' not found.`);try{await Xt.set(Ns.PREFERRED_LAYOUT_KEY,e),this.preferredLayoutId=e,bt.info(`Set preferred layout to: ${e}`),this.currentApp&&this.container&&this.renderApp(this.container),window.dispatchEvent(new CustomEvent("layout-changed",{detail:{layoutId:e}}))}catch(i){throw bt.error(`Failed to persist preferred layout: ${mr(i)}`),i}}async selectAppToLoad(e){const{appIdFromUrl:r,appIdFromPath:i,appIdFromAppUrl:s,appsBeforeExtension:a}=e;if(r){const l=this.findAppNameBySegment(r)??r;if(this.apps.has(l))return bt.info(`Loading app specified by URL parameter 'appId': ${l}`),l;bt.warn(`App '${r}' from URL parameter not found`)}if(i){const l=this.findAppNameBySegment(i);if(l)return bt.info(`Loading app from URL path: ${i}`),l;bt.debug(`App for path '${i}' not found, continuing search`)}if(s){const l=this.findAppNameBySegment(s)??s;if(this.apps.has(l))return bt.info(`Loading app using segment from app URL path: ${l}`),l}if(this.apps.size>a){const l=Array.from(this.apps.values()).slice(a);if(l.length>0){const d=l[0];return bt.info(`Loading app registered by extension: ${d.name}`),d.name}}const o=await this.getPreferredAppId();if(o&&this.apps.has(o))return bt.info(`Loading preferred app from settings: ${o}`),o;if(this.defaultAppName&&this.apps.has(this.defaultAppName))return this.defaultAppName;this.defaultAppName&&bt.warn(`Default app '${this.defaultAppName}' not found`);const n=this.getRegisteredApps();if(n.length>0)return n[0].name}};ol.PREFERRED_APP_KEY="preferredAppName";ol.PREFERRED_LAYOUT_KEY="preferredLayoutId";let Cf=ol;const qr=new Cf;pe.put("appLoaderService",qr);var Sf=Object.defineProperty,$f=Object.getOwnPropertyDescriptor,aa=(t,e,r,i)=>{for(var s=i>1?void 0:i?$f(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Sf(e,r,s),s};let $i=class extends Ur{constructor(){super(...arguments),this.message="",this.defaultValue="",this.markdown=!1,this.inputValue=""}async firstUpdated(t){super.firstUpdated(t),this.inputValue=this.defaultValue,await this.updateComplete;const e=this.shadowRoot?.querySelector("wa-input");if(e){const r=e.shadowRoot?.querySelector("input");r&&(r.focus(),r.select())}}getResult(){return this.inputValue}handleInput(t){this.inputValue=t.target.value}handleKeyDown(t){t.key==="Enter"?(t.preventDefault(),this.dispatchEvent(new CustomEvent("dialog-ok",{bubbles:!0,composed:!0}))):t.key==="Escape"&&(t.preventDefault(),this.dispatchEvent(new CustomEvent("dialog-cancel",{bubbles:!0,composed:!0})))}render(){return $`
            ${this.renderMessage(this.message,this.markdown)}
            <wa-input
                value="${this.inputValue}"
                @input=${this.handleInput}
                @keydown=${this.handleKeyDown}
                autofocus
            ></wa-input>
        `}};$i.styles=[...Ur.styles,J`
            wa-input {
                width: 100%;
            }
        `];aa([p({type:String})],$i.prototype,"message",2);aa([p({type:String,attribute:"default-value"})],$i.prototype,"defaultValue",2);aa([p({type:Boolean})],$i.prototype,"markdown",2);aa([Z()],$i.prototype,"inputValue",2);$i=aa([X("lyra-prompt-dialog-content")],$i);gt.registerContribution(Si,{id:"prompt",label:"Input",buttons:[ia,al],component:t=>t?$`
            <lyra-prompt-dialog-content 
                .message="${t.message}"
                .defaultValue="${t.defaultValue}"
                .markdown="${t.markdown}"
            ></lyra-prompt-dialog-content>
        `:$`<div>Error: No prompt dialog state</div>`,onButton:async(t,e,r)=>(r&&(t==="ok"?r.resolve(e||""):r.resolve(null)),!0)});async function mo(t,e="",r=!1){return new Promise(i=>{fo.open("prompt",{message:t,defaultValue:e,markdown:r,resolve:i})})}var _f=Object.defineProperty,Ef=Object.getOwnPropertyDescriptor,nl=(t,e,r,i)=>{for(var s=i>1?void 0:i?Ef(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&_f(e,r,s),s};let Wa=class extends Ur{constructor(){super(...arguments),this.message="",this.markdown=!1}render(){return $`
            ${this.renderMessage(this.message,this.markdown)}
        `}};nl([p({type:String})],Wa.prototype,"message",2);nl([p({type:Boolean})],Wa.prototype,"markdown",2);Wa=nl([X("lyra-info-dialog-content")],Wa);gt.registerContribution(Si,{id:"info",label:"Information",buttons:[ia],component:t=>t?$`
            <lyra-info-dialog-content 
                .message="${t.message}"
                .markdown="${t.markdown}"
            ></lyra-info-dialog-content>
        `:$`<div>Error: No info dialog state</div>`,onButton:async(t,e,r)=>(r&&r.resolve&&r.resolve(),!0)});var Af=Object.defineProperty,Lf=Object.getOwnPropertyDescriptor,ll=(t,e,r,i)=>{for(var s=i>1?void 0:i?Lf(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Af(e,r,s),s};let qa=class extends Ur{constructor(){super(...arguments),this.message="",this.markdown=!1}getResult(){return!1}render(){return $`
            ${this.renderMessage(this.message,this.markdown)}
        `}};ll([p({type:String})],qa.prototype,"message",2);ll([p({type:Boolean})],qa.prototype,"markdown",2);qa=ll([X("lyra-confirm-dialog-content")],qa);gt.registerContribution(Si,{id:"confirm",label:"Confirm",buttons:[ia,al],component:t=>t?$`
            <lyra-confirm-dialog-content 
                .message="${t.message}"
                .markdown="${t.markdown}"
            ></lyra-confirm-dialog-content>
        `:$`<div>Error: No confirm dialog state</div>`,onButton:async(t,e,r)=>(r&&(t==="ok"?r.resolve(!0):r.resolve(!1)),!0)});async function ts(t,e=!1){return new Promise(r=>{fo.open("confirm",{message:t,markdown:e,resolve:r})})}var zf=Object.defineProperty,Tf=Object.getOwnPropertyDescriptor,Ii=(t,e,r,i)=>{for(var s=i>1?void 0:i?Tf(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&zf(e,r,s),s};let Ir=class extends Ur{constructor(){super(...arguments),this.title="",this.message="",this.markdown=!1,this.actions=[],this.currentTitle="",this.currentMessage="",this.dialogElement=null}async firstUpdated(t){super.firstUpdated(t),this.currentTitle=this.title,this.currentMessage=this.message,await this.updateComplete;const e=this.closest("wa-dialog");e&&(this.dialogElement=e,this.updateDialogLabel());const r=this.closest(".dialog-service-content");if(r){const i=r.parentElement?.querySelector(".dialog-service-footer");i&&(i.style.display="none")}}updated(t){super.updated(t),t.has("title")&&(this.currentTitle=this.title,this.updateDialogLabel()),t.has("message")&&(this.currentMessage=this.message)}updateDialogLabel(){this.dialogElement&&this.dialogElement.setAttribute("label",this.currentTitle)}updateDialog(t,e,r){this.currentTitle=t,this.currentMessage=e,this.actions=[...r],this.updateDialogLabel(),this.requestUpdate()}handleActionClick(t){t.callback()}handleClose(){this.closest("wa-dialog")&&this.resolveCallback&&this.resolveCallback()}render(){const t=this.actions.filter(r=>r.label!=="Close"),e=this.actions.filter(r=>r.label==="Close");return $`
            <div class="dialog-content">
                <wa-scroller class="dialog-scroller">
                    ${this.renderMessage(this.currentMessage,this.markdown)}
                </wa-scroller>
                
                <div class="dialog-actions">
                    <div class="dialog-actions-left">
                        ${t.map(r=>$`
                            <wa-button 
                                variant="${r.variant||"default"}"
                                ?disabled=${r.disabled}
                                @click=${()=>this.handleActionClick(r)}
                            >
                                ${r.label}
                            </wa-button>
                        `)}
                    </div>
                    <div class="dialog-actions-right">
                        ${e.map(r=>$`
                            <wa-button 
                                variant="${r.variant||"primary"}"
                                @click=${()=>{this.handleActionClick(r),this.handleClose()}}
                            >
                                ${r.label}
                            </wa-button>
                        `)}
                    </div>
                </div>
            </div>
        `}};Ir.styles=[...Ur.styles,J`
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
        `];Ii([p({type:String})],Ir.prototype,"title",2);Ii([p({type:String})],Ir.prototype,"message",2);Ii([p({type:Boolean})],Ir.prototype,"markdown",2);Ii([Z()],Ir.prototype,"actions",2);Ii([Z()],Ir.prototype,"currentTitle",2);Ii([Z()],Ir.prototype,"currentMessage",2);Ir=Ii([X("lyra-navigable-info-dialog-content")],Ir);gt.registerContribution(Si,{id:"navigable-info",label:"Information",buttons:[sf],component:t=>{if(!t)return $`<div>Error: No navigable info dialog state</div>`;const e=$`
            <lyra-navigable-info-dialog-content 
                .title="${t.title}"
                .message="${t.message}"
                .markdown="${t.markdown}"
            ></lyra-navigable-info-dialog-content>
        `;return(async()=>{const r=document.querySelector("lyra-navigable-info-dialog-content");r&&(await r.updateComplete,r.actions=t.actions||[],r.resolveCallback=t.resolve,t.updateDialogRef&&(t.updateDialogRef.current=(i,s,a)=>{r.updateDialog(i,s,a)}))})(),e},onButton:async(t,e,r)=>r&&t==="close"&&r.resolve?(r.resolve(),!0):!1});var Rf=Object.defineProperty,Df=Object.getOwnPropertyDescriptor,fs=(t,e,r,i)=>{for(var s=i>1?void 0:i?Df(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Rf(e,r,s),s};let Qr=class extends Ur{constructor(){super(...arguments),this.mode="either",this.selectedPath=null,this.rootNodes=[],this.loading=!1,this.loadError=null}async doInitUI(){await this.loadWorkspaceTree()}firstUpdated(t){super.firstUpdated?.(t);const e=this.closest("wa-dialog");e&&e.setAttribute("label",this.dialogTitle)}updated(t){if(super.updated?.(t),t.has("mode")){const e=this.closest("wa-dialog");e&&e.setAttribute("label",this.dialogTitle)}}get dialogTitle(){return this.mode==="file"?"Choose a file":this.mode==="directory"?"Choose a directory":"Choose a file or directory"}getResult(){return this.selectedPath!=null?"/"+this.selectedPath:null}async loadWorkspaceTree(){this.loading=!0,this.loadError=null;try{const t=await ft.getWorkspace();if(!t){this.rootNodes=[];return}const e=await t.listChildren(!1),r=[];for(const i of e)r.push(await this.resourceToTreeNode(i,!1));r.sort((i,s)=>i.label.localeCompare(s.label)),this.rootNodes=r}catch(t){const e=t instanceof Error?t.message:String(t);this.loadError=e,this.rootNodes=[]}finally{this.loading=!1}}async resourceToTreeNode(t,e=!0){const r=t instanceof Bt,i={resource:t,label:t.getName(),leaf:r,children:[]};if(t instanceof Nt&&e){for(const s of await t.listChildren(!1))i.children.push(await this.resourceToTreeNode(s,!1));i.children.sort((s,a)=>s.label.localeCompare(a.label))}return i}handleSelectionChange(t){const e=t.detail&&t.detail.selection||[];if(!e||e.length===0){this.selectedPath=null,this.requestUpdate();return}const i=e[0]?.model?.resource;if(!i){this.selectedPath=null,this.requestUpdate();return}const s=i instanceof Nt,a=i instanceof Bt;if(this.mode==="file"&&!a){this.selectedPath=null,this.requestUpdate();return}if(this.mode==="directory"&&a){const n=i.getParent?.();this.selectedPath=n?n.getWorkspacePath():null,this.requestUpdate();return}if(this.mode==="directory"&&!s){this.selectedPath=null,this.requestUpdate();return}const o=i.getWorkspacePath?.();this.selectedPath=typeof o=="string"?o:null,this.requestUpdate()}renderTreeNode(t){return $`
      <wa-tree-item .model=${t} ?leaf=${t.leaf}>
        ${t.label}
        ${t.children.map(e=>this.renderTreeNode(e))}
      </wa-tree-item>
    `}render(){return $`
      <div class="dialog-body">
        ${this.loadError?this.renderMessage(this.loadError,!1):null}

        <div class="browser-container">
          ${this.loading?$`<div>Loading workspace…</div>`:this.rootNodes.length>0?$`
                    <wa-tree @wa-selection-change=${t=>this.handleSelectionChange(t)}>
                      ${this.rootNodes.map(t=>this.renderTreeNode(t))}
                    </wa-tree>
                  `:$`<div>No workspace folders.</div>`}
        </div>

        <div class="selection-info">
          ${this.selectedPath?`Selected path: ${this.selectedPath}`:"No path selected yet."}
        </div>
      </div>
    `}};Qr.styles=[...Ur.styles,J`
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
    `];fs([p({type:String})],Qr.prototype,"mode",2);fs([Z()],Qr.prototype,"selectedPath",2);fs([Z()],Qr.prototype,"rootNodes",2);fs([Z()],Qr.prototype,"loading",2);fs([Z()],Qr.prototype,"loadError",2);Qr=fs([X("lyra-filebrowser-dialog")],Qr);gt.registerContribution(Si,{id:"filebrowser-dialog",label:"Select Path",buttons:[ia,al],component:t=>$`<lyra-filebrowser-dialog .mode=${t?.mode??"either"}></lyra-filebrowser-dialog>`,onButton:async(t,e,r)=>(r&&(t==="ok"?r.resolve(e||null):r.resolve(null)),!0)});function If(t="either"){return new Promise(e=>{fo.open("filebrowser-dialog",{resolve:e,mode:t})})}function Of(t){const e=(t??"").trim();if(!e)return{name:""};const r=e.split(/\s+/);if(r.length<=1)return{name:e};const i=r.pop(),s=r.join(" ");return{name:i,library:s}}function ye(t,e){const{name:r,library:i}=Of(t??"");return $`<wa-icon library=${i??ht} name=${r} label=${e?.label??ht} slot=${e?.slot??ht}></wa-icon>`}var Pf=Object.defineProperty,Nf=Object.getOwnPropertyDescriptor,Er=(t,e,r,i)=>{for(var s=i>1?void 0:i?Nf(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Pf(e,r,s),s};const Ff=150;function Ko(t,e,r,i,s){const o=`Toolbar ${t??"default"}`,n=r.filter(d=>d.slot===t&&i(d)),l=t==="start"?$`<slot name="start"></slot>`:t==="end"?$`<slot name="end"></slot>`:$`<slot></slot>`;return $`
        <wa-button-group orientation=${e} label=${o}>
            ${l}
            ${n.map(s)}
        </wa-button-group>
    `}let Ze=class extends Mr{constructor(){super(...arguments),this.position="start",this.orientation="horizontal",this.align="start",this.size="small",this.scopeTokens=[],this.partToolbarContent=void 0,this.partToolbarRenderer=void 0,this.contributions=[],this.compact=!1,this.resizeObserver=null,this.resizeDebounceTimer=null,this.overflowCheckScheduled=!1,this.onResize=()=>{this.resizeDebounceTimer!==null&&clearTimeout(this.resizeDebounceTimer),this.resizeDebounceTimer=setTimeout(()=>{this.resizeDebounceTimer=null,this.updateCompactFromSpace()},Ff)}}updateCompactFromSpace(){const t=this.shadowRoot?.querySelector(".toolbar-items");if(!t)return;const e=t.scrollWidth>t.clientWidth;this.compact!==e&&(this.compact=e,this.requestUpdate())}scheduleOverflowCheck(){this.overflowCheckScheduled||(this.overflowCheckScheduled=!0,requestAnimationFrame(()=>{this.overflowCheckScheduled=!1,this.updateCompactFromSpace()}))}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(this.onResize),this.resizeObserver.observe(this)}disconnectedCallback(){this.resizeObserver?.disconnect(),this.resizeObserver=null,this.resizeDebounceTimer!==null&&(clearTimeout(this.resizeDebounceTimer),this.resizeDebounceTimer=null),super.disconnectedCallback()}updated(t){super.updated?.(t),this.compact||this.scheduleOverflowCheck(),t.has("scopeTokens")&&this.refreshContributions()}attributeChangedCallback(t,e,r){super.attributeChangedCallback(t,e,r),t==="id"&&e!==r&&this.refreshContributions()}doBeforeUI(){this.refreshContributions(),xe(ar,t=>{const e=this.getAttribute("id");if(!e)return;this.matchesTarget(e,t.target)&&(this.refreshContributions(),this.requestUpdate())})}refreshContributions(){const t=this.getAttribute("id");if(!t){this.contributions=[];return}this.loadContributions(t)}matchesTarget(t,e){if(e===t)return!0;if(!t.includes(":"))return!1;const[r]=t.split(":");if(e===`${r}:*`)return!0;const i=e.split(":");if(i.length===2){const s=i[1];if(this.scopeTokens.includes(s))return t.startsWith(`${r}:`)}return!1}loadContributions(t){const e=gt.getContributions(t);if(!t.includes(":")){this.contributions=e;return}const[r]=t.split(":"),i=`${r}:*`,s=gt.getContributions(i),a=[];for(const o of this.scopeTokens){const n=`${r}:${o}`,l=gt.getContributions(n);a.push(...l)}this.contributions=[...s,...a,...e]}isToolbarItem(t){return"command"in t||"component"in t}contributionCreator(t){if("command"in t){const e=t,r=!this.compact&&!!e.showLabel;return $`
                <wa-button @click=${()=>this.executeCommand(e.command,e.params||{})}
                           title=${e.label}
                           ?disabled="${e.disabled?.get()}"
                           appearance="plain" size=${this.size}>
                    ${ye(e.icon,{label:e.label})}
                    ${r?e.label:""}
                </wa-button>
            `}if("component"in t){const e=t.component;return e instanceof Function?e():Dr(e)}return $`<span>unknown contribution type: ${typeof t}</span>`}render(){const t=this.partToolbarRenderer?this.partToolbarRenderer():this.partToolbarContent?this.partToolbarContent:"",e=this.orientation==="vertical"?"column":"row",r={start:"flex-start",center:"center",end:"flex-end"},i=this.contributionCreator.bind(this),s=this.isToolbarItem.bind(this);return $`
            <div class="toolbar-items" style=${Vt({"flex-direction":e,"align-items":r[this.align],"justify-content":this.position})}>
                ${Ko("start",this.orientation,this.contributions,s,i)}
                ${t}
                ${Ko(void 0,this.orientation,this.contributions,s,i)}
                ${Ko("end",this.orientation,this.contributions,s,i)}
            </div>
        `}};Ze.styles=J`
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
    `;Er([p()],Ze.prototype,"position",2);Er([p({reflect:!0})],Ze.prototype,"orientation",2);Er([p({reflect:!0})],Ze.prototype,"align",2);Er([p({reflect:!0})],Ze.prototype,"size",2);Er([p({attribute:!1})],Ze.prototype,"scopeTokens",2);Er([p({attribute:!1})],Ze.prototype,"partToolbarContent",2);Er([p({attribute:!1})],Ze.prototype,"partToolbarRenderer",2);Er([Z()],Ze.prototype,"contributions",2);Er([Z()],Ze.prototype,"compact",2);Ze=Er([X("lyra-toolbar")],Ze);var Bf=Object.defineProperty,Mf=Object.getOwnPropertyDescriptor,De=(t,e,r,i)=>{for(var s=i>1?void 0:i?Mf(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Bf(e,r,s),s};let ge=class extends lo{constructor(){super(...arguments),this.cmd="",this.title="",this.label=!1,this.disabled=!1,this.appearance="plain",this.variant="neutral",this.size="small",this.params={},this.placement="bottom-start",this.dropdownContributions=[]}handleClick(t){if(!this.disabled){if(t&&t.stopPropagation(),this.action){this.action(t);return}if(this.cmd){const e=this.closest("wa-dropdown");e&&e.open!==void 0&&(e.open=!1),this.executeCommand(this.cmd,this.params)}}}handleSelect(t){const e=t.target;e&&e.open!==void 0&&(e.open=!1)}isInDropdown(){return!!this.closest("wa-dropdown, wa-dropdown-menu")}getKeybinding(){if(!this.cmd||this.action)return null;const t=Ld.getKeyBindingsForCommand(this.cmd);return t.length>0?t[0]:null}doBeforeUI(){this.dropdown&&(this.loadDropdownContributions(),xe(ar,t=>{this.dropdown&&t.target===this.dropdown&&(this.dropdownContributions=t.contributions,this.requestUpdate())}))}loadDropdownContributions(){this.dropdown&&(this.dropdownContributions=gt.getContributions(this.dropdown),this.requestUpdate())}renderContribution(t){if("command"in t){const e=t,r=e.disabled?.get();return $`
                <lyra-command 
                    cmd="${e.command}"
                    icon="${e.icon||""}"
                    .params=${e.params||{}}
                    ?disabled="${r}">
                    ${e.label}
                </lyra-command>
            `}if("component"in t){const r=t.component;return r instanceof Function?r():Dr(r)}return ht}render(){const t=this.getKeybinding();return this.isInDropdown()?$`
                <wa-dropdown-item 
                    ?disabled=${this.disabled}
                    @click=${e=>this.handleClick(e)}>
                    ${ye(this.icon,{label:this.title,slot:"icon"})}
                    <slot></slot>
                    ${t?$`<span class="keybinding">${t}</span>`:""}
                </wa-dropdown-item>
            `:this.dropdown?$`
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
                        ${ye(this.icon,{label:this.title,slot:"start"})}
                        <slot></slot>
                        ${this.label?this.title:ht}
                    </wa-button>
                    
                    ${this.title?$`
                        <h6 style="padding: var(--wa-space-xs) var(--wa-space-s); margin: 0; color: var(--wa-color-neutral-50); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                            ${this.title}
                        </h6>
                    `:ht}
                    
                    ${this.dropdownContributions.map(e=>this.renderContribution(e))}
                    
                    ${this.cmd?$`
                        <wa-divider></wa-divider>
                        <lyra-command 
                            cmd="${this.cmd}"
                            icon="${this.icon||""}"
                            .params=${this.params}
                            ?disabled=${this.disabled}>
                            <slot></slot>
                            ${this.title}
                        </lyra-command>
                    `:ht}
                </wa-dropdown>
            `:$`
            <wa-button
                appearance=${this.appearance}
                variant=${this.variant}
                size=${this.size}
                ?disabled=${this.disabled}
                title=${t?`${this.title} (${t})`:this.title}
                @click=${e=>this.handleClick(e)}>
                ${ye(this.icon,{label:this.title,slot:"start"})}
                <slot></slot>
            </wa-button>
        `}};ge.styles=J`
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
    `;De([p()],ge.prototype,"cmd",2);De([p({type:Object,attribute:!1})],ge.prototype,"action",2);De([p()],ge.prototype,"title",2);De([p()],ge.prototype,"label",2);De([p()],ge.prototype,"icon",2);De([p({type:Boolean})],ge.prototype,"disabled",2);De([p()],ge.prototype,"appearance",2);De([p()],ge.prototype,"variant",2);De([p()],ge.prototype,"size",2);De([p({type:Object,attribute:!1})],ge.prototype,"params",2);De([p()],ge.prototype,"dropdown",2);De([p()],ge.prototype,"placement",2);De([Z()],ge.prototype,"dropdownContributions",2);ge=De([X("lyra-command")],ge);var Uf=Object.defineProperty,Vf=Object.getOwnPropertyDescriptor,ms=(t,e,r,i)=>{for(var s=i>1?void 0:i?Vf(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Uf(e,r,s),s};let Jr=class extends Mr{constructor(){super(...arguments),this.scopeTokens=[],this.partContextMenuRenderer=void 0,this.contributions=[],this.isOpen=!1,this.position={x:0,y:0},this.anchorRef=Gr(),this.dropdownRef=Gr(),this.boundHandleDocumentPointerDown=this.handleDocumentPointerDown.bind(this)}handleDocumentPointerDown(t){if(!this.isOpen)return;const e=t.composedPath();this.dropdownRef.value&&e.includes(this.dropdownRef.value)||e.some(r=>r.getAttribute?.("part")==="submenu")||this.onClose()}doBeforeUI(){this.refreshContributions(),xe(ar,t=>{const e=this.getAttribute("id");if(!e)return;this.matchesTarget(e,t.target)&&(this.refreshContributions(),this.requestUpdate())})}updated(t){super.updated?.(t),t.has("scopeTokens")&&this.refreshContributions()}attributeChangedCallback(t,e,r){super.attributeChangedCallback(t,e,r),t==="id"&&e!==r&&this.refreshContributions()}refreshContributions(){const t=this.getAttribute("id");if(!t){this.contributions=[];return}this.loadContributions(t)}matchesTarget(t,e){if(e===t)return!0;if(!t.includes(":"))return!1;const[r]=t.split(":");if(e===`${r}:*`)return!0;const i=e.split(":");if(i.length===2){const s=i[1];if(this.scopeTokens.includes(s))return t.startsWith(`${r}:`)}return!1}loadContributions(t){const e=gt.getContributions(t);if(!t.includes(":")){this.contributions=e;return}const[r]=t.split(":"),i=`${r}:*`,s=gt.getContributions(i),a=[];for(const o of this.scopeTokens){const n=`${r}:${o}`,l=gt.getContributions(n);a.push(...l)}this.contributions=[...s,...a,...e]}getElementFromPoint(t,e){let r=document.elementFromPoint(t,e);if(!r)return null;for(;r;){const i=r.shadowRoot;if(i){const s=i.elementFromPoint(t,e);if(s&&s!==r){r=s;continue}}break}return r}triggerClickUnderCursor(t){const e=this.getElementFromPoint(t.clientX,t.clientY);if(e){const r=new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,clientX:t.clientX,clientY:t.clientY,screenX:t.screenX,screenY:t.screenY,button:0,buttons:0,detail:1,which:1});e.dispatchEvent(r)}}show(t,e){e&&this.triggerClickUnderCursor(e),this.position=t,this.isOpen=!0,this.updateComplete.then(()=>{document.addEventListener("pointerdown",this.boundHandleDocumentPointerDown,{capture:!0})})}onClose(){this.isOpen=!1,document.removeEventListener("pointerdown",this.boundHandleDocumentPointerDown,{capture:!0})}renderContribution(t){if("command"in t){const e=t,r=e.disabled?.get();return $`
                <lyra-command
                    cmd="${e.command}"
                    icon="${e.icon??""}"
                    .params=${e.params??{}}
                    ?disabled="${r}">
                    ${e.label}
                </lyra-command>
            `}else if("component"in t){const e=t.component;return e instanceof Function?e():Dr(e)}return ht}render(){if(!this.isOpen)return ht;const t=this.partContextMenuRenderer?this.partContextMenuRenderer():ht;return $`
            <wa-dropdown
                ${Zr(this.dropdownRef)}
                ?open=${this.isOpen}
                @wa-after-hide=${this.onClose}>
                
                <div 
                    slot="trigger"
                    ${Zr(this.anchorRef)}
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
        `}};Jr.styles=J`
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
    `;ms([p({attribute:!1})],Jr.prototype,"scopeTokens",2);ms([p({attribute:!1})],Jr.prototype,"partContextMenuRenderer",2);ms([Z()],Jr.prototype,"contributions",2);ms([Z()],Jr.prototype,"isOpen",2);ms([Z()],Jr.prototype,"position",2);Jr=ms([X("lyra-contextmenu")],Jr);class cl extends Mr{}var Wf=Object.defineProperty,dl=(t,e,r,i)=>{for(var s=void 0,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=o(e,r,s)||s);return s&&Wf(e,r,s),s};const go=(Es=class extends cl{constructor(){super(...arguments),this.scrollMode="scroller",this.dirty=!1,this.isEditor=!1,this.onContentContextMenu=t=>{const e=this.renderRoot.querySelector("lyra-contextmenu");e&&(t.preventDefault(),e.show({x:t.clientX,y:t.clientY},t))}}getCommandStack(){return this.commandStack}renderToolbar(){return ht}activateContainingTab(){let t=this,e=null,r=null;for(;t;){const i=t.tagName?.toLowerCase();if(i==="wa-tab-panel"&&(e=t.getAttribute("name")),i==="lyra-tabs"){r=t;break}const s=t.parentElement;if(s)t=s;else{const a=t.getRootNode();t=a instanceof ShadowRoot?a.host:null}}r&&e!=null&&e!==""&&r.activate(e)}renderContextMenu(){return ht}renderContent(){return ht}getToolbarTarget(){const t=this.tabContribution?.editorId??this.id??this.tabContribution?.name;return t?`toolbar:${t}`:void 0}getContextMenuTarget(){const t=this.tabContribution?.editorId??this.id??this.tabContribution?.name;return t?`contextmenu:${t}`:void 0}syncIsEditorCapability(){const t=this.save!==Es.prototype.save;t!==this.isEditor&&(this.isEditor=t)}render(){const t=this.getToolbarTarget(),e=this.getContextMenuTarget(),r=this.tabContribution?.toolbar!==!1,i=this.tabContribution?.contextMenu!==!1,s=this.scrollMode,a=this.isEditor?["system.editors",".system.editors"]:[],o=this.renderContent(),n=s==="scroller"?$`
                <wa-scroller class="part-content-scroll" orientation="vertical">
                    <div class="part-content-inner">${o}</div>
                </wa-scroller>
            `:$`<div class="part-content-inner">${o}</div>`;return $`
            <div class="part-shell">
                ${r?$`
                    <lyra-toolbar
                        class="part-toolbar"
                        id=${st(t)}
                        .scopeTokens=${a}
                        .partToolbarRenderer=${()=>this.renderToolbar()}>
                    </lyra-toolbar>
                `:ht}
                <div class="part-content ${s==="native"?"native-scroll":""}" @contextmenu=${i?this.onContentContextMenu:void 0}>
                    ${n}
                </div>
                ${i?$`
                    <lyra-contextmenu
                        id=${st(e)}
                        .scopeTokens=${a}
                        .partContextMenuRenderer=${()=>this.renderContextMenu()}>
                    </lyra-contextmenu>
                `:ht}
            </div>
        `}updated(t){super.updated(t),this.syncIsEditorCapability(),t.has("dirty")&&t.get("dirty")!==void 0&&this.dispatchEvent(new CustomEvent("dirty",{detail:this.dirty,bubbles:!0}))}doClose(){}disconnectedCallback(){super.disconnectedCallback()}close(){this.doClose()}connectedCallback(){super.connectedCallback(),this.syncIsEditorCapability(),queueMicrotask(()=>this.syncIsEditorCapability())}save(){}isDirty(){return this.dirty}markDirty(t){this.dirty=t,mn.set(null),mn.set(this),Ke.set(null),Ke.set(this)}static finalizeStyles(t){const e=super.finalizeStyles(t);return[Es.baseStyles,...e]}},Es.baseStyles=J`
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
    `,Es);dl([p()],go.prototype,"dirty");dl([p({attribute:!1})],go.prototype,"tabContribution");dl([p({type:Boolean,attribute:!1})],go.prototype,"isEditor");let Ki=go;var qf=Object.defineProperty,Hf=Object.getOwnPropertyDescriptor,hl=(t,e,r,i)=>{for(var s=i>1?void 0:i?Hf(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&qf(e,r,s),s};let ti=class extends cl{constructor(){super(...arguments),this.placement="top",this.contributions=[],this.tabGroup=Gr(),this.containerId=null,this.tabGroupListenersAttached=!1}doBeforeUI(){if(this.containerId=this.getAttribute("id"),!this.containerId)throw new Error("lyra-tabs requires an 'id' attribute to function");this.loadAndResolveContributions()}doInitUI(){this.updateComplete.then(()=>this.ensureTabGroupListenersAndActivate()),xe(ar,t=>{!this.containerId||t.target!==this.containerId||(this.loadAndResolveContributions(),this.requestUpdate(),this.updateComplete.then(()=>{this.activateNextAvailableTab()}))})}updated(t){super.updated(t),this.contributions.length>0&&this.tabGroup.value&&this.updateComplete.then(()=>this.ensureTabGroupListenersAndActivate()),t.has("contributions")&&(this.contributions.length===0&&(this.tabGroupListenersAttached=!1),this.contributions.forEach(e=>{const r=this.getTabPanel(e.name);if(!r)return;const i=this.getPartFromPanel(r);i&&(i.tabContribution=e)}))}has(t){return this.tabGroup.value?!!this.getTabPanel(t):!1}activate(t){this.tabGroup.value&&this.tabGroup.value.setAttribute("active",t)}getActiveEditor(){return this.tabGroup.value?this.tabGroup.value.getAttribute("active"):null}open(t){if(this.contributions.find(r=>r.name===t.name)){this.activate(t.name);const r=this.getTabPanel(t.name);r&&this.syncActiveSignalsFromPanel(r);return}this.contributions.push(t),this.requestUpdate(),this.updateComplete.then(()=>{requestAnimationFrame(()=>{this.activate(t.name);const r=this.getTabPanel(t.name);if(!r)return;const i=this.getPartFromPanel(r);i&&(i.tabContribution=t),this.syncActiveSignalsFromPanel(r)})})}handleTabAuxClick(t,e){t.button===sl.MIDDLE&&e.closable&&this.closeTab(t,e.name)}async closeTab(t,e){if(t.stopPropagation(),this.isDirty(e)&&!await ts("Unsaved changes will be lost: Do you really want to close?"))return;const r=this.getTabPanel(e);if(!r)return;const i=this.contributions.find(a=>a.name===e);if(!i)return;this.cleanupTabInstance(r),this.clearActiveSignalsIfPartInPanel(r);const s=this.contributions.indexOf(i);s>-1&&this.contributions.splice(s,1),this.requestUpdate(),this.updateComplete.then(()=>{this.activateNextAvailableTab()})}markDirty(t,e){const r=this.getTab(t);r&&r.classList.toggle("part-dirty",e)}isDirty(t){const e=this.getTab(t);return!!e&&e.classList.contains("part-dirty")}loadAndResolveContributions(){this.containerId&&(this.contributions=gt.getContributions(this.containerId),this.requestUpdate())}cleanupTabInstance(t){const e=this.getPartFromPanel(t);e&&"close"in e&&typeof e.close=="function"&&e.close()}ensureTabGroupListenersAndActivate(){if(!this.tabGroup.value||this.tabGroupListenersAttached){this.activateNextAvailableTab();return}this.tabGroupListenersAttached=!0;const t=this.tabGroup.value;t.addEventListener("wa-tab-show",e=>{const r=this.getTabPanel(e.detail.name);r&&this.syncActiveSignalsFromPanel(r)}),t.addEventListener("click",e=>{const r=e.target,i=r.closest("wa-tab");if(i){const a=i.getAttribute("panel");if(a){const o=this.getTabPanel(a);o&&this.syncActiveSignalsFromPanel(o)}return}const s=r.closest("wa-tab-panel");s&&this.syncActiveSignalsFromPanel(s)}),this.dirtySignalCleanup?.(),this.dirtySignalCleanup=ad(mn,e=>{if(!e)return;const r=e.closest("wa-tab-panel");if(!r)return;const i=r.getAttribute("name");i&&this.markDirty(i,e.isDirty())}),this.activateNextAvailableTab()}disconnectedCallback(){this.dirtySignalCleanup?.(),this.dirtySignalCleanup=void 0,super.disconnectedCallback()}activateNextAvailableTab(){if(!this.tabGroup.value)return;const t=this.tabGroup.value.querySelectorAll("wa-tab");if(t.length>0){const e=t.item(0).getAttribute("panel");e&&this.tabGroup.value.setAttribute("active",e)}else this.tabGroup.value.removeAttribute("active")}getTabPanel(t){return this.tabGroup.value?this.tabGroup.value.querySelector(`wa-tab-panel[name='${t}']`):null}getTab(t){return this.tabGroup.value?this.tabGroup.value.querySelector(`wa-tab[panel='${t}']`):null}syncActiveSignalsFromPanel(t){const e=this.getPartFromPanel(t);e instanceof Ki&&(Ke.set(null),Ke.set(e),this.containerId===Gs&&e.isEditor&&(Rs.set(null),Rs.set(e)))}clearActiveSignalsIfPartInPanel(t){const e=Array.from(t.querySelectorAll("*")).filter(r=>r instanceof Ki);for(const r of e)Ke.get()===r&&Ke.set(null),Rs.get()===r&&Rs.set(null)}getPartFromPanel(t){const e=t.firstElementChild;return e instanceof Ki?e:null}truncateTabLabel(t){if(!t||t.length<=ti.MAX_TAB_LABEL)return t;const e="…",r=ti.MAX_TAB_LABEL-e.length,i=Math.floor(r/2);return t.slice(0,i)+e+t.slice(-(r-i))}renderEmptyState(){const t=qr.getCurrentApp();return $`
            <div class="empty-state">
                ${se(t,()=>$`
                        <div class="empty-content">
                            <h2 class="empty-title">${t.name}</h2>
                            ${se(t.description,()=>$`<p class="empty-description">${t.description}</p>`)}
                        </div>
                    `,()=>$`<wa-icon name="folder-open" class="empty-icon"></wa-icon>`)}
            </div>
        `}render(){return this.contributions.length===0?this.renderEmptyState():$`
            <wa-tab-group ${Zr(this.tabGroup)} placement=${this.placement}>
                ${Ju(this.contributions,t=>t.name,t=>{const e=t.label??t.name,r=this.truncateTabLabel(e);return $`
                        <wa-tab panel="${t.name}"
                                title="${e}"
                                @auxclick="${i=>this.handleTabAuxClick(i,t)}">
                            ${ye(t.icon,{label:e})}
                            ${r}
                            ${se(t.closable,()=>$`
                                <wa-icon name="xmark" label="Close"  @click="${i=>this.closeTab(i,t.name)}"></wa-icon>
                            `)}
                        </wa-tab>
                        <wa-tab-panel name="${t.name}">
                            ${t.component?t.component(t.name):ht}
                        </wa-tab-panel>
                    `})}
            </wa-tab-group>
        `}};ti.MAX_TAB_LABEL=16;ti.styles=J`
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

        wa-tab-panel > * {
            width: 100%;
            height: 100%;
            min-height: 0;
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
    `;hl([p({reflect:!0})],ti.prototype,"placement",2);hl([Z()],ti.prototype,"contributions",2);ti=hl([X("lyra-tabs")],ti);var jf=Object.defineProperty,Kf=Object.getOwnPropertyDescriptor,oa=(t,e,r,i)=>{for(var s=i>1?void 0:i?Kf(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&jf(e,r,s),s};let $e=class extends Mr{constructor(){super(...arguments),this.orientation="horizontal",this.gridSizes=[],this.gridChildren=[],this.resizing=null,this.resizeOverlay=null,this.childrenLoaded=!1,this.childStylesApplied=!1,this.settingsLoaded=!1,this.handleResize=t=>{if(!this.resizing)return;const r=(this.orientation==="horizontal"?t.clientX:t.clientY)-this.resizing.startPos,i=[...this.resizing.startSizes];i[this.resizing.handleIndex]+=r,i[this.resizing.handleIndex+1]-=r;const s=this.orientation==="horizontal"?this.offsetWidth:this.offsetHeight,a=s*.05;if(i[this.resizing.handleIndex]>=a&&i[this.resizing.handleIndex+1]>=a){this.resizing.currentSizes=i;const o=i.map((n,l)=>{const h=`${(n/s*100).toFixed(2)}%`;return l===i.length-1?h:`${h} ${$e.HANDLE_VISUAL_SIZE_PX}px`}).join(" ");this.orientation==="horizontal"?this.style.gridTemplateColumns=o:this.style.gridTemplateRows=o}},this.stopResize=async()=>{if(this.resizing?.currentSizes){const t=this.orientation==="horizontal"?this.offsetWidth:this.offsetHeight;this.gridSizes=this.resizing.currentSizes.map(e=>`${(e/t*100).toFixed(2)}%`),await this.saveSizes(),this.requestUpdate()}this.resizeOverlay&&(document.body.removeChild(this.resizeOverlay),this.resizeOverlay=null),this.resizing=null,document.removeEventListener("mousemove",this.handleResize),document.removeEventListener("mouseup",this.stopResize),document.body.style.cursor="",document.body.style.userSelect=""}}createRenderRoot(){return this}doBeforeUI(){this.childrenLoaded||(this.mutationObserver=new MutationObserver(()=>{this.childrenLoaded||this.loadChildren()}),this.mutationObserver.observe(this,{childList:!0,subtree:!1}),this.loadChildren())}async loadChildren(){const t=Array.from(this.children).filter(e=>e.tagName!=="STYLE"&&e.tagName!=="SCRIPT"&&!e.classList.contains("resize-handle"));if(t.length!==0){if(this.childrenLoaded=!0,this.mutationObserver&&(this.mutationObserver.disconnect(),this.mutationObserver=void 0),this.gridChildren=t,!this.settingsLoaded){this.settingsLoaded=!0;const e=await this.getDialogSetting();if(e&&Array.isArray(e.sizes)&&e.sizes.length===this.gridChildren.length){this.gridSizes=e.sizes,this.requestUpdate();return}}if(this.sizes)this.gridSizes=this.sizes.split(",").map(e=>e.trim());else{const e=`${100/this.gridChildren.length}%`;this.gridSizes=this.gridChildren.map(()=>e)}this.requestUpdate()}}async saveSizes(){this.gridSizes.length!==0&&await this.setDialogSetting({sizes:this.gridSizes,orientation:this.orientation})}updated(t){super.updated(t),t.has("gridChildren")&&!this.childStylesApplied&&this.gridChildren.length>0&&(this.childStylesApplied=!0,this.gridChildren.forEach((e,r)=>{e.style.overflow="hidden",e.style.height="100%",e.style.width="100%",e.style.gridColumn=this.orientation==="horizontal"?`${r*2+1}`:"1",e.style.gridRow=this.orientation==="vertical"?`${r*2+1}`:"1",e.style.display="flex",e.style.flexDirection="column"}))}startResize(t,e){if(t.preventDefault(),e>=this.gridChildren.length-1)return;const r=this.orientation==="horizontal"?t.clientX:t.clientY,i=this.orientation==="horizontal"?this.offsetWidth:this.offsetHeight,s=this.gridSizes.map(a=>a.endsWith("%")?parseFloat(a)/100*i:(a.endsWith("px"),parseFloat(a)));this.resizing={handleIndex:e,startPos:r,startSizes:s},this.resizeOverlay=document.createElement("div"),this.resizeOverlay.style.position="fixed",this.resizeOverlay.style.top="0",this.resizeOverlay.style.left="0",this.resizeOverlay.style.width="100%",this.resizeOverlay.style.height="100%",this.resizeOverlay.style.zIndex="9999",this.resizeOverlay.style.cursor=this.orientation==="horizontal"?"col-resize":"row-resize",document.body.appendChild(this.resizeOverlay),document.addEventListener("mousemove",this.handleResize),document.addEventListener("mouseup",this.stopResize),document.body.style.cursor=this.orientation==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none"}render(){if(this.gridChildren.length===0||this.gridSizes.length===0)return ht;const t=this.gridSizes.flatMap((e,r)=>r===this.gridSizes.length-1?[e]:[e,`${$e.HANDLE_VISUAL_SIZE_PX}px`]).join(" ");return this.style.display="grid",this.orientation==="horizontal"?(this.style.gridTemplateColumns=t,this.style.gridTemplateRows="100%"):(this.style.gridTemplateColumns="100%",this.style.gridTemplateRows=t),this.style.overflow="hidden",$`
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
                    right: -${$e.HANDLE_HITBOX_PADDING_PX}px;
                    left: -${$e.HANDLE_HITBOX_PADDING_PX}px;
                }

                .resize-handle.vertical::before {
                    top: -${$e.HANDLE_HITBOX_PADDING_PX}px;
                    bottom: -${$e.HANDLE_HITBOX_PADDING_PX}px;
                }
                
                .resize-handle:hover {
                    background-color: var(--wa-color-brand-fill-normal);
                }
            </style>
            
            ${this.gridChildren.map((e,r)=>{if(r<this.gridChildren.length-1){const i=this.orientation==="horizontal"?`${r*2+2}`:"1",s=this.orientation==="vertical"?`${r*2+2}`:"1";return $`
                        <div 
                            class="resize-handle ${this.orientation==="horizontal"?"horizontal":"vertical"}"
                            style="
                                cursor: ${this.orientation==="horizontal"?"col-resize":"row-resize"};
                                grid-column: ${i};
                                grid-row: ${s};
                            "
                            @mousedown=${a=>this.startResize(a,r)}
                        ></div>
                    `}return ht})}
        `}disconnectedCallback(){super.disconnectedCallback(),this.resizing&&this.stopResize(),this.mutationObserver&&(this.mutationObserver.disconnect(),this.mutationObserver=void 0)}connectedCallback(){super.connectedCallback(),this.style.height="100%",this.style.width="100%"}};$e.HANDLE_VISUAL_SIZE_PX=1;$e.HANDLE_HITBOX_PADDING_PX=4;oa([p()],$e.prototype,"orientation",2);oa([p()],$e.prototype,"sizes",2);oa([Z()],$e.prototype,"gridSizes",2);oa([Z()],$e.prototype,"gridChildren",2);$e=oa([X("lyra-resizable-grid")],$e);var Gi=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}};var ul=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}};function tt(t,e){const r={waitUntilFirstUpdate:!1,...e};return(i,s)=>{const{update:a}=i,o=Array.isArray(t)?t:[t];i.update=function(n){o.forEach(l=>{const d=l;if(n.has(d)){const h=n.get(d),f=this[d];h!==f&&(!r.waitUntilFirstUpdate||this.hasUpdated)&&this[s](h,f)}}),a.call(this,n)}}}const kn=new Set,ji=new Map;let bi,pl="ltr",fl="en";const Nd=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(Nd){const t=new MutationObserver(Bd);pl=document.documentElement.dir||"ltr",fl=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function Fd(...t){t.map(e=>{const r=e.$code.toLowerCase();ji.has(r)?ji.set(r,Object.assign(Object.assign({},ji.get(r)),e)):ji.set(r,e),bi||(bi=e)}),Bd()}function Bd(){Nd&&(pl=document.documentElement.dir||"ltr",fl=document.documentElement.lang||navigator.language),[...kn.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}let Gf=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){kn.add(this.host)}hostDisconnected(){kn.delete(this.host)}dir(){return`${this.host.dir||pl}`.toLowerCase()}lang(){return`${this.host.lang||fl}`.toLowerCase()}getTranslationData(e){var r,i;const s=new Intl.Locale(e.replace(/_/g,"-")),a=s?.language.toLowerCase(),o=(i=(r=s?.region)===null||r===void 0?void 0:r.toLowerCase())!==null&&i!==void 0?i:"",n=ji.get(`${a}-${o}`),l=ji.get(a);return{locale:s,language:a,region:o,primary:n,secondary:l}}exists(e,r){var i;const{primary:s,secondary:a}=this.getTranslationData((i=r.lang)!==null&&i!==void 0?i:this.lang());return r=Object.assign({includeFallback:!1},r),!!(s&&s[e]||a&&a[e]||r.includeFallback&&bi&&bi[e])}term(e,...r){const{primary:i,secondary:s}=this.getTranslationData(this.lang());let a;if(i&&i[e])a=i[e];else if(s&&s[e])a=s[e];else if(bi&&bi[e])a=bi[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof a=="function"?a(...r):a}date(e,r){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),r).format(e)}number(e,r){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),r).format(e)}relativeTime(e,r,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(e,r)}};var Md={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};Fd(Md);var Zf=Md;var Et=class extends Gf{};Fd(Zf);var Xf=J`
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
`;var Yf=Object.defineProperty,Qf=Object.getOwnPropertyDescriptor,Ud=t=>{throw TypeError(t)},c=(t,e,r,i)=>{for(var s=i>1?void 0:i?Qf(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Yf(e,r,s),s},Vd=(t,e,r)=>e.has(t)||Ud("Cannot "+r),Jf=(t,e,r)=>(Vd(t,e,"read from private field"),e.get(t)),tm=(t,e,r)=>e.has(t)?Ud("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,r),em=(t,e,r,i)=>(Vd(t,e,"write to private field"),e.set(t,r),r);var rm=J`
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
`,La,lt=class extends yi{constructor(){super(),tm(this,La,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,r)=>{if(this.internals?.states)try{r?this.internals.states.add(e):this.internals.states.delete(e)}catch(i){if(String(i).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw i}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let t=this.constructor;for(let[e,r]of t.elementProperties)r.default==="inherit"&&r.initial!==void 0&&typeof e=="string"&&this.customStates.set(`initial-${e}-${r.initial}`,!0)}static get styles(){const t=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[rm,...t]}attributeChangedCallback(t,e,r){Jf(this,La)||(this.constructor.elementProperties.forEach((i,s)=>{i.reflect&&this[s]!=null&&this.initialReflectedProperties.set(s,this[s])}),em(this,La,!0)),super.attributeChangedCallback(t,e,r)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,r)=>{t.has(r)&&this[r]==null&&(this[r]=e)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(e){if(this.didSSR&&!this.hasUpdated){const r=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});r.error=e,this.dispatchEvent(r)}throw e}}relayNativeEvent(t,e){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...e}))}};La=new WeakMap;c([p()],lt.prototype,"dir",2);c([p()],lt.prototype,"lang",2);c([p({type:Boolean,reflect:!0,attribute:"did-ssr"})],lt.prototype,"didSSR",2);var or=class extends lt{constructor(){super(...arguments),this.localize=new Et(this),this.isLoaded=!1}handleClick(){this.play=!this.play}handleKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.play=!this.play)}handleLoad(){const t=document.createElement("canvas"),{width:e,height:r}=this.animatedImage;t.width=e,t.height=r,t.getContext("2d").drawImage(this.animatedImage,0,0,e,r),this.frozenFrame=t.toDataURL("image/gif"),this.isLoaded||(this.dispatchEvent(new ul),this.isLoaded=!0)}handleError(){this.dispatchEvent(new Gi)}handlePlayChange(){this.play&&(this.animatedImage.src="",this.animatedImage.src=this.src)}handleSrcChange(){this.isLoaded=!1}render(){const e=`${this.localize.term(this.play?"pauseAnimation":"playAnimation")} ${this.alt}`;return $`
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

        ${this.isLoaded?$`
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
                    style=${Vt({"margin-inline-start":"3px"})}
                  ></wa-icon>
                </slot>
                <slot name="pause-icon">
                  <wa-icon name="pause" library="system" variant="solid" class="default"></wa-icon>
                </slot>
              </div>
            `:""}
      </div>
    `}};or.css=Xf;c([Q(".animated")],or.prototype,"animatedImage",2);c([Z()],or.prototype,"frozenFrame",2);c([Z()],or.prototype,"isLoaded",2);c([p()],or.prototype,"src",2);c([p()],or.prototype,"alt",2);c([p({type:Boolean,reflect:!0})],or.prototype,"play",2);c([tt("play",{waitUntilFirstUpdate:!0})],or.prototype,"handlePlayChange",1);c([tt("src")],or.prototype,"handleSrcChange",1);or=c([X("wa-animated-image")],or);var im=J`
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
`;var Cn="",Sn="";function uc(t){Cn=t}function sm(t=""){if(!Cn){const e=document.querySelector("[data-webawesome]");if(e?.hasAttribute("data-webawesome")){const r=new URL(e.getAttribute("data-webawesome")??"",window.location.href).pathname;uc(r)}else{const i=[...document.getElementsByTagName("script")].find(s=>s.src.endsWith("webawesome.js")||s.src.endsWith("webawesome.loader.js")||s.src.endsWith("webawesome.ssr-loader.js"));if(i){const s=String(i.getAttribute("src"));uc(s.split("/").slice(0,-1).join("/"))}}}return Cn.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}function am(t){Sn=t}function om(){if(!Sn){const t=document.querySelector("[data-fa-kit-code]");t&&am(t.getAttribute("data-fa-kit-code")||"")}return Sn}var pc="7.2.0";function nm(t,e,r){const i=om(),s=i.length>0;let a="solid";return e==="chisel"&&(a="chisel-regular"),e==="etch"&&(a="etch-solid"),e==="graphite"&&(a="graphite-thin"),e==="jelly"&&(a="jelly-regular",r==="duo-regular"&&(a="jelly-duo-regular"),r==="fill-regular"&&(a="jelly-fill-regular")),e==="jelly-duo"&&(a="jelly-duo-regular"),e==="jelly-fill"&&(a="jelly-fill-regular"),e==="notdog"&&(r==="solid"&&(a="notdog-solid"),r==="duo-solid"&&(a="notdog-duo-solid")),e==="notdog-duo"&&(a="notdog-duo-solid"),e==="slab"&&((r==="solid"||r==="regular")&&(a="slab-regular"),r==="press-regular"&&(a="slab-press-regular")),e==="slab-press"&&(a="slab-press-regular"),e==="thumbprint"&&(a="thumbprint-light"),e==="utility"&&(a="utility-semibold"),e==="utility-duo"&&(a="utility-duo-semibold"),e==="utility-fill"&&(a="utility-fill-semibold"),e==="whiteboard"&&(a="whiteboard-semibold"),e==="classic"&&(r==="thin"&&(a="thin"),r==="light"&&(a="light"),r==="regular"&&(a="regular"),r==="solid"&&(a="solid")),e==="duotone"&&(r==="thin"&&(a="duotone-thin"),r==="light"&&(a="duotone-light"),r==="regular"&&(a="duotone-regular"),r==="solid"&&(a="duotone")),e==="sharp"&&(r==="thin"&&(a="sharp-thin"),r==="light"&&(a="sharp-light"),r==="regular"&&(a="sharp-regular"),r==="solid"&&(a="sharp-solid")),e==="sharp-duotone"&&(r==="thin"&&(a="sharp-duotone-thin"),r==="light"&&(a="sharp-duotone-light"),r==="regular"&&(a="sharp-duotone-regular"),r==="solid"&&(a="sharp-duotone-solid")),e==="brands"&&(a="brands"),s?`https://ka-p.fontawesome.com/releases/v${pc}/svgs/${a}/${t}.svg?token=${encodeURIComponent(i)}`:`https://ka-f.fontawesome.com/releases/v${pc}/svgs/${a}/${t}.svg`}var lm={name:"default",resolver:(t,e="classic",r="solid")=>nm(t,e,r),mutator:(t,e)=>{if(e?.family&&!t.hasAttribute("data-duotone-initialized")){const{family:r,variant:i}=e;if(r==="duotone"||r==="sharp-duotone"||r==="notdog-duo"||r==="notdog"&&i==="duo-solid"||r==="jelly-duo"||r==="jelly"&&i==="duo-regular"||r==="utility-duo"||r==="thumbprint"){const s=[...t.querySelectorAll("path")],a=s.find(n=>!n.hasAttribute("opacity")),o=s.find(n=>n.hasAttribute("opacity"));if(!a||!o)return;if(a.setAttribute("data-duotone-primary",""),o.setAttribute("data-duotone-secondary",""),e.swapOpacity&&a&&o){const n=o.getAttribute("opacity")||"0.4";a.style.setProperty("--path-opacity",n),o.style.setProperty("--path-opacity","1")}t.setAttribute("data-duotone-initialized","")}}}},cm=lm;function dm(t){return`data:image/svg+xml,${encodeURIComponent(t)}`}var Go={solid:{check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',file:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/></svg>',"file-audio":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/></svg>',"file-code":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z"/></svg>',"file-excel":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/></svg>',"file-image":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/></svg>',"file-pdf":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>',"file-powerpoint":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/></svg>',"file-video":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>',"file-word":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"/></svg>',"file-zipper":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',plus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',upload:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},hm={name:"system",resolver:(t,e="classic",r="solid")=>{let s=Go[r][t]??Go.regular[t]??Go.regular["circle-question"];return s?dm(s):""}},um=hm;var pm="classic",Ha=[cm,um],ja=[];function fm(t){ja.push(t)}function mm(t){ja=ja.filter(e=>e!==t)}function Zo(t){return Ha.find(e=>e.name===t)}function gm(t,e){bm(t),Ha.push({name:t,resolver:e.resolver,mutator:e.mutator,spriteSheet:e.spriteSheet}),ja.forEach(r=>{r.library===t&&r.setIcon()})}function bm(t){Ha=Ha.filter(e=>e.name!==t)}function wm(){return pm}var Ls=Symbol(),ga=Symbol(),Xo,Yo=new Map,le=class extends lt{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.rotate=0,this.resolveIcon=async(t,e)=>{let r;if(e?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=$`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;const i=this.shadowRoot.querySelector("[part='svg']");return typeof e.mutator=="function"&&e.mutator(i,this),this.svg}try{if(r=await fetch(t,{mode:"cors"}),!r.ok)return r.status===410?Ls:ga}catch{return ga}try{const i=document.createElement("div");i.innerHTML=await r.text();const s=i.firstElementChild;if(s?.tagName?.toLowerCase()!=="svg")return Ls;Xo||(Xo=new DOMParser);const o=Xo.parseFromString(s.outerHTML,"text/html").body.querySelector("svg");return o?(o.part.add("svg"),document.adoptNode(o)):Ls}catch{return Ls}}}connectedCallback(){super.connectedCallback(),fm(this)}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),mm(this)}getIconSource(){const t=Zo(this.library),e=this.family||wm();return this.name&&t?{url:t.resolver(this.name,e,this.variant,this.autoWidth),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){const{url:t,fromLibrary:e}=this.getIconSource(),r=e?Zo(this.library):void 0;if(!t){this.svg=null;return}let i=Yo.get(t);i||(i=this.resolveIcon(t,r),Yo.set(t,i));const s=await i;if(s===ga&&Yo.delete(t),t===this.getIconSource().url){if(Eu(s)){this.svg=s;return}switch(s){case ga:case Ls:this.svg=null,this.dispatchEvent(new Gi);break;default:this.svg=s.cloneNode(!0),r?.mutator?.(this.svg,this),this.dispatchEvent(new ul)}}}updated(t){super.updated(t);const e=Zo(this.library);this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`);const r=this.shadowRoot?.querySelector("svg");r&&e?.mutator?.(r,this)}render(){return this.hasUpdated?this.svg:$`<svg part="svg" width="16" height="16"></svg>`}};le.css=im;c([Z()],le.prototype,"svg",2);c([p({reflect:!0})],le.prototype,"name",2);c([p({reflect:!0})],le.prototype,"family",2);c([p({reflect:!0})],le.prototype,"variant",2);c([p({attribute:"auto-width",type:Boolean,reflect:!0})],le.prototype,"autoWidth",2);c([p({attribute:"swap-opacity",type:Boolean,reflect:!0})],le.prototype,"swapOpacity",2);c([p()],le.prototype,"src",2);c([p()],le.prototype,"label",2);c([p({reflect:!0})],le.prototype,"library",2);c([p({type:Number,reflect:!0})],le.prototype,"rotate",2);c([p({type:String,reflect:!0})],le.prototype,"flip",2);c([p({type:String,reflect:!0})],le.prototype,"animation",2);c([tt("label")],le.prototype,"handleLabelChange",1);c([tt(["family","name","library","variant","src","autoWidth","swapOpacity"],{waitUntilFirstUpdate:!0})],le.prototype,"setIcon",1);le=c([X("wa-icon")],le);var fc=class extends Event{constructor(){super("wa-start",{bubbles:!0,cancelable:!1,composed:!0})}};var vm=class extends Event{constructor(){super("wa-finish",{bubbles:!0,cancelable:!1,composed:!0})}};var ym=class extends Event{constructor(){super("wa-cancel",{bubbles:!0,cancelable:!1,composed:!0})}};var xm=J`
  :host {
    display: contents;
  }
`;const km=[{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.2,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.4,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -30px, 0) scaleY(1.1)"},{offset:.43,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -30px, 0) scaleY(1.1)"},{offset:.53,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.7,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -15px, 0) scaleY(1.05)"},{offset:.8,"transition-timing-function":"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0) scaleY(0.95)"},{offset:.9,transform:"translate3d(0, -4px, 0) scaleY(1.02)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"}],Cm=[{offset:0,opacity:"1"},{offset:.25,opacity:"0"},{offset:.5,opacity:"1"},{offset:.75,opacity:"0"},{offset:1,opacity:"1"}],Sm=[{offset:0,transform:"translateX(0)"},{offset:.065,transform:"translateX(-6px) rotateY(-9deg)"},{offset:.185,transform:"translateX(5px) rotateY(7deg)"},{offset:.315,transform:"translateX(-3px) rotateY(-5deg)"},{offset:.435,transform:"translateX(2px) rotateY(3deg)"},{offset:.5,transform:"translateX(0)"}],$m=[{offset:0,transform:"scale(1)"},{offset:.14,transform:"scale(1.3)"},{offset:.28,transform:"scale(1)"},{offset:.42,transform:"scale(1.3)"},{offset:.7,transform:"scale(1)"}],_m=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.111,transform:"translate3d(0, 0, 0)"},{offset:.222,transform:"skewX(-12.5deg) skewY(-12.5deg)"},{offset:.33299999999999996,transform:"skewX(6.25deg) skewY(6.25deg)"},{offset:.444,transform:"skewX(-3.125deg) skewY(-3.125deg)"},{offset:.555,transform:"skewX(1.5625deg) skewY(1.5625deg)"},{offset:.6659999999999999,transform:"skewX(-0.78125deg) skewY(-0.78125deg)"},{offset:.777,transform:"skewX(0.390625deg) skewY(0.390625deg)"},{offset:.888,transform:"skewX(-0.1953125deg) skewY(-0.1953125deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],Em=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.5,transform:"scale3d(1.05, 1.05, 1.05)"},{offset:1,transform:"scale3d(1, 1, 1)"}],Am=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.3,transform:"scale3d(1.25, 0.75, 1)"},{offset:.4,transform:"scale3d(0.75, 1.25, 1)"},{offset:.5,transform:"scale3d(1.15, 0.85, 1)"},{offset:.65,transform:"scale3d(0.95, 1.05, 1)"},{offset:.75,transform:"scale3d(1.05, 0.95, 1)"},{offset:1,transform:"scale3d(1, 1, 1)"}],Lm=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(-10px, 0, 0)"},{offset:.2,transform:"translate3d(10px, 0, 0)"},{offset:.3,transform:"translate3d(-10px, 0, 0)"},{offset:.4,transform:"translate3d(10px, 0, 0)"},{offset:.5,transform:"translate3d(-10px, 0, 0)"},{offset:.6,transform:"translate3d(10px, 0, 0)"},{offset:.7,transform:"translate3d(-10px, 0, 0)"},{offset:.8,transform:"translate3d(10px, 0, 0)"},{offset:.9,transform:"translate3d(-10px, 0, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],zm=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(-10px, 0, 0)"},{offset:.2,transform:"translate3d(10px, 0, 0)"},{offset:.3,transform:"translate3d(-10px, 0, 0)"},{offset:.4,transform:"translate3d(10px, 0, 0)"},{offset:.5,transform:"translate3d(-10px, 0, 0)"},{offset:.6,transform:"translate3d(10px, 0, 0)"},{offset:.7,transform:"translate3d(-10px, 0, 0)"},{offset:.8,transform:"translate3d(10px, 0, 0)"},{offset:.9,transform:"translate3d(-10px, 0, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],Tm=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(0, -10px, 0)"},{offset:.2,transform:"translate3d(0, 10px, 0)"},{offset:.3,transform:"translate3d(0, -10px, 0)"},{offset:.4,transform:"translate3d(0, 10px, 0)"},{offset:.5,transform:"translate3d(0, -10px, 0)"},{offset:.6,transform:"translate3d(0, 10px, 0)"},{offset:.7,transform:"translate3d(0, -10px, 0)"},{offset:.8,transform:"translate3d(0, 10px, 0)"},{offset:.9,transform:"translate3d(0, -10px, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],Rm=[{offset:.2,transform:"rotate3d(0, 0, 1, 15deg)"},{offset:.4,transform:"rotate3d(0, 0, 1, -10deg)"},{offset:.6,transform:"rotate3d(0, 0, 1, 5deg)"},{offset:.8,transform:"rotate3d(0, 0, 1, -5deg)"},{offset:1,transform:"rotate3d(0, 0, 1, 0deg)"}],Dm=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.1,transform:"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)"},{offset:.2,transform:"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)"},{offset:.3,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.4,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.5,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.6,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.7,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.8,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.9,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:1,transform:"scale3d(1, 1, 1)"}],Im=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.15,transform:"translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)"},{offset:.3,transform:"translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)"},{offset:.45,transform:"translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)"},{offset:.6,transform:"translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)"},{offset:.75,transform:"translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],Om=[{offset:0,transform:"translateY(-1200px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],Pm=[{offset:0,transform:"translateX(-2000px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],Nm=[{offset:0,transform:"translateX(2000px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],Fm=[{offset:0,transform:"translateY(1200px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],Bm=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateY(700px) scale(0.7)",opacity:"0.7"}],Mm=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateX(-2000px) scale(0.7)",opacity:"0.7"}],Um=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateX(2000px) scale(0.7)",opacity:"0.7"}],Vm=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateY(-700px) scale(0.7)",opacity:"0.7"}],Wm=[{offset:0,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.2,transform:"scale3d(1.1, 1.1, 1.1)"},{offset:.2,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.4,transform:"scale3d(0.9, 0.9, 0.9)"},{offset:.4,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"scale3d(1.03, 1.03, 1.03)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.8,transform:"scale3d(0.97, 0.97, 0.97)"},{offset:.8,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,opacity:"1",transform:"scale3d(1, 1, 1)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],qm=[{offset:0,opacity:"0",transform:"translate3d(0, -3000px, 0) scaleY(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(0, 25px, 0) scaleY(0.9)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(0, -10px, 0) scaleY(0.95)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(0, 5px, 0) scaleY(0.985)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],Hm=[{offset:0,opacity:"0",transform:"translate3d(-3000px, 0, 0) scaleX(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(25px, 0, 0) scaleX(1)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(-10px, 0, 0) scaleX(0.98)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(5px, 0, 0) scaleX(0.995)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],jm=[{offset:0,opacity:"0",transform:"translate3d(3000px, 0, 0) scaleX(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(-25px, 0, 0) scaleX(1)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(10px, 0, 0) scaleX(0.98)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(-5px, 0, 0) scaleX(0.995)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],Km=[{offset:0,opacity:"0",transform:"translate3d(0, 3000px, 0) scaleY(5)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(0, 10px, 0) scaleY(0.95)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(0, -5px, 0) scaleY(0.985)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],Gm=[{offset:.2,transform:"scale3d(0.9, 0.9, 0.9)"},{offset:.5,opacity:"1",transform:"scale3d(1.1, 1.1, 1.1)"},{offset:.55,opacity:"1",transform:"scale3d(1.1, 1.1, 1.1)"},{offset:1,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"}],Zm=[{offset:.2,transform:"translate3d(0, 10px, 0) scaleY(0.985)"},{offset:.4,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:.45,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:1,opacity:"0",transform:"translate3d(0, 2000px, 0) scaleY(3)"}],Xm=[{offset:.2,opacity:"1",transform:"translate3d(20px, 0, 0) scaleX(0.9)"},{offset:1,opacity:"0",transform:"translate3d(-2000px, 0, 0) scaleX(2)"}],Ym=[{offset:.2,opacity:"1",transform:"translate3d(-20px, 0, 0) scaleX(0.9)"},{offset:1,opacity:"0",transform:"translate3d(2000px, 0, 0) scaleX(2)"}],Qm=[{offset:.2,transform:"translate3d(0, -10px, 0) scaleY(0.985)"},{offset:.4,opacity:"1",transform:"translate3d(0, 20px, 0) scaleY(0.9)"},{offset:.45,opacity:"1",transform:"translate3d(0, 20px, 0) scaleY(0.9)"},{offset:1,opacity:"0",transform:"translate3d(0, -2000px, 0) scaleY(3)"}],Jm=[{offset:0,opacity:"0"},{offset:1,opacity:"1"}],tg=[{offset:0,opacity:"0",transform:"translate3d(-100%, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],eg=[{offset:0,opacity:"0",transform:"translate3d(100%, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],rg=[{offset:0,opacity:"0",transform:"translate3d(0, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],ig=[{offset:0,opacity:"0",transform:"translate3d(0, -2000px, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],sg=[{offset:0,opacity:"0",transform:"translate3d(-100%, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],ag=[{offset:0,opacity:"0",transform:"translate3d(-2000px, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],og=[{offset:0,opacity:"0",transform:"translate3d(100%, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],ng=[{offset:0,opacity:"0",transform:"translate3d(2000px, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],lg=[{offset:0,opacity:"0",transform:"translate3d(-100%, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],cg=[{offset:0,opacity:"0",transform:"translate3d(100%, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],dg=[{offset:0,opacity:"0",transform:"translate3d(0, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],hg=[{offset:0,opacity:"0",transform:"translate3d(0, 2000px, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],ug=[{offset:0,opacity:"1"},{offset:1,opacity:"0"}],pg=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(-100%, 100%, 0)"}],fg=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(100%, 100%, 0)"}],mg=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, 100%, 0)"}],gg=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, 2000px, 0)"}],bg=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(-100%, 0, 0)"}],wg=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(-2000px, 0, 0)"}],vg=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(100%, 0, 0)"}],yg=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(2000px, 0, 0)"}],xg=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(-100%, -100%, 0)"}],kg=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(100%, -100%, 0)"}],Cg=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, -100%, 0)"}],Sg=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, -2000px, 0)"}],$g=[{offset:0,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)",easing:"ease-out"},{offset:.4,transform:`perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -190deg)`,easing:"ease-out"},{offset:.5,transform:`perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -170deg)`,easing:"ease-in"},{offset:.8,transform:`perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)
      rotate3d(0, 1, 0, 0deg)`,easing:"ease-in"},{offset:1,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)",easing:"ease-in"}],_g=[{offset:0,transform:"perspective(400px) rotate3d(1, 0, 0, 90deg)",easing:"ease-in",opacity:"0"},{offset:.4,transform:"perspective(400px) rotate3d(1, 0, 0, -20deg)",easing:"ease-in"},{offset:.6,transform:"perspective(400px) rotate3d(1, 0, 0, 10deg)",opacity:"1"},{offset:.8,transform:"perspective(400px) rotate3d(1, 0, 0, -5deg)"},{offset:1,transform:"perspective(400px)"}],Eg=[{offset:0,transform:"perspective(400px) rotate3d(0, 1, 0, 90deg)",easing:"ease-in",opacity:"0"},{offset:.4,transform:"perspective(400px) rotate3d(0, 1, 0, -20deg)",easing:"ease-in"},{offset:.6,transform:"perspective(400px) rotate3d(0, 1, 0, 10deg)",opacity:"1"},{offset:.8,transform:"perspective(400px) rotate3d(0, 1, 0, -5deg)"},{offset:1,transform:"perspective(400px)"}],Ag=[{offset:0,transform:"perspective(400px)"},{offset:.3,transform:"perspective(400px) rotate3d(1, 0, 0, -20deg)",opacity:"1"},{offset:1,transform:"perspective(400px) rotate3d(1, 0, 0, 90deg)",opacity:"0"}],Lg=[{offset:0,transform:"perspective(400px)"},{offset:.3,transform:"perspective(400px) rotate3d(0, 1, 0, -15deg)",opacity:"1"},{offset:1,transform:"perspective(400px) rotate3d(0, 1, 0, 90deg)",opacity:"0"}],zg=[{offset:0,transform:"translate3d(-100%, 0, 0) skewX(30deg)",opacity:"0"},{offset:.6,transform:"skewX(-20deg)",opacity:"1"},{offset:.8,transform:"skewX(5deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],Tg=[{offset:0,transform:"translate3d(100%, 0, 0) skewX(-30deg)",opacity:"0"},{offset:.6,transform:"skewX(20deg)",opacity:"1"},{offset:.8,transform:"skewX(-5deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],Rg=[{offset:0,opacity:"1"},{offset:1,transform:"translate3d(-100%, 0, 0) skewX(-30deg)",opacity:"0"}],Dg=[{offset:0,opacity:"1"},{offset:1,transform:"translate3d(100%, 0, 0) skewX(30deg)",opacity:"0"}],Ig=[{offset:0,transform:"rotate3d(0, 0, 1, -200deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],Og=[{offset:0,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],Pg=[{offset:0,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],Ng=[{offset:0,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],Fg=[{offset:0,transform:"rotate3d(0, 0, 1, -90deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],Bg=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 200deg)",opacity:"0"}],Mg=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"}],Ug=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"}],Vg=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"}],Wg=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 90deg)",opacity:"0"}],qg=[{offset:0,transform:"translate3d(0, -100%, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],Hg=[{offset:0,transform:"translate3d(-100%, 0, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],jg=[{offset:0,transform:"translate3d(100%, 0, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],Kg=[{offset:0,transform:"translate3d(0, 100%, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],Gg=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(0, 100%, 0)"}],Zg=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(-100%, 0, 0)"}],Xg=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(100%, 0, 0)"}],Yg=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(0, -100%, 0)"}],Qg=[{offset:0,easing:"ease-in-out"},{offset:.2,transform:"rotate3d(0, 0, 1, 80deg)",easing:"ease-in-out"},{offset:.4,transform:"rotate3d(0, 0, 1, 60deg)",easing:"ease-in-out",opacity:"1"},{offset:.6,transform:"rotate3d(0, 0, 1, 80deg)",easing:"ease-in-out"},{offset:.8,transform:"rotate3d(0, 0, 1, 60deg)",easing:"ease-in-out",opacity:"1"},{offset:1,transform:"translate3d(0, 700px, 0)",opacity:"0"}],Jg=[{offset:0,opacity:"0",transform:"scale(0.1) rotate(30deg)","transform-origin":"center bottom"},{offset:.5,transform:"rotate(-10deg)"},{offset:.7,transform:"rotate(3deg)"},{offset:1,opacity:"1",transform:"scale(1)"}],t0=[{offset:0,opacity:"0",transform:"translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],e0=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)"}],r0=[{offset:0,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:.5,opacity:"1"}],i0=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],s0=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],a0=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],o0=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],n0=[{offset:0,opacity:"1"},{offset:.5,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:1,opacity:"0"}],l0=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:1,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],c0=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0)"},{offset:1,opacity:"0",transform:"scale(0.1) translate3d(-2000px, 0, 0)"}],d0=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0)"},{offset:1,opacity:"0",transform:"scale(0.1) translate3d(2000px, 0, 0)"}],h0=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:1,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Wd={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",easeInSine:"cubic-bezier(0.47, 0, 0.745, 0.715)",easeOutSine:"cubic-bezier(0.39, 0.575, 0.565, 1)",easeInOutSine:"cubic-bezier(0.445, 0.05, 0.55, 0.95)",easeInQuad:"cubic-bezier(0.55, 0.085, 0.68, 0.53)",easeOutQuad:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",easeInOutQuad:"cubic-bezier(0.455, 0.03, 0.515, 0.955)",easeInCubic:"cubic-bezier(0.55, 0.055, 0.675, 0.19)",easeOutCubic:"cubic-bezier(0.215, 0.61, 0.355, 1)",easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1)",easeInQuart:"cubic-bezier(0.895, 0.03, 0.685, 0.22)",easeOutQuart:"cubic-bezier(0.165, 0.84, 0.44, 1)",easeInOutQuart:"cubic-bezier(0.77, 0, 0.175, 1)",easeInQuint:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",easeOutQuint:"cubic-bezier(0.23, 1, 0.32, 1)",easeInOutQuint:"cubic-bezier(0.86, 0, 0.07, 1)",easeInExpo:"cubic-bezier(0.95, 0.05, 0.795, 0.035)",easeOutExpo:"cubic-bezier(0.19, 1, 0.22, 1)",easeInOutExpo:"cubic-bezier(1, 0, 0, 1)",easeInCirc:"cubic-bezier(0.6, 0.04, 0.98, 0.335)",easeOutCirc:"cubic-bezier(0.075, 0.82, 0.165, 1)",easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.15, 0.86)",easeInBack:"cubic-bezier(0.6, -0.28, 0.735, 0.045)",easeOutBack:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",easeInOutBack:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"},u0=Object.freeze(Object.defineProperty({__proto__:null,backInDown:Om,backInLeft:Pm,backInRight:Nm,backInUp:Fm,backOutDown:Bm,backOutLeft:Mm,backOutRight:Um,backOutUp:Vm,bounce:km,bounceIn:Wm,bounceInDown:qm,bounceInLeft:Hm,bounceInRight:jm,bounceInUp:Km,bounceOut:Gm,bounceOutDown:Zm,bounceOutLeft:Xm,bounceOutRight:Ym,bounceOutUp:Qm,easings:Wd,fadeIn:Jm,fadeInBottomLeft:tg,fadeInBottomRight:eg,fadeInDown:rg,fadeInDownBig:ig,fadeInLeft:sg,fadeInLeftBig:ag,fadeInRight:og,fadeInRightBig:ng,fadeInTopLeft:lg,fadeInTopRight:cg,fadeInUp:dg,fadeInUpBig:hg,fadeOut:ug,fadeOutBottomLeft:pg,fadeOutBottomRight:fg,fadeOutDown:mg,fadeOutDownBig:gg,fadeOutLeft:bg,fadeOutLeftBig:wg,fadeOutRight:vg,fadeOutRightBig:yg,fadeOutTopLeft:xg,fadeOutTopRight:kg,fadeOutUp:Cg,fadeOutUpBig:Sg,flash:Cm,flip:$g,flipInX:_g,flipInY:Eg,flipOutX:Ag,flipOutY:Lg,headShake:Sm,heartBeat:$m,hinge:Qg,jackInTheBox:Jg,jello:_m,lightSpeedInLeft:zg,lightSpeedInRight:Tg,lightSpeedOutLeft:Rg,lightSpeedOutRight:Dg,pulse:Em,rollIn:t0,rollOut:e0,rotateIn:Ig,rotateInDownLeft:Og,rotateInDownRight:Pg,rotateInUpLeft:Ng,rotateInUpRight:Fg,rotateOut:Bg,rotateOutDownLeft:Mg,rotateOutDownRight:Ug,rotateOutUpLeft:Vg,rotateOutUpRight:Wg,rubberBand:Am,shake:Lm,shakeX:zm,shakeY:Tm,slideInDown:qg,slideInLeft:Hg,slideInRight:jg,slideInUp:Kg,slideOutDown:Gg,slideOutLeft:Zg,slideOutRight:Xg,slideOutUp:Yg,swing:Rm,tada:Dm,wobble:Im,zoomIn:r0,zoomInDown:i0,zoomInLeft:s0,zoomInRight:a0,zoomInUp:o0,zoomOut:n0,zoomOutDown:l0,zoomOutLeft:c0,zoomOutRight:d0,zoomOutUp:h0},Symbol.toStringTag,{value:"Module"}));var Yt=class extends lt{constructor(){super(...arguments),this.hasStarted=!1,this.name="none",this.play=!1,this.delay=0,this.direction="normal",this.duration=1e3,this.easing="linear",this.endDelay=0,this.fill="auto",this.iterations=1/0,this.iterationStart=0,this.playbackRate=1,this.handleAnimationFinish=()=>{this.play=!1,this.hasStarted=!1,this.dispatchEvent(new vm)},this.handleAnimationCancel=()=>{this.play=!1,this.hasStarted=!1,this.dispatchEvent(new ym)}}get currentTime(){return this.animation?.currentTime??0}set currentTime(t){this.animation&&(this.animation.currentTime=t)}connectedCallback(){super.connectedCallback(),this.createAnimation()}disconnectedCallback(){super.disconnectedCallback(),this.destroyAnimation()}handleSlotChange(){this.destroyAnimation(),this.createAnimation()}async createAnimation(){const t=Wd[this.easing]??this.easing,e=this.keyframes??u0[this.name],i=(await this.defaultSlot).assignedElements()[0];return!i||!e?!1:(this.destroyAnimation(),this.animation=i.animate(e,{delay:this.delay,direction:this.direction,duration:this.duration,easing:t,endDelay:this.endDelay,fill:this.fill,iterationStart:this.iterationStart,iterations:this.iterations}),this.animation.playbackRate=this.playbackRate,this.animation.addEventListener("cancel",this.handleAnimationCancel),this.animation.addEventListener("finish",this.handleAnimationFinish),this.play?(this.hasStarted=!0,this.dispatchEvent(new fc)):this.animation.pause(),!0)}destroyAnimation(){this.animation&&(this.animation.cancel(),this.animation.removeEventListener("cancel",this.handleAnimationCancel),this.animation.removeEventListener("finish",this.handleAnimationFinish),this.hasStarted=!1)}handleAnimationChange(){this.hasUpdated&&this.createAnimation()}handlePlayChange(){return this.animation?(this.play&&!this.hasStarted&&(this.hasStarted=!0,this.dispatchEvent(new fc)),this.play?this.animation.play():this.animation.pause(),!0):!1}handlePlaybackRateChange(){this.animation&&(this.animation.playbackRate=this.playbackRate)}cancel(){this.animation?.cancel()}finish(){this.animation?.finish()}render(){return $` <slot @slotchange=${this.handleSlotChange}></slot> `}};Yt.css=xm;c([Xu("slot")],Yt.prototype,"defaultSlot",2);c([p()],Yt.prototype,"name",2);c([p({type:Boolean,reflect:!0})],Yt.prototype,"play",2);c([p({type:Number})],Yt.prototype,"delay",2);c([p()],Yt.prototype,"direction",2);c([p({type:Number})],Yt.prototype,"duration",2);c([p()],Yt.prototype,"easing",2);c([p({attribute:"end-delay",type:Number})],Yt.prototype,"endDelay",2);c([p()],Yt.prototype,"fill",2);c([p({type:Number})],Yt.prototype,"iterations",2);c([p({attribute:"iteration-start",type:Number})],Yt.prototype,"iterationStart",2);c([p({attribute:!1})],Yt.prototype,"keyframes",2);c([p({attribute:"playback-rate",type:Number})],Yt.prototype,"playbackRate",2);c([tt(["name","delay","direction","duration","easing","endDelay","fill","iterations","iterationsStart","keyframes"])],Yt.prototype,"handleAnimationChange",1);c([tt("play")],Yt.prototype,"handlePlayChange",1);c([tt("playbackRate")],Yt.prototype,"handlePlaybackRateChange",1);Yt=c([X("wa-animation")],Yt);var p0=J`
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
`;var kr=class extends lt{constructor(){super(...arguments),this.hasError=!1,this.image="",this.label="",this.initials="",this.loading="eager",this.shape="circle"}handleImageChange(){this.hasError=!1}handleImageLoadError(){this.hasError=!0,this.dispatchEvent(new Gi)}render(){const t=$`
      <img
        part="image"
        class="image"
        src="${this.image}"
        loading="${this.loading}"
        role="img"
        aria-label=${this.label}
        @error="${this.handleImageLoadError}"
      />
    `;let e=$``;return this.initials?e=$`<div part="initials" class="initials" role="img" aria-label=${this.label}>
        ${this.initials}
      </div>`:e=$`
        <slot name="icon" part="icon" class="icon" role="img" aria-label=${this.label}>
          <wa-icon name="user" library="system" variant="solid"></wa-icon>
        </slot>
      `,$` ${this.image&&!this.hasError?t:e} `}};kr.css=p0;c([Z()],kr.prototype,"hasError",2);c([p()],kr.prototype,"image",2);c([p()],kr.prototype,"label",2);c([p()],kr.prototype,"initials",2);c([p()],kr.prototype,"loading",2);c([p({reflect:!0})],kr.prototype,"shape",2);c([tt("image")],kr.prototype,"handleImageChange",1);kr=c([X("wa-avatar")],kr);var bo=J`
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
`;var f0=J`
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
`;var _i=class extends lt{constructor(){super(...arguments),this.variant="brand",this.appearance="accent",this.pill=!1,this.attention="none"}render(){return $`
      <slot name="start" part="start"></slot>

      <slot part="base" role="status"></slot>

      <slot name="end" part="end"></slot>
    `}};_i.css=[bo,f0];c([p({reflect:!0})],_i.prototype,"variant",2);c([p({reflect:!0})],_i.prototype,"appearance",2);c([p({type:Boolean,reflect:!0})],_i.prototype,"pill",2);c([p({reflect:!0})],_i.prototype,"attention",2);_i=c([X("wa-badge")],_i);var m0=J`
  .breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`;var es=class extends lt{constructor(){super(...arguments),this.localize=new Et(this),this.separatorDir=this.localize.dir(),this.label=""}getSeparator(){const e=this.separatorSlot.assignedElements({flatten:!0})[0].cloneNode(!0);return[e,...e.querySelectorAll("[id]")].forEach(r=>r.removeAttribute("id")),e.setAttribute("data-default",""),e.slot="separator",e}handleSlotChange(){const t=[...this.defaultSlot.assignedElements({flatten:!0})].filter(e=>e.tagName.toLowerCase()==="wa-breadcrumb-item");t.forEach((e,r)=>{const i=e.querySelector('[slot="separator"]');i===null?e.append(this.getSeparator()):i.hasAttribute("data-default")&&i.replaceWith(this.getSeparator()),r===t.length-1?e.setAttribute("aria-current","page"):e.removeAttribute("aria-current")})}render(){return this.separatorDir!==this.localize.dir()&&(this.separatorDir=this.localize.dir(),this.updateComplete.then(()=>this.handleSlotChange())),$`
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
    `}};es.css=m0;c([Q("slot")],es.prototype,"defaultSlot",2);c([Q('slot[name="separator"]')],es.prototype,"separatorSlot",2);c([p()],es.prototype,"label",2);es=c([X("wa-breadcrumb")],es);var g0=J`
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
`;var Or=class extends lt{constructor(){super(...arguments),this.renderType="button",this.rel="noreferrer noopener"}setRenderType(){const t=this.defaultSlot.assignedElements({flatten:!0}).filter(e=>e.tagName.toLowerCase()==="wa-dropdown").length>0;if(this.href){this.renderType="link";return}if(t){this.renderType="dropdown";return}this.renderType="button"}hrefChanged(){this.setRenderType()}handleSlotChange(){this.setRenderType()}render(){return $`
      <span part="start" class="start">
        <slot name="start"></slot>
      </span>

      ${this.renderType==="link"?$`
            <a
              part="label"
              class="label label-link"
              href="${this.href}"
              target="${st(this.target?this.target:void 0)}"
              rel=${st(this.target?this.rel:void 0)}
            >
              <slot></slot>
            </a>
          `:""}
      ${this.renderType==="button"?$`
            <button part="label" type="button" class="label label-button">
              <slot @slotchange=${this.handleSlotChange}></slot>
            </button>
          `:""}
      ${this.renderType==="dropdown"?$`
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
    `}};Or.css=g0;c([Q("slot:not([name])")],Or.prototype,"defaultSlot",2);c([Z()],Or.prototype,"renderType",2);c([p()],Or.prototype,"href",2);c([p()],Or.prototype,"target",2);c([p()],Or.prototype,"rel",2);c([tt("href",{waitUntilFirstUpdate:!0})],Or.prototype,"hrefChanged",1);Or=c([X("wa-breadcrumb-item")],Or);var na=()=>({checkValidity(t){const e=t.input,r={message:"",isValid:!0,invalidKeys:[]};if(!e)return r;let i=!0;if("checkValidity"in e&&(i=e.checkValidity()),i)return r;if(r.isValid=!1,"validationMessage"in e&&(r.message=e.validationMessage),!("validity"in e))return r.invalidKeys.push("customError"),r;for(const s in e.validity){if(s==="valid")continue;const a=s;e.validity[a]&&r.invalidKeys.push(a)}return r}});var ml=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}};var b0=()=>({observedAttributes:["custom-error"],checkValidity(t){const e={message:"",isValid:!0,invalidKeys:[]};return t.customError&&(e.message=t.customError,e.isValid=!1,e.invalidKeys=["customError"]),e}}),Ft=class extends lt{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=t=>{t.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new ml))},this.handleInteraction=t=>{const e=this.emittedEvents;e.includes(t.type)||e.push(t.type),e.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[b0()]}static get observedAttributes(){const t=new Set(super.observedAttributes||[]);for(const e of this.validators)if(e.observedAttributes)for(const r of e.observedAttributes)t.add(r);return[...t]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(t=>{this.addEventListener(t,this.handleInteraction)})}firstUpdated(...t){super.firstUpdated(...t),this.updateValidity()}willUpdate(t){if(t.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),t.has("value")||t.has("disabled")||t.has("defaultValue")){const e=this.value;if(Array.isArray(e)){if(this.name){const r=new FormData;for(const i of e)r.append(this.name,i);this.setValue(r,r)}}else this.setValue(e,e)}t.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),super.willUpdate(t),this.updateValidity()}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(t){t?this.setAttribute("form",t):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...t){const e=t[0],r=t[1];let i=t[2];i||(i=this.validationTarget),this.internals.setValidity(e,r,i||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){const t=!!this.required,e=this.internals.validity.valid,r=this.hasInteracted;this.customStates.set("required",t),this.customStates.set("optional",!t),this.customStates.set("invalid",!e),this.customStates.set("valid",e),this.customStates.set("user-invalid",!e&&r),this.customStates.set("user-valid",e&&r)}setCustomValidity(t){if(!t){this.customError=null,this.setValidity({});return}this.customError=t,this.setValidity({customError:!0},t,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(t){this.disabled=t,this.updateValidity()}formStateRestoreCallback(t,e){this.value=t,e==="restore"&&this.resetValidity(),this.updateValidity()}setValue(...t){const[e,r]=t;this.internals.setFormValue(e,r)}get allValidators(){const t=this.constructor.validators||[],e=this.validators||[];return[...t,...e]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}const t=this.allValidators;if(!t?.length)return;const e={customError:!!this.customError},r=this.validationTarget||this.input||void 0;let i="";for(const s of t){const{isValid:a,message:o,invalidKeys:n}=s.checkValidity(this);a||(i||(i=o),n?.length>=0&&n.forEach(l=>e[l]=!0))}i||(i=this.validationMessage),this.setValidity(e,i,r)}};Ft.formAssociated=!0;c([p({reflect:!0})],Ft.prototype,"name",2);c([p({type:Boolean})],Ft.prototype,"disabled",2);c([p({state:!0,attribute:!1})],Ft.prototype,"valueHasChanged",2);c([p({state:!0,attribute:!1})],Ft.prototype,"hasInteracted",2);c([p({attribute:"custom-error",reflect:!0})],Ft.prototype,"customError",2);c([p({attribute:!1,state:!0,type:Object})],Ft.prototype,"validity",1);var Ie=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=r=>{const i=r.target;(this.slotNames.includes("[default]")&&!i.name||i.name&&this.slotNames.includes(i.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return this.host.childNodes?[...this.host.childNodes].some(t=>{if(t.nodeType===Node.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===Node.ELEMENT_NODE){const e=t;if(e.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1}):!1}hasNamedSlot(t){return this.host.querySelector?.(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot?.addEventListener?.("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot?.removeEventListener?.("slotchange",this.handleSlotChange)}};var we=J`
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
`;var w0=J`
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
`;const pt=hs(class extends us{constructor(t){if(super(t),t.type!==er.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in e)e[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(e)}const r=t.element.classList;for(const i of this.st)i in e||(r.remove(i),this.st.delete(i));for(const i in e){const s=!!e[i];s===this.st.has(i)||this.nt?.has(i)||(s?(r.add(i),this.st.add(i)):(r.remove(i),this.st.delete(i)))}return _e}});const qd=Symbol.for(""),v0=t=>{if(t?.r===qd)return t?._$litStatic$},mc=(t,...e)=>({_$litStatic$:e.reduce((r,i,s)=>r+(a=>{if(a._$litStatic$!==void 0)return a._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${a}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(i)+t[s+1],t[0]),r:qd}),gc=new Map,y0=t=>(e,...r)=>{const i=r.length;let s,a;const o=[],n=[];let l,d=0,h=!1;for(;d<i;){for(l=e[d];d<i&&(a=r[d],(s=v0(a))!==void 0);)l+=s+e[++d],h=!0;d!==i&&n.push(a),o.push(l),d++}if(d===i&&o.push(e[i]),h){const f=o.join("$$lit$$");(e=gc.get(f))===void 0&&(o.raw=o,gc.set(f,e=o)),r=n}return t(e,...r)},Qo=y0($);var Dt=class extends Ft{constructor(){super(...arguments),this.assumeInteractionOn=["click"],this.hasSlotController=new Ie(this,"[default]","start","end"),this.localize=new Et(this),this.invalid=!1,this.isIconButton=!1,this.title="",this.variant="neutral",this.appearance="accent",this.size="medium",this.withCaret=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type="button"}static get validators(){return[...super.validators,na()]}constructLightDOMButton(){const t=document.createElement("button");for(const e of this.attributes)e.name!=="style"&&t.setAttribute(e.name,e.value);return t.type=this.type,t.style.position="absolute !important",t.style.width="0 !important",t.style.height="0 !important",t.style.clipPath="inset(50%) !important",t.style.overflow="hidden !important",t.style.whiteSpace="nowrap !important",this.name&&(t.name=this.name),t.value=this.value||"",t}handleClick(t){if(this.disabled||this.loading){t.preventDefault(),t.stopImmediatePropagation();return}if(this.type!=="submit"&&this.type!=="reset"||!this.getForm())return;const r=this.constructLightDOMButton();this.parentElement?.append(r),r.click(),r.remove()}handleInvalid(){this.dispatchEvent(new ml)}handleLabelSlotChange(){const t=this.labelSlot.assignedNodes({flatten:!0});let e=!1,r=!1,i=!1,s=!1;[...t].forEach(a=>{if(a.nodeType===Node.ELEMENT_NODE){const o=a;o.localName==="wa-icon"?(r=!0,e||(e=o.label!==void 0)):s=!0}else a.nodeType===Node.TEXT_NODE&&(a.textContent?.trim()||"").length>0&&(i=!0)}),this.isIconButton=r&&!i&&!s,this.isIconButton&&!e&&console.warn('Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.updateValidity()}setValue(...t){}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){const t=this.isLink(),e=t?mc`a`:mc`button`;return Qo`
      <${e}
        part="base"
        class=${pt({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:this.localize.dir()==="rtl","has-label":this.hasSlotController.test("[default]"),"has-start":this.hasSlotController.test("start"),"has-end":this.hasSlotController.test("end"),"is-icon-button":this.isIconButton})}
        ?disabled=${st(t?void 0:this.disabled)}
        type=${st(t?void 0:this.type)}
        title=${this.title}
        name=${st(t?void 0:this.name)}
        value=${st(t?void 0:this.value)}
        href=${st(t?this.href:void 0)}
        target=${st(t?this.target:void 0)}
        download=${st(t?this.download:void 0)}
        rel=${st(t&&this.rel?this.rel:void 0)}
        role=${st(t?void 0:"button")}
        aria-disabled=${st(t&&this.disabled?"true":void 0)}
        tabindex=${this.disabled?"-1":"0"}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret?Qo`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              `:""}
        ${this.loading?Qo`<wa-spinner part="spinner"></wa-spinner>`:""}
      </${e}>
    `}};Dt.shadowRootOptions={...Ft.shadowRootOptions,delegatesFocus:!0};Dt.css=[w0,bo,we];c([Q(".button")],Dt.prototype,"button",2);c([Q("slot:not([name])")],Dt.prototype,"labelSlot",2);c([Z()],Dt.prototype,"invalid",2);c([Z()],Dt.prototype,"isIconButton",2);c([p()],Dt.prototype,"title",2);c([p({reflect:!0})],Dt.prototype,"variant",2);c([p({reflect:!0})],Dt.prototype,"appearance",2);c([p({reflect:!0})],Dt.prototype,"size",2);c([p({attribute:"with-caret",type:Boolean,reflect:!0})],Dt.prototype,"withCaret",2);c([p({type:Boolean})],Dt.prototype,"disabled",2);c([p({type:Boolean,reflect:!0})],Dt.prototype,"loading",2);c([p({type:Boolean,reflect:!0})],Dt.prototype,"pill",2);c([p()],Dt.prototype,"type",2);c([p({reflect:!0})],Dt.prototype,"name",2);c([p({reflect:!0})],Dt.prototype,"value",2);c([p({reflect:!0})],Dt.prototype,"href",2);c([p()],Dt.prototype,"target",2);c([p()],Dt.prototype,"rel",2);c([p()],Dt.prototype,"download",2);c([p({attribute:"formaction"})],Dt.prototype,"formAction",2);c([p({attribute:"formenctype"})],Dt.prototype,"formEnctype",2);c([p({attribute:"formmethod"})],Dt.prototype,"formMethod",2);c([p({attribute:"formnovalidate",type:Boolean})],Dt.prototype,"formNoValidate",2);c([p({attribute:"formtarget"})],Dt.prototype,"formTarget",2);c([tt("disabled",{waitUntilFirstUpdate:!0})],Dt.prototype,"handleDisabledChange",1);Dt=c([X("wa-button")],Dt);var x0=J`
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
`;var $n=class extends lt{constructor(){super(...arguments),this.localize=new Et(this)}render(){return $`
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
    `}};$n.css=x0;$n=c([X("wa-spinner")],$n);var k0=J`
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
`;var ei=class extends lt{constructor(){super(...arguments),this.disableRole=!1,this.hasOutlined=!1,this.label="",this.orientation="horizontal"}updated(t){super.updated(t),t.has("orientation")&&(this.setAttribute("aria-orientation",this.orientation),this.updateClassNames())}handleFocus(t){zs(t.target)?.classList.add("button-focus")}handleBlur(t){zs(t.target)?.classList.remove("button-focus")}handleMouseOver(t){zs(t.target)?.classList.add("button-hover")}handleMouseOut(t){zs(t.target)?.classList.remove("button-hover")}handleSlotChange(){this.updateClassNames()}updateClassNames(){const t=[...this.defaultSlot.assignedElements({flatten:!0})];this.hasOutlined=!1,t.forEach(e=>{const r=t.indexOf(e),i=zs(e);i&&(i.appearance==="outlined"&&(this.hasOutlined=!0),i.classList.add("wa-button-group__button"),i.classList.toggle("wa-button-group__horizontal",this.orientation==="horizontal"),i.classList.toggle("wa-button-group__vertical",this.orientation==="vertical"),i.classList.toggle("wa-button-group__button-first",r===0),i.classList.toggle("wa-button-group__button-inner",r>0&&r<t.length-1),i.classList.toggle("wa-button-group__button-last",r===t.length-1),i.classList.toggle("wa-button-group__button-radio",i.tagName.toLowerCase()==="wa-radio-button"))})}render(){return $`
      <slot
        part="base"
        class=${pt({"button-group":!0,"has-outlined":this.hasOutlined})}
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        aria-orientation=${this.orientation}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
        @slotchange=${this.handleSlotChange}
      ></slot>
    `}};ei.css=[k0];c([Q("slot")],ei.prototype,"defaultSlot",2);c([Z()],ei.prototype,"disableRole",2);c([Z()],ei.prototype,"hasOutlined",2);c([p()],ei.prototype,"label",2);c([p({reflect:!0})],ei.prototype,"orientation",2);ei=c([X("wa-button-group")],ei);function zs(t){const e="wa-button, wa-radio-button";return t.closest(e)??t.querySelector(e)}var C0=J`
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
`;var rs=class extends lt{constructor(){super(...arguments),this.variant="brand",this.size="medium"}render(){return $`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>
    `}};rs.css=[C0,bo,we];c([p({reflect:!0})],rs.prototype,"variant",2);c([p({reflect:!0})],rs.prototype,"appearance",2);c([p({reflect:!0})],rs.prototype,"size",2);rs=c([X("wa-callout")],rs);var S0=J`
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
`;var ri=class extends lt{constructor(){super(...arguments),this.hasSlotController=new Ie(this,"footer","header","media","header-actions","footer-actions","actions"),this.appearance="outlined",this.withHeader=!1,this.withMedia=!1,this.withFooter=!1,this.orientation="vertical"}updated(){!this.withHeader&&this.hasSlotController.test("header")&&(this.withHeader=!0),!this.withMedia&&this.hasSlotController.test("media")&&(this.withMedia=!0),!this.withFooter&&this.hasSlotController.test("footer")&&(this.withFooter=!0)}render(){return this.orientation==="horizontal"?$`
        <slot name="media" part="media" class="media"></slot>
        <slot part="body" class="body"></slot>
        <slot name="actions" part="actions" class="actions"></slot>
      `:$`
      <slot name="media" part="media" class="media"></slot>

      ${this.hasSlotController.test("header-actions")?$` <header part="header" class="header has-actions">
            <slot name="header"></slot>
            <slot name="header-actions"></slot>
          </header>`:$` <header part="header" class="header">
            <slot name="header"></slot>
          </header>`}

      <slot part="body" class="body"></slot>
      ${this.hasSlotController.test("footer-actions")?$` <footer part="footer" class="footer has-actions">
            <slot name="footer"></slot>
            <slot name="footer-actions"></slot>
          </footer>`:$` <footer part="footer" class="footer">
            <slot name="footer"></slot>
          </footer>`}
    `}};ri.css=[we,S0];c([p({reflect:!0})],ri.prototype,"appearance",2);c([p({attribute:"with-header",type:Boolean,reflect:!0})],ri.prototype,"withHeader",2);c([p({attribute:"with-media",type:Boolean,reflect:!0})],ri.prototype,"withMedia",2);c([p({attribute:"with-footer",type:Boolean,reflect:!0})],ri.prototype,"withFooter",2);c([p({reflect:!0})],ri.prototype,"orientation",2);ri=c([X("wa-card")],ri);var $0=class extends Event{constructor(t){super("wa-slide-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var _0=class{constructor(t,e){this.timerId=0,this.activeInteractions=0,this.paused=!1,this.stopped=!0,this.pause=()=>{this.activeInteractions++||(this.paused=!0,this.host.requestUpdate())},this.resume=()=>{--this.activeInteractions||(this.paused=!1,this.host.requestUpdate())},t.addController(this),this.host=t,this.tickCallback=e}hostConnected(){this.host.addEventListener("mouseenter",this.pause),this.host.addEventListener("mouseleave",this.resume),this.host.addEventListener("focusin",this.pause),this.host.addEventListener("focusout",this.resume),this.host.addEventListener("touchstart",this.pause,{passive:!0}),this.host.addEventListener("touchend",this.resume)}hostDisconnected(){this.stop(),this.host.removeEventListener("mouseenter",this.pause),this.host.removeEventListener("mouseleave",this.resume),this.host.removeEventListener("focusin",this.pause),this.host.removeEventListener("focusout",this.resume),this.host.removeEventListener("touchstart",this.pause),this.host.removeEventListener("touchend",this.resume)}start(t){this.stop(),this.stopped=!1,this.timerId=window.setInterval(()=>{this.paused||this.tickCallback()},t)}stop(){clearInterval(this.timerId),this.stopped=!0,this.host.requestUpdate()}};var E0=J`
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
`;let A0="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",L0=(t=21)=>{let e="",r=crypto.getRandomValues(new Uint8Array(t|=0));for(;t--;)e+=A0[r[t]&63];return e};function vt(t,e,r){const i=s=>Object.is(s,-0)?0:s;return t<e?i(e):t>r?i(r):i(t)}function wo(t=""){return`${t}${L0()}`}function nr(t,e){return new Promise(r=>{function i(s){s.target===t&&(t.removeEventListener(e,i),r())}t.addEventListener(e,i)})}async function Ka(t,e,r){return t.animate(e,r).finished.catch(()=>{})}function Mt(t,e){return new Promise(r=>{const i=new AbortController,{signal:s}=i;if(t.classList.contains(e))return;t.classList.add(e);let a=!1,o=()=>{a||(a=!0,t.classList.remove(e),r(),i.abort())};t.addEventListener("animationend",o,{once:!0,signal:s}),t.addEventListener("animationcancel",o,{once:!0,signal:s}),requestAnimationFrame(()=>{!a&&t.getAnimations().length===0&&o()})})}function Ga(t){return t=t.toString().toLowerCase(),t.indexOf("ms")>-1?parseFloat(t)||0:t.indexOf("s")>-1?(parseFloat(t)||0)*1e3:parseFloat(t)||0}function bc(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function*z0(t,e){if(t!==void 0){let r=0;for(const i of t)yield e(i,r++)}}function*T0(t,e,r=1){const i=e===void 0?0:t;e??=t;for(let s=i;r>0?s<e:e<s;s+=r)yield s}(()=>{const t=(i,s)=>{let a=0;return function(...o){window.clearTimeout(a),a=window.setTimeout(()=>{i.call(this,...o)},s)}},e=(i,s,a)=>{const o=i[s];i[s]=function(...n){o.call(this,...n),a.call(this,o,...n)}};if(!("onscrollend"in window)){const i=new Set,s=new WeakMap,a=n=>{i.add(n.pointerId)},o=n=>{i.delete(n.pointerId)};document.addEventListener("pointerdown",a),document.addEventListener("pointerup",o),e(EventTarget.prototype,"addEventListener",function(n,l){if(l!=="scroll")return;const d=t(()=>{i.size?d():this.dispatchEvent(new Event("scrollend"))},100);n.call(this,"scroll",d,{passive:!0}),s.set(this,d)}),e(EventTarget.prototype,"removeEventListener",function(n,l){if(l!=="scroll")return;const d=s.get(this);d&&n.call(this,"scroll",d,{passive:!0})})}})();var Ut=class extends lt{constructor(){super(...arguments),this.loop=!1,this.slides=0,this.currentSlide=0,this.navigation=!1,this.pagination=!1,this.autoplay=!1,this.autoplayInterval=3e3,this.slidesPerPage=1,this.slidesPerMove=1,this.orientation="horizontal",this.mouseDragging=!1,this.activeSlide=0,this.scrolling=!1,this.dragging=!1,this.autoplayController=new _0(this,()=>this.next()),this.dragStartPosition=[-1,-1],this.localize=new Et(this),this.pendingSlideChange=!1,this.handleMouseDrag=t=>{this.dragging||(this.scrollContainer.style.setProperty("scroll-snap-type","none"),this.dragging=!0,this.dragStartPosition=[t.clientX,t.clientY]),this.scrollContainer.scrollBy({left:-t.movementX,top:-t.movementY,behavior:"instant"})},this.handleMouseDragEnd=()=>{const t=this.scrollContainer;document.removeEventListener("pointermove",this.handleMouseDrag,{capture:!0});const e=t.scrollLeft,r=t.scrollTop;t.style.removeProperty("scroll-snap-type"),t.style.setProperty("overflow","hidden");const i=t.scrollLeft,s=t.scrollTop;t.style.removeProperty("overflow"),t.style.setProperty("scroll-snap-type","none"),t.scrollTo({left:e,top:r,behavior:"instant"}),requestAnimationFrame(async()=>{(e!==i||r!==s)&&(t.scrollTo({left:i,top:s,behavior:bc()?"auto":"smooth"}),await nr(t,"scrollend")),t.style.removeProperty("scroll-snap-type"),this.dragging=!1,this.dragStartPosition=[-1,-1],this.handleScrollEnd()})},this.handleSlotChange=t=>{t.some(r=>[...r.addedNodes,...r.removedNodes].some(i=>this.isCarouselItem(i)&&!i.hasAttribute("data-clone")))&&this.initializeSlides(),this.requestUpdate()}}connectedCallback(){super.connectedCallback(),this.setAttribute("role","region"),this.setAttribute("aria-label",this.localize.term("carousel"))}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect()}firstUpdated(){this.initializeSlides(),this.mutationObserver=new MutationObserver(this.handleSlotChange),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}willUpdate(t){(t.has("slidesPerMove")||t.has("slidesPerPage"))&&(this.slidesPerMove=Math.min(this.slidesPerMove,this.slidesPerPage))}getPageCount(){const t=this.getSlides().length,{slidesPerPage:e,slidesPerMove:r,loop:i}=this,s=i?t/r:(t-e)/r+1;return Math.ceil(s)}getCurrentPage(){return Math.ceil(this.activeSlide/this.slidesPerMove)}canScrollNext(){return this.loop||this.getCurrentPage()<this.getPageCount()-1}canScrollPrev(){return this.loop||this.getCurrentPage()>0}getSlides({excludeClones:t=!0}={}){return[...this.children].filter(e=>this.isCarouselItem(e)&&(!t||!e.hasAttribute("data-clone")))}handleClick(t){if(this.dragging&&this.dragStartPosition[0]>0&&this.dragStartPosition[1]>0){const e=Math.abs(this.dragStartPosition[0]-t.clientX),r=Math.abs(this.dragStartPosition[1]-t.clientY);Math.sqrt(e*e+r*r)>=10&&t.preventDefault()}}handleKeyDown(t){if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key)){const e=t.target,r=this.localize.dir()==="rtl",i=e.closest('[part~="pagination-item"]')!==null,s=t.key==="ArrowDown"||!r&&t.key==="ArrowRight"||r&&t.key==="ArrowLeft",a=t.key==="ArrowUp"||!r&&t.key==="ArrowLeft"||r&&t.key==="ArrowRight";t.preventDefault(),a&&this.previous(),s&&this.next(),t.key==="Home"&&this.goToSlide(0),t.key==="End"&&this.goToSlide(this.getSlides().length-1),i&&this.updateComplete.then(()=>{const o=this.shadowRoot?.querySelector('[part~="pagination-item-active"]');o&&o.focus()})}}handleMouseDragStart(t){this.mouseDragging&&t.button===0&&(t.preventDefault(),document.addEventListener("pointermove",this.handleMouseDrag,{capture:!0,passive:!0}),document.addEventListener("pointerup",this.handleMouseDragEnd,{capture:!0,once:!0}))}handleScroll(){this.scrolling=!0,this.pendingSlideChange||this.synchronizeSlides()}synchronizeSlides(){const t=new IntersectionObserver(e=>{t.disconnect();for(const n of e){const l=n.target;l.toggleAttribute("inert",!n.isIntersecting),l.classList.toggle("--in-view",n.isIntersecting),l.setAttribute("aria-hidden",n.isIntersecting?"false":"true")}const r=e.find(n=>n.isIntersecting);if(!r)return;const i=this.getSlides({excludeClones:!1}),s=this.getSlides().length,a=i.indexOf(r.target),o=this.loop?a-this.slidesPerPage:a;if(r&&(this.activeSlide=(Math.ceil(o/this.slidesPerMove)*this.slidesPerMove+s)%s,!this.scrolling&&this.loop&&r.target.hasAttribute("data-clone"))){const n=Number(r.target.getAttribute("data-clone"));this.goToSlide(n,"instant")}},{root:this.scrollContainer,threshold:.6});this.getSlides({excludeClones:!1}).forEach(e=>{t.observe(e)})}handleScrollEnd(){!this.scrolling||this.dragging||(this.synchronizeSlides(),this.scrolling=!1,this.pendingSlideChange=!1,this.synchronizeSlides())}isCarouselItem(t){return t instanceof Element&&t.tagName.toLowerCase()==="wa-carousel-item"}initializeSlides(){this.getSlides({excludeClones:!1}).forEach((t,e)=>{t.classList.remove("--in-view"),t.classList.remove("--is-active"),t.setAttribute("aria-label",this.localize.term("slideNum",e+1)),t.hasAttribute("data-clone")&&t.remove()}),this.updateSlidesSnap(),this.loop&&this.createClones(),this.goToSlide(this.activeSlide,"auto"),this.synchronizeSlides()}createClones(){const t=this.getSlides(),e=this.slidesPerPage,r=t.slice(-e),i=t.slice(0,e);r.reverse().forEach((s,a)=>{const o=s.cloneNode(!0);o.setAttribute("data-clone",String(t.length-a-1)),this.prepend(o)}),i.forEach((s,a)=>{const o=s.cloneNode(!0);o.setAttribute("data-clone",String(a)),this.append(o)})}handleSlideChange(){const t=this.getSlides();t.forEach((e,r)=>{e.classList.toggle("--is-active",r===this.activeSlide)}),this.hasUpdated&&this.dispatchEvent(new $0({index:this.activeSlide,slide:t[this.activeSlide]}))}updateSlidesSnap(){const t=this.getSlides(),e=this.slidesPerMove;t.forEach((r,i)=>{(i+e)%e===0?r.style.removeProperty("scroll-snap-align"):r.style.setProperty("scroll-snap-align","none")})}handleAutoplayChange(){this.autoplayController.stop(),this.autoplay&&this.autoplayController.start(this.autoplayInterval)}previous(t="smooth"){this.goToSlide(this.activeSlide-this.slidesPerMove,t)}next(t="smooth"){this.goToSlide(this.activeSlide+this.slidesPerMove,t)}goToSlide(t,e="smooth"){const{slidesPerPage:r,loop:i}=this,s=this.getSlides(),a=this.getSlides({excludeClones:!1});if(!s.length)return;const o=i?(t+s.length)%s.length:vt(t,0,s.length-r);this.activeSlide=o;const n=this.localize.dir()==="rtl",l=vt(t+(i?r:0)+(n?r-1:0),0,a.length-1),d=a[l];this.scrollToSlide(d,bc()?"auto":e)}scrollToSlide(t,e="smooth"){this.pendingSlideChange=!0,window.requestAnimationFrame(()=>{if(!this.scrollContainer)return;const r=this.scrollContainer,i=r.getBoundingClientRect(),s=t.getBoundingClientRect(),a=s.left-i.left,o=s.top-i.top;a||o?(this.pendingSlideChange=!0,r.scrollTo({left:a+r.scrollLeft,top:o+r.scrollTop,behavior:e})):this.pendingSlideChange=!1})}render(){const{slidesPerMove:t,scrolling:e}=this;let r=0,i=0,s=!1,a=!1;this.hasUpdated&&(r=this.getPageCount(),i=this.getCurrentPage(),s=this.canScrollPrev(),a=this.canScrollNext());const o=this.localize.dir()==="rtl";return $`
      <div part="base" class="carousel">
        <div
          id="scroll-container"
          part="scroll-container"
          class="${pt({slides:!0,"slides-horizontal":this.orientation==="horizontal","slides-vertical":this.orientation==="vertical","slides-dragging":this.dragging})}"
          style=${Vt({"--slides-per-page":this.slidesPerPage})}
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

        ${this.navigation?$`
              <div part="navigation" class="navigation">
                <button
                  part="navigation-button navigation-button-previous"
                  class="${pt({"navigation-button":!0,"navigation-button-previous":!0,"navigation-button-disabled":!s})}"
                  aria-label="${this.localize.term("previousSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${s?"false":"true"}"
                  @click=${s?()=>this.previous():null}
                >
                  <slot name="previous-icon">
                    <wa-icon library="system" name="${o?"chevron-right":"chevron-left"}"></wa-icon>
                  </slot>
                </button>

                <button
                  part="navigation-button navigation-button-next"
                  class=${pt({"navigation-button":!0,"navigation-button-next":!0,"navigation-button-disabled":!a})}
                  aria-label="${this.localize.term("nextSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${a?"false":"true"}"
                  @click=${a?()=>this.next():null}
                >
                  <slot name="next-icon">
                    <wa-icon library="system" name="${o?"chevron-left":"chevron-right"}"></wa-icon>
                  </slot>
                </button>
              </div>
            `:""}
        ${this.pagination?$`
              <div part="pagination" role="tablist" class="pagination" aria-controls="scroll-container">
                ${z0(T0(r),n=>{const l=n===i;return $`
                    <button
                      part="pagination-item ${l?"pagination-item-active":""}"
                      class="${pt({"pagination-item":!0,"pagination-item-active":l})}"
                      role="tab"
                      aria-selected="${l?"true":"false"}"
                      aria-label="${this.localize.term("goToSlide",n+1,r)}"
                      tabindex=${l?"0":"-1"}
                      @click=${()=>this.goToSlide(n*t)}
                      @keydown=${this.handleKeyDown}
                    ></button>
                  `})}
              </div>
            `:$``}
      </div>
    `}};Ut.css=E0;c([p({type:Boolean,reflect:!0})],Ut.prototype,"loop",2);c([p({type:Number,reflect:!0})],Ut.prototype,"slides",2);c([p({type:Number,reflect:!0})],Ut.prototype,"currentSlide",2);c([p({type:Boolean,reflect:!0})],Ut.prototype,"navigation",2);c([p({type:Boolean,reflect:!0})],Ut.prototype,"pagination",2);c([p({type:Boolean,reflect:!0})],Ut.prototype,"autoplay",2);c([p({type:Number,attribute:"autoplay-interval"})],Ut.prototype,"autoplayInterval",2);c([p({type:Number,attribute:"slides-per-page"})],Ut.prototype,"slidesPerPage",2);c([p({type:Number,attribute:"slides-per-move"})],Ut.prototype,"slidesPerMove",2);c([p()],Ut.prototype,"orientation",2);c([p({type:Boolean,reflect:!0,attribute:"mouse-dragging"})],Ut.prototype,"mouseDragging",2);c([Q(".slides")],Ut.prototype,"scrollContainer",2);c([Q(".pagination")],Ut.prototype,"paginationContainer",2);c([Z()],Ut.prototype,"activeSlide",2);c([Z()],Ut.prototype,"scrolling",2);c([Z()],Ut.prototype,"dragging",2);c([co({passive:!0})],Ut.prototype,"handleScroll",1);c([tt("loop",{waitUntilFirstUpdate:!0}),tt("slidesPerPage",{waitUntilFirstUpdate:!0})],Ut.prototype,"initializeSlides",1);c([tt("activeSlide")],Ut.prototype,"handleSlideChange",1);c([tt("slidesPerMove")],Ut.prototype,"updateSlidesSnap",1);c([tt("autoplay")],Ut.prototype,"handleAutoplayChange",1);Ut=c([X("wa-carousel")],Ut);var R0=J`
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
`;var _n=class extends lt{connectedCallback(){super.connectedCallback(),this.setAttribute("role","group")}render(){return $` <slot></slot> `}};_n.css=R0;_n=c([X("wa-carousel-item")],_n);var D0=J`
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
`;var vo=(t={})=>{let{validationElement:e,validationProperty:r}=t;e||(e=Object.assign(document.createElement("input"),{required:!0})),r||(r="value");const i={observedAttributes:["required"],message:e.validationMessage,checkValidity(s){const a={message:"",isValid:!0,invalidKeys:[]};return(s.required??s.hasAttribute("required"))&&!s[r]&&(a.message=typeof i.message=="function"?i.message(s):i.message||"",a.isValid=!1,a.invalidKeys.push("valueMissing")),a}};return i};var Ar=J`
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
`;const Ei=hs(class extends us{constructor(t){if(super(t),t.type!==er.PROPERTY&&t.type!==er.ATTRIBUTE&&t.type!==er.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ed(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===_e||e===ht)return e;const r=t.element,i=t.name;if(t.type===er.PROPERTY){if(e===r[i])return _e}else if(t.type===er.BOOLEAN_ATTRIBUTE){if(!!e===r.hasAttribute(i))return _e}else if(t.type===er.ATTRIBUTE&&r.getAttribute(i)===e+"")return _e;return rd(t),e}});var te=class extends Ft{constructor(){super(...arguments),this.hasSlotController=new Ie(this,"hint"),this.title="",this.name=null,this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.indeterminate=!1,this._checked=null,this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint=""}static get validators(){const t=[vo({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...t]}get value(){const t=this._value||"on";return this.checked?t:null}set value(t){this._value=t}get checked(){return this.valueHasChanged?!!this._checked:this._checked??this.defaultChecked}set checked(t){this._checked=!!t,this.valueHasChanged=!0}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}connectedCallback(){super.connectedCallback(),this.handleDefaultCheckedChange()}handleDefaultCheckedChange(){this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(t){super.willUpdate(t),(t.has("value")||t.has("checked")||t.has("defaultChecked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){const t=this.hasSlotController.test("hint"),e=this.hint?!0:!!t,r=!this.checked&&this.indeterminate,i=r?"indeterminate":"check",s=r?"indeterminate":"check";return $`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${st(this.name)}
            value=${st(this._value)}
            .indeterminate=${Ei(this.indeterminate)}
            .checked=${Ei(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${s}-icon icon" library="system" name=${i}></wa-icon>
        </span>

        <slot part="label"></slot>
      </label>

      <slot
        id="hint"
        part="hint"
        name="hint"
        aria-hidden=${e?"false":"true"}
        class="${pt({"has-slotted":e})}"
      >
        ${this.hint}
      </slot>
    `}};te.css=[Ar,we,D0];te.shadowRootOptions={...Ft.shadowRootOptions,delegatesFocus:!0};c([Q('input[type="checkbox"]')],te.prototype,"input",2);c([p()],te.prototype,"title",2);c([p({reflect:!0})],te.prototype,"name",2);c([p({reflect:!0})],te.prototype,"value",1);c([p({reflect:!0})],te.prototype,"size",2);c([p({type:Boolean})],te.prototype,"disabled",2);c([p({type:Boolean,reflect:!0})],te.prototype,"indeterminate",2);c([p({type:Boolean,attribute:!1})],te.prototype,"checked",1);c([p({type:Boolean,reflect:!0,attribute:"checked"})],te.prototype,"defaultChecked",2);c([p({type:Boolean,reflect:!0})],te.prototype,"required",2);c([p()],te.prototype,"hint",2);c([tt(["checked","defaultChecked"])],te.prototype,"handleDefaultCheckedChange",1);c([tt(["checked","indeterminate"])],te.prototype,"handleStateChange",1);c([tt("disabled")],te.prototype,"handleDisabledChange",1);te=c([X("wa-checkbox")],te);function qs(t,e){function r(s){const a=t.getBoundingClientRect(),o=t.ownerDocument.defaultView,n=a.left+o.pageXOffset,l=a.top+o.pageYOffset,d=s.pageX-n,h=s.pageY-l;e?.onMove&&e.onMove(d,h)}function i(){document.removeEventListener("pointermove",r),document.removeEventListener("pointerup",i),e?.onStop&&e.onStop()}document.addEventListener("pointermove",r,{passive:!0}),document.addEventListener("pointerup",i),e?.initialEvent instanceof PointerEvent&&r(e.initialEvent)}var Jo=typeof window<"u"&&"ontouchstart"in window,ba=class{constructor(t,e){this.isActive=!1,this.isDragging=!1,this.handleDragStart=r=>{const i="touches"in r?r.touches[0].clientX:r.clientX,s="touches"in r?r.touches[0].clientY:r.clientY;this.isDragging||!Jo&&r.buttons>1||(this.isDragging=!0,document.addEventListener("pointerup",this.handleDragStop),document.addEventListener("pointermove",this.handleDragMove),document.addEventListener("pointercancel",this.handleDragStop),document.addEventListener("touchend",this.handleDragStop),document.addEventListener("touchmove",this.handleDragMove),document.addEventListener("touchcancel",this.handleDragStop),this.options.start(i,s))},this.handleDragStop=r=>{const i="changedTouches"in r?r.changedTouches[0].clientX:r.clientX,s="changedTouches"in r?r.changedTouches[0].clientY:r.clientY;this.isDragging=!1,document.removeEventListener("pointerup",this.handleDragStop),document.removeEventListener("pointermove",this.handleDragMove),document.removeEventListener("pointercancel",this.handleDragStop),document.removeEventListener("touchend",this.handleDragStop),document.removeEventListener("touchmove",this.handleDragMove),document.removeEventListener("touchcancel",this.handleDragStop),this.options.stop(i,s)},this.handleDragMove=r=>{const i="touches"in r?r.touches[0].clientX:r.clientX,s="touches"in r?r.touches[0].clientY:r.clientY;window.getSelection()?.removeAllRanges(),this.options.move(i,s)},this.element=t,this.options={start:()=>{},stop:()=>{},move:()=>{},...e},this.start()}start(){this.isActive||(this.element.addEventListener("pointerdown",this.handleDragStart),Jo&&this.element.addEventListener("touchstart",this.handleDragStart),this.isActive=!0)}stop(){document.removeEventListener("pointerup",this.handleDragStop),document.removeEventListener("pointermove",this.handleDragMove),document.removeEventListener("pointercancel",this.handleDragStop),document.removeEventListener("touchend",this.handleDragStop),document.removeEventListener("touchmove",this.handleDragMove),document.removeEventListener("touchcancel",this.handleDragStop),this.element.removeEventListener("pointerdown",this.handleDragStart),Jo&&this.element.removeEventListener("touchstart",this.handleDragStart),this.isActive=!1,this.isDragging=!1}toggle(t){(t!==void 0?t:!this.isActive)?this.start():this.stop()}};var I0=J`
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
`;var Hd=J`
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
`;var xi=[];function Oi(t){xi.push(t)}function Cr(t){for(let e=xi.length-1;e>=0;e--)if(xi[e]===t){xi.splice(e,1);break}}function Sr(t){return xi.length>0&&xi[xi.length-1]===t}function ne(t,e){O0(t)&&(t="100%");const r=P0(t);return t=e===360?t:Math.min(e,Math.max(0,parseFloat(t))),r&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:(e===360?t=(t<0?t%e+e:t%e)/parseFloat(String(e)):t=t%e/parseFloat(String(e)),t)}function wa(t){return Math.min(1,Math.max(0,t))}function O0(t){return typeof t=="string"&&t.indexOf(".")!==-1&&parseFloat(t)===1}function P0(t){return typeof t=="string"&&t.indexOf("%")!==-1}function jd(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function va(t){return Number(t)<=1?`${Number(t)*100}%`:t}function vi(t){return t.length===1?"0"+t:String(t)}function N0(t,e,r){return{r:ne(t,255)*255,g:ne(e,255)*255,b:ne(r,255)*255}}function wc(t,e,r){t=ne(t,255),e=ne(e,255),r=ne(r,255);const i=Math.max(t,e,r),s=Math.min(t,e,r);let a=0,o=0;const n=(i+s)/2;if(i===s)o=0,a=0;else{const l=i-s;switch(o=n>.5?l/(2-i-s):l/(i+s),i){case t:a=(e-r)/l+(e<r?6:0);break;case e:a=(r-t)/l+2;break;case r:a=(t-e)/l+4;break}a/=6}return{h:a,s:o,l:n}}function tn(t,e,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?t+(e-t)*(6*r):r<1/2?e:r<2/3?t+(e-t)*(2/3-r)*6:t}function F0(t,e,r){let i,s,a;if(t=ne(t,360),e=ne(e,100),r=ne(r,100),e===0)s=r,a=r,i=r;else{const o=r<.5?r*(1+e):r+e-r*e,n=2*r-o;i=tn(n,o,t+1/3),s=tn(n,o,t),a=tn(n,o,t-1/3)}return{r:i*255,g:s*255,b:a*255}}function vc(t,e,r){t=ne(t,255),e=ne(e,255),r=ne(r,255);const i=Math.max(t,e,r),s=Math.min(t,e,r);let a=0;const o=i,n=i-s,l=i===0?0:n/i;if(i===s)a=0;else{switch(i){case t:a=(e-r)/n+(e<r?6:0);break;case e:a=(r-t)/n+2;break;case r:a=(t-e)/n+4;break}a/=6}return{h:a,s:l,v:o}}function B0(t,e,r){t=ne(t,360)*6,e=ne(e,100),r=ne(r,100);const i=Math.floor(t),s=t-i,a=r*(1-e),o=r*(1-s*e),n=r*(1-(1-s)*e),l=i%6,d=[r,o,a,a,n,r][l],h=[n,r,r,o,a,a][l],f=[a,a,n,r,r,o][l];return{r:d*255,g:h*255,b:f*255}}function yc(t,e,r,i){const s=[vi(Math.round(t).toString(16)),vi(Math.round(e).toString(16)),vi(Math.round(r).toString(16))];return i&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0):s.join("")}function M0(t,e,r,i,s){const a=[vi(Math.round(t).toString(16)),vi(Math.round(e).toString(16)),vi(Math.round(r).toString(16)),vi(V0(i))];return s&&a[0].startsWith(a[0].charAt(1))&&a[1].startsWith(a[1].charAt(1))&&a[2].startsWith(a[2].charAt(1))&&a[3].startsWith(a[3].charAt(1))?a[0].charAt(0)+a[1].charAt(0)+a[2].charAt(0)+a[3].charAt(0):a.join("")}function U0(t,e,r,i){const s=t/100,a=e/100,o=r/100,n=i/100,l=255*(1-s)*(1-n),d=255*(1-a)*(1-n),h=255*(1-o)*(1-n);return{r:l,g:d,b:h}}function xc(t,e,r){let i=1-t/255,s=1-e/255,a=1-r/255,o=Math.min(i,s,a);return o===1?(i=0,s=0,a=0):(i=(i-o)/(1-o)*100,s=(s-o)/(1-o)*100,a=(a-o)/(1-o)*100),o*=100,{c:Math.round(i),m:Math.round(s),y:Math.round(a),k:Math.round(o)}}function V0(t){return Math.round(parseFloat(t)*255).toString(16)}function kc(t){return Fe(t)/255}function Fe(t){return parseInt(t,16)}function W0(t){return{r:t>>16,g:(t&65280)>>8,b:t&255}}const En={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function q0(t){let e={r:0,g:0,b:0},r=1,i=null,s=null,a=null,o=!1,n=!1;return typeof t=="string"&&(t=K0(t)),typeof t=="object"&&(Pe(t.r)&&Pe(t.g)&&Pe(t.b)?(e=N0(t.r,t.g,t.b),o=!0,n=String(t.r).substr(-1)==="%"?"prgb":"rgb"):Pe(t.h)&&Pe(t.s)&&Pe(t.v)?(i=va(t.s),s=va(t.v),e=B0(t.h,i,s),o=!0,n="hsv"):Pe(t.h)&&Pe(t.s)&&Pe(t.l)?(i=va(t.s),a=va(t.l),e=F0(t.h,i,a),o=!0,n="hsl"):Pe(t.c)&&Pe(t.m)&&Pe(t.y)&&Pe(t.k)&&(e=U0(t.c,t.m,t.y,t.k),o=!0,n="cmyk"),Object.prototype.hasOwnProperty.call(t,"a")&&(r=t.a)),r=jd(r),{ok:o,format:t.format||n,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:r}}const H0="[-\\+]?\\d+%?",j0="[-\\+]?\\d*\\.\\d+%?",Hr="(?:"+j0+")|(?:"+H0+")",en="[\\s|\\(]+("+Hr+")[,|\\s]+("+Hr+")[,|\\s]+("+Hr+")\\s*\\)?",ya="[\\s|\\(]+("+Hr+")[,|\\s]+("+Hr+")[,|\\s]+("+Hr+")[,|\\s]+("+Hr+")\\s*\\)?",je={CSS_UNIT:new RegExp(Hr),rgb:new RegExp("rgb"+en),rgba:new RegExp("rgba"+ya),hsl:new RegExp("hsl"+en),hsla:new RegExp("hsla"+ya),hsv:new RegExp("hsv"+en),hsva:new RegExp("hsva"+ya),cmyk:new RegExp("cmyk"+ya),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function K0(t){if(t=t.trim().toLowerCase(),t.length===0)return!1;let e=!1;if(En[t])t=En[t],e=!0;else if(t==="transparent")return{r:0,g:0,b:0,a:0,format:"name"};let r=je.rgb.exec(t);return r?{r:r[1],g:r[2],b:r[3]}:(r=je.rgba.exec(t),r?{r:r[1],g:r[2],b:r[3],a:r[4]}:(r=je.hsl.exec(t),r?{h:r[1],s:r[2],l:r[3]}:(r=je.hsla.exec(t),r?{h:r[1],s:r[2],l:r[3],a:r[4]}:(r=je.hsv.exec(t),r?{h:r[1],s:r[2],v:r[3]}:(r=je.hsva.exec(t),r?{h:r[1],s:r[2],v:r[3],a:r[4]}:(r=je.cmyk.exec(t),r?{c:r[1],m:r[2],y:r[3],k:r[4]}:(r=je.hex8.exec(t),r?{r:Fe(r[1]),g:Fe(r[2]),b:Fe(r[3]),a:kc(r[4]),format:e?"name":"hex8"}:(r=je.hex6.exec(t),r?{r:Fe(r[1]),g:Fe(r[2]),b:Fe(r[3]),format:e?"name":"hex"}:(r=je.hex4.exec(t),r?{r:Fe(r[1]+r[1]),g:Fe(r[2]+r[2]),b:Fe(r[3]+r[3]),a:kc(r[4]+r[4]),format:e?"name":"hex8"}:(r=je.hex3.exec(t),r?{r:Fe(r[1]+r[1]),g:Fe(r[2]+r[2]),b:Fe(r[3]+r[3]),format:e?"name":"hex"}:!1))))))))))}function Pe(t){return typeof t=="number"?!Number.isNaN(t):je.CSS_UNIT.test(t)}class Wt{constructor(e="",r={}){if(e instanceof Wt)return e;typeof e=="number"&&(e=W0(e)),this.originalInput=e;const i=q0(e);this.originalInput=e,this.r=i.r,this.g=i.g,this.b=i.b,this.a=i.a,this.roundA=Math.round(100*this.a)/100,this.format=r.format??i.format,this.gradientType=r.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=i.ok}isDark(){return this.getBrightness()<128}isLight(){return!this.isDark()}getBrightness(){const e=this.toRgb();return(e.r*299+e.g*587+e.b*114)/1e3}getLuminance(){const e=this.toRgb();let r,i,s;const a=e.r/255,o=e.g/255,n=e.b/255;return a<=.03928?r=a/12.92:r=Math.pow((a+.055)/1.055,2.4),o<=.03928?i=o/12.92:i=Math.pow((o+.055)/1.055,2.4),n<=.03928?s=n/12.92:s=Math.pow((n+.055)/1.055,2.4),.2126*r+.7152*i+.0722*s}getAlpha(){return this.a}setAlpha(e){return this.a=jd(e),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){const{s:e}=this.toHsl();return e===0}toHsv(){const e=vc(this.r,this.g,this.b);return{h:e.h*360,s:e.s,v:e.v,a:this.a}}toHsvString(){const e=vc(this.r,this.g,this.b),r=Math.round(e.h*360),i=Math.round(e.s*100),s=Math.round(e.v*100);return this.a===1?`hsv(${r}, ${i}%, ${s}%)`:`hsva(${r}, ${i}%, ${s}%, ${this.roundA})`}toHsl(){const e=wc(this.r,this.g,this.b);return{h:e.h*360,s:e.s,l:e.l,a:this.a}}toHslString(){const e=wc(this.r,this.g,this.b),r=Math.round(e.h*360),i=Math.round(e.s*100),s=Math.round(e.l*100);return this.a===1?`hsl(${r}, ${i}%, ${s}%)`:`hsla(${r}, ${i}%, ${s}%, ${this.roundA})`}toHex(e=!1){return yc(this.r,this.g,this.b,e)}toHexString(e=!1){return"#"+this.toHex(e)}toHex8(e=!1){return M0(this.r,this.g,this.b,this.a,e)}toHex8String(e=!1){return"#"+this.toHex8(e)}toHexShortString(e=!1){return this.a===1?this.toHexString(e):this.toHex8String(e)}toRgb(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){const e=Math.round(this.r),r=Math.round(this.g),i=Math.round(this.b);return this.a===1?`rgb(${e}, ${r}, ${i})`:`rgba(${e}, ${r}, ${i}, ${this.roundA})`}toPercentageRgb(){const e=r=>`${Math.round(ne(r,255)*100)}%`;return{r:e(this.r),g:e(this.g),b:e(this.b),a:this.a}}toPercentageRgbString(){const e=r=>Math.round(ne(r,255)*100);return this.a===1?`rgb(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%)`:`rgba(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%, ${this.roundA})`}toCmyk(){return{...xc(this.r,this.g,this.b)}}toCmykString(){const{c:e,m:r,y:i,k:s}=xc(this.r,this.g,this.b);return`cmyk(${e}, ${r}, ${i}, ${s})`}toName(){if(this.a===0)return"transparent";if(this.a<1)return!1;const e="#"+yc(this.r,this.g,this.b,!1);for(const[r,i]of Object.entries(En))if(e===i)return r;return!1}toString(e){const r=!!e;e=e??this.format;let i=!1;const s=this.a<1&&this.a>=0;return!r&&s&&(e.startsWith("hex")||e==="name")?e==="name"&&this.a===0?this.toName():this.toRgbString():(e==="rgb"&&(i=this.toRgbString()),e==="prgb"&&(i=this.toPercentageRgbString()),(e==="hex"||e==="hex6")&&(i=this.toHexString()),e==="hex3"&&(i=this.toHexString(!0)),e==="hex4"&&(i=this.toHex8String(!0)),e==="hex8"&&(i=this.toHex8String()),e==="name"&&(i=this.toName()),e==="hsl"&&(i=this.toHslString()),e==="hsv"&&(i=this.toHsvString()),e==="cmyk"&&(i=this.toCmykString()),i||this.toHexString())}toNumber(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new Wt(this.toString())}lighten(e=10){const r=this.toHsl();return r.l+=e/100,r.l=wa(r.l),new Wt(r)}brighten(e=10){const r=this.toRgb();return r.r=Math.max(0,Math.min(255,r.r-Math.round(255*-(e/100)))),r.g=Math.max(0,Math.min(255,r.g-Math.round(255*-(e/100)))),r.b=Math.max(0,Math.min(255,r.b-Math.round(255*-(e/100)))),new Wt(r)}darken(e=10){const r=this.toHsl();return r.l-=e/100,r.l=wa(r.l),new Wt(r)}tint(e=10){return this.mix("white",e)}shade(e=10){return this.mix("black",e)}desaturate(e=10){const r=this.toHsl();return r.s-=e/100,r.s=wa(r.s),new Wt(r)}saturate(e=10){const r=this.toHsl();return r.s+=e/100,r.s=wa(r.s),new Wt(r)}greyscale(){return this.desaturate(100)}spin(e){const r=this.toHsl(),i=(r.h+e)%360;return r.h=i<0?360+i:i,new Wt(r)}mix(e,r=50){const i=this.toRgb(),s=new Wt(e).toRgb(),a=r/100,o={r:(s.r-i.r)*a+i.r,g:(s.g-i.g)*a+i.g,b:(s.b-i.b)*a+i.b,a:(s.a-i.a)*a+i.a};return new Wt(o)}analogous(e=6,r=30){const i=this.toHsl(),s=360/r,a=[this];for(i.h=(i.h-(s*e>>1)+720)%360;--e;)i.h=(i.h+s)%360,a.push(new Wt(i));return a}complement(){const e=this.toHsl();return e.h=(e.h+180)%360,new Wt(e)}monochromatic(e=6){const r=this.toHsv(),{h:i}=r,{s}=r;let{v:a}=r;const o=[],n=1/e;for(;e--;)o.push(new Wt({h:i,s,v:a})),a=(a+n)%1;return o}splitcomplement(){const e=this.toHsl(),{h:r}=e;return[this,new Wt({h:(r+72)%360,s:e.s,l:e.l}),new Wt({h:(r+216)%360,s:e.s,l:e.l})]}onBackground(e){const r=this.toRgb(),i=new Wt(e).toRgb(),s=r.a+i.a*(1-r.a);return new Wt({r:(r.r*r.a+i.r*i.a*(1-r.a))/s,g:(r.g*r.a+i.g*i.a*(1-r.a))/s,b:(r.b*r.a+i.b*i.a*(1-r.a))/s,a:s})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(e){const r=this.toHsl(),{h:i}=r,s=[this],a=360/e;for(let o=1;o<e;o++)s.push(new Wt({h:(i+o*a)%360,s:r.s,l:r.l}));return s}equals(e){const r=new Wt(e);return this.format==="cmyk"||r.format==="cmyk"?this.toCmykString()===r.toCmykString():this.toRgbString()===r.toRgbString()}}var mt=class extends Ft{constructor(){super(),this.hasSlotController=new Ie(this,"hint","label"),this.isSafeValue=!1,this.localize=new Et(this),this.hasFocus=!1,this.isDraggingGridHandle=!1,this.isEmpty=!0,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this._value=null,this.defaultValue=this.getAttribute("value")||null,this.withLabel=!1,this.withHint=!1,this.hasEyeDropper=!1,this.label="",this.hint="",this.format="hex",this.size="medium",this.withoutFormatToggle=!1,this.name=null,this.disabled=!1,this.open=!1,this.opacity=!1,this.uppercase=!1,this.swatches="",this.required=!1,this.handleFocusIn=()=>{this.hasFocus=!0},this.handleFocusOut=()=>{this.hasFocus=!1},this.reportValidityAfterShow=()=>{this.removeEventListener("invalid",this.emitInvalid),this.reportValidity(),this.addEventListener("invalid",this.emitInvalid)},this.handleKeyDown=t=>{this.open&&t.key==="Escape"&&Sr(this)&&(t.stopPropagation(),this.hide(),this.focus())},this.handleDocumentKeyDown=t=>{if(t.key==="Escape"&&this.open&&Sr(this)){t.stopPropagation(),this.focus(),this.hide();return}t.key==="Tab"&&setTimeout(()=>{const e=this.getRootNode()instanceof ShadowRoot?document.activeElement?.shadowRoot?.activeElement:document.activeElement;(!this||e?.closest(this.tagName.toLowerCase())!==this)&&this.hide()})},this.handleDocumentMouseDown=t=>{const r=t.composedPath().some(i=>i instanceof Element&&(i.closest(".color-picker")||i===this.trigger));this&&!r&&this.hide()},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut)}static get validators(){const t=[vo()];return[...super.validators,...t]}get validationTarget(){return this.popup?.active?this.input:this.trigger}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("preview-color-copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("preview-color-copied")})}handleFormatToggle(){const t=["hex","rgb","hsl","hsv"],e=(t.indexOf(this.format)+1)%t.length;this.format=t[e],this.setColor(this.value||""),this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})}handleAlphaDrag(t){const e=this.shadowRoot.querySelector(".slider.alpha"),r=e.querySelector(".slider-handle"),{width:i}=e.getBoundingClientRect();let s=this.value,a=this.value;r.focus(),t.preventDefault(),qs(e,{onMove:o=>{this.alpha=vt(o/i*100,0,100),this.syncValues(),this.value!==a&&(a=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))},onStop:()=>{this.value!==s&&(s=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))},initialEvent:t})}handleHueDrag(t){const e=this.shadowRoot.querySelector(".slider.hue"),r=e.querySelector(".slider-handle"),{width:i}=e.getBoundingClientRect();let s=this.value,a=this.value;r.focus(),t.preventDefault(),qs(e,{onMove:o=>{this.hue=vt(o/i*360,0,360),this.syncValues(),this.value!==a&&(a=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input"))}))},onStop:()=>{this.value!==s&&(s=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))},initialEvent:t})}handleGridDrag(t){const e=this.shadowRoot.querySelector(".grid"),r=e.querySelector(".grid-handle"),{width:i,height:s}=e.getBoundingClientRect();let a=this.value,o=this.value;r.focus(),t.preventDefault(),this.isDraggingGridHandle=!0,qs(e,{onMove:(n,l)=>{this.saturation=vt(n/i*100,0,100),this.brightness=vt(100-l/s*100,0,100),this.syncValues(),this.value!==o&&(o=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))},onStop:()=>{this.isDraggingGridHandle=!1,this.value!==a&&(a=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))},initialEvent:t})}handleAlphaKeyDown(t){const e=t.shiftKey?10:1,r=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.alpha=vt(this.alpha-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.alpha=vt(this.alpha+e,0,100),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.alpha=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.alpha=100,this.syncValues()),this.value!==r&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleHueKeyDown(t){const e=t.shiftKey?10:1,r=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.hue=vt(this.hue-e,0,360),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.hue=vt(this.hue+e,0,360),this.syncValues()),t.key==="Home"&&(t.preventDefault(),this.hue=0,this.syncValues()),t.key==="End"&&(t.preventDefault(),this.hue=360,this.syncValues()),this.value!==r&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleGridKeyDown(t){const e=t.shiftKey?10:1,r=this.value;t.key==="ArrowLeft"&&(t.preventDefault(),this.saturation=vt(this.saturation-e,0,100),this.syncValues()),t.key==="ArrowRight"&&(t.preventDefault(),this.saturation=vt(this.saturation+e,0,100),this.syncValues()),t.key==="ArrowUp"&&(t.preventDefault(),this.brightness=vt(this.brightness+e,0,100),this.syncValues()),t.key==="ArrowDown"&&(t.preventDefault(),this.brightness=vt(this.brightness-e,0,100),this.syncValues()),this.value!==r&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleInputChange(t){const e=t.target,r=this.value;t.stopPropagation(),this.input.value?(this.setColor(e.value),e.value=this.value||""):this.value="",this.value!==r&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleInputInput(t){this.updateValidity(),t.stopPropagation()}handleInputKeyDown(t){if(t.key==="Enter"){const e=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==e&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),setTimeout(()=>this.input.select())):this.hue=0}}handleTouchMove(t){t.preventDefault()}parseColor(t){if(!t||t.trim()==="")return null;const e=new Wt(t);if(!e.isValid)return null;const r=e.toHsl(),i=e.toRgb(),s=e.toHsv();if(!i||i.r==null||i.g==null||i.b==null)return null;const a={h:r.h||0,s:(r.s||0)*100,l:(r.l||0)*100,a:r.a||0},o=e.toHexString(),n=e.toHex8String(),l={h:s.h||0,s:(s.s||0)*100,v:(s.v||0)*100,a:s.a||0};return{hsl:{h:a.h,s:a.s,l:a.l,string:this.setLetterCase(`hsl(${Math.round(a.h)}, ${Math.round(a.s)}%, ${Math.round(a.l)}%)`)},hsla:{h:a.h,s:a.s,l:a.l,a:a.a,string:this.setLetterCase(`hsla(${Math.round(a.h)}, ${Math.round(a.s)}%, ${Math.round(a.l)}%, ${a.a.toFixed(2).toString()})`)},hsv:{h:l.h,s:l.s,v:l.v,string:this.setLetterCase(`hsv(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%)`)},hsva:{h:l.h,s:l.s,v:l.v,a:l.a,string:this.setLetterCase(`hsva(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%, ${l.a.toFixed(2).toString()})`)},rgb:{r:i.r,g:i.g,b:i.b,string:this.setLetterCase(`rgb(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)})`)},rgba:{r:i.r,g:i.g,b:i.b,a:i.a||0,string:this.setLetterCase(`rgba(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)}, ${(i.a||0).toFixed(2).toString()})`)},hex:this.setLetterCase(o),hexa:this.setLetterCase(n)}}setColor(t){const e=this.parseColor(t);return e===null?!1:(this.hue=e.hsva.h,this.saturation=e.hsva.s,this.brightness=e.hsva.v,this.alpha=this.opacity?e.hsva.a*100:100,this.syncValues(),!0)}setLetterCase(t){return typeof t!="string"?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){const t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);t!==null&&(this.format==="hsl"?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?t.hsva.string:t.hsv.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=!0,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=!1)}handleAfterHide(){this.previewButton.classList.remove("preview-color-copied"),this.updateValidity()}handleAfterShow(){this.updateValidity()}handleEyeDropper(){if(!this.hasEyeDropper)return;new EyeDropper().open().then(e=>{const r=this.value;this.setColor(e.sRGBHex),this.value!==r&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}).catch(()=>{})}selectSwatch(t){const e=this.value;this.disabled||(this.setColor(t),this.value!==e&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getHexString(t,e,r,i=100){const s=new Wt(`hsva(${t}, ${e}%, ${r}%, ${i/100})`);return s.isValid?s.toHex8String():""}stopNestedEventPropagation(t){t.stopImmediatePropagation()}handleFormatChange(){this.syncValues()}handleOpacityChange(){this.alpha=100}willUpdate(t){super.willUpdate(t),t.has("value")&&this.handleValueChange(t.get("value")||"",this.value||"")}handleValueChange(t,e){if(this.isEmpty=!e,e||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){const r=this.parseColor(e);r!==null?(this.inputValue=this.value||"",this.hue=r.hsva.h,this.saturation=r.hsva.s,this.brightness=r.hsva.v,this.alpha=r.hsva.a*100,this.syncValues()):this.inputValue=t??""}this.requestUpdate()}focus(t){this.trigger.focus(t)}blur(){const t=this.trigger;this.hasFocus&&(t.focus({preventScroll:!0}),t.blur()),this.popup?.active&&this.hide()}getFormattedValue(t="hex"){const e=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(e===null)return"";switch(t){case"hex":return e.hex;case"hexa":return e.hexa;case"rgb":return e.rgb.string;case"rgba":return e.rgba.string;case"hsl":return e.hsl.string;case"hsla":return e.hsla.string;case"hsv":return e.hsv.string;case"hsva":return e.hsva.string;default:return""}}reportValidity(){return!this.validity.valid&&!this.open?(this.addEventListener("wa-after-show",this.reportValidityAfterShow,{once:!0}),this.show(),this.disabled||this.dispatchEvent(new ml),!1):super.reportValidity()}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}firstUpdated(t){super.firstUpdated(t),this.hasEyeDropper="EyeDropper"in window}handleTriggerClick(){this.open?this.hide():(this.show(),this.focus())}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault()}updateAccessibleTrigger(){const t=this.trigger;t&&(t.setAttribute("aria-haspopup","true"),t.setAttribute("aria-expanded",this.open?"true":"false"))}async show(){if(!this.open)return this.open=!0,nr(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,nr(this,"wa-after-hide")}addOpenListeners(){this.base.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),Oi(this)}removeOpenListeners(){this.base&&this.base.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),Cr(this)}async handleOpenChange(){if(this.disabled){this.open=!1;return}this.updateAccessibleTrigger(),this.open?(this.dispatchEvent(new CustomEvent("wa-show")),this.addOpenListeners(),await this.updateComplete,this.base.hidden=!1,this.popup.active=!0,await Mt(this.popup.popup,"show-with-scale"),this.dispatchEvent(new CustomEvent("wa-after-show"))):(this.dispatchEvent(new CustomEvent("wa-hide")),this.removeOpenListeners(),await Mt(this.popup.popup,"hide-with-scale"),this.base.hidden=!0,this.popup.active=!1,this.dispatchEvent(new CustomEvent("wa-after-hide")))}render(){const t=this.hasUpdated?this.withLabel||this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.withHint||this.hasSlotController.test("hint"):this.withHint,r=this.label?!0:!!t,i=this.hint?!0:!!e,s=this.saturation,a=100-this.brightness,o=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(l=>l.trim()!==""),n=$`
      <div
        part="base"
        class=${pt({"color-picker":!0})}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex="-1"
      >
        <div
          part="grid"
          class="grid"
          style=${Vt({backgroundColor:this.getHexString(this.hue,100,100)})}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${pt({"grid-handle":!0,"grid-handle-dragging":this.isDraggingGridHandle})}
            style=${Vt({top:`${a}%`,left:`${s}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            role="application"
            aria-label="HSV"
            tabindex=${st(this.disabled?void 0:"0")}
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
                style=${Vt({left:`${this.hue===0?0:100/(360/this.hue)}%`,backgroundColor:this.getHexString(this.hue,100,100)})}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${st(this.disabled?void 0:"0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity?$`
                  <div
                    part="slider opacity-slider"
                    class="alpha slider transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="alpha-gradient"
                      style=${Vt({backgroundImage:`linear-gradient(
                          to right,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,0)} 0%,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,100)} 100%
                        )`})}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="slider-handle"
                      style=${Vt({left:`${this.alpha}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${st(this.disabled?void 0:"0")}
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
            style=${Vt({"--preview-color":this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
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
            ${this.withoutFormatToggle?"":$`
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
            ${this.hasEyeDropper?$`
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

        ${o.length>0?$`
              <div part="swatches" class="swatches">
                ${o.map(l=>{const d=this.parseColor(l);return d?$`
                    <div
                      part="swatch"
                      class="swatch transparent-bg"
                      tabindex=${st(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${l}
                      @click=${()=>this.selectSwatch(l)}
                      @keydown=${h=>!this.disabled&&h.key==="Enter"&&this.setColor(d.hexa)}
                    >
                      <div class="swatch-color" style=${Vt({backgroundColor:d.hexa})}></div>
                    </div>
                  `:""})}
              </div>
            `:""}
      </div>
    `;return $`
      <div
        class=${pt({container:!0,"form-control":!0,"form-control-has-label":r})}
        part="trigger-container form-control"
      >
        <div
          part="form-control-label"
          class=${pt({label:!0,"has-label":r})}
          id="form-control-label"
        >
          <slot name="label">${this.label}</slot>
        </div>

        <button
          id="trigger"
          part="trigger form-control-input"
          class=${pt({trigger:!0,"trigger-empty":this.isEmpty,"transparent-bg":!0,"form-control-input":!0})}
          style=${Vt({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
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
          class=${pt({"has-slotted":i})}
          >${this.hint}</slot
        >
      </div>

      <wa-popup
        class="color-popup"
        anchor="trigger"
        placement="bottom-start"
        distance="0"
        skidding="0"
        flip
        flip-fallback-strategy="best-fit"
        shift
        shift-padding="10"
        aria-disabled=${this.disabled?"true":"false"}
        @wa-after-show=${this.handleAfterShow}
        @wa-after-hide=${this.handleAfterHide}
      >
        ${n}
      </wa-popup>
    `}};mt.css=[Hd,we,Ar,I0];mt.shadowRootOptions={...Ft.shadowRootOptions,delegatesFocus:!0};c([Q('[part~="base"]')],mt.prototype,"base",2);c([Q('[part~="input"]')],mt.prototype,"input",2);c([Q('[part~="form-control-label"]')],mt.prototype,"triggerLabel",2);c([Q('[part~="form-control-input"]')],mt.prototype,"triggerButton",2);c([Q(".color-popup")],mt.prototype,"popup",2);c([Q('[part~="preview"]')],mt.prototype,"previewButton",2);c([Q('[part~="trigger"]')],mt.prototype,"trigger",2);c([Z()],mt.prototype,"hasFocus",2);c([Z()],mt.prototype,"isDraggingGridHandle",2);c([Z()],mt.prototype,"isEmpty",2);c([Z()],mt.prototype,"inputValue",2);c([Z()],mt.prototype,"hue",2);c([Z()],mt.prototype,"saturation",2);c([Z()],mt.prototype,"brightness",2);c([Z()],mt.prototype,"alpha",2);c([Z()],mt.prototype,"value",1);c([p({attribute:"value",reflect:!0})],mt.prototype,"defaultValue",2);c([p({attribute:"with-label",reflect:!0,type:Boolean})],mt.prototype,"withLabel",2);c([p({attribute:"with-hint",reflect:!0,type:Boolean})],mt.prototype,"withHint",2);c([Z()],mt.prototype,"hasEyeDropper",2);c([p()],mt.prototype,"label",2);c([p({attribute:"hint"})],mt.prototype,"hint",2);c([p()],mt.prototype,"format",2);c([p({reflect:!0})],mt.prototype,"size",2);c([p({attribute:"without-format-toggle",type:Boolean})],mt.prototype,"withoutFormatToggle",2);c([p({reflect:!0})],mt.prototype,"name",2);c([p({type:Boolean})],mt.prototype,"disabled",2);c([p({type:Boolean,reflect:!0})],mt.prototype,"open",2);c([p({type:Boolean})],mt.prototype,"opacity",2);c([p({type:Boolean})],mt.prototype,"uppercase",2);c([p()],mt.prototype,"swatches",2);c([p({type:Boolean,reflect:!0})],mt.prototype,"required",2);c([co({passive:!1})],mt.prototype,"handleTouchMove",1);c([tt("format",{waitUntilFirstUpdate:!0})],mt.prototype,"handleFormatChange",1);c([tt("opacity")],mt.prototype,"handleOpacityChange",1);c([tt("value")],mt.prototype,"handleValueChange",1);c([tt("open",{waitUntilFirstUpdate:!0})],mt.prototype,"handleOpenChange",1);mt=c([X("wa-color-picker")],mt);var Kd=class extends Event{constructor(){super("wa-clear",{bubbles:!0,cancelable:!1,composed:!0})}};function gl(t,e){const r=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!r&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&G0(e)})}function G0(t){let e=null;if("form"in t&&(e=t.form),!e&&"getForm"in t&&(e=t.getForm()),!e)return;const r=[...e.elements];if(r.length===1){e.requestSubmit(null);return}const i=r.find(s=>s.type==="submit"&&!s.matches(":disabled"));i&&(["input","button"].includes(i.localName)?e.requestSubmit(i):i.click())}var Z0=J`
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
`;var wt=class extends Ft{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new Ie(this,"hint","label"),this.localize=new Et(this),this.title="",this.type="text",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="medium",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.withClear=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.withoutSpinButtons=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,na()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}handleChange(t){this.value=this.input.value,this.relayNativeEvent(t,{bubbles:!0,composed:!0})}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.updateComplete.then(()=>{this.dispatchEvent(new Kd),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})),this.input.focus()}handleInput(){this.value=this.input.value}handleKeyDown(t){gl(t,this)}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}updated(t){super.updated(t),(t.has("value")||t.has("defaultValue"))&&(this.customStates.set("blank",!this.value),this.updateValidity())}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,r="none"){this.input.setSelectionRange(t,e,r)}setRangeText(t,e,r,i="preserve"){const s=e??this.input.selectionStart,a=r??this.input.selectionEnd;this.input.setRangeText(t,s,a,i),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=null,this.input&&(this.input.value=this.value),super.formResetCallback()}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,r=this.label?!0:!!t,i=this.hint?!0:!!e,s=this.withClear&&!this.disabled&&!this.readonly,a=this.hasUpdated&&s&&(typeof this.value=="number"||this.value&&this.value.length>0);return $`
      <label
        part="form-control-label label"
        class=${pt({label:!0,"has-label":r})}
        for="input"
        aria-hidden=${r?"false":"true"}
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
          name=${st(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${st(this.placeholder)}
          minlength=${st(this.minlength)}
          maxlength=${st(this.maxlength)}
          min=${st(this.min)}
          max=${st(this.max)}
          step=${st(this.step)}
          .value=${Ei(this.value??"")}
          autocapitalize=${st(this.autocapitalize)}
          autocomplete=${st(this.autocomplete)}
          autocorrect=${st(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${st(this.pattern)}
          enterkeyhint=${st(this.enterkeyhint)}
          inputmode=${st(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        ${a?$`
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
        ${this.passwordToggle&&!this.disabled?$`
              <button
                part="password-toggle-button"
                class="password-toggle"
                type="button"
                aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                @click=${this.handlePasswordToggle}
                tabindex="-1"
              >
                ${this.passwordVisible?$`
                      <slot name="hide-password-icon">
                        <wa-icon name="eye-slash" library="system" variant="regular"></wa-icon>
                      </slot>
                    `:$`
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
        class=${pt({"has-slotted":i})}
        aria-hidden=${i?"false":"true"}
        >${this.hint}</slot
      >
    `}};wt.css=[we,Ar,Z0];wt.shadowRootOptions={...Ft.shadowRootOptions,delegatesFocus:!0};c([Q("input")],wt.prototype,"input",2);c([p()],wt.prototype,"title",2);c([p({reflect:!0})],wt.prototype,"type",2);c([Z()],wt.prototype,"value",1);c([p({attribute:"value",reflect:!0})],wt.prototype,"defaultValue",2);c([p({reflect:!0})],wt.prototype,"size",2);c([p({reflect:!0})],wt.prototype,"appearance",2);c([p({type:Boolean,reflect:!0})],wt.prototype,"pill",2);c([p()],wt.prototype,"label",2);c([p({attribute:"hint"})],wt.prototype,"hint",2);c([p({attribute:"with-clear",type:Boolean})],wt.prototype,"withClear",2);c([p()],wt.prototype,"placeholder",2);c([p({type:Boolean,reflect:!0})],wt.prototype,"readonly",2);c([p({attribute:"password-toggle",type:Boolean})],wt.prototype,"passwordToggle",2);c([p({attribute:"password-visible",type:Boolean})],wt.prototype,"passwordVisible",2);c([p({attribute:"without-spin-buttons",type:Boolean})],wt.prototype,"withoutSpinButtons",2);c([p({type:Boolean,reflect:!0})],wt.prototype,"required",2);c([p()],wt.prototype,"pattern",2);c([p({type:Number})],wt.prototype,"minlength",2);c([p({type:Number})],wt.prototype,"maxlength",2);c([p()],wt.prototype,"min",2);c([p()],wt.prototype,"max",2);c([p()],wt.prototype,"step",2);c([p()],wt.prototype,"autocapitalize",2);c([p()],wt.prototype,"autocorrect",2);c([p()],wt.prototype,"autocomplete",2);c([p({type:Boolean})],wt.prototype,"autofocus",2);c([p()],wt.prototype,"enterkeyhint",2);c([p({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],wt.prototype,"spellcheck",2);c([p()],wt.prototype,"inputmode",2);c([p({attribute:"with-label",type:Boolean})],wt.prototype,"withLabel",2);c([p({attribute:"with-hint",type:Boolean})],wt.prototype,"withHint",2);c([tt("step",{waitUntilFirstUpdate:!0})],wt.prototype,"handleStepChange",1);wt=c([X("wa-input")],wt);var Gd=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};var X0=J`
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
`;const ii=Math.min,Be=Math.max,Za=Math.round,xa=Math.floor,yr=t=>({x:t,y:t}),Y0={left:"right",right:"left",bottom:"top",top:"bottom"};function An(t,e,r){return Be(t,ii(e,r))}function gs(t,e){return typeof t=="function"?t(e):t}function si(t){return t.split("-")[0]}function bs(t){return t.split("-")[1]}function Zd(t){return t==="x"?"y":"x"}function bl(t){return t==="y"?"height":"width"}function Rr(t){const e=t[0];return e==="t"||e==="b"?"y":"x"}function wl(t){return Zd(Rr(t))}function Q0(t,e,r){r===void 0&&(r=!1);const i=bs(t),s=wl(t),a=bl(s);let o=s==="x"?i===(r?"end":"start")?"right":"left":i==="start"?"bottom":"top";return e.reference[a]>e.floating[a]&&(o=Xa(o)),[o,Xa(o)]}function J0(t){const e=Xa(t);return[Ln(t),e,Ln(e)]}function Ln(t){return t.includes("start")?t.replace("start","end"):t.replace("end","start")}const Cc=["left","right"],Sc=["right","left"],tb=["top","bottom"],eb=["bottom","top"];function rb(t,e,r){switch(t){case"top":case"bottom":return r?e?Sc:Cc:e?Cc:Sc;case"left":case"right":return e?tb:eb;default:return[]}}function ib(t,e,r,i){const s=bs(t);let a=rb(si(t),r==="start",i);return s&&(a=a.map(o=>o+"-"+s),e&&(a=a.concat(a.map(Ln)))),a}function Xa(t){const e=si(t);return Y0[e]+t.slice(e.length)}function sb(t){return{top:0,right:0,bottom:0,left:0,...t}}function Xd(t){return typeof t!="number"?sb(t):{top:t,right:t,bottom:t,left:t}}function Ya(t){const{x:e,y:r,width:i,height:s}=t;return{width:i,height:s,top:r,left:e,right:e+i,bottom:r+s,x:e,y:r}}function $c(t,e,r){let{reference:i,floating:s}=t;const a=Rr(e),o=wl(e),n=bl(o),l=si(e),d=a==="y",h=i.x+i.width/2-s.width/2,f=i.y+i.height/2-s.height/2,g=i[n]/2-s[n]/2;let u;switch(l){case"top":u={x:h,y:i.y-s.height};break;case"bottom":u={x:h,y:i.y+i.height};break;case"right":u={x:i.x+i.width,y:f};break;case"left":u={x:i.x-s.width,y:f};break;default:u={x:i.x,y:i.y}}switch(bs(e)){case"start":u[o]-=g*(r&&d?-1:1);break;case"end":u[o]+=g*(r&&d?-1:1);break}return u}async function ab(t,e){var r;e===void 0&&(e={});const{x:i,y:s,platform:a,rects:o,elements:n,strategy:l}=t,{boundary:d="clippingAncestors",rootBoundary:h="viewport",elementContext:f="floating",altBoundary:g=!1,padding:u=0}=gs(e,t),v=Xd(u),x=n[g?f==="floating"?"reference":"floating":f],y=Ya(await a.getClippingRect({element:(r=await(a.isElement==null?void 0:a.isElement(x)))==null||r?x:x.contextElement||await(a.getDocumentElement==null?void 0:a.getDocumentElement(n.floating)),boundary:d,rootBoundary:h,strategy:l})),k=f==="floating"?{x:i,y:s,width:o.floating.width,height:o.floating.height}:o.reference,S=await(a.getOffsetParent==null?void 0:a.getOffsetParent(n.floating)),L=await(a.isElement==null?void 0:a.isElement(S))?await(a.getScale==null?void 0:a.getScale(S))||{x:1,y:1}:{x:1,y:1},E=Ya(a.convertOffsetParentRelativeRectToViewportRelativeRect?await a.convertOffsetParentRelativeRectToViewportRelativeRect({elements:n,rect:k,offsetParent:S,strategy:l}):k);return{top:(y.top-E.top+v.top)/L.y,bottom:(E.bottom-y.bottom+v.bottom)/L.y,left:(y.left-E.left+v.left)/L.x,right:(E.right-y.right+v.right)/L.x}}const ob=50,nb=async(t,e,r)=>{const{placement:i="bottom",strategy:s="absolute",middleware:a=[],platform:o}=r,n=o.detectOverflow?o:{...o,detectOverflow:ab},l=await(o.isRTL==null?void 0:o.isRTL(e));let d=await o.getElementRects({reference:t,floating:e,strategy:s}),{x:h,y:f}=$c(d,i,l),g=i,u=0;const v={};for(let b=0;b<a.length;b++){const x=a[b];if(!x)continue;const{name:y,fn:k}=x,{x:S,y:L,data:E,reset:R}=await k({x:h,y:f,initialPlacement:i,placement:g,strategy:s,middlewareData:v,rects:d,platform:n,elements:{reference:t,floating:e}});h=S??h,f=L??f,v[y]={...v[y],...E},R&&u<ob&&(u++,typeof R=="object"&&(R.placement&&(g=R.placement),R.rects&&(d=R.rects===!0?await o.getElementRects({reference:t,floating:e,strategy:s}):R.rects),{x:h,y:f}=$c(d,g,l)),b=-1)}return{x:h,y:f,placement:g,strategy:s,middlewareData:v}},lb=t=>({name:"arrow",options:t,async fn(e){const{x:r,y:i,placement:s,rects:a,platform:o,elements:n,middlewareData:l}=e,{element:d,padding:h=0}=gs(t,e)||{};if(d==null)return{};const f=Xd(h),g={x:r,y:i},u=wl(s),v=bl(u),b=await o.getDimensions(d),x=u==="y",y=x?"top":"left",k=x?"bottom":"right",S=x?"clientHeight":"clientWidth",L=a.reference[v]+a.reference[u]-g[u]-a.floating[v],E=g[u]-a.reference[u],R=await(o.getOffsetParent==null?void 0:o.getOffsetParent(d));let I=R?R[S]:0;(!I||!await(o.isElement==null?void 0:o.isElement(R)))&&(I=n.floating[S]||a.floating[v]);const U=L/2-E/2,O=I/2-b[v]/2-1,q=ii(f[y],O),it=ii(f[k],O),A=q,F=I-b[v]-it,w=I/2-b[v]/2+U,B=An(A,w,F),ot=!l.arrow&&bs(s)!=null&&w!==B&&a.reference[v]/2-(w<A?q:it)-b[v]/2<0,V=ot?w<A?w-A:w-F:0;return{[u]:g[u]+V,data:{[u]:B,centerOffset:w-B-V,...ot&&{alignmentOffset:V}},reset:ot}}}),cb=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var r,i;const{placement:s,middlewareData:a,rects:o,initialPlacement:n,platform:l,elements:d}=e,{mainAxis:h=!0,crossAxis:f=!0,fallbackPlacements:g,fallbackStrategy:u="bestFit",fallbackAxisSideDirection:v="none",flipAlignment:b=!0,...x}=gs(t,e);if((r=a.arrow)!=null&&r.alignmentOffset)return{};const y=si(s),k=Rr(n),S=si(n)===n,L=await(l.isRTL==null?void 0:l.isRTL(d.floating)),E=g||(S||!b?[Xa(n)]:J0(n)),R=v!=="none";!g&&R&&E.push(...ib(n,b,v,L));const I=[n,...E],U=await l.detectOverflow(e,x),O=[];let q=((i=a.flip)==null?void 0:i.overflows)||[];if(h&&O.push(U[y]),f){const w=Q0(s,o,L);O.push(U[w[0]],U[w[1]])}if(q=[...q,{placement:s,overflows:O}],!O.every(w=>w<=0)){var it,A;const w=(((it=a.flip)==null?void 0:it.index)||0)+1,B=I[w];if(B&&(!(f==="alignment"?k!==Rr(B):!1)||q.every(ct=>Rr(ct.placement)===k?ct.overflows[0]>0:!0)))return{data:{index:w,overflows:q},reset:{placement:B}};let ot=(A=q.filter(V=>V.overflows[0]<=0).sort((V,ct)=>V.overflows[1]-ct.overflows[1])[0])==null?void 0:A.placement;if(!ot)switch(u){case"bestFit":{var F;const V=(F=q.filter(ct=>{if(R){const j=Rr(ct.placement);return j===k||j==="y"}return!0}).map(ct=>[ct.placement,ct.overflows.filter(j=>j>0).reduce((j,ut)=>j+ut,0)]).sort((ct,j)=>ct[1]-j[1])[0])==null?void 0:F[0];V&&(ot=V);break}case"initialPlacement":ot=n;break}if(s!==ot)return{reset:{placement:ot}}}return{}}}},db=new Set(["left","top"]);async function hb(t,e){const{placement:r,platform:i,elements:s}=t,a=await(i.isRTL==null?void 0:i.isRTL(s.floating)),o=si(r),n=bs(r),l=Rr(r)==="y",d=db.has(o)?-1:1,h=a&&l?-1:1,f=gs(e,t);let{mainAxis:g,crossAxis:u,alignmentAxis:v}=typeof f=="number"?{mainAxis:f,crossAxis:0,alignmentAxis:null}:{mainAxis:f.mainAxis||0,crossAxis:f.crossAxis||0,alignmentAxis:f.alignmentAxis};return n&&typeof v=="number"&&(u=n==="end"?v*-1:v),l?{x:u*h,y:g*d}:{x:g*d,y:u*h}}const ub=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var r,i;const{x:s,y:a,placement:o,middlewareData:n}=e,l=await hb(e,t);return o===((r=n.offset)==null?void 0:r.placement)&&(i=n.arrow)!=null&&i.alignmentOffset?{}:{x:s+l.x,y:a+l.y,data:{...l,placement:o}}}}},pb=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:r,y:i,placement:s,platform:a}=e,{mainAxis:o=!0,crossAxis:n=!1,limiter:l={fn:y=>{let{x:k,y:S}=y;return{x:k,y:S}}},...d}=gs(t,e),h={x:r,y:i},f=await a.detectOverflow(e,d),g=Rr(si(s)),u=Zd(g);let v=h[u],b=h[g];if(o){const y=u==="y"?"top":"left",k=u==="y"?"bottom":"right",S=v+f[y],L=v-f[k];v=An(S,v,L)}if(n){const y=g==="y"?"top":"left",k=g==="y"?"bottom":"right",S=b+f[y],L=b-f[k];b=An(S,b,L)}const x=l.fn({...e,[u]:v,[g]:b});return{...x,data:{x:x.x-r,y:x.y-i,enabled:{[u]:o,[g]:n}}}}}},fb=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var r,i;const{placement:s,rects:a,platform:o,elements:n}=e,{apply:l=()=>{},...d}=gs(t,e),h=await o.detectOverflow(e,d),f=si(s),g=bs(s),u=Rr(s)==="y",{width:v,height:b}=a.floating;let x,y;f==="top"||f==="bottom"?(x=f,y=g===(await(o.isRTL==null?void 0:o.isRTL(n.floating))?"start":"end")?"left":"right"):(y=f,x=g==="end"?"top":"bottom");const k=b-h.top-h.bottom,S=v-h.left-h.right,L=ii(b-h[x],k),E=ii(v-h[y],S),R=!e.middlewareData.shift;let I=L,U=E;if((r=e.middlewareData.shift)!=null&&r.enabled.x&&(U=S),(i=e.middlewareData.shift)!=null&&i.enabled.y&&(I=k),R&&!g){const q=Be(h.left,0),it=Be(h.right,0),A=Be(h.top,0),F=Be(h.bottom,0);u?U=v-2*(q!==0||it!==0?q+it:Be(h.left,h.right)):I=b-2*(A!==0||F!==0?A+F:Be(h.top,h.bottom))}await l({...e,availableWidth:U,availableHeight:I});const O=await o.getDimensions(n.floating);return v!==O.width||b!==O.height?{reset:{rects:!0}}:{}}}};function yo(){return typeof window<"u"}function ws(t){return Yd(t)?(t.nodeName||"").toLowerCase():"#document"}function Ue(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function Lr(t){var e;return(e=(Yd(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Yd(t){return yo()?t instanceof Node||t instanceof Ue(t).Node:!1}function lr(t){return yo()?t instanceof Element||t instanceof Ue(t).Element:!1}function Vr(t){return yo()?t instanceof HTMLElement||t instanceof Ue(t).HTMLElement:!1}function _c(t){return!yo()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof Ue(t).ShadowRoot}function la(t){const{overflow:e,overflowX:r,overflowY:i,display:s}=cr(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+r)&&s!=="inline"&&s!=="contents"}function mb(t){return/^(table|td|th)$/.test(ws(t))}function xo(t){try{if(t.matches(":popover-open"))return!0}catch{}try{return t.matches(":modal")}catch{return!1}}const gb=/transform|translate|scale|rotate|perspective|filter/,bb=/paint|layout|strict|content/,fi=t=>!!t&&t!=="none";let rn;function ko(t){const e=lr(t)?cr(t):t;return fi(e.transform)||fi(e.translate)||fi(e.scale)||fi(e.rotate)||fi(e.perspective)||!vl()&&(fi(e.backdropFilter)||fi(e.filter))||gb.test(e.willChange||"")||bb.test(e.contain||"")}function wb(t){let e=ai(t);for(;Vr(e)&&!is(e);){if(ko(e))return e;if(xo(e))return null;e=ai(e)}return null}function vl(){return rn==null&&(rn=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),rn}function is(t){return/^(html|body|#document)$/.test(ws(t))}function cr(t){return Ue(t).getComputedStyle(t)}function Co(t){return lr(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function ai(t){if(ws(t)==="html")return t;const e=t.assignedSlot||t.parentNode||_c(t)&&t.host||Lr(t);return _c(e)?e.host:e}function Qd(t){const e=ai(t);return is(e)?t.ownerDocument?t.ownerDocument.body:t.body:Vr(e)&&la(e)?e:Qd(e)}function ss(t,e,r){var i;e===void 0&&(e=[]),r===void 0&&(r=!0);const s=Qd(t),a=s===((i=t.ownerDocument)==null?void 0:i.body),o=Ue(s);if(a){const n=zn(o);return e.concat(o,o.visualViewport||[],la(s)?s:[],n&&r?ss(n):[])}else return e.concat(s,ss(s,[],r))}function zn(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Jd(t){const e=cr(t);let r=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const s=Vr(t),a=s?t.offsetWidth:r,o=s?t.offsetHeight:i,n=Za(r)!==a||Za(i)!==o;return n&&(r=a,i=o),{width:r,height:i,$:n}}function yl(t){return lr(t)?t:t.contextElement}function Zi(t){const e=yl(t);if(!Vr(e))return yr(1);const r=e.getBoundingClientRect(),{width:i,height:s,$:a}=Jd(e);let o=(a?Za(r.width):r.width)/i,n=(a?Za(r.height):r.height)/s;return(!o||!Number.isFinite(o))&&(o=1),(!n||!Number.isFinite(n))&&(n=1),{x:o,y:n}}const vb=yr(0);function th(t){const e=Ue(t);return!vl()||!e.visualViewport?vb:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function yb(t,e,r){return e===void 0&&(e=!1),!r||e&&r!==Ue(t)?!1:e}function Ai(t,e,r,i){e===void 0&&(e=!1),r===void 0&&(r=!1);const s=t.getBoundingClientRect(),a=yl(t);let o=yr(1);e&&(i?lr(i)&&(o=Zi(i)):o=Zi(t));const n=yb(a,r,i)?th(a):yr(0);let l=(s.left+n.x)/o.x,d=(s.top+n.y)/o.y,h=s.width/o.x,f=s.height/o.y;if(a){const g=Ue(a),u=i&&lr(i)?Ue(i):i;let v=g,b=zn(v);for(;b&&i&&u!==v;){const x=Zi(b),y=b.getBoundingClientRect(),k=cr(b),S=y.left+(b.clientLeft+parseFloat(k.paddingLeft))*x.x,L=y.top+(b.clientTop+parseFloat(k.paddingTop))*x.y;l*=x.x,d*=x.y,h*=x.x,f*=x.y,l+=S,d+=L,v=Ue(b),b=zn(v)}}return Ya({width:h,height:f,x:l,y:d})}function So(t,e){const r=Co(t).scrollLeft;return e?e.left+r:Ai(Lr(t)).left+r}function eh(t,e){const r=t.getBoundingClientRect(),i=r.left+e.scrollLeft-So(t,r),s=r.top+e.scrollTop;return{x:i,y:s}}function xb(t){let{elements:e,rect:r,offsetParent:i,strategy:s}=t;const a=s==="fixed",o=Lr(i),n=e?xo(e.floating):!1;if(i===o||n&&a)return r;let l={scrollLeft:0,scrollTop:0},d=yr(1);const h=yr(0),f=Vr(i);if((f||!f&&!a)&&((ws(i)!=="body"||la(o))&&(l=Co(i)),f)){const u=Ai(i);d=Zi(i),h.x=u.x+i.clientLeft,h.y=u.y+i.clientTop}const g=o&&!f&&!a?eh(o,l):yr(0);return{width:r.width*d.x,height:r.height*d.y,x:r.x*d.x-l.scrollLeft*d.x+h.x+g.x,y:r.y*d.y-l.scrollTop*d.y+h.y+g.y}}function kb(t){return Array.from(t.getClientRects())}function Cb(t){const e=Lr(t),r=Co(t),i=t.ownerDocument.body,s=Be(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),a=Be(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let o=-r.scrollLeft+So(t);const n=-r.scrollTop;return cr(i).direction==="rtl"&&(o+=Be(e.clientWidth,i.clientWidth)-s),{width:s,height:a,x:o,y:n}}const Ec=25;function Sb(t,e){const r=Ue(t),i=Lr(t),s=r.visualViewport;let a=i.clientWidth,o=i.clientHeight,n=0,l=0;if(s){a=s.width,o=s.height;const h=vl();(!h||h&&e==="fixed")&&(n=s.offsetLeft,l=s.offsetTop)}const d=So(i);if(d<=0){const h=i.ownerDocument,f=h.body,g=getComputedStyle(f),u=h.compatMode==="CSS1Compat"&&parseFloat(g.marginLeft)+parseFloat(g.marginRight)||0,v=Math.abs(i.clientWidth-f.clientWidth-u);v<=Ec&&(a-=v)}else d<=Ec&&(a+=d);return{width:a,height:o,x:n,y:l}}function $b(t,e){const r=Ai(t,!0,e==="fixed"),i=r.top+t.clientTop,s=r.left+t.clientLeft,a=Vr(t)?Zi(t):yr(1),o=t.clientWidth*a.x,n=t.clientHeight*a.y,l=s*a.x,d=i*a.y;return{width:o,height:n,x:l,y:d}}function Ac(t,e,r){let i;if(e==="viewport")i=Sb(t,r);else if(e==="document")i=Cb(Lr(t));else if(lr(e))i=$b(e,r);else{const s=th(t);i={x:e.x-s.x,y:e.y-s.y,width:e.width,height:e.height}}return Ya(i)}function rh(t,e){const r=ai(t);return r===e||!lr(r)||is(r)?!1:cr(r).position==="fixed"||rh(r,e)}function _b(t,e){const r=e.get(t);if(r)return r;let i=ss(t,[],!1).filter(n=>lr(n)&&ws(n)!=="body"),s=null;const a=cr(t).position==="fixed";let o=a?ai(t):t;for(;lr(o)&&!is(o);){const n=cr(o),l=ko(o);!l&&n.position==="fixed"&&(s=null),(a?!l&&!s:!l&&n.position==="static"&&!!s&&(s.position==="absolute"||s.position==="fixed")||la(o)&&!l&&rh(t,o))?i=i.filter(h=>h!==o):s=n,o=ai(o)}return e.set(t,i),i}function Eb(t){let{element:e,boundary:r,rootBoundary:i,strategy:s}=t;const o=[...r==="clippingAncestors"?xo(e)?[]:_b(e,this._c):[].concat(r),i],n=Ac(e,o[0],s);let l=n.top,d=n.right,h=n.bottom,f=n.left;for(let g=1;g<o.length;g++){const u=Ac(e,o[g],s);l=Be(u.top,l),d=ii(u.right,d),h=ii(u.bottom,h),f=Be(u.left,f)}return{width:d-f,height:h-l,x:f,y:l}}function Ab(t){const{width:e,height:r}=Jd(t);return{width:e,height:r}}function Lb(t,e,r){const i=Vr(e),s=Lr(e),a=r==="fixed",o=Ai(t,!0,a,e);let n={scrollLeft:0,scrollTop:0};const l=yr(0);function d(){l.x=So(s)}if(i||!i&&!a)if((ws(e)!=="body"||la(s))&&(n=Co(e)),i){const u=Ai(e,!0,a,e);l.x=u.x+e.clientLeft,l.y=u.y+e.clientTop}else s&&d();a&&!i&&s&&d();const h=s&&!i&&!a?eh(s,n):yr(0),f=o.left+n.scrollLeft-l.x-h.x,g=o.top+n.scrollTop-l.y-h.y;return{x:f,y:g,width:o.width,height:o.height}}function sn(t){return cr(t).position==="static"}function Lc(t,e){if(!Vr(t)||cr(t).position==="fixed")return null;if(e)return e(t);let r=t.offsetParent;return Lr(t)===r&&(r=r.ownerDocument.body),r}function ih(t,e){const r=Ue(t);if(xo(t))return r;if(!Vr(t)){let s=ai(t);for(;s&&!is(s);){if(lr(s)&&!sn(s))return s;s=ai(s)}return r}let i=Lc(t,e);for(;i&&mb(i)&&sn(i);)i=Lc(i,e);return i&&is(i)&&sn(i)&&!ko(i)?r:i||wb(t)||r}const zb=async function(t){const e=this.getOffsetParent||ih,r=this.getDimensions,i=await r(t.floating);return{reference:Lb(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}};function Tb(t){return cr(t).direction==="rtl"}const za={convertOffsetParentRelativeRectToViewportRelativeRect:xb,getDocumentElement:Lr,getClippingRect:Eb,getOffsetParent:ih,getElementRects:zb,getClientRects:kb,getDimensions:Ab,getScale:Zi,isElement:lr,isRTL:Tb};function sh(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function Rb(t,e){let r=null,i;const s=Lr(t);function a(){var n;clearTimeout(i),(n=r)==null||n.disconnect(),r=null}function o(n,l){n===void 0&&(n=!1),l===void 0&&(l=1),a();const d=t.getBoundingClientRect(),{left:h,top:f,width:g,height:u}=d;if(n||e(),!g||!u)return;const v=xa(f),b=xa(s.clientWidth-(h+g)),x=xa(s.clientHeight-(f+u)),y=xa(h),S={rootMargin:-v+"px "+-b+"px "+-x+"px "+-y+"px",threshold:Be(0,ii(1,l))||1};let L=!0;function E(R){const I=R[0].intersectionRatio;if(I!==l){if(!L)return o();I?o(!1,I):i=setTimeout(()=>{o(!1,1e-7)},1e3)}I===1&&!sh(d,t.getBoundingClientRect())&&o(),L=!1}try{r=new IntersectionObserver(E,{...S,root:s.ownerDocument})}catch{r=new IntersectionObserver(E,S)}r.observe(t)}return o(!0),a}function ah(t,e,r,i){i===void 0&&(i={});const{ancestorScroll:s=!0,ancestorResize:a=!0,elementResize:o=typeof ResizeObserver=="function",layoutShift:n=typeof IntersectionObserver=="function",animationFrame:l=!1}=i,d=yl(t),h=s||a?[...d?ss(d):[],...e?ss(e):[]]:[];h.forEach(y=>{s&&y.addEventListener("scroll",r,{passive:!0}),a&&y.addEventListener("resize",r)});const f=d&&n?Rb(d,r):null;let g=-1,u=null;o&&(u=new ResizeObserver(y=>{let[k]=y;k&&k.target===d&&u&&e&&(u.unobserve(e),cancelAnimationFrame(g),g=requestAnimationFrame(()=>{var S;(S=u)==null||S.observe(e)})),r()}),d&&!l&&u.observe(d),e&&u.observe(e));let v,b=l?Ai(t):null;l&&x();function x(){const y=Ai(t);b&&!sh(b,y)&&r(),b=y,v=requestAnimationFrame(x)}return r(),()=>{var y;h.forEach(k=>{s&&k.removeEventListener("scroll",r),a&&k.removeEventListener("resize",r)}),f?.(),(y=u)==null||y.disconnect(),u=null,l&&cancelAnimationFrame(v)}}const oh=ub,nh=pb,lh=cb,zc=fb,Db=lb,ch=(t,e,r)=>{const i=new Map,s={platform:za,...r},a={...s.platform,_c:i};return nb(t,e,{...s,platform:a})};function Ib(t){return Ob(t)}function an(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function Ob(t){for(let e=t;e;e=an(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=an(t);e;e=an(e)){if(!(e instanceof Element))continue;const r=getComputedStyle(e);if(r.display!=="contents"&&(r.position!=="static"||ko(r)||e.tagName==="BODY"))return e}return null}function Tc(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var ka=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),It=class extends lt{constructor(){super(...arguments),this.localize=new Et(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),r=this.placement.includes("top")||this.placement.includes("bottom");let i=0,s=0,a=0,o=0,n=0,l=0,d=0,h=0;r?t.top<e.top?(i=t.left,s=t.bottom,a=t.right,o=t.bottom,n=e.left,l=e.top,d=e.right,h=e.top):(i=e.left,s=e.bottom,a=e.right,o=e.bottom,n=t.left,l=t.top,d=t.right,h=t.top):t.left<e.left?(i=t.right,s=t.top,a=e.left,o=e.top,n=t.right,l=t.bottom,d=e.left,h=e.bottom):(i=e.right,s=e.top,a=t.left,o=t.top,n=e.right,l=e.bottom,d=t.left,h=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${i}px`),this.style.setProperty("--hover-bridge-top-left-y",`${s}px`),this.style.setProperty("--hover-bridge-top-right-x",`${a}px`),this.style.setProperty("--hover-bridge-top-right-y",`${o}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${d}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${h}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||Tc(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||!this.isConnected||(this.popup?.showPopover?.(),this.cleanup=ah(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl||!this.popup)return;const t=[oh({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(zc({apply:({rects:i})=>{const s=this.sync==="width"||this.sync==="both",a=this.sync==="height"||this.sync==="both";this.popup.style.width=s?`${i.reference.width}px`:"",this.popup.style.height=a?`${i.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let e;ka&&!Tc(this.anchor)&&this.boundary==="scroll"&&(e=ss(this.anchorEl).filter(i=>i instanceof Element)),this.flip&&t.push(lh({boundary:this.flipBoundary||e,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(nh({boundary:this.shiftBoundary||e,padding:this.shiftPadding})),this.autoSize?t.push(zc({boundary:this.autoSizeBoundary||e,padding:this.autoSizePadding,apply:({availableWidth:i,availableHeight:s})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${s}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${i}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(Db({element:this.arrowEl,padding:this.arrowPadding}));const r=ka?i=>za.getOffsetParent(i,Ib):za.getOffsetParent;ch(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:ka?"absolute":"fixed",platform:{...za,getOffsetParent:r}}).then(({x:i,y:s,middlewareData:a,placement:o})=>{const n=this.localize.dir()==="rtl",l={top:"bottom",right:"left",bottom:"top",left:"right"}[o.split("-")[0]];if(this.setAttribute("data-current-placement",o),Object.assign(this.popup.style,{left:`${i}px`,top:`${s}px`}),this.arrow){const d=a.arrow.x,h=a.arrow.y;let f="",g="",u="",v="";if(this.arrowPlacement==="start"){const b=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";f=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",g=n?b:"",v=n?"":b}else if(this.arrowPlacement==="end"){const b=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";g=n?"":b,v=n?b:"",u=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(v=typeof d=="number"?"calc(50% - var(--arrow-size-diagonal))":"",f=typeof h=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(v=typeof d=="number"?`${d}px`:"",f=typeof h=="number"?`${h}px`:"");Object.assign(this.arrowEl.style,{top:f,right:g,bottom:u,left:v,[l]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new Gd)}render(){return $`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${pt({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${pt({popup:!0,"popup-active":this.active,"popup-fixed":!ka,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?$`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};It.css=X0;c([Q(".popup")],It.prototype,"popup",2);c([Q(".arrow")],It.prototype,"arrowEl",2);c([p()],It.prototype,"anchor",2);c([p({type:Boolean,reflect:!0})],It.prototype,"active",2);c([p({reflect:!0})],It.prototype,"placement",2);c([p()],It.prototype,"boundary",2);c([p({type:Number})],It.prototype,"distance",2);c([p({type:Number})],It.prototype,"skidding",2);c([p({type:Boolean})],It.prototype,"arrow",2);c([p({attribute:"arrow-placement"})],It.prototype,"arrowPlacement",2);c([p({attribute:"arrow-padding",type:Number})],It.prototype,"arrowPadding",2);c([p({type:Boolean})],It.prototype,"flip",2);c([p({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],It.prototype,"flipFallbackPlacements",2);c([p({attribute:"flip-fallback-strategy"})],It.prototype,"flipFallbackStrategy",2);c([p({type:Object})],It.prototype,"flipBoundary",2);c([p({attribute:"flip-padding",type:Number})],It.prototype,"flipPadding",2);c([p({type:Boolean})],It.prototype,"shift",2);c([p({type:Object})],It.prototype,"shiftBoundary",2);c([p({attribute:"shift-padding",type:Number})],It.prototype,"shiftPadding",2);c([p({attribute:"auto-size"})],It.prototype,"autoSize",2);c([p()],It.prototype,"sync",2);c([p({type:Object})],It.prototype,"autoSizeBoundary",2);c([p({attribute:"auto-size-padding",type:Number})],It.prototype,"autoSizePadding",2);c([p({attribute:"hover-bridge",type:Boolean})],It.prototype,"hoverBridge",2);It=c([X("wa-popup")],It);var Pb=J`
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
`;var as=class extends lt{constructor(){super(...arguments),this.localize=new Et(this),this.position=50}handleDrag(t){const{width:e}=this.getBoundingClientRect(),r=this.localize.dir()==="rtl";t.preventDefault(),qs(this,{onMove:i=>{this.customStates.set("dragging",!0),this.position=parseFloat(vt(i/e*100,0,100).toFixed(2)),r&&(this.position=100-this.position)},onStop:()=>{this.customStates.set("dragging",!1)},initialEvent:t})}handleKeyDown(t){const e=this.matches(":dir(ltr)"),r=this.localize.dir()==="rtl";if(["ArrowLeft","ArrowRight","Home","End"].includes(t.key)){const i=t.shiftKey?10:1;let s=this.position;t.preventDefault(),(e&&t.key==="ArrowLeft"||r&&t.key==="ArrowRight")&&(s-=i),(e&&t.key==="ArrowRight"||r&&t.key==="ArrowLeft")&&(s+=i),t.key==="Home"&&(s=0),t.key==="End"&&(s=100),s=vt(s,0,100),this.position=s}}handlePositionChange(){this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}render(){const t=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return $`
      <div id="comparison" class="image" part="base">
        <div part="before" class="before">
          <slot name="before"></slot>
        </div>

        <div
          part="after"
          class="after"
          style=${Vt({clipPath:t?`inset(0 0 0 ${100-this.position}%)`:`inset(0 ${100-this.position}% 0 0)`})}
        >
          <slot name="after"></slot>
        </div>
      </div>

      <div
        part="divider"
        class="divider"
        style=${Vt({left:t?`${100-this.position}%`:`${this.position}%`})}
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
    `}};as.css=Pb;c([Q(".handle")],as.prototype,"handle",2);c([p({type:Number,reflect:!0})],as.prototype,"position",2);c([tt("position",{waitUntilFirstUpdate:!0})],as.prototype,"handlePositionChange",1);as=c([X("wa-comparison")],as);var Nb=class extends Event{constructor(t){super("wa-copy",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Fb=J`
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
`;var ce=class extends lt{constructor(){super(...arguments),this.localize=new Et(this),this.isCopying=!1,this.status="rest",this.value="",this.from="",this.disabled=!1,this.copyLabel="",this.successLabel="",this.errorLabel="",this.feedbackDuration=1e3,this.tooltipPlacement="top"}get currentLabel(){return this.status==="success"?this.successLabel||this.localize.term("copied"):this.status==="error"?this.errorLabel||this.localize.term("error"):this.copyLabel||this.localize.term("copy")}async handleCopy(){if(this.disabled||this.isCopying)return;this.isCopying=!0;let t=this.value;if(this.from){const e=this.getRootNode(),r=this.from.includes("."),i=this.from.includes("[")&&this.from.includes("]");let s=this.from,a="";r?[s,a]=this.from.trim().split("."):i&&([s,a]=this.from.trim().replace(/\]$/,"").split("["));const o="getElementById"in e?e.getElementById(s):null;o?i?t=o.getAttribute(a)||"":r?t=o[a]||"":t=o.textContent||"":(this.showStatus("error"),this.dispatchEvent(new Gi))}if(!t)this.showStatus("error"),this.dispatchEvent(new Gi);else try{await navigator.clipboard.writeText(t),this.showStatus("success"),this.dispatchEvent(new Nb({value:t}))}catch{this.showStatus("error"),this.dispatchEvent(new Gi)}}async showStatus(t){const e=t==="success"?this.successIcon:this.errorIcon;await Mt(this.copyIcon,"hide"),this.copyIcon.hidden=!0,this.status=t,e.hidden=!1,await Mt(e,"show"),setTimeout(async()=>{await Mt(e,"hide"),e.hidden=!0,this.status="rest",this.copyIcon.hidden=!1,await Mt(this.copyIcon,"show"),this.isCopying=!1},this.feedbackDuration)}render(){return $`
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
          class=${pt({"copy-button":!0,"copy-button-success":this.status==="success","copy-button-error":this.status==="error"})}
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
    `}};ce.css=[Hd,Fb];c([Q('slot[name="copy-icon"]')],ce.prototype,"copyIcon",2);c([Q('slot[name="success-icon"]')],ce.prototype,"successIcon",2);c([Q('slot[name="error-icon"]')],ce.prototype,"errorIcon",2);c([Q("wa-tooltip")],ce.prototype,"tooltip",2);c([Z()],ce.prototype,"isCopying",2);c([Z()],ce.prototype,"status",2);c([p()],ce.prototype,"value",2);c([p()],ce.prototype,"from",2);c([p({type:Boolean,reflect:!0})],ce.prototype,"disabled",2);c([p({attribute:"copy-label"})],ce.prototype,"copyLabel",2);c([p({attribute:"success-label"})],ce.prototype,"successLabel",2);c([p({attribute:"error-label"})],ce.prototype,"errorLabel",2);c([p({attribute:"feedback-duration",type:Number})],ce.prototype,"feedbackDuration",2);c([p({attribute:"tooltip-placement"})],ce.prototype,"tooltipPlacement",2);ce=c([X("wa-copy-button")],ce);var Bb=J`
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
`;var Pi=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};var Ni=class extends Event{constructor(t){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}};var Fi=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}};var Bi=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}};var Ht=class extends lt{constructor(){super(...arguments),this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&Sr(this)&&(t.preventDefault(),t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const t=!!this.anchor?.matches(":hover"),e=this.matches(":hover");if(t||e)return;clearTimeout(this.hoverTimeout),t||e||(this.hoverTimeout=window.setTimeout(()=>{this.hide()},this.hideDelay))}}}connectedCallback(){super.connectedCallback(),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.addEventListener("mouseout",this.handleMouseOut),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=wo("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),Cr(this),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}addToAriaLabelledBy(t,e){const i=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);i.includes(e)||(i.push(e),t.setAttribute("aria-labelledby",i.join(" ")))}removeFromAriaLabelledBy(t,e){const s=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(a=>a!==e);s.length>0?t.setAttribute("aria-labelledby",s.join(" ")):t.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;const t=new Pi;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),Oi(this),this.body.hidden=!1,this.popup.active=!0,await Mt(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new Bi)}else{const t=new Ni;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),Cr(this),await Mt(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new Fi)}}handleForChange(){const t=this.getRootNode();if(!t)return;const e=this.for?t.getElementById(this.for):null,r=this.anchor;if(e===r)return;const{signal:i}=this.eventController;e&&(this.addToAriaLabelledBy(e,this.id),e.addEventListener("blur",this.handleBlur,{capture:!0,signal:i}),e.addEventListener("focus",this.handleFocus,{capture:!0,signal:i}),e.addEventListener("click",this.handleClick,{signal:i}),e.addEventListener("mouseover",this.handleMouseOver,{signal:i}),e.addEventListener("mouseout",this.handleMouseOut,{signal:i})),r&&(this.removeFromAriaLabelledBy(r,this.id),r.removeEventListener("blur",this.handleBlur,{capture:!0}),r.removeEventListener("focus",this.handleFocus,{capture:!0}),r.removeEventListener("click",this.handleClick),r.removeEventListener("mouseover",this.handleMouseOver),r.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=e}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,nr(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,nr(this,"wa-after-hide")}render(){return $`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${pt({tooltip:!0,"tooltip-open":this.open})}
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
    `}};Ht.css=Bb;Ht.dependencies={"wa-popup":It};c([Q("slot:not([name])")],Ht.prototype,"defaultSlot",2);c([Q(".body")],Ht.prototype,"body",2);c([Q("wa-popup")],Ht.prototype,"popup",2);c([p()],Ht.prototype,"placement",2);c([p({type:Boolean,reflect:!0})],Ht.prototype,"disabled",2);c([p({type:Number})],Ht.prototype,"distance",2);c([p({type:Boolean,reflect:!0})],Ht.prototype,"open",2);c([p({type:Number})],Ht.prototype,"skidding",2);c([p({attribute:"show-delay",type:Number})],Ht.prototype,"showDelay",2);c([p({attribute:"hide-delay",type:Number})],Ht.prototype,"hideDelay",2);c([p()],Ht.prototype,"trigger",2);c([p({attribute:"without-arrow",type:Boolean,reflect:!0})],Ht.prototype,"withoutArrow",2);c([p()],Ht.prototype,"for",2);c([Z()],Ht.prototype,"anchor",2);c([tt("open",{waitUntilFirstUpdate:!0})],Ht.prototype,"handleOpenChange",1);c([tt("for")],Ht.prototype,"handleForChange",1);c([tt(["distance","placement","skidding"])],Ht.prototype,"handleOptionsChange",1);c([tt("disabled")],Ht.prototype,"handleDisabledChange",1);Ht=c([X("wa-tooltip")],Ht);var Mb=J`
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
`;var ke=class extends lt{constructor(){super(...arguments),this.localize=new Et(this),this.isAnimating=!1,this.open=!1,this.disabled=!1,this.appearance="outlined",this.iconPlacement="end"}disconnectedCallback(){super.disconnectedCallback(),this.detailsObserver?.disconnect()}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(t=>{for(const e of t)e.type==="attributes"&&e.attributeName==="open"&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}updated(t){t.has("isAnimating")&&this.customStates.set("animating",this.isAnimating)}handleSummaryClick(t){t.composedPath().some(i=>{if(!(i instanceof HTMLElement))return!1;const s=i.tagName?.toLowerCase();return["a","button","input","textarea","select"].includes(s)?!0:i instanceof Ft?!("disabled"in i)||!i.disabled:!1})||(t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus()))}handleSummaryKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.open?this.hide():this.show()),(t.key==="ArrowUp"||t.key==="ArrowLeft")&&(t.preventDefault(),this.hide()),(t.key==="ArrowDown"||t.key==="ArrowRight")&&(t.preventDefault(),this.show())}closeOthersWithSameName(){if(!this.name)return;this.getRootNode().querySelectorAll(`wa-details[name="${this.name}"]`).forEach(r=>{r!==this&&r.open&&(r.open=!1)})}async handleOpenChange(){if(this.open){this.details.open=!0;const t=new Pi;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1,this.details.open=!1;return}this.closeOthersWithSameName(),this.isAnimating=!0;const e=Ga(getComputedStyle(this.body).getPropertyValue("--show-duration"));await Ka(this.body,[{height:"0",opacity:"0"},{height:`${this.body.scrollHeight}px`,opacity:"1"}],{duration:e,easing:"linear"}),this.body.style.height="auto",this.isAnimating=!1,this.dispatchEvent(new Bi)}else{const t=new Ni;if(this.dispatchEvent(t),t.defaultPrevented){this.details.open=!0,this.open=!0;return}this.isAnimating=!0;const e=Ga(getComputedStyle(this.body).getPropertyValue("--hide-duration"));await Ka(this.body,[{height:`${this.body.scrollHeight}px`,opacity:"1"},{height:"0",opacity:"0"}],{duration:e,easing:"linear"}),this.body.style.height="auto",this.isAnimating=!1,this.details.open=!1,this.dispatchEvent(new Fi)}}async show(){if(!(this.open||this.disabled))return this.open=!0,nr(this,"wa-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=!1,nr(this,"wa-after-hide")}render(){const t=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return $`
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
          class=${pt({body:!0,animating:this.isAnimating})}
          role="region"
          aria-labelledby="header"
        >
          <slot part="content" id="content" class="content"></slot>
        </div>
      </details>
    `}};ke.css=Mb;c([Q("details")],ke.prototype,"details",2);c([Q("summary")],ke.prototype,"header",2);c([Q(".body")],ke.prototype,"body",2);c([Q(".expand-icon-slot")],ke.prototype,"expandIconSlot",2);c([Z()],ke.prototype,"isAnimating",2);c([p({type:Boolean,reflect:!0})],ke.prototype,"open",2);c([p()],ke.prototype,"summary",2);c([p({reflect:!0})],ke.prototype,"name",2);c([p({type:Boolean,reflect:!0})],ke.prototype,"disabled",2);c([p({reflect:!0})],ke.prototype,"appearance",2);c([p({attribute:"icon-placement",reflect:!0})],ke.prototype,"iconPlacement",2);c([tt("open",{waitUntilFirstUpdate:!0})],ke.prototype,"handleOpenChange",1);ke=c([X("wa-details")],ke);function Ub(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}var Tn=new Set;function Vb(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Wb(){const t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t}function Qa(t){if(Tn.add(t),!document.documentElement.classList.contains("wa-scroll-lock")){const e=Vb()+Wb();let r=getComputedStyle(document.documentElement).scrollbarGutter;(!r||r==="auto")&&(r="stable"),e<2&&(r=""),document.documentElement.style.setProperty("--wa-scroll-lock-gutter",r),document.documentElement.classList.add("wa-scroll-lock"),document.documentElement.style.setProperty("--wa-scroll-lock-size",`${e}px`)}}function Ja(t){Tn.delete(t),Tn.size===0&&(document.documentElement.classList.remove("wa-scroll-lock"),document.documentElement.style.removeProperty("--wa-scroll-lock-size"))}function Rn(t,e,r="vertical",i="smooth"){const s=Ub(t,e),a=s.top+e.scrollTop,o=s.left+e.scrollLeft,n=e.scrollLeft,l=e.scrollLeft+e.offsetWidth,d=e.scrollTop,h=e.scrollTop+e.offsetHeight;(r==="horizontal"||r==="both")&&(o<n?e.scrollTo({left:o,behavior:i}):o+t.clientWidth>l&&e.scrollTo({left:o-e.offsetWidth+t.clientWidth,behavior:i})),(r==="vertical"||r==="both")&&(a<d?e.scrollTo({top:a,behavior:i}):a+t.clientHeight>h&&e.scrollTo({top:a-e.offsetHeight+t.clientHeight,behavior:i}))}function $o(t){return t.split(" ").map(e=>e.trim()).filter(e=>e!=="")}var qb=J`
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
`;var Pr=class extends lt{constructor(){super(...arguments),this.localize=new Et(this),this.hasSlotController=new Ie(this,"footer","header-actions","label"),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&Sr(this)&&(t.preventDefault(),t.stopPropagation(),this.requestClose(this.dialog))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.dialog.showModal(),Qa(this))}disconnectedCallback(){super.disconnectedCallback(),Ja(this),this.removeOpenListeners()}async requestClose(t){const e=new Ni({source:t});if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0,Mt(this.dialog,"pulse");return}this.removeOpenListeners(),await Mt(this.dialog,"hide"),this.open=!1,this.dialog.close(),Ja(this);const r=this.originalTrigger;typeof r?.focus=="function"&&setTimeout(()=>r.focus()),this.dispatchEvent(new Fi)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown),Oi(this)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown),Cr(this)}handleDialogCancel(t){t.preventDefault(),!this.dialog.classList.contains("hide")&&t.target===this.dialog&&Sr(this)&&this.requestClose(this.dialog)}handleDialogClick(t){const r=t.target.closest('[data-dialog="close"]');r&&(t.stopPropagation(),this.requestClose(r))}async handleDialogPointerDown(t){t.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await Mt(this.dialog,"pulse"))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open&&(this.open=!0,this.requestClose(this.dialog))}async show(){const t=new Pi;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),Qa(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&typeof e.focus=="function"?e.focus():this.dialog.focus()}),await Mt(this.dialog,"show"),this.dispatchEvent(new Bi)}render(){const t=!this.withoutHeader,e=this.hasSlotController.test("footer");return $`
      <dialog
        part="dialog"
        class=${pt({dialog:!0,open:this.open})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${t?$`
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
                    @click="${r=>this.requestClose(r.target)}"
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

        ${e?$`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:""}
      </dialog>
    `}};Pr.css=qb;c([Q(".dialog")],Pr.prototype,"dialog",2);c([p({type:Boolean,reflect:!0})],Pr.prototype,"open",2);c([p({reflect:!0})],Pr.prototype,"label",2);c([p({attribute:"without-header",type:Boolean,reflect:!0})],Pr.prototype,"withoutHeader",2);c([p({attribute:"light-dismiss",type:Boolean})],Pr.prototype,"lightDismiss",2);c([tt("open",{waitUntilFirstUpdate:!0})],Pr.prototype,"handleOpenChange",1);Pr=c([X("wa-dialog")],Pr);document.addEventListener("click",t=>{const e=t.target.closest("[data-dialog]");if(e instanceof Element){const[r,i]=$o(e.getAttribute("data-dialog")||"");if(r==="open"&&i?.length){const a=e.getRootNode().getElementById(i);a?.localName==="wa-dialog"?a.open=!0:console.warn(`A dialog with an ID of "${i}" could not be found in this document.`)}}}),document.addEventListener("pointerdown",()=>{});var Hb=J`
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
`;var Zs=class extends lt{constructor(){super(...arguments),this.orientation="horizontal"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.orientation)}};Zs.css=Hb;c([p({reflect:!0})],Zs.prototype,"orientation",2);c([tt("orientation")],Zs.prototype,"handleVerticalChange",1);Zs=c([X("wa-divider")],Zs);var jb=J`
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
`;var $r=class extends lt{constructor(){super(...arguments),this.localize=new Et(this),this.hasSlotController=new Ie(this,"footer","header-actions","label"),this.open=!1,this.label="",this.placement="end",this.withoutHeader=!1,this.lightDismiss=!0,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&Sr(this)&&(t.preventDefault(),t.stopPropagation(),this.requestClose(this.drawer))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.drawer.showModal(),Qa(this))}disconnectedCallback(){super.disconnectedCallback(),Ja(this),this.removeOpenListeners()}async requestClose(t){const e=new Ni({source:t});if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0,Mt(this.drawer,"pulse");return}this.removeOpenListeners(),await Mt(this.drawer,"hide"),this.open=!1,this.drawer.close(),Ja(this);const r=this.originalTrigger;typeof r?.focus=="function"&&setTimeout(()=>r.focus()),this.dispatchEvent(new Fi)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown),Oi(this)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown),Cr(this)}handleDialogCancel(t){t.preventDefault(),!this.drawer.classList.contains("hide")&&t.target===this.drawer&&Sr(this)&&this.requestClose(this.drawer)}handleDialogClick(t){const r=t.target.closest('[data-drawer="close"]');r&&(t.stopPropagation(),this.requestClose(r))}async handleDialogPointerDown(t){t.target===this.drawer&&(this.lightDismiss?this.requestClose(this.drawer):await Mt(this.drawer,"pulse"))}handleOpenChange(){this.open&&!this.drawer.open?this.show():this.drawer.open&&(this.open=!0,this.requestClose(this.drawer))}async show(){const t=new Pi;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.drawer.showModal(),Qa(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&typeof e.focus=="function"?e.focus():this.drawer.focus()}),await Mt(this.drawer,"show"),this.dispatchEvent(new Bi)}render(){const t=!this.withoutHeader,e=this.hasSlotController.test("footer");return $`
      <dialog
        part="dialog"
        class=${pt({drawer:!0,open:this.open,top:this.placement==="top",end:this.placement==="end",bottom:this.placement==="bottom",start:this.placement==="start"})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${t?$`
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
                    @click="${r=>this.requestClose(r.target)}"
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

        ${e?$`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:""}
      </dialog>
    `}};$r.css=jb;c([Q(".drawer")],$r.prototype,"drawer",2);c([p({type:Boolean,reflect:!0})],$r.prototype,"open",2);c([p({reflect:!0})],$r.prototype,"label",2);c([p({reflect:!0})],$r.prototype,"placement",2);c([p({attribute:"without-header",type:Boolean,reflect:!0})],$r.prototype,"withoutHeader",2);c([p({attribute:"light-dismiss",type:Boolean})],$r.prototype,"lightDismiss",2);c([tt("open",{waitUntilFirstUpdate:!0})],$r.prototype,"handleOpenChange",1);$r=c([X("wa-drawer")],$r);document.addEventListener("click",t=>{const e=t.target.closest("[data-drawer]");if(e instanceof Element){const[r,i]=$o(e.getAttribute("data-drawer")||"");if(r==="open"&&i?.length){const a=e.getRootNode().getElementById(i);a?.localName==="wa-drawer"?a.open=!0:console.warn(`A drawer with an ID of "${i}" could not be found in this document.`)}}}),document.body.addEventListener("pointerdown",()=>{});var Kb=class extends Event{constructor(t){super("wa-select",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}};var Gb=J`
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
`;function*dh(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*dh(t.shadowRoot.activeElement)))}var on=new Set,Ee=class extends lt{constructor(){super(...arguments),this.submenuCleanups=new Map,this.localize=new Et(this),this.userTypedQuery="",this.openSubmenuStack=[],this.open=!1,this.size="medium",this.placement="bottom-start",this.distance=0,this.skidding=0,this.handleDocumentKeyDown=async t=>{const e=this.localize.dir()==="rtl";if(t.key==="Escape"&&this.open&&Sr(this)){const h=this.getTrigger();t.preventDefault(),t.stopPropagation(),this.open=!1,h?.focus({preventScroll:!0});return}const r=[...dh()].find(h=>h.localName==="wa-dropdown-item"),i=r?.localName==="wa-dropdown-item",s=this.getCurrentSubmenuItem(),a=!!s;let o,n,l;a?(o=this.getSubmenuItems(s),n=o.find(h=>h.active||h===r),l=n?o.indexOf(n):-1):(o=this.getItems(),n=o.find(h=>h.active||h===r),l=n?o.indexOf(n):-1);let d;if(t.key==="ArrowUp"&&(t.preventDefault(),t.stopPropagation(),l>0?d=o[l-1]:d=o[o.length-1]),t.key==="ArrowDown"&&(t.preventDefault(),t.stopPropagation(),l!==-1&&l<o.length-1?d=o[l+1]:d=o[0]),t.key===(e?"ArrowLeft":"ArrowRight")&&i&&n&&n.hasSubmenu){t.preventDefault(),t.stopPropagation(),n.submenuOpen=!0,this.addToSubmenuStack(n),setTimeout(()=>{const h=this.getSubmenuItems(n);h.length>0&&(h.forEach((f,g)=>f.active=g===0),h[0].focus({preventScroll:!0}))},0);return}if(t.key===(e?"ArrowRight":"ArrowLeft")&&a){t.preventDefault(),t.stopPropagation();const h=this.removeFromSubmenuStack();h&&(h.submenuOpen=!1,setTimeout(()=>{h.focus({preventScroll:!0}),h.active=!0,(h.slot==="submenu"?this.getSubmenuItems(h.parentElement):this.getItems()).forEach(g=>{g!==h&&(g.active=!1)})},0));return}if((t.key==="Home"||t.key==="End")&&(t.preventDefault(),t.stopPropagation(),d=t.key==="Home"?o[0]:o[o.length-1]),t.key==="Tab"&&await this.hideMenu(),t.key.length===1&&!(t.metaKey||t.ctrlKey||t.altKey)&&!(t.key===" "&&this.userTypedQuery==="")&&(clearTimeout(this.userTypedTimeout),this.userTypedTimeout=setTimeout(()=>{this.userTypedQuery=""},1e3),this.userTypedQuery+=t.key,o.some(h=>{const f=(h.textContent||"").trim().toLowerCase(),g=this.userTypedQuery.trim().toLowerCase();return f.startsWith(g)?(d=h,!0):!1})),d){t.preventDefault(),t.stopPropagation(),o.forEach(h=>h.active=h===d),d.focus({preventScroll:!0});return}(t.key==="Enter"||t.key===" "&&this.userTypedQuery==="")&&i&&n&&(t.preventDefault(),t.stopPropagation(),n.hasSubmenu?(n.submenuOpen=!0,this.addToSubmenuStack(n),setTimeout(()=>{const h=this.getSubmenuItems(n);h.length>0&&(h.forEach((f,g)=>f.active=g===0),h[0].focus({preventScroll:!0}))},0)):this.makeSelection(n))},this.handleDocumentPointerDown=t=>{t.composedPath().some(i=>i instanceof HTMLElement?i===this||i.closest('wa-dropdown, [part="submenu"]'):!1)||(this.open=!1)},this.handleGlobalMouseMove=t=>{const e=this.getCurrentSubmenuItem();if(!e?.submenuOpen||!e.submenuElement)return;const r=e.submenuElement.getBoundingClientRect(),i=this.localize.dir()==="rtl",s=i?r.right:r.left,a=i?Math.max(t.clientX,s):Math.min(t.clientX,s),o=Math.max(r.top,Math.min(t.clientY,r.bottom));e.submenuElement.style.setProperty("--safe-triangle-cursor-x",`${a}px`),e.submenuElement.style.setProperty("--safe-triangle-cursor-y",`${o}px`);const n=t.composedPath(),l=e.matches(":hover"),d=!!e.submenuElement?.matches(":hover"),h=l||!!n.find(g=>g===e),f=d||!!n.find(g=>g instanceof HTMLElement&&g.closest('[part="submenu"]')===e.submenuElement);!h&&!f&&setTimeout(()=>{!l&&!d&&(e.submenuOpen=!1)},100)}}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.userTypedTimeout),this.closeAllSubmenus(),this.submenuCleanups.forEach(t=>t()),this.submenuCleanups.clear(),document.removeEventListener("mousemove",this.handleGlobalMouseMove),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("pointerdown",this.handleDocumentPointerDown),Cr(this)}firstUpdated(){this.syncAriaAttributes()}async updated(t){if(t.has("open")){const e=t.get("open");if(e===this.open||e===void 0&&this.open===!1)return;this.customStates.set("open",this.open),this.open?await this.showMenu():(this.closeAllSubmenus(),await this.hideMenu())}t.has("size")&&this.syncItemSizes()}getItems(t=!1){const e=(this.defaultSlot?.assignedElements({flatten:!0})??[]).filter(r=>r.localName==="wa-dropdown-item");return t?e:e.filter(r=>!r.disabled)}getSubmenuItems(t,e=!1){const r=t.shadowRoot?.querySelector('slot[name="submenu"]')||t.querySelector('slot[name="submenu"]');if(!r)return[];const i=r.assignedElements({flatten:!0}).filter(s=>s.localName==="wa-dropdown-item");return e?i:i.filter(s=>!s.disabled)}syncItemSizes(){(this.defaultSlot?.assignedElements({flatten:!0})??[]).filter(e=>e.localName==="wa-dropdown-item").forEach(e=>e.size=this.size)}addToSubmenuStack(t){const e=this.openSubmenuStack.indexOf(t);e!==-1?this.openSubmenuStack=this.openSubmenuStack.slice(0,e+1):this.openSubmenuStack.push(t)}removeFromSubmenuStack(){return this.openSubmenuStack.pop()}getCurrentSubmenuItem(){return this.openSubmenuStack.length>0?this.openSubmenuStack[this.openSubmenuStack.length-1]:void 0}closeAllSubmenus(){this.getItems(!0).forEach(e=>{e.submenuOpen=!1}),this.openSubmenuStack=[]}closeSiblingSubmenus(t){const e=t.closest('wa-dropdown-item:not([slot="submenu"])');let r;e?r=this.getSubmenuItems(e,!0):r=this.getItems(!0),r.forEach(i=>{i!==t&&i.submenuOpen&&(i.submenuOpen=!1)}),this.openSubmenuStack.includes(t)||this.openSubmenuStack.push(t)}getTrigger(){return this.querySelector('[slot="trigger"]')}async showMenu(){if(!this.getTrigger()||!this.popup||!this.menu)return;const e=new Pi;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}if(this.popup.active)return;on.forEach(i=>i.open=!1),this.popup.active=!0,this.open=!0,on.add(this),Oi(this),this.syncAriaAttributes(),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("pointerdown",this.handleDocumentPointerDown),document.addEventListener("mousemove",this.handleGlobalMouseMove),this.menu.classList.remove("hide"),await Mt(this.menu,"show");const r=this.getItems();r.length>0&&(r.forEach((i,s)=>i.active=s===0),r[0].focus({preventScroll:!0})),this.dispatchEvent(new Bi)}async hideMenu(){if(!this.popup||!this.menu)return;const t=new Ni({source:this});if(this.dispatchEvent(t),t.defaultPrevented){this.open=!0;return}this.open=!1,on.delete(this),Cr(this),this.syncAriaAttributes(),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("pointerdown",this.handleDocumentPointerDown),document.removeEventListener("mousemove",this.handleGlobalMouseMove),this.menu.classList.remove("show"),await Mt(this.menu,"hide"),this.popup.active=this.open,this.dispatchEvent(new Fi)}handleMenuClick(t){const e=t.target.closest("wa-dropdown-item");if(!(!e||e.disabled)){if(e.hasSubmenu){e.submenuOpen||(this.closeSiblingSubmenus(e),this.addToSubmenuStack(e),e.submenuOpen=!0),t.stopPropagation();return}this.makeSelection(e)}}async handleMenuSlotChange(){const t=this.getItems(!0);await Promise.all(t.map(i=>i.updateComplete)),this.syncItemSizes();const e=t.some(i=>i.type==="checkbox"),r=t.some(i=>i.hasSubmenu);t.forEach((i,s)=>{i.active=s===0,i.checkboxAdjacent=e,i.submenuAdjacent=r})}handleTriggerClick(){this.open=!this.open}handleSubmenuOpening(t){const e=t.detail.item;this.closeSiblingSubmenus(e),this.addToSubmenuStack(e),this.setupSubmenuPosition(e),this.processSubmenuItems(e)}setupSubmenuPosition(t){if(!t.submenuElement)return;this.cleanupSubmenuPosition(t);const e=ah(t,t.submenuElement,()=>{this.positionSubmenu(t),this.updateSafeTriangleCoordinates(t)});this.submenuCleanups.set(t,e);const r=t.submenuElement.querySelector('slot[name="submenu"]');r&&(r.removeEventListener("slotchange",Ee.handleSubmenuSlotChange),r.addEventListener("slotchange",Ee.handleSubmenuSlotChange),Ee.handleSubmenuSlotChange({target:r}))}static handleSubmenuSlotChange(t){const e=t.target;if(!e)return;const r=e.assignedElements().filter(a=>a.localName==="wa-dropdown-item");if(r.length===0)return;const i=r.some(a=>a.hasSubmenu),s=r.some(a=>a.type==="checkbox");r.forEach(a=>{a.submenuAdjacent=i,a.checkboxAdjacent=s})}processSubmenuItems(t){if(!t.submenuElement)return;const e=this.getSubmenuItems(t,!0),r=e.some(i=>i.hasSubmenu);e.forEach(i=>{i.submenuAdjacent=r})}cleanupSubmenuPosition(t){const e=this.submenuCleanups.get(t);e&&(e(),this.submenuCleanups.delete(t))}positionSubmenu(t){if(!t.submenuElement)return;const r=this.localize.dir()==="rtl"?"left-start":"right-start";ch(t,t.submenuElement,{placement:r,middleware:[oh({mainAxis:0,crossAxis:-5}),lh({fallbackStrategy:"bestFit"}),nh({padding:8})]}).then(({x:i,y:s,placement:a})=>{t.submenuElement.setAttribute("data-placement",a),Object.assign(t.submenuElement.style,{left:`${i}px`,top:`${s}px`})})}updateSafeTriangleCoordinates(t){if(!t.submenuElement||!t.submenuOpen)return;if(document.activeElement?.matches(":focus-visible")){t.submenuElement.style.setProperty("--safe-triangle-visible","none");return}t.submenuElement.style.setProperty("--safe-triangle-visible","block");const r=t.submenuElement.getBoundingClientRect(),i=this.localize.dir()==="rtl";t.submenuElement.style.setProperty("--safe-triangle-submenu-start-x",`${i?r.right:r.left}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-start-y",`${r.top}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-end-x",`${i?r.right:r.left}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-end-y",`${r.bottom}px`)}makeSelection(t){const e=this.getTrigger();if(t.disabled)return;t.type==="checkbox"&&(t.checked=!t.checked);const r=new Kb({item:t});this.dispatchEvent(r),r.defaultPrevented||(this.open=!1,e?.focus({preventScroll:!0}))}async syncAriaAttributes(){const t=this.getTrigger();let e;t&&(t.localName==="wa-button"?(await customElements.whenDefined("wa-button"),await t.updateComplete,e=t.shadowRoot.querySelector('[part="base"]')):e=t,e.hasAttribute("id")||e.setAttribute("id",wo("wa-dropdown-trigger-")),e.setAttribute("aria-haspopup","menu"),e.setAttribute("aria-expanded",this.open?"true":"false"),this.menu?.setAttribute("aria-expanded","false"))}render(){let t=this.hasUpdated?this.popup?.active:this.open;return $`
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
    `}};Ee.css=[we,Gb];c([Q("slot:not([name])")],Ee.prototype,"defaultSlot",2);c([Q("#menu")],Ee.prototype,"menu",2);c([Q("wa-popup")],Ee.prototype,"popup",2);c([p({type:Boolean,reflect:!0})],Ee.prototype,"open",2);c([p({reflect:!0})],Ee.prototype,"size",2);c([p({reflect:!0})],Ee.prototype,"placement",2);c([p({type:Number})],Ee.prototype,"distance",2);c([p({type:Number})],Ee.prototype,"skidding",2);Ee=c([X("wa-dropdown")],Ee);var Zb=J`
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
`;var Ce=class extends lt{constructor(){super(...arguments),this.hasSlotController=new Ie(this,"[default]","start","end"),this.active=!1,this.variant="default",this.size="medium",this.checkboxAdjacent=!1,this.submenuAdjacent=!1,this.type="normal",this.checked=!1,this.disabled=!1,this.submenuOpen=!1,this.hasSubmenu=!1,this.handleSlotChange=()=>{this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState(),this.hasSubmenu?(this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",this.submenuOpen?"true":"false")):(this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"))},this.handleClick=t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}}connectedCallback(){super.connectedCallback(),this.addEventListener("mouseenter",this.handleMouseEnter.bind(this)),this.shadowRoot.addEventListener("click",this.handleClick,{capture:!0}),this.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}disconnectedCallback(){super.disconnectedCallback(),this.closeSubmenu(),this.removeEventListener("mouseenter",this.handleMouseEnter),this.shadowRoot.removeEventListener("click",this.handleClick,{capture:!0}),this.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}firstUpdated(){this.setAttribute("tabindex","-1"),this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState()}updated(t){t.has("active")&&(this.setAttribute("tabindex",this.active?"0":"-1"),this.customStates.set("active",this.active)),t.has("checked")&&(this.setAttribute("aria-checked",this.checked?"true":"false"),this.customStates.set("checked",this.checked)),t.has("disabled")&&(this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.customStates.set("disabled",this.disabled),this.style.pointerEvents=this.disabled?"none":""),t.has("type")&&(this.type==="checkbox"?this.setAttribute("role","menuitemcheckbox"):this.setAttribute("role","menuitem")),t.has("submenuOpen")&&(this.customStates.set("submenu-open",this.submenuOpen),this.submenuOpen?this.openSubmenu():this.closeSubmenu())}updateHasSubmenuState(){this.customStates.set("has-submenu",this.hasSubmenu)}async openSubmenu(){const t=this.submenuElement;!this.hasSubmenu||!t||!this.isConnected||(this.notifyParentOfOpening(),t.showPopover?.(),t.hidden=!1,t.setAttribute("data-visible",""),this.submenuOpen=!0,this.setAttribute("aria-expanded","true"),await Mt(t,"show"),setTimeout(()=>{const e=this.getSubmenuItems();e.length>0&&(e.forEach((r,i)=>r.active=i===0),e[0].focus({preventScroll:!0}))},0))}notifyParentOfOpening(){const t=new CustomEvent("submenu-opening",{bubbles:!0,composed:!0,detail:{item:this}});this.dispatchEvent(t);const e=this.parentElement;e&&[...e.children].filter(i=>i!==this&&i.localName==="wa-dropdown-item"&&i.getAttribute("slot")===this.getAttribute("slot")&&i.submenuOpen).forEach(i=>{i.submenuOpen=!1})}async closeSubmenu(){const t=this.submenuElement;!this.hasSubmenu||!t||(this.submenuOpen=!1,this.setAttribute("aria-expanded","false"),t.hidden||(await Mt(t,"hide"),t?.isConnected&&(t.hidden=!0,t.removeAttribute("data-visible"),t.hidePopover?.())))}getSubmenuItems(){return[...this.children].filter(t=>t.localName==="wa-dropdown-item"&&t.getAttribute("slot")==="submenu"&&!t.hasAttribute("disabled"))}handleMouseEnter(){this.hasSubmenu&&!this.disabled&&(this.notifyParentOfOpening(),this.submenuOpen=!0)}render(){return $`
      ${this.type==="checkbox"?$`
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

      ${this.hasSubmenu?$`
            <wa-icon
              id="submenu-indicator"
              part="submenu-icon"
              exportparts="svg:submenu-icon__svg"
              library="system"
              name="chevron-right"
            ></wa-icon>
          `:""}
      ${this.hasSubmenu?$`
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
    `}};Ce.css=Zb;c([Q("#submenu")],Ce.prototype,"submenuElement",2);c([p({type:Boolean})],Ce.prototype,"active",2);c([p({reflect:!0})],Ce.prototype,"variant",2);c([p({reflect:!0})],Ce.prototype,"size",2);c([p({attribute:"checkbox-adjacent",type:Boolean,reflect:!0})],Ce.prototype,"checkboxAdjacent",2);c([p({attribute:"submenu-adjacent",type:Boolean,reflect:!0})],Ce.prototype,"submenuAdjacent",2);c([p()],Ce.prototype,"value",2);c([p({reflect:!0})],Ce.prototype,"type",2);c([p({type:Boolean})],Ce.prototype,"checked",2);c([p({type:Boolean,reflect:!0})],Ce.prototype,"disabled",2);c([p({type:Boolean,reflect:!0})],Ce.prototype,"submenuOpen",2);c([Z()],Ce.prototype,"hasSubmenu",2);Ce=c([X("wa-dropdown-item")],Ce);var Xs=class extends lt{constructor(){super(...arguments),this.localize=new Et(this),this.value=0,this.unit="byte",this.display="short"}static get styles(){return[]}render(){if(isNaN(this.value))return"";const t=["","kilo","mega","giga","tera"],e=["","kilo","mega","giga","tera","peta"],r=this.unit==="bit"?t:e,i=Math.max(0,Math.min(Math.floor(Math.log10(this.value)/3),r.length-1)),s=r[i]+this.unit,a=parseFloat((this.value/Math.pow(1e3,i)).toPrecision(3));return this.localize.number(a,{style:"unit",unit:s,unitDisplay:this.display})}};c([p({type:Number})],Xs.prototype,"value",2);c([p()],Xs.prototype,"unit",2);c([p()],Xs.prototype,"display",2);Xs=c([X("wa-format-bytes")],Xs);var Le=class extends lt{constructor(){super(...arguments),this.localize=new Et(this),this.date=new Date,this.hourFormat="auto"}static get styles(){return[]}render(){const t=new Date(this.date),e=this.hourFormat==="auto"?void 0:this.hourFormat==="12";if(isNaN(t.getMilliseconds()))return;const r=this.localize.date(t,{weekday:this.weekday,era:this.era,year:this.year,month:this.month,day:this.day,hour:this.hour,minute:this.minute,second:this.second,timeZoneName:this.timeZoneName,timeZone:this.timeZone,hour12:e});return $`<time datetime=${t.toISOString()}>${r}</time>`}};c([p()],Le.prototype,"date",2);c([p()],Le.prototype,"weekday",2);c([p()],Le.prototype,"era",2);c([p()],Le.prototype,"year",2);c([p()],Le.prototype,"month",2);c([p()],Le.prototype,"day",2);c([p()],Le.prototype,"hour",2);c([p()],Le.prototype,"minute",2);c([p()],Le.prototype,"second",2);c([p({attribute:"time-zone-name"})],Le.prototype,"timeZoneName",2);c([p({attribute:"time-zone"})],Le.prototype,"timeZone",2);c([p({attribute:"hour-format"})],Le.prototype,"hourFormat",2);Le=c([X("wa-format-date")],Le);var Xe=class extends lt{constructor(){super(...arguments),this.localize=new Et(this),this.value=0,this.type="decimal",this.withoutGrouping=!1,this.currency="USD",this.currencyDisplay="symbol"}static get styles(){return[]}render(){return isNaN(this.value)?"":this.localize.number(this.value,{style:this.type,currency:this.currency,currencyDisplay:this.currencyDisplay,useGrouping:!this.withoutGrouping,minimumIntegerDigits:this.minimumIntegerDigits,minimumFractionDigits:this.minimumFractionDigits,maximumFractionDigits:this.maximumFractionDigits,minimumSignificantDigits:this.minimumSignificantDigits,maximumSignificantDigits:this.maximumSignificantDigits})}};c([p({type:Number})],Xe.prototype,"value",2);c([p()],Xe.prototype,"type",2);c([p({attribute:"without-grouping",type:Boolean})],Xe.prototype,"withoutGrouping",2);c([p()],Xe.prototype,"currency",2);c([p({attribute:"currency-display"})],Xe.prototype,"currencyDisplay",2);c([p({attribute:"minimum-integer-digits",type:Number})],Xe.prototype,"minimumIntegerDigits",2);c([p({attribute:"minimum-fraction-digits",type:Number})],Xe.prototype,"minimumFractionDigits",2);c([p({attribute:"maximum-fraction-digits",type:Number})],Xe.prototype,"maximumFractionDigits",2);c([p({attribute:"minimum-significant-digits",type:Number})],Xe.prototype,"minimumSignificantDigits",2);c([p({attribute:"maximum-significant-digits",type:Number})],Xe.prototype,"maximumSignificantDigits",2);Xe=c([X("wa-format-number")],Xe);var Rc=class extends Event{constructor(t){super("wa-include-error",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Xb=J`
  :host {
    display: block;
  }
`;var nn=new Map;function Yb(t,e="cors"){const r=nn.get(t);if(r!==void 0)return Promise.resolve(r);const i=fetch(t,{mode:e}).then(async s=>{const a={ok:s.ok,status:s.status,html:await s.text()};return nn.set(t,a),a});return nn.set(t,i),i}var Li=class extends lt{constructor(){super(...arguments),this.mode="cors",this.allowScripts=!1}executeScript(t){const e=document.createElement("script");[...t.attributes].forEach(r=>e.setAttribute(r.name,r.value)),e.textContent=t.textContent,t.parentNode.replaceChild(e,t)}async handleSrcChange(){try{const t=this.src,e=await Yb(t,this.mode);if(t!==this.src)return;if(!e.ok){this.dispatchEvent(new Rc({status:e.status}));return}this.innerHTML=e.html,this.allowScripts&&[...this.querySelectorAll("script")].forEach(r=>this.executeScript(r)),this.dispatchEvent(new ul)}catch{this.dispatchEvent(new Rc({status:-1}))}}render(){return $`<slot></slot>`}};Li.css=Xb;c([p()],Li.prototype,"src",2);c([p()],Li.prototype,"mode",2);c([p({attribute:"allow-scripts",type:Boolean})],Li.prototype,"allowScripts",2);c([tt("src")],Li.prototype,"handleSrcChange",1);Li=c([X("wa-include")],Li);var Qb=class extends Event{constructor(t){super("wa-intersect",{bubbles:!1,cancelable:!1,composed:!0}),this.detail=t}};var Jb=J`
  :host {
    display: contents;
  }
`;var dr=class extends lt{constructor(){super(...arguments),this.intersectionObserver=null,this.observedElements=new Map,this.root=null,this.rootMargin="0px",this.threshold="0",this.intersectClass="",this.once=!1,this.disabled=!1}connectedCallback(){super.connectedCallback(),this.disabled||this.updateComplete.then(()=>{this.startObserver()})}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}handleSlotChange(){this.disabled||this.startObserver()}parseThreshold(){return $o(this.threshold).map(e=>{const r=parseFloat(e);return isNaN(r)?0:vt(r,0,1)})}resolveRoot(){if(!this.root)return null;try{const e=this.getRootNode().getElementById(this.root);return e||console.warn(`Root element with ID "${this.root}" could not be found.`,this),e}catch{return console.warn(`Invalid selector for root: "${this.root}"`,this),null}}startObserver(){if(this.stopObserver(),this.disabled)return;const t=this.parseThreshold(),e=this.resolveRoot();this.intersectionObserver=new IntersectionObserver(i=>{i.forEach(s=>{const a=this.observedElements.get(s.target)??!1,o=s.isIntersecting;this.observedElements.set(s.target,o),this.intersectClass&&(o?s.target.classList.add(this.intersectClass):s.target.classList.remove(this.intersectClass));const n=new Qb({entry:s});this.dispatchEvent(n),o&&!a&&this.once&&(this.intersectionObserver?.unobserve(s.target),this.observedElements.delete(s.target))})},{root:e,rootMargin:this.rootMargin,threshold:t});const r=this.shadowRoot.querySelector("slot");r!==null&&r.assignedElements({flatten:!0}).forEach(s=>{this.intersectionObserver?.observe(s),this.observedElements.set(s,!1)})}stopObserver(){this.intersectClass&&this.observedElements.forEach((t,e)=>{e.classList.remove(this.intersectClass)}),this.intersectionObserver?.disconnect(),this.intersectionObserver=null,this.observedElements.clear()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}handleOptionsChange(){this.startObserver()}render(){return $` <slot @slotchange=${this.handleSlotChange}></slot> `}};dr.css=Jb;c([p()],dr.prototype,"root",2);c([p({attribute:"root-margin"})],dr.prototype,"rootMargin",2);c([p()],dr.prototype,"threshold",2);c([p({attribute:"intersect-class"})],dr.prototype,"intersectClass",2);c([p({type:Boolean,reflect:!0})],dr.prototype,"once",2);c([p({type:Boolean,reflect:!0})],dr.prototype,"disabled",2);c([tt("disabled",{waitUntilFirstUpdate:!0})],dr.prototype,"handleDisabledChange",1);c([tt("root",{waitUntilFirstUpdate:!0}),tt("rootMargin",{waitUntilFirstUpdate:!0}),tt("threshold",{waitUntilFirstUpdate:!0})],dr.prototype,"handleOptionsChange",1);dr=c([X("wa-intersection-observer")],dr);var tw=class extends Event{constructor(t){super("wa-mutation",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var ew=J`
  :host {
    display: contents;
  }
`;var hr=class extends lt{constructor(){super(...arguments),this.attrOldValue=!1,this.charData=!1,this.charDataOldValue=!1,this.childList=!1,this.disabled=!1,this.handleMutation=t=>{this.dispatchEvent(new tw({mutationList:t}))}}connectedCallback(){super.connectedCallback(),typeof MutationObserver<"u"&&(this.mutationObserver=new MutationObserver(this.handleMutation),this.disabled||this.startObserver())}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}startObserver(){const t=typeof this.attr=="string"&&this.attr.length>0,e=t&&this.attr!=="*"?this.attr.split(" "):void 0;try{this.mutationObserver.observe(this,{subtree:!0,childList:this.childList,attributes:t,attributeFilter:e,attributeOldValue:this.attrOldValue,characterData:this.charData,characterDataOldValue:this.charDataOldValue})}catch{}}stopObserver(){this.mutationObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}handleChange(){this.stopObserver(),this.startObserver()}render(){return $` <slot></slot> `}};hr.css=ew;c([p({reflect:!0})],hr.prototype,"attr",2);c([p({attribute:"attr-old-value",type:Boolean,reflect:!0})],hr.prototype,"attrOldValue",2);c([p({attribute:"char-data",type:Boolean,reflect:!0})],hr.prototype,"charData",2);c([p({attribute:"char-data-old-value",type:Boolean,reflect:!0})],hr.prototype,"charDataOldValue",2);c([p({attribute:"child-list",type:Boolean,reflect:!0})],hr.prototype,"childList",2);c([p({type:Boolean,reflect:!0})],hr.prototype,"disabled",2);c([tt("disabled")],hr.prototype,"handleDisabledChange",1);c([tt("attr",{waitUntilFirstUpdate:!0}),tt("attr-old-value",{waitUntilFirstUpdate:!0}),tt("char-data",{waitUntilFirstUpdate:!0}),tt("char-data-old-value",{waitUntilFirstUpdate:!0}),tt("childList",{waitUntilFirstUpdate:!0})],hr.prototype,"handleChange",1);hr=c([X("wa-mutation-observer")],hr);var rw=J`
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
`;var Ot=class extends Ft{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new Ie(this,"hint","label"),this.localize=new Et(this),this.title="",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="medium",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.placeholder="",this.readonly=!1,this.required=!1,this.step=1,this.withoutSteppers=!1,this.inputmode="numeric",this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,na()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}get isAtMin(){if(this.min===void 0)return!1;const t=parseFloat(this.value||"");return!isNaN(t)&&t<=this.min}get isAtMax(){if(this.max===void 0)return!1;const t=parseFloat(this.value||"");return!isNaN(t)&&t>=this.max}handleChange(t){this.value=this.input.value,this.relayNativeEvent(t,{bubbles:!0,composed:!0})}handleInput(){this.value=this.input.value}handleKeyDown(t){gl(t,this),(t.key==="ArrowUp"||t.key==="ArrowDown")&&requestAnimationFrame(()=>{this.value!==this.input.value&&(this.value=this.input.value)})}handleStepperClick(t){this.disabled||this.readonly||(t==="up"?this.input.stepUp():this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.input.focus())}maintainFocusOnPointerDown(t){t.preventDefault(),this.input.focus()}updated(t){super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,r=this.label?!0:!!t,i=this.hint?!0:!!e;return $`
      <label
        part="form-control-label label"
        class=${pt({label:!0,"has-label":r})}
        for="input"
        aria-hidden=${r?"false":"true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="number-field">
        ${this.withoutSteppers?"":$`
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
          inputmode=${st(this.inputmode)}
          title=${this.title}
          name=${st(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${st(this.placeholder)}
          min=${st(this.min)}
          max=${st(this.max)}
          step=${st(this.step)}
          .value=${Ei(this.value??"")}
          autocomplete=${st(this.autocomplete)}
          ?autofocus=${this.autofocus}
          enterkeyhint=${st(this.enterkeyhint)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        <slot name="end" part="end" class="end"></slot>

        ${this.withoutSteppers?"":$`
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
        class=${pt({"has-slotted":i})}
        aria-hidden=${i?"false":"true"}
        >${this.hint}</slot
      >
    `}};Ot.css=[we,Ar,rw];Ot.shadowRootOptions={...Ft.shadowRootOptions,delegatesFocus:!0};c([Q("input")],Ot.prototype,"input",2);c([p()],Ot.prototype,"title",2);c([Z()],Ot.prototype,"value",1);c([p({attribute:"value",reflect:!0})],Ot.prototype,"defaultValue",2);c([p({reflect:!0})],Ot.prototype,"size",2);c([p({reflect:!0})],Ot.prototype,"appearance",2);c([p({type:Boolean,reflect:!0})],Ot.prototype,"pill",2);c([p()],Ot.prototype,"label",2);c([p({attribute:"hint"})],Ot.prototype,"hint",2);c([p()],Ot.prototype,"placeholder",2);c([p({type:Boolean,reflect:!0})],Ot.prototype,"readonly",2);c([p({type:Boolean,reflect:!0})],Ot.prototype,"required",2);c([p({type:Number})],Ot.prototype,"min",2);c([p({type:Number})],Ot.prototype,"max",2);c([p()],Ot.prototype,"step",2);c([p({attribute:"without-steppers",type:Boolean})],Ot.prototype,"withoutSteppers",2);c([p()],Ot.prototype,"autocomplete",2);c([p({type:Boolean})],Ot.prototype,"autofocus",2);c([p()],Ot.prototype,"enterkeyhint",2);c([p()],Ot.prototype,"inputmode",2);c([p({attribute:"with-label",type:Boolean})],Ot.prototype,"withLabel",2);c([p({attribute:"with-hint",type:Boolean})],Ot.prototype,"withHint",2);c([tt("step",{waitUntilFirstUpdate:!0})],Ot.prototype,"handleStepChange",1);Ot=c([X("wa-number-input")],Ot);var iw=J`
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
`;function Fs(t,e=0){if(!t||!globalThis.Node)return"";if(typeof t[Symbol.iterator]=="function")return(Array.isArray(t)?t:[...t]).map(s=>Fs(s,--e)).join("");let r=t;if(r.nodeType===Node.TEXT_NODE)return r.textContent??"";if(r.nodeType===Node.ELEMENT_NODE){let i=r;if(i.hasAttribute("slot")||i.matches("style, script"))return"";if(i instanceof HTMLSlotElement){let s=i.assignedNodes({flatten:!0});if(s.length>0)return Fs(s,--e)}return e>-1?Fs(i,--e):i.textContent??""}return r.hasChildNodes()?Fs(r.childNodes,--e):""}var ur=class extends lt{constructor(){super(...arguments),this.localize=new Et(this),this.isInitialized=!1,this.current=!1,this.value="",this.disabled=!1,this.selected=!1,this.defaultSelected=!1,this._label="",this.defaultLabel="",this.handleHover=t=>{t.type==="mouseenter"?this.customStates.set("hover",!0):t.type==="mouseleave"&&this.customStates.set("hover",!1)}}set label(t){const e=this._label;this._label=t||"",this._label!==e&&this.requestUpdate("label",e)}get label(){return this._label?this._label:(this.defaultLabel||this.updateDefaultLabel(),this.defaultLabel)}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false"),this.addEventListener("mouseenter",this.handleHover),this.addEventListener("mouseleave",this.handleHover),this.updateDefaultLabel()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mouseenter",this.handleHover),this.removeEventListener("mouseleave",this.handleHover)}handleDefaultSlotChange(){this.updateDefaultLabel(),this.isInitialized?(customElements.whenDefined("wa-select").then(()=>{const t=this.closest("wa-select");t&&(t.handleDefaultSlotChange(),t.selectionChanged?.())}),customElements.whenDefined("wa-combobox").then(()=>{const t=this.closest("wa-combobox");t&&(t.handleDefaultSlotChange(),t.selectionChanged?.())})):this.isInitialized=!0}willUpdate(t){if(t.has("defaultSelected")&&!this.closest("wa-combobox, wa-select")?.hasInteracted&&this.defaultSelected){const e=this.selected;this.selected=this.defaultSelected,this.requestUpdate("selected",e)}super.willUpdate(t)}updated(t){super.updated(t),t.has("disabled")&&this.setAttribute("aria-disabled",this.disabled?"true":"false"),t.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.customStates.set("selected",this.selected),this.handleDefaultSlotChange()),t.has("value")&&(typeof this.value!="string"&&(this.value=String(this.value)),this.handleDefaultSlotChange()),t.has("current")&&this.customStates.set("current",this.current)}firstUpdated(t){if(super.firstUpdated(t),this.selected&&!this.defaultSelected){const e=this.closest("wa-select, wa-combobox");e&&!e.hasInteracted&&e.selectionChanged?.()}}updateDefaultLabel(){let t=this.defaultLabel;this.defaultLabel=Fs(this).trim();let e=this.defaultLabel!==t;return!this._label&&e&&this.requestUpdate("label",t),e}render(){return $`
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
    `}};ur.css=iw;c([Q(".label")],ur.prototype,"defaultSlot",2);c([Z()],ur.prototype,"current",2);c([p({reflect:!0})],ur.prototype,"value",2);c([p({type:Boolean})],ur.prototype,"disabled",2);c([p({type:Boolean,attribute:!1})],ur.prototype,"selected",2);c([p({type:Boolean,attribute:"selected"})],ur.prototype,"defaultSelected",2);c([p()],ur.prototype,"label",1);c([Z()],ur.prototype,"defaultLabel",2);ur=c([X("wa-option")],ur);var sw=J`
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
`;var ln=new Set,de=class extends lt{constructor(){super(...arguments),this.anchor=null,this.placement="top",this.open=!1,this.distance=8,this.skidding=0,this.for=null,this.withoutArrow=!1,this.eventController=new AbortController,this.handleAnchorClick=()=>{this.open=!this.open},this.handleBodyClick=t=>{t.target.closest('[data-popover="close"]')&&(t.stopPropagation(),this.open=!1)},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&Sr(this)&&(t.preventDefault(),t.stopPropagation(),this.open=!1,this.anchor&&typeof this.anchor.focus=="function"&&this.anchor.focus())},this.handleDocumentClick=t=>{this.anchor&&t.composedPath().includes(this.anchor)||t.composedPath().includes(this)||(this.open=!1)}}connectedCallback(){super.connectedCallback(),this.id||(this.id=wo("wa-popover-")),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.for&&this.anchor&&(this.anchor=null,this.handleForChange())}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),Cr(this),this.eventController.abort()}firstUpdated(){this.open&&(this.dialog.show(),this.popup.active=!0,this.popup.reposition())}updated(t){t.has("open")&&this.customStates.set("open",this.open)}async handleOpenChange(){if(this.open){const t=new Pi;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}ln.forEach(e=>e.open=!1),document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),document.addEventListener("click",this.handleDocumentClick,{signal:this.eventController.signal}),this.dialog.show(),this.popup.active=!0,ln.add(this),Oi(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&typeof e.focus=="function"?e.focus():this.dialog.focus()}),await Mt(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new Bi)}else{const t=new Ni;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!0;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("click",this.handleDocumentClick),ln.delete(this),Cr(this),await Mt(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.dialog.close(),this.dispatchEvent(new Fi)}}handleForChange(){const t=this.getRootNode();if(!t)return;const e=this.for?t.getElementById(this.for):null,r=this.anchor;if(e===r)return;const{signal:i}=this.eventController;e&&e.addEventListener("click",this.handleAnchorClick,{signal:i}),r&&r.removeEventListener("click",this.handleAnchorClick),this.anchor=e,this.for&&!e&&console.warn(`A popover was assigned to an element with an ID of "${this.for}" but the element could not be found.`,this)}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}async show(){if(!this.open)return this.open=!0,nr(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,nr(this,"wa-after-hide")}render(){return $`
      <dialog part="dialog" class="dialog">
        <wa-popup
          part="popup"
          exportparts="
            popup:popup__popup,
            arrow:popup__arrow
          "
          class=${pt({popover:!0,"popover-open":this.open})}
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
    `}};de.css=sw;de.dependencies={"wa-popup":It};c([Q("dialog")],de.prototype,"dialog",2);c([Q(".body")],de.prototype,"body",2);c([Q("wa-popup")],de.prototype,"popup",2);c([Z()],de.prototype,"anchor",2);c([p()],de.prototype,"placement",2);c([p({type:Boolean,reflect:!0})],de.prototype,"open",2);c([p({type:Number})],de.prototype,"distance",2);c([p({type:Number})],de.prototype,"skidding",2);c([p()],de.prototype,"for",2);c([p({attribute:"without-arrow",type:Boolean,reflect:!0})],de.prototype,"withoutArrow",2);c([tt("open",{waitUntilFirstUpdate:!0})],de.prototype,"handleOpenChange",1);c([tt("for")],de.prototype,"handleForChange",1);c([tt(["distance","placement","skidding"])],de.prototype,"handleOptionsChange",1);de=c([X("wa-popover")],de);var aw=J`
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
`;var os=class extends lt{constructor(){super(...arguments),this.localize=new Et(this),this.value=0,this.indeterminate=!1,this.label=""}updated(t){t.has("value")&&requestAnimationFrame(()=>{this.style.setProperty("--percentage",`${vt(this.value,0,100)}%`)})}render(){return $`
      <div
        part="base"
        class="progress-bar"
        role="progressbar"
        title=${st(this.title)}
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate?"0":this.value}
      >
        <div part="indicator" class="indicator">
          ${this.indeterminate?"":$` <slot part="label" class="label"></slot> `}
        </div>
      </div>
    `}};os.css=aw;c([p({type:Number,reflect:!0})],os.prototype,"value",2);c([p({type:Boolean,reflect:!0})],os.prototype,"indeterminate",2);c([p()],os.prototype,"label",2);os=c([X("wa-progress-bar")],os);var ow=J`
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
`;var zi=class extends lt{constructor(){super(...arguments),this.localize=new Et(this),this.value=0,this.label=""}updated(t){if(super.updated(t),t.has("value")){const e=parseFloat(getComputedStyle(this.indicator).getPropertyValue("r")),r=2*Math.PI*e,i=r-this.value/100*r;this.indicatorOffset=`${i}px`}}render(){return $`
      <div
        part="base"
        class="progress-ring"
        role="progressbar"
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-describedby="label"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.value}"
        style=${Vt({"--percentage":this.value/100})}
      >
        <svg class="image">
          <circle part="track" class="track"></circle>
          <circle
            part="indicator"
            class="indicator"
            style=${Vt({"stroke-dashoffset":this.indicatorOffset})}
          ></circle>
        </svg>

        <slot id="label" part="label" class="label"></slot>
      </div>
    `}};zi.css=ow;c([Q(".indicator")],zi.prototype,"indicator",2);c([Z()],zi.prototype,"indicatorOffset",2);c([p({type:Number,reflect:!0})],zi.prototype,"value",2);c([p()],zi.prototype,"label",2);zi=c([X("wa-progress-ring")],zi);var nw=J`
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
`,cn,We=class extends lt{constructor(){super(...arguments),this.value="",this.label="",this.size=128,this.fill="",this.background="",this.radius=0,this.errorCorrection="H",this.generated=!1}firstUpdated(t){super.firstUpdated(t),this.hasUpdated&&this.generate()}generate(){if(!this.hasUpdated)return;if(!cn){Ve(()=>import("./qr-creator.es6.min-DtlEF1Ls.js"),[]).then(e=>{cn=e.default,this.generate()});return}this.canvas.style.maxWidth=`${this.size}px`,this.canvas.style.maxHeight=`${this.size}px`;const t=getComputedStyle(this);cn.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill||t.color,background:this.background||null,size:this.size*2},this.canvas),this.generated=!0}render(){return $`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${this.label?.length>0?this.label:this.value}
        @transitionend=${t=>{t.propertyName==="color"&&this.generate()}}
      ></canvas>
    `}};We.css=nw;c([Q("canvas")],We.prototype,"canvas",2);c([p()],We.prototype,"value",2);c([p()],We.prototype,"label",2);c([p({type:Number})],We.prototype,"size",2);c([p()],We.prototype,"fill",2);c([p()],We.prototype,"background",2);c([p({type:Number})],We.prototype,"radius",2);c([p({attribute:"error-correction"})],We.prototype,"errorCorrection",2);c([Z()],We.prototype,"generated",2);c([tt(["background","errorCorrection","fill","radius","size","value"],{waitUntilFirstUpdate:!0})],We.prototype,"generate",1);We=c([X("wa-qr-code")],We);var lw=J`
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
`;var Nr=class extends Ft{constructor(){super(),this.checked=!1,this.forceDisabled=!1,this.appearance="default",this.disabled=!1,this.handleClick=()=>{!this.disabled&&!this.forceDisabled&&(this.checked=!0)},this.addEventListener("click",this.handleClick)}connectedCallback(){super.connectedCallback(),this.setInitialAttributes()}setInitialAttributes(){this.setAttribute("role","radio"),this.tabIndex=0,this.setAttribute("aria-disabled",this.disabled||this.forceDisabled?"true":"false")}updated(t){if(super.updated(t),t.has("checked")&&(this.customStates.set("checked",this.checked),this.setAttribute("aria-checked",this.checked?"true":"false"),!this.disabled&&!this.forceDisabled&&(this.tabIndex=this.checked?0:-1)),t.has("disabled")||t.has("forceDisabled")){const e=this.disabled||this.forceDisabled;this.customStates.set("disabled",e),this.setAttribute("aria-disabled",e?"true":"false"),e?this.tabIndex=-1:this.tabIndex=this.checked?0:-1}}setValue(){}render(){return $`
      <span part="control" class="control">
        ${this.checked?$`
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" part="checked-icon" class="checked-icon">
                <circle cx="8" cy="8" r="8" />
              </svg>
            `:""}
      </span>

      <slot part="label" class="label"></slot>
    `}};Nr.css=[Ar,we,lw];c([Z()],Nr.prototype,"checked",2);c([Z()],Nr.prototype,"forceDisabled",2);c([p({reflect:!0})],Nr.prototype,"value",2);c([p({reflect:!0})],Nr.prototype,"appearance",2);c([p({reflect:!0})],Nr.prototype,"size",2);c([p({type:Boolean})],Nr.prototype,"disabled",2);Nr=c([X("wa-radio")],Nr);var cw=J`
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
`;var be=class extends Ft{constructor(){super(),this.hasSlotController=new Ie(this,"hint","label"),this.label="",this.hint="",this.name=null,this.disabled=!1,this.orientation="vertical",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.required=!1,this.withLabel=!1,this.withHint=!1,this.handleRadioClick=t=>{const e=t.target.closest("wa-radio");if(!e||e.disabled||e.forceDisabled||this.disabled)return;const r=this.value;this.value=e.value,e.checked=!0;const i=this.getAllRadios();for(const s of i)e!==s&&(s.checked=!1,s.setAttribute("tabindex","-1"));this.value!==r&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})},this.addEventListener("keydown",this.handleKeyDown),this.addEventListener("click",this.handleRadioClick)}static get validators(){const t=[vo({validationElement:Object.assign(document.createElement("input"),{required:!0,type:"radio",name:wo("__wa-radio")})})];return[...super.validators,...t]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){typeof t=="number"&&(t=String(t)),this.valueHasChanged=!0,this._value=t}get validationTarget(){const t=this.querySelector(":is(wa-radio):not([disabled])");if(t)return t}updated(t){(t.has("disabled")||t.has("size")||t.has("value")||t.has("defaultValue"))&&this.syncRadioElements()}formResetCallback(...t){this._value=null,super.formResetCallback(...t),this.syncRadioElements()}getAllRadios(){return[...this.querySelectorAll("wa-radio")]}handleLabelClick(){this.focus()}async syncRadioElements(){const t=this.getAllRadios();if(t.forEach((e,r)=>{this.size&&e.setAttribute("size",this.size),e.toggleAttribute("data-wa-radio-horizontal",this.orientation!=="vertical"),e.toggleAttribute("data-wa-radio-vertical",this.orientation==="vertical"),e.toggleAttribute("data-wa-radio-first",r===0),e.toggleAttribute("data-wa-radio-inner",r!==0&&r!==t.length-1),e.toggleAttribute("data-wa-radio-last",r===t.length-1),e.forceDisabled=this.disabled}),await Promise.all(t.map(async e=>{await e.updateComplete,!e.disabled&&e.value===this.value?e.checked=!0:e.checked=!1})),this.disabled)t.forEach(e=>{e.tabIndex=-1});else{const e=t.filter(i=>!i.disabled),r=e.find(i=>i.checked);e.length>0&&(r?e.forEach(i=>{i.tabIndex=i.checked?0:-1}):e.forEach((i,s)=>{i.tabIndex=s===0?0:-1})),t.filter(i=>i.disabled).forEach(i=>{i.tabIndex=-1})}}handleKeyDown(t){if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key)||this.disabled)return;const e=this.getAllRadios().filter(n=>!n.disabled);if(e.length<=0)return;t.preventDefault();const r=this.value,i=e.find(n=>n.checked)??e[0],s=t.key===" "?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1;let a=e.indexOf(i)+s;a||(a=0),a<0&&(a=e.length-1),a>e.length-1&&(a=0);const o=e.some(n=>n.tagName.toLowerCase()==="wa-radio-button");this.getAllRadios().forEach(n=>{n.checked=!1,o||n.setAttribute("tabindex","-1")}),this.value=e[a].value,e[a].checked=!0,o?e[a].shadowRoot.querySelector("button").focus():(e[a].setAttribute("tabindex","0"),e[a].focus()),this.value!==r&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),t.preventDefault()}focus(t){if(this.disabled)return;const e=this.getAllRadios(),r=e.find(a=>a.checked),i=e.find(a=>!a.disabled),s=r||i;s&&s.focus(t)}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,r=this.label?!0:!!t,i=this.hint?!0:!!e;return $`
      <fieldset
        part="form-control"
        class=${pt({"form-control":!0,"form-control-radio-group":!0,"form-control-has-label":r})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="hint"
        aria-errormessage="error-message"
        aria-orientation=${this.orientation}
      >
        <label
          part="form-control-label"
          id="label"
          class=${pt({label:!0,"has-label":r})}
          aria-hidden=${r?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <slot part="form-control-input" @slotchange=${this.syncRadioElements}></slot>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${pt({"has-slotted":i})}
          aria-hidden=${i?"false":"true"}
          >${this.hint}</slot
        >
      </fieldset>
    `}};be.css=[we,Ar,cw];be.shadowRootOptions={...Ft.shadowRootOptions,delegatesFocus:!0};c([Q("slot:not([name])")],be.prototype,"defaultSlot",2);c([p()],be.prototype,"label",2);c([p({attribute:"hint"})],be.prototype,"hint",2);c([p({reflect:!0})],be.prototype,"name",2);c([p({type:Boolean,reflect:!0})],be.prototype,"disabled",2);c([p({reflect:!0})],be.prototype,"orientation",2);c([Z()],be.prototype,"value",1);c([p({attribute:"value",reflect:!0})],be.prototype,"defaultValue",2);c([p({reflect:!0})],be.prototype,"size",2);c([p({type:Boolean,reflect:!0})],be.prototype,"required",2);c([p({type:Boolean,attribute:"with-label"})],be.prototype,"withLabel",2);c([p({type:Boolean,attribute:"with-hint"})],be.prototype,"withHint",2);be=c([X("wa-radio-group")],be);var Dc=class extends Event{constructor(t){super("wa-hover",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var dw=J`
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
`;var he=class extends lt{constructor(){super(...arguments),this.localize=new Et(this),this.hoverValue=0,this.isHovering=!1,this.label="",this.value=0,this.max=5,this.precision=1,this.readonly=!1,this.disabled=!1,this.getSymbol=(t,e)=>e?'<wa-icon name="star" library="system" variant="solid"></wa-icon>':'<wa-icon name="star" library="system" variant="regular"></wa-icon>',this.size="medium"}getValueFromMousePosition(t){return this.getValueFromXCoordinate(t.clientX)}getValueFromTouchPosition(t){return this.getValueFromXCoordinate(t.touches[0].clientX)}getValueFromXCoordinate(t){const e=this.localize.dir()==="rtl",{left:r,right:i,width:s}=this.rating.getBoundingClientRect(),a=e?this.roundToPrecision((i-t)/s*this.max,this.precision):this.roundToPrecision((t-r)/s*this.max,this.precision);return vt(a,0,this.max)}handleClick(t){this.disabled||(this.setValue(this.getValueFromMousePosition(t)),this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}setValue(t){this.disabled||this.readonly||(this.value=t===this.value?0:t,this.isHovering=!1)}handleKeyDown(t){const e=this.matches(":dir(ltr)"),r=this.localize.dir()==="rtl",i=this.value;if(!(this.disabled||this.readonly)){if(t.key==="ArrowDown"||e&&t.key==="ArrowLeft"||r&&t.key==="ArrowRight"){const s=t.shiftKey?1:this.precision;this.value=Math.max(0,this.value-s),t.preventDefault()}if(t.key==="ArrowUp"||e&&t.key==="ArrowRight"||r&&t.key==="ArrowLeft"){const s=t.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+s),t.preventDefault()}t.key==="Home"&&(this.value=0,t.preventDefault()),t.key==="End"&&(this.value=this.max,t.preventDefault()),this.value!==i&&this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}}handleMouseEnter(t){this.isHovering=!0,this.hoverValue=this.getValueFromMousePosition(t)}handleMouseMove(t){this.hoverValue=this.getValueFromMousePosition(t)}handleMouseLeave(){this.isHovering=!1}handleTouchStart(t){this.isHovering=!0,this.hoverValue=this.getValueFromTouchPosition(t),t.preventDefault()}handleTouchMove(t){this.hoverValue=this.getValueFromTouchPosition(t)}handleTouchEnd(t){this.isHovering=!1,this.setValue(this.hoverValue),this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),t.preventDefault()}roundToPrecision(t,e=.5){const r=1/e;return Math.ceil(t*r)/r}handleHoverValueChange(){this.dispatchEvent(new Dc({phase:"move",value:this.hoverValue}))}handleIsHoveringChange(){this.dispatchEvent(new Dc({phase:this.isHovering?"start":"end",value:this.hoverValue}))}focus(t){this.rating.focus(t)}blur(){this.rating.blur()}render(){const t=this.hasUpdated?this.localize.dir()==="rtl":this.dir,e=Array.from(Array(this.max).keys());let r=0;return this.disabled||this.readonly?r=this.value:r=this.isHovering?this.hoverValue:this.value,$`
      <div
        part="base"
        class=${pt({rating:!0,"rating-readonly":this.readonly,"rating-disabled":this.disabled})}
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
          ${e.map(i=>{const s=r>=i+1;return r>i&&r<i+1?$`
                <span
                  class=${pt({symbol:!0,"partial-symbol-container":!0,"symbol-hover":this.isHovering&&Math.ceil(r)===i+1})}
                  role="presentation"
                >
                  <div
                    style=${Vt({clipPath:t?`inset(0 ${(r-i)*100}% 0 0)`:`inset(0 0 0 ${(r-i)*100}%)`})}
                  >
                    ${Dr(this.getSymbol(i+1,!1))}
                  </div>
                  <div
                    class="partial-filled"
                    style=${Vt({clipPath:t?`inset(0 0 0 ${100-(r-i)*100}%)`:`inset(0 ${100-(r-i)*100}% 0 0)`})}
                  >
                    ${Dr(this.getSymbol(i+1,!0))}
                  </div>
                </span>
              `:$`
              <span
                class=${pt({symbol:!0,"symbol-hover":this.isHovering&&Math.ceil(r)===i+1,"symbol-active":r>=i+1})}
                role="presentation"
              >
                ${Dr(this.getSymbol(i+1,s))}
              </span>
            `})}
        </span>
      </div>
    `}};he.css=[we,dw];c([Q(".rating")],he.prototype,"rating",2);c([Z()],he.prototype,"hoverValue",2);c([Z()],he.prototype,"isHovering",2);c([p()],he.prototype,"label",2);c([p({type:Number})],he.prototype,"value",2);c([p({type:Number})],he.prototype,"max",2);c([p({type:Number})],he.prototype,"precision",2);c([p({type:Boolean,reflect:!0})],he.prototype,"readonly",2);c([p({type:Boolean,reflect:!0})],he.prototype,"disabled",2);c([p()],he.prototype,"getSymbol",2);c([p({reflect:!0})],he.prototype,"size",2);c([co({passive:!0})],he.prototype,"handleTouchMove",1);c([tt("hoverValue")],he.prototype,"handleHoverValueChange",1);c([tt("isHovering")],he.prototype,"handleIsHoveringChange",1);he=c([X("wa-rating")],he);var hw=[{max:276e4,value:6e4,unit:"minute"},{max:72e6,value:36e5,unit:"hour"},{max:5184e5,value:864e5,unit:"day"},{max:24192e5,value:6048e5,unit:"week"},{max:28512e6,value:2592e6,unit:"month"},{max:1/0,value:31536e6,unit:"year"}],oi=class extends lt{constructor(){super(...arguments),this.localize=new Et(this),this.isoTime="",this.relativeTime="",this.date=new Date,this.format="long",this.numeric="auto",this.sync=!1}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.updateTimeout)}render(){const t=new Date,e=new Date(this.date);if(isNaN(e.getMilliseconds()))return this.relativeTime="",this.isoTime="","";const r=e.getTime()-t.getTime(),{unit:i,value:s}=hw.find(a=>Math.abs(r)<a.max);if(this.isoTime=e.toISOString(),this.relativeTime=this.localize.relativeTime(Math.round(r/s),i,{numeric:this.numeric,style:this.format}),clearTimeout(this.updateTimeout),this.sync){let a;i==="minute"?a=Ca("second"):i==="hour"?a=Ca("minute"):i==="day"?a=Ca("hour"):a=Ca("day"),this.updateTimeout=setTimeout(()=>this.requestUpdate(),a)}return $`<time datetime=${this.isoTime}>${this.relativeTime}</time>`}};c([Z()],oi.prototype,"isoTime",2);c([Z()],oi.prototype,"relativeTime",2);c([p()],oi.prototype,"date",2);c([p()],oi.prototype,"format",2);c([p()],oi.prototype,"numeric",2);c([p({type:Boolean})],oi.prototype,"sync",2);oi=c([X("wa-relative-time")],oi);function Ca(t){const r={second:1e3,minute:6e4,hour:36e5,day:864e5}[t];return r-Date.now()%r}var uw=class extends Event{constructor(t){super("wa-resize",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var pw=J`
  :host {
    display: contents;
  }
`;var Ys=class extends lt{constructor(){super(...arguments),this.observedElements=[],this.disabled=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>{this.dispatchEvent(new uw({entries:t}))}),this.disabled||this.updateComplete.then(()=>{this.startObserver()})}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}handleSlotChange(){this.disabled||this.startObserver()}startObserver(){const t=this.shadowRoot.querySelector("slot");if(t!==null){const e=t.assignedElements({flatten:!0});this.observedElements.forEach(r=>this.resizeObserver.unobserve(r)),this.observedElements=[],e.forEach(r=>{this.resizeObserver.observe(r),this.observedElements.push(r)})}}stopObserver(){this.resizeObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}render(){return $` <slot @slotchange=${this.handleSlotChange}></slot> `}};Ys.css=pw;c([p({type:Boolean,reflect:!0})],Ys.prototype,"disabled",2);c([tt("disabled",{waitUntilFirstUpdate:!0})],Ys.prototype,"handleDisabledChange",1);Ys=c([X("wa-resize-observer")],Ys);var fw=J`
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
`;var Fr=class extends lt{constructor(){super(...arguments),this.localize=new Et(this),this.resizeObserver=new ResizeObserver(()=>this.updateScroll()),this.canScroll=!1,this.orientation="horizontal",this.withoutScrollbar=!1,this.withoutShadow=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.disconnect()}handleKeyDown(t){t.key==="Home"&&(t.preventDefault(),this.content.scrollTo({left:this.orientation==="horizontal"?0:void 0,top:this.orientation==="vertical"?0:void 0})),t.key==="End"&&(t.preventDefault(),this.content.scrollTo({left:this.orientation==="horizontal"?this.content.scrollWidth:void 0,top:this.orientation==="vertical"?this.content.scrollHeight:void 0}))}handleSlotChange(){this.updateScroll()}updateScroll(){if(this.orientation==="horizontal"){const t=Math.ceil(this.content.clientWidth),e=Math.abs(Math.ceil(this.content.scrollLeft)),i=Math.ceil(this.content.scrollWidth)-t;this.canScroll=i>0;const s=Math.min(1,e/(i*.05)),a=Math.min(1,(i-e)/(i*.05));this.style.setProperty("--start-shadow-opacity",String(s||0)),this.style.setProperty("--end-shadow-opacity",String(a||0))}else{const t=Math.ceil(this.content.clientHeight),e=Math.abs(Math.ceil(this.content.scrollTop)),i=Math.ceil(this.content.scrollHeight)-t;this.canScroll=i>0;const s=Math.min(1,e/(i*.05)),a=Math.min(1,(i-e)/(i*.05));this.style.setProperty("--start-shadow-opacity",String(s||0)),this.style.setProperty("--end-shadow-opacity",String(a||0))}}render(){return $`
      ${this.withoutShadow?"":$`
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
    `}};Fr.css=[fw];c([Q("#content")],Fr.prototype,"content",2);c([Z()],Fr.prototype,"canScroll",2);c([p({reflect:!0})],Fr.prototype,"orientation",2);c([p({attribute:"without-scrollbar",type:Boolean,reflect:!0})],Fr.prototype,"withoutScrollbar",2);c([p({attribute:"without-shadow",type:Boolean,reflect:!0})],Fr.prototype,"withoutShadow",2);c([co({passive:!0})],Fr.prototype,"updateScroll",1);Fr=c([X("wa-scroller")],Fr);var mw=J`
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
`;var St=class extends Ft{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new Ie(this,"hint","label"),this.localize=new Et(this),this.selectionOrder=new Map,this.typeToSelectString="",this.displayLabel="",this.selectedOptions=[],this.name="",this._defaultValue=null,this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.required=!1,this.getTag=t=>$`
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
      `,this.handleDocumentFocusIn=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{const e=t.target,r=e.closest('[part~="clear-button"]')!==null,i=e.closest("wa-button")!==null;if(!(r||i)){if(t.key==="Escape"&&this.open&&Sr(this)&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){const s=this.getAllOptions(),a=s.indexOf(this.currentOption);let o=Math.max(0,a);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(o=a+1,o>s.length-1&&(o=0)):t.key==="ArrowUp"?(o=a-1,o<0&&(o=s.length-1)):t.key==="Home"?o=0:t.key==="End"&&(o=s.length-1),this.setCurrentOption(s[o])}if(t.key?.length===1||t.key==="Backspace"){const s=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(const a of s)if(a.label.toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(a);break}}}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()}}static get validators(){const t=[vo({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...t]}get validationTarget(){return this.valueInput}set defaultValue(t){this._defaultValue=this.convertDefaultValue(t)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}convertDefaultValue(t){return!(this.multiple||this.hasAttribute("multiple"))&&Array.isArray(t)&&(t=t[0]),t}set value(t){let e=this.value;t instanceof FormData&&(t=t.getAll(this.name)),t!=null&&!Array.isArray(t)&&(t=[t]),this._value=t??null,this.value!==e&&(this.valueHasChanged=!0,this.requestUpdate("value",e))}get value(){let t=this._value??this.defaultValue??null;t!=null&&(t=Array.isArray(t)?t:[t]),t==null?this.optionValues=new Set(null):this.optionValues=new Set(this.getAllOptions().filter(r=>!r.disabled).map(r=>r.value));let e=t;return t!=null&&(e=t.filter(r=>this.optionValues.has(r)),e=this.multiple?e:e[0],e=e??null),e}connectedCallback(){super.connectedCallback(),this.handleDefaultSlotChange(),this.open=!1}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners()}updateDefaultValue(){const e=this.getAllOptions().filter(r=>r.hasAttribute("selected")||r.defaultSelected);if(e.length>0){const r=e.map(i=>i.value);this._defaultValue=this.multiple?r:r[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),Oi(this),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),Cr(this),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.displayInput.setSelectionRange(0,0)}handleLabelClick(){this.displayInput.focus()}handleComboboxClick(t){t.preventDefault()}handleComboboxMouseDown(t){const r=t.composedPath().some(i=>i instanceof Element&&i.tagName.toLowerCase()==="wa-button");this.disabled||r||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){t.stopPropagation(),this.handleDocumentKeyDown(t)}handleClearClick(t){t.stopPropagation(),this.value!==null&&(this.selectionOrder.clear(),this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new Kd),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){const r=t.target.closest("wa-option");r&&!r.disabled&&(this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(r):this.setSelectedOptions(r),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){customElements.get("wa-option")||customElements.whenDefined("wa-option").then(()=>this.handleDefaultSlotChange());const t=this.getAllOptions();this.optionValues=void 0,this.updateDefaultValue();let e=this.value;if(e==null||!this.valueHasChanged&&!this.hasInteracted){this.selectionChanged();return}Array.isArray(e)||(e=[e]);const r=t.filter(i=>e.includes(i.value));this.setSelectedOptions(r)}handleTagRemove(t,e){if(t.stopPropagation(),this.disabled)return;this.hasInteracted=!0,this.valueHasChanged=!0;let r=e;if(!r){const i=t.target.closest("wa-tag[data-value]");if(i){const s=i.dataset.value;r=this.selectedOptions.find(a=>a.value===s)}}r&&(this.toggleOptionSelection(r,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this?.querySelectorAll?[...this.querySelectorAll("wa-option")]:[]}getFirstOption(){return this.querySelector("wa-option")}setCurrentOption(t){this.getAllOptions().forEach(r=>{r.current=!1,r.tabIndex=-1}),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus({preventScroll:!0}))}setSelectedOptions(t){const e=this.getAllOptions(),r=Array.isArray(t)?t:[t];e.forEach(i=>{r.includes(i)||(i.selected=!1)}),r.length&&r.forEach(i=>i.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){e===!0||e===!1?t.selected=e:t.selected=!t.selected,this.selectionChanged()}selectionChanged(){const e=this.getAllOptions().filter(o=>{if(!this.hasInteracted&&!this.valueHasChanged){const n=this.defaultValue,l=Array.isArray(n)?n:[n];return o.hasAttribute("selected")||o.defaultSelected||o.selected||l?.includes(o.value)}return o.selected}),r=new Set(e.map(o=>o.value));for(const o of this.selectionOrder.keys())r.has(o)||this.selectionOrder.delete(o);let s=(this.selectionOrder.size>0?Math.max(...this.selectionOrder.values()):-1)+1;for(const o of e)this.selectionOrder.has(o.value)||this.selectionOrder.set(o.value,s++);this.selectedOptions=e.sort((o,n)=>{const l=this.selectionOrder.get(o.value)??0,d=this.selectionOrder.get(n.value)??0;return l-d});let a=new Set(this.selectedOptions.map(o=>o.value));if(a.size>0||this._value){const o=this._value;if(this._value==null){let n=this.defaultValue??[];this._value=Array.isArray(n)?n:[n]}this._value=this._value?.filter(n=>!this.optionValues?.has(n))??null,this._value?.unshift(...a),this.requestUpdate("value",o)}if(this.multiple)this.placeholder&&!this.value?.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{const o=this.selectedOptions[0];this.displayLabel=o?.label??""}this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){const r=this.getTag(t,e);return r?typeof r=="string"?Dr(r):r:null}else if(e===this.maxOptionsVisible)return $`
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
        `;return null})}updated(t){super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value],r=t.filter(i=>e.includes(i.value));this.setSelectedOptions(r),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption());const t=new Pi;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await Mt(this.popup.popup,"show"),this.currentOption&&Rn(this.currentOption,this.listbox,"vertical","auto"),this.dispatchEvent(new Bi)}else{const t=new Ni;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.removeOpenListeners(),await Mt(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.dispatchEvent(new Fi)}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,nr(this,"wa-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,nr(this,"wa-after-hide")}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}formResetCallback(){this.selectionOrder.clear(),this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,r=this.label?!0:!!t,i=this.hint?!0:!!e,s=(this.hasUpdated||Zh)&&this.withClear&&!this.disabled&&this.value&&this.value.length>0,a=!!(this.placeholder&&(!this.value||this.value.length===0));return $`
      <div
        part="form-control"
        class=${pt({"form-control":!0,"form-control-has-label":r})}
      >
        <label
          id="label"
          part="form-control-label label"
          class=${pt({label:!0,"has-label":r})}
          aria-hidden=${r?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${pt({select:!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple,"placeholder-visible":a})}
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
              ${this.multiple&&this.hasUpdated?$`<div part="tags" class="tags" @wa-remove=${this.handleTagRemove}>${this.tags}</div>`:""}

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

              ${s?$`
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
          class=${pt({"has-slotted":i})}
          aria-hidden=${i?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};St.css=[mw,Ar,we];c([Q(".select")],St.prototype,"popup",2);c([Q(".combobox")],St.prototype,"combobox",2);c([Q(".display-input")],St.prototype,"displayInput",2);c([Q(".value-input")],St.prototype,"valueInput",2);c([Q(".listbox")],St.prototype,"listbox",2);c([Z()],St.prototype,"displayLabel",2);c([Z()],St.prototype,"currentOption",2);c([Z()],St.prototype,"selectedOptions",2);c([Z()],St.prototype,"optionValues",2);c([p({reflect:!0})],St.prototype,"name",2);c([p({attribute:!1})],St.prototype,"defaultValue",1);c([p({attribute:"value",reflect:!1})],St.prototype,"value",1);c([p({reflect:!0})],St.prototype,"size",2);c([p()],St.prototype,"placeholder",2);c([p({type:Boolean,reflect:!0})],St.prototype,"multiple",2);c([p({attribute:"max-options-visible",type:Number})],St.prototype,"maxOptionsVisible",2);c([p({type:Boolean})],St.prototype,"disabled",2);c([p({attribute:"with-clear",type:Boolean})],St.prototype,"withClear",2);c([p({type:Boolean,reflect:!0})],St.prototype,"open",2);c([p({reflect:!0})],St.prototype,"appearance",2);c([p({type:Boolean,reflect:!0})],St.prototype,"pill",2);c([p()],St.prototype,"label",2);c([p({reflect:!0})],St.prototype,"placement",2);c([p({attribute:"hint"})],St.prototype,"hint",2);c([p({attribute:"with-label",type:Boolean})],St.prototype,"withLabel",2);c([p({attribute:"with-hint",type:Boolean})],St.prototype,"withHint",2);c([p({type:Boolean,reflect:!0})],St.prototype,"required",2);c([p({attribute:!1})],St.prototype,"getTag",2);c([tt("disabled",{waitUntilFirstUpdate:!0})],St.prototype,"handleDisabledChange",1);c([tt("value",{waitUntilFirstUpdate:!0})],St.prototype,"handleValueChange",1);c([tt("open",{waitUntilFirstUpdate:!0})],St.prototype,"handleOpenChange",1);St=c([X("wa-select")],St);var gw=class extends Event{constructor(){super("wa-remove",{bubbles:!0,cancelable:!1,composed:!0})}};var bw=J`
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
`;var ni=class extends lt{constructor(){super(...arguments),this.localize=new Et(this),this.variant="neutral",this.appearance="filled-outlined",this.size="medium",this.pill=!1,this.withRemove=!1}handleRemoveClick(){this.dispatchEvent(new gw)}render(){return $`
      <slot part="content" class="content"></slot>

      ${this.withRemove?$`
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
    `}};ni.css=[bw,bo,we];c([p({reflect:!0})],ni.prototype,"variant",2);c([p({reflect:!0})],ni.prototype,"appearance",2);c([p({reflect:!0})],ni.prototype,"size",2);c([p({type:Boolean,reflect:!0})],ni.prototype,"pill",2);c([p({attribute:"with-remove",type:Boolean})],ni.prototype,"withRemove",2);ni=c([X("wa-tag")],ni);var ww=J`
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
`;var to=class extends lt{constructor(){super(...arguments),this.effect="none"}render(){return $` <div part="indicator" class="indicator"></div> `}};to.css=ww;c([p({reflect:!0})],to.prototype,"effect",2);to=c([X("wa-skeleton")],to);var vw=J`
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
`;var yw=()=>{const t=Object.assign(document.createElement("input"),{type:"range",required:!0});return{observedAttributes:["required","min","max","step"],checkValidity(e){const r={message:"",isValid:!0,invalidKeys:[]},i=(s,a,o,n)=>{const l=document.createElement("input");return l.type="range",l.min=String(a),l.max=String(o),l.step=String(n),l.value=String(s),l.checkValidity(),l.validationMessage};if(e.required&&!e.hasInteracted)return r.isValid=!1,r.invalidKeys.push("valueMissing"),r.message=t.validationMessage||"Please fill out this field.",r;if(e.isRange){const s=e.minValue,a=e.maxValue;if(s<e.min)return r.isValid=!1,r.invalidKeys.push("rangeUnderflow"),r.message=i(s,e.min,e.max,e.step)||`Value must be greater than or equal to ${e.min}.`,r;if(a>e.max)return r.isValid=!1,r.invalidKeys.push("rangeOverflow"),r.message=i(a,e.min,e.max,e.step)||`Value must be less than or equal to ${e.max}.`,r;if(e.step&&e.step!==1){const o=(s-e.min)%e.step!==0,n=(a-e.min)%e.step!==0;if(o||n){r.isValid=!1,r.invalidKeys.push("stepMismatch");const l=o?s:a;return r.message=i(l,e.min,e.max,e.step)||`Value must be a multiple of ${e.step}.`,r}}}else{const s=e.value;if(s<e.min)return r.isValid=!1,r.invalidKeys.push("rangeUnderflow"),r.message=i(s,e.min,e.max,e.step)||`Value must be greater than or equal to ${e.min}.`,r;if(s>e.max)return r.isValid=!1,r.invalidKeys.push("rangeOverflow"),r.message=i(s,e.min,e.max,e.step)||`Value must be less than or equal to ${e.max}.`,r;if(e.step&&e.step!==1&&(s-e.min)%e.step!==0)return r.isValid=!1,r.invalidKeys.push("stepMismatch"),r.message=i(s,e.min,e.max,e.step)||`Value must be a multiple of ${e.step}.`,r}return r}}},$t=class extends Ft{constructor(){super(...arguments),this.draggableThumbMin=null,this.draggableThumbMax=null,this.hasSlotController=new Ie(this,"hint","label"),this.localize=new Et(this),this.activeThumb=null,this.lastTrackPosition=null,this.label="",this.hint="",this.minValue=0,this.maxValue=50,this.defaultValue=this.getAttribute("value")==null?this.minValue:Number(this.getAttribute("value")),this._value=null,this.range=!1,this.disabled=!1,this.readonly=!1,this.orientation="horizontal",this.size="medium",this.min=0,this.max=100,this.step=1,this.required=!1,this.tooltipDistance=8,this.tooltipPlacement="top",this.withMarkers=!1,this.withTooltip=!1}static get validators(){return[...super.validators,yw()]}get focusableAnchor(){return this.isRange?this.thumbMin||this.slider:this.slider}get validationTarget(){return this.focusableAnchor}get value(){if(this.valueHasChanged){const e=this._value??this.minValue??0;return vt(e,this.min,this.max)}const t=this._value??this.defaultValue;return vt(t,this.min,this.max)}set value(t){t=Number(t)??this.minValue,this._value!==t&&(this.valueHasChanged=!0,this._value=t)}get isRange(){return this.range}firstUpdated(){this.isRange?(this.draggableThumbMin=new ba(this.thumbMin,{start:()=>{this.activeThumb="min",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.minValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(t,e)=>{this.setThumbValueFromCoordinates(t,e,"min")},stop:()=>{this.minValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableThumbMax=new ba(this.thumbMax,{start:()=>{this.activeThumb="max",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.maxValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(t,e)=>{this.setThumbValueFromCoordinates(t,e,"max")},stop:()=>{this.maxValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableTrack=new ba(this.track,{start:(t,e)=>{if(this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.activeThumb)this.valueWhenDraggingStarted=this.activeThumb==="min"?this.minValue:this.maxValue;else{const r=this.getValueFromCoordinates(t,e),i=Math.abs(r-this.minValue),s=Math.abs(r-this.maxValue);if(i===s)if(r>this.maxValue)this.activeThumb="max";else if(r<this.minValue)this.activeThumb="min";else{const a=this.localize.dir()==="rtl",o=this.orientation==="vertical",n=o?e:t,l=this.lastTrackPosition||n;this.lastTrackPosition=n;const d=n>l!==a&&!o||n<l&&o;this.activeThumb=d?"max":"min"}else this.activeThumb=i<=s?"min":"max";this.valueWhenDraggingStarted=this.activeThumb==="min"?this.minValue:this.maxValue}this.customStates.set("dragging",!0),this.setThumbValueFromCoordinates(t,e,this.activeThumb),this.showRangeTooltips()},move:(t,e)=>{this.activeThumb&&this.setThumbValueFromCoordinates(t,e,this.activeThumb)},stop:()=>{this.activeThumb&&(this.activeThumb==="min"?this.minValue:this.maxValue)!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}})):this.draggableTrack=new ba(this.slider,{start:(t,e)=>{this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.value,this.customStates.set("dragging",!0),this.setValueFromCoordinates(t,e),this.showTooltip()},move:(t,e)=>{this.setValueFromCoordinates(t,e)},stop:()=>{this.value!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideTooltip(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0}})}updated(t){if(t.has("range")&&this.requestUpdate(),this.isRange?(t.has("minValue")||t.has("maxValue"))&&(this.minValue=vt(this.minValue,this.min,this.maxValue),this.maxValue=vt(this.maxValue,this.minValue,this.max),this.updateFormValue()):t.has("value")&&this.setValue(String(this.value)),(t.has("min")||t.has("max"))&&this.isRange&&(this.minValue=vt(this.minValue,this.min,this.max),this.maxValue=vt(this.maxValue,this.min,this.max)),t.has("disabled")&&this.customStates.set("disabled",this.disabled),t.has("disabled")||t.has("readonly")){const e=!(this.disabled||this.readonly);this.isRange&&(this.draggableThumbMin&&this.draggableThumbMin.toggle(e),this.draggableThumbMax&&this.draggableThumbMax.toggle(e)),this.draggableTrack&&this.draggableTrack.toggle(e)}super.updated(t)}formDisabledCallback(t){this.disabled=t}formResetCallback(){this.isRange?(this.minValue=parseFloat(this.getAttribute("min-value")??String(this.min)),this.maxValue=parseFloat(this.getAttribute("max-value")??String(this.max))):(this._value=null,this.defaultValue=this.defaultValue??parseFloat(this.getAttribute("value")??String(this.min))),this.valueHasChanged=!1,this.hasInteracted=!1,super.formResetCallback()}clampAndRoundToStep(t){const e=(String(this.step).split(".")[1]||"").replace(/0+$/g,"").length,r=Number(this.step),i=Number(this.min),s=Number(this.max);return t=Math.round(t/r)*r,t=vt(t,i,s),parseFloat(t.toFixed(e))}getPercentageFromValue(t){return(t-this.min)/(this.max-this.min)*100}getValueFromCoordinates(t,e){const r=this.localize.dir()==="rtl",i=this.orientation==="vertical",{top:s,right:a,bottom:o,left:n,height:l,width:d}=this.trackBoundingClientRect,h=i?e:t,f=i?{start:s,end:o,size:l}:{start:n,end:a,size:d},u=(i||r?f.end-h:h-f.start)/f.size;return this.clampAndRoundToStep(this.min+(this.max-this.min)*u)}handleBlur(){this.isRange?requestAnimationFrame(()=>{const t=this.shadowRoot?.activeElement;t===this.thumbMin||t===this.thumbMax||this.hideRangeTooltips()}):this.hideTooltip(),this.customStates.set("focused",!1),this.dispatchEvent(new FocusEvent("blur",{bubbles:!0,composed:!0}))}handleFocus(t){const e=t.target;this.isRange?(e===this.thumbMin?this.activeThumb="min":e===this.thumbMax&&(this.activeThumb="max"),this.showRangeTooltips()):this.showTooltip(),this.customStates.set("focused",!0),this.dispatchEvent(new FocusEvent("focus",{bubbles:!0,composed:!0}))}handleKeyDown(t){const e=this.localize.dir()==="rtl",r=t.target;if(this.disabled||this.readonly||this.isRange&&(r===this.thumbMin?this.activeThumb="min":r===this.thumbMax&&(this.activeThumb="max"),!this.activeThumb))return;const i=this.isRange?this.activeThumb==="min"?this.minValue:this.maxValue:this.value;let s=i;switch(t.key){case"ArrowUp":case(e?"ArrowLeft":"ArrowRight"):t.preventDefault(),s=this.clampAndRoundToStep(i+this.step);break;case"ArrowDown":case(e?"ArrowRight":"ArrowLeft"):t.preventDefault(),s=this.clampAndRoundToStep(i-this.step);break;case"Home":t.preventDefault(),s=this.isRange&&this.activeThumb==="min"?this.min:this.isRange?this.minValue:this.min;break;case"End":t.preventDefault(),s=this.isRange&&this.activeThumb==="max"?this.max:this.isRange?this.maxValue:this.max;break;case"PageUp":t.preventDefault();const a=Math.max(i+(this.max-this.min)/10,i+this.step);s=this.clampAndRoundToStep(a);break;case"PageDown":t.preventDefault();const o=Math.min(i-(this.max-this.min)/10,i-this.step);s=this.clampAndRoundToStep(o);break;case"Enter":gl(t,this);return}s!==i&&(this.isRange?(this.activeThumb==="min"?s>this.maxValue?(this.maxValue=s,this.minValue=s):this.minValue=Math.max(this.min,s):s<this.minValue?(this.minValue=s,this.maxValue=s):this.maxValue=Math.min(this.max,s),this.updateFormValue()):this.value=vt(s,this.min,this.max),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0)}handleLabelPointerDown(t){t.preventDefault(),this.disabled||(this.isRange?this.thumbMin?.focus():this.slider.focus())}setValueFromCoordinates(t,e){const r=this.value;this.value=this.getValueFromCoordinates(t,e),this.value!==r&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})}setThumbValueFromCoordinates(t,e,r){const i=this.getValueFromCoordinates(t,e),s=r==="min"?this.minValue:this.maxValue;r==="min"?i>this.maxValue?(this.maxValue=i,this.minValue=i):this.minValue=Math.max(this.min,i):i<this.minValue?(this.minValue=i,this.maxValue=i):this.maxValue=Math.min(this.max,i),s!==(r==="min"?this.minValue:this.maxValue)&&(this.updateFormValue(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}showTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!0)}hideTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!1)}showRangeTooltips(){if(!this.withTooltip)return;const t=this.shadowRoot?.getElementById("tooltip-thumb-min"),e=this.shadowRoot?.getElementById("tooltip-thumb-max");this.activeThumb==="min"?(t&&(t.open=!0),e&&(e.open=!1)):this.activeThumb==="max"&&(e&&(e.open=!0),t&&(t.open=!1))}hideRangeTooltips(){if(!this.withTooltip)return;const t=this.shadowRoot?.getElementById("tooltip-thumb-min"),e=this.shadowRoot?.getElementById("tooltip-thumb-max");t&&(t.open=!1),e&&(e.open=!1)}updateFormValue(){if(this.isRange){const t=new FormData;t.append(this.name||"",String(this.minValue)),t.append(this.name||"",String(this.maxValue)),this.setValue(t)}}focus(){this.isRange?this.thumbMin?.focus():this.slider.focus()}blur(){this.isRange?document.activeElement===this.thumbMin?this.thumbMin.blur():document.activeElement===this.thumbMax&&this.thumbMax.blur():this.slider.blur()}stepDown(){if(this.isRange){const t=this.clampAndRoundToStep(this.minValue-this.step);this.minValue=vt(t,this.min,this.maxValue),this.updateFormValue()}else{const t=this.clampAndRoundToStep(this.value-this.step);this.value=t}}stepUp(){if(this.isRange){const t=this.clampAndRoundToStep(this.maxValue+this.step);this.maxValue=vt(t,this.minValue,this.max),this.updateFormValue()}else{const t=this.clampAndRoundToStep(this.value+this.step);this.value=t}}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("hint"),r=this.label?!0:!!t,i=this.hint?!0:!!e,s=this.hasSlotController.test("reference"),a=pt({small:this.size==="small",medium:this.size==="medium",large:this.size==="large",horizontal:this.orientation==="horizontal",vertical:this.orientation==="vertical",disabled:this.disabled}),o=[];if(this.withMarkers)for(let g=this.min;g<=this.max;g+=this.step)o.push(this.getPercentageFromValue(g));const n=$`
      <label
        id="label"
        part="label"
        for=${this.isRange?"thumb-min":"text-box"}
        class=${pt({vh:!r,"has-label":r})}
        @pointerdown=${this.handleLabelPointerDown}
      >
        <slot name="label">${this.label}</slot>
      </label>
    `,l=$`
      <div
        id="hint"
        part="hint"
        class=${pt({"has-slotted":i})}
      >
        <slot name="hint">${this.hint}</slot>
      </div>
    `,d=this.withMarkers?$`
          <div id="markers" part="markers">
            ${o.map(g=>$`<span part="marker" class="marker" style=${Vt({"--position":`${g}%`})}></span>`)}
          </div>
        `:"",h=s?$`
          <div id="references" part="references" aria-hidden="true">
            <slot name="reference"></slot>
          </div>
        `:"",f=(g,u)=>this.withTooltip?$`
            <wa-tooltip
              id=${`tooltip${g!=="thumb"?"-"+g:""}`}
              part="tooltip"
              exportparts="
                base:tooltip__base,
                body:tooltip__body,
                arrow:tooltip__arrow
              "
              trigger="manual"
              distance=${this.tooltipDistance}
              placement=${this.tooltipPlacement}
              for=${g}
              activation="manual"
              dir=${this.localize.dir()}
            >
              <span aria-hidden="true">
                ${typeof this.valueFormatter=="function"?this.valueFormatter(u):this.localize.number(u)}
              </span>
            </wa-tooltip>
          `:"";if(this.isRange){const g=vt(this.getPercentageFromValue(this.minValue),0,100),u=vt(this.getPercentageFromValue(this.maxValue),0,100);return $`
        ${n}

        <div id="slider" part="slider" class=${a}>
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style=${Vt({"--start":`${Math.min(g,u)}%`,"--end":`${Math.max(g,u)}%`})}
            ></div>

            ${d}

            <span
              id="thumb-min"
              part="thumb thumb-min"
              style=${Vt({"--position":`${g}%`})}
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
              style=${Vt({"--position":`${u}%`})}
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

          ${h} ${l}
        </div>

        ${f("thumb-min",this.minValue)} ${f("thumb-max",this.maxValue)}
      `}else{const g=vt(this.getPercentageFromValue(this.value),0,100),u=vt(this.getPercentageFromValue(typeof this.indicatorOffset=="number"?this.indicatorOffset:this.min),0,100);return $`
        ${n}

        <div
          id="slider"
          part="slider"
          class=${a}
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
              style=${Vt({"--start":`${u}%`,"--end":`${g}%`})}
            ></div>

            ${d}
            <span id="thumb" part="thumb" style=${Vt({"--position":`${g}%`})}></span>
          </div>

          ${h} ${l}
        </div>

        ${f("thumb",this.value)}
      `}}};$t.formAssociated=!0;$t.observeSlots=!0;$t.css=[we,Ar,vw];c([Q("#slider")],$t.prototype,"slider",2);c([Q("#thumb")],$t.prototype,"thumb",2);c([Q("#thumb-min")],$t.prototype,"thumbMin",2);c([Q("#thumb-max")],$t.prototype,"thumbMax",2);c([Q("#track")],$t.prototype,"track",2);c([Q("#tooltip")],$t.prototype,"tooltip",2);c([p()],$t.prototype,"label",2);c([p({attribute:"hint"})],$t.prototype,"hint",2);c([p({reflect:!0})],$t.prototype,"name",2);c([p({type:Number,attribute:"min-value"})],$t.prototype,"minValue",2);c([p({type:Number,attribute:"max-value"})],$t.prototype,"maxValue",2);c([p({attribute:"value",reflect:!0,type:Number})],$t.prototype,"defaultValue",2);c([Z()],$t.prototype,"value",1);c([p({type:Boolean,reflect:!0})],$t.prototype,"range",2);c([p({type:Boolean})],$t.prototype,"disabled",2);c([p({type:Boolean,reflect:!0})],$t.prototype,"readonly",2);c([p({reflect:!0})],$t.prototype,"orientation",2);c([p({reflect:!0})],$t.prototype,"size",2);c([p({attribute:"indicator-offset",type:Number})],$t.prototype,"indicatorOffset",2);c([p({type:Number})],$t.prototype,"min",2);c([p({type:Number})],$t.prototype,"max",2);c([p({type:Number})],$t.prototype,"step",2);c([p({type:Boolean,reflect:!0})],$t.prototype,"required",2);c([p({type:Boolean})],$t.prototype,"autofocus",2);c([p({attribute:"tooltip-distance",type:Number})],$t.prototype,"tooltipDistance",2);c([p({attribute:"tooltip-placement",reflect:!0})],$t.prototype,"tooltipPlacement",2);c([p({attribute:"with-markers",type:Boolean})],$t.prototype,"withMarkers",2);c([p({attribute:"with-tooltip",type:Boolean})],$t.prototype,"withTooltip",2);c([p({attribute:!1})],$t.prototype,"valueFormatter",2);$t=c([X("wa-slider")],$t);var xw=J`
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
`;var ze=class extends lt{constructor(){super(...arguments),this.isCollapsed=!1,this.localize=new Et(this),this.positionBeforeCollapsing=0,this.position=50,this.orientation="horizontal",this.disabled=!1,this.snapThreshold=12}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>this.handleResize(t)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.unobserve(this)}detectSize(){const{width:t,height:e}=this.getBoundingClientRect();this.size=this.orientation==="vertical"?e:t}percentageToPixels(t){return this.size*(t/100)}pixelsToPercentage(t){return t/this.size*100}handleDrag(t){const e=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";this.disabled||(t.cancelable&&t.preventDefault(),qs(this,{onMove:(r,i)=>{let s=this.orientation==="vertical"?i:r;this.primary==="end"&&(s=this.size-s),this.snap&&this.snap.split(" ").forEach(o=>{let n;o.endsWith("%")?n=this.size*(parseFloat(o)/100):n=parseFloat(o),e&&this.orientation==="horizontal"&&(n=this.size-n),s>=n-this.snapThreshold&&s<=n+this.snapThreshold&&(s=n)}),this.position=vt(this.pixelsToPercentage(s),0,100)},initialEvent:t}))}handleKeyDown(t){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","Enter"].includes(t.key)){let e=this.position;const r=(t.shiftKey?10:1)*(this.primary==="end"?-1:1);if(t.preventDefault(),(t.key==="ArrowLeft"&&this.orientation==="horizontal"||t.key==="ArrowUp"&&this.orientation==="vertical")&&(e-=r),(t.key==="ArrowRight"&&this.orientation==="horizontal"||t.key==="ArrowDown"&&this.orientation==="vertical")&&(e+=r),t.key==="Home"&&(e=this.primary==="end"?100:0),t.key==="End"&&(e=this.primary==="end"?0:100),t.key==="Enter")if(this.isCollapsed)e=this.positionBeforeCollapsing,this.isCollapsed=!1;else{const i=this.position;e=0,requestAnimationFrame(()=>{this.isCollapsed=!0,this.positionBeforeCollapsing=i})}this.position=vt(e,0,100)}}handleResize(t){const{width:e,height:r}=t[0].contentRect;if(this.size=this.orientation==="vertical"?r:e,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute("position-in-pixels")),this.positionInPixels=Number(this.getAttribute("position-in-pixels")),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary){const i=this.pixelsToPercentage(this.cachedPositionInPixels);this.position!==i&&(this.position=i)}}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position);const t=this.percentageToPixels(this.position);this.positionInPixels!==t&&(this.positionInPixels=t),this.isCollapsed=!1,this.positionBeforeCollapsing=0,this.dispatchEvent(new Gd)}handlePositionInPixelsChange(){const t=this.pixelsToPercentage(this.positionInPixels);this.position!==t&&(this.position=t)}handleVerticalChange(){this.detectSize()}render(){const t=this.orientation==="vertical"?"gridTemplateRows":"gridTemplateColumns",e=this.orientation==="vertical"?"gridTemplateColumns":"gridTemplateRows",r=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl",i=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,s="auto";return this.style||(this.style={}),this.primary==="end"?r&&this.orientation==="horizontal"?this.style[t]=`${i} var(--divider-width) ${s}`:this.style[t]=`${s} var(--divider-width) ${i}`:r&&this.orientation==="horizontal"?this.style[t]=`${s} var(--divider-width) ${i}`:this.style[t]=`${i} var(--divider-width) ${s}`,this.style[e]="",$`
      <slot name="start" part="panel start" class="start"></slot>

      <div
        part="divider"
        class="divider"
        tabindex=${st(this.disabled?void 0:"0")}
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
    `}};ze.css=xw;c([Q(".divider")],ze.prototype,"divider",2);c([p({type:Number,reflect:!0})],ze.prototype,"position",2);c([p({attribute:"position-in-pixels",type:Number})],ze.prototype,"positionInPixels",2);c([p({reflect:!0})],ze.prototype,"orientation",2);c([p({type:Boolean,reflect:!0})],ze.prototype,"disabled",2);c([p()],ze.prototype,"primary",2);c([p()],ze.prototype,"snap",2);c([p({type:Number,attribute:"snap-threshold"})],ze.prototype,"snapThreshold",2);c([tt("position")],ze.prototype,"handlePositionChange",1);c([tt("positionInPixels")],ze.prototype,"handlePositionInPixelsChange",1);c([tt("vertical")],ze.prototype,"handleVerticalChange",1);ze=c([X("wa-split-panel")],ze);var kw=J`
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
`;var ue=class extends Ft{constructor(){super(...arguments),this.hasSlotController=new Ie(this,"hint"),this.title="",this.name=null,this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this._checked=null,this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint="",this.withHint=!1}static get validators(){return[...super.validators,na()]}get value(){return this._value??"on"}set value(t){this._value=t}get checked(){return this.valueHasChanged?!!this._checked:this._checked??this.defaultChecked}set checked(t){this._checked=!!t,this.valueHasChanged=!0}firstUpdated(t){super.firstUpdated(t),this.handleValueOrCheckedChange()}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleKeyDown(t){t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=!0,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}willUpdate(t){super.willUpdate(t),(t.has("value")||t.has("checked")||t.has("defaultChecked"))&&this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked),this.customStates.set("checked",this.checked),this.updateValidity()}handleDisabledChange(){this.updateValidity()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}setValue(t,e){if(!this.checked){this.internals.setFormValue(null,null);return}this.internals.setFormValue(t??"on",e)}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}render(){const t=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,e=this.hint?!0:!!t;return $`
      <label
        part="base"
        class=${pt({checked:this.checked,disabled:this.disabled})}
      >
        <input
          class="input"
          type="checkbox"
          title=${this.title}
          name=${st(this.name)}
          value=${st(this.value)}
          .checked=${Ei(this.checked)}
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
        class=${pt({"has-slotted":e})}
        aria-hidden=${e?"false":"true"}
        >${this.hint}</slot
      >
    `}};ue.shadowRootOptions={...Ft.shadowRootOptions,delegatesFocus:!0};ue.css=[Ar,we,kw];c([Q('input[type="checkbox"]')],ue.prototype,"input",2);c([p()],ue.prototype,"title",2);c([p({reflect:!0})],ue.prototype,"name",2);c([p({reflect:!0})],ue.prototype,"value",1);c([p({reflect:!0})],ue.prototype,"size",2);c([p({type:Boolean})],ue.prototype,"disabled",2);c([p({type:Boolean,attribute:!1})],ue.prototype,"checked",1);c([p({type:Boolean,attribute:"checked",reflect:!0})],ue.prototype,"defaultChecked",2);c([p({type:Boolean,reflect:!0})],ue.prototype,"required",2);c([p({attribute:"hint"})],ue.prototype,"hint",2);c([p({attribute:"with-hint",type:Boolean})],ue.prototype,"withHint",2);c([tt(["checked","defaultChecked"])],ue.prototype,"handleStateChange",1);c([tt("disabled",{waitUntilFirstUpdate:!0})],ue.prototype,"handleDisabledChange",1);ue=c([X("wa-switch")],ue);var Cw=J`
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
`;var Sw=0,_r=class extends lt{constructor(){super(...arguments),this.attrId=++Sw,this.componentId=`wa-tab-${this.attrId}`,this.panel="",this.active=!1,this.disabled=!1,this.tabIndex=0}connectedCallback(){this.slot||(this.slot="nav"),super.connectedCallback(),this.setAttribute("role","tab")}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0}render(){return this.id=this.id?.length>0?this.id:this.componentId,$`
      <div
        part="base"
        class=${pt({tab:!0,"tab-active":this.active})}
      >
        <slot></slot>
      </div>
    `}};_r.css=Cw;c([Q(".tab")],_r.prototype,"tab",2);c([p({reflect:!0})],_r.prototype,"panel",2);c([p({type:Boolean,reflect:!0})],_r.prototype,"active",2);c([p({type:Boolean,reflect:!0})],_r.prototype,"disabled",2);c([p({type:Number,reflect:!0})],_r.prototype,"tabIndex",2);c([tt("active")],_r.prototype,"handleActiveChange",1);c([tt("disabled")],_r.prototype,"handleDisabledChange",1);_r=c([X("wa-tab")],_r);var $w=class extends Event{constructor(t){super("wa-tab-hide",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var _w=class extends Event{constructor(t){super("wa-tab-show",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Ew=J`
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
`;var qe=class extends lt{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new Et(this),this.hasScrollControls=!1,this.active="",this.placement="top",this.activation="auto",this.withoutScrollControls=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.updateScrollControls()}),this.mutationObserver=new MutationObserver(t=>{t.some(r=>!["aria-labelledby","aria-controls"].includes(r.attributeName))&&setTimeout(()=>this.setAriaLabels());const e=t.filter(r=>r.target.closest("wa-tab-group")===this);if(e.some(r=>r.attributeName==="disabled"))this.syncTabsAndPanels();else if(e.some(r=>r.attributeName==="active")){const i=e.filter(s=>s.attributeName==="active"&&s.target.tagName.toLowerCase()==="wa-tab").map(s=>s.target).find(s=>s.active);i&&i.closest("wa-tab-group")===this&&this.setActiveTab(i)}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),new IntersectionObserver((e,r)=>{if(e[0].intersectionRatio>0){if(this.setAriaLabels(),this.active){const i=this.tabs.find(s=>s.panel===this.active);i&&this.setActiveTab(i)}else this.setActiveTab(this.getActiveTab()??this.tabs[0],{emitEvents:!1});r.unobserve(e[0].target)}}).observe(this.tabGroup)})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect(),this.nav&&this.resizeObserver?.unobserve(this.nav)}getAllTabs(){return[...this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()].filter(e=>e.tagName.toLowerCase()==="wa-tab")}getAllPanels(){return[...this.body.assignedElements()].filter(t=>t.tagName.toLowerCase()==="wa-tab-panel")}getActiveTab(){return this.tabs.find(t=>t.active)}handleClick(t){const r=t.target.closest("wa-tab");r?.closest("wa-tab-group")===this&&r!==null&&this.setActiveTab(r,{scrollBehavior:"smooth"})}handleKeyDown(t){const r=t.target.closest("wa-tab");if(r?.closest("wa-tab-group")===this){if(["Enter"," "].includes(t.key)){r!==null&&(this.setActiveTab(r,{scrollBehavior:"smooth"}),t.preventDefault());return}if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key)){const s=this.tabs.find(n=>n.matches(":focus")),a=this.localize.dir()==="rtl";let o=null;if(s?.tagName.toLowerCase()==="wa-tab"){if(t.key==="Home")o=this.focusableTabs[0];else if(t.key==="End")o=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&t.key===(a?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&t.key==="ArrowUp"){const n=this.tabs.findIndex(l=>l===s);o=this.findNextFocusableTab(n,"backward")}else if(["top","bottom"].includes(this.placement)&&t.key===(a?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&t.key==="ArrowDown"){const n=this.tabs.findIndex(l=>l===s);o=this.findNextFocusableTab(n,"forward")}if(!o)return;o.tabIndex=0,o.focus({preventScroll:!0}),this.activation==="auto"?this.setActiveTab(o,{scrollBehavior:"smooth"}):this.tabs.forEach(n=>{n.tabIndex=n===o?0:-1}),["top","bottom"].includes(this.placement)&&Rn(o,this.nav,"horizontal"),t.preventDefault()}}}}findNextFocusableTab(t,e){let r=null;const i=e==="forward"?1:-1;let s=t+i;for(;t<this.tabs.length;){if(r=this.tabs[s]||null,r===null){e==="forward"?r=this.focusableTabs[0]:r=this.focusableTabs[this.focusableTabs.length-1];break}if(!r.disabled)break;s+=i}return r}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(t,e){if(e={emitEvents:!0,scrollBehavior:"auto",...e},t.closest("wa-tab-group")===this&&t!==this.activeTab&&!t.disabled){const r=this.activeTab;this.active=t.panel,this.activeTab=t,this.tabs.forEach(i=>{i.active=i===this.activeTab,i.tabIndex=i===this.activeTab?0:-1}),this.panels.forEach(i=>i.active=i.name===this.activeTab?.panel),["top","bottom"].includes(this.placement)&&Rn(this.activeTab,this.nav,"horizontal",e.scrollBehavior),e.emitEvents&&(r&&this.dispatchEvent(new $w({name:r.panel})),this.dispatchEvent(new _w({name:this.activeTab.panel})))}}setAriaLabels(){this.tabs.forEach(t=>{const e=this.panels.find(r=>r.name===t.panel);e&&(t.setAttribute("aria-controls",e.getAttribute("id")),e.setAttribute("aria-labelledby",t.getAttribute("id")))})}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(t=>!t.disabled),this.panels=this.getAllPanels(),this.updateComplete.then(()=>this.updateScrollControls())}updateActiveTab(){const t=this.tabs.find(e=>e.panel===this.active);t&&this.setActiveTab(t,{scrollBehavior:"smooth"})}updateScrollControls(){this.withoutScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1}render(){const t=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return $`
      <div
        part="base"
        class=${pt({"tab-group":!0,"tab-group-top":this.placement==="top","tab-group-bottom":this.placement==="bottom","tab-group-start":this.placement==="start","tab-group-end":this.placement==="end","tab-group-has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="nav-container" part="nav">
          ${this.hasScrollControls?$`
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

          ${this.hasScrollControls?$`
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
    `}};qe.css=Ew;c([Q(".tab-group")],qe.prototype,"tabGroup",2);c([Q(".body")],qe.prototype,"body",2);c([Q(".nav")],qe.prototype,"nav",2);c([Z()],qe.prototype,"hasScrollControls",2);c([p({reflect:!0})],qe.prototype,"active",2);c([p()],qe.prototype,"placement",2);c([p()],qe.prototype,"activation",2);c([p({attribute:"without-scroll-controls",type:Boolean})],qe.prototype,"withoutScrollControls",2);c([tt("active")],qe.prototype,"updateActiveTab",1);c([tt("withoutScrollControls",{waitUntilFirstUpdate:!0})],qe.prototype,"updateScrollControls",1);qe=c([X("wa-tab-group")],qe);var Aw=J`
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
`;var Lw=0,ns=class extends lt{constructor(){super(...arguments),this.attrId=++Lw,this.componentId=`wa-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel")}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true")}render(){return $`
      <slot
        part="base"
        class=${pt({"tab-panel":!0,"tab-panel-active":this.active})}
      ></slot>
    `}};ns.css=Aw;c([p({reflect:!0})],ns.prototype,"name",2);c([p({type:Boolean,reflect:!0})],ns.prototype,"active",2);c([tt("active")],ns.prototype,"handleActiveChange",1);ns=c([X("wa-tab-panel")],ns);var zw=J`
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
`;var _t=class extends Ft{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new Ie(this,"hint","label"),this.title="",this.name=null,this._value=null,this.defaultValue=this.getAttribute("value")??"",this.size="medium",this.appearance="outlined",this.label="",this.hint="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,na()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaDimensions()),this.updateComplete.then(()=>{if(this.setTextareaDimensions(),this.resizeObserver.observe(this.input),this.didSSR&&this.input&&this.value!==this.input.value){const t=this.input.value;this.value=t}})}disconnectedCallback(){super.disconnectedCallback(),this.input&&this.resizeObserver?.unobserve(this.input)}handleBlur(){this.checkValidity()}handleChange(t){this.valueHasChanged=!0,this.value=this.input.value,this.setTextareaDimensions(),this.checkValidity(),this.relayNativeEvent(t,{bubbles:!0,composed:!0})}handleInput(t){this.valueHasChanged=!0,this.value=this.input.value,this.relayNativeEvent(t,{bubbles:!0,composed:!0})}setTextareaDimensions(){if(this.resize==="none"){this.base.style.width="",this.base.style.height="";return}if(this.resize==="auto"){this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`,this.base.style.width="",this.base.style.height="";return}if(this.input.style.width){const t=Number(this.input.style.width.split(/px/)[0])+2;this.base.style.width=`${t}px`}if(this.input.style.height){const t=Number(this.input.style.height.split(/px/)[0])+2;this.base.style.height=`${t}px`}}handleRowsChange(){this.setTextareaDimensions()}async handleValueChange(){await this.updateComplete,this.checkValidity(),this.setTextareaDimensions()}updated(t){t.has("resize")&&this.setTextareaDimensions(),super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(t){if(t){typeof t.top=="number"&&(this.input.scrollTop=t.top),typeof t.left=="number"&&(this.input.scrollLeft=t.left);return}return{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,e,r="none"){this.input.setSelectionRange(t,e,r)}setRangeText(t,e,r,i="preserve"){const s=e??this.input.selectionStart,a=r??this.input.selectionEnd;this.input.setRangeText(t,s,a,i),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaDimensions())}formResetCallback(){this._value=null,this.input&&(this.input.value=this.value||""),super.formResetCallback()}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,r=this.label?!0:!!t,i=this.hint?!0:!!e;return $`
      <label
        part="form-control-label label"
        class=${pt({label:!0,"has-label":r})}
        for="input"
        aria-hidden=${r?"false":"true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="textarea">
        <textarea
          part="textarea"
          id="input"
          class="control"
          title=${this.title}
          name=${st(this.name)}
          .value=${Ei(this.value)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${st(this.placeholder)}
          rows=${st(this.rows)}
          minlength=${st(this.minlength)}
          maxlength=${st(this.maxlength)}
          autocapitalize=${st(this.autocapitalize)}
          autocorrect=${st(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${st(this.spellcheck)}
          enterkeyhint=${st(this.enterkeyhint)}
          inputmode=${st(this.inputmode)}
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
        aria-hidden=${i?"false":"true"}
        class=${pt({"has-slotted":i})}
        >${this.hint}</slot
      >
    `}};_t.css=[zw,Ar,we];c([Q(".control")],_t.prototype,"input",2);c([Q('[part~="base"]')],_t.prototype,"base",2);c([Q(".size-adjuster")],_t.prototype,"sizeAdjuster",2);c([p()],_t.prototype,"title",2);c([p({reflect:!0})],_t.prototype,"name",2);c([Z()],_t.prototype,"value",1);c([p({attribute:"value",reflect:!0})],_t.prototype,"defaultValue",2);c([p({reflect:!0})],_t.prototype,"size",2);c([p({reflect:!0})],_t.prototype,"appearance",2);c([p()],_t.prototype,"label",2);c([p({attribute:"hint"})],_t.prototype,"hint",2);c([p()],_t.prototype,"placeholder",2);c([p({type:Number})],_t.prototype,"rows",2);c([p({reflect:!0})],_t.prototype,"resize",2);c([p({type:Boolean})],_t.prototype,"disabled",2);c([p({type:Boolean,reflect:!0})],_t.prototype,"readonly",2);c([p({type:Boolean,reflect:!0})],_t.prototype,"required",2);c([p({type:Number})],_t.prototype,"minlength",2);c([p({type:Number})],_t.prototype,"maxlength",2);c([p()],_t.prototype,"autocapitalize",2);c([p()],_t.prototype,"autocorrect",2);c([p()],_t.prototype,"autocomplete",2);c([p({type:Boolean})],_t.prototype,"autofocus",2);c([p()],_t.prototype,"enterkeyhint",2);c([p({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],_t.prototype,"spellcheck",2);c([p()],_t.prototype,"inputmode",2);c([p({attribute:"with-label",type:Boolean})],_t.prototype,"withLabel",2);c([p({attribute:"with-hint",type:Boolean})],_t.prototype,"withHint",2);c([tt("rows",{waitUntilFirstUpdate:!0})],_t.prototype,"handleRowsChange",1);c([tt("value",{waitUntilFirstUpdate:!0})],_t.prototype,"handleValueChange",1);_t=c([X("wa-textarea")],_t);var Tw=class extends Event{constructor(t){super("wa-selection-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Rw=class extends Event{constructor(){super("wa-lazy-change",{bubbles:!0,cancelable:!1,composed:!0})}};var Dw=class extends Event{constructor(){super("wa-lazy-load",{bubbles:!0,cancelable:!1,composed:!0})}};var Iw=class extends Event{constructor(){super("wa-expand",{bubbles:!0,cancelable:!1,composed:!0})}};var Ow=class extends Event{constructor(){super("wa-after-expand",{bubbles:!0,cancelable:!1,composed:!0})}};var Pw=class extends Event{constructor(){super("wa-collapse",{bubbles:!0,cancelable:!1,composed:!0})}};var Nw=class extends Event{constructor(){super("wa-after-collapse",{bubbles:!0,cancelable:!1,composed:!0})}};var Fw=J`
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
`;var zt=class extends lt{constructor(){super(...arguments),this.localize=new Et(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1}static isTreeItem(t){return t instanceof Element&&t.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children")}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange()}async animateCollapse(){this.dispatchEvent(new Pw);const t=Ga(getComputedStyle(this.childrenContainer).getPropertyValue("--hide-duration"));await Ka(this.childrenContainer,[{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],{duration:t,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.childrenContainer.hidden=!0,this.dispatchEvent(new Nw)}isNestedItem(){const t=this.parentElement;return!!t&&zt.isTreeItem(t)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0}willUpdate(t){t.has("selected")&&!t.has("indeterminate")&&(this.indeterminate=!1)}async animateExpand(){this.dispatchEvent(new Iw),this.childrenContainer.hidden=!1;const t=Ga(getComputedStyle(this.childrenContainer).getPropertyValue("--show-duration"));await Ka(this.childrenContainer,[{height:"0",opacity:"0",overflow:"hidden"},{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"}],{duration:t,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.childrenContainer.style.height="auto",this.dispatchEvent(new Ow)}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand()}handleDisabledChange(){this.customStates.set("disabled",this.disabled),this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleExpandedState(){this.customStates.set("expanded",this.expanded)}handleIndeterminateStateChange(){this.customStates.set("indeterminate",this.indeterminate)}handleSelectedChange(){this.customStates.set("selected",this.selected),this.setAttribute("aria-selected",this.selected?"true":"false")}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false")}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=!0,this.dispatchEvent(new Dw)):this.animateExpand():this.animateCollapse()}handleLazyChange(){this.dispatchEvent(new Rw)}getChildrenItems({includeDisabled:t=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter(e=>zt.isTreeItem(e)&&(t||!e.disabled)):[]}render(){const t=this.localize.dir()==="rtl",e=!this.loading&&(!this.isLeaf||this.lazy);return $`
      <div
        part="base"
        class="${pt({"tree-item":!0,"tree-item-expanded":this.expanded,"tree-item-selected":this.selected,"tree-item-leaf":this.isLeaf,"tree-item-loading":this.loading,"tree-item-has-expand-button":e})}"
      >
        <div class="item" part="item">
          <div class="indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${pt({"expand-button":!0,"expand-button-visible":e})}
            aria-hidden="true"
          >
            <slot class="expand-icon-slot" name="expand-icon">
              ${se(this.loading,()=>$` <wa-spinner part="spinner" exportparts="base:spinner__base"></wa-spinner> `,()=>$`
                  <wa-icon name=${t?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
                `)}
            </slot>
            <slot class="expand-icon-slot" name="collapse-icon">
              <wa-icon name=${t?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
            </slot>
          </div>

          ${se(this.selectable,()=>$`
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
                ?checked="${Ei(this.selected)}"
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
    `}};zt.css=Fw;c([Z()],zt.prototype,"indeterminate",2);c([Z()],zt.prototype,"isLeaf",2);c([Z()],zt.prototype,"loading",2);c([Z()],zt.prototype,"selectable",2);c([p({type:Boolean,reflect:!0})],zt.prototype,"expanded",2);c([p({type:Boolean,reflect:!0})],zt.prototype,"selected",2);c([p({type:Boolean,reflect:!0})],zt.prototype,"disabled",2);c([p({type:Boolean,reflect:!0})],zt.prototype,"lazy",2);c([Q("slot:not([name])")],zt.prototype,"defaultSlot",2);c([Q("slot[name=children]")],zt.prototype,"childrenSlot",2);c([Q(".item")],zt.prototype,"itemElement",2);c([Q(".children")],zt.prototype,"childrenContainer",2);c([Q(".expand-button slot")],zt.prototype,"expandButtonSlot",2);c([tt("loading",{waitUntilFirstUpdate:!0})],zt.prototype,"handleLoadingChange",1);c([tt("disabled")],zt.prototype,"handleDisabledChange",1);c([tt("expanded")],zt.prototype,"handleExpandedState",1);c([tt("indeterminate")],zt.prototype,"handleIndeterminateStateChange",1);c([tt("selected")],zt.prototype,"handleSelectedChange",1);c([tt("expanded",{waitUntilFirstUpdate:!0})],zt.prototype,"handleExpandedChange",1);c([tt("expanded",{waitUntilFirstUpdate:!0})],zt.prototype,"handleExpandAnimation",1);c([tt("lazy",{waitUntilFirstUpdate:!0})],zt.prototype,"handleLazyChange",1);zt=c([X("wa-tree-item")],zt);var Bw=J`
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
`;function Ic(t,e=!1){function r(a){const o=a.getChildrenItems({includeDisabled:!1});if(o.length){const n=o.every(d=>d.selected),l=o.every(d=>!d.selected&&!d.indeterminate);a.selected=n,a.indeterminate=!n&&!l}}function i(a){const o=a.parentElement;zt.isTreeItem(o)&&(r(o),i(o))}function s(a){for(const o of a.getChildrenItems())o.selected=e?a.selected||o.selected:!o.disabled&&a.selected,s(o);e&&r(a)}s(t),i(t)}var li=class extends lt{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new Et(this),this.initTreeItem=t=>{t.updateComplete.then(()=>{t.selectable=this.selection==="multiple",["expand","collapse"].filter(e=>!!this.querySelector(`[slot="${e}-icon"]`)).forEach(e=>{const r=t.querySelector(`[slot="${e}-icon"]`),i=this.getExpandButtonIcon(e);i&&(r===null?t.append(i):r.hasAttribute("data-default")&&r.replaceWith(i))})})},this.handleTreeChanged=t=>{for(const e of t){const r=[...e.addedNodes].filter(zt.isTreeItem),i=[...e.removedNodes].filter(zt.isTreeItem);r.forEach(this.initTreeItem),this.lastFocusedItem&&i.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null)}},this.handleFocusOut=t=>{const e=t.relatedTarget;(!e||!this.contains(e))&&(this.tabIndex=0)},this.handleFocusIn=t=>{const e=t.target;t.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),zt.isTreeItem(e)&&!e.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=e,this.tabIndex=-1,e.tabIndex=0)},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("wa-lazy-change",this.handleSlotChange)}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect()}getExpandButtonIcon(t){const r=(t==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:!0})[0];if(r){const i=r.cloneNode(!0);return[i,...i.querySelectorAll("[id]")].forEach(s=>s.removeAttribute("id")),i.setAttribute("data-default",""),i.slot=`${t}-icon`,i}return null}selectItem(t){const e=[...this.selectedItems];if(this.selection==="multiple")t.selected=!t.selected,t.lazy&&(t.expanded=!0),Ic(t);else if(this.selection==="single"||t.isLeaf){const i=this.getAllTreeItems();for(const s of i)s.selected=s===t}else this.selection==="leaf"&&(t.expanded=!t.expanded);const r=this.selectedItems;(e.length!==r.length||r.some(i=>!e.includes(i)))&&Promise.all(r.map(i=>i.updateComplete)).then(()=>{this.dispatchEvent(new Tw({selection:r}))})}getAllTreeItems(){return[...this.querySelectorAll("wa-tree-item")]}focusItem(t){t?.focus()}handleKeyDown(t){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(t.key)||t.composedPath().some(s=>["input","textarea"].includes(s?.tagName?.toLowerCase())))return;const e=this.getFocusableItems(),r=this.matches(":dir(ltr)"),i=this.localize.dir()==="rtl";if(e.length>0){t.preventDefault();const s=e.findIndex(l=>l.matches(":focus")),a=e[s],o=l=>{const d=e[vt(l,0,e.length-1)];this.focusItem(d)},n=l=>{a.expanded=l};t.key==="ArrowDown"?o(s+1):t.key==="ArrowUp"?o(s-1):r&&t.key==="ArrowRight"||i&&t.key==="ArrowLeft"?!a||a.disabled||a.expanded||a.isLeaf&&!a.lazy?o(s+1):n(!0):r&&t.key==="ArrowLeft"||i&&t.key==="ArrowRight"?!a||a.disabled||a.isLeaf||!a.expanded?o(s-1):n(!1):t.key==="Home"?o(0):t.key==="End"?o(e.length-1):(t.key==="Enter"||t.key===" ")&&(a.disabled||this.selectItem(a))}}handleClick(t){const e=t.target,r=e.closest("wa-tree-item"),i=t.composedPath().some(s=>s?.classList?.contains("expand-button"));!r||r.disabled||e!==this.clickTarget||(i?r.expanded=!r.expanded:this.selectItem(r))}handleMouseDown(t){this.clickTarget=t.target}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}async handleSelectionChange(){const t=this.selection==="multiple",e=this.getAllTreeItems();this.setAttribute("aria-multiselectable",t?"true":"false");for(const r of e)r.updateComplete.then(()=>{r.selectable=t});t&&(await this.updateComplete,[...this.querySelectorAll(":scope > wa-tree-item")].forEach(r=>{r.updateComplete.then(()=>{Ic(r,!0)})}))}get selectedItems(){const t=this.getAllTreeItems(),e=r=>r.selected;return t.filter(e)}getFocusableItems(){const t=this.getAllTreeItems(),e=new Set;return t.filter(r=>{if(r.disabled)return!1;const i=r.parentElement?.closest("[role=treeitem]");return i&&(!i.expanded||i.loading||e.has(i))&&e.add(r),!e.has(r)})}render(){return $`
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
    `}};li.css=Bw;c([Q("slot:not([name])")],li.prototype,"defaultSlot",2);c([Q("slot[name=expand-icon]")],li.prototype,"expandedIconSlot",2);c([Q("slot[name=collapse-icon]")],li.prototype,"collapsedIconSlot",2);c([p()],li.prototype,"selection",2);c([tt("selection")],li.prototype,"handleSelectionChange",1);li=c([X("wa-tree")],li);var Mw=J`
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
`;var Te=class extends lt{constructor(){super(...arguments),this.localize=new Et(this),this.availableZoomLevels=[],this.allowfullscreen=!1,this.loading="eager",this.zoom=1,this.zoomLevels="25% 50% 75% 100% 125% 150% 175% 200%",this.withoutControls=!1,this.withoutInteraction=!1}get contentWindow(){return this.iframe?.contentWindow||null}get contentDocument(){return this.iframe?.contentDocument||null}parseZoomLevels(t){const e=$o(t),r=[];for(const i of e){let s;if(i.endsWith("%")){const a=parseFloat(i.slice(0,-1));if(!isNaN(a))s=Math.max(0,a/100);else continue}else if(s=parseFloat(i),!isNaN(s))s=Math.max(0,s);else continue;r.push(s)}return[...new Set(r)].sort((i,s)=>i-s)}getCurrentZoomIndex(){if(this.availableZoomLevels.length===0)return-1;let t=0,e=Math.abs(this.availableZoomLevels[0]-this.zoom);for(let r=1;r<this.availableZoomLevels.length;r++){const i=Math.abs(this.availableZoomLevels[r]-this.zoom);i<e&&(e=i,t=r)}return t}isZoomInDisabled(){return this.availableZoomLevels.length===0?!1:this.getCurrentZoomIndex()>=this.availableZoomLevels.length-1}isZoomOutDisabled(){return this.availableZoomLevels.length===0?!1:this.getCurrentZoomIndex()<=0}updated(t){if(t.has("zoom")&&this.style.setProperty("--zoom",`${this.zoom}`),t.has("zoomLevels")&&(this.availableZoomLevels=this.parseZoomLevels(this.zoomLevels),this.availableZoomLevels.length>0)){const e=this.getCurrentZoomIndex();Math.abs(this.availableZoomLevels[e]-this.zoom)>.001&&(this.zoom=this.availableZoomLevels[e])}}zoomIn(){if(this.availableZoomLevels.length===0){this.zoom=Math.min(this.zoom+.05,2);return}const t=this.getCurrentZoomIndex();t<this.availableZoomLevels.length-1&&(this.zoom=this.availableZoomLevels[t+1])}zoomOut(){if(this.availableZoomLevels.length===0){this.zoom=Math.max(this.zoom-.05,0);return}const t=this.getCurrentZoomIndex();t>0&&(this.zoom=this.availableZoomLevels[t-1])}handleLoad(){this.dispatchEvent(new Event("load",{bubbles:!1,cancelable:!1,composed:!0}))}handleError(){this.dispatchEvent(new Event("error",{bubbles:!1,cancelable:!1,composed:!0}))}render(){return $`
      <div id="frame-container">
        <iframe
          id="iframe"
          part="iframe"
          ?inert=${this.withoutInteraction}
          ?allowfullscreen=${this.allowfullscreen}
          loading=${this.loading}
          referrerpolicy=${this.referrerpolicy}
          sandbox=${st(this.sandbox??void 0)}
          src=${st(this.src??void 0)}
          srcdoc=${st(this.srcdoc??void 0)}
          @load=${this.handleLoad}
          @error=${this.handleError}
        ></iframe>
      </div>

      ${this.withoutControls?"":$`
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
    `}};Te.css=Mw;c([Q("#iframe")],Te.prototype,"iframe",2);c([p()],Te.prototype,"src",2);c([p()],Te.prototype,"srcdoc",2);c([p({type:Boolean})],Te.prototype,"allowfullscreen",2);c([p()],Te.prototype,"loading",2);c([p()],Te.prototype,"referrerpolicy",2);c([p()],Te.prototype,"sandbox",2);c([p({type:Number,reflect:!0})],Te.prototype,"zoom",2);c([p({attribute:"zoom-levels"})],Te.prototype,"zoomLevels",2);c([p({type:Boolean,attribute:"without-controls",reflect:!0})],Te.prototype,"withoutControls",2);c([p({type:Boolean,attribute:"without-interaction",reflect:!0})],Te.prototype,"withoutInteraction",2);Te=c([X("wa-zoomable-frame")],Te);new MutationObserver(t=>{for(const{addedNodes:e}of t)for(const r of e)r.nodeType===Node.ELEMENT_NODE&&Uw(r)});async function Uw(t){const e=t instanceof Element?t.tagName.toLowerCase():"",r=e?.startsWith("wa-"),i=[...t.querySelectorAll(":not(:defined)")].map(o=>o.tagName.toLowerCase()).filter(o=>o.startsWith("wa-"));r&&!customElements.get(e)&&i.push(e);const s=[...new Set(i)],a=await Promise.allSettled(s.map(o=>Vw(o)));for(const o of a)o.status==="rejected"&&console.warn(o.reason);await new Promise(requestAnimationFrame),t.dispatchEvent(new CustomEvent("wa-discovery-complete",{bubbles:!1,cancelable:!1,composed:!0}))}function Vw(t){if(customElements.get(t))return Promise.resolve();const e=t.replace(/^wa-/i,""),r=sm(`components/${e}/${e}.js`);return new Promise((i,s)=>{import(r).then(()=>i()).catch(()=>s(new Error(`Unable to autoload <${t}> from ${r}`)))})}const Ww="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='2'%20y='2'%20width='28'%20height='28'%20fill='%23FFCA28'/%3e%3cpath%20d='M19%2025.2879L21.0615%2023.9237C21.2231%2024.4313%2022.2462%2025.6368%2023.5385%2025.6368C24.8308%2025.6368%2025.4308%2024.931%2025.4308%2024.463C25.4308%2023.1878%2024.1112%2022.7382%2023.4774%2022.5223C23.374%2022.4871%2023.289%2022.4581%2023.2308%2022.4328C23.2009%2022.4198%2023.1558%2022.4025%2023.0979%2022.3804C22.393%2022.1111%2019.7923%2021.1175%2019.7923%2018.2373C19.7923%2015.065%2022.8538%2014.7002%2023.5462%2014.7002C23.9991%2014.7002%2026.1769%2014.7557%2027.2615%2016.7939L25.2615%2018.1898C24.8231%2017.3015%2024.0946%2017.0081%2023.6462%2017.0081C22.5385%2017.0081%2022.3077%2017.8201%2022.3077%2018.1898C22.3077%2019.227%2023.5112%2019.6919%2024.5273%2020.0844C24.7932%2020.1871%2025.0462%2020.2848%2025.2615%2020.3866C26.3692%2020.91%2028%2021.7666%2028%2024.463C28%2025.8136%2026.8672%2028.0002%2024.0154%2028.0002C20.1846%2028.0002%2019.1692%2025.7003%2019%2025.2879Z'%20fill='%233E3E3E'/%3e%3cpath%20d='M9%2025.5587L11.1487%2024.1953C11.317%2024.7026%2011.9713%2025.638%2012.9205%2025.638C13.8698%2025.638%2014.3557%2024.663%2014.3557%2024.1953V15.0002H16.9982V24.1953C17.041%2025.4636%2016.3376%2028.0002%2013.2332%2028.0002C10.379%2028.0002%209.19242%2026.3039%209%2025.5587Z'%20fill='%233E3E3E'/%3e%3c/svg%3e",qw="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='-22%200%20300%20300'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20preserveAspectRatio='xMidYMid'%3e%3cg%3e%3cpath%20d='M10.5838307,156.409656%20L10.5838307,156.196646%20L10.5838307,123.657627%20L17.7200527,123.657627%20L17.7200527,158.912657%20C18.0516208,161.753926%2017.8075656,164.63288%2017.0023629,167.377784%20C16.19722,170.122687%2014.8474392,172.677251%2013.0335946,174.88924%20C9.6624625,177.797086%205.34298451,179.369568%200.891381719,179.309391%20L0.145805038,173.983903%20C3.01718628,173.985518%205.78730255,172.922981%207.92105685,171.001585%20C9.83826599,168.76489%2010.5838307,165.729334%2010.5838307,156.409656%20Z%20M63.8037763,152.209035%20C63.8037763,156.203166%2063.8037763,159.771277%2064.1232613,162.860071%20L57.7859014,162.860071%20L57.3598815,156.522711%20C56.0343268,158.765028%2054.1386519,160.616318%2051.8656486,161.888456%20C49.5925854,163.160593%2047.0232464,163.808237%2044.4187946,163.765408%20C38.2412071,163.765408%2030.8919752,160.410366%2030.8919752,146.723715%20L30.8919752,123.983721%20L38.0281972,123.983721%20L38.0281972,145.285823%20C38.0281972,152.688352%2040.3181887,157.641058%2046.7620834,157.641058%20C48.0878176,157.655354%2049.4030239,157.404719%2050.6306575,156.903927%20C51.8582911,156.403136%2052.9735276,155.662296%2053.9110465,154.724777%20C54.8485056,153.787318%2055.5894046,152.672022%2056.0901963,151.444448%20C56.5909282,150.216815%2056.8415633,148.901549%2056.8273268,147.575814%20L56.8273268,123.717444%20L63.9634889,123.717444%20L63.9634889,151.996025%20L63.8037763,152.209035%20Z%20M77.330762,136.653806%20C77.330762,131.70104%2077.330762,127.653648%2077.0112304,123.979032%20L83.4018876,123.979032%20L83.7213726,130.635931%20C85.1452074,128.23088%2087.1949721,126.257257%2089.6521533,124.925482%20C92.1093944,123.593709%2094.8819333,122.953703%2097.6742718,123.073695%20C107.153723,123.073695%20114.289945,131.008713%20114.289945,142.831393%20C114.289945,156.784292%20105.715831,163.707504%2096.4493898,163.707504%20C94.0776877,163.813321%2091.7187865,163.305232%2089.6009496,162.232346%20C87.4831127,161.159401%2085.6780613,159.558028%2084.3604623,157.583154%20L84.3604623,178.885226%20L77.330762,178.885226%20L77.330762,136.813578%20L77.330762,136.653806%20Z%20M84.3604623,147.038594%20C84.3797833,148.004885%2084.4867369,148.967408%2084.6800071,149.914378%20C85.2842232,152.279021%2086.6597255,154.374666%2088.5887785,155.869683%20C90.5178913,157.364761%2092.8904309,158.173852%2095.3310427,158.168947%20C102.840047,158.168947%20107.260258,152.044597%20107.260258,143.150938%20C107.260258,135.375686%20103.106354,128.718758%2095.59735,128.718758%20C92.6257387,128.962101%2089.844945,130.280974%2087.7762781,132.428062%20C85.7076111,134.575149%2084.4931374,137.403079%2084.3604623,140.381689%20L84.3604623,147.038594%20Z%20M127.004503,123.94359%20L135.578617,146.896647%20C136.483954,149.452886%20137.442529,152.54168%20138.081618,154.831671%20C138.827183,152.488442%20139.625985,149.506124%20140.58462,146.736875%20L148.359872,123.94359%20L155.868876,123.94359%20L145.21784,151.636343%20C139.892293,164.950152%20136.643726,171.820127%20131.744199,175.97403%20C129.27643,178.228071%20126.267791,179.805756%20123.010354,180.553953%20L121.252929,174.589376%20C123.530581,173.840999%20125.645092,172.666304%20127.48382,171.127799%20C130.081872,169.010501%20132.14366,166.310102%20133.501635,163.246013%20C133.792288,162.715372%20133.990404,162.139031%20134.087428,161.541814%20C134.026892,160.899135%20133.865146,160.270094%20133.60817,159.677902%20L119.122716,123.837079%20L126.897968,123.837079%20L127.004503,123.94359%20Z%20M174.813541,112.770851%20L174.813541,123.954441%20L185.038557,123.954441%20L185.038557,129.279989%20L174.813541,129.279989%20L174.813541,150.262575%20C174.813541,155.055568%20176.198196,157.824817%20180.139089,157.824817%20C181.538758,157.847727%20182.935316,157.686579%20184.292992,157.345559%20L184.612537,162.671047%20C182.57671,163.376355%20180.428486,163.701283%20178.275118,163.629682%20C176.849069,163.718929%20175.420569,163.498622%20174.087657,162.983833%20C172.754744,162.469044%20171.549004,161.671976%20170.553103,160.647363%20C168.383883,157.745977%20167.394359,154.130491%20167.783854,150.528882%20L167.783854,129.226751%20L161.712742,129.226751%20L161.712742,123.901204%20L167.890329,123.901204%20L167.890329,114.421764%20L174.813541,112.770851%20Z%20M198.184399,144.647511%20C198.03988,146.453639%20198.289199,148.269577%20198.915189,149.969888%20C199.541179,151.670199%20200.528884,153.214267%20201.810114,154.495437%20C203.091285,155.776667%20204.635352,156.764373%20206.335664,157.390363%20C208.035975,158.016352%20209.851913,158.265672%20211.658041,158.121153%20C215.311153,158.202863%20218.940457,157.513288%20222.309077,156.097409%20L223.533958,161.422956%20C219.400274,163.12572%20214.955358,163.942168%20210.486396,163.819423%20C207.881107,163.997798%20205.268101,163.61054%20202.826592,162.684147%20C200.385023,161.757814%20198.172795,160.3143%20196.341489,158.452721%20C194.51022,156.591082%20193.103284,154.355345%20192.217196,151.898941%20C191.331104,149.442478%20190.986827,146.82349%20191.207978,144.221491%20C191.207978,132.505346%20198.184399,123.238905%20209.581059,123.238905%20C222.362314,123.238905%20225.557643,134.422495%20225.557643,141.558717%20C225.625954,142.658281%20225.625954,143.761016%20225.557643,144.860581%20L198.024687,144.860581%20L198.184399,144.647511%20Z%20M219.06051,139.322023%20C219.266043,137.898188%20219.163995,136.446897%20218.761184,135.065892%20C218.358433,133.684886%20217.664311,132.406228%20216.725656,131.316115%20C215.786941,130.226062%20214.625525,129.349856%20213.31959,128.746561%20C212.013656,128.143278%20210.59353,127.826939%20209.155039,127.818864%20C206.228949,128.030665%20203.487515,129.327603%20201.467959,131.455549%20C199.448402,133.583436%20198.296377,136.388874%20198.237697,139.322023%20L219.06051,139.322023%20Z%20M236.385366,136.053478%20C236.385366,131.473555%20236.385366,127.532637%20236.065834,123.911277%20L242.456492,123.911277%20L242.456492,131.526792%20L242.775977,131.526792%20C243.446769,129.176325%20244.83268,127.093027%20246.741335,125.566097%20C248.64999,124.039161%20250.986699,123.144369%20253.427072,123.005938%20C254.098762,122.917777%20254.779066,122.917777%20255.450756,123.005938%20L255.450756,129.66288%20C254.63688,129.568608%20253.814868,129.568608%20253.000992,129.66288%20C250.58353,129.756495%20248.282771,130.726973%20246.528505,132.393068%20C244.774238,134.059104%20243.686458,136.306745%20243.468304,138.716252%20C243.269171,139.805946%20243.162278,140.910475%20243.148819,142.018055%20L243.148819,162.734394%20L236.11909,162.734394%20L236.11909,136.106715%20L236.385366,136.053478%20Z'%20fill='%234E4E4E'%3e%3c/path%3e%3cpath%20d='M233.257943,16.9621357%20C233.476636,20.5398773%20232.625434,24.1017075%20230.812666,27.1939108%20C228.999898,30.286174%20226.307754,32.7687777%20223.079047,34.3255867%20C219.85034,35.8823358%20216.231324,36.4427655%20212.683013,35.9355136%20C209.134702,35.4282017%20205.817704,33.8761781%20203.154559,31.4770796%20C200.491421,29.0780409%20198.602703,25.9404959%20197.729013,22.4642047%20C196.855323,18.9879135%20197.036209,15.330196%20198.248625,11.9570899%20C199.461041,8.5839838%20201.650109,5.64808944%20204.536953,3.52346926%20C207.423803,1.39884909%20210.877782,0.181657262%20214.458814,0.0269503701%20C216.806708,-0.10224713%20219.156996,0.233972409%20221.374429,1.01627461%20C223.591922,1.79857323%20225.632893,3.01152758%20227.379981,4.58537259%20C229.12701,6.15922358%20230.54576,8.06291398%20231.554522,10.1869719%20C232.563283,12.3110298%20233.142196,14.6135829%20233.257943,16.9621357%20Z'%20fill='%23767677'%3e%3c/path%3e%3cpath%20d='M127.952969,225.540984%20C80.0236372,225.540984%2037.8984531,208.339518%2016.1170646,182.936721%20C24.5683135,205.78944%2039.8176362,225.504615%2059.8124569,239.428562%20C79.8070981,253.352629%20103.588124,260.816651%20127.952969,260.816651%20C152.318411,260.816651%20176.098839,253.352629%20196.094019,239.428562%20C216.0886,225.504615%20231.337863,205.78944%20239.789471,182.936721%20C218.061379,208.339518%20176.095848,225.540984%20127.952969,225.540984%20Z'%20fill='%23F37726'%3e%3c/path%3e%3cpath%20d='M127.952969,60.3543133%20C175.882898,60.3543133%20218.008142,77.5557785%20239.789471,102.958396%20C231.337863,80.1058563%20216.0886,60.3906823%20196.094019,46.4667348%20C176.098839,32.5427873%20152.318411,25.0784666%20127.952969,25.0784666%20C103.588124,25.0784666%2079.8070981,32.5427873%2059.8124569,46.4667348%20C39.8176362,60.3906823%2024.5683135,80.1058563%2016.1170646,102.958396%20C37.8984531,77.502541%2079.8106871,60.3543133%20127.952969,60.3543133%20Z'%20fill='%23F37726'%3e%3c/path%3e%3cpath%20d='M61.9716874,274.975202%20C62.2528294,279.48161%2061.186045,283.969713%2058.9072992,287.867658%20C56.6284936,291.765602%2053.2409116,294.896926%2049.1761363,296.862707%20C45.1113611,298.828488%2040.5533909,299.539717%2036.0829934,298.905772%20C31.6125362,298.271767%2027.4320141,296.321359%2024.0740419,293.30297%20C20.7160636,290.284582%2018.3326671,286.334835%2017.2274978,281.957035%20C16.1223339,277.579176%2016.3454363,272.971497%2017.868382,268.720869%20C19.3913284,264.470301%2022.1451683,260.769335%2025.7790187,258.089483%20C29.4129289,255.40962%2033.7623156,253.872201%2038.2730898,253.673106%20C41.2280121,253.515051%2044.1851476,253.940738%2046.9755719,254.925846%20C49.7659364,255.910962%2052.3349165,257.436187%2054.5356604,259.414404%20C56.7364042,261.392633%2058.5259031,263.785032%2059.8017495,266.455044%20C61.0776558,269.124996%2061.8150255,272.02022%2061.9716874,274.975202%20Z'%20fill='%239E9E9E'%3e%3c/path%3e%3cpath%20d='M21.5641016,54.5650606%20C18.9814831,54.6363631%2016.4354131,53.9424806%2014.2460944,52.570687%20C12.0567996,51.1988336%2010.3219858,49.2102622%209.25983722,46.8551295%20C8.19768984,44.499937%207.85562972,41.8832824%208.276674,39.3342215%20C8.69771827,36.7851606%209.86306631,34.4174662%2011.6261678,32.5289814%20C13.3892752,30.6404727%2015.6714246,29.3154324%2018.1856119,28.7204982%20C20.6997394,28.1255646%2023.3336813,28.2873008%2025.7562282,29.1853653%20C28.1787154,30.0834346%2030.2815979,31.6777312%2031.800363,33.767765%20C33.3191879,35.8578106%2034.1861222,38.3502842%2034.2921188,40.9317063%20C34.3930308,44.4222341%2033.113057,47.8117302%2030.7300493,50.3642007%20C28.3470417,52.916731%2025.0533134,54.4262842%2021.5641016,54.5650606%20Z'%20fill='%23616262'%3e%3c/path%3e%3c/g%3e%3c/svg%3e",Hw="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20aria-hidden='true'%3e%3crect%20x='4'%20y='3'%20width='12'%20height='8'%20rx='1.25'%20ry='1.25'%20fill='none'%20stroke='currentColor'%20stroke-width='1.25'%20stroke-linejoin='round'/%3e%3cline%20x1='2'%20y1='20'%20x2='18'%20y2='20'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='20'%20y1='2'%20x2='20'%20y2='22'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3c/svg%3e",jw="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20aria-hidden='true'%3e%3crect%20x='10'%20y='4'%20width='12'%20height='16'%20rx='1.25'%20ry='1.25'%20fill='none'%20stroke='currentColor'%20stroke-width='1.25'%20stroke-linejoin='round'/%3e%3cline%20x1='2.5'%20y1='2'%20x2='2.5'%20y2='9'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='2.5'%20y1='15'%20x2='2.5'%20y2='22'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3c/svg%3e",Kw="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20aria-hidden='true'%3e%3crect%20x='8'%20y='4'%20width='8'%20height='8'%20rx='1.25'%20ry='1.25'%20fill='none'%20stroke='currentColor'%20stroke-width='1.25'%20stroke-linejoin='round'/%3e%3cline%20x1='2.5'%20y1='2'%20x2='2.5'%20y2='22'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='21.5'%20y1='2'%20x2='21.5'%20y2='22'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='6'%20y1='20'%20x2='18'%20y2='20'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3c/svg%3e",Gw="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20aria-hidden='true'%3e%3crect%20x='8'%20y='4'%20width='8'%20height='16'%20rx='1.25'%20ry='1.25'%20fill='none'%20stroke='currentColor'%20stroke-width='1.25'%20stroke-linejoin='round'/%3e%3cline%20x1='2.5'%20y1='2'%20x2='2.5'%20y2='22'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cline%20x1='21.5'%20y1='2'%20x2='21.5'%20y2='22'%20stroke='%233b82f6'%20stroke-width='2'%20stroke-linecap='round'/%3e%3c/svg%3e",Zw="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20width='16'%20height='16'%3e%3cpath%20fill-rule='evenodd'%20d='M8%200C3.58%200%200%203.58%200%208c0%203.54%202.29%206.53%205.47%207.59.4.07.55-.17.55-.38%200-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01%201.08.58%201.23.82.72%201.21%201.87.87%202.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95%200-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12%200%200%20.67-.21%202.2.82.64-.18%201.32-.27%202-.27.68%200%201.36.09%202%20.27%201.53-1.04%202.2-.82%202.2-.82.44%201.1.16%201.92.08%202.12.51.56.82%201.27.82%202.15%200%203.07-1.87%203.75-3.65%203.95.29.25.54.73.54%201.48%200%201.07-.01%201.93-.01%202.2%200%20.21.15.46.55.38A8.013%208.013%200%200016%208c0-4.42-3.58-8-8-8z'/%3e%3c/svg%3e",Xw="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M13.0164%202C10.8193%202%209.03825%203.72453%209.03825%205.85185V8.51852H15.9235V9.25926H5.97814C3.78107%209.25926%202%2010.9838%202%2013.1111L2%2018.8889C2%2021.0162%203.78107%2022.7407%205.97814%2022.7407H8.27322V19.4815C8.27322%2017.3542%2010.0543%2015.6296%2012.2514%2015.6296H19.5956C21.4547%2015.6296%2022.9617%2014.1704%2022.9617%2012.3704V5.85185C22.9617%203.72453%2021.1807%202%2018.9836%202H13.0164ZM12.0984%206.74074C12.8589%206.74074%2013.4754%206.14378%2013.4754%205.40741C13.4754%204.67103%2012.8589%204.07407%2012.0984%204.07407C11.3378%204.07407%2010.7213%204.67103%2010.7213%205.40741C10.7213%206.14378%2011.3378%206.74074%2012.0984%206.74074Z'%20fill='url(%23paint0_linear_87_8204)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M18.9834%2030C21.1805%2030%2022.9616%2028.2755%2022.9616%2026.1482V23.4815L16.0763%2023.4815L16.0763%2022.7408L26.0217%2022.7408C28.2188%2022.7408%2029.9998%2021.0162%2029.9998%2018.8889V13.1111C29.9998%2010.9838%2028.2188%209.25928%2026.0217%209.25928L23.7266%209.25928V12.5185C23.7266%2014.6459%2021.9455%2016.3704%2019.7485%2016.3704L12.4042%2016.3704C10.5451%2016.3704%209.03809%2017.8296%209.03809%2019.6296L9.03809%2026.1482C9.03809%2028.2755%2010.8192%2030%2013.0162%2030H18.9834ZM19.9015%2025.2593C19.1409%2025.2593%2018.5244%2025.8562%2018.5244%2026.5926C18.5244%2027.329%2019.1409%2027.9259%2019.9015%2027.9259C20.662%2027.9259%2021.2785%2027.329%2021.2785%2026.5926C21.2785%2025.8562%2020.662%2025.2593%2019.9015%2025.2593Z'%20fill='url(%23paint1_linear_87_8204)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_87_8204'%20x1='12.4809'%20y1='2'%20x2='12.4809'%20y2='22.7407'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23327EBD'/%3e%3cstop%20offset='1'%20stop-color='%231565A7'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_87_8204'%20x1='19.519'%20y1='9.25928'%20x2='19.519'%20y2='30'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FFDA4B'/%3e%3cstop%20offset='1'%20stop-color='%23F9C600'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";gm("lyra",{resolver:t=>new URL(Object.assign({"../icons/js.svg":Ww,"../icons/jupyter.svg":qw,"../icons/layout-standard-bottom-panel.svg":Hw,"../icons/layout-standard-bottom-sidebar.svg":jw,"../icons/layout-standard-full.svg":Kw,"../icons/layout-standard.svg":Gw,"../icons/mark-github.svg":Zw,"../icons/python.svg":Xw})[`../icons/${t}.svg`],import.meta.url).href,mutator:t=>{t.setAttribute("fill","currentColor"),t.setAttribute("stroke","currentColor")}});var Yw=Object.defineProperty,Qw=Object.getOwnPropertyDescriptor,xl=(t,e,r,i)=>{for(var s=i>1?void 0:i?Qw(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Yw(e,r,s),s};let Qs=class extends lo{constructor(){super(...arguments),this.message="No content.",this.icon="info-circle"}render(){return $`
            <h3>
                <wa-icon name=${this.icon} label="${this.message}"></wa-icon>
                ${this.message}
            </h3>
        `}};Qs.styles=J`
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
        }

        h3 {
            margin: 0;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            text-align: center;
        }
    `;xl([p()],Qs.prototype,"message",2);xl([p()],Qs.prototype,"icon",2);Qs=xl([X("lyra-no-content")],Qs);function Sa(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var dn={exports:{}};var Oc;function Jw(){return Oc||(Oc=1,(function(t,e){(function(r){t.exports=r()})(function(){return(function r(i,s,a){function o(d,h){if(!s[d]){if(!i[d]){var f=typeof Sa=="function"&&Sa;if(!h&&f)return f(d,!0);if(n)return n(d,!0);var g=new Error("Cannot find module '"+d+"'");throw g.code="MODULE_NOT_FOUND",g}var u=s[d]={exports:{}};i[d][0].call(u.exports,function(v){var b=i[d][1][v];return o(b||v)},u,u.exports,r,i,s,a)}return s[d].exports}for(var n=typeof Sa=="function"&&Sa,l=0;l<a.length;l++)o(a[l]);return o})({1:[function(r,i,s){var a=r("./utils"),o=r("./support"),n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";s.encode=function(l){for(var d,h,f,g,u,v,b,x=[],y=0,k=l.length,S=k,L=a.getTypeOf(l)!=="string";y<l.length;)S=k-y,f=L?(d=l[y++],h=y<k?l[y++]:0,y<k?l[y++]:0):(d=l.charCodeAt(y++),h=y<k?l.charCodeAt(y++):0,y<k?l.charCodeAt(y++):0),g=d>>2,u=(3&d)<<4|h>>4,v=1<S?(15&h)<<2|f>>6:64,b=2<S?63&f:64,x.push(n.charAt(g)+n.charAt(u)+n.charAt(v)+n.charAt(b));return x.join("")},s.decode=function(l){var d,h,f,g,u,v,b=0,x=0,y="data:";if(l.substr(0,y.length)===y)throw new Error("Invalid base64 input, it looks like a data url.");var k,S=3*(l=l.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(l.charAt(l.length-1)===n.charAt(64)&&S--,l.charAt(l.length-2)===n.charAt(64)&&S--,S%1!=0)throw new Error("Invalid base64 input, bad content length.");for(k=o.uint8array?new Uint8Array(0|S):new Array(0|S);b<l.length;)d=n.indexOf(l.charAt(b++))<<2|(g=n.indexOf(l.charAt(b++)))>>4,h=(15&g)<<4|(u=n.indexOf(l.charAt(b++)))>>2,f=(3&u)<<6|(v=n.indexOf(l.charAt(b++))),k[x++]=d,u!==64&&(k[x++]=h),v!==64&&(k[x++]=f);return k}},{"./support":30,"./utils":32}],2:[function(r,i,s){var a=r("./external"),o=r("./stream/DataWorker"),n=r("./stream/Crc32Probe"),l=r("./stream/DataLengthProbe");function d(h,f,g,u,v){this.compressedSize=h,this.uncompressedSize=f,this.crc32=g,this.compression=u,this.compressedContent=v}d.prototype={getContentWorker:function(){var h=new o(a.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new l("data_length")),f=this;return h.on("end",function(){if(this.streamInfo.data_length!==f.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),h},getCompressedWorker:function(){return new o(a.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},d.createWorkerFrom=function(h,f,g){return h.pipe(new n).pipe(new l("uncompressedSize")).pipe(f.compressWorker(g)).pipe(new l("compressedSize")).withStreamInfo("compression",f)},i.exports=d},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(r,i,s){var a=r("./stream/GenericWorker");s.STORE={magic:"\0\0",compressWorker:function(){return new a("STORE compression")},uncompressWorker:function(){return new a("STORE decompression")}},s.DEFLATE=r("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(r,i,s){var a=r("./utils"),o=(function(){for(var n,l=[],d=0;d<256;d++){n=d;for(var h=0;h<8;h++)n=1&n?3988292384^n>>>1:n>>>1;l[d]=n}return l})();i.exports=function(n,l){return n!==void 0&&n.length?a.getTypeOf(n)!=="string"?(function(d,h,f,g){var u=o,v=g+f;d^=-1;for(var b=g;b<v;b++)d=d>>>8^u[255&(d^h[b])];return-1^d})(0|l,n,n.length,0):(function(d,h,f,g){var u=o,v=g+f;d^=-1;for(var b=g;b<v;b++)d=d>>>8^u[255&(d^h.charCodeAt(b))];return-1^d})(0|l,n,n.length,0):0}},{"./utils":32}],5:[function(r,i,s){s.base64=!1,s.binary=!1,s.dir=!1,s.createFolders=!0,s.date=null,s.compression=null,s.compressionOptions=null,s.comment=null,s.unixPermissions=null,s.dosPermissions=null},{}],6:[function(r,i,s){var a=null;a=typeof Promise<"u"?Promise:r("lie"),i.exports={Promise:a}},{lie:37}],7:[function(r,i,s){var a=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",o=r("pako"),n=r("./utils"),l=r("./stream/GenericWorker"),d=a?"uint8array":"array";function h(f,g){l.call(this,"FlateWorker/"+f),this._pako=null,this._pakoAction=f,this._pakoOptions=g,this.meta={}}s.magic="\b\0",n.inherits(h,l),h.prototype.processChunk=function(f){this.meta=f.meta,this._pako===null&&this._createPako(),this._pako.push(n.transformTo(d,f.data),!1)},h.prototype.flush=function(){l.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){l.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new o[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var f=this;this._pako.onData=function(g){f.push({data:g,meta:f.meta})}},s.compressWorker=function(f){return new h("Deflate",f)},s.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(r,i,s){function a(u,v){var b,x="";for(b=0;b<v;b++)x+=String.fromCharCode(255&u),u>>>=8;return x}function o(u,v,b,x,y,k){var S,L,E=u.file,R=u.compression,I=k!==d.utf8encode,U=n.transformTo("string",k(E.name)),O=n.transformTo("string",d.utf8encode(E.name)),q=E.comment,it=n.transformTo("string",k(q)),A=n.transformTo("string",d.utf8encode(q)),F=O.length!==E.name.length,w=A.length!==q.length,B="",ot="",V="",ct=E.dir,j=E.date,ut={crc32:0,compressedSize:0,uncompressedSize:0};v&&!b||(ut.crc32=u.crc32,ut.compressedSize=u.compressedSize,ut.uncompressedSize=u.uncompressedSize);var P=0;v&&(P|=8),I||!F&&!w||(P|=2048);var D=0,dt=0;ct&&(D|=16),y==="UNIX"?(dt=798,D|=(function(Y,jt){var fe=Y;return Y||(fe=jt?16893:33204),(65535&fe)<<16})(E.unixPermissions,ct)):(dt=20,D|=(function(Y){return 63&(Y||0)})(E.dosPermissions)),S=j.getUTCHours(),S<<=6,S|=j.getUTCMinutes(),S<<=5,S|=j.getUTCSeconds()/2,L=j.getUTCFullYear()-1980,L<<=4,L|=j.getUTCMonth()+1,L<<=5,L|=j.getUTCDate(),F&&(ot=a(1,1)+a(h(U),4)+O,B+="up"+a(ot.length,2)+ot),w&&(V=a(1,1)+a(h(it),4)+A,B+="uc"+a(V.length,2)+V);var et="";return et+=`
\0`,et+=a(P,2),et+=R.magic,et+=a(S,2),et+=a(L,2),et+=a(ut.crc32,4),et+=a(ut.compressedSize,4),et+=a(ut.uncompressedSize,4),et+=a(U.length,2),et+=a(B.length,2),{fileRecord:f.LOCAL_FILE_HEADER+et+U+B,dirRecord:f.CENTRAL_FILE_HEADER+a(dt,2)+et+a(it.length,2)+"\0\0\0\0"+a(D,4)+a(x,4)+U+B+it}}var n=r("../utils"),l=r("../stream/GenericWorker"),d=r("../utf8"),h=r("../crc32"),f=r("../signature");function g(u,v,b,x){l.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=v,this.zipPlatform=b,this.encodeFileName=x,this.streamFiles=u,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}n.inherits(g,l),g.prototype.push=function(u){var v=u.meta.percent||0,b=this.entriesCount,x=this._sources.length;this.accumulate?this.contentBuffer.push(u):(this.bytesWritten+=u.data.length,l.prototype.push.call(this,{data:u.data,meta:{currentFile:this.currentFile,percent:b?(v+100*(b-x-1))/b:100}}))},g.prototype.openedSource=function(u){this.currentSourceOffset=this.bytesWritten,this.currentFile=u.file.name;var v=this.streamFiles&&!u.file.dir;if(v){var b=o(u,v,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:b.fileRecord,meta:{percent:0}})}else this.accumulate=!0},g.prototype.closedSource=function(u){this.accumulate=!1;var v=this.streamFiles&&!u.file.dir,b=o(u,v,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(b.dirRecord),v)this.push({data:(function(x){return f.DATA_DESCRIPTOR+a(x.crc32,4)+a(x.compressedSize,4)+a(x.uncompressedSize,4)})(u),meta:{percent:100}});else for(this.push({data:b.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},g.prototype.flush=function(){for(var u=this.bytesWritten,v=0;v<this.dirRecords.length;v++)this.push({data:this.dirRecords[v],meta:{percent:100}});var b=this.bytesWritten-u,x=(function(y,k,S,L,E){var R=n.transformTo("string",E(L));return f.CENTRAL_DIRECTORY_END+"\0\0\0\0"+a(y,2)+a(y,2)+a(k,4)+a(S,4)+a(R.length,2)+R})(this.dirRecords.length,b,u,this.zipComment,this.encodeFileName);this.push({data:x,meta:{percent:100}})},g.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},g.prototype.registerPrevious=function(u){this._sources.push(u);var v=this;return u.on("data",function(b){v.processChunk(b)}),u.on("end",function(){v.closedSource(v.previous.streamInfo),v._sources.length?v.prepareNextSource():v.end()}),u.on("error",function(b){v.error(b)}),this},g.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},g.prototype.error=function(u){var v=this._sources;if(!l.prototype.error.call(this,u))return!1;for(var b=0;b<v.length;b++)try{v[b].error(u)}catch{}return!0},g.prototype.lock=function(){l.prototype.lock.call(this);for(var u=this._sources,v=0;v<u.length;v++)u[v].lock()},i.exports=g},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(r,i,s){var a=r("../compressions"),o=r("./ZipFileWorker");s.generateWorker=function(n,l,d){var h=new o(l.streamFiles,d,l.platform,l.encodeFileName),f=0;try{n.forEach(function(g,u){f++;var v=(function(k,S){var L=k||S,E=a[L];if(!E)throw new Error(L+" is not a valid compression method !");return E})(u.options.compression,l.compression),b=u.options.compressionOptions||l.compressionOptions||{},x=u.dir,y=u.date;u._compressWorker(v,b).withStreamInfo("file",{name:g,dir:x,date:y,comment:u.comment||"",unixPermissions:u.unixPermissions,dosPermissions:u.dosPermissions}).pipe(h)}),h.entriesCount=f}catch(g){h.error(g)}return h}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(r,i,s){function a(){if(!(this instanceof a))return new a;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var o=new a;for(var n in this)typeof this[n]!="function"&&(o[n]=this[n]);return o}}(a.prototype=r("./object")).loadAsync=r("./load"),a.support=r("./support"),a.defaults=r("./defaults"),a.version="3.10.1",a.loadAsync=function(o,n){return new a().loadAsync(o,n)},a.external=r("./external"),i.exports=a},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(r,i,s){var a=r("./utils"),o=r("./external"),n=r("./utf8"),l=r("./zipEntries"),d=r("./stream/Crc32Probe"),h=r("./nodejsUtils");function f(g){return new o.Promise(function(u,v){var b=g.decompressed.getContentWorker().pipe(new d);b.on("error",function(x){v(x)}).on("end",function(){b.streamInfo.crc32!==g.decompressed.crc32?v(new Error("Corrupted zip : CRC32 mismatch")):u()}).resume()})}i.exports=function(g,u){var v=this;return u=a.extend(u||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:n.utf8decode}),h.isNode&&h.isStream(g)?o.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):a.prepareContent("the loaded zip file",g,!0,u.optimizedBinaryString,u.base64).then(function(b){var x=new l(u);return x.load(b),x}).then(function(b){var x=[o.Promise.resolve(b)],y=b.files;if(u.checkCRC32)for(var k=0;k<y.length;k++)x.push(f(y[k]));return o.Promise.all(x)}).then(function(b){for(var x=b.shift(),y=x.files,k=0;k<y.length;k++){var S=y[k],L=S.fileNameStr,E=a.resolve(S.fileNameStr);v.file(E,S.decompressed,{binary:!0,optimizedBinaryString:!0,date:S.date,dir:S.dir,comment:S.fileCommentStr.length?S.fileCommentStr:null,unixPermissions:S.unixPermissions,dosPermissions:S.dosPermissions,createFolders:u.createFolders}),S.dir||(v.file(E).unsafeOriginalName=L)}return x.zipComment.length&&(v.comment=x.zipComment),v})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(r,i,s){var a=r("../utils"),o=r("../stream/GenericWorker");function n(l,d){o.call(this,"Nodejs stream input adapter for "+l),this._upstreamEnded=!1,this._bindStream(d)}a.inherits(n,o),n.prototype._bindStream=function(l){var d=this;(this._stream=l).pause(),l.on("data",function(h){d.push({data:h,meta:{percent:0}})}).on("error",function(h){d.isPaused?this.generatedError=h:d.error(h)}).on("end",function(){d.isPaused?d._upstreamEnded=!0:d.end()})},n.prototype.pause=function(){return!!o.prototype.pause.call(this)&&(this._stream.pause(),!0)},n.prototype.resume=function(){return!!o.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},i.exports=n},{"../stream/GenericWorker":28,"../utils":32}],13:[function(r,i,s){var a=r("readable-stream").Readable;function o(n,l,d){a.call(this,l),this._helper=n;var h=this;n.on("data",function(f,g){h.push(f)||h._helper.pause(),d&&d(g)}).on("error",function(f){h.emit("error",f)}).on("end",function(){h.push(null)})}r("../utils").inherits(o,a),o.prototype._read=function(){this._helper.resume()},i.exports=o},{"../utils":32,"readable-stream":16}],14:[function(r,i,s){i.exports={isNode:typeof Buffer<"u",newBufferFrom:function(a,o){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(a,o);if(typeof a=="number")throw new Error('The "data" argument must not be a number');return new Buffer(a,o)},allocBuffer:function(a){if(Buffer.alloc)return Buffer.alloc(a);var o=new Buffer(a);return o.fill(0),o},isBuffer:function(a){return Buffer.isBuffer(a)},isStream:function(a){return a&&typeof a.on=="function"&&typeof a.pause=="function"&&typeof a.resume=="function"}}},{}],15:[function(r,i,s){function a(E,R,I){var U,O=n.getTypeOf(R),q=n.extend(I||{},h);q.date=q.date||new Date,q.compression!==null&&(q.compression=q.compression.toUpperCase()),typeof q.unixPermissions=="string"&&(q.unixPermissions=parseInt(q.unixPermissions,8)),q.unixPermissions&&16384&q.unixPermissions&&(q.dir=!0),q.dosPermissions&&16&q.dosPermissions&&(q.dir=!0),q.dir&&(E=y(E)),q.createFolders&&(U=x(E))&&k.call(this,U,!0);var it=O==="string"&&q.binary===!1&&q.base64===!1;I&&I.binary!==void 0||(q.binary=!it),(R instanceof f&&R.uncompressedSize===0||q.dir||!R||R.length===0)&&(q.base64=!1,q.binary=!0,R="",q.compression="STORE",O="string");var A=null;A=R instanceof f||R instanceof l?R:v.isNode&&v.isStream(R)?new b(E,R):n.prepareContent(E,R,q.binary,q.optimizedBinaryString,q.base64);var F=new g(E,A,q);this.files[E]=F}var o=r("./utf8"),n=r("./utils"),l=r("./stream/GenericWorker"),d=r("./stream/StreamHelper"),h=r("./defaults"),f=r("./compressedObject"),g=r("./zipObject"),u=r("./generate"),v=r("./nodejsUtils"),b=r("./nodejs/NodejsStreamInputAdapter"),x=function(E){E.slice(-1)==="/"&&(E=E.substring(0,E.length-1));var R=E.lastIndexOf("/");return 0<R?E.substring(0,R):""},y=function(E){return E.slice(-1)!=="/"&&(E+="/"),E},k=function(E,R){return R=R!==void 0?R:h.createFolders,E=y(E),this.files[E]||a.call(this,E,null,{dir:!0,createFolders:R}),this.files[E]};function S(E){return Object.prototype.toString.call(E)==="[object RegExp]"}var L={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(E){var R,I,U;for(R in this.files)U=this.files[R],(I=R.slice(this.root.length,R.length))&&R.slice(0,this.root.length)===this.root&&E(I,U)},filter:function(E){var R=[];return this.forEach(function(I,U){E(I,U)&&R.push(U)}),R},file:function(E,R,I){if(arguments.length!==1)return E=this.root+E,a.call(this,E,R,I),this;if(S(E)){var U=E;return this.filter(function(q,it){return!it.dir&&U.test(q)})}var O=this.files[this.root+E];return O&&!O.dir?O:null},folder:function(E){if(!E)return this;if(S(E))return this.filter(function(O,q){return q.dir&&E.test(O)});var R=this.root+E,I=k.call(this,R),U=this.clone();return U.root=I.name,U},remove:function(E){E=this.root+E;var R=this.files[E];if(R||(E.slice(-1)!=="/"&&(E+="/"),R=this.files[E]),R&&!R.dir)delete this.files[E];else for(var I=this.filter(function(O,q){return q.name.slice(0,E.length)===E}),U=0;U<I.length;U++)delete this.files[I[U].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(E){var R,I={};try{if((I=n.extend(E||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:o.utf8encode})).type=I.type.toLowerCase(),I.compression=I.compression.toUpperCase(),I.type==="binarystring"&&(I.type="string"),!I.type)throw new Error("No output type specified.");n.checkSupport(I.type),I.platform!=="darwin"&&I.platform!=="freebsd"&&I.platform!=="linux"&&I.platform!=="sunos"||(I.platform="UNIX"),I.platform==="win32"&&(I.platform="DOS");var U=I.comment||this.comment||"";R=u.generateWorker(this,I,U)}catch(O){(R=new l("error")).error(O)}return new d(R,I.type||"string",I.mimeType)},generateAsync:function(E,R){return this.generateInternalStream(E).accumulate(R)},generateNodeStream:function(E,R){return(E=E||{}).type||(E.type="nodebuffer"),this.generateInternalStream(E).toNodejsStream(R)}};i.exports=L},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(r,i,s){i.exports=r("stream")},{stream:void 0}],17:[function(r,i,s){var a=r("./DataReader");function o(n){a.call(this,n);for(var l=0;l<this.data.length;l++)n[l]=255&n[l]}r("../utils").inherits(o,a),o.prototype.byteAt=function(n){return this.data[this.zero+n]},o.prototype.lastIndexOfSignature=function(n){for(var l=n.charCodeAt(0),d=n.charCodeAt(1),h=n.charCodeAt(2),f=n.charCodeAt(3),g=this.length-4;0<=g;--g)if(this.data[g]===l&&this.data[g+1]===d&&this.data[g+2]===h&&this.data[g+3]===f)return g-this.zero;return-1},o.prototype.readAndCheckSignature=function(n){var l=n.charCodeAt(0),d=n.charCodeAt(1),h=n.charCodeAt(2),f=n.charCodeAt(3),g=this.readData(4);return l===g[0]&&d===g[1]&&h===g[2]&&f===g[3]},o.prototype.readData=function(n){if(this.checkOffset(n),n===0)return[];var l=this.data.slice(this.zero+this.index,this.zero+this.index+n);return this.index+=n,l},i.exports=o},{"../utils":32,"./DataReader":18}],18:[function(r,i,s){var a=r("../utils");function o(n){this.data=n,this.length=n.length,this.index=0,this.zero=0}o.prototype={checkOffset:function(n){this.checkIndex(this.index+n)},checkIndex:function(n){if(this.length<this.zero+n||n<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+n+"). Corrupted zip ?")},setIndex:function(n){this.checkIndex(n),this.index=n},skip:function(n){this.setIndex(this.index+n)},byteAt:function(){},readInt:function(n){var l,d=0;for(this.checkOffset(n),l=this.index+n-1;l>=this.index;l--)d=(d<<8)+this.byteAt(l);return this.index+=n,d},readString:function(n){return a.transformTo("string",this.readData(n))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var n=this.readInt(4);return new Date(Date.UTC(1980+(n>>25&127),(n>>21&15)-1,n>>16&31,n>>11&31,n>>5&63,(31&n)<<1))}},i.exports=o},{"../utils":32}],19:[function(r,i,s){var a=r("./Uint8ArrayReader");function o(n){a.call(this,n)}r("../utils").inherits(o,a),o.prototype.readData=function(n){this.checkOffset(n);var l=this.data.slice(this.zero+this.index,this.zero+this.index+n);return this.index+=n,l},i.exports=o},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(r,i,s){var a=r("./DataReader");function o(n){a.call(this,n)}r("../utils").inherits(o,a),o.prototype.byteAt=function(n){return this.data.charCodeAt(this.zero+n)},o.prototype.lastIndexOfSignature=function(n){return this.data.lastIndexOf(n)-this.zero},o.prototype.readAndCheckSignature=function(n){return n===this.readData(4)},o.prototype.readData=function(n){this.checkOffset(n);var l=this.data.slice(this.zero+this.index,this.zero+this.index+n);return this.index+=n,l},i.exports=o},{"../utils":32,"./DataReader":18}],21:[function(r,i,s){var a=r("./ArrayReader");function o(n){a.call(this,n)}r("../utils").inherits(o,a),o.prototype.readData=function(n){if(this.checkOffset(n),n===0)return new Uint8Array(0);var l=this.data.subarray(this.zero+this.index,this.zero+this.index+n);return this.index+=n,l},i.exports=o},{"../utils":32,"./ArrayReader":17}],22:[function(r,i,s){var a=r("../utils"),o=r("../support"),n=r("./ArrayReader"),l=r("./StringReader"),d=r("./NodeBufferReader"),h=r("./Uint8ArrayReader");i.exports=function(f){var g=a.getTypeOf(f);return a.checkSupport(g),g!=="string"||o.uint8array?g==="nodebuffer"?new d(f):o.uint8array?new h(a.transformTo("uint8array",f)):new n(a.transformTo("array",f)):new l(f)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(r,i,s){s.LOCAL_FILE_HEADER="PK",s.CENTRAL_FILE_HEADER="PK",s.CENTRAL_DIRECTORY_END="PK",s.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",s.ZIP64_CENTRAL_DIRECTORY_END="PK",s.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(r,i,s){var a=r("./GenericWorker"),o=r("../utils");function n(l){a.call(this,"ConvertWorker to "+l),this.destType=l}o.inherits(n,a),n.prototype.processChunk=function(l){this.push({data:o.transformTo(this.destType,l.data),meta:l.meta})},i.exports=n},{"../utils":32,"./GenericWorker":28}],25:[function(r,i,s){var a=r("./GenericWorker"),o=r("../crc32");function n(){a.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}r("../utils").inherits(n,a),n.prototype.processChunk=function(l){this.streamInfo.crc32=o(l.data,this.streamInfo.crc32||0),this.push(l)},i.exports=n},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(r,i,s){var a=r("../utils"),o=r("./GenericWorker");function n(l){o.call(this,"DataLengthProbe for "+l),this.propName=l,this.withStreamInfo(l,0)}a.inherits(n,o),n.prototype.processChunk=function(l){if(l){var d=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=d+l.data.length}o.prototype.processChunk.call(this,l)},i.exports=n},{"../utils":32,"./GenericWorker":28}],27:[function(r,i,s){var a=r("../utils"),o=r("./GenericWorker");function n(l){o.call(this,"DataWorker");var d=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,l.then(function(h){d.dataIsReady=!0,d.data=h,d.max=h&&h.length||0,d.type=a.getTypeOf(h),d.isPaused||d._tickAndRepeat()},function(h){d.error(h)})}a.inherits(n,o),n.prototype.cleanUp=function(){o.prototype.cleanUp.call(this),this.data=null},n.prototype.resume=function(){return!!o.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,a.delay(this._tickAndRepeat,[],this)),!0)},n.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(a.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},n.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var l=null,d=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":l=this.data.substring(this.index,d);break;case"uint8array":l=this.data.subarray(this.index,d);break;case"array":case"nodebuffer":l=this.data.slice(this.index,d)}return this.index=d,this.push({data:l,meta:{percent:this.max?this.index/this.max*100:0}})},i.exports=n},{"../utils":32,"./GenericWorker":28}],28:[function(r,i,s){function a(o){this.name=o||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}a.prototype={push:function(o){this.emit("data",o)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(o){this.emit("error",o)}return!0},error:function(o){return!this.isFinished&&(this.isPaused?this.generatedError=o:(this.isFinished=!0,this.emit("error",o),this.previous&&this.previous.error(o),this.cleanUp()),!0)},on:function(o,n){return this._listeners[o].push(n),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(o,n){if(this._listeners[o])for(var l=0;l<this._listeners[o].length;l++)this._listeners[o][l].call(this,n)},pipe:function(o){return o.registerPrevious(this)},registerPrevious:function(o){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=o.streamInfo,this.mergeStreamInfo(),this.previous=o;var n=this;return o.on("data",function(l){n.processChunk(l)}),o.on("end",function(){n.end()}),o.on("error",function(l){n.error(l)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var o=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),o=!0),this.previous&&this.previous.resume(),!o},flush:function(){},processChunk:function(o){this.push(o)},withStreamInfo:function(o,n){return this.extraStreamInfo[o]=n,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var o in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,o)&&(this.streamInfo[o]=this.extraStreamInfo[o])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var o="Worker "+this.name;return this.previous?this.previous+" -> "+o:o}},i.exports=a},{}],29:[function(r,i,s){var a=r("../utils"),o=r("./ConvertWorker"),n=r("./GenericWorker"),l=r("../base64"),d=r("../support"),h=r("../external"),f=null;if(d.nodestream)try{f=r("../nodejs/NodejsStreamOutputAdapter")}catch{}function g(v,b){return new h.Promise(function(x,y){var k=[],S=v._internalType,L=v._outputType,E=v._mimeType;v.on("data",function(R,I){k.push(R),b&&b(I)}).on("error",function(R){k=[],y(R)}).on("end",function(){try{var R=(function(I,U,O){switch(I){case"blob":return a.newBlob(a.transformTo("arraybuffer",U),O);case"base64":return l.encode(U);default:return a.transformTo(I,U)}})(L,(function(I,U){var O,q=0,it=null,A=0;for(O=0;O<U.length;O++)A+=U[O].length;switch(I){case"string":return U.join("");case"array":return Array.prototype.concat.apply([],U);case"uint8array":for(it=new Uint8Array(A),O=0;O<U.length;O++)it.set(U[O],q),q+=U[O].length;return it;case"nodebuffer":return Buffer.concat(U);default:throw new Error("concat : unsupported type '"+I+"'")}})(S,k),E);x(R)}catch(I){y(I)}k=[]}).resume()})}function u(v,b,x){var y=b;switch(b){case"blob":case"arraybuffer":y="uint8array";break;case"base64":y="string"}try{this._internalType=y,this._outputType=b,this._mimeType=x,a.checkSupport(y),this._worker=v.pipe(new o(y)),v.lock()}catch(k){this._worker=new n("error"),this._worker.error(k)}}u.prototype={accumulate:function(v){return g(this,v)},on:function(v,b){var x=this;return v==="data"?this._worker.on(v,function(y){b.call(x,y.data,y.meta)}):this._worker.on(v,function(){a.delay(b,arguments,x)}),this},resume:function(){return a.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(v){if(a.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new f(this,{objectMode:this._outputType!=="nodebuffer"},v)}},i.exports=u},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(r,i,s){if(s.base64=!0,s.array=!0,s.string=!0,s.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",s.nodebuffer=typeof Buffer<"u",s.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")s.blob=!1;else{var a=new ArrayBuffer(0);try{s.blob=new Blob([a],{type:"application/zip"}).size===0}catch{try{var o=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);o.append(a),s.blob=o.getBlob("application/zip").size===0}catch{s.blob=!1}}}try{s.nodestream=!!r("readable-stream").Readable}catch{s.nodestream=!1}},{"readable-stream":16}],31:[function(r,i,s){for(var a=r("./utils"),o=r("./support"),n=r("./nodejsUtils"),l=r("./stream/GenericWorker"),d=new Array(256),h=0;h<256;h++)d[h]=252<=h?6:248<=h?5:240<=h?4:224<=h?3:192<=h?2:1;d[254]=d[254]=1;function f(){l.call(this,"utf-8 decode"),this.leftOver=null}function g(){l.call(this,"utf-8 encode")}s.utf8encode=function(u){return o.nodebuffer?n.newBufferFrom(u,"utf-8"):(function(v){var b,x,y,k,S,L=v.length,E=0;for(k=0;k<L;k++)(64512&(x=v.charCodeAt(k)))==55296&&k+1<L&&(64512&(y=v.charCodeAt(k+1)))==56320&&(x=65536+(x-55296<<10)+(y-56320),k++),E+=x<128?1:x<2048?2:x<65536?3:4;for(b=o.uint8array?new Uint8Array(E):new Array(E),k=S=0;S<E;k++)(64512&(x=v.charCodeAt(k)))==55296&&k+1<L&&(64512&(y=v.charCodeAt(k+1)))==56320&&(x=65536+(x-55296<<10)+(y-56320),k++),x<128?b[S++]=x:(x<2048?b[S++]=192|x>>>6:(x<65536?b[S++]=224|x>>>12:(b[S++]=240|x>>>18,b[S++]=128|x>>>12&63),b[S++]=128|x>>>6&63),b[S++]=128|63&x);return b})(u)},s.utf8decode=function(u){return o.nodebuffer?a.transformTo("nodebuffer",u).toString("utf-8"):(function(v){var b,x,y,k,S=v.length,L=new Array(2*S);for(b=x=0;b<S;)if((y=v[b++])<128)L[x++]=y;else if(4<(k=d[y]))L[x++]=65533,b+=k-1;else{for(y&=k===2?31:k===3?15:7;1<k&&b<S;)y=y<<6|63&v[b++],k--;1<k?L[x++]=65533:y<65536?L[x++]=y:(y-=65536,L[x++]=55296|y>>10&1023,L[x++]=56320|1023&y)}return L.length!==x&&(L.subarray?L=L.subarray(0,x):L.length=x),a.applyFromCharCode(L)})(u=a.transformTo(o.uint8array?"uint8array":"array",u))},a.inherits(f,l),f.prototype.processChunk=function(u){var v=a.transformTo(o.uint8array?"uint8array":"array",u.data);if(this.leftOver&&this.leftOver.length){if(o.uint8array){var b=v;(v=new Uint8Array(b.length+this.leftOver.length)).set(this.leftOver,0),v.set(b,this.leftOver.length)}else v=this.leftOver.concat(v);this.leftOver=null}var x=(function(k,S){var L;for((S=S||k.length)>k.length&&(S=k.length),L=S-1;0<=L&&(192&k[L])==128;)L--;return L<0||L===0?S:L+d[k[L]]>S?L:S})(v),y=v;x!==v.length&&(o.uint8array?(y=v.subarray(0,x),this.leftOver=v.subarray(x,v.length)):(y=v.slice(0,x),this.leftOver=v.slice(x,v.length))),this.push({data:s.utf8decode(y),meta:u.meta})},f.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=f,a.inherits(g,l),g.prototype.processChunk=function(u){this.push({data:s.utf8encode(u.data),meta:u.meta})},s.Utf8EncodeWorker=g},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(r,i,s){var a=r("./support"),o=r("./base64"),n=r("./nodejsUtils"),l=r("./external");function d(b){return b}function h(b,x){for(var y=0;y<b.length;++y)x[y]=255&b.charCodeAt(y);return x}r("setimmediate"),s.newBlob=function(b,x){s.checkSupport("blob");try{return new Blob([b],{type:x})}catch{try{var y=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return y.append(b),y.getBlob(x)}catch{throw new Error("Bug : can't construct the Blob.")}}};var f={stringifyByChunk:function(b,x,y){var k=[],S=0,L=b.length;if(L<=y)return String.fromCharCode.apply(null,b);for(;S<L;)x==="array"||x==="nodebuffer"?k.push(String.fromCharCode.apply(null,b.slice(S,Math.min(S+y,L)))):k.push(String.fromCharCode.apply(null,b.subarray(S,Math.min(S+y,L)))),S+=y;return k.join("")},stringifyByChar:function(b){for(var x="",y=0;y<b.length;y++)x+=String.fromCharCode(b[y]);return x},applyCanBeUsed:{uint8array:(function(){try{return a.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}})(),nodebuffer:(function(){try{return a.nodebuffer&&String.fromCharCode.apply(null,n.allocBuffer(1)).length===1}catch{return!1}})()}};function g(b){var x=65536,y=s.getTypeOf(b),k=!0;if(y==="uint8array"?k=f.applyCanBeUsed.uint8array:y==="nodebuffer"&&(k=f.applyCanBeUsed.nodebuffer),k)for(;1<x;)try{return f.stringifyByChunk(b,y,x)}catch{x=Math.floor(x/2)}return f.stringifyByChar(b)}function u(b,x){for(var y=0;y<b.length;y++)x[y]=b[y];return x}s.applyFromCharCode=g;var v={};v.string={string:d,array:function(b){return h(b,new Array(b.length))},arraybuffer:function(b){return v.string.uint8array(b).buffer},uint8array:function(b){return h(b,new Uint8Array(b.length))},nodebuffer:function(b){return h(b,n.allocBuffer(b.length))}},v.array={string:g,array:d,arraybuffer:function(b){return new Uint8Array(b).buffer},uint8array:function(b){return new Uint8Array(b)},nodebuffer:function(b){return n.newBufferFrom(b)}},v.arraybuffer={string:function(b){return g(new Uint8Array(b))},array:function(b){return u(new Uint8Array(b),new Array(b.byteLength))},arraybuffer:d,uint8array:function(b){return new Uint8Array(b)},nodebuffer:function(b){return n.newBufferFrom(new Uint8Array(b))}},v.uint8array={string:g,array:function(b){return u(b,new Array(b.length))},arraybuffer:function(b){return b.buffer},uint8array:d,nodebuffer:function(b){return n.newBufferFrom(b)}},v.nodebuffer={string:g,array:function(b){return u(b,new Array(b.length))},arraybuffer:function(b){return v.nodebuffer.uint8array(b).buffer},uint8array:function(b){return u(b,new Uint8Array(b.length))},nodebuffer:d},s.transformTo=function(b,x){if(x=x||"",!b)return x;s.checkSupport(b);var y=s.getTypeOf(x);return v[y][b](x)},s.resolve=function(b){for(var x=b.split("/"),y=[],k=0;k<x.length;k++){var S=x[k];S==="."||S===""&&k!==0&&k!==x.length-1||(S===".."?y.pop():y.push(S))}return y.join("/")},s.getTypeOf=function(b){return typeof b=="string"?"string":Object.prototype.toString.call(b)==="[object Array]"?"array":a.nodebuffer&&n.isBuffer(b)?"nodebuffer":a.uint8array&&b instanceof Uint8Array?"uint8array":a.arraybuffer&&b instanceof ArrayBuffer?"arraybuffer":void 0},s.checkSupport=function(b){if(!a[b.toLowerCase()])throw new Error(b+" is not supported by this platform")},s.MAX_VALUE_16BITS=65535,s.MAX_VALUE_32BITS=-1,s.pretty=function(b){var x,y,k="";for(y=0;y<(b||"").length;y++)k+="\\x"+((x=b.charCodeAt(y))<16?"0":"")+x.toString(16).toUpperCase();return k},s.delay=function(b,x,y){setImmediate(function(){b.apply(y||null,x||[])})},s.inherits=function(b,x){function y(){}y.prototype=x.prototype,b.prototype=new y},s.extend=function(){var b,x,y={};for(b=0;b<arguments.length;b++)for(x in arguments[b])Object.prototype.hasOwnProperty.call(arguments[b],x)&&y[x]===void 0&&(y[x]=arguments[b][x]);return y},s.prepareContent=function(b,x,y,k,S){return l.Promise.resolve(x).then(function(L){return a.blob&&(L instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(L))!==-1)&&typeof FileReader<"u"?new l.Promise(function(E,R){var I=new FileReader;I.onload=function(U){E(U.target.result)},I.onerror=function(U){R(U.target.error)},I.readAsArrayBuffer(L)}):L}).then(function(L){var E=s.getTypeOf(L);return E?(E==="arraybuffer"?L=s.transformTo("uint8array",L):E==="string"&&(S?L=o.decode(L):y&&k!==!0&&(L=(function(R){return h(R,a.uint8array?new Uint8Array(R.length):new Array(R.length))})(L))),L):l.Promise.reject(new Error("Can't read the data of '"+b+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(r,i,s){var a=r("./reader/readerFor"),o=r("./utils"),n=r("./signature"),l=r("./zipEntry"),d=r("./support");function h(f){this.files=[],this.loadOptions=f}h.prototype={checkSignature:function(f){if(!this.reader.readAndCheckSignature(f)){this.reader.index-=4;var g=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+o.pretty(g)+", expected "+o.pretty(f)+")")}},isSignature:function(f,g){var u=this.reader.index;this.reader.setIndex(f);var v=this.reader.readString(4)===g;return this.reader.setIndex(u),v},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var f=this.reader.readData(this.zipCommentLength),g=d.uint8array?"uint8array":"array",u=o.transformTo(g,f);this.zipComment=this.loadOptions.decodeFileName(u)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var f,g,u,v=this.zip64EndOfCentralSize-44;0<v;)f=this.reader.readInt(2),g=this.reader.readInt(4),u=this.reader.readData(g),this.zip64ExtensibleData[f]={id:f,length:g,value:u}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var f,g;for(f=0;f<this.files.length;f++)g=this.files[f],this.reader.setIndex(g.localHeaderOffset),this.checkSignature(n.LOCAL_FILE_HEADER),g.readLocalPart(this.reader),g.handleUTF8(),g.processAttributes()},readCentralDir:function(){var f;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(n.CENTRAL_FILE_HEADER);)(f=new l({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(f);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var f=this.reader.lastIndexOfSignature(n.CENTRAL_DIRECTORY_END);if(f<0)throw this.isSignature(0,n.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(f);var g=f;if(this.checkSignature(n.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===o.MAX_VALUE_16BITS||this.diskWithCentralDirStart===o.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===o.MAX_VALUE_16BITS||this.centralDirRecords===o.MAX_VALUE_16BITS||this.centralDirSize===o.MAX_VALUE_32BITS||this.centralDirOffset===o.MAX_VALUE_32BITS){if(this.zip64=!0,(f=this.reader.lastIndexOfSignature(n.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(f),this.checkSignature(n.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,n.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(n.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(n.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var u=this.centralDirOffset+this.centralDirSize;this.zip64&&(u+=20,u+=12+this.zip64EndOfCentralSize);var v=g-u;if(0<v)this.isSignature(g,n.CENTRAL_FILE_HEADER)||(this.reader.zero=v);else if(v<0)throw new Error("Corrupted zip: missing "+Math.abs(v)+" bytes.")},prepareReader:function(f){this.reader=a(f)},load:function(f){this.prepareReader(f),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},i.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(r,i,s){var a=r("./reader/readerFor"),o=r("./utils"),n=r("./compressedObject"),l=r("./crc32"),d=r("./utf8"),h=r("./compressions"),f=r("./support");function g(u,v){this.options=u,this.loadOptions=v}g.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(u){var v,b;if(u.skip(22),this.fileNameLength=u.readInt(2),b=u.readInt(2),this.fileName=u.readData(this.fileNameLength),u.skip(b),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((v=(function(x){for(var y in h)if(Object.prototype.hasOwnProperty.call(h,y)&&h[y].magic===x)return h[y];return null})(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+o.pretty(this.compressionMethod)+" unknown (inner file : "+o.transformTo("string",this.fileName)+")");this.decompressed=new n(this.compressedSize,this.uncompressedSize,this.crc32,v,u.readData(this.compressedSize))},readCentralPart:function(u){this.versionMadeBy=u.readInt(2),u.skip(2),this.bitFlag=u.readInt(2),this.compressionMethod=u.readString(2),this.date=u.readDate(),this.crc32=u.readInt(4),this.compressedSize=u.readInt(4),this.uncompressedSize=u.readInt(4);var v=u.readInt(2);if(this.extraFieldsLength=u.readInt(2),this.fileCommentLength=u.readInt(2),this.diskNumberStart=u.readInt(2),this.internalFileAttributes=u.readInt(2),this.externalFileAttributes=u.readInt(4),this.localHeaderOffset=u.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");u.skip(v),this.readExtraFields(u),this.parseZIP64ExtraField(u),this.fileComment=u.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var u=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),u==0&&(this.dosPermissions=63&this.externalFileAttributes),u==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var u=a(this.extraFields[1].value);this.uncompressedSize===o.MAX_VALUE_32BITS&&(this.uncompressedSize=u.readInt(8)),this.compressedSize===o.MAX_VALUE_32BITS&&(this.compressedSize=u.readInt(8)),this.localHeaderOffset===o.MAX_VALUE_32BITS&&(this.localHeaderOffset=u.readInt(8)),this.diskNumberStart===o.MAX_VALUE_32BITS&&(this.diskNumberStart=u.readInt(4))}},readExtraFields:function(u){var v,b,x,y=u.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});u.index+4<y;)v=u.readInt(2),b=u.readInt(2),x=u.readData(b),this.extraFields[v]={id:v,length:b,value:x};u.setIndex(y)},handleUTF8:function(){var u=f.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=d.utf8decode(this.fileName),this.fileCommentStr=d.utf8decode(this.fileComment);else{var v=this.findExtraFieldUnicodePath();if(v!==null)this.fileNameStr=v;else{var b=o.transformTo(u,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(b)}var x=this.findExtraFieldUnicodeComment();if(x!==null)this.fileCommentStr=x;else{var y=o.transformTo(u,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(y)}}},findExtraFieldUnicodePath:function(){var u=this.extraFields[28789];if(u){var v=a(u.value);return v.readInt(1)!==1||l(this.fileName)!==v.readInt(4)?null:d.utf8decode(v.readData(u.length-5))}return null},findExtraFieldUnicodeComment:function(){var u=this.extraFields[25461];if(u){var v=a(u.value);return v.readInt(1)!==1||l(this.fileComment)!==v.readInt(4)?null:d.utf8decode(v.readData(u.length-5))}return null}},i.exports=g},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(r,i,s){function a(v,b,x){this.name=v,this.dir=x.dir,this.date=x.date,this.comment=x.comment,this.unixPermissions=x.unixPermissions,this.dosPermissions=x.dosPermissions,this._data=b,this._dataBinary=x.binary,this.options={compression:x.compression,compressionOptions:x.compressionOptions}}var o=r("./stream/StreamHelper"),n=r("./stream/DataWorker"),l=r("./utf8"),d=r("./compressedObject"),h=r("./stream/GenericWorker");a.prototype={internalStream:function(v){var b=null,x="string";try{if(!v)throw new Error("No output type specified.");var y=(x=v.toLowerCase())==="string"||x==="text";x!=="binarystring"&&x!=="text"||(x="string"),b=this._decompressWorker();var k=!this._dataBinary;k&&!y&&(b=b.pipe(new l.Utf8EncodeWorker)),!k&&y&&(b=b.pipe(new l.Utf8DecodeWorker))}catch(S){(b=new h("error")).error(S)}return new o(b,x,"")},async:function(v,b){return this.internalStream(v).accumulate(b)},nodeStream:function(v,b){return this.internalStream(v||"nodebuffer").toNodejsStream(b)},_compressWorker:function(v,b){if(this._data instanceof d&&this._data.compression.magic===v.magic)return this._data.getCompressedWorker();var x=this._decompressWorker();return this._dataBinary||(x=x.pipe(new l.Utf8EncodeWorker)),d.createWorkerFrom(x,v,b)},_decompressWorker:function(){return this._data instanceof d?this._data.getContentWorker():this._data instanceof h?this._data:new n(this._data)}};for(var f=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],g=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},u=0;u<f.length;u++)a.prototype[f[u]]=g;i.exports=a},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(r,i,s){(function(a){var o,n,l=a.MutationObserver||a.WebKitMutationObserver;if(l){var d=0,h=new l(v),f=a.document.createTextNode("");h.observe(f,{characterData:!0}),o=function(){f.data=d=++d%2}}else if(a.setImmediate||a.MessageChannel===void 0)o="document"in a&&"onreadystatechange"in a.document.createElement("script")?function(){var b=a.document.createElement("script");b.onreadystatechange=function(){v(),b.onreadystatechange=null,b.parentNode.removeChild(b),b=null},a.document.documentElement.appendChild(b)}:function(){setTimeout(v,0)};else{var g=new a.MessageChannel;g.port1.onmessage=v,o=function(){g.port2.postMessage(0)}}var u=[];function v(){var b,x;n=!0;for(var y=u.length;y;){for(x=u,u=[],b=-1;++b<y;)x[b]();y=u.length}n=!1}i.exports=function(b){u.push(b)!==1||n||o()}}).call(this,typeof pa<"u"?pa:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(r,i,s){var a=r("immediate");function o(){}var n={},l=["REJECTED"],d=["FULFILLED"],h=["PENDING"];function f(y){if(typeof y!="function")throw new TypeError("resolver must be a function");this.state=h,this.queue=[],this.outcome=void 0,y!==o&&b(this,y)}function g(y,k,S){this.promise=y,typeof k=="function"&&(this.onFulfilled=k,this.callFulfilled=this.otherCallFulfilled),typeof S=="function"&&(this.onRejected=S,this.callRejected=this.otherCallRejected)}function u(y,k,S){a(function(){var L;try{L=k(S)}catch(E){return n.reject(y,E)}L===y?n.reject(y,new TypeError("Cannot resolve promise with itself")):n.resolve(y,L)})}function v(y){var k=y&&y.then;if(y&&(typeof y=="object"||typeof y=="function")&&typeof k=="function")return function(){k.apply(y,arguments)}}function b(y,k){var S=!1;function L(I){S||(S=!0,n.reject(y,I))}function E(I){S||(S=!0,n.resolve(y,I))}var R=x(function(){k(E,L)});R.status==="error"&&L(R.value)}function x(y,k){var S={};try{S.value=y(k),S.status="success"}catch(L){S.status="error",S.value=L}return S}(i.exports=f).prototype.finally=function(y){if(typeof y!="function")return this;var k=this.constructor;return this.then(function(S){return k.resolve(y()).then(function(){return S})},function(S){return k.resolve(y()).then(function(){throw S})})},f.prototype.catch=function(y){return this.then(null,y)},f.prototype.then=function(y,k){if(typeof y!="function"&&this.state===d||typeof k!="function"&&this.state===l)return this;var S=new this.constructor(o);return this.state!==h?u(S,this.state===d?y:k,this.outcome):this.queue.push(new g(S,y,k)),S},g.prototype.callFulfilled=function(y){n.resolve(this.promise,y)},g.prototype.otherCallFulfilled=function(y){u(this.promise,this.onFulfilled,y)},g.prototype.callRejected=function(y){n.reject(this.promise,y)},g.prototype.otherCallRejected=function(y){u(this.promise,this.onRejected,y)},n.resolve=function(y,k){var S=x(v,k);if(S.status==="error")return n.reject(y,S.value);var L=S.value;if(L)b(y,L);else{y.state=d,y.outcome=k;for(var E=-1,R=y.queue.length;++E<R;)y.queue[E].callFulfilled(k)}return y},n.reject=function(y,k){y.state=l,y.outcome=k;for(var S=-1,L=y.queue.length;++S<L;)y.queue[S].callRejected(k);return y},f.resolve=function(y){return y instanceof this?y:n.resolve(new this(o),y)},f.reject=function(y){var k=new this(o);return n.reject(k,y)},f.all=function(y){var k=this;if(Object.prototype.toString.call(y)!=="[object Array]")return this.reject(new TypeError("must be an array"));var S=y.length,L=!1;if(!S)return this.resolve([]);for(var E=new Array(S),R=0,I=-1,U=new this(o);++I<S;)O(y[I],I);return U;function O(q,it){k.resolve(q).then(function(A){E[it]=A,++R!==S||L||(L=!0,n.resolve(U,E))},function(A){L||(L=!0,n.reject(U,A))})}},f.race=function(y){var k=this;if(Object.prototype.toString.call(y)!=="[object Array]")return this.reject(new TypeError("must be an array"));var S=y.length,L=!1;if(!S)return this.resolve([]);for(var E=-1,R=new this(o);++E<S;)I=y[E],k.resolve(I).then(function(U){L||(L=!0,n.resolve(R,U))},function(U){L||(L=!0,n.reject(R,U))});var I;return R}},{immediate:36}],38:[function(r,i,s){var a={};(0,r("./lib/utils/common").assign)(a,r("./lib/deflate"),r("./lib/inflate"),r("./lib/zlib/constants")),i.exports=a},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(r,i,s){var a=r("./zlib/deflate"),o=r("./utils/common"),n=r("./utils/strings"),l=r("./zlib/messages"),d=r("./zlib/zstream"),h=Object.prototype.toString,f=0,g=-1,u=0,v=8;function b(y){if(!(this instanceof b))return new b(y);this.options=o.assign({level:g,method:v,chunkSize:16384,windowBits:15,memLevel:8,strategy:u,to:""},y||{});var k=this.options;k.raw&&0<k.windowBits?k.windowBits=-k.windowBits:k.gzip&&0<k.windowBits&&k.windowBits<16&&(k.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new d,this.strm.avail_out=0;var S=a.deflateInit2(this.strm,k.level,k.method,k.windowBits,k.memLevel,k.strategy);if(S!==f)throw new Error(l[S]);if(k.header&&a.deflateSetHeader(this.strm,k.header),k.dictionary){var L;if(L=typeof k.dictionary=="string"?n.string2buf(k.dictionary):h.call(k.dictionary)==="[object ArrayBuffer]"?new Uint8Array(k.dictionary):k.dictionary,(S=a.deflateSetDictionary(this.strm,L))!==f)throw new Error(l[S]);this._dict_set=!0}}function x(y,k){var S=new b(k);if(S.push(y,!0),S.err)throw S.msg||l[S.err];return S.result}b.prototype.push=function(y,k){var S,L,E=this.strm,R=this.options.chunkSize;if(this.ended)return!1;L=k===~~k?k:k===!0?4:0,typeof y=="string"?E.input=n.string2buf(y):h.call(y)==="[object ArrayBuffer]"?E.input=new Uint8Array(y):E.input=y,E.next_in=0,E.avail_in=E.input.length;do{if(E.avail_out===0&&(E.output=new o.Buf8(R),E.next_out=0,E.avail_out=R),(S=a.deflate(E,L))!==1&&S!==f)return this.onEnd(S),!(this.ended=!0);E.avail_out!==0&&(E.avail_in!==0||L!==4&&L!==2)||(this.options.to==="string"?this.onData(n.buf2binstring(o.shrinkBuf(E.output,E.next_out))):this.onData(o.shrinkBuf(E.output,E.next_out)))}while((0<E.avail_in||E.avail_out===0)&&S!==1);return L===4?(S=a.deflateEnd(this.strm),this.onEnd(S),this.ended=!0,S===f):L!==2||(this.onEnd(f),!(E.avail_out=0))},b.prototype.onData=function(y){this.chunks.push(y)},b.prototype.onEnd=function(y){y===f&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=y,this.msg=this.strm.msg},s.Deflate=b,s.deflate=x,s.deflateRaw=function(y,k){return(k=k||{}).raw=!0,x(y,k)},s.gzip=function(y,k){return(k=k||{}).gzip=!0,x(y,k)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(r,i,s){var a=r("./zlib/inflate"),o=r("./utils/common"),n=r("./utils/strings"),l=r("./zlib/constants"),d=r("./zlib/messages"),h=r("./zlib/zstream"),f=r("./zlib/gzheader"),g=Object.prototype.toString;function u(b){if(!(this instanceof u))return new u(b);this.options=o.assign({chunkSize:16384,windowBits:0,to:""},b||{});var x=this.options;x.raw&&0<=x.windowBits&&x.windowBits<16&&(x.windowBits=-x.windowBits,x.windowBits===0&&(x.windowBits=-15)),!(0<=x.windowBits&&x.windowBits<16)||b&&b.windowBits||(x.windowBits+=32),15<x.windowBits&&x.windowBits<48&&(15&x.windowBits)==0&&(x.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new h,this.strm.avail_out=0;var y=a.inflateInit2(this.strm,x.windowBits);if(y!==l.Z_OK)throw new Error(d[y]);this.header=new f,a.inflateGetHeader(this.strm,this.header)}function v(b,x){var y=new u(x);if(y.push(b,!0),y.err)throw y.msg||d[y.err];return y.result}u.prototype.push=function(b,x){var y,k,S,L,E,R,I=this.strm,U=this.options.chunkSize,O=this.options.dictionary,q=!1;if(this.ended)return!1;k=x===~~x?x:x===!0?l.Z_FINISH:l.Z_NO_FLUSH,typeof b=="string"?I.input=n.binstring2buf(b):g.call(b)==="[object ArrayBuffer]"?I.input=new Uint8Array(b):I.input=b,I.next_in=0,I.avail_in=I.input.length;do{if(I.avail_out===0&&(I.output=new o.Buf8(U),I.next_out=0,I.avail_out=U),(y=a.inflate(I,l.Z_NO_FLUSH))===l.Z_NEED_DICT&&O&&(R=typeof O=="string"?n.string2buf(O):g.call(O)==="[object ArrayBuffer]"?new Uint8Array(O):O,y=a.inflateSetDictionary(this.strm,R)),y===l.Z_BUF_ERROR&&q===!0&&(y=l.Z_OK,q=!1),y!==l.Z_STREAM_END&&y!==l.Z_OK)return this.onEnd(y),!(this.ended=!0);I.next_out&&(I.avail_out!==0&&y!==l.Z_STREAM_END&&(I.avail_in!==0||k!==l.Z_FINISH&&k!==l.Z_SYNC_FLUSH)||(this.options.to==="string"?(S=n.utf8border(I.output,I.next_out),L=I.next_out-S,E=n.buf2string(I.output,S),I.next_out=L,I.avail_out=U-L,L&&o.arraySet(I.output,I.output,S,L,0),this.onData(E)):this.onData(o.shrinkBuf(I.output,I.next_out)))),I.avail_in===0&&I.avail_out===0&&(q=!0)}while((0<I.avail_in||I.avail_out===0)&&y!==l.Z_STREAM_END);return y===l.Z_STREAM_END&&(k=l.Z_FINISH),k===l.Z_FINISH?(y=a.inflateEnd(this.strm),this.onEnd(y),this.ended=!0,y===l.Z_OK):k!==l.Z_SYNC_FLUSH||(this.onEnd(l.Z_OK),!(I.avail_out=0))},u.prototype.onData=function(b){this.chunks.push(b)},u.prototype.onEnd=function(b){b===l.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=b,this.msg=this.strm.msg},s.Inflate=u,s.inflate=v,s.inflateRaw=function(b,x){return(x=x||{}).raw=!0,v(b,x)},s.ungzip=v},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(r,i,s){var a=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";s.assign=function(l){for(var d=Array.prototype.slice.call(arguments,1);d.length;){var h=d.shift();if(h){if(typeof h!="object")throw new TypeError(h+"must be non-object");for(var f in h)h.hasOwnProperty(f)&&(l[f]=h[f])}}return l},s.shrinkBuf=function(l,d){return l.length===d?l:l.subarray?l.subarray(0,d):(l.length=d,l)};var o={arraySet:function(l,d,h,f,g){if(d.subarray&&l.subarray)l.set(d.subarray(h,h+f),g);else for(var u=0;u<f;u++)l[g+u]=d[h+u]},flattenChunks:function(l){var d,h,f,g,u,v;for(d=f=0,h=l.length;d<h;d++)f+=l[d].length;for(v=new Uint8Array(f),d=g=0,h=l.length;d<h;d++)u=l[d],v.set(u,g),g+=u.length;return v}},n={arraySet:function(l,d,h,f,g){for(var u=0;u<f;u++)l[g+u]=d[h+u]},flattenChunks:function(l){return[].concat.apply([],l)}};s.setTyped=function(l){l?(s.Buf8=Uint8Array,s.Buf16=Uint16Array,s.Buf32=Int32Array,s.assign(s,o)):(s.Buf8=Array,s.Buf16=Array,s.Buf32=Array,s.assign(s,n))},s.setTyped(a)},{}],42:[function(r,i,s){var a=r("./common"),o=!0,n=!0;try{String.fromCharCode.apply(null,[0])}catch{o=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{n=!1}for(var l=new a.Buf8(256),d=0;d<256;d++)l[d]=252<=d?6:248<=d?5:240<=d?4:224<=d?3:192<=d?2:1;function h(f,g){if(g<65537&&(f.subarray&&n||!f.subarray&&o))return String.fromCharCode.apply(null,a.shrinkBuf(f,g));for(var u="",v=0;v<g;v++)u+=String.fromCharCode(f[v]);return u}l[254]=l[254]=1,s.string2buf=function(f){var g,u,v,b,x,y=f.length,k=0;for(b=0;b<y;b++)(64512&(u=f.charCodeAt(b)))==55296&&b+1<y&&(64512&(v=f.charCodeAt(b+1)))==56320&&(u=65536+(u-55296<<10)+(v-56320),b++),k+=u<128?1:u<2048?2:u<65536?3:4;for(g=new a.Buf8(k),b=x=0;x<k;b++)(64512&(u=f.charCodeAt(b)))==55296&&b+1<y&&(64512&(v=f.charCodeAt(b+1)))==56320&&(u=65536+(u-55296<<10)+(v-56320),b++),u<128?g[x++]=u:(u<2048?g[x++]=192|u>>>6:(u<65536?g[x++]=224|u>>>12:(g[x++]=240|u>>>18,g[x++]=128|u>>>12&63),g[x++]=128|u>>>6&63),g[x++]=128|63&u);return g},s.buf2binstring=function(f){return h(f,f.length)},s.binstring2buf=function(f){for(var g=new a.Buf8(f.length),u=0,v=g.length;u<v;u++)g[u]=f.charCodeAt(u);return g},s.buf2string=function(f,g){var u,v,b,x,y=g||f.length,k=new Array(2*y);for(u=v=0;u<y;)if((b=f[u++])<128)k[v++]=b;else if(4<(x=l[b]))k[v++]=65533,u+=x-1;else{for(b&=x===2?31:x===3?15:7;1<x&&u<y;)b=b<<6|63&f[u++],x--;1<x?k[v++]=65533:b<65536?k[v++]=b:(b-=65536,k[v++]=55296|b>>10&1023,k[v++]=56320|1023&b)}return h(k,v)},s.utf8border=function(f,g){var u;for((g=g||f.length)>f.length&&(g=f.length),u=g-1;0<=u&&(192&f[u])==128;)u--;return u<0||u===0?g:u+l[f[u]]>g?u:g}},{"./common":41}],43:[function(r,i,s){i.exports=function(a,o,n,l){for(var d=65535&a|0,h=a>>>16&65535|0,f=0;n!==0;){for(n-=f=2e3<n?2e3:n;h=h+(d=d+o[l++]|0)|0,--f;);d%=65521,h%=65521}return d|h<<16|0}},{}],44:[function(r,i,s){i.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(r,i,s){var a=(function(){for(var o,n=[],l=0;l<256;l++){o=l;for(var d=0;d<8;d++)o=1&o?3988292384^o>>>1:o>>>1;n[l]=o}return n})();i.exports=function(o,n,l,d){var h=a,f=d+l;o^=-1;for(var g=d;g<f;g++)o=o>>>8^h[255&(o^n[g])];return-1^o}},{}],46:[function(r,i,s){var a,o=r("../utils/common"),n=r("./trees"),l=r("./adler32"),d=r("./crc32"),h=r("./messages"),f=0,g=4,u=0,v=-2,b=-1,x=4,y=2,k=8,S=9,L=286,E=30,R=19,I=2*L+1,U=15,O=3,q=258,it=q+O+1,A=42,F=113,w=1,B=2,ot=3,V=4;function ct(m,M){return m.msg=h[M],M}function j(m){return(m<<1)-(4<m?9:0)}function ut(m){for(var M=m.length;0<=--M;)m[M]=0}function P(m){var M=m.state,N=M.pending;N>m.avail_out&&(N=m.avail_out),N!==0&&(o.arraySet(m.output,M.pending_buf,M.pending_out,N,m.next_out),m.next_out+=N,M.pending_out+=N,m.total_out+=N,m.avail_out-=N,M.pending-=N,M.pending===0&&(M.pending_out=0))}function D(m,M){n._tr_flush_block(m,0<=m.block_start?m.block_start:-1,m.strstart-m.block_start,M),m.block_start=m.strstart,P(m.strm)}function dt(m,M){m.pending_buf[m.pending++]=M}function et(m,M){m.pending_buf[m.pending++]=M>>>8&255,m.pending_buf[m.pending++]=255&M}function Y(m,M){var N,_,C=m.max_chain_length,z=m.strstart,W=m.prev_length,H=m.nice_match,T=m.strstart>m.w_size-it?m.strstart-(m.w_size-it):0,K=m.window,rt=m.w_mask,G=m.prev,nt=m.strstart+q,Pt=K[z+W-1],kt=K[z+W];m.prev_length>=m.good_match&&(C>>=2),H>m.lookahead&&(H=m.lookahead);do if(K[(N=M)+W]===kt&&K[N+W-1]===Pt&&K[N]===K[z]&&K[++N]===K[z+1]){z+=2,N++;do;while(K[++z]===K[++N]&&K[++z]===K[++N]&&K[++z]===K[++N]&&K[++z]===K[++N]&&K[++z]===K[++N]&&K[++z]===K[++N]&&K[++z]===K[++N]&&K[++z]===K[++N]&&z<nt);if(_=q-(nt-z),z=nt-q,W<_){if(m.match_start=M,H<=(W=_))break;Pt=K[z+W-1],kt=K[z+W]}}while((M=G[M&rt])>T&&--C!=0);return W<=m.lookahead?W:m.lookahead}function jt(m){var M,N,_,C,z,W,H,T,K,rt,G=m.w_size;do{if(C=m.window_size-m.lookahead-m.strstart,m.strstart>=G+(G-it)){for(o.arraySet(m.window,m.window,G,G,0),m.match_start-=G,m.strstart-=G,m.block_start-=G,M=N=m.hash_size;_=m.head[--M],m.head[M]=G<=_?_-G:0,--N;);for(M=N=G;_=m.prev[--M],m.prev[M]=G<=_?_-G:0,--N;);C+=G}if(m.strm.avail_in===0)break;if(W=m.strm,H=m.window,T=m.strstart+m.lookahead,K=C,rt=void 0,rt=W.avail_in,K<rt&&(rt=K),N=rt===0?0:(W.avail_in-=rt,o.arraySet(H,W.input,W.next_in,rt,T),W.state.wrap===1?W.adler=l(W.adler,H,rt,T):W.state.wrap===2&&(W.adler=d(W.adler,H,rt,T)),W.next_in+=rt,W.total_in+=rt,rt),m.lookahead+=N,m.lookahead+m.insert>=O)for(z=m.strstart-m.insert,m.ins_h=m.window[z],m.ins_h=(m.ins_h<<m.hash_shift^m.window[z+1])&m.hash_mask;m.insert&&(m.ins_h=(m.ins_h<<m.hash_shift^m.window[z+O-1])&m.hash_mask,m.prev[z&m.w_mask]=m.head[m.ins_h],m.head[m.ins_h]=z,z++,m.insert--,!(m.lookahead+m.insert<O)););}while(m.lookahead<it&&m.strm.avail_in!==0)}function fe(m,M){for(var N,_;;){if(m.lookahead<it){if(jt(m),m.lookahead<it&&M===f)return w;if(m.lookahead===0)break}if(N=0,m.lookahead>=O&&(m.ins_h=(m.ins_h<<m.hash_shift^m.window[m.strstart+O-1])&m.hash_mask,N=m.prev[m.strstart&m.w_mask]=m.head[m.ins_h],m.head[m.ins_h]=m.strstart),N!==0&&m.strstart-N<=m.w_size-it&&(m.match_length=Y(m,N)),m.match_length>=O)if(_=n._tr_tally(m,m.strstart-m.match_start,m.match_length-O),m.lookahead-=m.match_length,m.match_length<=m.max_lazy_match&&m.lookahead>=O){for(m.match_length--;m.strstart++,m.ins_h=(m.ins_h<<m.hash_shift^m.window[m.strstart+O-1])&m.hash_mask,N=m.prev[m.strstart&m.w_mask]=m.head[m.ins_h],m.head[m.ins_h]=m.strstart,--m.match_length!=0;);m.strstart++}else m.strstart+=m.match_length,m.match_length=0,m.ins_h=m.window[m.strstart],m.ins_h=(m.ins_h<<m.hash_shift^m.window[m.strstart+1])&m.hash_mask;else _=n._tr_tally(m,0,m.window[m.strstart]),m.lookahead--,m.strstart++;if(_&&(D(m,!1),m.strm.avail_out===0))return w}return m.insert=m.strstart<O-1?m.strstart:O-1,M===g?(D(m,!0),m.strm.avail_out===0?ot:V):m.last_lit&&(D(m,!1),m.strm.avail_out===0)?w:B}function xt(m,M){for(var N,_,C;;){if(m.lookahead<it){if(jt(m),m.lookahead<it&&M===f)return w;if(m.lookahead===0)break}if(N=0,m.lookahead>=O&&(m.ins_h=(m.ins_h<<m.hash_shift^m.window[m.strstart+O-1])&m.hash_mask,N=m.prev[m.strstart&m.w_mask]=m.head[m.ins_h],m.head[m.ins_h]=m.strstart),m.prev_length=m.match_length,m.prev_match=m.match_start,m.match_length=O-1,N!==0&&m.prev_length<m.max_lazy_match&&m.strstart-N<=m.w_size-it&&(m.match_length=Y(m,N),m.match_length<=5&&(m.strategy===1||m.match_length===O&&4096<m.strstart-m.match_start)&&(m.match_length=O-1)),m.prev_length>=O&&m.match_length<=m.prev_length){for(C=m.strstart+m.lookahead-O,_=n._tr_tally(m,m.strstart-1-m.prev_match,m.prev_length-O),m.lookahead-=m.prev_length-1,m.prev_length-=2;++m.strstart<=C&&(m.ins_h=(m.ins_h<<m.hash_shift^m.window[m.strstart+O-1])&m.hash_mask,N=m.prev[m.strstart&m.w_mask]=m.head[m.ins_h],m.head[m.ins_h]=m.strstart),--m.prev_length!=0;);if(m.match_available=0,m.match_length=O-1,m.strstart++,_&&(D(m,!1),m.strm.avail_out===0))return w}else if(m.match_available){if((_=n._tr_tally(m,0,m.window[m.strstart-1]))&&D(m,!1),m.strstart++,m.lookahead--,m.strm.avail_out===0)return w}else m.match_available=1,m.strstart++,m.lookahead--}return m.match_available&&(_=n._tr_tally(m,0,m.window[m.strstart-1]),m.match_available=0),m.insert=m.strstart<O-1?m.strstart:O-1,M===g?(D(m,!0),m.strm.avail_out===0?ot:V):m.last_lit&&(D(m,!1),m.strm.avail_out===0)?w:B}function At(m,M,N,_,C){this.good_length=m,this.max_lazy=M,this.nice_length=N,this.max_chain=_,this.func=C}function Qt(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=k,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new o.Buf16(2*I),this.dyn_dtree=new o.Buf16(2*(2*E+1)),this.bl_tree=new o.Buf16(2*(2*R+1)),ut(this.dyn_ltree),ut(this.dyn_dtree),ut(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new o.Buf16(U+1),this.heap=new o.Buf16(2*L+1),ut(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new o.Buf16(2*L+1),ut(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function Kt(m){var M;return m&&m.state?(m.total_in=m.total_out=0,m.data_type=y,(M=m.state).pending=0,M.pending_out=0,M.wrap<0&&(M.wrap=-M.wrap),M.status=M.wrap?A:F,m.adler=M.wrap===2?0:1,M.last_flush=f,n._tr_init(M),u):ct(m,v)}function pr(m){var M=Kt(m);return M===u&&(function(N){N.window_size=2*N.w_size,ut(N.head),N.max_lazy_match=a[N.level].max_lazy,N.good_match=a[N.level].good_length,N.nice_match=a[N.level].nice_length,N.max_chain_length=a[N.level].max_chain,N.strstart=0,N.block_start=0,N.lookahead=0,N.insert=0,N.match_length=N.prev_length=O-1,N.match_available=0,N.ins_h=0})(m.state),M}function Qe(m,M,N,_,C,z){if(!m)return v;var W=1;if(M===b&&(M=6),_<0?(W=0,_=-_):15<_&&(W=2,_-=16),C<1||S<C||N!==k||_<8||15<_||M<0||9<M||z<0||x<z)return ct(m,v);_===8&&(_=9);var H=new Qt;return(m.state=H).strm=m,H.wrap=W,H.gzhead=null,H.w_bits=_,H.w_size=1<<H.w_bits,H.w_mask=H.w_size-1,H.hash_bits=C+7,H.hash_size=1<<H.hash_bits,H.hash_mask=H.hash_size-1,H.hash_shift=~~((H.hash_bits+O-1)/O),H.window=new o.Buf8(2*H.w_size),H.head=new o.Buf16(H.hash_size),H.prev=new o.Buf16(H.w_size),H.lit_bufsize=1<<C+6,H.pending_buf_size=4*H.lit_bufsize,H.pending_buf=new o.Buf8(H.pending_buf_size),H.d_buf=1*H.lit_bufsize,H.l_buf=3*H.lit_bufsize,H.level=M,H.strategy=z,H.method=N,pr(m)}a=[new At(0,0,0,0,function(m,M){var N=65535;for(N>m.pending_buf_size-5&&(N=m.pending_buf_size-5);;){if(m.lookahead<=1){if(jt(m),m.lookahead===0&&M===f)return w;if(m.lookahead===0)break}m.strstart+=m.lookahead,m.lookahead=0;var _=m.block_start+N;if((m.strstart===0||m.strstart>=_)&&(m.lookahead=m.strstart-_,m.strstart=_,D(m,!1),m.strm.avail_out===0)||m.strstart-m.block_start>=m.w_size-it&&(D(m,!1),m.strm.avail_out===0))return w}return m.insert=0,M===g?(D(m,!0),m.strm.avail_out===0?ot:V):(m.strstart>m.block_start&&(D(m,!1),m.strm.avail_out),w)}),new At(4,4,8,4,fe),new At(4,5,16,8,fe),new At(4,6,32,32,fe),new At(4,4,16,16,xt),new At(8,16,32,32,xt),new At(8,16,128,128,xt),new At(8,32,128,256,xt),new At(32,128,258,1024,xt),new At(32,258,258,4096,xt)],s.deflateInit=function(m,M){return Qe(m,M,k,15,8,0)},s.deflateInit2=Qe,s.deflateReset=pr,s.deflateResetKeep=Kt,s.deflateSetHeader=function(m,M){return m&&m.state?m.state.wrap!==2?v:(m.state.gzhead=M,u):v},s.deflate=function(m,M){var N,_,C,z;if(!m||!m.state||5<M||M<0)return m?ct(m,v):v;if(_=m.state,!m.output||!m.input&&m.avail_in!==0||_.status===666&&M!==g)return ct(m,m.avail_out===0?-5:v);if(_.strm=m,N=_.last_flush,_.last_flush=M,_.status===A)if(_.wrap===2)m.adler=0,dt(_,31),dt(_,139),dt(_,8),_.gzhead?(dt(_,(_.gzhead.text?1:0)+(_.gzhead.hcrc?2:0)+(_.gzhead.extra?4:0)+(_.gzhead.name?8:0)+(_.gzhead.comment?16:0)),dt(_,255&_.gzhead.time),dt(_,_.gzhead.time>>8&255),dt(_,_.gzhead.time>>16&255),dt(_,_.gzhead.time>>24&255),dt(_,_.level===9?2:2<=_.strategy||_.level<2?4:0),dt(_,255&_.gzhead.os),_.gzhead.extra&&_.gzhead.extra.length&&(dt(_,255&_.gzhead.extra.length),dt(_,_.gzhead.extra.length>>8&255)),_.gzhead.hcrc&&(m.adler=d(m.adler,_.pending_buf,_.pending,0)),_.gzindex=0,_.status=69):(dt(_,0),dt(_,0),dt(_,0),dt(_,0),dt(_,0),dt(_,_.level===9?2:2<=_.strategy||_.level<2?4:0),dt(_,3),_.status=F);else{var W=k+(_.w_bits-8<<4)<<8;W|=(2<=_.strategy||_.level<2?0:_.level<6?1:_.level===6?2:3)<<6,_.strstart!==0&&(W|=32),W+=31-W%31,_.status=F,et(_,W),_.strstart!==0&&(et(_,m.adler>>>16),et(_,65535&m.adler)),m.adler=1}if(_.status===69)if(_.gzhead.extra){for(C=_.pending;_.gzindex<(65535&_.gzhead.extra.length)&&(_.pending!==_.pending_buf_size||(_.gzhead.hcrc&&_.pending>C&&(m.adler=d(m.adler,_.pending_buf,_.pending-C,C)),P(m),C=_.pending,_.pending!==_.pending_buf_size));)dt(_,255&_.gzhead.extra[_.gzindex]),_.gzindex++;_.gzhead.hcrc&&_.pending>C&&(m.adler=d(m.adler,_.pending_buf,_.pending-C,C)),_.gzindex===_.gzhead.extra.length&&(_.gzindex=0,_.status=73)}else _.status=73;if(_.status===73)if(_.gzhead.name){C=_.pending;do{if(_.pending===_.pending_buf_size&&(_.gzhead.hcrc&&_.pending>C&&(m.adler=d(m.adler,_.pending_buf,_.pending-C,C)),P(m),C=_.pending,_.pending===_.pending_buf_size)){z=1;break}z=_.gzindex<_.gzhead.name.length?255&_.gzhead.name.charCodeAt(_.gzindex++):0,dt(_,z)}while(z!==0);_.gzhead.hcrc&&_.pending>C&&(m.adler=d(m.adler,_.pending_buf,_.pending-C,C)),z===0&&(_.gzindex=0,_.status=91)}else _.status=91;if(_.status===91)if(_.gzhead.comment){C=_.pending;do{if(_.pending===_.pending_buf_size&&(_.gzhead.hcrc&&_.pending>C&&(m.adler=d(m.adler,_.pending_buf,_.pending-C,C)),P(m),C=_.pending,_.pending===_.pending_buf_size)){z=1;break}z=_.gzindex<_.gzhead.comment.length?255&_.gzhead.comment.charCodeAt(_.gzindex++):0,dt(_,z)}while(z!==0);_.gzhead.hcrc&&_.pending>C&&(m.adler=d(m.adler,_.pending_buf,_.pending-C,C)),z===0&&(_.status=103)}else _.status=103;if(_.status===103&&(_.gzhead.hcrc?(_.pending+2>_.pending_buf_size&&P(m),_.pending+2<=_.pending_buf_size&&(dt(_,255&m.adler),dt(_,m.adler>>8&255),m.adler=0,_.status=F)):_.status=F),_.pending!==0){if(P(m),m.avail_out===0)return _.last_flush=-1,u}else if(m.avail_in===0&&j(M)<=j(N)&&M!==g)return ct(m,-5);if(_.status===666&&m.avail_in!==0)return ct(m,-5);if(m.avail_in!==0||_.lookahead!==0||M!==f&&_.status!==666){var H=_.strategy===2?(function(T,K){for(var rt;;){if(T.lookahead===0&&(jt(T),T.lookahead===0)){if(K===f)return w;break}if(T.match_length=0,rt=n._tr_tally(T,0,T.window[T.strstart]),T.lookahead--,T.strstart++,rt&&(D(T,!1),T.strm.avail_out===0))return w}return T.insert=0,K===g?(D(T,!0),T.strm.avail_out===0?ot:V):T.last_lit&&(D(T,!1),T.strm.avail_out===0)?w:B})(_,M):_.strategy===3?(function(T,K){for(var rt,G,nt,Pt,kt=T.window;;){if(T.lookahead<=q){if(jt(T),T.lookahead<=q&&K===f)return w;if(T.lookahead===0)break}if(T.match_length=0,T.lookahead>=O&&0<T.strstart&&(G=kt[nt=T.strstart-1])===kt[++nt]&&G===kt[++nt]&&G===kt[++nt]){Pt=T.strstart+q;do;while(G===kt[++nt]&&G===kt[++nt]&&G===kt[++nt]&&G===kt[++nt]&&G===kt[++nt]&&G===kt[++nt]&&G===kt[++nt]&&G===kt[++nt]&&nt<Pt);T.match_length=q-(Pt-nt),T.match_length>T.lookahead&&(T.match_length=T.lookahead)}if(T.match_length>=O?(rt=n._tr_tally(T,1,T.match_length-O),T.lookahead-=T.match_length,T.strstart+=T.match_length,T.match_length=0):(rt=n._tr_tally(T,0,T.window[T.strstart]),T.lookahead--,T.strstart++),rt&&(D(T,!1),T.strm.avail_out===0))return w}return T.insert=0,K===g?(D(T,!0),T.strm.avail_out===0?ot:V):T.last_lit&&(D(T,!1),T.strm.avail_out===0)?w:B})(_,M):a[_.level].func(_,M);if(H!==ot&&H!==V||(_.status=666),H===w||H===ot)return m.avail_out===0&&(_.last_flush=-1),u;if(H===B&&(M===1?n._tr_align(_):M!==5&&(n._tr_stored_block(_,0,0,!1),M===3&&(ut(_.head),_.lookahead===0&&(_.strstart=0,_.block_start=0,_.insert=0))),P(m),m.avail_out===0))return _.last_flush=-1,u}return M!==g?u:_.wrap<=0?1:(_.wrap===2?(dt(_,255&m.adler),dt(_,m.adler>>8&255),dt(_,m.adler>>16&255),dt(_,m.adler>>24&255),dt(_,255&m.total_in),dt(_,m.total_in>>8&255),dt(_,m.total_in>>16&255),dt(_,m.total_in>>24&255)):(et(_,m.adler>>>16),et(_,65535&m.adler)),P(m),0<_.wrap&&(_.wrap=-_.wrap),_.pending!==0?u:1)},s.deflateEnd=function(m){var M;return m&&m.state?(M=m.state.status)!==A&&M!==69&&M!==73&&M!==91&&M!==103&&M!==F&&M!==666?ct(m,v):(m.state=null,M===F?ct(m,-3):u):v},s.deflateSetDictionary=function(m,M){var N,_,C,z,W,H,T,K,rt=M.length;if(!m||!m.state||(z=(N=m.state).wrap)===2||z===1&&N.status!==A||N.lookahead)return v;for(z===1&&(m.adler=l(m.adler,M,rt,0)),N.wrap=0,rt>=N.w_size&&(z===0&&(ut(N.head),N.strstart=0,N.block_start=0,N.insert=0),K=new o.Buf8(N.w_size),o.arraySet(K,M,rt-N.w_size,N.w_size,0),M=K,rt=N.w_size),W=m.avail_in,H=m.next_in,T=m.input,m.avail_in=rt,m.next_in=0,m.input=M,jt(N);N.lookahead>=O;){for(_=N.strstart,C=N.lookahead-(O-1);N.ins_h=(N.ins_h<<N.hash_shift^N.window[_+O-1])&N.hash_mask,N.prev[_&N.w_mask]=N.head[N.ins_h],N.head[N.ins_h]=_,_++,--C;);N.strstart=_,N.lookahead=O-1,jt(N)}return N.strstart+=N.lookahead,N.block_start=N.strstart,N.insert=N.lookahead,N.lookahead=0,N.match_length=N.prev_length=O-1,N.match_available=0,m.next_in=H,m.input=T,m.avail_in=W,N.wrap=z,u},s.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(r,i,s){i.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(r,i,s){i.exports=function(a,o){var n,l,d,h,f,g,u,v,b,x,y,k,S,L,E,R,I,U,O,q,it,A,F,w,B;n=a.state,l=a.next_in,w=a.input,d=l+(a.avail_in-5),h=a.next_out,B=a.output,f=h-(o-a.avail_out),g=h+(a.avail_out-257),u=n.dmax,v=n.wsize,b=n.whave,x=n.wnext,y=n.window,k=n.hold,S=n.bits,L=n.lencode,E=n.distcode,R=(1<<n.lenbits)-1,I=(1<<n.distbits)-1;t:do{S<15&&(k+=w[l++]<<S,S+=8,k+=w[l++]<<S,S+=8),U=L[k&R];e:for(;;){if(k>>>=O=U>>>24,S-=O,(O=U>>>16&255)===0)B[h++]=65535&U;else{if(!(16&O)){if((64&O)==0){U=L[(65535&U)+(k&(1<<O)-1)];continue e}if(32&O){n.mode=12;break t}a.msg="invalid literal/length code",n.mode=30;break t}q=65535&U,(O&=15)&&(S<O&&(k+=w[l++]<<S,S+=8),q+=k&(1<<O)-1,k>>>=O,S-=O),S<15&&(k+=w[l++]<<S,S+=8,k+=w[l++]<<S,S+=8),U=E[k&I];r:for(;;){if(k>>>=O=U>>>24,S-=O,!(16&(O=U>>>16&255))){if((64&O)==0){U=E[(65535&U)+(k&(1<<O)-1)];continue r}a.msg="invalid distance code",n.mode=30;break t}if(it=65535&U,S<(O&=15)&&(k+=w[l++]<<S,(S+=8)<O&&(k+=w[l++]<<S,S+=8)),u<(it+=k&(1<<O)-1)){a.msg="invalid distance too far back",n.mode=30;break t}if(k>>>=O,S-=O,(O=h-f)<it){if(b<(O=it-O)&&n.sane){a.msg="invalid distance too far back",n.mode=30;break t}if(F=y,(A=0)===x){if(A+=v-O,O<q){for(q-=O;B[h++]=y[A++],--O;);A=h-it,F=B}}else if(x<O){if(A+=v+x-O,(O-=x)<q){for(q-=O;B[h++]=y[A++],--O;);if(A=0,x<q){for(q-=O=x;B[h++]=y[A++],--O;);A=h-it,F=B}}}else if(A+=x-O,O<q){for(q-=O;B[h++]=y[A++],--O;);A=h-it,F=B}for(;2<q;)B[h++]=F[A++],B[h++]=F[A++],B[h++]=F[A++],q-=3;q&&(B[h++]=F[A++],1<q&&(B[h++]=F[A++]))}else{for(A=h-it;B[h++]=B[A++],B[h++]=B[A++],B[h++]=B[A++],2<(q-=3););q&&(B[h++]=B[A++],1<q&&(B[h++]=B[A++]))}break}}break}}while(l<d&&h<g);l-=q=S>>3,k&=(1<<(S-=q<<3))-1,a.next_in=l,a.next_out=h,a.avail_in=l<d?d-l+5:5-(l-d),a.avail_out=h<g?g-h+257:257-(h-g),n.hold=k,n.bits=S}},{}],49:[function(r,i,s){var a=r("../utils/common"),o=r("./adler32"),n=r("./crc32"),l=r("./inffast"),d=r("./inftrees"),h=1,f=2,g=0,u=-2,v=1,b=852,x=592;function y(A){return(A>>>24&255)+(A>>>8&65280)+((65280&A)<<8)+((255&A)<<24)}function k(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new a.Buf16(320),this.work=new a.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function S(A){var F;return A&&A.state?(F=A.state,A.total_in=A.total_out=F.total=0,A.msg="",F.wrap&&(A.adler=1&F.wrap),F.mode=v,F.last=0,F.havedict=0,F.dmax=32768,F.head=null,F.hold=0,F.bits=0,F.lencode=F.lendyn=new a.Buf32(b),F.distcode=F.distdyn=new a.Buf32(x),F.sane=1,F.back=-1,g):u}function L(A){var F;return A&&A.state?((F=A.state).wsize=0,F.whave=0,F.wnext=0,S(A)):u}function E(A,F){var w,B;return A&&A.state?(B=A.state,F<0?(w=0,F=-F):(w=1+(F>>4),F<48&&(F&=15)),F&&(F<8||15<F)?u:(B.window!==null&&B.wbits!==F&&(B.window=null),B.wrap=w,B.wbits=F,L(A))):u}function R(A,F){var w,B;return A?(B=new k,(A.state=B).window=null,(w=E(A,F))!==g&&(A.state=null),w):u}var I,U,O=!0;function q(A){if(O){var F;for(I=new a.Buf32(512),U=new a.Buf32(32),F=0;F<144;)A.lens[F++]=8;for(;F<256;)A.lens[F++]=9;for(;F<280;)A.lens[F++]=7;for(;F<288;)A.lens[F++]=8;for(d(h,A.lens,0,288,I,0,A.work,{bits:9}),F=0;F<32;)A.lens[F++]=5;d(f,A.lens,0,32,U,0,A.work,{bits:5}),O=!1}A.lencode=I,A.lenbits=9,A.distcode=U,A.distbits=5}function it(A,F,w,B){var ot,V=A.state;return V.window===null&&(V.wsize=1<<V.wbits,V.wnext=0,V.whave=0,V.window=new a.Buf8(V.wsize)),B>=V.wsize?(a.arraySet(V.window,F,w-V.wsize,V.wsize,0),V.wnext=0,V.whave=V.wsize):(B<(ot=V.wsize-V.wnext)&&(ot=B),a.arraySet(V.window,F,w-B,ot,V.wnext),(B-=ot)?(a.arraySet(V.window,F,w-B,B,0),V.wnext=B,V.whave=V.wsize):(V.wnext+=ot,V.wnext===V.wsize&&(V.wnext=0),V.whave<V.wsize&&(V.whave+=ot))),0}s.inflateReset=L,s.inflateReset2=E,s.inflateResetKeep=S,s.inflateInit=function(A){return R(A,15)},s.inflateInit2=R,s.inflate=function(A,F){var w,B,ot,V,ct,j,ut,P,D,dt,et,Y,jt,fe,xt,At,Qt,Kt,pr,Qe,m,M,N,_,C=0,z=new a.Buf8(4),W=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!A||!A.state||!A.output||!A.input&&A.avail_in!==0)return u;(w=A.state).mode===12&&(w.mode=13),ct=A.next_out,ot=A.output,ut=A.avail_out,V=A.next_in,B=A.input,j=A.avail_in,P=w.hold,D=w.bits,dt=j,et=ut,M=g;t:for(;;)switch(w.mode){case v:if(w.wrap===0){w.mode=13;break}for(;D<16;){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}if(2&w.wrap&&P===35615){z[w.check=0]=255&P,z[1]=P>>>8&255,w.check=n(w.check,z,2,0),D=P=0,w.mode=2;break}if(w.flags=0,w.head&&(w.head.done=!1),!(1&w.wrap)||(((255&P)<<8)+(P>>8))%31){A.msg="incorrect header check",w.mode=30;break}if((15&P)!=8){A.msg="unknown compression method",w.mode=30;break}if(D-=4,m=8+(15&(P>>>=4)),w.wbits===0)w.wbits=m;else if(m>w.wbits){A.msg="invalid window size",w.mode=30;break}w.dmax=1<<m,A.adler=w.check=1,w.mode=512&P?10:12,D=P=0;break;case 2:for(;D<16;){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}if(w.flags=P,(255&w.flags)!=8){A.msg="unknown compression method",w.mode=30;break}if(57344&w.flags){A.msg="unknown header flags set",w.mode=30;break}w.head&&(w.head.text=P>>8&1),512&w.flags&&(z[0]=255&P,z[1]=P>>>8&255,w.check=n(w.check,z,2,0)),D=P=0,w.mode=3;case 3:for(;D<32;){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}w.head&&(w.head.time=P),512&w.flags&&(z[0]=255&P,z[1]=P>>>8&255,z[2]=P>>>16&255,z[3]=P>>>24&255,w.check=n(w.check,z,4,0)),D=P=0,w.mode=4;case 4:for(;D<16;){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}w.head&&(w.head.xflags=255&P,w.head.os=P>>8),512&w.flags&&(z[0]=255&P,z[1]=P>>>8&255,w.check=n(w.check,z,2,0)),D=P=0,w.mode=5;case 5:if(1024&w.flags){for(;D<16;){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}w.length=P,w.head&&(w.head.extra_len=P),512&w.flags&&(z[0]=255&P,z[1]=P>>>8&255,w.check=n(w.check,z,2,0)),D=P=0}else w.head&&(w.head.extra=null);w.mode=6;case 6:if(1024&w.flags&&(j<(Y=w.length)&&(Y=j),Y&&(w.head&&(m=w.head.extra_len-w.length,w.head.extra||(w.head.extra=new Array(w.head.extra_len)),a.arraySet(w.head.extra,B,V,Y,m)),512&w.flags&&(w.check=n(w.check,B,Y,V)),j-=Y,V+=Y,w.length-=Y),w.length))break t;w.length=0,w.mode=7;case 7:if(2048&w.flags){if(j===0)break t;for(Y=0;m=B[V+Y++],w.head&&m&&w.length<65536&&(w.head.name+=String.fromCharCode(m)),m&&Y<j;);if(512&w.flags&&(w.check=n(w.check,B,Y,V)),j-=Y,V+=Y,m)break t}else w.head&&(w.head.name=null);w.length=0,w.mode=8;case 8:if(4096&w.flags){if(j===0)break t;for(Y=0;m=B[V+Y++],w.head&&m&&w.length<65536&&(w.head.comment+=String.fromCharCode(m)),m&&Y<j;);if(512&w.flags&&(w.check=n(w.check,B,Y,V)),j-=Y,V+=Y,m)break t}else w.head&&(w.head.comment=null);w.mode=9;case 9:if(512&w.flags){for(;D<16;){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}if(P!==(65535&w.check)){A.msg="header crc mismatch",w.mode=30;break}D=P=0}w.head&&(w.head.hcrc=w.flags>>9&1,w.head.done=!0),A.adler=w.check=0,w.mode=12;break;case 10:for(;D<32;){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}A.adler=w.check=y(P),D=P=0,w.mode=11;case 11:if(w.havedict===0)return A.next_out=ct,A.avail_out=ut,A.next_in=V,A.avail_in=j,w.hold=P,w.bits=D,2;A.adler=w.check=1,w.mode=12;case 12:if(F===5||F===6)break t;case 13:if(w.last){P>>>=7&D,D-=7&D,w.mode=27;break}for(;D<3;){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}switch(w.last=1&P,D-=1,3&(P>>>=1)){case 0:w.mode=14;break;case 1:if(q(w),w.mode=20,F!==6)break;P>>>=2,D-=2;break t;case 2:w.mode=17;break;case 3:A.msg="invalid block type",w.mode=30}P>>>=2,D-=2;break;case 14:for(P>>>=7&D,D-=7&D;D<32;){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}if((65535&P)!=(P>>>16^65535)){A.msg="invalid stored block lengths",w.mode=30;break}if(w.length=65535&P,D=P=0,w.mode=15,F===6)break t;case 15:w.mode=16;case 16:if(Y=w.length){if(j<Y&&(Y=j),ut<Y&&(Y=ut),Y===0)break t;a.arraySet(ot,B,V,Y,ct),j-=Y,V+=Y,ut-=Y,ct+=Y,w.length-=Y;break}w.mode=12;break;case 17:for(;D<14;){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}if(w.nlen=257+(31&P),P>>>=5,D-=5,w.ndist=1+(31&P),P>>>=5,D-=5,w.ncode=4+(15&P),P>>>=4,D-=4,286<w.nlen||30<w.ndist){A.msg="too many length or distance symbols",w.mode=30;break}w.have=0,w.mode=18;case 18:for(;w.have<w.ncode;){for(;D<3;){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}w.lens[W[w.have++]]=7&P,P>>>=3,D-=3}for(;w.have<19;)w.lens[W[w.have++]]=0;if(w.lencode=w.lendyn,w.lenbits=7,N={bits:w.lenbits},M=d(0,w.lens,0,19,w.lencode,0,w.work,N),w.lenbits=N.bits,M){A.msg="invalid code lengths set",w.mode=30;break}w.have=0,w.mode=19;case 19:for(;w.have<w.nlen+w.ndist;){for(;At=(C=w.lencode[P&(1<<w.lenbits)-1])>>>16&255,Qt=65535&C,!((xt=C>>>24)<=D);){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}if(Qt<16)P>>>=xt,D-=xt,w.lens[w.have++]=Qt;else{if(Qt===16){for(_=xt+2;D<_;){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}if(P>>>=xt,D-=xt,w.have===0){A.msg="invalid bit length repeat",w.mode=30;break}m=w.lens[w.have-1],Y=3+(3&P),P>>>=2,D-=2}else if(Qt===17){for(_=xt+3;D<_;){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}D-=xt,m=0,Y=3+(7&(P>>>=xt)),P>>>=3,D-=3}else{for(_=xt+7;D<_;){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}D-=xt,m=0,Y=11+(127&(P>>>=xt)),P>>>=7,D-=7}if(w.have+Y>w.nlen+w.ndist){A.msg="invalid bit length repeat",w.mode=30;break}for(;Y--;)w.lens[w.have++]=m}}if(w.mode===30)break;if(w.lens[256]===0){A.msg="invalid code -- missing end-of-block",w.mode=30;break}if(w.lenbits=9,N={bits:w.lenbits},M=d(h,w.lens,0,w.nlen,w.lencode,0,w.work,N),w.lenbits=N.bits,M){A.msg="invalid literal/lengths set",w.mode=30;break}if(w.distbits=6,w.distcode=w.distdyn,N={bits:w.distbits},M=d(f,w.lens,w.nlen,w.ndist,w.distcode,0,w.work,N),w.distbits=N.bits,M){A.msg="invalid distances set",w.mode=30;break}if(w.mode=20,F===6)break t;case 20:w.mode=21;case 21:if(6<=j&&258<=ut){A.next_out=ct,A.avail_out=ut,A.next_in=V,A.avail_in=j,w.hold=P,w.bits=D,l(A,et),ct=A.next_out,ot=A.output,ut=A.avail_out,V=A.next_in,B=A.input,j=A.avail_in,P=w.hold,D=w.bits,w.mode===12&&(w.back=-1);break}for(w.back=0;At=(C=w.lencode[P&(1<<w.lenbits)-1])>>>16&255,Qt=65535&C,!((xt=C>>>24)<=D);){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}if(At&&(240&At)==0){for(Kt=xt,pr=At,Qe=Qt;At=(C=w.lencode[Qe+((P&(1<<Kt+pr)-1)>>Kt)])>>>16&255,Qt=65535&C,!(Kt+(xt=C>>>24)<=D);){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}P>>>=Kt,D-=Kt,w.back+=Kt}if(P>>>=xt,D-=xt,w.back+=xt,w.length=Qt,At===0){w.mode=26;break}if(32&At){w.back=-1,w.mode=12;break}if(64&At){A.msg="invalid literal/length code",w.mode=30;break}w.extra=15&At,w.mode=22;case 22:if(w.extra){for(_=w.extra;D<_;){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}w.length+=P&(1<<w.extra)-1,P>>>=w.extra,D-=w.extra,w.back+=w.extra}w.was=w.length,w.mode=23;case 23:for(;At=(C=w.distcode[P&(1<<w.distbits)-1])>>>16&255,Qt=65535&C,!((xt=C>>>24)<=D);){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}if((240&At)==0){for(Kt=xt,pr=At,Qe=Qt;At=(C=w.distcode[Qe+((P&(1<<Kt+pr)-1)>>Kt)])>>>16&255,Qt=65535&C,!(Kt+(xt=C>>>24)<=D);){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}P>>>=Kt,D-=Kt,w.back+=Kt}if(P>>>=xt,D-=xt,w.back+=xt,64&At){A.msg="invalid distance code",w.mode=30;break}w.offset=Qt,w.extra=15&At,w.mode=24;case 24:if(w.extra){for(_=w.extra;D<_;){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}w.offset+=P&(1<<w.extra)-1,P>>>=w.extra,D-=w.extra,w.back+=w.extra}if(w.offset>w.dmax){A.msg="invalid distance too far back",w.mode=30;break}w.mode=25;case 25:if(ut===0)break t;if(Y=et-ut,w.offset>Y){if((Y=w.offset-Y)>w.whave&&w.sane){A.msg="invalid distance too far back",w.mode=30;break}jt=Y>w.wnext?(Y-=w.wnext,w.wsize-Y):w.wnext-Y,Y>w.length&&(Y=w.length),fe=w.window}else fe=ot,jt=ct-w.offset,Y=w.length;for(ut<Y&&(Y=ut),ut-=Y,w.length-=Y;ot[ct++]=fe[jt++],--Y;);w.length===0&&(w.mode=21);break;case 26:if(ut===0)break t;ot[ct++]=w.length,ut--,w.mode=21;break;case 27:if(w.wrap){for(;D<32;){if(j===0)break t;j--,P|=B[V++]<<D,D+=8}if(et-=ut,A.total_out+=et,w.total+=et,et&&(A.adler=w.check=w.flags?n(w.check,ot,et,ct-et):o(w.check,ot,et,ct-et)),et=ut,(w.flags?P:y(P))!==w.check){A.msg="incorrect data check",w.mode=30;break}D=P=0}w.mode=28;case 28:if(w.wrap&&w.flags){for(;D<32;){if(j===0)break t;j--,P+=B[V++]<<D,D+=8}if(P!==(4294967295&w.total)){A.msg="incorrect length check",w.mode=30;break}D=P=0}w.mode=29;case 29:M=1;break t;case 30:M=-3;break t;case 31:return-4;default:return u}return A.next_out=ct,A.avail_out=ut,A.next_in=V,A.avail_in=j,w.hold=P,w.bits=D,(w.wsize||et!==A.avail_out&&w.mode<30&&(w.mode<27||F!==4))&&it(A,A.output,A.next_out,et-A.avail_out)?(w.mode=31,-4):(dt-=A.avail_in,et-=A.avail_out,A.total_in+=dt,A.total_out+=et,w.total+=et,w.wrap&&et&&(A.adler=w.check=w.flags?n(w.check,ot,et,A.next_out-et):o(w.check,ot,et,A.next_out-et)),A.data_type=w.bits+(w.last?64:0)+(w.mode===12?128:0)+(w.mode===20||w.mode===15?256:0),(dt==0&&et===0||F===4)&&M===g&&(M=-5),M)},s.inflateEnd=function(A){if(!A||!A.state)return u;var F=A.state;return F.window&&(F.window=null),A.state=null,g},s.inflateGetHeader=function(A,F){var w;return A&&A.state?(2&(w=A.state).wrap)==0?u:((w.head=F).done=!1,g):u},s.inflateSetDictionary=function(A,F){var w,B=F.length;return A&&A.state?(w=A.state).wrap!==0&&w.mode!==11?u:w.mode===11&&o(1,F,B,0)!==w.check?-3:it(A,F,B,B)?(w.mode=31,-4):(w.havedict=1,g):u},s.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(r,i,s){var a=r("../utils/common"),o=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],n=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],l=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],d=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];i.exports=function(h,f,g,u,v,b,x,y){var k,S,L,E,R,I,U,O,q,it=y.bits,A=0,F=0,w=0,B=0,ot=0,V=0,ct=0,j=0,ut=0,P=0,D=null,dt=0,et=new a.Buf16(16),Y=new a.Buf16(16),jt=null,fe=0;for(A=0;A<=15;A++)et[A]=0;for(F=0;F<u;F++)et[f[g+F]]++;for(ot=it,B=15;1<=B&&et[B]===0;B--);if(B<ot&&(ot=B),B===0)return v[b++]=20971520,v[b++]=20971520,y.bits=1,0;for(w=1;w<B&&et[w]===0;w++);for(ot<w&&(ot=w),A=j=1;A<=15;A++)if(j<<=1,(j-=et[A])<0)return-1;if(0<j&&(h===0||B!==1))return-1;for(Y[1]=0,A=1;A<15;A++)Y[A+1]=Y[A]+et[A];for(F=0;F<u;F++)f[g+F]!==0&&(x[Y[f[g+F]]++]=F);if(I=h===0?(D=jt=x,19):h===1?(D=o,dt-=257,jt=n,fe-=257,256):(D=l,jt=d,-1),A=w,R=b,ct=F=P=0,L=-1,E=(ut=1<<(V=ot))-1,h===1&&852<ut||h===2&&592<ut)return 1;for(;;){for(U=A-ct,q=x[F]<I?(O=0,x[F]):x[F]>I?(O=jt[fe+x[F]],D[dt+x[F]]):(O=96,0),k=1<<A-ct,w=S=1<<V;v[R+(P>>ct)+(S-=k)]=U<<24|O<<16|q|0,S!==0;);for(k=1<<A-1;P&k;)k>>=1;if(k!==0?(P&=k-1,P+=k):P=0,F++,--et[A]==0){if(A===B)break;A=f[g+x[F]]}if(ot<A&&(P&E)!==L){for(ct===0&&(ct=ot),R+=w,j=1<<(V=A-ct);V+ct<B&&!((j-=et[V+ct])<=0);)V++,j<<=1;if(ut+=1<<V,h===1&&852<ut||h===2&&592<ut)return 1;v[L=P&E]=ot<<24|V<<16|R-b|0}}return P!==0&&(v[R+P]=A-ct<<24|64<<16|0),y.bits=ot,0}},{"../utils/common":41}],51:[function(r,i,s){i.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(r,i,s){var a=r("../utils/common"),o=0,n=1;function l(C){for(var z=C.length;0<=--z;)C[z]=0}var d=0,h=29,f=256,g=f+1+h,u=30,v=19,b=2*g+1,x=15,y=16,k=7,S=256,L=16,E=17,R=18,I=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],U=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],O=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],q=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],it=new Array(2*(g+2));l(it);var A=new Array(2*u);l(A);var F=new Array(512);l(F);var w=new Array(256);l(w);var B=new Array(h);l(B);var ot,V,ct,j=new Array(u);function ut(C,z,W,H,T){this.static_tree=C,this.extra_bits=z,this.extra_base=W,this.elems=H,this.max_length=T,this.has_stree=C&&C.length}function P(C,z){this.dyn_tree=C,this.max_code=0,this.stat_desc=z}function D(C){return C<256?F[C]:F[256+(C>>>7)]}function dt(C,z){C.pending_buf[C.pending++]=255&z,C.pending_buf[C.pending++]=z>>>8&255}function et(C,z,W){C.bi_valid>y-W?(C.bi_buf|=z<<C.bi_valid&65535,dt(C,C.bi_buf),C.bi_buf=z>>y-C.bi_valid,C.bi_valid+=W-y):(C.bi_buf|=z<<C.bi_valid&65535,C.bi_valid+=W)}function Y(C,z,W){et(C,W[2*z],W[2*z+1])}function jt(C,z){for(var W=0;W|=1&C,C>>>=1,W<<=1,0<--z;);return W>>>1}function fe(C,z,W){var H,T,K=new Array(x+1),rt=0;for(H=1;H<=x;H++)K[H]=rt=rt+W[H-1]<<1;for(T=0;T<=z;T++){var G=C[2*T+1];G!==0&&(C[2*T]=jt(K[G]++,G))}}function xt(C){var z;for(z=0;z<g;z++)C.dyn_ltree[2*z]=0;for(z=0;z<u;z++)C.dyn_dtree[2*z]=0;for(z=0;z<v;z++)C.bl_tree[2*z]=0;C.dyn_ltree[2*S]=1,C.opt_len=C.static_len=0,C.last_lit=C.matches=0}function At(C){8<C.bi_valid?dt(C,C.bi_buf):0<C.bi_valid&&(C.pending_buf[C.pending++]=C.bi_buf),C.bi_buf=0,C.bi_valid=0}function Qt(C,z,W,H){var T=2*z,K=2*W;return C[T]<C[K]||C[T]===C[K]&&H[z]<=H[W]}function Kt(C,z,W){for(var H=C.heap[W],T=W<<1;T<=C.heap_len&&(T<C.heap_len&&Qt(z,C.heap[T+1],C.heap[T],C.depth)&&T++,!Qt(z,H,C.heap[T],C.depth));)C.heap[W]=C.heap[T],W=T,T<<=1;C.heap[W]=H}function pr(C,z,W){var H,T,K,rt,G=0;if(C.last_lit!==0)for(;H=C.pending_buf[C.d_buf+2*G]<<8|C.pending_buf[C.d_buf+2*G+1],T=C.pending_buf[C.l_buf+G],G++,H===0?Y(C,T,z):(Y(C,(K=w[T])+f+1,z),(rt=I[K])!==0&&et(C,T-=B[K],rt),Y(C,K=D(--H),W),(rt=U[K])!==0&&et(C,H-=j[K],rt)),G<C.last_lit;);Y(C,S,z)}function Qe(C,z){var W,H,T,K=z.dyn_tree,rt=z.stat_desc.static_tree,G=z.stat_desc.has_stree,nt=z.stat_desc.elems,Pt=-1;for(C.heap_len=0,C.heap_max=b,W=0;W<nt;W++)K[2*W]!==0?(C.heap[++C.heap_len]=Pt=W,C.depth[W]=0):K[2*W+1]=0;for(;C.heap_len<2;)K[2*(T=C.heap[++C.heap_len]=Pt<2?++Pt:0)]=1,C.depth[T]=0,C.opt_len--,G&&(C.static_len-=rt[2*T+1]);for(z.max_code=Pt,W=C.heap_len>>1;1<=W;W--)Kt(C,K,W);for(T=nt;W=C.heap[1],C.heap[1]=C.heap[C.heap_len--],Kt(C,K,1),H=C.heap[1],C.heap[--C.heap_max]=W,C.heap[--C.heap_max]=H,K[2*T]=K[2*W]+K[2*H],C.depth[T]=(C.depth[W]>=C.depth[H]?C.depth[W]:C.depth[H])+1,K[2*W+1]=K[2*H+1]=T,C.heap[1]=T++,Kt(C,K,1),2<=C.heap_len;);C.heap[--C.heap_max]=C.heap[1],(function(kt,He){var ys,fr,xs,Gt,ha,zo,zr=He.dyn_tree,_l=He.max_code,kh=He.stat_desc.static_tree,Ch=He.stat_desc.has_stree,Sh=He.stat_desc.extra_bits,El=He.stat_desc.extra_base,ks=He.stat_desc.max_length,ua=0;for(Gt=0;Gt<=x;Gt++)kt.bl_count[Gt]=0;for(zr[2*kt.heap[kt.heap_max]+1]=0,ys=kt.heap_max+1;ys<b;ys++)ks<(Gt=zr[2*zr[2*(fr=kt.heap[ys])+1]+1]+1)&&(Gt=ks,ua++),zr[2*fr+1]=Gt,_l<fr||(kt.bl_count[Gt]++,ha=0,El<=fr&&(ha=Sh[fr-El]),zo=zr[2*fr],kt.opt_len+=zo*(Gt+ha),Ch&&(kt.static_len+=zo*(kh[2*fr+1]+ha)));if(ua!==0){do{for(Gt=ks-1;kt.bl_count[Gt]===0;)Gt--;kt.bl_count[Gt]--,kt.bl_count[Gt+1]+=2,kt.bl_count[ks]--,ua-=2}while(0<ua);for(Gt=ks;Gt!==0;Gt--)for(fr=kt.bl_count[Gt];fr!==0;)_l<(xs=kt.heap[--ys])||(zr[2*xs+1]!==Gt&&(kt.opt_len+=(Gt-zr[2*xs+1])*zr[2*xs],zr[2*xs+1]=Gt),fr--)}})(C,z),fe(K,Pt,C.bl_count)}function m(C,z,W){var H,T,K=-1,rt=z[1],G=0,nt=7,Pt=4;for(rt===0&&(nt=138,Pt=3),z[2*(W+1)+1]=65535,H=0;H<=W;H++)T=rt,rt=z[2*(H+1)+1],++G<nt&&T===rt||(G<Pt?C.bl_tree[2*T]+=G:T!==0?(T!==K&&C.bl_tree[2*T]++,C.bl_tree[2*L]++):G<=10?C.bl_tree[2*E]++:C.bl_tree[2*R]++,K=T,Pt=(G=0)===rt?(nt=138,3):T===rt?(nt=6,3):(nt=7,4))}function M(C,z,W){var H,T,K=-1,rt=z[1],G=0,nt=7,Pt=4;for(rt===0&&(nt=138,Pt=3),H=0;H<=W;H++)if(T=rt,rt=z[2*(H+1)+1],!(++G<nt&&T===rt)){if(G<Pt)for(;Y(C,T,C.bl_tree),--G!=0;);else T!==0?(T!==K&&(Y(C,T,C.bl_tree),G--),Y(C,L,C.bl_tree),et(C,G-3,2)):G<=10?(Y(C,E,C.bl_tree),et(C,G-3,3)):(Y(C,R,C.bl_tree),et(C,G-11,7));K=T,Pt=(G=0)===rt?(nt=138,3):T===rt?(nt=6,3):(nt=7,4)}}l(j);var N=!1;function _(C,z,W,H){et(C,(d<<1)+(H?1:0),3),(function(T,K,rt,G){At(T),dt(T,rt),dt(T,~rt),a.arraySet(T.pending_buf,T.window,K,rt,T.pending),T.pending+=rt})(C,z,W)}s._tr_init=function(C){N||((function(){var z,W,H,T,K,rt=new Array(x+1);for(T=H=0;T<h-1;T++)for(B[T]=H,z=0;z<1<<I[T];z++)w[H++]=T;for(w[H-1]=T,T=K=0;T<16;T++)for(j[T]=K,z=0;z<1<<U[T];z++)F[K++]=T;for(K>>=7;T<u;T++)for(j[T]=K<<7,z=0;z<1<<U[T]-7;z++)F[256+K++]=T;for(W=0;W<=x;W++)rt[W]=0;for(z=0;z<=143;)it[2*z+1]=8,z++,rt[8]++;for(;z<=255;)it[2*z+1]=9,z++,rt[9]++;for(;z<=279;)it[2*z+1]=7,z++,rt[7]++;for(;z<=287;)it[2*z+1]=8,z++,rt[8]++;for(fe(it,g+1,rt),z=0;z<u;z++)A[2*z+1]=5,A[2*z]=jt(z,5);ot=new ut(it,I,f+1,g,x),V=new ut(A,U,0,u,x),ct=new ut(new Array(0),O,0,v,k)})(),N=!0),C.l_desc=new P(C.dyn_ltree,ot),C.d_desc=new P(C.dyn_dtree,V),C.bl_desc=new P(C.bl_tree,ct),C.bi_buf=0,C.bi_valid=0,xt(C)},s._tr_stored_block=_,s._tr_flush_block=function(C,z,W,H){var T,K,rt=0;0<C.level?(C.strm.data_type===2&&(C.strm.data_type=(function(G){var nt,Pt=4093624447;for(nt=0;nt<=31;nt++,Pt>>>=1)if(1&Pt&&G.dyn_ltree[2*nt]!==0)return o;if(G.dyn_ltree[18]!==0||G.dyn_ltree[20]!==0||G.dyn_ltree[26]!==0)return n;for(nt=32;nt<f;nt++)if(G.dyn_ltree[2*nt]!==0)return n;return o})(C)),Qe(C,C.l_desc),Qe(C,C.d_desc),rt=(function(G){var nt;for(m(G,G.dyn_ltree,G.l_desc.max_code),m(G,G.dyn_dtree,G.d_desc.max_code),Qe(G,G.bl_desc),nt=v-1;3<=nt&&G.bl_tree[2*q[nt]+1]===0;nt--);return G.opt_len+=3*(nt+1)+5+5+4,nt})(C),T=C.opt_len+3+7>>>3,(K=C.static_len+3+7>>>3)<=T&&(T=K)):T=K=W+5,W+4<=T&&z!==-1?_(C,z,W,H):C.strategy===4||K===T?(et(C,2+(H?1:0),3),pr(C,it,A)):(et(C,4+(H?1:0),3),(function(G,nt,Pt,kt){var He;for(et(G,nt-257,5),et(G,Pt-1,5),et(G,kt-4,4),He=0;He<kt;He++)et(G,G.bl_tree[2*q[He]+1],3);M(G,G.dyn_ltree,nt-1),M(G,G.dyn_dtree,Pt-1)})(C,C.l_desc.max_code+1,C.d_desc.max_code+1,rt+1),pr(C,C.dyn_ltree,C.dyn_dtree)),xt(C),H&&At(C)},s._tr_tally=function(C,z,W){return C.pending_buf[C.d_buf+2*C.last_lit]=z>>>8&255,C.pending_buf[C.d_buf+2*C.last_lit+1]=255&z,C.pending_buf[C.l_buf+C.last_lit]=255&W,C.last_lit++,z===0?C.dyn_ltree[2*W]++:(C.matches++,z--,C.dyn_ltree[2*(w[W]+f+1)]++,C.dyn_dtree[2*D(z)]++),C.last_lit===C.lit_bufsize-1},s._tr_align=function(C){et(C,2,3),Y(C,S,it),(function(z){z.bi_valid===16?(dt(z,z.bi_buf),z.bi_buf=0,z.bi_valid=0):8<=z.bi_valid&&(z.pending_buf[z.pending++]=255&z.bi_buf,z.bi_buf>>=8,z.bi_valid-=8)})(C)}},{"../utils/common":41}],53:[function(r,i,s){i.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(r,i,s){(function(a){(function(o,n){if(!o.setImmediate){var l,d,h,f,g=1,u={},v=!1,b=o.document,x=Object.getPrototypeOf&&Object.getPrototypeOf(o);x=x&&x.setTimeout?x:o,l={}.toString.call(o.process)==="[object process]"?function(L){process.nextTick(function(){k(L)})}:(function(){if(o.postMessage&&!o.importScripts){var L=!0,E=o.onmessage;return o.onmessage=function(){L=!1},o.postMessage("","*"),o.onmessage=E,L}})()?(f="setImmediate$"+Math.random()+"$",o.addEventListener?o.addEventListener("message",S,!1):o.attachEvent("onmessage",S),function(L){o.postMessage(f+L,"*")}):o.MessageChannel?((h=new MessageChannel).port1.onmessage=function(L){k(L.data)},function(L){h.port2.postMessage(L)}):b&&"onreadystatechange"in b.createElement("script")?(d=b.documentElement,function(L){var E=b.createElement("script");E.onreadystatechange=function(){k(L),E.onreadystatechange=null,d.removeChild(E),E=null},d.appendChild(E)}):function(L){setTimeout(k,0,L)},x.setImmediate=function(L){typeof L!="function"&&(L=new Function(""+L));for(var E=new Array(arguments.length-1),R=0;R<E.length;R++)E[R]=arguments[R+1];var I={callback:L,args:E};return u[g]=I,l(g),g++},x.clearImmediate=y}function y(L){delete u[L]}function k(L){if(v)setTimeout(k,0,L);else{var E=u[L];if(E){v=!0;try{(function(R){var I=R.callback,U=R.args;switch(U.length){case 0:I();break;case 1:I(U[0]);break;case 2:I(U[0],U[1]);break;case 3:I(U[0],U[1],U[2]);break;default:I.apply(n,U)}})(E)}finally{y(L),v=!1}}}}function S(L){L.source===o&&typeof L.data=="string"&&L.data.indexOf(f)===0&&k(+L.data.slice(f.length))}})(typeof self>"u"?a===void 0?this:a:self)}).call(this,typeof pa<"u"?pa:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})})(dn)),dn.exports}var tv=Jw();const ev=Zc(tv),eo="language",Js="en";function rv(t,e){return e?t.replace(/\{(\w+)\}/g,(r,i)=>e[i]!==void 0?e[i]:r):t}const Ta=new Set([Js]),kl=ci(Ta);let Cl=null;function iv(t){let e=!1;for(const r of t){const i=r.toLowerCase().replace("-","_");Ta.has(i)||(Ta.add(i),e=!0)}if(e&&(kl.set(new Set(Ta)),Cl===null)){const r=_o();r!==Ti.get()&&Ti.set(r)}}function _o(){const t=navigator.languages?.length?navigator.languages:[navigator.language||Js],e=kl.get();for(const r of t){const i=r.split("-")[0].toLowerCase();if(e.has(i))return i}return Js}const Ti=ci(_o());async function sv(){const t=await Xt.get(eo);Cl=t??null,Ti.set(t||_o())}xe(gi,t=>{Cl=t?.[eo]??null,Ti.set(t?.[eo]||_o())});sv();async function vs(t,e=!1){const r={};await Promise.all(Object.entries(t).map(async([o,n])=>{const l=await n(),d=l&&"default"in l?l.default:l,g=(o.match(/\.([a-zA-Z-_]+)\.json$/)?.[1]??Js).toLowerCase().replace("-","_");r[g]=d})),iv(Object.keys(r));const i=o=>{const l=Ti.get().toLowerCase().replace("-","_"),[d,h]=l.split("_"),f=h?[`${d}_${h}`,d]:[d];f.push(Js);for(const g of f){const u=r[g];if(u&&o in u)return u[o]}return o},s=Object.assign({},{then:void 0,catch:void 0,finally:void 0}),a={get(o,n){if(n in o)return o[n];const l=i(n),d=(h=>rv(i(n),h));return d.toString=()=>e?i(n):l,d.valueOf=()=>e?i(n):l,d[Symbol.toPrimitive]=()=>e?i(n):l,e&&(d.toJSON=()=>i(n)),d}};return new Proxy(s,a)}class av{constructor(){this.editorInputHandlers=[],this.cachedIconContributions=null,xe(Tr,()=>{}),xe(ar,e=>{e.target==="system.icons"&&(this.cachedIconContributions=null)})}getSortedIconContributions(){if(this.cachedIconContributions!==null)return this.cachedIconContributions;const e=gt.getContributions("system.icons");return this.cachedIconContributions=[...e].sort((r,i)=>{const s=r.priority??0,a=i.priority??0;return a!==s?a-s:r.label.localeCompare(i.label)}),this.cachedIconContributions}registerEditorInputHandler(e){this.editorInputHandlers.push({definition:e,initialized:!1}),this.editorInputHandlers.sort((r,i)=>{const s=r.definition.ranking??0;return(i.definition.ranking??0)-s})}async ensureHandlerInitialized(e){const r=e.definition;!r.lazyInit||e.initialized||(e.lazyInitPromise||(e.lazyInitPromise=Promise.resolve(r.lazyInit()).then(()=>{e.initialized=!0,e.lazyInitPromise=void 0}).catch(i=>{throw e.lazyInitPromise=void 0,i})),await e.lazyInitPromise)}getEditorOptionsForInput(e){const r=new Set,i=[];for(const s of this.editorInputHandlers){const a=s.definition;!a.canHandle(e)||r.has(a.editorId)||(r.add(a.editorId),i.push({editorId:a.editorId,title:a.label,icon:a.icon}))}return i}async handleInput(e,r){if(r!==void 0){const i=this.editorInputHandlers.find(s=>s.definition.editorId===r);if(i){await this.ensureHandlerInitialized(i);const s=await i.definition.handle(e);return s&&(s.editorId=i.definition.editorId),s}return}for(let i=0;i<this.editorInputHandlers.length;i++){const s=this.editorInputHandlers[i],a=s.definition;if(a.canHandle(e)){await this.ensureHandlerInitialized(s);const o=await a.handle(e);return o&&(o.editorId=a.editorId),o}}}getEditorArea(){return document.querySelector(`lyra-tabs#${Gs}`)}async loadEditor(e,r){if(!e||("component"in e||(e=await this.handleInput(e,r)),!e||!("component"in e)))return;const i=e.editorId??r;i&&(e.editorId=i),await this.openTab({name:e.key,editorId:i,label:e.title,icon:e.icon,closable:!0,component:e.component})}async openTab(e){const r=this.getEditorArea();if(!r){console.error("Editor area not found. The split pane system may not be initialized yet.");return}if(r.has(e.name)){r.activate(e.name);return}r.open(e)}getFileIcon(e){const r=e.includes(".")?e.split(".").pop()?.toLowerCase()||"":e.toLowerCase(),i=this.getSortedIconContributions();if(i.length===0)return"file";for(const s of i)if(s.mappings&&s.mappings[r])return s.mappings[r];return"file"}}const ls=new av;pe.put("editorRegistry",ls);gt.registerContribution("system.icons",{label:"Default File Icons",mappings:{pdf:"file-pdf",md:"book",txt:"file-lines",ts:"code",tsx:"code",js:"code",jsx:"code",json:"file-code",geojson:"file-code",py:"python",html:"code",htm:"code",css:"code",scss:"code",sass:"code",xml:"file-code",yaml:"file-code",yml:"file-code",sql:"database",kml:"file-code",gpx:"file-code",jpg:"image",jpeg:"image",png:"image",gif:"image",svg:"image",webp:"image",bmp:"image",ico:"image"},priority:0});const Pc=(t,e)=>!t.leaf&&e.leaf?-1:t.leaf&&!e.leaf?1:t.label.localeCompare(e.label);var ov=Object.defineProperty,nv=Object.getOwnPropertyDescriptor,Sl=(t,e,r,i)=>{for(var s=i>1?void 0:i?nv(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&ov(e,r,s),s};const Je=Br("LyraFileBrowser"),Se=await vs(Object.assign({"./filebrowser.de.json":()=>Ve(()=>import("./filebrowser.de-5GQ10ols-BDyGxBGM.js"),[]),"./filebrowser.en.json":()=>Ve(()=>import("./filebrowser.en-9Ng_7WE_-DuKn3BNV.js"),[])})),lv=250;let xr=class extends Ki{constructor(){super(...arguments),this.settingsLoaded=!1,this.fileEditorOptions=[],this.treeRef=Gr(),this.loadingNodes=new Set}doBeforeUI(){this.initializeWorkspace(),xe(ar,t=>{t.target==="system.icons"&&this.requestUpdate()}),this.subscribe(Me,t=>this.onWorkspaceChanged(t)),this.subscribe(Tr,t=>this.onWorkspaceConnected(t))}disconnectedCallback(){this.workspaceChangedDebounceId!==void 0&&(clearTimeout(this.workspaceChangedDebounceId),this.workspaceChangedDebounceId=void 0),this.pendingWorkspaceDir=void 0,super.disconnectedCallback()}firstUpdated(t){super.firstUpdated(t),this.setupDragAndDrop()}updated(t){super.updated(t),t.has("workspaceDir")&&this.workspaceDir&&this.setupDragAndDrop()}async initializeWorkspace(){const t=await ft.getWorkspace();await this.loadWorkspace(t??void 0)}renderToolbar(){return $`
            <lyra-command icon="folder-open" title="${Se.CONNECT_WORKSPACE}" dropdown="filebrowser.connections"></lyra-command>
            <lyra-command cmd="refresh_resource" icon="repeat" title="${Se.REFRESH_RESOURCE}"></lyra-command>
            <lyra-command cmd="touch" icon="plus" title="${Se.CREATE_NEW}" dropdown="filebrowser.create"></lyra-command>
        `}renderContextMenu(){const t=Jt.get(),e=t instanceof Bt?t:null,r=e&&this.fileEditorOptions.length>0;return $`
            <lyra-command cmd="open_editor" icon="folder-open">${Se.OPEN}</lyra-command>
            ${r?$`
                <wa-dropdown-item>
                    ${ye("folder-open",{slot:"icon"})}
                    ${Se.OPEN_WITH}
                    ${this.fileEditorOptions.map(i=>$`
                        <lyra-command
                            slot="submenu"
                            cmd="open_editor"
                            icon="${i.icon??"file"}"
                            .params=${{path:e.getWorkspacePath(),editorId:i.editorId}}>
                            ${i.title}
                        </lyra-command>
                    `)}
                </wa-dropdown-item>
            `:ht}
            <lyra-command cmd="touch" icon="plus" dropdown="filebrowser.create">${Se.CREATE_NEW}</lyra-command>
        `}onWorkspaceChanged(t){this.pendingWorkspaceDir=t,this.workspaceChangedDebounceId!==void 0&&clearTimeout(this.workspaceChangedDebounceId),this.workspaceChangedDebounceId=setTimeout(()=>{this.workspaceChangedDebounceId=void 0;const e=this.pendingWorkspaceDir;this.pendingWorkspaceDir=void 0,e?this.applyWorkspaceChange(e):this.loadWorkspace(void 0,!0)},lv)}async applyWorkspaceChange(t){Jt.set(void 0),await this.loadWorkspace(t,!0),await this.syncTreeSelection()}async onWorkspaceConnected(t){await this.loadWorkspace(t,!0)}async loadWorkspace(t,e=!1){this.workspaceDir=t,t?(this.root=await this.resourceToTreeNode(t,!0,e),await this.restoreSelectionFromSettings()):(this.root=void 0,this.settingsLoaded&&await this.persistSelectedPath(null))}async persistSelectedPath(t){await this.setDialogSetting({v:xr.SETTINGS_VERSION,[xr.SETTINGS_KEY_SELECTED_PATH]:t})}async restoreSelectionFromSettings(){if(this.settingsLoaded)return;this.settingsLoaded=!0;const e=(await this.getDialogSetting())?.[xr.SETTINGS_KEY_SELECTED_PATH];if(typeof e!="string"||e.length===0)return;await this.updateComplete;const r=this.treeRef.value?.querySelector("wa-tree");if(r){if(typeof e=="string"&&e.length>0){const s=Array.from(r.querySelectorAll("wa-tree-item")).find(a=>{const n=a?.model?.data?.getWorkspacePath?.();return typeof n=="string"&&n===e});if(s){await this.selectTreeItem(s);return}}await this.selectFirstConnectedFolder(r)}}async selectTreeItem(t){let e=t.parentElement?.closest?.("wa-tree-item");for(;e;)e.expanded=!0,e=e.parentElement?.closest?.("wa-tree-item");t.selected=!0,await this.syncTreeSelection()}async selectFirstConnectedFolder(t){const e=Array.from(t.children).filter(s=>s instanceof HTMLElement&&s.tagName.toLowerCase()==="wa-tree-item");if(e.length===0)return;const i=e.find(s=>s?.model?.data instanceof Nt)??e[0];await this.selectTreeItem(i)}async syncTreeSelection(){await this.updateComplete;const e=this.treeRef.value?.querySelector("wa-tree")?.selectedItems||[];e.length>0&&Jt.set(e[0].model?.data)}async resourceToTreeNode(t,e=!1,r=!1){const i=t instanceof Bt,s={data:t,label:t.getName(),leaf:i,children:[]};if(t instanceof Nt&&!t.getParent())try{const a=await ft.getFolderInfoForDirectory(t);a?.backendName&&(s.workspaceTag=a.backendName)}catch(a){Je.debug("Failed to get workspace info for directory",a)}if(t instanceof Nt&&e){const a=await t.listChildren(r);for(const o of a){const n=await this.resourceToTreeNode(o,!0,r);s.children.push(n)}s.children.sort(Pc),s.loaded=!0}return s}createTreeItems(t,e=!1){if(!t)return $``;const r=!t.leaf&&!t.loaded,i=t.data,s=i instanceof Bt,a=!!i.getParent(),o=s?ls.getFileIcon(i.getName()):t.icon||"folder-open",n=t.workspaceTag;return $`
            <wa-tree-item 
                draggable=${a}
                @dragstart=${a?this.nobubble(l=>this.onDragStart(l,i)):void 0}
                @dblclick=${this.nobubble(this.onFileDoubleClicked)}
                @wa-lazy-load=${this.nobubble(l=>this.onLazyLoad(l,t))}
                .model=${t} 
                ?expanded=${e}
                ?lazy=${r}>
                <span class="tree-label">
                    ${ye(o,{label:t.leaf?Se.FILE:Se.FOLDER})}
                    <span class="tree-label-text">${t.label}</span>
                    ${!t.leaf&&n?$`<wa-badge appearance="outlined" variant="neutral" style="font-size: var(--wa-font-size-xs);">${n}</wa-badge>`:null}
                </span>
                ${t.children.map(l=>this.createTreeItems(l,!1))}
            </wa-tree-item>`}onDragStart(t,e){if(!t.dataTransfer||!e.getParent())return;const i=t.currentTarget?.closest("wa-tree"),s=Array.isArray(i?.selectedItems)?i.selectedItems:[],a=[];if(s.length>0)for(const d of s){const f=d.model?.data;f&&f.getParent()&&a.push(f)}a.length===0&&a.push(e);const o=a.map(d=>d.getWorkspacePath()),n=a.length===1?a[0].getName():`${a.length} items`;t.dataTransfer.effectAllowed="copyMove";const l=o.join(`
`);if(t.dataTransfer.setData("text/plain",l),t.dataTransfer.setData("application/x-workspace-file",l),t.dataTransfer.setData("text/uri-list",l),t.dataTransfer.setDragImage){const d=document.createElement("div");d.textContent=n,d.style.position="absolute",d.style.top="-1000px",d.style.padding="4px 8px",d.style.background="var(--wa-color-neutral-10)",d.style.border="1px solid var(--wa-color-neutral-30)",d.style.borderRadius="4px",document.body.appendChild(d),t.dataTransfer.setDragImage(d,0,0),setTimeout(()=>document.body.removeChild(d),0)}}async onLazyLoad(t,e){const r=e.data;r instanceof Nt&&e.children.length===0&&await this.loadNodeChildren(e,r)}async loadNodeChildren(t,e){if(!this.loadingNodes.has(t)){this.loadingNodes.add(t);try{const r=await e.listChildren(!1);for(const i of r){_d&&i.getName().startsWith(".");const s=await this.resourceToTreeNode(i,!1);t.children.push(s)}t.children.sort(Pc),t.loaded=!0,this.requestUpdate()}catch(r){Je.error("Failed to load directory children:",r)}finally{this.loadingNodes.delete(t)}}}async onFileDoubleClicked(t){const e=t.currentTarget,r=e.model;if(!r)return;const i=r.data;if(i instanceof Bt){Jt.set(i),this.executeCommand("open_editor",{});return}!r.leaf&&"expanded"in e&&(e.expanded=!e.expanded)}onSelectionChanged(t){const e=t.detail.selection;if(e&&e.length>0){const i=e[0].model.data;Jt.set(i);const s=i?.getWorkspacePath?.();typeof s=="string"?this.persistSelectedPath(s):this.persistSelectedPath(null),i instanceof Bt?this.fileEditorOptions=ls.getEditorOptionsForInput(i):this.fileEditorOptions=[]}else Jt.set(void 0),this.persistSelectedPath(null),this.fileEditorOptions=[]}getDirectoryDropTargetFromEvent(t){if(!this.workspaceDir)return;const r=t.target.closest("wa-tree-item");if(!r){const a=this.root?.children??[];if(a.length!==1)return;const o=a[0]?.data;return o instanceof Nt?o:void 0}const s=r.model?.data;if(s instanceof Nt)return s}setupDragAndDrop(){const t=this.treeRef.value;if(!t)return;const e=a=>{const o=a.dataTransfer?.types;if(!o)return;const n=o.includes("Files"),l=o.includes("application/x-workspace-file");if(!n&&!l)return;if(!this.getDirectoryDropTargetFromEvent(a)){this.currentDropTarget?.classList.remove("drop-target"),this.currentDropTarget=void 0,t.classList.remove("drag-over");return}a.preventDefault(),a.dataTransfer&&(l?a.dataTransfer.dropEffect=a.ctrlKey||a.metaKey?"copy":"move":a.dataTransfer.dropEffect="copy"),t.classList.add("drag-over");const f=a.target.closest("wa-tree-item");if(!f){this.currentDropTarget?.classList.remove("drop-target"),this.currentDropTarget=void 0;return}f!==this.currentDropTarget&&(this.currentDropTarget?.classList.remove("drop-target"),this.currentDropTarget=f,f.classList.add("drop-target"))},r=a=>{const o=a.dataTransfer?.types;if(!o)return;const n=o.includes("Files"),l=o.includes("application/x-workspace-file");!n&&!l||!this.getDirectoryDropTargetFromEvent(a)||(a.preventDefault(),t.classList.add("drag-over"))},i=a=>{const o=t.getBoundingClientRect(),n=a.clientX,l=a.clientY;(n<=o.left||n>=o.right||l<=o.top||l>=o.bottom)&&(t.classList.remove("drag-over"),this.currentDropTarget?.classList.remove("drop-target"),this.currentDropTarget=void 0)},s=async a=>{if(a.preventDefault(),t.classList.remove("drag-over"),this.currentDropTarget?.classList.remove("drop-target"),this.currentDropTarget=void 0,!a.dataTransfer||!this.workspaceDir)return;const o=this.getDirectoryDropTargetFromEvent(a);if(!o)return;const n=a.dataTransfer.types;if(n.includes("Files")){const l=Array.from(a.dataTransfer.files);if(l.length===0)return;await this.handleFilesDrop(l,o);return}if(n.includes("application/x-workspace-file")){await this.handleWorkspaceDrop(a,o);return}};t.removeEventListener("dragover",e),t.removeEventListener("dragenter",r),t.removeEventListener("dragleave",i),t.removeEventListener("drop",s),t.addEventListener("dragover",e),t.addEventListener("dragenter",r),t.addEventListener("dragleave",i),t.addEventListener("drop",s)}async handleWorkspaceDrop(t,e){if(!t.dataTransfer)return;const r=t.dataTransfer.getData("application/x-workspace-file");if(!r)return;const i=r.split(/\r?\n/).map(g=>g.trim()).filter(g=>!!g);if(i.length===0)return;const s=await ft.getWorkspace();if(!s){Je.warn("Workspace drop ignored because no workspace is connected");return}const a=async g=>{const u=g.getWorkspace(),v=e.getWorkspace();return!u||!v?!1:u===v&&!(t.ctrlKey||t.metaKey)},o=new Set,n=e.getWorkspace();let l=0,d=0;const h=[];for(const g of i)try{const u=await s.getResource(g);if(!u){Je.warn(`Workspace drop: source not found for path "${g}"`),d++;continue}h.push({path:g,resource:u});const v=u.getWorkspace();v&&o.add(v)}catch(u){Je.error(`Failed to handle workspace drop for "${g}":`,u),d++}if(h.length===0){d>0&&Je.info(`Workspace drop failed for ${d} item(s)`);return}let f=!1;if(n){for(const g of o)if(g!==n){f=!0;break}}if(f&&n)try{const g=Array.from(o),u=await ft.getFolderInfoForDirectory(g[0]),v=await ft.getFolderInfoForDirectory(n),b=u?.backendName??Se.UNKNOWN_BACKEND,x=v?.backendName??Se.UNKNOWN_BACKEND;if(!await ts(Se.DND_CROSS_CONNECTION_CONFIRM({count:String(h.length),srcBackend:b,destBackend:x})))return}catch(g){Je.debug("Failed to resolve cross-connection info for DnD",g)}for(const{path:g,resource:u}of h)try{const v=await a(u);await ft.copyResource(u,e,{move:v}),l++}catch(v){Je.error(`Failed to handle workspace drop for "${g}":`,v),d++}Je.info(`Workspace drop completed: ${l}/${h.length} items ${d>0?`, ${d} failed`:""}`),await this.loadWorkspace(this.workspaceDir,!0)}async handleFilesDrop(t,e){const r=t.length;let i=0,s=0,a=0;for(const o of t)try{const n=this.buildTargetPath(e,o.name);if(await this.workspaceDir.getResource(n)&&!await ts(Se.FILE_EXISTS_OVERWRITE({fileName:o.name}))){a++;continue}await(await this.workspaceDir.getResource(n,{create:!0})).saveContents(o),i++}catch(n){Je.error(`Failed to upload ${o.name}:`,n),s++}Je.info(`Uploaded ${i}/${r} files${a>0?`, ${a} skipped`:""}${s>0?`, ${s} failed`:""}`),await this.loadWorkspace(this.workspaceDir)}buildTargetPath(t,e){const r=t.getWorkspacePath();return r?`${r}/${e}`:e}renderContent(){return $`
            <div class="tree" ${Zr(this.treeRef)} style="--drop-files-text: '${Se.DROP_FILES_HERE}'">
                ${se(!this.workspaceDir,()=>$`
                    <lyra-no-content message="${Se.SELECT_WORKSPACE}"></lyra-no-content>`,()=>se(this.root,()=>$`
                <wa-tree @wa-selection-change=${this.nobubble(this.onSelectionChanged)}
                         style="--indent-guide-width: 1px;">
                    ${this.root.children.map(t=>this.createTreeItems(t,!0))}
                </wa-tree>`,()=>$``))}
            </div>
        `}};xr.SETTINGS_VERSION=1;xr.SETTINGS_KEY_SELECTED_PATH="selectedPath";xr.styles=J`
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
    `;Sl([Z()],xr.prototype,"root",2);Sl([Z()],xr.prototype,"fileEditorOptions",2);xr=Sl([X("lyra-filebrowser")],xr);var cv=Object.getOwnPropertyDescriptor,dv=(t,e,r,i)=>{for(var s=i>1?void 0:i?cv(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=o(s)||s);return s};const Dn=await vs(Object.assign({"./tasks.de.json":()=>Ve(()=>import("./tasks.de-Uc1ZhJAb-Bm0wNkDH.js"),[]),"./tasks.en.json":()=>Ve(()=>import("./tasks.en-ErE1So2Z-eCglTKJa.js"),[])}));gt.registerContribution(po,{component:"<lyra-tasks></lyra-tasks>"});let Ts=null;function hh(){return Ts||(Ts=document.createElement("div"),Ts.id="progress-dialog-container",document.body.appendChild(Ts)),Ts}function Nc(){return hh().querySelector("wa-dialog")}function hv(){uh(!0)}function uh(t=!1){const e=hh(),r=Xr.getActiveTasks();if(r.length===0){Ge($``,e);return}const s=Nc();if(!(t||s?.open===!0))return;const o=()=>{const d=Nc();d&&(d.open=!1)},n=()=>{Ge($``,e)},l=$`
        <wa-dialog 
            label="${Dn.ACTIVE_TASKS}" 
            open
            light-dismiss
            style="--width: 600px;"
            @wa-request-close=${o}
            @wa-after-hide=${n}
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
                ${r.map(d=>{const h=d.progress>=0||d.totalSteps>0,f=d.progress>=0?d.progress:d.totalSteps>0?Math.round(d.currentStep/d.totalSteps*100):0,g=d.progress<0&&d.totalSteps>0;return $`
                        <div class="tasitem">
                            <div class="tasheader">
                                <wa-icon name="hourglass" style="color: var(--wa-color-warning-fill-loud);"></wa-icon>
                                <div style="flex: 1;">
                                    <div class="tasname">${d.name}</div>
                                    ${d.message?$`
                                        <div class="tasmessage">${d.message}</div>
                                    `:""}
                                </div>
                            </div>
                            <div class="tasprogress">
                                ${h?$`
                                    <wa-progress-bar value="${f}">
                                        ${g?`${d.currentStep}/${d.totalSteps} - `:""}${f}%
                                    </wa-progress-bar>
                                `:$`
                                    <wa-progress-bar indeterminate></wa-progress-bar>
                                `}
                            </div>
                        </div>
                    `})}
            </div>
        </wa-dialog>
    `;Ge(l,e)}let In=class extends Mr{doBeforeUI(){this.watch(gn,()=>{uh(),this.requestUpdate()})}handleIndicatorClick(){hv()}render(){gn.get();const e=Xr.getActiveTasks().length;return e===0?$``:$`
            <div class="tasindicator" @click=${this.handleIndicatorClick} title="${Dn.ACTIVE_TASKS_TITLE({taskCount:e.toString()})}">
                <wa-spinner
                    style="font-size: 1rem; --indicator-color: var(--wa-color-warning-fill-loud);"
                    label="${Dn.ACTIVE_TASKS}"
                ></wa-spinner>
                <wa-badge appearance="outlined" variant="neutral" pill>${e}</wa-badge>
                <div class="tasbar-wrap"><wa-progress-bar indeterminate></wa-progress-bar></div>
            </div>
        `}};In.styles=J`
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
    `;In=dv([X("lyra-tasks")],In);var uv=Object.getOwnPropertyDescriptor,pv=(t,e,r,i)=>{for(var s=i>1?void 0:i?uv(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=o(s)||s);return s};const hn=await vs(Object.assign({"./partname.de.json":()=>Ve(()=>import("./partname.de-FFi67qCi-iLAwhB2n.js"),[]),"./partname.en.json":()=>Ve(()=>import("./partname.en-DvPivLXR-DGb3aT7k.js"),[])}));gt.registerContribution(po,{component:"<lyra-part-name></lyra-part-name>"});let Fc=class extends Mr{doBeforeUI(){this.watch(Ke,()=>{this.requestUpdate()})}getPartName(){const t=Ke.get();return t&&(t.tabContribution?.label||t.getAttribute("id"))||hn.NO_PART}render(){const e=Ke.get()?.tabContribution?.icon||"box";return $`
            <wa-button 
                appearance="plain"
                size="small"
                title="${hn.ACTIVE_PART}">
                ${ye(e,{label:"Part",slot:"start"})}
                ${this.getPartName()}
            </wa-button>
        `}};Fc=pv([X("lyra-part-name")],Fc);var fv=Object.defineProperty,mv=Object.getOwnPropertyDescriptor,ca=(t,e,r,i)=>{for(var s=i>1?void 0:i?mv(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&fv(e,r,s),s};const gv=Br("LyraExtensions"),re=await vs(Object.assign({"./extensions.de.json":()=>Ve(()=>import("./extensions.de-CZkqW0F1-C2K7_1Fj.js"),[]),"./extensions.en.json":()=>Ve(()=>import("./extensions.en-Dg9Oqudm-BWVq_zKr.js"),[])}));let Ri=class extends Ki{constructor(){super(...arguments),this.filterText="",this.showRegisterDialog=!1,this.registerExtensionData={}}doInitUI(){xe(Os,()=>{this.requestUpdate()})}onExtensionDblClick(){}enable(t){qt.enable(t.id,!0),this.requestUpdate()}disable(t){qt.disable(t.id,!0),this.requestUpdate()}isExtensionRequired(t){const e=qr.getCurrentApp();return!e||!e.extensions?!1:e.extensions.includes(t)}selectionChanged(t){const e=t.detail.selection||[];e.length>0&&e[0].model?this.selectedExtension=e[0].model:this.selectedExtension=void 0}getFilteredExtensions(){if(!this.filterText.trim())return qt.getExtensions();const t=this.filterText.toLowerCase();return qt.getExtensions().filter(e=>String(e.name).toLowerCase().includes(t)||(e.description?String(e.description).toLowerCase().includes(t):!1)||e.id.toLowerCase().includes(t))}getGroupedExtensions(){const t=this.getFilteredExtensions(),e=[],r=[];return t.forEach(i=>{qt.isEnabled(i.id)?e.push(i):r.push(i)}),e.sort((i,s)=>String(i.name).localeCompare(String(s.name))),r.sort((i,s)=>String(i.name).localeCompare(String(s.name))),{enabled:e,available:r}}isExternalExtension(t){return t.external===!0}handleFilterInput(t){this.filterText=t.target.value,this.requestUpdate()}clearFilter(){this.filterText="",this.requestUpdate()}async handleRegisterExtension(){try{const t=await mo("Enter extension URL or source identifier:","",!1);if(!t)return;await Xr.runAsync("Registering extension",async()=>{let e=t;wr.isGitHubUrl(t)&&(e=wr.convertGitHubUrlToSource(t));const r=wr.parseSource(e);r?.type==="github"?await this.fetchGitHubMetadata(r,e):(this.registerExtensionData={url:e,id:"",name:"",description:""},this.showRegisterDialog=!0,this.requestUpdate())})}catch(t){at(`Failed to register extension: ${t}`)}}async fetchGitHubMetadata(t,e){try{const r=await wr.fetchGitHubPackageJson(t),i=t.owner,s=t.repo,a=r.name||`ext.${i}-${s}`,o=r.name||`${i}/${s}`,n=r.description||"",l=r.version||"",d=r.author||(typeof r.author=="string"?r.author:r.author?.name)||"";this.registerExtensionData={id:a,name:o,description:n,url:e,version:l,author:d,icon:"puzzle-piece",external:!0},this.showRegisterDialog=!0,this.requestUpdate()}catch(r){gv.warn(`Could not fetch package.json, using defaults: ${r}`),this.registerExtensionData={url:e,id:"",name:"",description:""},this.showRegisterDialog=!0,this.requestUpdate()}}async confirmRegisterExtension(){if(!this.registerExtensionData.url){at("URL is required");return}if(!this.registerExtensionData.id){at("Extension ID is required");return}if(!this.registerExtensionData.name){at("Extension name is required");return}try{await Xr.runAsync("Registering extension",async()=>{const t={id:this.registerExtensionData.id,name:this.registerExtensionData.name,description:this.registerExtensionData.description,url:this.registerExtensionData.url,version:this.registerExtensionData.version,author:this.registerExtensionData.author,icon:this.registerExtensionData.icon||"puzzle-piece",external:!0};qt.registerExtension(t),await qt.loadExtensionFromUrl(this.registerExtensionData.url,t.id),oe(`Extension ${t.name} registered successfully`),this.showRegisterDialog=!1,this.registerExtensionData={},this.requestUpdate()})}catch(t){at(`Failed to register extension: ${t}`)}}cancelRegisterExtension(){this.showRegisterDialog=!1,this.registerExtensionData={},this.requestUpdate()}renderToolbar(){return $`
            <wa-input
                placeholder="${re.FILTER_PLACEHOLDER}"
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
        `}renderContent(){const t=this.getGroupedExtensions(),e=t.enabled.length>0||t.available.length>0;return $`
            ${se(this.showRegisterDialog,()=>$`
                <wa-dialog 
                    label="Register Extension"
                    open
                    @wa-request-close=${()=>this.cancelRegisterExtension()}
                    style="--wa-dialog-width: 500px;">
                    <div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;">
                        <wa-input
                            label="Extension ID *"
                            .value=${this.registerExtensionData.id||""}
                            @input=${r=>{this.registerExtensionData.id=r.target.value,this.requestUpdate()}}
                            required
                            hint="Unique identifier for the extension (e.g., 'ext.my-extension')">
                        </wa-input>
                        
                        <wa-input
                            label="Name *"
                            .value=${this.registerExtensionData.name||""}
                            @input=${r=>{this.registerExtensionData.name=r.target.value,this.requestUpdate()}}
                            required
                            hint="Display name of the extension">
                        </wa-input>
                        
                        <wa-input
                            label="Description"
                            .value=${this.registerExtensionData.description||""}
                            @input=${r=>{this.registerExtensionData.description=r.target.value,this.requestUpdate()}}
                            hint="Description of what the extension does">
                        </wa-input>
                        
                        <wa-input
                            label="URL *"
                            .value=${this.registerExtensionData.url||""}
                            @input=${r=>{this.registerExtensionData.url=r.target.value,this.requestUpdate()}}
                            required
                            readonly
                            hint="Extension source URL or identifier">
                        </wa-input>
                        
                        <div style="display: flex; gap: 0.5rem;">
                            <wa-input
                                label="Version"
                                .value=${this.registerExtensionData.version||""}
                                @input=${r=>{this.registerExtensionData.version=r.target.value,this.requestUpdate()}}
                                style="flex: 1;"
                                hint="Extension version">
                            </wa-input>
                            
                            <wa-input
                                label="Author"
                                .value=${this.registerExtensionData.author||""}
                                @input=${r=>{this.registerExtensionData.author=r.target.value,this.requestUpdate()}}
                                style="flex: 1;"
                                hint="Extension author">
                            </wa-input>
                        </div>
                        
                        <wa-input
                            label="Icon"
                            .value=${this.registerExtensionData.icon||"puzzle-piece"}
                            @input=${r=>{this.registerExtensionData.icon=r.target.value,this.requestUpdate()}}
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
                            ${e?$`
                                ${t.enabled.length>0?$`
                                    <wa-tree-item expanded>
                                        <span>
                                            <wa-icon name="check-circle" style="color: var(--wa-color-success-50);"></wa-icon>
                                            ${re.INSTALLED} (${t.enabled.length})
                                        </span>
                                        ${t.enabled.map(r=>{const i=this.isExternalExtension(r);return $`
                                                <wa-tree-item @dblclick=${this.nobubble(this.onExtensionDblClick)} .model=${r}>
                                                    <span>${ye(r.icon)}</span> ${r.name}${i?$` <span style="opacity: 0.6; font-size: 0.9em; margin-left: 0.5rem;">(External)</span>`:""}
                                                </wa-tree-item>
                                            `})}
                                    </wa-tree-item>
                                `:""}
                                ${t.available.length>0?$`
                                    <wa-tree-item expanded>
                                        <span>
                                            <wa-icon name="circle" style="color: var(--wa-color-neutral-50);"></wa-icon>
                                            ${re.AVAILABLE} (${t.available.length})
                                        </span>
                                        ${t.available.map(r=>{const i=this.isExternalExtension(r);return $`
                                                <wa-tree-item @dblclick=${this.nobubble(this.onExtensionDblClick)} .model=${r}>
                                                    <span>${ye(r.icon)}</span> ${r.name}${i?$` <span style="opacity: 0.6; font-size: 0.9em; margin-left: 0.5rem;">(External)</span>`:""}
                                                </wa-tree-item>
                                            `})}
                                    </wa-tree-item>
                                `:""}
                            `:""}
                            ${e?"":$`
                                <div style="padding: 1em; text-align: center; opacity: 0.7;">
                                    ${re.NO_MATCHES({filterText:this.filterText})}
                                </div>
                            `}
                        </wa-tree>
                    </wa-scroller>
                </div>
                <wa-scroller slot="end" class="extensions-detail-scroller" orientation="vertical">
                <div class="extensions-detail-content">
                    ${se(this.selectedExtension,r=>{const i=this.isExternalExtension(r),s=qt.isEnabled(r.id);return $`
                                <h1>${ye(r.icon)} ${r.name}${i?" (External)":""}</h1>
                                ${se(i,()=>$`
                                    <div class="marketplace-badge">
                                        <wa-icon name="store"></wa-icon>
                                        <span>${re.EXTERNAL_EXTENSION}</span>
                                    </div>
                                `)}
                                <hr>
                                <div>
                                    ${se(s,()=>$`
                                        <wa-button 
                                            title="${this.isExtensionRequired(r.id)?re.REQUIRED_HINT:re.DISABLE_TITLE}" 
                                            @click="${()=>this.disable(r)}"
                                            variant="danger" 
                                            appearance="plain"
                                            ?disabled=${this.isExtensionRequired(r.id)}>
                                            <wa-icon name="xmark" label="Uninstall"></wa-icon>&nbsp;${re.UNINSTALL}
                                        </wa-button>
                                        ${se(this.isExtensionRequired(r.id),()=>$`
                                            <div class="required-hint">
                                                <wa-icon name="info-circle" style="color: var(--wa-color-primary-50);"></wa-icon>
                                                <span>${re.REQUIRED_HINT}</span>
                                            </div>
                                        `)}
                                    `,()=>$`
                                        <wa-button 
                                            title="${re.ENABLE_TITLE}" 
                                            @click="${()=>this.enable(r)}"
                                            variant="brand" 
                                            appearance="plain">
                                            <wa-icon name="download" label="Install"></wa-icon>&nbsp;${re.INSTALL}
                                        </wa-button>
                                    `)}
                                </div>

                                ${se(r.experimental,()=>$`
                                    <div style="margin-top: 1em;">
                                        <wa-button size="small" variant="warning" appearance="plain">
                                            <wa-icon name="triangle-exclamation" label="Warning"></wa-icon>
                                        </wa-button>
                                        <small><i>${re.EXPERIMENTAL}</i></small>
                                    </div>
                                `)}

                                ${se(r.version||r.author,()=>$`
                                    <div style="margin-top: 1em; display: flex; flex-direction: column; gap: 0.5rem;">
                                        ${se(r.version,()=>$`
                                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                                <wa-icon name="tag" style="font-size: 0.9em; opacity: 0.7;"></wa-icon>
                                                <span style="font-size: 0.9em; opacity: 0.8;">${re.VERSION} <strong>${r.version}</strong></span>
                                            </div>
                                        `)}
                                        ${se(r.author,()=>$`
                                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                                <wa-icon name="user" style="font-size: 0.9em; opacity: 0.7;"></wa-icon>
                                                <span style="font-size: 0.9em; opacity: 0.8;">${re.AUTHOR} <strong>${r.author}</strong></span>
                                            </div>
                                        `)}
                                    </div>
                                `)}

                                <p style="margin-top: 1em;">${r.description}</p>

                                ${se(r.dependencies&&r.dependencies.length>0,()=>$`
                                    <div style="margin-top: 1.5em;">
                                        <h3 style="margin-bottom: 0.5em;">
                                            <wa-icon name="puzzle-piece" style="font-size: 0.9em;"></wa-icon>
                                            ${re.DEPENDENCIES}
                                        </h3>
                                        <div class="dependencies-list">
                                            ${r.dependencies.map(a=>{const o=qt.getExtensions().find(l=>l.id===a),n=qt.isEnabled(a);return $`
                                                    <div class="dependency-item">
                                                        <wa-icon 
                                                            name="${n?"check-circle":"circle"}" 
                                                            style="color: ${n?"var(--wa-color-success-50)":"var(--wa-color-neutral-50)"};">
                                                        </wa-icon>
                                                        ${ye(o?.icon??"puzzle-piece")}
                                                        <span>${o?.name||a}</span>
                                                        ${n?"":$`
                                                            <span class="dependency-badge">${re.NOT_INSTALLED}</span>
                                                        `}
                                                    </div>
                                                `})}
                                        </div>
                                        <small style="opacity: 0.7; display: block; margin-top: 0.5em;">
                                            <wa-icon name="info-circle" style="font-size: 0.9em;"></wa-icon>
                                            ${re.DEPENDENCIES_HINT}
                                        </small>
                                    </div>
                                `)}
                            `})}
                </div>
                </wa-scroller>
            </wa-split-panel>
        `}};Ri.styles=J`
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
    `;ca([Z()],Ri.prototype,"selectedExtension",2);ca([Z()],Ri.prototype,"filterText",2);ca([Z()],Ri.prototype,"showRegisterDialog",2);ca([Z()],Ri.prototype,"registerExtensionData",2);Ri=ca([X("lyra-extensions")],Ri);var bv=Object.defineProperty,wv=Object.getOwnPropertyDescriptor,Eo=(t,e,r,i)=>{for(var s=i>1?void 0:i?wv(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&bv(e,r,s),s};const ie=await vs(Object.assign({"./logterminal.de.json":()=>Ve(()=>import("./logterminal.de-MX1cr5ek-EcKGbnDh.js"),[]),"./logterminal.en.json":()=>Ve(()=>import("./logterminal.en-BHVSaQqb-DpFjNbQM.js"),[])}));let cs=class extends Ki{constructor(){super(...arguments),this.messages=[],this.autoScroll=!0,this.filter="all",this.containerRef=Gr()}connectedCallback(){super.connectedCallback(),this.loadSettings(),Fu(this.log.bind(this))}disconnectedCallback(){super.disconnectedCallback(),Bu()}log(t,e,r="info"){const i={timestamp:new Date,level:r,source:t,message:e};this.messages=[...this.messages,i],this.autoScroll&&this.updateComplete.then(()=>{const s=this.containerRef.value;s&&(s.scrollTop=s.scrollHeight)})}clear(){this.messages=[]}getFilteredMessages(){return this.filter==="all"?this.messages:this.messages.filter(t=>t.level===this.filter)}formatTimestamp(t){return t.toLocaleTimeString("en-US",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"})}getLevelIcon(t){switch(t){case"info":return"circle-info";case"warning":return"triangle-exclamation";case"error":return"circle-xmark";case"debug":return"bug"}}getLevelColor(t){switch(t){case"info":return"var(--wa-color-primary-text, #0066cc)";case"warning":return"var(--wa-color-warning-text, #ff9800)";case"error":return"var(--wa-color-danger-text, #dc3545)";case"debug":return"var(--wa-color-neutral-text-subtle, #6c757d)"}}renderToolbar(){const t=this.messages.filter(s=>s.level==="info").length,e=this.messages.filter(s=>s.level==="warning").length,r=this.messages.filter(s=>s.level==="error").length,i=this.messages.filter(s=>s.level==="debug").length;return $`
            <lyra-command 
                icon="list"
                title="${ie.ALL_LOGS}"
                appearance="${this.filter==="all"?"filled":"plain"}"
                variant="${this.filter==="all"?"brand":"neutral"}"
                .action=${()=>{this.filter="all",this.saveSettings()}}>
                ${ie.ALL} (${this.messages.length})
            </lyra-command>

            <lyra-command 
                icon="circle-info"
                title="${ie.INFO_LOGS}"
                appearance="${this.filter==="info"?"filled":"plain"}"
                variant="${this.filter==="info"?"brand":"neutral"}"
                .action=${()=>{this.filter="info",this.saveSettings()}}>
                ${ie.INFO}${t>0?` (${t})`:""}
            </lyra-command>

            <lyra-command 
                icon="triangle-exclamation"
                title="${ie.WARNING_LOGS}"
                appearance="${this.filter==="warning"?"filled":"plain"}"
                variant="${this.filter==="warning"?"brand":"neutral"}"
                .action=${()=>{this.filter="warning",this.saveSettings()}}>
                ${ie.WARNINGS}${e>0?` (${e})`:""}
            </lyra-command>

            <lyra-command 
                icon="circle-xmark"
                title="${ie.ERROR_LOGS}"
                appearance="${this.filter==="error"?"filled":"plain"}"
                variant="${this.filter==="error"?"brand":"neutral"}"
                .action=${()=>{this.filter="error",this.saveSettings()}}>
                ${ie.ERRORS}${r>0?` (${r})`:""}
            </lyra-command>

            <lyra-command 
                icon="bug"
                title="${ie.DEBUG_LOGS}"
                appearance="${this.filter==="debug"?"filled":"plain"}"
                variant="${this.filter==="debug"?"brand":"neutral"}"
                .action=${()=>{this.filter="debug",this.saveSettings()}}>
                ${ie.DEBUG}${i>0?` (${i})`:""}
            </lyra-command>

            <wa-divider orientation="vertical"></wa-divider>

            <lyra-command 
                icon="arrow-down" 
                title="${this.autoScroll?ie.AUTO_SCROLL_ENABLED:ie.AUTO_SCROLL_DISABLED}"
                appearance="${this.autoScroll?"filled":"plain"}"
                variant="${this.autoScroll?"brand":"neutral"}"
                .action=${()=>{this.autoScroll=!this.autoScroll,this.saveSettings()}}>
                ${this.autoScroll?ie.AUTO_SCROLL:ie.MANUAL}
            </lyra-command>

            <lyra-command 
                icon="trash" 
                title="${ie.CLEAR_LOGS}"
                .action=${()=>this.clear()}>
                ${ie.CLEAR}
            </lyra-command>
        `}renderContent(){const t=this.getFilteredMessages();return $`
            <div class="log-terminal">
                <div class="messages" ${Zr(this.containerRef)}>
                    ${t.length===0?$`<div class="empty-state">${ie.NO_LOG_MESSAGES}</div>`:t.map(e=>$`
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
        `}async loadSettings(){const t=await this.getDialogSetting();t&&(typeof t.filter=="string"&&(t.filter==="all"||["info","warning","error","debug"].includes(t.filter))&&(this.filter=t.filter),typeof t.autoScroll=="boolean"&&(this.autoScroll=t.autoScroll))}async saveSettings(){await this.setDialogSetting({filter:this.filter,autoScroll:this.autoScroll})}};cs.styles=J`
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
    `;Eo([Z()],cs.prototype,"messages",2);Eo([Z()],cs.prototype,"autoScroll",2);Eo([Z()],cs.prototype,"filter",2);cs=Eo([X("lyra-log-terminal")],cs);var vv=Object.defineProperty,yv=Object.getOwnPropertyDescriptor,Ye=(t,e,r,i)=>{for(var s=i>1?void 0:i?yv(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&vv(e,r,s),s};const xv=await vs(Object.assign({"./fastviews.de.json":()=>Ve(()=>import("./fastviews.de-MGAlHTsp-CU9Rj7sS.js"),[]),"./fastviews.en.json":()=>Ve(()=>import("./fastviews.en-BoYc4WrC-DnZQwCTs.js"),[])}));let Re=class extends lo{constructor(){super(...arguments),this.target="",this.title="",this.disabled=!1,this.appearance="plain",this.size="small",this.placement="bottom-start",this.tabContributions=[],this.drawerOpen=!1,this.drawerSize="50vw",this.drawerRef=Gr(),this.tabsRef=Gr(),this.resizeHandleRef=Gr(),this.resizing=null}getDrawerTabsId(){return`fastviews-drawer-tabs-${this.target}`}handleTabClick(t){if(!this.disabled)if(this.containerId){const e=document.querySelector(`lyra-tabs#${this.containerId}`);if(!e){console.error(`fastviews: Tab container with id "${this.containerId}" not found`);return}e.open(t)}else this.drawerOpen=!0,this.updateComplete.then(()=>{const e=this.tabsRef.value;e&&e.open(t)})}handleDrawerHide(){this.drawerOpen=!1}startResize(t){t.preventDefault(),t.stopPropagation();const e=this.drawerRef.value;if(!e)return;let i=(()=>{const o=e.shadowRoot?.querySelector('[part="panel"]');if(o&&o.offsetWidth>0)return o.offsetWidth;const d=(window.getComputedStyle(e).getPropertyValue("--size")||this.drawerSize).match(/^(\d+(?:\.\d+)?)(px|vw|vh|%)$/);if(d){const h=parseFloat(d[1]),f=d[2];if(f==="px")return h;if(f==="vw")return h/100*window.innerWidth;if(f==="vh")return h/100*window.innerHeight;if(f==="%")return h/100*window.innerWidth}return 0})();i===0&&(i=window.innerWidth*.5);const s=o=>{this.resizing&&(o.preventDefault(),o.stopPropagation(),this.resizing.rafId!==null&&cancelAnimationFrame(this.resizing.rafId),this.resizing.rafId=requestAnimationFrame(()=>{if(!this.resizing)return;const n=this.resizing.startX-o.clientX,l=Math.round(this.resizing.startSize+n),d=200,h=Math.round(window.innerWidth*.9);if(l>=d&&l<=h){this.drawerSize=`${l}px`;const f=this.drawerRef.value;f&&(f.style.setProperty("--size",this.drawerSize),f.style.setProperty("transition","none"))}this.resizing.rafId=null}))},a=()=>{if(this.resizing){this.resizing.rafId!==null&&(cancelAnimationFrame(this.resizing.rafId),this.resizing.rafId=null),document.removeEventListener("mousemove",this.resizing.handleMouseMove),document.removeEventListener("mouseup",this.resizing.handleMouseUp),document.body.style.cursor="",document.body.style.userSelect="";const o=this.drawerRef.value;o&&o.style.removeProperty("transition"),this.resizing=null}};this.resizing={startX:t.clientX,startSize:i,handleMouseMove:s,handleMouseUp:a,rafId:null},document.addEventListener("mousemove",s,{passive:!1}),document.addEventListener("mouseup",a,{passive:!1}),document.body.style.cursor="col-resize",document.body.style.userSelect="none"}doBeforeUI(){this.target&&(this.loadTabContributions(),xe(ar,t=>{this.target&&t.target===this.target&&this.loadTabContributions()}))}loadTabContributions(){if(!this.target)return;const t=gt.getContributions(this.target);this.tabContributions=t.filter(e=>"name"in e),this.requestUpdate()}renderTabContribution(t){return $`
            <wa-dropdown-item 
                @click=${()=>this.handleTabClick(t)}>
                ${ye(t.icon,{label:t.label,slot:"icon"})}
                ${t.label}
            </wa-dropdown-item>
        `}render(){return!this.target||this.tabContributions.length===0?ht:$`
            <wa-dropdown placement=${this.placement}>
                <wa-button 
                    slot="trigger"
                    appearance=${this.appearance}
                    size=${this.size}
                    ?disabled=${this.disabled}
                    with-caret
                    title=${this.title}>
                    ${ye(this.icon,{label:this.title,slot:"start"})}
                    <slot></slot>
                </wa-button>
                
                ${this.title?$`
                    <h6 style="padding: var(--wa-space-xs) var(--wa-space-s); margin: 0; color: var(--wa-color-neutral-50); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                        ${this.title}
                    </h6>
                `:ht}
                
                ${this.tabContributions.map(t=>this.renderTabContribution(t))}
            </wa-dropdown>

            ${this.containerId?ht:$`
                <wa-drawer 
                    ${Zr(this.drawerRef)}
                    label="${this.title||xv.FAST_VIEWS}"
                    placement="end"
                    ?open=${this.drawerOpen}
                    @wa-hide=${this.handleDrawerHide}
                    style="--size: ${this.drawerSize};">
                    <div 
                        ${Zr(this.resizeHandleRef)}
                        class="resize-handle"
                        @mousedown=${this.startResize}>
                    </div>
                    <lyra-tabs 
                        ${Zr(this.tabsRef)}
                        id="${this.getDrawerTabsId()}"
                        style="width: 100%; height: 100%; display: flex; flex-direction: column;">
                    </lyra-tabs>
                </wa-drawer>
            `}
        `}};Re.styles=J`
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
    `;Ye([p()],Re.prototype,"target",2);Ye([p()],Re.prototype,"title",2);Ye([p()],Re.prototype,"icon",2);Ye([p({type:Boolean})],Re.prototype,"disabled",2);Ye([p()],Re.prototype,"appearance",2);Ye([p()],Re.prototype,"size",2);Ye([p()],Re.prototype,"placement",2);Ye([p()],Re.prototype,"containerId",2);Ye([Z()],Re.prototype,"tabContributions",2);Ye([Z()],Re.prototype,"drawerOpen",2);Ye([Z()],Re.prototype,"drawerSize",2);Re=Ye([X("lyra-fastviews")],Re);var kv=Object.getOwnPropertyDescriptor,Cv=(t,e,r,i)=>{for(var s=i>1?void 0:i?kv(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=o(s)||s);return s};function Sv(){let t=document.getElementById("global-dialog-container");return t||(t=document.createElement("div"),t.id="global-dialog-container",document.body.appendChild(t)),t}const ph=t=>{try{return new Intl.DisplayNames([t],{type:"language"}).of(t)||t.toUpperCase()}catch{return t.toUpperCase()}},$v=()=>[...kl.get()].sort(),_v=async()=>{const t=$v(),e=Ti.get();return new Promise(r=>{const i=Sv();let s=!1;const a=()=>{const d=i.querySelector("wa-dialog");d&&!s&&(d.open=!1)},o=()=>{s||(s=!0,Ge($``,i),r())},n=async d=>{await Xt.set(eo,d),a()},l=$`
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
                    ${t.map(d=>$`
                        <div 
                            class="language-item ${d===e?"active":""}"
                            @click=${()=>n(d)}>
                            <span class="language-code">${d.toUpperCase()}</span>
                            <span class="language-name">${ph(d)}</span>
                        </div>
                    `)}
                </div>
            </wa-dialog>
        `;Ge(l,i)})};let On=class extends Mr{render(){const t=Ti.get(),e=ph(t),r=`${t.toUpperCase()} ${e}`;return $`
            <wa-button 
                appearance="plain" 
                size="small"
                title="Current language: ${e}"
                @click=${()=>_v()}>
                ${r}
            </wa-button>
        `}};On.styles=J`
        :host {
            display: inline-block;
        }
    `;On=Cv([X("lyra-language-selector")],On);var Ev=Object.defineProperty,Av=Object.getOwnPropertyDescriptor,fh=(t,e,r,i)=>{for(var s=i>1?void 0:i?Av(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Ev(e,r,s),s};let ro=class extends Mr{constructor(){super(...arguments),this.currentLayoutId="standard"}doBeforeUI(){this.currentLayoutId=qr.getCurrentLayoutId();const t=()=>{this.currentLayoutId=qr.getCurrentLayoutId(),this.requestUpdate()};return window.addEventListener("app-loaded",t),window.addEventListener("layout-changed",t),()=>{window.removeEventListener("app-loaded",t),window.removeEventListener("layout-changed",t)}}async handleSelect(t){const e=t.detail?.item?.value;if(!(!e||e===this.currentLayoutId))try{await qr.setPreferredLayoutId(e)}catch(r){console.error("Failed to switch layout:",r)}}render(){const t=qr.getRegisteredLayouts();if(t.length<=1)return $``;const r=t.find(i=>i.id===this.currentLayoutId)?.name??this.currentLayoutId;return $`
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
                    title="Switch layout (current: ${r})">
                    <wa-icon name="table-cells" label="Layout"></wa-icon>
                </wa-button>
                ${t.map(i=>$`
                        <wa-dropdown-item
                            value="${i.id}"
                            type="checkbox"
                            ?checked=${i.id===this.currentLayoutId}>
                            ${ye(i.icon,{label:i.name,slot:"icon"})}
                            ${i.name}
                        </wa-dropdown-item>
                    `)}
            </wa-dropdown>
        `}};ro.styles=J`
        :host {
            display: inline-block;
        }
    `;fh([Z()],ro.prototype,"currentLayoutId",2);ro=fh([X("lyra-layout-switcher")],ro);const Lv="view.filebrowser",zv="view.logTerminal",Tv="toolbar.info",Rv="toolbar.fastViews",Dv="toolbar.languageSelector",Iv="toolbar.appSwitcher";gt.registerContribution(Va,{name:Lv,label:"Workspace",icon:"folder-open",component:t=>$`<lyra-filebrowser id="${t}"></lyra-filebrowser>`});gt.registerContribution(il,{name:zv,label:"Log Messages",icon:"list",component:t=>$`<lyra-log-terminal id="${t}"></lyra-log-terminal>`});gt.registerContribution(ea,{name:Tv,label:"Info",icon:"circle-info",command:"show_version_info",showLabel:!0});gt.registerContribution(ea,{name:Rv,label:"Fast Views",component:'<lyra-fastviews target="system.fastviews-bottomend" icon="bolt" title="Fast Views"></lyra-fastviews>'});gt.registerContribution(ea,{name:Dv,label:"Language",component:()=>$`<lyra-language-selector></lyra-language-selector>`});gt.registerContribution(ps,{name:Iv,label:"App Switcher",component:()=>$`<lyra-layout-switcher></lyra-layout-switcher>`});var Ov=Object.defineProperty,Pv=Object.getOwnPropertyDescriptor,da=(t,e,r,i)=>{for(var s=i>1?void 0:i?Pv(e,r):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(s=(i?o(e,r,s):o(s))||s);return i&&s&&Ov(e,r,s),s};let ds=class extends cl{constructor(){super(...arguments),this.showBottomSidebar=!1,this.showBottomPanel=!1,this.showLeftSidebar=!0,this.showAuxSidebar=!0}createRenderRoot(){return this}getGridSizes(){return this.showLeftSidebar&&this.showAuxSidebar?"15%, 65%, 20%":this.showLeftSidebar?"15%, 85%":this.showAuxSidebar?"80%, 20%":"100%"}render(){return $`
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
                <lyra-toolbar id=${yd}></lyra-toolbar>
                <lyra-toolbar id=${xd}></lyra-toolbar>
                <lyra-toolbar class="toolbar-end" id=${ps}></lyra-toolbar>
            </div>
            
            <lyra-resizable-grid 
                class="main-layout"
                id="main-layout" 
                orientation="horizontal" 
                sizes=${this.getGridSizes()}>
                
                ${this.showLeftSidebar?$`
                        ${this.showBottomSidebar?$`
                                <lyra-resizable-grid 
                                    id="left-sidebar-split" 
                                    orientation="vertical" 
                                    sizes="50%, 50%">
                                    <lyra-tabs id="${Va}"></lyra-tabs>
                                    <lyra-tabs id="${Sd}"></lyra-tabs>
                                </lyra-resizable-grid>
                            `:$`<lyra-tabs id="${Va}"></lyra-tabs>`}
                    `:ht}
                
                ${this.showBottomPanel?$`
                        <lyra-resizable-grid 
                            id="editor-area-split" 
                            orientation="vertical" 
                            sizes="70%, 30%">
                            <lyra-tabs id="${Gs}"></lyra-tabs>
                            <lyra-tabs id="${il}"></lyra-tabs>
                        </lyra-resizable-grid>
                    `:$`<lyra-tabs id="${Gs}"></lyra-tabs>`}
                
                ${this.showAuxSidebar?$`<lyra-tabs id="${$d}"></lyra-tabs>`:ht}
            </lyra-resizable-grid>
            
            <div class="toolbar-bottom">
                <lyra-toolbar id=${kd}></lyra-toolbar>
                <lyra-toolbar id=${po}></lyra-toolbar>
                <lyra-toolbar class="toolbar-end" id=${ea}></lyra-toolbar>
            </div>
        `}};da([p({type:Boolean,attribute:"show-bottom-sidebar"})],ds.prototype,"showBottomSidebar",2);da([p({type:Boolean,attribute:"show-bottom-panel"})],ds.prototype,"showBottomPanel",2);da([p({type:Boolean,attribute:"show-left-sidebar"})],ds.prototype,"showLeftSidebar",2);da([p({type:Boolean,attribute:"show-aux-sidebar"})],ds.prototype,"showAuxSidebar",2);ds=da([X("lyra-standard-layout")],ds);const Nv=[{id:"standard",name:"Standard",label:"Standard",icon:"lyra layout-standard",component:"lyra-standard-layout"},{id:"standard-bottom-panel",name:"Standard (bottom panel)",label:"Standard (bottom panel)",icon:"lyra layout-standard-bottom-panel",component:{tag:"lyra-standard-layout",attributes:{"show-bottom-panel":"true"}}},{id:"standard-bottom-sidebar",name:"Standard (bottom sidebar)",label:"Standard (bottom sidebar)",icon:"lyra layout-standard-bottom-sidebar",component:{tag:"lyra-standard-layout",attributes:{"show-bottom-sidebar":"true"}}},{id:"standard-full",name:"Standard (panel + sidebar)",label:"Standard (panel + sidebar)",icon:"lyra layout-standard-full",component:{tag:"lyra-standard-layout",attributes:{"show-bottom-panel":"true","show-bottom-sidebar":"true"}}}];for(const t of Nv)gt.registerContribution(Ua,t);async function Fv(t,e=!0){const r=await ft.getWorkspace();if(!r)return null;const i=t?.path;return e&&!i?null:{workspace:r,path:i||""}}function $l(t){return t&&typeof t.getContent=="function"&&typeof t.getSelection=="function"&&typeof t.getSnippet=="function"&&typeof t.getLanguage=="function"&&typeof t.getFilePath=="function"}function jr(t=!1){const e={filePath:null,language:null};return t?{...e,snippet:null,cursorLine:null}:e}async function Bv(t,e=!0){const r=await Fv(t,e);if(!r)return null;const{workspace:i,path:s}=r;if(!s)return null;try{const a=await i.getResource(s);return!a||!(a instanceof Bt)?null:{workspace:i,path:s,file:a}}catch{return null}}Tt({command:{id:"disconnect_folder",name:"Disconnect folder",description:"Disconnects a folder from the workspace"},handler:{execute:async()=>{const t=Jt.get();if(!(t instanceof Nt&&t.getParent()===void 0)){at("Select a folder root to disconnect.");return}try{const e=await ft.getFolderInfoForDirectory(t);if(e?.type==="indexeddb"){if(!await ts(`Also delete "${e.name}" from browser storage?

If not deleted, the folder data and blobs remain in IndexedDB.`))return;await wf(t),oe(`Deleted IndexedDB data for ${e.name}.`)}await ft.disconnectFolder(t)}catch(e){at(e.message)}}},contribution:{target:"contextmenu:view.filebrowser",label:"Disconnect folder",icon:"folder-minus",disabled:()=>{const t=Jt.get();return!(t instanceof Nt&&t.getParent()===void 0)}}});Tt({command:{id:"load_workspace",name:"Local Folder",description:"Connect to a local folder using File System Access API",parameters:[]},handler:{execute:async t=>{await window.showDirectoryPicker({mode:"readwrite"}).then(e=>ft.connectWorkspace(e)).catch(e=>{at(e.message)})}},contribution:{target:"filebrowser.connections",label:"Local Folder",icon:"folder-open"}});Tt({command:{id:"connect_opfs",name:"OPFS",description:"Connect to Origin Private File System (browser storage)",parameters:[]},handler:{execute:async()=>{try{await ft.connectFolder({opfs:!0})}catch(t){at(t.message)}}},contribution:{target:"filebrowser.connections",label:"OPFS (Browser Storage)",icon:"database"}});Tt({command:{id:"connect_indexeddb",name:"IndexedDB",description:"Connect to IndexedDB-backed workspace (browser storage)",parameters:[{name:"name",description:"Optional display name for this IndexedDB workspace root",required:!1}]},handler:{execute:async t=>{const e=t.params?.name;try{await ft.connectFolder({indexeddb:!0,name:e})}catch(r){at(r.message)}}},contribution:{target:"filebrowser.connections",label:"IndexedDB (Browser Storage)",icon:"database"}});Tt({command:{id:"refresh_resource",name:"Refresh resource",description:"Refreshes the connected folder of the selected resource, or the whole workspace if nothing is selected",parameters:[]},handler:{execute:async()=>{const t=Jt.get();if(t){t.getWorkspace().touch();return}const e=await ft.getWorkspace();if(!e){at("No workspace selected.");return}e.touch()}}});Tt({command:{id:"open_editor",name:"Open editor",description:"Opens a file in an editor",parameters:[{name:"path",description:"The path of the file to open within the workspace; if omitted, the active selection is opened",required:!1},{name:"editorId",description:"Open with this editor id; if omitted, use default editor",required:!1}]},handler:{execute:async t=>{const e=t.params?.path,r=t.params?.editorId;let i=null;if(e)i=(await Bv({path:e}))?.file??null;else{const s=Jt.get();i=s instanceof Bt?s:null}i&&await ls.loadEditor(i,r)}}});Tt({command:{id:"get_active_editor_content",name:"Get active editor content",description:"Gets the complete contents of the currently active editor. Returns null if no editor is active or if the editor is not a code editor.",parameters:[],output:[{name:"content",description:"the complete contents of the active editor, or null if no editor is active"},{name:"filePath",description:"the workspace path of the file in the active editor, or null if no editor is active"},{name:"language",description:"the programming language of the active editor, or null if no editor is active"}]},handler:{execute:async t=>{const e=t.activeEditor;if(!$l(e))return{...jr(),content:null};try{return{content:e.getContent(),filePath:e.getFilePath(),language:e.getLanguage()}}catch{return{...jr(),content:null}}}}});Tt({command:{id:"get_active_editor_selection",name:"Get active editor selection",description:"Gets the currently selected text in the active editor. Returns null if no editor is active, no selection exists, or if the editor is not a code editor.",parameters:[],output:[{name:"selection",description:"the selected text in the active editor, or null if no selection exists or no editor is active"},{name:"filePath",description:"the workspace path of the file in the active editor, or null if no editor is active"},{name:"language",description:"the programming language of the active editor, or null if no editor is active"}]},handler:{execute:async t=>{const e=t.activeEditor;if(!$l(e))return{...jr(),selection:null};try{return{selection:e.getSelection(),filePath:e.getFilePath(),language:e.getLanguage()}}catch{return{...jr(),selection:null}}}}});Tt({command:{id:"get_active_editor_snippet",name:"Get active editor snippet around cursor",description:"Gets a code snippet from the active editor with n lines before and n lines after the cursor position. Useful for getting context around the cursor without loading the entire file.",parameters:[{name:"lines",description:"number of lines to include before and after the cursor position (default: 5)",type:"number",required:!1}],output:[{name:"snippet",description:"the code snippet with n lines before and after the cursor, or null if no editor is active"},{name:"filePath",description:"the workspace path of the file in the active editor, or null if no editor is active"},{name:"language",description:"the programming language of the active editor, or null if no editor is active"},{name:"cursorLine",description:"the line number where the cursor is positioned (1-based), or null if no editor is active"}]},handler:{execute:async t=>{const e=t.activeEditor;if(!$l(e))return jr(!0);try{const r=t.params?.lines?parseInt(t.params.lines,10):5;if(isNaN(r)||r<0)return jr(!0);const i=e.getSnippet(r);return i?{snippet:i.snippet,filePath:e.getFilePath(),language:e.getLanguage(),cursorLine:i.cursorLine}:jr(!0)}catch{return jr(!0)}}}});Tt({command:{id:"show_version_info",name:"Show Version Info",description:"Shows application version information",parameters:[]},handler:{execute:async t=>{const e=qr.getCurrentApp();if(!e){at("No app loaded");return}const r=e.dependencies??{},i=Object.keys(r).length>0,s=i?$`
                    <wa-tree style="--indent-guide-width: 1px;">
                        <wa-tree-item expanded>
                            <span>${e.name??""}</span>
                            ${Object.entries(r).map(([k,S])=>$`
                                <wa-tree-item>
                                    <span>${k} <small>${S}</small></span>
                                </wa-tree-item>
                            `)}
                        </wa-tree-item>
                    </wa-tree>
                `:$``;let a=null;const o=()=>(a||(a=document.getElementById("global-dialog-container")||document.createElement("div"),a.id||(a.id="global-dialog-container",document.body.appendChild(a))),a),n=()=>{a&&Ge($``,a)},l=k=>{const S=Lt.parse(k,{async:!1});return $`${Dr(S)}`};let d=[];if(e.releaseHistory)if(typeof e.releaseHistory=="function")try{d=await e.releaseHistory()}catch(k){console.error("Failed to load release history from app:",k),d=[]}else d=e.releaseHistory;const h=e.version??"0.0.0",f=d.length>0?d.findIndex(k=>k.tag_name===h):-1,g=f>=0?f:0;let u=g;const v=k=>{if(d.length===0)return"";const S=d[k],L=S.tag_name===h;let E=`**Version:** ${S.tag_name}`;L&&(E+=" (Current)"),E+=`

`;const R=new Date(S.published_at).toLocaleDateString();if(E+=`**Released:** ${R}

`,!L){const I=h.replace(/^v/,""),U=S.tag_name.replace(/^v/,""),O=I.split(".").map(Number),q=U.split(".").map(Number);let it=!1;for(let A=0;A<Math.max(O.length,q.length);A++){const F=O[A]||0,w=q[A]||0;if(w>F){it=!0;break}if(w<F)break}it&&(E+=`⚠️ **Update available - reload page to update**

`)}return S.body&&(E+=`---

${S.body}`),E},b=()=>{n()},x=()=>{n()},y=k=>{const S=v(k),L=d.length>0,E=$`
                    <wa-dialog 
                        label="About ${e.name??""} - ${e.version??"0.0.0"}"
                        open 
                        light-dismiss
                        style="--width: 600px;"
                        @wa-request-close=${b}
                        @wa-after-hide=${x}
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
                                ${d.length>0?$`
                                    <wa-tab slot="nav" panel="release">Release History</wa-tab>
                                    <wa-tab-panel name="release">
                                        ${l(S)}
                                    </wa-tab-panel>
                                `:""}
                                
                                ${i?$`
                                    <wa-tab slot="nav" panel="packages">NPM Packages</wa-tab>
                                    <wa-tab-panel name="packages">
                                        ${s}
                                    </wa-tab-panel>
                                `:""}
                            </wa-tab-group>
                        </div>
                        <div slot="footer">
                            ${L?$`
                                <wa-button 
                                    variant="default"
                                    ?disabled=${k===d.length-1}
                                    @click=${()=>{k<d.length-1&&(u=k+1,y(u))}}
                                >
                                    ← Previous
                                </wa-button>
                                <wa-button 
                                    variant="default"
                                    ?disabled=${k===0}
                                    @click=${()=>{k>0&&(u=k-1,y(u))}}
                                >
                                    Next →
                                </wa-button>
                            `:""}
                            <wa-button variant="primary" data-dialog="close">Close</wa-button>
                        </div>
                    </wa-dialog>
                `;Ge(E,o())};return y(g),new Promise(k=>{const S=()=>{a?.querySelector("wa-dialog[open]")?setTimeout(S,100):k()};S()})}}});Tt({command:{id:"save",name:"Save editor",description:"Saves the active/focused editor",keyBinding:"CTRL+S",parameters:[]},handler:{execute:async t=>{const e=Ke.get();e&&e.isDirty()&&e.save()}},contribution:{target:"toolbar:.system.editors",icon:"floppy-disk",label:"Save active editor",slot:"start",disabled:()=>{const t=Ke.get();return!t||!t.isDirty()}}});const mh="theme";async function gh(t){const e=document.documentElement;e.classList.remove("wa-dark","wa-light"),e.classList.add(t)}async function Mv(){const t=await Xt.get(mh);await gh(t||"wa-dark")}async function Uv(t){await Xt.set(mh,t)}Tt({command:{id:"switch_theme",name:"Switch theme",description:"Switches between dark and light theme",parameters:[]},handler:{execute:async t=>{const r=document.documentElement.classList.contains("wa-dark")?"wa-light":"wa-dark";await gh(r),await Uv(r)}},contribution:{target:ps,icon:"circle-half-stroke",label:"Theme Switcher"}});Mv().catch(t=>{console.error("Failed to load theme preference:",t)});Tt({command:{id:"fullscreen",name:"Toggle fullscreen",description:"Toggles fullscreen mode",parameters:[]},handler:{execute:async t=>{document.fullscreenElement===document.body?await document.exitFullscreen():await document.body.requestFullscreen()}},contribution:{target:ps,icon:"expand",label:"Fullscreen"}});Tt({command:{id:"open_extensions",name:"Open Extensions",description:"Opens the extensions registry",parameters:[]},handler:{execute:t=>{const e={title:"Extensions",data:{},key:"system.extensions",icon:"puzzle-piece",state:{},component:r=>$`<lyra-extensions id="${r}"></lyra-extensions>`};ls.loadEditor(e,"extensions-editor").then()}},contribution:{target:ps,icon:"puzzle-piece",label:"Open Extensions"}});Tt({command:{id:"list_extensions",name:"List extensions",description:"Lists all available extensions with their status (enabled/disabled)",parameters:[],output:[{name:"extensions",description:"array of extension objects with id, name, description, experimental flag, and enabled status"}]},handler:{execute:async t=>qt.getExtensions().map(r=>({id:r.id,name:r.name,description:r.description,experimental:r.experimental,enabled:qt.isEnabled(r.id)}))}});Tt({command:{id:"toast_message",name:"Toast message to user",description:"Shows a toast message",parameters:[{name:"message",description:"the message to toast",required:!0},{name:"type",description:"the toast type: info (default), or error",required:!1}]},handler:{execute:({params:{message:t,type:e}})=>{t&&(e==="error"?at(t):oe(t))}}});const bh=`self.onmessage = async function(e) {
  const code = e.data;
  try {
    const fn = new Function(code);
    let value = fn();
    if (value != null && typeof value.then === "function") {
      value = await value;
    }
    try {
      self.postMessage({ type: "result", value });
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
//# sourceMappingURL=js-runtime-worker-rzw5Fn_l.js.map
`,Bc=typeof self<"u"&&self.Blob&&new Blob(["URL.revokeObjectURL(import.meta.url);",bh],{type:"text/javascript;charset=utf-8"});function Vv(t){let e;try{if(e=Bc&&(self.URL||self.webkitURL).createObjectURL(Bc),!e)throw"";const r=new Worker(e,{type:"module",name:t?.name});return r.addEventListener("error",()=>{(self.URL||self.webkitURL).revokeObjectURL(e)}),r}catch{return new Worker("data:text/javascript;charset=utf-8,"+encodeURIComponent(bh),{type:"module",name:t?.name})}}function Wv(){let t=null,e=null;function r(){return t||(t=new Vv,t.onmessage=i=>{const s=e;e=null,s&&(i.data.type==="result"?s.resolve(i.data.value):s.reject(new Error(i.data.message??"Unknown error")))},t.onerror=i=>{const s=e;e=null,s&&s.reject(new Error(i.message??"Worker error"))}),t}return{execute(i){return new Promise((s,a)=>{e={resolve:s,reject:a},r().postMessage(i)})},close(){t&&(t.terminate(),t=null),e=null}}}async function qv(t){if(t.code?.trim())return t.code.trim();if(!t.script)return at("Provide 'script' (file path) or 'code'."),null;const e=await ft.getWorkspace();if(!e)return at("No workspace selected."),null;try{const r=await e.getResource(t.script);if(!r||!(r instanceof Bt))return at("File not found: "+t.script),null;const i=await r.getContents();return typeof i!="string"?(at("File is not a text file"),null):i}catch(r){return at(`Failed to access file: ${r instanceof Error?r.message:String(r)}`),null}}Tt({command:{id:"js",name:"Run JavaScript file",description:"Runs a script via JsRuntime (inline or file). Return value or self.postMessage(value) is shown.",parameters:[{name:"script",description:"workspace path to a .js file",required:!1},{name:"code",description:"inline JavaScript",required:!1}]},handler:{execute:async t=>{const e=await qv(t.params??{});if(!e)return;const r=Wv();try{const i=await r.execute(e);return i!==void 0&&oe(String(i)),i}catch(i){at(i instanceof Error?i.message:String(i))}finally{r.close()}}}});Tt({command:{id:"open_view_as_editor",name:"Open view as editor",description:"Opens a dashboard view in the editor area",parameters:[{name:"name",description:"View contribution name",required:!0},{name:"sourceContributionSlot",description:"source contribution slot (default: SYSTEM_VIEWS)",required:!1}]},handler:{execute:async({params:t})=>{const e=t?.name;if(!e)return;const r=t?.sourceContributionSlot??Cd,s=gt.getContributions(r).find(a=>a.name===e);s?.component&&await ls.openTab(s)}}});async function Ao(t){const e=await ft.getWorkspace();if(!e)return at("No workspace selected."),null;try{const r=await e.getResource(t);return r instanceof Bt?r:(at("File not found: "+t),null)}catch(r){return at(`Failed to access file: ${r.message??r}`),null}}async function Lo(t){try{const e=await t.getContents();return typeof e!="string"?(at("File is not a text file"),null):e}catch(e){return at(`Failed to read file: ${e.message??e}`),null}}async function wh(t){const e=[],r=await t.listChildren(!0);for(const i of r){if(i instanceof Bt){e.push(i.getWorkspacePath());continue}i instanceof Nt&&e.push(...await wh(i))}return e}Tt({command:{id:"cat",name:"Cat - Show file contents",description:"Shows the complete contents of a file",parameters:[{name:"path",description:"the path of the file to read",required:!0}],output:[{name:"content",description:"the complete contents of the file"}]},handler:{execute:async({params:t})=>{const e=t?.path;if(!e){at("No file path provided.");return}const r=await Ao(e);if(r)return Lo(r)}}});Tt({command:{id:"exists",name:"Exists",description:"Checks if a file exists at the given path (like bash test -f)",parameters:[{name:"path",description:"Path of the file to check, relative to the workspace",required:!0}],output:[{name:"exists",description:"true if the file exists, false otherwise"}]},handler:{execute:async({params:t})=>{const e=await ft.getWorkspace();if(!e)return!1;const r=t?.path;if(!r)return!1;try{return await e.getResource(r)instanceof Bt}catch{return!1}}}});function vh(t){return t instanceof Bt||t instanceof Nt}const yh=()=>!vh(Jt.get()),xh=()=>{const t=Jt.get();return!vh(t)||t instanceof Nt&&t.getParent()===void 0};gt.registerContribution("filebrowser.create",{name:"filebrowser.create.file",command:"touch",icon:"file-plus",label:"Create File...",params:{ask:!0}});gt.registerContribution("filebrowser.create",{name:"filebrowser.create.folder",command:"mkdir",icon:"folder-plus",label:"Create Folder...",params:{ask:!0}});gt.registerContribution("toolbar:view.filebrowser",{name:"toolbar.filebrowser.rename",command:"mv",icon:"pen",label:"Rename",disabled:yh});gt.registerContribution("toolbar:view.filebrowser",{name:"toolbar.filebrowser.delete",command:"rm",icon:"trash",label:"Delete",disabled:xh});gt.registerContribution("contextmenu:view.filebrowser",{name:"contextmenu.filebrowser.create-folder",command:"mkdir",icon:"folder-plus",label:"Create Folder...",params:{ask:!0}});gt.registerContribution("contextmenu:view.filebrowser",{name:"contextmenu.filebrowser.rename",command:"mv",icon:"pen",label:"Rename",disabled:yh});gt.registerContribution("contextmenu:view.filebrowser",{name:"contextmenu.filebrowser.delete",command:"rm",icon:"trash",label:"Delete",disabled:xh});Tt({command:{id:"head",name:"Head - Show first lines",description:"Shows the first N lines of a file",parameters:[{name:"path",description:"the path of the file to read",required:!0},{name:"lines",description:"number of lines to show from the beginning (default: 10)",type:"number",required:!1}],output:[{name:"content",description:"the first N lines of the file"}]},handler:{execute:async({params:t})=>{const e=t?.path;if(!e){at("No file path provided.");return}const r=await Ao(e);if(!r)return;const i=t?.lines?parseInt(t.lines,10):10;if(Number.isNaN(i)||i<1){at("Number of lines must be a positive integer");return}const s=await Lo(r);if(s)return s.split(`
`).slice(0,i).join(`
`)}}});Tt({command:{id:"ls",name:"List files",description:"Lists files from a directory. If recursive is provided, it traverses from the provided directory down to all leaves. If no directory is provided, it will traverse from the workspace root.",parameters:[{name:"path",description:"the path of the directory to list, relative to the workspace. If not provided, uses workspace root",required:!1},{name:"recursive",description:"whether to recursively traverse all subdirectories",type:"boolean",required:!1}],output:[{name:"files",description:"array of file objects with path and size information"}]},handler:{execute:async({params:t})=>{const e=await ft.getWorkspace();if(!e)return at("No workspace available"),[];const r=t?.path,i=t?.recursive===!0||t?.recursive==="true";try{let s=e;if(r){const n=await e.getResource(r);if(!n)return at(`Path not found: ${r}`),[];if(!(n instanceof Nt))return at(`Path is not a directory: ${r}`),[];s=n}if(i){const n=await wh(s),l=[];for(const d of n){const h=await e.getResource(d);h instanceof Bt&&l.push({path:d,size:await h.size()})}return l}const a=await s.listChildren(!0),o=[];for(const n of a)n instanceof Bt&&o.push({path:n.getWorkspacePath(),size:await n.size()});return o}catch(s){return at(`Failed to list files: ${s.message??s}`),[]}}}});function Hv(t){return t.replace(/^\/+/,"").replace(/\/+$/,"")}function Mc(){const t=Jt.get();if(t instanceof Nt)return t.getWorkspacePath();if(t instanceof Bt)return t.getParent()?.getWorkspacePath()}function Uc(t,e){return t?`${t}/${e}`:e}async function jv(t){const e=await ft.getWorkspace();if(!e){at("No workspace selected.");return}const r="New Folder";let i=Uc(t,r),s=await e.getResource(i);if(!s)return i;let a=0;for(;;){if(i=Uc(t,`${r} (${a})`),s=await e.getResource(i),!s)return i;a++}}Tt({command:{id:"mkdir",name:"mkdir - Create new folder",description:"Creates a new folder within the workspace.",parameters:[{name:"path",description:"the folder path to create, relative to the workspace",required:!1},{name:"ask",description:"whether to prompt the user for the folder path",required:!1}],output:[{name:"path",description:"the path of the created folder"}]},handler:{execute:async({params:t})=>{const e=t?.ask;let r=t?.path;const i=await jv(Mc());if(!i||(e||!r)&&(r=await mo("Enter path to new folder:",r||i),!r))return;const s=r.startsWith("/");let a=Hv(r);if(!a){at("Folder path must not be empty.");return}if(!s){const d=Mc();d&&!a.startsWith(d+"/")&&(a=`${d}/${a}`)}const o=await ft.getWorkspace();if(!o){at("No workspace selected.");return}const n=await o.getResource(a);if(n instanceof Nt)return oe(`Folder already exists: ${a}`),a;if(n instanceof Bt){at(`Cannot create folder. A file already exists at "${a}".`);return}if(!(await o.getResource(`${a}/`,{create:!0})instanceof Nt)){at(`Could not create folder: ${a}`);return}return oe(`Folder created: ${a}`),a}}});Tt({command:{id:"mv",name:"mv - Rename a resource (file or directory)",description:"Renames a resource (file or directory)",keyBinding:"F2",parameters:[{name:"path",description:"the path of the resource within the workspace to rename or the currently active selection",required:!1},{name:"newName",description:"the new name for the resource",required:!1}]},handler:{execute:async t=>{const e=await ft.getWorkspace();if(!e){at("No workspace selected.");return}const r=t.params?.path;let i=null;if(r&&(i=await e.getResource(r)),i||(i=Jt.get()),!i){at("No resource to rename provided!");return}const s=i.getName(),a=t.params?.newName??await mo(`Enter new name for "${s}":`,s);if(!(!a||a===s))try{await i.rename(a),oe(`Resource renamed to: ${a}`)}catch(o){at(`Failed to rename ${s}: ${o.message??o}`)}}}});Tt({command:{id:"rm",name:"rm - Delete a resource (file or directory)",description:"Deletes a resource (file or directory)",keyBinding:"Delete",parameters:[{name:"path",description:"the path of the resource within the workspace to delete or the currently active selection",required:!1},{name:"confirm",description:"whether to ask the user to confirm the deletion, true by default",required:!1}]},handler:{execute:async t=>{const e=await ft.getWorkspace();if(!e){at("No workspace selected.");return}const r=t.params?.path;let i=null;if(r&&(i=await e.getResource(r)),i||(i=Jt.get()),!i){at("No resource to delete provided!");return}if(i instanceof Nt&&i.getParent()===void 0){at('Root folders cannot be deleted. Use "Disconnect folder" instead.');return}const s=i.getWorkspacePath(),a=t.params?.confirm;if(!((a===void 0||a===!0)&&!await ts(`Are you sure you want to delete ${s}?`)))try{await i.delete(),oe("Resource deleted: "+s)}catch(o){at(`Resource ${s} could not be deleted: ${o.message??o}`)}}}});Tt({command:{id:"tail",name:"Tail - Show last lines",description:"Shows the last N lines of a file",parameters:[{name:"path",description:"the path of the file to read",required:!0},{name:"lines",description:"number of lines to show from the end (default: 10)",type:"number",required:!1}],output:[{name:"content",description:"the last N lines of the file"}]},handler:{execute:async({params:t})=>{const e=t?.path;if(!e){at("No file path provided.");return}const r=await Ao(e);if(!r)return;const i=t?.lines?parseInt(t.lines,10):10;if(Number.isNaN(i)||i<1){at("Number of lines must be a positive integer");return}const s=await Lo(r);if(s)return s.split(`
`).slice(-i).join(`
`)}}});Tt({command:{id:"touch",name:"Touch - Create new file",description:"Creates a new file within the workspace. For .geospace map files, use create_map_file instead.",parameters:[{name:"path",description:"the path including name of the file to be created, must be relative to the workspace",required:!1},{name:"contents",description:"the textual contents of the file",required:!1},{name:"ask",description:"whether to prompt the user for the file path",required:!1},{name:"extension",description:"required file extension (e.g., '.geospace'), will be appended if missing",required:!1}],output:[{name:"path",description:"the path of the created file"}]},handler:{execute:async({params:t})=>{let e=t?.path;const r=t?.contents,i=t?.ask,s=t?.extension;if((i||!e)&&(e=await mo("Enter path to new file (directories will be created if not exist):",e||""),!e))return;if(s&&!e.endsWith(s)&&(e+=s),e.startsWith("/"))e=e.slice(1);else{const d=Jt.get(),h=d instanceof Nt?d.getWorkspacePath():d instanceof Bt?d.getParent()?.getWorkspacePath():void 0;h&&!e.startsWith(h+"/")&&(e=h+"/"+e)}const o=await ft.getWorkspace();if(!o){at("No workspace selected.");return}if(await o.getResource(e)&&!await ts(`File "${e}" already exists. Do you want to overwrite it?`))return;const l=await o.getResource(e,{create:!0});if(!(l instanceof Bt)){at("Could not create file: "+e);return}return r&&await l.saveContents(r),oe(`File created: ${e}`),e}}});Tt({command:{id:"unzip",name:"Unzip Archive",description:"Extract a zip archive from the workspace",parameters:[{name:"file",description:"the zip file to extract, if not provided, the current selection will be used",required:!1},{name:"target",description:"target folder to extract into, defaults to the zip filename without extension",required:!1}]},handler:{canExecute:t=>{let e=t.params?.file;if(!e){const r=Jt.get();if(!r||!("path"in r))return!1;e=r.path}return e.toLowerCase().endsWith(".zip")},execute:async t=>{let e=t.params?.file;e||(e=Jt.get().path);const r=await ft.getWorkspace();if(!r){at("No workspace selected.");return}await Xr.runAsync("Extracting archive",async i=>{try{const s=await r.getResource(e);if(!s){at("File not found: "+e);return}let a=t.params?.target;a||(a=(e.split("/").pop()||"extracted").replace(/\.zip$/i,"")+"/"),i.message="Loading archive...",i.progress=0,await r.getResource(a,{create:!0});const n=await s.getContents({blob:!0}),l=await ev.loadAsync(n),d=Object.values(l.files).filter(f=>!f.dir).length;let h=0;i.message=`Extracting to ${a.replace(/\/$/,"")}...`;for(const[f,g]of Object.entries(l.files)){if(g.dir)continue;const u=await g.async("blob"),v=`${a}${f}`;await(await r.getResource(v,{create:!0})).saveContents(u,{contentType:sa.BINARY}),h++,i.progress=Math.round(h/d*100),i.message=`Extracting ${h}/${d} files...`}i.progress=100,oe(`Archive extracted to ${a.replace(/\/$/,"")}: ${h} file(s)`)}catch(s){throw at("Failed to extract archive: "+s),s}})}}});Tt({command:{id:"wc",name:"Word count",description:"Counts lines, words, and characters in a file",parameters:[{name:"path",description:"the path of the file to analyze",required:!0}],output:[{name:"lines",description:"number of lines in the file"},{name:"words",description:"number of words in the file"},{name:"characters",description:"number of characters in the file"}]},handler:{execute:async({params:t})=>{const e=t?.path;if(!e){at("No file path provided.");return}const r=await Ao(e);if(!r)return;const i=await Lo(r);if(!i)return;const s=i.split(`
`),a=i.trim(),o=a===""?0:a.split(/\s+/).filter(n=>n.length>0).length;return{lines:s.length,words:o,characters:i.length}}}});function Vc(){return`downloaded-file-${new Date().toISOString().replace(/[:.]/g,"-").replace("T","_").slice(0,-5)}`}function Kv(t){if(t.startsWith("data:"))return Vc();try{const e=new URL(t).pathname.split("/").filter(i=>i.length>0),r=e[e.length-1];if(r?.includes(".")&&!r.includes(";"))return r}catch{}return Vc()}Tt({command:{id:"wget",name:"wget",description:"Download a file from a URL to the workspace",parameters:[{name:"url",description:"the URL of the file to download",required:!0},{name:"filename",description:"optional filename to save as (will be auto-detected if not provided)",required:!1},{name:"targetPath",description:"workspace path where to save; if not provided, a file browser dialog is shown to pick a directory",required:!1}]},handler:{canExecute:t=>{const e=t.params?.url;return!!(e&&(e.startsWith("http://")||e.startsWith("https://")))},execute:async t=>{const e=t.params?.url;if(!e){at("No URL provided.");return}const r=await ft.getWorkspace();if(!r){at("No workspace selected.");return}const i=Kv(e);let s;const a=t.params?.targetPath;if(a){const o=await ft.getFolders(),n=o.length>0?o[0].name:null,l=a.includes("/")?a:n?`${n}/${a}`:a,d=l.split("/").pop()??"";s=d.includes(".")&&d!==l?l:`${l.replace(/\/$/,"")}/${i}`}else{const o=await If("directory");if(o==null)return;s=`${o}/${i}`}await Xr.runAsync("Downloading file",async o=>{o.message="Starting download...",o.progress=0;try{const n=await fetch(e,{mode:"cors",credentials:"omit"});if(!n.ok){at("Failed to download file: "+n.statusText);return}let l=t.params?.filename;if(!l){const f=n.headers.get("content-disposition");if(f){const g=f.match(/filename="?([^";\n]+)"?/);g?.[1]&&(l=g[1].trim())}}l||(l=i);const d=s.includes("/")?s.replace(/\/[^/]+$/,`/${l}`):l;o.message=`Downloading ${l}...`,o.progress=50,await(await r.getResource(d,{create:!0})).saveContents(n.body,{contentType:sa.BINARY}),o.progress=100,oe(`File downloaded: ${l}`)}catch(n){throw at("Failed to download file: "+String(n)),n}})}}});pe.put("constants",qp);di.put("html",$);di.put("render",Ge);di.put("toastInfo",oe);di.put("toastError",at);di.put("toastWarning",Vu);di.put("publish",yt);di.put("subscribe",xe);export{ea as $,Xr as A,ht as B,Mr as C,xe as D,Gs as E,ts as F,gi as G,yt as H,xd as I,Gr as J,Zr as K,Ki as L,Va as M,ar as N,Yh as O,il as P,Ke as Q,Jt as R,Cd as S,ps as T,ye as U,Zc as V,Bt as W,If as X,sr as Y,Br as Z,Ve as _,qr as a,Me as a0,Tr as a1,ad as a2,Rs as a3,mn as a4,lo as a5,Vt as a6,Rt as a7,ci as a8,Eh as a9,Wv as aa,mo as ab,oe as ac,sa as ad,Nt as ae,Vu as af,fo as ag,Ur as ah,sd as ai,pa as aj,J as b,yi as c,$ as d,qt as e,gt as f,Ua as g,Kr as h,vs as i,yd as j,Tt as k,Q as l,$d as m,p as n,Xt as o,kd as p,ls as q,Z as r,pe as s,X as t,se as u,Dr as v,ft as w,Ju as x,at as y,di as z};
