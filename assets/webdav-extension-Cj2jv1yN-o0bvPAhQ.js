import{D as e,Ht as t,Kt as n,Tn as r,Ut as i,Vt as a,Yt as o,dn as s,pt as c,wn as l,yn as u}from"./canvas-bridge-core.js-By6utgn9.js";import{C as d,_ as f,l as p,y as m}from"./canvas-bridge-canvas.js-D2E74L6t.js";var h=class{constructor(e){if(this.baseUrl=e.url,e.username!==void 0){let t=`${e.username}:${e.password??``}`;this.authHeader=`Basic ${btoa(t)}`}}async propfind(e,t=1){let n=await fetch(new URL(e,this.baseUrl).href,{method:`PROPFIND`,headers:this.buildHeaders({Depth:t.toString(),"Content-Type":`application/xml`}),body:`<?xml version="1.0" encoding="UTF-8"?>
            <d:propfind xmlns:d="DAV:">
                <d:prop>
                    <d:displayname/>
                    <d:resourcetype/>
                    <d:getcontenttype/>
                    <d:getcontentlength/>
                    <d:getlastmodified/>
                    <d:getetag/>
                </d:prop>
            </d:propfind>`});if(!n.ok)throw Error(`WebDAV PROPFIND failed with status ${n.status}`);let r=await n.text();return this.parseMultiStatus(r)}async getFile(e){let t=await fetch(new URL(e,this.baseUrl).href,{method:`GET`,headers:this.buildHeaders()});if(!t.ok)throw Error(`WebDAV GET failed with status ${t.status}`);return await t.blob()}async putFile(e,t){let n;n=t instanceof ReadableStream?await new Response(t).blob():typeof t==`string`?new Blob([t]):t;let r=await fetch(new URL(e,this.baseUrl).href,{method:`PUT`,headers:this.buildHeaders({"Content-Type":`application/octet-stream`}),body:n});if(!r.ok)throw Error(`WebDAV PUT failed with status ${r.status}`)}async deleteResource(e){let t=await fetch(new URL(e,this.baseUrl).href,{method:`DELETE`,headers:this.buildHeaders()});if(!t.ok)throw Error(`WebDAV DELETE failed with status ${t.status}`)}async createDirectory(e){let t=await fetch(new URL(e,this.baseUrl).href,{method:`MKCOL`,headers:this.buildHeaders()});if(!t.ok)throw Error(`WebDAV MKCOL failed with status ${t.status}`)}async moveResource(e,t){let n=new URL(t,this.baseUrl).href,r=await fetch(new URL(e,this.baseUrl).href,{method:`MOVE`,headers:this.buildHeaders({Destination:n,Overwrite:`F`})});if(!r.ok)throw Error(`WebDAV MOVE failed with status ${r.status}`)}async copyResource(e,t){let n=new URL(t,this.baseUrl).href,r=await fetch(new URL(e,this.baseUrl).href,{method:`COPY`,headers:this.buildHeaders({Destination:n,Overwrite:`F`})});if(!r.ok)throw Error(`WebDAV COPY failed with status ${r.status}`)}buildHeaders(e){let t={...e??{}};return this.authHeader&&(t.Authorization=this.authHeader),this.baseUrl.includes(`/public.php/`)&&!t[`X-Requested-With`]&&(t[`X-Requested-With`]=`XMLHttpRequest`),t}parseMultiStatus(e){let t=new DOMParser().parseFromString(e,`text/xml`).querySelectorAll(`response`),n=[];return t.forEach(e=>{let t=e.querySelector(`href`)?.textContent||``,r=new URL(t,this.baseUrl).href,i=e.querySelector(`displayname`)?.textContent||``,a=!!e.querySelector(`resourcetype`)?.querySelector(`collection`),o=e.querySelector(`getcontenttype`)?.textContent||void 0,s=e.querySelector(`getcontentlength`)?.textContent,c=s?parseInt(s):void 0,l=e.querySelector(`getlastmodified`)?.textContent,u=l?new Date(l):void 0,d=e.querySelector(`getetag`)?.textContent||void 0;n.push({href:r,displayName:i||r.split(`/`).filter(Boolean).pop()||``,isDirectory:a,contentType:o,contentLength:c,lastModified:u,etag:d})}),n}getBaseUrl(){return this.baseUrl}},g=class extends t{constructor(e,t,n){super(),this.client=e,this.resource=t,this.parent=n}getName(){return this.resource.displayName}getParent(){return this.parent}async getContents(e){let t=await this.client.getFile(this.resource.href);return!e||e?.contentType===i.TEXT?await t.text():e?.blob?t:e?.uri?URL.createObjectURL(t):await t.arrayBuffer()}async saveContents(e,t){await this.client.putFile(this.resource.href,e),p(n,o.getWorkspaceSync()??this.getWorkspace())}async size(){return this.resource.contentLength??null}async delete(){await this.client.deleteResource(this.resource.href),p(n,o.getWorkspaceSync()??this.getWorkspace())}async copyTo(e){let t=await this.getWorkspace().getResource(e,{create:!0});if(!t)throw Error(`Failed to create target file: ${e}`);let n=await this.getContents({blob:!0});await t.saveContents(n)}async rename(e){if(this.getName()===e)return;let t=this.resource.href.split(`/`);t[t.length-1]=e;let r=t.join(`/`);await this.client.moveResource(this.resource.href,r),this.resource.href=r,this.resource.displayName=e,p(n,o.getWorkspaceSync()??this.getWorkspace())}},_=class e extends a{constructor(e,t,n,r){if(super(),this.client=e,this.resource=t,this.parent=n,this.connectionInfo=r,!n){let e=r?.name?.trim();this.rootFolderDisplayName=e&&e.length>0?e:v(r?.url??t.href)}}getName(){return this.rootFolderDisplayName===void 0?this.resource.displayName:this.rootFolderDisplayName}getParent(){return this.parent}async listChildren(t=!1){if(t||!this.children){let t=await this.client.propfind(this.resource.href,1);this.children=new Map;for(let n=1;n<t.length;n++){let r=t[n],i=r.isDirectory?new e(this.client,r,this):new g(this.client,r,this);this.children.set(r.displayName,i)}}return Array.from(this.children.values())}async getResource(t,r){if(!t)throw Error(`No path provided`);let i=t.endsWith(`/`),a=t.split(`/`).filter(e=>e.trim()),s=this,c=!1;for(let t=0;t<a.length;t++){let n=a[t];if(s instanceof e){if(await s.listChildren(),!s.children)return null;let o=s.children.get(n);if(!o&&r?.create){let r=this.buildPath(s.resource.href,n);if(t<a.length-1||i){await this.client.createDirectory(r);let t={href:r,displayName:n,isDirectory:!0};o=new e(this.client,t,s),s.children.set(n,o),c=!0}else{await this.client.putFile(r,``);let e={href:r,displayName:n,isDirectory:!1,contentLength:0};o=new g(this.client,e,s),s.children.set(n,o),c=!0}}if(!o||t===a.length-1&&i&&o instanceof g)return null;s=o}}return c&&p(n,o.getWorkspaceSync()??this.getWorkspace()),s}async delete(e,t=!0){if(!e)return this.getParent()?.delete(this.getName());let r=this.buildPath(this.resource.href,e);await this.client.deleteResource(r),this.children?.delete(e),p(n,o.getWorkspaceSync()??this.getWorkspace())}async copyTo(e){for(let t of await this.listChildren()){let n=[e,t.getName()].join(`/`);await t.copyTo(n)}}async rename(e){let t=String(e??``).trim();if(!t||this.getName()===t)return;if(!this.parent){this.rootFolderDisplayName=t,this.connectionInfo&&={...this.connectionInfo,name:t},await o.updateFolderName(this,t);return}let r=this.resource.href.split(`/`).filter(Boolean);r[r.length-1]=t;let i=`/`+r.join(`/`)+`/`;await this.client.moveResource(this.resource.href,i),this.resource.href=i,this.resource.displayName=t,p(n,o.getWorkspaceSync()??this.getWorkspace())}touch(){p(n,o.getWorkspaceSync()??this.getWorkspace())}buildPath(e,t){return e.endsWith(`/`)?e+t:e+`/`+t}getClient(){return this.client}getConnectionInfo(){return this.connectionInfo?this.connectionInfo:{url:this.client.getBaseUrl()}}};function v(e){try{let t=new URL(e).pathname.split(`/`).filter(Boolean);return t[t.length-1]||`workspace`}catch{return`workspace`}}var y=r(`WebDAV`),b=class extends e{constructor(...e){super(...e),this.url=``,this.username=``,this.password=``,this.connecting=!1,this.showHelp=!1}getResult(){return this}async handleConnect(){if(!this.url)return y.error(`Please provide a URL`),!1;try{new URL(this.url)}catch{return y.error(`Invalid URL format`),!1}this.connecting=!0;try{let e,t=this.url.match(/^(https?:\/\/[^\/]+)\/(?:index\.php\/)?s\/([A-Za-z0-9]+)/);if(t){let n=t[1],r=t[2];e={url:`${n}/public.php/webdav/`,username:r,password:this.password||``}}else e={url:this.url,...this.username&&this.password&&{username:this.username,password:this.password}};return await o.connectWorkspace(e),y.info(`Successfully connected to WebDAV workspace`),this.dispatchEvent(new CustomEvent(`connected`,{bubbles:!0,composed:!0})),!0}catch(e){return e instanceof Error?y.error(`Connection failed: ${e.message}`):y.error(`Failed to connect to WebDAV server`),!1}finally{this.connecting=!1}}toggleHelp(){this.showHelp=!this.showHelp}render(){return d`
            <style>
                .webdav-connect-dialog {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    max-width: 500px;
                    padding: 1.5rem;
                    height: 420px;
                    box-sizing: border-box;
                    overflow-y: auto;
                }
                
                .webdav-connect-dialog h2 {
                    margin: 0 0 1rem 0;
                    font-size: 1.5rem;
                }
                
                .password-warning {
                    font-size: 0.8rem;
                    color: var(--wa-color-neutral-400);
                    margin: 0.25rem 0 0.5rem 0;
                }
                
                .help-text {
                    background: var(--wa-color-neutral-50);
                    padding: 1rem;
                    border-radius: 4px;
                    font-size: 0.875rem;
                    margin-top: 1rem;
                }
                
                .help-text h3 {
                    margin-top: 0;
                    font-size: 1rem;
                }
                
                .help-text p {
                    margin: 0.5rem 0;
                }
                
                .help-text code {
                    display: block;
                    background: var(--wa-color-neutral-100);
                    padding: 0.5rem;
                    border-radius: 3px;
                    margin: 0.5rem 0;
                    font-family: monospace;
                    word-break: breaall;
                }
                
                .help-toggle {
                    cursor: pointer;
                    color: var(--wa-color-primary-600);
                    font-size: 0.875rem;
                    text-decoration: underline;
                }
            </style>
            
            <div class="webdav-connect-dialog">
                <wa-input
                    label="WebDAV URL"
                    placeholder="https://cloud.example.com/remote.php/dav/files/username/"
                    .value=${this.url}
                    @input=${e=>this.url=e.target.value}
                    required
                    help-text="The full WebDAV endpoint URL">
                </wa-input>
                
                <wa-input
                    label="Username (optional)"
                    placeholder="username"
                    .value=${this.username}
                    @input=${e=>this.username=e.target.value}
                    help-text="Leave empty for public/shared folders">
                </wa-input>
                
                <wa-input
                    type="password"
                    label="Password (optional)"
                    placeholder="Password or App Password"
                    .value=${this.password}
                    @input=${e=>this.password=e.target.value}
                    help-text="Leave empty for public/shared folders. Use an app password if 2FA is enabled.">
                </wa-input>
                <p class="password-warning">
                    Passwords are stored locally in this browser (base64 encoded). Only use this on machines you trust.
                </p>
                
                ${this.showHelp?d`
                    <div class="help-text">
                        <h3>WebDAV Connection Help</h3>
                        
                        <p><strong>Public/Shared Folders:</strong></p>
                        <p>For publicly shared WebDAV folders, just enter the URL and leave username/password empty.</p>
                        
                        <p><strong>Nextcloud Public Shares:</strong></p>
                        <p>For Nextcloud public shares (e.g., https://cloud.example.com/s/TOKEN):</p>
                        <ul>
                            <li><strong>URL:</strong> You can paste the share link directly into the URL field.</li>
                            <li><strong>Username:</strong> Will be filled automatically from the share token.</li>
                            <li><strong>Password:</strong> Leave empty (or enter the share password if the link is protected).</li>
                        </ul>
                        
                        <p><strong>Nextcloud Personal Files:</strong></p>
                        <p>Your WebDAV URL should look like:</p>
                        <code>https://your-cloud.com/remote.php/dav/files/USERNAME/</code>
                        
                        <p><strong>ownCloud:</strong></p>
                        <code>https://your-owncloud.com/remote.php/dav/files/USERNAME/</code>
                        
                        <p><strong>Two-Factor Authentication:</strong></p>
                        <p>If you have 2FA enabled:</p>
                        <ol>
                            <li>Go to your account settings</li>
                            <li>Find "Security" or "App passwords"</li>
                            <li>Generate a new app password</li>
                            <li>Use that password here instead of your regular password</li>
                        </ol>
                        
                        <p><strong>CORS Issues:</strong></p>
                        <p>If connection fails, your WebDAV server may need CORS configuration. 
                        Contact your administrator or check the server documentation.</p>
                        
                        <p><strong>Security note:</strong> Connection details (including password, if provided) are stored locally in this browser using base64 encoding. Only use this on machines and profiles you trust.</p>
                    </div>
                `:``}
            </div>
        `}};l([f()],b.prototype,`url`,void 0),l([f()],b.prototype,`username`,void 0),l([f()],b.prototype,`password`,void 0),l([f()],b.prototype,`connecting`,void 0),l([f()],b.prototype,`showHelp`,void 0),b=l([m(`docks-webdav-connect`)],b);var x=r(`WebDAV`);u({command:{id:`workspace.connect.webdav`,name:`WebDAV / NextCloud`,description:`Connect to WebDAV servers, Nextcloud shares, ownCloud, and other cloud storage`,parameters:[{name:`url`,type:`string`,description:`WebDAV URL: share link (https://cloud.example.com/s/TOKEN) or direct endpoint`,required:!1},{name:`password`,type:`string`,description:`Password (if required)`,required:!1}]},handler:{execute:async e=>{let t=e.parameters?.url,n=e.parameters?.password;if(!t)await c.open(`webdav-connect-dialog`);else try{let e,r=t.match(/^(https?:\/\/[^\/]+)\/(?:index\.php\/)?s\/([A-Za-z0-9]+)/);if(r){let t=r[1],i=r[2];e={url:`${t}/public.php/webdav/`,username:i,password:n||``}}else e={url:t,...n&&{username:``,password:n}};await o.connectWorkspace(e),x.info(`Connected to WebDAV workspace`)}catch(e){e instanceof Error?x.error(`Failed to connect: ${e.message}`):x.error(`Failed to connect to WebDAV workspace`)}}},contribution:{target:`filebrowser.connections`,name:`filebrowser.connections.webdav`,label:`WebDAV / NextCloud`,icon:`cloud`}});var S=r(`WebDAVExtension`);function C(e,t){let n=e?.replace(/[\\/]/g,` `).replace(/\s+/g,` `).trim();if(!n||n===`.`||n===`..`)return;let r=D(t);if(!(n.toLowerCase()===r.toLowerCase()&&/^(webdav|dav)$/i.test(r)))return n}async function w(){let e=await o.getFolders();return new Set(e.map(e=>e.name))}async function T(e){let t=await w();if(e&&!t.has(e))return e;if(!e){let e=1;for(;t.has(`webdav${e}`);)e+=1;return`webdav${e}`}let n=2;for(;t.has(`${e} ${n}`);)n+=1;return`${e} ${n}`}async function E(e,t){let n=t.name?.trim();if(n)return n;try{let[n]=await e.propfind(t.url,0);return await T(C(n?.displayName,t.url))}catch(e){return S.debug(`Could not read WebDAV root name`,e),await T()}}o.registerContribution({type:`webdav`,name:`webdav`,canHandle(e){return e&&typeof e==`object`&&`url`in e&&typeof e.url==`string`},async connect(e){let t=new h(e),n=await E(t,e);return new _(t,{href:e.url,displayName:n,isDirectory:!0},void 0,{...e,name:n})},async restore(e){if(e&&e.url)try{let t={url:e.url,username:e.username,password:e.password?k(e.password):void 0},n=typeof e.name==`string`&&e.name.trim().length>0?e.name.trim():await T();return new _(new h(t),{href:e.url,displayName:D(e.url),isDirectory:!0},void 0,{...t,name:n})}catch(e){S.error(`Failed to restore WebDAV workspace:`,e);return}},async persist(e){if(e instanceof _){let t=e.getConnectionInfo();return t?{url:t.url,name:e.getName(),...t.username===void 0?{}:{username:t.username},...t.password===void 0?{}:{password:O(t.password)}}:null}return null}}),s.registerContribution(`dialogs`,{label:`Connect to WebDAV / NextCloud`,icon:`cloud`,name:`dialog.webdav.connect`,id:`webdav-connect-dialog`,buttons:[{id:`help`,label:`Show help`,variant:`neutral`},{id:`cancel`,label:`Cancel`,variant:`default`},{id:`connect`,label:`Connect`,variant:`primary`}],component:e=>d`<docks-webdav-connect></docks-webdav-connect>`,onButton:async(e,t,n)=>{let r=t;return e===`help`?(r?.toggleHelp(),!1):e===`connect`?r?.handleConnect?await r.handleConnect()?(n?.close?.(),!0):!1:!0:(e===`cancel`&&n?.close?.(),!0)}});function D(e){try{let t=new URL(e).pathname.split(`/`).filter(Boolean);return t[t.length-1]||`workspace`}catch{return`workspace`}}function O(e){try{let t=new TextEncoder().encode(e),n=``;for(let e of t)n+=String.fromCharCode(e);return btoa(n)}catch{return e}}function k(e){try{let t=atob(e),n=new Uint8Array(t.length);for(let e=0;e<t.length;e++)n[e]=t.charCodeAt(e);return new TextDecoder().decode(n)}catch{return e}}export{h as WebDAVClient,_ as WebDAVDirectoryResource,g as WebDAVFileResource};