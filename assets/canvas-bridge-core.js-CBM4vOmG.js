import{n as e}from"./rolldown-runtime-COiEfhsA.js";import{C as t,S as n,_ as r,a as i,b as a,c as o,d as s,f as c,h as l,i as u,l as d,m as f,n as p,o as m,p as h,r as ee,s as te,u as g,v as _,w as v,x as y,y as b}from"./canvas-bridge-canvas.js-D2E74L6t.js";var x=new class e{constructor(e){this.children=[],this.variables=e,this.proxy=new Proxy(e,this)}get(e,t){return e[t]||this.parent?.getProxy()[t]}set(e,t,n){e[t]=n}put(e,t){this.variables[e]=t}getProxy(){return this.proxy}createChild(t={}){let n=new e(t);return n.parent=this,this.children.push(n),n}getChildren(){return this.children}getParent(){return this.parent}destroy(){let e=this.parent?.children.indexOf(this);e!==void 0&&e>=0&&this.parent?.children.splice(e,1),this.parent=void 0}}({}),ne=x.createChild({}),re={debug:0,info:1,warning:2,error:3},ie=`debug`,S={log:console.log.bind(console),info:console.info.bind(console),warn:console.warn.bind(console),error:console.error.bind(console),debug:console.debug.bind(console)},ae=null,oe=[];function se(e){if(e===null)return`null`;if(e===void 0)return`undefined`;if(typeof e==`string`)return e;if(typeof e==`number`||typeof e==`boolean`)return String(e);if(e instanceof Error)return`${e.name}: ${e.message}`;try{return JSON.stringify(e)}catch{return String(e)}}var ce=class{constructor(e){this.source=e}info(e,...t){let n=t.length===0?e:`${e} ${t.map(e=>se(e)).join(` `)}`;this.log(n,`info`)}warning(e,...t){let n=t.length===0?e:`${e} ${t.map(e=>se(e)).join(` `)}`;this.log(n,`warning`)}warn(e,...t){let n=t.length===0?e:`${e} ${t.map(e=>se(e)).join(` `)}`;this.log(n,`warning`)}error(e,...t){let n=t.length===0?e:`${e} ${t.map(e=>se(e)).join(` `)}`;this.log(n,`error`)}debug(e,...t){let n=t.length===0?e:`${e} ${t.map(e=>se(e)).join(` `)}`;this.log(n,`debug`)}log(e,t){ue(this.source,e,t)}};function le(e){return re[e]>=re[ie]}function ue(e,t,n){le(n)&&(ae?ae(e,t,n):(oe.push({source:e,message:t,level:n}),S[n===`error`?`error`:n===`warning`?`warn`:n===`debug`?`debug`:`log`](`[${e}] ${t}`)))}function de(){console.log=function(...e){S.log.apply(console,e),ue(`Console`,e.map(e=>se(e)).join(` `),`info`)},console.info=function(...e){S.info.apply(console,e),ue(`Console`,e.map(e=>se(e)).join(` `),`info`)},console.warn=function(...e){S.warn.apply(console,e),ue(`Console`,e.map(e=>se(e)).join(` `),`warning`)},console.error=function(...e){S.error.apply(console,e),ue(`Console`,e.map(e=>se(e)).join(` `),`error`)},console.debug=function(...e){S.debug.apply(console,e),ue(`Console`,e.map(e=>se(e)).join(` `),`debug`)}}de();function fe(e){for(ae=e;oe.length>0;){let t=oe.shift();t&&e(t.source,t.message,t.level)}}function pe(){ae=null}function me(e){return new ce(e)}function he(e){ie=e}var C=me(`System`);x.put(`logger`,C);var ge=`eclipse-docks-persistence`,_e=`keyval`,w=1,ve=null;function ye(){return ve||=new Promise((e,t)=>{let n=indexedDB.open(ge,w);n.onerror=()=>t(n.error),n.onsuccess=()=>e(n.result),n.onupgradeneeded=e=>{e.target.result.createObjectStore(_e)}}),ve}var be=new class{async persistObject(e,t){let n=await ye();return new Promise((r,i)=>{let a=n.transaction(_e,`readwrite`).objectStore(_e),o=t==null?a.delete(e):a.put(t,e);o.onsuccess=()=>r(),o.onerror=()=>i(o.error)})}async getObject(e){let t=await ye();return new Promise((n,r)=>{let i=t.transaction(_e,`readonly`).objectStore(_e).get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}};x.put(`persistenceService`,be);var xe=Object.defineProperty,Se=(e,t)=>{let n={};for(var r in e)xe(n,r,{get:e[r],enumerable:!0});return t||xe(n,Symbol.toStringTag,{value:`Module`}),n};function T(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var Ce=me(`Toast`),we=4e3,Te=40,E=null,Ee=0,D=0,De=[],Oe=m(0);function ke(){return E||(E=document.createElement(`wa-toast`),E.placement=`bottom-end`,document.body.append(E)),E}function Ae(){Ee+=1;let e=!0;return()=>{e&&(e=!1,Ee=Math.max(0,Ee-1))}}function je(){return De.map(e=>({...e}))}function Me(){return De.reduce((e,t)=>(e[t.state]+=1,e),{pending:0,emitted:0})}function Ne(){De.length&&(De=[],Oe.set(++D))}function Pe(e,t,n){De=[{id:++D,message:e,variant:t,state:n,at:Date.now()},...De].slice(0,Te),Oe.set(D)}var Fe=(e,t)=>{let n=Ee>0?`pending`:`emitted`;if(Pe(e,t,n),n===`pending`||typeof document>`u`||!document.body)return;let r=ke();typeof r.create==`function`&&r.create(e,{variant:t,duration:we}).catch(()=>void 0)},O=e=>{Ce.info(e),Fe(e,`brand`)},k=e=>{Ce.error(e),Fe(e,`danger`)},Ie=e=>{Ce.warn(e),Fe(e,`warning`)},Le=`.eclipse-docks/settings.json`,Re=`dialogSettings`,ze=`events/settings/changed`;function Be(e,t){if(t){for(let[n,r]of Object.entries(t))if(r&&typeof r==`object`){let t=e[n];t?.properties&&r.properties?Be(t.properties,r.properties):e[n]={...r,properties:r.properties?{...r.properties}:void 0}}}}var A=new class{constructor(){this.mergedSchema={type:`object`,properties:{}}}async checkSettings(){this.appSettings||(this.appSettings=await be.getObject(Le),this.appSettings||(this.appSettings={},await be.persistObject(Le,this.appSettings)),d(ze,this.appSettings))}registerSchema(e){let t=e.properties??(e.type===`object`?{}:void 0);t&&(this.mergedSchema.properties||(this.mergedSchema.properties={}),Be(this.mergedSchema.properties,t))}getCategories(){let e=this.mergedSchema.properties;return e?Object.entries(e).filter(([,e])=>e&&typeof e==`object`).map(([e,t])=>({id:e,label:t.title??e,order:typeof t.order==`number`?t.order:0,schema:t})).sort((e,t)=>e.order-t.order):[]}getSchemaForCategory(e){return this.mergedSchema.properties?.[e]}getSchemaForSettingKey(e){let t=e.split(`.`).filter(Boolean);if(t.length===0)return this.mergedSchema;let n=this.mergedSchema;for(let e of t)if(n=n?.properties?.[e],!n)return;return n}traversePath(e,t,n){if(t.length===0)return null;let r=e,i=t.length-1;for(let e=0;e<i;e++){let i=t[e];if(r[i]===void 0){if(!n)return null;r[i]={}}if(r[i]===null||typeof r[i]!=`object`)return null;r=r[i]}return{parent:r,key:t[i]}}async getAt(e){await this.checkSettings();let t=e.split(`.`).filter(Boolean);if(t.length===0)return this.appSettings;let n=this.traversePath(this.appSettings,t,!1);if(n)return n.parent[n.key]}async setAt(e,t){await this.checkSettings();let n=e.split(`.`).filter(Boolean);if(n.length===0)return;let r=this.traversePath(this.appSettings,n,!0);r&&(r.parent[r.key]=t,await be.persistObject(Le,this.appSettings),d(ze,this.appSettings))}async get(e){return await this.checkSettings(),this.appSettings[e]}async set(e,t){await this.checkSettings(),this.appSettings[e]=t,await be.persistObject(Le,this.appSettings),d(ze,this.appSettings)}async getAll(){return await this.checkSettings(),this.appSettings}async setAll(e){this.appSettings=e,await be.persistObject(Le,this.appSettings),d(ze,this.appSettings)}async getDialogSetting(e){return await this.checkSettings(),(this.appSettings.dialogSettings||{})[e]}async setDialogSetting(e,t){await this.checkSettings();let n=this.appSettings.dialogSettings||{};n[e]=t,this.appSettings[Re]=n,await be.persistObject(Le,this.appSettings),d(ze,this.appSettings)}};x.put(`appSettings`,A);var Ve=new class{constructor(){this.globalNameRemaps=new Map,this.appNameRemaps=new Map}setGlobalNameRemap(e,t){this.globalNameRemaps.set(e,this.normalizeTargets(t))}resetForTesting(){this.globalNameRemaps.clear(),this.appNameRemaps.clear()}applyAppNameRemaps(e){if(this.appNameRemaps.clear(),e)for(let t of e)this.appNameRemaps.set(t.name,this.normalizeTargets(t.targets))}getEffectiveTargets(e,t){let n=t.name;if(!n)return[e];let r=this.appNameRemaps.get(n);if(r)return r.length>0?r:[];let i=this.globalNameRemaps.get(n);return i?i.length>0?i:[]:[e]}listNameRemaps(){let e={},t=new Set([...this.globalNameRemaps.keys(),...this.appNameRemaps.keys()]);for(let n of t)e[n]={appTargets:this.appNameRemaps.get(n),globalTargets:this.globalNameRemaps.get(n)};return e}normalizeTargets(e){let t=new Set,n=[];for(let r of e)r&&!t.has(r)&&(t.add(r),n.push(r));return n}};x.put(`contributionTargetMappingRegistry`,Ve);function He(e,t){let n=Array.isArray(t)?t:[t];Ve.setGlobalNameRemap(e,n)}function Ue(e){for(let[t,n]of Object.entries(e)){let e=Array.isArray(n)?n:[n];Ve.setGlobalNameRemap(t,e)}}function We(){return Ve.listNameRemaps()}var j=`events/contributionregistry/contributionsChanged`;function Ge(e,t){return e===void 0?t:typeof e==`boolean`?e:typeof e==`object`&&e&&`get`in e?e.get()===!0:typeof e==`function`?e()===!0:t}function Ke(e){let t=e.visible;return!t||t.get()!==!1}function qe(e){return Ge(e.disabled,!1)}function Je(e){e.disabled instanceof Function&&(e.disabled=new o.Computed(e.disabled)),e.visible instanceof Function&&(e.visible=new o.Computed(e.visible))}var M=new class{constructor(){this.contributions=new Map}registerContribution(e,t){let n=this.getOrCreateSlot(e);Je(t),n.push(t),d(j,{target:e,contributions:n});let r=Ve.getEffectiveTargets(e,t);for(let t of r){if(t===e)continue;let n=this.getContributions(t);d(j,{target:t,contributions:n})}}getContributions(e){let t=[];for(let[n,r]of this.contributions.entries()){let i=r;for(let r of i)Ve.getEffectiveTargets(n,r).includes(e)&&t.push(r)}return t.sort((e,t)=>(t.ranking??0)-(e.ranking??0)),t.length===0&&this.getOrCreateSlot(e),t}getOrCreateSlot(e){return this.contributions.has(e)||this.contributions.set(e,[]),this.contributions.get(e)}unregisterContribution(e,t){let n=this.contributions.get(e);if(!n)return;let r=n.filter(e=>e.name!==t);r.length!==n.length&&(this.contributions.set(e,r),d(j,{target:e,contributions:this.getContributions(e)}))}};x.put(`contributionRegistry`,M);var Ye={},N=m(null),Xe=m(null),Ze=m(null),Qe=m(0),P=m(void 0),$e=m({name:``,timestamp:0}),et=`events/commandregistry/commandRegistered`,F=`shell`;function tt(e,t){return e?.tags?.includes(t)===!0}var nt=class{constructor(e,t,n,r,i){this.id=e,this.name=t,this.description=n,this.parameters=r||[],this.output=i||[]}};function rt(e){if(e===void 0)return`undefined`;if(e===null)return`null`;if(typeof e==`string`)return e.length>300?`${e.slice(0,300)}…`:e;if(typeof e==`number`||typeof e==`boolean`)return String(e);try{let t=JSON.stringify(e);return t.length>300?`${t.slice(0,300)}…`:t}catch{return String(e)}}var it=class{async execute(e,t){return ot.execute(e,t)}async undo(){}async redo(){}},at=class{constructor(){this.commands={},this.handlers=new Map}registerHandler(e,t){this.handlers.has(e)||this.handlers.set(e,[]);let n=this.handlers.get(e);n.push(t),n.sort((e,t)=>(t.ranking??0)-(e.ranking??0))}getHandler(e){return this.handlers.get(e)}createExecutionContext(e){return{params:e||{},activePart:N.get(),activeEditor:Xe.get()}}async execute(e,t={}){let n=this.getHandler(e);if(!n)throw C.debug(`[CommandRegistry] No handlers registered for command: ${e}`),Error(`No handlers registered for command: ${e}`);let r=this.getCommand(e),i=t.params?` params: ${JSON.stringify(t.params)}`:``;C.debug(`[CommandRegistry] Executing command: ${e}${r?` (${r.name})`:``}${i}`);for(let r of n)if(r.canExecute===void 0||r.canExecute(t))try{let n=r.execute(t),i=await Promise.resolve(n);return C.debug(`[CommandRegistry] Command executed successfully: ${e} (result: ${rt(i)})`),i}catch(t){let n=t instanceof Error?t.message:String(t);throw C.error(`[CommandRegistry] Command execution failed: ${e} - ${n}`),t}C.error(`[CommandRegistry] No handler found to execute command: ${e}`)}createAndRegisterCommand(e,t,n,r,i){let a=new nt(e,t,n,r);this.registerCommand(a),i&&this.registerHandler(e,i)}registerCommand(e){this.commands[e.id]=e,d(et,e)}hasCommand(e){return e in this.commands}listCommands(e){return e?Object.values(this.commands).filter(t=>(ot.getHandler(t.id)||[]).some(t=>t.canExecute===void 0||t.canExecute(e))).reduce((e,t)=>(e[t.id]=t,e),{}):this.commands}getCommand(e){return this.commands[e]}registerAll(e){let t=e.command.id;this.registerCommand(e.command),e.handler&&this.registerHandler(t,e.handler),e.contribution&&e.contribution.target&&M.registerContribution(e.contribution.target,{command:t,...e.contribution})}},ot=new at;x.put(`commandRegistry`,ot);var I=e=>{ot.registerAll(e)};function st(e){return e?.length?` ${e.map(e=>{let t=e.type===`number`||e.type===`boolean`?`${e.name}:${e.type}`:e.name;return e.required?t:`[${t}]`}).join(` `)}`:``}function ct(){return[`Run a shell line. && sequences commands, | passes the previous result as parameters, and & starts a command without waiting.`,`Positional arguments fill parameters in the order shown. name=value sets a parameter by name.`,`Any registered command id may appear in the line.`,...Object.values(ot.listCommands()).filter(e=>tt(e,F)).sort((e,t)=>e.id.localeCompare(t.id)).map(e=>{let t=e.grants?.length?e.grants.join(`, `):`w`;return`${e.id} (${t})${st(e.parameters)}: ${e.description}`})].join(`
`)}var lt=v`
    wa-tree-item::part(label) {
        flex: 1;
        min-width: 0;
    }
`,L=(e,t)=>{let n=new o.subtle.Watcher(async()=>{try{await 0,t(e.get())}finally{n.watch(e)}});return n.watch(e),e.get(),()=>{n.unwatch(e)}};Object.defineProperty(a.prototype,"model",{enumerable:!0,configurable:!0,writable:!0});var ut=te(a),dt=class extends ut{constructor(...e){super(...e),this.signalCleanups=new Set,this.eventSubscriptions=new Set,this.releaseOnDisconnect=!0}static finalizeStyles(e){return[lt,...super.finalizeStyles(e)]}connectedCallback(){super.connectedCallback(),this.doBeforeUI()}disconnectedCallback(){this.releaseOnDisconnect&&this.doClose(),super.disconnectedCallback(),this.eventSubscriptions.forEach(e=>s(e)),this.eventSubscriptions.clear(),this.signalCleanups.forEach(e=>e()),this.signalCleanups.clear()}subscribe(e,t){let n=g(e,t.bind(this));this.eventSubscriptions.add(n)}showInfo(e){O(e)}showError(e){k(e)}nobubble(e){return t=>{t.stopPropagation(),e.bind(this)(t)}}command(e,t={}){return()=>{this.executeCommand(e,t)}}async executeCommand(e,t){let n=ot.createExecutionContext(t);await ot.execute(e,n)}watch(e,t){let n=L(e,t.bind(this));this.signalCleanups.add(n)}firstUpdated(e){super.firstUpdated(e),this.doInitUI()}updateIdle(){requestIdleCallback(()=>this.requestUpdate())}updateLater(){requestAnimationFrame(()=>this.requestUpdate())}doBeforeUI(){}doInitUI(){}doClose(){}withRefresh(e){e(),this.updateLater()}};function ft(e){let t=(e??``).trim();if(!t)return{name:``};let n=t.split(/\s+/);return n.length<=1?{name:t}:{name:n.pop(),library:n.join(` `)}}function R(e,n){let{name:r,library:i}=ft(e??``);return t`<wa-icon library=${i??y} name=${r} label=${n?.label??y} slot=${n?.slot??y}></wa-icon>`}var pt={x:100,y:100},mt=240,ht=140,gt=[`n`,`s`,`e`,`w`,`nw`,`se`,`sw`],_t={n:`ns-resize`,s:`ns-resize`,e:`ew-resize`,w:`ew-resize`,sw:`nesw-resize`,nw:`nwse-resize`,se:`nwse-resize`};function vt(e){if(!e||typeof e!=`object`)return!1;let t=e;return typeof t.x==`number`&&typeof t.y==`number`}function yt(e){if(!e||typeof e!=`object`)return!1;let t=e;return Number.isFinite(t.width)&&t.width>0&&Number.isFinite(t.height)&&t.height>0}function bt(e,t,n,r,i){let a=e.x+e.width,o=e.y+e.height,s=Math.min(mt,i.width),c=Math.min(ht,i.height),l=e.width,u=e.height;t.includes(`e`)&&(l=e.width+n),t.includes(`w`)&&(l=e.width-n),t.includes(`s`)&&(u=e.height+r),t.includes(`n`)&&(u=e.height-r),l=Math.max(s,l),u=Math.max(c,u);let d=t.includes(`w`)?a-l:e.x,f=t.includes(`n`)?o-u:e.y;return d<0&&(l+=d,d=0),f<0&&(u+=f,f=0),d+l>i.width&&(t.includes(`w`)?d=Math.max(0,i.width-l):l=i.width-d),f+u>i.height&&(t.includes(`n`)?f=Math.max(0,i.height-u):u=i.height-f),{x:Math.round(d),y:Math.round(f),width:Math.round(Math.max(s,l)),height:Math.round(Math.max(c,u))}}var xt=class extends dt{constructor(...e){super(...e),this.label=``,this.minimized=!1,this.positionX=pt.x,this.positionY=pt.y,this.frameWidth=null,this.frameHeight=null,this.previewPosition=null,this.dragging=!1,this.dragOffsetX=0,this.dragOffsetY=0,this.resizing=!1,this.resizeEdge=``,this.resizeStart=null,this.positionEpoch=0,this.positionOwned=!1,this.appliedPersistKey=``,this.loadingKey=null,this.onHeaderPointerDown=e=>{if(e.button!==0||(this.raiseHost(),this.eventFromHeaderActions(e)))return;let t=this.frameElement();if(!t)return;let n=t.getBoundingClientRect();this.dragOffsetX=e.clientX-n.left,this.dragOffsetY=e.clientY-n.top,this.positionEpoch++,this.dragging=!0,this.previewPosition={x:this.positionX,y:this.positionY},e.preventDefault()},this.onResizePointerDown=e=>{if(e.button!==0||this.minimized)return;let t=e.currentTarget;if(!(t instanceof HTMLElement))return;let n=t.dataset.edge??``;if(!_t[n])return;let r=this.frameElement();if(!r)return;let i=this.frameWidth??r.offsetWidth,a=this.frameHeight??r.offsetHeight;i<=0||a<=0||(e.preventDefault(),e.stopPropagation(),this.raiseHost(),this.resizing=!0,this.resizeEdge=n,this.resizeStart={x:this.positionX,y:this.positionY,width:i,height:a,pointerX:e.clientX,pointerY:e.clientY},document.body.style.cursor=_t[n])},this.onPointerMove=e=>{if(this.resizing){this.updateResize(e.clientX,e.clientY);return}if(!this.dragging)return;let t=this.clamp(e.clientX-this.dragOffsetX,e.clientY-this.dragOffsetY);(this.previewPosition?.x!==t.x||this.previewPosition?.y!==t.y)&&(this.previewPosition=t)},this.onPointerUp=()=>{if(this.resizing){this.resizing=!1,this.resizeStart=null,document.body.style.cursor=``,this.positionEpoch++,this.positionOwned=!0,this.persistGeometry();return}if(!this.dragging||!this.previewPosition)return;let e=this.previewPosition;this.dragging=!1,this.previewPosition=null,this.positionEpoch++,this.positionOwned=!0,this.setPosition(e.x,e.y),this.persistGeometry()},this.toggleMinimized=()=>{this.minimized=!this.minimized},this.requestClose=()=>{this.dispatchEvent(new CustomEvent(`floating-close`,{bubbles:!0,composed:!0}))}}doBeforeUI(){document.addEventListener(`mousemove`,this.onPointerMove),document.addEventListener(`mouseup`,this.onPointerUp),this.loadPosition()}doInitUI(){this.reclamp()}doClose(){document.removeEventListener(`mousemove`,this.onPointerMove),document.removeEventListener(`mouseup`,this.onPointerUp),this.dragging=!1,this.previewPosition=null,this.resizing=!1,this.resizeStart=null,document.body.style.cursor=``}updated(e){super.updated(e),e.has(`persistKey`)&&this.loadPosition()}place(e,t){this.positionEpoch++,this.positionOwned=!0,this.setPosition(e,t),this.persistGeometry()}size(e,t){let n=bt({x:this.positionX,y:this.positionY,width:e,height:t},`se`,0,0,{width:window.innerWidth,height:window.innerHeight});this.frameWidth=n.width,this.frameHeight=n.height,this.positionX=n.x,this.positionY=n.y}geometry(){let e=this.frameElement();return{x:this.positionX,y:this.positionY,width:this.frameWidth??e?.offsetWidth??0,height:this.frameHeight??e?.offsetHeight??0}}async loadPosition(){let e=this.persistKey?.trim()??``;if(!e||e===this.appliedPersistKey||e===this.loadingKey)return;this.loadingKey=e;let t=this.positionEpoch;try{let n=await A.getDialogSetting(e);if(this.persistKey?.trim()!==e||(this.appliedPersistKey=e,t!==this.positionEpoch))return;let r=n?.position;vt(r)&&this.setPosition(r.x,r.y);let i=n?.size;yt(i)&&this.frameWidth==null&&this.frameHeight==null&&(this.frameWidth=i.width,this.frameHeight=i.height)}finally{this.loadingKey===e&&(this.loadingKey=null)}}async persistGeometry(){let e=this.persistKey?.trim();if(!e)return;let t=await A.getDialogSetting(e),n={...typeof t==`object`&&t?t:{},position:{x:this.positionX,y:this.positionY}};this.frameWidth!=null&&this.frameHeight!=null&&(n.size={width:this.frameWidth,height:this.frameHeight}),await A.setDialogSetting(e,n)}setPosition(e,t){let n=this.clamp(e,t);this.positionX=n.x,this.positionY=n.y}reclamp(){let e=this.clamp(this.positionX,this.positionY);(e.x!==this.positionX||e.y!==this.positionY)&&(this.positionX=e.x,this.positionY=e.y,this.positionOwned&&this.persistGeometry())}frameElement(){let e=this.shadowRoot?.querySelector(`.panel`);return e instanceof HTMLElement?e:null}clamp(e,t){let n=this.frameElement(),r=n?.offsetWidth??0,i=n?.offsetHeight??0,a=Math.max(0,window.innerWidth-r),o=Math.max(0,window.innerHeight-i);return{x:Math.min(Math.max(0,e),a),y:Math.min(Math.max(0,t),o)}}raiseHost(){let e=this.parentNode;if(!e||(e.lastChild!==this&&e.appendChild(this),!(e instanceof ShadowRoot)))return;let t=e.host,n=t.parentNode;n&&n.lastChild!==t&&n.appendChild(t)}eventFromHeaderActions(e){return e.composedPath().some(e=>e instanceof Element&&e.classList.contains(`header-actions`))}updateResize(e,t){let n=this.resizeStart;if(!n)return;let r=bt(n,this.resizeEdge,e-n.pointerX,t-n.pointerY,{width:window.innerWidth,height:window.innerHeight});(r.x!==this.positionX||r.y!==this.positionY||r.width!==this.frameWidth||r.height!==this.frameHeight)&&(this.positionX=r.x,this.positionY=r.y,this.frameWidth=r.width,this.frameHeight=r.height)}render(){let e=this.frameElement(),n=this.previewPosition,r=this.minimized?`Expand`:`Minimize`;return t`
            ${n?t`
                <div
                    class="drag-preview"
                    style=${l({left:`${n.x}px`,top:`${n.y}px`,width:`${e?.offsetWidth??0}px`,height:`${e?.offsetHeight??0}px`})}
                ></div>
            `:y}
            <div
                class="panel ${this.minimized?`minimized`:``} ${this.frameWidth==null?``:`sized`} ${n?`dragging`:``}"
                style=${l({left:`${this.positionX}px`,top:`${this.positionY}px`,width:this.frameWidth==null?void 0:`${this.frameWidth}px`,height:this.minimized||this.frameHeight==null?void 0:`${this.frameHeight}px`})}
            >
                <div class="panel-header" @mousedown=${this.onHeaderPointerDown}>
                    <div class="header-title">${this.icon?R(this.icon,{label:this.label}):y}<span>${this.label}</span></div>
                    <div class="header-actions">
                        <wa-button
                            size="xs"
                            appearance="plain"
                            title=${r}
                            aria-label=${r}
                            @click=${this.toggleMinimized}
                        >
                            <wa-icon name=${this.minimized?`chevron-up`:`chevron-down`}></wa-icon>
                        </wa-button>
                        <wa-button
                            size="xs"
                            appearance="plain"
                            title="Close"
                            aria-label="Close"
                            @click=${this.requestClose}
                        >
                            <wa-icon name="xmark"></wa-icon>
                        </wa-button>
                    </div>
                </div>
                <div class="panel-body" ?hidden=${this.minimized}>
                    <slot></slot>
                </div>
                ${this.minimized?y:gt.map(e=>t`
                    <div
                        class="resize-handle ${e}"
                        data-edge=${e}
                        role="separator"
                        aria-label="Resize"
                        @mousedown=${this.onResizePointerDown}
                    ></div>
                `)}
            </div>
        `}static{this.styles=v`
        :host {
            display: block;
            position: fixed;
            z-index: 10000;
            pointer-events: none;
        }

        .drag-preview {
            position: fixed;
            border: 3px dashed var(--wa-color-primary-50, #0066cc);
            background: var(--wa-color-primary-05, rgba(0, 102, 204, 0.05));
            border-radius: var(--wa-border-radius-medium, 8px);
            z-index: 10001;
            pointer-events: none;
            opacity: 0.8;
            box-sizing: border-box;
        }

        :host-context(.wa-light) .drag-preview {
            background: var(--wa-color-primary-95);
            border-color: var(--wa-color-primary-50);
        }

        .panel {
            --panel-header-size: 1.5rem;
            position: fixed;
            width: max-content;
            max-width: 100vw;
            box-sizing: border-box;
            background: var(--wa-color-surface-raised, var(--wa-color-neutral-05));
            border: var(--wa-border-width-s, 1px) solid var(--wa-color-neutral-border-loud, var(--wa-color-neutral-25));
            border-radius: var(--wa-border-radius-medium, 8px);
            box-shadow: var(--wa-shadow-large, 0 8px 24px rgba(0, 0, 0, 0.8));
            pointer-events: all;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        :host-context(.wa-light) .panel {
            background: var(--wa-color-surface-raised, var(--wa-color-neutral-95));
            border-color: var(--wa-color-neutral-border-loud, var(--wa-color-neutral-75));
            box-shadow: var(--wa-shadow-large, 0 8px 24px rgba(0, 0, 0, 0.2));
        }

        .panel.dragging {
            opacity: 0.5;
        }

        .panel-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0;
            margin: 0;
            padding: 0;
            background: var(--wa-color-surface-lowered, var(--wa-color-neutral-10));
            border-bottom: var(--wa-border-width-s, 1px) solid var(--wa-color-neutral-border-loud, var(--wa-color-neutral-25));
            cursor: move;
            user-select: none;
            font-size: var(--wa-font-size-s, 0.875rem);
            line-height: 1.2;
        }

        :host-context(.wa-light) .panel-header {
            background: var(--wa-color-surface-lowered, var(--wa-color-neutral-90));
            border-bottom-color: var(--wa-color-neutral-border-loud, var(--wa-color-neutral-75));
        }

        .header-title {
            display: flex;
            align-items: center;
            gap: 0.35rem;
            flex: 1 1 auto;
            min-width: 0;
            margin: 0;
            padding: 0 0.4rem;
            font-weight: 600;
            color: var(--wa-color-text-normal, var(--wa-color-neutral-90));
        }

        .header-title span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .header-title wa-icon {
            flex: none;
        }

        :host-context(.wa-light) .header-title {
            color: var(--wa-color-text-normal, var(--wa-color-neutral-10));
        }

        .header-actions {
            display: flex;
            gap: 0;
            margin: 0;
            padding: 0;
            cursor: default;
        }

        .header-actions wa-button {
            --wa-form-control-height: var(--panel-header-size);
            --wa-form-control-padding-inline: 0.25rem;
        }

        .panel.sized .panel-body {
            flex: 1 1 auto;
            min-height: 0;
            min-width: 0;
            overflow: auto;
            display: flex;
            flex-direction: column;
        }

        .panel.sized ::slotted(*) {
            flex: 1 1 auto;
            min-width: 0;
            min-height: 0;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
        }

        .panel-body[hidden] {
            display: none;
        }

        .resize-handle {
            position: absolute;
            z-index: 2;
            touch-action: none;
        }

        .resize-handle.n,
        .resize-handle.s {
            left: 12px;
            height: 6px;
        }

        .resize-handle.n {
            top: 0;
            right: calc(var(--panel-header-size) * 2);
            cursor: ns-resize;
        }
        .resize-handle.s { right: 12px; bottom: 0; cursor: ns-resize; }

        .resize-handle.e,
        .resize-handle.w {
            bottom: 12px;
            width: 6px;
        }

        .resize-handle.e { top: var(--panel-header-size); right: 0; cursor: ew-resize; }
        .resize-handle.w { top: 12px; left: 0; cursor: ew-resize; }

        .resize-handle.nw,
        .resize-handle.se,
        .resize-handle.sw {
            width: 14px;
            height: 14px;
        }

        .resize-handle.nw { top: 0; left: 0; cursor: nwse-resize; }
        .resize-handle.se { right: 0; bottom: 0; cursor: nwse-resize; }
        .resize-handle.sw { left: 0; bottom: 0; cursor: nesw-resize; }

        .resize-handle.se::after {
            content: '';
            position: absolute;
            right: 3px;
            bottom: 3px;
            width: 7px;
            height: 7px;
            border-right: 2px solid var(--wa-color-neutral-border-loud, var(--wa-color-neutral-40));
            border-bottom: 2px solid var(--wa-color-neutral-border-loud, var(--wa-color-neutral-40));
        }
    `}};T([_({type:String})],xt.prototype,`label`,void 0),T([_({type:String})],xt.prototype,`icon`,void 0),T([_({type:Boolean})],xt.prototype,`minimized`,void 0),T([_({type:String})],xt.prototype,`persistKey`,void 0),T([r()],xt.prototype,`positionX`,void 0),T([r()],xt.prototype,`positionY`,void 0),T([r()],xt.prototype,`frameWidth`,void 0),T([r()],xt.prototype,`frameHeight`,void 0),T([r()],xt.prototype,`previewPosition`,void 0),xt=T([b(`docks-floating-panel`)],xt);var z=`events/filesys/workspaceChanged`,St=`events/filesys/workspaceConnected`,B=me(`WorkspaceService`),Ct=class{constructor(){this.state={}}getWorkspacePath(){let e=[],t=this,n;for(;t;){e.push(t.getName());let r=t.getParent();r||(n=t),t=r}e.reverse();let r=typeof U?.getWorkspaceSync==`function`?U.getWorkspaceSync():void 0;if(r&&n&&`isDirectChild`in r&&typeof r.isDirectChild==`function`&&r.isDirectChild(n)){let t=r.getFolderNameForDirectory(n);if(t&&e.length>0)return e.length>1?t+`/`+e.slice(1).join(`/`):t}return e.shift(),e.join(`/`)}getWorkspace(){let e=this;for(;e;){let t=e.getParent();if(t)e=t;else break}return e}},wt=function(e){return e[e.TEXT=0]=`TEXT`,e[e.BINARY=1]=`BINARY`,e}({}),Tt=function(e){return e[e.BASE64=0]=`BASE64`,e}({}),V=class extends Ct{},H=class extends Ct{},Et=class extends V{constructor(e,t){super(),this.contents=e,this.name=t}async getContents(e){return this.contents}async saveContents(e,t){this.contents=e}async size(){return this.contents.length||null}async copyTo(e){throw Error(`Not supported`)}delete(e,t){throw Error(`Not supported`)}async rename(e){throw Error(`Not supported`)}getName(){return this.name}getParent(){}},Dt=class extends H{constructor(e,t=`/`){super(),this.displayName=t,this.entriesByName=new Map(e.map(e=>[e.getName(),e]))}getFolderNameForDirectory(e){for(let[t,n]of this.entriesByName)if(n===e)return t}isDirectChild(e){return this.getFolderNameForDirectory(e)!==void 0}getName(){return this.displayName}getParent(){}async listChildren(e){return Array.from(this.entriesByName.values())}async getResource(e,t){let n=e?.replace(/^\/+/,``).trim();if(!n)return null;let r=n.indexOf(`/`),i=r>=0?n.slice(0,r).trim():n.trim(),a=r>=0?n.slice(r+1).trim():``,o=this.entriesByName.get(i);return o?a?o.getResource(a,t):o:null}touch(){for(let e of this.entriesByName.values())e.touch()}async delete(e,t){throw Error(`Delete not supported on workspace root`)}async copyTo(e){throw Error(`Copy not supported on workspace root`)}async rename(e){throw Error(`Rename not supported on workspace root`)}getFolderByName(e){return this.entriesByName.get(e)}},Ot=class extends H{constructor(e){super(),this.backendType=e.backendType,this.persistedData=e.data,this.name=e.name}getName(){return this.name}getParent(){}async listChildren(e){return[]}async getResource(e,t){throw Error(`Workspace backend "${this.backendType}" is not available in this environment.`)}touch(){}async delete(e,t){throw Error(`Cannot modify workspace folder for missing backend "${this.backendType}".`)}async copyTo(e){throw Error(`Cannot copy from workspace folder for missing backend "${this.backendType}".`)}async rename(e){throw Error(`Cannot rename workspace folder for missing backend "${this.backendType}".`)}};function kt(e){let t=e.data&&typeof e.data==`object`&&e.data.name;return typeof t==`string`&&t.length>0?t:e.type}function At(e){return e instanceof Error&&e.message.trim()?e.message:`Could not connect to this workspace folder.`}var jt=`Could not restore this workspace folder.`,Mt=class extends H{constructor(e){super(),this.backendType=e.backendType,this.name=e.name,this.reason=e.reason}getFailureReason(){return this.reason}getName(){return this.name}getParent(){}async listChildren(e){return[]}async getResource(e,t){throw Error(`Workspace folder "${this.name}" (${this.backendType}) is unavailable: ${this.reason}`)}touch(){}async delete(e,t){throw Error(`Cannot modify unavailable workspace folder "${this.name}" (${this.backendType}).`)}async copyTo(e){throw Error(`Cannot copy from unavailable workspace folder "${this.name}" (${this.backendType}).`)}async rename(e){throw Error(`Cannot rename unavailable workspace folder "${this.name}" (${this.backendType}).`)}};function Nt(e){return e instanceof Ot||e instanceof Mt}async function Pt(e,t,n,r){let i=kt({type:e,data:t});try{return await n(t)||new Mt({backendType:e,name:i,data:t,reason:jt})}catch(n){return r?.(n),new Mt({backendType:e,name:i,data:t,reason:At(n)})}}var Ft=`workspace_data`,It=class e{getWorkspaceSync(){return this._currentWorkspace}constructor(){this._currentWorkspace=void 0,this.folders=[],this.contributions=new Map,this.restoredTypes=new Set;let e;this.initPromise=new Promise(t=>{e=t}),this.loadPersistedWorkspace(e)}registerContribution(e){this.contributions.set(e.type,e),this.tryRestoreForContribution(e)}getContributions(){return Array.from(this.contributions.values())}static{this.DEFAULT_INDEXEDDB_FOLDER_NAME=`My Folder`}async tryRestoreForContribution(e){if(await this.initPromise,this.restoredTypes.has(e.type))return;if(this.folders.filter(t=>t.type===e.type).some(e=>!Nt(e.directory))){this.restoredTypes.add(e.type);return}let t=await be.getObject(Ft);if(!t?.folders||!Array.isArray(t.folders)){this.restoredTypes.add(e.type);return}let n=t.folders.filter(t=>t.type===e.type);if(n.length===0){this.restoredTypes.add(e.type);return}this.folders=this.folders.filter(t=>!(t.type===e.type&&Nt(t.directory)));for(let t of n){if(!e.restore)continue;let n=await Pt(e.type,t.data,e.restore,t=>B.warn(`Failed to restore folder (${e.type}) on contribution registration:`,t));this.folders.push({type:e.type,data:t.data,directory:n})}if(this.folders.length===0){this.restoredTypes.add(e.type);return}let r=this.buildComposite();this.workspace=Promise.resolve(r),this._currentWorkspace=r??void 0,await this.persistFolders(),r&&(d(St,r),B.debug(`Workspace folders restored for contribution type: ${e.type}`)),this.restoredTypes.add(e.type)}async loadPersistedWorkspace(t){B.debug(`Restoring workspace from persistence`);try{let e=await be.getObject(Ft);if(e||(this.workspace=Promise.resolve(void 0),this._currentWorkspace=void 0),e?.folders&&Array.isArray(e.folders)&&e.folders.length>0){let n=e.folders.map(e=>({type:e.type,data:e.data}));await this.resolveFolders(n);let r=this.buildComposite();this.workspace=Promise.resolve(r),this._currentWorkspace=r??void 0,r&&(d(St,r),B.debug(`Workspace restored from persisted folders`)),t();return}if(e&&e.type&&e.data!==void 0){let t=this.contributions.get(e.type);if(t?.restore)try{let n=await t.restore(e.data);if(n){this.folders=[{type:e.type,data:e.data,directory:n}];let t=this.buildComposite();this.workspace=Promise.resolve(t),this._currentWorkspace=t??void 0,this.currentType=e.type,await this.persistFolders(),d(St,t),B.debug(`Workspace restored from legacy format`)}}catch(e){B.error(`Failed to restore legacy workspace:`,e)}}this.workspace||(this.workspace=Promise.resolve(void 0),this._currentWorkspace=void 0),t()}finally{if(this.folders.length===0)try{await this.connectFolder({indexeddb:!0,name:e.DEFAULT_INDEXEDDB_FOLDER_NAME}),B.debug(`Connected default IndexedDB workspace`)}catch(e){B.warn(`Failed to connect default IndexedDB folder`,e)}}}async resolveFolders(e){this.folders=[];for(let t of e){let e=this.contributions.get(t.type);if(!e?.restore){let e=t.data&&typeof t.data==`object`&&t.data.name||`${t.type} (missing)`,n=new Ot({backendType:t.type,name:e,data:t.data});this.folders.push({type:t.type,data:t.data,directory:n});continue}let n=await Pt(t.type,t.data,e.restore,e=>B.warn(`Failed to restore folder (${t.type}):`,e));this.folders.push({type:t.type,data:t.data,directory:n})}}buildComposite(){if(this.folders.length!==0)return new Dt(this.folders.map(e=>e.directory))}async persistFolders(){let e=this.folders.filter(e=>e.type!==`in-memory`),t=e.length>0?{folders:e.map(e=>({type:e.type,data:e.data}))}:null;await be.persistObject(Ft,t),await be.persistObject(`workspace`,null),B.debug(`Persisted ${e.length} folder(s) (${this.folders.length} connected)`)}async getFolders(){return await this.initPromise,this.folders.map(e=>({name:e.directory.getName(),type:e.type}))}async getFolderInfoForDirectory(e){await this.initPromise;let t=this.folders.find(t=>t.directory===e);if(!t)return;let n=t.data&&typeof t.data==`object`&&t.data.name||t.directory.getName(),r=this.contributions.get(t.type)?.name??t.type;return{name:n,type:t.type,backendName:r}}async isResourceInCurrentWorkspace(e){await this.initPromise;let t=e;for(;t;){let e=t.getParent();if(!e)return t instanceof H&&this.folders.some(e=>e.directory===t);t=e}return!1}async updateFolderName(e,t){await this.initPromise;let n=this.folders.find(t=>t.directory===e);if(!n)return;n.data=n.data&&typeof n.data==`object`?{...n.data,name:t}:{name:t},await this.persistFolders();let r=this.buildComposite();this.workspace=Promise.resolve(r),this._currentWorkspace=r??void 0,d(St,r),B.debug(`Updated folder name: ${t}`)}async connectFolder(e){await this.initPromise;let t=Array.from(this.contributions.values()).find(t=>t.canHandle(e));if(!t)throw Error(`No workspace contribution can handle this input`);let n=e?.name??t.type;if((t.type===`in-memory`||t.type===`opfs`)&&this.folders.find(e=>e.type===t.type))return B.debug(`Workspace already has ${t.type}; reusing`),this.buildComposite();B.debug(`Connecting workspace: ${t.type}, ${n}`);let r=await t.connect(e),i=t.persist?await t.persist(r):e;this.folders.push({type:t.type,data:i,directory:r}),await this.persistFolders(),this.currentType=this.folders.length===1?t.type:void 0;let a=this.buildComposite();this.workspace=Promise.resolve(a),this._currentWorkspace=a,d(St,a);let o=r.getName();return B.info(`Workspace connected: ${t.type} (${o})`),a}async disconnectFolder(e){await this.initPromise;let t=this.folders.findIndex(t=>t.directory===e);if(t<0)return;let n=this.folders[t];B.debug(`Disconnecting folder: ${n.directory.getName()} (${n.type})`),this.folders.splice(t,1),await this.persistFolders(),this.folders.length>0?this.currentType=this.folders[0].type:(this.currentType=void 0,B.info(`Workspace disconnected`));let r=this.buildComposite();this.workspace=Promise.resolve(r),this._currentWorkspace=r??void 0,d(St,r)}async connectWorkspace(e){return this.connectFolder(e)}async getWorkspace(){if(await this.initPromise,!this.workspace)throw Error(`No workspace connected.`);return await this.workspace}isConnected(){return this.folders.length>0}getWorkspaceType(){return this.currentType}async disconnectWorkspace(){await this.initPromise,this.workspace=Promise.resolve(void 0),this._currentWorkspace=void 0,this.folders=[],this.currentType=void 0,await this.persistFolders(),d(St,void 0),B.info(`Workspace disconnected`)}async copyResource(e,t,n){await this.initPromise;let r=this._currentWorkspace;if(!r)throw Error(`No workspace connected.`);let i=n?.newName??e.getName(),a=t.getWorkspacePath(),o=a?`${a}/${i}`:i,s=async(e,t)=>{n?.onFile?.(t);let i=await e.getContents({blob:!0}),a=await r.getResource(t,{create:!0});if(!a)throw Error(`Failed to create target file: ${t}`);await a.saveContents(i)},c=async(e,t)=>{for(let n of await e.listChildren(!1)){let e=`${t}/${n.getName()}`;n instanceof V?await s(n,e):n instanceof H&&await c(n,e)}};if(e instanceof V)await s(e,o);else if(e instanceof H)await c(e,o);else throw Error(`Unsupported resource type for copy operation.`);n?.move&&await e.delete(void 0,!0)}},U=new It;x.put(`workspaceService`,U);var Lt=class extends V{constructor(e,t){super(),this.fileHandle=e,this.parent=t}getName(){return this.fileHandle.name}getParent(){return this.parent}async delete(){return this.getParent().delete(this.getName())}async getContents(e){let t=await this.fileHandle.getFile();return!e||e?.contentType==wt.TEXT?await t.text():e?.encoding==Tt.BASE64||e?.uri?URL.createObjectURL(t):e?.blob?t:t.stream()}async size(){try{return(await this.fileHandle.getFile()).size}catch{return null}}async saveContents(e,t){let n=await this.fileHandle.createWritable();if(e&&typeof e.pipeTo==`function`)await e.pipeTo(n);else{let t=n.getWriter();try{await t.write(e)}finally{await t.close()}}d(z,U.getWorkspaceSync()??this.getWorkspace())}async copyTo(e){let t=await this.getContents({blob:!0});await(await this.getWorkspace().getResource(e,{create:!0})).saveContents(t)}async rename(e){let t=this.getParent();if(!t)throw Error(`Cannot rename root resource`);if(this.getName()!==e){if(!(`move`in this.fileHandle)||typeof this.fileHandle.move!=`function`)throw Error(`File rename not supported in this browser. Please use a browser with File System Access API move() support.`);try{await this.fileHandle.move(e)}catch(e){throw e.name===`NotAllowedError`||e.message?.includes(`not allowed`)||e.message?.includes(`user agent`)?Error(`File rename failed: The operation took too long and user activation expired. Please try again.`):e}await t.listChildren(!0),d(z,U.getWorkspaceSync()??this.getWorkspace())}}},Rt=class e extends H{constructor(e,t){super(),this.dirHandle=e,this.parent=t}getHandle(){return this.dirHandle}getParent(){return this.parent}getName(){return this.dirHandle.name}async listChildren(t=!1){return t||!this.files?(this.loadingPromise||=(async()=>{try{let t={};try{for await(let n of this.dirHandle.values()){let r=n.kind===`file`?new Lt(n,this):new e(n,this);t[r.getName()]=r}}catch(e){if(e.name===`NotFoundError`)return this.files={},[];throw e}return this.files=t,Object.values(this.files)}finally{this.loadingPromise=void 0}})(),this.loadingPromise):Object.values(this.files)}async getResource(t,n){if(!t)throw Error(`No path provided`);let r=t.split(`/`).filter(e=>e.trim()),i=this,a=!1;try{for(let t=0;t<r.length;t++){let o=r[t].trim();if(i instanceof e){if(await i.listChildren(),!i.files)return null;let s=i.files[o];if(s)i=s;else{if(n?.create){if(a=!0,t<r.length-1)try{let t=await i.dirHandle.getDirectoryHandle(o,{create:!0}),n=new e(t,i);i.files[o]=n,i=n,i instanceof e&&await i.listChildren();continue}catch(e){throw e.name===`NotFoundError`?Error(`Directory not found or not accessible: ${r.slice(0,t+1).join(`/`)}`):e}try{let e=new Lt(await i.dirHandle.getFileHandle(o,{create:!0}),i);return i.files[o]=e,e}catch(e){throw e.name===`NotFoundError`?Error(`File not found or not accessible: ${r.join(`/`)}`):e}}return null}}else return null}}finally{a&&d(z,U.getWorkspaceSync()??this.getWorkspace())}return i}touch(){d(z,U.getWorkspaceSync()??this.getWorkspace())}async delete(t,n=!0){if(!t){let t=this.getParent();return t instanceof e&&(await t.listChildren(),t.files&&delete t.files[this.getName()]),this.files=void 0,this.loadingPromise=void 0,t?.delete(this.getName())}return this.dirHandle.removeEntry(t,{recursive:n}).then(async()=>{this.files&&delete this.files[t],d(z,U.getWorkspaceSync()??this.getWorkspace())})}async copyTo(e){for(let t of await this.listChildren()){let n=[e,t.getName()].join(`/`);await t.copyTo(n)}}async rename(e){let t=this.getParent();if(!t)throw Error(`Cannot rename workspace root`);if(this.getName()!==e){if(!(`move`in this.dirHandle)||typeof this.dirHandle.move!=`function`)throw Error(`Directory rename not supported in this browser. Please use a browser with File System Access API move() support.`);try{await this.dirHandle.move(e)}catch(e){throw e.name===`NotAllowedError`||e.message?.includes(`not allowed`)||e.message?.includes(`user agent`)?Error(`Directory rename failed: The operation took too long and user activation expired. Please try again.`):e}await t.listChildren(!0),d(z,U.getWorkspaceSync()??this.getWorkspace())}}};U.registerContribution({type:`filesystem`,name:`fs`,canHandle(e){return e&&`kind`in e&&e.kind===`directory`},async connect(e){return new Rt(e)},async restore(e){if(e&&`kind`in e&&e.kind===`directory`)return new Rt(e,void 0)},async persist(e){return e instanceof Rt?e.getHandle():null}});function zt(e,t){this.v=e,this.k=t}function Bt(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Vt(e){if(Array.isArray(e))return e}function Ht(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function Ut(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Wt(e,t){return Vt(e)||Ht(e,t)||Gt(e,t)||Ut()}function Gt(e,t){if(e){if(typeof e==`string`)return Bt(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Bt(e,t):void 0}}function Kt(e){var t,n;function r(t,n){try{var a=e[t](n),o=a.value,s=o instanceof zt;Promise.resolve(s?o.v:o).then(function(n){if(s){var c=t===`return`&&o.k?t:`next`;if(!o.k||n.done)return r(c,n);n=e[c](n).value}i(!!a.done,n)},function(e){r(`throw`,e)})}catch(e){i(2,e)}}function i(e,i){e===2?t.reject(i):t.resolve({value:i,done:e}),(t=t.next)?r(t.key,t.arg):n=null}this._invoke=function(e,i){return new Promise(function(a,o){var s={key:e,arg:i,resolve:a,reject:o,next:null};n?n=n.next=s:(t=n=s,r(e,i))})},typeof e.return!=`function`&&(this.return=void 0)}Kt.prototype[typeof Symbol==`function`&&Symbol.asyncIterator||`@@asyncIterator`]=function(){return this},Kt.prototype.next=function(e){return this._invoke(`next`,e)},Kt.prototype.throw=function(e){return this._invoke(`throw`,e)},Kt.prototype.return=function(e){return this._invoke(`return`,e)};var qt=Object.entries,Jt=Object.setPrototypeOf,Yt=Object.isFrozen,Xt=Object.getPrototypeOf,Zt=Object.getOwnPropertyDescriptor,Qt=Object.freeze,$t=Object.seal,en=Object.create,tn=typeof Reflect<`u`&&Reflect,nn=tn.apply,rn=tn.construct;Qt||=function(e){return e},$t||=function(e){return e},nn||=function(e,t){var n=[...arguments].slice(2);return e.apply(t,n)},rn||=function(e){return new e(...[...arguments].slice(1))};var an=W(Array.prototype.forEach);Array.prototype.indexOf;var on=W(Array.prototype.lastIndexOf),sn=W(Array.prototype.pop),cn=W(Array.prototype.push),ln=W(Array.prototype.slice),un=W(Array.prototype.splice),dn=Array.isArray,fn=kn(Set),pn=W(Set.prototype.add),mn=W(Set.prototype.has),hn=W(String.prototype.toLowerCase),gn=W(String.prototype.toString),_n=W(String.prototype.match),vn=W(String.prototype.replace),yn=W(String.prototype.indexOf),bn=W(String.prototype.trim),xn=W(Number.prototype.toString),Sn=W(Boolean.prototype.toString),Cn=typeof BigInt>`u`?null:W(BigInt.prototype.toString),wn=typeof Symbol>`u`?null:W(Symbol.prototype.toString),Tn=W(Object.prototype.hasOwnProperty),En=W(Object.prototype.toString),Dn=W(RegExp.prototype.test),On=kn(TypeError);function W(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);var n=[...arguments].slice(1);return nn(e,t,n)}}function kn(e){return function(){return rn(e,[...arguments])}}function G(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:hn;if(Jt&&Jt(e,null),!dn(t))return e;let r=t.length;for(;r--;){let i=t[r];if(typeof i==`string`){let e=n(i);e!==i&&(Yt(t)||(t[r]=e),i=e)}e[i]=!0}return e}function An(e){for(let t=0;t<e.length;t++)Tn(e,t)||(e[t]=null);return e}function jn(e){let t=en(null);for(let r of qt(e)){var n=Wt(r,2);let i=n[0],a=n[1];Tn(e,i)&&(t[i]=dn(a)?An(a):a&&typeof a==`object`&&a.constructor===Object?jn(a):a)}return t}function Mn(e){switch(typeof e){case`string`:return e;case`number`:return xn(e);case`boolean`:return Sn(e);case`bigint`:return Cn?Cn(e):`0`;case`symbol`:return wn?wn(e):`Symbol()`;case`undefined`:return En(e);case`function`:case`object`:{if(e===null)return En(e);let t=e,n=Nn(t,`toString`);if(typeof n==`function`){let e=n(t);return typeof e==`string`?e:En(e)}return En(e)}default:return En(e)}}function Nn(e,t){for(;e!==null;){let n=Zt(e,t);if(n){if(n.get)return W(n.get);if(typeof n.value==`function`)return W(n.value)}e=Xt(e)}function n(){return null}return n}function Pn(e,t){for(;e!==null;){let n=Zt(e,t);if(n)return n.get?W(n.get):null;e=Xt(e)}return null}function Fn(e){try{return Dn(e,``),!0}catch{return!1}}var In=Qt(`a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr`.split(`.`)),Ln=Qt(`svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern`.split(`.`)),Rn=Qt([`feBlend`,`feColorMatrix`,`feComponentTransfer`,`feComposite`,`feConvolveMatrix`,`feDiffuseLighting`,`feDisplacementMap`,`feDistantLight`,`feDropShadow`,`feFlood`,`feFuncA`,`feFuncB`,`feFuncG`,`feFuncR`,`feGaussianBlur`,`feImage`,`feMerge`,`feMergeNode`,`feMorphology`,`feOffset`,`fePointLight`,`feSpecularLighting`,`feSpotLight`,`feTile`,`feTurbulence`]),zn=Qt([`animate`,`color-profile`,`cursor`,`discard`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`foreignobject`,`hatch`,`hatchpath`,`mesh`,`meshgradient`,`meshpatch`,`meshrow`,`missing-glyph`,`script`,`set`,`solidcolor`,`unknown`,`use`]),Bn=Qt(`math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts`.split(`.`)),Vn=Qt([`maction`,`maligngroup`,`malignmark`,`mlongdiv`,`mscarries`,`mscarry`,`msgroup`,`mstack`,`msline`,`msrow`,`semantics`,`annotation`,`annotation-xml`,`mprescripts`,`none`]),Hn=Qt([`#text`]),Un=Qt(`accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns`.split(`.`)),Wn=Qt(`accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan`.split(`.`)),Gn=Qt(`accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns`.split(`.`)),Kn=Qt([`xlink:href`,`xml:id`,`xlink:title`,`xml:space`,`xmlns:xlink`]),qn=$t(/{{[\w\W]*|^[\w\W]*}}/g),Jn=$t(/<%[\w\W]*|^[\w\W]*%>/g),Yn=$t(/\${[\w\W]*/g),Xn=$t(/^data-[\-\w.\u00B7-\uFFFF]+$/),Zn=$t(/^aria-[\-\w]+$/),Qn=$t(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),$n=$t(/^(?:\w+script|data):/i),er=$t(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),tr=$t(/^html$/i),nr=$t(/^[a-z][.\w]*(-[.\w]+)+$/i),rr=$t(/<[/\w!]/g),ir=$t(/<[/\w]/g),ar=$t(/<\/no(script|embed|frames)/i),or=$t(/\/>/i),K={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},sr=Qt(G({},[`style`,`script`,`xmp`,`iframe`,`noembed`,`noframes`,`plaintext`,`noscript`])),cr=function(){return typeof window>`u`?null:window},lr=function(e,t){if(typeof e!=`object`||typeof e.createPolicy!=`function`)return null;let n=null,r=`data-tt-policy-suffix`;t&&t.hasAttribute(r)&&(n=t.getAttribute(r));let i=`dompurify`+(n?`#`+n:``);try{return e.createPolicy(i,{createHTML(e){return e},createScriptURL(e){return e}})}catch{return console.warn(`TrustedTypes policy `+i+` could not be created.`),null}},ur=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},dr=function(e,t,n,r){return Tn(e,t)&&dn(e[t])?G(r.base?jn(r.base):{},e[t],r.transform):n},fr=function(e,t,n){let r=Tn(e,t)?e[t]:void 0;return r&&typeof r==`object`?jn(r):n()};function pr(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:cr(),t=e=>pr(e);if(t.version=`3.4.17`,t.removed=[],!e||!e.document||e.document.nodeType!==K.document||!e.Element)return t.isSupported=!1,t;let n=e.document,r=n,i=r.currentScript;e.DocumentFragment;let a=e.HTMLTemplateElement,o=e.Node,s=e.Element,c=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let l=e.DOMParser,u=e.trustedTypes,d=s.prototype,f=Nn(d,`cloneNode`),p=Nn(d,`remove`),m=Nn(d,`removeAttributeNode`),h=Nn(d,`nextSibling`),ee=Nn(d,`childNodes`),te=Nn(d,`parentNode`),g=Nn(d,`shadowRoot`),_=Nn(d,`attributes`),v=o&&o.prototype?Nn(o.prototype,`nodeType`):null,y=o&&o.prototype?Nn(o.prototype,`nodeName`):null,b=o&&o.prototype?Nn(o.prototype,`ownerDocument`):null,x=function(e){return v?v(e):e.nodeType},ne=function(e){return y?y(e):e.nodeName},re=Pn(d,`namespaceURI`),ie=function(e){return re?re(e):e.namespaceURI};if(typeof a==`function`){let e=n.createElement(`template`);e.content&&e.content.ownerDocument&&(n=e.content.ownerDocument)}let S,ae=``,oe,se=!1,ce=0,le=function(){if(ce>0)throw On(`A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.`)},ue=function(e){le(),ce++;try{return S.createHTML(e)}finally{ce--}},de=function(e){le(),ce++;try{return S.createScriptURL(e)}finally{ce--}},fe=function(){return se||=(oe=lr(u,i),!0),oe},pe=n,me=pe.implementation,he=pe.createNodeIterator,C=pe.createDocumentFragment,ge=pe.getElementsByTagName,_e=r.importNode,w=ur();t.isSupported=typeof qt==`function`&&typeof te==`function`&&me&&me.createHTMLDocument!==void 0;let ve=qn,ye=Jn,be=Yn,xe=Xn,Se=Zn,T=$n,Ce=er,we=nr,Te=Qn,E=null,Ee=G({},[...In,...Ln,...Rn,...Bn,...Hn]),D=null,De=G({},[...Un,...Wn,...Gn,...Kn]),Oe=Object.seal(en(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ke=null,Ae=null,je=Object.seal(en(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Me=!0,Ne=!0,Pe=!1,Fe=!0,O=!1,k=!0,Ie=!1,Le=!1,Re=null,ze=null,Be=!1,A=!1,Ve=!1,He=!1,Ue=!0,We=!1,j=`user-content-`,Ge=!0,Ke=!1,qe=null,Je={},M=null,Ye=G({},`annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp`.split(`.`)),N=null,Xe=G({},[`audio`,`video`,`img`,`source`,`image`,`track`]),Ze=null,Qe=G({},[`alt`,`class`,`for`,`id`,`label`,`name`,`pattern`,`placeholder`,`role`,`summary`,`title`,`value`,`style`,`xmlns`]),P=`http://www.w3.org/1998/Math/MathML`,$e=`http://www.w3.org/2000/svg`,et=`http://www.w3.org/1999/xhtml`,F=et,tt=!1,nt=null,rt=G({},[P,$e,et],gn),it=Qt([`mi`,`mo`,`mn`,`ms`,`mtext`]),at=G({},it),ot=Qt([`annotation-xml`]),I=G({},ot),st=G({},[`title`,`style`,`font`,`a`,`script`]),ct=null,lt=[`application/xhtml+xml`,`text/html`],L=null,ut=null,dt=n.createElement(`form`),ft=function(e){return e instanceof RegExp||e instanceof Function},R=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(ut&&ut===e)return;e&&typeof e==`object`||(e={}),e=jn(e),ct=lt.indexOf(e.PARSER_MEDIA_TYPE)===-1?`text/html`:e.PARSER_MEDIA_TYPE,L=ct===`application/xhtml+xml`?gn:hn,E=dr(e,`ALLOWED_TAGS`,Ee,{transform:L}),D=dr(e,`ALLOWED_ATTR`,De,{transform:L}),nt=dr(e,`ALLOWED_NAMESPACES`,rt,{transform:gn}),Ze=dr(e,`ADD_URI_SAFE_ATTR`,Qe,{transform:L,base:Qe}),N=dr(e,`ADD_DATA_URI_TAGS`,Xe,{transform:L,base:Xe}),M=dr(e,`FORBID_CONTENTS`,Ye,{transform:L}),ke=dr(e,`FORBID_TAGS`,jn({}),{transform:L}),Ae=dr(e,`FORBID_ATTR`,jn({}),{transform:L}),Je=Tn(e,`USE_PROFILES`)?e.USE_PROFILES&&typeof e.USE_PROFILES==`object`?jn(e.USE_PROFILES):e.USE_PROFILES:!1,Me=e.ALLOW_ARIA_ATTR!==!1,Ne=e.ALLOW_DATA_ATTR!==!1,Pe=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Fe=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,O=e.SAFE_FOR_TEMPLATES||!1,k=e.SAFE_FOR_XML!==!1,Ie=e.WHOLE_DOCUMENT||!1,A=e.RETURN_DOM||!1,Ve=e.RETURN_DOM_FRAGMENT||!1,He=e.RETURN_TRUSTED_TYPE||!1,Be=e.FORCE_BODY||!1,Ue=e.SANITIZE_DOM!==!1,We=e.SANITIZE_NAMED_PROPS||!1,Ge=e.KEEP_CONTENT!==!1,Ke=e.IN_PLACE||!1,Te=Fn(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:Qn,F=typeof e.NAMESPACE==`string`?e.NAMESPACE:et,at=fr(e,`MATHML_TEXT_INTEGRATION_POINTS`,()=>G({},it)),I=fr(e,`HTML_INTEGRATION_POINTS`,()=>G({},ot));let t=fr(e,`CUSTOM_ELEMENT_HANDLING`,()=>en(null));if(Oe=en(null),Tn(t,`tagNameCheck`)&&ft(t.tagNameCheck)&&(Oe.tagNameCheck=t.tagNameCheck),Tn(t,`attributeNameCheck`)&&ft(t.attributeNameCheck)&&(Oe.attributeNameCheck=t.attributeNameCheck),Tn(t,`allowCustomizedBuiltInElements`)&&typeof t.allowCustomizedBuiltInElements==`boolean`&&(Oe.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),$t(Oe),O&&(Ne=!1),Ve&&(A=!0),Je&&(E=G({},Hn),D=en(null),Je.html===!0&&(G(E,In),G(D,Un)),Je.svg===!0&&(G(E,Ln),G(D,Wn),G(D,Kn)),Je.svgFilters===!0&&(G(E,Rn),G(D,Wn),G(D,Kn)),Je.mathMl===!0&&(G(E,Bn),G(D,Gn),G(D,Kn))),je.tagCheck=null,je.attributeCheck=null,Tn(e,`ADD_TAGS`)&&(typeof e.ADD_TAGS==`function`?je.tagCheck=e.ADD_TAGS:dn(e.ADD_TAGS)&&(E===Ee&&(E=jn(E)),G(E,e.ADD_TAGS,L))),Tn(e,`ADD_ATTR`)&&(typeof e.ADD_ATTR==`function`?je.attributeCheck=e.ADD_ATTR:dn(e.ADD_ATTR)&&(D===De&&(D=jn(D)),G(D,e.ADD_ATTR,L))),Tn(e,`ADD_FORBID_CONTENTS`)&&dn(e.ADD_FORBID_CONTENTS)&&(M===Ye&&(M=jn(M)),G(M,e.ADD_FORBID_CONTENTS,L)),Ge&&(E[`#text`]=!0),Ie&&G(E,[`html`,`head`,`body`]),E.table&&(G(E,[`tbody`]),delete ke.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!=`function`)throw On(`TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.`);if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!=`function`)throw On(`TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.`);let t=S;S=e.TRUSTED_TYPES_POLICY;try{ae=ue(``)}catch(e){throw S=t,e}}else e.TRUSTED_TYPES_POLICY===null?(S=void 0,ae=``):(S===void 0&&(S=fe()),S&&typeof ae==`string`&&(ae=ue(``)));Qt&&Qt(e),ut=e},pt=G({},[...Ln,...Rn,...zn]),mt=G({},[...Bn,...Vn]),ht=function(e,t,n){return t.namespaceURI===et?e===`svg`:t.namespaceURI===P?e===`svg`&&(n===`annotation-xml`||at[n]):!!pt[e]},gt=function(e,t,n){return t.namespaceURI===et?e===`math`:t.namespaceURI===$e?e===`math`&&I[n]:!!mt[e]},_t=function(e,t,n){return t.namespaceURI===$e&&!I[n]||t.namespaceURI===P&&!at[n]?!1:!mt[e]&&(st[e]||!pt[e])},vt=function(e){let t=ie(e),n=hn(ne(e)),r=te(e),i,a;return r&&x(r)===K.element?(i={namespaceURI:ie(r)},a=hn(ne(r))):(i={namespaceURI:F},a=`template`),nt[t]?t===$e?ht(n,i,a):t===P?gt(n,i,a):t===et?_t(n,i,a):!!(ct===`application/xhtml+xml`&&nt[t]):!1},yt=function(e){cn(t.removed,{element:e});try{te(e).removeChild(e)}catch{if(p(e),!te(e))throw On(`a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place`)}},bt=function(e,t,n){try{m(e,t)}catch{try{e.removeAttribute(n)}catch{}}},xt=function(e){Ct(e);let t=ee(e);t&&an(ln(t),e=>{try{p(e)}catch{}});let n=x(e)===K.element?_(e):null;if(n)for(let t=n.length-1;t>=0;--t){let r=n[t],i=r&&r.name;typeof i==`string`&&bt(e,r,i)}},z=function(e,n,r){if(!r)try{r=n.getAttributeNode(e)}catch{r=null}cn(t.removed,{attribute:r||null,from:n});try{r?m(n,r):n.removeAttribute(e)}catch{try{n.removeAttribute(e)}catch{}}if(e===`is`){if(A||Ve)try{yt(n)}catch{}else try{n.setAttribute(e,``)}catch{}}},St=function(e){let t=_(e);if(t)for(let n=t.length-1;n>=0;--n){let r=t[n],i=r&&r.name;typeof i!=`string`||D[L(i)]||bt(e,r,i)}},B=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0&&arguments[2],r=[e];for(;r.length>0;){let e=r.pop();if(t(e)===!1)continue;if(n&&x(e)===K.element){let t=g(e);It(t)&&r.push(t)}let i=ee(e);if(i)for(let e=i.length-1;e>=0;--e)r.push(i[e])}},Ct=function(e){B(e,e=>{x(e)===K.element&&St(e)})},wt=function(e){let t=[];return B(e,e=>{t.push(e)},!0),t},Tt=function(e,t){let n=fn();an(wt(e),e=>{x(e)===K.element&&pn(n,e)}),an(t,e=>{x(e)===K.element&&!mn(n,e)&&St(e)})},V=function(e,n){let r=!1;return an(t.removed,t=>{t.element&&(r||=t.element===e,Ct(t.element))}),Tt(e,n),r},H=function(e,t){let n=qe,r=null,i=()=>(r||(r=fn(),an(t,e=>{pn(r,e)})),r);for(let t=0;;t++){let r=wt(e),a=[e],o=!1;if(an(r,e=>{x(e)===K.documentFragment?cn(a,e):!o&&!mn(n,e)&&(o=mn(i(),e))}),!o)return;if(t>=8)throw On(`the tree kept changing during in-place sanitization; refusing to return it`);an(a,(t,n)=>{Et(t,n>0,e,i())})}},Et=function(e,t,n,r){let i=jt(e),a;for(;a=i.nextNode();)mn(r,a)&&!mn(qe,a)&&(t&&Lt(w.uponSanitizeShadowNode,a,null),Ut(a,n),Zt(a,n),It(a.content)&&tn(a.content))},Dt=function(e){qe&&pn(qe,e)},Ot=function(e,t){return k?e===`patchsrc`||e===`for`&&t!==`label`&&t!==`output`:!1},kt=function(e){k&&B(e,e=>{let t=x(e);if(t===K.processingInstruction||t===K.comment&&Dn(ir,e.data)){try{p(e)}catch{}return!1}if(t===K.element){let t=e,n=L(ne(e));try{t.hasAttribute&&t.hasAttribute(`patchsrc`)&&t.removeAttribute(`patchsrc`),t.hasAttribute&&t.hasAttribute(`for`)&&Ot(`for`,n)&&t.removeAttribute(`for`)}catch{}}return!0})},At=function(e){let t=null,r=null;if(Be)e=`<remove></remove>`+e;else{let t=_n(e,/^[\r\n\t ]+/);r=t&&t[0]}ct===`application/xhtml+xml`&&F===et&&(e=`<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>`+e+`</body></html>`);let i=S?ue(e):e;if(F===et)try{t=new l().parseFromString(i,ct)}catch{}if(!t||!t.documentElement){t=me.createDocument(F,`template`,null);try{t.documentElement.innerHTML=tt?ae:i}catch{}}let a=t.body||t.documentElement;return e&&r&&a.insertBefore(n.createTextNode(r),a.childNodes[0]||null),F===et?ge.call(t,Ie?`html`:`body`)[0]:Ie?t.documentElement:a},jt=function(e){let t=b?b(e):e.ownerDocument;return he.call(t||e,e,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Mt=function(e){return e=vn(e,ve,` `),e=vn(e,ye,` `),e=vn(e,be,` `),e},Nt=function(e){Pt(e);let t=e.querySelectorAll?.call(e,`template`);t&&an(t,e=>{It(e.content)&&Nt(e.content)})},Pt=function(e){e.normalize();let t=b?b(e):e.ownerDocument,n=he.call(t||e,e,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null),r=n.nextNode();for(;r;)r.data=Mt(r.data),r=n.nextNode()},Ft=function(e){let t=y?y(e):null;return typeof t!=`string`||L(t)!==`form`?!1:typeof e.nodeName!=`string`||typeof e.textContent!=`string`||typeof e.removeChild!=`function`||e.attributes!==_(e)||typeof e.removeAttribute!=`function`||typeof e.removeAttributeNode!=`function`||typeof e.getAttributeNode!=`function`||typeof e.setAttribute!=`function`||typeof e.namespaceURI!=`string`||typeof e.insertBefore!=`function`||typeof e.hasChildNodes!=`function`||e.nodeType!==v(e)||e.childNodes!==ee(e)},It=function(e){if(!v||typeof e!=`object`||!e)return!1;try{return v(e)===K.documentFragment}catch{return!1}},U=function(e){if(!v||typeof e!=`object`||!e)return!1;try{return typeof v(e)==`number`}catch{return!1}};function Lt(e,n,r){e.length!==0&&an(e,e=>{e.call(t,n,r,ut)})}let Rt=function(e,t){return!!(k&&e.hasChildNodes()&&!U(e.firstElementChild)&&Dn(rr,e.textContent)&&Dn(rr,e.innerHTML)||k&&sr[t]&&x(e)===K.element&&ie(e)===et&&(U(e.firstElementChild)||typeof e.textContent==`string`&&Dn(rr,e.textContent))||e.nodeType===K.processingInstruction||k&&e.nodeType===K.comment&&Dn(ir,e.data))},zt=function(e,t){return e instanceof RegExp?Dn(e,t):e instanceof Function&&!!e(t,...[...arguments].slice(2))},Bt=function(e,t,n){if(!ke[t]&&Kt(t)&&zt(Oe.tagNameCheck,t))return!1;if(Ge&&!M[t]&&!M[hn(t)]){let t=te(e),r=ee(e);if(r&&t){let i=r.length;for(let a=i-1;a>=0;--a){let i=e===n?f(r[a],!0):r[a];t.insertBefore(i,h(e))}}}return yt(e),!0},Vt=function(e,t,n,r){return e.length===0?t:t===n||t===r?jn(t):t},Ht=function(e,t){return e===t||te(e)!==null?!1:(Ke&&Ct(e),!0)},Ut=function(e,n){if(Dt(e),Lt(w.beforeSanitizeElements,e,null),Ht(e,n))return!0;if(Ft(e))return yt(e),!0;let r=L(ne(e));if(E=Vt(w.uponSanitizeElement,E,Ee,Re),Lt(w.uponSanitizeElement,e,{tagName:r,allowedTags:E}),Ht(e,n))return!0;if(Rt(e,r))return yt(e),!0;if(ke[r]||!(je.tagCheck instanceof Function&&je.tagCheck(r))&&!E[r]){let t=Bt(e,r,n);return t===!1&&(Lt(w.afterSanitizeElements,e,null),Ht(e,n))?!0:t}if(x(e)===K.element&&!vt(e)||(r===`noscript`||r===`noembed`||r===`noframes`)&&Dn(ar,e.innerHTML))return yt(e),!0;if(O&&e.nodeType===K.text){let n=Mt(e.textContent);e.textContent!==n&&(cn(t.removed,{element:e.cloneNode()}),e.textContent=n)}return Lt(w.afterSanitizeElements,e,null),Ht(e,n)},Wt=function(e,t,r){if(Ae[t]||Ot(t,e)||Ue&&(t===`id`||t===`name`)&&(r in n||r in dt))return!1;let i=D[t]||je.attributeCheck instanceof Function&&je.attributeCheck(t,e);return Ne&&Dn(xe,t)||Me&&Dn(Se,t)?!0:i?Ze[t]||Dn(Te,vn(r,Ce,``))||(t===`src`||t===`xlink:href`||t===`href`)&&e!==`script`&&yn(r,`data:`)===0&&N[e]||Pe&&!Dn(T,vn(r,Ce,``))?!0:!r:Kt(e)&&zt(Oe.tagNameCheck,e)&&zt(Oe.attributeNameCheck,t,e)||t===`is`&&Oe.allowCustomizedBuiltInElements&&zt(Oe.tagNameCheck,r)},Gt=G({},[`annotation-xml`,`color-profile`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`missing-glyph`]),Kt=function(e){return!Gt[hn(e)]&&Dn(we,e)},Jt=function(e,t,n,r){if(S&&typeof u==`object`&&typeof u.getAttributeType==`function`&&!n)switch(u.getAttributeType(e,t)){case`TrustedHTML`:return ue(r);case`TrustedScriptURL`:return de(r)}return r},Yt=function(e,t,n,r){try{return n?e.setAttributeNS(n,t,r):e.setAttribute(t,r),!Ft(e)||(yt(e),!1)}catch{return z(t,e),!1}},Xt=function(e,t){return k&&Dn(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,t)?!0:hn(e)===`attributename`&&_n(t,`href`)!==null},Zt=function(e,n){if(Lt(w.beforeSanitizeAttributes,e,null),Ht(e,n))return;let r=e.attributes;if(!r||Ft(e))return;D=Vt(w.uponSanitizeAttribute,D,De,ze);let i={attrName:``,attrValue:``,keepAttr:!0,allowedAttributes:D,forceKeepAttr:void 0},a=r.length,o=L(e.nodeName);for(;a--;){let n=r[a],s=n.name,c=n.namespaceURI,l=n.value,u=L(s),d=l,f=s===`value`?d:bn(d),p=!1;i.attrName=u,i.attrValue=f,i.keepAttr=!0,i.forceKeepAttr=void 0,Lt(w.uponSanitizeAttribute,e,i),f=i.attrValue,We&&(u===`id`||u===`name`)&&yn(f,j)!==0&&(z(s,e,n),f=j+f,p=!0),Xt(s,f)?z(s,e,n):i.forceKeepAttr||(i.keepAttr?!Fe&&Dn(or,f)?z(s,e,n):(O&&(f=Mt(f)),Wt(o,u,f)?(f=Jt(o,u,c,f),f!==d&&Yt(e,s,c,f)&&p&&sn(t.removed)):z(s,e,n)):z(s,e,n))}Lt(w.afterSanitizeAttributes,e,null),Ht(e,n)},tn=function(e){let t=null,n=jt(e);for(Lt(w.beforeSanitizeShadowDOM,e,null);t=n.nextNode();)if(Lt(w.uponSanitizeShadowNode,t,null),Ut(t,e),Zt(t,e),It(t.content)&&tn(t.content),x(t)===K.element){let e=g(t);It(e)&&(nn(e),tn(e))}O&&Pt(e),Lt(w.afterSanitizeShadowDOM,e,null)},nn=function(e){let t=[{node:e,shadow:null}];for(;t.length>0;){let e=t.pop();if(e.shadow){tn(e.shadow);continue}let n=e.node,r=x(n)===K.element,i=ee(n);if(i)for(let e=i.length-1;e>=0;--e)t.push({node:i[e],shadow:null});if(r){let e=y?y(n):null;if(typeof e==`string`&&L(e)===`template`){let e=n.content;It(e)&&t.push({node:e,shadow:null})}}if(r){let e=g(n);It(e)&&t.push({node:null,shadow:e},{node:e,shadow:null})}}};return t.sanitize=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=null,a=null,o=null,s=null;if(tt=!e,tt&&(e=`<!-->`),typeof e!=`string`&&!U(e)&&(e=Mn(e),typeof e!=`string`))throw On(`dirty is not a string, aborting`);if(!t.isSupported)return e;Le?(E=Re,D=ze):R(n),(w.uponSanitizeElement.length>0||w.uponSanitizeAttribute.length>0)&&(E=jn(E)),w.uponSanitizeAttribute.length>0&&(D=jn(D)),t.removed=[];let c=Ke&&typeof e!=`string`&&U(e),l=[],u=qe;if(c){kt(e);let t=ne(e);if(typeof t==`string`){let n=L(t);if(!E[n]||ke[n])throw xt(e),On(`root node is forbidden and cannot be sanitized in-place`)}if(Ft(e))throw xt(e),On(`root node is clobbered and cannot be sanitized in-place`);l=wt(e),qe=fn()}else if(U(e))i=At(`<!---->`),a=i.ownerDocument.importNode(e,!0),a.nodeType===K.element&&a.nodeName===`BODY`||a.nodeName===`HTML`?i=a:i.appendChild(a),nn(i);else{if(!A&&!O&&!Ie&&e.indexOf(`<`)===-1)return S&&He?ue(e):e;if(i=At(e),!i)return A?null:He?ae:``}i&&Be&&yt(i.firstChild);let d=c?e:i;try{c&&nn(e);let t=jt(d);for(;o=t.nextNode();)Ut(o,d),Zt(o,d),It(o.content)&&tn(o.content);c&&H(e,l)}catch(t){throw c&&(xt(e),V(e,l)),t}finally{qe=u}if(c){if(V(e,l))throw On(`a node selected for removal could not be safely returned; refusing to sanitize in place`);return O&&Nt(e),e}if(A){if(O&&Nt(i),Ve)for(s=C.call(i.ownerDocument);i.firstChild;)s.appendChild(i.firstChild);else s=i;return(D.shadowroot||D.shadowrootmode)&&(s=_e.call(r,s,!0)),s}let f=Ie?i.outerHTML:i.innerHTML;return Ie&&E[`!doctype`]&&i.ownerDocument&&i.ownerDocument.doctype&&i.ownerDocument.doctype.name&&Dn(tr,i.ownerDocument.doctype.name)&&(f=`<!DOCTYPE `+i.ownerDocument.doctype.name+`>
`+f),O&&(f=Mt(f)),S&&He?ue(f):f},t.setConfig=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};R(e),Le=!0,Re=E,ze=D},t.clearConfig=function(){ut=null,Le=!1,Re=null,ze=null,S=oe,ae=``},t.isValidAttribute=function(e,t,n){ut||R({});let r=L(e),i=L(t);return typeof n==`string`&&(Xt(t,n)||!Fe&&Dn(or,n))?!1:Wt(r,i,n)},t.addHook=function(e,t){typeof t==`function`&&Tn(w,e)&&cn(w[e],t)},t.removeHook=function(e,t){if(Tn(w,e)){if(t!==void 0){let n=on(w[e],t);return n===-1?void 0:un(w[e],n,1)[0]}return sn(w[e])}},t.removeHooks=function(e){Tn(w,e)&&(w[e]=[])},t.removeAllHooks=function(){w=ur()},t}var mr=pr();function hr(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var gr=hr();function _r(e){gr=e}var vr={exec:()=>null};function yr(e){let t=[];return n=>{let r=Math.max(0,Math.min(3,n-1)),i=t[r];return i||(i=e(r),t[r]=i),i}}function q(e,t=``){let n=typeof e==`string`?e:e.source,r={replace:(e,t)=>{let i=typeof t==`string`?t:t.source;return i=i.replace(J.caret,`$1`),n=n.replace(e,i),r},getRegex:()=>new RegExp(n,t)};return r}var br=((e=``)=>{try{return!!RegExp(`(?<=1)(?<!1)`+e)}catch{return!1}})(),J={codeRemoveIndent:/^(?: {0,3}\t| {1,4})/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,endingSpaceTabChar:/[ \t]$/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,leadingSpaceTab:/^[ \t]+/,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+)[ \t]*)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,blockquoteMarkerWhitespace:/^( {0,3}>)([ \t]+)/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\][ \t]+\S/,listReplaceTask:/^\[[ xX]\][ \t]+/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,numericCharacterReference:/&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));/,numericCharacterReferenceOrAmpersand:/&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:yr(e=>RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:yr(e=>RegExp(`^ {0,${e}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)),fencesBeginRegex:yr(e=>RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),headingBeginRegex:yr(e=>RegExp(`^ {0,${e}}#{1,6}(?:\\s|$)`)),pedanticHeadingBeginRegex:yr(e=>RegExp(`^ {0,${e}}#`)),htmlBeginRegex:yr(e=>RegExp(`^ {0,${e}}(?:</?(?:${Fr})(?: +|$|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`,`i`)),blockquoteBeginRegex:yr(e=>RegExp(`^ {0,${e}}>`))},xr=/^(?:[ \t]*(?:\n|$))+/,Sr=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Cr=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}(?:(?=`)\1`*|(?=~)\1~*) *(?=\n|$)|$)/,wr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Tr=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Er=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,Dr=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+)[ \t]*(?:\n+|$)/,Or=q(Dr).replace(/bull/g,Er).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/hr/g,/ {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,``).getRegex(),kr=q(Dr).replace(/bull/g,Er).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/hr/g,/ {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ar=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/,jr=/^[^\n]+/,Mr=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\\n]|\n(?![ \t]*\n))+/,Nr=q(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace(`label`,Mr).replace(`title`,/(?:"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\\n]|\n(?!\n))*'|\((?:\\[\s\S]|[^()\\])*\))/).getRegex(),Pr=q(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,Er).getRegex(),Fr=`address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul`,Ir=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Lr=q(`^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?:[ \\t]+|\\n|/?>|$)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!(?:script|pre|style|textarea)(?![a-z0-9-]))([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))`,`i`).replace(`comment`,Ir).replace(`tag`,Fr).replace(`attribute`,/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Rr=e=>q(Ar).replace(`hr`,wr).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,e).replace(`html`,` {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`).replace(`tag`,Fr).getRegex(),zr=Rr(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/),Br=Rr(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/),Vr={blockquote:q(/^( {0,3}> ?(?:(?![ \t]*(?:\n|$))(paragraph)|[^\n]*)(?:\n|$))+/).replace(`paragraph`,Br).getRegex(),code:Sr,def:Nr,fences:Cr,heading:Tr,hr:wr,html:Lr,lheading:Or,list:Pr,newline:xr,paragraph:zr,table:vr,text:jr},Hr=q(`^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)`).replace(`hr`,wr).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`blockquote`,` {0,3}>`).replace(`code`,`(?: {4}| {0,3}	)[^\\n]`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]`).replace(`html`,` {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`).replace(`tag`,Fr).getRegex(),Ur={...Vr,lheading:kr,table:Hr,paragraph:q(Ar).replace(`hr`,wr).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`table`,Hr).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]`).replace(`html`,` {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`).replace(`tag`,Fr).getRegex()},Wr={...Vr,html:q(`^ *(?:comment(?: *\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1>(?: *\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?>(?: *\\n{2,}|\\s*$))`).replace(`comment`,Ir).replace(/tag/g,`(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b`).getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:vr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:q(Ar).replace(`hr`,wr).replace(`heading`,` *#{1,6} *[^
]`).replace(`lheading`,Or).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`|fences`,``).replace(`|list`,``).replace(`|html`,``).replace(`|tag`,``).getRegex()},Gr=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Kr=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,qr=/^( {2,}|\\)\n(?!\s*$)[ \t]*/,Jr=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Yr=/[\p{P}\p{S}]/u,Xr=/[\s\p{P}\p{S}]/u,Zr=/[^\s\p{P}\p{S}]/u,Qr=q(/^((?![*_])punctSpace)/,`u`).replace(/punctSpace/g,Xr).getRegex(),$r=/[\p{Pi}\p{Ps}"']/u,ei=/(?!~)[\p{P}\p{S}]/u,ti=/(?!~)[\s\p{P}\p{S}]/u,ni=/(?:[^\s\p{P}\p{S}]|~)/u,ri=q(/link|precode-code|html/,`g`).replace(`link`,/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace(`precode-`,br?"(?<!`)()":"(^^|[^`])").replace(`code`,/(?<b>`+)[^`]+\k<b>(?!`)/).replace(`html`,/<(?! )[^<>]*?>/).getRegex(),ii=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,ai=q(ii,`u`).replace(/punct/g,Yr).getRegex(),oi=q(ii,`u`).replace(/punct/g,ei).getRegex(),si=q(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/,`u`).replace(/openQuote/g,$r).replace(/punct/g,Yr).getRegex(),ci=`^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)`,li=q(ci,`gu`).replace(/notPunctSpace/g,Zr).replace(/punctSpace/g,Xr).replace(/punct/g,Yr).getRegex(),ui=q(ci,`gu`).replace(/notPunctSpace/g,ni).replace(/punctSpace/g,ti).replace(/punct/g,ei).getRegex(),di=q(`^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,Zr).replace(/punctSpace/g,Xr).replace(/punct/g,Yr).getRegex(),fi=q(`^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)`,`gu`).replace(/notPunctSpace/g,Zr).replace(/punctSpace/g,Xr).replace(/punct/g,Yr).getRegex(),pi=q(`^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,Zr).replace(/punctSpace/g,Xr).replace(/punct/g,Yr).getRegex(),mi=q(/^~~?(?:((?!~)punct)|[^\s~])/,`u`).replace(/punct/g,Yr).getRegex(),hi=q(`^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,Zr).replace(/punctSpace/g,Xr).replace(/punct/g,Yr).getRegex(),gi=q(/\\(punct)/,`gu`).replace(/punct/g,Yr).getRegex(),_i=q(/(`+)(?:[^`]|[^`][\s\S]*?[^`])\1(?!`)|`+|\\(punct)/,`gu`).replace(/punct/g,Yr).getRegex(),vi=q(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace(`scheme`,/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace(`email`,/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),yi=q(Ir).replace(`(?:-->|$)`,`-->`).getRegex(),bi=q(`^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>`).replace(`comment`,yi).replace(`attribute`,/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),xi=/\[(?:\\[\s\S]|[^\[\]\\])*\]/,Si=q(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace(`brackets`,xi).getRegex(),Ci=q(/^!?\[(label)\]\([ \t\n]*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?[ \t\n]*\)/).replace(`label`,Si).replace(`href`,/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace(`title`,/"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|\((?:\\[\s\S]|[^)\\])*\)/).getRegex(),wi=q(/^!?\[(label)\]\[(ref)\]/).replace(`label`,Si).replace(`ref`,Mr).getRegex(),Ti=q(/^!?\[(ref)\](?:\[\])?/).replace(`ref`,Mr).getRegex(),Ei=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/,Di=q(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace(`brackets`,xi).getRegex(),Oi=q(`reflink|nolink(?!\\()`,`g`).replace(`reflink`,q(/^!?\[(label)\]\[(ref)\]/).replace(`label`,Di).replace(`ref`,Ei).getRegex()).replace(`nolink`,q(/^!?\[(ref)\](?:\[\])?/).replace(`ref`,Ei).getRegex()).getRegex(),ki=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ai=q(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g,/[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),ji={_backpedal:vr,anyPunctuation:gi,anyPunctuationOutsideCode:_i,autolink:vi,blockSkip:ri,br:qr,code:Kr,del:vr,delLDelim:vr,delRDelim:vr,emStrongLDelim:ai,emStrongRDelimAst:li,emStrongRDelimUnd:fi,escape:Gr,link:Ci,nolink:Ti,punctuation:Qr,reflink:wi,reflinkSearch:Oi,tag:bi,text:Jr,url:vr},Mi={...ji,emStrongLDelim:si,emStrongRDelimAst:di,emStrongRDelimUnd:pi,link:q(/^!?\[(label)\]\((.*?)\)/).replace(`label`,Si).getRegex(),reflink:q(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace(`label`,Si).getRegex()},Ni={...ji,emStrongRDelimAst:ui,emStrongLDelim:oi,delLDelim:mi,delRDelim:hi,url:q(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace(`emailProtocol`,Ai).replace(`protocol`,ki).replace(`email`,/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:q(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|wwwStart|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace(`protocol`,ki).replace(/emailProtocol/g,/(?:mailto|xmpp):/).replace(`wwwStart`,br?`(?<![^\\s*_~(])www\\.`:`www\\.`).getRegex()},Pi={...Ni,br:q(qr).replace(`{2,}`,`*`).getRegex(),text:q(Ni.text).replace(`\\b_`,`\\b_| {2,}\\n`).replace(/\{2,\}/g,`*`).getRegex()},Fi={normal:Vr,gfm:Ur,pedantic:Wr},Ii={normal:ji,gfm:Ni,breaks:Pi,pedantic:Mi},Li={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},Ri=e=>Li[e];function zi(e,t){if(t){if(J.escapeTest.test(e))return e.replace(J.escapeReplace,Ri)}else if(J.escapeTestNoEncode.test(e))return e.replace(J.escapeReplaceNoEncode,Ri);return e}function Bi(e){return J.numericCharacterReference.test(e)?e.replace(J.numericCharacterReferenceOrAmpersand,(e,t,n)=>{if(t===void 0&&n===void 0)return`&amp;`;let r=t===void 0?Number.parseInt(n,16):Number.parseInt(t,10);return r===0||r>1114111||r>=55296&&r<=57343?`�`:r===38?`&amp;`:String.fromCodePoint(r)}):e}function Vi(e){try{e=encodeURI(e).replace(J.percentDecode,`%`)}catch{return null}return e}function Hi(e,t){let n=e.replace(J.findPipe,(e,t,n)=>{let r=!1,i=t;for(;--i>=0&&n[i]===`\\`;)r=!r;return r?`|`:` |`}).split(J.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t){if(n.length>t)n.splice(t);else for(;n.length<t;)n.push(``)}for(;r<n.length;r++)n[r]=n[r].trim().replace(J.slashPipe,`|`);return n}function Ui(e,t,n){let r=e.length;if(r===0)return``;let i=0;for(;i<r;){let a=e.charAt(r-i-1);if(a===t&&!n)i++;else if(a!==t&&n)i++;else break}return e.slice(0,r-i)}function Wi(e){let t=e.split(`
`),n=t.length-1;for(;n>=0&&J.blankLine.test(t[n]);)n--;return t.length-n<=2?e:t.slice(0,n+1).join(`
`)}function Gi(e){return e.trim().replace(J.multipleSpaceGlobal,` `).toLowerCase().toUpperCase().toLowerCase()}function Ki(e,t){if(e.indexOf(t[0])===-1&&e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]===`\\`)r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}var qi=new WeakMap;function Ji(e){let t={"*":-1,_:-1},n=-1,r=e.length;for(let i=0;i<r;i++){let a=e[i];if(a!==`*`&&a!==`_`&&a!==`~`)continue;let o=i===0?`
`:e[i-1],s=i+1;for(;s<r&&e[s]===a;)s++;o!==` `&&o!==`	`&&o!==`
`&&o!==`\r`&&o!==`\f`&&(a===`~`?n=i:t[a]=i),i=s-1}return{maskedSrc:e,lastPossibleEmStrongCloserIndex:t,lastPossibleDelCloserIndex:n}}function Yi(e,t){let n=Ji(t),r=qi.get(e);r?r.push(n):qi.set(e,[n])}function Xi(e){let t=qi.get(e);t&&(t.pop(),t.length===0&&qi.delete(e))}function Zi(e,t,n){let r=qi.get(e)?.at(-1);return r&&r.maskedSrc===t?r.lastPossibleEmStrongCloserIndex[n]:Ji(t).lastPossibleEmStrongCloserIndex[n]}function Qi(e,t){let n=qi.get(e)?.at(-1);return n&&n.maskedSrc===t?n.lastPossibleDelCloserIndex:Ji(t).lastPossibleDelCloserIndex}function $i(e,t=0){let n=t,r=``;for(let t of e)if(t===`	`){let e=4-n%4;r+=` `.repeat(e),n+=e}else r+=t,n++;return r}function ea(e,t,n,r,i){let a=t.href,o=t.title||null,s=e[1].replace(i.other.outputLinkReplace,`$1`),c=e[0].charAt(0)===`!`,l=r.state.inLink,u=r.state.linkEmitted,d=r.state.inRawBlock;r.state.inLink=!0,r.state.linkEmitted=!1;let f=r.inlineTokens(s),p=r.state.linkEmitted;if(r.state.linkEmitted=u,r.state.inLink=l,!c){if(p){r.state.inRawBlock=d;return}r.state.linkEmitted=!0}return{type:c?`image`:`link`,raw:n,href:a,title:o,text:s,tokens:f}}function ta(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let i=r[1];return t.split(`
`).map(e=>{let t=e.match(n.other.beginningSpace);if(t===null)return e;let[r]=t;return e.slice(Math.min(r.length,i.length))}).join(`
`)}function na(e,t,n,r){if(!t.includes(`<`))return!1;for(let i=0;i<t.length;i++){if(t[i]===`\\`){i++;continue}if(t[i]==="`"){let e=r.inline.code.exec(t.slice(i));if(e){i+=e[0].length-1;continue}}if(t[i]!==`<`)continue;let a=e.slice(n+i),o=r.inline.tag.exec(a)||r.inline.autolink.exec(a);if(o){if(o[0].length>t.length-i)return!0;i+=o[0].length-1}}return!1}var ra=class{options;rules;lexer;constructor(e){this.options=e||gr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:`space`,raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=this.options.pedantic?t[0]:Wi(t[0]);return{type:`code`,raw:e,codeBlockStyle:`indented`,text:e.replace(this.rules.other.codeRemoveIndent,``)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],n=ta(e,t[3]||``,this.rules);return{type:`code`,raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,`$1`):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=Ui(e,`#`);(this.options.pedantic||!t||this.rules.other.endingSpaceTabChar.test(t))&&(e=t.trim())}return{type:`heading`,raw:Ui(t[0],`
`),depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:`hr`,raw:Ui(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=Ui(t[0],`
`).split(`
`),n=``,r=``,i=[];for(;e.length>0;){let t=!1,a=[],o=0;for(;o<e.length;o++)if(this.rules.other.blockquoteStart.test(e[o]))a.push(e[o]),t=!0;else if(!t)a.push(e[o]);else break;e=e.slice(o);let s=a.join(`
`),c=s.replace(this.rules.other.blockquoteMarkerWhitespace,(e,t,n)=>t+$i(n,t.length)).replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,``);n=n?`${n}
${s}`:s,r=r?`${r}
${c}`:c;let l=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(c,i,!0),this.lexer.state.top=l,e.length===0)break;let u=i.at(-1);if(u?.type===`code`||u?.type===`heading`||u?.type===`hr`||u?.type===`html`||u?.type===`table`)break;if(u?.type===`blockquote`){let t=u,a=e.join(`
`),o=t.raw+`
`+a.replace(this.rules.other.blockquoteSetextReplace2,``),s=this.blockquote(o);i[i.length-1]=s;let c=o.substring(s.raw.length).replace(/^\n/,``),l=c?c.split(`
`).length:0,d=l?e.slice(0,-l):e;if(d.length>0&&(n=`${n}
${d.join(`
`)}`),r=r.substring(0,r.length-t.text.length)+s.text,e=e.slice(d.length),e.length>0&&this.rules.other.blockquoteStart.test(e[0]))continue;break}if(u?.type===`list`){let t=u,a=t.raw+`
`+e.join(`
`),o=this.list(a);i[i.length-1]=o;let s=o.raw.length>t.raw.length?a.slice(t.raw.length+1,o.raw.length).split(`
`).length:0;if(s>0){let t=e.slice(0,s).join(`
`);n=`${n}
${t}`,r=`${r}
${t}`}e=e.slice(s)}}return{type:`blockquote`,raw:n,tokens:i,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=e,r=()=>n.length-e.length,i=t[1].trim(),a=i.length>1,o={type:`list`,raw:``,ordered:a,start:a?+i.slice(0,-1):``,loose:!1,items:[]};i=a?`\\d{1,9}\\${i.slice(-1)}`:`\\${i}`,this.options.pedantic&&(i=a?i:`[*+-]`);let s=this.rules.other.listItemRegex(i),c=!1;for(;e;){let i=!1,a=``;if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;let l=r();e=e.substring(t[0].length);let u=t[2].split(`
`,1)[0],d=t[1].length,f=this.options.pedantic?$i(u,d):u.replace(this.rules.other.leadingSpaceTab,e=>$i(e,d)),p=e.split(`
`,1)[0],m=!f.trim(),h=0;if(this.options.pedantic?(h=2,a=f.trimStart()):m?h=d+1:(h=f.search(this.rules.other.nonSpaceChar),h=h>4?1:h,a=f.slice(h),h+=d),m&&this.rules.other.blankLine.test(p)&&(e=e.substring(p.length+1),i=!0),!i){let t=this.rules.other.nextBulletRegex(h),n=this.rules.other.hrRegex(h),r=this.rules.other.fencesBeginRegex(h),i=this.options.pedantic?this.rules.other.pedanticHeadingBeginRegex(h):this.rules.other.headingBeginRegex(h),o=this.rules.other.htmlBeginRegex(h),s=this.rules.other.blockquoteBeginRegex(h);for(;e;){let c=e.split(`
`,1)[0],l;if(p=c,this.options.pedantic?(p=p.replace(this.rules.other.listReplaceNesting,`  `),l=p):l=p.replace(this.rules.other.leadingSpaceTab,e=>$i(e)),r.test(p)||i.test(p)||o.test(p)||s.test(p)||t.test(p)||n.test(p))break;if(l.search(this.rules.other.nonSpaceChar)>=h||!p.trim())a+=`
`+l.slice(h);else{if(m||f.replace(this.rules.other.tabCharGlobal,`    `).search(this.rules.other.nonSpaceChar)>=4||r.test(f)||i.test(f)||o.test(f)||n.test(f))break;let e=!this.options.pedantic&&/^ {0,3}(?:=+|-+) *$/.test(p)&&this.rules.block.lheading.test(`${f}
${p}`)?`    ${l.replace(/^ {0,3}/,``)}`:p;a+=`
`+e}m=!p.trim(),e=e.substring(c.length+1),f=l.slice(h)}}let ee=n.slice(l,r());o.loose||(c?o.loose=!0:this.rules.other.doubleBlankLine.test(ee)&&(c=!0)),o.items.push({type:`list_item`,raw:ee,task:!!this.options.gfm&&this.rules.other.listIsTask.test(a),loose:!1,text:a,tokens:[]})}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=n.slice(0,r()).trimEnd();for(let e of o.items)if(this.lexer.state.top=!1,e.tokens=this.lexer.blockTokens(e.text,[]),!o.loose){let t=e.tokens.filter(e=>e.type===`space`);o.loose=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw))}for(let e of o.items){let t=e.tokens[0];if(e.task&&(t?.type===`text`||t?.type===`paragraph`)){e.text=e.text.replace(this.rules.other.listReplaceTask,``),t.raw=t.raw.replace(this.rules.other.listReplaceTask,``),t.text=t.text.replace(this.rules.other.listReplaceTask,``);for(let e=this.lexer.inlineQueue.length-1;e>=0;e--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)){this.lexer.inlineQueue[e].src=this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask,``);break}let n=this.rules.other.listTaskCheckbox.exec(e.raw);if(n){let t={type:`checkbox`,raw:n[0]+` `,checked:n[0]!==`[ ]`};e.checked=t.checked,o.loose?e.tokens[0]&&[`paragraph`,`text`].includes(e.tokens[0].type)&&`tokens`in e.tokens[0]&&e.tokens[0].tokens?(e.tokens[0].raw=t.raw+e.tokens[0].raw,e.tokens[0].text=t.raw+e.tokens[0].text,e.tokens[0].tokens.unshift(t)):e.tokens.unshift({type:`paragraph`,raw:t.raw,text:t.raw,tokens:[t]}):e.tokens.unshift(t)}}else e.task&&=!1}if(o.loose)for(let e of o.items){e.loose=!0;for(let t of e.tokens)t.type===`text`&&(t.type=`paragraph`)}return o}}html(e){let t=this.rules.block.html.exec(e);if(t){let e=Wi(t[0]);return{type:`html`,block:!0,raw:e,pre:t[1]===`pre`||t[1]===`script`||t[1]===`style`,text:e}}}def(e){let t=this.rules.block.def.exec(e);if(t){if(!this.rules.other.startAngleBracket.test(t[2])&&Ki(t[2],`()`)!==-1)return;let e=Gi(t[1]),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,`$1`).replace(this.rules.inline.anyPunctuation,`$1`):``,r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,`$1`):t[3];return{type:`def`,tag:e,raw:Ui(t[0],`
`),href:n,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Hi(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,``).split(`|`),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,``).split(`
`):[],a={type:`table`,raw:Ui(t[0],`
`),header:[],align:[],rows:[]};if(n.length===r.length){for(let e of r)this.rules.other.tableAlignRight.test(e)?a.align.push(`right`):this.rules.other.tableAlignCenter.test(e)?a.align.push(`center`):this.rules.other.tableAlignLeft.test(e)?a.align.push(`left`):a.align.push(null);for(let e=0;e<n.length;e++)a.header.push({text:n[e],tokens:this.lexer.inline(n[e]),header:!0,align:a.align[e]});for(let e of i)a.rows.push(Hi(e,a.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:a.align[t]})));return a}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let e=t[1].trim();return{type:`heading`,raw:Ui(t[0],`
`),depth:t[2].charAt(0)===`=`?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:`paragraph`,raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:`text`,raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:`escape`,raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:`html`,raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){if(this.lexer.state.linkParenPossible===!1)return;let t=this.rules.inline.link.exec(e);if(t){let n=t[0].charAt(0)===`!`?2:1;if(!this.options.pedantic&&na(e,t[1],n,this.rules))return;let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let e=Ui(r.slice(0,-1),`\\`);if((r.length-e.length)%2==0)return}else{let e=Ki(t[2],`()`);if(e===-2)return;if(e>-1){let n=(t[0].indexOf(`!`)===0?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,n).trim(),t[3]=``}}let i=Ui(t[0].slice(0,-1),`\\`);if((t[0].length-i.length)%2==0)return;let a=t[2],o=``;if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(a);e&&(a=e[1],o=e[3])}else o=t[3]?t[3].slice(1,-1):``;return a=a.trim(),this.rules.other.startAngleBracket.test(a)&&(a=this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?a.slice(1):a.slice(1,-1)),ea(t,{href:a&&a.replace(this.rules.inline.anyPunctuation,`$1`),title:o&&o.replace(this.rules.inline.anyPunctuation,`$1`)},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=n[0].charAt(0)===`!`?2:1;if(!this.options.pedantic&&na(e,n[1],r,this.rules))return;let i=t[Gi(n[2]||n[1])];if(!i){let e=n[0].charAt(0);return{type:`text`,raw:e,text:e}}return ea(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=``){let r=this.rules.inline.emStrongLDelim.exec(e);if(!r||!r[1]&&!r[2]&&!r[3]&&!r[4])return;let i=r[0][0],a=n===i,o=t.length-e.length,s=o;for(;!this.options.pedantic&&s>0&&t[s-1]===i;)s--;let c=[...t.slice(Math.max(0,s-2),s)].at(-1)??``,l=c===`*`||c===`_`||!!this.rules.inline.punctuation.exec(c);s<o&&(n=c);let u=s<o?l:!!this.rules.inline.punctuation.exec(n);if(r[4]&&n.match(this.rules.other.unicodeAlphaNumeric))return;let d=r[1]||r[3]||``;if(!d||!n||u){let n=[...r[0]].length-1,u,f,p=n,m=0,h=o-s+n,ee=!this.options.pedantic&&!!c.trim()&&(!!d||i===`*`&&!l);if(i!==`*`&&i!==`_`)return;let te=i===`*`?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd,g=Zi(this,t,i),_=t.length-e.length+n;if(g<_)return;t=t.slice(-1*e.length+n);let v=g-_;for(te.lastIndex=0;(r=te.exec(t))!==null&&!(r.index>v);){if(u=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!u)continue;if(f=[...u].length,r[3]||r[4]){p+=f;continue}if(r[5]||r[6]||ee){if(a&&(r[5]||r[6]))break;if(h%3&&!((h+f)%3)){m+=f;continue}}if(p-=f,p>0)continue;f=Math.min(f,f+p+m);let t=[...r[0]][0].length,i=e.slice(0,n+r.index+t+f);if(Math.min(n,f)%2){let e=i.slice(1,-1);return{type:`em`,raw:i,text:e,tokens:this.lexer.inlineTokens(e)}}let o=i.slice(2,-2);return{type:`strong`,raw:i,text:o,tokens:this.lexer.inlineTokens(o)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal,` `),n=this.rules.other.nonSpaceChar.test(e),r=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return n&&r&&(e=e.substring(1,e.length-1)),{type:`codespan`,raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:`br`,raw:t[0]}}del(e,t,n=``){let r=this.rules.inline.delLDelim.exec(e);if(r&&(!r[1]||!n||this.rules.inline.punctuation.exec(n))){let n=[...r[0]].length-1,i,a,o=n,s=this.rules.inline.delRDelim,c=Qi(this,t),l=t.length-e.length+n;if(c<l)return;t=t.slice(-1*e.length+n);let u=c-l;for(s.lastIndex=0;(r=s.exec(t))!==null&&!(r.index>u);){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i||(a=[...i].length,a!==n))continue;if(r[3]||r[4]){o+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o);let t=[...r[0]][0].length,s=e.slice(0,n+r.index+t+a),c=s.slice(n,-n);return{type:`del`,raw:s,text:c,tokens:this.lexer.inlineTokens(c)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,n;return t[2]===`@`?(e=t[1],n=`mailto:`+e):(e=t[1],n=e),{type:`link`,raw:t[0],text:e,href:n,autolink:!0,tokens:[{type:`text`,raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,n;if(t[2]===`@`)e=t[0],n=`mailto:`+e;else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??``;while(r!==t[0]);e=t[0],n=t[1]===`www.`?`http://`+t[0]:t[0]}return{type:`link`,raw:t[0],text:e,href:n,autolink:!0,tokens:[{type:`text`,raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:`text`,raw:t[0],text:e?t[0]:Bi(t[0]),escaped:e}}}},ia=class e{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||gr,this.options.tokenizer=this.options.tokenizer||new ra,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,linkEmitted:!1,linkParenPossible:!0,top:!0};let t={other:J,block:Fi.normal,inline:Ii.normal};this.options.pedantic?(t.block=Fi.pedantic,t.inline=Ii.pedantic):this.options.gfm&&(t.block=Fi.gfm,t.inline=this.options.breaks?Ii.breaks:Ii.gfm),this.tokenizer.rules=t}static get rules(){return{block:Fi,inline:Ii}}static lex(t,n){return new e(n).lex(t)}static lexInline(t,n){return new e(n).inlineTokens(t)}lex(e){e=e.replace(J.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.state.inRawBlock=!1,this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(J.tabCharGlobal,`    `).replace(J.spaceLine,``));let r=1/0;for(;e;){if(e.length<r)r=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}let i;if(this.options.extensions?.block?.some(n=>(i=n.call({lexer:this},e,t))?(e=e.substring(i.raw.length),t.push(i),!0):!1))continue;if(i=this.tokenizer.space(e)){e=e.substring(i.raw.length);let n=t.at(-1);i.raw.length===1&&n!==void 0?n.raw+=`
`:t.push(i);continue}if(i=this.tokenizer.code(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.text,this.inlineQueue.at(-1).src=n.text):t.push(i);continue}if((i=this.tokenizer.fences(e))||(i=this.tokenizer.heading(e))||(i=this.tokenizer.hr(e))||(i=this.tokenizer.blockquote(e))||(i=this.tokenizer.list(e))||(i=this.tokenizer.html(e))){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.def(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.raw,this.inlineQueue.at(-1).src=n.text):(this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title}),t.push(i));continue}if((i=this.tokenizer.table(e))||(i=this.tokenizer.lheading(e))){e=e.substring(i.raw.length),t.push(i);continue}let a=e;if(this.options.extensions?.startBlock){let t=1/0,n=e.slice(1),r;this.options.extensions.startBlock.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(a=e.substring(0,t+1))}if(this.state.top&&(i=this.tokenizer.paragraph(a))){let r=t.at(-1);n&&r?.type===`paragraph`?(r.raw+=(r.raw.endsWith(`
`)?``:`
`)+i.raw,r.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):t.push(i),n=a.length!==e.length,e=e.substring(i.raw.length)}else if(i=this.tokenizer.text(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):t.push(i)}else if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}linkInText(e){if(!e.includes(`[`))return!1;let t=this.tokenizer.rules.inline.link;for(let n of e.matchAll(this.tokenizer.rules.inline.blockSkip))if(t.test(n[0])&&e.charAt(n.index-1)!==`!`)return!0;for(let t of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)){let e=t[0],n=e.lastIndexOf(`[`);if(e.charAt(0)!==`!`&&Object.hasOwn(this.tokens.links,Gi(e.slice(n+1,-1)))&&!(n>1&&this.linkInText(e.slice(1,n-1))))return!0}return!1}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let n=this.state.linkParenPossible;this.state.linkParenPossible=n&&e.includes(`)`);try{return this.#e(e,t)}finally{this.state.linkParenPossible=n}}#e(e,t){let n=e.includes(`*`)||e.includes(`_`)||e.includes(`~`)||this.options.hooks?.emStrongMask||this.tokenizer.emStrong!==ra.prototype.emStrong||this.tokenizer.del!==ra.prototype.del?this.#n(e):e;Yi(this.tokenizer,n);try{return this.#t(e,n,t)}finally{Xi(this.tokenizer)}}#t(e,t,n){let r=!1,i=``,a=1/0;for(;e;){if(e.length<a)a=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}r||(i=``),r=!1;let o;if(this.options.extensions?.inline?.some(t=>(o=t.call({lexer:this},e,n))?(e=e.substring(o.raw.length),n.push(o),!0):!1))continue;if((o=this.tokenizer.escape(e))||(o=this.tokenizer.tag(e))||(o=this.tokenizer.link(e))){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length);let t=n.at(-1);o.type===`text`&&t?.type===`text`?(t.raw+=o.raw,t.text+=o.text):n.push(o);continue}if((o=this.tokenizer.emStrong(e,t,i))||(o=this.tokenizer.codespan(e))||(o=this.tokenizer.br(e))||(o=this.tokenizer.del(e,t,i))||(o=this.tokenizer.autolink(e))||!this.state.inLink&&(o=this.tokenizer.url(e))){e=e.substring(o.raw.length),n.push(o);continue}let s=e;if(this.options.extensions?.startInline){let t=1/0,n=e.slice(1),r;this.options.extensions.startInline.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(s=e.substring(0,t+1))}if(o=this.tokenizer.inlineText(s)){e=e.substring(o.raw.length),o.raw.slice(-1)!==`_`&&(i=o.raw.slice(-1)),r=!0;let t=n.at(-1);t?.type===`text`?(t.raw+=o.raw,t.text+=o.text):n.push(o)}else if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return n}#n(e){let t=e;if(this.tokens.links&&e.includes(`[`)){let e=this.tokenizer.rules.inline.reflinkSearch,n=t=>{let r=t.lastIndexOf(`[`);if(!Object.hasOwn(this.tokens.links,Gi(t.slice(r+1,-1))))return t;if(r>1&&t.charAt(0)!==`!`){let i=t.slice(1,r-1);if(this.linkInText(i))return`[`+i.replace(e,n)+`][`+`a`.repeat(t.length-r-2)+`]`}return`[`+`a`.repeat(t.length-2)+`]`};t=t.replace(e,n)}return t=t.replace(this.tokenizer.rules.inline.anyPunctuationOutsideCode,(e,t,n)=>n?`+`.repeat(e.length):t?t+e.slice(t.length,-t.length).replace(/`/g,`+`)+t:e),t=t.replace(this.tokenizer.rules.inline.blockSkip,(e,t,n)=>{let r=n?n.length:0;return e.slice(0,r)+`[`+`a`.repeat(e.length-r-2)+`]`}),t=this.options.hooks?.emStrongMask?.call({lexer:this},t)??t,t}infiniteLoopError(e){let t=`Infinite loop on byte: `+e;if(this.options.silent)console.error(t);else throw Error(t)}},aa=class{options;parser;constructor(e){this.options=e||gr}space(e){return``}code({text:e,lang:t,escaped:n}){let r=(t||``).match(J.notSpaceStart)?.[0],i=e?e.replace(J.endingNewline,``)+`
`:``;return r?`<pre><code class="language-`+zi(r)+`">`+(n?i:zi(i,!0))+`</code></pre>
`:`<pre><code>`+(n?i:zi(i,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${zi(e,!0)}</code>`}br(e){return`<br>`}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,text:n,tokens:r,autolink:i}){let a=i?zi(n,!0):this.parser.parseInline(r),o=Vi(e);if(o===null)return a;e=zi(o,i);let s=`<a href="`+e+`"`;return t&&(s+=` title="`+zi(t)+`"`),s+=`>`+a+`</a>`,s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let i=Vi(e);if(i===null)return zi(n);e=i;let a=`<img src="${zi(e)}" alt="${zi(n)}"`;return t&&(a+=` title="${zi(t)}"`),a+=`>`,a}text(e){return`tokens`in e&&e.tokens?this.parser.parseInline(e.tokens):`escaped`in e&&e.escaped?e.text:zi(e.text)}},oa=class{parser;strong({text:e,tokens:t}){return t?this.parser.parseInline(t,this):e}em({text:e,tokens:t}){return t?this.parser.parseInline(t,this):e}codespan({text:e}){return e}del({text:e,tokens:t}){return t?this.parser.parseInline(t,this):e}html({text:e}){return e}text({text:e}){return e}link({text:e,tokens:t}){return t?this.parser.parseInline(t,this):e}image({text:e,tokens:t}){return t?this.parser.parseInline(t,this):e}br(){return``}checkbox({raw:e}){return e}},sa=class e{options;renderer;textRenderer;constructor(e){this.options=e||gr,this.options.renderer=this.options.renderer||new aa,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new oa,this.textRenderer.parser=this}static parse(t,n){return new e(n).parse(t)}static parseInline(t,n){return new e(n).parseInline(t)}parse(e){this.renderer.parser=this;let t=``;for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let e=r,n=this.options.extensions.renderers[e.type].call({parser:this},e);if(n!==!1||![`space`,`hr`,`heading`,`code`,`table`,`blockquote`,`list`,`checkbox`,`html`,`def`,`paragraph`,`text`].includes(e.type)){t+=n||``;continue}}let i=r;switch(i.type){case`space`:t+=this.renderer.space(i);break;case`hr`:t+=this.renderer.hr(i);break;case`heading`:t+=this.renderer.heading(i);break;case`code`:t+=this.renderer.code(i);break;case`table`:t+=this.renderer.table(i);break;case`blockquote`:t+=this.renderer.blockquote(i);break;case`list`:t+=this.renderer.list(i);break;case`checkbox`:t+=this.renderer.checkbox(i);break;case`html`:t+=this.renderer.html(i);break;case`def`:t+=this.renderer.def(i);break;case`paragraph`:t+=this.renderer.paragraph(i);break;case`text`:t+=this.renderer.text(i);break;default:{let e=`Token with "`+i.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let n=``;for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let e=this.options.extensions.renderers[i.type].call({parser:this},i);if(e!==!1||![`escape`,`html`,`link`,`image`,`checkbox`,`strong`,`em`,`codespan`,`br`,`del`,`text`].includes(i.type)){n+=e||``;continue}}let a=i;switch(a.type){case`escape`:n+=t.text(a);break;case`html`:n+=t.html(a);break;case`link`:n+=t.link(a);break;case`image`:n+=t.image(a);break;case`checkbox`:n+=t.checkbox(a);break;case`strong`:n+=t.strong(a);break;case`em`:n+=t.em(a);break;case`codespan`:n+=t.codespan(a);break;case`br`:n+=t.br(a);break;case`del`:n+=t.del(a);break;case`text`:n+=t.text(a);break;default:{let e=`Token with "`+a.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return n}},ca=class{options;block;constructor(e){this.options=e||gr}static passThroughHooks=new Set([`preprocess`,`postprocess`,`processAllTokens`,`emStrongMask`]);static passThroughHooksRespectAsync=new Set([`preprocess`,`postprocess`,`processAllTokens`]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?ia.lex:ia.lexInline}provideParser(e=this.block){return e?sa.parse:sa.parseInline}};function la(e,t){if(Array.isArray(t))for(let n=0;n<t.length;n++)e.push(t[n]);else e.push(t)}var ua=new class{defaults=hr();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=sa;Renderer=aa;TextRenderer=oa;Lexer=ia;Tokenizer=ra;Hooks=ca;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(la(n,t.call(this,r)),r.type){case`table`:{let e=r;for(let r of e.header)la(n,this.walkTokens(r.tokens,t));for(let r of e.rows)for(let e of r)la(n,this.walkTokens(e.tokens,t));break}case`list`:{let e=r;la(n,this.walkTokens(e.items,t));break}default:{let e=r;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(r=>{let i=e[r].flat(1/0);la(n,this.walkTokens(i,t))}):e.tokens&&la(n,this.walkTokens(e.tokens,t))}}return n}use(...e){let t=this.defaults.extensions||{renderers:Object.create(null),childTokens:Object.create(null)};return e.forEach(e=>{let n={...e};if(n.async=this.defaults.async||n.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw Error(`extension name required`);if(`renderer`in e){let n=t.renderers[e.name];n?t.renderers[e.name]=function(...t){let r=e.renderer.apply(this,t);return r===!1&&(r=n.apply(this,t)),r}:t.renderers[e.name]=e.renderer}if(`tokenizer`in e){if(!e.level||e.level!==`block`&&e.level!==`inline`)throw Error(`extension level must be 'block' or 'inline'`);let n=t[e.level];n?n.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&(e.level===`block`?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:e.level===`inline`&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}`childTokens`in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),n.extensions=t),e.renderer){let t=this.defaults.renderer||new aa(this.defaults);for(let n in e.renderer){if(!(n in t))throw Error(`renderer '${n}' does not exist`);if([`options`,`parser`].includes(n))continue;let r=n,i=e.renderer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n===!1?``:n??``}}n.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new ra(this.defaults);for(let n in e.tokenizer){if(!(n in t))throw Error(`tokenizer '${n}' does not exist`);if([`options`,`rules`,`lexer`].includes(n))continue;let r=n,i=e.tokenizer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new ca;for(let n in e.hooks){if(!(n in t))throw Error(`hook '${n}' does not exist`);if([`options`,`block`].includes(n))continue;let r=n,i=e.hooks[r],a=t[r];t[r]=ca.passThroughHooks.has(n)?e=>{if(t.options.async&&ca.passThroughHooksRespectAsync.has(n))return(async()=>{let n=await i.call(t,e);return a.call(t,n)})();let r=i.call(t,e);return a.call(t,r)}:(...e)=>{if(t.options.async)return(async()=>{let n=await i.apply(t,e);return n===!1&&(n=await a.apply(t,e)),n})();let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,r=e.walkTokens;n.walkTokens=function(e){let n=[];return la(n,r.call(this,e)),t&&la(n,t.call(this,e)),n}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return ia.lex(e,t??this.defaults)}parser(e,t){return sa.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},i={...this.defaults,...r},a=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&r.async===!1)return a(Error(`marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.`));if(typeof t>`u`||t===null)return a(Error(`marked(): input parameter is undefined or null`));if(typeof t!=`string`)return a(Error(`marked(): input parameter is of type `+Object.prototype.toString.call(t)+`, string expected`));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let n=i.hooks?await i.hooks.preprocess(t):t,r=await(i.hooks?await i.hooks.provideLexer(e):e?ia.lex:ia.lexInline)(n,i),a=i.hooks?await i.hooks.processAllTokens(r):r;i.walkTokens&&await Promise.all(this.walkTokens(a,i.walkTokens));let o=await(i.hooks?await i.hooks.provideParser(e):e?sa.parse:sa.parseInline)(a,i);return i.hooks?await i.hooks.postprocess(o):o})().catch(a);try{i.hooks&&(t=i.hooks.preprocess(t));let n=(i.hooks?i.hooks.provideLexer(e):e?ia.lex:ia.lexInline)(t,i);i.hooks&&(n=i.hooks.processAllTokens(n)),i.walkTokens&&this.walkTokens(n,i.walkTokens);let r=(i.hooks?i.hooks.provideParser(e):e?sa.parse:sa.parseInline)(n,i);return i.hooks&&(r=i.hooks.postprocess(r)),r}catch(e){return a(e)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let e=`<p>An error occurred:</p><pre>`+zi(n.message+``,!0)+`</pre>`;return t?Promise.resolve(e):e}if(t)return Promise.reject(n);throw n}}};function Y(e,t){return ua.parse(e,t)}Y.options=Y.setOptions=function(e){return ua.setOptions(e),Y.defaults=ua.defaults,_r(Y.defaults),Y},Y.getDefaults=hr,Y.defaults=gr;function da(...e){return ua.use(...e),Y.defaults=ua.defaults,_r(Y.defaults),Y}Y.use=da,Y.walkTokens=function(e,t){return ua.walkTokens(e,t)},Y.parseInline=ua.parseInline,Y.Parser=sa,Y.parser=sa.parse,Y.Renderer=aa,Y.TextRenderer=oa,Y.Lexer=ia,Y.lexer=ia.lex,Y.Tokenizer=ra,Y.Hooks=ca,Y.parse=Y,Y.options,Y.setOptions,Y.walkTokens,Y.parseInline,sa.parse,ia.lex;var fa=`modulepreload`,pa=function(e){return`/`+e},ma={},ha=function(e){return e.pathname.endsWith(`.css`)},ga=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},X=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=pa(t,n);let r=s(t),i=ha(r);return ga(ma,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:fa,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},_a=`app-toolbars-main`,va=`app-toolbars-main-right`,ya=`app-toolbars-main-center`,ba=`app-toolbars-bottom`,xa=`app-toolbars-bottom-center`,Sa=`app-toolbars-bottom-end`,Ca=`sidebar-main-toolbar`,wa=`system-views`,Ta=`system.layouts`,Ea=`system.attributions`,Da=`about.tabs`,Oa=`editor-area-main`;function ka(e){return`tabsmenu:${e}`}var Aa=`sidebar-main`,ja=`sidebar-main-bottom`,Ma=`sidebar-auxiliary`,Na=`sidebar-auxiliary-bottom`,Pa=`panel-bottom`,Fa=Se({ABOUT_TABS:()=>Da,COMMAND_SAVE:()=>Ia,EDITOR_AREA_MAIN:()=>Oa,HIDE_DOT_RESOURCE:()=>!1,MouseButton:()=>La,PANEL_BOTTOM:()=>Pa,SIDEBAR_AUXILIARY:()=>Ma,SIDEBAR_AUXILIARY_BOTTOM:()=>Na,SIDEBAR_MAIN:()=>Aa,SIDEBAR_MAIN_BOTTOM:()=>ja,SIDEBAR_MAIN_TOOLBAR:()=>Ca,SYSTEM_ATTRIBUTIONS:()=>Ea,SYSTEM_LAYOUTS:()=>Ta,SYSTEM_VIEWS:()=>wa,TOOLBAR_BOTTOM:()=>ba,TOOLBAR_BOTTOM_CENTER:()=>xa,TOOLBAR_BOTTOM_END:()=>Sa,TOOLBAR_MAIN:()=>_a,TOOLBAR_MAIN_CENTER:()=>ya,TOOLBAR_MAIN_RIGHT:()=>va,tabsMenuTarget:()=>ka}),Ia=`command-save`,La=function(e){return e[e.LEFT=0]=`LEFT`,e[e.MIDDLE=1]=`MIDDLE`,e[e.RIGHT=2]=`RIGHT`,e[e.BACK=3]=`BACK`,e[e.FORWARD=4]=`FORWARD`,e}({}),Ra=new class{constructor(){this.tasks=[],this.updateCounter=0}notifyUpdate(){this.updateCounter++,Qe.set(this.updateCounter)}run(e,t){let n=this.createProgressMonitor(e);try{this.tasks.push(n),this.notifyUpdate(),t(n)}finally{this.tasks.splice(this.tasks.indexOf(n),1),this.notifyUpdate()}}async runAsync(e,t){let n=this.createProgressMonitor(e);return this.tasks.push(n),this.notifyUpdate(),t(n).finally(()=>{this.tasks.splice(this.tasks.indexOf(n),1),this.notifyUpdate()})}createProgressMonitor(e){return new Proxy({name:e,message:``,currentStep:0,totalSteps:-1,progress:-1},{set:(e,t,n)=>(e[t]=n,this.notifyUpdate(),!0)})}getActiveTasks(){return this.tasks}};x.put(`taskService`,Ra);var za=`language`;function Ba(e,t){return t?e.replace(/\{(\w+)\}/g,(e,n)=>t[n]===void 0?e:t[n]):e}var Va=new Set([`en`]),Ha=m(Va),Ua=null;function Wa(e){let t=!1;for(let n of e){let e=n.toLowerCase().replace(`-`,`_`);Va.has(e)||(Va.add(e),t=!0)}if(t&&(Ha.set(new Set(Va)),Ua===null)){let e=Ga();e!==Ka.get()&&Ka.set(e)}}function Ga(){let e=navigator.languages?.length?navigator.languages:[navigator.language||`en`],t=Ha.get();for(let n of e){let e=n.split(`-`)[0].toLowerCase();if(t.has(e))return e}return`en`}var Ka=m(Ga());async function qa(){let e=await A.get(za);Ua=e??null,Ka.set(e||Ga())}g(ze,e=>{Ua=e?.language??null,Ka.set(e?.language||Ga())}),qa();function Ja(e){return{toString:()=>e(),valueOf:()=>e(),[Symbol.toPrimitive]:()=>e(),toJSON:()=>e()}}async function Ya(e,t=!1){let n={};await Promise.all(Object.entries(e).map(async([e,t])=>{let r=await t(),i=r&&`default`in r?r.default:r,a=(e.match(/\.([a-zA-Z-_]+)\.json$/)?.[1]??`en`).toLowerCase().replace(`-`,`_`);n[a]=i})),Wa(Object.keys(n));let r=e=>{let[t,r]=Ka.get().toLowerCase().replace(`-`,`_`).split(`_`),i=r?[`${t}_${r}`,t]:[t];i.push(`en`);for(let t of i){let r=n[t];if(r&&e in r)return r[e]}return e},i=Object.assign({},{then:void 0,catch:void 0,finally:void 0});return new Proxy(i,{get(e,n){if(n in e)return e[n];let i=r(n),a=(e=>Ba(r(n),e));return a.toString=()=>t?r(n):i,a.valueOf=()=>t?r(n):i,a[Symbol.toPrimitive]=()=>t?r(n):i,t&&(a.toJSON=()=>r(n)),a}})}var Xa=me(`EsmShService`),Za=new class e{static{this.ESM_SH_BASE=`https://esm.sh`}static{this.GITHUB_PREFIX=`gh/`}static{this.JSR_PREFIX=`jsr/`}static{this.PR_PREFIX=`pr/`}isEsmShUrl(e){try{let t=new URL(e);return t.hostname===`esm.sh`||t.hostname===`raw.esm.sh`}catch{return!1}}isSourceIdentifier(e){return this.isEsmShUrl(e)||this.isHttpUrl(e)?!1:this.parseSource(e)!==null}isHttpUrl(e){try{let t=new URL(e);return t.protocol===`http:`||t.protocol===`https:`}catch{return!1}}parseSource(t){return!t||typeof t!=`string`||(t=t.trim(),this.isHttpUrl(t))?null:t.startsWith(e.GITHUB_PREFIX)?this.parseGitHubSource(t):t.startsWith(e.JSR_PREFIX)?this.parseJsrSource(t):t.startsWith(e.PR_PREFIX)?this.parsePrSource(t):this.parseNpmSource(t)}parseGitHubSource(t){let n=t.substring(e.GITHUB_PREFIX.length).split(`/`);if(n.length<2)return null;let r=n[0],i=n[1],a,o,s,c=i.match(/^(.+?)(@(.+))?$/);return c?(a=c[1],o=c[3],n.length>2&&(s=n.slice(2).join(`/`)),{type:`github`,owner:r,repo:a,version:o,path:s}):null}parseJsrSource(t){let n=t.substring(e.JSR_PREFIX.length);if(!n.startsWith(`@`))return null;let r=n.split(`/`);if(r.length<2)return null;let i=r[0],a=r[1],o,s,c,l=a.match(/^(.+?)(@(.+))?$/);return l?(o=`${i}/${l[1]}`,s=l[3],r.length>2&&(c=r.slice(2).join(`/`)),{type:`jsr`,package:o,version:s,path:c}):null}parsePrSource(t){let n=t.substring(e.PR_PREFIX.length).split(`/`);if(n.length<2)return null;let r=n[0],i=n[1],a,o,s=i.match(/^(.+?)@(.+)$/);return s?(a=s[1],o=s[2]):a=i,{type:`pr`,owner:r,repo:a,commit:o}}parseNpmSource(e){let t=e.split(`/`),n=t[0],r,i,a,o=n.match(/^(.+?)(@(.+))?$/);return o?(r=o[1],i=o[3],t.length>1&&(a=t.slice(1).join(`/`)),{type:`npm`,package:r,version:i,path:a}):null}buildEsmShUrl(t,n){let r=e.ESM_SH_BASE;switch(t.type){case`npm`:r+=`/${t.package}`,t.version&&(r+=`@${t.version}`),t.path&&(r+=`/${t.path}`);break;case`github`:r+=`/${e.GITHUB_PREFIX}${t.owner}/${t.repo}`,t.version&&(r+=`@${t.version}`),t.path&&(r+=`/${t.path}`);break;case`jsr`:r+=`/${e.JSR_PREFIX}${t.package}`,t.version&&(r+=`@${t.version}`),t.path&&(r+=`/${t.path}`);break;case`pr`:r+=`/${e.PR_PREFIX}${t.owner}/${t.repo}`,t.commit&&(r+=`@${t.commit}`)}let i=[];if(n?.deps){let e=Object.entries(n.deps).map(([e,t])=>`${e}@${t}`).join(`,`);i.push(`deps=${encodeURIComponent(e)}`)}return n?.target&&i.push(`target=${encodeURIComponent(n.target)}`),n?.dev&&i.push(`dev`),n?.bundle===!1?i.push(`bundle=false`):n?.bundle===!0&&i.push(`bundle`),i.length>0&&(r+=`?${i.join(`&`)}`),r}normalizeToEsmSh(e,t){if(this.isEsmShUrl(e)||this.isHttpUrl(e))return e;let n=this.parseSource(e);return n?this.buildEsmShUrl(n,t):(Xa.warn(`Could not parse source identifier: ${e}`),e)}extractPackageName(e){let t=this.parseSource(e);if(!t)return null;switch(t.type){case`npm`:return t.package||null;case`github`:return`${t.owner}/${t.repo}`;case`jsr`:return t.package||null;case`pr`:return`${t.owner}/${t.repo}`}}isGitHubUrl(e){try{let t=new URL(e);return t.hostname===`github.com`||t.hostname===`www.github.com`}catch{return e.startsWith(`https://github.com/`)||e.startsWith(`http://github.com/`)}}convertGitHubUrlToSource(t){try{let n=new URL(t).pathname.split(`/`).filter(e=>e);if(n.length<2)throw Error(`Invalid GitHub URL format`);let r=n[0],i=n[1].replace(/\.git$/,``),a,o;n.length>2&&(n[2]===`blob`||n[2]===`tree`?(a=n[3]||`main`,n[2]===`blob`&&n.length>4&&(o=n.slice(4).join(`/`))):n[2]===`commit`?a=n[3]:o=n.slice(2).join(`/`));let s=`${e.GITHUB_PREFIX}${r}/${i}`;return a&&(s+=`@${a}`),o&&(s+=`/${o}`),s}catch{let n=t.match(/github\.com\/([^\/]+)\/([^\/]+)/);return n?`${e.GITHUB_PREFIX}${n[1]}/${n[2].replace(/\.git$/,``)}`:t}}async fetchGitHubPackageJson(e){if(e.type!==`github`)throw Error(`Source must be a GitHub source`);let t=`https://raw.githubusercontent.com/${e.owner}/${e.repo}/${e.version||`main`}/package.json`,n=await fetch(t);if(!n.ok)throw Error(`Failed to fetch package.json: ${n.statusText}`);return await n.json()}};x.put(`esmShService`,Za);var Qa=`events/extensionsregistry/extensionsConfigChanged`,$a=`extensions`,eo=`extensions.external`,Z=new class{constructor(){this.extensions={},this.loadedExtensions=new Set,this.loadingPromises=new Map,g(ze,()=>{this.extensionsSettings=void 0,this.checkExtensionsConfig().then()}),this.loadPersistedExternalExtensions().then(()=>{this.checkExtensionsConfig().then()})}async loadPersistedExternalExtensions(){try{let e=await A.get(eo);e&&Array.isArray(e)&&e.forEach(e=>{this.extensions[e.id]=e})}catch(e){C.error(`Failed to load persisted external extensions: ${e}`)}}async savePersistedExternalExtensions(){try{let e=Object.values(this.extensions).filter(e=>e.external);await A.set(eo,e)}catch(e){C.error(`Failed to save persisted external extensions: ${e}`)}}async checkExtensionsConfig(){this.extensionsSettings||(this.extensionsSettings=await A.get($a),this.extensionsSettings||=(await A.set($a,[]),await A.get($a)),d(Qa,this.extensionsSettings))}registerExtension(e){this.extensions[e.id]=e,C.debug(`Registered extension: ${e.id}`),e.external&&this.savePersistedExternalExtensions().catch(e=>{C.error(`Failed to persist external extension: ${e}`)}),d(Qa,this.extensionsSettings)}async loadExtensionFromUrl(e,t){C.info(`Loading extension from URL: ${e}...`);try{let n=e,r=`Extension from ${e}`;if(Za.isSourceIdentifier(e)){let t=Za.extractPackageName(e);t&&(r=`Extension: ${t}`),n=Za.normalizeToEsmSh(e),C.debug(`Converted source identifier to esm.sh URL: ${e} -> ${n}`)}let i=t||`url:${n}`;if(this.isEnabled(i))return C.info(`Extension from URL ${n} is already enabled`),i;if(!this.extensions[i]){let t={id:i,name:r,description:`Extension loaded from: ${e}`,url:n};this.registerExtension(t),C.info(`Registered extension from URL: ${i}`)}return await this.enableAsync(i,!1),C.info(`Successfully enabled extension from URL: ${n}`),i}catch(t){throw C.error(`Failed to load extension from URL ${e}: ${t}`),t}}getExtensions(){return Object.values(this.extensions)}async loadEnabledExtensions(){await this.checkExtensionsConfig();let e=(this.extensionsSettings??[]).filter(e=>this.isEnabled(e.id)&&this.extensions[e.id]).map(e=>this.load(e.id).catch(e=>{k(`Extension could not be loaded: `+e.message)}));await Promise.all(e)}isEnabled(e){return this.checkExtensionsConfig(),!!this.extensionsSettings?.find(t=>t.id===e&&t.enabled)}isLoaded(e){return this.loadedExtensions.has(e)}enable(e,t=!1){this.isEnabled(e)||(C.debug(`Loading extension: ${e}`),this.load(e).then(()=>this.updateEnablementAsync(e,!0,t)).catch(t=>{C.error(`Could not load extension: ${e}: ${t}`)}))}async enableAsync(e,t=!1){if(this.isEnabled(e)){if(!this.isLoaded(e)){C.debug(`Extension ${e} is enabled in settings but not loaded; loading now`);try{await this.load(e)}catch(t){throw C.error(`Could not load extension: ${e}: ${t}`),t}}}else{C.debug(`Loading extension: ${e}`);try{await this.load(e),await this.updateEnablementAsync(e,!0,t)}catch(t){throw C.error(`Could not load extension: ${e}: ${t}`),t}}}async ensureExtensionRegistered(e){if(!this.extensions[e]){try{await import(e)}catch(t){C.debug(`Could not side-effect import extension package ${e}: ${t}`)}if(!this.extensions[e])throw Error(`Extension not found: `+e)}}async load(e,t=[]){if(this.loadedExtensions.has(e))return;let n=this.loadingPromises.get(e);if(n)return n;if(t.includes(e)){let n=[...t,e].join(` → `);throw Error(`Circular dependency detected: ${n}`)}this.extensions[e]||await this.ensureExtensionRegistered(e);let r=this.extensions[e];if(!r)throw Error(`Extension not found: `+e);let i=(async()=>{try{if(C.debug(`Loading extension: ${e}`),r.dependencies&&r.dependencies.length>0){let n=[...t,e];for(let e of r.dependencies)await this.load(e,n),this.isEnabled(e)||(await this.updateEnablementAsync(e,!0,!1),C.debug(`Auto-enabled dependency: ${e}`))}let n=await Ra.runAsync(`Loading extension: `+r.name,async()=>{if(r.loader)return r.loader();if(r.url){let e=r.url;return Za.isSourceIdentifier(r.url)&&(e=Za.normalizeToEsmSh(r.url),C.debug(`Normalized extension URL: ${r.url} -> ${e}`)),import(e)}});if(n?.default instanceof Function)try{let e=n.default(ne.getProxy());await Promise.resolve(e)}catch(t){throw C.error(`Error executing extension function for ${e}: ${t}`),t}this.loadedExtensions.add(e)}catch(t){throw this.loadedExtensions.delete(e),t}finally{this.loadingPromises.delete(e)}})();return this.loadingPromises.set(e,i),i}disable(e,t=!1){this.isEnabled(e)&&this.updateEnablementAsync(e,!1,t).catch(t=>{C.error(`Could not persist disable for extension ${e}: ${t}`)})}async updateEnablementAsync(e,t,n){await this.checkExtensionsConfig();let r=this.extensionsSettings?.find(t=>t.id==e);if(r?r.enabled=t:this.extensionsSettings?.push({id:e,enabled:t}),await A.set($a,this.extensionsSettings),n){let n=this.extensions[e];O(t?n.name+` enabled.`:n.name+` disabled  - Please restart to take effect`)}d(Qa,this.extensionsSettings)}};x.put(`extensionRegistry`,Z);var to=[`alt`,`ctrl`,`meta`,`shift`],no={CTRL:`ctrl`,CONTROL:`ctrl`,ALT:`alt`,OPTION:`alt`,SHIFT:`shift`,META:`meta`,CMD:`meta`,COMMAND:`meta`,WIN:`meta`,WINDOWS:`meta`},ro={ctrl:`Ctrl`,alt:`Alt`,shift:`Shift`,meta:`Cmd`},io={SPACE:` `,ESC:`ESCAPE`,RETURN:`ENTER`,LEFT:`ARROWLEFT`,RIGHT:`ARROWRIGHT`,UP:`ARROWUP`,DOWN:`ARROWDOWN`,DEL:`DELETE`,INS:`INSERT`,PAGEUP:`PAGEUP`,PAGEDOWN:`PAGEDOWN`},ao=new Set(Object.keys(no));function oo(e){return io[e]??e}var so=new class{constructor(){this.bindings=new Map,this.enabled=!0,document.addEventListener(`keydown`,this.handleKeyDown.bind(this),!0),this.registerExistingCommandBindings(),g(et,e=>{e.keyBinding&&this.registerKeyBinding(e.id,e.keyBinding)})}registerExistingCommandBindings(){let e=ot.listCommands();Object.values(e).forEach(e=>{e.keyBinding&&this.registerKeyBinding(e.id,e.keyBinding)})}parseKeyBinding(e){if(!e||e.trim()===``)return null;let t=e.toUpperCase().split(`+`).map(e=>e.trim());if(t.length===0)return null;let n=t[t.length-1],r=t.slice(0,-1);if(t.length===1&&ao.has(n))return null;let i={ctrl:!1,alt:!1,shift:!1,meta:!1};for(let e of r){let t=no[e];if(t===void 0)return null;i[t]=!0}return i.key=oo(n),i}getBindingKey(e){return[...to.filter(t=>e[t]),e.key.toUpperCase()].join(`+`)}registerKeyBinding(e,t){let n=this.parseKeyBinding(t);if(!n)return C.error(`Invalid key binding: ${t}`),!1;n.commandId=e;let r=this.getBindingKey(n);this.bindings.has(r)||this.bindings.set(r,[]);let i=this.bindings.get(r);if(i.find(t=>t.commandId===e))return C.error(`Key binding ${t} already registered for command ${e}`),!1;let a=i.find(t=>t.commandId!==e);return a?(C.warn(`Key binding ${t} already used by command ${a.commandId}; refusing for ${e}`),!1):(i.push(n),!0)}unregisterKeyBinding(e,t){if(t){let n=this.parseKeyBinding(t);if(n){let t=this.getBindingKey(n),r=this.bindings.get(t);if(r){let n=r.filter(t=>t.commandId!==e);n.length===0?this.bindings.delete(t):this.bindings.set(t,n)}}}else for(let[t,n]of this.bindings.entries()){let r=n.filter(t=>t.commandId!==e);r.length===0?this.bindings.delete(t):this.bindings.set(t,r)}}getKeyBindingsForCommand(e){let t=[];for(let n of this.bindings.values())for(let r of n)r.commandId===e&&t.push(this.formatKeyBinding(r));return t.sort()}formatKeyBinding(e){let t=to.filter(t=>e[t]).map(e=>ro[e]),n=e.key.length===1?e.key.toUpperCase():e.key.charAt(0).toUpperCase()+e.key.slice(1).toLowerCase();return t.push(n),t.join(`+`)}handleKeyDown(e){if(!this.enabled)return;let t={commandId:``,key:oo(e.key.toUpperCase()),ctrl:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:e.metaKey},n=this.getBindingKey(t),r=this.bindings.get(n);if(r&&r.length>0){let t=r[0];e.preventDefault(),e.stopPropagation();let n=ot.createExecutionContext({});ot.execute(t.commandId,n).then(()=>{C.debug(`Executed command via key binding: ${t.commandId}`)},e=>{let n=e instanceof Error?e.message:String(e);C.error(`Failed to execute command ${t.commandId}: ${n}`)})}}setEnabled(e){this.enabled=e}isEnabled(){return this.enabled}getAllBindings(){let e=new Map;for(let[t,n]of this.bindings)e.set(t,[...n]);return e}clearAll(){this.bindings.clear()}};x.put(`keyBindingManager`,so);function co(e){return mr.sanitize(e)}function lo(e,t){return co(Y.parse(e,{async:!1,...t}))}var uo=class extends dt{constructor(...e){super(...e),this.settingsKey=null}buildDOMTreePath(){let e=[],t=this;for(;t&&t!==document.body&&t!==document.documentElement;){let n=t.getAttribute(`id`);if(n){e.unshift(`#${n}`);break}let r=t.tagName.toLowerCase(),i=t.parentElement;if(!i)break;let a=Array.from(i.children).filter(e=>e.tagName.toLowerCase()===r).indexOf(t);a>=0?e.unshift(`${r}:${a}`):e.unshift(r),t=i}return e.length>0?e.join(` > `):null}initializeSettingsKey(){if(!this.settingsKey){let e=this.tagName.toLowerCase(),t=this.getAttribute(`id`);if(t){this.settingsKey=`${e}:${t}`;return}let n=this.buildDOMTreePath();n&&(this.settingsKey=`${e}:${n}`)}}async getDialogSetting(){if(this.initializeSettingsKey(),this.settingsKey)return await A.getDialogSetting(this.settingsKey)}async setDialogSetting(e){this.initializeSettingsKey(),this.settingsKey&&await A.setDialogSetting(this.settingsKey,e)}},fo=class extends uo{static{this.styles=[v`
            .dialog-message {
                margin-bottom: 0.5rem;
                color: var(--wa-color-text-normal);
            }
        `]}dispose(){}getResult(){}renderMessage(e,n=!1){if(n){let n=lo(e);return t`<div class="dialog-message" style="white-space: normal;">${h(n)}</div>`}return t`<div class="dialog-message" style="white-space: pre-line;">${e}</div>`}},po=me(`DialogService`),mo=`dialogs`,ho={id:`ok`,label:`OK`,variant:`primary`},go={id:`cancel`,label:`Cancel`,variant:`default`},_o={id:`close`,label:`Close`,variant:`default`},vo=null;function yo(){return vo&&document.body.contains(vo)||(vo=document.createElement(`div`),vo.id=`global-dialog-container`,document.body.appendChild(vo)),vo}function bo(e){if(e instanceof Element&&e.tagName.toLowerCase()===`wa-dialog`)return e;let t=e instanceof Document||e instanceof DocumentFragment||e instanceof Element||e instanceof ShadowRoot?Array.from(e.children):[];for(let e of t){if(e instanceof Element&&e.tagName.toLowerCase()===`wa-dialog`)return e;if(e instanceof Element&&e.shadowRoot){let t=bo(e.shadowRoot);if(t)return t}let t=bo(e);if(t)return t}return null}var xo=new class{constructor(){this.contributions=new Map,this.contributionsChangeScheduled=!1,this.loadContributions(),g(j,e=>{e.target===`dialogs`&&(this.contributionsChangeScheduled||(this.contributionsChangeScheduled=!0,queueMicrotask(()=>{this.contributionsChangeScheduled=!1,this.loadContributions()})))})}loadContributions(){let e=M.getContributions(mo);this.contributions.clear();for(let t of e)t.id?t.component?!t.onButton&&!t.selfContained?po.warn(`Dialog contribution "${t.id}" has no onButton callback, skipping`):this.contributions.set(t.id,t):po.warn(`Dialog contribution "${t.id}" has no component function, skipping`):po.warn(`Dialog contribution missing id, skipping`)}async open(e,r){let i=this.contributions.get(e);if(!i)throw po.error(`Dialog "${e}" not found`),Error(`Dialog "${e}" not found`);return new Promise(a=>{let o=yo(),s=!1,c=null,l=async()=>{if(!s){if(s=!0,c)try{await c.dispose()}catch(t){let n=t instanceof Error?t.message:String(t);po.error(`Error disposing dialog content for "${e}": ${n}`)}try{let e=c?c.getResult():void 0;i.onButton&&await i.onButton(`close`,e,m)}catch(t){let n=t instanceof Error?t.message:String(t);po.error(`Error executing close callback for dialog "${e}": ${n}`)}n(t``,o),a()}},u=()=>{if(s)return;let e=bo(o);e&&e.open!==!1?e.open=!1:l()},d=()=>{l()},f=async t=>{if(i.onButton)try{let e=c?c.getResult():void 0;await i.onButton(t,e,m)!==!1&&u()}catch(t){let n=t instanceof Error?t.message:String(t);po.error(`Error executing button callback for dialog "${e}": ${n}`),u()}},p=i.buttons&&i.buttons.length>0?i.buttons:[ho],m={...r,close:u,onAfterHide:d};r&&typeof r==`object`&&(r.close=u,r.onAfterHide=d);let h=r&&typeof r==`object`&&typeof r.label==`string`?r.label:i.label||e,ee=i.selfContained?i.component(m):t`
                <wa-dialog label="${h}" open @wa-after-hide=${d}>
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
                         @dialog-ok=${()=>{let e=p.find(e=>e.id===`ok`);e&&f(e.id)}}
                         @dialog-cancel=${()=>{let e=p.find(e=>e.id===`cancel`);e?f(e.id):u()}}>
                        ${i.component(r)}
                        
                        <div class="dialog-service-footer">
                            ${p.map(e=>t`
                                <wa-button 
                                    data-dialog-button="${e.id}"
                                    variant="${e.variant||`default`}"
                                    ?disabled=${e.disabled}
                                    @click=${()=>f(e.id)}
                                >
                                    ${e.label}
                                </wa-button>
                            `)}
                        </div>
                    </div>
                </wa-dialog>
            `;n(ee,o),(async()=>{let e=Array.from(o.querySelectorAll(`*`));for(let t of e)if(t instanceof fo){await t.updateComplete,c=t;break}})()})}getDialogIds(){return Array.from(this.contributions.keys())}hasDialog(e){return this.contributions.has(e)}};x.put(`dialogService`,xo);var So=me(`FloatingPanelService`),Co=`floating-panels`,wo=480,To=360;function Eo(e){if(!e.endsWith(`px`))return null;let t=Number.parseFloat(e);return Number.isFinite(t)&&t>0?t:null}var Do=new class{constructor(){this.contributions=new Map,this.floatedParts=new Map,this.rememberedGeometry=new WeakMap,this.contributionsChangeScheduled=!1,this.loadContributions(),g(j,e=>{e.target===`floating-panels`&&(this.contributionsChangeScheduled||(this.contributionsChangeScheduled=!0,queueMicrotask(()=>{this.contributionsChangeScheduled=!1,this.loadContributions()})))})}loadContributions(){let e=M.getContributions(Co);this.contributions.clear();for(let t of e)t.id?t.component?this.contributions.set(t.id,t):So.warn(`Floating panel contribution "${t.id}" has no component function, skipping`):So.warn(`Floating panel contribution missing id, skipping`)}open(e,t){let r=typeof e==`string`?this.contributions.get(e):e;if(!r){let t=typeof e==`string`?e:e.id;throw So.error(`Floating panel "${t}" not found`),Error(`Floating panel "${t}" not found`)}if(!r.component)throw Error(`Floating panel "${r.id}" has no component`);let i=this.createPanel(r.label,r.persistKey,r.icon),a=()=>this.closeRendered(i),o={...t&&typeof t==`object`?t:{},close:a};return n(r.component(o),i),i.addEventListener(`floating-close`,a,{once:!0}),document.body.appendChild(i),i}toPanel(e,t){let n=this.floatedParts.get(e);if(n?.panel.isConnected)return n.panel.parentNode?.appendChild(n.panel),n.panel;let r={panel:this.createPanel(e.tabContribution?.label||e.id||`View`,void 0,e.tabContribution?.icon),parent:e.parentNode,next:e.nextSibling,width:e.style.width,height:e.style.height,restore:t},i=this.rememberedGeometry.get(e);return r.panel.size(i?.width??Eo(r.width)??wo,i?.height??Eo(r.height)??To),i&&r.panel.place(i.x,i.y),e.style.width=`100%`,e.style.height=`100%`,this.floatedParts.set(e,r),r.panel.appendChild(e),r.panel.addEventListener(`floating-close`,()=>{this.restorePart(e)},{once:!0}),document.body.appendChild(r.panel),r.panel}getPanelIds(){return Array.from(this.contributions.keys())}hasPanel(e){return this.contributions.has(e)}createPanel(e,t,n){let r=new xt;return r.label=e,t&&(r.persistKey=t),n&&(r.icon=n),r}closeRendered(e){e.isConnected&&(n(t``,e),e.remove())}async restorePart(e){let t=this.floatedParts.get(e);if(!t)return;this.floatedParts.delete(e);let n=t.panel.geometry();n.width>0&&n.height>0&&this.rememberedGeometry.set(e,n),e.style.width=t.width,e.style.height=t.height;try{t.restore?await t.restore(e):this.reparent(e,t)}finally{e.parentNode===t.panel&&t.panel.removeChild(e),t.panel.remove()}}reparent(e,t){let{parent:n,next:r,panel:i}=t;n&&r&&r.parentNode===n?n.insertBefore(e,r):n?n.appendChild(e):e.parentNode===i&&i.removeChild(e)}};x.put(`floatingPanelService`,Do);var Oo=`.opfs`;async function ko(){if(typeof navigator>`u`||!navigator.storage?.getDirectory)throw Error(`OPFS is not available in this environment`);return await navigator.storage.getDirectory()}var Ao=class extends H{constructor(e){super(),this.inner=e}getName(){return Oo}getParent(){return this.inner.getParent()}async listChildren(e){return this.inner.listChildren(e)}async getResource(e,t){return this.inner.getResource(e,t)}touch(){this.inner.touch()}async delete(e,t){return this.inner.delete(e,t)}async copyTo(e){return this.inner.copyTo(e)}async rename(e){return this.inner.rename(e)}};U.registerContribution({type:`opfs`,name:`opfs`,canHandle(e){return e&&typeof e==`object`&&e.opfs===!0},async connect(e){let t=await ko(),n=(await X(async()=>{let{FileSysDirHandleResource:e}=await import(`./fs-access-BIqyvwOO-Fby4rnfG.js`);return{FileSysDirHandleResource:e}},[])).FileSysDirHandleResource;return new Ao(new n(t))},async restore(e){if(e&&typeof e==`object`&&e.opfs===!0){let e=await ko(),t=(await X(async()=>{let{FileSysDirHandleResource:e}=await import(`./fs-access-BIqyvwOO-Fby4rnfG.js`);return{FileSysDirHandleResource:e}},[])).FileSysDirHandleResource;return new Ao(new t(e))}},async persist(e){return e instanceof Ao?{opfs:!0}:null}});var jo=`eclipse-docks-workspace-idb`,Mo=`files`,No=null;async function Po(){if(typeof indexedDB>`u`)throw Error(`IndexedDB is not available in this environment`);return No||=new Promise((e,t)=>{let n=indexedDB.open(jo,1);n.onerror=()=>t(n.error),n.onsuccess=()=>e(n.result),n.onupgradeneeded=e=>{let t=e.target.result;t.objectStoreNames.contains(Mo)||t.createObjectStore(Mo)}}),No}async function Fo(){let e=`IndexedDB`,t=await U.getFolders(),n=new Set(t.filter(e=>e.type===`indexeddb`).map(e=>e.name));if(!n.has(e))return e;let r=1;for(;n.has(`${e} (${r})`);)r+=1;return`${e} (${r})`}function Io(e){return e?e.split(`/`).filter(Boolean).join(`/`):``}function Lo(e,t){let n=Io(e),r=Io(t);return n?r?`${n}/${r}`:n:r}function Ro(e,t){let n=Io(t);return n?`${e}/${n}`:e}function zo(e,t){let n=Io(t);return n?`${e}/${n}/`:`${e}/`}async function Bo(e,t){let n=(await Po()).transaction(Mo,`readonly`).objectStore(Mo),r=t?Ro(e,t):e;return await new Promise((e,t)=>{let i=n.get(r);i.onsuccess=()=>e(i.result),i.onerror=()=>t(i.error)})}async function Vo(e,t,n){let r=(await Po()).transaction(Mo,`readwrite`).objectStore(Mo),i=t?Ro(e,t):e;await new Promise((e,t)=>{let a=r.put(n,i);a.onsuccess=()=>e(),a.onerror=()=>t(a.error)})}async function Ho(e,t){let n=(await Po()).transaction(Mo,`readwrite`).objectStore(Mo),r=t?Ro(e,t):e;await new Promise((e,t)=>{let i=n.delete(r);i.onsuccess=()=>e(),i.onerror=()=>t(i.error)})}async function Uo(e,t){let n=(await Po()).transaction(Mo,`readwrite`).objectStore(Mo),r=Ro(e,t),i=r+`/`,a=n.openCursor();await new Promise((e,t)=>{a.onerror=()=>t(a.error),a.onsuccess=t=>{let n=t.target.result;if(!n){e();return}let a=String(n.key);(a===r||a.startsWith(i))&&n.delete(),n.continue()}})}async function Wo(e){await Uo(e,``)}async function Go(e,t,n){let r=(await Po()).transaction(Mo,`readwrite`).objectStore(Mo),i=Ro(e,t),a=Ro(e,n),o=r.openCursor(),s=[];await new Promise((e,t)=>{o.onerror=()=>t(o.error),o.onsuccess=t=>{let n=t.target.result;if(!n){e();return}let o=String(n.key);if(o===i||o.startsWith(i+`/`)){let e=o.slice(i.length),t=a+e,c=n.value;s.push(()=>{n.delete(),r.put(c,t)})}n.continue()}});for(let e of s)e()}async function Ko(e,t){let n=(await Po()).transaction(Mo,`readonly`).objectStore(Mo),r=zo(e,t),i=n.openCursor(),a=new Set,o=new Map;await new Promise((e,t)=>{i.onerror=()=>t(i.error),i.onsuccess=t=>{let n=t.target.result;if(!n){e();return}let i=String(n.key),s=n.value;if(!i.startsWith(r)){n.continue();return}let c=i.slice(r.length);if(!c){n.continue();return}let l=c.indexOf(`/`),u=l===-1?c:c.slice(0,l);l===-1?s.type===`dir`?a.add(u):o.set(u,s):a.add(u),n.continue()}});let s=[];for(let e of a)s.push({name:e,entry:{type:`dir`},type:`dir`});for(let[e,t]of o)a.has(e)||s.push({name:e,entry:t,type:`file`});return s}function qo(e){return e instanceof Yo?e.getRootId():``}var Jo=class extends V{constructor(e,t){super(),this.path=Io(e),this.parent=t}getName(){let e=this.path.split(`/`);return e[e.length-1]||``}getParent(){return this.parent}getRootId(){return qo(this.parent)}async delete(){await Ho(this.getRootId(),this.path),d(z,U.getWorkspaceSync()??this.getWorkspace())}async getContents(e){let t=await Bo(this.getRootId(),this.path),n=t?.content;if(typeof n==`string`){let e=new Blob([n],{type:t?.mimeType||`text/plain`});n=e,t&&(t.content=e,await Vo(this.getRootId(),this.path,t))}if(!e||e.contentType===wt.TEXT)return n?await n.text():``;let r;return r=n||new Blob([],{type:t?.mimeType}),e.blob?r:e.uri?URL.createObjectURL(r):r.stream()}async saveContents(e,t){let n,r;if(e instanceof Blob)n=e,r=e.type||void 0;else if(typeof e==`string`)r=`text/plain`,n=new Blob([e],{type:r});else if(e instanceof ReadableStream){let t=new Response(e);n=await t.blob(),r=t.headers.get(`content-type`)??void 0}else{let t=String(e??``);r=`text/plain`,n=new Blob([t],{type:r})}await Vo(this.getRootId(),this.path,{type:`file`,content:n,mimeType:r}),d(z,U.getWorkspaceSync()??this.getWorkspace())}async size(){let e=(await Bo(this.getRootId(),this.path))?.content;return e?e.size:null}async copyTo(e){let t=await this.getContents({blob:!0}),n=await this.getWorkspace().getResource(e,{create:!0});if(!n)throw Error(`Failed to create target file: ${e}`);await n.saveContents(t)}async rename(e){if(this.getName()===e)return;let t=this.getParent(),n=Lo(t instanceof Yo?t.getPath():``,e),r=this.getRootId(),i=await Bo(r,this.path);if(!i)throw Error(`File not found in IndexedDB`);await Ho(r,this.path),await Vo(r,n,i),d(z,U.getWorkspaceSync()??this.getWorkspace())}},Yo=class e extends H{constructor(e,t){super(),this.path=Io(e),this.parent=t}getPath(){return this.path}getName(){if(!this.path)return``;let e=this.path.split(`/`);return e[e.length-1]}getParent(){return this.parent}getRoot(){let e=this.getParent();return e?e.getRoot():this}getRootId(){let e=this.getRoot();return e instanceof Xo?e.getRootId():``}async listChildren(t){let n=await Ko(this.getRootId(),this.path),r=[];for(let t of n){let n=Lo(this.path,t.name);t.type===`dir`?r.push(new e(n,this)):r.push(new Jo(n,this))}return r}async getResource(t,n){if(!t)throw Error(`No path provided`);let r=t.endsWith(`/`),i=t.split(`/`).filter(e=>e.trim()),a=this,o=!1;for(let t=0;t<i.length;t++){let s=i[t],c=t===i.length-1,l=Lo(a.getPath(),s),u=this.getRootId(),f=await Bo(u,l);if(f){if(c)return r?f.type===`dir`?new e(l,a):null:f.type===`dir`?new e(l,a):new Jo(l,a);if(f.type!==`dir`)return null;a=new e(l,a)}else{if(!n?.create)return null;if(c&&!r)return await Vo(u,l,{type:`file`,content:new Blob([])}),o=!0,d(z,U.getWorkspaceSync()??this.getWorkspace()),new Jo(l,a);await Vo(u,l,{type:`dir`}),o=!0,a=new e(l,a)}}return o&&d(z,U.getWorkspaceSync()??this.getWorkspace()),a}touch(){d(z,U.getWorkspaceSync()??this.getWorkspace())}async delete(t,n=!0){if(!t){let t=this.getParent();if(t instanceof e){await t.delete(this.getName());return}return}let r=Lo(this.path,t);await Uo(this.getRootId(),r),d(z,U.getWorkspaceSync()??this.getWorkspace())}async copyTo(e){for(let t of await this.listChildren(!1)){let n=[e,t.getName()].join(`/`);await t.copyTo(n)}}async rename(t){if(this.getName()===t)return;let n=this.getParent();if(!(n instanceof e))throw Error(`Cannot rename IndexedDB root directory`);let r=this.getPath(),i=Lo(n.getPath(),t);await Go(this.getRootId(),r,i),d(z,U.getWorkspaceSync()??this.getWorkspace())}},Xo=class extends Yo{constructor(e,t){super(``),this.displayName=e||`IndexedDB`,this.rootId=t}getRootId(){return this.rootId}getName(){return this.displayName}getParent(){}async rename(e){let t=String(e??``).trim();t&&t!==this.displayName&&(this.displayName=t,await U.updateFolderName(this,t))}};function Zo(){return typeof crypto<`u`&&crypto.randomUUID?crypto.randomUUID():`default-`+Math.random().toString(36).slice(2)+Date.now().toString(36)}U.registerContribution({type:`indexeddb`,name:`idb`,canHandle(e){return e&&typeof e==`object`&&e.indexeddb===!0},async connect(e){await Po();let t=e.name&&String(e.name).trim();return new Xo(t&&t.length>0?t:await Fo(),Zo())},async restore(e){if(e&&typeof e==`object`&&e.indexeddb===!0&&e.rootId)return await Po(),new Xo(e.name&&String(e.name).trim()||`IndexedDB`,String(e.rootId))},async persist(e){return e instanceof Xo?{indexeddb:!0,name:e.getName(),rootId:e.getRootId()}:null}});async function Qo(e){return e instanceof Xo&&(await Wo(e.getRootId()),!0)}var $o=`in-memory`,es=`in-memory`;function ts(e){return e?e.split(`/`).filter(Boolean).join(`/`):``}function ns(e,t){let n=ts(e),r=ts(t);return n?r?`${n}/${r}`:n:r}function rs(){return{kind:`dir`,children:new Map}}function is(e,t){let n=e.children.get(t);if(!n)return n=rs(),e.children.set(t,n),n;if(n.kind!==`dir`)throw Error(`Path conflict: ${t} is a file`);return n}function as(){d(z,U.getWorkspaceSync())}var os=class{constructor(){this.tree=rs()}lookup(e){let t=ts(e);if(!t)return this.tree;let n=this.tree;for(let e of t.split(`/`)){if(!n||n.kind!==`dir`)return;n=n.children.get(e)}return n}ensureDirectory(e){let t=ts(e);if(!t)return;let n=this.tree;for(let e of t.split(`/`))n=is(n,e)}ensureFileParent(e){let t=ts(e);if(!t)throw Error(`Invalid file path`);let n=t.split(`/`),r=n.pop(),i=this.tree;for(let e of n)i=is(i,e);return{parent:i,fileName:r}}writeFile(e,t,n){let{parent:r,fileName:i}=this.ensureFileParent(e);r.children.set(i,{kind:`file`,contents:t,mimeType:n})}writeLiveFile(e,t){let{parent:n,fileName:r}=this.ensureFileParent(e);n.children.set(r,{kind:`live`,source:t})}remove(e){let t=ts(e);if(!t){this.clear();return}let n=t.split(`/`),r=n.pop(),i=this.tree;for(let e of n){if(!i||i.kind!==`dir`)return;i=i.children.get(e)}i&&i.kind===`dir`&&i.children.delete(r)}renameTree(e,t){let n=this.lookup(e);if(!n)throw Error(`Missing path: ${e}`);this.remove(e);let r=ts(t).split(`/`),i=r.pop(),a=r.join(`/`);a&&this.ensureDirectory(a);let o=a?this.lookup(a):this.tree;if(!o||o.kind!==`dir`)throw Error(`Invalid rename target`);o.children.set(i,n)}clear(){this.tree.kind===`dir`&&this.tree.children.clear()}},ss=class extends V{constructor(e,t,n){super(),this.store=e,this.path=t,this.parentDir=n}getRelativePath(){return this.path}getName(){let e=this.path.split(`/`);return e[e.length-1]||this.path}getParent(){return this.parentDir}getWorkspacePath(){return this.path?`${$o}/${this.path}`:$o}node(){let e=this.store.lookup(this.path);if(!e||e.kind!==`file`&&e.kind!==`live`)throw Error(`File not found: ${this.path}`);return e}isLive(){return this.store.lookup(this.path)?.kind===`live`}async getContents(e){let t=this.node();if(t.kind===`live`){let n=await t.source.getContents(e);return e?.blob&&!(n instanceof Blob)?new Blob([String(n??``)],{type:t.source.mimeType||`text/plain`}):n}if(e?.blob)return t.contents instanceof Blob?t.contents:new Blob([t.contents],{type:t.mimeType||`text/plain`});if(e?.uri){if(typeof t.contents==`string`&&t.contents.startsWith(`data:`))return t.contents;if(t.contents instanceof Blob)return URL.createObjectURL(t.contents)}return t.contents instanceof Blob?await t.contents.text():t.contents}async saveContents(e,t){if(this.isLive())throw Error(`Live in-memory files are read-only references`);let n=e instanceof Blob&&e.type||this.getMimeType();this.store.writeFile(this.path,e,n),as()}async size(){let e=this.node();return e.kind===`live`?await e.source.size():e.contents instanceof Blob?e.contents.size:e.contents.length}getMimeType(){let e=this.node();return e.kind===`live`?e.source.mimeType:e.mimeType}async copyTo(e){let t=U.getWorkspaceSync();if(!t)throw Error(`No workspace`);let n=await t.getResource(e,{create:!0});if(!(n instanceof V))throw Error(`Copy target is not a file`);let r=await this.getContents();await n.saveContents(r)}async delete(e,t){this.parentDir&&await this.parentDir.delete(this.getName())}async rename(e){if(!this.parentDir)throw Error(`Cannot rename without parent`);let t=this.path,n=ns(this.parentDir.getPath(),e);this.store.renameTree(t,n),as()}},cs=class e extends H{constructor(e,t,n,r=$o){super(),this.store=e,this.path=t,this.parentDir=n,this.rootName=r}getName(){if(!this.path)return this.rootName;let e=this.path.split(`/`);return e[e.length-1]}getParent(){return this.parentDir}getPath(){return this.path}getWorkspacePath(){return this.path?`${$o}/${this.path}`:$o}async listChildren(t){let n=this.store.lookup(this.path);if(!n||n.kind!==`dir`)return[];let r=[];for(let[t,i]of n.children){let n=ns(this.path,t);i.kind===`dir`?r.push(new e(this.store,n,this,this.rootName)):r.push(new ss(this.store,n,this))}return r}async getResource(t,n){if(!t)throw Error(`No path provided`);let r=t.endsWith(`/`),i=t.split(`/`).filter(e=>e.trim()),a=this.path,o=this,s=!1;for(let t=0;t<i.length;t++){let c=i[t],l=t===i.length-1,u=ns(a,c),d=this.store.lookup(u);if(d){if(l)return r||d.kind===`dir`?d.kind===`dir`?new e(this.store,u,o,this.rootName):null:new ss(this.store,u,o);if(d.kind!==`dir`)return null;o=new e(this.store,u,o,this.rootName),a=u}else{if(!n?.create)return null;if(l&&!r)return this.store.writeFile(u,``,void 0),s=!0,as(),new ss(this.store,u,o);this.store.ensureDirectory(u),s=!0,o=new e(this.store,u,o,this.rootName),a=u}}return s&&as(),o}touch(){as()}async delete(e,t=!0){e?(this.store.remove(ns(this.path,e)),as()):this.parentDir?await this.parentDir.delete(this.getName()):(this.store.clear(),as())}async copyTo(e){for(let t of await this.listChildren(!1))await t.copyTo([e,t.getName()].join(`/`))}async rename(e){if(!this.parentDir)throw Error(`Cannot rename in-memory root`);if(this.getName()===e)return;let t=ns(this.parentDir.getPath(),e);this.store.renameTree(this.path,t),as()}},ls=class extends cs{constructor(e=$o){super(new os,``,void 0,e||`in-memory`)}getParent(){}ensureDirectoryEntry(e){let t=String(e??``).trim();if(!t||t.includes(`/`))throw Error(`Directory name required (no slashes)`);return this.store.ensureDirectory(t),new cs(this.store,t,void 0,this.getName())}writeLiveFile(e,t){this.store.writeLiveFile(e,t),as()}},us,ds,fs=null;function ps(){return us||=new ls($o),us}function ms(e){fs=e,as()}function hs(){return fs}var gs=class extends H{getName(){return $o}getParent(){}getWorkspacePath(){return $o}async listChildren(e){let t=ps();return fs?fs.listChildren(t,e):t.listChildren(e)}async getResource(e,t){let n=ps();return fs?fs.getResource(n,e,t):n.getResource(e,t)}touch(){as()}async delete(e,t){e&&(await ps().delete(e,t),as())}async copyTo(e){for(let t of await this.listChildren(!1))await t.copyTo([e,t.getName()].join(`/`))}async rename(e){throw Error(`Cannot rename the in-memory mount`)}};function _s(){return ds||=new gs,ds}U.registerContribution({type:es,name:`memory`,canHandle(e){return!(!e||typeof e!=`object`||e.memory!==!0&&e[`in-memory`]!==!0)},async connect(e){return ps(),_s()},async restore(e){!e||typeof e!=`object`||e.memory!==!0&&e[`in-memory`]},async persist(e){return e instanceof gs||e instanceof ls?{memory:!0,name:$o}:null}});var vs=me(`MarketplaceRegistry`),ys=`events/marketplaceregistry/changed`,bs=`marketplace.catalogUrls`,xs=new class{constructor(){this.catalogUrls=[],this.loadingPromises=new Map,this.loadCatalogUrls().then(()=>{this.refreshCatalogs().catch(e=>{vs.error(`Failed to refresh catalogs on init: ${e.message}`)})})}async loadCatalogUrls(){try{let e=await A.get(bs);this.catalogUrls=Array.isArray(e)?e:[]}catch(e){vs.error(`Failed to load catalog URLs: ${e}`),this.catalogUrls=[]}}async saveCatalogUrls(){await A.set(bs,this.catalogUrls),d(ys,{type:`catalogs`,urls:this.catalogUrls})}async addCatalogUrl(e){if(!this.isValidUrl(e))throw Error(`Invalid catalog URL: ${e}`);if(this.catalogUrls.includes(e))vs.debug(`Catalog URL already exists: ${e}`);else{this.catalogUrls.push(e),await this.saveCatalogUrls(),vs.debug(`Added catalog URL: ${e}`);try{await this.refreshCatalogs()}catch(e){vs.warn(`Failed to refresh catalogs immediately after adding: ${e}`)}}}async addCatalogUrls(e){let t=0;for(let n of e)this.isValidUrl(n)?this.catalogUrls.includes(n)||(this.catalogUrls.push(n),vs.debug(`Added catalog URL: ${n}`),t++):vs.warn(`Skipping invalid catalog URL: ${n}`);if(t!==0){await this.saveCatalogUrls();try{await this.refreshCatalogs()}catch(e){vs.warn(`Failed to refresh catalogs after adding URLs: ${e}`)}}}async removeCatalogUrl(e){let t=this.catalogUrls.indexOf(e);t!==-1&&(this.catalogUrls.splice(t,1),await this.saveCatalogUrls(),vs.info(`Removed catalog URL: ${e}`))}getCatalogUrls(){return[...this.catalogUrls]}isValidUrl(e){try{let t=new URL(e);return t.protocol===`http:`||t.protocol===`https:`}catch{return!1}}async fetchCatalog(e){let t=this.loadingPromises.get(e);if(t)return t;let n=(async()=>{try{let t=await fetch(e,{method:`GET`,headers:{Accept:`application/json`}});if(!t.ok)throw Error(`HTTP ${t.status}: ${t.statusText}`);let n=await t.json();if(!n.extensions||!Array.isArray(n.extensions))throw Error(`Invalid catalog format: extensions array is required`);return{name:n.name,description:n.description,extensions:n.extensions||[]}}catch(t){throw vs.error(`Failed to fetch catalog from ${e}: ${t}`),t}finally{this.loadingPromises.delete(e)}})();return this.loadingPromises.set(e,n),n}async refreshCatalogs(){let e=this.catalogUrls.map(e=>this.fetchCatalog(e).catch(t=>(vs.warn(`Failed to refresh catalog ${e}: ${t.message}`),null))),t=await Promise.allSettled(e),n=0;t.forEach(e=>{if(e.status===`fulfilled`&&e.value){let t=e.value;t.extensions&&t.extensions.forEach(e=>{if(!Z.getExtensions().find(t=>t.id===e.id)){let t={...e,external:!0};Z.registerExtension(t),n++}})}}),vs.debug(`Refreshed ${this.catalogUrls.length} catalogs, ${n} extensions registered`),n>0&&vs.info(`Marketplace: ${n} new extension(s) available`),d(ys,{type:`refreshed`})}getMarketplaceExtension(e){let t=Z.getExtensions().find(t=>t.id===e);if(t&&t.external)return t}isMarketplaceExtension(e){let t=Z.getExtensions().find(t=>t.id===e);return t!==void 0&&t.external===!0}};x.put(`marketplaceRegistry`,xs);var Q=me(`AppLoader`);function Ss(e){let t=e?.layout??`standard`;return typeof t==`object`?t.id:t}function Cs(e){return e instanceof Error?e.message:String(e)}function ws(){let e=window.location.pathname.split(`/`).filter(Boolean);if(e.length===0)return;let t=e[0];if(t&&t!==`index.html`&&!t.endsWith(`.html`))return t}var Ts=new class e{constructor(){this.apps=new Map,this.started=!1,this.container=document.body,this.systemRequiredExtensions=new Set}static{this.PREFERRED_APP_KEY=`preferredAppName`}registerApp(e,t){if(t?.hostConfig===!0){let t={name:`@eclipse-docks/app`,version:`0.8.17`,description:`Default app template built on Eclipse Docks. Use as a starting point for downstream applications.`,dependencies:{"@eclipse-docks/core":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Eclipse Docks platform core: registries, services, parts, widgets, and API`},"@eclipse-docks/extension-ai-system":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`AI assistants, chat, and tool execution`},"@eclipse-docks/extension-canvas":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Compile and open workspace canvas.js views, and list canvases registered by extensions`},"@eclipse-docks/extension-catalog":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Browse and checkout resources from a catalog`},"@eclipse-docks/extension-command-palette":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`VS Code-style command palette at the top center for quick command execution (Ctrl+Shift+P)`},"@eclipse-docks/extension-terminal":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`VS Code-style terminal panel with pluggable profiles.`},"@eclipse-docks/extension-cereusdb":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Spatial SQL in the browser (SedonaDB / Apache DataFusion)`},"@eclipse-docks/extension-dataviewer":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Tabular data views, persistence, and CSV/TSV/DuckDB integration`},"@eclipse-docks/extension-duckdb":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`In-browser SQL engine (DuckDB-WASM) for advanced queries, analytics, and Parquet/CSV/JSON.`},"@eclipse-docks/extension-github-service":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`GitHub API integration for releases and repository information`},"@eclipse-docks/extension-howto-system":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Step-by-step workflow system with pre and post condition checks`},"@eclipse-docks/extension-in-browser-ml":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`In-browser machine learning service using transformers.js for specialized tasks (zero-shot classification, embeddings, etc.)`},"@eclipse-docks/extension-md-editor":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`View, edit, and render Markdown (.md) files`},"@eclipse-docks/extension-media-viewer":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`View PDF, image, and HTML files in the browser`},"@eclipse-docks/extension-memory-usage":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Displays JavaScript heap memory usage in the bottom toolbar`},"@eclipse-docks/extension-monaco-editor":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Code editor with syntax highlighting, code completion, and Python execution support`},"@eclipse-docks/extension-notebook":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`View and execute Jupyter-like notebooks (.ipynb) with Python code execution and markdown rendering`},"@eclipse-docks/extension-pglite":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`In-browser PostgreSQL via PGlite`},"@eclipse-docks/extension-plain-editor":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Default lightweight text and hex editor for workspace files`},"@eclipse-docks/extension-pwa":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Service worker update indicator on the main toolbar and install prompt in the center toolbar when the browser supports them.`},"@eclipse-docks/extension-python-runtime":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Pyodide runtime, Python package management, and Run Python Script command`},"@eclipse-docks/extension-rag-system":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Retrieval-Augmented Generation system for document indexing, search and retrieval`},"@eclipse-docks/extension-settings-tree":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Tree-based editor for settings with in-place editing`},"@eclipse-docks/extension-sqleditor":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Generic SQL editor with pluggable backends`},"@eclipse-docks/extension-utils":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Utility commands such as wget, unzip and certificate tools.`},"@eclipse-docks/extension-webdav":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Connect to WebDAV servers (Nextcloud, ownCloud) as workspace folders for cloud storage integration`},"@eclipse-docks/extension-webllm":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`In-Browser LLM inference`},"@eclipse-docks/extension-webmcp":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Exposes app commands as WebMCP tools for browser agents and MCP clients`},"@awesome.me/webawesome":{license:`MIT`,homepage:`https://webawesome.com/`,repository:`https://github.com/shoelace-style/webawesome`,description:`A forward-thinking library of web components.`},"@fortawesome/fontawesome-free":{license:`(CC-BY-4.0 AND OFL-1.1 AND MIT)`,homepage:`https://fontawesome.com`,repository:`https://github.com/FortAwesome/Font-Awesome`,description:`The iconic font, CSS, and SVG framework`},"@fortawesome/fontawesome-svg-core":{license:`MIT`,homepage:`https://fontawesome.com`,repository:`https://github.com/FortAwesome/Font-Awesome`,description:`The iconic font, CSS, and SVG framework`},"@fortawesome/free-solid-svg-icons":{license:`(CC-BY-4.0 AND MIT)`,homepage:`https://fontawesome.com`,repository:`https://github.com/FortAwesome/Font-Awesome`,description:`The iconic font, CSS, and SVG framework`},"@lit-labs/signals":{license:`BSD-3-Clause`,homepage:`https://lit.dev/`,repository:`https://github.com/lit/lit`,description:`JavaScript Signals proposal integration for Lit`},dompurify:{license:`(MPL-2.0 OR Apache-2.0)`,homepage:`https://github.com/cure53/DOMPurify`,repository:`https://github.com/cure53/DOMPurify`,description:`DOMPurify is a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG. It runs as JavaScript and works in all modern browsers, as well as in Node.js (via jsdom). DOMPurify is written by security people who have vast background in web attacks and XSS. Fear not.`},lit:{license:`BSD-3-Clause`,homepage:`https://lit.dev/`,repository:`https://github.com/lit/lit`,description:`A library for building fast, lightweight web components`},marked:{license:`MIT`,homepage:`https://marked.js.org`,repository:`https://github.com/markedjs/marked`,description:`A markdown parser built for speed`},"@opencode-ai/models":{license:`MIT`,homepage:`https://models.dev`,repository:`https://github.com/anomalyco/models.dev`,description:`Official typed client for the models.dev API — an open database of AI model capabilities, pricing, and limits`},"modern-screenshot":{license:`MIT`,homepage:`https://github.com/qq15725/modern-screenshot`,repository:`https://github.com/qq15725/modern-screenshot`,description:`Quickly generate image from DOM node using HTML5 canvas and SVG`},"@xterm/addon-fit":{license:`MIT`,repository:`https://github.com/xtermjs/xterm.js/tree/master/addons/addon-fit`},"@xterm/xterm":{license:`MIT`,repository:`https://github.com/xtermjs/xterm.js`,description:`Full xterm terminal, in your browser`},"@cereusdb/full":{license:`Apache-2.0`,homepage:`https://github.com/tobilg/cereusdb#readme`,repository:`https://github.com/tobilg/cereusdb`,description:`Full CereusDB browser package with GEOS, PROJ, GDAL, and S2 geography support`},"@cereusdb/global":{license:`Apache-2.0`,homepage:`https://github.com/tobilg/cereusdb#readme`,repository:`https://github.com/tobilg/cereusdb`,description:`Global CereusDB browser package with GEOS, PROJ, and S2 geography support`},"@cereusdb/minimal":{license:`Apache-2.0`,homepage:`https://github.com/tobilg/cereusdb#readme`,repository:`https://github.com/tobilg/cereusdb`,description:`Minimal CereusDB browser package with GEOS-backed spatial SQL`},"@cereusdb/standard":{license:`Apache-2.0`,homepage:`https://github.com/tobilg/cereusdb#readme`,repository:`https://github.com/tobilg/cereusdb`,description:`Standard CereusDB browser package with GEOS and PROJ support`},papaparse:{license:`MIT`,homepage:`https://www.papaparse.com/`,repository:`https://github.com/mholt/PapaParse`,description:`Fast and powerful CSV parser for the browser that supports web workers and streaming large files. Converts CSV to JSON and JSON to CSV.`},"@duckdb/duckdb-wasm":{license:`MIT`,repository:`https://github.com/duckdb/duckdb-wasm`,description:`DuckDB powered by WebAssembly`},"@huggingface/transformers":{license:`Apache-2.0`,homepage:`https://github.com/huggingface/transformers.js#readme`,repository:`https://github.com/huggingface/transformers.js`,description:`State-of-the-art Machine Learning for the web. Run 🤗 Transformers directly in your browser, with no need for a server!`},"monaco-editor":{license:`MIT`,homepage:`https://github.com/microsoft/monaco-editor`,repository:`https://github.com/microsoft/monaco-editor`,description:`A browser based code editor`},"@electric-sql/pglite":{license:`Apache-2.0`,homepage:`https://pglite.dev`,repository:`https://github.com/electric-sql/pglite`,description:`PGlite is a WASM Postgres build packaged into a TypeScript client library that enables you to run Postgres in the browser, Node.js and Bun, with no need to install any other dependencies. It is only 3.7mb gzipped.`},"@electric-sql/pglite-age":{license:`Apache-2.0`,homepage:`https://pglite.dev`,repository:`https://github.com/electric-sql/pglite`,description:`AGE extension for PGlite`},"@electric-sql/pglite-pg_hashids":{license:`Apache-2.0`,homepage:`https://pglite.dev`,repository:`https://github.com/electric-sql/pglite`,description:`pg_hashids extension for PGlite`},"@electric-sql/pglite-pg_ivm":{license:`Apache-2.0`,homepage:`https://pglite.dev`,repository:`https://github.com/electric-sql/pglite`,description:`pg_ivm extension for PGlite`},"@electric-sql/pglite-pg_textsearch":{license:`Apache-2.0`,homepage:`https://pglite.dev`,repository:`https://github.com/electric-sql/pglite`,description:`pg_textsearch extension for PGlite`},"@electric-sql/pglite-pg_uuidv7":{license:`Apache-2.0`,homepage:`https://pglite.dev`,repository:`https://github.com/electric-sql/pglite`,description:`pg_uuidv7 extension for PGlite`},"@electric-sql/pglite-pgmq":{license:`Apache-2.0`,homepage:`https://pglite.dev`,repository:`https://github.com/electric-sql/pglite`,description:`pgmq extension for PGlite`},"@electric-sql/pglite-pgtap":{license:`Apache-2.0`,homepage:`https://pglite.dev`,repository:`https://github.com/electric-sql/pglite`,description:`pgtap extension for PGlite`},"@electric-sql/pglite-pgvector":{license:`Apache-2.0`,homepage:`https://pglite.dev`,repository:`https://github.com/electric-sql/pglite`,description:`pgvector extension for PGlite`},"@electric-sql/pglite-postgis":{license:`Apache-2.0 AND GPL-2.0-or-later`,homepage:`https://pglite.dev`,repository:`https://github.com/electric-sql/pglite`,description:`PostGIS extension for PGlite`},pyodide:{license:`MPL-2.0`,homepage:`https://github.com/pyodide/pyodide`,repository:`https://github.com/pyodide/pyodide`,description:`The Pyodide JavaScript package`},"@langchain/core":{license:`MIT`,homepage:`https://github.com/langchain-ai/langchainjs/tree/main/langchain-core/`,repository:`git@github.com:langchain-ai/langchainjs`,description:`Core LangChain.js abstractions and schemas`},"@langchain/textsplitters":{license:`MIT`,homepage:`https://github.com/langchain-ai/langchainjs/tree/main/libs/langchain-textsplitters/`,repository:`git@github.com:langchain-ai/langchainjs`,description:`Various implementations of LangChain.js text splitters`},"pdfjs-dist":{license:`Apache-2.0`,homepage:`https://mozilla.github.io/pdf.js/`,repository:`https://github.com/mozilla/pdf.js`,description:`Generic build of Mozilla's PDF.js library.`},rxdb:{license:`Apache-2.0`,homepage:`https://rxdb.info/`,repository:`https://github.com/pubkey/rxdb`,description:`A local-first realtime NoSQL Database for JavaScript applications - https://rxdb.info/`},rxjs:{license:`Apache-2.0`,homepage:`https://rxjs.dev`,repository:`https://github.com/reactivex/rxjs`,description:`Reactive Extensions for modern JavaScript`},jszip:{license:`(MIT OR GPL-3.0-or-later)`,repository:`https://github.com/Stuk/jszip`,description:`Create, read and edit .zip files with JavaScript http://stuartk.com/jszip`},"@mlc-ai/web-llm":{license:`Apache-2.0`,homepage:`https://github.com/mlc-ai/web-llm`,repository:`https://github.com/mlc-ai/web-llm`,description:`Hardware accelerated language model chats on browsers`}},directDependencies:`@eclipse-docks/core.@eclipse-docks/extension-ai-system.@eclipse-docks/extension-canvas.@eclipse-docks/extension-catalog.@eclipse-docks/extension-command-palette.@eclipse-docks/extension-terminal.@eclipse-docks/extension-cereusdb.@eclipse-docks/extension-dataviewer.@eclipse-docks/extension-duckdb.@eclipse-docks/extension-github-service.@eclipse-docks/extension-howto-system.@eclipse-docks/extension-in-browser-ml.@eclipse-docks/extension-md-editor.@eclipse-docks/extension-media-viewer.@eclipse-docks/extension-memory-usage.@eclipse-docks/extension-monaco-editor.@eclipse-docks/extension-notebook.@eclipse-docks/extension-pglite.@eclipse-docks/extension-plain-editor.@eclipse-docks/extension-pwa.@eclipse-docks/extension-python-runtime.@eclipse-docks/extension-rag-system.@eclipse-docks/extension-settings-tree.@eclipse-docks/extension-sqleditor.@eclipse-docks/extension-utils.@eclipse-docks/extension-webdav.@eclipse-docks/extension-webllm.@eclipse-docks/extension-webmcp`.split(`.`),nestedDependencies:{"@eclipse-docks/core":[`@awesome.me/webawesome`,`@fortawesome/fontawesome-free`,`@fortawesome/fontawesome-svg-core`,`@fortawesome/free-solid-svg-icons`,`@lit-labs/signals`,`dompurify`,`lit`,`marked`],"@eclipse-docks/extension-ai-system":[`@opencode-ai/models`],"@eclipse-docks/extension-canvas":[`modern-screenshot`],"@eclipse-docks/extension-terminal":[`@xterm/addon-fit`,`@xterm/xterm`],"@eclipse-docks/extension-cereusdb":[`@cereusdb/full`,`@cereusdb/global`,`@cereusdb/minimal`,`@cereusdb/standard`],"@eclipse-docks/extension-dataviewer":[`papaparse`],"@eclipse-docks/extension-duckdb":[`@duckdb/duckdb-wasm`],"@eclipse-docks/extension-in-browser-ml":[`@huggingface/transformers`],"@eclipse-docks/extension-md-editor":[`marked`],"@eclipse-docks/extension-monaco-editor":[`monaco-editor`],"@eclipse-docks/extension-notebook":[`marked`],"@eclipse-docks/extension-pglite":[`@electric-sql/pglite`,`@electric-sql/pglite-age`,`@electric-sql/pglite-pg_hashids`,`@electric-sql/pglite-pg_ivm`,`@electric-sql/pglite-pg_textsearch`,`@electric-sql/pglite-pg_uuidv7`,`@electric-sql/pglite-pgmq`,`@electric-sql/pglite-pgtap`,`@electric-sql/pglite-pgvector`,`@electric-sql/pglite-postgis`],"@eclipse-docks/extension-python-runtime":[`pyodide`],"@eclipse-docks/extension-rag-system":[`@langchain/core`,`@langchain/textsplitters`,`pdfjs-dist`,`rxdb`,`rxjs`],"@eclipse-docks/extension-utils":[`jszip`],"@eclipse-docks/extension-webllm":[`@mlc-ai/web-llm`]},marketplaceCatalogUrls:[`https://raw.githubusercontent.com/kispace-io/appspace-marketplace/main/catalogs/extensions.json`,`https://raw.githubusercontent.com/kispace-io/appspace-marketplace/main/catalogs/apps.json`]};e.name===void 0&&(e.name=t.name),e.version===void 0&&(e.version=t.version),e.description===void 0&&(e.description=t.description),e.dependencies===void 0&&(e.dependencies=t.dependencies),e.directDependencies===void 0&&(e.directDependencies=t.directDependencies),e.nestedDependencies===void 0&&(e.nestedDependencies=t.nestedDependencies),e.marketplaceCatalogUrls===void 0&&(e.marketplaceCatalogUrls=t.marketplaceCatalogUrls)}e.name=e.name??`app`,e.version=e.version??`0.0.0`,e.layout=e.layout??`standard`,this.apps.has(e.name)&&Q.warn(`App '${e.name}' is already registered. Overwriting.`),e.marketplaceCatalogUrls?.length&&xs.addCatalogUrls(e.marketplaceCatalogUrls).catch(()=>{}),this.apps.set(e.name,e),t?.defaultAppName&&(this.defaultAppName=t.defaultAppName),t?.container&&(this.container=t.container),t?.autoStart&&!this.started&&this.start()}registerSystemRequiredExtension(e){this.systemRequiredExtensions.add(e)}async start(){if(this.started){Q.debug(`AppLoader already started`);return}this.started=!0;let e=new URLSearchParams(window.location.search).get(`appId`),t=ws();t&&Q.info(`Extracted app ID from current page path: ${t}`);let n=await this.selectAppToLoad({appIdFromUrl:e,appIdFromPath:t});if(!n)throw Error(`No apps registered`);await this.loadApp(n,this.container)}findAppNameBySegment(e){if(this.apps.has(e))return e;for(let t of this.apps.values())if(t.path===e||t.name&&t.name.endsWith(`/`+e))return t.name??void 0}dispatchLoadProgress(e){window.dispatchEvent(new CustomEvent(`app-load-progress`,{detail:{message:e}}))}async loadApp(e,t){let n=this.apps.get(e);if(!n)throw Error(`App '${e}' not found. Make sure it's registered.`);if(this.dispatchLoadProgress(`Starting…`),this.currentApp&&(Q.info(`Disposing current app: ${this.currentApp.name}`),this.currentApp.dispose&&await this.currentApp.dispose(),this.currentApp.extensions&&this.currentApp.extensions.length>0&&(Q.info(`Disabling ${this.currentApp.extensions.length} extensions...`),this.currentApp.extensions.forEach(e=>{Z.disable(e)}))),Ve.applyAppNameRemaps(n.remaps),n.remaps?.length){let e=new Set;for(let t of n.remaps)for(let n of t.targets)e.add(n);for(let t of e){let e=M.getContributions(t);d(j,{target:t,contributions:e})}}n.contributions&&(Q.info(`Registering app contributions...`),n.contributions.ui&&(n.contributions.ui.forEach(e=>{let t=e.target;t&&M.registerContribution(t,e)}),Q.info(`Registered ${n.contributions.ui.length} UI contributions`)),n.contributions.extensions&&(n.contributions.extensions.forEach(e=>{Z.registerExtension(e)}),Q.info(`Registered ${n.contributions.extensions.length} app extensions`)));let r=new Set(n.extensions||[]);this.systemRequiredExtensions.forEach(e=>r.add(e)),n.extensions=Array.from(r),this.currentApp=n,this.updateDocumentMetadata(n),t&&(this.dispatchLoadProgress(`Rendering layout…`),this.renderApp(t),window.dispatchEvent(new CustomEvent(`app-loaded`,{detail:{appName:n.name}}))),n.extensions.length>0&&(this.dispatchLoadProgress(`Enabling extensions…`),await Promise.all(n.extensions.map(e=>Z.enableAsync(e).catch(t=>{Q.error(`Failed to load extension ${e}: ${Cs(t)}`)})))),this.dispatchLoadProgress(`Loading extensions…`),await Z.loadEnabledExtensions(),n.initialize&&(this.dispatchLoadProgress(`Initializing…`),Q.info(`Initializing ${n.name}...`),await n.initialize()),Q.info(`App ${n.name} loaded successfully`),t||window.dispatchEvent(new CustomEvent(`app-loaded`,{detail:{appName:n.name}}))}updateDocumentMetadata(e){if(document.title=e.name??``,e.metadata?.favicon){let t=e.metadata.favicon,n=document.querySelector(`link[rel*='icon']`);n||(n=document.createElement(`link`),n.rel=`icon`,document.head.appendChild(n)),n.type=`image/svg+xml`,n.href=t}}renderApp(e){if(!this.currentApp)throw Error(`No app loaded. Call loadApp() first.`);let t=Ss(this.currentApp),r=M.getContributions(Ta),i=r.find(e=>e.id===t);if(i||=(Q.warn(`Layout '${t}' not found, falling back to 'standard'`),r.find(e=>e.id===`standard`)),!i)throw Error(`No layout found for layoutId '${t}' and no 'standard' layout registered.`);let a=i.component,o={};if(a&&typeof a==`object`&&`tag`in a&&a.attributes&&(o={...a.attributes}),e.innerHTML=``,typeof a==`string`){let t=document.createElement(a);for(let[e,n]of Object.entries(o))t.setAttribute(e,n);e.appendChild(t)}else if(a&&typeof a==`object`&&`tag`in a){let t=document.createElement(a.tag);for(let[e,n]of Object.entries(o))t.setAttribute(e,n);e.appendChild(t)}else if(typeof a==`function`)n(a(),e);else throw Error(`Layout '${i.id}' has invalid component.`);i.onShow&&requestAnimationFrame(()=>{Promise.resolve(i.onShow()).catch(e=>Q.error(`Layout onShow failed for '${i.id}': ${Cs(e)}`))})}getCurrentApp(){return this.currentApp}getRegisteredApps(){return Array.from(this.apps.values())}async getPreferredAppId(){try{return await A.get(e.PREFERRED_APP_KEY)}catch(e){Q.debug(`Failed to get preferred app ID from settings: ${Cs(e)}`);return}}async setPreferredAppId(t){if(!this.apps.has(t))throw Error(`App '${t}' not found. Make sure it's registered.`);try{await A.set(e.PREFERRED_APP_KEY,t),this.defaultAppName=t,Q.info(`Set preferred app to: ${t}`)}catch(e){throw Q.error(`Failed to persist preferred app: ${Cs(e)}`),e}}getRegisteredLayouts(){return M.getContributions(Ta)}getCurrentLayoutId(){return Ss(this.currentApp)}async selectAppToLoad(e){let{appIdFromUrl:t,appIdFromPath:n}=e;if(t){let e=this.findAppNameBySegment(t)??t;if(this.apps.has(e))return Q.info(`Loading app specified by URL parameter 'appId': ${e}`),e;Q.warn(`App '${t}' from URL parameter not found`)}if(n){let e=this.findAppNameBySegment(n);if(e)return Q.info(`Loading app from URL path: ${n}`),e;Q.debug(`App for path '${n}' not found, continuing search`)}let r=await this.getPreferredAppId();if(r&&this.apps.has(r))return Q.info(`Loading preferred app from settings: ${r}`),r;if(this.defaultAppName&&this.apps.has(this.defaultAppName))return this.defaultAppName;this.defaultAppName&&Q.warn(`Default app '${this.defaultAppName}' not found`);let i=this.getRegisteredApps();if(i.length>0)return i[0].name}};x.put(`appLoaderService`,Ts);var Es=class extends fo{constructor(...e){super(...e),this.message=``,this.defaultValue=``,this.markdown=!1,this.inputValue=``}static{this.styles=[...fo.styles,v`
            wa-input {
                width: 100%;
            }
        `]}async firstUpdated(e){super.firstUpdated(e),this.inputValue=this.defaultValue,await this.updateComplete;let t=this.shadowRoot?.querySelector(`wa-input`);if(t){let e=t.shadowRoot?.querySelector(`input`);e&&(e.focus(),e.select())}}getResult(){return this.inputValue}handleInput(e){this.inputValue=e.target.value}handleKeyDown(e){e.key===`Enter`?(e.preventDefault(),this.dispatchEvent(new CustomEvent(`dialog-ok`,{bubbles:!0,composed:!0}))):e.key===`Escape`&&(e.preventDefault(),this.dispatchEvent(new CustomEvent(`dialog-cancel`,{bubbles:!0,composed:!0})))}render(){return t`
            ${this.renderMessage(this.message,this.markdown)}
            <wa-input
                value="${this.inputValue}"
                @input=${this.handleInput}
                @keydown=${this.handleKeyDown}
                autofocus
            ></wa-input>
        `}};T([_({type:String})],Es.prototype,`message`,void 0),T([_({type:String,attribute:`default-value`})],Es.prototype,`defaultValue`,void 0),T([_({type:Boolean})],Es.prototype,`markdown`,void 0),T([r()],Es.prototype,`inputValue`,void 0),Es=T([b(`docks-prompt-dialog-content`)],Es),M.registerContribution(mo,{id:`prompt`,label:`Input`,buttons:[ho,go],component:e=>e?t`
            <docks-prompt-dialog-content 
                .message="${e.message}"
                .defaultValue="${e.defaultValue}"
                .markdown="${e.markdown}"
            ></docks-prompt-dialog-content>
        `:t`<div>Error: No prompt dialog state</div>`,onButton:async(e,t,n)=>(n&&(e===`ok`?n.resolve(t||``):n.resolve(null)),!0)});async function Ds(e,t=``,n=!1){return new Promise(r=>{xo.open(`prompt`,{message:e,defaultValue:t,markdown:n,resolve:r})})}var Os=class extends fo{constructor(...e){super(...e),this.fields=[],this.message=``,this.markdown=!1,this.values={},this.validationError=``}static{this.styles=[...fo.styles,v`
            .form-fields {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                min-width: 22rem;
            }

            .field label {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
                font-size: var(--wa-font-size-s);
            }

            .field-label {
                font-weight: 500;
                color: var(--wa-color-text-normal);
            }

            wa-input {
                width: 100%;
            }

            .validation-error {
                color: var(--wa-color-danger-600, #dc2626);
                font-size: var(--wa-font-size-s);
            }
        `]}async firstUpdated(e){super.firstUpdated(e);let t={};for(let e of this.fields)t[e.name]=e.value??``;this.values=t,await this.updateComplete,((this.shadowRoot?.querySelector(`wa-input`))?.shadowRoot?.querySelector(`input`))?.focus()}getResult(){return{...this.values}}setValidationError(e){this.validationError=e}updateField(e,t){this.values={...this.values,[e]:t},this.validationError&&=``}handleKeyDown(e){e.key===`Enter`?(e.preventDefault(),this.dispatchEvent(new CustomEvent(`dialog-ok`,{bubbles:!0,composed:!0}))):e.key===`Escape`&&(e.preventDefault(),this.dispatchEvent(new CustomEvent(`dialog-cancel`,{bubbles:!0,composed:!0})))}render(){return t`
            ${this.message?this.renderMessage(this.message,this.markdown):null}
            <div class="form-fields" @keydown=${this.handleKeyDown}>
                ${this.fields.map(e=>t`
                        <div class="field">
                            <label>
                                <span class="field-label">${e.label}</span>
                                <wa-input
                                    type=${e.type??`text`}
                                    .value=${this.values[e.name]??``}
                                    placeholder=${e.placeholder??``}
                                    @input=${t=>this.updateField(e.name,t.target.value)}
                                ></wa-input>
                            </label>
                        </div>
                    `)}
                ${this.validationError?t`<div class="validation-error">${this.validationError}</div>`:null}
            </div>
        `}};T([_({attribute:!1})],Os.prototype,`fields`,void 0),T([_({type:String})],Os.prototype,`message`,void 0),T([_({type:Boolean})],Os.prototype,`markdown`,void 0),T([r()],Os.prototype,`values`,void 0),T([r()],Os.prototype,`validationError`,void 0),Os=T([b(`docks-form-dialog-content`)],Os);function ks(e){return Object.fromEntries(Object.entries(e).map(([e,t])=>[e,t.trim()]))}function As(){return document.querySelector(`docks-form-dialog-content`)}function js(e,t){for(let n of e)if(n.required!==!1&&!t[n.name]?.trim())return`${n.label} is required.`;return null}M.registerContribution(mo,{id:`form`,label:`Form`,buttons:[ho,go],component:e=>e?t`
            <docks-form-dialog-content
                .message=${e.message??``}
                .markdown=${e.markdown??!1}
                .fields=${e.fields}
            ></docks-form-dialog-content>
        `:t`<div>Error: No form dialog state</div>`,onButton:async(e,t,n)=>{if(!n)return!0;if(e===`ok`){let e=ks(t??{}),r=js(n.fields,e);if(r)return As()?.setValidationError(r),!1;n.resolve(e)}else n.resolve(null);return!0}});function Ms(e){return new Promise(t=>{xo.open(`form`,{...e,resolve:t})})}async function Ns(e){let t=await Ms(e);if(!t)throw Error(`Cancelled`);return t}var Ps=class extends fo{constructor(...e){super(...e),this.message=``,this.markdown=!1}render(){return t`
            ${this.renderMessage(this.message,this.markdown)}
        `}};T([_({type:String})],Ps.prototype,`message`,void 0),T([_({type:Boolean})],Ps.prototype,`markdown`,void 0),Ps=T([b(`docks-info-dialog-content`)],Ps),M.registerContribution(mo,{id:`info`,label:`Information`,buttons:[ho],component:e=>e?t`
            <docks-info-dialog-content 
                .message="${e.message}"
                .markdown="${e.markdown}"
            ></docks-info-dialog-content>
        `:t`<div>Error: No info dialog state</div>`,onButton:async(e,t,n)=>(n&&n.resolve&&n.resolve(),!0)});async function Fs(e,t,n=!1){return new Promise(r=>{xo.open(`info`,{title:e,message:t,markdown:n,resolve:r})})}var Is=class extends fo{constructor(...e){super(...e),this.message=``,this.markdown=!1}getResult(){return!1}render(){return t`
            ${this.renderMessage(this.message,this.markdown)}
        `}};T([_({type:String})],Is.prototype,`message`,void 0),T([_({type:Boolean})],Is.prototype,`markdown`,void 0),Is=T([b(`docks-confirm-dialog-content`)],Is),M.registerContribution(mo,{id:`confirm`,label:`Confirm`,buttons:[ho,go],component:e=>e?t`
            <docks-confirm-dialog-content 
                .message="${e.message}"
                .markdown="${e.markdown}"
            ></docks-confirm-dialog-content>
        `:t`<div>Error: No confirm dialog state</div>`,onButton:async(e,t,n)=>(n&&(e===`ok`?n.resolve(!0):n.resolve(!1)),!0)});async function Ls(e,t=!1){return new Promise(n=>{xo.open(`confirm`,{message:e,markdown:t,resolve:n})})}var Rs=class extends fo{constructor(...e){super(...e),this.title=``,this.message=``,this.markdown=!1,this.actions=[],this.currentTitle=``,this.currentMessage=``,this.dialogElement=null}async firstUpdated(e){super.firstUpdated(e),this.currentTitle=this.title,this.currentMessage=this.message,await this.updateComplete;let t=this.closest(`wa-dialog`);t&&(this.dialogElement=t,this.updateDialogLabel());let n=this.closest(`.dialog-service-content`);if(n){let e=n.parentElement?.querySelector(`.dialog-service-footer`);e&&(e.style.display=`none`)}}updated(e){super.updated(e),e.has(`title`)&&(this.currentTitle=this.title,this.updateDialogLabel()),e.has(`message`)&&(this.currentMessage=this.message)}updateDialogLabel(){this.dialogElement&&this.dialogElement.setAttribute(`label`,this.currentTitle)}updateDialog(e,t,n){this.currentTitle=e,this.currentMessage=t,this.actions=[...n],this.updateDialogLabel(),this.requestUpdate()}handleActionClick(e){e.callback()}handleClose(){this.resolveCallback&&this.resolveCallback();let e=this.closest(`wa-dialog`);e&&e.open!==!1&&(e.open=!1)}static{this.styles=[...fo.styles,v`
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
        `]}render(){let e=this.actions.filter(e=>e.label!==`Close`),n=this.actions.filter(e=>e.label===`Close`);return t`
            <div class="dialog-content">
                <wa-scroller class="dialog-scroller">
                    ${this.renderMessage(this.currentMessage,this.markdown)}
                </wa-scroller>
                
                <div class="dialog-actions">
                    <div class="dialog-actions-left">
                        ${e.map(e=>t`
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
                        ${n.map(e=>t`
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
        `}};T([_({type:String})],Rs.prototype,`title`,void 0),T([_({type:String})],Rs.prototype,`message`,void 0),T([_({type:Boolean})],Rs.prototype,`markdown`,void 0),T([r()],Rs.prototype,`actions`,void 0),T([r()],Rs.prototype,`currentTitle`,void 0),T([r()],Rs.prototype,`currentMessage`,void 0),Rs=T([b(`docks-navigable-info-dialog-content`)],Rs),M.registerContribution(mo,{id:`navigable-info`,label:`Information`,buttons:[_o],component:e=>{if(!e)return t`<div>Error: No navigable info dialog state</div>`;let n=t`
            <docks-navigable-info-dialog-content 
                .title="${e.title}"
                .message="${e.message}"
                .markdown="${e.markdown}"
            ></docks-navigable-info-dialog-content>
        `;return(async()=>{let t=document.querySelector(`docks-navigable-info-dialog-content`);t&&(await t.updateComplete,t.actions=e.actions||[],t.resolveCallback=e.resolve,e.updateDialogRef&&(e.updateDialogRef.current=(e,n,r)=>{t.updateDialog(e,n,r)}))})(),n},onButton:async(e,t,n)=>n&&e===`close`&&n.resolve?(n.resolve(),!0):!1});async function zs(e,t,n,r=!1){return new Promise(i=>{let a={};xo.open(`navigable-info`,{title:e,message:t,actions:n,markdown:r,resolve:i,updateDialogRef:a}),n.updateDialog=(e,t,n)=>{a.current&&a.current(e,t,n)}})}var Bs=class extends fo{constructor(...e){super(...e),this.mode=`either`,this.selectedPath=null,this.rootNodes=[],this.loading=!1,this.loadError=null}static{this.styles=[...fo.styles,v`
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
    `]}async doInitUI(){await this.loadWorkspaceTree()}firstUpdated(e){super.firstUpdated?.(e);let t=this.closest(`wa-dialog`);t&&t.setAttribute(`label`,this.dialogTitle)}updated(e){if(super.updated?.(e),e.has(`mode`)){let e=this.closest(`wa-dialog`);e&&e.setAttribute(`label`,this.dialogTitle)}}get dialogTitle(){return this.mode===`file`?`Choose a file`:this.mode===`directory`?`Choose a directory`:`Choose a file or directory`}getResult(){return this.selectedPath==null?null:`/`+this.selectedPath}async loadWorkspaceTree(){this.loading=!0,this.loadError=null;try{let e=await U.getWorkspace();if(!e){this.rootNodes=[];return}let t=await e.listChildren(!1),n=[];for(let e of t)n.push(await this.resourceToTreeNode(e,!1));n.sort((e,t)=>e.label.localeCompare(t.label)),this.rootNodes=n}catch(e){let t=e instanceof Error?e.message:String(e);this.loadError=t,this.rootNodes=[]}finally{this.loading=!1,await this.selectFirstFolder()}}async resourceToTreeNode(e,t=!0){let n=e instanceof V,r={resource:e,label:e.getName(),leaf:n,children:[]};if(e instanceof H&&t){for(let t of await e.listChildren(!1))r.children.push(await this.resourceToTreeNode(t,!1));r.children.sort((e,t)=>e.label.localeCompare(t.label))}return r}workspacePath(e){let t=e.getWorkspacePath();return typeof t==`string`?t:null}async selectFirstFolder(){if(this.mode!==`directory`||this.selectedPath)return;let e=this.rootNodes.find(e=>e.resource instanceof H);if(!e)return;this.selectedPath=this.workspacePath(e.resource),await this.updateComplete;let t=this.renderRoot.querySelectorAll(`wa-tree-item`);for(let e of t){let t=e.model;if(t&&this.isSelected(t)){e.selected=!0;return}}}isSelected(e){return this.selectedPath!=null&&this.workspacePath(e.resource)===this.selectedPath}handleSelectionChange(e){let t=e.detail&&e.detail.selection||[];if(!t||t.length===0){this.selectedPath=null,this.requestUpdate();return}let n=t[0]?.model?.resource;if(!n){this.selectedPath=null,this.requestUpdate();return}let r=n instanceof H,i=n instanceof V;if(this.mode===`file`&&!i)this.selectedPath=null,this.requestUpdate();else if(this.mode===`directory`&&i){let e=n.getParent?.();this.selectedPath=e?e.getWorkspacePath():null,this.requestUpdate()}else this.mode===`directory`&&!r?(this.selectedPath=null,this.requestUpdate()):(this.selectedPath=this.workspacePath(n),this.requestUpdate())}renderTreeNode(e){return t`
      <wa-tree-item .model=${e} ?leaf=${e.leaf} .selected=${this.isSelected(e)}>
        ${e.label}
        ${e.children.map(e=>this.renderTreeNode(e))}
      </wa-tree-item>
    `}render(){return t`
      <div class="dialog-body">
        ${this.loadError?this.renderMessage(this.loadError,!1):null}

        <div class="browser-container">
          ${this.loading?t`<div>Loading workspace…</div>`:this.rootNodes.length>0?t`
                    <wa-tree @wa-selection-change=${e=>this.handleSelectionChange(e)}>
                      ${this.rootNodes.map(e=>this.renderTreeNode(e))}
                    </wa-tree>
                  `:t`<div>No workspace folders.</div>`}
        </div>

        <div class="selection-info">
          ${this.selectedPath?`Selected path: ${this.selectedPath}`:`No path selected yet.`}
        </div>
      </div>
    `}};T([_({type:String})],Bs.prototype,`mode`,void 0),T([r()],Bs.prototype,`selectedPath`,void 0),T([r()],Bs.prototype,`rootNodes`,void 0),T([r()],Bs.prototype,`loading`,void 0),T([r()],Bs.prototype,`loadError`,void 0),Bs=T([b(`docks-filebrowser-dialog`)],Bs),M.registerContribution(mo,{id:`filebrowser-dialog`,label:`Select Path`,buttons:[ho,go],component:e=>t`<docks-filebrowser-dialog .mode=${e?.mode??`either`}></docks-filebrowser-dialog>`,onButton:async(e,t,n)=>(n&&(e===`ok`?n.resolve(t||null):n.resolve(null)),!0)});function Vs(e=`either`){return new Promise(t=>{xo.open(`filebrowser-dialog`,{resolve:t,mode:e})})}var Hs=`view.filebrowser`,Us=`view.logTerminal`,Ws=`toolbar.info`,Gs=`toolbar.fastViews`,Ks=`toolbar.languageSelector`,qs=`toolbar.layoutSwitcher`,Js=`toolbar.themeSwitcher`,Ys=`toolbar.fullscreen`,Xs=`toolbar.activePartName`,Zs=`toolbar.tasks`,Qs=`toolbar.toasts`,$s=`sidebar.toolbar.extensions`,ec=`system.icons.default`,tc=`about.tab.release`,nc=`about.tab.packages`,rc=`about.tab.attributions`,ic=`attribution.eclipse-docks`,ac=`attribution.font-awesome`,oc=`contextmenu.filebrowser.rename`,sc=`contextmenu.filebrowser.delete`,cc=class extends uo{},lc=class e extends cc{constructor(...e){super(...e),this.scrollMode=`scroller`,this.dirty=!1,this.isEditor=!1,this.embedded=!1,this.autoSave=!1,this.autoSaveDelay=1e3,this.releaseOnDisconnect=!1,this.autoSaveRunning=!1,this.autoSaveEpoch=0,this.onContentContextMenu=async e=>{let t=this.renderRoot.querySelector(`docks-contextmenu`);t&&await t.show({x:e.clientX,y:e.clientY},e)&&e.preventDefault()}}getCommandStack(){return this.commandStack}renderToolbar(){return y}activateContainingTab(){let e=this,t=null,n=null;for(;e;){let r=e.tagName?.toLowerCase();if(r===`wa-tab-panel`&&(t=e.getAttribute(`name`)),r===`docks-tabs`){n=e;break}let i=e.parentElement;if(i)e=i;else{let t=e.getRootNode();e=t instanceof ShadowRoot?t.host:null}}n&&t!=null&&t!==``&&n.activate(t)}renderContextMenu(){return y}renderContent(){return y}getToolbarTarget(){let e=this.tabContribution?.editorId??this.id??this.tabContribution?.name;return e?`toolbar:${e}`:void 0}getContextMenuTarget(){let e=this.tabContribution?.editorId??this.id??this.tabContribution?.name;return e?`contextmenu:${e}`:void 0}syncIsEditorCapability(){let t=this.save!==e.prototype.save;t!==this.isEditor&&(this.isEditor=t)}maybeActivateForCoupledEditors(){let t=this.tabContribution?.coupledEditors;if(!t?.length)return;let n=Xe.get();if(!(n instanceof e))return;let r=n.tabContribution?.editorId;r&&t.includes(r)&&this.activateContainingTab()}render(){let e=this.getToolbarTarget(),n=this.getContextMenuTarget(),r=this.tabContribution?.toolbar!==!1,i=this.tabContribution?.contextMenu!==!1,a=this.scrollMode,o=this.isEditor?[`system.editors`,`.system.editors`]:[],s=this.renderContent(),c=a===`scroller`?t`
                <wa-scroller class="part-content-scroll" orientation="vertical">
                    <div class="part-content-inner">${s}</div>
                </wa-scroller>
            `:t`<div class="part-content-inner">${s}</div>`;return t`
            <div class="part-shell">
                ${r?t`
                    <docks-toolbar
                        class="part-toolbar"
                        id=${f(e)}
                        .scopeTokens=${o}
                        .partToolbarRenderer=${()=>this.renderToolbar()}>
                    </docks-toolbar>
                `:y}
                <div class="part-content ${a===`native`?`native-scroll`:``}" @contextmenu=${i?this.onContentContextMenu:void 0}>
                    ${c}
                </div>
                ${i?t`
                    <docks-contextmenu
                        id=${f(n)}
                        .scopeTokens=${o}
                        .partContextMenuRenderer=${()=>this.renderContextMenu()}>
                    </docks-contextmenu>
                `:y}
            </div>
        `}updated(e){super.updated(e),this.syncIsEditorCapability(),e.has(`tabContribution`)&&this.maybeActivateForCoupledEditors(),e.has(`dirty`)&&e.get(`dirty`)!==void 0&&this.dispatchEvent(new CustomEvent(`dirty`,{detail:this.dirty,bubbles:!0}))}doClose(){}disconnectedCallback(){this.flushAutoSave(),super.disconnectedCallback()}close(){this.flushAutoSave(),this.doClose()}connectedCallback(){super.connectedCallback(),this.syncIsEditorCapability(),queueMicrotask(()=>this.syncIsEditorCapability()),this.watch(Xe,()=>this.maybeActivateForCoupledEditors())}save(){}isDirty(){return this.dirty}markDirty(e){this.dirty=e,Ze.set(null),Ze.set(this),N.set(null),N.set(this),e&&this.autoSaveEpoch++,this.queueAutoSave()}queueAutoSave(){this.autoSaveTimer!==void 0&&(clearTimeout(this.autoSaveTimer),this.autoSaveTimer=void 0),this.autoSave&&this.dirty&&(this.autoSaveTimer=setTimeout(()=>{this.autoSaveTimer=void 0,this.runAutoSave()},this.autoSaveDelay))}flushAutoSave(){this.autoSaveTimer!==void 0&&(clearTimeout(this.autoSaveTimer),this.autoSaveTimer=void 0),this.runAutoSave()}runAutoSave(){if(!this.autoSave||!this.dirty)return;if(this.autoSaveRunning){this.queueAutoSave();return}this.autoSaveRunning=!0;let e=this.autoSaveEpoch,t;try{t=this.save()}catch(t){console.error(t),this.finishAutoSave(e);return}Promise.resolve(t).catch(e=>console.error(e)).finally(()=>this.finishAutoSave(e))}finishAutoSave(e){this.autoSaveRunning=!1,this.autoSave&&this.dirty&&this.autoSaveEpoch!==e&&this.queueAutoSave()}static{this.baseStyles=v`
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

        .part-toolbar {
            grid-row: 1;
            min-height: 0;
            min-width: 0;
            max-width: 100%;
            overflow: hidden;
        }

        .part-content {
            grid-row: 2;
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

        :host([embedded]) {
            height: auto;
        }

        :host([embedded]) .part-shell {
            height: auto;
            overflow: visible;
            grid-template-rows: auto;
        }

        :host([embedded]) .part-content {
            overflow: visible;
            min-height: 0;
        }

        :host([embedded]) .part-content-inner {
            height: auto;
            min-height: 0;
        }

    `}static finalizeStyles(t){let n=super.finalizeStyles(t);return[e.baseStyles,...n]}};T([_()],lc.prototype,`dirty`,void 0),T([_({attribute:!1})],lc.prototype,`tabContribution`,void 0),T([_({type:Boolean,attribute:!1})],lc.prototype,`isEditor`,void 0),T([_({type:Boolean,reflect:!0})],lc.prototype,`embedded`,void 0);var uc=me(`ReleaseHistory`);async function dc(e){if(!e)return[];if(typeof e!=`function`)return e;try{return await e()}catch(e){return uc.error(`Failed to load release history from app: ${e instanceof Error?e.message:String(e)}`),[]}}function fc(e,t){return e.replace(/^v/i,``)===t.replace(/^v/i,``)}function pc(e,t){let n=t.replace(/^v/i,``).split(`.`).map(Number),r=e.replace(/^v/i,``).split(`.`).map(Number);for(let e=0;e<Math.max(n.length,r.length);e++){let t=n[e]||0,i=r[e]||0;if(i>t)return!0;if(i<t)return!1}return!1}var mc=class extends lc{constructor(...e){super(...e),this.scrollMode=`none`,this.appVersion=`0.0.0`,this.releases=[],this.currentReleaseIndex=0}static{this.styles=[v`
            .release-panel {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                padding: 0.75rem;
                box-sizing: border-box;
            }

            .release-body {
                white-space: normal;
            }
        `]}doInitUI(){this.load()}async load(){let e=Ts.getCurrentApp();this.appVersion=e?.version??`0.0.0`,this.releases=await dc(e?.releaseHistory);let t=this.releases.findIndex(e=>fc(e.tag_name,this.appVersion));this.currentReleaseIndex=t>=0?t:0,this.notifyChanged()}getNavState(){return{hasMultiple:this.releases.length>1,atOldest:this.currentReleaseIndex>=this.releases.length-1,atNewest:this.currentReleaseIndex<=0}}showOlder(){this.currentReleaseIndex<this.releases.length-1&&(this.currentReleaseIndex+=1,this.notifyChanged())}showNewer(){this.currentReleaseIndex>0&&(--this.currentReleaseIndex,this.notifyChanged())}notifyChanged(){this.dispatchEvent(new CustomEvent(`release-history-changed`,{bubbles:!0,composed:!0}))}renderContent(){let e=this.releases[this.currentReleaseIndex];if(!e)return t`<div class="release-panel">No release history available.</div>`;let n=fc(e.tag_name,this.appVersion),r=!n&&pc(e.tag_name,this.appVersion),i=e.body?lo(e.body):``;return t`
            <div class="release-panel">
                <p>
                    <strong>Version:</strong> ${e.tag_name}${n?` (Current)`:``}
                </p>
                <p>
                    <strong>Released:</strong>
                    <wa-format-date
                        .date=${e.published_at}
                        month="short"
                        day="numeric"
                        year="numeric"
                    ></wa-format-date>
                </p>
                ${r?t`
                        <wa-callout variant="warning">
                            <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
                            A newer release is available than the version you are running.
                            Use <strong>Update Available</strong> in the toolbar when it appears.
                        </wa-callout>
                    `:``}
                ${i?t`<div class="release-body">${h(i)}</div>`:``}
            </div>
        `}};T([r()],mc.prototype,`appVersion`,void 0),T([r()],mc.prototype,`releases`,void 0),T([r()],mc.prototype,`currentReleaseIndex`,void 0),mc=T([b(`docks-release-history`)],mc);var hc={hasMultiple:!1,atOldest:!0,atNewest:!0},gc=class extends fo{constructor(...e){super(...e),this.label=``,this.activeTab=null,this.releaseNav=hc,this.onReleaseHistoryChanged=()=>{this.syncReleaseNav()}}static{this.styles=[...fo.styles,v`
            :host {
                display: block;
            }

            wa-dialog {
                --width: 600px;
            }

            wa-dialog::part(body) {
                display: flex;
                flex-direction: column;
                min-height: 0;
                overflow: hidden;
            }

            .dialog-body {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                min-width: 32rem;
                height: min(70vh, 36rem);
                min-height: min(70vh, 36rem);
                overflow: hidden;
            }

            .dialog-body docks-tabs {
                flex: 1 1 auto;
                min-height: 0;
                overflow: hidden;
            }

            .dialog-footer {
                display: flex;
                gap: 0.5rem;
                justify-content: flex-end;
                width: 100%;
            }
        `]}firstUpdated(e){super.firstUpdated(e),this.addEventListener(`release-history-changed`,this.onReleaseHistoryChanged),this.updateComplete.then(()=>{this.attachTabListener(),this.syncActiveTab(),this.syncReleaseNav()})}disconnectedCallback(){this.removeEventListener(`release-history-changed`,this.onReleaseHistoryChanged),super.disconnectedCallback()}attachTabListener(){let e=this.getAboutTabs()?.shadowRoot?.querySelector(`wa-tab-group`);e&&!e.hasAttribute(`data-version-info-listener`)&&(e.setAttribute(`data-version-info-listener`,``),e.addEventListener(`wa-tab-show`,e=>{let t=e.detail?.name;t&&(this.activeTab=t)}))}getAboutTabs(){return this.renderRoot.querySelector(`docks-tabs`)}getReleaseHistory(){let e=this.getAboutTabs()?.getTabPart(tc);return e instanceof mc?e:null}syncActiveTab(){let e=this.getAboutTabs()?.shadowRoot?.querySelector(`wa-tab-group`);this.activeTab=e?.getAttribute(`active`)||e?.active||null}syncReleaseNav(){this.releaseNav=this.getReleaseHistory()?.getNavState()??hc}handleClose(){let e=this.renderRoot.querySelector(`wa-dialog`);e&&e.open!==!1?e.open=!1:this.close?.()}handleAfterHide(){this.onAfterHide?.()}showOlderRelease(){this.getReleaseHistory()?.showOlder()}showNewerRelease(){this.getReleaseHistory()?.showNewer()}render(){let e=Ts.getCurrentApp(),n=this.activeTab===`about.tab.release`&&this.releaseNav.hasMultiple;return t`
            <wa-dialog
                label=${this.label}
                open
                light-dismiss
                with-footer
                @wa-after-hide=${this.handleAfterHide}
            >
                <div class="dialog-body">
                    ${e?.description?t`<small>${e.description}</small>`:``}
                    <docks-tabs id=${Da} fill-height></docks-tabs>
                </div>
                <div slot="footer" class="dialog-footer">
                    ${n?t`
                            <wa-button
                                variant="default"
                                ?disabled=${this.releaseNav.atOldest}
                                @click=${this.showOlderRelease}
                            >
                                ← Previous
                            </wa-button>
                            <wa-button
                                variant="default"
                                ?disabled=${this.releaseNav.atNewest}
                                @click=${this.showNewerRelease}
                            >
                                Next →
                            </wa-button>
                        `:y}
                    <wa-button variant="primary" @click=${this.handleClose}>Close</wa-button>
                </div>
            </wa-dialog>
        `}};T([_({type:String})],gc.prototype,`label`,void 0),T([_({attribute:!1})],gc.prototype,`close`,void 0),T([_({attribute:!1})],gc.prototype,`onAfterHide`,void 0),T([r()],gc.prototype,`activeTab`,void 0),T([r()],gc.prototype,`releaseNav`,void 0),gc=T([b(`docks-version-info-dialog`)],gc),M.registerContribution(mo,{id:`version-info`,label:`About`,selfContained:!0,component:e=>t`
        <docks-version-info-dialog
            .label=${e?.label??``}
            .close=${e?.close}
            .onAfterHide=${e?.onAfterHide}
        ></docks-version-info-dialog>
    `});function _c(){let e=Ts.getCurrentApp();return xo.open(`version-info`,{label:`About ${e?.name??``} - ${e?.version??`0.0.0`}`})}function vc(e){if(e.localName!==`wa-dropdown`)return!1;let t=e;return t.open===!0||t.hasAttribute(`open`)}function yc(e){let t=e.composedPath().filter(e=>e instanceof Element);if(t.length>0)return t;if(!(e.target instanceof Element))return[];let n=[],r=e.target;for(;r;){n.push(r);let e=r.getRootNode();r=e instanceof ShadowRoot?e.host:r.parentElement}return n}function bc(e){if(vc(e))return!0;if(e.localName!==`wa-dropdown-item`)return!1;let t=e.closest(`wa-dropdown`);if(t&&vc(t))return!0;let n=e.getRootNode();return n instanceof ShadowRoot&&n.host instanceof Element&&vc(n.host)}function xc(e){return yc(e).some(bc)}function Sc(e){e.cancelable&&xc(e)&&e.preventDefault()}var Cc=!1;function wc(){Cc||typeof document>`u`||(Cc=!0,document.addEventListener(`contextmenu`,Sc,{capture:!0}))}function Tc(e,t){if(e instanceof Element){t(e),e.shadowRoot&&Tc(e.shadowRoot,t);for(let n of e.children)Tc(n,t)}else if(e instanceof DocumentFragment)for(let n of e.children)Tc(n,t)}function Ec(e){let t=[];return Tc(e,e=>{e.localName===`wa-dropdown-item`&&t.push(e)}),t}function Dc(e,t){queueMicrotask(()=>{for(let n of Ec(t))n!==e&&n.submenuOpen&&(n.submenuOpen=!1)})}var Oc=150;function kc(e,n,r,i,a){let o=`Toolbar ${e??`default`}`,s=r.filter(t=>t.slot===e&&i(t)&&Ke(t)),c=e===`start`?t`<slot name="start"></slot>`:e===`end`?t`<slot name="end"></slot>`:t`<slot></slot>`;return t`
        <wa-button-group orientation=${n} label=${o}>
            ${c}
            ${s.map(a)}
        </wa-button-group>
    `}var Ac=class extends uo{constructor(...e){super(...e),this.position=`start`,this.orientation=`horizontal`,this.align=`start`,this.size=`s`,this.scopeTokens=[],this.partToolbarContent=void 0,this.partToolbarRenderer=void 0,this.contributions=[],this.compact=!1,this.resizeObserver=null,this.resizeDebounceTimer=null,this.overflowCheckScheduled=!1,this.onResize=()=>{this.resizeDebounceTimer!==null&&clearTimeout(this.resizeDebounceTimer),this.resizeDebounceTimer=setTimeout(()=>{this.resizeDebounceTimer=null,this.updateCompactFromSpace()},Oc)}}updateCompactFromSpace(){let e=this.shadowRoot?.querySelector(`.toolbar-items`);if(!e)return;let t=e.scrollWidth>e.clientWidth;this.compact!==t&&(this.compact=t)}scheduleOverflowCheck(){this.overflowCheckScheduled||(this.overflowCheckScheduled=!0,requestAnimationFrame(()=>{this.overflowCheckScheduled=!1,this.updateCompactFromSpace()}))}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(this.onResize),this.resizeObserver.observe(this)}disconnectedCallback(){this.resizeObserver?.disconnect(),this.resizeObserver=null,this.resizeDebounceTimer!==null&&(clearTimeout(this.resizeDebounceTimer),this.resizeDebounceTimer=null),super.disconnectedCallback()}updated(e){super.updated?.(e),this.compact||this.scheduleOverflowCheck()}willUpdate(e){super.willUpdate?.(e),e.has(`scopeTokens`)&&this.refreshContributions()}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===`id`&&t!==n&&this.refreshContributions()}doBeforeUI(){this.refreshContributions(),g(j,e=>{let t=this.getAttribute(`id`);t&&this.matchesTarget(t,e.target)&&this.refreshContributions()})}refreshContributions(){let e=this.getAttribute(`id`);e?this.loadContributions(e):this.contributions=[]}matchesTarget(e,t){if(t===e)return!0;if(!e.includes(`:`))return!1;let[n]=e.split(`:`);if(t===`${n}:*`)return!0;let r=t.split(`:`);if(r.length===2){let t=r[1];if(this.scopeTokens.includes(t))return e.startsWith(`${n}:`)}return!1}loadContributions(e){let t=M.getContributions(e);if(!e.includes(`:`)){this.contributions=t;return}let[n]=e.split(`:`),r=`${n}:*`,i=M.getContributions(r),a=[];for(let e of this.scopeTokens){let t=`${n}:${e}`,r=M.getContributions(t);a.push(...r)}this.contributions=[...i,...a,...t]}isToolbarItem(e){return`command`in e||`component`in e}contributionCreator(e){if(`command`in e){let n=e,r=!this.compact&&!!n.showLabel;return t`
                <wa-button @click=${()=>void this.executeCommand(n.command,n.params||{})}
                           title=${n.label}
                           ?disabled="${qe(n)}"
                           appearance="plain" size=${this.size}>
                    ${R(n.icon,{label:n.label})}
                    ${r?n.label:``}
                </wa-button>
            `}if(`component`in e){let t=e.component;return t instanceof Function?t():h(t)}return t`<span>unknown contribution type: ${typeof e}</span>`}render(){let e=this.partToolbarRenderer?this.partToolbarRenderer():this.partToolbarContent?this.partToolbarContent:``,n=this.orientation===`vertical`?`column`:`row`,r={start:`flex-start`,center:`center`,end:`flex-end`},i=this.contributionCreator.bind(this),a=this.isToolbarItem.bind(this);return t`
            <div class="toolbar-items" style=${l({"flex-direction":n,"align-items":r[this.align],"justify-content":this.position})}>
                ${kc(`start`,this.orientation,this.contributions,a,i)}
                ${e}
                ${kc(void 0,this.orientation,this.contributions,a,i)}
                ${kc(`end`,this.orientation,this.contributions,a,i)}
            </div>
        `}static{this.styles=v`
        :host {
            display: flex;
            flex-direction: row;
            min-width: 0;
            max-width: 100%;
            overflow: hidden;
            --wa-form-control-padding-inline: var(--wa-space-2xs);
        }

        :host([orientation="vertical"]) {
            flex-direction: column;
            min-height: 0;
            max-height: 100%;
        }

        .toolbar-items {
            display: flex;
            flex: 1;
            min-width: 0;
            max-width: 100%;
            overflow: hidden;
            gap: var(--wa-space-2xs);
        }

        /* Part-provided labels that should yield space to action buttons. */
        .toolbar-title {
            flex: 1 1 0;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.875rem;
            font-weight: 500;
            padding: 0 0.25rem;
        }
    `}};T([_()],Ac.prototype,`position`,void 0),T([_({reflect:!0})],Ac.prototype,`orientation`,void 0),T([_({reflect:!0})],Ac.prototype,`align`,void 0),T([_({reflect:!0})],Ac.prototype,`size`,void 0),T([_({attribute:!1})],Ac.prototype,`scopeTokens`,void 0),T([_({attribute:!1})],Ac.prototype,`partToolbarContent`,void 0),T([_({attribute:!1})],Ac.prototype,`partToolbarRenderer`,void 0),T([r()],Ac.prototype,`contributions`,void 0),T([r()],Ac.prototype,`compact`,void 0),Ac=T([b(`docks-toolbar`)],Ac);function jc(e){let t=e.getAttribute(`data-params`);if(!t)return{};try{return JSON.parse(t)}catch{return{}}}function Mc(e){return e.getAttribute(`data-cmd`)||e.getAttribute(`value`)||void 0}function Nc(e){let t=e.detail?.item;if(!t||t.disabled||t.hasAttribute(`disabled`))return;let n=Mc(t);n&&ot.execute(n,ot.createExecutionContext(jc(t)))}function Pc(e){return t=>{Ge(e.disabled,!1)||(t.stopPropagation(),e.action?.(t))}}function Fc(e){if(!e)return y;let n=so.getKeyBindingsForCommand(e);return n.length===0?y:t`<span slot="details">${n[0]}</span>`}function Ic(e){let n=e.icon??``,r=e.params&&Object.keys(e.params).length>0?JSON.stringify(e.params):void 0;return t`
        <wa-dropdown-item
            slot=${e.slot??y}
            variant=${e.variant??`default`}
            value=${e.cmd??y}
            data-cmd=${e.cmd??y}
            data-params=${r??y}
            ?disabled=${Ge(e.disabled,!1)}
            @click=${e.action?Pc(e):y}>
            ${n?R(n,{label:e.title??e.label,slot:`icon`}):y}
            ${e.label}
            ${Fc(e.cmd)}
        </wa-dropdown-item>
    `}function Lc(e,t){return Ke(e)?Ic({cmd:e.command,icon:e.icon,label:e.label,params:e.params,disabled:e.disabled,slot:t?.slot}):y}function Rc(e,n){if(`command`in e)return Lc(e,n);if(`component`in e){if(!Ke(e))return y;let n=e.component;return n instanceof Function?n():t`${h(n)}`}return y}function zc(e,n){let r=M.getContributions(e).map(e=>Rc(e,n)).filter(e=>e!==y);return t`${r}`}function Bc(e){return t`
        <wa-dropdown-item ?disabled=${Ge(e.disabled,!1)}>
            ${e.icon?R(e.icon,{label:e.title??e.label,slot:`icon`}):y}
            ${e.label}
            ${zc(e.contributionTarget,{slot:`submenu`})}
        </wa-dropdown-item>
    `}var Vc=class extends uo{constructor(...e){super(...e),this.scopeTokens=[],this.partContextMenuRenderer=void 0,this.contributions=[],this.isOpen=!1,this.menuPosition={x:0,y:0},this.virtualAnchor={getBoundingClientRect:()=>{let{x:e,y:t}=this.menuPosition;return new DOMRect(e,t,0,0)}},this.dropdownRef=u(),this.boundHandleDocumentPointerDown=this.handleDocumentPointerDown.bind(this),this.handleSubmenuOpening=e=>{let t=this.dropdownRef.value,n=e.detail?.item;t&&n&&Dc(n,t)}}handleDocumentPointerDown(e){if(!this.isOpen)return;let t=e.composedPath();this.dropdownRef.value&&t.includes(this.dropdownRef.value)||t.some(e=>e.getAttribute?.(`part`)===`submenu`)||this.onClose()}doBeforeUI(){this.refreshContributions(),g(j,e=>{let t=this.getAttribute(`id`);t&&this.matchesTarget(t,e.target)&&(this.refreshContributions(),this.requestUpdate())})}willUpdate(e){super.willUpdate?.(e),e.has(`scopeTokens`)&&this.refreshContributions()}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===`id`&&t!==n&&this.refreshContributions()}refreshContributions(){let e=this.getAttribute(`id`);e?this.loadContributions(e):this.contributions=[]}matchesTarget(e,t){if(t===e)return!0;if(!e.includes(`:`))return!1;let[n]=e.split(`:`);if(t===`${n}:*`)return!0;let r=t.split(`:`);if(r.length===2){let t=r[1];if(this.scopeTokens.includes(t))return e.startsWith(`${n}:`)}return!1}loadContributions(e){let t=M.getContributions(e);if(!e.includes(`:`)){this.contributions=t;return}let[n]=e.split(`:`),r=`${n}:*`,i=M.getContributions(r),a=[];for(let e of this.scopeTokens){let t=`${n}:${e}`,r=M.getContributions(t);a.push(...r)}this.contributions=[...i,...a,...t]}hasMenuBody(){return this.refreshContributions(),this.contributions.length>0||(this.partContextMenuRenderer?this.partContextMenuRenderer():y)!==y}getElementFromPoint(e,t){let n=document.elementFromPoint(e,t);if(!n)return null;for(;n;){let r=n.shadowRoot;if(r){let i=r.elementFromPoint(e,t);if(i&&i!==n){n=i;continue}}break}return n}getHostPart(){let e=this.getRootNode();return e instanceof ShadowRoot&&e.host instanceof HTMLElement?e.host:null}triggerClickUnderCursor(e){let t=this.getElementFromPoint(e.clientX,e.clientY);if(t){let n=new MouseEvent(`click`,{bubbles:!0,cancelable:!0,view:window,clientX:e.clientX,clientY:e.clientY,screenX:e.screenX,screenY:e.screenY,button:0,buttons:0,detail:1,which:1});t.dispatchEvent(n)}}async show(e,t){return this.hasMenuBody()?(t&&(this.triggerClickUnderCursor(t),await this.getHostPart()?.updateComplete),this.isOpen&&(this.isOpen=!1,await this.updateComplete),this.menuPosition=e,this.isOpen=!0,await this.updateComplete,this.syncVirtualPopupAnchor(),document.addEventListener(`pointerdown`,this.boundHandleDocumentPointerDown,{capture:!0}),!0):!1}syncVirtualPopupAnchor(){let e=this.dropdownRef.value?.shadowRoot?.querySelector(`wa-popup`);e&&(e.anchor=this.virtualAnchor,e.reposition())}close(){this.onClose()}onClose(){this.isOpen&&(this.isOpen=!1,document.removeEventListener(`pointerdown`,this.boundHandleDocumentPointerDown,{capture:!0}))}updated(e){super.updated(e),e.has(`isOpen`)&&this.isOpen&&this.syncVirtualPopupAnchor()}renderContribution(e){return Rc(e)}render(){let e=this.partContextMenuRenderer?this.partContextMenuRenderer():y;return t`
            <wa-dropdown
                ${i(this.dropdownRef)}
                ?open=${this.isOpen}
                @submenu-opening=${this.handleSubmenuOpening}
                @wa-select=${Nc}
                @wa-after-hide=${this.onClose}>
                <span slot="trigger" hidden aria-hidden="true"></span>
                
                ${e}
                ${this.contributions.map(e=>this.renderContribution(e))}
            </wa-dropdown>
        `}static{this.styles=v`
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
            pointer-events: none;
            min-width: 200px;
        }

        wa-dropdown:state(open) {
            pointer-events: auto;
        }
        
        wa-dropdown::part(menu) {
            min-width: 200px;
        }
    `}};T([_({attribute:!1})],Vc.prototype,`scopeTokens`,void 0),T([_({attribute:!1})],Vc.prototype,`partContextMenuRenderer`,void 0),T([r()],Vc.prototype,`contributions`,void 0),T([r()],Vc.prototype,`isOpen`,void 0),Vc=T([b(`docks-contextmenu`)],Vc);var Hc,Uc=await Ya(Object.assign({"./tabs.de.json":()=>X(()=>import(`./tabs.de-DZHeMxC7-pWV3WfAy.js`),[]),"./tabs.en.json":()=>X(()=>import(`./tabs.en-B4Uo6on_-uQ78kRcs.js`),[])})),Wc=class extends cc{static{Hc=this}constructor(...e){super(...e),this.placement=`top`,this.iconOnly=!1,this.withToolbar=!1,this.hideTabs=!1,this.fitContent=!1,this.fillHeight=!1,this.itemSize=`m`,this.contributions=[],this.tabGroup=u(),this.containerId=null,this.tabGroupListenersAttached=!1,this.tabTitleMenu=u(),this.tabMenuPart=null,this.floatedTabs=new Map,this.hostedParts=new Map}doBeforeUI(){if(this.containerId=this.getAttribute(`id`),!this.containerId)throw Error(`docks-tabs requires an 'id' attribute to function`);this.loadAndResolveContributions()}doInitUI(){this.updateComplete.then(()=>this.ensureTabGroupListenersAndActivate()),g(j,e=>{if(!this.containerId)return;let t=`${this.containerId}-toolbar`;e.target!==t&&e.target===this.containerId&&(this.loadAndResolveContributions(),this.requestUpdate(),this.updateComplete.then(()=>{this.activateNextAvailableTab()}))})}updated(e){super.updated(e),this.contributions.length>0&&this.tabGroup.value&&this.updateComplete.then(()=>this.ensureTabGroupListenersAndActivate()),e.has(`contributions`)&&(this.contributions.length===0&&(this.tabGroupListenersAttached=!1),this.contributions.forEach(e=>{let t=this.getTabPanel(e.name);if(!t)return;let n=this.getPartFromPanel(t);n&&(n.tabContribution=e)}))}has(e){return this.tabGroup.value?!!this.getTabPanel(e):!1}activate(e){if(!this.tabGroup.value)return;this.tabGroup.value.setAttribute(`active`,e);let t=this.getTabPanel(e);t&&this.syncActiveSignalsFromPanel(t)}getActiveEditor(){return this.tabGroup.value?this.tabGroup.value.getAttribute(`active`):null}getTabPart(e){let t=this.getTabPanel(e);return t?this.getPartFromPanel(t):null}open(e){this.contributions.find(t=>t.name===e.name)?this.activate(e.name):(this.contributions.push(e),this.requestUpdate(),this.updateComplete.then(()=>{requestAnimationFrame(()=>{let t=this.getTabPanel(e.name);if(!t)return;let n=this.getPartFromPanel(t);n&&(n.tabContribution=e),this.activate(e.name)})}))}handleTabAuxClick(e,t){e.button===La.MIDDLE&&t.closable&&this.closeTab(e,t.name)}handleTabContextMenu(e,t){let n=this.getTabPanel(t.name),r=n?this.getPartFromPanel(n):null;r&&(e.preventDefault(),e.stopPropagation(),r.tabContribution??=t,this.tabMenuPart=r,this.tabTitleMenu.value?.show({x:e.clientX,y:e.clientY}))}renderTabTitleMenu(){let e=this.tabMenuPart,n=e?.tabContribution;if(!e||!n)return y;let r=this.contributions.filter(e=>e.closable),i=r.filter(e=>e.name!==n.name);return t`
            ${r.length===0?y:t`
                ${this.renderCloseItem(Uc.CLOSE,!n.closable,()=>{this.tryCloseTab(n.name,!0)})}
                ${this.renderCloseItem(Uc.CLOSE_OTHERS,i.length===0,()=>{this.closeNamedTabs(i.map(e=>e.name))})}
                ${this.renderCloseItem(Uc.CLOSE_ALL,!1,()=>{this.closeNamedTabs(r.map(e=>e.name))})}
                <wa-divider></wa-divider>
            `}
            ${Ic({icon:`up-right-from-square`,label:Uc.POP_OUT,action:()=>{this.popOut(e,n),this.tabTitleMenu.value?.close()}})}
        `}renderCloseItem(e,t,n){return Ic({icon:`xmark`,label:e,disabled:t,action:()=>{this.tabTitleMenu.value?.close(),n()}})}async closeNamedTabs(e){for(let t of e)if(!await this.tryCloseTab(t,!0))return}popOut(e,t){this.floatedTabs.set(t.name,t),this.contributions=this.contributions.filter(e=>e.name!==t.name),Do.toPanel(e,()=>this.restorePoppedOut(t.name,e)),this.updateComplete.then(()=>this.activateNextAvailableTab())}async restorePoppedOut(e,t){let n=this.floatedTabs.get(e);this.floatedTabs.delete(e),n&&(this.hostedParts.set(e,t),this.open(n),await this.updateComplete,t.isDirty()&&this.markDirty(e,!0))}async closeTab(e,t){e.stopPropagation(),await this.tryCloseTab(t,!0)}updateTabLabel(e,t){let n=this.contributions.find(t=>t.name===e);n&&(n.label=t,this.contributions=[...this.contributions],this.requestUpdate())}async closeAllTabs(){let e=[...this.contributions.map(e=>e.name)];for(let t of e)if(!await this.tryCloseTab(t,!0))return!1;return!0}async tryCloseTab(e,t){if(t&&this.isDirty(e)&&!await Ls(`Unsaved changes will be lost: Do you really want to close?`))return!1;let n=this.getTabPanel(e);if(!n)return!0;let r=this.contributions.find(t=>t.name===e);if(!r)return!0;if(r.beforeClose&&!await r.beforeClose())return!1;this.hostedParts.delete(e),this.floatedTabs.delete(e),this.cleanupTabInstance(n),this.clearActiveSignalsIfPartInPanel(n);let i=this.contributions.indexOf(r);return i>-1&&this.contributions.splice(i,1),this.requestUpdate(),this.updateComplete.then(()=>{this.activateNextAvailableTab()}),!0}markDirty(e,t){let n=this.getTab(e);n&&n.classList.toggle(`part-dirty`,t)}isDirty(e){let t=this.getTab(e);return!!t&&t.classList.contains(`part-dirty`)}loadAndResolveContributions(){if(!this.containerId)return;let e=M.getContributions(this.containerId),t=new Set(e.map(e=>e.name)),n=this.contributions.filter(e=>!t.has(e.name)&&!this.floatedTabs.has(e.name));this.contributions=[...e.filter(e=>!this.floatedTabs.has(e.name)),...n],this.requestUpdate()}cleanupTabInstance(e){let t=this.getPartFromPanel(e);t&&`close`in t&&typeof t.close==`function`&&t.close()}ensureTabGroupListenersAndActivate(){if(!this.tabGroup.value||this.tabGroupListenersAttached)return;this.tabGroupListenersAttached=!0;let e=this.tabGroup.value;e.addEventListener(`wa-tab-show`,e=>{let t=this.getTabPanel(e.detail.name);t&&this.syncActiveSignalsFromPanel(t)}),e.addEventListener(`click`,e=>{let t=e.target,n=t.closest(`wa-tab`);if(n){let e=n.getAttribute(`panel`);if(e){let t=this.getTabPanel(e);t&&this.syncActiveSignalsFromPanel(t)}return}let r=t.closest(`wa-tab-panel`);r&&this.syncActiveSignalsFromPanel(r)}),this.dirtySignalCleanup?.(),this.dirtySignalCleanup=L(Ze,e=>{if(!e)return;let t=e.closest(`wa-tab-panel`);if(!t)return;let n=t.getAttribute(`name`);n&&this.markDirty(n,e.isDirty())}),this.activateNextAvailableTab()}disconnectedCallback(){this.dirtySignalCleanup?.(),this.dirtySignalCleanup=void 0,super.disconnectedCallback()}activateNextAvailableTab(){if(!this.tabGroup.value)return;let e=this.tabGroup.value.querySelectorAll(`wa-tab`);if(e.length>0){let t=e.item(0).getAttribute(`panel`);t&&this.tabGroup.value.setAttribute(`active`,t)}else this.tabGroup.value.removeAttribute(`active`)}getTabPanel(e){return this.tabGroup.value?this.tabGroup.value.querySelector(`wa-tab-panel[name='${e}']`):null}getTab(e){return this.tabGroup.value?this.tabGroup.value.querySelector(`wa-tab[panel='${e}']`):null}syncActiveSignalsFromPanel(e){let t=this.getPartFromPanel(e);t instanceof lc&&(N.set(null),N.set(t),this.containerId===`editor-area-main`&&t.isEditor&&(Xe.set(null),Xe.set(t)))}clearActiveSignalsIfPartInPanel(e){let t=Array.from(e.querySelectorAll(`*`)).filter(e=>e instanceof lc);for(let e of t)N.get()===e&&N.set(null),Xe.get()===e&&Xe.set(null)}getPartFromPanel(e){let t=e.firstElementChild;return t instanceof lc?t:null}static{this.MAX_TAB_LABEL=16}truncateTabLabel(e){if(!e||e.length<=Hc.MAX_TAB_LABEL)return e;let t=Hc.MAX_TAB_LABEL-1,n=Math.floor(t/2);return e.slice(0,n)+`…`+e.slice(-(t-n))}withToolbarOrientation(){return this.placement===`start`||this.placement===`end`?`vertical`:`horizontal`}renderNavToolbar(e){return!this.withToolbar||!e?y:t`
            <div class="nav-toolbar-spacer" slot="nav" aria-hidden="true"></div>
            <docks-toolbar
                slot="nav"
                id=${e}
                orientation=${this.withToolbarOrientation()}
                align="center"
                size=${this.itemSize}
            ></docks-toolbar>
        `}renderTabBody(e){let n=this.hostedParts.get(e.name);return n?t`${n}`:e.component?e.component(e.name):y}renderEmptyState(){let e=Ts.getCurrentApp();return t`
            <div class="empty-state">
                ${c(e,()=>t`
                        <div class="empty-content">
                            <h2 class="empty-title">${e.name}</h2>
                            ${c(e.description,()=>t`<p class="empty-description">${e.description}</p>`)}
                        </div>
                    `,()=>t`<wa-icon name="folder-open" class="empty-icon"></wa-icon>`)}
            </div>
        `}render(){let e=this.containerId??this.getAttribute(`id`),n=e?`${e}-toolbar`:``,r=this.withToolbar&&!!n;return this.contributions.length===0&&!r?this.renderEmptyState():this.contributions.length===0?t`
                <wa-tab-group ${i(this.tabGroup)} placement=${this.placement}>
                    ${this.renderNavToolbar(n)}
                </wa-tab-group>
            `:t`
            <wa-tab-group ${i(this.tabGroup)} placement=${this.placement}>
                ${ee(this.contributions,e=>e.name,e=>{let n=e.label??e.name,r=this.truncateTabLabel(n);return t`
                        <wa-tab panel="${e.name}"
                                title="${n}"
                                @auxclick="${t=>this.handleTabAuxClick(t,e)}"
                                @contextmenu="${t=>this.handleTabContextMenu(t,e)}">
                            ${R(e.icon,{label:n})}
                            ${this.iconOnly?y:r}
                            ${c(e.closable,()=>t`
                                <wa-icon name="xmark" label="Close"  @click="${t=>this.closeTab(t,e.name)}"></wa-icon>
                            `)}
                        </wa-tab>
                        <wa-tab-panel name="${e.name}">
                            ${this.renderTabBody(e)}
                        </wa-tab-panel>
                    `})}
                ${this.renderNavToolbar(n)}
            </wa-tab-group>
            <docks-contextmenu
                ${i(this.tabTitleMenu)}
                id=${e?ka(e):y}
                .partContextMenuRenderer=${()=>this.renderTabTitleMenu()}>
            </docks-contextmenu>
        `}static{this.styles=v`
        :host {
            height: 100%;
            width: 100%;
        }

        :host([fit-content]) {
            display: flex;
            flex-direction: column;
            height: auto;
            max-height: 100%;
            min-height: 0;
        }

        :host([fit-content]) wa-tab-group {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            min-height: 0;
            height: auto;
            max-height: 100%;
        }

        :host([fit-content]) wa-tab-group::part(base) {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            min-height: 0;
            max-height: 100%;
            height: auto;
        }

        :host([fit-content]) wa-tab-group::part(body) {
            flex: 1 1 auto;
            min-height: 0;
            height: auto;
            overflow-x: hidden;
            overflow-y: auto;
        }

        :host([fit-content]) wa-tab-panel[active] {
            display: block;
            height: auto;
            overflow: visible;
        }

        :host([fit-content]) wa-tab-panel > * {
            height: auto;
            min-height: 0;
        }

        :host([fill-height]) {
            display: flex;
            flex-direction: column;
            height: 100%;
            min-height: 0;
            max-height: 100%;
        }

        :host([fill-height]) wa-tab-group {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            min-height: 0;
            height: 100%;
            max-height: 100%;
        }

        :host([fill-height]) wa-tab-group::part(base) {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            min-height: 0;
            max-height: 100%;
            height: 100%;
        }

        :host([fill-height]) wa-tab-group::part(body) {
            flex: 1 1 auto;
            min-height: 0;
            overflow-x: hidden;
            overflow-y: auto;
        }

        :host([fill-height]) wa-tab-panel[active] {
            display: block;
            height: auto;
            overflow: visible;
        }

        :host([fill-height]) wa-tab-panel > * {
            height: auto;
            min-height: 0;
        }

        wa-tab-group {
            height: 100%;
            width: 100%;
            min-height: 0;
        }

        :host([hide-tabs]) wa-tab {
            display: none !important;
        }

        /* Tab strip (wa-tab-group part tabs, inside shadow .nav); hiding only wa-tab leaves an empty nav row. */
        :host([hide-tabs]) wa-tab-group::part(tabs) {
            display: none;
        }

        :host([hide-tabs]:not([with-toolbar])) wa-tab-group::part(nav) {
            display: none;
        }

        /* Single grid row so the body uses 1fr instead of the auto nav row when tabs are hidden. */
        :host([hide-tabs]:is([placement="top"], [placement="bottom"])) wa-tab-group::part(base) {
            grid-template-rows: minmax(0, 1fr);
        }

        :host([hide-tabs]) wa-tab-group::part(body) {
            min-height: 0;
            height: 100%;
            overflow: hidden;
        }

        /* Top: nav (order 0) → row 1 auto, body (order 2) → row 2 1fr. */
        :host([placement="top"]) wa-tab-group::part(base) {
            display: grid;
            grid-template-rows: auto minmax(0, 1fr);
            height: 100%;
            width: 100%;
        }

        /* Bottom: body (order 1) → row 1 1fr, nav (order 2) → row 2 auto. */
        :host([placement="bottom"]) wa-tab-group::part(base) {
            display: grid;
            grid-template-rows: minmax(0, 1fr) auto;
            height: 100%;
            width: 100%;
        }

        :host([placement="bottom"]) wa-tab-group::part(body) {
            min-height: 0;
            overflow: hidden;
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
            font-size: var(--wa-font-size-s);
        }

        :host([item-size="s"]) wa-tab::part(base) {
            padding: 2px 0.375rem;
            font-size: var(--wa-font-size-xs);
        }

        :host([item-size="l"]) wa-tab::part(base) {
            padding: var(--wa-space-s) 0.75rem;
            font-size: var(--wa-font-size-m);
        }

        :host([icon-only]) wa-tab::part(base) {
            justify-content: center;
        }

        :host([icon-only]:is([placement="top"], [placement="bottom"])) wa-tab::part(base) {
            padding: var(--wa-space-s);
        }

        :host([icon-only][item-size="s"]:is([placement="top"], [placement="bottom"])) wa-tab::part(base) {
            padding: var(--wa-space-xs);
        }

        :host([icon-only][item-size="l"]:is([placement="top"], [placement="bottom"])) wa-tab::part(base) {
            padding: var(--wa-space-m);
        }

        :host([icon-only]:is([placement="start"], [placement="end"])) wa-tab::part(base) {
            padding-inline: 0;
            padding-block: var(--wa-space-s);
        }

        :host([icon-only][item-size="s"]:is([placement="start"], [placement="end"])) wa-tab::part(base) {
            padding-block: var(--wa-space-xs);
        }

        :host([icon-only][item-size="l"]:is([placement="start"], [placement="end"])) wa-tab::part(base) {
            padding-block: var(--wa-space-m);
        }

        :host([icon-only]) wa-tab wa-icon {
            font-size: var(--wa-font-size-l);
        }

        :host([icon-only][item-size="s"]) wa-tab wa-icon {
            font-size: var(--wa-font-size-m);
        }

        :host([icon-only][item-size="l"]) wa-tab wa-icon {
            font-size: var(--wa-font-size-xl);
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
    `}};T([_({reflect:!0})],Wc.prototype,`placement`,void 0),T([_({type:Boolean,reflect:!0,attribute:`icon-only`})],Wc.prototype,`iconOnly`,void 0),T([_({type:Boolean,reflect:!0,attribute:`with-toolbar`})],Wc.prototype,`withToolbar`,void 0),T([_({type:Boolean,reflect:!0,attribute:`hide-tabs`})],Wc.prototype,`hideTabs`,void 0),T([_({type:Boolean,reflect:!0,attribute:`fit-content`})],Wc.prototype,`fitContent`,void 0),T([_({type:Boolean,reflect:!0,attribute:`fill-height`})],Wc.prototype,`fillHeight`,void 0),T([_({reflect:!0,attribute:`item-size`})],Wc.prototype,`itemSize`,void 0),T([r()],Wc.prototype,`contributions`,void 0),Wc=Hc=T([b(`docks-tabs`)],Wc);var Gc,Kc=class extends uo{static{Gc=this}constructor(...e){super(...e),this.orientation=`horizontal`,this.gridSizes=[],this.gridChildren=[],this.resizing=null,this.resizeOverlay=null,this.childStylesApplied=!1,this.refreshScheduled=!1,this.layoutGeneration=0,this.handleResize=e=>{if(!this.resizing)return;let t=(this.orientation===`horizontal`?e.clientX:e.clientY)-this.resizing.startPos,n=[...this.resizing.startSizes];n[this.resizing.handleIndex]+=t,n[this.resizing.handleIndex+1]-=t;let r=this.orientation===`horizontal`?this.offsetWidth:this.offsetHeight,i=r*.05;if(n[this.resizing.handleIndex]>=i&&n[this.resizing.handleIndex+1]>=i){this.resizing.currentSizes=n;let e=n.map((e,t)=>{let i=`${(e/r*100).toFixed(2)}%`;return t===n.length-1?i:`${i} ${Gc.HANDLE_VISUAL_SIZE_PX}px`}).join(` `);this.orientation===`horizontal`?this.style.gridTemplateColumns=e:this.style.gridTemplateRows=e}},this.stopResize=async()=>{if(this.resizing?.currentSizes){let e=this.orientation===`horizontal`?this.offsetWidth:this.offsetHeight;this.gridSizes=this.resizing.currentSizes.map(t=>`${(t/e*100).toFixed(2)}%`),await this.saveSizes(),this.requestUpdate()}this.resizeOverlay&&=(document.body.removeChild(this.resizeOverlay),null),this.resizing=null,document.removeEventListener(`mousemove`,this.handleResize),document.removeEventListener(`mouseup`,this.stopResize),document.body.style.cursor=``,document.body.style.userSelect=``}}static{this.HANDLE_VISUAL_SIZE_PX=1}static{this.HANDLE_HITBOX_PADDING_PX=4}createRenderRoot(){return this}doBeforeUI(){this.mutationObserver=new MutationObserver(()=>{this.scheduleRefreshGridLayout()}),this.mutationObserver.observe(this,{childList:!0,subtree:!1}),this.scheduleRefreshGridLayout()}scheduleRefreshGridLayout(){this.refreshScheduled||(this.refreshScheduled=!0,queueMicrotask(()=>{this.refreshScheduled=!1,this.refreshGridLayout()}))}getGridChildrenFromDom(){return Array.from(this.children).filter(e=>e.tagName!==`STYLE`&&e.tagName!==`SCRIPT`&&!e.classList.contains(`resize-handle`))}static isNestedResizableGrid(e){return e.tagName.toLowerCase()===`docks-resizable-grid`}applyChildLayoutStyles(){this.gridChildren.forEach((e,t)=>{e.style.overflow=`hidden`,e.style.height=`100%`,e.style.width=`100%`,e.style.gridColumn=this.orientation===`horizontal`?`${t*2+1}`:`1`,e.style.gridRow=this.orientation===`vertical`?`${t*2+1}`:`1`,Gc.isNestedResizableGrid(e)||(e.style.display=`flex`,e.style.flexDirection=`column`)})}resolveGridSizes(e){let t=this.sizes?.split(`,`).map(e=>e.trim()).filter(Boolean)??[];if(t.length===e)return t;let n=`${100/e}%`;return Array.from({length:e},()=>n)}resolvePersistedSizes(e,t){if(!e||typeof e!=`object`)return null;let n=e,r=n.sizesByCount?.[String(t)];return Array.isArray(r)&&r.length===t&&r.every(e=>typeof e==`string`)?r:Array.isArray(n.sizes)&&n.sizes.length===t&&n.sizes.every(e=>typeof e==`string`)?n.sizes:null}async refreshGridLayout(){let e=++this.layoutGeneration,t=this.getGridChildrenFromDom();if(t.length===0){this.gridChildren=[],this.gridSizes=[],this.childStylesApplied=!1,this.requestUpdate();return}let n=t.length!==this.gridChildren.length||t.some((e,t)=>e!==this.gridChildren[t]);this.gridChildren=t;let r=await this.getDialogSetting();if(e!==this.layoutGeneration)return;let i=this.resolvePersistedSizes(r,this.gridChildren.length);if(i){let e=i.join(`|`)!==this.gridSizes.join(`|`);this.gridSizes=i,(n||e)&&(this.childStylesApplied=!1),this.requestUpdate();return}let a=this.resolveGridSizes(this.gridChildren.length),o=a.join(`|`)!==this.gridSizes.join(`|`);this.gridSizes=a,(n||o)&&(this.childStylesApplied=!1),this.requestUpdate()}doInitUI(){this.scheduleRefreshGridLayout()}async saveSizes(){if(this.gridSizes.length===0)return;let e=await this.getDialogSetting(),t=e&&typeof e==`object`?e.sizesByCount??{}:{};await this.setDialogSetting({sizes:this.gridSizes,sizesByCount:{...t,[String(this.gridSizes.length)]:this.gridSizes},orientation:this.orientation})}updated(e){super.updated(e),e.has(`sizes`)&&this.scheduleRefreshGridLayout(),!this.childStylesApplied&&this.gridChildren.length>0&&(this.childStylesApplied=!0,this.applyChildLayoutStyles())}startResize(e,t){if(e.preventDefault(),t>=this.gridChildren.length-1)return;let n=this.orientation===`horizontal`?e.clientX:e.clientY,r=this.orientation===`horizontal`?this.offsetWidth:this.offsetHeight,i=this.gridSizes.map(e=>e.endsWith(`%`)?parseFloat(e)/100*r:(e.endsWith(`px`),parseFloat(e)));this.resizing={handleIndex:t,startPos:n,startSizes:i},this.resizeOverlay=document.createElement(`div`),this.resizeOverlay.style.position=`fixed`,this.resizeOverlay.style.top=`0`,this.resizeOverlay.style.left=`0`,this.resizeOverlay.style.width=`100%`,this.resizeOverlay.style.height=`100%`,this.resizeOverlay.style.zIndex=`9999`,this.resizeOverlay.style.cursor=this.orientation===`horizontal`?`col-resize`:`row-resize`,document.body.appendChild(this.resizeOverlay),document.addEventListener(`mousemove`,this.handleResize),document.addEventListener(`mouseup`,this.stopResize),document.body.style.cursor=this.orientation===`horizontal`?`col-resize`:`row-resize`,document.body.style.userSelect=`none`}render(){if(this.gridChildren.length===0||this.gridSizes.length===0)return y;let e=this.gridSizes.flatMap((e,t)=>t===this.gridSizes.length-1?[e]:[e,`${Gc.HANDLE_VISUAL_SIZE_PX}px`]).join(` `);return this.style.display=`grid`,this.orientation===`horizontal`?(this.style.gridTemplateColumns=e,this.style.gridTemplateRows=`100%`):(this.style.gridTemplateColumns=`100%`,this.style.gridTemplateRows=e),this.style.overflow=`hidden`,t`
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
                    right: -${Gc.HANDLE_HITBOX_PADDING_PX}px;
                    left: -${Gc.HANDLE_HITBOX_PADDING_PX}px;
                }

                .resize-handle.vertical::before {
                    top: -${Gc.HANDLE_HITBOX_PADDING_PX}px;
                    bottom: -${Gc.HANDLE_HITBOX_PADDING_PX}px;
                }
                
                .resize-handle:hover {
                    background-color: var(--wa-color-brand-fill-normal);
                }
            </style>
            
            ${this.gridChildren.map((e,n)=>{if(n<this.gridChildren.length-1){let e=this.orientation===`horizontal`?`${n*2+2}`:`1`,r=this.orientation===`vertical`?`${n*2+2}`:`1`;return t`
                        <div 
                            class="resize-handle ${this.orientation===`horizontal`?`horizontal`:`vertical`}"
                            style="
                                cursor: ${this.orientation===`horizontal`?`col-resize`:`row-resize`};
                                grid-column: ${e};
                                grid-row: ${r};
                            "
                            @mousedown=${e=>this.startResize(e,n)}
                        ></div>
                    `}return y})}
        `}disconnectedCallback(){super.disconnectedCallback(),this.resizing&&this.stopResize(),this.mutationObserver&&=(this.mutationObserver.disconnect(),void 0)}connectedCallback(){super.connectedCallback(),this.style.height=`100%`,this.style.width=`100%`}};T([_()],Kc.prototype,`orientation`,void 0),T([_()],Kc.prototype,`sizes`,void 0),T([r()],Kc.prototype,`gridSizes`,void 0),T([r()],Kc.prototype,`gridChildren`,void 0),Kc=Gc=T([b(`docks-resizable-grid`)],Kc),wc();var qc=class extends dt{constructor(...e){super(...e),this.message=`No content.`,this.icon=`info-circle`}render(){return t`
            <div class="empty" role="status">
                <div class="empty-icon-wrap" aria-hidden="true">
                    <wa-icon name=${this.icon} label=""></wa-icon>
                </div>
                <p class="empty-message">${this.message}</p>
            </div>
        `}static{this.styles=v`
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
    `}};T([_()],qc.prototype,`message`,void 0),T([_()],qc.prototype,`icon`,void 0),qc=T([b(`docks-no-content`)],qc);var Jc=new class{constructor(){this.editorInputHandlers=[],this.cachedIconContributions=null,g(St,()=>{}),g(j,e=>{e.target===`system.icons`&&(this.cachedIconContributions=null)})}getSortedIconContributions(){if(this.cachedIconContributions!==null)return this.cachedIconContributions;let e=M.getContributions(`system.icons`);return this.cachedIconContributions=[...e].sort((e,t)=>{let n=e.priority??0,r=t.priority??0;return r===n?e.label.localeCompare(t.label):r-n}),this.cachedIconContributions}registerEditorInputHandler(e){this.editorInputHandlers.push({definition:e,initialized:!1}),this.editorInputHandlers.sort((e,t)=>{let n=e.definition.ranking??0;return(t.definition.ranking??0)-n})}async ensureHandlerInitialized(e){let t=e.definition;t.lazyInit&&!e.initialized&&(e.lazyInitPromise||=Promise.resolve(t.lazyInit()).then(()=>{e.initialized=!0,e.lazyInitPromise=void 0}).catch(t=>{throw e.lazyInitPromise=void 0,t}),await e.lazyInitPromise)}getEditorOptionsForInput(e){let t=new Set,n=[];for(let r of this.editorInputHandlers){let i=r.definition;i.canHandle(e)&&!t.has(i.editorId)&&(t.add(i.editorId),n.push({editorId:i.editorId,title:i.label,icon:i.icon}))}return n}async handleInput(e,t){if(t!==void 0){let n=this.editorInputHandlers.find(e=>e.definition.editorId===t);if(n){await this.ensureHandlerInitialized(n);let t=await n.definition.handle(e);return t&&(t.editorId=n.definition.editorId),t}}else for(let t=0;t<this.editorInputHandlers.length;t++){let n=this.editorInputHandlers[t],r=n.definition;if(r.canHandle(e)){await this.ensureHandlerInitialized(n);let t=await r.handle(e);return t&&(t.editorId=r.editorId),t}}}getEditorArea(){return document.querySelector(`docks-tabs#${Oa}`)}tabLabelForEditorInput(e){return e.data instanceof V?e.data.getName():e.title}async loadEditor(e,t){if(!e||(`component`in e||(e=await this.handleInput(e,t)),!e||!(`component`in e)))return;let n=e.editorId??t;n&&(e.editorId=n);let r=e;await this.openTab({name:r.key,editorId:n,label:this.tabLabelForEditorInput(r),icon:r.icon,closable:!0,toolbar:r.toolbar,component:r.component})}async openTab(e,t){let n=this.getEditorArea();if(!n)console.error(`Editor area not found. The split pane system may not be initialized yet.`);else if(t?.singleTab){if(!await n.closeAllTabs())return;n.open(e)}else n.has(e.name)?n.activate(e.name):n.open(e)}getFileIcon(e){let t=e.includes(`.`)?e.split(`.`).pop()?.toLowerCase()||``:e.toLowerCase(),n=this.getSortedIconContributions();if(n.length===0)return`file`;for(let e of n)if(e.mappings&&e.mappings[t])return e.mappings[t];return`file`}};x.put(`editorRegistry`,Jc),M.registerContribution(`system.icons`,{label:`Default File Icons`,mappings:{pdf:`file-pdf`,md:`book`,txt:`file-lines`,ts:`code`,tsx:`code`,js:`code`,jsx:`code`,json:`file-code`,geojson:`file-code`,py:`docks python`,ipynb:`docks jupyter`,html:`code`,htm:`code`,css:`code`,scss:`code`,sass:`code`,xml:`file-code`,yaml:`file-code`,yml:`file-code`,sql:`database`,kml:`file-code`,gpx:`file-code`,jpg:`image`,jpeg:`image`,png:`image`,gif:`image`,svg:`image`,webp:`image`,bmp:`image`,ico:`image`},priority:0});var Yc=(e,t)=>!e.leaf&&t.leaf?-1:e.leaf&&!t.leaf?1:e.label.localeCompare(t.label),Xc,Zc=me(`DocksFileBrowser`),$=await Ya(Object.assign({"./filebrowser.de.json":()=>X(()=>import(`./filebrowser.de-CTrhMO8S-C89R925P.js`),[]),"./filebrowser.en.json":()=>X(()=>import(`./filebrowser.en-CU-1gCNA-m5nqBB1G.js`),[])})),Qc=250;function $c(e){return new Promise((t,n)=>e.file(t,n))}function el(e){return new Promise((t,n)=>{let r=[],i=()=>{e.readEntries(e=>{e.length===0?t(r):(r.push(...e),i())},n)};i()})}async function tl(e,t,n,r=``){let i=r?`${r}/${e.name}`:e.name;if(e.isFile){try{t.push({relativePath:i,file:await $c(e)}),n?.(t.length)}catch(e){Zc.error(`Failed to read dropped file "${i}":`,e)}return}if(!e.isDirectory)return;let a;try{a=await el(e.createReader())}catch(e){Zc.error(`Failed to read dropped folder "${i}":`,e);return}for(let e of a)await tl(e,t,n,i)}async function nl(e,t){let n=Array.from(e.items??[]).filter(e=>e.kind===`file`).map(e=>e.webkitGetAsEntry?.()??null).filter(e=>e!==null),r=Array.from(e.files??[]);if(n.length===0)return r.map(e=>({relativePath:e.webkitRelativePath||e.name,file:e}));let i=[];for(let e of n)await tl(e,i,t);return i}var rl=class extends lc{static{Xc=this}constructor(...e){super(...e),this.settingsLoaded=!1,this.treeRef=u(),this.loadingNodes=new Set,this.treeBuildGeneration=0,this.syncContextMenuTarget=e=>{let t=e.target.closest(`wa-tree-item`)?.model?.data;t instanceof Ct&&P.set(t)}}static{this.SETTINGS_VERSION=1}static{this.SETTINGS_KEY_SELECTED_PATH=`selectedPath`}doBeforeUI(){this.initializeWorkspace(),g(j,e=>{e.target===`system.icons`&&this.requestUpdate()}),this.subscribe(z,e=>this.onWorkspaceChanged(e)),this.subscribe(St,e=>this.onWorkspaceConnected(e))}disconnectedCallback(){this.treeContextMenuAbort?.abort(),this.treeContextMenuAbort=void 0,this.workspaceChangedDebounceId!==void 0&&(clearTimeout(this.workspaceChangedDebounceId),this.workspaceChangedDebounceId=void 0),this.pendingWorkspaceDir=void 0,super.disconnectedCallback()}firstUpdated(e){super.firstUpdated(e),this.setupDragAndDrop()}updated(e){super.updated(e),e.has(`workspaceDir`)&&this.workspaceDir&&this.setupDragAndDrop()}async initializeWorkspace(){let e=await U.getWorkspace();await this.loadWorkspace(e??void 0)}renderToolbar(){return t`
            <docks-command icon="folder-open" title="${$.CONNECT_WORKSPACE}" dropdown="filebrowser.connections"></docks-command>
            <docks-command icon="docks file-plus" title="${$.CREATE_NEW}" dropdown="filebrowser.create"></docks-command>
        `}renderContextMenu(){let e=P.get(),n=e instanceof V?e:null,r=n?Jc.getEditorOptionsForInput(n):[],i=r.length>0;return t`
            ${Ic({cmd:`open_editor`,icon:`folder-open`,label:$.OPEN})}
            ${i?t`
                <wa-dropdown-item>
                    ${R(`folder-open`,{slot:`icon`})}
                    ${$.OPEN_WITH}
                    ${r.map(e=>Ic({cmd:`open_editor`,icon:e.icon??`file`,label:e.title,params:{path:n.getWorkspacePath(),editorId:e.editorId},slot:`submenu`}))}
                </wa-dropdown-item>
            `:y}
            ${Bc({icon:`docks file-plus`,label:$.CREATE_NEW,contributionTarget:`filebrowser.create`})}
            ${Ic({cmd:`refresh_resource`,icon:`repeat`,label:$.REFRESH_RESOURCE})}
        `}onWorkspaceChanged(e){this.pendingWorkspaceDir=e,this.workspaceChangedDebounceId!==void 0&&clearTimeout(this.workspaceChangedDebounceId),this.workspaceChangedDebounceId=setTimeout(()=>{this.workspaceChangedDebounceId=void 0;let e=this.pendingWorkspaceDir;this.pendingWorkspaceDir=void 0,e?this.applyWorkspaceChange(e):this.loadWorkspace(void 0,!0)},Qc)}async applyWorkspaceChange(e){P.set(void 0),await this.loadWorkspace(e,!0),await this.syncTreeSelection()}async onWorkspaceConnected(e){P.set(void 0),await this.loadWorkspace(e,!0)}async loadWorkspace(e,t=!1){this.treeBuildGeneration+=1;let n=this.treeBuildGeneration;if(this.loadingNodes.clear(),this.workspaceDir=e,!e){this.root=void 0,this.settingsLoaded&&await this.persistSelectedPath(null);return}let r=await this.resourceToTreeNode(e,!0,t);n===this.treeBuildGeneration&&(this.root=r,await this.restoreSelectionFromSettings(),this.treeBuildGeneration)}async persistSelectedPath(e){await this.setDialogSetting({v:Xc.SETTINGS_VERSION,[Xc.SETTINGS_KEY_SELECTED_PATH]:e})}async restoreSelectionFromSettings(){if(this.settingsLoaded)return;this.settingsLoaded=!0;let e=(await this.getDialogSetting())?.[Xc.SETTINGS_KEY_SELECTED_PATH];if(typeof e!=`string`||e.length===0)return;await this.updateComplete;let t=this.treeRef.value?.querySelector(`wa-tree`);if(t){if(typeof e==`string`&&e.length>0){let n=Array.from(t.querySelectorAll(`wa-tree-item`)).find(t=>{let n=(t?.model?.data)?.getWorkspacePath?.();return typeof n==`string`&&n===e});if(n){await this.selectTreeItem(n);return}}await this.selectFirstConnectedFolder(t)}}async selectTreeItem(e){let t=e.parentElement?.closest?.(`wa-tree-item`);for(;t;)t.expanded=!0,t=t.parentElement?.closest?.(`wa-tree-item`);e.selected=!0,await this.syncTreeSelection()}async selectFirstConnectedFolder(e){let t=Array.from(e.children).filter(e=>e instanceof HTMLElement&&e.tagName.toLowerCase()===`wa-tree-item`);if(t.length===0)return;let n=t.find(e=>e?.model?.data instanceof H)??t[0];await this.selectTreeItem(n)}async syncTreeSelection(){await this.updateComplete;let e=this.treeRef.value?.querySelector(`wa-tree`)?.selectedItems||[];e.length>0&&P.set(e[0].model?.data)}async resourceToTreeNode(e,t=!1,n=!1){let r=this.treeBuildGeneration,i=e instanceof V,a={data:e,label:e.getName(),leaf:i,children:[]};if(e instanceof H&&!e.getParent())try{let t=await U.getFolderInfoForDirectory(e);if(r!==this.treeBuildGeneration)return a.loaded=!a.leaf,a;t?.backendName&&(a.workspaceTag=t.backendName)}catch(e){Zc.debug(`Failed to get workspace info for directory`,e)}if(e instanceof H&&t){try{let t=await e.listChildren(n);if(r!==this.treeBuildGeneration)return a.loaded=!0,a;for(let i of t){let t=e===this.workspaceDir,o=await this.resourceToTreeNode(i,t,t&&n);if(r!==this.treeBuildGeneration)return a.loaded=!0,a;a.children.push(o)}a.children.sort(Yc)}catch(t){if(r!==this.treeBuildGeneration||!await U.isResourceInCurrentWorkspace(e))return a.loaded=!0,a;a.loadError=t instanceof Error?t.message:String(t),Zc.error(`Failed to load directory children:`,t)}a.loaded=!0}return e instanceof Mt&&(a.placeholderNotice=e.getFailureReason()),a}createTreeItems(e,n=!1){if(!e)return t``;let r=!e.leaf&&!e.loaded,i=e.data,a=i instanceof V,o=!!i.getParent(),s=a?Jc.getFileIcon(i.getName()):e.icon||`folder-open`,c=e.workspaceTag,l=e.loadError,u=e.placeholderNotice,d=l?$.FOLDER_LOAD_FAILED({detail:l}):u?$.FOLDER_UNAVAILABLE({detail:u}):null;return t`
            <wa-tree-item 
                draggable=${o}
                @dragstart=${o?this.nobubble(e=>this.onDragStart(e,i)):void 0}
                @dblclick=${this.nobubble(this.onFileDoubleClicked)}
                @wa-lazy-load=${this.nobubble(t=>this.onLazyLoad(t,e))}
                .model=${e} 
                ?expanded=${n}
                ?lazy=${r}>
                <div class="tree-item-rows">
                    <div class="tree-item-label-row">
                        <span class="tree-label">
                            ${R(s,{label:e.leaf?$.FILE:$.FOLDER})}
                            <span class="tree-label-text">${e.label}</span>
                            ${!e.leaf&&c?t`<wa-badge appearance="outlined" variant="neutral" style="font-size: var(--wa-font-size-xs);">${c}</wa-badge>`:null}
                        </span>
                    </div>
                    ${d?t`<div class="tree-item-detail-row tree-item-error-text">${d}</div>`:y}
                </div>
                ${e.children.map(e=>this.createTreeItems(e,!1))}
            </wa-tree-item>`}onDragStart(e,t){if(!e.dataTransfer||!t.getParent())return;let n=e.currentTarget?.closest(`wa-tree`),r=Array.isArray(n?.selectedItems)?n.selectedItems:[],i=[];if(r.length>0)for(let e of r){let t=e.model?.data;t&&t.getParent()&&i.push(t)}i.length===0&&i.push(t);let a=i.map(e=>e.getWorkspacePath()),o=i.length===1?i[0].getName():`${i.length} items`;e.dataTransfer.effectAllowed=`copyMove`;let s=a.join(`
`);if(e.dataTransfer.setData(`text/plain`,s),e.dataTransfer.setData(`application/x-workspace-file`,s),e.dataTransfer.setData(`text/uri-list`,s),e.dataTransfer.setDragImage){let t=document.createElement(`div`);t.textContent=o,t.style.position=`absolute`,t.style.top=`-1000px`,t.style.padding=`4px 8px`,t.style.background=`var(--wa-color-neutral-10)`,t.style.border=`1px solid var(--wa-color-neutral-30)`,t.style.borderRadius=`4px`,document.body.appendChild(t),e.dataTransfer.setDragImage(t,0,0),setTimeout(()=>document.body.removeChild(t),0)}}async onLazyLoad(e,t){let n=t.data;n instanceof H&&t.children.length===0&&await this.loadNodeChildren(t,n)}async loadNodeChildren(e,t){if(this.loadingNodes.has(e))return;let n=this.treeBuildGeneration;this.loadingNodes.add(e);try{let r=await t.listChildren(!1);if(n!==this.treeBuildGeneration)return;for(let t of r){let r=await this.resourceToTreeNode(t,!1);if(n!==this.treeBuildGeneration)return;e.children.push(r)}e.children.sort(Yc),e.loaded=!0,this.requestUpdate()}catch(r){if(n!==this.treeBuildGeneration)return;if(!await U.isResourceInCurrentWorkspace(t)){e.loaded=!0,this.requestUpdate();return}e.loadError=r instanceof Error?r.message:String(r),Zc.error(`Failed to load directory children:`,r),this.requestUpdate()}finally{this.loadingNodes.delete(e)}}async onFileDoubleClicked(e){let t=e.currentTarget,n=t.model;if(!n)return;let r=n.data;r instanceof V?(P.set(r),this.executeCommand(`open_editor`,{})):!n.leaf&&`expanded`in t&&(t.expanded=!t.expanded)}onSelectionChanged(e){let t=e.detail.selection;if(t&&t.length>0){let e=t[0].model.data;P.set(e);let n=e?.getWorkspacePath?.();typeof n==`string`?this.persistSelectedPath(n):this.persistSelectedPath(null)}else P.set(void 0),this.persistSelectedPath(null)}getDirectoryDropTargetFromEvent(e){if(!this.workspaceDir)return;let t=e.target.closest(`wa-tree-item`);if(!t){let e=this.root?.children??[];if(e.length!==1)return;let t=e[0]?.data;return t instanceof H?t:void 0}let n=t.model?.data;if(n instanceof H)return n}attachTreeContextMenuSync(){this.treeContextMenuAbort?.abort();let e=this.treeRef.value?.querySelector(`wa-tree`);e&&(this.treeContextMenuAbort=new AbortController,e.addEventListener(`contextmenu`,this.syncContextMenuTarget,{capture:!0,signal:this.treeContextMenuAbort.signal}))}setupDragAndDrop(){let e=this.treeRef.value;if(!e)return;this.attachTreeContextMenuSync();let t=t=>{let n=t.dataTransfer?.types;if(!n)return;let r=n.includes(`Files`),i=n.includes(`application/x-workspace-file`);if(!r&&!i)return;if(!this.getDirectoryDropTargetFromEvent(t)){this.currentDropTarget?.classList.remove(`drop-target`),this.currentDropTarget=void 0,e.classList.remove(`drag-over`);return}t.preventDefault(),t.dataTransfer&&(i?t.dataTransfer.dropEffect=t.ctrlKey||t.metaKey?`copy`:`move`:t.dataTransfer.dropEffect=`copy`),e.classList.add(`drag-over`);let a=t.target.closest(`wa-tree-item`);a?a!==this.currentDropTarget&&(this.currentDropTarget?.classList.remove(`drop-target`),this.currentDropTarget=a,a.classList.add(`drop-target`)):(this.currentDropTarget?.classList.remove(`drop-target`),this.currentDropTarget=void 0)},n=t=>{let n=t.dataTransfer?.types;if(!n)return;let r=n.includes(`Files`),i=n.includes(`application/x-workspace-file`);(r||i)&&this.getDirectoryDropTargetFromEvent(t)&&(t.preventDefault(),e.classList.add(`drag-over`))},r=t=>{let n=e.getBoundingClientRect(),r=t.clientX,i=t.clientY;(r<=n.left||r>=n.right||i<=n.top||i>=n.bottom)&&(e.classList.remove(`drag-over`),this.currentDropTarget?.classList.remove(`drop-target`),this.currentDropTarget=void 0)},i=async t=>{if(t.preventDefault(),e.classList.remove(`drag-over`),this.currentDropTarget?.classList.remove(`drop-target`),this.currentDropTarget=void 0,!t.dataTransfer||!this.workspaceDir)return;let n=this.getDirectoryDropTargetFromEvent(t);if(!n)return;let r=t.dataTransfer.types;if(r.includes(`Files`)){let e=t.dataTransfer;await Ra.runAsync($.DROP_UPLOAD_TASK,async t=>{let r=await nl(e,e=>{t.message=$.DROP_SCANNING({count:String(e)})});r.length!==0&&await this.handleFilesDrop(r,n,t)})}else r.includes(`application/x-workspace-file`)&&await this.handleWorkspaceDrop(t,n)};e.removeEventListener(`dragover`,t),e.removeEventListener(`dragenter`,n),e.removeEventListener(`dragleave`,r),e.removeEventListener(`drop`,i),e.addEventListener(`dragover`,t),e.addEventListener(`dragenter`,n),e.addEventListener(`dragleave`,r),e.addEventListener(`drop`,i)}async handleWorkspaceDrop(e,t){if(!e.dataTransfer)return;let n=e.dataTransfer.getData(`application/x-workspace-file`);if(!n)return;let r=n.split(/\r?\n/).map(e=>e.trim()).filter(e=>!!e);if(r.length===0)return;let i=await U.getWorkspace();if(!i){Zc.warn(`Workspace drop ignored because no workspace is connected`);return}let a=async n=>{let r=n.getWorkspace(),i=t.getWorkspace();return!r||!i?!1:r===i&&!(e.ctrlKey||e.metaKey)},o=new Set,s=t.getWorkspace(),c=0,l=0,u=[];for(let e of r)try{let t=await i.getResource(e);if(!t){Zc.warn(`Workspace drop: source not found for path "${e}"`),l++;continue}u.push({path:e,resource:t});let n=t.getWorkspace();n&&o.add(n)}catch(t){Zc.error(`Failed to handle workspace drop for "${e}":`,t),l++}if(u.length===0){l>0&&Zc.info(`Workspace drop failed for ${l} item(s)`);return}let d=!1;if(s){for(let e of o)if(e!==s){d=!0;break}}if(d&&s)try{let e=Array.from(o),t=await U.getFolderInfoForDirectory(e[0]),n=await U.getFolderInfoForDirectory(s),r=t?.backendName??$.UNKNOWN_BACKEND,i=n?.backendName??$.UNKNOWN_BACKEND;if(!await Ls($.DND_CROSS_CONNECTION_CONFIRM({count:String(u.length),srcBackend:r,destBackend:i})))return}catch(e){Zc.debug(`Failed to resolve cross-connection info for DnD`,e)}await Ra.runAsync($.DROP_COPY_TASK,async e=>{let n=t=>{e.message=t};for(let{path:e,resource:r}of u)try{let e=await a(r);await U.copyResource(r,t,{move:e,onFile:n}),c++}catch(t){Zc.error(`Failed to handle workspace drop for "${e}":`,t),l++}}),Zc.info(`Workspace drop completed: ${c}/${u.length} items ${l>0?`, ${l} failed`:``}`),await this.loadWorkspace(this.workspaceDir,!0)}async handleFilesDrop(e,t,n){let r=e.length,i=0,a=0,o=0;n.totalSteps=r;for(let[r,{relativePath:s,file:c}]of e.entries()){n.currentStep=r+1,n.message=s;try{if(await t.getResource(s)&&!await Ls($.FILE_EXISTS_OVERWRITE({fileName:s}))){o++;continue}await(await t.getResource(s,{create:!0})).saveContents(c),i++}catch(e){Zc.error(`Failed to upload ${s}:`,e),a++}}Zc.info(`Uploaded ${i}/${r} files${o>0?`, ${o} skipped`:``}${a>0?`, ${a} failed`:``}`),await this.loadWorkspace(this.workspaceDir)}renderContent(){return t`
            <div class="tree" ${i(this.treeRef)} style="--drop-files-text: '${$.DROP_FILES_HERE}'">
                ${c(!this.workspaceDir,()=>t`
                    <docks-no-content message="${$.SELECT_WORKSPACE}"></docks-no-content>`,()=>c(this.root,()=>t`
                <wa-tree @wa-selection-change=${this.nobubble(this.onSelectionChanged)}
                         style="--indent-guide-width: 1px;">
                    ${this.root.children.map(e=>this.createTreeItems(e,!0))}
                </wa-tree>`,()=>t``))}
            </div>
        `}static{this.styles=v`
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
    `}};T([r()],rl.prototype,`root`,void 0),rl=Xc=T([b(`docks-filebrowser`)],rl);var il=await Ya(Object.assign({"./tasks.de.json":()=>X(()=>import(`./tasks.de-BUR-Lg2--CJoB1HQt.js`),[]),"./tasks.en.json":()=>X(()=>import(`./tasks.en-CfyvypLR-HYnsvR63.js`),[])}));M.registerContribution(xa,{name:Zs,label:`Active Tasks`,component:`<docks-tasks></docks-tasks>`});var al=null;function ol(e){if(e.progress>=0)return e.progress;if(e.totalSteps>0)return Math.round(e.currentStep/e.totalSteps*100)}function sl(e,n=``){let r=e&&ol(e);return r===void 0?t`<wa-progress-bar indeterminate></wa-progress-bar>`:t`<wa-progress-bar value="${r}">${n}</wa-progress-bar>`}function cl(){return al||(al=document.createElement(`div`),al.id=`progress-dialog-container`,document.body.appendChild(al)),al}function ll(){return cl().querySelector(`wa-dialog`)}function ul(){dl(!0)}function dl(e=!1){let r=cl(),i=Ra.getActiveTasks();if(i.length===0){n(t``,r);return}let a=ll();if(!(e||a?.open===!0))return;let o=t`
        <wa-dialog 
            label="${il.ACTIVE_TASKS}" 
            open
            light-dismiss
            style="--width: 600px;"
            @wa-after-hide=${()=>{n(t``,r)}}
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
                ${i.map(e=>{let n=e.progress<0&&e.totalSteps>0?`${e.currentStep}/${e.totalSteps} - `:``;return t`
                        <div class="tasitem">
                            <div class="tasheader">
                                <wa-icon name="hourglass" style="color: var(--wa-color-warning-fill-loud);"></wa-icon>
                                <div style="flex: 1;">
                                    <div class="tasname">${e.name}</div>
                                    ${e.message?t`
                                        <div class="tasmessage">${e.message}</div>
                                    `:``}
                                </div>
                            </div>
                            <div class="tasprogress">
                                ${sl(e,`${n}${ol(e)}%`)}
                            </div>
                        </div>
                    `})}
            </div>
        </wa-dialog>
    `;n(o,r)}var fl=class extends uo{static{this.styles=v`
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
    `}doBeforeUI(){this.watch(Qe,()=>{dl(),this.requestUpdate()})}handleIndicatorClick(){ul()}render(){Qe.get();let e=Ra.getActiveTasks(),n=e.length;return n===0?t``:t`
            <div class="tasindicator" @click=${this.handleIndicatorClick} title="${il.ACTIVE_TASKS_TITLE({taskCount:n.toString()})}">
                <wa-spinner
                    style="font-size: 1rem; --indicator-color: var(--wa-color-warning-fill-loud);"
                    label="${il.ACTIVE_TASKS}"
                ></wa-spinner>
                <wa-badge appearance="outlined" variant="neutral" pill>${n}</wa-badge>
                <div class="tasbar-wrap">${sl(n===1?e[0]:void 0)}</div>
            </div>
        `}};fl=T([b(`docks-tasks`)],fl);var pl=await Ya(Object.assign({"./toasts.de.json":()=>X(()=>import(`./toasts.de-Dm0jkOdW-DgoKdZ2M.js`),[]),"./toasts.en.json":()=>X(()=>import(`./toasts.en-D8917ENj-zPLp6brR.js`),[])}));M.registerContribution(Sa,{name:Qs,label:`Toasts`,ranking:50,component:`<docks-toasts></docks-toasts>`});function ml(e){return e.variant===`danger`?`circle-exclamation`:e.variant===`warning`?`triangle-exclamation`:`circle-info`}var hl=class extends uo{static{this.styles=v`
        :host {
            display: flex;
            align-items: center;
        }

        wa-dropdown::part(menu) {
            max-width: 24rem;
            max-height: 18rem;
        }

        wa-dropdown-item {
            white-space: normal;
        }

        /* The trigger caret hides the button end slot, and the badge's corner placement is clipped by the toolbar. */
        wa-badge {
            position: static !important;
            translate: none !important;
            inset: auto !important;
            margin-inline-start: var(--wa-space-2xs);
        }
    `}doBeforeUI(){this.watch(Oe,()=>this.requestUpdate())}handleSelect(e){e.detail?.item?.value===`clear`&&Ne()}render(){Oe.get();let e=je();if(!e.length)return t``;let n=e.filter(e=>e.state===`pending`).length,r=String(pl.TOASTS_TITLE({pending:String(n),emitted:String(e.length-n)})),i=e.some(e=>e.state===`pending`&&e.variant===`danger`);return t`
            <wa-dropdown placement="top-end" distance="4" size="s" @wa-select=${this.handleSelect}>
                <wa-button slot="trigger" appearance="plain" size="s" with-caret title=${r}>
                    ${R(`bell`,{label:String(pl.TOASTS),slot:`start`})}
                    ${n>0?t`<wa-badge variant=${i?`danger`:`warning`} pill>${n}</wa-badge>`:y}
                </wa-button>
                <wa-dropdown-item value="clear">
                    ${R(`trash`,{label:String(pl.CLEAR),slot:`icon`})}
                    ${pl.CLEAR}
                </wa-dropdown-item>
                ${e.map(e=>t`
                    <wa-dropdown-item>
                        ${R(ml(e),{label:e.variant,slot:`icon`})}
                        ${e.message}
                        ${e.state===`pending`?t`<span slot="details">${pl.PENDING}</span>`:y}
                    </wa-dropdown-item>
                `)}
            </wa-dropdown>
        `}};hl=T([b(`docks-toasts`)],hl);var gl=await Ya(Object.assign({"./partname.de.json":()=>X(()=>import(`./partname.de-lNAEBsRj-DwVjtktH.js`),[]),"./partname.en.json":()=>X(()=>import(`./partname.en-DF4uL0I7-DX5-ex1_.js`),[])}));function _l(){let e=N.get();return e&&(e.tabContribution?.label||e.getAttribute(`id`))||gl.NO_PART}var vl=250,yl=null;function bl(){let e=Ts.getCurrentApp()?.name??``,t=N.get();if(!t){document.title=e;return}let n=t.tabContribution?.label||t.getAttribute(`id`)||gl.NO_PART;e?document.title=`${e} | ${n}`:document.title=n}function xl(){yl!==null&&clearTimeout(yl),yl=setTimeout(()=>{yl=null,bl()},vl)}L(N,()=>xl()),window.addEventListener(`app-loaded`,()=>{yl!==null&&(clearTimeout(yl),yl=null),bl()});var Sl=await Ya(Object.assign({"./partname.de.json":()=>X(()=>import(`./partname.de-lNAEBsRj-DwVjtktH.js`),[]),"./partname.en.json":()=>X(()=>import(`./partname.en-DF4uL0I7-DX5-ex1_.js`),[])}));M.registerContribution(xa,{name:Xs,label:`Active part`,component:`<docks-part-name></docks-part-name>`});var Cl=class extends uo{doBeforeUI(){this.watch(N,()=>{this.requestUpdate()})}render(){let e=N.get()?.tabContribution?.icon||`box`;return t`
            <wa-button 
                appearance="plain"
                size="s"
                title="${Sl.ACTIVE_PART}">
                ${R(e,{label:`Part`,slot:`start`})}
                ${_l()}
            </wa-button>
        `}};Cl=T([b(`docks-part-name`)],Cl);var wl=me(`DocksExtensions`),Tl=await Ya(Object.assign({"./extensions.de.json":()=>X(()=>import(`./extensions.de-BXbLqbPM-CTIwMo45.js`),[]),"./extensions.en.json":()=>X(()=>import(`./extensions.en-Cd7hAbm7-e9xsMyRg.js`),[])})),El=class extends lc{constructor(...e){super(...e),this.filterText=``,this.showRegisterDialog=!1,this.registerExtensionData={},this.handleRegisterDialogAfterHide=()=>{this.finishRegisterDialogClose()}}doInitUI(){g(Qa,()=>{this.requestUpdate()})}onExtensionDblClick(){}enable(e){Z.enable(e.id,!0),this.requestUpdate()}disable(e){Z.disable(e.id,!0),this.requestUpdate()}isExtensionRequired(e){let t=Ts.getCurrentApp();return!t||!t.extensions?!1:t.extensions.includes(e)}selectionChanged(e){let t=e.detail.selection||[];this.selectedExtension=t.length>0&&t[0].model?t[0].model:void 0}getFilteredExtensions(){if(!this.filterText.trim())return Z.getExtensions();let e=this.filterText.toLowerCase();return Z.getExtensions().filter(t=>String(t.name).toLowerCase().includes(e)||(t.description?String(t.description).toLowerCase().includes(e):!1)||t.id.toLowerCase().includes(e))}getGroupedExtensions(){let e=this.getFilteredExtensions(),t=[],n=[];return e.forEach(e=>{Z.isEnabled(e.id)?t.push(e):n.push(e)}),t.sort((e,t)=>String(e.name).localeCompare(String(t.name))),n.sort((e,t)=>String(e.name).localeCompare(String(t.name))),{enabled:t,available:n}}isExternalExtension(e){return e.external===!0}handleFilterInput(e){this.filterText=e.target.value,this.requestUpdate()}clearFilter(){this.filterText=``,this.requestUpdate()}async handleRegisterExtension(){try{let e=await Ds(`Enter extension URL or source identifier:`,``,!1);if(!e)return;await Ra.runAsync(`Registering extension`,async()=>{let t=e;Za.isGitHubUrl(e)&&(t=Za.convertGitHubUrlToSource(e));let n=Za.parseSource(t);n?.type===`github`?await this.fetchGitHubMetadata(n,t):(this.registerExtensionData={url:t,id:``,name:``,description:``},this.showRegisterDialog=!0,this.requestUpdate())})}catch(e){k(`Failed to register extension: ${e}`)}}async fetchGitHubMetadata(e,t){try{let n=await Za.fetchGitHubPackageJson(e),r=e.owner,i=e.repo,a=n.name||`ext.${r}-${i}`,o=n.name||`${r}/${i}`,s=n.description||``,c=n.version||``,l=n.author||(typeof n.author==`string`?n.author:n.author?.name)||``;this.registerExtensionData={id:a,name:o,description:s,url:t,version:c,author:l,icon:`puzzle-piece`,external:!0},this.showRegisterDialog=!0,this.requestUpdate()}catch(e){wl.warn(`Could not fetch package.json, using defaults: ${e}`),this.registerExtensionData={url:t,id:``,name:``,description:``},this.showRegisterDialog=!0,this.requestUpdate()}}async confirmRegisterExtension(){if(!this.registerExtensionData.url)k(`URL is required`);else if(!this.registerExtensionData.id)k(`Extension ID is required`);else if(!this.registerExtensionData.name)k(`Extension name is required`);else try{await Ra.runAsync(`Registering extension`,async()=>{let e={id:this.registerExtensionData.id,name:this.registerExtensionData.name,description:this.registerExtensionData.description,url:this.registerExtensionData.url,version:this.registerExtensionData.version,author:this.registerExtensionData.author,icon:this.registerExtensionData.icon||`puzzle-piece`,external:!0};Z.registerExtension(e),await Z.loadExtensionFromUrl(this.registerExtensionData.url,e.id),O(`Extension ${e.name} registered successfully`),this.closeRegisterDialog(),this.registerExtensionData={},this.requestUpdate()})}catch(e){k(`Failed to register extension: ${e}`)}}closeRegisterDialog(){let e=this.renderRoot.querySelector(`wa-dialog`);e&&e.open!==!1?e.open=!1:this.finishRegisterDialogClose()}finishRegisterDialogClose(){this.showRegisterDialog=!1,this.registerExtensionData={},this.requestUpdate()}cancelRegisterExtension(){this.closeRegisterDialog()}renderToolbar(){return t`
            <wa-input
                placeholder="${Tl.FILTER_PLACEHOLDER}"
                .value=${this.filterText}
                @input=${e=>this.handleFilterInput(e)}
                @wa-clear=${()=>this.clearFilter()}
                with-clear
                size="s"
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
        `}renderContent(){let e=this.getGroupedExtensions(),n=e.enabled.length>0||e.available.length>0;return t`
            ${c(this.showRegisterDialog,()=>t`
                <wa-dialog 
                    label="Register Extension"
                    open
                    @wa-after-hide=${this.handleRegisterDialogAfterHide}
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
                            ${n?t`
                                ${e.enabled.length>0?t`
                                    <wa-tree-item expanded>
                                        <span>
                                            <wa-icon name="check-circle" style="color: var(--wa-color-success-50);"></wa-icon>
                                            ${Tl.INSTALLED} (${e.enabled.length})
                                        </span>
                                        ${e.enabled.map(e=>{let n=this.isExternalExtension(e);return t`
                                                <wa-tree-item @dblclick=${this.nobubble(this.onExtensionDblClick)} .model=${e}>
                                                    <span>${R(e.icon)}</span> ${e.name}${n?t` <span style="opacity: 0.6; font-size: 0.9em; margin-left: 0.5rem;">(External)</span>`:``}
                                                </wa-tree-item>
                                            `})}
                                    </wa-tree-item>
                                `:``}
                                ${e.available.length>0?t`
                                    <wa-tree-item expanded>
                                        <span>
                                            <wa-icon name="circle" style="color: var(--wa-color-neutral-50);"></wa-icon>
                                            ${Tl.AVAILABLE} (${e.available.length})
                                        </span>
                                        ${e.available.map(e=>{let n=this.isExternalExtension(e);return t`
                                                <wa-tree-item @dblclick=${this.nobubble(this.onExtensionDblClick)} .model=${e}>
                                                    <span>${R(e.icon)}</span> ${e.name}${n?t` <span style="opacity: 0.6; font-size: 0.9em; margin-left: 0.5rem;">(External)</span>`:``}
                                                </wa-tree-item>
                                            `})}
                                    </wa-tree-item>
                                `:``}
                            `:``}
                            ${n?``:t`
                                <div style="padding: 1em; text-align: center; opacity: 0.7;">
                                    ${Tl.NO_MATCHES({filterText:this.filterText})}
                                </div>
                            `}
                        </wa-tree>
                    </wa-scroller>
                </div>
                <wa-scroller slot="end" class="extensions-detail-scroller" orientation="vertical">
                <div class="extensions-detail-content">
                    ${c(this.selectedExtension,e=>{let n=this.isExternalExtension(e),r=Z.isEnabled(e.id);return t`
                                <h1>${R(e.icon)} ${e.name}${n?` (External)`:``}</h1>
                                ${c(n,()=>t`
                                    <div class="marketplace-badge">
                                        <wa-icon name="store"></wa-icon>
                                        <span>${Tl.EXTERNAL_EXTENSION}</span>
                                    </div>
                                `)}
                                <hr>
                                <div>
                                    ${c(r,()=>t`
                                        <wa-button 
                                            title="${this.isExtensionRequired(e.id)?Tl.REQUIRED_HINT:Tl.DISABLE_TITLE}" 
                                            @click="${()=>this.disable(e)}"
                                            variant="danger" 
                                            appearance="plain"
                                            ?disabled=${this.isExtensionRequired(e.id)}>
                                            <wa-icon name="xmark" label="Uninstall"></wa-icon>&nbsp;${Tl.UNINSTALL}
                                        </wa-button>
                                        ${c(this.isExtensionRequired(e.id),()=>t`
                                            <div class="required-hint">
                                                <wa-icon name="info-circle" style="color: var(--wa-color-primary-50);"></wa-icon>
                                                <span>${Tl.REQUIRED_HINT}</span>
                                            </div>
                                        `)}
                                    `,()=>t`
                                        <wa-button 
                                            title="${Tl.ENABLE_TITLE}" 
                                            @click="${()=>this.enable(e)}"
                                            variant="brand" 
                                            appearance="plain">
                                            <wa-icon name="download" label="Install"></wa-icon>&nbsp;${Tl.INSTALL}
                                        </wa-button>
                                    `)}
                                </div>

                                ${c(e.experimental,()=>t`
                                    <div style="margin-top: 1em;">
                                        <wa-button size="s" variant="warning" appearance="plain">
                                            <wa-icon name="triangle-exclamation" label="Warning"></wa-icon>
                                        </wa-button>
                                        <small><i>${Tl.EXPERIMENTAL}</i></small>
                                    </div>
                                `)}

                                ${c(e.version||e.author,()=>t`
                                    <div style="margin-top: 1em; display: flex; flex-direction: column; gap: 0.5rem;">
                                        ${c(e.version,()=>t`
                                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                                <wa-icon name="tag" style="font-size: 0.9em; opacity: 0.7;"></wa-icon>
                                                <span style="font-size: 0.9em; opacity: 0.8;">${Tl.VERSION} <strong>${e.version}</strong></span>
                                            </div>
                                        `)}
                                        ${c(e.author,()=>t`
                                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                                <wa-icon name="user" style="font-size: 0.9em; opacity: 0.7;"></wa-icon>
                                                <span style="font-size: 0.9em; opacity: 0.8;">${Tl.AUTHOR} <strong>${e.author}</strong></span>
                                            </div>
                                        `)}
                                    </div>
                                `)}

                                <p style="margin-top: 1em;">${e.description}</p>

                                ${c(e.dependencies&&e.dependencies.length>0,()=>t`
                                    <div style="margin-top: 1.5em;">
                                        <h3 style="margin-bottom: 0.5em;">
                                            <wa-icon name="puzzle-piece" style="font-size: 0.9em;"></wa-icon>
                                            ${Tl.DEPENDENCIES}
                                        </h3>
                                        <div class="dependencies-list">
                                            ${e.dependencies.map(e=>{let n=Z.getExtensions().find(t=>t.id===e),r=Z.isEnabled(e);return t`
                                                    <div class="dependency-item">
                                                        <wa-icon 
                                                            name="${r?`check-circle`:`circle`}" 
                                                            style="color: ${r?`var(--wa-color-success-50)`:`var(--wa-color-neutral-50)`};">
                                                        </wa-icon>
                                                        ${R(n?.icon??`puzzle-piece`)}
                                                        <span>${n?.name||e}</span>
                                                        ${r?``:t`
                                                            <span class="dependency-badge">${Tl.NOT_INSTALLED}</span>
                                                        `}
                                                    </div>
                                                `})}
                                        </div>
                                        <small style="opacity: 0.7; display: block; margin-top: 0.5em;">
                                            <wa-icon name="info-circle" style="font-size: 0.9em;"></wa-icon>
                                            ${Tl.DEPENDENCIES_HINT}
                                        </small>
                                    </div>
                                `)}
                            `})}
                </div>
                </wa-scroller>
            </wa-split-panel>
        `}static{this.styles=v`
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
    `}};T([r()],El.prototype,`selectedExtension`,void 0),T([r()],El.prototype,`filterText`,void 0),T([r()],El.prototype,`showRegisterDialog`,void 0),T([r()],El.prototype,`registerExtensionData`,void 0),El=T([b(`docks-extensions`)],El);var Dl=await Ya(Object.assign({"./logterminal.de.json":()=>X(()=>import(`./logterminal.de-SGM9hyG2-FGQOp2E1.js`),[]),"./logterminal.en.json":()=>X(()=>import(`./logterminal.en-B7khcAdq-BcGqg9A8.js`),[])})),Ol=class extends lc{constructor(...e){super(...e),this.messages=[],this.autoScroll=!0,this.filter=`all`,this.containerRef=u()}connectedCallback(){super.connectedCallback(),this.loadSettings(),fe(this.log.bind(this))}disconnectedCallback(){super.disconnectedCallback(),pe()}log(e,t,n=`info`){let r={timestamp:new Date,level:n,source:e,message:t};this.messages=[...this.messages,r],this.autoScroll&&this.updateComplete.then(()=>{let e=this.containerRef.value;e&&(e.scrollTop=e.scrollHeight)})}clear(){this.messages=[]}getFilteredMessages(){return this.filter===`all`?this.messages:this.messages.filter(e=>e.level===this.filter)}formatTimestamp(e){return e.toLocaleTimeString(`en-US`,{hour12:!1,hour:`2-digit`,minute:`2-digit`,second:`2-digit`})}getLevelIcon(e){switch(e){case`info`:return`circle-info`;case`warning`:return`triangle-exclamation`;case`error`:return`circle-xmark`;case`debug`:return`bug`}}getLevelColor(e){switch(e){case`info`:return`var(--wa-color-primary-text, #0066cc)`;case`warning`:return`var(--wa-color-warning-text, #ff9800)`;case`error`:return`var(--wa-color-danger-text, #dc3545)`;case`debug`:return`var(--wa-color-neutral-text-subtle, #6c757d)`}}renderToolbar(){let e=this.messages.filter(e=>e.level===`info`).length,n=this.messages.filter(e=>e.level===`warning`).length,r=this.messages.filter(e=>e.level===`error`).length,i=this.messages.filter(e=>e.level===`debug`).length;return t`
            <docks-command 
                icon="list"
                title="${Dl.ALL_LOGS}"
                appearance="${this.filter===`all`?`filled`:`plain`}"
                variant="${this.filter===`all`?`brand`:`neutral`}"
                .action=${()=>{this.filter=`all`,this.saveSettings()}}>
                ${Dl.ALL} (${this.messages.length})
            </docks-command>

            <docks-command 
                icon="circle-info"
                title="${Dl.INFO_LOGS}"
                appearance="${this.filter===`info`?`filled`:`plain`}"
                variant="${this.filter===`info`?`brand`:`neutral`}"
                .action=${()=>{this.filter=`info`,this.saveSettings()}}>
                ${Dl.INFO}${e>0?` (${e})`:``}
            </docks-command>

            <docks-command 
                icon="triangle-exclamation"
                title="${Dl.WARNING_LOGS}"
                appearance="${this.filter===`warning`?`filled`:`plain`}"
                variant="${this.filter===`warning`?`brand`:`neutral`}"
                .action=${()=>{this.filter=`warning`,this.saveSettings()}}>
                ${Dl.WARNINGS}${n>0?` (${n})`:``}
            </docks-command>

            <docks-command 
                icon="circle-xmark"
                title="${Dl.ERROR_LOGS}"
                appearance="${this.filter===`error`?`filled`:`plain`}"
                variant="${this.filter===`error`?`brand`:`neutral`}"
                .action=${()=>{this.filter=`error`,this.saveSettings()}}>
                ${Dl.ERRORS}${r>0?` (${r})`:``}
            </docks-command>

            <docks-command 
                icon="bug"
                title="${Dl.DEBUG_LOGS}"
                appearance="${this.filter===`debug`?`filled`:`plain`}"
                variant="${this.filter===`debug`?`brand`:`neutral`}"
                .action=${()=>{this.filter=`debug`,this.saveSettings()}}>
                ${Dl.DEBUG}${i>0?` (${i})`:``}
            </docks-command>

            <wa-divider orientation="vertical"></wa-divider>

            <docks-command 
                icon="arrow-down" 
                title="${this.autoScroll?Dl.AUTO_SCROLL_ENABLED:Dl.AUTO_SCROLL_DISABLED}"
                appearance="${this.autoScroll?`filled`:`plain`}"
                variant="${this.autoScroll?`brand`:`neutral`}"
                .action=${()=>{this.autoScroll=!this.autoScroll,this.saveSettings()}}>
                ${this.autoScroll?Dl.AUTO_SCROLL:Dl.MANUAL}
            </docks-command>

            <docks-command 
                icon="trash" 
                title="${Dl.CLEAR_LOGS}"
                .action=${()=>this.clear()}>
                ${Dl.CLEAR}
            </docks-command>
        `}renderContent(){let e=this.getFilteredMessages();return t`
            <div class="log-terminal">
                <div class="messages" ${i(this.containerRef)}>
                    ${e.length===0?t`<div class="empty-state">${Dl.NO_LOG_MESSAGES}</div>`:e.map(e=>t`
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
        `}static{this.styles=v`
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
    `}async loadSettings(){let e=await this.getDialogSetting();e&&(typeof e.filter==`string`&&(e.filter===`all`||[`info`,`warning`,`error`,`debug`].includes(e.filter))&&(this.filter=e.filter),typeof e.autoScroll==`boolean`&&(this.autoScroll=e.autoScroll))}async saveSettings(){await this.setDialogSetting({filter:this.filter,autoScroll:this.autoScroll})}};T([r()],Ol.prototype,`messages`,void 0),T([r()],Ol.prototype,`autoScroll`,void 0),T([r()],Ol.prototype,`filter`,void 0),Ol=T([b(`docks-log-terminal`)],Ol);var kl=class extends dt{constructor(...e){super(...e),this.cmd=``,this.title=``,this.label=!1,this.disabled=!1,this.appearance=`plain`,this.variant=`neutral`,this.size=`s`,this.params={},this.withCaret=!0,this.placement=`bottom-start`,this.dropdownContributions=[]}handleSelect(e){Nc(e)}getKeybinding(){if(!this.cmd||this.action)return null;let e=so.getKeyBindingsForCommand(this.cmd);return e.length>0?e[0]:null}hasLightDomContent(){return Array.from(this.childNodes).some(e=>e.nodeType===Node.TEXT_NODE?(e.textContent?.trim().length??0)>0:e.nodeType===Node.ELEMENT_NODE)}isIconOnlyDropdownTrigger(){return!this.label&&!this.hasLightDomContent()}renderDropdownTriggerIcon(e){return this.icon?R(this.icon,{label:this.title,slot:e}):y}doBeforeUI(){this.dropdown&&(this.dropdownContributions=M.getContributions(this.dropdown),g(j,e=>{this.dropdown&&e.target===this.dropdown&&(this.dropdownContributions=e.contributions)}))}willUpdate(e){super.willUpdate?.(e),this.dropdown&&e.has(`dropdown`)&&(this.dropdownContributions=M.getContributions(this.dropdown))}handleToolbarClick(e){this.disabled||(e&&e.stopPropagation(),this.action?this.action(e):this.cmd&&this.executeCommand(this.cmd,this.params))}render(){let e=this.getKeybinding();if(this.dropdown){let n=this.isIconOnlyDropdownTrigger(),r=n?void 0:`start`;return t`
                <wa-dropdown 
                    placement=${this.placement}
                    @wa-select=${e=>this.handleSelect(e)}>
                    <wa-button 
                        slot="trigger"
                        appearance=${this.appearance}
                        variant=${this.variant}
                        size=${this.size}
                        ?disabled=${this.disabled}
                        ?with-caret=${this.withCaret}
                        title=${e?`${this.title} (${e})`:this.title}>
                        ${this.renderDropdownTriggerIcon(r)}
                        ${n?y:t`<slot></slot>`}
                        ${this.label?this.title:y}
                    </wa-button>
                    
                    ${this.title?t`
                        <h6 style="padding: var(--wa-space-xs) var(--wa-space-s); margin: 0; color: var(--wa-color-neutral-50); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                            ${this.title}
                        </h6>
                    `:y}
                    
                    ${this.dropdownContributions.map(e=>Rc(e))}
                    
                    ${this.cmd?t`
                        <wa-divider></wa-divider>
                        ${Ic({cmd:this.cmd,icon:this.icon,label:this.title,params:this.params,disabled:this.disabled})}
                    `:y}
                </wa-dropdown>
            `}return t`
            <wa-button
                appearance=${this.appearance}
                variant=${this.variant}
                size=${this.size}
                ?disabled=${this.disabled}
                title=${e?`${this.title} (${e})`:this.title}
                @click=${e=>this.handleToolbarClick(e)}>
                ${R(this.icon,{label:this.title,slot:`start`})}
                <slot></slot>
            </wa-button>
        `}static{this.styles=v`
        :host {
            display: inline-block;
        }
    `}};T([_()],kl.prototype,`cmd`,void 0),T([_({type:Object,attribute:!1})],kl.prototype,`action`,void 0),T([_()],kl.prototype,`title`,void 0),T([_()],kl.prototype,`label`,void 0),T([_()],kl.prototype,`icon`,void 0),T([_({type:Boolean})],kl.prototype,`disabled`,void 0),T([_()],kl.prototype,`appearance`,void 0),T([_()],kl.prototype,`variant`,void 0),T([_()],kl.prototype,`size`,void 0),T([_({type:Object,attribute:!1})],kl.prototype,`params`,void 0),T([_()],kl.prototype,`dropdown`,void 0),T([_({type:Boolean,attribute:`with-caret`})],kl.prototype,`withCaret`,void 0),T([_()],kl.prototype,`placement`,void 0),T([r()],kl.prototype,`dropdownContributions`,void 0),kl=T([b(`docks-command`)],kl);var Al=await Ya(Object.assign({"./fastviews.de.json":()=>X(()=>import(`./fastviews.de-3DiOBU4B-DKWsEvsN.js`),[]),"./fastviews.en.json":()=>X(()=>import(`./fastviews.en-DlKVajsd-CB-A2pKs.js`),[])})),jl=class extends dt{constructor(...e){super(...e),this.target=``,this.title=``,this.disabled=!1,this.appearance=`plain`,this.size=`s`,this.placement=`bottom-start`,this.tabContributions=[],this.drawerOpen=!1,this.drawerSize=`50vw`,this.drawerRef=u(),this.tabsRef=u(),this.resizeHandleRef=u(),this.resizing=null}getDrawerTabsId(){return`fastviews-drawer-tabs-${this.target}`}handleTabClick(e){if(!this.disabled){if(this.containerId){let t=document.querySelector(`docks-tabs#${this.containerId}`);if(!t){console.error(`fastviews: Tab container with id "${this.containerId}" not found`);return}t.open(e)}else this.drawerOpen=!0,this.updateComplete.then(()=>{let t=this.tabsRef.value;t&&t.open(e)})}}handleDrawerHide(){this.drawerOpen=!1}startResize(e){e.preventDefault(),e.stopPropagation();let t=this.drawerRef.value;if(!t)return;let n=(()=>{let e=t.shadowRoot?.querySelector(`[part="panel"]`);if(e&&e.offsetWidth>0)return e.offsetWidth;let n=(window.getComputedStyle(t).getPropertyValue(`--size`)||this.drawerSize).match(/^(\d+(?:\.\d+)?)(px|vw|vh|%)$/);if(n){let e=parseFloat(n[1]),t=n[2];if(t===`px`)return e;if(t===`vw`)return e/100*window.innerWidth;if(t===`vh`)return e/100*window.innerHeight;if(t===`%`)return e/100*window.innerWidth}return 0})();n===0&&(n=window.innerWidth*.5);let r=e=>{this.resizing&&(e.preventDefault(),e.stopPropagation(),this.resizing.rafId!==null&&cancelAnimationFrame(this.resizing.rafId),this.resizing.rafId=requestAnimationFrame(()=>{if(!this.resizing)return;let t=this.resizing.startX-e.clientX,n=Math.round(this.resizing.startSize+t),r=Math.round(window.innerWidth*.9);if(n>=200&&n<=r){this.drawerSize=`${n}px`;let e=this.drawerRef.value;e&&(e.style.setProperty(`--size`,this.drawerSize),e.style.setProperty(`transition`,`none`))}this.resizing.rafId=null}))},i=()=>{if(this.resizing){this.resizing.rafId!==null&&(cancelAnimationFrame(this.resizing.rafId),this.resizing.rafId=null),document.removeEventListener(`mousemove`,this.resizing.handleMouseMove),document.removeEventListener(`mouseup`,this.resizing.handleMouseUp),document.body.style.cursor=``,document.body.style.userSelect=``;let e=this.drawerRef.value;e&&e.style.removeProperty(`transition`),this.resizing=null}};this.resizing={startX:e.clientX,startSize:n,handleMouseMove:r,handleMouseUp:i,rafId:null},document.addEventListener(`mousemove`,r,{passive:!1}),document.addEventListener(`mouseup`,i,{passive:!1}),document.body.style.cursor=`col-resize`,document.body.style.userSelect=`none`}doBeforeUI(){this.target&&(this.loadTabContributions(),g(j,e=>{this.target&&e.target===this.target&&this.loadTabContributions()}))}loadTabContributions(){if(!this.target)return;let e=M.getContributions(this.target);this.tabContributions=e.filter(e=>`name`in e),this.requestUpdate()}renderTabContribution(e){return t`
            <wa-dropdown-item 
                @click=${()=>this.handleTabClick(e)}>
                ${R(e.icon,{label:e.label,slot:`icon`})}
                ${e.label}
            </wa-dropdown-item>
        `}render(){return!this.target||this.tabContributions.length===0?y:t`
            <wa-dropdown placement=${this.placement}>
                <wa-button 
                    slot="trigger"
                    appearance=${this.appearance}
                    size=${this.size}
                    ?disabled=${this.disabled}
                    with-caret
                    title=${this.title}>
                    ${R(this.icon,{label:this.title,slot:`start`})}
                    <slot></slot>
                </wa-button>
                
                ${this.title?t`
                    <h6 style="padding: var(--wa-space-xs) var(--wa-space-s); margin: 0; color: var(--wa-color-neutral-50); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                        ${this.title}
                    </h6>
                `:y}
                
                ${this.tabContributions.map(e=>this.renderTabContribution(e))}
            </wa-dropdown>

            ${this.containerId?y:t`
                <wa-drawer 
                    ${i(this.drawerRef)}
                    label="${this.title||Al.FAST_VIEWS}"
                    placement="end"
                    ?open=${this.drawerOpen}
                    @wa-hide=${this.handleDrawerHide}
                    style="--size: ${this.drawerSize};">
                    <div 
                        ${i(this.resizeHandleRef)}
                        class="resize-handle"
                        @mousedown=${this.startResize}>
                    </div>
                    <docks-tabs 
                        ${i(this.tabsRef)}
                        id="${this.getDrawerTabsId()}"
                        style="width: 100%; height: 100%; display: flex; flex-direction: column;">
                    </docks-tabs>
                </wa-drawer>
            `}
        `}static{this.styles=v`
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
    `}};T([_()],jl.prototype,`target`,void 0),T([_()],jl.prototype,`title`,void 0),T([_()],jl.prototype,`icon`,void 0),T([_({type:Boolean})],jl.prototype,`disabled`,void 0),T([_()],jl.prototype,`appearance`,void 0),T([_()],jl.prototype,`size`,void 0),T([_()],jl.prototype,`placement`,void 0),T([_()],jl.prototype,`containerId`,void 0),T([r()],jl.prototype,`tabContributions`,void 0),T([r()],jl.prototype,`drawerOpen`,void 0),T([r()],jl.prototype,`drawerSize`,void 0),jl=T([b(`docks-fastviews`)],jl);function Ml(){let e=document.getElementById(`global-dialog-container`);return e||(e=document.createElement(`div`),e.id=`global-dialog-container`,document.body.appendChild(e)),e}var Nl=e=>{try{return new Intl.DisplayNames([e],{type:`language`}).of(e)||e.toUpperCase()}catch{return e.toUpperCase()}},Pl=()=>[...Ha.get()].sort(),Fl=async()=>{let e=Pl(),r=Ka.get();return new Promise(i=>{let a=Ml(),o=!1,s=()=>{let e=a.querySelector(`wa-dialog`);e&&!o&&(e.open=!1)},c=()=>{o||(o=!0,n(t``,a),i())},l=async e=>{await A.set(za,e),s()},u=t`
            <wa-dialog 
                label="Select Language" 
                open 
                light-dismiss
                @wa-after-hide=${c}>
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
                    ${e.map(e=>t`
                        <div 
                            class="language-item ${e===r?`active`:``}"
                            @click=${()=>l(e)}>
                            <span class="language-code">${e.toUpperCase()}</span>
                            <span class="language-name">${Nl(e)}</span>
                        </div>
                    `)}
                </div>
            </wa-dialog>
        `;n(u,a)})},Il=class extends uo{static{this.styles=v`
        :host {
            display: inline-block;
        }
    `}render(){let e=Ka.get(),n=Nl(e),r=`${n} ${e.toUpperCase()}`;return t`
            <wa-button 
                appearance="plain" 
                size="s"
                title="Current language: ${n}"
                @click=${()=>Fl()}>
                ${R(`language`)}
                ${r}
            </wa-button>
        `}};Il=T([b(`docks-language-selector`)],Il);var Ll={showLeftSidebar:!0,showAuxSidebar:!0,showBottomPanel:!0,showLeftAux:!1,showRightAux:!1};function Rl(e){return{showLeftSidebar:e.showLeftSidebar??Ll.showLeftSidebar,showAuxSidebar:e.showAuxSidebar??Ll.showAuxSidebar,showBottomPanel:e.showBottomPanel??Ll.showBottomPanel,showLeftAux:e.showLeftAux??Ll.showLeftAux,showRightAux:e.showRightAux??Ll.showRightAux}}var zl=`layoutPanelVisibility`,Bl=`preferredLayoutId`;function Vl(e){switch(e){case`standard-bottom-panel`:return{...Ll,showBottomPanel:!0,showLeftAux:!1,showRightAux:!1};case`standard-bottom-sidebar`:return{...Ll,showBottomPanel:!1,showLeftAux:!0,showRightAux:!1};case`standard-full`:return{...Ll,showLeftAux:!0,showRightAux:!0};default:return{...Ll,showBottomPanel:!1,showLeftAux:!1,showRightAux:!1}}}function Hl(e){return typeof e==`object`&&e.props?{...Ll,showLeftSidebar:e.props.showLeftSidebar!==!1,showAuxSidebar:e.props.showAuxSidebar!==!1,showBottomPanel:e.props.showBottomPanel===!0,showLeftAux:e.props.showLeftAux===!0,showRightAux:e.props.showRightAux===!0}:typeof e==`string`?Vl(e):{...Ll}}async function Ul(e){try{let e=await A.get(zl);if(e&&typeof e==`object`)return Rl(e)}catch{}try{let e=await A.get(Bl);if(e)return Vl(e)}catch{}return Hl(e)}function Wl(e){let t=e??document.getElementById(`app-root`)??document.body;return!t||typeof t.querySelector!=`function`?null:t.querySelector(`docks-standard-layout`)}var Gl=[{key:`showLeftSidebar`,label:`Left sidebar`,icon:`docks layout-standard-left-sidebar`},{key:`showAuxSidebar`,label:`Right sidebar`,icon:`docks layout-standard-right-sidebar`},{key:`showBottomPanel`,label:`Bottom panel`,icon:`docks layout-standard-bottom-panel`},{key:`showLeftAux`,label:`Left Aux`,icon:`docks layout-standard-left-aux`},{key:`showRightAux`,label:`Right Aux`,icon:`docks layout-standard-right-aux`}],Kl=class extends uo{constructor(...e){super(...e),this.panels={...Ll}}doBeforeUI(){let e=()=>{let e=Wl();this.panels=e?.getPanelVisibility()??{...Ll},this.requestUpdate()};return e(),window.addEventListener(`app-loaded`,e),window.addEventListener(`layout-panels-changed`,e),()=>{window.removeEventListener(`app-loaded`,e),window.removeEventListener(`layout-panels-changed`,e)}}async handleSelect(e){let t=Wl();if(!t)return;let n=e.detail?.item,r=n?.value;if(n&&r)try{await t.setPanelVisibility({[r]:n.checked??!1}),this.panels=t.getPanelVisibility()}catch(e){console.error(`Failed to update layout panels:`,e)}}render(){return Wl()?t`
            <wa-dropdown
                placement="bottom-end"
                distance="4"
                size="s"
                @wa-select=${this.handleSelect}>
                <wa-button
                    slot="trigger"
                    appearance="plain"
                    size="s"
                    with-caret
                    title="Show or hide layout panels">
                    ${R(`docks layout-standard-full`,{label:`Layout panels`})}
                </wa-button>
                ${Gl.map(e=>t`
                        <wa-dropdown-item
                            value="${e.key}"
                            type="checkbox"
                            ?checked=${this.panels[e.key]}>
                            ${R(e.icon,{label:e.label,slot:`icon`})}
                            ${e.label}
                        </wa-dropdown-item>
                    `)}
            </wa-dropdown>
        `:t``}static{this.styles=v`
        :host {
            display: inline-block;
        }
    `}};T([r()],Kl.prototype,`panels`,void 0),Kl=T([b(`docks-layout-switcher`)],Kl);function ql(e){return e}function Jl(e){return e.homepage??e.repository}var Yl=class extends lc{constructor(...e){super(...e),this.scrollMode=`none`}static{this.styles=[v`
            .packages-panel {
                padding: 0.75rem;
                box-sizing: border-box;
            }

            .pkg-name a {
                color: inherit;
                text-decoration: underline;
                text-underline-offset: 0.12em;
            }

            .pkg-meta {
                color: var(--wa-color-neutral-60);
                font-size: 0.875em;
            }

            .pkg-meta-label {
                font-weight: 600;
                color: var(--wa-color-neutral-50);
            }
        `]}renderPackageName(e,n){let r=Jl(n);return t`
            <span class="pkg-name">
                ${r?t`<a href=${r} target="_blank" rel="noopener noreferrer">${e}</a>`:e}
            </span>
        `}renderMetaRows(e){return t`
            ${e.license?t`
                      <wa-tree-item>
                          <span class="pkg-meta">
                              <span class="pkg-meta-label">License:</span> ${e.license}
                          </span>
                      </wa-tree-item>
                  `:y}
            ${e.description?t`
                      <wa-tree-item>
                          <span class="pkg-meta">
                              <span class="pkg-meta-label">Description:</span> ${e.description}
                          </span>
                      </wa-tree-item>
                  `:y}
        `}renderDependencyNode(e,n,r,i){if(!n)return y;let a=r[e]??[],o=a.length>0||n.license||n.description;return t`
            <wa-tree-item ?expanded=${o}>
                ${this.renderPackageName(e,n)}
                ${this.renderMetaRows(n)}
                ${a.map(e=>{let t=ql(i[e]);return t?this.renderDependencyNode(e,t,r,i):y})}
            </wa-tree-item>
        `}renderContent(){let e=Ts.getCurrentApp(),n=e?.dependencies??{},r=e?.directDependencies&&e.directDependencies.length>0?e.directDependencies:Object.keys(n),i=e?.nestedDependencies??{};return r.length===0?t`<div class="packages-panel">No package information available.</div>`:t`
            <div class="packages-panel">
                <wa-tree style="--indent-guide-width: 1px;">
                    <wa-tree-item expanded>
                        <span>${e?.name??``}</span>
                        ${r.map(e=>this.renderDependencyNode(e,ql(n[e]),i,n))}
                    </wa-tree-item>
                </wa-tree>
            </div>
        `}};Yl=T([b(`docks-npm-packages`)],Yl);function Xl(e){let t=e.component;return t instanceof Function?t():h(t)}var Zl=class extends lc{constructor(...e){super(...e),this.scrollMode=`none`,this.attributions=[]}static{this.styles=[v`
            .attributions {
                display: flex;
                flex-direction: column;
                gap: 1.25rem;
                padding: 0.75rem;
                box-sizing: border-box;
            }

            .attribution h3 {
                margin: 0 0 0.5rem;
                font-size: var(--wa-font-size-m);
            }

            .attribution p {
                margin: 0 0 0.5rem;
            }

            .attribution p:last-child {
                margin-bottom: 0;
            }
        `]}doBeforeUI(){this.loadAttributions(),this.subscribe(j,e=>{e.target===`system.attributions`&&this.loadAttributions()})}loadAttributions(){this.attributions=M.getContributions(Ea).filter(e=>`component`in e&&Ke(e))}renderContent(){return this.attributions.length===0?t`<div class="attributions">No attributions to display.</div>`:t`
            <div class="attributions">
                ${this.attributions.map(e=>t`
                        <section class="attribution">
                            ${e.label?t`<h3>${e.label}</h3>`:y}
                            ${Xl(e)}
                        </section>
                    `)}
            </div>
        `}};T([r()],Zl.prototype,`attributions`,void 0),Zl=T([b(`docks-attribution`)],Zl),M.registerContribution(Aa,{name:Hs,label:`Workspace`,icon:`folder`,component:e=>t`<docks-filebrowser id="${e}"></docks-filebrowser>`}),M.registerContribution(Pa,{name:Us,label:`Log Messages`,icon:`list`,component:e=>t`<docks-log-terminal id="${e}"></docks-log-terminal>`}),M.registerContribution(Da,{name:rc,label:`Attributions`,icon:`copyright`,ranking:100,toolbar:!1,contextMenu:!1,component:e=>t`<docks-attribution id="${e}" embedded></docks-attribution>`}),M.registerContribution(Da,{name:tc,label:`Release History`,icon:`clock-rotate-left`,ranking:50,toolbar:!1,contextMenu:!1,component:e=>t`<docks-release-history id="${e}" embedded></docks-release-history>`}),M.registerContribution(Da,{name:nc,label:`NPM Packages`,icon:`cubes`,ranking:0,toolbar:!1,contextMenu:!1,component:e=>t`<docks-npm-packages id="${e}" embedded></docks-npm-packages>`}),M.registerContribution(Sa,{name:Ws,label:`Info`,icon:`circle-info`,command:`show_version_info`,showLabel:!0}),M.registerContribution(Sa,{name:Gs,label:`Fast Views`,component:`<docks-fastviews target="system.fastviews-bottomend" icon="bolt" title="Fast Views"></docks-fastviews>`}),M.registerContribution(Sa,{name:Ks,label:`Language`,component:()=>t`<docks-language-selector></docks-language-selector>`}),M.registerContribution(va,{name:qs,label:`Layout panels`,component:()=>t`<docks-layout-switcher></docks-layout-switcher>`}),M.registerContribution(Ca,{name:$s,command:`open_extensions`,icon:`puzzle-piece`,label:`Extensions`});function Ql(e){let n=e.component??(()=>!e.license||!e.licenseUrl?t`<p>${e.label}</p>`:t`
                <p>
                    ${e.label} is used under the
                    <a href=${e.licenseUrl} target="_blank" rel="noopener noreferrer">${e.license}</a>.
                    ${e.projectUrl?t`
                              See
                              <a href=${e.projectUrl} target="_blank" rel="noopener noreferrer"
                                  >${e.projectLabel??e.projectUrl}</a
                              >.
                          `:y}
                </p>
            `);M.registerContribution(Ea,{name:e.name,label:e.label,ranking:e.ranking??0,component:n})}Ql({name:ic,label:`Eclipse Docks`,ranking:1e3,component:()=>t`
        <p>Copyright (c) 2026 The Eclipse Foundation and others.</p>
        <p>
            Eclipse Docks is made available under the
            <a href="https://www.eclipse.org/legal/epl-2.0" target="_blank" rel="noopener noreferrer"
                >Eclipse Public License 2.0</a
            >.
        </p>
    `}),Ql({name:ac,label:`Font Awesome`,ranking:900,component:()=>t`
        <p>
            Icons by
            <a href="https://fontawesome.com" target="_blank" rel="noopener noreferrer">Font Awesome</a>.
            Font Awesome Free is licensed under
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer"
                >CC BY 4.0</a
            >.
        </p>
    `});var $l=class extends cc{constructor(...e){super(...e),this.showLeftAux=!1,this.showBottomPanel=!0,this.showLeftSidebar=!0,this.showAuxSidebar=!0,this.showRightAux=!1,this.panelsInitialized=!1}createRenderRoot(){return this}getPanelVisibility(){return{showLeftSidebar:this.showLeftSidebar,showAuxSidebar:this.showAuxSidebar,showBottomPanel:this.showBottomPanel,showLeftAux:this.showLeftAux,showRightAux:this.showRightAux}}applyPanelVisibility(e){this.showLeftSidebar=e.showLeftSidebar,this.showAuxSidebar=e.showAuxSidebar,this.showBottomPanel=e.showBottomPanel,this.showLeftAux=e.showLeftAux,this.showRightAux=e.showRightAux}async setPanelVisibility(e){let t={...this.getPanelVisibility(),...e};this.applyPanelVisibility(t);try{await A.set(zl,t)}catch(e){throw console.error(`Failed to persist layout panel visibility:`,e),e}window.dispatchEvent(new CustomEvent(`layout-panels-changed`,{detail:{panels:this.getPanelVisibility()}}))}doInitUI(){this.initializePanelVisibility()}async initializePanelVisibility(){if(this.panelsInitialized)return;this.panelsInitialized=!0;let e=Ts.getCurrentApp()?.layout,t=await Ul(e);this.applyPanelVisibility(t),window.dispatchEvent(new CustomEvent(`layout-panels-changed`,{detail:{panels:this.getPanelVisibility()}}))}getGridSizes(){return this.showLeftSidebar&&this.showAuxSidebar?`20%, 60%, 20%`:this.showLeftSidebar?`20%, 80%`:this.showAuxSidebar?`80%, 20%`:`100%`}render(){return t`
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
                <docks-toolbar id=${_a}></docks-toolbar>
                <docks-toolbar id=${ya}></docks-toolbar>
                <docks-toolbar class="toolbar-end" id=${va}></docks-toolbar>
            </div>
            
            <docks-resizable-grid 
                class="main-layout"
                id="main-layout" 
                orientation="horizontal" 
                sizes=${this.getGridSizes()}>
                
                ${this.showLeftSidebar?t`
                        ${this.showLeftAux?t`
                                <docks-resizable-grid 
                                    id="left-sidebar-split" 
                                    orientation="vertical" 
                                    sizes="50%, 50%">
                                    <docks-tabs id="${Aa}" placement="start" icon-only with-toolbar item-size="l"></docks-tabs>
                                    <docks-tabs id="${ja}"  placement="start" icon-only></docks-tabs>
                                </docks-resizable-grid>
                            `:t`<docks-tabs id="${Aa}" placement="start" icon-only with-toolbar item-size="l"></docks-tabs>`}
                    `:y}
                
                ${this.showBottomPanel?t`
                        <docks-resizable-grid 
                            id="editor-area-split" 
                            orientation="vertical" 
                            sizes="70%, 30%">
                            <docks-tabs id="${Oa}"></docks-tabs>
                            <docks-tabs id="${Pa}"></docks-tabs>
                        </docks-resizable-grid>
                    `:t`<docks-tabs id="${Oa}"></docks-tabs>`}
                
                ${this.showAuxSidebar?t`
                        ${this.showRightAux?t`
                                <docks-resizable-grid
                                    id="right-sidebar-split"
                                    orientation="vertical"
                                    sizes="50%, 50%">
                                    <docks-tabs id="${Ma}"></docks-tabs>
                                    <docks-tabs id="${Na}" placement="start" icon-only></docks-tabs>
                                </docks-resizable-grid>
                            `:t`<docks-tabs id="${Ma}"></docks-tabs>`}
                    `:y}
            </docks-resizable-grid>
            
            <div class="toolbar-bottom">
                <docks-toolbar id=${ba}></docks-toolbar>
                <docks-toolbar id=${xa}></docks-toolbar>
                <docks-toolbar class="toolbar-end" id=${Sa}></docks-toolbar>
            </div>
        `}};T([_({type:Boolean,attribute:`show-left-aux`})],$l.prototype,`showLeftAux`,void 0),T([_({type:Boolean,attribute:`show-bottom-panel`})],$l.prototype,`showBottomPanel`,void 0),T([_({type:Boolean,attribute:`show-left-sidebar`})],$l.prototype,`showLeftSidebar`,void 0),T([_({type:Boolean,attribute:`show-aux-sidebar`})],$l.prototype,`showAuxSidebar`,void 0),T([_({type:Boolean,attribute:`show-right-aux`})],$l.prototype,`showRightAux`,void 0),$l=T([b(`docks-standard-layout`)],$l),M.registerContribution(Ta,{id:`standard`,name:`Standard`,label:`Standard`,icon:`docks layout-standard-full`,component:`docks-standard-layout`});async function eu(e,t=!0){let n=await U.getWorkspace();if(!n)return null;let r=e?.path;return t&&!r?null:{workspace:n,path:r||``}}function tu(e){return e&&typeof e.getContent==`function`&&typeof e.getSelection==`function`&&typeof e.getSnippet==`function`&&typeof e.getLanguage==`function`&&typeof e.getFilePath==`function`}function nu(e=!1){let t={filePath:null,language:null};return e?{...t,snippet:null,cursorLine:null}:t}async function ru(e,t=!0){let n=await eu(e,t);if(!n)return null;let{workspace:r,path:i}=n;if(!i)return null;try{let e=await r.getResource(i);return!e||!(e instanceof V)?null:{workspace:r,path:i,file:e}}catch{return null}}I({command:{id:`disconnect_folder`,name:`Disconnect folder`,description:`Disconnects a folder from the workspace`},handler:{execute:async()=>{let e=P.get();if(!(e instanceof H&&e.getParent()===void 0))k(`Select a folder root to disconnect.`);else try{let t=await U.getFolderInfoForDirectory(e);if(t?.type===`indexeddb`){if(!await Ls(`Also delete "${t.name}" from browser storage?\n\nIf not deleted, the folder data and blobs remain in IndexedDB.`))return;await Qo(e),O(`Deleted IndexedDB data for ${t.name}.`)}await U.disconnectFolder(e)}catch(e){k(e.message)}}},contribution:{target:`contextmenu:view.filebrowser`,label:`Disconnect folder`,icon:`folder-minus`,disabled:()=>{let e=P.get();return!(e instanceof H&&e.getParent()===void 0)}}}),I({command:{id:`load_workspace`,name:`Local Folder`,description:`Connect to a local folder using File System Access API`,parameters:[]},handler:{execute:async e=>{try{let e=await window.showDirectoryPicker({mode:`readwrite`});await U.connectWorkspace(e)}catch(e){throw e?.name===`AbortError`||/abort|cancel/i.test(String(e?.message??e))||k(e?.message??String(e)),e instanceof Error?e:Error(String(e))}}},contribution:{target:`filebrowser.connections`,label:`Local Folder`,icon:`folder-open`}}),I({command:{id:`connect_opfs`,name:`OPFS`,description:`Connect to Origin Private File System (browser storage)`,parameters:[]},handler:{execute:async()=>{try{await U.connectFolder({opfs:!0})}catch(e){k(e.message)}}},contribution:{target:`filebrowser.connections`,label:`OPFS (Browser Storage)`,icon:`database`}}),I({command:{id:`connect_indexeddb`,name:`IndexedDB`,description:`Create a new empty IndexedDB folder. This does not open a folder that is already connected. Read an existing folder with shell ls and cat.`,parameters:[{name:`name`,description:`Name for the new empty folder. If a connected folder already has this name, that folder is kept.`,required:!1}]},handler:{execute:async e=>{let t=typeof e.params?.name==`string`?e.params.name.trim():``;if(!t&&e.ask){let n=await e.ask({kind:`text`,message:`Name for the IndexedDB folder:`});if(!n)throw Error(`IndexedDB connection cancelled`);t=n.trim()}let n=await U.getFolders(),r=t?n.filter(e=>e.type===`indexeddb`&&e.name.toLowerCase()===t.toLowerCase()):[];if(r.length)return`Already connected: ${r.map(e=>`"${e.name}"`).join(`, `)}. Read a folder with shell ls. This command does not inspect it.`;try{return await U.connectFolder({indexeddb:!0,...t?{name:t}:{}}),`Connected IndexedDB folder "${[...await U.getFolders()].reverse().find(e=>e.type===`indexeddb`&&(!t||e.name===t))?.name??t}"`}catch(e){throw k(e.message),e instanceof Error?e:Error(String(e?.message??e))}}},contribution:{target:`filebrowser.connections`,label:`IndexedDB (Browser Storage)`,icon:`database`}}),I({command:{id:`connect_memory`,name:`In-Memory`,description:`Mount the shared in-memory workspace root (ephemeral, not persisted)`,parameters:[]},handler:{execute:async()=>{try{await U.connectFolder({memory:!0})}catch(e){k(e.message)}}},contribution:{target:`filebrowser.connections`,label:`In-Memory`,icon:`memory`}}),I({command:{id:`refresh_resource`,name:`Refresh resource`,description:`Refreshes the connected folder of the selected resource, or the whole workspace if nothing is selected`,parameters:[]},handler:{execute:async()=>{let e=P.get();if(e){e.getWorkspace().touch();return}let t=await U.getWorkspace();t?t.touch():k(`No workspace selected.`)}}}),I({command:{id:`open_editor`,name:`Open editor`,description:`Opens a file in an editor`,parameters:[{name:`path`,description:`The path of the file to open within the workspace; if omitted, the active selection is opened`,required:!1},{name:`editorId`,description:`Open with this editor id; if omitted, use default editor`,required:!1}]},handler:{execute:async e=>{let t=e.params?.path,n=e.params?.editorId,r=null;if(t)r=(await ru({path:t}))?.file??null;else{let e=P.get();r=e instanceof V?e:null}r&&await Jc.loadEditor(r,n)}}}),I({command:{id:`get_active_editor_content`,name:`Get active editor content`,description:`Gets the complete contents of the currently active editor. Returns null if no editor is active or if the editor is not a code editor.`,parameters:[],output:[{name:`content`,description:`the complete contents of the active editor, or null if no editor is active`},{name:`filePath`,description:`the workspace path of the file in the active editor, or null if no editor is active`},{name:`language`,description:`the programming language of the active editor, or null if no editor is active`}]},handler:{execute:async e=>{let t=e.activeEditor;if(!tu(t))return{...nu(),content:null};try{return{content:t.getContent(),filePath:t.getFilePath(),language:t.getLanguage()}}catch{return{...nu(),content:null}}}}}),I({command:{id:`get_active_editor_selection`,name:`Get active editor selection`,description:`Gets the currently selected text in the active editor. Returns null if no editor is active, no selection exists, or if the editor is not a code editor.`,parameters:[],output:[{name:`selection`,description:`the selected text in the active editor, or null if no selection exists or no editor is active`},{name:`filePath`,description:`the workspace path of the file in the active editor, or null if no editor is active`},{name:`language`,description:`the programming language of the active editor, or null if no editor is active`}]},handler:{execute:async e=>{let t=e.activeEditor;if(!tu(t))return{...nu(),selection:null};try{return{selection:t.getSelection(),filePath:t.getFilePath(),language:t.getLanguage()}}catch{return{...nu(),selection:null}}}}}),I({command:{id:`get_active_editor_snippet`,name:`Get active editor snippet around cursor`,description:`Gets a code snippet from the active editor with n lines before and n lines after the cursor position. Useful for getting context around the cursor without loading the entire file.`,parameters:[{name:`lines`,description:`number of lines to include before and after the cursor position (default: 5)`,type:`number`,required:!1}],output:[{name:`snippet`,description:`the code snippet with n lines before and after the cursor, or null if no editor is active`},{name:`filePath`,description:`the workspace path of the file in the active editor, or null if no editor is active`},{name:`language`,description:`the programming language of the active editor, or null if no editor is active`},{name:`cursorLine`,description:`the line number where the cursor is positioned (1-based), or null if no editor is active`}]},handler:{execute:async e=>{let t=e.activeEditor;if(!tu(t))return nu(!0);try{let n=e.params?.lines?parseInt(e.params.lines,10):5;if(isNaN(n)||n<0)return nu(!0);let r=t.getSnippet(n);return r?{snippet:r.snippet,filePath:t.getFilePath(),language:t.getLanguage(),cursorLine:r.cursorLine}:nu(!0)}catch{return nu(!0)}}}}),I({command:{id:`show_version_info`,name:`Show Version Info`,description:`Shows application version information`,parameters:[]},handler:{execute:async e=>{Ts.getCurrentApp()?await _c():k(`No app loaded`)}}}),I({command:{id:`save`,name:`Save editor`,description:`Saves the active/focused editor`,keyBinding:`CTRL+S`,parameters:[]},handler:{execute:async e=>{let t=N.get();t&&t.isDirty()&&t.save()}},contribution:{target:`toolbar:.system.editors`,icon:`floppy-disk`,label:`Save active editor`,slot:`start`,disabled:()=>{let e=N.get();return!e||!e.isDirty()}}});var iu=`theme`;async function au(e){let t=document.documentElement;t.classList.remove(`wa-dark`,`wa-light`),t.classList.add(e)}async function ou(){await au(await A.get(iu)||`wa-dark`)}async function su(e){await A.set(iu,e)}I({command:{id:`switch_theme`,name:`Switch theme`,description:`Switches between dark and light theme`,parameters:[]},handler:{execute:async e=>{let t=document.documentElement.classList.contains(`wa-dark`)?`wa-light`:`wa-dark`;await au(t),await su(t)}},contribution:{target:va,name:Js,icon:`circle-half-stroke`,label:`Theme Switcher`}}),ou().catch(e=>{console.error(`Failed to load theme preference:`,e)}),I({command:{id:`fullscreen`,name:`Toggle fullscreen`,description:`Toggles fullscreen mode`,parameters:[]},handler:{execute:async e=>{let t=document.documentElement;document.fullscreenElement===t?await document.exitFullscreen():await t.requestFullscreen()}},contribution:{target:va,name:Ys,icon:`expand`,label:`Fullscreen`}}),I({command:{id:`open_extensions`,name:`Open Extensions`,description:`Opens the extensions registry`,parameters:[]},handler:{execute:e=>{Jc.loadEditor({title:`Extensions`,data:{},key:`system.extensions`,icon:`puzzle-piece`,state:{},component:e=>t`<docks-extensions id="${e}"></docks-extensions>`},`extensions-editor`).then()}}}),I({command:{id:`list_extensions`,name:`List extensions`,description:`Lists all available extensions with their status (enabled/disabled)`,parameters:[],output:[{name:`extensions`,description:`array of extension objects with id, name, description, experimental flag, and enabled status`}]},handler:{execute:async e=>Z.getExtensions().map(e=>({id:e.id,name:e.name,description:e.description,experimental:e.experimental,enabled:Z.isEnabled(e.id)}))}}),I({command:{id:`toast_message`,name:`Toast message to user`,description:`Shows a toast message`,parameters:[{name:`message`,description:`the message to toast`,required:!0},{name:`type`,description:`the toast type: info (default), or error`,required:!1}]},handler:{execute:({params:{message:e,type:t}})=>{e&&(t===`error`?k(e):O(e))}}});var cu=`// src/core/js-runtime-worker.js
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

//# sourceMappingURL=js-runtime-worker-lmpSV6LF.js.map`,lu=typeof self<`u`&&self.Blob&&new Blob([`URL.revokeObjectURL(import.meta.url);`,cu],{type:`text/javascript;charset=utf-8`});function uu(e){let t;try{if(t=lu&&(self.URL||self.webkitURL).createObjectURL(lu),!t)throw``;let n=new Worker(t,{type:`module`,name:e?.name});return n.addEventListener(`error`,()=>{(self.URL||self.webkitURL).revokeObjectURL(t)}),n}catch{return new Worker(`data:text/javascript;charset=utf-8,`+encodeURIComponent(cu),{type:`module`,name:e?.name})}}function du(){let e=null,t=null;function n(){return e||(e=new uu,e.onmessage=e=>{let n=t;t=null,n&&(e.data.type===`result`?n.resolve(e.data.value):n.reject(Error(e.data.message??`Unknown error`)))},e.onerror=e=>{let n=t;t=null,n&&n.reject(Error(e.message??`Worker error`))}),e}return{execute(e){return new Promise((r,i)=>{t={resolve:r,reject:i},n().postMessage(e)})},close(){e&&=(e.terminate(),null),t=null}}}function fu(e){let t=du();return t.execute(e).finally(()=>t.close())}async function pu(e){if(e.code?.trim())return e.code.trim();if(!e.script)return k(`Provide 'script' (file path) or 'code'.`),null;let t=await U.getWorkspace();if(!t)return k(`No workspace selected.`),null;try{let n=await t.getResource(e.script);if(!n||!(n instanceof V))return k(`File not found: `+e.script),null;let r=await n.getContents();return typeof r==`string`?r:(k(`File is not a text file`),null)}catch(e){return k(`Failed to access file: ${e instanceof Error?e.message:String(e)}`),null}}I({command:{id:`js`,name:`Run JavaScript file`,description:`Runs a script via JsRuntime (inline or file). Return value or self.postMessage(value) is shown.`,parameters:[{name:`script`,description:`workspace path to a .js file`,required:!1},{name:`code`,description:`inline JavaScript`,required:!1}]},handler:{execute:async e=>{let t=await pu(e.params??{});if(!t)return;let n=du();try{let e=await n.execute(t);return e!==void 0&&O(String(e)),e}catch(e){k(e instanceof Error?e.message:String(e))}finally{n.close()}}}}),I({command:{id:`open_view_as_editor`,name:`Open view as editor`,description:`Opens a dashboard view in the editor area`,parameters:[{name:`name`,description:`View contribution name`,required:!0},{name:`sourceContributionSlot`,description:`source contribution slot (default: SYSTEM_VIEWS)`,required:!1},{name:`singleTab`,description:`If true, close all other editor tabs first so only this view remains open`,required:!1}]},handler:{execute:async({params:e})=>{let t=e?.name;if(!t)return;let n=e?.sourceContributionSlot??`system-views`,r=M.getContributions(n).find(e=>e.name===t);r?.component&&await Jc.openTab(r,{singleTab:e?.singleTab===!0})}}});function mu(e){return e.replace(/^\/+|\/+$/g,``)}function hu(e){let t=mu(e);return t===`in-memory`||t.startsWith(`in-memory/`)}async function gu(e){let t=mu(e),n=ps();if(t===`in-memory`)return n;let r=t.slice(`${$o}/`.length);return await n.getResource(r)}async function _u(e){if(hu(e))return gu(e);let t=await U.getWorkspace();return t?await t.getResource(e):null}async function vu(e){try{if(!hu(e)&&!await U.getWorkspace())return k(`No workspace selected.`),null;let t=await _u(e);return t instanceof V?t:(k(`File not found: `+e),null)}catch(e){return k(`Failed to access file: ${e.message??e}`),null}}async function yu(e){try{let t=await e.getContents();return typeof t==`string`?t:(k(`File is not a text file`),null)}catch(e){return k(`Failed to read file: ${e.message??e}`),null}}async function bu(e){let t=[],n=await e.listChildren(!0);for(let e of n)e instanceof V?t.push(e.getWorkspacePath()):e instanceof H&&t.push(...await bu(e));return t}I({command:{id:`cat`,name:`Cat - Show file contents`,description:`Shows the complete contents of a file`,tags:[F],grants:[`r`],parameters:[{name:`path`,description:`the path of the file to read`,required:!0}],output:[{name:`content`,description:`the complete contents of the file`}]},handler:{execute:async({params:e})=>{let t=e?.path;if(!t){k(`No file path provided.`);return}let n=await vu(t);if(n)return yu(n)}}});function xu(e){return e.replace(/^\/+|\/+$/g,``)}function Su(e,t){let n=t.trim();return n?n.startsWith(`/`)?Cu([],n.replace(/^\/+/,``)):Cu(xu(e).split(`/`).filter(Boolean),n):xu(e)}function Cu(e,t){let n=[...e];for(let e of t.split(`/`))if(e&&e!==`.`){if(e===`..`){if(n.length===0)return null;n.pop()}else n.push(e)}return n.join(`/`)}function wu(e){return e?`/${e}`:`/`}function Tu(e,t){if(e.trim().startsWith(`/`))return!1;let n=xu(e).split(`/`).filter(Boolean)[0];return!!(n&&t.includes(n))}I({command:{id:`cd`,name:`cd`,description:`Changes the shell working directory`,tags:[F],grants:[`r`],parameters:[{name:`path`,description:`directory to enter, relative to the current shell directory. Omit to return to the directory the session was opened with`,required:!1}],output:[{name:`cwd`,description:`the shell working directory after the change`}]},handler:{execute:async e=>{if(e.cwd===void 0){k(`No shell session.`);return}let t=e.params?.path;if(!t)return{cwd:e.initialCwd??``};let n=Su(Tu(t,(await U.getFolders()).map(e=>e.name))?``:e.cwd,t);if(n===null){k(`Cannot leave the workspace root.`);return}if(!n)return{cwd:``};let r=await U.getWorkspace();if(!r)k(`No workspace selected.`);else if(!(await r.getResource(n)instanceof H))k(`Not a directory: ${n}`);else return{cwd:n}}}}),I({command:{id:`cwd`,name:`cwd`,description:`Prints the shell working directory`,tags:[F],grants:[`r`],parameters:[],output:[{name:`cwd`,description:`the shell working directory. / is the workspace root`}]},handler:{execute:async e=>{if(e.cwd===void 0)k(`No shell session.`);else return e.cwd===``?`/`:e.cwd}}}),I({command:{id:`exists`,name:`Exists`,description:`Checks if a file exists at the given path (like bash test -f)`,tags:[F],grants:[`r`],parameters:[{name:`path`,description:`Path of the file to check, relative to the workspace`,required:!0}],output:[{name:`exists`,description:`true if the file exists, false otherwise`}]},handler:{execute:async({params:e})=>{let t=await U.getWorkspace();if(!t)return!1;let n=e?.path;if(!n)return!1;try{return await t.getResource(n)instanceof V}catch{return!1}}}});function Eu(e){return e instanceof V||e instanceof H}M.registerContribution(`filebrowser.create`,{name:`filebrowser.create.file`,command:`touch`,icon:`docks file-plus`,label:`Create File...`,params:{ask:!0}}),M.registerContribution(`filebrowser.create`,{name:`filebrowser.create.folder`,command:`mkdir`,icon:`folder-plus`,label:`Create Folder...`,params:{ask:!0}}),M.registerContribution(`contextmenu:view.filebrowser`,{name:`contextmenu.filebrowser.create-folder`,command:`mkdir`,icon:`folder-plus`,label:`Create Folder...`,params:{ask:!0}}),M.registerContribution(`contextmenu:view.filebrowser`,{name:`contextmenu.filebrowser.rename`,command:`mv`,icon:`pen`,label:`Rename`,disabled:()=>!Eu(P.get())}),M.registerContribution(`contextmenu:view.filebrowser`,{name:`contextmenu.filebrowser.delete`,command:`rm`,icon:`trash`,label:`Delete`,disabled:()=>{let e=P.get();return!Eu(e)||e instanceof H&&e.getParent()===void 0}}),I({command:{id:`head`,name:`Head - Show first lines`,description:`Shows the first N lines of a file`,tags:[F],grants:[`r`],parameters:[{name:`path`,description:`the path of the file to read`,required:!0},{name:`lines`,description:`number of lines to show from the beginning (default: 10)`,type:`number`,required:!1}],output:[{name:`content`,description:`the first N lines of the file`}]},handler:{execute:async({params:e})=>{let t=e?.path;if(!t){k(`No file path provided.`);return}let n=await vu(t);if(!n)return;let r=e?.lines?parseInt(e.lines,10):10;if(Number.isNaN(r)||r<1){k(`Number of lines must be a positive integer`);return}let i=await yu(n);if(i)return i.split(`
`).slice(0,r).join(`
`)}}}),I({command:{id:`ls`,name:`List files`,description:`Lists files from a directory. If recursive is provided, it traverses from the provided directory down to all leaves. If no directory is provided, it will traverse from the workspace root.`,tags:[F],grants:[`r`],parameters:[{name:`path`,description:`the path of the directory to list, relative to the workspace. If not provided, uses workspace root`,required:!1},{name:`recursive`,description:`whether to recursively traverse all subdirectories`,type:`boolean`,required:!1}],output:[{name:`files`,description:`array of file objects with path and size information`}]},handler:{execute:async({params:e})=>{let t=e?.path,n=e?.recursive===!0||e?.recursive===`true`;try{let e;if(t){let n=await _u(t);if(!n)return k(`Path not found: ${t}`),[];if(!(n instanceof H))return k(`Path is not a directory: ${t}`),[];e=n}else{let t=await U.getWorkspace();if(!t)return k(`No workspace available`),[];e=t}if(n){let t=await bu(e),n=[];for(let e of t){let t=await _u(e);t instanceof V&&n.push({path:e,size:await t.size()})}return n}let r=await e.listChildren(!0),i=[];for(let e of r)e instanceof H?i.push({path:e.getWorkspacePath(),kind:`directory`,size:null}):e instanceof V&&i.push({path:e.getWorkspacePath(),kind:`file`,size:await e.size()});return i}catch(e){return k(`Failed to list files: ${e.message??e}`),[]}}}});async function Du(e,t,n=``){if(e?.ask)return await e.ask({kind:`text`,message:t,defaultValue:n})||void 0;if(e?.readLine)return await e.readLine(t)||void 0;let r=await Ds(t,n);if(r)return r}var Ou=[`Yes`,`No`];function ku(e){let t=e?.trim().toLowerCase();return t===`yes`||t===`y`}async function Au(e,t){return!e?.ask&&!e?.readLine?Ls(t):ku(await Nu(e,t,Ou,`No`,!1))}function ju(e){return[...new Set(e.map(e=>e.trim()).filter(Boolean))]}function Mu(e,t){let n=t.find(t=>t===e);if(n)return n;let r=Number(e);return Number.isInteger(r)&&r>=1&&r<=t.length?t[r-1]:e}async function Nu(e,t,n,r=``,i=!0){let a=ju(n);if(!a.length)return Du(e,t,r);if(e?.ask)return await e.ask({kind:`choice`,message:t,choices:a,...r?{defaultValue:r}:{},...i?{}:{custom:!1}})||void 0;let o=a.map((e,t)=>`${t+1}. ${e}`).join(`
`);if(e?.readLine){let n=await e.readLine(`${t}\n${o}`.replace(/\n/g,`\r
`));return n?Mu(n.trim(),a):void 0}let s=await Ds(`${t}\n${o}`,r||a[0]||``);if(s)return Mu(s.trim(),a)}function Pu(e){return e.replace(/^\/+/,``).replace(/\/+$/,``)}function Fu(){let e=P.get();if(e instanceof H)return e.getWorkspacePath();if(e instanceof V)return e.getParent()?.getWorkspacePath()}function Iu(e,t){return e?`${e}/${t}`:t}async function Lu(e){let t=await U.getWorkspace();if(!t){k(`No workspace selected.`);return}let n=`New Folder`,r=Iu(e,n),i=await t.getResource(r);if(!i)return r;let a=0;for(;;){if(r=Iu(e,`${n} (${a})`),i=await t.getResource(r),!i)return r;a++}}I({command:{id:`mkdir`,name:`mkdir - Create new folder`,description:`Creates a new folder within the workspace.`,tags:[F],grants:[`w`],parameters:[{name:`path`,description:`the folder path to create, relative to the workspace`,required:!1},{name:`ask`,description:`whether to prompt the user for the folder path`,required:!1}],output:[{name:`path`,description:`the path of the created folder`}]},handler:{execute:async e=>{let t=e.params,n=t?.ask,r=t?.path,i=await Lu(Fu());if(!i||(n||!r)&&(r=await Du(e,`Enter path to new folder:`,r||i),!r))return;let a=r.startsWith(`/`),o=Pu(r);if(!o){k(`Folder path must not be empty.`);return}if(!a){let e=Fu();e&&!o.startsWith(e+`/`)&&(o=`${e}/${o}`)}let s=await U.getWorkspace();if(!s){k(`No workspace selected.`);return}let c=await s.getResource(o);if(c instanceof H)return O(`Folder already exists: ${o}`),o;if(c instanceof V)k(`Cannot create folder. A file already exists at "${o}".`);else if(!(await s.getResource(`${o}/`,{create:!0})instanceof H))k(`Could not create folder: ${o}`);else return O(`Folder created: ${o}`),o}}}),I({command:{id:`mv`,name:`mv - Rename a resource (file or directory)`,description:`Renames a resource (file or directory)`,keyBinding:`F2`,tags:[F],grants:[`w`],parameters:[{name:`path`,description:`the path of the resource within the workspace to rename or the currently active selection`,required:!1},{name:`newName`,description:`the new name for the resource`,required:!1}]},handler:{execute:async e=>{let t=await U.getWorkspace();if(!t){k(`No workspace selected.`);return}let n=e.params?.path,r=null;if(n&&(r=await t.getResource(n)),r||=P.get(),!r){k(`No resource to rename provided!`);return}let i=r.getName(),a=e.params?.newName??await Du(e,`Enter new name for "${i}":`,i);if(a&&a!==i)try{await r.rename(a),O(`Resource renamed to: ${a}`)}catch(e){k(`Failed to rename ${i}: ${e.message??e}`)}}}}),I({command:{id:`rm`,name:`rm - Delete a resource (file or directory)`,description:`Deletes a resource (file or directory)`,keyBinding:`Delete`,tags:[F],grants:[`w`],parameters:[{name:`path`,description:`the path of the resource within the workspace to delete or the currently active selection`,required:!1},{name:`confirm`,description:`whether to ask the user to confirm the deletion, true by default`,required:!1}]},handler:{execute:async e=>{let t=await U.getWorkspace();if(!t){k(`No workspace selected.`);return}let n=e.params?.path,r=null;if(n&&(r=await t.getResource(n)),r||=P.get(),!r){k(`No resource to delete provided!`);return}if(r instanceof H&&r.getParent()===void 0){k(`Root folders cannot be deleted. Use "Disconnect folder" instead.`);return}let i=r.getWorkspacePath(),a=e.params?.confirm;if(a!==void 0&&a!==!0||await Au(e,`Are you sure you want to delete ${i}?`))try{await r.delete(),O(`Resource deleted: `+i)}catch(e){k(`Resource ${i} could not be deleted: ${e.message??e}`)}}}}),I({command:{id:`tail`,name:`Tail - Show last lines`,description:`Shows the last N lines of a file`,tags:[F],grants:[`r`],parameters:[{name:`path`,description:`the path of the file to read`,required:!0},{name:`lines`,description:`number of lines to show from the end (default: 10)`,type:`number`,required:!1}],output:[{name:`content`,description:`the last N lines of the file`}]},handler:{execute:async({params:e})=>{let t=e?.path;if(!t){k(`No file path provided.`);return}let n=await vu(t);if(!n)return;let r=e?.lines?parseInt(e.lines,10):10;if(Number.isNaN(r)||r<1){k(`Number of lines must be a positive integer`);return}let i=await yu(n);if(i)return i.split(`
`).slice(-r).join(`
`)}}}),I({command:{id:`touch`,name:`Touch - Create new file`,description:`Creates a new file within the workspace. For .docks map files, use create_map_file instead.`,tags:[F],grants:[`w`],parameters:[{name:`path`,description:`the path including name of the file to be created, must be relative to the workspace`,required:!1},{name:`contents`,description:`the textual contents of the file`,required:!1},{name:`ask`,description:`whether to prompt the user for the file path`,required:!1},{name:`extension`,description:`required file extension (e.g., '.docks'), will be appended if missing`,required:!1}],output:[{name:`path`,description:`the path of the created file`}]},handler:{execute:async e=>{let t=e.params,n=t?.path,r=t?.contents,i=t?.ask,a=t?.extension;if((i||!n)&&(n=await Du(e,`Enter path to new file (directories will be created if not exist):`,n||``),!n))return;if(a&&!n.endsWith(a)&&(n+=a),n.startsWith(`/`))n=n.slice(1);else{let e=P.get(),t=e instanceof H?e.getWorkspacePath():e instanceof V?e.getParent()?.getWorkspacePath():void 0;t&&!n.startsWith(t+`/`)&&(n=t+`/`+n)}let o=await U.getWorkspace();if(!o){k(`No workspace selected.`);return}if(await o.getResource(n)&&!await Au(e,`File "${n}" already exists. Do you want to overwrite it?`))return;let s=await o.getResource(n,{create:!0});if(!(s instanceof V))k(`Could not create file: `+n);else return r&&await s.saveContents(r),O(`File created: ${n}`),n}}}),I({command:{id:`wc`,name:`Word count`,description:`Counts lines, words, and characters in a file`,tags:[F],grants:[`r`],parameters:[{name:`path`,description:`the path of the file to analyze`,required:!0}],output:[{name:`lines`,description:`number of lines in the file`},{name:`words`,description:`number of words in the file`},{name:`characters`,description:`number of characters in the file`}]},handler:{execute:async({params:e})=>{let t=e?.path;if(!t){k(`No file path provided.`);return}let n=await vu(t);if(!n)return;let r=await yu(n);if(!r)return;let i=r.split(`
`),a=r.trim(),o=a===``?0:a.split(/\s+/).filter(e=>e.length>0).length;return{lines:i.length,words:o,characters:r.length}}}});function Ru(){return`downloaded-file-${new Date().toISOString().replace(/[:.]/g,`-`).replace(`T`,`_`).slice(0,-5)}`}function zu(e){if(e.startsWith(`data:`))return Ru();try{let t=new URL(e).pathname.split(`/`).filter(e=>e.length>0),n=t[t.length-1];if(n?.includes(`.`)&&!n.includes(`;`))return n}catch{}return Ru()}I({command:{id:`wget`,name:`wget`,description:`Download a file from a URL to the workspace`,tags:[F],grants:[`w`],parameters:[{name:`url`,description:`the URL of the file to download`,required:!0},{name:`filename`,description:`optional filename to save as (will be auto-detected if not provided)`,required:!1},{name:`targetPath`,description:`workspace path where to save; if not provided, a file browser dialog is shown to pick a directory`,required:!1}]},handler:{canExecute:e=>{try{return new URL(e.params?.url),!0}catch{return!1}},execute:async e=>{let t=e.params?.url;if(!t){k(`No URL provided.`);return}let n=await U.getWorkspace();if(!n){k(`No workspace selected.`);return}let r=(typeof e.params?.filename==`string`?e.params.filename.trim():``)||zu(t),i,a=e.params?.targetPath;if(a){let e=await U.getFolders(),t=e.length>0?e[0].name:null,n=a.includes(`/`)?a:t?`${t}/${a}`:a,o=n.split(`/`).pop()??``;i=o.includes(`.`)&&o!==n?n:`${n.replace(/\/$/,``)}/${r}`}else if(e.readLine||e.ask){let t=await U.getFolders(),n=typeof e.cwd==`string`?e.cwd.replace(/^\/+|\/+$/g,``):``,a=[...new Set([n,...t.map(e=>e.name)].filter(Boolean))],o=a.length?await Nu(e,`Workspace directory to save into:`,a,n||a[0]):await Du(e,`Workspace directory to save into:`);if(!o)return;i=`${o.replace(/^\/+|\/+$/g,``)}/${r}`}else{let e=await Vs(`directory`);if(e==null)return;i=`${e}/${r}`}await Ra.runAsync(`Downloading file`,async a=>{a.message=`Starting download...`,a.progress=0;try{let o=await fetch(t,{mode:`cors`,credentials:`omit`});if(!o.ok){k(`Failed to download file: `+o.statusText);return}let s=e.params?.filename;if(!s){let e=o.headers.get(`content-disposition`);if(e){let t=e.match(/filename="?([^";\n]+)"?/);t?.[1]&&(s=t[1].trim())}}s||=r;let c=i.includes(`/`)?i.replace(/\/[^/]+$/,`/${s}`):s;a.message=`Downloading ${s}...`,a.progress=50,await(await n.getResource(c,{create:!0})).saveContents(o.body,{contentType:wt.BINARY}),a.progress=100,O(`File downloaded: ${s}`)}catch(e){throw k(`Failed to download file: `+String(e)),e}})}}}),x.put(`constants`,Fa),ne.put(`html`,t),ne.put(`render`,n),ne.put(`toastInfo`,O),ne.put(`toastError`,k),ne.put(`toastWarning`,Ie),ne.put(`publish`,d),ne.put(`subscribe`,g);var Bu={};function Vu(e){Bu={...Bu,...e}}function Hu(){return{...Bu}}p(e({ABOUT_TABS:()=>Da,ABOUT_TAB_ATTRIBUTIONS:()=>rc,ABOUT_TAB_PACKAGES:()=>nc,ABOUT_TAB_RELEASE:()=>tc,ATTRIBUTION_ECLIPSE_DOCKS:()=>ic,ATTRIBUTION_FONT_AWESOME:()=>ac,COMMAND_SAVE:()=>Ia,COMMAND_TAG_SHELL:()=>F,CTXMENU_FILEBROWSER_DELETE:()=>sc,CTXMENU_FILEBROWSER_RENAME:()=>oc,CommandRegistry:()=>at,CommandStack:()=>it,CompositeDirectory:()=>Dt,DEFAULT_LAYOUT_PANEL_VISIBILITY:()=>Ll,Directory:()=>H,DocksContainer:()=>cc,DocksDialogContent:()=>fo,DocksElement:()=>uo,DocksFloatingPanel:()=>xt,DocksPart:()=>lc,DocksStandardLayout:()=>$l,DocksWidget:()=>dt,EDITOR_AREA_MAIN:()=>Oa,EMPTY_SIGNALPORT:()=>Ye,FLOATING_PANEL_CONTRIBUTION_TARGET:()=>Co,File:()=>V,FileContentType:()=>wt,FileSysDirHandleResource:()=>Rt,HIDE_DOT_RESOURCE:()=>!1,IN_MEMORY_CONTRIBUTION_TYPE:()=>es,IN_MEMORY_ROOT_NAME:()=>$o,LAYOUT_PANEL_OPTIONS:()=>Gl,LAYOUT_PANEL_SETTINGS_KEY:()=>zl,LEGACY_PREFERRED_LAYOUT_KEY:()=>Bl,MemoryMountDirectory:()=>gs,MemoryRootDirectory:()=>ls,MouseButton:()=>La,PANEL_BOTTOM:()=>Pa,SIDEBAR_AUXILIARY:()=>Ma,SIDEBAR_AUXILIARY_BOTTOM:()=>Na,SIDEBAR_MAIN:()=>Aa,SIDEBAR_MAIN_BOTTOM:()=>ja,SIDEBAR_MAIN_TOOLBAR:()=>Ca,SIDEBAR_TOOLBAR_EXTENSIONS:()=>$s,SYSTEM_ATTRIBUTIONS:()=>Ea,SYSTEM_DEFAULT_FILE_ICONS:()=>ec,SYSTEM_LAYOUTS:()=>Ta,SYSTEM_VIEWS:()=>wa,StringFile:()=>Et,TOOLBAR_ACTIVE_PART_NAME:()=>Xs,TOOLBAR_BOTTOM:()=>ba,TOOLBAR_BOTTOM_CENTER:()=>xa,TOOLBAR_BOTTOM_END:()=>Sa,TOOLBAR_FAST_VIEWS:()=>Gs,TOOLBAR_FULLSCREEN:()=>Ys,TOOLBAR_INFO:()=>Ws,TOOLBAR_LANGUAGE_SELECTOR:()=>Ks,TOOLBAR_LAYOUT_SWITCHER:()=>qs,TOOLBAR_MAIN:()=>_a,TOOLBAR_MAIN_CENTER:()=>ya,TOOLBAR_MAIN_RIGHT:()=>va,TOOLBAR_TASKS:()=>Zs,TOOLBAR_THEME_SWITCHER:()=>Js,TOOLBAR_TOASTS:()=>Qs,TOPIC_COMMAND_REGISTERED:()=>et,TOPIC_CONTRIBUTEIONS_CHANGED:()=>j,TOPIC_SETTINGS_CHANGED:()=>ze,TOPIC_WORKSPACE_CHANGED:()=>z,TOPIC_WORKSPACE_CONNECTED:()=>St,VIEW_FILEBROWSER:()=>Hs,VIEW_LOG_TERMINAL:()=>Us,WorkspaceService:()=>It,activeEditorSignal:()=>Xe,activePartSignal:()=>N,activeSelectionSignal:()=>P,activeTasksSignal:()=>Qe,appLoaderService:()=>Ts,appSettings:()=>A,applyConfigNameRemaps:()=>Ue,askChoice:()=>Nu,askText:()=>Du,askYes:()=>Au,clearToasts:()=>Ne,commandHasTag:()=>tt,commandRegistry:()=>ot,configureFramework:()=>Vu,confirmDialog:()=>Ls,contributionRegistry:()=>M,contributionTargetMappingRegistry:()=>Ve,createJsRuntime:()=>du,createLazyLabel:()=>Ja,createLogger:()=>me,describeShellCommands:()=>ct,dialogService:()=>xo,editorRegistry:()=>Jc,enterToastQuiet:()=>Ae,esmShService:()=>Za,explicitWorkspacePath:()=>wu,extensionRegistry:()=>Z,filebrowserDialog:()=>Vs,findStandardLayout:()=>Wl,floatingPanelService:()=>Do,formDialog:()=>Ms,formDialogRequired:()=>Ns,getFrameworkConfig:()=>Hu,getInMemoryMountProjection:()=>hs,getInMemoryRoot:()=>ps,handleDropdownWaSelect:()=>Nc,i18n:()=>Ya,icon:()=>R,infoDialog:()=>Fs,layoutIdToPanelVisibility:()=>Vl,listContributionNameRemaps:()=>We,listToasts:()=>je,logger:()=>C,namesWorkspaceRoot:()=>Tu,navigableInfoDialog:()=>zs,overrideContributionTargets:()=>He,parseIconSpec:()=>ft,parseMarkdownHtml:()=>lo,partDirtySignal:()=>Ze,persistenceService:()=>be,perspectiveSwitchedSignal:()=>$e,promptDialog:()=>Ds,publish:()=>d,registerAll:()=>I,registerLicenseAttribution:()=>Ql,renderCommandContribution:()=>Lc,renderDropdownContribution:()=>Rc,renderDropdownContributions:()=>zc,renderDropdownItem:()=>Ic,renderDropdownSubmenu:()=>Bc,resolveInitialPanelVisibilityFromApp:()=>Hl,resolveStoredPanelVisibility:()=>Ul,resolveWorkspacePath:()=>Su,rootContext:()=>x,runJavaScriptCode:()=>fu,sanitizeHtml:()=>co,setInMemoryMountProjection:()=>ms,setLogLevel:()=>he,stripWorkspacePath:()=>xu,subscribe:()=>g,tabsMenuTarget:()=>ka,taskService:()=>Ra,toastCounts:()=>Me,toastError:()=>k,toastInfo:()=>O,toastWarning:()=>Ie,treeNodeComparator:()=>Yc,uiContext:()=>ne,unsubscribe:()=>s,validateFormDialogFields:()=>js,versionInfoDialog:()=>_c,watchSignal:()=>L,workspaceService:()=>U}),import.meta.url,`core`);export{Ta as $,Et as $t,Ia as A,ft as An,Nc as At,$o as B,me as Bn,Bc as Bt,Yc as C,Ve as Cn,Z as Ct,tc as D,We as Dn,Ns as Dt,nc as E,R as En,Ms as Et,uo as F,k as Fn,Ds as Ft,Ma as G,ne as Gn,js as Gt,ls as H,be as Hn,ms as Ht,lc as I,O as In,Lc as It,ja as J,Dt as Jt,Na as K,_c as Kt,Oa as L,Ie as Ln,Rc as Lt,oc as M,$e as Mn,Fs as Mt,cc as N,I as Nn,zs as Nt,ic as O,je as On,hs as Ot,fo as P,Me as Pn,lo as Pt,ec as Q,Rt as Qt,Co as R,L as Rn,zc as Rt,xu as S,M as Sn,Za as St,rc as T,Ae as Tn,Do as Tt,La as U,x as Un,ka as Ut,gs as V,C as Vn,co as Vt,Pa as W,he as Wn,Ra as Wt,$s as X,V as Xt,Ca as Y,H as Yt,Ea as Z,wt as Zt,Ql as _,A as _n,Us as _t,Bl as a,at as an,Gs as at,Su as b,tt as bn,Ja as bt,Au as c,dt as cn,Ks as ct,Jc as d,j as dn,ya as dt,z as en,wa as et,wu as f,ze as fn,va as ft,Tu as g,Qe as gn,Hs as gt,Vl as h,P as hn,Qs as ht,zl as i,F as in,Sa as it,sc as j,Ze as jn,Ya as jt,ac as k,He as kn,ps as kt,Vu as l,Ye as ln,qs as lt,Hu as m,N as mn,Js as mt,$l as n,It as nn,ba as nt,Nu as o,it as on,Ys as ot,Wl as p,Xe as pn,Zs as pt,Aa as q,X as qt,Gl as r,U as rn,xa as rt,Du as s,xt as sn,Ws as st,Ll as t,St as tn,Xs as tt,du as u,et as un,_a as ut,Hl as v,Ue as vn,Ts as vt,Da as w,ct as wn,Vs as wt,fu as x,ot as xn,xo as xt,Ul as y,Ne as yn,Ls as yt,es as z,T as zn,Ic as zt};