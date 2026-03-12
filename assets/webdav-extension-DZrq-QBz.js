import{Q as V,x as p,C as u,F as N,O as q,l as $,w as y,A as D,r as E}from"./monaco-Ck3pLLYn.js";import{B as T,e as f,t as O,d as C,D as H}from"./vendor-3BPrCeYx.js";class R{constructor(e){this.baseUrl=e.url;const t={baseURL:e.url,headers:{"Content-Type":"application/xml"},maxRedirects:5};e.username!==void 0&&(t.auth={username:e.username,password:e.password||""}),this.axios=T.create(t)}async propfind(e,t=1){const s=await this.axios.request({method:"PROPFIND",url:e,headers:{Depth:t.toString()},data:`<?xml version="1.0" encoding="UTF-8"?>
            <d:propfind xmlns:d="DAV:">
                <d:prop>
                    <d:displayname/>
                    <d:resourcetype/>
                    <d:getcontenttype/>
                    <d:getcontentlength/>
                    <d:getlastmodified/>
                    <d:getetag/>
                </d:prop>
            </d:propfind>`});return this.parseMultiStatus(s.data)}async getFile(e){return(await this.axios.get(e,{responseType:"arraybuffer"})).data}async putFile(e,t){await this.axios.put(e,t,{headers:{"Content-Type":"application/octet-stream"}})}async deleteResource(e){await this.axios.delete(e)}async createDirectory(e){await this.axios.request({method:"MKCOL",url:e})}async moveResource(e,t){const r=new URL(t,this.baseUrl).href;await this.axios.request({method:"MOVE",url:e,headers:{Destination:r,Overwrite:"F"}})}async copyResource(e,t){const r=new URL(t,this.baseUrl).href;await this.axios.request({method:"COPY",url:e,headers:{Destination:r,Overwrite:"F"}})}parseMultiStatus(e){const s=new DOMParser().parseFromString(e,"text/xml").querySelectorAll("response"),a=[];return s.forEach(n=>{const i=n.querySelector("href")?.textContent||"",c=n.querySelector("displayname")?.textContent||"",b=!!n.querySelector("resourcetype")?.querySelector("collection"),v=n.querySelector("getcontenttype")?.textContent||void 0,A=n.querySelector("getcontentlength")?.textContent,F=A?parseInt(A):void 0,W=n.querySelector("getlastmodified")?.textContent,P=W?new Date(W):void 0,L=n.querySelector("getetag")?.textContent||void 0;a.push({href:i,displayName:c||i.split("/").filter(Boolean).pop()||"",isDirectory:b,contentType:v,contentLength:F,lastModified:P,etag:L})}),a}getBaseUrl(){return this.baseUrl}}class S extends N{constructor(e,t,r){super(),this.client=e,this.resource=t,this.parent=r}getName(){return this.resource.displayName}getParent(){return this.parent}async getContents(e){const t=await this.client.getFile(this.resource.href);if(!e||e?.contentType===q.TEXT)return new TextDecoder().decode(t);if(e?.blob)return new Blob([t]);if(e?.uri){const r=new Blob([t]);return URL.createObjectURL(r)}return t}async saveContents(e,t){await this.client.putFile(this.resource.href,e),p(u,this.getWorkspace())}async size(){return this.resource.contentLength??null}async delete(){await this.client.deleteResource(this.resource.href),p(u,this.getWorkspace())}async copyTo(e){const t=await this.getWorkspace().getResource(e,{create:!0});if(!t)throw new Error(`Failed to create target file: ${e}`);const r=await this.getContents({blob:!0});await t.saveContents(r)}async rename(e){if(this.getName()===e)return;const t=this.resource.href.split("/");t[t.length-1]=e;const r=t.join("/");await this.client.moveResource(this.resource.href,r),this.resource.href=r,this.resource.displayName=e,p(u,this.getWorkspace())}}class h extends V{constructor(e,t,r){super(),this.client=e,this.resource=t,this.parent=r}getName(){return this.resource.displayName}getParent(){return this.parent}async listChildren(e=!1){if(e||!this.children){const t=await this.client.propfind(this.resource.href,1);this.children=new Map;for(let r=1;r<t.length;r++){const s=t[r],a=s.isDirectory?new h(this.client,s,this):new S(this.client,s,this);this.children.set(s.displayName,a)}}return Array.from(this.children.values())}async getResource(e,t){if(!e)throw new Error("No path provided");const r=e.split("/").filter(a=>a.trim());let s=this;for(let a=0;a<r.length;a++){const n=r[a];if(s instanceof h){if(await s.listChildren(),!s.children)return null;let i=s.children.get(n);if(!i&&t?.create){const c=this.buildPath(s.resource.href,n);if(a<r.length-1){await this.client.createDirectory(c);const l={href:c,displayName:n,isDirectory:!0};i=new h(this.client,l,s),s.children.set(n,i)}else{await this.client.putFile(c,"");const l={href:c,displayName:n,isDirectory:!1,contentLength:0};return i=new S(this.client,l,s),s.children.set(n,i),p(u,this.getWorkspace()),i}}if(!i)return null;s=i}}return s}async delete(e,t=!0){if(!e)return this.getParent()?.delete(this.getName());const r=this.buildPath(this.resource.href,e);await this.client.deleteResource(r),this.children?.delete(e),p(u,this.getWorkspace())}async copyTo(e){for(const t of await this.listChildren()){const r=[e,t.getName()].join("/");await t.copyTo(r)}}async rename(e){if(this.getName()===e)return;const t=this.resource.href.split("/").filter(Boolean);t[t.length-1]=e;const r="/"+t.join("/")+"/";await this.client.moveResource(this.resource.href,r),this.resource.href=r,this.resource.displayName=e,p(u,this.getWorkspace())}touch(){p(u,this.getWorkspace())}buildPath(e,t){return e.endsWith("/")?e+t:e+"/"+t}getClient(){return this.client}}var j=Object.defineProperty,M=Object.getOwnPropertyDescriptor,g=(o,e,t,r)=>{for(var s=r>1?void 0:r?M(e,t):e,a=o.length-1,n;a>=0;a--)(n=o[a])&&(s=(r?n(e,t,s):n(s))||s);return r&&s&&j(e,t,s),s};const m=D("WebDAV");let w=class extends ${constructor(){super(...arguments),this.url="",this.username="",this.password="",this.connecting=!1,this.showHelp=!1}async handleConnect(){if(!this.url){m.error("Please provide a URL");return}try{new URL(this.url)}catch{m.error("Invalid URL format");return}this.connecting=!0;try{const o={url:this.url,...this.username&&this.password&&{username:this.username,password:this.password}};await y.connectWorkspace(o),m.info("Successfully connected to WebDAV workspace"),this.dispatchEvent(new CustomEvent("connected",{bubbles:!0,composed:!0}))}catch(o){o instanceof Error?m.error(`Connection failed: ${o.message}`):m.error("Failed to connect to WebDAV server")}finally{this.connecting=!1}}toggleHelp(){this.showHelp=!this.showHelp}render(){return C`
            <style>
                .webdav-connect-dialog {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    max-width: 500px;
                    padding: 1.5rem;
                }
                
                .webdav-connect-dialog h2 {
                    margin: 0 0 1rem 0;
                    font-size: 1.5rem;
                }
                
                .form-buttons {
                    display: flex;
                    gap: 0.5rem;
                    justify-content: flex-end;
                    margin-top: 1rem;
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
                <h2>
                    <wa-icon name="cloud" label="WebDAV"></wa-icon>
                    Connect to WebDAV Folder
                </h2>
                
                <wa-input
                    label="WebDAV URL"
                    placeholder="https://cloud.example.com/remote.php/dav/files/username/"
                    .value=${this.url}
                    @input=${o=>this.url=o.target.value}
                    required
                    help-text="The full WebDAV endpoint URL">
                </wa-input>
                
                <wa-input
                    label="Username (optional)"
                    placeholder="username"
                    .value=${this.username}
                    @input=${o=>this.username=o.target.value}
                    help-text="Leave empty for public/shared folders">
                </wa-input>
                
                <wa-input
                    type="password"
                    label="Password (optional)"
                    placeholder="Password or App Password"
                    .value=${this.password}
                    @input=${o=>this.password=o.target.value}
                    help-text="Leave empty for public/shared folders. Use an app password if 2FA is enabled">
                </wa-input>
                
                <div class="form-buttons">
                    <wa-button
                        appearance="outline"
                        @click=${this.toggleHelp}>
                        <wa-icon name="circle-info" slot="start"></wa-icon>
                        ${this.showHelp?"Hide":"Show"} Help
                    </wa-button>
                    
                    <wa-button
                        appearance="primary"
                        @click=${this.handleConnect}
                        ?disabled=${this.connecting||!this.url}>
                        <wa-icon name="${this.connecting?"spinner":"plug"}" slot="start"></wa-icon>
                        ${this.connecting?"Connecting...":"Connect"}
                    </wa-button>
                </div>
                
                ${this.showHelp?C`
                    <div class="help-text">
                        <h3>WebDAV Connection Help</h3>
                        
                        <p><strong>Public/Shared Folders:</strong></p>
                        <p>For publicly shared WebDAV folders, just enter the URL and leave username/password empty.</p>
                        
                        <p><strong>Nextcloud Public Shares:</strong></p>
                        <p>For Nextcloud public shares (e.g., https://cloud.example.com/s/TOKEN):</p>
                        <ul>
                            <li><strong>URL:</strong> https://your-cloud.com/public.php/webdav/</li>
                            <li><strong>Username:</strong> The share token (the part after /s/)</li>
                            <li><strong>Password:</strong> Leave empty (or enter share password if protected)</li>
                        </ul>
                        <p><em>Tip: Use the "Connect to Nextcloud Public Share" command for easier setup!</em></p>
                        
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
                        
                        <p><strong>Note:</strong> Your credentials (if provided) will be stored securely in your browser's storage.</p>
                    </div>
                `:""}
            </div>
        `}};g([f()],w.prototype,"url",2);g([f()],w.prototype,"username",2);g([f()],w.prototype,"password",2);g([f()],w.prototype,"connecting",2);g([f()],w.prototype,"showHelp",2);w=g([O("lyra-webdav-connect")],w);const d=D("WebDAV");let x=null;function B(){if(!x){const o=document.createElement("div"),t=C`
            <wa-dialog label="Connect to WebDAV / Cloud Storage">
                <style>
                    .webdav-dialog {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                        padding: 1.5rem;
                        max-width: 500px;
                    }
                    
                    .form-buttons {
                        display: flex;
                        gap: 0.5rem;
                        justify-content: flex-end;
                        margin-top: 1rem;
                    }
                </style>
                
                <div class="webdav-dialog">
                <wa-input
                    id="webdav-url"
                    label="URL"
                    placeholder="https://my-nextcloud.de/s/<share-token>"
                    required
                    help-text="Nextcloud share link or WebDAV endpoint URL">
                </wa-input>
                    
                    <wa-input
                        id="webdav-password"
                        type="password"
                        label="Password (optional)"
                        placeholder="Leave empty if not required">
                    </wa-input>
                    
                    <div class="form-buttons">
                        <wa-button
                            appearance="outline"
                            @click=${()=>o.querySelector("wa-dialog").open=!1}>
                            Cancel
                        </wa-button>
                        
                        <wa-button
                            appearance="primary"
                            @click=${async()=>{const r=o.querySelector("wa-dialog"),s=o.querySelector("#webdav-url"),a=o.querySelector("#webdav-password"),n=s?.value;if(!n){d.error("Please provide a URL");return}const i=a?.value;try{let c;const l=n.match(/^(https?:\/\/[^\/]+)\/(?:index\.php\/)?s\/([A-Za-z0-9]+)/);if(l){const b=l[1],v=l[2];c={url:`${b}/public.php/webdav/`,username:v,password:i||""}}else c={url:n,...i&&{username:"",password:i}};await y.connectWorkspace(c),d.info("Connected to WebDAV workspace"),r.open=!1,s.value="",a.value=""}catch(c){c instanceof Error?d.error(`Failed to connect: ${c.message}`):d.error("Failed to connect to WebDAV workspace")}}}>
                            <wa-icon name="plug" slot="start"></wa-icon>
                            Connect
                        </wa-button>
                    </div>
                </div>
            </wa-dialog>
        `;H(t,o),document.body.appendChild(o),x=o.querySelector("wa-dialog")}return x}E({command:{id:"workspace.connect.webdav",name:"WebDAV / Cloud Storage",description:"Connect to WebDAV servers, Nextcloud shares, ownCloud, and other cloud storage",parameters:[{name:"url",type:"string",description:"WebDAV URL: share link (https://cloud.example.com/s/TOKEN) or direct endpoint",required:!1},{name:"password",type:"string",description:"Password (if required)",required:!1}]},handler:{execute:async o=>{const e=o.parameters?.url,t=o.parameters?.password;if(!e){const r=B();r.open=!0;return}try{let r;const s=e.match(/^(https?:\/\/[^\/]+)\/(?:index\.php\/)?s\/([A-Za-z0-9]+)/);if(s){const a=s[1],n=s[2];r={url:`${a}/public.php/webdav/`,username:n,password:t||""}}else r={url:e,...t&&{username:"",password:t}};await y.connectWorkspace(r),d.info("Connected to WebDAV workspace")}catch(r){r instanceof Error?d.error(`Failed to connect: ${r.message}`):d.error("Failed to connect to WebDAV workspace")}}},contribution:{target:"filebrowser.connections",name:"filebrowser.connections.webdav",label:"WebDAV / Cloud Storage",icon:"cloud"}});const k=D("WebDAVExtension");y.registerContribution({type:"webdav",name:"WebDAV (Cloud Storage)",canHandle(o){return o&&typeof o=="object"&&"url"in o&&typeof o.url=="string"},async connect(o){const e=new R(o),t={href:o.url,displayName:U(o.url),isDirectory:!0};return new h(e,t)},async restore(o){if(!(!o||!o.url))try{const e=new R(o),t={href:o.url,displayName:U(o.url),isDirectory:!0};return new h(e,t)}catch(e){k.error("Failed to restore WebDAV workspace:",e);return}},async persist(o){return o instanceof h?{url:o.getClient().getBaseUrl(),username:"",password:""}:null}});function U(o){try{const t=new URL(o).pathname.split("/").filter(Boolean);return t[t.length-1]||"workspace"}catch{return"workspace"}}k.debug("WebDAV Extension loaded");export{R as WebDAVClient,h as WebDAVDirectoryResource,S as WebDAVFileResource};
