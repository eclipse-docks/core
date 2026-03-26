import{a as e,c as t,f as n,l as r,n as i,r as a,t as o}from"./fs-access-BzDvih72-I3HNOLAJ.js";import{I as s,J as c,K as l,R as u,S as d,a as f,j as p,mt as m}from"./dist-DIALrMUC.js";var h=class{constructor(e){if(this.baseUrl=e.url,e.username!==void 0){let t=`${e.username}:${e.password??``}`;this.authHeader=`Basic ${btoa(t)}`}}async propfind(e,t=1){let n=await fetch(new URL(e,this.baseUrl).href,{method:`PROPFIND`,headers:this.buildHeaders({Depth:t.toString(),"Content-Type":`application/xml`}),body:`<?xml version="1.0" encoding="UTF-8"?>
            <d:propfind xmlns:d="DAV:">
                <d:prop>
                    <d:displayname/>
                    <d:resourcetype/>
                    <d:getcontenttype/>
                    <d:getcontentlength/>
                    <d:getlastmodified/>
                    <d:getetag/>
                </d:prop>
            </d:propfind>`});if(!n.ok)throw Error(`WebDAV PROPFIND failed with status ${n.status}`);let r=await n.text();return this.parseMultiStatus(r)}async getFile(e){let t=await fetch(new URL(e,this.baseUrl).href,{method:`GET`,headers:this.buildHeaders()});if(!t.ok)throw Error(`WebDAV GET failed with status ${t.status}`);return await t.blob()}async putFile(e,t){let n;n=t instanceof ReadableStream?await new Response(t).blob():typeof t==`string`?new Blob([t]):t;let r=await fetch(new URL(e,this.baseUrl).href,{method:`PUT`,headers:this.buildHeaders({"Content-Type":`application/octet-stream`}),body:n});if(!r.ok)throw Error(`WebDAV PUT failed with status ${r.status}`)}async deleteResource(e){let t=await fetch(new URL(e,this.baseUrl).href,{method:`DELETE`,headers:this.buildHeaders()});if(!t.ok)throw Error(`WebDAV DELETE failed with status ${t.status}`)}async createDirectory(e){let t=await fetch(new URL(e,this.baseUrl).href,{method:`MKCOL`,headers:this.buildHeaders()});if(!t.ok)throw Error(`WebDAV MKCOL failed with status ${t.status}`)}async moveResource(e,t){let n=new URL(t,this.baseUrl).href,r=await fetch(new URL(e,this.baseUrl).href,{method:`MOVE`,headers:this.buildHeaders({Destination:n,Overwrite:`F`})});if(!r.ok)throw Error(`WebDAV MOVE failed with status ${r.status}`)}async copyResource(e,t){let n=new URL(t,this.baseUrl).href,r=await fetch(new URL(e,this.baseUrl).href,{method:`COPY`,headers:this.buildHeaders({Destination:n,Overwrite:`F`})});if(!r.ok)throw Error(`WebDAV COPY failed with status ${r.status}`)}buildHeaders(e){let t={...e??{}};return this.authHeader&&(t.Authorization=this.authHeader),t}parseMultiStatus(e){let t=new DOMParser().parseFromString(e,`text/xml`).querySelectorAll(`response`),n=[];return t.forEach(e=>{let t=e.querySelector(`href`)?.textContent||``,r=new URL(t,this.baseUrl).href,i=e.querySelector(`displayname`)?.textContent||``,a=!!e.querySelector(`resourcetype`)?.querySelector(`collection`),o=e.querySelector(`getcontenttype`)?.textContent||void 0,s=e.querySelector(`getcontentlength`)?.textContent,c=s?parseInt(s):void 0,l=e.querySelector(`getlastmodified`)?.textContent,u=l?new Date(l):void 0,d=e.querySelector(`getetag`)?.textContent||void 0;n.push({href:r,displayName:i||r.split(`/`).filter(Boolean).pop()||``,isDirectory:a,contentType:o,contentLength:c,lastModified:u,etag:d})}),n}getBaseUrl(){return this.baseUrl}},g=class extends i{constructor(e,t,n){super(),this.client=e,this.resource=t,this.parent=n}getName(){return this.resource.displayName}getParent(){return this.parent}async getContents(e){let t=await this.client.getFile(this.resource.href);return!e||e?.contentType===a.TEXT?await t.text():e?.blob?t:e?.uri?URL.createObjectURL(t):await t.arrayBuffer()}async saveContents(n,i){await this.client.putFile(this.resource.href,n),r(e,t.getWorkspaceSync()??this.getWorkspace())}async size(){return this.resource.contentLength??null}async delete(){await this.client.deleteResource(this.resource.href),r(e,t.getWorkspaceSync()??this.getWorkspace())}async copyTo(e){let t=await this.getWorkspace().getResource(e,{create:!0});if(!t)throw Error(`Failed to create target file: ${e}`);let n=await this.getContents({blob:!0});await t.saveContents(n)}async rename(n){if(this.getName()===n)return;let i=this.resource.href.split(`/`);i[i.length-1]=n;let a=i.join(`/`);await this.client.moveResource(this.resource.href,a),this.resource.href=a,this.resource.displayName=n,r(e,t.getWorkspaceSync()??this.getWorkspace())}},_=class n extends o{constructor(e,t,n,r){super(),this.client=e,this.resource=t,this.parent=n,this.connectionInfo=r}getName(){return this.resource.displayName}getParent(){return this.parent}async listChildren(e=!1){if(e||!this.children){let e=await this.client.propfind(this.resource.href,1);this.children=new Map;for(let t=1;t<e.length;t++){let r=e[t],i=r.isDirectory?new n(this.client,r,this):new g(this.client,r,this);this.children.set(r.displayName,i)}}return Array.from(this.children.values())}async getResource(i,a){if(!i)throw Error(`No path provided`);let o=i.endsWith(`/`),s=i.split(`/`).filter(e=>e.trim()),c=this,l=!1;for(let e=0;e<s.length;e++){let t=s[e];if(c instanceof n){if(await c.listChildren(),!c.children)return null;let r=c.children.get(t);if(!r&&a?.create){let i=this.buildPath(c.resource.href,t);if(e<s.length-1||o){await this.client.createDirectory(i);let e={href:i,displayName:t,isDirectory:!0};r=new n(this.client,e,c),c.children.set(t,r),l=!0}else{await this.client.putFile(i,``);let e={href:i,displayName:t,isDirectory:!1,contentLength:0};r=new g(this.client,e,c),c.children.set(t,r),l=!0}}if(!r||e===s.length-1&&o&&r instanceof g)return null;c=r}}return l&&r(e,t.getWorkspaceSync()??this.getWorkspace()),c}async delete(n,i=!0){if(!n)return this.getParent()?.delete(this.getName());let a=this.buildPath(this.resource.href,n);await this.client.deleteResource(a),this.children?.delete(n),r(e,t.getWorkspaceSync()??this.getWorkspace())}async copyTo(e){for(let t of await this.listChildren()){let n=[e,t.getName()].join(`/`);await t.copyTo(n)}}async rename(n){if(this.getName()===n)return;let i=this.resource.href.split(`/`).filter(Boolean);i[i.length-1]=n;let a=`/`+i.join(`/`)+`/`;await this.client.moveResource(this.resource.href,a),this.resource.href=a,this.resource.displayName=n,r(e,t.getWorkspaceSync()??this.getWorkspace())}touch(){r(e,t.getWorkspaceSync()??this.getWorkspace())}buildPath(e,t){return e.endsWith(`/`)?e+t:e+`/`+t}getClient(){return this.client}getConnectionInfo(){return this.connectionInfo?this.connectionInfo:{url:this.client.getBaseUrl()}}},v=n(`WebDAV`),y=class extends f{constructor(...e){super(...e),this.url=``,this.username=``,this.password=``,this.connecting=!1,this.showHelp=!1}getResult(){return this}async handleConnect(){if(!this.url)return v.error(`Please provide a URL`),!1;try{new URL(this.url)}catch{return v.error(`Invalid URL format`),!1}this.connecting=!0;try{let e,n=this.url.match(/^(https?:\/\/[^\/]+)\/(?:index\.php\/)?s\/([A-Za-z0-9]+)/);if(n){let t=n[1],r=n[2];e={url:`${t}/public.php/webdav/`,username:r,password:this.password||``}}else e={url:this.url,...this.username&&this.password&&{username:this.username,password:this.password}};return await t.connectWorkspace(e),v.info(`Successfully connected to WebDAV workspace`),this.dispatchEvent(new CustomEvent(`connected`,{bubbles:!0,composed:!0})),!0}catch(e){return e instanceof Error?v.error(`Connection failed: ${e.message}`):v.error(`Failed to connect to WebDAV server`),!1}finally{this.connecting=!1}}toggleHelp(){this.showHelp=!this.showHelp}render(){return m`
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
                
                ${this.showHelp?m`
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
        `}};p([s()],y.prototype,`url`,void 0),p([s()],y.prototype,`username`,void 0),p([s()],y.prototype,`password`,void 0),p([s()],y.prototype,`connecting`,void 0),p([s()],y.prototype,`showHelp`,void 0),y=p([u(`lyra-webdav-connect`)],y);var b=n(`WebDAV`);c({command:{id:`workspace.connect.webdav`,name:`WebDAV / NextCloud`,description:`Connect to WebDAV servers, Nextcloud shares, ownCloud, and other cloud storage`,parameters:[{name:`url`,type:`string`,description:`WebDAV URL: share link (https://cloud.example.com/s/TOKEN) or direct endpoint`,required:!1},{name:`password`,type:`string`,description:`Password (if required)`,required:!1}]},handler:{execute:async e=>{let n=e.parameters?.url,r=e.parameters?.password;if(!n){await d.open(`webdav-connect-dialog`);return}try{let e,i=n.match(/^(https?:\/\/[^\/]+)\/(?:index\.php\/)?s\/([A-Za-z0-9]+)/);if(i){let t=i[1],n=i[2];e={url:`${t}/public.php/webdav/`,username:n,password:r||``}}else e={url:n,...r&&{username:``,password:r}};await t.connectWorkspace(e),b.info(`Connected to WebDAV workspace`)}catch(e){e instanceof Error?b.error(`Failed to connect: ${e.message}`):b.error(`Failed to connect to WebDAV workspace`)}}},contribution:{target:`filebrowser.connections`,name:`filebrowser.connections.webdav`,label:`WebDAV / NextCloud`,icon:`cloud`}});var x=n(`WebDAVExtension`);t.registerContribution({type:`webdav`,name:`webdav`,canHandle(e){return e&&typeof e==`object`&&`url`in e&&typeof e.url==`string`},async connect(e){return new _(new h(e),{href:e.url,displayName:S(e.url),isDirectory:!0},void 0,e)},async restore(e){if(!(!e||!e.url))try{let t={url:e.url,username:e.username,password:e.password?w(e.password):void 0};return new _(new h(t),{href:e.url,displayName:S(e.url),isDirectory:!0},void 0,t)}catch(e){x.error(`Failed to restore WebDAV workspace:`,e);return}},async persist(e){if(e instanceof _){let t=e.getConnectionInfo();return t?{url:t.url,...t.username===void 0?{}:{username:t.username},...t.password===void 0?{}:{password:C(t.password)}}:null}return null}}),l.registerContribution(`dialogs`,{label:`Connect to WebDAV / NextCloud`,icon:`cloud`,name:`dialog.webdav.connect`,id:`webdav-connect-dialog`,buttons:[{id:`help`,label:`Show help`,variant:`neutral`},{id:`cancel`,label:`Cancel`,variant:`default`},{id:`connect`,label:`Connect`,variant:`primary`}],component:e=>m`<lyra-webdav-connect></lyra-webdav-connect>`,onButton:async(e,t,n)=>{let r=t;return e===`help`?(r?.toggleHelp(),!1):e===`connect`?r?.handleConnect?await r.handleConnect()?(n?.close?.(),!0):!1:!0:(e===`cancel`&&n?.close?.(),!0)}});function S(e){try{let t=new URL(e).pathname.split(`/`).filter(Boolean);return t[t.length-1]||`workspace`}catch{return`workspace`}}function C(e){try{let t=new TextEncoder().encode(e),n=``;for(let e of t)n+=String.fromCharCode(e);return btoa(n)}catch{return e}}function w(e){try{let t=atob(e),n=new Uint8Array(t.length);for(let e=0;e<t.length;e++)n[e]=t.charCodeAt(e);return new TextDecoder().decode(n)}catch{return e}}export{h as WebDAVClient,_ as WebDAVDirectoryResource,g as WebDAVFileResource};