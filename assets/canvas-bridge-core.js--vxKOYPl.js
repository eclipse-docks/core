import{n as e}from"./rolldown-runtime-Dd_uD5pT.js";import{E as t,S as n,T as r,_ as i,a,b as o,c as s,d as c,f as l,g as u,h as d,i as f,l as p,n as ee,o as m,p as te,r as ne,s as h,u as re,v as ie,w as g,x as _,y as v}from"./canvas-bridge-canvas.js-DrvOvBhU.js";var y=new class e{constructor(e){this.children=[],this.variables=e,this.proxy=new Proxy(e,this)}get(e,t){return e[t]||this.parent?.getProxy()[t]}set(e,t,n){e[t]=n}put(e,t){this.variables[e]=t}getProxy(){return this.proxy}createChild(t={}){let n=new e(t);return n.parent=this,this.children.push(n),n}getChildren(){return this.children}getParent(){return this.parent}destroy(){let e=this.parent?.children.indexOf(this);e!==void 0&&e>=0&&this.parent?.children.splice(e,1),this.parent=void 0}}({}),b=y.createChild({}),ae={debug:0,info:1,warning:2,error:3},oe=`debug`,se={log:console.log.bind(console),info:console.info.bind(console),warn:console.warn.bind(console),error:console.error.bind(console),debug:console.debug.bind(console)},ce=null,le=[];function x(e){if(e===null)return`null`;if(e===void 0)return`undefined`;if(typeof e==`string`)return e;if(typeof e==`number`||typeof e==`boolean`)return String(e);if(e instanceof Error)return`${e.name}: ${e.message}`;try{return JSON.stringify(e)}catch{return String(e)}}var ue=class{constructor(e){this.source=e}info(e,...t){let n=t.length===0?e:`${e} ${t.map(e=>x(e)).join(` `)}`;this.log(n,`info`)}warning(e,...t){let n=t.length===0?e:`${e} ${t.map(e=>x(e)).join(` `)}`;this.log(n,`warning`)}warn(e,...t){let n=t.length===0?e:`${e} ${t.map(e=>x(e)).join(` `)}`;this.log(n,`warning`)}error(e,...t){let n=t.length===0?e:`${e} ${t.map(e=>x(e)).join(` `)}`;this.log(n,`error`)}debug(e,...t){let n=t.length===0?e:`${e} ${t.map(e=>x(e)).join(` `)}`;this.log(n,`debug`)}log(e,t){fe(this.source,e,t)}};function de(e){return ae[e]>=ae[oe]}function fe(e,t,n){de(n)&&(ce?ce(e,t,n):(le.push({source:e,message:t,level:n}),se[n===`error`?`error`:n===`warning`?`warn`:n===`debug`?`debug`:`log`](`[${e}] ${t}`)))}function pe(){console.log=function(...e){se.log.apply(console,e),fe(`Console`,e.map(e=>x(e)).join(` `),`info`)},console.info=function(...e){se.info.apply(console,e),fe(`Console`,e.map(e=>x(e)).join(` `),`info`)},console.warn=function(...e){se.warn.apply(console,e),fe(`Console`,e.map(e=>x(e)).join(` `),`warning`)},console.error=function(...e){se.error.apply(console,e),fe(`Console`,e.map(e=>x(e)).join(` `),`error`)},console.debug=function(...e){se.debug.apply(console,e),fe(`Console`,e.map(e=>x(e)).join(` `),`debug`)}}pe();function me(e){for(ce=e;le.length>0;){let t=le.shift();t&&e(t.source,t.message,t.level)}}function he(){ce=null}function ge(e){return new ue(e)}function _e(e){oe=e}var S=ge(`System`);y.put(`logger`,S);var ve=ge(`Toast`),ye=4e3,be=null;function xe(){return be||(be=document.createElement(`wa-toast`),be.placement=`bottom-end`,document.body.append(be)),be}var Se=(e,t)=>{typeof document<`u`&&document.body&&xe().create(e,{variant:t,duration:ye})},Ce=e=>{ve.info(e),Se(e,`brand`)},C=e=>{ve.error(e),Se(e,`danger`)},we=e=>{ve.warn(e),Se(e,`warning`)},Te=new class{constructor(){this.globalNameRemaps=new Map,this.appNameRemaps=new Map}setGlobalNameRemap(e,t){this.globalNameRemaps.set(e,this.normalizeTargets(t))}resetForTesting(){this.globalNameRemaps.clear(),this.appNameRemaps.clear()}applyAppNameRemaps(e){if(this.appNameRemaps.clear(),e)for(let t of e)this.appNameRemaps.set(t.name,this.normalizeTargets(t.targets))}getEffectiveTargets(e,t){let n=t.name;if(!n)return[e];let r=this.appNameRemaps.get(n);if(r)return r.length>0?r:[];let i=this.globalNameRemaps.get(n);return i?i.length>0?i:[]:[e]}listNameRemaps(){let e={},t=new Set([...this.globalNameRemaps.keys(),...this.appNameRemaps.keys()]);for(let n of t)e[n]={appTargets:this.appNameRemaps.get(n),globalTargets:this.globalNameRemaps.get(n)};return e}normalizeTargets(e){let t=new Set,n=[];for(let r of e)r&&!t.has(r)&&(t.add(r),n.push(r));return n}};y.put(`contributionTargetMappingRegistry`,Te);function w(e,t){let n=Array.isArray(t)?t:[t];Te.setGlobalNameRemap(e,n)}function Ee(e){for(let[t,n]of Object.entries(e)){let e=Array.isArray(n)?n:[n];Te.setGlobalNameRemap(t,e)}}function T(){return Te.listNameRemaps()}var E=`events/contributionregistry/contributionsChanged`;function De(e,t){return e===void 0?t:typeof e==`boolean`?e:typeof e==`object`&&e&&`get`in e?e.get()===!0:typeof e==`function`?e()===!0:t}function Oe(e){let t=e.visible;return!t||t.get()!==!1}function ke(e){return De(e.disabled,!1)}function Ae(e){e.disabled instanceof Function&&(e.disabled=new l.Computed(e.disabled)),e.visible instanceof Function&&(e.visible=new l.Computed(e.visible))}var D=new class{constructor(){this.contributions=new Map}registerContribution(e,t){let n=this.getOrCreateSlot(e);Ae(t),n.push(t),g(E,{target:e,contributions:n});let r=Te.getEffectiveTargets(e,t);for(let t of r){if(t===e)continue;let n=this.getContributions(t);g(E,{target:t,contributions:n})}}getContributions(e){let t=[];for(let[n,r]of this.contributions.entries()){let i=r;for(let r of i)Te.getEffectiveTargets(n,r).includes(e)&&t.push(r)}return t.sort((e,t)=>(t.ranking??0)-(e.ranking??0)),t.length===0&&this.getOrCreateSlot(e),t}getOrCreateSlot(e){return this.contributions.has(e)||this.contributions.set(e,[]),this.contributions.get(e)}unregisterContribution(e,t){let n=this.contributions.get(e);if(!n)return;let r=n.filter(e=>e.name!==t);r.length!==n.length&&(this.contributions.set(e,r),g(E,{target:e,contributions:this.getContributions(e)}))}};y.put(`contributionRegistry`,D);var je={},O=re(null),Me=re(null),Ne=re(null),Pe=re(0),k=re(void 0),Fe=re({name:``,timestamp:0}),Ie=`events/commandregistry/commandRegistered`,Le=class{constructor(e,t,n,r,i){this.id=e,this.name=t,this.description=n,this.parameters=r||[],this.output=i||[]}};function Re(e){if(e===void 0)return`undefined`;if(e===null)return`null`;if(typeof e==`string`)return e.length>300?`${e.slice(0,300)}…`:e;if(typeof e==`number`||typeof e==`boolean`)return String(e);try{let t=JSON.stringify(e);return t.length>300?`${t.slice(0,300)}…`:t}catch{return String(e)}}var ze=class{async execute(e,t){return A.execute(e,t)}async undo(){}async redo(){}},Be=class{constructor(){this.commands={},this.handlers=new Map}registerHandler(e,t){this.handlers.has(e)||this.handlers.set(e,[]);let n=this.handlers.get(e);n.push(t),n.sort((e,t)=>(t.ranking??0)-(e.ranking??0))}getHandler(e){return this.handlers.get(e)}createExecutionContext(e){return{params:e||{},activePart:O.get(),activeEditor:Me.get()}}async execute(e,t={}){let n=this.getHandler(e);if(!n)throw S.debug(`[CommandRegistry] No handlers registered for command: ${e}`),Error(`No handlers registered for command: ${e}`);let r=this.getCommand(e),i=t.params?` params: ${JSON.stringify(t.params)}`:``;S.debug(`[CommandRegistry] Executing command: ${e}${r?` (${r.name})`:``}${i}`);for(let r of n)if(r.canExecute===void 0||r.canExecute(t))try{let n=r.execute(t),i=await Promise.resolve(n);return S.debug(`[CommandRegistry] Command executed successfully: ${e} (result: ${Re(i)})`),i}catch(t){let n=t instanceof Error?t.message:String(t);throw S.error(`[CommandRegistry] Command execution failed: ${e} - ${n}`),t}S.error(`[CommandRegistry] No handler found to execute command: ${e}`)}createAndRegisterCommand(e,t,n,r,i){let a=new Le(e,t,n,r);this.registerCommand(a),i&&this.registerHandler(e,i)}registerCommand(e){this.commands[e.id]=e,g(Ie,e)}hasCommand(e){return e in this.commands}listCommands(e){return e?Object.values(this.commands).filter(t=>(A.getHandler(t.id)||[]).some(t=>t.canExecute===void 0||t.canExecute(e))).reduce((e,t)=>(e[t.id]=t,e),{}):this.commands}getCommand(e){return this.commands[e]}registerAll(e){let t=e.command.id;this.registerCommand(e.command),e.handler&&this.registerHandler(t,e.handler),e.contribution&&e.contribution.target&&D.registerContribution(e.contribution.target,{command:t,...e.contribution})}},A=new Be;y.put(`commandRegistry`,A);var j=e=>{A.registerAll(e)},Ve=n`
    wa-tree-item::part(label) {
        flex: 1;
        min-width: 0;
    }
`,He=(e,t)=>{let n=new l.subtle.Watcher(async()=>{try{await 0,t(e.get())}finally{n.watch(e)}});return n.watch(e),e.get(),()=>{n.unwatch(e)}};Object.defineProperty(ie.prototype,"model",{enumerable:!0,configurable:!0,writable:!0});var Ue=c(ie),We=class extends Ue{constructor(...e){super(...e),this.signalCleanups=new Set,this.eventSubscriptions=new Set}static finalizeStyles(e){return[Ve,...super.finalizeStyles(e)]}connectedCallback(){super.connectedCallback(),this.doBeforeUI()}disconnectedCallback(){this.doClose(),super.disconnectedCallback(),this.eventSubscriptions.forEach(e=>t(e)),this.eventSubscriptions.clear(),this.signalCleanups.forEach(e=>e()),this.signalCleanups.clear()}subscribe(e,t){let n=r(e,t.bind(this));this.eventSubscriptions.add(n)}showInfo(e){Ce(e)}showError(e){C(e)}nobubble(e){return t=>{t.stopPropagation(),e.bind(this)(t)}}command(e,t={}){return()=>{this.executeCommand(e,t)}}async executeCommand(e,t){let n=A.createExecutionContext(t);await A.execute(e,n)}watch(e,t){let n=He(e,t.bind(this));this.signalCleanups.add(n)}firstUpdated(e){super.firstUpdated(e),this.doInitUI()}updateIdle(){requestIdleCallback(()=>this.requestUpdate())}updateLater(){requestAnimationFrame(()=>this.requestUpdate())}doBeforeUI(){}doInitUI(){}doClose(){}withRefresh(e){e(),this.updateLater()}},Ge=`eclipse-docks-persistence`,Ke=`keyval`,qe=1,Je=null;function Ye(){return Je||=new Promise((e,t)=>{let n=indexedDB.open(Ge,qe);n.onerror=()=>t(n.error),n.onsuccess=()=>e(n.result),n.onupgradeneeded=e=>{e.target.result.createObjectStore(Ke)}}),Je}var Xe=new class{async persistObject(e,t){let n=await Ye();return new Promise((r,i)=>{let a=n.transaction(Ke,`readwrite`).objectStore(Ke),o=t==null?a.delete(e):a.put(t,e);o.onsuccess=()=>r(),o.onerror=()=>i(o.error)})}async getObject(e){let t=await Ye();return new Promise((n,r)=>{let i=t.transaction(Ke,`readonly`).objectStore(Ke).get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}};y.put(`persistenceService`,Xe);var M=`events/filesys/workspaceChanged`,Ze=`events/filesys/workspaceConnected`,N=ge(`WorkspaceService`),Qe=class{constructor(){this.state={}}getWorkspacePath(){let e=[],t=this,n;for(;t;){e.push(t.getName());let r=t.getParent();r||(n=t),t=r}e.reverse();let r=typeof L?.getWorkspaceSync==`function`?L.getWorkspaceSync():void 0;if(r&&n&&`isDirectChild`in r&&typeof r.isDirectChild==`function`&&r.isDirectChild(n)){let t=r.getFolderNameForDirectory(n);if(t&&e.length>0)return e.length>1?t+`/`+e.slice(1).join(`/`):t}return e.shift(),e.join(`/`)}getWorkspace(){let e=this;for(;e;){let t=e.getParent();if(t)e=t;else break}return e}},$e=function(e){return e[e.TEXT=0]=`TEXT`,e[e.BINARY=1]=`BINARY`,e}({}),et=function(e){return e[e.BASE64=0]=`BASE64`,e}({}),P=class extends Qe{},F=class extends Qe{},tt=class extends P{constructor(e,t){super(),this.contents=e,this.name=t}async getContents(e){return this.contents}async saveContents(e,t){this.contents=e}async size(){return this.contents.length||null}async copyTo(e){throw Error(`Not supported`)}delete(e,t){throw Error(`Not supported`)}async rename(e){throw Error(`Not supported`)}getName(){return this.name}getParent(){}},nt=class extends F{constructor(e,t=`/`){super(),this.displayName=t,this.entriesByName=new Map(e.map(e=>[e.getName(),e]))}getFolderNameForDirectory(e){for(let[t,n]of this.entriesByName)if(n===e)return t}isDirectChild(e){return this.getFolderNameForDirectory(e)!==void 0}getName(){return this.displayName}getParent(){}async listChildren(e){return Array.from(this.entriesByName.values())}async getResource(e,t){let n=e?.replace(/^\/+/,``).trim();if(!n)return null;let r=n.indexOf(`/`),i=r>=0?n.slice(0,r).trim():n.trim(),a=r>=0?n.slice(r+1).trim():``,o=this.entriesByName.get(i);return o?a?o.getResource(a,t):o:null}touch(){for(let e of this.entriesByName.values())e.touch()}async delete(e,t){throw Error(`Delete not supported on workspace root`)}async copyTo(e){throw Error(`Copy not supported on workspace root`)}async rename(e){throw Error(`Rename not supported on workspace root`)}getFolderByName(e){return this.entriesByName.get(e)}},rt=class extends F{constructor(e){super(),this.backendType=e.backendType,this.persistedData=e.data,this.name=e.name}getName(){return this.name}getParent(){}async listChildren(e){return[]}async getResource(e,t){throw Error(`Workspace backend "${this.backendType}" is not available in this environment.`)}touch(){}async delete(e,t){throw Error(`Cannot modify workspace folder for missing backend "${this.backendType}".`)}async copyTo(e){throw Error(`Cannot copy from workspace folder for missing backend "${this.backendType}".`)}async rename(e){throw Error(`Cannot rename workspace folder for missing backend "${this.backendType}".`)}};function it(e){let t=e.data&&typeof e.data==`object`&&e.data.name;return typeof t==`string`&&t.length>0?t:e.type}function at(e){return e instanceof Error&&e.message.trim()?e.message:`Could not connect to this workspace folder.`}var ot=`Could not restore this workspace folder.`,st=class extends F{constructor(e){super(),this.backendType=e.backendType,this.name=e.name,this.reason=e.reason}getFailureReason(){return this.reason}getName(){return this.name}getParent(){}async listChildren(e){return[]}async getResource(e,t){throw Error(`Workspace folder "${this.name}" (${this.backendType}) is unavailable: ${this.reason}`)}touch(){}async delete(e,t){throw Error(`Cannot modify unavailable workspace folder "${this.name}" (${this.backendType}).`)}async copyTo(e){throw Error(`Cannot copy from unavailable workspace folder "${this.name}" (${this.backendType}).`)}async rename(e){throw Error(`Cannot rename unavailable workspace folder "${this.name}" (${this.backendType}).`)}};function I(e){return e instanceof rt||e instanceof st}async function ct(e,t,n,r){let i=it({type:e,data:t});try{return await n(t)||new st({backendType:e,name:i,data:t,reason:ot})}catch(n){return r?.(n),new st({backendType:e,name:i,data:t,reason:at(n)})}}var lt=`workspace_data`,ut=class e{getWorkspaceSync(){return this._currentWorkspace}constructor(){this._currentWorkspace=void 0,this.folders=[],this.contributions=new Map,this.restoredTypes=new Set;let e;this.initPromise=new Promise(t=>{e=t}),this.loadPersistedWorkspace(e)}registerContribution(e){this.contributions.set(e.type,e),this.tryRestoreForContribution(e)}getContributions(){return Array.from(this.contributions.values())}static{this.DEFAULT_INDEXEDDB_FOLDER_NAME=`My Folder`}async tryRestoreForContribution(e){if(await this.initPromise,this.restoredTypes.has(e.type))return;if(this.folders.filter(t=>t.type===e.type).some(e=>!I(e.directory))){this.restoredTypes.add(e.type);return}let t=await Xe.getObject(lt);if(!t?.folders||!Array.isArray(t.folders)){this.restoredTypes.add(e.type);return}let n=t.folders.filter(t=>t.type===e.type);if(n.length===0){this.restoredTypes.add(e.type);return}this.folders=this.folders.filter(t=>!(t.type===e.type&&I(t.directory)));for(let t of n){if(!e.restore)continue;let n=await ct(e.type,t.data,e.restore,t=>N.warn(`Failed to restore folder (${e.type}) on contribution registration:`,t));this.folders.push({type:e.type,data:t.data,directory:n})}if(this.folders.length===0){this.restoredTypes.add(e.type);return}let r=this.buildComposite();this.workspace=Promise.resolve(r),this._currentWorkspace=r??void 0,await this.persistFolders(),r&&(g(Ze,r),N.debug(`Workspace folders restored for contribution type: ${e.type}`)),this.restoredTypes.add(e.type)}async loadPersistedWorkspace(t){N.debug(`Restoring workspace from persistence`);try{let e=await Xe.getObject(lt);if(e||(this.workspace=Promise.resolve(void 0),this._currentWorkspace=void 0),e?.folders&&Array.isArray(e.folders)&&e.folders.length>0){let n=e.folders.map(e=>({type:e.type,data:e.data}));await this.resolveFolders(n);let r=this.buildComposite();this.workspace=Promise.resolve(r),this._currentWorkspace=r??void 0,r&&(g(Ze,r),N.debug(`Workspace restored from persisted folders`)),t();return}if(e&&e.type&&e.data!==void 0){let t=this.contributions.get(e.type);if(t?.restore)try{let n=await t.restore(e.data);if(n){this.folders=[{type:e.type,data:e.data,directory:n}];let t=this.buildComposite();this.workspace=Promise.resolve(t),this._currentWorkspace=t??void 0,this.currentType=e.type,await this.persistFolders(),g(Ze,t),N.debug(`Workspace restored from legacy format`)}}catch(e){N.error(`Failed to restore legacy workspace:`,e)}}this.workspace||(this.workspace=Promise.resolve(void 0),this._currentWorkspace=void 0),t()}finally{if(this.folders.length===0)try{await this.connectFolder({indexeddb:!0,name:e.DEFAULT_INDEXEDDB_FOLDER_NAME}),N.debug(`Connected default IndexedDB workspace`)}catch(e){N.warn(`Failed to connect default IndexedDB folder`,e)}}}async resolveFolders(e){this.folders=[];for(let t of e){let e=this.contributions.get(t.type);if(!e?.restore){let e=t.data&&typeof t.data==`object`&&t.data.name||`${t.type} (missing)`,n=new rt({backendType:t.type,name:e,data:t.data});this.folders.push({type:t.type,data:t.data,directory:n});continue}let n=await ct(t.type,t.data,e.restore,e=>N.warn(`Failed to restore folder (${t.type}):`,e));this.folders.push({type:t.type,data:t.data,directory:n})}}buildComposite(){if(this.folders.length!==0)return new nt(this.folders.map(e=>e.directory))}async persistFolders(){let e=this.folders.filter(e=>e.type!==`in-memory`),t=e.length>0?{folders:e.map(e=>({type:e.type,data:e.data}))}:null;await Xe.persistObject(lt,t),await Xe.persistObject(`workspace`,null),N.debug(`Persisted ${e.length} folder(s) (${this.folders.length} connected)`)}async getFolders(){return await this.initPromise,this.folders.map(e=>({name:e.directory.getName(),type:e.type}))}async getFolderInfoForDirectory(e){await this.initPromise;let t=this.folders.find(t=>t.directory===e);if(!t)return;let n=t.data&&typeof t.data==`object`&&t.data.name||t.directory.getName(),r=this.contributions.get(t.type)?.name??t.type;return{name:n,type:t.type,backendName:r}}async isResourceInCurrentWorkspace(e){await this.initPromise;let t=e;for(;t;){let e=t.getParent();if(!e)return t instanceof F&&this.folders.some(e=>e.directory===t);t=e}return!1}async updateFolderName(e,t){await this.initPromise;let n=this.folders.find(t=>t.directory===e);if(!n)return;n.data=n.data&&typeof n.data==`object`?{...n.data,name:t}:{name:t},await this.persistFolders();let r=this.buildComposite();this.workspace=Promise.resolve(r),this._currentWorkspace=r??void 0,g(Ze,r),N.debug(`Updated folder name: ${t}`)}async connectFolder(e){await this.initPromise;let t=Array.from(this.contributions.values()).find(t=>t.canHandle(e));if(!t)throw Error(`No workspace contribution can handle this input`);let n=e?.name??t.type;if((t.type===`in-memory`||t.type===`opfs`)&&this.folders.find(e=>e.type===t.type))return N.debug(`Workspace already has ${t.type}; reusing`),this.buildComposite();N.debug(`Connecting workspace: ${t.type}, ${n}`);let r=await t.connect(e),i=t.persist?await t.persist(r):e;this.folders.push({type:t.type,data:i,directory:r}),await this.persistFolders(),this.currentType=this.folders.length===1?t.type:void 0;let a=this.buildComposite();this.workspace=Promise.resolve(a),this._currentWorkspace=a,g(Ze,a);let o=r.getName();return N.info(`Workspace connected: ${t.type} (${o})`),a}async disconnectFolder(e){await this.initPromise;let t=this.folders.findIndex(t=>t.directory===e);if(t<0)return;let n=this.folders[t];N.debug(`Disconnecting folder: ${n.directory.getName()} (${n.type})`),this.folders.splice(t,1),await this.persistFolders(),this.folders.length>0?this.currentType=this.folders[0].type:(this.currentType=void 0,N.info(`Workspace disconnected`));let r=this.buildComposite();this.workspace=Promise.resolve(r),this._currentWorkspace=r??void 0,g(Ze,r)}async connectWorkspace(e){return this.connectFolder(e)}async getWorkspace(){if(await this.initPromise,!this.workspace)throw Error(`No workspace connected.`);return await this.workspace}isConnected(){return this.folders.length>0}getWorkspaceType(){return this.currentType}async disconnectWorkspace(){await this.initPromise,this.workspace=Promise.resolve(void 0),this._currentWorkspace=void 0,this.folders=[],this.currentType=void 0,await this.persistFolders(),g(Ze,void 0),N.info(`Workspace disconnected`)}async copyResource(e,t,n){await this.initPromise;let r=this._currentWorkspace;if(!r)throw Error(`No workspace connected.`);let i=n?.newName??e.getName(),a=t.getWorkspacePath(),o=a?`${a}/${i}`:i,s=async(e,t)=>{n?.onFile?.(t);let i=await e.getContents({blob:!0}),a=await r.getResource(t,{create:!0});if(!a)throw Error(`Failed to create target file: ${t}`);await a.saveContents(i)},c=async(e,t)=>{for(let n of await e.listChildren(!1)){let e=`${t}/${n.getName()}`;n instanceof P?await s(n,e):n instanceof F&&await c(n,e)}};if(e instanceof P)await s(e,o);else if(e instanceof F)await c(e,o);else throw Error(`Unsupported resource type for copy operation.`);n?.move&&await e.delete(void 0,!0)}},L=new ut;y.put(`workspaceService`,L);var dt=class extends P{constructor(e,t){super(),this.fileHandle=e,this.parent=t}getName(){return this.fileHandle.name}getParent(){return this.parent}async delete(){return this.getParent().delete(this.getName())}async getContents(e){let t=await this.fileHandle.getFile();return!e||e?.contentType==$e.TEXT?await t.text():e?.encoding==et.BASE64||e?.uri?URL.createObjectURL(t):e?.blob?t:t.stream()}async size(){try{return(await this.fileHandle.getFile()).size}catch{return null}}async saveContents(e,t){let n=await this.fileHandle.createWritable();if(e&&typeof e.pipeTo==`function`)await e.pipeTo(n);else{let t=n.getWriter();try{await t.write(e)}finally{await t.close()}}g(M,L.getWorkspaceSync()??this.getWorkspace())}async copyTo(e){let t=await this.getContents({blob:!0});await(await this.getWorkspace().getResource(e,{create:!0})).saveContents(t)}async rename(e){let t=this.getParent();if(!t)throw Error(`Cannot rename root resource`);if(this.getName()!==e){if(!(`move`in this.fileHandle)||typeof this.fileHandle.move!=`function`)throw Error(`File rename not supported in this browser. Please use a browser with File System Access API move() support.`);try{await this.fileHandle.move(e)}catch(e){throw e.name===`NotAllowedError`||e.message?.includes(`not allowed`)||e.message?.includes(`user agent`)?Error(`File rename failed: The operation took too long and user activation expired. Please try again.`):e}await t.listChildren(!0),g(M,L.getWorkspaceSync()??this.getWorkspace())}}},ft=class e extends F{constructor(e,t){super(),this.dirHandle=e,this.parent=t}getHandle(){return this.dirHandle}getParent(){return this.parent}getName(){return this.dirHandle.name}async listChildren(t=!1){return t||!this.files?(this.loadingPromise||=(async()=>{try{let t={};try{for await(let n of this.dirHandle.values()){let r=n.kind===`file`?new dt(n,this):new e(n,this);t[r.getName()]=r}}catch(e){if(e.name===`NotFoundError`)return this.files={},[];throw e}return this.files=t,Object.values(this.files)}finally{this.loadingPromise=void 0}})(),this.loadingPromise):Object.values(this.files)}async getResource(t,n){if(!t)throw Error(`No path provided`);let r=t.split(`/`).filter(e=>e.trim()),i=this,a=!1;try{for(let t=0;t<r.length;t++){let o=r[t].trim();if(i instanceof e){if(await i.listChildren(),!i.files)return null;let s=i.files[o];if(s)i=s;else{if(n?.create){if(a=!0,t<r.length-1)try{let t=await i.dirHandle.getDirectoryHandle(o,{create:!0}),n=new e(t,i);i.files[o]=n,i=n,i instanceof e&&await i.listChildren();continue}catch(e){throw e.name===`NotFoundError`?Error(`Directory not found or not accessible: ${r.slice(0,t+1).join(`/`)}`):e}try{let e=new dt(await i.dirHandle.getFileHandle(o,{create:!0}),i);return i.files[o]=e,e}catch(e){throw e.name===`NotFoundError`?Error(`File not found or not accessible: ${r.join(`/`)}`):e}}return null}}else return null}}finally{a&&g(M,L.getWorkspaceSync()??this.getWorkspace())}return i}touch(){g(M,L.getWorkspaceSync()??this.getWorkspace())}async delete(t,n=!0){if(!t){let t=this.getParent();return t instanceof e&&(await t.listChildren(),t.files&&delete t.files[this.getName()]),this.files=void 0,this.loadingPromise=void 0,t?.delete(this.getName())}return this.dirHandle.removeEntry(t,{recursive:n}).then(async()=>{this.files&&delete this.files[t],g(M,L.getWorkspaceSync()??this.getWorkspace())})}async copyTo(e){for(let t of await this.listChildren()){let n=[e,t.getName()].join(`/`);await t.copyTo(n)}}async rename(e){let t=this.getParent();if(!t)throw Error(`Cannot rename workspace root`);if(this.getName()!==e){if(!(`move`in this.dirHandle)||typeof this.dirHandle.move!=`function`)throw Error(`Directory rename not supported in this browser. Please use a browser with File System Access API move() support.`);try{await this.dirHandle.move(e)}catch(e){throw e.name===`NotAllowedError`||e.message?.includes(`not allowed`)||e.message?.includes(`user agent`)?Error(`Directory rename failed: The operation took too long and user activation expired. Please try again.`):e}await t.listChildren(!0),g(M,L.getWorkspaceSync()??this.getWorkspace())}}};L.registerContribution({type:`filesystem`,name:`fs`,canHandle(e){return e&&`kind`in e&&e.kind===`directory`},async connect(e){return new ft(e)},async restore(e){if(e&&`kind`in e&&e.kind===`directory`)return new ft(e,void 0)},async persist(e){return e instanceof ft?e.getHandle():null}});function pt(e,t){this.v=e,this.k=t}function mt(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function ht(e){if(Array.isArray(e))return e}function gt(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function _t(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function vt(e,t){return ht(e)||gt(e,t)||yt(e,t)||_t()}function yt(e,t){if(e){if(typeof e==`string`)return mt(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?mt(e,t):void 0}}function bt(e){var t,n;function r(t,n){try{var a=e[t](n),o=a.value,s=o instanceof pt;Promise.resolve(s?o.v:o).then(function(n){if(s){var c=t===`return`&&o.k?t:`next`;if(!o.k||n.done)return r(c,n);n=e[c](n).value}i(!!a.done,n)},function(e){r(`throw`,e)})}catch(e){i(2,e)}}function i(e,i){e===2?t.reject(i):t.resolve({value:i,done:e}),(t=t.next)?r(t.key,t.arg):n=null}this._invoke=function(e,i){return new Promise(function(a,o){var s={key:e,arg:i,resolve:a,reject:o,next:null};n?n=n.next=s:(t=n=s,r(e,i))})},typeof e.return!=`function`&&(this.return=void 0)}bt.prototype[typeof Symbol==`function`&&Symbol.asyncIterator||`@@asyncIterator`]=function(){return this},bt.prototype.next=function(e){return this._invoke(`next`,e)},bt.prototype.throw=function(e){return this._invoke(`throw`,e)},bt.prototype.return=function(e){return this._invoke(`return`,e)};var xt=Object.entries,St=Object.setPrototypeOf,Ct=Object.isFrozen,wt=Object.getPrototypeOf,Tt=Object.getOwnPropertyDescriptor,R=Object.freeze,z=Object.seal,Et=Object.create,Dt=typeof Reflect<`u`&&Reflect,Ot=Dt.apply,kt=Dt.construct;R||=function(e){return e},z||=function(e){return e},Ot||=function(e,t){var n=[...arguments].slice(2);return e.apply(t,n)},kt||=function(e){return new e(...[...arguments].slice(1))};var At=V(Array.prototype.forEach);Array.prototype.indexOf;var jt=V(Array.prototype.lastIndexOf),Mt=V(Array.prototype.pop),Nt=V(Array.prototype.push);Array.prototype.slice;var Pt=V(Array.prototype.splice),Ft=Array.isArray,It=V(String.prototype.toLowerCase),Lt=V(String.prototype.toString),Rt=V(String.prototype.match),zt=V(String.prototype.replace),Bt=V(String.prototype.indexOf),Vt=V(String.prototype.trim),Ht=V(Number.prototype.toString),Ut=V(Boolean.prototype.toString),Wt=typeof BigInt>`u`?null:V(BigInt.prototype.toString),Gt=typeof Symbol>`u`?null:V(Symbol.prototype.toString),Kt=V(Object.prototype.hasOwnProperty),qt=V(Object.prototype.toString),B=V(RegExp.prototype.test),Jt=Yt(TypeError);function V(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);var n=[...arguments].slice(1);return Ot(e,t,n)}}function Yt(e){return function(){return kt(e,[...arguments])}}function H(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:It;if(St&&St(e,null),!Ft(t))return e;let r=t.length;for(;r--;){let i=t[r];if(typeof i==`string`){let e=n(i);e!==i&&(Ct(t)||(t[r]=e),i=e)}e[i]=!0}return e}function Xt(e){for(let t=0;t<e.length;t++)Kt(e,t)||(e[t]=null);return e}function Zt(e){let t=Et(null);for(let r of xt(e)){var n=vt(r,2);let i=n[0],a=n[1];Kt(e,i)&&(t[i]=Ft(a)?Xt(a):a&&typeof a==`object`&&a.constructor===Object?Zt(a):a)}return t}function Qt(e){switch(typeof e){case`string`:return e;case`number`:return Ht(e);case`boolean`:return Ut(e);case`bigint`:return Wt?Wt(e):`0`;case`symbol`:return Gt?Gt(e):`Symbol()`;case`undefined`:return qt(e);case`function`:case`object`:{if(e===null)return qt(e);let t=e,n=$t(t,`toString`);if(typeof n==`function`){let e=n(t);return typeof e==`string`?e:qt(e)}return qt(e)}default:return qt(e)}}function $t(e,t){for(;e!==null;){let n=Tt(e,t);if(n){if(n.get)return V(n.get);if(typeof n.value==`function`)return V(n.value)}e=wt(e)}function n(){return null}return n}function en(e){try{return B(e,``),!0}catch{return!1}}var tn=R(`a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr`.split(`.`)),nn=R(`svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern`.split(`.`)),rn=R([`feBlend`,`feColorMatrix`,`feComponentTransfer`,`feComposite`,`feConvolveMatrix`,`feDiffuseLighting`,`feDisplacementMap`,`feDistantLight`,`feDropShadow`,`feFlood`,`feFuncA`,`feFuncB`,`feFuncG`,`feFuncR`,`feGaussianBlur`,`feImage`,`feMerge`,`feMergeNode`,`feMorphology`,`feOffset`,`fePointLight`,`feSpecularLighting`,`feSpotLight`,`feTile`,`feTurbulence`]),an=R([`animate`,`color-profile`,`cursor`,`discard`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`foreignobject`,`hatch`,`hatchpath`,`mesh`,`meshgradient`,`meshpatch`,`meshrow`,`missing-glyph`,`script`,`set`,`solidcolor`,`unknown`,`use`]),on=R(`math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts`.split(`.`)),sn=R([`maction`,`maligngroup`,`malignmark`,`mlongdiv`,`mscarries`,`mscarry`,`msgroup`,`mstack`,`msline`,`msrow`,`semantics`,`annotation`,`annotation-xml`,`mprescripts`,`none`]),cn=R([`#text`]),ln=R(`accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns`.split(`.`)),un=R(`accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan`.split(`.`)),dn=R(`accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns`.split(`.`)),fn=R([`xlink:href`,`xml:id`,`xlink:title`,`xml:space`,`xmlns:xlink`]),pn=z(/{{[\w\W]*|^[\w\W]*}}/g),mn=z(/<%[\w\W]*|^[\w\W]*%>/g),hn=z(/\${[\w\W]*/g),gn=z(/^data-[\-\w.\u00B7-\uFFFF]+$/),_n=z(/^aria-[\-\w]+$/),vn=z(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),yn=z(/^(?:\w+script|data):/i),bn=z(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),xn=z(/^html$/i),Sn=z(/^[a-z][.\w]*(-[.\w]+)+$/i),Cn=z(/<[/\w!]/g),wn=z(/<[/\w]/g),Tn=z(/<\/no(script|embed|frames)/i),En=z(/\/>/i),Dn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},On=[`style`,`script`,`xmp`,`iframe`,`noembed`,`noframes`,`plaintext`,`noscript`],kn=R(H({},On)),An=function(){let e={};return At(On,t=>{e[t]=z(RegExp(`</`+t+`(?=[\\t\\n\\f\\r />])`,`i`))}),R(e)}(),jn=function(){return typeof window>`u`?null:window},Mn=function(e,t){if(typeof e!=`object`||typeof e.createPolicy!=`function`)return null;let n=null,r=`data-tt-policy-suffix`;t&&t.hasAttribute(r)&&(n=t.getAttribute(r));let i=`dompurify`+(n?`#`+n:``);try{return e.createPolicy(i,{createHTML(e){return e},createScriptURL(e){return e}})}catch{return console.warn(`TrustedTypes policy `+i+` could not be created.`),null}},Nn=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},Pn=function(e,t,n,r){return Kt(e,t)&&Ft(e[t])?H(r.base?Zt(r.base):{},e[t],r.transform):n},Fn=function(e,t,n){let r=Kt(e,t)?e[t]:void 0;return r&&typeof r==`object`?Zt(r):n()};function In(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:jn(),t=e=>In(e);if(t.version=`3.4.16`,t.removed=[],!e||!e.document||e.document.nodeType!==Dn.document||!e.Element)return t.isSupported=!1,t;let n=e.document,r=n,i=r.currentScript;e.DocumentFragment;let a=e.HTMLTemplateElement,o=e.Node,s=e.Element,c=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let l=e.DOMParser,u=e.trustedTypes,d=s.prototype,f=$t(d,`cloneNode`),p=$t(d,`remove`),ee=$t(d,`removeAttributeNode`),m=$t(d,`nextSibling`),te=$t(d,`childNodes`),ne=$t(d,`parentNode`),h=$t(d,`shadowRoot`),re=$t(d,`attributes`),ie=o&&o.prototype?$t(o.prototype,`nodeType`):null,g=o&&o.prototype?$t(o.prototype,`nodeName`):null,_=o&&o.prototype?$t(o.prototype,`ownerDocument`):null,v=function(e){return ie?ie(e):e.nodeType},y=function(e){return g?g(e):e.nodeName};if(typeof a==`function`){let e=n.createElement(`template`);e.content&&e.content.ownerDocument&&(n=e.content.ownerDocument)}let b,ae=``,oe,se=!1,ce=0,le=function(){if(ce>0)throw Jt(`A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.`)},x=function(e){le(),ce++;try{return b.createHTML(e)}finally{ce--}},ue=function(e){le(),ce++;try{return b.createScriptURL(e)}finally{ce--}},de=function(){return se||=(oe=Mn(u,i),!0),oe},fe=n,pe=fe.implementation,me=fe.createNodeIterator,he=fe.createDocumentFragment,ge=fe.getElementsByTagName,_e=r.importNode,S=Nn();t.isSupported=typeof xt==`function`&&typeof ne==`function`&&pe&&pe.createHTMLDocument!==void 0;let ve=pn,ye=mn,be=hn,xe=gn,Se=_n,Ce=yn,C=bn,we=Sn,Te=vn,w=null,Ee=H({},[...tn,...nn,...rn,...on,...cn]),T=null,E=H({},[...ln,...un,...dn,...fn]),De=Object.seal(Et(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Oe=null,ke=null,Ae=Object.seal(Et(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),D=!0,je=!0,O=!1,Me=!0,Ne=!1,Pe=!0,k=!1,Fe=!1,Ie=null,Le=null,Re=!1,ze=!1,Be=!1,A=!1,j=!0,Ve=!1,He=`user-content-`,Ue=!0,We=!1,Ge={},Ke=null,qe=H({},`annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp`.split(`.`)),Je=null,Ye=H({},[`audio`,`video`,`img`,`source`,`image`,`track`]),Xe=null,M=H({},[`alt`,`class`,`for`,`id`,`label`,`name`,`pattern`,`placeholder`,`role`,`summary`,`title`,`value`,`style`,`xmlns`]),Ze=`http://www.w3.org/1998/Math/MathML`,N=`http://www.w3.org/2000/svg`,Qe=`http://www.w3.org/1999/xhtml`,$e=Qe,et=!1,P=null,F=H({},[Ze,N,Qe],Lt),tt=R([`mi`,`mo`,`mn`,`ms`,`mtext`]),nt=H({},tt),rt=R([`annotation-xml`]),it=H({},rt),at=H({},[`title`,`style`,`font`,`a`,`script`]),ot=null,st=[`application/xhtml+xml`,`text/html`],I=null,ct=null,lt=n.createElement(`form`),ut=function(e){return e instanceof RegExp||e instanceof Function},L=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(ct&&ct===e)return;(!e||typeof e!=`object`)&&(e={}),e=Zt(e),ot=st.indexOf(e.PARSER_MEDIA_TYPE)===-1?`text/html`:e.PARSER_MEDIA_TYPE,I=ot===`application/xhtml+xml`?Lt:It,w=Pn(e,`ALLOWED_TAGS`,Ee,{transform:I}),T=Pn(e,`ALLOWED_ATTR`,E,{transform:I}),P=Pn(e,`ALLOWED_NAMESPACES`,F,{transform:Lt}),Xe=Pn(e,`ADD_URI_SAFE_ATTR`,M,{transform:I,base:M}),Je=Pn(e,`ADD_DATA_URI_TAGS`,Ye,{transform:I,base:Ye}),Ke=Pn(e,`FORBID_CONTENTS`,qe,{transform:I}),Oe=Pn(e,`FORBID_TAGS`,Zt({}),{transform:I}),ke=Pn(e,`FORBID_ATTR`,Zt({}),{transform:I}),Ge=Kt(e,`USE_PROFILES`)?e.USE_PROFILES&&typeof e.USE_PROFILES==`object`?Zt(e.USE_PROFILES):e.USE_PROFILES:!1,D=e.ALLOW_ARIA_ATTR!==!1,je=e.ALLOW_DATA_ATTR!==!1,O=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Me=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ne=e.SAFE_FOR_TEMPLATES||!1,Pe=e.SAFE_FOR_XML!==!1,k=e.WHOLE_DOCUMENT||!1,ze=e.RETURN_DOM||!1,Be=e.RETURN_DOM_FRAGMENT||!1,A=e.RETURN_TRUSTED_TYPE||!1,Re=e.FORCE_BODY||!1,j=e.SANITIZE_DOM!==!1,Ve=e.SANITIZE_NAMED_PROPS||!1,Ue=e.KEEP_CONTENT!==!1,We=e.IN_PLACE||!1,Te=en(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:vn,$e=typeof e.NAMESPACE==`string`?e.NAMESPACE:Qe,nt=Fn(e,`MATHML_TEXT_INTEGRATION_POINTS`,()=>H({},tt)),it=Fn(e,`HTML_INTEGRATION_POINTS`,()=>H({},rt));let t=Fn(e,`CUSTOM_ELEMENT_HANDLING`,()=>Et(null));if(De=Et(null),Kt(t,`tagNameCheck`)&&ut(t.tagNameCheck)&&(De.tagNameCheck=t.tagNameCheck),Kt(t,`attributeNameCheck`)&&ut(t.attributeNameCheck)&&(De.attributeNameCheck=t.attributeNameCheck),Kt(t,`allowCustomizedBuiltInElements`)&&typeof t.allowCustomizedBuiltInElements==`boolean`&&(De.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),z(De),Ne&&(je=!1),Be&&(ze=!0),Ge&&(w=H({},cn),T=Et(null),Ge.html===!0&&(H(w,tn),H(T,ln)),Ge.svg===!0&&(H(w,nn),H(T,un),H(T,fn)),Ge.svgFilters===!0&&(H(w,rn),H(T,un),H(T,fn)),Ge.mathMl===!0&&(H(w,on),H(T,dn),H(T,fn))),Ae.tagCheck=null,Ae.attributeCheck=null,Kt(e,`ADD_TAGS`)&&(typeof e.ADD_TAGS==`function`?Ae.tagCheck=e.ADD_TAGS:Ft(e.ADD_TAGS)&&(w===Ee&&(w=Zt(w)),H(w,e.ADD_TAGS,I))),Kt(e,`ADD_ATTR`)&&(typeof e.ADD_ATTR==`function`?Ae.attributeCheck=e.ADD_ATTR:Ft(e.ADD_ATTR)&&(T===E&&(T=Zt(T)),H(T,e.ADD_ATTR,I))),Kt(e,`ADD_FORBID_CONTENTS`)&&Ft(e.ADD_FORBID_CONTENTS)&&(Ke===qe&&(Ke=Zt(Ke)),H(Ke,e.ADD_FORBID_CONTENTS,I)),Ue&&(w[`#text`]=!0),k&&H(w,[`html`,`head`,`body`]),w.table&&(H(w,[`tbody`]),delete Oe.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!=`function`)throw Jt(`TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.`);if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!=`function`)throw Jt(`TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.`);let t=b;b=e.TRUSTED_TYPES_POLICY;try{ae=x(``)}catch(e){throw b=t,e}}else e.TRUSTED_TYPES_POLICY===null?(b=void 0,ae=``):(b===void 0&&(b=de()),b&&typeof ae==`string`&&(ae=x(``)));R&&R(e),ct=e},dt=H({},[...nn,...rn,...an]),ft=H({},[...on,...sn]),pt=function(e,t,n){return t.namespaceURI===Qe?e===`svg`:t.namespaceURI===Ze?e===`svg`&&(n===`annotation-xml`||nt[n]):!!dt[e]},mt=function(e,t,n){return t.namespaceURI===Qe?e===`math`:t.namespaceURI===N?e===`math`&&it[n]:!!ft[e]},ht=function(e,t,n){return t.namespaceURI===N&&!it[n]||t.namespaceURI===Ze&&!nt[n]?!1:!ft[e]&&(at[e]||!dt[e])},gt=function(e){let t=ne(e);(!t||!t.tagName)&&(t={namespaceURI:$e,tagName:`template`});let n=It(e.tagName),r=It(t.tagName);return P[e.namespaceURI]?e.namespaceURI===N?pt(n,t,r):e.namespaceURI===Ze?mt(n,t,r):e.namespaceURI===Qe?ht(n,t,r):!!(ot===`application/xhtml+xml`&&P[e.namespaceURI]):!1},_t=function(e){Nt(t.removed,{element:e});try{ne(e).removeChild(e)}catch{if(p(e),!ne(e))throw Jt(`a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place`)}},vt=function(e,t,n){try{ee(e,t)}catch{try{e.removeAttribute(n)}catch{}}},yt=function(e){Ct(e);let t=te(e);if(t){let e=[];At(t,t=>{Nt(e,t)}),At(e,e=>{try{p(e)}catch{}})}let n=re(e);if(n)for(let t=n.length-1;t>=0;--t){let r=n[t],i=r&&r.name;typeof i==`string`&&vt(e,r,i)}},bt=function(e,n,r){if(!r)try{r=n.getAttributeNode(e)}catch{r=null}Nt(t.removed,{attribute:r||null,from:n});try{r?ee(n,r):n.removeAttribute(e)}catch{try{n.removeAttribute(e)}catch{}}if(e===`is`){if(ze||Be)try{_t(n)}catch{}else try{n.setAttribute(e,``)}catch{}}},St=function(e){let t=re(e);if(t)for(let n=t.length-1;n>=0;--n){let r=t[n],i=r&&r.name;typeof i!=`string`||T[I(i)]||vt(e,r,i)}},Ct=function(e){let t=[e];for(;t.length>0;){let e=t.pop();v(e)===Dn.element&&St(e);let n=te(e);if(n)for(let e=n.length-1;e>=0;--e)t.push(n[e])}},wt=function(e,t){return Pe?e===`patchsrc`||e===`for`&&t!==`label`&&t!==`output`:!1},Tt=function(e){if(!Pe)return;let t=[e];for(;t.length>0;){let e=t.pop(),n=v(e);if(n===Dn.processingInstruction||n===Dn.comment&&B(wn,e.data)){try{p(e)}catch{}continue}if(n===Dn.element){let t=e,n=I(y(e));try{t.hasAttribute&&t.hasAttribute(`patchsrc`)&&t.removeAttribute(`patchsrc`),t.hasAttribute&&t.hasAttribute(`for`)&&wt(`for`,n)&&t.removeAttribute(`for`)}catch{}}let r=te(e);if(r)for(let e=r.length-1;e>=0;--e)t.push(r[e])}},Dt=function(e){let t=null,r=null;if(Re)e=`<remove></remove>`+e;else{let t=Rt(e,/^[\r\n\t ]+/);r=t&&t[0]}ot===`application/xhtml+xml`&&$e===Qe&&(e=`<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>`+e+`</body></html>`);let i=b?x(e):e;if($e===Qe)try{t=new l().parseFromString(i,ot)}catch{}if(!t||!t.documentElement){t=pe.createDocument($e,`template`,null);try{t.documentElement.innerHTML=et?ae:i}catch{}}let a=t.body||t.documentElement;return e&&r&&a.insertBefore(n.createTextNode(r),a.childNodes[0]||null),$e===Qe?ge.call(t,k?`html`:`body`)[0]:k?t.documentElement:a},Ot=function(e){let t=_?_(e):e.ownerDocument;return me.call(t||e,e,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},kt=function(e){return e=zt(e,ve,` `),e=zt(e,ye,` `),e=zt(e,be,` `),e},Ht=function(e){e.normalize();let t=_?_(e):e.ownerDocument,n=me.call(t||e,e,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null),r=n.nextNode();for(;r;)r.data=kt(r.data),r=n.nextNode();let i=e.querySelectorAll?.call(e,`template`);i&&At(i,e=>{Wt(e.content)&&Ht(e.content)})},Ut=function(e){let t=g?g(e):null;return typeof t!=`string`||I(t)!==`form`?!1:typeof e.nodeName!=`string`||typeof e.textContent!=`string`||typeof e.removeChild!=`function`||e.attributes!==re(e)||typeof e.removeAttribute!=`function`||typeof e.removeAttributeNode!=`function`||typeof e.getAttributeNode!=`function`||typeof e.setAttribute!=`function`||typeof e.namespaceURI!=`string`||typeof e.insertBefore!=`function`||typeof e.hasChildNodes!=`function`||e.nodeType!==ie(e)||e.childNodes!==te(e)},Wt=function(e){if(!ie||typeof e!=`object`||!e)return!1;try{return ie(e)===Dn.documentFragment}catch{return!1}},Gt=function(e){if(!ie||typeof e!=`object`||!e)return!1;try{return typeof ie(e)==`number`}catch{return!1}};function qt(e,n,r){e.length!==0&&At(e,e=>{e.call(t,n,r,ct)})}let V=function(e,t){return!!(Pe&&e.hasChildNodes()&&!Gt(e.firstElementChild)&&B(Cn,e.textContent)&&B(Cn,e.innerHTML)||Pe&&e.namespaceURI===Qe&&kn[t]&&(Gt(e.firstElementChild)||typeof e.textContent==`string`&&B(An[t],e.textContent))||e.nodeType===Dn.processingInstruction||Pe&&e.nodeType===Dn.comment&&B(wn,e.data))},Yt=function(e,t){return e instanceof RegExp?B(e,t):e instanceof Function&&!!e(t,...[...arguments].slice(2))},Xt=function(e,t,n){if(!Oe[t]&&Vn(t)&&Yt(De.tagNameCheck,t))return!1;if(Ue&&!Ke[t]){let t=ne(e),r=te(e);if(r&&t){let i=r.length;for(let a=i-1;a>=0;--a){let i=e===n?f(r[a],!0):r[a];t.insertBefore(i,m(e))}}}return _t(e),!0},On=function(e,t,n,r){return e.length===0?t:t===n||t===r?Zt(t):t},Ln=function(e,t){return e===t||ne(e)!==null?!1:(We&&Ct(e),!0)},Rn=function(e,n){if(qt(S.beforeSanitizeElements,e,null),Ln(e,n))return!0;if(Ut(e))return _t(e),!0;let r=I(y(e));if(w=On(S.uponSanitizeElement,w,Ee,Ie),qt(S.uponSanitizeElement,e,{tagName:r,allowedTags:w}),Ln(e,n))return!0;if(V(e,r))return _t(e),!0;if(Oe[r]||!(Ae.tagCheck instanceof Function&&Ae.tagCheck(r))&&!w[r]){let t=Xt(e,r,n);return t===!1&&(qt(S.afterSanitizeElements,e,null),Ln(e,n))?!0:t}if(v(e)===Dn.element&&!gt(e)||(r===`noscript`||r===`noembed`||r===`noframes`)&&B(Tn,e.innerHTML))return _t(e),!0;if(Ne&&e.nodeType===Dn.text){let n=kt(e.textContent);e.textContent!==n&&(Nt(t.removed,{element:e.cloneNode()}),e.textContent=n)}return qt(S.afterSanitizeElements,e,null),Ln(e,n)},zn=function(e,t,r){if(ke[t]||wt(t,e)||j&&(t===`id`||t===`name`)&&(r in n||r in lt))return!1;let i=T[t]||Ae.attributeCheck instanceof Function&&Ae.attributeCheck(t,e);return je&&B(xe,t)||D&&B(Se,t)?!0:i?Xe[t]||B(Te,zt(r,C,``))||(t===`src`||t===`xlink:href`||t===`href`)&&e!==`script`&&Bt(r,`data:`)===0&&Je[e]||O&&!B(Ce,zt(r,C,``))?!0:!r:Vn(e)&&Yt(De.tagNameCheck,e)&&Yt(De.attributeNameCheck,t,e)||t===`is`&&De.allowCustomizedBuiltInElements&&Yt(De.tagNameCheck,r)},Bn=H({},[`annotation-xml`,`color-profile`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`missing-glyph`]),Vn=function(e){return!Bn[It(e)]&&B(we,e)},Hn=function(e,t,n,r){if(b&&typeof u==`object`&&typeof u.getAttributeType==`function`&&!n)switch(u.getAttributeType(e,t)){case`TrustedHTML`:return x(r);case`TrustedScriptURL`:return ue(r)}return r},U=function(e,t,n,r){try{return n?e.setAttributeNS(n,t,r):e.setAttribute(t,r),!Ut(e)||(_t(e),!1)}catch{return bt(t,e),!1}},Un=function(e,n){if(qt(S.beforeSanitizeAttributes,e,null),Ln(e,n))return;let r=e.attributes;if(!r||Ut(e))return;T=On(S.uponSanitizeAttribute,T,E,Le);let i={attrName:``,attrValue:``,keepAttr:!0,allowedAttributes:T,forceKeepAttr:void 0},a=r.length,o=I(e.nodeName);for(;a--;){let n=r[a],s=n.name,c=n.namespaceURI,l=n.value,u=I(s),d=l,f=s===`value`?d:Vt(d),p=!1;if(i.attrName=u,i.attrValue=f,i.keepAttr=!0,i.forceKeepAttr=void 0,qt(S.uponSanitizeAttribute,e,i),f=i.attrValue,Ve&&(u===`id`||u===`name`)&&Bt(f,He)!==0&&(bt(s,e,n),f=He+f,p=!0),Pe&&B(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,f)){bt(s,e,n);continue}if(u===`attributename`&&Rt(f,`href`)){bt(s,e,n);continue}if(!i.forceKeepAttr){if(!i.keepAttr){bt(s,e,n);continue}if(!Me&&B(En,f)){bt(s,e,n);continue}if(Ne&&(f=kt(f)),!zn(o,u,f)){bt(s,e,n);continue}f=Hn(o,u,c,f),f!==d&&U(e,s,c,f)&&p&&Mt(t.removed)}}qt(S.afterSanitizeAttributes,e,null),Ln(e,n)},W=function(e){let t=null,n=Ot(e);for(qt(S.beforeSanitizeShadowDOM,e,null);t=n.nextNode();)if(qt(S.uponSanitizeShadowNode,t,null),Rn(t,e),Un(t,e),Wt(t.content)&&W(t.content),v(t)===Dn.element){let e=h(t);Wt(e)&&(Wn(e),W(e))}qt(S.afterSanitizeShadowDOM,e,null)},Wn=function(e){let t=[{node:e,shadow:null}];for(;t.length>0;){let e=t.pop();if(e.shadow){W(e.shadow);continue}let n=e.node,r=v(n)===Dn.element,i=te(n);if(i)for(let e=i.length-1;e>=0;--e)t.push({node:i[e],shadow:null});if(r){let e=g?g(n):null;if(typeof e==`string`&&I(e)===`template`){let e=n.content;Wt(e)&&t.push({node:e,shadow:null})}}if(r){let e=h(n);Wt(e)&&t.push({node:null,shadow:e},{node:e,shadow:null})}}};return t.sanitize=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=null,a=null,o=null,s=null;if(et=!e,et&&(e=`<!-->`),typeof e!=`string`&&!Gt(e)&&(e=Qt(e),typeof e!=`string`))throw Jt(`dirty is not a string, aborting`);if(!t.isSupported)return e;Fe?(w=Ie,T=Le):L(n),(S.uponSanitizeElement.length>0||S.uponSanitizeAttribute.length>0)&&(w=Zt(w)),S.uponSanitizeAttribute.length>0&&(T=Zt(T)),t.removed=[];let c=We&&typeof e!=`string`&&Gt(e);if(c){Tt(e);let t=y(e);if(typeof t==`string`){let n=I(t);if(!w[n]||Oe[n])throw yt(e),Jt(`root node is forbidden and cannot be sanitized in-place`)}if(Ut(e))throw yt(e),Jt(`root node is clobbered and cannot be sanitized in-place`);try{Wn(e)}catch(t){throw yt(e),t}}else if(Gt(e))i=Dt(`<!---->`),a=i.ownerDocument.importNode(e,!0),a.nodeType===Dn.element&&a.nodeName===`BODY`||a.nodeName===`HTML`?i=a:i.appendChild(a),Wn(i);else{if(!ze&&!Ne&&!k&&e.indexOf(`<`)===-1)return b&&A?x(e):e;if(i=Dt(e),!i)return ze?null:A?ae:``}i&&Re&&_t(i.firstChild);let l=c?e:i;try{let e=Ot(l);for(;o=e.nextNode();)Rn(o,l),Un(o,l),Wt(o.content)&&W(o.content)}catch(n){throw c&&(yt(e),At(t.removed,e=>{e.element&&Ct(e.element)})),n}if(c){let n=!1;if(At(t.removed,t=>{t.element&&(t.element===e&&(n=!0),Ct(t.element))}),n)throw Jt(`a node selected for removal could not be safely returned; refusing to sanitize in place`);return Ne&&Ht(e),e}if(ze){if(Ne&&Ht(i),Be)for(s=he.call(i.ownerDocument);i.firstChild;)s.appendChild(i.firstChild);else s=i;return(T.shadowroot||T.shadowrootmode)&&(s=_e.call(r,s,!0)),s}let u=k?i.outerHTML:i.innerHTML;return k&&w[`!doctype`]&&i.ownerDocument&&i.ownerDocument.doctype&&i.ownerDocument.doctype.name&&B(xn,i.ownerDocument.doctype.name)&&(u=`<!DOCTYPE `+i.ownerDocument.doctype.name+`>
`+u),Ne&&(u=kt(u)),b&&A?x(u):u},t.setConfig=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};L(e),Fe=!0,Ie=w,Le=T},t.clearConfig=function(){ct=null,Fe=!1,Ie=null,Le=null,b=oe,ae=``},t.isValidAttribute=function(e,t,n){ct||L({});let r=I(e),i=I(t);return zn(r,i,n)},t.addHook=function(e,t){typeof t==`function`&&Kt(S,e)&&Nt(S[e],t)},t.removeHook=function(e,t){if(Kt(S,e)){if(t!==void 0){let n=jt(S[e],t);return n===-1?void 0:Pt(S[e],n,1)[0]}return Mt(S[e])}},t.removeHooks=function(e){Kt(S,e)&&(S[e]=[])},t.removeAllHooks=function(){S=Nn()},t}var Ln=In();function Rn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var zn=Rn();function Bn(e){zn=e}var Vn={exec:()=>null};function Hn(e){let t=[];return n=>{let r=Math.max(0,Math.min(3,n-1)),i=t[r];return i||(i=e(r),t[r]=i),i}}function U(e,t=``){let n=typeof e==`string`?e:e.source,r={replace:(e,t)=>{let i=typeof t==`string`?t:t.source;return i=i.replace(W.caret,`$1`),n=n.replace(e,i),r},getRegex:()=>new RegExp(n,t)};return r}var Un=((e=``)=>{try{return!!RegExp(`(?<=1)(?<!1)`+e)}catch{return!1}})(),W={codeRemoveIndent:/^(?: {0,3}\t| {1,4})/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,endingSpaceTabChar:/[ \t]$/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,leadingSpaceTab:/^[ \t]+/,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,numericCharacterReference:/&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));/g,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:Hn(e=>RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:Hn(e=>RegExp(`^ {0,${e}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)),fencesBeginRegex:Hn(e=>RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),headingBeginRegex:Hn(e=>RegExp(`^ {0,${e}}#`)),htmlBeginRegex:Hn(e=>RegExp(`^ {0,${e}}(?:</?(?:${ir})(?: +|$|/?>)|<(?:script|pre|style|textarea|!--))`,`i`)),blockquoteBeginRegex:Hn(e=>RegExp(`^ {0,${e}}>`))},Wn=/^(?:[ \t]*(?:\n|$))+/,Gn=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Kn=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,qn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Jn=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Yn=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,Xn=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Zn=U(Xn).replace(/bull/g,Yn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/hr/g,/ {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,``).getRegex(),Qn=U(Xn).replace(/bull/g,Yn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/hr/g,/ {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),$n=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/,er=/^[^\n]+/,tr=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,nr=U(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace(`label`,tr).replace(`title`,/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),rr=U(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,Yn).getRegex(),ir=`address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul`,ar=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,or=U(`^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))`,`i`).replace(`comment`,ar).replace(`tag`,ir).replace(`attribute`,/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),sr=e=>U($n).replace(`hr`,qn).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,e).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,ir).getRegex(),cr=sr(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/),lr=sr(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/),ur={blockquote:U(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace(`paragraph`,lr).getRegex(),code:Gn,def:nr,fences:Kn,heading:Jn,hr:qn,html:or,lheading:Zn,list:rr,newline:Wn,paragraph:cr,table:Vn,text:er},dr=U(`^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)`).replace(`hr`,qn).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`blockquote`,` {0,3}>`).replace(`code`,`(?: {4}| {0,3}	)[^\\n]`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]`).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,ir).getRegex(),fr={...ur,lheading:Qn,table:dr,paragraph:U($n).replace(`hr`,qn).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`table`,dr).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]`).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,ir).getRegex()},pr={...ur,html:U(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace(`comment`,ar).replace(/tag/g,`(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b`).getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Vn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:U($n).replace(`hr`,qn).replace(`heading`,` *#{1,6} *[^
]`).replace(`lheading`,Zn).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`|fences`,``).replace(`|list`,``).replace(`|html`,``).replace(`|tag`,``).getRegex()},mr=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,hr=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,gr=/^( {2,}|\\)\n(?!\s*$)[ \t]*/,_r=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,vr=/[\p{P}\p{S}]/u,yr=/[\s\p{P}\p{S}]/u,br=/[^\s\p{P}\p{S}]/u,xr=U(/^((?![*_])punctSpace)/,`u`).replace(/punctSpace/g,yr).getRegex(),Sr=/[\p{Pi}\p{Ps}"']/u,Cr=/(?!~)[\p{P}\p{S}]/u,wr=/(?!~)[\s\p{P}\p{S}]/u,Tr=/(?:[^\s\p{P}\p{S}]|~)/u,Er=U(/link|precode-code|html/,`g`).replace(`link`,/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace(`precode-`,Un?"(?<!`)()":"(^^|[^`])").replace(`code`,/(?<b>`+)[^`]+\k<b>(?!`)/).replace(`html`,/<(?! )[^<>]*?>/).getRegex(),Dr=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,Or=U(Dr,`u`).replace(/punct/g,vr).getRegex(),kr=U(Dr,`u`).replace(/punct/g,Cr).getRegex(),Ar=U(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/,`u`).replace(/openQuote/g,Sr).replace(/punct/g,vr).getRegex(),jr=`^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)`,Mr=U(jr,`gu`).replace(/notPunctSpace/g,br).replace(/punctSpace/g,yr).replace(/punct/g,vr).getRegex(),Nr=U(jr,`gu`).replace(/notPunctSpace/g,Tr).replace(/punctSpace/g,wr).replace(/punct/g,Cr).getRegex(),Pr=U(`^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,br).replace(/punctSpace/g,yr).replace(/punct/g,vr).getRegex(),Fr=U(`^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)`,`gu`).replace(/notPunctSpace/g,br).replace(/punctSpace/g,yr).replace(/punct/g,vr).getRegex(),Ir=U(`^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,br).replace(/punctSpace/g,yr).replace(/punct/g,vr).getRegex(),Lr=U(/^~~?(?:((?!~)punct)|[^\s~])/,`u`).replace(/punct/g,vr).getRegex(),Rr=U(`^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,br).replace(/punctSpace/g,yr).replace(/punct/g,vr).getRegex(),zr=U(/\\(punct)/,`gu`).replace(/punct/g,vr).getRegex(),Br=U(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace(`scheme`,/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace(`email`,/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Vr=U(ar).replace(`(?:-->|$)`,`-->`).getRegex(),Hr=U(`^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>`).replace(`comment`,Vr).replace(`attribute`,/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ur=/\[(?:\\[\s\S]|[^\[\]\\])*\]/,Wr=U(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace(`brackets`,Ur).getRegex(),Gr=U(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace(`label`,Wr).replace(`href`,/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace(`title`,/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Kr=U(/^!?\[(label)\]\[(ref)\]/).replace(`label`,Wr).replace(`ref`,tr).getRegex(),qr=U(/^!?\[(ref)\](?:\[\])?/).replace(`ref`,tr).getRegex(),Jr=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/,Yr=U(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace(`brackets`,Ur).getRegex(),Xr=U(`reflink|nolink(?!\\()`,`g`).replace(`reflink`,U(/^!?\[(label)\]\[(ref)\]/).replace(`label`,Yr).replace(`ref`,Jr).getRegex()).replace(`nolink`,U(/^!?\[(ref)\](?:\[\])?/).replace(`ref`,Jr).getRegex()).getRegex(),Zr=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Qr=U(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g,/[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),$r={_backpedal:Vn,anyPunctuation:zr,autolink:Br,blockSkip:Er,br:gr,code:hr,del:Vn,delLDelim:Vn,delRDelim:Vn,emStrongLDelim:Or,emStrongRDelimAst:Mr,emStrongRDelimUnd:Fr,escape:mr,link:Gr,nolink:qr,punctuation:xr,reflink:Kr,reflinkSearch:Xr,tag:Hr,text:_r,url:Vn},ei={...$r,emStrongLDelim:Ar,emStrongRDelimAst:Pr,emStrongRDelimUnd:Ir,link:U(/^!?\[(label)\]\((.*?)\)/).replace(`label`,Wr).getRegex(),reflink:U(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace(`label`,Wr).getRegex()},ti={...$r,emStrongRDelimAst:Nr,emStrongLDelim:kr,delLDelim:Lr,delRDelim:Rr,url:U(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace(`emailProtocol`,Qr).replace(`protocol`,Zr).replace(`email`,/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:U(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace(`protocol`,Zr).replace(/emailProtocol/g,/(?:mailto|xmpp):/).getRegex()},ni={...ti,br:U(gr).replace(`{2,}`,`*`).getRegex(),text:U(ti.text).replace(`\\b_`,`\\b_| {2,}\\n`).replace(/\{2,\}/g,`*`).getRegex()},ri={normal:ur,gfm:fr,pedantic:pr},ii={normal:$r,gfm:ti,breaks:ni,pedantic:ei},ai={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},oi=e=>ai[e];function si(e,t){if(t){if(W.escapeTest.test(e))return e.replace(W.escapeReplace,oi)}else if(W.escapeTestNoEncode.test(e))return e.replace(W.escapeReplaceNoEncode,oi);return e}function ci(e){return e.replace(W.numericCharacterReference,(e,t,n)=>{let r=t===void 0?Number.parseInt(n,16):Number.parseInt(t,10);return r===0||r>1114111||r>=55296&&r<=57343?`�`:String.fromCodePoint(r)})}function li(e){try{e=encodeURI(e).replace(W.percentDecode,`%`)}catch{return null}return e}function ui(e,t){let n=e.replace(W.findPipe,(e,t,n)=>{let r=!1,i=t;for(;--i>=0&&n[i]===`\\`;)r=!r;return r?`|`:` |`}).split(W.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t){if(n.length>t)n.splice(t);else for(;n.length<t;)n.push(``)}for(;r<n.length;r++)n[r]=n[r].trim().replace(W.slashPipe,`|`);return n}function di(e,t,n){let r=e.length;if(r===0)return``;let i=0;for(;i<r;){let a=e.charAt(r-i-1);if(a===t&&!n)i++;else if(a!==t&&n)i++;else break}return e.slice(0,r-i)}function fi(e){let t=e.split(`
`),n=t.length-1;for(;n>=0&&W.blankLine.test(t[n]);)n--;return t.length-n<=2?e:t.slice(0,n+1).join(`
`)}function pi(e){return e.trim().toLowerCase().toUpperCase().toLowerCase()}function mi(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]===`\\`)r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function hi(e,t=0){let n=t,r=``;for(let t of e)if(t===`	`){let e=4-n%4;r+=` `.repeat(e),n+=e}else r+=t,n++;return r}function gi(e,t,n,r,i){let a=t.href,o=t.title||null,s=e[1].replace(i.other.outputLinkReplace,`$1`),c=e[0].charAt(0)===`!`;r.state.inLink=!0;let l=r.state.linkEmitted,u=r.state.inRawBlock;r.state.linkEmitted=!1;let d=r.inlineTokens(s),f=r.state.linkEmitted;if(r.state.linkEmitted=l,r.state.inLink=!1,!c){if(f){r.state.inRawBlock=u;return}r.state.linkEmitted=!0}return{type:c?`image`:`link`,raw:n,href:a,title:o,text:s,tokens:d}}function _i(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let i=r[1];return t.split(`
`).map(e=>{let t=e.match(n.other.beginningSpace);if(t===null)return e;let[r]=t;return e.slice(Math.min(r.length,i.length))}).join(`
`)}function vi(e,t,n,r){if(!t.includes(`<`))return!1;for(let i=0;i<t.length;i++){if(t[i]===`\\`){i++;continue}if(t[i]==="`"){let e=r.inline.code.exec(t.slice(i));if(e){i+=e[0].length-1;continue}}if(t[i]!==`<`)continue;let a=e.slice(n+i),o=r.inline.tag.exec(a)||r.inline.autolink.exec(a);if(o){if(o[0].length>t.length-i)return!0;i+=o[0].length-1}}return!1}var yi=class{options;rules;lexer;constructor(e){this.options=e||zn}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:`space`,raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=this.options.pedantic?t[0]:fi(t[0]);return{type:`code`,raw:e,codeBlockStyle:`indented`,text:e.replace(this.rules.other.codeRemoveIndent,``)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],n=_i(e,t[3]||``,this.rules);return{type:`code`,raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,`$1`):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=di(e,`#`);(this.options.pedantic||!t||this.rules.other.endingSpaceTabChar.test(t))&&(e=t.trim())}return{type:`heading`,raw:di(t[0],`
`),depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:`hr`,raw:di(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=di(t[0],`
`).split(`
`),n=``,r=``,i=[];for(;e.length>0;){let t=!1,a=[],o=0;for(;o<e.length;o++)if(this.rules.other.blockquoteStart.test(e[o]))a.push(e[o]),t=!0;else if(!t)a.push(e[o]);else break;e=e.slice(o);let s=a.join(`
`),c=s.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,``);n=n?`${n}
${s}`:s,r=r?`${r}
${c}`:c;let l=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(c,i,!0),this.lexer.state.top=l,e.length===0)break;let u=i.at(-1);if(u?.type===`code`)break;if(u?.type===`blockquote`){let t=u,a=e.join(`
`),o=t.raw+`
`+a.replace(this.rules.other.blockquoteSetextReplace2,``),s=this.blockquote(o);i[i.length-1]=s;let c=o.substring(s.raw.length).replace(/^\n/,``),l=c?c.split(`
`).length:0,d=l?e.slice(0,-l):e;d.length>0&&(n=`${n}
${d.join(`
`)}`),r=r.substring(0,r.length-t.text.length)+s.text;break}if(u?.type===`list`){let t=u,a=t.raw+`
`+e.join(`
`),o=this.list(a);i[i.length-1]=o,n=n.substring(0,n.length-u.raw.length)+o.raw,r=r.substring(0,r.length-t.raw.length)+o.raw,e=a.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:`blockquote`,raw:n,tokens:i,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,i={type:`list`,raw:``,ordered:r,start:r?+n.slice(0,-1):``,loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:`[*+-]`);let a=this.rules.other.listItemRegex(n),o=!1;for(;e;){let n=!1,r=``,s=``;if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;r=t[0],e=e.substring(r.length);let c=t[2].split(`
`,1)[0],l=t[1].length,u=this.options.pedantic?hi(c,l):c.replace(this.rules.other.leadingSpaceTab,e=>hi(e,l)),d=e.split(`
`,1)[0],f=!u.trim(),p=0;if(this.options.pedantic?(p=2,s=u.trimStart()):f?p=l+1:(p=u.search(this.rules.other.nonSpaceChar),p=p>4?1:p,s=u.slice(p),p+=l),f&&this.rules.other.blankLine.test(d)&&(r+=d+`
`,e=e.substring(d.length+1),n=!0),!n){let t=this.rules.other.nextBulletRegex(p),n=this.rules.other.hrRegex(p),i=this.rules.other.fencesBeginRegex(p),a=this.rules.other.headingBeginRegex(p),o=this.rules.other.htmlBeginRegex(p),c=this.rules.other.blockquoteBeginRegex(p);for(;e;){let l=e.split(`
`,1)[0],ee;if(d=l,this.options.pedantic?(d=d.replace(this.rules.other.listReplaceNesting,`  `),ee=d):ee=d.replace(this.rules.other.leadingSpaceTab,e=>e.replace(this.rules.other.tabCharGlobal,`    `)),i.test(d)||a.test(d)||o.test(d)||c.test(d)||t.test(d)||n.test(d))break;if(ee.search(this.rules.other.nonSpaceChar)>=p||!d.trim())s+=`
`+ee.slice(p);else{if(f||u.replace(this.rules.other.tabCharGlobal,`    `).search(this.rules.other.nonSpaceChar)>=4||i.test(u)||a.test(u)||n.test(u))break;s+=`
`+d}f=!d.trim(),r+=l+`
`,e=e.substring(l.length+1),u=ee.slice(p)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(r)&&(o=!0)),i.items.push({type:`list_item`,raw:r,task:!!this.options.gfm&&this.rules.other.listIsTask.test(s),loose:!1,text:s,tokens:[]}),i.raw+=r}let s=i.items.at(-1);if(s)s.raw=s.raw.trimEnd(),s.text=s.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let e of i.items)if(this.lexer.state.top=!1,e.tokens=this.lexer.blockTokens(e.text,[]),!i.loose){let t=e.tokens.filter(e=>e.type===`space`);i.loose=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw))}for(let e of i.items){let t=e.tokens[0];if(e.task&&(t?.type===`text`||t?.type===`paragraph`)){e.text=e.text.replace(this.rules.other.listReplaceTask,``),t.raw=t.raw.replace(this.rules.other.listReplaceTask,``),t.text=t.text.replace(this.rules.other.listReplaceTask,``);for(let e=this.lexer.inlineQueue.length-1;e>=0;e--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)){this.lexer.inlineQueue[e].src=this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask,``);break}let n=this.rules.other.listTaskCheckbox.exec(e.raw);if(n){let t={type:`checkbox`,raw:n[0]+` `,checked:n[0]!==`[ ]`};e.checked=t.checked,i.loose?e.tokens[0]&&[`paragraph`,`text`].includes(e.tokens[0].type)&&`tokens`in e.tokens[0]&&e.tokens[0].tokens?(e.tokens[0].raw=t.raw+e.tokens[0].raw,e.tokens[0].text=t.raw+e.tokens[0].text,e.tokens[0].tokens.unshift(t)):e.tokens.unshift({type:`paragraph`,raw:t.raw,text:t.raw,tokens:[t]}):e.tokens.unshift(t)}}else e.task&&=!1}if(i.loose)for(let e of i.items){e.loose=!0;for(let t of e.tokens)t.type===`text`&&(t.type=`paragraph`)}return i}}html(e){let t=this.rules.block.html.exec(e);if(t){let e=fi(t[0]);return{type:`html`,block:!0,raw:e,pre:t[1]===`pre`||t[1]===`script`||t[1]===`style`,text:e}}}def(e){let t=this.rules.block.def.exec(e);if(t){let e=pi(t[1]).replace(this.rules.other.multipleSpaceGlobal,` `),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,`$1`).replace(this.rules.inline.anyPunctuation,`$1`):``,r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,`$1`):t[3];return{type:`def`,tag:e,raw:di(t[0],`
`),href:n,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=ui(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,``).split(`|`),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,``).split(`
`):[],a={type:`table`,raw:di(t[0],`
`),header:[],align:[],rows:[]};if(n.length===r.length){for(let e of r)this.rules.other.tableAlignRight.test(e)?a.align.push(`right`):this.rules.other.tableAlignCenter.test(e)?a.align.push(`center`):this.rules.other.tableAlignLeft.test(e)?a.align.push(`left`):a.align.push(null);for(let e=0;e<n.length;e++)a.header.push({text:n[e],tokens:this.lexer.inline(n[e]),header:!0,align:a.align[e]});for(let e of i)a.rows.push(ui(e,a.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:a.align[t]})));return a}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let e=t[1].trim();return{type:`heading`,raw:di(t[0],`
`),depth:t[2].charAt(0)===`=`?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:`paragraph`,raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:`text`,raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:`escape`,raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:`html`,raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[0].charAt(0)===`!`?2:1;if(!this.options.pedantic&&vi(e,t[1],n,this.rules))return;let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let e=di(r.slice(0,-1),`\\`);if((r.length-e.length)%2==0)return}else{let e=mi(t[2],`()`);if(e===-2)return;if(e>-1){let n=(t[0].indexOf(`!`)===0?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,n).trim(),t[3]=``}}let i=t[2],a=``;if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(i);e&&(i=e[1],a=e[3])}else a=t[3]?t[3].slice(1,-1):``;return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(i=this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?i.slice(1):i.slice(1,-1)),gi(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,`$1`),title:a&&a.replace(this.rules.inline.anyPunctuation,`$1`)},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=n[0].charAt(0)===`!`?2:1;if(!this.options.pedantic&&vi(e,n[1],r,this.rules))return;let i=t[pi((n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal,` `))];if(!i){let e=n[0].charAt(0);return{type:`text`,raw:e,text:e}}return gi(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=``){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||!r[1]&&!r[2]&&!r[3]&&!r[4]||r[4]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[3])||!n||this.rules.inline.punctuation.exec(n))){let i=[...r[0]].length-1,a,o,s=i,c=0,l=r[0][0],u=n===l,d=l===`*`?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+i);(r=d.exec(t))!==null;){if(a=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!a)continue;if(o=[...a].length,r[3]||r[4]){s+=o;continue}if(r[5]||r[6]){if(i%3&&!((i+o)%3)){c+=o;continue}if(u)break}if(s-=o,s>0)continue;o=Math.min(o,o+s+c);let t=[...r[0]][0].length,n=e.slice(0,i+r.index+t+o);if(Math.min(i,o)%2){let e=n.slice(1,-1);return{type:`em`,raw:n,text:e,tokens:this.lexer.inlineTokens(e)}}let l=n.slice(2,-2);return{type:`strong`,raw:n,text:l,tokens:this.lexer.inlineTokens(l)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal,` `),n=this.rules.other.nonSpaceChar.test(e),r=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return n&&r&&(e=e.substring(1,e.length-1)),{type:`codespan`,raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:`br`,raw:t[0]}}del(e,t,n=``){let r=this.rules.inline.delLDelim.exec(e);if(r&&(!r[1]||!n||this.rules.inline.punctuation.exec(n))){let n=[...r[0]].length-1,i,a,o=n,s=this.rules.inline.delRDelim;for(s.lastIndex=0,t=t.slice(-1*e.length+n);(r=s.exec(t))!==null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i||(a=[...i].length,a!==n))continue;if(r[3]||r[4]){o+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o);let t=[...r[0]][0].length,s=e.slice(0,n+r.index+t+a),c=s.slice(n,-n);return{type:`del`,raw:s,text:c,tokens:this.lexer.inlineTokens(c)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,n;return t[2]===`@`?(e=t[1],n=`mailto:`+e):(e=t[1],n=e),{type:`link`,raw:t[0],text:e,href:n,autolink:!0,tokens:[{type:`text`,raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,n;if(t[2]===`@`)e=t[0],n=`mailto:`+e;else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??``;while(r!==t[0]);e=t[0],n=t[1]===`www.`?`http://`+t[0]:t[0]}return{type:`link`,raw:t[0],text:e,href:n,autolink:!0,tokens:[{type:`text`,raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:`text`,raw:t[0],text:e?t[0]:ci(t[0]),escaped:e}}}},bi=class e{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||zn,this.options.tokenizer=this.options.tokenizer||new yi,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,linkEmitted:!1,top:!0};let t={other:W,block:ri.normal,inline:ii.normal};this.options.pedantic?(t.block=ri.pedantic,t.inline=ii.pedantic):this.options.gfm&&(t.block=ri.gfm,t.inline=this.options.breaks?ii.breaks:ii.gfm),this.tokenizer.rules=t}static get rules(){return{block:ri,inline:ii}}static lex(t,n){return new e(n).lex(t)}static lexInline(t,n){return new e(n).inlineTokens(t)}lex(e){e=e.replace(W.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(W.tabCharGlobal,`    `).replace(W.spaceLine,``));let r=1/0;for(;e;){if(e.length<r)r=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}let i;if(this.options.extensions?.block?.some(n=>(i=n.call({lexer:this},e,t))?(e=e.substring(i.raw.length),t.push(i),!0):!1))continue;if(i=this.tokenizer.space(e)){e=e.substring(i.raw.length);let n=t.at(-1);i.raw.length===1&&n!==void 0?n.raw+=`
`:t.push(i);continue}if(i=this.tokenizer.code(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.text,this.inlineQueue.at(-1).src=n.text):t.push(i);continue}if(i=this.tokenizer.fences(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.heading(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.hr(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.blockquote(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.list(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.html(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.def(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.raw,this.inlineQueue.at(-1).src=n.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title},t.push(i));continue}if(i=this.tokenizer.table(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.lheading(e)){e=e.substring(i.raw.length),t.push(i);continue}let a=e;if(this.options.extensions?.startBlock){let t=1/0,n=e.slice(1),r;this.options.extensions.startBlock.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(a=e.substring(0,t+1))}if(this.state.top&&(i=this.tokenizer.paragraph(a))){let r=t.at(-1);n&&r?.type===`paragraph`?(r.raw+=(r.raw.endsWith(`
`)?``:`
`)+i.raw,r.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):t.push(i),n=a.length!==e.length,e=e.substring(i.raw.length);continue}if(i=this.tokenizer.text(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):t.push(i);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}linkInText(e){if(!e.includes(`[`))return!1;let t=this.tokenizer.rules.inline.link;for(let n of e.matchAll(this.tokenizer.rules.inline.blockSkip))if(t.test(n[0])&&e.charAt(n.index-1)!==`!`)return!0;for(let t of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)){let e=t[0],n=e.lastIndexOf(`[`);if(e.charAt(0)!==`!`&&Object.hasOwn(this.tokens.links,pi(e.slice(n+1,-1)))&&!(n>1&&this.linkInText(e.slice(1,n-1))))return!0}return!1}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let n=e;if(this.tokens.links&&e.includes(`[`)){let e=this.tokenizer.rules.inline.reflinkSearch,t=n=>{let r=n.lastIndexOf(`[`);if(!Object.hasOwn(this.tokens.links,pi(n.slice(r+1,-1))))return n;if(r>1&&n.charAt(0)!==`!`){let i=n.slice(1,r-1);if(this.linkInText(i))return`[`+i.replace(e,t)+`][`+`a`.repeat(n.length-r-2)+`]`}return`[`+`a`.repeat(n.length-2)+`]`};n=n.replace(e,t)}n=n.replace(this.tokenizer.rules.inline.anyPunctuation,e=>`+`.repeat(e.length)),n=n.replace(this.tokenizer.rules.inline.blockSkip,(e,t,n)=>{let r=n?n.length:0;return e.slice(0,r)+`[`+`a`.repeat(e.length-r-2)+`]`}),n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let r=!1,i=``,a=1/0;for(;e;){if(e.length<a)a=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}r||(i=``),r=!1;let o;if(this.options.extensions?.inline?.some(n=>(o=n.call({lexer:this},e,t))?(e=e.substring(o.raw.length),t.push(o),!0):!1))continue;if(o=this.tokenizer.escape(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.tag(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.link(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length);let n=t.at(-1);o.type===`text`&&n?.type===`text`?(n.raw+=o.raw,n.text+=o.text):t.push(o);continue}if(o=this.tokenizer.emStrong(e,n,i)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.codespan(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.br(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.del(e,n,i)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.autolink(e)){e=e.substring(o.raw.length),t.push(o);continue}if(!this.state.inLink&&(o=this.tokenizer.url(e))){e=e.substring(o.raw.length),t.push(o);continue}let s=e;if(this.options.extensions?.startInline){let t=1/0,n=e.slice(1),r;this.options.extensions.startInline.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(s=e.substring(0,t+1))}if(o=this.tokenizer.inlineText(s)){e=e.substring(o.raw.length),o.raw.slice(-1)!==`_`&&(i=o.raw.slice(-1)),r=!0;let n=t.at(-1);n?.type===`text`?(n.raw+=o.raw,n.text+=o.text):t.push(o);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return t}infiniteLoopError(e){let t=`Infinite loop on byte: `+e;if(this.options.silent)console.error(t);else throw Error(t)}},xi=class{options;parser;constructor(e){this.options=e||zn}space(e){return``}code({text:e,lang:t,escaped:n}){let r=(t||``).match(W.notSpaceStart)?.[0],i=e?e.replace(W.endingNewline,``)+`
`:``;return r?`<pre><code class="language-`+si(r)+`">`+(n?i:si(i,!0))+`</code></pre>
`:`<pre><code>`+(n?i:si(i,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${si(e,!0)}</code>`}br(e){return`<br>`}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,text:n,tokens:r,autolink:i}){let a=i?si(n,!0):this.parser.parseInline(r),o=li(e);if(o===null)return a;e=si(o,i);let s=`<a href="`+e+`"`;return t&&(s+=` title="`+si(t)+`"`),s+=`>`+a+`</a>`,s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let i=li(e);if(i===null)return si(n);e=i;let a=`<img src="${si(e)}" alt="${si(n)}"`;return t&&(a+=` title="${si(t)}"`),a+=`>`,a}text(e){return`tokens`in e&&e.tokens?this.parser.parseInline(e.tokens):`escaped`in e&&e.escaped?e.text:si(e.text)}},Si=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return``+e}image({text:e}){return``+e}br(){return``}checkbox({raw:e}){return e}},Ci=class e{options;renderer;textRenderer;constructor(e){this.options=e||zn,this.options.renderer=this.options.renderer||new xi,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Si}static parse(t,n){return new e(n).parse(t)}static parseInline(t,n){return new e(n).parseInline(t)}parse(e){this.renderer.parser=this;let t=``;for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let e=r,n=this.options.extensions.renderers[e.type].call({parser:this},e);if(n!==!1||![`space`,`hr`,`heading`,`code`,`table`,`blockquote`,`list`,`checkbox`,`html`,`def`,`paragraph`,`text`].includes(e.type)){t+=n||``;continue}}let i=r;switch(i.type){case`space`:t+=this.renderer.space(i);break;case`hr`:t+=this.renderer.hr(i);break;case`heading`:t+=this.renderer.heading(i);break;case`code`:t+=this.renderer.code(i);break;case`table`:t+=this.renderer.table(i);break;case`blockquote`:t+=this.renderer.blockquote(i);break;case`list`:t+=this.renderer.list(i);break;case`checkbox`:t+=this.renderer.checkbox(i);break;case`html`:t+=this.renderer.html(i);break;case`def`:t+=this.renderer.def(i);break;case`paragraph`:t+=this.renderer.paragraph(i);break;case`text`:t+=this.renderer.text(i);break;default:{let e=`Token with "`+i.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let n=``;for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let e=this.options.extensions.renderers[i.type].call({parser:this},i);if(e!==!1||![`escape`,`html`,`link`,`image`,`checkbox`,`strong`,`em`,`codespan`,`br`,`del`,`text`].includes(i.type)){n+=e||``;continue}}let a=i;switch(a.type){case`escape`:n+=t.text(a);break;case`html`:n+=t.html(a);break;case`link`:n+=t.link(a);break;case`image`:n+=t.image(a);break;case`checkbox`:n+=t.checkbox(a);break;case`strong`:n+=t.strong(a);break;case`em`:n+=t.em(a);break;case`codespan`:n+=t.codespan(a);break;case`br`:n+=t.br(a);break;case`del`:n+=t.del(a);break;case`text`:n+=t.text(a);break;default:{let e=`Token with "`+a.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return n}},wi=class{options;block;constructor(e){this.options=e||zn}static passThroughHooks=new Set([`preprocess`,`postprocess`,`processAllTokens`,`emStrongMask`]);static passThroughHooksRespectAsync=new Set([`preprocess`,`postprocess`,`processAllTokens`]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?bi.lex:bi.lexInline}provideParser(e=this.block){return e?Ci.parse:Ci.parseInline}},Ti=new class{defaults=Rn();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Ci;Renderer=xi;TextRenderer=Si;Lexer=bi;Tokenizer=yi;Hooks=wi;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case`table`:{let e=r;for(let r of e.header)n=n.concat(this.walkTokens(r.tokens,t));for(let r of e.rows)for(let e of r)n=n.concat(this.walkTokens(e.tokens,t));break}case`list`:{let e=r;n=n.concat(this.walkTokens(e.items,t));break}default:{let e=r;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(r=>{let i=e[r].flat(1/0);n=n.concat(this.walkTokens(i,t))}):e.tokens&&(n=n.concat(this.walkTokens(e.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let n={...e};if(n.async=this.defaults.async||n.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw Error(`extension name required`);if(`renderer`in e){let n=t.renderers[e.name];n?t.renderers[e.name]=function(...t){let r=e.renderer.apply(this,t);return r===!1&&(r=n.apply(this,t)),r}:t.renderers[e.name]=e.renderer}if(`tokenizer`in e){if(!e.level||e.level!==`block`&&e.level!==`inline`)throw Error(`extension level must be 'block' or 'inline'`);let n=t[e.level];n?n.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&(e.level===`block`?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:e.level===`inline`&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}`childTokens`in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),n.extensions=t),e.renderer){let t=this.defaults.renderer||new xi(this.defaults);for(let n in e.renderer){if(!(n in t))throw Error(`renderer '${n}' does not exist`);if([`options`,`parser`].includes(n))continue;let r=n,i=e.renderer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n||``}}n.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new yi(this.defaults);for(let n in e.tokenizer){if(!(n in t))throw Error(`tokenizer '${n}' does not exist`);if([`options`,`rules`,`lexer`].includes(n))continue;let r=n,i=e.tokenizer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new wi;for(let n in e.hooks){if(!(n in t))throw Error(`hook '${n}' does not exist`);if([`options`,`block`].includes(n))continue;let r=n,i=e.hooks[r],a=t[r];t[r]=wi.passThroughHooks.has(n)?e=>{if(this.defaults.async&&wi.passThroughHooksRespectAsync.has(n))return(async()=>{let n=await i.call(t,e);return a.call(t,n)})();let r=i.call(t,e);return a.call(t,r)}:(...e)=>{if(this.defaults.async)return(async()=>{let n=await i.apply(t,e);return n===!1&&(n=await a.apply(t,e)),n})();let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,r=e.walkTokens;n.walkTokens=function(e){let n=[];return n.push(r.call(this,e)),t&&(n=n.concat(t.call(this,e))),n}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return bi.lex(e,t??this.defaults)}parser(e,t){return Ci.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},i={...this.defaults,...r},a=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&r.async===!1)return a(Error(`marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.`));if(typeof t>`u`||t===null)return a(Error(`marked(): input parameter is undefined or null`));if(typeof t!=`string`)return a(Error(`marked(): input parameter is of type `+Object.prototype.toString.call(t)+`, string expected`));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let n=i.hooks?await i.hooks.preprocess(t):t,r=await(i.hooks?await i.hooks.provideLexer(e):e?bi.lex:bi.lexInline)(n,i),a=i.hooks?await i.hooks.processAllTokens(r):r;i.walkTokens&&await Promise.all(this.walkTokens(a,i.walkTokens));let o=await(i.hooks?await i.hooks.provideParser(e):e?Ci.parse:Ci.parseInline)(a,i);return i.hooks?await i.hooks.postprocess(o):o})().catch(a);try{i.hooks&&(t=i.hooks.preprocess(t));let n=(i.hooks?i.hooks.provideLexer(e):e?bi.lex:bi.lexInline)(t,i);i.hooks&&(n=i.hooks.processAllTokens(n)),i.walkTokens&&this.walkTokens(n,i.walkTokens);let r=(i.hooks?i.hooks.provideParser(e):e?Ci.parse:Ci.parseInline)(n,i);return i.hooks&&(r=i.hooks.postprocess(r)),r}catch(e){return a(e)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let e=`<p>An error occurred:</p><pre>`+si(n.message+``,!0)+`</pre>`;return t?Promise.resolve(e):e}if(t)return Promise.reject(n);throw n}}};function G(e,t){return Ti.parse(e,t)}G.options=G.setOptions=function(e){return Ti.setOptions(e),G.defaults=Ti.defaults,Bn(G.defaults),G},G.getDefaults=Rn,G.defaults=zn;function Ei(...e){return Ti.use(...e),G.defaults=Ti.defaults,Bn(G.defaults),G}G.use=Ei,G.walkTokens=function(e,t){return Ti.walkTokens(e,t)},G.parseInline=Ti.parseInline,G.Parser=Ci,G.parser=Ci.parse,G.Renderer=xi,G.TextRenderer=Si,G.Lexer=bi,G.lexer=bi.lex,G.Tokenizer=yi,G.Hooks=wi,G.parse=G,G.options,G.setOptions,G.walkTokens,G.parseInline,Ci.parse,bi.lex;function K(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var Di=Object.defineProperty,Oi=(e,t)=>{let n={};for(var r in e)Di(n,r,{get:e[r],enumerable:!0});return t||Di(n,Symbol.toStringTag,{value:`Module`}),n},ki=`app-toolbars-main`,Ai=`app-toolbars-main-right`,ji=`app-toolbars-main-center`,Mi=`app-toolbars-bottom`,Ni=`app-toolbars-bottom-center`,Pi=`app-toolbars-bottom-end`,Fi=`sidebar-main-toolbar`,Ii=`system-views`,Li=`system.layouts`,Ri=`system.attributions`,zi=`about.tabs`,Bi=`editor-area-main`,Vi=`sidebar-main`,Hi=`sidebar-main-bottom`,Ui=`sidebar-auxiliary`,Wi=`sidebar-auxiliary-bottom`,Gi=`panel-bottom`,Ki=Oi({ABOUT_TABS:()=>zi,COMMAND_SAVE:()=>qi,EDITOR_AREA_MAIN:()=>Bi,HIDE_DOT_RESOURCE:()=>!1,MouseButton:()=>Ji,PANEL_BOTTOM:()=>Gi,SIDEBAR_AUXILIARY:()=>Ui,SIDEBAR_AUXILIARY_BOTTOM:()=>Wi,SIDEBAR_MAIN:()=>Vi,SIDEBAR_MAIN_BOTTOM:()=>Hi,SIDEBAR_MAIN_TOOLBAR:()=>Fi,SYSTEM_ATTRIBUTIONS:()=>Ri,SYSTEM_LAYOUTS:()=>Li,SYSTEM_VIEWS:()=>Ii,TOOLBAR_BOTTOM:()=>Mi,TOOLBAR_BOTTOM_CENTER:()=>Ni,TOOLBAR_BOTTOM_END:()=>Pi,TOOLBAR_MAIN:()=>ki,TOOLBAR_MAIN_CENTER:()=>ji,TOOLBAR_MAIN_RIGHT:()=>Ai}),qi=`command-save`,Ji=function(e){return e[e.LEFT=0]=`LEFT`,e[e.MIDDLE=1]=`MIDDLE`,e[e.RIGHT=2]=`RIGHT`,e[e.BACK=3]=`BACK`,e[e.FORWARD=4]=`FORWARD`,e}({}),Yi=`.eclipse-docks/settings.json`,Xi=`dialogSettings`,Zi=`events/settings/changed`;function Qi(e,t){if(t){for(let[n,r]of Object.entries(t))if(r&&typeof r==`object`){let t=e[n];t?.properties&&r.properties?Qi(t.properties,r.properties):e[n]={...r,properties:r.properties?{...r.properties}:void 0}}}}var q=new class{constructor(){this.mergedSchema={type:`object`,properties:{}}}async checkSettings(){this.appSettings||(this.appSettings=await Xe.getObject(Yi),this.appSettings||(this.appSettings={},await Xe.persistObject(Yi,this.appSettings)),g(Zi,this.appSettings))}registerSchema(e){let t=e.properties??(e.type===`object`?{}:void 0);t&&(this.mergedSchema.properties||(this.mergedSchema.properties={}),Qi(this.mergedSchema.properties,t))}getCategories(){let e=this.mergedSchema.properties;return e?Object.entries(e).filter(([,e])=>e&&typeof e==`object`).map(([e,t])=>({id:e,label:t.title??e,order:typeof t.order==`number`?t.order:0,schema:t})).sort((e,t)=>e.order-t.order):[]}getSchemaForCategory(e){return this.mergedSchema.properties?.[e]}getSchemaForSettingKey(e){let t=e.split(`.`).filter(Boolean);if(t.length===0)return this.mergedSchema;let n=this.mergedSchema;for(let e of t)if(n=n?.properties?.[e],!n)return;return n}traversePath(e,t,n){if(t.length===0)return null;let r=e,i=t.length-1;for(let e=0;e<i;e++){let i=t[e];if(r[i]===void 0){if(!n)return null;r[i]={}}if(r[i]===null||typeof r[i]!=`object`)return null;r=r[i]}return{parent:r,key:t[i]}}async getAt(e){await this.checkSettings();let t=e.split(`.`).filter(Boolean);if(t.length===0)return this.appSettings;let n=this.traversePath(this.appSettings,t,!1);if(n)return n.parent[n.key]}async setAt(e,t){await this.checkSettings();let n=e.split(`.`).filter(Boolean);if(n.length===0)return;let r=this.traversePath(this.appSettings,n,!0);r&&(r.parent[r.key]=t,await Xe.persistObject(Yi,this.appSettings),g(Zi,this.appSettings))}async get(e){return await this.checkSettings(),this.appSettings[e]}async set(e,t){await this.checkSettings(),this.appSettings[e]=t,await Xe.persistObject(Yi,this.appSettings),g(Zi,this.appSettings)}async getAll(){return await this.checkSettings(),this.appSettings}async setAll(e){this.appSettings=e,await Xe.persistObject(Yi,this.appSettings),g(Zi,this.appSettings)}async getDialogSetting(e){return await this.checkSettings(),(this.appSettings.dialogSettings||{})[e]}async setDialogSetting(e,t){await this.checkSettings();let n=this.appSettings.dialogSettings||{};n[e]=t,this.appSettings[Xi]=n,await Xe.persistObject(Yi,this.appSettings),g(Zi,this.appSettings)}};y.put(`appSettings`,q);var $i=new class{constructor(){this.tasks=[],this.updateCounter=0}notifyUpdate(){this.updateCounter++,Pe.set(this.updateCounter)}run(e,t){let n=this.createProgressMonitor(e);try{this.tasks.push(n),this.notifyUpdate(),t(n)}finally{this.tasks.splice(this.tasks.indexOf(n),1),this.notifyUpdate()}}async runAsync(e,t){let n=this.createProgressMonitor(e);return this.tasks.push(n),this.notifyUpdate(),t(n).finally(()=>{this.tasks.splice(this.tasks.indexOf(n),1),this.notifyUpdate()})}createProgressMonitor(e){return new Proxy({name:e,message:``,currentStep:0,totalSteps:-1,progress:-1},{set:(e,t,n)=>(e[t]=n,this.notifyUpdate(),!0)})}getActiveTasks(){return this.tasks}};y.put(`taskService`,$i);var ea=ge(`EsmShService`),ta=new class e{static{this.ESM_SH_BASE=`https://esm.sh`}static{this.GITHUB_PREFIX=`gh/`}static{this.JSR_PREFIX=`jsr/`}static{this.PR_PREFIX=`pr/`}isEsmShUrl(e){try{let t=new URL(e);return t.hostname===`esm.sh`||t.hostname===`raw.esm.sh`}catch{return!1}}isSourceIdentifier(e){return this.isEsmShUrl(e)||this.isHttpUrl(e)?!1:this.parseSource(e)!==null}isHttpUrl(e){try{let t=new URL(e);return t.protocol===`http:`||t.protocol===`https:`}catch{return!1}}parseSource(t){return!t||typeof t!=`string`||(t=t.trim(),this.isHttpUrl(t))?null:t.startsWith(e.GITHUB_PREFIX)?this.parseGitHubSource(t):t.startsWith(e.JSR_PREFIX)?this.parseJsrSource(t):t.startsWith(e.PR_PREFIX)?this.parsePrSource(t):this.parseNpmSource(t)}parseGitHubSource(t){let n=t.substring(e.GITHUB_PREFIX.length).split(`/`);if(n.length<2)return null;let r=n[0],i=n[1],a,o,s,c=i.match(/^(.+?)(@(.+))?$/);return c?(a=c[1],o=c[3],n.length>2&&(s=n.slice(2).join(`/`)),{type:`github`,owner:r,repo:a,version:o,path:s}):null}parseJsrSource(t){let n=t.substring(e.JSR_PREFIX.length);if(!n.startsWith(`@`))return null;let r=n.split(`/`);if(r.length<2)return null;let i=r[0],a=r[1],o,s,c,l=a.match(/^(.+?)(@(.+))?$/);return l?(o=`${i}/${l[1]}`,s=l[3],r.length>2&&(c=r.slice(2).join(`/`)),{type:`jsr`,package:o,version:s,path:c}):null}parsePrSource(t){let n=t.substring(e.PR_PREFIX.length).split(`/`);if(n.length<2)return null;let r=n[0],i=n[1],a,o,s=i.match(/^(.+?)@(.+)$/);return s?(a=s[1],o=s[2]):a=i,{type:`pr`,owner:r,repo:a,commit:o}}parseNpmSource(e){let t=e.split(`/`),n=t[0],r,i,a,o=n.match(/^(.+?)(@(.+))?$/);return o?(r=o[1],i=o[3],t.length>1&&(a=t.slice(1).join(`/`)),{type:`npm`,package:r,version:i,path:a}):null}buildEsmShUrl(t,n){let r=e.ESM_SH_BASE;switch(t.type){case`npm`:r+=`/${t.package}`,t.version&&(r+=`@${t.version}`),t.path&&(r+=`/${t.path}`);break;case`github`:r+=`/${e.GITHUB_PREFIX}${t.owner}/${t.repo}`,t.version&&(r+=`@${t.version}`),t.path&&(r+=`/${t.path}`);break;case`jsr`:r+=`/${e.JSR_PREFIX}${t.package}`,t.version&&(r+=`@${t.version}`),t.path&&(r+=`/${t.path}`);break;case`pr`:r+=`/${e.PR_PREFIX}${t.owner}/${t.repo}`,t.commit&&(r+=`@${t.commit}`)}let i=[];if(n?.deps){let e=Object.entries(n.deps).map(([e,t])=>`${e}@${t}`).join(`,`);i.push(`deps=${encodeURIComponent(e)}`)}return n?.target&&i.push(`target=${encodeURIComponent(n.target)}`),n?.dev&&i.push(`dev`),n?.bundle===!1?i.push(`bundle=false`):n?.bundle===!0&&i.push(`bundle`),i.length>0&&(r+=`?${i.join(`&`)}`),r}normalizeToEsmSh(e,t){if(this.isEsmShUrl(e)||this.isHttpUrl(e))return e;let n=this.parseSource(e);return n?this.buildEsmShUrl(n,t):(ea.warn(`Could not parse source identifier: ${e}`),e)}extractPackageName(e){let t=this.parseSource(e);if(!t)return null;switch(t.type){case`npm`:return t.package||null;case`github`:return`${t.owner}/${t.repo}`;case`jsr`:return t.package||null;case`pr`:return`${t.owner}/${t.repo}`}}isGitHubUrl(e){try{let t=new URL(e);return t.hostname===`github.com`||t.hostname===`www.github.com`}catch{return e.startsWith(`https://github.com/`)||e.startsWith(`http://github.com/`)}}convertGitHubUrlToSource(t){try{let n=new URL(t).pathname.split(`/`).filter(e=>e);if(n.length<2)throw Error(`Invalid GitHub URL format`);let r=n[0],i=n[1].replace(/\.git$/,``),a,o;n.length>2&&(n[2]===`blob`||n[2]===`tree`?(a=n[3]||`main`,n[2]===`blob`&&n.length>4&&(o=n.slice(4).join(`/`))):n[2]===`commit`?a=n[3]:o=n.slice(2).join(`/`));let s=`${e.GITHUB_PREFIX}${r}/${i}`;return a&&(s+=`@${a}`),o&&(s+=`/${o}`),s}catch{let n=t.match(/github\.com\/([^\/]+)\/([^\/]+)/);return n?`${e.GITHUB_PREFIX}${n[1]}/${n[2].replace(/\.git$/,``)}`:t}}async fetchGitHubPackageJson(e){if(e.type!==`github`)throw Error(`Source must be a GitHub source`);let t=`https://raw.githubusercontent.com/${e.owner}/${e.repo}/${e.version||`main`}/package.json`,n=await fetch(t);if(!n.ok)throw Error(`Failed to fetch package.json: ${n.statusText}`);return await n.json()}};y.put(`esmShService`,ta);var na=`events/extensionsregistry/extensionsConfigChanged`,ra=`extensions`,ia=`extensions.external`,J=new class{constructor(){this.extensions={},this.loadedExtensions=new Set,this.loadingPromises=new Map,r(Zi,()=>{this.extensionsSettings=void 0,this.checkExtensionsConfig().then()}),this.loadPersistedExternalExtensions().then(()=>{this.checkExtensionsConfig().then()})}async loadPersistedExternalExtensions(){try{let e=await q.get(ia);e&&Array.isArray(e)&&e.forEach(e=>{this.extensions[e.id]=e})}catch(e){S.error(`Failed to load persisted external extensions: ${e}`)}}async savePersistedExternalExtensions(){try{let e=Object.values(this.extensions).filter(e=>e.external);await q.set(ia,e)}catch(e){S.error(`Failed to save persisted external extensions: ${e}`)}}async checkExtensionsConfig(){this.extensionsSettings||(this.extensionsSettings=await q.get(ra),this.extensionsSettings||=(await q.set(ra,[]),await q.get(ra)),g(na,this.extensionsSettings))}registerExtension(e){this.extensions[e.id]=e,S.debug(`Registered extension: ${e.id}`),e.external&&this.savePersistedExternalExtensions().catch(e=>{S.error(`Failed to persist external extension: ${e}`)}),g(na,this.extensionsSettings)}async loadExtensionFromUrl(e,t){S.info(`Loading extension from URL: ${e}...`);try{let n=e,r=`Extension from ${e}`;if(ta.isSourceIdentifier(e)){let t=ta.extractPackageName(e);t&&(r=`Extension: ${t}`),n=ta.normalizeToEsmSh(e),S.debug(`Converted source identifier to esm.sh URL: ${e} -> ${n}`)}let i=t||`url:${n}`;if(this.isEnabled(i))return S.info(`Extension from URL ${n} is already enabled`),i;if(!this.extensions[i]){let t={id:i,name:r,description:`Extension loaded from: ${e}`,url:n};this.registerExtension(t),S.info(`Registered extension from URL: ${i}`)}return await this.enableAsync(i,!1),S.info(`Successfully enabled extension from URL: ${n}`),i}catch(t){throw S.error(`Failed to load extension from URL ${e}: ${t}`),t}}getExtensions(){return Object.values(this.extensions)}async loadEnabledExtensions(){await this.checkExtensionsConfig();let e=(this.extensionsSettings??[]).filter(e=>this.isEnabled(e.id)&&this.extensions[e.id]).map(e=>this.load(e.id).catch(e=>{C(`Extension could not be loaded: `+e.message)}));await Promise.all(e)}isEnabled(e){return this.checkExtensionsConfig(),!!this.extensionsSettings?.find(t=>t.id===e&&t.enabled)}isLoaded(e){return this.loadedExtensions.has(e)}enable(e,t=!1){this.isEnabled(e)||(S.debug(`Loading extension: ${e}`),this.load(e).then(()=>this.updateEnablementAsync(e,!0,t)).catch(t=>{S.error(`Could not load extension: ${e}: ${t}`)}))}async enableAsync(e,t=!1){if(this.isEnabled(e)){if(!this.isLoaded(e)){S.debug(`Extension ${e} is enabled in settings but not loaded; loading now`);try{await this.load(e)}catch(t){throw S.error(`Could not load extension: ${e}: ${t}`),t}}return}S.debug(`Loading extension: ${e}`);try{await this.load(e),await this.updateEnablementAsync(e,!0,t)}catch(t){throw S.error(`Could not load extension: ${e}: ${t}`),t}}async ensureExtensionRegistered(e){if(!this.extensions[e]){try{await m(()=>import(e),[])}catch(t){S.debug(`Could not side-effect import extension package ${e}: ${t}`)}if(!this.extensions[e])throw Error(`Extension not found: `+e)}}async load(e,t=[]){if(this.loadedExtensions.has(e))return;let n=this.loadingPromises.get(e);if(n)return n;if(t.includes(e)){let n=[...t,e].join(` → `);throw Error(`Circular dependency detected: ${n}`)}this.extensions[e]||await this.ensureExtensionRegistered(e);let r=this.extensions[e];if(!r)throw Error(`Extension not found: `+e);let i=(async()=>{try{if(S.debug(`Loading extension: ${e}`),r.dependencies&&r.dependencies.length>0){let n=[...t,e];for(let e of r.dependencies)await this.load(e,n),this.isEnabled(e)||(await this.updateEnablementAsync(e,!0,!1),S.debug(`Auto-enabled dependency: ${e}`))}let n=await $i.runAsync(`Loading extension: `+r.name,async()=>{if(r.loader)return r.loader();if(r.url){let e=r.url;return ta.isSourceIdentifier(r.url)&&(e=ta.normalizeToEsmSh(r.url),S.debug(`Normalized extension URL: ${r.url} -> ${e}`)),m(()=>import(e),[])}});if(n?.default instanceof Function)try{let e=n.default(b.getProxy());await Promise.resolve(e)}catch(t){throw S.error(`Error executing extension function for ${e}: ${t}`),t}this.loadedExtensions.add(e)}catch(t){throw this.loadedExtensions.delete(e),t}finally{this.loadingPromises.delete(e)}})();return this.loadingPromises.set(e,i),i}disable(e,t=!1){this.isEnabled(e)&&this.updateEnablementAsync(e,!1,t).catch(t=>{S.error(`Could not persist disable for extension ${e}: ${t}`)})}async updateEnablementAsync(e,t,n){await this.checkExtensionsConfig();let r=this.extensionsSettings?.find(t=>t.id==e);if(r?r.enabled=t:this.extensionsSettings?.push({id:e,enabled:t}),await q.set(ra,this.extensionsSettings),n){let n=this.extensions[e];Ce(t?n.name+` enabled.`:n.name+` disabled  - Please restart to take effect`)}g(na,this.extensionsSettings)}};y.put(`extensionRegistry`,J);var aa=[`alt`,`ctrl`,`meta`,`shift`],oa={CTRL:`ctrl`,CONTROL:`ctrl`,ALT:`alt`,OPTION:`alt`,SHIFT:`shift`,META:`meta`,CMD:`meta`,COMMAND:`meta`,WIN:`meta`,WINDOWS:`meta`},sa={ctrl:`Ctrl`,alt:`Alt`,shift:`Shift`,meta:`Cmd`},ca={SPACE:` `,ESC:`ESCAPE`,RETURN:`ENTER`,LEFT:`ARROWLEFT`,RIGHT:`ARROWRIGHT`,UP:`ARROWUP`,DOWN:`ARROWDOWN`,DEL:`DELETE`,INS:`INSERT`,PAGEUP:`PAGEUP`,PAGEDOWN:`PAGEDOWN`},la=new Set(Object.keys(oa));function ua(e){return ca[e]??e}var da=new class{constructor(){this.bindings=new Map,this.enabled=!0,document.addEventListener(`keydown`,this.handleKeyDown.bind(this),!0),this.registerExistingCommandBindings(),r(Ie,e=>{e.keyBinding&&this.registerKeyBinding(e.id,e.keyBinding)})}registerExistingCommandBindings(){let e=A.listCommands();Object.values(e).forEach(e=>{e.keyBinding&&this.registerKeyBinding(e.id,e.keyBinding)})}parseKeyBinding(e){if(!e||e.trim()===``)return null;let t=e.toUpperCase().split(`+`).map(e=>e.trim());if(t.length===0)return null;let n=t[t.length-1],r=t.slice(0,-1);if(t.length===1&&la.has(n))return null;let i={ctrl:!1,alt:!1,shift:!1,meta:!1};for(let e of r){let t=oa[e];if(t===void 0)return null;i[t]=!0}return i.key=ua(n),i}getBindingKey(e){return[...aa.filter(t=>e[t]),e.key.toUpperCase()].join(`+`)}registerKeyBinding(e,t){let n=this.parseKeyBinding(t);if(!n)return S.error(`Invalid key binding: ${t}`),!1;n.commandId=e;let r=this.getBindingKey(n);this.bindings.has(r)||this.bindings.set(r,[]);let i=this.bindings.get(r);if(i.find(t=>t.commandId===e))return S.error(`Key binding ${t} already registered for command ${e}`),!1;let a=i.find(t=>t.commandId!==e);return a?(S.warn(`Key binding ${t} already used by command ${a.commandId}; refusing for ${e}`),!1):(i.push(n),!0)}unregisterKeyBinding(e,t){if(t){let n=this.parseKeyBinding(t);if(n){let t=this.getBindingKey(n),r=this.bindings.get(t);if(r){let n=r.filter(t=>t.commandId!==e);n.length===0?this.bindings.delete(t):this.bindings.set(t,n)}}}else for(let[t,n]of this.bindings.entries()){let r=n.filter(t=>t.commandId!==e);r.length===0?this.bindings.delete(t):this.bindings.set(t,r)}}getKeyBindingsForCommand(e){let t=[];for(let n of this.bindings.values())for(let r of n)r.commandId===e&&t.push(this.formatKeyBinding(r));return t.sort()}formatKeyBinding(e){let t=aa.filter(t=>e[t]).map(e=>sa[e]),n=e.key.length===1?e.key.toUpperCase():e.key.charAt(0).toUpperCase()+e.key.slice(1).toLowerCase();return t.push(n),t.join(`+`)}handleKeyDown(e){if(!this.enabled)return;let t={commandId:``,key:ua(e.key.toUpperCase()),ctrl:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:e.metaKey},n=this.getBindingKey(t),r=this.bindings.get(n);if(r&&r.length>0){let t=r[0];e.preventDefault(),e.stopPropagation();let n=A.createExecutionContext({});A.execute(t.commandId,n).then(()=>{S.debug(`Executed command via key binding: ${t.commandId}`)},e=>{let n=e instanceof Error?e.message:String(e);S.error(`Failed to execute command ${t.commandId}: ${n}`)})}}setEnabled(e){this.enabled=e}isEnabled(){return this.enabled}getAllBindings(){let e=new Map;for(let[t,n]of this.bindings)e.set(t,[...n]);return e}clearAll(){this.bindings.clear()}};y.put(`keyBindingManager`,da);function fa(e){return Ln.sanitize(e)}function pa(e,t){return fa(G.parse(e,{async:!1,...t}))}var ma=class extends We{constructor(...e){super(...e),this.settingsKey=null}buildDOMTreePath(){let e=[],t=this;for(;t&&t!==document.body&&t!==document.documentElement;){let n=t.getAttribute(`id`);if(n){e.unshift(`#${n}`);break}let r=t.tagName.toLowerCase(),i=t.parentElement;if(!i)break;let a=Array.from(i.children).filter(e=>e.tagName.toLowerCase()===r).indexOf(t);a>=0?e.unshift(`${r}:${a}`):e.unshift(r),t=i}return e.length>0?e.join(` > `):null}initializeSettingsKey(){if(!this.settingsKey){let e=this.tagName.toLowerCase(),t=this.getAttribute(`id`);if(t){this.settingsKey=`${e}:${t}`;return}let n=this.buildDOMTreePath();n&&(this.settingsKey=`${e}:${n}`)}}async getDialogSetting(){if(this.initializeSettingsKey(),this.settingsKey)return await q.getDialogSetting(this.settingsKey)}async setDialogSetting(e){this.initializeSettingsKey(),this.settingsKey&&await q.setDialogSetting(this.settingsKey,e)}},ha=class extends ma{static{this.styles=[n`
            .dialog-message {
                margin-bottom: 0.5rem;
                color: var(--wa-color-text-normal);
            }
        `]}dispose(){}getResult(){}renderMessage(e,t=!1){if(t){let t=pa(e);return _`<div class="dialog-message" style="white-space: normal;">${s(t)}</div>`}return _`<div class="dialog-message" style="white-space: pre-line;">${e}</div>`}},ga=ge(`DialogService`),_a=`dialogs`,va={id:`ok`,label:`OK`,variant:`primary`},ya={id:`cancel`,label:`Cancel`,variant:`default`},ba={id:`close`,label:`Close`,variant:`default`},xa=null;function Sa(){return(!xa||!document.body.contains(xa))&&(xa=document.createElement(`div`),xa.id=`global-dialog-container`,document.body.appendChild(xa)),xa}function Ca(e){if(e instanceof Element&&e.tagName.toLowerCase()===`wa-dialog`)return e;let t=e instanceof Document||e instanceof DocumentFragment||e instanceof Element||e instanceof ShadowRoot?Array.from(e.children):[];for(let e of t){if(e instanceof Element&&e.tagName.toLowerCase()===`wa-dialog`)return e;if(e instanceof Element&&e.shadowRoot){let t=Ca(e.shadowRoot);if(t)return t}let t=Ca(e);if(t)return t}return null}var wa=new class{constructor(){this.contributions=new Map,this.contributionsChangeScheduled=!1,this.loadContributions(),r(E,e=>{e.target===`dialogs`&&(this.contributionsChangeScheduled||(this.contributionsChangeScheduled=!0,queueMicrotask(()=>{this.contributionsChangeScheduled=!1,this.loadContributions()})))})}loadContributions(){let e=D.getContributions(_a);this.contributions.clear();for(let t of e){if(!t.id){ga.warn(`Dialog contribution missing id, skipping`);continue}if(!t.component){ga.warn(`Dialog contribution "${t.id}" has no component function, skipping`);continue}if(!t.onButton&&!t.selfContained){ga.warn(`Dialog contribution "${t.id}" has no onButton callback, skipping`);continue}this.contributions.set(t.id,t)}}async open(e,t){let n=this.contributions.get(e);if(!n)throw ga.error(`Dialog "${e}" not found`),Error(`Dialog "${e}" not found`);return new Promise(r=>{let i=Sa(),a=!1,s=null,c=async()=>{if(!a){if(a=!0,s)try{await s.dispose()}catch(t){let n=t instanceof Error?t.message:String(t);ga.error(`Error disposing dialog content for "${e}": ${n}`)}try{let e=s?s.getResult():void 0;n.onButton&&await n.onButton(`close`,e,p)}catch(t){let n=t instanceof Error?t.message:String(t);ga.error(`Error executing close callback for dialog "${e}": ${n}`)}o(_``,i),r()}},l=()=>{if(a)return;let e=Ca(i);if(e&&e.open!==!1){e.open=!1;return}c()},u=()=>{c()},d=async t=>{if(n.onButton)try{let e=s?s.getResult():void 0;await n.onButton(t,e,p)!==!1&&l()}catch(t){let n=t instanceof Error?t.message:String(t);ga.error(`Error executing button callback for dialog "${e}": ${n}`),l()}},f=n.buttons&&n.buttons.length>0?n.buttons:[va],p={...t,close:l,onAfterHide:u};t&&typeof t==`object`&&(t.close=l,t.onAfterHide=u);let ee=t&&typeof t==`object`&&typeof t.label==`string`?t.label:n.label||e,m=n.selfContained?n.component(p):_`
                <wa-dialog label="${ee}" open @wa-after-hide=${u}>
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
                         @dialog-ok=${()=>{let e=f.find(e=>e.id===`ok`);e&&d(e.id)}}
                         @dialog-cancel=${()=>{let e=f.find(e=>e.id===`cancel`);e?d(e.id):l()}}>
                        ${n.component(t)}
                        
                        <div class="dialog-service-footer">
                            ${f.map(e=>_`
                                <wa-button 
                                    data-dialog-button="${e.id}"
                                    variant="${e.variant||`default`}"
                                    ?disabled=${e.disabled}
                                    @click=${()=>d(e.id)}
                                >
                                    ${e.label}
                                </wa-button>
                            `)}
                        </div>
                    </div>
                </wa-dialog>
            `;o(m,i),(async()=>{let e=Array.from(i.querySelectorAll(`*`));for(let t of e)if(t instanceof ha){await t.updateComplete,s=t;break}})()})}getDialogIds(){return Array.from(this.contributions.keys())}hasDialog(e){return this.contributions.has(e)}};y.put(`dialogService`,wa);var Ta=`.opfs`;async function Ea(){if(typeof navigator>`u`||!navigator.storage?.getDirectory)throw Error(`OPFS is not available in this environment`);return await navigator.storage.getDirectory()}var Da=class extends F{constructor(e){super(),this.inner=e}getName(){return Ta}getParent(){return this.inner.getParent()}async listChildren(e){return this.inner.listChildren(e)}async getResource(e,t){return this.inner.getResource(e,t)}touch(){this.inner.touch()}async delete(e,t){return this.inner.delete(e,t)}async copyTo(e){return this.inner.copyTo(e)}async rename(e){return this.inner.rename(e)}};L.registerContribution({type:`opfs`,name:`opfs`,canHandle(e){return e&&typeof e==`object`&&e.opfs===!0},async connect(e){let t=await Ea(),n=(await m(async()=>{let{FileSysDirHandleResource:e}=await import(`./fs-access-B4idfUTu-DuzwFPGQ.js`);return{FileSysDirHandleResource:e}},[])).FileSysDirHandleResource;return new Da(new n(t))},async restore(e){if(e&&typeof e==`object`&&e.opfs===!0){let e=await Ea(),t=(await m(async()=>{let{FileSysDirHandleResource:e}=await import(`./fs-access-B4idfUTu-DuzwFPGQ.js`);return{FileSysDirHandleResource:e}},[])).FileSysDirHandleResource;return new Da(new t(e))}},async persist(e){return e instanceof Da?{opfs:!0}:null}});var Oa=`eclipse-docks-workspace-idb`,ka=`files`,Aa=null;async function ja(){if(typeof indexedDB>`u`)throw Error(`IndexedDB is not available in this environment`);return Aa||=new Promise((e,t)=>{let n=indexedDB.open(Oa,1);n.onerror=()=>t(n.error),n.onsuccess=()=>e(n.result),n.onupgradeneeded=e=>{let t=e.target.result;t.objectStoreNames.contains(ka)||t.createObjectStore(ka)}}),Aa}async function Ma(){let e=`IndexedDB`,t=await L.getFolders(),n=new Set(t.filter(e=>e.type===`indexeddb`).map(e=>e.name));if(!n.has(e))return e;let r=1;for(;n.has(`${e} (${r})`);)r+=1;return`${e} (${r})`}function Na(e){return e?e.split(`/`).filter(Boolean).join(`/`):``}function Pa(e,t){let n=Na(e),r=Na(t);return n?r?`${n}/${r}`:n:r}function Fa(e,t){let n=Na(t);return n?`${e}/${n}`:e}function Ia(e,t){let n=Na(t);return n?`${e}/${n}/`:`${e}/`}async function La(e,t){let n=(await ja()).transaction(ka,`readonly`).objectStore(ka),r=t?Fa(e,t):e;return await new Promise((e,t)=>{let i=n.get(r);i.onsuccess=()=>e(i.result),i.onerror=()=>t(i.error)})}async function Ra(e,t,n){let r=(await ja()).transaction(ka,`readwrite`).objectStore(ka),i=t?Fa(e,t):e;await new Promise((e,t)=>{let a=r.put(n,i);a.onsuccess=()=>e(),a.onerror=()=>t(a.error)})}async function za(e,t){let n=(await ja()).transaction(ka,`readwrite`).objectStore(ka),r=t?Fa(e,t):e;await new Promise((e,t)=>{let i=n.delete(r);i.onsuccess=()=>e(),i.onerror=()=>t(i.error)})}async function Ba(e,t){let n=(await ja()).transaction(ka,`readwrite`).objectStore(ka),r=Fa(e,t),i=r+`/`,a=n.openCursor();await new Promise((e,t)=>{a.onerror=()=>t(a.error),a.onsuccess=t=>{let n=t.target.result;if(!n){e();return}let a=String(n.key);(a===r||a.startsWith(i))&&n.delete(),n.continue()}})}async function Va(e){await Ba(e,``)}async function Ha(e,t,n){let r=(await ja()).transaction(ka,`readwrite`).objectStore(ka),i=Fa(e,t),a=Fa(e,n),o=r.openCursor(),s=[];await new Promise((e,t)=>{o.onerror=()=>t(o.error),o.onsuccess=t=>{let n=t.target.result;if(!n){e();return}let o=String(n.key);if(o===i||o.startsWith(i+`/`)){let e=o.slice(i.length),t=a+e,c=n.value;s.push(()=>{n.delete(),r.put(c,t)})}n.continue()}});for(let e of s)e()}async function Ua(e,t){let n=(await ja()).transaction(ka,`readonly`).objectStore(ka),r=Ia(e,t),i=n.openCursor(),a=new Set,o=new Map;await new Promise((e,t)=>{i.onerror=()=>t(i.error),i.onsuccess=t=>{let n=t.target.result;if(!n){e();return}let i=String(n.key),s=n.value;if(!i.startsWith(r)){n.continue();return}let c=i.slice(r.length);if(!c){n.continue();return}let l=c.indexOf(`/`),u=l===-1?c:c.slice(0,l);l===-1?s.type===`dir`?a.add(u):o.set(u,s):a.add(u),n.continue()}});let s=[];for(let e of a)s.push({name:e,entry:{type:`dir`},type:`dir`});for(let[e,t]of o)a.has(e)||s.push({name:e,entry:t,type:`file`});return s}function Wa(e){return e instanceof Ka?e.getRootId():``}var Ga=class extends P{constructor(e,t){super(),this.path=Na(e),this.parent=t}getName(){let e=this.path.split(`/`);return e[e.length-1]||``}getParent(){return this.parent}getRootId(){return Wa(this.parent)}async delete(){await za(this.getRootId(),this.path),g(M,L.getWorkspaceSync()??this.getWorkspace())}async getContents(e){let t=await La(this.getRootId(),this.path),n=t?.content;if(typeof n==`string`){let e=new Blob([n],{type:t?.mimeType||`text/plain`});n=e,t&&(t.content=e,await Ra(this.getRootId(),this.path,t))}if(!e||e.contentType===$e.TEXT)return n?await n.text():``;let r;return r=n||new Blob([],{type:t?.mimeType}),e.blob?r:e.uri?URL.createObjectURL(r):r.stream()}async saveContents(e,t){let n,r;if(e instanceof Blob)n=e,r=e.type||void 0;else if(typeof e==`string`)r=`text/plain`,n=new Blob([e],{type:r});else if(e instanceof ReadableStream){let t=new Response(e);n=await t.blob(),r=t.headers.get(`content-type`)??void 0}else{let t=String(e??``);r=`text/plain`,n=new Blob([t],{type:r})}await Ra(this.getRootId(),this.path,{type:`file`,content:n,mimeType:r}),g(M,L.getWorkspaceSync()??this.getWorkspace())}async size(){let e=(await La(this.getRootId(),this.path))?.content;return e?e.size:null}async copyTo(e){let t=await this.getContents({blob:!0}),n=await this.getWorkspace().getResource(e,{create:!0});if(!n)throw Error(`Failed to create target file: ${e}`);await n.saveContents(t)}async rename(e){if(this.getName()===e)return;let t=this.getParent(),n=Pa(t instanceof Ka?t.getPath():``,e),r=this.getRootId(),i=await La(r,this.path);if(!i)throw Error(`File not found in IndexedDB`);await za(r,this.path),await Ra(r,n,i),g(M,L.getWorkspaceSync()??this.getWorkspace())}},Ka=class e extends F{constructor(e,t){super(),this.path=Na(e),this.parent=t}getPath(){return this.path}getName(){if(!this.path)return``;let e=this.path.split(`/`);return e[e.length-1]}getParent(){return this.parent}getRoot(){let e=this.getParent();return e?e.getRoot():this}getRootId(){let e=this.getRoot();return e instanceof qa?e.getRootId():``}async listChildren(t){let n=await Ua(this.getRootId(),this.path),r=[];for(let t of n){let n=Pa(this.path,t.name);t.type===`dir`?r.push(new e(n,this)):r.push(new Ga(n,this))}return r}async getResource(t,n){if(!t)throw Error(`No path provided`);let r=t.endsWith(`/`),i=t.split(`/`).filter(e=>e.trim()),a=this,o=!1;for(let t=0;t<i.length;t++){let s=i[t],c=t===i.length-1,l=Pa(a.getPath(),s),u=this.getRootId(),d=await La(u,l);if(!d){if(!n?.create)return null;if(c&&!r)return await Ra(u,l,{type:`file`,content:new Blob([])}),o=!0,g(M,L.getWorkspaceSync()??this.getWorkspace()),new Ga(l,a);await Ra(u,l,{type:`dir`}),o=!0,a=new e(l,a);continue}if(c)return r?d.type===`dir`?new e(l,a):null:d.type===`dir`?new e(l,a):new Ga(l,a);if(d.type!==`dir`)return null;a=new e(l,a)}return o&&g(M,L.getWorkspaceSync()??this.getWorkspace()),a}touch(){g(M,L.getWorkspaceSync()??this.getWorkspace())}async delete(t,n=!0){if(!t){let t=this.getParent();if(t instanceof e){await t.delete(this.getName());return}return}let r=Pa(this.path,t);await Ba(this.getRootId(),r),g(M,L.getWorkspaceSync()??this.getWorkspace())}async copyTo(e){for(let t of await this.listChildren(!1)){let n=[e,t.getName()].join(`/`);await t.copyTo(n)}}async rename(t){if(this.getName()===t)return;let n=this.getParent();if(!(n instanceof e))throw Error(`Cannot rename IndexedDB root directory`);let r=this.getPath(),i=Pa(n.getPath(),t);await Ha(this.getRootId(),r,i),g(M,L.getWorkspaceSync()??this.getWorkspace())}},qa=class extends Ka{constructor(e,t){super(``),this.displayName=e||`IndexedDB`,this.rootId=t}getRootId(){return this.rootId}getName(){return this.displayName}getParent(){}async rename(e){let t=String(e??``).trim();t&&t!==this.displayName&&(this.displayName=t,await L.updateFolderName(this,t))}};function Ja(){return typeof crypto<`u`&&crypto.randomUUID?crypto.randomUUID():`default-`+Math.random().toString(36).slice(2)+Date.now().toString(36)}L.registerContribution({type:`indexeddb`,name:`idb`,canHandle(e){return e&&typeof e==`object`&&e.indexeddb===!0},async connect(e){await ja();let t=e.name&&String(e.name).trim();return new qa(t&&t.length>0?t:await Ma(),Ja())},async restore(e){if(e&&typeof e==`object`&&e.indexeddb===!0&&e.rootId)return await ja(),new qa(e.name&&String(e.name).trim()||`IndexedDB`,String(e.rootId))},async persist(e){return e instanceof qa?{indexeddb:!0,name:e.getName(),rootId:e.getRootId()}:null}});async function Ya(e){return e instanceof qa&&(await Va(e.getRootId()),!0)}var Xa=`in-memory`,Za=`in-memory`;function Qa(e){return e?e.split(`/`).filter(Boolean).join(`/`):``}function $a(e,t){let n=Qa(e),r=Qa(t);return n?r?`${n}/${r}`:n:r}function eo(){return{kind:`dir`,children:new Map}}function to(e,t){let n=e.children.get(t);if(!n)return n=eo(),e.children.set(t,n),n;if(n.kind!==`dir`)throw Error(`Path conflict: ${t} is a file`);return n}function no(){g(M,L.getWorkspaceSync())}var ro=class{constructor(){this.tree=eo()}lookup(e){let t=Qa(e);if(!t)return this.tree;let n=this.tree;for(let e of t.split(`/`)){if(!n||n.kind!==`dir`)return;n=n.children.get(e)}return n}ensureDirectory(e){let t=Qa(e);if(!t)return;let n=this.tree;for(let e of t.split(`/`))n=to(n,e)}ensureFileParent(e){let t=Qa(e);if(!t)throw Error(`Invalid file path`);let n=t.split(`/`),r=n.pop(),i=this.tree;for(let e of n)i=to(i,e);return{parent:i,fileName:r}}writeFile(e,t,n){let{parent:r,fileName:i}=this.ensureFileParent(e);r.children.set(i,{kind:`file`,contents:t,mimeType:n})}writeLiveFile(e,t){let{parent:n,fileName:r}=this.ensureFileParent(e);n.children.set(r,{kind:`live`,source:t})}remove(e){let t=Qa(e);if(!t){this.clear();return}let n=t.split(`/`),r=n.pop(),i=this.tree;for(let e of n){if(!i||i.kind!==`dir`)return;i=i.children.get(e)}i&&i.kind===`dir`&&i.children.delete(r)}renameTree(e,t){let n=this.lookup(e);if(!n)throw Error(`Missing path: ${e}`);this.remove(e);let r=Qa(t).split(`/`),i=r.pop(),a=r.join(`/`);a&&this.ensureDirectory(a);let o=a?this.lookup(a):this.tree;if(!o||o.kind!==`dir`)throw Error(`Invalid rename target`);o.children.set(i,n)}clear(){this.tree.kind===`dir`&&this.tree.children.clear()}},io=class extends P{constructor(e,t,n){super(),this.store=e,this.path=t,this.parentDir=n}getRelativePath(){return this.path}getName(){let e=this.path.split(`/`);return e[e.length-1]||this.path}getParent(){return this.parentDir}getWorkspacePath(){return this.path?`${Xa}/${this.path}`:Xa}node(){let e=this.store.lookup(this.path);if(!e||e.kind!==`file`&&e.kind!==`live`)throw Error(`File not found: ${this.path}`);return e}isLive(){return this.store.lookup(this.path)?.kind===`live`}async getContents(e){let t=this.node();if(t.kind===`live`){let n=await t.source.getContents(e);return e?.blob&&!(n instanceof Blob)?new Blob([String(n??``)],{type:t.source.mimeType||`text/plain`}):n}if(e?.blob)return t.contents instanceof Blob?t.contents:new Blob([t.contents],{type:t.mimeType||`text/plain`});if(e?.uri){if(typeof t.contents==`string`&&t.contents.startsWith(`data:`))return t.contents;if(t.contents instanceof Blob)return URL.createObjectURL(t.contents)}return t.contents instanceof Blob?await t.contents.text():t.contents}async saveContents(e,t){if(this.isLive())throw Error(`Live in-memory files are read-only references`);let n=e instanceof Blob&&e.type||this.getMimeType();this.store.writeFile(this.path,e,n),no()}async size(){let e=this.node();return e.kind===`live`?await e.source.size():e.contents instanceof Blob?e.contents.size:e.contents.length}getMimeType(){let e=this.node();return e.kind===`live`?e.source.mimeType:e.mimeType}async copyTo(e){let t=L.getWorkspaceSync();if(!t)throw Error(`No workspace`);let n=await t.getResource(e,{create:!0});if(!(n instanceof P))throw Error(`Copy target is not a file`);let r=await this.getContents();await n.saveContents(r)}async delete(e,t){this.parentDir&&await this.parentDir.delete(this.getName())}async rename(e){if(!this.parentDir)throw Error(`Cannot rename without parent`);let t=this.path,n=$a(this.parentDir.getPath(),e);this.store.renameTree(t,n),no()}},ao=class e extends F{constructor(e,t,n,r=Xa){super(),this.store=e,this.path=t,this.parentDir=n,this.rootName=r}getName(){if(!this.path)return this.rootName;let e=this.path.split(`/`);return e[e.length-1]}getParent(){return this.parentDir}getPath(){return this.path}getWorkspacePath(){return this.path?`${Xa}/${this.path}`:Xa}async listChildren(t){let n=this.store.lookup(this.path);if(!n||n.kind!==`dir`)return[];let r=[];for(let[t,i]of n.children){let n=$a(this.path,t);i.kind===`dir`?r.push(new e(this.store,n,this,this.rootName)):r.push(new io(this.store,n,this))}return r}async getResource(t,n){if(!t)throw Error(`No path provided`);let r=t.endsWith(`/`),i=t.split(`/`).filter(e=>e.trim()),a=this.path,o=this,s=!1;for(let t=0;t<i.length;t++){let c=i[t],l=t===i.length-1,u=$a(a,c),d=this.store.lookup(u);if(!d){if(!n?.create)return null;if(l&&!r)return this.store.writeFile(u,``,void 0),s=!0,no(),new io(this.store,u,o);this.store.ensureDirectory(u),s=!0,o=new e(this.store,u,o,this.rootName),a=u;continue}if(l)return r||d.kind===`dir`?d.kind===`dir`?new e(this.store,u,o,this.rootName):null:new io(this.store,u,o);if(d.kind!==`dir`)return null;o=new e(this.store,u,o,this.rootName),a=u}return s&&no(),o}touch(){no()}async delete(e,t=!0){if(!e){this.parentDir?await this.parentDir.delete(this.getName()):(this.store.clear(),no());return}this.store.remove($a(this.path,e)),no()}async copyTo(e){for(let t of await this.listChildren(!1))await t.copyTo([e,t.getName()].join(`/`))}async rename(e){if(!this.parentDir)throw Error(`Cannot rename in-memory root`);if(this.getName()===e)return;let t=$a(this.parentDir.getPath(),e);this.store.renameTree(this.path,t),no()}},oo=class extends ao{constructor(e=Xa){super(new ro,``,void 0,e||`in-memory`)}getParent(){}ensureDirectoryEntry(e){let t=String(e??``).trim();if(!t||t.includes(`/`))throw Error(`Directory name required (no slashes)`);return this.store.ensureDirectory(t),new ao(this.store,t,void 0,this.getName())}writeLiveFile(e,t){this.store.writeLiveFile(e,t),no()}},so,co,lo=null;function uo(){return so||=new oo(Xa),so}function fo(e){lo=e,no()}function po(){return lo}var mo=class extends F{getName(){return Xa}getParent(){}getWorkspacePath(){return Xa}async listChildren(e){let t=uo();return lo?lo.listChildren(t,e):t.listChildren(e)}async getResource(e,t){let n=uo();return lo?lo.getResource(n,e,t):n.getResource(e,t)}touch(){no()}async delete(e,t){e&&(await uo().delete(e,t),no())}async copyTo(e){for(let t of await this.listChildren(!1))await t.copyTo([e,t.getName()].join(`/`))}async rename(e){throw Error(`Cannot rename the in-memory mount`)}};function ho(){return co||=new mo,co}L.registerContribution({type:Za,name:`memory`,canHandle(e){return!(!e||typeof e!=`object`||e.memory!==!0&&e[`in-memory`]!==!0)},async connect(e){return uo(),ho()},async restore(e){!e||typeof e!=`object`||e.memory!==!0&&e[`in-memory`]},async persist(e){return e instanceof mo||e instanceof oo?{memory:!0,name:Xa}:null}});var go=ge(`MarketplaceRegistry`),_o=`events/marketplaceregistry/changed`,vo=`marketplace.catalogUrls`,yo=new class{constructor(){this.catalogUrls=[],this.loadingPromises=new Map,this.loadCatalogUrls().then(()=>{this.refreshCatalogs().catch(e=>{go.error(`Failed to refresh catalogs on init: ${e.message}`)})})}async loadCatalogUrls(){try{let e=await q.get(vo);this.catalogUrls=Array.isArray(e)?e:[]}catch(e){go.error(`Failed to load catalog URLs: ${e}`),this.catalogUrls=[]}}async saveCatalogUrls(){await q.set(vo,this.catalogUrls),g(_o,{type:`catalogs`,urls:this.catalogUrls})}async addCatalogUrl(e){if(!this.isValidUrl(e))throw Error(`Invalid catalog URL: ${e}`);if(this.catalogUrls.includes(e)){go.debug(`Catalog URL already exists: ${e}`);return}this.catalogUrls.push(e),await this.saveCatalogUrls(),go.debug(`Added catalog URL: ${e}`);try{await this.refreshCatalogs()}catch(e){go.warn(`Failed to refresh catalogs immediately after adding: ${e}`)}}async addCatalogUrls(e){let t=0;for(let n of e){if(!this.isValidUrl(n)){go.warn(`Skipping invalid catalog URL: ${n}`);continue}this.catalogUrls.includes(n)||(this.catalogUrls.push(n),go.debug(`Added catalog URL: ${n}`),t++)}if(t!==0){await this.saveCatalogUrls();try{await this.refreshCatalogs()}catch(e){go.warn(`Failed to refresh catalogs after adding URLs: ${e}`)}}}async removeCatalogUrl(e){let t=this.catalogUrls.indexOf(e);t!==-1&&(this.catalogUrls.splice(t,1),await this.saveCatalogUrls(),go.info(`Removed catalog URL: ${e}`))}getCatalogUrls(){return[...this.catalogUrls]}isValidUrl(e){try{let t=new URL(e);return t.protocol===`http:`||t.protocol===`https:`}catch{return!1}}async fetchCatalog(e){let t=this.loadingPromises.get(e);if(t)return t;let n=(async()=>{try{let t=await fetch(e,{method:`GET`,headers:{Accept:`application/json`}});if(!t.ok)throw Error(`HTTP ${t.status}: ${t.statusText}`);let n=await t.json();if(!n.extensions||!Array.isArray(n.extensions))throw Error(`Invalid catalog format: extensions array is required`);return{name:n.name,description:n.description,extensions:n.extensions||[]}}catch(t){throw go.error(`Failed to fetch catalog from ${e}: ${t}`),t}finally{this.loadingPromises.delete(e)}})();return this.loadingPromises.set(e,n),n}async refreshCatalogs(){let e=this.catalogUrls.map(e=>this.fetchCatalog(e).catch(t=>(go.warn(`Failed to refresh catalog ${e}: ${t.message}`),null))),t=await Promise.allSettled(e),n=0;t.forEach(e=>{if(e.status===`fulfilled`&&e.value){let t=e.value;t.extensions&&t.extensions.forEach(e=>{if(!J.getExtensions().find(t=>t.id===e.id)){let t={...e,external:!0};J.registerExtension(t),n++}})}}),go.debug(`Refreshed ${this.catalogUrls.length} catalogs, ${n} extensions registered`),n>0&&go.info(`Marketplace: ${n} new extension(s) available`),g(_o,{type:`refreshed`})}getMarketplaceExtension(e){let t=J.getExtensions().find(t=>t.id===e);if(t&&t.external)return t}isMarketplaceExtension(e){let t=J.getExtensions().find(t=>t.id===e);return t!==void 0&&t.external===!0}};y.put(`marketplaceRegistry`,yo);var Y=ge(`AppLoader`);function bo(e){let t=e?.layout??`standard`;return typeof t==`object`?t.id:t}function xo(e){return e instanceof Error?e.message:String(e)}function So(){let e=window.location.pathname.split(`/`).filter(Boolean);if(e.length===0)return;let t=e[0];if(t&&t!==`index.html`&&!t.endsWith(`.html`))return t}var Co=new class e{constructor(){this.apps=new Map,this.started=!1,this.container=document.body,this.systemRequiredExtensions=new Set}static{this.PREFERRED_APP_KEY=`preferredAppName`}registerApp(e,t){if(t?.hostConfig===!0){let t={name:`@eclipse-docks/app`,version:`0.8.10`,description:`Default app template built on Eclipse Docks. Use as a starting point for downstream applications.`,dependencies:{"@eclipse-docks/core":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Eclipse Docks platform core: registries, services, parts, widgets, and API`},"@eclipse-docks/extension-ai-system":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`AI assistants, chat, and tool execution`},"@eclipse-docks/extension-canvas":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Compile and open workspace canvas.js views, and list canvases registered by extensions`},"@eclipse-docks/extension-catalog":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Browse and checkout resources from a catalog`},"@eclipse-docks/extension-command-palette":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`VS Code-style command palette at the top center for quick command execution (Ctrl+Shift+P)`},"@eclipse-docks/extension-terminal":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`VS Code-style terminal panel with pluggable profiles.`},"@eclipse-docks/extension-cereusdb":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Spatial SQL in the browser (SedonaDB / Apache DataFusion)`},"@eclipse-docks/extension-dataviewer":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Tabular data views, persistence, and CSV/TSV/DuckDB integration`},"@eclipse-docks/extension-duckdb":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`In-browser SQL engine (DuckDB-WASM) for advanced queries, analytics, and Parquet/CSV/JSON.`},"@eclipse-docks/extension-github-service":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`GitHub API integration for releases and repository information`},"@eclipse-docks/extension-howto-system":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Step-by-step workflow system with pre and post condition checks`},"@eclipse-docks/extension-in-browser-ml":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`In-browser machine learning service using transformers.js for specialized tasks (zero-shot classification, embeddings, etc.)`},"@eclipse-docks/extension-md-editor":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`View, edit, and render Markdown (.md) files`},"@eclipse-docks/extension-media-viewer":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`View PDF, image, and HTML files in the browser`},"@eclipse-docks/extension-memory-usage":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Displays JavaScript heap memory usage in the bottom toolbar`},"@eclipse-docks/extension-monaco-editor":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Code editor with syntax highlighting, code completion, and Python execution support`},"@eclipse-docks/extension-notebook":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`View and execute Jupyter-like notebooks (.ipynb) with Python code execution and markdown rendering`},"@eclipse-docks/extension-pglite":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`In-browser PostgreSQL via PGlite`},"@eclipse-docks/extension-plain-editor":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Default lightweight text and hex editor for workspace files`},"@eclipse-docks/extension-pwa":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Service worker update indicator on the main toolbar and install prompt in the center toolbar when the browser supports them.`},"@eclipse-docks/extension-python-runtime":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Pyodide runtime, Python package management, and Run Python Script command`},"@eclipse-docks/extension-rag-system":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Retrieval-Augmented Generation system for document indexing, search and retrieval`},"@eclipse-docks/extension-settings-tree":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Tree-based editor for settings with in-place editing`},"@eclipse-docks/extension-sqleditor":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Generic SQL editor with pluggable backends`},"@eclipse-docks/extension-utils":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Utility commands such as wget, unzip and certificate tools.`},"@eclipse-docks/extension-webdav":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Connect to WebDAV servers (Nextcloud, ownCloud) as workspace folders for cloud storage integration`},"@eclipse-docks/extension-webllm":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`In-Browser LLM inference`},"@eclipse-docks/extension-webmcp":{license:`EPL-2.0`,repository:`https://github.com/eclipse-docks/core`,description:`Exposes app commands as WebMCP tools for browser agents and MCP clients`},"@awesome.me/webawesome":{license:`MIT`,homepage:`https://webawesome.com/`,repository:`https://github.com/shoelace-style/webawesome`,description:`A forward-thinking library of web components.`},"@fortawesome/fontawesome-free":{license:`(CC-BY-4.0 AND OFL-1.1 AND MIT)`,homepage:`https://fontawesome.com`,repository:`https://github.com/FortAwesome/Font-Awesome`,description:`The iconic font, CSS, and SVG framework`},"@fortawesome/fontawesome-svg-core":{license:`MIT`,homepage:`https://fontawesome.com`,repository:`https://github.com/FortAwesome/Font-Awesome`,description:`The iconic font, CSS, and SVG framework`},"@fortawesome/free-solid-svg-icons":{license:`(CC-BY-4.0 AND MIT)`,homepage:`https://fontawesome.com`,repository:`https://github.com/FortAwesome/Font-Awesome`,description:`The iconic font, CSS, and SVG framework`},"@lit-labs/signals":{license:`BSD-3-Clause`,homepage:`https://lit.dev/`,repository:`https://github.com/lit/lit`,description:`JavaScript Signals proposal integration for Lit`},dompurify:{license:`(MPL-2.0 OR Apache-2.0)`,homepage:`https://github.com/cure53/DOMPurify`,repository:`https://github.com/cure53/DOMPurify`,description:`DOMPurify is a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG. It runs as JavaScript and works in all modern browsers, as well as in Node.js (via jsdom). DOMPurify is written by security people who have vast background in web attacks and XSS. Fear not.`},lit:{license:`BSD-3-Clause`,homepage:`https://lit.dev/`,repository:`https://github.com/lit/lit`,description:`A library for building fast, lightweight web components`},marked:{license:`MIT`,homepage:`https://marked.js.org`,repository:`https://github.com/markedjs/marked`,description:`A markdown parser built for speed`},"@opencode-ai/models":{license:`MIT`,homepage:`https://models.dev`,repository:`https://github.com/anomalyco/models.dev`,description:`Official typed client for the models.dev API — an open database of AI model capabilities, pricing, and limits`},"modern-screenshot":{license:`MIT`,homepage:`https://github.com/qq15725/modern-screenshot`,repository:`https://github.com/qq15725/modern-screenshot`,description:`Quickly generate image from DOM node using HTML5 canvas and SVG`},"@xterm/addon-fit":{license:`MIT`,repository:`https://github.com/xtermjs/xterm.js/tree/master/addons/addon-fit`},"@xterm/xterm":{license:`MIT`,repository:`https://github.com/xtermjs/xterm.js`,description:`Full xterm terminal, in your browser`},"@cereusdb/full":{license:`Apache-2.0`,homepage:`https://github.com/tobilg/cereusdb#readme`,repository:`https://github.com/tobilg/cereusdb`,description:`Full CereusDB browser package with GEOS, PROJ, GDAL, and S2 geography support`},"@cereusdb/global":{license:`Apache-2.0`,homepage:`https://github.com/tobilg/cereusdb#readme`,repository:`https://github.com/tobilg/cereusdb`,description:`Global CereusDB browser package with GEOS, PROJ, and S2 geography support`},"@cereusdb/minimal":{license:`Apache-2.0`,homepage:`https://github.com/tobilg/cereusdb#readme`,repository:`https://github.com/tobilg/cereusdb`,description:`Minimal CereusDB browser package with GEOS-backed spatial SQL`},"@cereusdb/standard":{license:`Apache-2.0`,homepage:`https://github.com/tobilg/cereusdb#readme`,repository:`https://github.com/tobilg/cereusdb`,description:`Standard CereusDB browser package with GEOS and PROJ support`},papaparse:{license:`MIT`,homepage:`https://www.papaparse.com/`,repository:`https://github.com/mholt/PapaParse`,description:`Fast and powerful CSV parser for the browser that supports web workers and streaming large files. Converts CSV to JSON and JSON to CSV.`},"@duckdb/duckdb-wasm":{license:`MIT`,repository:`https://github.com/duckdb/duckdb-wasm`,description:`DuckDB powered by WebAssembly`},"@huggingface/transformers":{license:`Apache-2.0`,homepage:`https://github.com/huggingface/transformers.js#readme`,repository:`https://github.com/huggingface/transformers.js`,description:`State-of-the-art Machine Learning for the web. Run 🤗 Transformers directly in your browser, with no need for a server!`},"monaco-editor":{license:`MIT`,homepage:`https://github.com/microsoft/monaco-editor`,repository:`https://github.com/microsoft/monaco-editor`,description:`A browser based code editor`},"@electric-sql/pglite":{license:`Apache-2.0`,homepage:`https://pglite.dev`,repository:`https://github.com/electric-sql/pglite`,description:`PGlite is a WASM Postgres build packaged into a TypeScript client library that enables you to run Postgres in the browser, Node.js and Bun, with no need to install any other dependencies. It is only 3.7mb gzipped.`},"@electric-sql/pglite-age":{license:`Apache-2.0`,homepage:`https://pglite.dev`,repository:`https://github.com/electric-sql/pglite`,description:`AGE extension for PGlite`},"@electric-sql/pglite-pg_hashids":{license:`Apache-2.0`,homepage:`https://pglite.dev`,repository:`https://github.com/electric-sql/pglite`,description:`pg_hashids extension for PGlite`},"@electric-sql/pglite-pg_ivm":{license:`Apache-2.0`,homepage:`https://pglite.dev`,repository:`https://github.com/electric-sql/pglite`,description:`pg_ivm extension for PGlite`},"@electric-sql/pglite-pg_textsearch":{license:`Apache-2.0`,homepage:`https://pglite.dev`,repository:`https://github.com/electric-sql/pglite`,description:`pg_textsearch extension for PGlite`},"@electric-sql/pglite-pg_uuidv7":{license:`Apache-2.0`,homepage:`https://pglite.dev`,repository:`https://github.com/electric-sql/pglite`,description:`pg_uuidv7 extension for PGlite`},"@electric-sql/pglite-pgmq":{license:`Apache-2.0`,homepage:`https://pglite.dev`,repository:`https://github.com/electric-sql/pglite`,description:`pgmq extension for PGlite`},"@electric-sql/pglite-pgtap":{license:`Apache-2.0`,homepage:`https://pglite.dev`,repository:`https://github.com/electric-sql/pglite`,description:`pgtap extension for PGlite`},"@electric-sql/pglite-pgvector":{license:`Apache-2.0`,homepage:`https://pglite.dev`,repository:`https://github.com/electric-sql/pglite`,description:`pgvector extension for PGlite`},"@electric-sql/pglite-postgis":{license:`Apache-2.0`,homepage:`https://pglite.dev`,repository:`https://github.com/electric-sql/pglite`,description:`PostGIS extension for PGlite`},pyodide:{license:`MPL-2.0`,homepage:`https://github.com/pyodide/pyodide`,repository:`https://github.com/pyodide/pyodide`,description:`The Pyodide JavaScript package`},"@langchain/core":{license:`MIT`,homepage:`https://github.com/langchain-ai/langchainjs/tree/main/langchain-core/`,repository:`git@github.com:langchain-ai/langchainjs`,description:`Core LangChain.js abstractions and schemas`},"@langchain/textsplitters":{license:`MIT`,homepage:`https://github.com/langchain-ai/langchainjs/tree/main/libs/langchain-textsplitters/`,repository:`git@github.com:langchain-ai/langchainjs`,description:`Various implementations of LangChain.js text splitters`},"pdfjs-dist":{license:`Apache-2.0`,homepage:`https://mozilla.github.io/pdf.js/`,repository:`https://github.com/mozilla/pdf.js`,description:`Generic build of Mozilla's PDF.js library.`},rxdb:{license:`Apache-2.0`,homepage:`https://rxdb.info/`,repository:`https://github.com/pubkey/rxdb`,description:`A local-first realtime NoSQL Database for JavaScript applications - https://rxdb.info/`},rxjs:{license:`Apache-2.0`,homepage:`https://rxjs.dev`,repository:`https://github.com/reactivex/rxjs`,description:`Reactive Extensions for modern JavaScript`},jszip:{license:`(MIT OR GPL-3.0-or-later)`,repository:`https://github.com/Stuk/jszip`,description:`Create, read and edit .zip files with JavaScript http://stuartk.com/jszip`},"@mlc-ai/web-llm":{license:`Apache-2.0`,homepage:`https://github.com/mlc-ai/web-llm`,repository:`https://github.com/mlc-ai/web-llm`,description:`Hardware accelerated language model chats on browsers`}},directDependencies:`@eclipse-docks/core.@eclipse-docks/extension-ai-system.@eclipse-docks/extension-canvas.@eclipse-docks/extension-catalog.@eclipse-docks/extension-command-palette.@eclipse-docks/extension-terminal.@eclipse-docks/extension-cereusdb.@eclipse-docks/extension-dataviewer.@eclipse-docks/extension-duckdb.@eclipse-docks/extension-github-service.@eclipse-docks/extension-howto-system.@eclipse-docks/extension-in-browser-ml.@eclipse-docks/extension-md-editor.@eclipse-docks/extension-media-viewer.@eclipse-docks/extension-memory-usage.@eclipse-docks/extension-monaco-editor.@eclipse-docks/extension-notebook.@eclipse-docks/extension-pglite.@eclipse-docks/extension-plain-editor.@eclipse-docks/extension-pwa.@eclipse-docks/extension-python-runtime.@eclipse-docks/extension-rag-system.@eclipse-docks/extension-settings-tree.@eclipse-docks/extension-sqleditor.@eclipse-docks/extension-utils.@eclipse-docks/extension-webdav.@eclipse-docks/extension-webllm.@eclipse-docks/extension-webmcp`.split(`.`),nestedDependencies:{"@eclipse-docks/core":[`@awesome.me/webawesome`,`@fortawesome/fontawesome-free`,`@fortawesome/fontawesome-svg-core`,`@fortawesome/free-solid-svg-icons`,`@lit-labs/signals`,`dompurify`,`lit`,`marked`],"@eclipse-docks/extension-ai-system":[`@opencode-ai/models`],"@eclipse-docks/extension-canvas":[`modern-screenshot`],"@eclipse-docks/extension-terminal":[`@xterm/addon-fit`,`@xterm/xterm`],"@eclipse-docks/extension-cereusdb":[`@cereusdb/full`,`@cereusdb/global`,`@cereusdb/minimal`,`@cereusdb/standard`],"@eclipse-docks/extension-dataviewer":[`papaparse`],"@eclipse-docks/extension-duckdb":[`@duckdb/duckdb-wasm`],"@eclipse-docks/extension-in-browser-ml":[`@huggingface/transformers`],"@eclipse-docks/extension-md-editor":[`marked`],"@eclipse-docks/extension-monaco-editor":[`monaco-editor`],"@eclipse-docks/extension-notebook":[`marked`],"@eclipse-docks/extension-pglite":[`@electric-sql/pglite`,`@electric-sql/pglite-age`,`@electric-sql/pglite-pg_hashids`,`@electric-sql/pglite-pg_ivm`,`@electric-sql/pglite-pg_textsearch`,`@electric-sql/pglite-pg_uuidv7`,`@electric-sql/pglite-pgmq`,`@electric-sql/pglite-pgtap`,`@electric-sql/pglite-pgvector`,`@electric-sql/pglite-postgis`],"@eclipse-docks/extension-python-runtime":[`pyodide`],"@eclipse-docks/extension-rag-system":[`@langchain/core`,`@langchain/textsplitters`,`pdfjs-dist`,`rxdb`,`rxjs`],"@eclipse-docks/extension-utils":[`jszip`],"@eclipse-docks/extension-webllm":[`@mlc-ai/web-llm`]},marketplaceCatalogUrls:[`https://raw.githubusercontent.com/kispace-io/appspace-marketplace/main/catalogs/extensions.json`,`https://raw.githubusercontent.com/kispace-io/appspace-marketplace/main/catalogs/apps.json`]};e.name===void 0&&(e.name=t.name),e.version===void 0&&(e.version=t.version),e.description===void 0&&(e.description=t.description),e.dependencies===void 0&&(e.dependencies=t.dependencies),e.directDependencies===void 0&&(e.directDependencies=t.directDependencies),e.nestedDependencies===void 0&&(e.nestedDependencies=t.nestedDependencies),e.marketplaceCatalogUrls===void 0&&(e.marketplaceCatalogUrls=t.marketplaceCatalogUrls)}e.name=e.name??`app`,e.version=e.version??`0.0.0`,e.layout=e.layout??`standard`,this.apps.has(e.name)&&Y.warn(`App '${e.name}' is already registered. Overwriting.`),e.marketplaceCatalogUrls?.length&&yo.addCatalogUrls(e.marketplaceCatalogUrls).catch(()=>{}),this.apps.set(e.name,e),t?.defaultAppName&&(this.defaultAppName=t.defaultAppName),t?.container&&(this.container=t.container),t?.autoStart&&!this.started&&this.start()}registerSystemRequiredExtension(e){this.systemRequiredExtensions.add(e)}async start(){if(this.started){Y.debug(`AppLoader already started`);return}this.started=!0;let e=new URLSearchParams(window.location.search).get(`appId`),t=So();t&&Y.info(`Extracted app ID from current page path: ${t}`);let n=await this.selectAppToLoad({appIdFromUrl:e,appIdFromPath:t});if(!n)throw Error(`No apps registered`);await this.loadApp(n,this.container)}findAppNameBySegment(e){if(this.apps.has(e))return e;for(let t of this.apps.values())if(t.path===e||t.name&&t.name.endsWith(`/`+e))return t.name??void 0}dispatchLoadProgress(e){window.dispatchEvent(new CustomEvent(`app-load-progress`,{detail:{message:e}}))}async loadApp(e,t){let n=this.apps.get(e);if(!n)throw Error(`App '${e}' not found. Make sure it's registered.`);if(this.dispatchLoadProgress(`Starting…`),this.currentApp&&(Y.info(`Disposing current app: ${this.currentApp.name}`),this.currentApp.dispose&&await this.currentApp.dispose(),this.currentApp.extensions&&this.currentApp.extensions.length>0&&(Y.info(`Disabling ${this.currentApp.extensions.length} extensions...`),this.currentApp.extensions.forEach(e=>{J.disable(e)}))),Te.applyAppNameRemaps(n.remaps),n.remaps?.length){let e=new Set;for(let t of n.remaps)for(let n of t.targets)e.add(n);for(let t of e){let e=D.getContributions(t);g(E,{target:t,contributions:e})}}n.contributions&&(Y.info(`Registering app contributions...`),n.contributions.ui&&(n.contributions.ui.forEach(e=>{let t=e.target;t&&D.registerContribution(t,e)}),Y.info(`Registered ${n.contributions.ui.length} UI contributions`)),n.contributions.extensions&&(n.contributions.extensions.forEach(e=>{J.registerExtension(e)}),Y.info(`Registered ${n.contributions.extensions.length} app extensions`)));let r=new Set(n.extensions||[]);this.systemRequiredExtensions.forEach(e=>r.add(e)),n.extensions=Array.from(r),this.currentApp=n,this.updateDocumentMetadata(n),t&&(this.dispatchLoadProgress(`Rendering layout…`),this.renderApp(t),window.dispatchEvent(new CustomEvent(`app-loaded`,{detail:{appName:n.name}}))),n.extensions.length>0&&(this.dispatchLoadProgress(`Enabling extensions…`),await Promise.all(n.extensions.map(e=>J.enableAsync(e).catch(t=>{Y.error(`Failed to load extension ${e}: ${xo(t)}`)})))),this.dispatchLoadProgress(`Loading extensions…`),await J.loadEnabledExtensions(),n.initialize&&(this.dispatchLoadProgress(`Initializing…`),Y.info(`Initializing ${n.name}...`),await n.initialize()),Y.info(`App ${n.name} loaded successfully`),t||window.dispatchEvent(new CustomEvent(`app-loaded`,{detail:{appName:n.name}}))}updateDocumentMetadata(e){if(document.title=e.name??``,e.metadata?.favicon){let t=e.metadata.favicon,n=document.querySelector(`link[rel*='icon']`);n||(n=document.createElement(`link`),n.rel=`icon`,document.head.appendChild(n)),n.type=`image/svg+xml`,n.href=t}}renderApp(e){if(!this.currentApp)throw Error(`No app loaded. Call loadApp() first.`);let t=bo(this.currentApp),n=D.getContributions(Li),r=n.find(e=>e.id===t);if(r||=(Y.warn(`Layout '${t}' not found, falling back to 'standard'`),n.find(e=>e.id===`standard`)),!r)throw Error(`No layout found for layoutId '${t}' and no 'standard' layout registered.`);let i=r.component,a={};if(i&&typeof i==`object`&&`tag`in i&&i.attributes&&(a={...i.attributes}),e.innerHTML=``,typeof i==`string`){let t=document.createElement(i);for(let[e,n]of Object.entries(a))t.setAttribute(e,n);e.appendChild(t)}else if(i&&typeof i==`object`&&`tag`in i){let t=document.createElement(i.tag);for(let[e,n]of Object.entries(a))t.setAttribute(e,n);e.appendChild(t)}else if(typeof i==`function`)o(i(),e);else throw Error(`Layout '${r.id}' has invalid component.`);r.onShow&&requestAnimationFrame(()=>{Promise.resolve(r.onShow()).catch(e=>Y.error(`Layout onShow failed for '${r.id}': ${xo(e)}`))})}getCurrentApp(){return this.currentApp}getRegisteredApps(){return Array.from(this.apps.values())}async getPreferredAppId(){try{return await q.get(e.PREFERRED_APP_KEY)}catch(e){Y.debug(`Failed to get preferred app ID from settings: ${xo(e)}`);return}}async setPreferredAppId(t){if(!this.apps.has(t))throw Error(`App '${t}' not found. Make sure it's registered.`);try{await q.set(e.PREFERRED_APP_KEY,t),this.defaultAppName=t,Y.info(`Set preferred app to: ${t}`)}catch(e){throw Y.error(`Failed to persist preferred app: ${xo(e)}`),e}}getRegisteredLayouts(){return D.getContributions(Li)}getCurrentLayoutId(){return bo(this.currentApp)}async selectAppToLoad(e){let{appIdFromUrl:t,appIdFromPath:n}=e;if(t){let e=this.findAppNameBySegment(t)??t;if(this.apps.has(e))return Y.info(`Loading app specified by URL parameter 'appId': ${e}`),e;Y.warn(`App '${t}' from URL parameter not found`)}if(n){let e=this.findAppNameBySegment(n);if(e)return Y.info(`Loading app from URL path: ${n}`),e;Y.debug(`App for path '${n}' not found, continuing search`)}let r=await this.getPreferredAppId();if(r&&this.apps.has(r))return Y.info(`Loading preferred app from settings: ${r}`),r;if(this.defaultAppName&&this.apps.has(this.defaultAppName))return this.defaultAppName;this.defaultAppName&&Y.warn(`Default app '${this.defaultAppName}' not found`);let i=this.getRegisteredApps();if(i.length>0)return i[0].name}};y.put(`appLoaderService`,Co);var wo=class extends ha{constructor(...e){super(...e),this.message=``,this.defaultValue=``,this.markdown=!1,this.inputValue=``}static{this.styles=[...ha.styles,n`
            wa-input {
                width: 100%;
            }
        `]}async firstUpdated(e){super.firstUpdated(e),this.inputValue=this.defaultValue,await this.updateComplete;let t=this.shadowRoot?.querySelector(`wa-input`);if(t){let e=t.shadowRoot?.querySelector(`input`);e&&(e.focus(),e.select())}}getResult(){return this.inputValue}handleInput(e){this.inputValue=e.target.value}handleKeyDown(e){e.key===`Enter`?(e.preventDefault(),this.dispatchEvent(new CustomEvent(`dialog-ok`,{bubbles:!0,composed:!0}))):e.key===`Escape`&&(e.preventDefault(),this.dispatchEvent(new CustomEvent(`dialog-cancel`,{bubbles:!0,composed:!0})))}render(){return _`
            ${this.renderMessage(this.message,this.markdown)}
            <wa-input
                value="${this.inputValue}"
                @input=${this.handleInput}
                @keydown=${this.handleKeyDown}
                autofocus
            ></wa-input>
        `}};K([u({type:String})],wo.prototype,`message`,void 0),K([u({type:String,attribute:`default-value`})],wo.prototype,`defaultValue`,void 0),K([u({type:Boolean})],wo.prototype,`markdown`,void 0),K([d()],wo.prototype,`inputValue`,void 0),wo=K([i(`docks-prompt-dialog-content`)],wo),D.registerContribution(_a,{id:`prompt`,label:`Input`,buttons:[va,ya],component:e=>e?_`
            <docks-prompt-dialog-content 
                .message="${e.message}"
                .defaultValue="${e.defaultValue}"
                .markdown="${e.markdown}"
            ></docks-prompt-dialog-content>
        `:_`<div>Error: No prompt dialog state</div>`,onButton:async(e,t,n)=>(n&&(e===`ok`?n.resolve(t||``):n.resolve(null)),!0)});async function To(e,t=``,n=!1){return new Promise(r=>{wa.open(`prompt`,{message:e,defaultValue:t,markdown:n,resolve:r})})}var Eo=class extends ha{constructor(...e){super(...e),this.fields=[],this.message=``,this.markdown=!1,this.values={},this.validationError=``}static{this.styles=[...ha.styles,n`
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
        `]}async firstUpdated(e){super.firstUpdated(e);let t={};for(let e of this.fields)t[e.name]=e.value??``;this.values=t,await this.updateComplete,((this.shadowRoot?.querySelector(`wa-input`))?.shadowRoot?.querySelector(`input`))?.focus()}getResult(){return{...this.values}}setValidationError(e){this.validationError=e}updateField(e,t){this.values={...this.values,[e]:t},this.validationError&&=``}handleKeyDown(e){e.key===`Enter`?(e.preventDefault(),this.dispatchEvent(new CustomEvent(`dialog-ok`,{bubbles:!0,composed:!0}))):e.key===`Escape`&&(e.preventDefault(),this.dispatchEvent(new CustomEvent(`dialog-cancel`,{bubbles:!0,composed:!0})))}render(){return _`
            ${this.message?this.renderMessage(this.message,this.markdown):null}
            <div class="form-fields" @keydown=${this.handleKeyDown}>
                ${this.fields.map(e=>_`
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
                ${this.validationError?_`<div class="validation-error">${this.validationError}</div>`:null}
            </div>
        `}};K([u({attribute:!1})],Eo.prototype,`fields`,void 0),K([u({type:String})],Eo.prototype,`message`,void 0),K([u({type:Boolean})],Eo.prototype,`markdown`,void 0),K([d()],Eo.prototype,`values`,void 0),K([d()],Eo.prototype,`validationError`,void 0),Eo=K([i(`docks-form-dialog-content`)],Eo);function Do(e){return Object.fromEntries(Object.entries(e).map(([e,t])=>[e,t.trim()]))}function Oo(){return document.querySelector(`docks-form-dialog-content`)}function ko(e,t){for(let n of e)if(n.required!==!1&&!t[n.name]?.trim())return`${n.label} is required.`;return null}D.registerContribution(_a,{id:`form`,label:`Form`,buttons:[va,ya],component:e=>e?_`
            <docks-form-dialog-content
                .message=${e.message??``}
                .markdown=${e.markdown??!1}
                .fields=${e.fields}
            ></docks-form-dialog-content>
        `:_`<div>Error: No form dialog state</div>`,onButton:async(e,t,n)=>{if(!n)return!0;if(e===`ok`){let e=Do(t??{}),r=ko(n.fields,e);if(r)return Oo()?.setValidationError(r),!1;n.resolve(e)}else n.resolve(null);return!0}});function Ao(e){return new Promise(t=>{wa.open(`form`,{...e,resolve:t})})}async function jo(e){let t=await Ao(e);if(!t)throw Error(`Cancelled`);return t}var Mo=class extends ha{constructor(...e){super(...e),this.message=``,this.markdown=!1}render(){return _`
            ${this.renderMessage(this.message,this.markdown)}
        `}};K([u({type:String})],Mo.prototype,`message`,void 0),K([u({type:Boolean})],Mo.prototype,`markdown`,void 0),Mo=K([i(`docks-info-dialog-content`)],Mo),D.registerContribution(_a,{id:`info`,label:`Information`,buttons:[va],component:e=>e?_`
            <docks-info-dialog-content 
                .message="${e.message}"
                .markdown="${e.markdown}"
            ></docks-info-dialog-content>
        `:_`<div>Error: No info dialog state</div>`,onButton:async(e,t,n)=>(n&&n.resolve&&n.resolve(),!0)});async function No(e,t,n=!1){return new Promise(r=>{wa.open(`info`,{title:e,message:t,markdown:n,resolve:r})})}var Po=class extends ha{constructor(...e){super(...e),this.message=``,this.markdown=!1}getResult(){return!1}render(){return _`
            ${this.renderMessage(this.message,this.markdown)}
        `}};K([u({type:String})],Po.prototype,`message`,void 0),K([u({type:Boolean})],Po.prototype,`markdown`,void 0),Po=K([i(`docks-confirm-dialog-content`)],Po),D.registerContribution(_a,{id:`confirm`,label:`Confirm`,buttons:[va,ya],component:e=>e?_`
            <docks-confirm-dialog-content 
                .message="${e.message}"
                .markdown="${e.markdown}"
            ></docks-confirm-dialog-content>
        `:_`<div>Error: No confirm dialog state</div>`,onButton:async(e,t,n)=>(n&&(e===`ok`?n.resolve(!0):n.resolve(!1)),!0)});async function Fo(e,t=!1){return new Promise(n=>{wa.open(`confirm`,{message:e,markdown:t,resolve:n})})}var Io=class extends ha{constructor(...e){super(...e),this.title=``,this.message=``,this.markdown=!1,this.actions=[],this.currentTitle=``,this.currentMessage=``,this.dialogElement=null}async firstUpdated(e){super.firstUpdated(e),this.currentTitle=this.title,this.currentMessage=this.message,await this.updateComplete;let t=this.closest(`wa-dialog`);t&&(this.dialogElement=t,this.updateDialogLabel());let n=this.closest(`.dialog-service-content`);if(n){let e=n.parentElement?.querySelector(`.dialog-service-footer`);e&&(e.style.display=`none`)}}updated(e){super.updated(e),e.has(`title`)&&(this.currentTitle=this.title,this.updateDialogLabel()),e.has(`message`)&&(this.currentMessage=this.message)}updateDialogLabel(){this.dialogElement&&this.dialogElement.setAttribute(`label`,this.currentTitle)}updateDialog(e,t,n){this.currentTitle=e,this.currentMessage=t,this.actions=[...n],this.updateDialogLabel(),this.requestUpdate()}handleActionClick(e){e.callback()}handleClose(){this.resolveCallback&&this.resolveCallback();let e=this.closest(`wa-dialog`);e&&e.open!==!1&&(e.open=!1)}static{this.styles=[...ha.styles,n`
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
        `]}render(){let e=this.actions.filter(e=>e.label!==`Close`),t=this.actions.filter(e=>e.label===`Close`);return _`
            <div class="dialog-content">
                <wa-scroller class="dialog-scroller">
                    ${this.renderMessage(this.currentMessage,this.markdown)}
                </wa-scroller>
                
                <div class="dialog-actions">
                    <div class="dialog-actions-left">
                        ${e.map(e=>_`
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
                        ${t.map(e=>_`
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
        `}};K([u({type:String})],Io.prototype,`title`,void 0),K([u({type:String})],Io.prototype,`message`,void 0),K([u({type:Boolean})],Io.prototype,`markdown`,void 0),K([d()],Io.prototype,`actions`,void 0),K([d()],Io.prototype,`currentTitle`,void 0),K([d()],Io.prototype,`currentMessage`,void 0),Io=K([i(`docks-navigable-info-dialog-content`)],Io),D.registerContribution(_a,{id:`navigable-info`,label:`Information`,buttons:[ba],component:e=>{if(!e)return _`<div>Error: No navigable info dialog state</div>`;let t=_`
            <docks-navigable-info-dialog-content 
                .title="${e.title}"
                .message="${e.message}"
                .markdown="${e.markdown}"
            ></docks-navigable-info-dialog-content>
        `;return(async()=>{let t=document.querySelector(`docks-navigable-info-dialog-content`);t&&(await t.updateComplete,t.actions=e.actions||[],t.resolveCallback=e.resolve,e.updateDialogRef&&(e.updateDialogRef.current=(e,n,r)=>{t.updateDialog(e,n,r)}))})(),t},onButton:async(e,t,n)=>n&&e===`close`&&n.resolve?(n.resolve(),!0):!1});async function Lo(e,t,n,r=!1){return new Promise(i=>{let a={};wa.open(`navigable-info`,{title:e,message:t,actions:n,markdown:r,resolve:i,updateDialogRef:a}),n.updateDialog=(e,t,n)=>{a.current&&a.current(e,t,n)}})}var Ro=class extends ha{constructor(...e){super(...e),this.mode=`either`,this.selectedPath=null,this.rootNodes=[],this.loading=!1,this.loadError=null}static{this.styles=[...ha.styles,n`
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
    `]}async doInitUI(){await this.loadWorkspaceTree()}firstUpdated(e){super.firstUpdated?.(e);let t=this.closest(`wa-dialog`);t&&t.setAttribute(`label`,this.dialogTitle)}updated(e){if(super.updated?.(e),e.has(`mode`)){let e=this.closest(`wa-dialog`);e&&e.setAttribute(`label`,this.dialogTitle)}}get dialogTitle(){return this.mode===`file`?`Choose a file`:this.mode===`directory`?`Choose a directory`:`Choose a file or directory`}getResult(){return this.selectedPath==null?null:`/`+this.selectedPath}async loadWorkspaceTree(){this.loading=!0,this.loadError=null;try{let e=await L.getWorkspace();if(!e){this.rootNodes=[];return}let t=await e.listChildren(!1),n=[];for(let e of t)n.push(await this.resourceToTreeNode(e,!1));n.sort((e,t)=>e.label.localeCompare(t.label)),this.rootNodes=n}catch(e){let t=e instanceof Error?e.message:String(e);this.loadError=t,this.rootNodes=[]}finally{this.loading=!1,await this.selectFirstFolder()}}async resourceToTreeNode(e,t=!0){let n=e instanceof P,r={resource:e,label:e.getName(),leaf:n,children:[]};if(e instanceof F&&t){for(let t of await e.listChildren(!1))r.children.push(await this.resourceToTreeNode(t,!1));r.children.sort((e,t)=>e.label.localeCompare(t.label))}return r}workspacePath(e){let t=e.getWorkspacePath();return typeof t==`string`?t:null}async selectFirstFolder(){if(this.mode!==`directory`||this.selectedPath)return;let e=this.rootNodes.find(e=>e.resource instanceof F);if(!e)return;this.selectedPath=this.workspacePath(e.resource),await this.updateComplete;let t=this.renderRoot.querySelectorAll(`wa-tree-item`);for(let e of t){let t=e.model;if(t&&this.isSelected(t)){e.selected=!0;return}}}isSelected(e){return this.selectedPath!=null&&this.workspacePath(e.resource)===this.selectedPath}handleSelectionChange(e){let t=e.detail&&e.detail.selection||[];if(!t||t.length===0){this.selectedPath=null,this.requestUpdate();return}let n=t[0]?.model?.resource;if(!n){this.selectedPath=null,this.requestUpdate();return}let r=n instanceof F,i=n instanceof P;if(this.mode===`file`&&!i){this.selectedPath=null,this.requestUpdate();return}if(this.mode===`directory`&&i){let e=n.getParent?.();this.selectedPath=e?e.getWorkspacePath():null,this.requestUpdate();return}if(this.mode===`directory`&&!r){this.selectedPath=null,this.requestUpdate();return}this.selectedPath=this.workspacePath(n),this.requestUpdate()}renderTreeNode(e){return _`
      <wa-tree-item .model=${e} ?leaf=${e.leaf} .selected=${this.isSelected(e)}>
        ${e.label}
        ${e.children.map(e=>this.renderTreeNode(e))}
      </wa-tree-item>
    `}render(){return _`
      <div class="dialog-body">
        ${this.loadError?this.renderMessage(this.loadError,!1):null}

        <div class="browser-container">
          ${this.loading?_`<div>Loading workspace…</div>`:this.rootNodes.length>0?_`
                    <wa-tree @wa-selection-change=${e=>this.handleSelectionChange(e)}>
                      ${this.rootNodes.map(e=>this.renderTreeNode(e))}
                    </wa-tree>
                  `:_`<div>No workspace folders.</div>`}
        </div>

        <div class="selection-info">
          ${this.selectedPath?`Selected path: ${this.selectedPath}`:`No path selected yet.`}
        </div>
      </div>
    `}};K([u({type:String})],Ro.prototype,`mode`,void 0),K([d()],Ro.prototype,`selectedPath`,void 0),K([d()],Ro.prototype,`rootNodes`,void 0),K([d()],Ro.prototype,`loading`,void 0),K([d()],Ro.prototype,`loadError`,void 0),Ro=K([i(`docks-filebrowser-dialog`)],Ro),D.registerContribution(_a,{id:`filebrowser-dialog`,label:`Select Path`,buttons:[va,ya],component:e=>_`<docks-filebrowser-dialog .mode=${e?.mode??`either`}></docks-filebrowser-dialog>`,onButton:async(e,t,n)=>(n&&(e===`ok`?n.resolve(t||null):n.resolve(null)),!0)});function zo(e=`either`){return new Promise(t=>{wa.open(`filebrowser-dialog`,{resolve:t,mode:e})})}var Bo=`view.filebrowser`,Vo=`view.logTerminal`,Ho=`toolbar.info`,Uo=`toolbar.fastViews`,Wo=`toolbar.languageSelector`,Go=`toolbar.layoutSwitcher`,Ko=`toolbar.themeSwitcher`,qo=`toolbar.fullscreen`,Jo=`toolbar.activePartName`,Yo=`toolbar.tasks`,Xo=`sidebar.toolbar.extensions`,Zo=`system.icons.default`,Qo=`about.tab.release`,$o=`about.tab.packages`,es=`about.tab.attributions`,ts=`attribution.eclipse-docks`,ns=`attribution.font-awesome`,rs=`contextmenu.filebrowser.rename`,is=`contextmenu.filebrowser.delete`,as=class extends ma{},os=class e extends as{constructor(...e){super(...e),this.scrollMode=`scroller`,this.dirty=!1,this.isEditor=!1,this.embedded=!1,this.autoSave=!1,this.autoSaveDelay=1e3,this.autoSaveRunning=!1,this.autoSaveEpoch=0,this.onContentContextMenu=async e=>{let t=this.renderRoot.querySelector(`docks-contextmenu`);t&&await t.show({x:e.clientX,y:e.clientY},e)&&e.preventDefault()}}getCommandStack(){return this.commandStack}renderToolbar(){return v}activateContainingTab(){let e=this,t=null,n=null;for(;e;){let r=e.tagName?.toLowerCase();if(r===`wa-tab-panel`&&(t=e.getAttribute(`name`)),r===`docks-tabs`){n=e;break}let i=e.parentElement;if(i)e=i;else{let t=e.getRootNode();e=t instanceof ShadowRoot?t.host:null}}n&&t!=null&&t!==``&&n.activate(t)}renderContextMenu(){return v}renderContent(){return v}getToolbarTarget(){let e=this.tabContribution?.editorId??this.id??this.tabContribution?.name;return e?`toolbar:${e}`:void 0}getContextMenuTarget(){let e=this.tabContribution?.editorId??this.id??this.tabContribution?.name;return e?`contextmenu:${e}`:void 0}syncIsEditorCapability(){let t=this.save!==e.prototype.save;t!==this.isEditor&&(this.isEditor=t)}maybeActivateForCoupledEditors(){let t=this.tabContribution?.coupledEditors;if(!t?.length)return;let n=Me.get();if(!(n instanceof e))return;let r=n.tabContribution?.editorId;r&&t.includes(r)&&this.activateContainingTab()}render(){let e=this.getToolbarTarget(),t=this.getContextMenuTarget(),n=this.tabContribution?.toolbar!==!1,r=this.tabContribution?.contextMenu!==!1,i=this.scrollMode,a=this.isEditor?[`system.editors`,`.system.editors`]:[],o=this.renderContent(),s=i===`scroller`?_`
                <wa-scroller class="part-content-scroll" orientation="vertical">
                    <div class="part-content-inner">${o}</div>
                </wa-scroller>
            `:_`<div class="part-content-inner">${o}</div>`;return _`
            <div class="part-shell">
                ${n?_`
                    <docks-toolbar
                        class="part-toolbar"
                        id=${p(e)}
                        .scopeTokens=${a}
                        .partToolbarRenderer=${()=>this.renderToolbar()}>
                    </docks-toolbar>
                `:v}
                <div class="part-content ${i===`native`?`native-scroll`:``}" @contextmenu=${r?this.onContentContextMenu:void 0}>
                    ${s}
                </div>
                ${r?_`
                    <docks-contextmenu
                        id=${p(t)}
                        .scopeTokens=${a}
                        .partContextMenuRenderer=${()=>this.renderContextMenu()}>
                    </docks-contextmenu>
                `:v}
            </div>
        `}updated(e){super.updated(e),this.syncIsEditorCapability(),e.has(`tabContribution`)&&this.maybeActivateForCoupledEditors(),e.has(`dirty`)&&e.get(`dirty`)!==void 0&&this.dispatchEvent(new CustomEvent(`dirty`,{detail:this.dirty,bubbles:!0}))}doClose(){}disconnectedCallback(){this.flushAutoSave(),super.disconnectedCallback()}close(){this.flushAutoSave(),this.doClose()}connectedCallback(){super.connectedCallback(),this.syncIsEditorCapability(),queueMicrotask(()=>this.syncIsEditorCapability()),this.watch(Me,()=>this.maybeActivateForCoupledEditors())}save(){}isDirty(){return this.dirty}markDirty(e){this.dirty=e,Ne.set(null),Ne.set(this),O.set(null),O.set(this),e&&this.autoSaveEpoch++,this.queueAutoSave()}queueAutoSave(){this.autoSaveTimer!==void 0&&(clearTimeout(this.autoSaveTimer),this.autoSaveTimer=void 0),this.autoSave&&this.dirty&&(this.autoSaveTimer=setTimeout(()=>{this.autoSaveTimer=void 0,this.runAutoSave()},this.autoSaveDelay))}flushAutoSave(){this.autoSaveTimer!==void 0&&(clearTimeout(this.autoSaveTimer),this.autoSaveTimer=void 0),this.runAutoSave()}runAutoSave(){if(!this.autoSave||!this.dirty)return;if(this.autoSaveRunning){this.queueAutoSave();return}this.autoSaveRunning=!0;let e=this.autoSaveEpoch,t;try{t=this.save()}catch(t){console.error(t),this.finishAutoSave(e);return}Promise.resolve(t).catch(e=>console.error(e)).finally(()=>this.finishAutoSave(e))}finishAutoSave(e){this.autoSaveRunning=!1,this.autoSave&&this.dirty&&this.autoSaveEpoch!==e&&this.queueAutoSave()}static{this.baseStyles=n`
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

    `}static finalizeStyles(t){let n=super.finalizeStyles(t);return[e.baseStyles,...n]}};K([u()],os.prototype,`dirty`,void 0),K([u({attribute:!1})],os.prototype,`tabContribution`,void 0),K([u({type:Boolean,attribute:!1})],os.prototype,`isEditor`,void 0),K([u({type:Boolean,reflect:!0})],os.prototype,`embedded`,void 0);var ss=ge(`ReleaseHistory`);async function cs(e){if(!e)return[];if(typeof e!=`function`)return e;try{return await e()}catch(e){return ss.error(`Failed to load release history from app: ${e instanceof Error?e.message:String(e)}`),[]}}function ls(e,t){return e.replace(/^v/i,``)===t.replace(/^v/i,``)}function us(e,t){let n=t.replace(/^v/i,``).split(`.`).map(Number),r=e.replace(/^v/i,``).split(`.`).map(Number);for(let e=0;e<Math.max(n.length,r.length);e++){let t=n[e]||0,i=r[e]||0;if(i>t)return!0;if(i<t)return!1}return!1}var ds=class extends os{constructor(...e){super(...e),this.scrollMode=`none`,this.appVersion=`0.0.0`,this.releases=[],this.currentReleaseIndex=0}static{this.styles=[n`
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
        `]}doInitUI(){this.load()}async load(){let e=Co.getCurrentApp();this.appVersion=e?.version??`0.0.0`,this.releases=await cs(e?.releaseHistory);let t=this.releases.findIndex(e=>ls(e.tag_name,this.appVersion));this.currentReleaseIndex=t>=0?t:0,this.notifyChanged()}getNavState(){return{hasMultiple:this.releases.length>1,atOldest:this.currentReleaseIndex>=this.releases.length-1,atNewest:this.currentReleaseIndex<=0}}showOlder(){this.currentReleaseIndex<this.releases.length-1&&(this.currentReleaseIndex+=1,this.notifyChanged())}showNewer(){this.currentReleaseIndex>0&&(--this.currentReleaseIndex,this.notifyChanged())}notifyChanged(){this.dispatchEvent(new CustomEvent(`release-history-changed`,{bubbles:!0,composed:!0}))}renderContent(){let e=this.releases[this.currentReleaseIndex];if(!e)return _`<div class="release-panel">No release history available.</div>`;let t=ls(e.tag_name,this.appVersion),n=!t&&us(e.tag_name,this.appVersion),r=e.body?pa(e.body):``;return _`
            <div class="release-panel">
                <p>
                    <strong>Version:</strong> ${e.tag_name}${t?` (Current)`:``}
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
                ${n?_`
                        <wa-callout variant="warning">
                            <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
                            A newer release is available than the version you are running.
                            Use <strong>Update Available</strong> in the toolbar when it appears.
                        </wa-callout>
                    `:``}
                ${r?_`<div class="release-body">${s(r)}</div>`:``}
            </div>
        `}};K([d()],ds.prototype,`appVersion`,void 0),K([d()],ds.prototype,`releases`,void 0),K([d()],ds.prototype,`currentReleaseIndex`,void 0),ds=K([i(`docks-release-history`)],ds);var fs={hasMultiple:!1,atOldest:!0,atNewest:!0},ps=class extends ha{constructor(...e){super(...e),this.label=``,this.activeTab=null,this.releaseNav=fs,this.onReleaseHistoryChanged=()=>{this.syncReleaseNav()}}static{this.styles=[...ha.styles,n`
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
        `]}firstUpdated(e){super.firstUpdated(e),this.addEventListener(`release-history-changed`,this.onReleaseHistoryChanged),this.updateComplete.then(()=>{this.attachTabListener(),this.syncActiveTab(),this.syncReleaseNav()})}disconnectedCallback(){this.removeEventListener(`release-history-changed`,this.onReleaseHistoryChanged),super.disconnectedCallback()}attachTabListener(){let e=this.getAboutTabs()?.shadowRoot?.querySelector(`wa-tab-group`);e&&!e.hasAttribute(`data-version-info-listener`)&&(e.setAttribute(`data-version-info-listener`,``),e.addEventListener(`wa-tab-show`,e=>{let t=e.detail?.name;t&&(this.activeTab=t)}))}getAboutTabs(){return this.renderRoot.querySelector(`docks-tabs`)}getReleaseHistory(){let e=this.getAboutTabs()?.getTabPart(Qo);return e instanceof ds?e:null}syncActiveTab(){let e=this.getAboutTabs()?.shadowRoot?.querySelector(`wa-tab-group`);this.activeTab=e?.getAttribute(`active`)||e?.active||null}syncReleaseNav(){this.releaseNav=this.getReleaseHistory()?.getNavState()??fs}handleClose(){let e=this.renderRoot.querySelector(`wa-dialog`);if(e&&e.open!==!1){e.open=!1;return}this.close?.()}handleAfterHide(){this.onAfterHide?.()}showOlderRelease(){this.getReleaseHistory()?.showOlder()}showNewerRelease(){this.getReleaseHistory()?.showNewer()}render(){let e=Co.getCurrentApp(),t=this.activeTab===`about.tab.release`&&this.releaseNav.hasMultiple;return _`
            <wa-dialog
                label=${this.label}
                open
                light-dismiss
                with-footer
                @wa-after-hide=${this.handleAfterHide}
            >
                <div class="dialog-body">
                    ${e?.description?_`<small>${e.description}</small>`:``}
                    <docks-tabs id=${zi} fill-height></docks-tabs>
                </div>
                <div slot="footer" class="dialog-footer">
                    ${t?_`
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
                        `:v}
                    <wa-button variant="primary" @click=${this.handleClose}>Close</wa-button>
                </div>
            </wa-dialog>
        `}};K([u({type:String})],ps.prototype,`label`,void 0),K([u({attribute:!1})],ps.prototype,`close`,void 0),K([u({attribute:!1})],ps.prototype,`onAfterHide`,void 0),K([d()],ps.prototype,`activeTab`,void 0),K([d()],ps.prototype,`releaseNav`,void 0),ps=K([i(`docks-version-info-dialog`)],ps),D.registerContribution(_a,{id:`version-info`,label:`About`,selfContained:!0,component:e=>_`
        <docks-version-info-dialog
            .label=${e?.label??``}
            .close=${e?.close}
            .onAfterHide=${e?.onAfterHide}
        ></docks-version-info-dialog>
    `});function ms(){let e=Co.getCurrentApp();return wa.open(`version-info`,{label:`About ${e?.name??``} - ${e?.version??`0.0.0`}`})}function hs(e){if(e.localName!==`wa-dropdown`)return!1;let t=e;return t.open===!0||t.hasAttribute(`open`)}function gs(e){let t=e.composedPath().filter(e=>e instanceof Element);if(t.length>0)return t;if(!(e.target instanceof Element))return[];let n=[],r=e.target;for(;r;){n.push(r);let e=r.getRootNode();if(e instanceof ShadowRoot){r=e.host;continue}r=r.parentElement}return n}function _s(e){if(hs(e))return!0;if(e.localName!==`wa-dropdown-item`)return!1;let t=e.closest(`wa-dropdown`);if(t&&hs(t))return!0;let n=e.getRootNode();return n instanceof ShadowRoot&&n.host instanceof Element&&hs(n.host)}function vs(e){return gs(e).some(_s)}function ys(e){e.cancelable&&vs(e)&&e.preventDefault()}var bs=!1;function xs(){bs||typeof document>`u`||(bs=!0,document.addEventListener(`contextmenu`,ys,{capture:!0}))}function Ss(e,t){if(e instanceof Element){t(e),e.shadowRoot&&Ss(e.shadowRoot,t);for(let n of e.children)Ss(n,t)}else if(e instanceof DocumentFragment)for(let n of e.children)Ss(n,t)}function Cs(e){let t=[];return Ss(e,e=>{e.localName===`wa-dropdown-item`&&t.push(e)}),t}function ws(e,t){queueMicrotask(()=>{for(let n of Cs(t))n!==e&&n.submenuOpen&&(n.submenuOpen=!1)})}function Ts(e){let t=(e??``).trim();if(!t)return{name:``};let n=t.split(/\s+/);return n.length<=1?{name:t}:{name:n.pop(),library:n.join(` `)}}function X(e,t){let{name:n,library:r}=Ts(e??``);return _`<wa-icon library=${r??v} name=${n} label=${t?.label??v} slot=${t?.slot??v}></wa-icon>`}var Es=150;function Ds(e,t,n,r,i){let a=`Toolbar ${e??`default`}`,o=n.filter(t=>t.slot===e&&r(t)&&Oe(t)),s=e===`start`?_`<slot name="start"></slot>`:e===`end`?_`<slot name="end"></slot>`:_`<slot></slot>`;return _`
        <wa-button-group orientation=${t} label=${a}>
            ${s}
            ${o.map(i)}
        </wa-button-group>
    `}var Os=class extends ma{constructor(...e){super(...e),this.position=`start`,this.orientation=`horizontal`,this.align=`start`,this.size=`s`,this.scopeTokens=[],this.partToolbarContent=void 0,this.partToolbarRenderer=void 0,this.contributions=[],this.compact=!1,this.resizeObserver=null,this.resizeDebounceTimer=null,this.overflowCheckScheduled=!1,this.onResize=()=>{this.resizeDebounceTimer!==null&&clearTimeout(this.resizeDebounceTimer),this.resizeDebounceTimer=setTimeout(()=>{this.resizeDebounceTimer=null,this.updateCompactFromSpace()},Es)}}updateCompactFromSpace(){let e=this.shadowRoot?.querySelector(`.toolbar-items`);if(!e)return;let t=e.scrollWidth>e.clientWidth;this.compact!==t&&(this.compact=t)}scheduleOverflowCheck(){this.overflowCheckScheduled||(this.overflowCheckScheduled=!0,requestAnimationFrame(()=>{this.overflowCheckScheduled=!1,this.updateCompactFromSpace()}))}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(this.onResize),this.resizeObserver.observe(this)}disconnectedCallback(){this.resizeObserver?.disconnect(),this.resizeObserver=null,this.resizeDebounceTimer!==null&&(clearTimeout(this.resizeDebounceTimer),this.resizeDebounceTimer=null),super.disconnectedCallback()}updated(e){super.updated?.(e),this.compact||this.scheduleOverflowCheck()}willUpdate(e){super.willUpdate?.(e),e.has(`scopeTokens`)&&this.refreshContributions()}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===`id`&&t!==n&&this.refreshContributions()}doBeforeUI(){this.refreshContributions(),r(E,e=>{let t=this.getAttribute(`id`);t&&this.matchesTarget(t,e.target)&&this.refreshContributions()})}refreshContributions(){let e=this.getAttribute(`id`);if(!e){this.contributions=[];return}this.loadContributions(e)}matchesTarget(e,t){if(t===e)return!0;if(!e.includes(`:`))return!1;let[n]=e.split(`:`);if(t===`${n}:*`)return!0;let r=t.split(`:`);if(r.length===2){let t=r[1];if(this.scopeTokens.includes(t))return e.startsWith(`${n}:`)}return!1}loadContributions(e){let t=D.getContributions(e);if(!e.includes(`:`)){this.contributions=t;return}let[n]=e.split(`:`),r=`${n}:*`,i=D.getContributions(r),a=[];for(let e of this.scopeTokens){let t=`${n}:${e}`,r=D.getContributions(t);a.push(...r)}this.contributions=[...i,...a,...t]}isToolbarItem(e){return`command`in e||`component`in e}contributionCreator(e){if(`command`in e){let t=e,n=!this.compact&&!!t.showLabel;return _`
                <wa-button @click=${()=>void this.executeCommand(t.command,t.params||{})}
                           title=${t.label}
                           ?disabled="${ke(t)}"
                           appearance="plain" size=${this.size}>
                    ${X(t.icon,{label:t.label})}
                    ${n?t.label:``}
                </wa-button>
            `}if(`component`in e){let t=e.component;return t instanceof Function?t():s(t)}return _`<span>unknown contribution type: ${typeof e}</span>`}render(){let e=this.partToolbarRenderer?this.partToolbarRenderer():this.partToolbarContent?this.partToolbarContent:``,t=this.orientation===`vertical`?`column`:`row`,n={start:`flex-start`,center:`center`,end:`flex-end`},r=this.contributionCreator.bind(this),i=this.isToolbarItem.bind(this);return _`
            <div class="toolbar-items" style=${te({"flex-direction":t,"align-items":n[this.align],"justify-content":this.position})}>
                ${Ds(`start`,this.orientation,this.contributions,i,r)}
                ${e}
                ${Ds(void 0,this.orientation,this.contributions,i,r)}
                ${Ds(`end`,this.orientation,this.contributions,i,r)}
            </div>
        `}static{this.styles=n`
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
    `}};K([u()],Os.prototype,`position`,void 0),K([u({reflect:!0})],Os.prototype,`orientation`,void 0),K([u({reflect:!0})],Os.prototype,`align`,void 0),K([u({reflect:!0})],Os.prototype,`size`,void 0),K([u({attribute:!1})],Os.prototype,`scopeTokens`,void 0),K([u({attribute:!1})],Os.prototype,`partToolbarContent`,void 0),K([u({attribute:!1})],Os.prototype,`partToolbarRenderer`,void 0),K([d()],Os.prototype,`contributions`,void 0),K([d()],Os.prototype,`compact`,void 0),Os=K([i(`docks-toolbar`)],Os);function ks(e){let t=e.getAttribute(`data-params`);if(!t)return{};try{return JSON.parse(t)}catch{return{}}}function As(e){return e.getAttribute(`data-cmd`)||e.getAttribute(`value`)||void 0}function js(e){let t=e.detail?.item;if(!t||t.disabled||t.hasAttribute(`disabled`))return;let n=As(t);n&&A.execute(n,A.createExecutionContext(ks(t)))}function Ms(e){return t=>{De(e.disabled,!1)||(t.stopPropagation(),e.action?.(t))}}function Ns(e){if(!e)return v;let t=da.getKeyBindingsForCommand(e);return t.length===0?v:_`<span slot="details">${t[0]}</span>`}function Ps(e){let t=e.icon??``,n=e.params&&Object.keys(e.params).length>0?JSON.stringify(e.params):void 0;return _`
        <wa-dropdown-item
            slot=${e.slot??v}
            variant=${e.variant??`default`}
            value=${e.cmd??v}
            data-cmd=${e.cmd??v}
            data-params=${n??v}
            ?disabled=${De(e.disabled,!1)}
            @click=${e.action?Ms(e):v}>
            ${t?X(t,{label:e.title??e.label,slot:`icon`}):v}
            ${e.label}
            ${Ns(e.cmd)}
        </wa-dropdown-item>
    `}function Fs(e,t){return Oe(e)?Ps({cmd:e.command,icon:e.icon,label:e.label,params:e.params,disabled:e.disabled,slot:t?.slot}):v}function Is(e,t){if(`command`in e)return Fs(e,t);if(`component`in e){if(!Oe(e))return v;let t=e.component;return t instanceof Function?t():_`${s(t)}`}return v}function Ls(e,t){let n=D.getContributions(e).map(e=>Is(e,t)).filter(e=>e!==v);return _`${n}`}function Rs(e){return _`
        <wa-dropdown-item ?disabled=${De(e.disabled,!1)}>
            ${e.icon?X(e.icon,{label:e.title??e.label,slot:`icon`}):v}
            ${e.label}
            ${Ls(e.contributionTarget,{slot:`submenu`})}
        </wa-dropdown-item>
    `}var zs=class extends ma{constructor(...e){super(...e),this.scopeTokens=[],this.partContextMenuRenderer=void 0,this.contributions=[],this.isOpen=!1,this.menuPosition={x:0,y:0},this.virtualAnchor={getBoundingClientRect:()=>{let{x:e,y:t}=this.menuPosition;return new DOMRect(e,t,0,0)}},this.dropdownRef=f(),this.boundHandleDocumentPointerDown=this.handleDocumentPointerDown.bind(this),this.handleSubmenuOpening=e=>{let t=this.dropdownRef.value,n=e.detail?.item;t&&n&&ws(n,t)}}handleDocumentPointerDown(e){if(!this.isOpen)return;let t=e.composedPath();this.dropdownRef.value&&t.includes(this.dropdownRef.value)||t.some(e=>e.getAttribute?.(`part`)===`submenu`)||this.onClose()}doBeforeUI(){this.refreshContributions(),r(E,e=>{let t=this.getAttribute(`id`);t&&this.matchesTarget(t,e.target)&&(this.refreshContributions(),this.requestUpdate())})}willUpdate(e){super.willUpdate?.(e),e.has(`scopeTokens`)&&this.refreshContributions()}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===`id`&&t!==n&&this.refreshContributions()}refreshContributions(){let e=this.getAttribute(`id`);if(!e){this.contributions=[];return}this.loadContributions(e)}matchesTarget(e,t){if(t===e)return!0;if(!e.includes(`:`))return!1;let[n]=e.split(`:`);if(t===`${n}:*`)return!0;let r=t.split(`:`);if(r.length===2){let t=r[1];if(this.scopeTokens.includes(t))return e.startsWith(`${n}:`)}return!1}loadContributions(e){let t=D.getContributions(e);if(!e.includes(`:`)){this.contributions=t;return}let[n]=e.split(`:`),r=`${n}:*`,i=D.getContributions(r),a=[];for(let e of this.scopeTokens){let t=`${n}:${e}`,r=D.getContributions(t);a.push(...r)}this.contributions=[...i,...a,...t]}hasMenuBody(){return this.refreshContributions(),this.contributions.length>0||(this.partContextMenuRenderer?this.partContextMenuRenderer():v)!==v}getElementFromPoint(e,t){let n=document.elementFromPoint(e,t);if(!n)return null;for(;n;){let r=n.shadowRoot;if(r){let i=r.elementFromPoint(e,t);if(i&&i!==n){n=i;continue}}break}return n}getHostPart(){let e=this.getRootNode();return e instanceof ShadowRoot&&e.host instanceof HTMLElement?e.host:null}triggerClickUnderCursor(e){let t=this.getElementFromPoint(e.clientX,e.clientY);if(t){let n=new MouseEvent(`click`,{bubbles:!0,cancelable:!0,view:window,clientX:e.clientX,clientY:e.clientY,screenX:e.screenX,screenY:e.screenY,button:0,buttons:0,detail:1,which:1});t.dispatchEvent(n)}}async show(e,t){return this.hasMenuBody()?(t&&(this.triggerClickUnderCursor(t),await this.getHostPart()?.updateComplete),this.isOpen&&(this.isOpen=!1,await this.updateComplete),this.menuPosition=e,this.isOpen=!0,await this.updateComplete,this.syncVirtualPopupAnchor(),document.addEventListener(`pointerdown`,this.boundHandleDocumentPointerDown,{capture:!0}),!0):!1}syncVirtualPopupAnchor(){let e=this.dropdownRef.value?.shadowRoot?.querySelector(`wa-popup`);e&&(e.anchor=this.virtualAnchor,e.reposition())}onClose(){this.isOpen&&(this.isOpen=!1,document.removeEventListener(`pointerdown`,this.boundHandleDocumentPointerDown,{capture:!0}))}updated(e){super.updated(e),e.has(`isOpen`)&&this.isOpen&&this.syncVirtualPopupAnchor()}renderContribution(e){return Is(e)}render(){let e=this.partContextMenuRenderer?this.partContextMenuRenderer():v;return _`
            <wa-dropdown
                ${a(this.dropdownRef)}
                ?open=${this.isOpen}
                @submenu-opening=${this.handleSubmenuOpening}
                @wa-select=${js}
                @wa-after-hide=${this.onClose}>
                <span slot="trigger" hidden aria-hidden="true"></span>
                
                ${e}
                ${this.contributions.map(e=>this.renderContribution(e))}
            </wa-dropdown>
        `}static{this.styles=n`
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
    `}};K([u({attribute:!1})],zs.prototype,`scopeTokens`,void 0),K([u({attribute:!1})],zs.prototype,`partContextMenuRenderer`,void 0),K([d()],zs.prototype,`contributions`,void 0),K([d()],zs.prototype,`isOpen`,void 0),zs=K([i(`docks-contextmenu`)],zs);var Bs,Vs=class extends as{static{Bs=this}constructor(...e){super(...e),this.placement=`top`,this.iconOnly=!1,this.withToolbar=!1,this.hideTabs=!1,this.fitContent=!1,this.fillHeight=!1,this.itemSize=`m`,this.contributions=[],this.tabGroup=f(),this.containerId=null,this.tabGroupListenersAttached=!1}doBeforeUI(){if(this.containerId=this.getAttribute(`id`),!this.containerId)throw Error(`docks-tabs requires an 'id' attribute to function`);this.loadAndResolveContributions()}doInitUI(){this.updateComplete.then(()=>this.ensureTabGroupListenersAndActivate()),r(E,e=>{if(!this.containerId)return;let t=`${this.containerId}-toolbar`;e.target!==t&&e.target===this.containerId&&(this.loadAndResolveContributions(),this.requestUpdate(),this.updateComplete.then(()=>{this.activateNextAvailableTab()}))})}updated(e){super.updated(e),this.contributions.length>0&&this.tabGroup.value&&this.updateComplete.then(()=>this.ensureTabGroupListenersAndActivate()),e.has(`contributions`)&&(this.contributions.length===0&&(this.tabGroupListenersAttached=!1),this.contributions.forEach(e=>{let t=this.getTabPanel(e.name);if(!t)return;let n=this.getPartFromPanel(t);n&&(n.tabContribution=e)}))}has(e){return this.tabGroup.value?!!this.getTabPanel(e):!1}activate(e){if(!this.tabGroup.value)return;this.tabGroup.value.setAttribute(`active`,e);let t=this.getTabPanel(e);t&&this.syncActiveSignalsFromPanel(t)}getActiveEditor(){return this.tabGroup.value?this.tabGroup.value.getAttribute(`active`):null}getTabPart(e){let t=this.getTabPanel(e);return t?this.getPartFromPanel(t):null}open(e){if(this.contributions.find(t=>t.name===e.name)){this.activate(e.name);return}this.contributions.push(e),this.requestUpdate(),this.updateComplete.then(()=>{requestAnimationFrame(()=>{let t=this.getTabPanel(e.name);if(!t)return;let n=this.getPartFromPanel(t);n&&(n.tabContribution=e),this.activate(e.name)})})}handleTabAuxClick(e,t){e.button===Ji.MIDDLE&&t.closable&&this.closeTab(e,t.name)}async closeTab(e,t){e.stopPropagation(),await this.tryCloseTab(t,!0)}updateTabLabel(e,t){let n=this.contributions.find(t=>t.name===e);n&&(n.label=t,this.contributions=[...this.contributions],this.requestUpdate())}async closeAllTabs(){let e=[...this.contributions.map(e=>e.name)];for(let t of e)if(!await this.tryCloseTab(t,!0))return!1;return!0}async tryCloseTab(e,t){if(t&&this.isDirty(e)&&!await Fo(`Unsaved changes will be lost: Do you really want to close?`))return!1;let n=this.getTabPanel(e);if(!n)return!0;let r=this.contributions.find(t=>t.name===e);if(!r)return!0;if(r.beforeClose&&!await r.beforeClose())return!1;this.cleanupTabInstance(n),this.clearActiveSignalsIfPartInPanel(n);let i=this.contributions.indexOf(r);return i>-1&&this.contributions.splice(i,1),this.requestUpdate(),this.updateComplete.then(()=>{this.activateNextAvailableTab()}),!0}markDirty(e,t){let n=this.getTab(e);n&&n.classList.toggle(`part-dirty`,t)}isDirty(e){let t=this.getTab(e);return!!t&&t.classList.contains(`part-dirty`)}loadAndResolveContributions(){this.containerId&&(this.contributions=D.getContributions(this.containerId),this.requestUpdate())}cleanupTabInstance(e){let t=this.getPartFromPanel(e);t&&`close`in t&&typeof t.close==`function`&&t.close()}ensureTabGroupListenersAndActivate(){if(!this.tabGroup.value||this.tabGroupListenersAttached)return;this.tabGroupListenersAttached=!0;let e=this.tabGroup.value;e.addEventListener(`wa-tab-show`,e=>{let t=this.getTabPanel(e.detail.name);t&&this.syncActiveSignalsFromPanel(t)}),e.addEventListener(`click`,e=>{let t=e.target,n=t.closest(`wa-tab`);if(n){let e=n.getAttribute(`panel`);if(e){let t=this.getTabPanel(e);t&&this.syncActiveSignalsFromPanel(t)}return}let r=t.closest(`wa-tab-panel`);r&&this.syncActiveSignalsFromPanel(r)}),this.dirtySignalCleanup?.(),this.dirtySignalCleanup=He(Ne,e=>{if(!e)return;let t=e.closest(`wa-tab-panel`);if(!t)return;let n=t.getAttribute(`name`);n&&this.markDirty(n,e.isDirty())}),this.activateNextAvailableTab()}disconnectedCallback(){this.dirtySignalCleanup?.(),this.dirtySignalCleanup=void 0,super.disconnectedCallback()}activateNextAvailableTab(){if(!this.tabGroup.value)return;let e=this.tabGroup.value.querySelectorAll(`wa-tab`);if(e.length>0){let t=e.item(0).getAttribute(`panel`);t&&this.tabGroup.value.setAttribute(`active`,t)}else this.tabGroup.value.removeAttribute(`active`)}getTabPanel(e){return this.tabGroup.value?this.tabGroup.value.querySelector(`wa-tab-panel[name='${e}']`):null}getTab(e){return this.tabGroup.value?this.tabGroup.value.querySelector(`wa-tab[panel='${e}']`):null}syncActiveSignalsFromPanel(e){let t=this.getPartFromPanel(e);t instanceof os&&(O.set(null),O.set(t),this.containerId===`editor-area-main`&&t.isEditor&&(Me.set(null),Me.set(t)))}clearActiveSignalsIfPartInPanel(e){let t=Array.from(e.querySelectorAll(`*`)).filter(e=>e instanceof os);for(let e of t)O.get()===e&&O.set(null),Me.get()===e&&Me.set(null)}getPartFromPanel(e){let t=e.firstElementChild;return t instanceof os?t:null}static{this.MAX_TAB_LABEL=16}truncateTabLabel(e){if(!e||e.length<=Bs.MAX_TAB_LABEL)return e;let t=Bs.MAX_TAB_LABEL-1,n=Math.floor(t/2);return e.slice(0,n)+`…`+e.slice(-(t-n))}withToolbarOrientation(){return this.placement===`start`||this.placement===`end`?`vertical`:`horizontal`}renderNavToolbar(e){return!this.withToolbar||!e?v:_`
            <div class="nav-toolbar-spacer" slot="nav" aria-hidden="true"></div>
            <docks-toolbar
                slot="nav"
                id=${e}
                orientation=${this.withToolbarOrientation()}
                align="center"
                size=${this.itemSize}
            ></docks-toolbar>
        `}renderEmptyState(){let e=Co.getCurrentApp();return _`
            <div class="empty-state">
                ${h(e,()=>_`
                        <div class="empty-content">
                            <h2 class="empty-title">${e.name}</h2>
                            ${h(e.description,()=>_`<p class="empty-description">${e.description}</p>`)}
                        </div>
                    `,()=>_`<wa-icon name="folder-open" class="empty-icon"></wa-icon>`)}
            </div>
        `}render(){let e=this.containerId??this.getAttribute(`id`),t=e?`${e}-toolbar`:``,n=this.withToolbar&&!!t;return this.contributions.length===0&&!n?this.renderEmptyState():this.contributions.length===0?_`
                <wa-tab-group ${a(this.tabGroup)} placement=${this.placement}>
                    ${this.renderNavToolbar(t)}
                </wa-tab-group>
            `:_`
            <wa-tab-group ${a(this.tabGroup)} placement=${this.placement}>
                ${ne(this.contributions,e=>e.name,e=>{let t=e.label??e.name,n=this.truncateTabLabel(t);return _`
                        <wa-tab panel="${e.name}"
                                title="${t}"
                                @auxclick="${t=>this.handleTabAuxClick(t,e)}">
                            ${X(e.icon,{label:t})}
                            ${this.iconOnly?v:n}
                            ${h(e.closable,()=>_`
                                <wa-icon name="xmark" label="Close"  @click="${t=>this.closeTab(t,e.name)}"></wa-icon>
                            `)}
                        </wa-tab>
                        <wa-tab-panel name="${e.name}">
                            ${e.component?e.component(e.name):v}
                        </wa-tab-panel>
                    `})}
                ${this.renderNavToolbar(t)}
            </wa-tab-group>
        `}static{this.styles=n`
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
    `}};K([u({reflect:!0})],Vs.prototype,`placement`,void 0),K([u({type:Boolean,reflect:!0,attribute:`icon-only`})],Vs.prototype,`iconOnly`,void 0),K([u({type:Boolean,reflect:!0,attribute:`with-toolbar`})],Vs.prototype,`withToolbar`,void 0),K([u({type:Boolean,reflect:!0,attribute:`hide-tabs`})],Vs.prototype,`hideTabs`,void 0),K([u({type:Boolean,reflect:!0,attribute:`fit-content`})],Vs.prototype,`fitContent`,void 0),K([u({type:Boolean,reflect:!0,attribute:`fill-height`})],Vs.prototype,`fillHeight`,void 0),K([u({reflect:!0,attribute:`item-size`})],Vs.prototype,`itemSize`,void 0),K([d()],Vs.prototype,`contributions`,void 0),Vs=Bs=K([i(`docks-tabs`)],Vs);var Hs,Us=class extends ma{static{Hs=this}constructor(...e){super(...e),this.orientation=`horizontal`,this.gridSizes=[],this.gridChildren=[],this.resizing=null,this.resizeOverlay=null,this.childStylesApplied=!1,this.refreshScheduled=!1,this.layoutGeneration=0,this.handleResize=e=>{if(!this.resizing)return;let t=(this.orientation===`horizontal`?e.clientX:e.clientY)-this.resizing.startPos,n=[...this.resizing.startSizes];n[this.resizing.handleIndex]+=t,n[this.resizing.handleIndex+1]-=t;let r=this.orientation===`horizontal`?this.offsetWidth:this.offsetHeight,i=r*.05;if(n[this.resizing.handleIndex]>=i&&n[this.resizing.handleIndex+1]>=i){this.resizing.currentSizes=n;let e=n.map((e,t)=>{let i=`${(e/r*100).toFixed(2)}%`;return t===n.length-1?i:`${i} ${Hs.HANDLE_VISUAL_SIZE_PX}px`}).join(` `);this.orientation===`horizontal`?this.style.gridTemplateColumns=e:this.style.gridTemplateRows=e}},this.stopResize=async()=>{if(this.resizing?.currentSizes){let e=this.orientation===`horizontal`?this.offsetWidth:this.offsetHeight;this.gridSizes=this.resizing.currentSizes.map(t=>`${(t/e*100).toFixed(2)}%`),await this.saveSizes(),this.requestUpdate()}this.resizeOverlay&&=(document.body.removeChild(this.resizeOverlay),null),this.resizing=null,document.removeEventListener(`mousemove`,this.handleResize),document.removeEventListener(`mouseup`,this.stopResize),document.body.style.cursor=``,document.body.style.userSelect=``}}static{this.HANDLE_VISUAL_SIZE_PX=1}static{this.HANDLE_HITBOX_PADDING_PX=4}createRenderRoot(){return this}doBeforeUI(){this.mutationObserver=new MutationObserver(()=>{this.scheduleRefreshGridLayout()}),this.mutationObserver.observe(this,{childList:!0,subtree:!1}),this.scheduleRefreshGridLayout()}scheduleRefreshGridLayout(){this.refreshScheduled||(this.refreshScheduled=!0,queueMicrotask(()=>{this.refreshScheduled=!1,this.refreshGridLayout()}))}getGridChildrenFromDom(){return Array.from(this.children).filter(e=>e.tagName!==`STYLE`&&e.tagName!==`SCRIPT`&&!e.classList.contains(`resize-handle`))}static isNestedResizableGrid(e){return e.tagName.toLowerCase()===`docks-resizable-grid`}applyChildLayoutStyles(){this.gridChildren.forEach((e,t)=>{e.style.overflow=`hidden`,e.style.height=`100%`,e.style.width=`100%`,e.style.gridColumn=this.orientation===`horizontal`?`${t*2+1}`:`1`,e.style.gridRow=this.orientation===`vertical`?`${t*2+1}`:`1`,Hs.isNestedResizableGrid(e)||(e.style.display=`flex`,e.style.flexDirection=`column`)})}resolveGridSizes(e){let t=this.sizes?.split(`,`).map(e=>e.trim()).filter(Boolean)??[];if(t.length===e)return t;let n=`${100/e}%`;return Array.from({length:e},()=>n)}resolvePersistedSizes(e,t){if(!e||typeof e!=`object`)return null;let n=e,r=n.sizesByCount?.[String(t)];return Array.isArray(r)&&r.length===t&&r.every(e=>typeof e==`string`)?r:Array.isArray(n.sizes)&&n.sizes.length===t&&n.sizes.every(e=>typeof e==`string`)?n.sizes:null}async refreshGridLayout(){let e=++this.layoutGeneration,t=this.getGridChildrenFromDom();if(t.length===0){this.gridChildren=[],this.gridSizes=[],this.childStylesApplied=!1,this.requestUpdate();return}let n=t.length!==this.gridChildren.length||t.some((e,t)=>e!==this.gridChildren[t]);this.gridChildren=t;let r=await this.getDialogSetting();if(e!==this.layoutGeneration)return;let i=this.resolvePersistedSizes(r,this.gridChildren.length);if(i){let e=i.join(`|`)!==this.gridSizes.join(`|`);this.gridSizes=i,(n||e)&&(this.childStylesApplied=!1),this.requestUpdate();return}let a=this.resolveGridSizes(this.gridChildren.length),o=a.join(`|`)!==this.gridSizes.join(`|`);this.gridSizes=a,(n||o)&&(this.childStylesApplied=!1),this.requestUpdate()}doInitUI(){this.scheduleRefreshGridLayout()}async saveSizes(){if(this.gridSizes.length===0)return;let e=await this.getDialogSetting(),t=e&&typeof e==`object`?e.sizesByCount??{}:{};await this.setDialogSetting({sizes:this.gridSizes,sizesByCount:{...t,[String(this.gridSizes.length)]:this.gridSizes},orientation:this.orientation})}updated(e){super.updated(e),e.has(`sizes`)&&this.scheduleRefreshGridLayout(),!this.childStylesApplied&&this.gridChildren.length>0&&(this.childStylesApplied=!0,this.applyChildLayoutStyles())}startResize(e,t){if(e.preventDefault(),t>=this.gridChildren.length-1)return;let n=this.orientation===`horizontal`?e.clientX:e.clientY,r=this.orientation===`horizontal`?this.offsetWidth:this.offsetHeight,i=this.gridSizes.map(e=>e.endsWith(`%`)?parseFloat(e)/100*r:(e.endsWith(`px`),parseFloat(e)));this.resizing={handleIndex:t,startPos:n,startSizes:i},this.resizeOverlay=document.createElement(`div`),this.resizeOverlay.style.position=`fixed`,this.resizeOverlay.style.top=`0`,this.resizeOverlay.style.left=`0`,this.resizeOverlay.style.width=`100%`,this.resizeOverlay.style.height=`100%`,this.resizeOverlay.style.zIndex=`9999`,this.resizeOverlay.style.cursor=this.orientation===`horizontal`?`col-resize`:`row-resize`,document.body.appendChild(this.resizeOverlay),document.addEventListener(`mousemove`,this.handleResize),document.addEventListener(`mouseup`,this.stopResize),document.body.style.cursor=this.orientation===`horizontal`?`col-resize`:`row-resize`,document.body.style.userSelect=`none`}render(){if(this.gridChildren.length===0||this.gridSizes.length===0)return v;let e=this.gridSizes.flatMap((e,t)=>t===this.gridSizes.length-1?[e]:[e,`${Hs.HANDLE_VISUAL_SIZE_PX}px`]).join(` `);return this.style.display=`grid`,this.orientation===`horizontal`?(this.style.gridTemplateColumns=e,this.style.gridTemplateRows=`100%`):(this.style.gridTemplateColumns=`100%`,this.style.gridTemplateRows=e),this.style.overflow=`hidden`,_`
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
                    right: -${Hs.HANDLE_HITBOX_PADDING_PX}px;
                    left: -${Hs.HANDLE_HITBOX_PADDING_PX}px;
                }

                .resize-handle.vertical::before {
                    top: -${Hs.HANDLE_HITBOX_PADDING_PX}px;
                    bottom: -${Hs.HANDLE_HITBOX_PADDING_PX}px;
                }
                
                .resize-handle:hover {
                    background-color: var(--wa-color-brand-fill-normal);
                }
            </style>
            
            ${this.gridChildren.map((e,t)=>{if(t<this.gridChildren.length-1){let e=this.orientation===`horizontal`?`${t*2+2}`:`1`,n=this.orientation===`vertical`?`${t*2+2}`:`1`;return _`
                        <div 
                            class="resize-handle ${this.orientation===`horizontal`?`horizontal`:`vertical`}"
                            style="
                                cursor: ${this.orientation===`horizontal`?`col-resize`:`row-resize`};
                                grid-column: ${e};
                                grid-row: ${n};
                            "
                            @mousedown=${e=>this.startResize(e,t)}
                        ></div>
                    `}return v})}
        `}disconnectedCallback(){super.disconnectedCallback(),this.resizing&&this.stopResize(),this.mutationObserver&&=(this.mutationObserver.disconnect(),void 0)}connectedCallback(){super.connectedCallback(),this.style.height=`100%`,this.style.width=`100%`}};K([u()],Us.prototype,`orientation`,void 0),K([u()],Us.prototype,`sizes`,void 0),K([d()],Us.prototype,`gridSizes`,void 0),K([d()],Us.prototype,`gridChildren`,void 0),Us=Hs=K([i(`docks-resizable-grid`)],Us),xs();var Ws=class extends We{constructor(...e){super(...e),this.message=`No content.`,this.icon=`info-circle`}render(){return _`
            <div class="empty" role="status">
                <div class="empty-icon-wrap" aria-hidden="true">
                    <wa-icon name=${this.icon} label=""></wa-icon>
                </div>
                <p class="empty-message">${this.message}</p>
            </div>
        `}static{this.styles=n`
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
    `}};K([u()],Ws.prototype,`message`,void 0),K([u()],Ws.prototype,`icon`,void 0),Ws=K([i(`docks-no-content`)],Ws);var Gs=`language`;function Ks(e,t){return t?e.replace(/\{(\w+)\}/g,(e,n)=>t[n]===void 0?e:t[n]):e}var qs=new Set([`en`]),Js=re(qs),Ys=null;function Xs(e){let t=!1;for(let n of e){let e=n.toLowerCase().replace(`-`,`_`);qs.has(e)||(qs.add(e),t=!0)}if(t&&(Js.set(new Set(qs)),Ys===null)){let e=Zs();e!==Qs.get()&&Qs.set(e)}}function Zs(){let e=navigator.languages?.length?navigator.languages:[navigator.language||`en`],t=Js.get();for(let n of e){let e=n.split(`-`)[0].toLowerCase();if(t.has(e))return e}return`en`}var Qs=re(Zs());async function $s(){let e=await q.get(Gs);Ys=e??null,Qs.set(e||Zs())}r(Zi,e=>{Ys=e?.language??null,Qs.set(e?.language||Zs())}),$s();function ec(e){return{toString:()=>e(),valueOf:()=>e(),[Symbol.toPrimitive]:()=>e(),toJSON:()=>e()}}async function tc(e,t=!1){let n={};await Promise.all(Object.entries(e).map(async([e,t])=>{let r=await t(),i=r&&`default`in r?r.default:r,a=(e.match(/\.([a-zA-Z-_]+)\.json$/)?.[1]??`en`).toLowerCase().replace(`-`,`_`);n[a]=i})),Xs(Object.keys(n));let r=e=>{let[t,r]=Qs.get().toLowerCase().replace(`-`,`_`).split(`_`),i=r?[`${t}_${r}`,t]:[t];i.push(`en`);for(let t of i){let r=n[t];if(r&&e in r)return r[e]}return e},i=Object.assign({},{then:void 0,catch:void 0,finally:void 0});return new Proxy(i,{get(e,n){if(n in e)return e[n];let i=r(n),a=(e=>Ks(r(n),e));return a.toString=()=>t?r(n):i,a.valueOf=()=>t?r(n):i,a[Symbol.toPrimitive]=()=>t?r(n):i,t&&(a.toJSON=()=>r(n)),a}})}var nc=new class{constructor(){this.editorInputHandlers=[],this.cachedIconContributions=null,r(Ze,()=>{}),r(E,e=>{e.target===`system.icons`&&(this.cachedIconContributions=null)})}getSortedIconContributions(){if(this.cachedIconContributions!==null)return this.cachedIconContributions;let e=D.getContributions(`system.icons`);return this.cachedIconContributions=[...e].sort((e,t)=>{let n=e.priority??0,r=t.priority??0;return r===n?e.label.localeCompare(t.label):r-n}),this.cachedIconContributions}registerEditorInputHandler(e){this.editorInputHandlers.push({definition:e,initialized:!1}),this.editorInputHandlers.sort((e,t)=>{let n=e.definition.ranking??0;return(t.definition.ranking??0)-n})}async ensureHandlerInitialized(e){let t=e.definition;t.lazyInit&&!e.initialized&&(e.lazyInitPromise||=Promise.resolve(t.lazyInit()).then(()=>{e.initialized=!0,e.lazyInitPromise=void 0}).catch(t=>{throw e.lazyInitPromise=void 0,t}),await e.lazyInitPromise)}getEditorOptionsForInput(e){let t=new Set,n=[];for(let r of this.editorInputHandlers){let i=r.definition;i.canHandle(e)&&!t.has(i.editorId)&&(t.add(i.editorId),n.push({editorId:i.editorId,title:i.label,icon:i.icon}))}return n}async handleInput(e,t){if(t!==void 0){let n=this.editorInputHandlers.find(e=>e.definition.editorId===t);if(n){await this.ensureHandlerInitialized(n);let t=await n.definition.handle(e);return t&&(t.editorId=n.definition.editorId),t}return}for(let t=0;t<this.editorInputHandlers.length;t++){let n=this.editorInputHandlers[t],r=n.definition;if(r.canHandle(e)){await this.ensureHandlerInitialized(n);let t=await r.handle(e);return t&&(t.editorId=r.editorId),t}}}getEditorArea(){return document.querySelector(`docks-tabs#${Bi}`)}tabLabelForEditorInput(e){return e.data instanceof P?e.data.getName():e.title}async loadEditor(e,t){if(!e||(`component`in e||(e=await this.handleInput(e,t)),!e||!(`component`in e)))return;let n=e.editorId??t;n&&(e.editorId=n);let r=e;await this.openTab({name:r.key,editorId:n,label:this.tabLabelForEditorInput(r),icon:r.icon,closable:!0,toolbar:r.toolbar,component:r.component})}async openTab(e,t){let n=this.getEditorArea();if(!n){console.error(`Editor area not found. The split pane system may not be initialized yet.`);return}if(t?.singleTab){if(!await n.closeAllTabs())return;n.open(e);return}if(n.has(e.name)){n.activate(e.name);return}n.open(e)}getFileIcon(e){let t=e.includes(`.`)?e.split(`.`).pop()?.toLowerCase()||``:e.toLowerCase(),n=this.getSortedIconContributions();if(n.length===0)return`file`;for(let e of n)if(e.mappings&&e.mappings[t])return e.mappings[t];return`file`}};y.put(`editorRegistry`,nc),D.registerContribution(`system.icons`,{label:`Default File Icons`,mappings:{pdf:`file-pdf`,md:`book`,txt:`file-lines`,ts:`code`,tsx:`code`,js:`code`,jsx:`code`,json:`file-code`,geojson:`file-code`,py:`docks python`,ipynb:`docks jupyter`,html:`code`,htm:`code`,css:`code`,scss:`code`,sass:`code`,xml:`file-code`,yaml:`file-code`,yml:`file-code`,sql:`database`,kml:`file-code`,gpx:`file-code`,jpg:`image`,jpeg:`image`,png:`image`,gif:`image`,svg:`image`,webp:`image`,bmp:`image`,ico:`image`},priority:0});var rc=(e,t)=>!e.leaf&&t.leaf?-1:e.leaf&&!t.leaf?1:e.label.localeCompare(t.label),ic,ac=ge(`DocksFileBrowser`),Z=await tc(Object.assign({"./filebrowser.de.json":()=>m(()=>import(`./filebrowser.de-BfFcNr19-C89R925P.js`),[]),"./filebrowser.en.json":()=>m(()=>import(`./filebrowser.en-CLd5Mccb-m5nqBB1G.js`),[])})),oc=250;function sc(e){return new Promise((t,n)=>e.file(t,n))}function cc(e){return new Promise((t,n)=>{let r=[],i=()=>{e.readEntries(e=>{if(e.length===0){t(r);return}r.push(...e),i()},n)};i()})}async function lc(e,t,n,r=``){let i=r?`${r}/${e.name}`:e.name;if(e.isFile){try{t.push({relativePath:i,file:await sc(e)}),n?.(t.length)}catch(e){ac.error(`Failed to read dropped file "${i}":`,e)}return}if(!e.isDirectory)return;let a;try{a=await cc(e.createReader())}catch(e){ac.error(`Failed to read dropped folder "${i}":`,e);return}for(let e of a)await lc(e,t,n,i)}async function uc(e,t){let n=Array.from(e.items??[]).filter(e=>e.kind===`file`).map(e=>e.webkitGetAsEntry?.()??null).filter(e=>e!==null),r=Array.from(e.files??[]);if(n.length===0)return r.map(e=>({relativePath:e.webkitRelativePath||e.name,file:e}));let i=[];for(let e of n)await lc(e,i,t);return i}var dc=class extends os{static{ic=this}constructor(...e){super(...e),this.settingsLoaded=!1,this.treeRef=f(),this.loadingNodes=new Set,this.treeBuildGeneration=0,this.syncContextMenuTarget=e=>{let t=e.target.closest(`wa-tree-item`)?.model?.data;t instanceof Qe&&k.set(t)}}static{this.SETTINGS_VERSION=1}static{this.SETTINGS_KEY_SELECTED_PATH=`selectedPath`}doBeforeUI(){this.initializeWorkspace(),r(E,e=>{e.target===`system.icons`&&this.requestUpdate()}),this.subscribe(M,e=>this.onWorkspaceChanged(e)),this.subscribe(Ze,e=>this.onWorkspaceConnected(e))}disconnectedCallback(){this.treeContextMenuAbort?.abort(),this.treeContextMenuAbort=void 0,this.workspaceChangedDebounceId!==void 0&&(clearTimeout(this.workspaceChangedDebounceId),this.workspaceChangedDebounceId=void 0),this.pendingWorkspaceDir=void 0,super.disconnectedCallback()}firstUpdated(e){super.firstUpdated(e),this.setupDragAndDrop()}updated(e){super.updated(e),e.has(`workspaceDir`)&&this.workspaceDir&&this.setupDragAndDrop()}async initializeWorkspace(){let e=await L.getWorkspace();await this.loadWorkspace(e??void 0)}renderToolbar(){return _`
            <docks-command icon="folder-open" title="${Z.CONNECT_WORKSPACE}" dropdown="filebrowser.connections"></docks-command>
            <docks-command icon="docks file-plus" title="${Z.CREATE_NEW}" dropdown="filebrowser.create"></docks-command>
        `}renderContextMenu(){let e=k.get(),t=e instanceof P?e:null,n=t?nc.getEditorOptionsForInput(t):[],r=n.length>0;return _`
            ${Ps({cmd:`open_editor`,icon:`folder-open`,label:Z.OPEN})}
            ${r?_`
                <wa-dropdown-item>
                    ${X(`folder-open`,{slot:`icon`})}
                    ${Z.OPEN_WITH}
                    ${n.map(e=>Ps({cmd:`open_editor`,icon:e.icon??`file`,label:e.title,params:{path:t.getWorkspacePath(),editorId:e.editorId},slot:`submenu`}))}
                </wa-dropdown-item>
            `:v}
            ${Rs({icon:`docks file-plus`,label:Z.CREATE_NEW,contributionTarget:`filebrowser.create`})}
            ${Ps({cmd:`refresh_resource`,icon:`repeat`,label:Z.REFRESH_RESOURCE})}
        `}onWorkspaceChanged(e){this.pendingWorkspaceDir=e,this.workspaceChangedDebounceId!==void 0&&clearTimeout(this.workspaceChangedDebounceId),this.workspaceChangedDebounceId=setTimeout(()=>{this.workspaceChangedDebounceId=void 0;let e=this.pendingWorkspaceDir;this.pendingWorkspaceDir=void 0,e?this.applyWorkspaceChange(e):this.loadWorkspace(void 0,!0)},oc)}async applyWorkspaceChange(e){k.set(void 0),await this.loadWorkspace(e,!0),await this.syncTreeSelection()}async onWorkspaceConnected(e){k.set(void 0),await this.loadWorkspace(e,!0)}async loadWorkspace(e,t=!1){this.treeBuildGeneration+=1;let n=this.treeBuildGeneration;if(this.loadingNodes.clear(),this.workspaceDir=e,!e){this.root=void 0,this.settingsLoaded&&await this.persistSelectedPath(null);return}let r=await this.resourceToTreeNode(e,!0,t);n===this.treeBuildGeneration&&(this.root=r,await this.restoreSelectionFromSettings(),this.treeBuildGeneration)}async persistSelectedPath(e){await this.setDialogSetting({v:ic.SETTINGS_VERSION,[ic.SETTINGS_KEY_SELECTED_PATH]:e})}async restoreSelectionFromSettings(){if(this.settingsLoaded)return;this.settingsLoaded=!0;let e=(await this.getDialogSetting())?.[ic.SETTINGS_KEY_SELECTED_PATH];if(typeof e!=`string`||e.length===0)return;await this.updateComplete;let t=this.treeRef.value?.querySelector(`wa-tree`);if(t){if(typeof e==`string`&&e.length>0){let n=Array.from(t.querySelectorAll(`wa-tree-item`)).find(t=>{let n=(t?.model?.data)?.getWorkspacePath?.();return typeof n==`string`&&n===e});if(n){await this.selectTreeItem(n);return}}await this.selectFirstConnectedFolder(t)}}async selectTreeItem(e){let t=e.parentElement?.closest?.(`wa-tree-item`);for(;t;)t.expanded=!0,t=t.parentElement?.closest?.(`wa-tree-item`);e.selected=!0,await this.syncTreeSelection()}async selectFirstConnectedFolder(e){let t=Array.from(e.children).filter(e=>e instanceof HTMLElement&&e.tagName.toLowerCase()===`wa-tree-item`);if(t.length===0)return;let n=t.find(e=>e?.model?.data instanceof F)??t[0];await this.selectTreeItem(n)}async syncTreeSelection(){await this.updateComplete;let e=this.treeRef.value?.querySelector(`wa-tree`)?.selectedItems||[];e.length>0&&k.set(e[0].model?.data)}async resourceToTreeNode(e,t=!1,n=!1){let r=this.treeBuildGeneration,i=e instanceof P,a={data:e,label:e.getName(),leaf:i,children:[]};if(e instanceof F&&!e.getParent())try{let t=await L.getFolderInfoForDirectory(e);if(r!==this.treeBuildGeneration)return a.loaded=!a.leaf,a;t?.backendName&&(a.workspaceTag=t.backendName)}catch(e){ac.debug(`Failed to get workspace info for directory`,e)}if(e instanceof F&&t){try{let t=await e.listChildren(n);if(r!==this.treeBuildGeneration)return a.loaded=!0,a;for(let i of t){let t=e===this.workspaceDir,o=await this.resourceToTreeNode(i,t,t&&n);if(r!==this.treeBuildGeneration)return a.loaded=!0,a;a.children.push(o)}a.children.sort(rc)}catch(t){if(r!==this.treeBuildGeneration||!await L.isResourceInCurrentWorkspace(e))return a.loaded=!0,a;a.loadError=t instanceof Error?t.message:String(t),ac.error(`Failed to load directory children:`,t)}a.loaded=!0}return e instanceof st&&(a.placeholderNotice=e.getFailureReason()),a}createTreeItems(e,t=!1){if(!e)return _``;let n=!e.leaf&&!e.loaded,r=e.data,i=r instanceof P,a=!!r.getParent(),o=i?nc.getFileIcon(r.getName()):e.icon||`folder-open`,s=e.workspaceTag,c=e.loadError,l=e.placeholderNotice,u=c?Z.FOLDER_LOAD_FAILED({detail:c}):l?Z.FOLDER_UNAVAILABLE({detail:l}):null;return _`
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
                            ${X(o,{label:e.leaf?Z.FILE:Z.FOLDER})}
                            <span class="tree-label-text">${e.label}</span>
                            ${!e.leaf&&s?_`<wa-badge appearance="outlined" variant="neutral" style="font-size: var(--wa-font-size-xs);">${s}</wa-badge>`:null}
                        </span>
                    </div>
                    ${u?_`<div class="tree-item-detail-row tree-item-error-text">${u}</div>`:v}
                </div>
                ${e.children.map(e=>this.createTreeItems(e,!1))}
            </wa-tree-item>`}onDragStart(e,t){if(!e.dataTransfer||!t.getParent())return;let n=e.currentTarget?.closest(`wa-tree`),r=Array.isArray(n?.selectedItems)?n.selectedItems:[],i=[];if(r.length>0)for(let e of r){let t=e.model?.data;t&&t.getParent()&&i.push(t)}i.length===0&&i.push(t);let a=i.map(e=>e.getWorkspacePath()),o=i.length===1?i[0].getName():`${i.length} items`;e.dataTransfer.effectAllowed=`copyMove`;let s=a.join(`
`);if(e.dataTransfer.setData(`text/plain`,s),e.dataTransfer.setData(`application/x-workspace-file`,s),e.dataTransfer.setData(`text/uri-list`,s),e.dataTransfer.setDragImage){let t=document.createElement(`div`);t.textContent=o,t.style.position=`absolute`,t.style.top=`-1000px`,t.style.padding=`4px 8px`,t.style.background=`var(--wa-color-neutral-10)`,t.style.border=`1px solid var(--wa-color-neutral-30)`,t.style.borderRadius=`4px`,document.body.appendChild(t),e.dataTransfer.setDragImage(t,0,0),setTimeout(()=>document.body.removeChild(t),0)}}async onLazyLoad(e,t){let n=t.data;n instanceof F&&t.children.length===0&&await this.loadNodeChildren(t,n)}async loadNodeChildren(e,t){if(this.loadingNodes.has(e))return;let n=this.treeBuildGeneration;this.loadingNodes.add(e);try{let r=await t.listChildren(!1);if(n!==this.treeBuildGeneration)return;for(let t of r){let r=await this.resourceToTreeNode(t,!1);if(n!==this.treeBuildGeneration)return;e.children.push(r)}e.children.sort(rc),e.loaded=!0,this.requestUpdate()}catch(r){if(n!==this.treeBuildGeneration)return;if(!await L.isResourceInCurrentWorkspace(t)){e.loaded=!0,this.requestUpdate();return}e.loadError=r instanceof Error?r.message:String(r),ac.error(`Failed to load directory children:`,r),this.requestUpdate()}finally{this.loadingNodes.delete(e)}}async onFileDoubleClicked(e){let t=e.currentTarget,n=t.model;if(!n)return;let r=n.data;if(r instanceof P){k.set(r),this.executeCommand(`open_editor`,{});return}!n.leaf&&`expanded`in t&&(t.expanded=!t.expanded)}onSelectionChanged(e){let t=e.detail.selection;if(t&&t.length>0){let e=t[0].model.data;k.set(e);let n=e?.getWorkspacePath?.();typeof n==`string`?this.persistSelectedPath(n):this.persistSelectedPath(null)}else k.set(void 0),this.persistSelectedPath(null)}getDirectoryDropTargetFromEvent(e){if(!this.workspaceDir)return;let t=e.target.closest(`wa-tree-item`);if(!t){let e=this.root?.children??[];if(e.length!==1)return;let t=e[0]?.data;return t instanceof F?t:void 0}let n=t.model?.data;if(n instanceof F)return n}attachTreeContextMenuSync(){this.treeContextMenuAbort?.abort();let e=this.treeRef.value?.querySelector(`wa-tree`);e&&(this.treeContextMenuAbort=new AbortController,e.addEventListener(`contextmenu`,this.syncContextMenuTarget,{capture:!0,signal:this.treeContextMenuAbort.signal}))}setupDragAndDrop(){let e=this.treeRef.value;if(!e)return;this.attachTreeContextMenuSync();let t=t=>{let n=t.dataTransfer?.types;if(!n)return;let r=n.includes(`Files`),i=n.includes(`application/x-workspace-file`);if(!r&&!i)return;if(!this.getDirectoryDropTargetFromEvent(t)){this.currentDropTarget?.classList.remove(`drop-target`),this.currentDropTarget=void 0,e.classList.remove(`drag-over`);return}t.preventDefault(),t.dataTransfer&&(i?t.dataTransfer.dropEffect=t.ctrlKey||t.metaKey?`copy`:`move`:t.dataTransfer.dropEffect=`copy`),e.classList.add(`drag-over`);let a=t.target.closest(`wa-tree-item`);if(!a){this.currentDropTarget?.classList.remove(`drop-target`),this.currentDropTarget=void 0;return}a!==this.currentDropTarget&&(this.currentDropTarget?.classList.remove(`drop-target`),this.currentDropTarget=a,a.classList.add(`drop-target`))},n=t=>{let n=t.dataTransfer?.types;if(!n)return;let r=n.includes(`Files`),i=n.includes(`application/x-workspace-file`);(r||i)&&this.getDirectoryDropTargetFromEvent(t)&&(t.preventDefault(),e.classList.add(`drag-over`))},r=t=>{let n=e.getBoundingClientRect(),r=t.clientX,i=t.clientY;(r<=n.left||r>=n.right||i<=n.top||i>=n.bottom)&&(e.classList.remove(`drag-over`),this.currentDropTarget?.classList.remove(`drop-target`),this.currentDropTarget=void 0)},i=async t=>{if(t.preventDefault(),e.classList.remove(`drag-over`),this.currentDropTarget?.classList.remove(`drop-target`),this.currentDropTarget=void 0,!t.dataTransfer||!this.workspaceDir)return;let n=this.getDirectoryDropTargetFromEvent(t);if(!n)return;let r=t.dataTransfer.types;if(r.includes(`Files`)){let e=t.dataTransfer;await $i.runAsync(Z.DROP_UPLOAD_TASK,async t=>{let r=await uc(e,e=>{t.message=Z.DROP_SCANNING({count:String(e)})});r.length!==0&&await this.handleFilesDrop(r,n,t)});return}r.includes(`application/x-workspace-file`)&&await this.handleWorkspaceDrop(t,n)};e.removeEventListener(`dragover`,t),e.removeEventListener(`dragenter`,n),e.removeEventListener(`dragleave`,r),e.removeEventListener(`drop`,i),e.addEventListener(`dragover`,t),e.addEventListener(`dragenter`,n),e.addEventListener(`dragleave`,r),e.addEventListener(`drop`,i)}async handleWorkspaceDrop(e,t){if(!e.dataTransfer)return;let n=e.dataTransfer.getData(`application/x-workspace-file`);if(!n)return;let r=n.split(/\r?\n/).map(e=>e.trim()).filter(e=>!!e);if(r.length===0)return;let i=await L.getWorkspace();if(!i){ac.warn(`Workspace drop ignored because no workspace is connected`);return}let a=async n=>{let r=n.getWorkspace(),i=t.getWorkspace();return!r||!i?!1:r===i&&!(e.ctrlKey||e.metaKey)},o=new Set,s=t.getWorkspace(),c=0,l=0,u=[];for(let e of r)try{let t=await i.getResource(e);if(!t){ac.warn(`Workspace drop: source not found for path "${e}"`),l++;continue}u.push({path:e,resource:t});let n=t.getWorkspace();n&&o.add(n)}catch(t){ac.error(`Failed to handle workspace drop for "${e}":`,t),l++}if(u.length===0){l>0&&ac.info(`Workspace drop failed for ${l} item(s)`);return}let d=!1;if(s){for(let e of o)if(e!==s){d=!0;break}}if(d&&s)try{let e=Array.from(o),t=await L.getFolderInfoForDirectory(e[0]),n=await L.getFolderInfoForDirectory(s),r=t?.backendName??Z.UNKNOWN_BACKEND,i=n?.backendName??Z.UNKNOWN_BACKEND;if(!await Fo(Z.DND_CROSS_CONNECTION_CONFIRM({count:String(u.length),srcBackend:r,destBackend:i})))return}catch(e){ac.debug(`Failed to resolve cross-connection info for DnD`,e)}await $i.runAsync(Z.DROP_COPY_TASK,async e=>{let n=t=>{e.message=t};for(let{path:e,resource:r}of u)try{let e=await a(r);await L.copyResource(r,t,{move:e,onFile:n}),c++}catch(t){ac.error(`Failed to handle workspace drop for "${e}":`,t),l++}}),ac.info(`Workspace drop completed: ${c}/${u.length} items ${l>0?`, ${l} failed`:``}`),await this.loadWorkspace(this.workspaceDir,!0)}async handleFilesDrop(e,t,n){let r=e.length,i=0,a=0,o=0;n.totalSteps=r;for(let[r,{relativePath:s,file:c}]of e.entries()){n.currentStep=r+1,n.message=s;try{if(await t.getResource(s)&&!await Fo(Z.FILE_EXISTS_OVERWRITE({fileName:s}))){o++;continue}await(await t.getResource(s,{create:!0})).saveContents(c),i++}catch(e){ac.error(`Failed to upload ${s}:`,e),a++}}ac.info(`Uploaded ${i}/${r} files${o>0?`, ${o} skipped`:``}${a>0?`, ${a} failed`:``}`),await this.loadWorkspace(this.workspaceDir)}renderContent(){return _`
            <div class="tree" ${a(this.treeRef)} style="--drop-files-text: '${Z.DROP_FILES_HERE}'">
                ${h(!this.workspaceDir,()=>_`
                    <docks-no-content message="${Z.SELECT_WORKSPACE}"></docks-no-content>`,()=>h(this.root,()=>_`
                <wa-tree @wa-selection-change=${this.nobubble(this.onSelectionChanged)}
                         style="--indent-guide-width: 1px;">
                    ${this.root.children.map(e=>this.createTreeItems(e,!0))}
                </wa-tree>`,()=>_``))}
            </div>
        `}static{this.styles=n`
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
    `}};K([d()],dc.prototype,`root`,void 0),dc=ic=K([i(`docks-filebrowser`)],dc);var fc=await tc(Object.assign({"./tasks.de.json":()=>m(()=>import(`./tasks.de-DRvUVugd-CJoB1HQt.js`),[]),"./tasks.en.json":()=>m(()=>import(`./tasks.en-dRDildBd-HYnsvR63.js`),[])}));D.registerContribution(Ni,{name:Yo,label:`Active Tasks`,component:`<docks-tasks></docks-tasks>`});var pc=null;function mc(e){if(e.progress>=0)return e.progress;if(e.totalSteps>0)return Math.round(e.currentStep/e.totalSteps*100)}function hc(e,t=``){let n=e&&mc(e);return n===void 0?_`<wa-progress-bar indeterminate></wa-progress-bar>`:_`<wa-progress-bar value="${n}">${t}</wa-progress-bar>`}function gc(){return pc||(pc=document.createElement(`div`),pc.id=`progress-dialog-container`,document.body.appendChild(pc)),pc}function _c(){return gc().querySelector(`wa-dialog`)}function vc(){yc(!0)}function yc(e=!1){let t=gc(),n=$i.getActiveTasks();if(n.length===0){o(_``,t);return}let r=_c();if(!(e||r?.open===!0))return;let i=_`
        <wa-dialog 
            label="${fc.ACTIVE_TASKS}" 
            open
            light-dismiss
            style="--width: 600px;"
            @wa-after-hide=${()=>{o(_``,t)}}
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
                ${n.map(e=>{let t=e.progress<0&&e.totalSteps>0?`${e.currentStep}/${e.totalSteps} - `:``;return _`
                        <div class="tasitem">
                            <div class="tasheader">
                                <wa-icon name="hourglass" style="color: var(--wa-color-warning-fill-loud);"></wa-icon>
                                <div style="flex: 1;">
                                    <div class="tasname">${e.name}</div>
                                    ${e.message?_`
                                        <div class="tasmessage">${e.message}</div>
                                    `:``}
                                </div>
                            </div>
                            <div class="tasprogress">
                                ${hc(e,`${t}${mc(e)}%`)}
                            </div>
                        </div>
                    `})}
            </div>
        </wa-dialog>
    `;o(i,t)}var bc=class extends ma{static{this.styles=n`
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
    `}doBeforeUI(){this.watch(Pe,()=>{yc(),this.requestUpdate()})}handleIndicatorClick(){vc()}render(){Pe.get();let e=$i.getActiveTasks(),t=e.length;return t===0?_``:_`
            <div class="tasindicator" @click=${this.handleIndicatorClick} title="${fc.ACTIVE_TASKS_TITLE({taskCount:t.toString()})}">
                <wa-spinner
                    style="font-size: 1rem; --indicator-color: var(--wa-color-warning-fill-loud);"
                    label="${fc.ACTIVE_TASKS}"
                ></wa-spinner>
                <wa-badge appearance="outlined" variant="neutral" pill>${t}</wa-badge>
                <div class="tasbar-wrap">${hc(t===1?e[0]:void 0)}</div>
            </div>
        `}};bc=K([i(`docks-tasks`)],bc);var xc=await tc(Object.assign({"./partname.de.json":()=>m(()=>import(`./partname.de-C0I4Wf2X-DwVjtktH.js`),[]),"./partname.en.json":()=>m(()=>import(`./partname.en-CIT8z3cY-DX5-ex1_.js`),[])}));function Sc(){let e=O.get();return e&&(e.tabContribution?.label||e.getAttribute(`id`))||xc.NO_PART}var Cc=250,wc=null;function Tc(){let e=Co.getCurrentApp()?.name??``,t=O.get();if(!t){document.title=e;return}let n=t.tabContribution?.label||t.getAttribute(`id`)||xc.NO_PART;e?document.title=`${e} | ${n}`:document.title=n}function Ec(){wc!==null&&clearTimeout(wc),wc=setTimeout(()=>{wc=null,Tc()},Cc)}He(O,()=>Ec()),window.addEventListener(`app-loaded`,()=>{wc!==null&&(clearTimeout(wc),wc=null),Tc()});var Dc=await tc(Object.assign({"./partname.de.json":()=>m(()=>import(`./partname.de-C0I4Wf2X-DwVjtktH.js`),[]),"./partname.en.json":()=>m(()=>import(`./partname.en-CIT8z3cY-DX5-ex1_.js`),[])}));D.registerContribution(Ni,{name:Jo,label:`Active part`,component:`<docks-part-name></docks-part-name>`});var Oc=class extends ma{doBeforeUI(){this.watch(O,()=>{this.requestUpdate()})}render(){let e=O.get()?.tabContribution?.icon||`box`;return _`
            <wa-button 
                appearance="plain"
                size="s"
                title="${Dc.ACTIVE_PART}">
                ${X(e,{label:`Part`,slot:`start`})}
                ${Sc()}
            </wa-button>
        `}};Oc=K([i(`docks-part-name`)],Oc);var kc=ge(`DocksExtensions`),Q=await tc(Object.assign({"./extensions.de.json":()=>m(()=>import(`./extensions.de-O6Sx3_t4-CTIwMo45.js`),[]),"./extensions.en.json":()=>m(()=>import(`./extensions.en-fwqJr8P--e9xsMyRg.js`),[])})),Ac=class extends os{constructor(...e){super(...e),this.filterText=``,this.showRegisterDialog=!1,this.registerExtensionData={},this.handleRegisterDialogAfterHide=()=>{this.finishRegisterDialogClose()}}doInitUI(){r(na,()=>{this.requestUpdate()})}onExtensionDblClick(){}enable(e){J.enable(e.id,!0),this.requestUpdate()}disable(e){J.disable(e.id,!0),this.requestUpdate()}isExtensionRequired(e){let t=Co.getCurrentApp();return!t||!t.extensions?!1:t.extensions.includes(e)}selectionChanged(e){let t=e.detail.selection||[];this.selectedExtension=t.length>0&&t[0].model?t[0].model:void 0}getFilteredExtensions(){if(!this.filterText.trim())return J.getExtensions();let e=this.filterText.toLowerCase();return J.getExtensions().filter(t=>String(t.name).toLowerCase().includes(e)||(t.description?String(t.description).toLowerCase().includes(e):!1)||t.id.toLowerCase().includes(e))}getGroupedExtensions(){let e=this.getFilteredExtensions(),t=[],n=[];return e.forEach(e=>{J.isEnabled(e.id)?t.push(e):n.push(e)}),t.sort((e,t)=>String(e.name).localeCompare(String(t.name))),n.sort((e,t)=>String(e.name).localeCompare(String(t.name))),{enabled:t,available:n}}isExternalExtension(e){return e.external===!0}handleFilterInput(e){this.filterText=e.target.value,this.requestUpdate()}clearFilter(){this.filterText=``,this.requestUpdate()}async handleRegisterExtension(){try{let e=await To(`Enter extension URL or source identifier:`,``,!1);if(!e)return;await $i.runAsync(`Registering extension`,async()=>{let t=e;ta.isGitHubUrl(e)&&(t=ta.convertGitHubUrlToSource(e));let n=ta.parseSource(t);n?.type===`github`?await this.fetchGitHubMetadata(n,t):(this.registerExtensionData={url:t,id:``,name:``,description:``},this.showRegisterDialog=!0,this.requestUpdate())})}catch(e){C(`Failed to register extension: ${e}`)}}async fetchGitHubMetadata(e,t){try{let n=await ta.fetchGitHubPackageJson(e),r=e.owner,i=e.repo,a=n.name||`ext.${r}-${i}`,o=n.name||`${r}/${i}`,s=n.description||``,c=n.version||``,l=n.author||(typeof n.author==`string`?n.author:n.author?.name)||``;this.registerExtensionData={id:a,name:o,description:s,url:t,version:c,author:l,icon:`puzzle-piece`,external:!0},this.showRegisterDialog=!0,this.requestUpdate()}catch(e){kc.warn(`Could not fetch package.json, using defaults: ${e}`),this.registerExtensionData={url:t,id:``,name:``,description:``},this.showRegisterDialog=!0,this.requestUpdate()}}async confirmRegisterExtension(){if(!this.registerExtensionData.url){C(`URL is required`);return}if(!this.registerExtensionData.id){C(`Extension ID is required`);return}if(!this.registerExtensionData.name){C(`Extension name is required`);return}try{await $i.runAsync(`Registering extension`,async()=>{let e={id:this.registerExtensionData.id,name:this.registerExtensionData.name,description:this.registerExtensionData.description,url:this.registerExtensionData.url,version:this.registerExtensionData.version,author:this.registerExtensionData.author,icon:this.registerExtensionData.icon||`puzzle-piece`,external:!0};J.registerExtension(e),await J.loadExtensionFromUrl(this.registerExtensionData.url,e.id),Ce(`Extension ${e.name} registered successfully`),this.closeRegisterDialog(),this.registerExtensionData={},this.requestUpdate()})}catch(e){C(`Failed to register extension: ${e}`)}}closeRegisterDialog(){let e=this.renderRoot.querySelector(`wa-dialog`);if(e&&e.open!==!1){e.open=!1;return}this.finishRegisterDialogClose()}finishRegisterDialogClose(){this.showRegisterDialog=!1,this.registerExtensionData={},this.requestUpdate()}cancelRegisterExtension(){this.closeRegisterDialog()}renderToolbar(){return _`
            <wa-input
                placeholder="${Q.FILTER_PLACEHOLDER}"
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
        `}renderContent(){let e=this.getGroupedExtensions(),t=e.enabled.length>0||e.available.length>0;return _`
            ${h(this.showRegisterDialog,()=>_`
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
                            ${t?_`
                                ${e.enabled.length>0?_`
                                    <wa-tree-item expanded>
                                        <span>
                                            <wa-icon name="check-circle" style="color: var(--wa-color-success-50);"></wa-icon>
                                            ${Q.INSTALLED} (${e.enabled.length})
                                        </span>
                                        ${e.enabled.map(e=>{let t=this.isExternalExtension(e);return _`
                                                <wa-tree-item @dblclick=${this.nobubble(this.onExtensionDblClick)} .model=${e}>
                                                    <span>${X(e.icon)}</span> ${e.name}${t?_` <span style="opacity: 0.6; font-size: 0.9em; margin-left: 0.5rem;">(External)</span>`:``}
                                                </wa-tree-item>
                                            `})}
                                    </wa-tree-item>
                                `:``}
                                ${e.available.length>0?_`
                                    <wa-tree-item expanded>
                                        <span>
                                            <wa-icon name="circle" style="color: var(--wa-color-neutral-50);"></wa-icon>
                                            ${Q.AVAILABLE} (${e.available.length})
                                        </span>
                                        ${e.available.map(e=>{let t=this.isExternalExtension(e);return _`
                                                <wa-tree-item @dblclick=${this.nobubble(this.onExtensionDblClick)} .model=${e}>
                                                    <span>${X(e.icon)}</span> ${e.name}${t?_` <span style="opacity: 0.6; font-size: 0.9em; margin-left: 0.5rem;">(External)</span>`:``}
                                                </wa-tree-item>
                                            `})}
                                    </wa-tree-item>
                                `:``}
                            `:``}
                            ${t?``:_`
                                <div style="padding: 1em; text-align: center; opacity: 0.7;">
                                    ${Q.NO_MATCHES({filterText:this.filterText})}
                                </div>
                            `}
                        </wa-tree>
                    </wa-scroller>
                </div>
                <wa-scroller slot="end" class="extensions-detail-scroller" orientation="vertical">
                <div class="extensions-detail-content">
                    ${h(this.selectedExtension,e=>{let t=this.isExternalExtension(e),n=J.isEnabled(e.id);return _`
                                <h1>${X(e.icon)} ${e.name}${t?` (External)`:``}</h1>
                                ${h(t,()=>_`
                                    <div class="marketplace-badge">
                                        <wa-icon name="store"></wa-icon>
                                        <span>${Q.EXTERNAL_EXTENSION}</span>
                                    </div>
                                `)}
                                <hr>
                                <div>
                                    ${h(n,()=>_`
                                        <wa-button 
                                            title="${this.isExtensionRequired(e.id)?Q.REQUIRED_HINT:Q.DISABLE_TITLE}" 
                                            @click="${()=>this.disable(e)}"
                                            variant="danger" 
                                            appearance="plain"
                                            ?disabled=${this.isExtensionRequired(e.id)}>
                                            <wa-icon name="xmark" label="Uninstall"></wa-icon>&nbsp;${Q.UNINSTALL}
                                        </wa-button>
                                        ${h(this.isExtensionRequired(e.id),()=>_`
                                            <div class="required-hint">
                                                <wa-icon name="info-circle" style="color: var(--wa-color-primary-50);"></wa-icon>
                                                <span>${Q.REQUIRED_HINT}</span>
                                            </div>
                                        `)}
                                    `,()=>_`
                                        <wa-button 
                                            title="${Q.ENABLE_TITLE}" 
                                            @click="${()=>this.enable(e)}"
                                            variant="brand" 
                                            appearance="plain">
                                            <wa-icon name="download" label="Install"></wa-icon>&nbsp;${Q.INSTALL}
                                        </wa-button>
                                    `)}
                                </div>

                                ${h(e.experimental,()=>_`
                                    <div style="margin-top: 1em;">
                                        <wa-button size="s" variant="warning" appearance="plain">
                                            <wa-icon name="triangle-exclamation" label="Warning"></wa-icon>
                                        </wa-button>
                                        <small><i>${Q.EXPERIMENTAL}</i></small>
                                    </div>
                                `)}

                                ${h(e.version||e.author,()=>_`
                                    <div style="margin-top: 1em; display: flex; flex-direction: column; gap: 0.5rem;">
                                        ${h(e.version,()=>_`
                                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                                <wa-icon name="tag" style="font-size: 0.9em; opacity: 0.7;"></wa-icon>
                                                <span style="font-size: 0.9em; opacity: 0.8;">${Q.VERSION} <strong>${e.version}</strong></span>
                                            </div>
                                        `)}
                                        ${h(e.author,()=>_`
                                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                                <wa-icon name="user" style="font-size: 0.9em; opacity: 0.7;"></wa-icon>
                                                <span style="font-size: 0.9em; opacity: 0.8;">${Q.AUTHOR} <strong>${e.author}</strong></span>
                                            </div>
                                        `)}
                                    </div>
                                `)}

                                <p style="margin-top: 1em;">${e.description}</p>

                                ${h(e.dependencies&&e.dependencies.length>0,()=>_`
                                    <div style="margin-top: 1.5em;">
                                        <h3 style="margin-bottom: 0.5em;">
                                            <wa-icon name="puzzle-piece" style="font-size: 0.9em;"></wa-icon>
                                            ${Q.DEPENDENCIES}
                                        </h3>
                                        <div class="dependencies-list">
                                            ${e.dependencies.map(e=>{let t=J.getExtensions().find(t=>t.id===e),n=J.isEnabled(e);return _`
                                                    <div class="dependency-item">
                                                        <wa-icon 
                                                            name="${n?`check-circle`:`circle`}" 
                                                            style="color: ${n?`var(--wa-color-success-50)`:`var(--wa-color-neutral-50)`};">
                                                        </wa-icon>
                                                        ${X(t?.icon??`puzzle-piece`)}
                                                        <span>${t?.name||e}</span>
                                                        ${n?``:_`
                                                            <span class="dependency-badge">${Q.NOT_INSTALLED}</span>
                                                        `}
                                                    </div>
                                                `})}
                                        </div>
                                        <small style="opacity: 0.7; display: block; margin-top: 0.5em;">
                                            <wa-icon name="info-circle" style="font-size: 0.9em;"></wa-icon>
                                            ${Q.DEPENDENCIES_HINT}
                                        </small>
                                    </div>
                                `)}
                            `})}
                </div>
                </wa-scroller>
            </wa-split-panel>
        `}static{this.styles=n`
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
    `}};K([d()],Ac.prototype,`selectedExtension`,void 0),K([d()],Ac.prototype,`filterText`,void 0),K([d()],Ac.prototype,`showRegisterDialog`,void 0),K([d()],Ac.prototype,`registerExtensionData`,void 0),Ac=K([i(`docks-extensions`)],Ac);var $=await tc(Object.assign({"./logterminal.de.json":()=>m(()=>import(`./logterminal.de-BP1FuxHH-FGQOp2E1.js`),[]),"./logterminal.en.json":()=>m(()=>import(`./logterminal.en-BeDRvTvb-BcGqg9A8.js`),[])})),jc=class extends os{constructor(...e){super(...e),this.messages=[],this.autoScroll=!0,this.filter=`all`,this.containerRef=f()}connectedCallback(){super.connectedCallback(),this.loadSettings(),me(this.log.bind(this))}disconnectedCallback(){super.disconnectedCallback(),he()}log(e,t,n=`info`){let r={timestamp:new Date,level:n,source:e,message:t};this.messages=[...this.messages,r],this.autoScroll&&this.updateComplete.then(()=>{let e=this.containerRef.value;e&&(e.scrollTop=e.scrollHeight)})}clear(){this.messages=[]}getFilteredMessages(){return this.filter===`all`?this.messages:this.messages.filter(e=>e.level===this.filter)}formatTimestamp(e){return e.toLocaleTimeString(`en-US`,{hour12:!1,hour:`2-digit`,minute:`2-digit`,second:`2-digit`})}getLevelIcon(e){switch(e){case`info`:return`circle-info`;case`warning`:return`triangle-exclamation`;case`error`:return`circle-xmark`;case`debug`:return`bug`}}getLevelColor(e){switch(e){case`info`:return`var(--wa-color-primary-text, #0066cc)`;case`warning`:return`var(--wa-color-warning-text, #ff9800)`;case`error`:return`var(--wa-color-danger-text, #dc3545)`;case`debug`:return`var(--wa-color-neutral-text-subtle, #6c757d)`}}renderToolbar(){let e=this.messages.filter(e=>e.level===`info`).length,t=this.messages.filter(e=>e.level===`warning`).length,n=this.messages.filter(e=>e.level===`error`).length,r=this.messages.filter(e=>e.level===`debug`).length;return _`
            <docks-command 
                icon="list"
                title="${$.ALL_LOGS}"
                appearance="${this.filter===`all`?`filled`:`plain`}"
                variant="${this.filter===`all`?`brand`:`neutral`}"
                .action=${()=>{this.filter=`all`,this.saveSettings()}}>
                ${$.ALL} (${this.messages.length})
            </docks-command>

            <docks-command 
                icon="circle-info"
                title="${$.INFO_LOGS}"
                appearance="${this.filter===`info`?`filled`:`plain`}"
                variant="${this.filter===`info`?`brand`:`neutral`}"
                .action=${()=>{this.filter=`info`,this.saveSettings()}}>
                ${$.INFO}${e>0?` (${e})`:``}
            </docks-command>

            <docks-command 
                icon="triangle-exclamation"
                title="${$.WARNING_LOGS}"
                appearance="${this.filter===`warning`?`filled`:`plain`}"
                variant="${this.filter===`warning`?`brand`:`neutral`}"
                .action=${()=>{this.filter=`warning`,this.saveSettings()}}>
                ${$.WARNINGS}${t>0?` (${t})`:``}
            </docks-command>

            <docks-command 
                icon="circle-xmark"
                title="${$.ERROR_LOGS}"
                appearance="${this.filter===`error`?`filled`:`plain`}"
                variant="${this.filter===`error`?`brand`:`neutral`}"
                .action=${()=>{this.filter=`error`,this.saveSettings()}}>
                ${$.ERRORS}${n>0?` (${n})`:``}
            </docks-command>

            <docks-command 
                icon="bug"
                title="${$.DEBUG_LOGS}"
                appearance="${this.filter===`debug`?`filled`:`plain`}"
                variant="${this.filter===`debug`?`brand`:`neutral`}"
                .action=${()=>{this.filter=`debug`,this.saveSettings()}}>
                ${$.DEBUG}${r>0?` (${r})`:``}
            </docks-command>

            <wa-divider orientation="vertical"></wa-divider>

            <docks-command 
                icon="arrow-down" 
                title="${this.autoScroll?$.AUTO_SCROLL_ENABLED:$.AUTO_SCROLL_DISABLED}"
                appearance="${this.autoScroll?`filled`:`plain`}"
                variant="${this.autoScroll?`brand`:`neutral`}"
                .action=${()=>{this.autoScroll=!this.autoScroll,this.saveSettings()}}>
                ${this.autoScroll?$.AUTO_SCROLL:$.MANUAL}
            </docks-command>

            <docks-command 
                icon="trash" 
                title="${$.CLEAR_LOGS}"
                .action=${()=>this.clear()}>
                ${$.CLEAR}
            </docks-command>
        `}renderContent(){let e=this.getFilteredMessages();return _`
            <div class="log-terminal">
                <div class="messages" ${a(this.containerRef)}>
                    ${e.length===0?_`<div class="empty-state">${$.NO_LOG_MESSAGES}</div>`:e.map(e=>_`
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
        `}static{this.styles=n`
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
    `}async loadSettings(){let e=await this.getDialogSetting();e&&(typeof e.filter==`string`&&(e.filter===`all`||[`info`,`warning`,`error`,`debug`].includes(e.filter))&&(this.filter=e.filter),typeof e.autoScroll==`boolean`&&(this.autoScroll=e.autoScroll))}async saveSettings(){await this.setDialogSetting({filter:this.filter,autoScroll:this.autoScroll})}};K([d()],jc.prototype,`messages`,void 0),K([d()],jc.prototype,`autoScroll`,void 0),K([d()],jc.prototype,`filter`,void 0),jc=K([i(`docks-log-terminal`)],jc);var Mc=class extends We{constructor(...e){super(...e),this.cmd=``,this.title=``,this.label=!1,this.disabled=!1,this.appearance=`plain`,this.variant=`neutral`,this.size=`s`,this.params={},this.withCaret=!0,this.placement=`bottom-start`,this.dropdownContributions=[]}handleSelect(e){js(e)}getKeybinding(){if(!this.cmd||this.action)return null;let e=da.getKeyBindingsForCommand(this.cmd);return e.length>0?e[0]:null}hasLightDomContent(){return Array.from(this.childNodes).some(e=>e.nodeType===Node.TEXT_NODE?(e.textContent?.trim().length??0)>0:e.nodeType===Node.ELEMENT_NODE)}isIconOnlyDropdownTrigger(){return!this.label&&!this.hasLightDomContent()}renderDropdownTriggerIcon(e){return this.icon?X(this.icon,{label:this.title,slot:e}):v}doBeforeUI(){this.dropdown&&(this.dropdownContributions=D.getContributions(this.dropdown),r(E,e=>{this.dropdown&&e.target===this.dropdown&&(this.dropdownContributions=e.contributions)}))}willUpdate(e){super.willUpdate?.(e),this.dropdown&&e.has(`dropdown`)&&(this.dropdownContributions=D.getContributions(this.dropdown))}handleToolbarClick(e){if(!this.disabled){if(e&&e.stopPropagation(),this.action){this.action(e);return}this.cmd&&this.executeCommand(this.cmd,this.params)}}render(){let e=this.getKeybinding();if(this.dropdown){let t=this.isIconOnlyDropdownTrigger(),n=t?void 0:`start`;return _`
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
                        ${this.renderDropdownTriggerIcon(n)}
                        ${t?v:_`<slot></slot>`}
                        ${this.label?this.title:v}
                    </wa-button>
                    
                    ${this.title?_`
                        <h6 style="padding: var(--wa-space-xs) var(--wa-space-s); margin: 0; color: var(--wa-color-neutral-50); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                            ${this.title}
                        </h6>
                    `:v}
                    
                    ${this.dropdownContributions.map(e=>Is(e))}
                    
                    ${this.cmd?_`
                        <wa-divider></wa-divider>
                        ${Ps({cmd:this.cmd,icon:this.icon,label:this.title,params:this.params,disabled:this.disabled})}
                    `:v}
                </wa-dropdown>
            `}return _`
            <wa-button
                appearance=${this.appearance}
                variant=${this.variant}
                size=${this.size}
                ?disabled=${this.disabled}
                title=${e?`${this.title} (${e})`:this.title}
                @click=${e=>this.handleToolbarClick(e)}>
                ${X(this.icon,{label:this.title,slot:`start`})}
                <slot></slot>
            </wa-button>
        `}static{this.styles=n`
        :host {
            display: inline-block;
        }
    `}};K([u()],Mc.prototype,`cmd`,void 0),K([u({type:Object,attribute:!1})],Mc.prototype,`action`,void 0),K([u()],Mc.prototype,`title`,void 0),K([u()],Mc.prototype,`label`,void 0),K([u()],Mc.prototype,`icon`,void 0),K([u({type:Boolean})],Mc.prototype,`disabled`,void 0),K([u()],Mc.prototype,`appearance`,void 0),K([u()],Mc.prototype,`variant`,void 0),K([u()],Mc.prototype,`size`,void 0),K([u({type:Object,attribute:!1})],Mc.prototype,`params`,void 0),K([u()],Mc.prototype,`dropdown`,void 0),K([u({type:Boolean,attribute:`with-caret`})],Mc.prototype,`withCaret`,void 0),K([u()],Mc.prototype,`placement`,void 0),K([d()],Mc.prototype,`dropdownContributions`,void 0),Mc=K([i(`docks-command`)],Mc);var Nc=await tc(Object.assign({"./fastviews.de.json":()=>m(()=>import(`./fastviews.de-C-B48vwv-DKWsEvsN.js`),[]),"./fastviews.en.json":()=>m(()=>import(`./fastviews.en-BlAxYlHD-CB-A2pKs.js`),[])})),Pc=class extends We{constructor(...e){super(...e),this.target=``,this.title=``,this.disabled=!1,this.appearance=`plain`,this.size=`s`,this.placement=`bottom-start`,this.tabContributions=[],this.drawerOpen=!1,this.drawerSize=`50vw`,this.drawerRef=f(),this.tabsRef=f(),this.resizeHandleRef=f(),this.resizing=null}getDrawerTabsId(){return`fastviews-drawer-tabs-${this.target}`}handleTabClick(e){if(!this.disabled){if(this.containerId){let t=document.querySelector(`docks-tabs#${this.containerId}`);if(!t){console.error(`fastviews: Tab container with id "${this.containerId}" not found`);return}t.open(e)}else this.drawerOpen=!0,this.updateComplete.then(()=>{let t=this.tabsRef.value;t&&t.open(e)})}}handleDrawerHide(){this.drawerOpen=!1}startResize(e){e.preventDefault(),e.stopPropagation();let t=this.drawerRef.value;if(!t)return;let n=(()=>{let e=t.shadowRoot?.querySelector(`[part="panel"]`);if(e&&e.offsetWidth>0)return e.offsetWidth;let n=(window.getComputedStyle(t).getPropertyValue(`--size`)||this.drawerSize).match(/^(\d+(?:\.\d+)?)(px|vw|vh|%)$/);if(n){let e=parseFloat(n[1]),t=n[2];if(t===`px`)return e;if(t===`vw`)return e/100*window.innerWidth;if(t===`vh`)return e/100*window.innerHeight;if(t===`%`)return e/100*window.innerWidth}return 0})();n===0&&(n=window.innerWidth*.5);let r=e=>{this.resizing&&(e.preventDefault(),e.stopPropagation(),this.resizing.rafId!==null&&cancelAnimationFrame(this.resizing.rafId),this.resizing.rafId=requestAnimationFrame(()=>{if(!this.resizing)return;let t=this.resizing.startX-e.clientX,n=Math.round(this.resizing.startSize+t),r=Math.round(window.innerWidth*.9);if(n>=200&&n<=r){this.drawerSize=`${n}px`;let e=this.drawerRef.value;e&&(e.style.setProperty(`--size`,this.drawerSize),e.style.setProperty(`transition`,`none`))}this.resizing.rafId=null}))},i=()=>{if(this.resizing){this.resizing.rafId!==null&&(cancelAnimationFrame(this.resizing.rafId),this.resizing.rafId=null),document.removeEventListener(`mousemove`,this.resizing.handleMouseMove),document.removeEventListener(`mouseup`,this.resizing.handleMouseUp),document.body.style.cursor=``,document.body.style.userSelect=``;let e=this.drawerRef.value;e&&e.style.removeProperty(`transition`),this.resizing=null}};this.resizing={startX:e.clientX,startSize:n,handleMouseMove:r,handleMouseUp:i,rafId:null},document.addEventListener(`mousemove`,r,{passive:!1}),document.addEventListener(`mouseup`,i,{passive:!1}),document.body.style.cursor=`col-resize`,document.body.style.userSelect=`none`}doBeforeUI(){this.target&&(this.loadTabContributions(),r(E,e=>{this.target&&e.target===this.target&&this.loadTabContributions()}))}loadTabContributions(){if(!this.target)return;let e=D.getContributions(this.target);this.tabContributions=e.filter(e=>`name`in e),this.requestUpdate()}renderTabContribution(e){return _`
            <wa-dropdown-item 
                @click=${()=>this.handleTabClick(e)}>
                ${X(e.icon,{label:e.label,slot:`icon`})}
                ${e.label}
            </wa-dropdown-item>
        `}render(){return!this.target||this.tabContributions.length===0?v:_`
            <wa-dropdown placement=${this.placement}>
                <wa-button 
                    slot="trigger"
                    appearance=${this.appearance}
                    size=${this.size}
                    ?disabled=${this.disabled}
                    with-caret
                    title=${this.title}>
                    ${X(this.icon,{label:this.title,slot:`start`})}
                    <slot></slot>
                </wa-button>
                
                ${this.title?_`
                    <h6 style="padding: var(--wa-space-xs) var(--wa-space-s); margin: 0; color: var(--wa-color-neutral-50); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                        ${this.title}
                    </h6>
                `:v}
                
                ${this.tabContributions.map(e=>this.renderTabContribution(e))}
            </wa-dropdown>

            ${this.containerId?v:_`
                <wa-drawer 
                    ${a(this.drawerRef)}
                    label="${this.title||Nc.FAST_VIEWS}"
                    placement="end"
                    ?open=${this.drawerOpen}
                    @wa-hide=${this.handleDrawerHide}
                    style="--size: ${this.drawerSize};">
                    <div 
                        ${a(this.resizeHandleRef)}
                        class="resize-handle"
                        @mousedown=${this.startResize}>
                    </div>
                    <docks-tabs 
                        ${a(this.tabsRef)}
                        id="${this.getDrawerTabsId()}"
                        style="width: 100%; height: 100%; display: flex; flex-direction: column;">
                    </docks-tabs>
                </wa-drawer>
            `}
        `}static{this.styles=n`
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
    `}};K([u()],Pc.prototype,`target`,void 0),K([u()],Pc.prototype,`title`,void 0),K([u()],Pc.prototype,`icon`,void 0),K([u({type:Boolean})],Pc.prototype,`disabled`,void 0),K([u()],Pc.prototype,`appearance`,void 0),K([u()],Pc.prototype,`size`,void 0),K([u()],Pc.prototype,`placement`,void 0),K([u()],Pc.prototype,`containerId`,void 0),K([d()],Pc.prototype,`tabContributions`,void 0),K([d()],Pc.prototype,`drawerOpen`,void 0),K([d()],Pc.prototype,`drawerSize`,void 0),Pc=K([i(`docks-fastviews`)],Pc);function Fc(){let e=document.getElementById(`global-dialog-container`);return e||(e=document.createElement(`div`),e.id=`global-dialog-container`,document.body.appendChild(e)),e}var Ic=e=>{try{return new Intl.DisplayNames([e],{type:`language`}).of(e)||e.toUpperCase()}catch{return e.toUpperCase()}},Lc=()=>[...Js.get()].sort(),Rc=async()=>{let e=Lc(),t=Qs.get();return new Promise(n=>{let r=Fc(),i=!1,a=()=>{let e=r.querySelector(`wa-dialog`);e&&!i&&(e.open=!1)},s=()=>{i||(i=!0,o(_``,r),n())},c=async e=>{await q.set(Gs,e),a()},l=_`
            <wa-dialog 
                label="Select Language" 
                open 
                light-dismiss
                @wa-after-hide=${s}>
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
                    ${e.map(e=>_`
                        <div 
                            class="language-item ${e===t?`active`:``}"
                            @click=${()=>c(e)}>
                            <span class="language-code">${e.toUpperCase()}</span>
                            <span class="language-name">${Ic(e)}</span>
                        </div>
                    `)}
                </div>
            </wa-dialog>
        `;o(l,r)})},zc=class extends ma{static{this.styles=n`
        :host {
            display: inline-block;
        }
    `}render(){let e=Qs.get(),t=Ic(e),n=`${t} ${e.toUpperCase()}`;return _`
            <wa-button 
                appearance="plain" 
                size="s"
                title="Current language: ${t}"
                @click=${()=>Rc()}>
                ${X(`language`)}
                ${n}
            </wa-button>
        `}};zc=K([i(`docks-language-selector`)],zc);var Bc={showLeftSidebar:!0,showAuxSidebar:!0,showBottomPanel:!0,showLeftAux:!1,showRightAux:!1};function Vc(e){return{showLeftSidebar:e.showLeftSidebar??Bc.showLeftSidebar,showAuxSidebar:e.showAuxSidebar??Bc.showAuxSidebar,showBottomPanel:e.showBottomPanel??Bc.showBottomPanel,showLeftAux:e.showLeftAux??Bc.showLeftAux,showRightAux:e.showRightAux??Bc.showRightAux}}var Hc=`layoutPanelVisibility`,Uc=`preferredLayoutId`;function Wc(e){switch(e){case`standard-bottom-panel`:return{...Bc,showBottomPanel:!0,showLeftAux:!1,showRightAux:!1};case`standard-bottom-sidebar`:return{...Bc,showBottomPanel:!1,showLeftAux:!0,showRightAux:!1};case`standard-full`:return{...Bc,showLeftAux:!0,showRightAux:!0};default:return{...Bc,showBottomPanel:!1,showLeftAux:!1,showRightAux:!1}}}function Gc(e){return typeof e==`object`&&e.props?{...Bc,showLeftSidebar:e.props.showLeftSidebar!==!1,showAuxSidebar:e.props.showAuxSidebar!==!1,showBottomPanel:e.props.showBottomPanel===!0,showLeftAux:e.props.showLeftAux===!0,showRightAux:e.props.showRightAux===!0}:typeof e==`string`?Wc(e):{...Bc}}async function Kc(e){try{let e=await q.get(Hc);if(e&&typeof e==`object`)return Vc(e)}catch{}try{let e=await q.get(Uc);if(e)return Wc(e)}catch{}return Gc(e)}function qc(e){let t=e??document.getElementById(`app-root`)??document.body;return!t||typeof t.querySelector!=`function`?null:t.querySelector(`docks-standard-layout`)}var Jc=[{key:`showLeftSidebar`,label:`Left sidebar`,icon:`docks layout-standard-left-sidebar`},{key:`showAuxSidebar`,label:`Right sidebar`,icon:`docks layout-standard-right-sidebar`},{key:`showBottomPanel`,label:`Bottom panel`,icon:`docks layout-standard-bottom-panel`},{key:`showLeftAux`,label:`Left Aux`,icon:`docks layout-standard-left-aux`},{key:`showRightAux`,label:`Right Aux`,icon:`docks layout-standard-right-aux`}],Yc=class extends ma{constructor(...e){super(...e),this.panels={...Bc}}doBeforeUI(){let e=()=>{let e=qc();this.panels=e?.getPanelVisibility()??{...Bc},this.requestUpdate()};return e(),window.addEventListener(`app-loaded`,e),window.addEventListener(`layout-panels-changed`,e),()=>{window.removeEventListener(`app-loaded`,e),window.removeEventListener(`layout-panels-changed`,e)}}async handleSelect(e){let t=qc();if(!t)return;let n=e.detail?.item,r=n?.value;if(n&&r)try{await t.setPanelVisibility({[r]:n.checked??!1}),this.panels=t.getPanelVisibility()}catch(e){console.error(`Failed to update layout panels:`,e)}}render(){return qc()?_`
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
                    ${X(`docks layout-standard-full`,{label:`Layout panels`})}
                </wa-button>
                ${Jc.map(e=>_`
                        <wa-dropdown-item
                            value="${e.key}"
                            type="checkbox"
                            ?checked=${this.panels[e.key]}>
                            ${X(e.icon,{label:e.label,slot:`icon`})}
                            ${e.label}
                        </wa-dropdown-item>
                    `)}
            </wa-dropdown>
        `:_``}static{this.styles=n`
        :host {
            display: inline-block;
        }
    `}};K([d()],Yc.prototype,`panels`,void 0),Yc=K([i(`docks-layout-switcher`)],Yc);function Xc(e){return e}function Zc(e){return e.homepage??e.repository}var Qc=class extends os{constructor(...e){super(...e),this.scrollMode=`none`}static{this.styles=[n`
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
        `]}renderPackageName(e,t){let n=Zc(t);return _`
            <span class="pkg-name">
                ${n?_`<a href=${n} target="_blank" rel="noopener noreferrer">${e}</a>`:e}
            </span>
        `}renderMetaRows(e){return _`
            ${e.license?_`
                      <wa-tree-item>
                          <span class="pkg-meta">
                              <span class="pkg-meta-label">License:</span> ${e.license}
                          </span>
                      </wa-tree-item>
                  `:v}
            ${e.description?_`
                      <wa-tree-item>
                          <span class="pkg-meta">
                              <span class="pkg-meta-label">Description:</span> ${e.description}
                          </span>
                      </wa-tree-item>
                  `:v}
        `}renderDependencyNode(e,t,n,r){if(!t)return v;let i=n[e]??[],a=i.length>0||t.license||t.description;return _`
            <wa-tree-item ?expanded=${a}>
                ${this.renderPackageName(e,t)}
                ${this.renderMetaRows(t)}
                ${i.map(e=>{let t=Xc(r[e]);return t?this.renderDependencyNode(e,t,n,r):v})}
            </wa-tree-item>
        `}renderContent(){let e=Co.getCurrentApp(),t=e?.dependencies??{},n=e?.directDependencies&&e.directDependencies.length>0?e.directDependencies:Object.keys(t),r=e?.nestedDependencies??{};return n.length===0?_`<div class="packages-panel">No package information available.</div>`:_`
            <div class="packages-panel">
                <wa-tree style="--indent-guide-width: 1px;">
                    <wa-tree-item expanded>
                        <span>${e?.name??``}</span>
                        ${n.map(e=>this.renderDependencyNode(e,Xc(t[e]),r,t))}
                    </wa-tree-item>
                </wa-tree>
            </div>
        `}};Qc=K([i(`docks-npm-packages`)],Qc);function $c(e){let t=e.component;return t instanceof Function?t():s(t)}var el=class extends os{constructor(...e){super(...e),this.scrollMode=`none`,this.attributions=[]}static{this.styles=[n`
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
        `]}doBeforeUI(){this.loadAttributions(),this.subscribe(E,e=>{e.target===`system.attributions`&&this.loadAttributions()})}loadAttributions(){this.attributions=D.getContributions(Ri).filter(e=>`component`in e&&Oe(e))}renderContent(){return this.attributions.length===0?_`<div class="attributions">No attributions to display.</div>`:_`
            <div class="attributions">
                ${this.attributions.map(e=>_`
                        <section class="attribution">
                            ${e.label?_`<h3>${e.label}</h3>`:v}
                            ${$c(e)}
                        </section>
                    `)}
            </div>
        `}};K([d()],el.prototype,`attributions`,void 0),el=K([i(`docks-attribution`)],el),D.registerContribution(Vi,{name:Bo,label:`Workspace`,icon:`folder`,component:e=>_`<docks-filebrowser id="${e}"></docks-filebrowser>`}),D.registerContribution(Gi,{name:Vo,label:`Log Messages`,icon:`list`,component:e=>_`<docks-log-terminal id="${e}"></docks-log-terminal>`}),D.registerContribution(zi,{name:es,label:`Attributions`,icon:`copyright`,ranking:100,toolbar:!1,contextMenu:!1,component:e=>_`<docks-attribution id="${e}" embedded></docks-attribution>`}),D.registerContribution(zi,{name:Qo,label:`Release History`,icon:`clock-rotate-left`,ranking:50,toolbar:!1,contextMenu:!1,component:e=>_`<docks-release-history id="${e}" embedded></docks-release-history>`}),D.registerContribution(zi,{name:$o,label:`NPM Packages`,icon:`cubes`,ranking:0,toolbar:!1,contextMenu:!1,component:e=>_`<docks-npm-packages id="${e}" embedded></docks-npm-packages>`}),D.registerContribution(Pi,{name:Ho,label:`Info`,icon:`circle-info`,command:`show_version_info`,showLabel:!0}),D.registerContribution(Pi,{name:Uo,label:`Fast Views`,component:`<docks-fastviews target="system.fastviews-bottomend" icon="bolt" title="Fast Views"></docks-fastviews>`}),D.registerContribution(Pi,{name:Wo,label:`Language`,component:()=>_`<docks-language-selector></docks-language-selector>`}),D.registerContribution(Ai,{name:Go,label:`Layout panels`,component:()=>_`<docks-layout-switcher></docks-layout-switcher>`}),D.registerContribution(Fi,{name:Xo,command:`open_extensions`,icon:`puzzle-piece`,label:`Extensions`});function tl(e){let t=e.component??(()=>!e.license||!e.licenseUrl?_`<p>${e.label}</p>`:_`
                <p>
                    ${e.label} is used under the
                    <a href=${e.licenseUrl} target="_blank" rel="noopener noreferrer">${e.license}</a>.
                    ${e.projectUrl?_`
                              See
                              <a href=${e.projectUrl} target="_blank" rel="noopener noreferrer"
                                  >${e.projectLabel??e.projectUrl}</a
                              >.
                          `:v}
                </p>
            `);D.registerContribution(Ri,{name:e.name,label:e.label,ranking:e.ranking??0,component:t})}tl({name:ts,label:`Eclipse Docks`,ranking:1e3,component:()=>_`
        <p>Copyright (c) 2026 The Eclipse Foundation and others.</p>
        <p>
            Eclipse Docks is made available under the
            <a href="https://www.eclipse.org/legal/epl-2.0" target="_blank" rel="noopener noreferrer"
                >Eclipse Public License 2.0</a
            >.
        </p>
    `}),tl({name:ns,label:`Font Awesome`,ranking:900,component:()=>_`
        <p>
            Icons by
            <a href="https://fontawesome.com" target="_blank" rel="noopener noreferrer">Font Awesome</a>.
            Font Awesome Free is licensed under
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer"
                >CC BY 4.0</a
            >.
        </p>
    `});var nl=class extends as{constructor(...e){super(...e),this.showLeftAux=!1,this.showBottomPanel=!0,this.showLeftSidebar=!0,this.showAuxSidebar=!0,this.showRightAux=!1,this.panelsInitialized=!1}createRenderRoot(){return this}getPanelVisibility(){return{showLeftSidebar:this.showLeftSidebar,showAuxSidebar:this.showAuxSidebar,showBottomPanel:this.showBottomPanel,showLeftAux:this.showLeftAux,showRightAux:this.showRightAux}}applyPanelVisibility(e){this.showLeftSidebar=e.showLeftSidebar,this.showAuxSidebar=e.showAuxSidebar,this.showBottomPanel=e.showBottomPanel,this.showLeftAux=e.showLeftAux,this.showRightAux=e.showRightAux}async setPanelVisibility(e){let t={...this.getPanelVisibility(),...e};this.applyPanelVisibility(t);try{await q.set(Hc,t)}catch(e){throw console.error(`Failed to persist layout panel visibility:`,e),e}window.dispatchEvent(new CustomEvent(`layout-panels-changed`,{detail:{panels:this.getPanelVisibility()}}))}doInitUI(){this.initializePanelVisibility()}async initializePanelVisibility(){if(this.panelsInitialized)return;this.panelsInitialized=!0;let e=Co.getCurrentApp()?.layout,t=await Kc(e);this.applyPanelVisibility(t),window.dispatchEvent(new CustomEvent(`layout-panels-changed`,{detail:{panels:this.getPanelVisibility()}}))}getGridSizes(){return this.showLeftSidebar&&this.showAuxSidebar?`20%, 60%, 20%`:this.showLeftSidebar?`20%, 80%`:this.showAuxSidebar?`80%, 20%`:`100%`}render(){return _`
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
                <docks-toolbar id=${ki}></docks-toolbar>
                <docks-toolbar id=${ji}></docks-toolbar>
                <docks-toolbar class="toolbar-end" id=${Ai}></docks-toolbar>
            </div>
            
            <docks-resizable-grid 
                class="main-layout"
                id="main-layout" 
                orientation="horizontal" 
                sizes=${this.getGridSizes()}>
                
                ${this.showLeftSidebar?_`
                        ${this.showLeftAux?_`
                                <docks-resizable-grid 
                                    id="left-sidebar-split" 
                                    orientation="vertical" 
                                    sizes="50%, 50%">
                                    <docks-tabs id="${Vi}" placement="start" icon-only with-toolbar item-size="l"></docks-tabs>
                                    <docks-tabs id="${Hi}"  placement="start" icon-only></docks-tabs>
                                </docks-resizable-grid>
                            `:_`<docks-tabs id="${Vi}" placement="start" icon-only with-toolbar item-size="l"></docks-tabs>`}
                    `:v}
                
                ${this.showBottomPanel?_`
                        <docks-resizable-grid 
                            id="editor-area-split" 
                            orientation="vertical" 
                            sizes="70%, 30%">
                            <docks-tabs id="${Bi}"></docks-tabs>
                            <docks-tabs id="${Gi}"></docks-tabs>
                        </docks-resizable-grid>
                    `:_`<docks-tabs id="${Bi}"></docks-tabs>`}
                
                ${this.showAuxSidebar?_`
                        ${this.showRightAux?_`
                                <docks-resizable-grid
                                    id="right-sidebar-split"
                                    orientation="vertical"
                                    sizes="50%, 50%">
                                    <docks-tabs id="${Ui}"></docks-tabs>
                                    <docks-tabs id="${Wi}" placement="start" icon-only></docks-tabs>
                                </docks-resizable-grid>
                            `:_`<docks-tabs id="${Ui}"></docks-tabs>`}
                    `:v}
            </docks-resizable-grid>
            
            <div class="toolbar-bottom">
                <docks-toolbar id=${Mi}></docks-toolbar>
                <docks-toolbar id=${Ni}></docks-toolbar>
                <docks-toolbar class="toolbar-end" id=${Pi}></docks-toolbar>
            </div>
        `}};K([u({type:Boolean,attribute:`show-left-aux`})],nl.prototype,`showLeftAux`,void 0),K([u({type:Boolean,attribute:`show-bottom-panel`})],nl.prototype,`showBottomPanel`,void 0),K([u({type:Boolean,attribute:`show-left-sidebar`})],nl.prototype,`showLeftSidebar`,void 0),K([u({type:Boolean,attribute:`show-aux-sidebar`})],nl.prototype,`showAuxSidebar`,void 0),K([u({type:Boolean,attribute:`show-right-aux`})],nl.prototype,`showRightAux`,void 0),nl=K([i(`docks-standard-layout`)],nl),D.registerContribution(Li,{id:`standard`,name:`Standard`,label:`Standard`,icon:`docks layout-standard-full`,component:`docks-standard-layout`});async function rl(e,t=!0){let n=await L.getWorkspace();if(!n)return null;let r=e?.path;return t&&!r?null:{workspace:n,path:r||``}}function il(e){return e&&typeof e.getContent==`function`&&typeof e.getSelection==`function`&&typeof e.getSnippet==`function`&&typeof e.getLanguage==`function`&&typeof e.getFilePath==`function`}function al(e=!1){let t={filePath:null,language:null};return e?{...t,snippet:null,cursorLine:null}:t}async function ol(e,t=!0){let n=await rl(e,t);if(!n)return null;let{workspace:r,path:i}=n;if(!i)return null;try{let e=await r.getResource(i);return!e||!(e instanceof P)?null:{workspace:r,path:i,file:e}}catch{return null}}j({command:{id:`disconnect_folder`,name:`Disconnect folder`,description:`Disconnects a folder from the workspace`},handler:{execute:async()=>{let e=k.get();if(!(e instanceof F&&e.getParent()===void 0)){C(`Select a folder root to disconnect.`);return}try{let t=await L.getFolderInfoForDirectory(e);if(t?.type===`indexeddb`){if(!await Fo(`Also delete "${t.name}" from browser storage?\n\nIf not deleted, the folder data and blobs remain in IndexedDB.`))return;await Ya(e),Ce(`Deleted IndexedDB data for ${t.name}.`)}await L.disconnectFolder(e)}catch(e){C(e.message)}}},contribution:{target:`contextmenu:view.filebrowser`,label:`Disconnect folder`,icon:`folder-minus`,disabled:()=>{let e=k.get();return!(e instanceof F&&e.getParent()===void 0)}}}),j({command:{id:`load_workspace`,name:`Local Folder`,description:`Connect to a local folder using File System Access API`,parameters:[]},handler:{execute:async e=>{try{let e=await window.showDirectoryPicker({mode:`readwrite`});await L.connectWorkspace(e)}catch(e){throw e?.name===`AbortError`||/abort|cancel/i.test(String(e?.message??e))||C(e?.message??String(e)),e instanceof Error?e:Error(String(e))}}},contribution:{target:`filebrowser.connections`,label:`Local Folder`,icon:`folder-open`}}),j({command:{id:`connect_opfs`,name:`OPFS`,description:`Connect to Origin Private File System (browser storage)`,parameters:[]},handler:{execute:async()=>{try{await L.connectFolder({opfs:!0})}catch(e){C(e.message)}}},contribution:{target:`filebrowser.connections`,label:`OPFS (Browser Storage)`,icon:`database`}}),j({command:{id:`connect_indexeddb`,name:`IndexedDB`,description:`Connect to IndexedDB-backed workspace (browser storage)`,parameters:[{name:`name`,description:`Optional display name for this IndexedDB workspace root`,required:!1}]},handler:{execute:async e=>{let t=e.params?.name;try{await L.connectFolder({indexeddb:!0,name:t})}catch(e){C(e.message)}}},contribution:{target:`filebrowser.connections`,label:`IndexedDB (Browser Storage)`,icon:`database`}}),j({command:{id:`connect_memory`,name:`In-Memory`,description:`Mount the shared in-memory workspace root (ephemeral, not persisted)`,parameters:[]},handler:{execute:async()=>{try{await L.connectFolder({memory:!0})}catch(e){C(e.message)}}},contribution:{target:`filebrowser.connections`,label:`In-Memory`,icon:`memory`}}),j({command:{id:`refresh_resource`,name:`Refresh resource`,description:`Refreshes the connected folder of the selected resource, or the whole workspace if nothing is selected`,parameters:[]},handler:{execute:async()=>{let e=k.get();if(e){e.getWorkspace().touch();return}let t=await L.getWorkspace();if(!t){C(`No workspace selected.`);return}t.touch()}}}),j({command:{id:`open_editor`,name:`Open editor`,description:`Opens a file in an editor`,parameters:[{name:`path`,description:`The path of the file to open within the workspace; if omitted, the active selection is opened`,required:!1},{name:`editorId`,description:`Open with this editor id; if omitted, use default editor`,required:!1}]},handler:{execute:async e=>{let t=e.params?.path,n=e.params?.editorId,r=null;if(t)r=(await ol({path:t}))?.file??null;else{let e=k.get();r=e instanceof P?e:null}r&&await nc.loadEditor(r,n)}}}),j({command:{id:`get_active_editor_content`,name:`Get active editor content`,description:`Gets the complete contents of the currently active editor. Returns null if no editor is active or if the editor is not a code editor.`,parameters:[],output:[{name:`content`,description:`the complete contents of the active editor, or null if no editor is active`},{name:`filePath`,description:`the workspace path of the file in the active editor, or null if no editor is active`},{name:`language`,description:`the programming language of the active editor, or null if no editor is active`}]},handler:{execute:async e=>{let t=e.activeEditor;if(!il(t))return{...al(),content:null};try{return{content:t.getContent(),filePath:t.getFilePath(),language:t.getLanguage()}}catch{return{...al(),content:null}}}}}),j({command:{id:`get_active_editor_selection`,name:`Get active editor selection`,description:`Gets the currently selected text in the active editor. Returns null if no editor is active, no selection exists, or if the editor is not a code editor.`,parameters:[],output:[{name:`selection`,description:`the selected text in the active editor, or null if no selection exists or no editor is active`},{name:`filePath`,description:`the workspace path of the file in the active editor, or null if no editor is active`},{name:`language`,description:`the programming language of the active editor, or null if no editor is active`}]},handler:{execute:async e=>{let t=e.activeEditor;if(!il(t))return{...al(),selection:null};try{return{selection:t.getSelection(),filePath:t.getFilePath(),language:t.getLanguage()}}catch{return{...al(),selection:null}}}}}),j({command:{id:`get_active_editor_snippet`,name:`Get active editor snippet around cursor`,description:`Gets a code snippet from the active editor with n lines before and n lines after the cursor position. Useful for getting context around the cursor without loading the entire file.`,parameters:[{name:`lines`,description:`number of lines to include before and after the cursor position (default: 5)`,type:`number`,required:!1}],output:[{name:`snippet`,description:`the code snippet with n lines before and after the cursor, or null if no editor is active`},{name:`filePath`,description:`the workspace path of the file in the active editor, or null if no editor is active`},{name:`language`,description:`the programming language of the active editor, or null if no editor is active`},{name:`cursorLine`,description:`the line number where the cursor is positioned (1-based), or null if no editor is active`}]},handler:{execute:async e=>{let t=e.activeEditor;if(!il(t))return al(!0);try{let n=e.params?.lines?parseInt(e.params.lines,10):5;if(isNaN(n)||n<0)return al(!0);let r=t.getSnippet(n);return r?{snippet:r.snippet,filePath:t.getFilePath(),language:t.getLanguage(),cursorLine:r.cursorLine}:al(!0)}catch{return al(!0)}}}}),j({command:{id:`show_version_info`,name:`Show Version Info`,description:`Shows application version information`,parameters:[]},handler:{execute:async e=>{if(!Co.getCurrentApp()){C(`No app loaded`);return}await ms()}}}),j({command:{id:`save`,name:`Save editor`,description:`Saves the active/focused editor`,keyBinding:`CTRL+S`,parameters:[]},handler:{execute:async e=>{let t=O.get();t&&t.isDirty()&&t.save()}},contribution:{target:`toolbar:.system.editors`,icon:`floppy-disk`,label:`Save active editor`,slot:`start`,disabled:()=>{let e=O.get();return!e||!e.isDirty()}}});var sl=`theme`;async function cl(e){let t=document.documentElement;t.classList.remove(`wa-dark`,`wa-light`),t.classList.add(e)}async function ll(){await cl(await q.get(sl)||`wa-dark`)}async function ul(e){await q.set(sl,e)}j({command:{id:`switch_theme`,name:`Switch theme`,description:`Switches between dark and light theme`,parameters:[]},handler:{execute:async e=>{let t=document.documentElement.classList.contains(`wa-dark`)?`wa-light`:`wa-dark`;await cl(t),await ul(t)}},contribution:{target:Ai,name:Ko,icon:`circle-half-stroke`,label:`Theme Switcher`}}),ll().catch(e=>{console.error(`Failed to load theme preference:`,e)}),j({command:{id:`fullscreen`,name:`Toggle fullscreen`,description:`Toggles fullscreen mode`,parameters:[]},handler:{execute:async e=>{let t=document.documentElement;document.fullscreenElement===t?await document.exitFullscreen():await t.requestFullscreen()}},contribution:{target:Ai,name:qo,icon:`expand`,label:`Fullscreen`}}),j({command:{id:`open_extensions`,name:`Open Extensions`,description:`Opens the extensions registry`,parameters:[]},handler:{execute:e=>{nc.loadEditor({title:`Extensions`,data:{},key:`system.extensions`,icon:`puzzle-piece`,state:{},component:e=>_`<docks-extensions id="${e}"></docks-extensions>`},`extensions-editor`).then()}}}),j({command:{id:`list_extensions`,name:`List extensions`,description:`Lists all available extensions with their status (enabled/disabled)`,parameters:[],output:[{name:`extensions`,description:`array of extension objects with id, name, description, experimental flag, and enabled status`}]},handler:{execute:async e=>J.getExtensions().map(e=>({id:e.id,name:e.name,description:e.description,experimental:e.experimental,enabled:J.isEnabled(e.id)}))}}),j({command:{id:`toast_message`,name:`Toast message to user`,description:`Shows a toast message`,parameters:[{name:`message`,description:`the message to toast`,required:!0},{name:`type`,description:`the toast type: info (default), or error`,required:!1}]},handler:{execute:({params:{message:e,type:t}})=>{e&&(t===`error`?C(e):Ce(e))}}});var dl=`//#region src/core/js-runtime-worker.js
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

//# sourceMappingURL=js-runtime-worker-X93bOre4.js.map`,fl=typeof self<`u`&&self.Blob&&new Blob([`URL.revokeObjectURL(import.meta.url);`,dl],{type:`text/javascript;charset=utf-8`});function pl(e){let t;try{if(t=fl&&(self.URL||self.webkitURL).createObjectURL(fl),!t)throw``;let n=new Worker(t,{type:`module`,name:e?.name});return n.addEventListener(`error`,()=>{(self.URL||self.webkitURL).revokeObjectURL(t)}),n}catch{return new Worker(`data:text/javascript;charset=utf-8,`+encodeURIComponent(dl),{type:`module`,name:e?.name})}}function ml(){let e=null,t=null;function n(){return e||(e=new pl,e.onmessage=e=>{let n=t;t=null,n&&(e.data.type===`result`?n.resolve(e.data.value):n.reject(Error(e.data.message??`Unknown error`)))},e.onerror=e=>{let n=t;t=null,n&&n.reject(Error(e.message??`Worker error`))}),e}return{execute(e){return new Promise((r,i)=>{t={resolve:r,reject:i},n().postMessage(e)})},close(){e&&=(e.terminate(),null),t=null}}}function hl(e){let t=ml();return t.execute(e).finally(()=>t.close())}async function gl(e){if(e.code?.trim())return e.code.trim();if(!e.script)return C(`Provide 'script' (file path) or 'code'.`),null;let t=await L.getWorkspace();if(!t)return C(`No workspace selected.`),null;try{let n=await t.getResource(e.script);if(!n||!(n instanceof P))return C(`File not found: `+e.script),null;let r=await n.getContents();return typeof r==`string`?r:(C(`File is not a text file`),null)}catch(e){return C(`Failed to access file: ${e instanceof Error?e.message:String(e)}`),null}}j({command:{id:`js`,name:`Run JavaScript file`,description:`Runs a script via JsRuntime (inline or file). Return value or self.postMessage(value) is shown.`,parameters:[{name:`script`,description:`workspace path to a .js file`,required:!1},{name:`code`,description:`inline JavaScript`,required:!1}]},handler:{execute:async e=>{let t=await gl(e.params??{});if(!t)return;let n=ml();try{let e=await n.execute(t);return e!==void 0&&Ce(String(e)),e}catch(e){C(e instanceof Error?e.message:String(e))}finally{n.close()}}}}),j({command:{id:`open_view_as_editor`,name:`Open view as editor`,description:`Opens a dashboard view in the editor area`,parameters:[{name:`name`,description:`View contribution name`,required:!0},{name:`sourceContributionSlot`,description:`source contribution slot (default: SYSTEM_VIEWS)`,required:!1},{name:`singleTab`,description:`If true, close all other editor tabs first so only this view remains open`,required:!1}]},handler:{execute:async({params:e})=>{let t=e?.name;if(!t)return;let n=e?.sourceContributionSlot??`system-views`,r=D.getContributions(n).find(e=>e.name===t);r?.component&&await nc.openTab(r,{singleTab:e?.singleTab===!0})}}});async function _l(e){let t=await L.getWorkspace();if(!t)return C(`No workspace selected.`),null;try{let n=await t.getResource(e);return n instanceof P?n:(C(`File not found: `+e),null)}catch(e){return C(`Failed to access file: ${e.message??e}`),null}}async function vl(e){try{let t=await e.getContents();return typeof t==`string`?t:(C(`File is not a text file`),null)}catch(e){return C(`Failed to read file: ${e.message??e}`),null}}async function yl(e){let t=[],n=await e.listChildren(!0);for(let e of n){if(e instanceof P){t.push(e.getWorkspacePath());continue}e instanceof F&&t.push(...await yl(e))}return t}j({command:{id:`cat`,name:`Cat - Show file contents`,description:`Shows the complete contents of a file`,parameters:[{name:`path`,description:`the path of the file to read`,required:!0}],output:[{name:`content`,description:`the complete contents of the file`}]},handler:{execute:async({params:e})=>{let t=e?.path;if(!t){C(`No file path provided.`);return}let n=await _l(t);if(n)return vl(n)}}}),j({command:{id:`exists`,name:`Exists`,description:`Checks if a file exists at the given path (like bash test -f)`,parameters:[{name:`path`,description:`Path of the file to check, relative to the workspace`,required:!0}],output:[{name:`exists`,description:`true if the file exists, false otherwise`}]},handler:{execute:async({params:e})=>{let t=await L.getWorkspace();if(!t)return!1;let n=e?.path;if(!n)return!1;try{return await t.getResource(n)instanceof P}catch{return!1}}}});function bl(e){return e instanceof P||e instanceof F}D.registerContribution(`filebrowser.create`,{name:`filebrowser.create.file`,command:`touch`,icon:`docks file-plus`,label:`Create File...`,params:{ask:!0}}),D.registerContribution(`filebrowser.create`,{name:`filebrowser.create.folder`,command:`mkdir`,icon:`folder-plus`,label:`Create Folder...`,params:{ask:!0}}),D.registerContribution(`contextmenu:view.filebrowser`,{name:`contextmenu.filebrowser.create-folder`,command:`mkdir`,icon:`folder-plus`,label:`Create Folder...`,params:{ask:!0}}),D.registerContribution(`contextmenu:view.filebrowser`,{name:`contextmenu.filebrowser.rename`,command:`mv`,icon:`pen`,label:`Rename`,disabled:()=>!bl(k.get())}),D.registerContribution(`contextmenu:view.filebrowser`,{name:`contextmenu.filebrowser.delete`,command:`rm`,icon:`trash`,label:`Delete`,disabled:()=>{let e=k.get();return!bl(e)||e instanceof F&&e.getParent()===void 0}}),j({command:{id:`head`,name:`Head - Show first lines`,description:`Shows the first N lines of a file`,parameters:[{name:`path`,description:`the path of the file to read`,required:!0},{name:`lines`,description:`number of lines to show from the beginning (default: 10)`,type:`number`,required:!1}],output:[{name:`content`,description:`the first N lines of the file`}]},handler:{execute:async({params:e})=>{let t=e?.path;if(!t){C(`No file path provided.`);return}let n=await _l(t);if(!n)return;let r=e?.lines?parseInt(e.lines,10):10;if(Number.isNaN(r)||r<1){C(`Number of lines must be a positive integer`);return}let i=await vl(n);if(i)return i.split(`
`).slice(0,r).join(`
`)}}}),j({command:{id:`ls`,name:`List files`,description:`Lists files from a directory. If recursive is provided, it traverses from the provided directory down to all leaves. If no directory is provided, it will traverse from the workspace root.`,parameters:[{name:`path`,description:`the path of the directory to list, relative to the workspace. If not provided, uses workspace root`,required:!1},{name:`recursive`,description:`whether to recursively traverse all subdirectories`,type:`boolean`,required:!1}],output:[{name:`files`,description:`array of file objects with path and size information`}]},handler:{execute:async({params:e})=>{let t=await L.getWorkspace();if(!t)return C(`No workspace available`),[];let n=e?.path,r=e?.recursive===!0||e?.recursive===`true`;try{let e=t;if(n){let r=await t.getResource(n);if(!r)return C(`Path not found: ${n}`),[];if(!(r instanceof F))return C(`Path is not a directory: ${n}`),[];e=r}if(r){let n=await yl(e),r=[];for(let e of n){let n=await t.getResource(e);n instanceof P&&r.push({path:e,size:await n.size()})}return r}let i=await e.listChildren(!0),a=[];for(let e of i){if(e instanceof F){a.push({path:e.getWorkspacePath(),kind:`directory`,size:null});continue}e instanceof P&&a.push({path:e.getWorkspacePath(),kind:`file`,size:await e.size()})}return a}catch(e){return C(`Failed to list files: ${e.message??e}`),[]}}}});function xl(e){return e.replace(/^\/+/,``).replace(/\/+$/,``)}function Sl(){let e=k.get();if(e instanceof F)return e.getWorkspacePath();if(e instanceof P)return e.getParent()?.getWorkspacePath()}function Cl(e,t){return e?`${e}/${t}`:t}async function wl(e){let t=await L.getWorkspace();if(!t){C(`No workspace selected.`);return}let n=`New Folder`,r=Cl(e,n),i=await t.getResource(r);if(!i)return r;let a=0;for(;;){if(r=Cl(e,`${n} (${a})`),i=await t.getResource(r),!i)return r;a++}}j({command:{id:`mkdir`,name:`mkdir - Create new folder`,description:`Creates a new folder within the workspace.`,parameters:[{name:`path`,description:`the folder path to create, relative to the workspace`,required:!1},{name:`ask`,description:`whether to prompt the user for the folder path`,required:!1}],output:[{name:`path`,description:`the path of the created folder`}]},handler:{execute:async({params:e})=>{let t=e?.ask,n=e?.path,r=await wl(Sl());if(!r||(t||!n)&&(n=await To(`Enter path to new folder:`,n||r),!n))return;let i=n.startsWith(`/`),a=xl(n);if(!a){C(`Folder path must not be empty.`);return}if(!i){let e=Sl();e&&!a.startsWith(e+`/`)&&(a=`${e}/${a}`)}let o=await L.getWorkspace();if(!o){C(`No workspace selected.`);return}let s=await o.getResource(a);if(s instanceof F)return Ce(`Folder already exists: ${a}`),a;if(s instanceof P){C(`Cannot create folder. A file already exists at "${a}".`);return}if(!(await o.getResource(`${a}/`,{create:!0})instanceof F)){C(`Could not create folder: ${a}`);return}return Ce(`Folder created: ${a}`),a}}}),j({command:{id:`mv`,name:`mv - Rename a resource (file or directory)`,description:`Renames a resource (file or directory)`,keyBinding:`F2`,parameters:[{name:`path`,description:`the path of the resource within the workspace to rename or the currently active selection`,required:!1},{name:`newName`,description:`the new name for the resource`,required:!1}]},handler:{execute:async e=>{let t=await L.getWorkspace();if(!t){C(`No workspace selected.`);return}let n=e.params?.path,r=null;if(n&&(r=await t.getResource(n)),r||=k.get(),!r){C(`No resource to rename provided!`);return}let i=r.getName(),a=e.params?.newName??await To(`Enter new name for "${i}":`,i);if(a&&a!==i)try{await r.rename(a),Ce(`Resource renamed to: ${a}`)}catch(e){C(`Failed to rename ${i}: ${e.message??e}`)}}}}),j({command:{id:`rm`,name:`rm - Delete a resource (file or directory)`,description:`Deletes a resource (file or directory)`,keyBinding:`Delete`,parameters:[{name:`path`,description:`the path of the resource within the workspace to delete or the currently active selection`,required:!1},{name:`confirm`,description:`whether to ask the user to confirm the deletion, true by default`,required:!1}]},handler:{execute:async e=>{let t=await L.getWorkspace();if(!t){C(`No workspace selected.`);return}let n=e.params?.path,r=null;if(n&&(r=await t.getResource(n)),r||=k.get(),!r){C(`No resource to delete provided!`);return}if(r instanceof F&&r.getParent()===void 0){C(`Root folders cannot be deleted. Use "Disconnect folder" instead.`);return}let i=r.getWorkspacePath(),a=e.params?.confirm;if(a!==void 0&&a!==!0||await Fo(`Are you sure you want to delete ${i}?`))try{await r.delete(),Ce(`Resource deleted: `+i)}catch(e){C(`Resource ${i} could not be deleted: ${e.message??e}`)}}}}),j({command:{id:`tail`,name:`Tail - Show last lines`,description:`Shows the last N lines of a file`,parameters:[{name:`path`,description:`the path of the file to read`,required:!0},{name:`lines`,description:`number of lines to show from the end (default: 10)`,type:`number`,required:!1}],output:[{name:`content`,description:`the last N lines of the file`}]},handler:{execute:async({params:e})=>{let t=e?.path;if(!t){C(`No file path provided.`);return}let n=await _l(t);if(!n)return;let r=e?.lines?parseInt(e.lines,10):10;if(Number.isNaN(r)||r<1){C(`Number of lines must be a positive integer`);return}let i=await vl(n);if(i)return i.split(`
`).slice(-r).join(`
`)}}}),j({command:{id:`touch`,name:`Touch - Create new file`,description:`Creates a new file within the workspace. For .docks map files, use create_map_file instead.`,parameters:[{name:`path`,description:`the path including name of the file to be created, must be relative to the workspace`,required:!1},{name:`contents`,description:`the textual contents of the file`,required:!1},{name:`ask`,description:`whether to prompt the user for the file path`,required:!1},{name:`extension`,description:`required file extension (e.g., '.docks'), will be appended if missing`,required:!1}],output:[{name:`path`,description:`the path of the created file`}]},handler:{execute:async({params:e})=>{let t=e?.path,n=e?.contents,r=e?.ask,i=e?.extension;if((r||!t)&&(t=await To(`Enter path to new file (directories will be created if not exist):`,t||``),!t))return;if(i&&!t.endsWith(i)&&(t+=i),t.startsWith(`/`))t=t.slice(1);else{let e=k.get(),n=e instanceof F?e.getWorkspacePath():e instanceof P?e.getParent()?.getWorkspacePath():void 0;n&&!t.startsWith(n+`/`)&&(t=n+`/`+t)}let a=await L.getWorkspace();if(!a){C(`No workspace selected.`);return}if(await a.getResource(t)&&!await Fo(`File "${t}" already exists. Do you want to overwrite it?`))return;let o=await a.getResource(t,{create:!0});if(!(o instanceof P)){C(`Could not create file: `+t);return}return n&&await o.saveContents(n),Ce(`File created: ${t}`),t}}}),j({command:{id:`wc`,name:`Word count`,description:`Counts lines, words, and characters in a file`,parameters:[{name:`path`,description:`the path of the file to analyze`,required:!0}],output:[{name:`lines`,description:`number of lines in the file`},{name:`words`,description:`number of words in the file`},{name:`characters`,description:`number of characters in the file`}]},handler:{execute:async({params:e})=>{let t=e?.path;if(!t){C(`No file path provided.`);return}let n=await _l(t);if(!n)return;let r=await vl(n);if(!r)return;let i=r.split(`
`),a=r.trim(),o=a===``?0:a.split(/\s+/).filter(e=>e.length>0).length;return{lines:i.length,words:o,characters:r.length}}}});function Tl(){return`downloaded-file-${new Date().toISOString().replace(/[:.]/g,`-`).replace(`T`,`_`).slice(0,-5)}`}function El(e){if(e.startsWith(`data:`))return Tl();try{let t=new URL(e).pathname.split(`/`).filter(e=>e.length>0),n=t[t.length-1];if(n?.includes(`.`)&&!n.includes(`;`))return n}catch{}return Tl()}j({command:{id:`wget`,name:`wget`,description:`Download a file from a URL to the workspace`,parameters:[{name:`url`,description:`the URL of the file to download`,required:!0},{name:`filename`,description:`optional filename to save as (will be auto-detected if not provided)`,required:!1},{name:`targetPath`,description:`workspace path where to save; if not provided, a file browser dialog is shown to pick a directory`,required:!1}]},handler:{canExecute:e=>{try{return new URL(e.params?.url),!0}catch{return!1}},execute:async e=>{let t=e.params?.url;if(!t){C(`No URL provided.`);return}let n=await L.getWorkspace();if(!n){C(`No workspace selected.`);return}let r=(typeof e.params?.filename==`string`?e.params.filename.trim():``)||El(t),i,a=e.params?.targetPath;if(a){let e=await L.getFolders(),t=e.length>0?e[0].name:null,n=a.includes(`/`)?a:t?`${t}/${a}`:a,o=n.split(`/`).pop()??``;i=o.includes(`.`)&&o!==n?n:`${n.replace(/\/$/,``)}/${r}`}else{let e=await zo(`directory`);if(e==null)return;i=`${e}/${r}`}await $i.runAsync(`Downloading file`,async a=>{a.message=`Starting download...`,a.progress=0;try{let o=await fetch(t,{mode:`cors`,credentials:`omit`});if(!o.ok){C(`Failed to download file: `+o.statusText);return}let s=e.params?.filename;if(!s){let e=o.headers.get(`content-disposition`);if(e){let t=e.match(/filename="?([^";\n]+)"?/);t?.[1]&&(s=t[1].trim())}}s||=r;let c=i.includes(`/`)?i.replace(/\/[^/]+$/,`/${s}`):s;a.message=`Downloading ${s}...`,a.progress=50,await(await n.getResource(c,{create:!0})).saveContents(o.body,{contentType:$e.BINARY}),a.progress=100,Ce(`File downloaded: ${s}`)}catch(e){throw C(`Failed to download file: `+String(e)),e}})}}}),y.put(`constants`,Ki),b.put(`html`,_),b.put(`render`,o),b.put(`toastInfo`,Ce),b.put(`toastError`,C),b.put(`toastWarning`,we),b.put(`publish`,g),b.put(`subscribe`,r);var Dl={};function Ol(e){Dl={...Dl,...e}}function kl(){return{...Dl}}ee(e({ABOUT_TABS:()=>zi,ABOUT_TAB_ATTRIBUTIONS:()=>es,ABOUT_TAB_PACKAGES:()=>$o,ABOUT_TAB_RELEASE:()=>Qo,ATTRIBUTION_ECLIPSE_DOCKS:()=>ts,ATTRIBUTION_FONT_AWESOME:()=>ns,COMMAND_SAVE:()=>qi,CTXMENU_FILEBROWSER_DELETE:()=>is,CTXMENU_FILEBROWSER_RENAME:()=>rs,CommandRegistry:()=>Be,CommandStack:()=>ze,CompositeDirectory:()=>nt,DEFAULT_LAYOUT_PANEL_VISIBILITY:()=>Bc,Directory:()=>F,DocksContainer:()=>as,DocksDialogContent:()=>ha,DocksElement:()=>ma,DocksPart:()=>os,DocksStandardLayout:()=>nl,DocksWidget:()=>We,EDITOR_AREA_MAIN:()=>Bi,EMPTY_SIGNALPORT:()=>je,File:()=>P,FileContentType:()=>$e,FileSysDirHandleResource:()=>ft,HIDE_DOT_RESOURCE:()=>!1,IN_MEMORY_CONTRIBUTION_TYPE:()=>Za,IN_MEMORY_ROOT_NAME:()=>Xa,LAYOUT_PANEL_OPTIONS:()=>Jc,LAYOUT_PANEL_SETTINGS_KEY:()=>Hc,LEGACY_PREFERRED_LAYOUT_KEY:()=>Uc,MemoryMountDirectory:()=>mo,MemoryRootDirectory:()=>oo,MouseButton:()=>Ji,PANEL_BOTTOM:()=>Gi,SIDEBAR_AUXILIARY:()=>Ui,SIDEBAR_AUXILIARY_BOTTOM:()=>Wi,SIDEBAR_MAIN:()=>Vi,SIDEBAR_MAIN_BOTTOM:()=>Hi,SIDEBAR_MAIN_TOOLBAR:()=>Fi,SIDEBAR_TOOLBAR_EXTENSIONS:()=>Xo,SYSTEM_ATTRIBUTIONS:()=>Ri,SYSTEM_DEFAULT_FILE_ICONS:()=>Zo,SYSTEM_LAYOUTS:()=>Li,SYSTEM_VIEWS:()=>Ii,StringFile:()=>tt,TOOLBAR_ACTIVE_PART_NAME:()=>Jo,TOOLBAR_BOTTOM:()=>Mi,TOOLBAR_BOTTOM_CENTER:()=>Ni,TOOLBAR_BOTTOM_END:()=>Pi,TOOLBAR_FAST_VIEWS:()=>Uo,TOOLBAR_FULLSCREEN:()=>qo,TOOLBAR_INFO:()=>Ho,TOOLBAR_LANGUAGE_SELECTOR:()=>Wo,TOOLBAR_LAYOUT_SWITCHER:()=>Go,TOOLBAR_MAIN:()=>ki,TOOLBAR_MAIN_CENTER:()=>ji,TOOLBAR_MAIN_RIGHT:()=>Ai,TOOLBAR_TASKS:()=>Yo,TOOLBAR_THEME_SWITCHER:()=>Ko,TOPIC_COMMAND_REGISTERED:()=>Ie,TOPIC_CONTRIBUTEIONS_CHANGED:()=>E,TOPIC_SETTINGS_CHANGED:()=>Zi,TOPIC_WORKSPACE_CHANGED:()=>M,TOPIC_WORKSPACE_CONNECTED:()=>Ze,VIEW_FILEBROWSER:()=>Bo,VIEW_LOG_TERMINAL:()=>Vo,WorkspaceService:()=>ut,activeEditorSignal:()=>Me,activePartSignal:()=>O,activeSelectionSignal:()=>k,activeTasksSignal:()=>Pe,appLoaderService:()=>Co,appSettings:()=>q,applyConfigNameRemaps:()=>Ee,commandRegistry:()=>A,configureFramework:()=>Ol,confirmDialog:()=>Fo,contributionRegistry:()=>D,contributionTargetMappingRegistry:()=>Te,createJsRuntime:()=>ml,createLazyLabel:()=>ec,createLogger:()=>ge,dialogService:()=>wa,editorRegistry:()=>nc,esmShService:()=>ta,extensionRegistry:()=>J,filebrowserDialog:()=>zo,findStandardLayout:()=>qc,formDialog:()=>Ao,formDialogRequired:()=>jo,getFrameworkConfig:()=>kl,getInMemoryMountProjection:()=>po,getInMemoryRoot:()=>uo,handleDropdownWaSelect:()=>js,i18n:()=>tc,icon:()=>X,infoDialog:()=>No,layoutIdToPanelVisibility:()=>Wc,listContributionNameRemaps:()=>T,logger:()=>S,navigableInfoDialog:()=>Lo,overrideContributionTargets:()=>w,parseIconSpec:()=>Ts,parseMarkdownHtml:()=>pa,partDirtySignal:()=>Ne,persistenceService:()=>Xe,perspectiveSwitchedSignal:()=>Fe,promptDialog:()=>To,publish:()=>g,registerAll:()=>j,registerLicenseAttribution:()=>tl,renderCommandContribution:()=>Fs,renderDropdownContribution:()=>Is,renderDropdownContributions:()=>Ls,renderDropdownItem:()=>Ps,renderDropdownSubmenu:()=>Rs,resolveInitialPanelVisibilityFromApp:()=>Gc,resolveStoredPanelVisibility:()=>Kc,rootContext:()=>y,runJavaScriptCode:()=>hl,sanitizeHtml:()=>fa,setInMemoryMountProjection:()=>fo,setLogLevel:()=>_e,subscribe:()=>r,taskService:()=>$i,toastError:()=>C,toastInfo:()=>Ce,toastWarning:()=>we,treeNodeComparator:()=>rc,uiContext:()=>b,unsubscribe:()=>t,validateFormDialogFields:()=>ko,versionInfoDialog:()=>ms,watchSignal:()=>He,workspaceService:()=>L}),import.meta.url,`core`);export{Uo as $,ze as $t,ma as A,Fs as At,Wi as B,K as Bt,ts as C,y as Cn,js as Ct,rs as D,Ts as Dt,is as E,Lo as Et,mo as F,fa as Ft,Ri as G,ft as Gt,Hi as H,F as Ht,oo as I,fo as It,Ii as J,Ze as Jt,Zo as K,tt as Kt,Ji as L,$i as Lt,Bi as M,Ls as Mt,Za as N,Ps as Nt,as as O,pa as Ot,Xa as P,Rs as Pt,Pi as Q,Be as Qt,Gi as R,ko as Rt,Qo as S,S as Sn,uo as St,qi as T,b as Tn,No as Tt,Fi as U,P as Ut,Vi as V,nt as Vt,Xo as W,$e as Wt,Mi as X,Xe as Xt,Jo as Y,ut as Yt,Ni as Z,L as Zt,hl as _,C as _n,J as _t,Uc as a,O as an,ji as at,es as b,He as bn,jo as bt,ec as c,Ee as cn,Ko as ct,kl as d,Te as dn,Vo as dt,We as en,qo as et,tc as f,T as fn,Co as ft,Kc as g,j as gn,ta as gt,Gc as h,Fe as hn,wa as ht,Hc as i,Me as in,ki as it,os as j,Is as jt,ha as k,To as kt,nc as l,A as ln,Zi as lt,tl as m,Ne as mn,Fo as mt,nl as n,Ie as nn,Wo as nt,Ol as o,k as on,Ai as ot,Wc as p,w as pn,q as pt,Li as q,M as qt,Jc as r,E as rn,Go as rt,ml as s,Pe as sn,Yo as st,Bc as t,je as tn,Ho as tt,qc as u,D as un,Bo as ut,rc as v,Ce as vn,zo as vt,ns as w,_e as wn,X as wt,$o as x,ge as xn,po as xt,zi as y,we as yn,Ao as yt,Ui as z,ms as zt};