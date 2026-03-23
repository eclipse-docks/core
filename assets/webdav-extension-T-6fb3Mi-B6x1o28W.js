import{ad as E,H as h,w as c,a0 as d,W as N,ae as V,r as b,k as F,ag as T,f as O,d as x,Z as D,t as $,ah as H}from"./config-p6NjMHC3-D3NDp0il.js";class U{constructor(e){if(this.baseUrl=e.url,e.username!==void 0){const t=`${e.username}:${e.password??""}`;this.authHeader=`Basic ${btoa(t)}`}}async propfind(e,t=1){const o=await fetch(new URL(e,this.baseUrl).href,{method:"PROPFIND",headers:this.buildHeaders({Depth:t.toString(),"Content-Type":"application/xml"}),body:`<?xml version="1.0" encoding="UTF-8"?>
            <d:propfind xmlns:d="DAV:">
                <d:prop>
                    <d:displayname/>
                    <d:resourcetype/>
                    <d:getcontenttype/>
                    <d:getcontentlength/>
                    <d:getlastmodified/>
                    <d:getetag/>
                </d:prop>
            </d:propfind>`});if(!o.ok)throw new Error(`WebDAV PROPFIND failed with status ${o.status}`);const n=await o.text();return this.parseMultiStatus(n)}async getFile(e){const t=await fetch(new URL(e,this.baseUrl).href,{method:"GET",headers:this.buildHeaders()});if(!t.ok)throw new Error(`WebDAV GET failed with status ${t.status}`);return await t.blob()}async putFile(e,t){let r;t instanceof ReadableStream?r=await new Response(t).blob():r=typeof t=="string"?new Blob([t]):t;const o=await fetch(new URL(e,this.baseUrl).href,{method:"PUT",headers:this.buildHeaders({"Content-Type":"application/octet-stream"}),body:r});if(!o.ok)throw new Error(`WebDAV PUT failed with status ${o.status}`)}async deleteResource(e){const t=await fetch(new URL(e,this.baseUrl).href,{method:"DELETE",headers:this.buildHeaders()});if(!t.ok)throw new Error(`WebDAV DELETE failed with status ${t.status}`)}async createDirectory(e){const t=await fetch(new URL(e,this.baseUrl).href,{method:"MKCOL",headers:this.buildHeaders()});if(!t.ok)throw new Error(`WebDAV MKCOL failed with status ${t.status}`)}async moveResource(e,t){const r=new URL(t,this.baseUrl).href,o=await fetch(new URL(e,this.baseUrl).href,{method:"MOVE",headers:this.buildHeaders({Destination:r,Overwrite:"F"})});if(!o.ok)throw new Error(`WebDAV MOVE failed with status ${o.status}`)}async copyResource(e,t){const r=new URL(t,this.baseUrl).href,o=await fetch(new URL(e,this.baseUrl).href,{method:"COPY",headers:this.buildHeaders({Destination:r,Overwrite:"F"})});if(!o.ok)throw new Error(`WebDAV COPY failed with status ${o.status}`)}buildHeaders(e){const t={...e??{}};return this.authHeader&&(t.Authorization=this.authHeader),t}parseMultiStatus(e){const o=new DOMParser().parseFromString(e,"text/xml").querySelectorAll("response"),n=[];return o.forEach(a=>{const l=a.querySelector("href")?.textContent||"",u=new URL(l,this.baseUrl).href,i=a.querySelector("displayname")?.textContent||"",y=!!a.querySelector("resourcetype")?.querySelector("collection"),k=a.querySelector("getcontenttype")?.textContent||void 0,W=a.querySelector("getcontentlength")?.textContent,L=W?parseInt(W):void 0,R=a.querySelector("getlastmodified")?.textContent,P=R?new Date(R):void 0,S=a.querySelector("getetag")?.textContent||void 0;n.push({href:u,displayName:i||u.split("/").filter(Boolean).pop()||"",isDirectory:y,contentType:k,contentLength:L,lastModified:P,etag:S})}),n}getBaseUrl(){return this.baseUrl}}class v extends N{constructor(e,t,r){super(),this.client=e,this.resource=t,this.parent=r}getName(){return this.resource.displayName}getParent(){return this.parent}async getContents(e){const t=await this.client.getFile(this.resource.href);return!e||e?.contentType===V.TEXT?await t.text():e?.blob?t:e?.uri?URL.createObjectURL(t):await t.arrayBuffer()}async saveContents(e,t){await this.client.putFile(this.resource.href,e),h(d,c.getWorkspaceSync()??this.getWorkspace())}async size(){return this.resource.contentLength??null}async delete(){await this.client.deleteResource(this.resource.href),h(d,c.getWorkspaceSync()??this.getWorkspace())}async copyTo(e){const t=await this.getWorkspace().getResource(e,{create:!0});if(!t)throw new Error(`Failed to create target file: ${e}`);const r=await this.getContents({blob:!0});await t.saveContents(r)}async rename(e){if(this.getName()===e)return;const t=this.resource.href.split("/");t[t.length-1]=e;const r=t.join("/");await this.client.moveResource(this.resource.href,r),this.resource.href=r,this.resource.displayName=e,h(d,c.getWorkspaceSync()??this.getWorkspace())}}class p extends E{constructor(e,t,r,o){super(),this.client=e,this.resource=t,this.parent=r,this.connectionInfo=o}getName(){return this.resource.displayName}getParent(){return this.parent}async listChildren(e=!1){if(e||!this.children){const t=await this.client.propfind(this.resource.href,1);this.children=new Map;for(let r=1;r<t.length;r++){const o=t[r],n=o.isDirectory?new p(this.client,o,this):new v(this.client,o,this);this.children.set(o.displayName,n)}}return Array.from(this.children.values())}async getResource(e,t){if(!e)throw new Error("No path provided");const r=e.endsWith("/"),o=e.split("/").filter(l=>l.trim());let n=this,a=!1;for(let l=0;l<o.length;l++){const u=o[l];if(n instanceof p){if(await n.listChildren(),!n.children)return null;let i=n.children.get(u);if(!i&&t?.create){const g=this.buildPath(n.resource.href,u);if(l<o.length-1||r){await this.client.createDirectory(g);const y={href:g,displayName:u,isDirectory:!0};i=new p(this.client,y,n),n.children.set(u,i),a=!0}else{await this.client.putFile(g,"");const y={href:g,displayName:u,isDirectory:!1,contentLength:0};i=new v(this.client,y,n),n.children.set(u,i),a=!0}}if(!i||l===o.length-1&&r&&i instanceof v)return null;n=i}}return a&&h(d,c.getWorkspaceSync()??this.getWorkspace()),n}async delete(e,t=!0){if(!e)return this.getParent()?.delete(this.getName());const r=this.buildPath(this.resource.href,e);await this.client.deleteResource(r),this.children?.delete(e),h(d,c.getWorkspaceSync()??this.getWorkspace())}async copyTo(e){for(const t of await this.listChildren()){const r=[e,t.getName()].join("/");await t.copyTo(r)}}async rename(e){if(this.getName()===e)return;const t=this.resource.href.split("/").filter(Boolean);t[t.length-1]=e;const r="/"+t.join("/")+"/";await this.client.moveResource(this.resource.href,r),this.resource.href=r,this.resource.displayName=e,h(d,c.getWorkspaceSync()??this.getWorkspace())}touch(){h(d,c.getWorkspaceSync()??this.getWorkspace())}buildPath(e,t){return e.endsWith("/")?e+t:e+"/"+t}getClient(){return this.client}getConnectionInfo(){return this.connectionInfo?this.connectionInfo:{url:this.client.getBaseUrl()}}}var q=Object.defineProperty,I=Object.getOwnPropertyDescriptor,w=(s,e,t,r)=>{for(var o=r>1?void 0:r?I(e,t):e,n=s.length-1,a;n>=0;n--)(a=s[n])&&(o=(r?a(e,t,o):a(o))||o);return r&&o&&q(e,t,o),o};const m=D("WebDAV");let f=class extends H{constructor(){super(...arguments),this.url="",this.username="",this.password="",this.connecting=!1,this.showHelp=!1}getResult(){return this}async handleConnect(){if(!this.url)return m.error("Please provide a URL"),!1;try{new URL(this.url)}catch{return m.error("Invalid URL format"),!1}this.connecting=!0;try{let s;const e=this.url.match(/^(https?:\/\/[^\/]+)\/(?:index\.php\/)?s\/([A-Za-z0-9]+)/);if(e){const t=e[1],r=e[2];s={url:`${t}/public.php/webdav/`,username:r,password:this.password||""}}else s={url:this.url,...this.username&&this.password&&{username:this.username,password:this.password}};return await c.connectWorkspace(s),m.info("Successfully connected to WebDAV workspace"),this.dispatchEvent(new CustomEvent("connected",{bubbles:!0,composed:!0})),!0}catch(s){return s instanceof Error?m.error(`Connection failed: ${s.message}`):m.error("Failed to connect to WebDAV server"),!1}finally{this.connecting=!1}}toggleHelp(){this.showHelp=!this.showHelp}render(){return x`
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
                    @input=${s=>this.url=s.target.value}
                    required
                    help-text="The full WebDAV endpoint URL">
                </wa-input>
                
                <wa-input
                    label="Username (optional)"
                    placeholder="username"
                    .value=${this.username}
                    @input=${s=>this.username=s.target.value}
                    help-text="Leave empty for public/shared folders">
                </wa-input>
                
                <wa-input
                    type="password"
                    label="Password (optional)"
                    placeholder="Password or App Password"
                    .value=${this.password}
                    @input=${s=>this.password=s.target.value}
                    help-text="Leave empty for public/shared folders. Use an app password if 2FA is enabled.">
                </wa-input>
                <p class="password-warning">
                    Passwords are stored locally in this browser (base64 encoded). Only use this on machines you trust.
                </p>
                
                ${this.showHelp?x`
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
                `:""}
            </div>
        `}};w([b()],f.prototype,"url",2);w([b()],f.prototype,"username",2);w([b()],f.prototype,"password",2);w([b()],f.prototype,"connecting",2);w([b()],f.prototype,"showHelp",2);f=w([$("lyra-webdav-connect")],f);const C=D("WebDAV");F({command:{id:"workspace.connect.webdav",name:"WebDAV / NextCloud",description:"Connect to WebDAV servers, Nextcloud shares, ownCloud, and other cloud storage",parameters:[{name:"url",type:"string",description:"WebDAV URL: share link (https://cloud.example.com/s/TOKEN) or direct endpoint",required:!1},{name:"password",type:"string",description:"Password (if required)",required:!1}]},handler:{execute:async s=>{const e=s.parameters?.url,t=s.parameters?.password;if(!e){await T.open("webdav-connect-dialog");return}try{let r;const o=e.match(/^(https?:\/\/[^\/]+)\/(?:index\.php\/)?s\/([A-Za-z0-9]+)/);if(o){const n=o[1],a=o[2];r={url:`${n}/public.php/webdav/`,username:a,password:t||""}}else r={url:e,...t&&{username:"",password:t}};await c.connectWorkspace(r),C.info("Connected to WebDAV workspace")}catch(r){r instanceof Error?C.error(`Failed to connect: ${r.message}`):C.error("Failed to connect to WebDAV workspace")}}},contribution:{target:"filebrowser.connections",name:"filebrowser.connections.webdav",label:"WebDAV / NextCloud",icon:"cloud"}});const M=D("WebDAVExtension");c.registerContribution({type:"webdav",name:"webdav",canHandle(s){return s&&typeof s=="object"&&"url"in s&&typeof s.url=="string"},async connect(s){const e=new U(s),t={href:s.url,displayName:A(s.url),isDirectory:!0};return new p(e,t,void 0,s)},async restore(s){if(!(!s||!s.url))try{const e={url:s.url,username:s.username,password:s.password?j(s.password):void 0},t=new U(e),r={href:s.url,displayName:A(s.url),isDirectory:!0};return new p(t,r,void 0,e)}catch(e){M.error("Failed to restore WebDAV workspace:",e);return}},async persist(s){if(s instanceof p){const e=s.getConnectionInfo();return e?{url:e.url,...e.username!==void 0?{username:e.username}:{},...e.password!==void 0?{password:B(e.password)}:{}}:null}return null}});O.registerContribution("dialogs",{label:"Connect to WebDAV / NextCloud",icon:"cloud",name:"dialog.webdav.connect",id:"webdav-connect-dialog",buttons:[{id:"help",label:"Show help",variant:"neutral"},{id:"cancel",label:"Cancel",variant:"default"},{id:"connect",label:"Connect",variant:"primary"}],component:s=>x`<lyra-webdav-connect></lyra-webdav-connect>`,onButton:async(s,e,t)=>{const r=e;return s==="help"?(r?.toggleHelp(),!1):s==="connect"?r?.handleConnect?await r.handleConnect()?(t?.close?.(),!0):!1:!0:(s==="cancel"&&t?.close?.(),!0)}});function A(s){try{const t=new URL(s).pathname.split("/").filter(Boolean);return t[t.length-1]||"workspace"}catch{return"workspace"}}function B(s){try{const t=new TextEncoder().encode(s);let r="";for(const o of t)r+=String.fromCharCode(o);return btoa(r)}catch{return s}}function j(s){try{const e=atob(s),t=new Uint8Array(e.length);for(let o=0;o<e.length;o++)t[o]=e.charCodeAt(o);return new TextDecoder().decode(t)}catch{return s}}export{U as WebDAVClient,p as WebDAVDirectoryResource,v as WebDAVFileResource};
