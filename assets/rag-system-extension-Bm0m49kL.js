const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-vQIIuuEe.js","assets/index-8WUZ8dwZ.js","assets/index-CTYeukuQ.css","assets/index-BJpRdiQX.js","assets/plugin-DTC-2ba9.js","assets/rx-query-helper-BrSngD3C.js","assets/broadcast-channel-D4yYrDWZ.js","assets/rx-query-BLha2BXq.js","assets/tslib.es6-D3hF0DQN.js","assets/rx-storage-multiinstance-DKXSEllp.js","assets/index-BS7ImPIq.js","assets/index-DqShJrlj.js","assets/index-C0tneMXB.js","assets/index-CBfuaIwJ.js","assets/rag-integration-BJObSNJd.js","assets/ai-service-BK0F4dEG.js","assets/in-browser-ml-service-DGW73jUW.js"])))=>i.map(i=>d[i]);
import{Q as C,_ as z,a6 as we,z as ae,V as xe,U as ye,a7 as ve,O as E,a8 as $e,w as V,H as be,a as ke,n as De,r as P,L as Se,I as Ee,u as y,c as x,a5 as k,x as R,l as ee,A as q,J as Ce,t as Te,G as O,a9 as F,T as Pe,d as Ie}from"./index-8WUZ8dwZ.js";import{a as Ne,i as Ae,M as Re}from"./in-browser-ml-service-DGW73jUW.js";import{b as Oe}from"./ai-service-BK0F4dEG.js";const W=C("EmbeddingService");class ze{constructor(){this.modelName=Ne.FEATURE_EXTRACTION,this.EMBEDDING_DIMENSION=384,this.DEFAULT_OPTIONS={pooling:"mean",normalize:!0}}async initialize(){if(this.pipePromise)try{await this.pipePromise;return}catch{W.warn("Previous initialization failed, retrying..."),this.pipePromise=void 0}W.info(`Initializing embedding service with model: ${this.modelName}`);try{this.pipePromise=Ae.getPipeline(Re.FEATURE_EXTRACTION,this.modelName,{quantized:!1}),await this.pipePromise,W.info("Embedding service initialized successfully")}catch(e){const t=e?.message||String(e),a=e?JSON.stringify(e):"";throw W.error(`Failed to initialize embedding service: ${t}${a?` - ${a}`:""}`),this.pipePromise=void 0,new Error(`Embedding service initialization failed: ${t}`)}}async generateEmbedding(e,t={}){this.pipePromise||await this.initialize();const a=await this.pipePromise,n={...this.DEFAULT_OPTIONS,...t};try{const i=await a(e,{pooling:n.pooling,normalize:n.normalize}),s=Array.from(i.data);return s.length!==this.EMBEDDING_DIMENSION&&W.warn(`Unexpected embedding dimension: ${s.length}, expected ${this.EMBEDDING_DIMENSION}`),s}catch(i){throw W.error(`Failed to generate embedding: ${i}`),i}}async generateEmbeddings(e,t={}){const a=[];for(const n of e){const i=await this.generateEmbedding(n,t);a.push(i)}return a}getEmbeddingDimension(){return this.EMBEDDING_DIMENSION}getModelName(){return this.modelName}}const G=new ze,_={PREVIEW:500,CONTEXT:150},L={FILE_NAME_MATCH:10,FILE_PATH_MATCH:5,CONTENT_MATCH:1,FILE_NAME_EXACT:20,FILE_PATH_EXACT:10,EXACT_PHRASE:5,TERM_COVERAGE:15},Q={DEFAULT_LIMIT:5,MAX_LIMIT:20},_e={SAMPLE_VECTOR_COUNT:5},H=["idx0","idx1","idx2","idx3","idx4"],Fe={LONG:1e3};function Le(o,e){if(o.length!==e.length)throw new Error(`Vector dimensions must match: ${o.length} vs ${e.length}`);let t=0;for(let a=0;a<o.length;a++){const n=o[a]-e[a];t+=n*n}return Math.sqrt(t)}function Me(o,e,t){const a=[];if(t&&t.length>0)for(let n=0;n<o;n++)if(n<t.length)a.push({vector:t[n],idx:n});else{const i=[];for(let s=0;s<e;s++)i.push(Math.random()*2-1);a.push({vector:i,idx:n})}else for(let n=0;n<o;n++){const i=[];for(let s=0;s<e;s++)i.push(Math.random()*2-1);a.push({vector:i,idx:n})}return a}function ie(o,e){if(e.length!==H.length)throw new Error(`Sample vectors count (${e.length}) must match index field count (${H.length})`);const t={};for(let a=0;a<H.length;a++)t[H[a]]=Le(o,e[a].vector);return t}function We(o,e){if(o.length!==e.length)throw new Error(`Vector dimensions must match: ${o.length} vs ${e.length}`);let t=0,a=0,n=0;for(let s=0;s<o.length;s++)t+=o[s]*e[s],a+=o[s]*o[s],n+=e[s]*e[s];const i=Math.sqrt(a)*Math.sqrt(n);return i===0?0:t/i}const Ve=500,Ge=50,Ue=100;class se{constructor(e={}){this.chunkSize=e.chunkSize??Ve,this.chunkOverlap=e.chunkOverlap??Ge,this.minChunkSize=e.minChunkSize??Ue}chunkDocument(e,t,a){if(t.length<=this.chunkSize){const r=`${a} ${t}`;return[{id:`${e}:chunk:0`,documentId:e,chunkIndex:0,text:r,startOffset:0,endOffset:t.length}]}const n=[],i=this.chunkSize-this.chunkOverlap;let s=0,c=0;for(;s<t.length;){const r=Math.min(s+this.chunkSize,t.length),l=t.substring(s,r);if(l.trim().length<this.minChunkSize&&n.length>0)break;const d=c===0?`${a} ${l}`:l;n.push({id:`${e}:chunk:${c}`,documentId:e,chunkIndex:c,text:d,startOffset:s,endOffset:r}),s+=i,c++}return n}getChunkContext(e,t){const a=e.chunkIndex>0?t[e.chunkIndex-1]:null,n=e.chunkIndex<t.length-1?t[e.chunkIndex+1]:null;let i="";return a&&(i+=`[Previous: ${a.text.substring(Math.max(0,a.text.length-_.CONTEXT))}]

`),i+=e.text,n&&(i+=`

[Next: ${n.text.substring(0,_.CONTEXT)}]`),i}}const K=C("LangChainChunker"),je=500,He=75;function Be(o){return!o||o.trim().length===0?0:o.trim().split(/\s+/).filter(e=>e.length>0).length}class Xe{constructor(e={}){this.textSplitter=null,this.chunkSize=e.chunkSize??je,this.chunkOverlap=e.chunkOverlap??He}async getTextSplitter(){if(!this.textSplitter){const{RecursiveCharacterTextSplitter:e}=await z(async()=>{const{RecursiveCharacterTextSplitter:t}=await import("./index-vQIIuuEe.js");return{RecursiveCharacterTextSplitter:t}},__vite__mapDeps([0,1,2]));this.textSplitter=new e({chunkSize:this.chunkSize,chunkOverlap:this.chunkOverlap,lengthFunction:Be,separators:[`

`,`
`,". ","! ","? "," "],keepSeparator:!1})}return this.textSplitter}async chunkDocument(e,t,a){try{const i=await(await this.getTextSplitter()).splitText(t),s=[];let c=0;for(let r=0;r<i.length;r++){const l=i[r];let d;if(r===0){const p=t.indexOf(l);d=p!==-1?p:0,c=d}else{const p=s[r-1],u=Math.max(this.chunkOverlap*10,l.length),w=Math.max(0,p.endOffset-u),f=Math.min(t.length,p.endOffset+l.length),I=t.substring(w,f).indexOf(l);if(I!==-1){const S=w+I;S>=p.startOffset&&S<p.endOffset+l.length?d=S:d=p.endOffset}else d=p.endOffset;c=d}const m=Math.min(d+l.length,t.length),g=r===0?`${a} ${l}`:l;s.push({id:`${e}:chunk:${r}`,documentId:e,chunkIndex:r,text:g,startOffset:d,endOffset:m})}return this.validateNoWordSplitting(s,t,e),K.debug(`Document ${e} split into ${s.length} chunks using LangChain`),s}catch(n){throw K.warn(`LangChain chunking failed for ${e}, falling back to simple chunking: ${n}`),n}}validateNoWordSplitting(e,t,a){for(let n=0;n<e.length-1;n++){const i=e[n],s=e[n+1];if(i.endOffset<t.length&&s.startOffset>i.endOffset){const c=t.substring(i.endOffset,s.startOffset);if(c.trim().length>0&&!/^\s+$/.test(c)){const l=t[i.endOffset-1],d=t[s.startOffset];l&&d&&/[a-zA-Z0-9]/.test(l)&&/[a-zA-Z0-9]/.test(d)&&K.warn(`Potential word split detected in document ${a} between chunks ${n} and ${n+1}`)}}}}getChunkContext(e,t){const a=e.chunkIndex>0?t[e.chunkIndex-1]:null,n=e.chunkIndex<t.length-1?t[e.chunkIndex+1]:null;let i="";return a&&(i+=`[Previous: ${a.text.substring(Math.max(0,a.text.length-_.CONTEXT))}]

`),i+=e.text,n&&(i+=`

[Next: ${n.text.substring(0,_.CONTEXT)}]`),i}}const Z=C("DocumentChunker");class pe{constructor(e={}){try{this.chunker=new Xe(e),Z.debug("Using LangChain chunker")}catch(t){Z.warn(`Failed to initialize LangChain chunker, using fallback: ${t}`),this.chunker=new se(e)}}async chunkDocument(e,t,a){try{const n=this.chunker.chunkDocument(e,t,a);return await Promise.resolve(n)}catch(n){return Z.warn(`Primary chunker failed, falling back: ${n}`),new se().chunkDocument(e,t,a)}}getChunkContext(e,t){return this.chunker.getChunkContext(e,t)}}new pe;const re=C("PDFJSExtractor");class oe{canExtract(e){return e.toLowerCase()==="pdf"}async extractText(e,t={}){try{const a=await z(()=>import("./pdf-gh-BrLFn.js"),[]);a.GlobalWorkerOptions.workerSrc||(a.GlobalWorkerOptions.workerSrc=`https://unpkg.com/pdfjs-dist@${a.version}/build/pdf.worker.min.mjs`);const i=await(await e.getContents({blob:!0})).arrayBuffer(),c=await a.getDocument({data:i,useSystemFonts:!0}).promise,r=c.numPages,l=[],d=t.includePageNumbers!==!1,m=t.pageSeparator||`

`;for(let p=1;p<=r;p++){const f=(await(await c.getPage(p)).getTextContent()).items.map($=>$.str).join(" ");f.trim()&&(d?l.push(`[Page ${p}]
${f}`):l.push(f))}const g=l.join(m);if(!g||g.trim().length===0)throw new Error("PDF appears to contain no extractable text (may be image-based or scanned)");return re.debug(`Extracted ${r} pages from PDF: ${e.getName()}`),g}catch(a){throw re.warn(`Failed to extract text from PDF ${e.getName()}: ${a}`),new Error(`PDF text extraction failed: ${a}`)}}}const ce=C("LLMOCRExtractor");class le{canExtract(e){return["pdf","png","jpg","jpeg","tiff","tif"].includes(e.toLowerCase())}async extractText(e,t={}){const a=e.getName(),n=t?.fileType||a.split(".").pop()?.toLowerCase()||"pdf",s=(await Oe.getProviders()).find(r=>r.parameters?.ocrApiEndpoint&&r.name.toLowerCase().includes("mistral")),c=s?.parameters?.ocrApiEndpoint;if(!s||!c)throw new Error("Mistral OCR provider not configured. Please add ocrApiEndpoint to the provider parameters in AI settings.");try{const r=await e.getContents({blob:!0}),l=await this.blobToBase64(r),d=this.getMimeType(n),m=await fetch(c,{method:"POST",headers:{Authorization:`Bearer ${s.apiKey}`,"Content-Type":"application/json"},body:JSON.stringify({model:s.parameters?.ocrModel||s.model||"mistral-ocr-latest",document:{type:"document_url",document_url:`data:${d};base64,${l}`},include_image_base64:!1})});if(!m.ok){const $=await m.text().catch(()=>"Unknown error");throw new Error(`OCR request failed: HTTP ${m.status}: ${$}`)}const g=await m.json();if(!g.pages||!Array.isArray(g.pages))throw new Error("Invalid OCR response format: missing pages array");const p=t.includePageNumbers!==!1,u=t.pageSeparator||`

`,w=g.pages.map(($,I)=>{const S=$?.markdown||$?.text||"";return S.trim()?p?`[Page ${I+1}]
${S}`:S:null}).filter($=>$!==null);if(w.length===0)throw new Error("No text content found in OCR response");const f=w.join(u);return ce.debug(`Extracted ${g.pages.length} pages from ${n} file: ${a}`),f}catch(r){throw ce.warn(`Failed to extract text using OCR from ${a}: ${r}`),new Error(`OCR text extraction failed: ${r}`)}}async blobToBase64(e){return new Promise((t,a)=>{const n=new FileReader;n.onloadend=()=>{const s=n.result.split(",")[1];t(s)},n.onerror=a,n.readAsDataURL(e)})}getMimeType(e){return{pdf:"application/pdf",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",tiff:"image/tiff",tif:"image/tiff"}[e.toLowerCase()]||"application/octet-stream"}}const U=C("DocumentExtractor");class qe{constructor(){this.extractors=[new le,new oe]}canExtract(e){return this.extractors.some(t=>t.canExtract(e))}async extractText(e,t){const a=e.getName(),n=t?.fileType||a.split(".").pop()?.toLowerCase()||"txt",i=this.extractors.filter(c=>c.canExtract(n));if(i.length===0)throw new Error(`No extractor available for file type: ${n}`);let s=null;for(const c of i)try{return U.debug(`Using ${c.constructor.name} for file type: ${n}`),await c.extractText(e,{...t,fileType:n})}catch(r){if(s=r instanceof Error?r:new Error(String(r)),U.warn(`${c.constructor.name} failed for ${a}: ${s.message}`),c instanceof le&&i.length>1){const l=i.find(d=>d instanceof oe);if(l){const d=`Mistral OCR extraction failed, falling back to PDF.js extractor for ${a}`;U.warn(d),we(d);try{return U.debug(`Using ${l.constructor.name} as fallback for file type: ${n}`),await l.extractText(e,{...t,fileType:n})}catch(m){s=m instanceof Error?m:new Error(String(m)),U.warn(`Fallback extraction also failed for ${a}: ${s.message}`)}}}}throw s||new Error(`All extractors failed for file type: ${n}`)}}let Y=null,de=!1;async function Qe(){return Promise.all([z(()=>import("./index-BJpRdiQX.js"),__vite__mapDeps([3,4,5,6,7,8,9])),z(()=>import("./index-BS7ImPIq.js"),__vite__mapDeps([10,1,2,5,7,8,6,9])),z(()=>import("./index-DqShJrlj.js"),__vite__mapDeps([11,5,7,8])),z(()=>import("./index-C0tneMXB.js"),__vite__mapDeps([12,5,4,6,7,8])),z(()=>import("./index-CBfuaIwJ.js"),__vite__mapDeps([13,5]))])}async function Je(){return Y||(Y=Qe().then(([o,e,t,a,n])=>(de||(o.addRxPlugin(t.RxDBQueryBuilderPlugin),o.addRxPlugin(a.RxDBMigrationSchemaPlugin),o.addRxPlugin(n.RxDBUpdatePlugin),de=!0),{rxdb:o,storageDexie:e}))),Y}const h=C("DocumentIndexService");class Ke{constructor(){this.sampleVectors=[],this.isInitialized=!1,this.DEFAULT_MAX_FILE_SIZE=5*1024*1024,this.chunker=new pe,this.documentExtractor=new qe,this.DEFAULT_INDEXABLE_TYPES=["md","txt","ts","tsx","js","jsx","json","geojson","kml","gpx","py","html","css","sql","xml","yaml","yml","pdf"]}async initialize(){if(!this.isInitialized){h.info("Initializing document index service with RxDB...");try{const{rxdb:e,storageDexie:t}=await Je();this.db=await e.createRxDatabase({name:"document-index-db",storage:t.getRxStorageDexie(),ignoreDuplicate:!0});const i={documents:{schema:{version:0,primaryKey:"id",type:"object",properties:{id:{type:"string",maxLength:500},workspacePath:{type:"string"},filePath:{type:"string"},fileName:{type:"string"},fileType:{type:"string"},content:{type:"string"},contentHash:{type:"string"},metadata:{type:"object",properties:{size:{type:"number"},lastModified:{type:"number"},language:{type:"string"},tags:{type:"array",items:{type:"string"}}}},indexedAt:{type:"number"},updatedAt:{type:"number"}},required:["id","workspacePath","filePath","content","contentHash"],indexes:["workspacePath","filePath","fileType"]}},vectors:{schema:{version:1,primaryKey:"id",type:"object",properties:{id:{type:"string",maxLength:500},documentId:{type:"string",maxLength:500},embedding:{type:"array",items:{type:"number"}},idx0:{type:"number"},idx1:{type:"number"},idx2:{type:"number"},idx3:{type:"number"},idx4:{type:"number"},chunkIndex:{type:"number"},chunkStartOffset:{type:"number"},chunkEndOffset:{type:"number"}},required:["id","documentId","embedding","idx0","idx1","idx2","idx3","idx4"],indexes:["documentId","chunkIndex","idx0","idx1","idx2","idx3","idx4"]}}};try{await this.db.addCollections(i)}catch(r){if(r?.code==="DB8"||r?.message?.includes("already exists"))h.debug("Collections already exist, using existing collections");else throw r}this.documentsCollection=this.db.documents,this.vectorsCollection=this.db.vectors,await this.initializeSampleVectors(),await this.handleSchemaMigration(),this.isInitialized=!0;const s=await this.documentsCollection.count().exec(),c=await this.vectorsCollection.count().exec();h.info(`Document index service initialized with ${s} documents and ${c} embeddings`),ae(xe,r=>{r&&this.handleWorkspaceChange(r).catch(l=>{h.error(`Failed to handle workspace connection: ${l}`)})}),ae(ye,r=>{r&&this.handleWorkspaceChange(r).catch(l=>{h.error(`Failed to handle workspace change: ${l}`)})}),h.info("Document index service initialized")}catch(e){throw h.error(`Failed to initialize document index service: ${e}`),e}}}ensureInitialized(){if(!this.isInitialized||!this.documentsCollection||!this.vectorsCollection)throw new Error("Document index service not initialized. Call initialize() first.")}async initializeSampleVectors(){if(this.sampleVectors.length>0)return;const e=await this.vectorsCollection.find().limit(1e3).exec(),t=e.map(a=>a.embedding);this.sampleVectors=Me(_e.SAMPLE_VECTOR_COUNT,G.getEmbeddingDimension(),t.length>0?t:void 0),h.info(`Sample vectors initialized for index range method: ${this.sampleVectors.length} vectors, ${e.length} existing embeddings`)}generateDocumentId(e,t){return`${e}:${t}`}async computeContentHash(e){const a=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",a);return Array.from(new Uint8Array(n)).map(s=>s.toString(16).padStart(2,"0")).join("")}isIndexableFile(e,t){const a=e.getName().toLowerCase(),n=t?.fileTypes||this.DEFAULT_INDEXABLE_TYPES,i=a.split(".").pop();if(!i||!n.includes(i))return!1;if(t?.excludePatterns){for(const s of t.excludePatterns)if(a.includes(s)||e.getWorkspacePath().includes(s))return!1}return!0}detectLanguage(e){const t=e.split(".").pop()?.toLowerCase();return{ts:"typescript",tsx:"typescript",js:"javascript",jsx:"javascript",py:"python",md:"markdown",json:"json",geojson:"geojson",kml:"xml",gpx:"xml",html:"html",css:"css",sql:"sql",xml:"xml",yaml:"yaml",yml:"yaml",pdf:"pdf"}[t||""]||"text"}async indexDocument(e,t={}){this.isInitialized||await this.initialize(),this.ensureInitialized();const n=e.getWorkspace().getName(),i=e.getWorkspacePath(),s=e.getName(),c=this.generateDocumentId(n,i);if(!this.isIndexableFile(e,t))throw new Error(`File type not indexable: ${s}`);try{let r;const l=s.split(".").pop()?.toLowerCase()||"txt";if(this.documentExtractor.canExtract(l))r=await this.documentExtractor.extractText(e,{fileType:l});else{const N=await e.getContents({contentType:ve.TEXT});if(typeof N!="string")throw new Error(`File content is not text: ${s}`);r=N}if(!r||r.trim().length===0)throw new Error(`File appears to be empty or text extraction failed: ${s}`);const d=t.maxFileSize||this.DEFAULT_MAX_FILE_SIZE;if(r.length>d)throw new Error(`File too large to index: ${s} (${r.length} bytes)`);const m=await this.computeContentHash(r),g=Date.now(),p=await this.documentsCollection.findOne(c).exec(),u=p?p.toJSON():null,w=u?.metadata.tags||[],f=t.tags||[],$=[...new Set([...w,...f])],I=$.length!==w.length||f.some(N=>!w.includes(N));if(u&&u.contentHash===m&&!I)return h.debug(`Document already indexed and unchanged: ${c}`),u;const S=this.detectLanguage(s);let ne=g;try{const N=e.getHandle?.();N&&(ne=(await N.getFile()).lastModified)}catch(N){h.debug(`Could not get file modification time: ${N}`)}const ge=!u||u.contentHash!==m,J={id:c,workspacePath:n,filePath:i,fileName:s,fileType:l,content:t.includeContent!==!1?r:"",contentHash:m,metadata:{size:r.length,lastModified:ne,language:S,tags:$},indexedAt:u?.indexedAt||g,updatedAt:g};return await this.documentsCollection.upsert(J),ge?await this.generateAndStoreEmbedding(J):h.debug(`Document content unchanged, skipping embedding regeneration: ${c}`),h.debug(`Indexed document: ${c}`),J}catch(r){throw h.error(`Failed to index document ${c}: ${r}`),r}}async getDocument(e){this.isInitialized||await this.initialize(),this.ensureInitialized();const t=await this.documentsCollection.findOne(e).exec();return t?t.toJSON():null}async getDocumentByPath(e,t){const a=this.generateDocumentId(e,t);return this.getDocument(a)}async listDocuments(e){this.isInitialized||await this.initialize(),this.ensureInitialized();let t=this.documentsCollection.find();return e&&(t=t.where("workspacePath").eq(e)),(await t.exec()).map(n=>n.toJSON())}async deleteDocument(e){this.isInitialized||await this.initialize(),this.ensureInitialized();const t=await this.documentsCollection.findOne(e).exec();if(t){await t.remove();const a=await this.vectorsCollection.find().where("documentId").eq(e).exec();for(const n of a)await n.remove();return h.debug(`Deleted document ${e} and ${a.length} associated embeddings`),!0}return!1}async deleteDocumentByPath(e,t){const a=this.generateDocumentId(e,t);return this.deleteDocument(a)}async handleSchemaMigration(){if(!(!this.vectorsCollection||!this.documentsCollection))try{const t=(await this.vectorsCollection.find().exec()).filter(n=>{const i=n.toJSON();return i.chunkIndex===void 0&&i.chunkStartOffset===void 0&&i.chunkEndOffset===void 0});if(t.length===0){h.debug("No vectors need migration - all have chunk information");return}h.info(`Detected ${t.length} vectors without chunk information. Invalidating and reindexing...`);const a=new Set;for(const n of t){const i=n.toJSON();a.add(i.documentId),await n.remove()}h.info(`Removed ${t.length} old vectors. Reindexing ${a.size} documents...`);for(const n of a){const i=await this.documentsCollection.findOne(n).exec();if(i){const s=i.toJSON();h.debug(`Reindexing document: ${s.fileName}`),await this.generateAndStoreEmbedding(s)}}h.info(`Schema migration completed. Reindexed ${a.size} documents.`)}catch(e){throw h.error(`Error during schema migration: ${e}`),e}}async deleteWorkspace(e){this.isInitialized||await this.initialize(),this.ensureInitialized();const t=await this.documentsCollection.find().where("workspacePath").eq(e).exec(),a=t.length;for(const n of t)await n.remove();return a>0&&h.info(`Deleted ${a} documents for workspace: ${e}`),a}async updateDocumentMetadata(e,t){this.isInitialized||await this.initialize(),this.ensureInitialized();const a=await this.documentsCollection.findOne(e).exec();if(!a)return null;const n=a.toJSON(),i={...n,metadata:{...n.metadata,...t.metadata},updatedAt:Date.now()};return await a.update({$set:i}),h.debug(`Updated document metadata: ${e}`),i}async indexWorkspace(e,t={}){this.isInitialized||await this.initialize();const a=e.getName();h.info(`Starting workspace indexing: ${a}`);const n=await this.collectFiles(e,t);h.info(`Found ${n.length} files to index`);let i=0,s=0;const c=[];for(const r of n)try{await this.indexDocument(r,t),i++}catch(l){s++;const d=`Failed to index ${r.getName()}: ${l}`;c.push(d),h.warn(d)}return h.info(`Workspace indexing complete: ${i} indexed, ${s} failed`),{indexed:i,failed:s,errors:c}}async collectFiles(e,t,a=[]){try{const n=await e.listChildren(!1);for(const i of n)i instanceof E?this.isIndexableFile(i,t)&&a.push(i):i instanceof $e&&await this.collectFiles(i,t,a)}catch(n){h.warn(`Failed to collect files from ${e.getName()}: ${n}`)}return a}async reindexDocument(e,t={}){const n=e.getWorkspace().getName(),i=e.getWorkspacePath(),s=this.generateDocumentId(n,i),r=(await this.getDocument(s))?.metadata.tags||[],l=t.tags||[],d=[...new Set([...r,...l])];return await this.deleteDocument(s),this.indexDocument(e,{...t,tags:d})}async reindexAllDocuments(e={}){this.isInitialized||await this.initialize(),this.ensureInitialized();const t=await this.listDocuments();let a=0,n=0;for(const i of t)try{const s=await V.getWorkspace();if(!s||s.getName()!==i.workspacePath){h.warn(`Workspace not found: ${i.workspacePath}`),n++;continue}const c=await s.getResource(i.filePath);if(!c||!(c instanceof E)){h.warn(`File not found: ${i.filePath}`),n++;continue}await this.reindexDocument(c,e),a++}catch(s){h.error(`Failed to reindex document ${i.id}: ${s}`),n++}return{total:t.length,succeeded:a,failed:n}}async getStats(){this.isInitialized||await this.initialize(),this.ensureInitialized();const e=await this.documentsCollection.count().exec(),t=await this.documentsCollection.find().exec(),a={};for(const n of t){const s=n.toJSON().workspacePath;a[s]=(a[s]||0)+1}return{totalDocuments:e,byWorkspace:a}}async handleWorkspaceChange(e){h.debug("Workspace changed, checking for document updates...")}async generateAndStoreEmbedding(e){try{if(!this.vectorsCollection){h.warn(`Vectors collection not initialized, cannot generate embedding for ${e.id}`);return}if(await G.initialize(),this.sampleVectors.length===0&&await this.initializeSampleVectors(),this.sampleVectors.length===0){h.warn(`Sample vectors not initialized, cannot generate embedding for ${e.id}`);return}const t=await this.chunker.chunkDocument(e.id,e.content,e.fileName);h.debug(`Document ${e.id} split into ${t.length} chunks`);for(const a of t){const n=await G.generateEmbedding(a.text),i=ie(n,this.sampleVectors),s={id:a.id,documentId:e.id,chunkIndex:a.chunkIndex,chunkStartOffset:a.startOffset,chunkEndOffset:a.endOffset,embedding:n,...i};await this.vectorsCollection.upsert(s)}h.debug(`Generated and stored ${t.length} embeddings for document: ${e.id}`)}catch(t){h.warn(`Failed to generate embedding for document ${e.id}: ${t}`)}}async searchSimilar(e,t={}){this.isInitialized||await this.initialize(),this.ensureInitialized();const a=t.limit||10,n=t.indexDistance||2,i=t.docsPerIndexSide||100;if(!this.vectorsCollection||this.sampleVectors.length===0)throw h.warn("Vector search not available: vectors collection or sample vectors not initialized"),new Error("Vector search not available");const s=await this.vectorsCollection.find().exec();h.debug(`Starting vector search with indexDistance=${n}, limit=${a}, sampleVectors=${this.sampleVectors.length}, totalIndexedVectors=${s.length}`);try{await G.initialize()}catch(u){throw h.error(`Failed to initialize embedding service for vector search: ${u}`),new Error(`Embedding service initialization failed: ${u}`)}let c;try{c=await G.generateEmbedding(e)}catch(u){throw h.error(`Failed to generate query embedding: ${u}`),new Error(`Query embedding generation failed: ${u}`)}if(this.sampleVectors.length===0)throw h.warn("Sample vectors not initialized, cannot perform vector search"),new Error("Sample vectors not initialized");const r=ie(c,this.sampleVectors);h.debug(`Query index values: ${JSON.stringify(r)}`);const l=new Set;try{for(const u of H){const w=r[u],f=w-n,$=w+n;h.debug(`Querying index ${u}: range [${f}, ${$}]`);const I=await this.vectorsCollection.find().where(u).gte(f).lte($).limit(i).exec();h.debug(`Found ${I.length} candidates in index ${u}`);for(const S of I)l.add(S.documentId)}}catch(u){throw h.error(`Failed to query vector index: ${u}`),new Error(`Vector index query failed: ${u}`)}h.debug(`Total unique candidate IDs: ${l.size} (out of ${s.length} indexed vectors)`);const d=[];try{for(const u of l){const w=await this.vectorsCollection.find().where("documentId").eq(u).exec();for(const f of w){const $=f.toJSON();$&&$.embedding?d.push($):h.warn(`Invalid vector data for document ${u}`)}}}catch(u){throw h.error(`Failed to fetch candidate vectors: ${u}`),new Error(`Failed to fetch candidate vectors: ${u}`)}h.debug(`Fetched ${d.length} candidate vectors`);const m=[];for(const u of d){const f=(We(c,u.embedding)+1)/2;m.push({documentId:u.documentId,similarity:f,chunkIndex:u.chunkIndex,chunkStartOffset:u.chunkStartOffset,chunkEndOffset:u.chunkEndOffset})}m.sort((u,w)=>w.similarity-u.similarity),h.debug(`Computed similarities for ${m.length} candidates, top similarity: ${m[0]?.similarity||"N/A"}`);const g=m.slice(0,a),p=[];for(const u of g){const w=await this.documentsCollection.findOne(u.documentId).exec();if(w){const f=w.toJSON();if(t.workspacePath&&f.workspacePath!==t.workspacePath||t.fileType&&f.fileType!==t.fileType)continue;p.push({document:f,similarity:u.similarity,chunkIndex:u.chunkIndex,chunkStartOffset:u.chunkStartOffset,chunkEndOffset:u.chunkEndOffset})}}return p}async indexFileInContext(e,t,a={}){this.isInitialized||await this.initialize(),this.ensureInitialized();const i=e.getWorkspace().getName(),s=e.getWorkspacePath(),c=this.generateDocumentId(i,s),r=await this.documentsCollection.findOne(c).exec(),l=r?r.toJSON():null,d=t.tags||[],m=[...a.tags||[],...d];if(l){const g=l.metadata.tags||[],p=[...new Set([...g,...m])];return p.length!==g.length||m.some(w=>!g.includes(w))?(await this.updateDocumentMetadata(l.id,{metadata:{...l.metadata,tags:p}}),h.debug(`Added tags to existing document: ${c}`),{...l,metadata:{...l.metadata,tags:p}}):(h.debug(`Document already has all tags: ${c}`),l)}return this.indexDocument(e,{...a,tags:m})}async indexFilesInContext(e,t,a={}){let n=0,i=0;const s=t.tags||[];for(const c of e)try{await this.indexDocument(c,{...a,tags:[...a.tags||[],...s]}),n++,h.debug(`Indexed file with context tags: ${c.getWorkspacePath()}`)}catch(r){h.error(`Failed to index file ${c.getWorkspacePath()}: ${r}`),i++}return{succeeded:n,failed:i}}async reindexFileInContext(e,t,a={}){const n=t.tags||[];return this.reindexDocument(e,{...a,tags:[...a.tags||[],...n]})}async removeFileFromContext(e,t){this.isInitialized||await this.initialize(),this.ensureInitialized();const a=await this.getDocumentByPath(e.getWorkspace().getName(),e.getWorkspacePath());if(a&&t.tags&&t.tags.length>0){const n=new Set(t.tags),i=(a.metadata.tags||[]).filter(s=>!n.has(s));i.length!==a.metadata.tags?.length&&await this.updateDocumentMetadata(a.id,{metadata:{...a.metadata,tags:i}})}}async clearContext(e){if(!e.tags||e.tags.length===0)return;const t=new Set(e.tags),a=await this.listDocuments();for(const n of a)if(n.metadata.tags?.some(s=>t.has(s))){const s=n.metadata.tags.filter(c=>!t.has(c));try{const c=await V.getWorkspace();if(c&&c.getName()===n.workspacePath){const r=await c.getResource(n.filePath);r instanceof E&&await this.indexDocument(r,{tags:s})}}catch(c){h.warn(`Failed to clear context tags from ${n.filePath}: ${c}`)}}}async getFilePathsInContext(e){if(!e.tags||e.tags.length===0)return[];const t=new Set(e.tags);return(await this.listDocuments()).filter(n=>n.metadata.tags?.some(i=>t.has(i))).map(n=>n.filePath)}}const v=new Ke;be.put("documentIndexService",v);const he=C("WorkspaceUtils");async function X(o){const e=await V.getWorkspace();if(!e)return he.warn("No workspace connected"),null;const t=o||e.getName();return t?{workspace:e,workspacePath:t}:(he.warn("No workspace path available"),null)}const Ze=2;function B(o,e={}){if(!o||!o.trim())return[];const t=e.minTermLength??Ze;return(e.caseSensitive?o:o.toLowerCase()).split(/\s+/).filter(n=>n.length>=t)}function fe(o){return o.toLowerCase().trim()}const Ye=10,et=400,tt=400;class te{constructor(e={}){this.maxSnippets=e.maxSnippets??Ye,this.snippetLength=e.snippetLength??et,this.minGap=e.minGap??tt}extractSnippets(e,t,a){const n=a??this.maxSnippets;if(t.length===0)return[];const i=e.toLowerCase(),s=[],c=new Set;for(const r of t){let l=i.indexOf(r);for(;l!==-1;){const d=Math.max(0,l-this.snippetLength/2),m=Math.min(e.length,l+r.length+this.snippetLength/2),g=e.substring(d,m).trim(),p=`${d}-${m}`;if(g&&!c.has(p)){c.add(p);const u=this.calculateSnippetScore(g,t);s.push({snippet:g,score:u,start:d})}l=i.indexOf(r,l+1)}}if(s.length===0&&t.length>0){const r=t[0],l=i.indexOf(r);if(l!==-1){const d=Math.max(0,l-this.snippetLength),m=Math.min(e.length,l+r.length+this.snippetLength),g=e.substring(d,m).trim();g&&s.push({snippet:g,score:10,start:d})}}return s.sort((r,l)=>l.score!==r.score?l.score-r.score:r.start-l.start),this.selectNonOverlappingSnippets(s,n)}calculateSnippetScore(e,t){const a=e.toLowerCase();let n=0;for(const r of t){const l=(a.match(new RegExp(r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi"))||[]).length;n+=l*10}const i=t.join(" ");a.includes(i)&&(n+=50);const s=t.filter(r=>a.includes(r)).length;n+=s*20;const c=s/t.length;return n+=c*30,n}selectNonOverlappingSnippets(e,t){const a=[],n=[];for(const i of e){if(a.length>=t)break;const s=i.start,c=i.start+i.snippet.length;n.some(l=>!(c<l.start-this.minGap||s>l.end+this.minGap))||(a.push(i.snippet),n.push({start:s,end:c}))}return a}extractSimpleSnippet(e,t=500){return e.substring(0,t)+(e.length>t?"...":"")}extractContextSnippets(e,t,a=150){const n=t.toLowerCase(),i=e.toLowerCase(),s=[];let c=i.indexOf(n);for(;c!==-1;)s.push(c),c=i.indexOf(n,c+1);if(s.length===0)return[];const r=[];for(const l of s){const d=Math.max(0,l-a),m=Math.min(e.length,l+t.length+a);r.push({start:d,end:m,matchIndex:l})}return r}}new te;class nt{calculateRelevance(e,t){const a=fe(t),n=B(t);let i=0;const s=e.fileName.toLowerCase(),c=e.filePath.toLowerCase(),r=e.content.toLowerCase(),l=n.filter(f=>s.includes(f)).length,d=n.filter(f=>c.includes(f)).length,m=n.filter(f=>r.includes(f)).length;i+=l*L.FILE_NAME_MATCH,i+=d*L.FILE_PATH_MATCH,i+=m*L.CONTENT_MATCH,s.includes(a)&&(i+=L.FILE_NAME_EXACT),c.includes(a)&&(i+=L.FILE_PATH_EXACT);const g=(r.match(new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"g"))||[]).length;i+=g*L.EXACT_PHRASE;const p=n.length,u=n.filter(f=>r.includes(f)).length,w=p>0?u/p:0;return i+=w*L.TERM_COVERAGE,i}calculateFileNameRelevance(e,t){const a=e.fileName.toLowerCase(),n=t.toLowerCase();return a===n?100:a.includes(n)?80:0}}const ue=new nt;class at{constructor(e){this.snippetExtractor=e}formatRAGContext(e){return e.length===0?"":`Here are relevant documents from the workspace that might help answer the question:

${e.map((a,n)=>{const i=a.document,s=a.matchedSnippets.map((c,r)=>`  [Snippet ${r+1}]
  ${c}`).join(`

`);return`[Document ${n+1}: ${i.fileName} (${i.filePath})]
Relevance: ${a.relevance.toFixed(2)}
${s.length>0?`Relevant snippets:
${s}`:`Content preview: ${this.snippetExtractor.extractSimpleSnippet(i.content,_.PREVIEW)}`}
---`}).join(`

`)}

Use the information from these documents to provide a helpful answer. Pay special attention to numbers, percentages, dates, and specific values mentioned in the snippets. If the documents don't contain relevant information, you can still answer based on your general knowledge.`}formatSearchResults(e){return e.map(t=>({file:t.document.fileName,path:t.document.filePath,relevance:t.relevance.toFixed(2),language:t.document.metadata.language,size:t.document.metadata.size,snippets:t.matchedSnippets,preview:this.snippetExtractor.extractSimpleSnippet(t.document.content,200)+"..."}))}formatCommandResults(e){return e.map(t=>({file:t.document.fileName,path:t.document.filePath,relevance:t.relevance,snippets:t.matchedSnippets}))}}const A=C("RAGService"),T=new te,it=new at(T);class st{async searchDocuments(e,t={}){const a=Math.min(t.limit||Q.DEFAULT_LIMIT,Q.MAX_LIMIT),n=await X(t.workspacePath);if(!n)return A.warn("No workspace connected, cannot search documents"),[];const{workspacePath:i}=n;if(t.filePath){const s=await v.getDocumentByPath(i,t.filePath);if(s){const c=B(e),r=c.length>0?T.extractSnippets(s.content,c,3):[T.extractSimpleSnippet(s.content,_.PREVIEW)];return[{document:s,relevance:100,matchedSnippets:r}]}return A.warn(`Document not found: ${t.filePath}`),[]}if(t.fileName){const s=await v.listDocuments(i),c=t.fileName.toLowerCase(),r=s.filter(l=>{const d=l.fileName.toLowerCase();return d===c||d.includes(c)});if(r.length>0){const l=[],d=B(e);for(const m of r.slice(0,a)){const g=d.length>0?T.extractSnippets(m.content,d,3):[T.extractSimpleSnippet(m.content,_.PREVIEW)];l.push({document:m,relevance:ue.calculateFileNameRelevance(m,t.fileName),matchedSnippets:g})}return l}return A.warn(`No documents found with name: ${t.fileName}`),[]}if(!e||!e.trim())return A.warn("No query provided and no filePath/fileName specified"),[];try{const s=await v.searchSimilar(e,{limit:a*2,workspacePath:i,fileType:t.fileType}),c=[];for(const{document:r,similarity:l,chunkStartOffset:d,chunkEndOffset:m}of s){if(!this.matchesContextScope(r,t.documentSearchScope))continue;const g=l*100;if(t.minRelevance&&g<t.minRelevance)continue;const p=fe(e),u=B(e);let w;if(d!==void 0&&m!==void 0){const f=r.content.substring(Math.max(0,d),Math.min(r.content.length,m));f.trim().length>0?w=[f.trim()]:w=T.extractSnippets(r.content,u,15)}else w=T.extractSnippets(r.content,u,15);if(w.length===0&&p.length>0)if(d!==void 0&&m!==void 0){const f=r.content.substring(Math.max(0,d),Math.min(r.content.length,m));f.trim().length>0?w=[f.trim()]:w=T.extractSnippets(r.content,[p],10)}else w=T.extractSnippets(r.content,[p],10);if(c.push({document:r,relevance:g,matchedSnippets:w}),c.length>=a)break}return c.length===0?(A.debug("Vector search returned no results, falling back to text search"),this.fallbackTextSearch(e,t)):c}catch(s){return A.warn(`Vector search failed, falling back to text search: ${s}`),A.debug(`Vector search error details: ${s}`),this.fallbackTextSearch(e,t)}}async fallbackTextSearch(e,t={}){const a=Math.min(t.limit||Q.DEFAULT_LIMIT,Q.MAX_LIMIT),n=await X(t.workspacePath);if(!n)return A.warn("No workspace connected, cannot perform text search"),[];const{workspacePath:i}=n,s=await v.listDocuments(i),c=B(e),r=[];for(const l of s){if(t.fileType&&l.fileType!==t.fileType||!this.matchesContextScope(l,t.documentSearchScope))continue;const d=ue.calculateRelevance(l,e);if(t.minRelevance&&d<t.minRelevance)continue;const m=T.extractSnippets(l.content,c,3);r.push({document:l,relevance:d,matchedSnippets:m})}return r.sort((l,d)=>d.relevance-l.relevance),r.slice(0,a)}formatRAGContext(e){return it.formatRAGContext(e)}matchesContextScope(e,t){if(!t)return!0;if(t.includePaths&&t.includePaths.length>0&&!t.includePaths.some(n=>n.includes("*")||n.includes("?")?new RegExp("^"+n.replace(/\*/g,".*").replace(/\?/g,".")+"$").test(e.filePath):e.filePath.startsWith(n)||e.filePath===n)||t.excludePaths&&t.excludePaths.length>0&&t.excludePaths.some(n=>n.includes("*")||n.includes("?")?new RegExp("^"+n.replace(/\*/g,".*").replace(/\?/g,".")+"$").test(e.filePath):e.filePath.startsWith(n)||e.filePath===n)||t.pathPattern&&!(t.pathPattern instanceof RegExp?t.pathPattern:new RegExp(t.pathPattern)).test(e.filePath))return!1;if(t.tags&&t.tags.length>0){const a=e.metadata.tags||[];if(!t.tags.every(i=>a.includes(i)))return!1}return!(t.metadataFilter&&!t.metadataFilter(e))}}const rt=new st;async function ot(o,e={}){const t=await X(e.workspacePath);return t?rt.searchDocuments(o,{...e,workspacePath:t.workspacePath}):(A.warn("No workspace connected, cannot search documents"),[])}var ct=Object.defineProperty,lt=Object.getOwnPropertyDescriptor,D=(o,e,t,a)=>{for(var n=a>1?void 0:a?lt(e,t):e,i=o.length-1,s;i>=0;i--)(s=o[i])&&(n=(a?s(e,t,n):s(n))||n);return a&&n&&ct(e,t,n),n};const j=C("RAGSystemManager"),me=new te;let b=class extends Se{constructor(){super(...arguments),this.documents=[],this.stats={totalDocuments:0,byWorkspace:{}},this.loading=!1,this.selectedDocument=null,this.searchQuery="",this.filterWorkspace=null,this.filterByActiveWorkspace=!0,this.filteredDocuments=[],this.searchResults=new Map,this.reindexing=!1,this.treeRef=Ee(),this.searchInputValue=""}async doInitUI(){try{await v.initialize(),await Promise.all([this.loadDocuments(),this.loadStats()])}catch(o){j.error(`Failed to initialize document index manager: ${o}`),y(`Failed to initialize: ${o}`)}}async loadDocuments(){this.loading=!0,this.requestUpdate();try{let o;this.filterByActiveWorkspace&&(o=(await X())?.workspacePath),this.documents=await v.listDocuments(o),await this.updateFilteredDocuments()}catch(o){j.error(`Failed to load documents: ${o}`),y(`Failed to load documents: ${o}`)}finally{this.loading=!1}}async updateFilteredDocuments(){this.filteredDocuments=await this.getFilteredDocuments(),this.requestUpdate()}async loadStats(){try{this.stats=await v.getStats(),this.requestUpdate()}catch(o){j.error(`Failed to load stats: ${o}`)}}handleTreeSelection(o){let e=o.detail?.selection||[];if(e.length===0&&this.treeRef.value&&(e=this.treeRef.value.selectedItems||[]),e.length>0){const t=e[0];t?.model?this.selectedDocument=t.model:this.selectedDocument=null}else this.selectedDocument=null}async getFilteredDocuments(){if(!this.documents||this.documents.length===0)return[];if(this.searchQuery.trim())try{const e=await ot(this.searchQuery,{limit:50,workspacePath:this.filterWorkspace||void 0});this.searchResults.clear();const t=new Map,a=new Map;for(const i of e){const s=i.document.id;t.set(s,i.document);const c=a.get(s);if(!c)a.set(s,{document:i.document,relevance:i.relevance,matchedSnippets:[...i.matchedSnippets]});else{i.relevance>c.relevance&&(c.relevance=i.relevance);const r=new Set(c.matchedSnippets);for(const l of i.matchedSnippets)r.has(l)||(c.matchedSnippets.push(l),r.add(l))}}for(const[i,s]of a)this.searchResults.set(i,s);const n=Array.from(t.values());return this.filterWorkspace?n.filter(i=>i.workspacePath===this.filterWorkspace):n}catch(e){return j.debug(`RAG search failed in document manager: ${e}`),this.searchResults.clear(),[]}else this.searchResults.clear();let o=[...this.documents];return this.filterWorkspace&&(o=o.filter(e=>e.workspacePath===this.filterWorkspace)),o}highlightMatches(o,e){if(!e||!e.trim())return x`${o}`;const t=e.toLowerCase(),a=o.toLowerCase(),n=[];let i=0,s=a.indexOf(t,i);for(;s!==-1;)s>i&&n.push(o.substring(i,s)),n.push(x`<mark class="search-match">${o.substring(s,s+e.length)}</mark>`),i=s+e.length,s=a.indexOf(t,i);return i<o.length&&n.push(o.substring(i)),x`${n}`}getContentPreview(o){const e=this.searchResults.get(o.id);if(e&&e.matchedSnippets.length>0)return x`
                <table class="snippets-table">
                    <thead>
                        <tr>
                            <th class="snippet-number-col">#</th>
                            <th class="snippet-content-col">Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e.matchedSnippets.map((a,n)=>x`
                            <tr>
                                <td class="snippet-number">${n+1}</td>
                                <td class="snippet-content">${this.highlightMatches(a,this.searchQuery)}</td>
                            </tr>
                        `)}
                    </tbody>
                </table>
            `;if(this.searchQuery&&this.searchQuery.trim()){const a=me.extractContextSnippets(o.content,this.searchQuery,_.CONTEXT);if(a.length>0)return x`
                    <table class="snippets-table">
                        <thead>
                            <tr>
                                <th class="snippet-number-col">#</th>
                                <th class="snippet-content-col">Content</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${a.map((n,i)=>x`
                                <tr>
                                    <td class="snippet-number">${i+1}</td>
                                    <td class="snippet-content">${this.highlightMatches(o.content.substring(n.start,n.end),this.searchQuery)}</td>
                                </tr>
                            `)}
                        </tbody>
                    </table>
                `}const t=me.extractSimpleSnippet(o.content,Fe.LONG);return x`
            <div class="snippet-preview">${t}</div>
        `}async deleteDocument(o){try{await v.deleteDocument(o.id),k(`Deleted: ${o.fileName}`),await this.loadDocuments(),await this.loadStats(),this.selectedDocument?.id===o.id&&(this.selectedDocument=null)}catch(e){y(`Failed to delete document: ${e}`)}}async reindexDocument(o){try{const e=await X();if(!e){y("No workspace connected");return}const t=await e.workspace.getResource(o.filePath);if(!t){y(`File not found: ${o.filePath}`);return}if(!(t instanceof E)){y(`Resource is not a file: ${o.filePath}`);return}const a=t;await R.runAsync("Reindexing document",async n=>{n.message=`Reindexing ${o.fileName}...`,await v.reindexDocument(a),n.progress=100}),k(`Reindexed: ${o.fileName}`),await this.loadDocuments(),this.selectedDocument?.id===o.id&&(this.selectedDocument=await v.getDocument(o.id))}catch(e){y(`Failed to reindex document: ${e}`)}}async reindexAllDocuments(){if(this.reindexing)return;const o=await v.getStats();if(o.totalDocuments===0){k("No documents to reindex");return}this.reindexing=!0,this.requestUpdate();try{const e=await R.runAsync("Reindexing all documents",async t=>{t.message="Starting reindexing...";const a=o.totalDocuments,n=await v.reindexAllDocuments(),i=n.succeeded+n.failed;return t.progress=a>0?i/a*100:100,t.message=`Reindexed ${n.succeeded}/${a} documents${n.failed>0?` (${n.failed} failed)`:""}`,n});await this.loadDocuments(),await this.loadStats(),k(`Reindexing completed: ${e.succeeded} succeeded, ${e.failed} failed`)}catch(e){j.error(`Failed to reindex all documents: ${e}`),y(`Failed to reindex all documents: ${e}`)}finally{this.reindexing=!1,this.requestUpdate()}}formatFileSize(o){return o<1024?`${o} B`:o<1024*1024?`${(o/1024).toFixed(1)} LyraB`:`${(o/(1024*1024)).toFixed(1)} MB`}formatDate(o){return new Date(o).toLocaleString()}getFileIcon(o){return ee.getFileIcon(o)}renderToolbar(){const o=Object.keys(this.stats?.byWorkspace||{});return x`
            <wa-input
                type="search"
                placeholder="Search documents..."
                .value=${this.searchInputValue}
                @input=${e=>{this.searchInputValue=e.target.value,this.searchDebounceTimer&&clearTimeout(this.searchDebounceTimer),this.searchDebounceTimer=window.setTimeout(async()=>{this.searchQuery=this.searchInputValue,await this.updateFilteredDocuments()},200)}}
                @wa-clear=${async()=>{this.searchDebounceTimer&&clearTimeout(this.searchDebounceTimer),this.searchInputValue="",this.searchQuery="",await this.updateFilteredDocuments()}}
                size="small"
                with-clear
                autocomplete="off"
                style="flex: 1; max-width: 400px;">
                <wa-icon name="magnifying-glass" slot="start"></wa-icon>
            </wa-input>
            
            <wa-switch
                .checked=${this.filterByActiveWorkspace}
                @change=${async e=>{this.filterByActiveWorkspace=e.target.checked,await this.loadDocuments()}}
                size="small">
                Active workspace only
            </wa-switch>
            
            ${o.length>1?x`
                <wa-select 
                    .value=${this.filterWorkspace||""}
                    @change=${async e=>{this.filterWorkspace=e.target.value||null,await this.updateFilteredDocuments()}}
                    size="small"
                    style="width: 200px;">
                    <wa-option value="">All Workspaces</wa-option>
                    ${o.map(e=>x`
                        <wa-option value="${e}">${e} (${this.stats.byWorkspace[e]})</wa-option>
                    `)}
                </wa-select>
            `:q}
            
            <lyra-command 
                size="small" 
                icon="arrow-rotate-right"
                title="Refresh document list"
                .action=${()=>this.loadDocuments()}
                ?disabled=${this.reindexing}>
                Refresh
            </lyra-command>
            
            <lyra-command 
                size="small" 
                icon="database"
                title="Re-index all documents"
                .action=${()=>this.reindexAllDocuments()}
                ?disabled=${this.reindexing||this.loading}>
                ${this.reindexing?"Reindexing...":"Re-index All"}
            </lyra-command>
        `}render(){this.stats||(this.stats={totalDocuments:0,byWorkspace:{}});const o=this.filteredDocuments,e=Object.keys(this.stats.byWorkspace||{});return x`
            <div class="rag-system-manager">
                <div class="header">
                    <div class="header-content">
                        <div class="stats">
                            <span>Total: ${this.stats.totalDocuments} documents</span>
                            ${e.length>0?x`
                                <span>Workspaces: ${e.length}</span>
                            `:q}
                        </div>
                    </div>
                </div>

                <wa-split-panel position="40" style="height: 100%;">
                    <div class="document-list" slot="start">
                        ${this.loading?x`
                            <div class="loading">
                                <wa-spinner></wa-spinner>
                                <span>Loading documents...</span>
                            </div>
                        `:o.length===0?x`
                            <div class="empty">
                                <wa-icon name="inbox" style="font-size: 3rem; opacity: 0.3;"></wa-icon>
                                <p>${this.searchQuery||this.filterWorkspace?"No documents match your filters":"No documents indexed yet"}</p>
                            </div>
                        `:x`
                            <wa-tree 
                                ${Ce(this.treeRef)}
                                selection="leaf"
                                style="--indent-guide-width: 1px;"
                                @wa-selection-change=${t=>{this.handleTreeSelection(t)}}>
                                ${o.map(t=>x`
                                    <wa-tree-item 
                                        .model=${t}
                                        ?selected=${this.selectedDocument?.id===t.id}>
                                        <wa-icon name="${this.getFileIcon(t.fileType)}"></wa-icon>
                                            <div class="tree-item-info">
                                                <strong class="tree-item-path">${t.filePath}</strong>
                                                <div class="tree-item-meta">
                                                    <small class="meta-size">${this.formatFileSize(t.metadata.size)}</small>
                                                    <small class="meta-date">${this.formatDate(t.indexedAt)}</small>
                                                </div>
                                            </div>
                                            <div class="tree-item-actions" @click=${a=>a.stopPropagation()}>
                                                <wa-button
                                                    variant="neutral"
                                                    appearance="plain"
                                                    size="small"
                                                    title="Reindex"
                                                    @click=${()=>this.reindexDocument(t)}>
                                                    <wa-icon name="arrow-rotate-right"></wa-icon>
                                                </wa-button>
                                                <wa-button
                                                    variant="danger"
                                                    appearance="plain"
                                                    size="small"
                                                    title="Delete"
                                                    @click=${()=>this.deleteDocument(t)}>
                                                    <wa-icon name="trash"></wa-icon>
                                                </wa-button>
                                            </div>
                                    </wa-tree-item>
                                `)}
                            </wa-tree>
                        `}
                    </div>

                    <div slot="end">
                        ${this.selectedDocument?x`
                            <div class="document-details">
                                <div class="details-content">
                                    <div class="metadata-grid">
                                        <wa-input
                                            label="File Path"
                                            .value=${this.selectedDocument.filePath}
                                            readonly
                                            size="small">
                                            <wa-copy-button
                                                slot="end"
                                                .value=${this.selectedDocument.filePath}
                                                size="small"
                                                label="Copy file path">
                                            </wa-copy-button>
                                        </wa-input>
                                        
                                        <wa-input
                                            label="Workspace"
                                            .value=${this.selectedDocument.workspacePath}
                                            readonly
                                            size="small">
                                            <wa-copy-button
                                                slot="end"
                                                .value=${this.selectedDocument.workspacePath}
                                                size="small"
                                                label="Copy workspace">
                                            </wa-copy-button>
                                        </wa-input>
                                        
                                        <wa-input
                                            label="File Type"
                                            .value=${this.selectedDocument.fileType}
                                            readonly
                                            size="small">
                                            <wa-copy-button
                                                slot="end"
                                                .value=${this.selectedDocument.fileType}
                                                size="small"
                                                label="Copy file type">
                                            </wa-copy-button>
                                        </wa-input>
                                        
                                        <wa-input
                                            label="Size"
                                            .value=${this.formatFileSize(this.selectedDocument.metadata.size)}
                                            readonly
                                            size="small">
                                            <wa-copy-button
                                                slot="end"
                                                .value=${this.formatFileSize(this.selectedDocument.metadata.size)}
                                                size="small"
                                                label="Copy size">
                                            </wa-copy-button>
                                        </wa-input>
                                        
                                        <wa-input
                                            label="Indexed At"
                                            .value=${this.formatDate(this.selectedDocument.indexedAt)}
                                            readonly
                                            size="small">
                                            <wa-copy-button
                                                slot="end"
                                                .value=${this.formatDate(this.selectedDocument.indexedAt)}
                                                size="small"
                                                label="Copy indexed date">
                                            </wa-copy-button>
                                        </wa-input>
                                        
                                        <wa-input
                                            label="Last Updated"
                                            .value=${this.formatDate(this.selectedDocument.updatedAt)}
                                            readonly
                                            size="small">
                                            <wa-copy-button
                                                slot="end"
                                                .value=${this.formatDate(this.selectedDocument.updatedAt)}
                                                size="small"
                                                label="Copy updated date">
                                            </wa-copy-button>
                                        </wa-input>
                                    </div>
                                    
                                    ${this.selectedDocument.metadata.tags&&this.selectedDocument.metadata.tags.length>0?x`
                                        <div class="tags-section">
                                            <wa-input
                                                label="Tags"
                                                .value=${this.selectedDocument.metadata.tags.join(", ")}
                                                readonly
                                                size="small">
                                                <wa-copy-button
                                                    slot="end"
                                                    .value=${this.selectedDocument.metadata.tags.join(", ")}
                                                    size="small"
                                                    label="Copy tags">
                                                </wa-copy-button>
                                            </wa-input>
                                        </div>
                                    `:q}
                                
                                    <div class="detail-section">
                                        <label>Content Preview${this.searchQuery?x` <span class="search-hint">(showing matches for "${this.searchQuery}")</span>`:q}</label>
                                        <wa-scroller class="content-preview" orientation="vertical">
                                            <div class="content-preview-inner">
                                                ${this.getContentPreview(this.selectedDocument)}
                                            </div>
                                        </wa-scroller>
                                    </div>
                                </div>
                            </div>
                    `:x`
                            <div class="document-details empty">
                                <wa-icon name="file-lines" style="font-size: 3rem; opacity: 0.3;"></wa-icon>
                                <p>Select a document to view details</p>
                            </div>
                        `}
                    </div>
                </wa-split-panel>
            </div>
        `}};b.styles=ke`
        :host {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: hidden;
            min-height: 0;
        }

        .rag-system-manager {
            display: flex;
            flex-direction: column;
            height: 100%;
            min-height: 0;
            overflow: hidden;
        }

        wa-split-panel {
            flex: 1;
            min-height: 0;
            overflow: hidden;
        }

        .document-list {
            height: 100%;
            overflow-y: auto;
        }

        .tree-item-info {
            flex: 1;
            min-width: 0;
        }

        .tree-item-path {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .tree-item-meta {
            display: flex;
            align-items: center;
            gap: var(--wa-space-xs);
            flex-wrap: wrap;
            margin-top: var(--wa-space-xs);
        }

        .tree-item-actions {
            opacity: 0;
        }

        wa-tree-item:hover .tree-item-actions {
            opacity: 1;
        }

        .document-details {
            height: 100%;
            display: flex;
            flex-direction: column;
            min-height: 0;
            overflow: hidden;
        }

        .details-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: var(--wa-space-s);
            min-height: 0;
            overflow: hidden;
        }

        .metadata-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--wa-space-s);
            flex-shrink: 0;
        }

        .tags-section {
            margin-top: var(--wa-space-s);
            flex-shrink: 0;
            margin-bottom: var(--wa-space-s);
        }

        .detail-section {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-height: 0;
            position: relative;
        }

        .detail-section label {
            flex-shrink: 0;
            margin-bottom: var(--wa-space-xs);
        }

        .content-preview {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
        }

        .content-preview-inner {
            width: 100%;
        }

        .snippets-table {
            width: 100%;
            border-collapse: collapse;
            background-color: var(--wa-color-surface-raised);
        }

        .snippets-table thead {
            background-color: var(--wa-color-neutral-fill-quiet);
        }

        .snippets-table th {
            padding: var(--wa-space-xs) var(--wa-space-s);
            text-align: left;
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--wa-color-text-quiet);
            border-bottom: 1px solid var(--wa-color-surface-border);
        }

        .snippets-table td {
            padding: var(--wa-space-s);
            border-bottom: 1px solid var(--wa-color-surface-border);
            vertical-align: top;
        }

        .snippets-table tbody tr:last-child td {
            border-bottom: none;
        }

        .snippets-table tbody tr:hover {
            background-color: var(--wa-color-neutral-fill-quiet);
        }

        .snippet-number-col {
            width: 3rem;
            text-align: center;
        }

        .snippet-content-col {
            width: auto;
        }

        .snippet-number {
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--wa-color-text-quiet);
            text-align: center;
        }

        .snippet-content {
            white-space: pre-wrap;
            word-wrap: breaword;
            overflow-wrap: breaword;
            font-family: monospace;
            font-size: 0.875rem;
            line-height: 1.5;
            color: var(--wa-color-text-normal);
        }

        .snippet-preview {
            white-space: pre-wrap;
            word-wrap: breaword;
            overflow-wrap: breaword;
            font-family: monospace;
            font-size: 0.875rem;
            line-height: 1.5;
            color: var(--wa-color-text-normal);
            padding: var(--wa-space-s);
            background-color: var(--wa-color-surface-raised);
            border-radius: var(--wa-border-radius-medium);
        }

        .snippet-content mark.search-match {
            background: var(--wa-color-warning-fill-loud);
            color: var(--wa-color-warning-text-loud);
            padding: 0 2px;
            border-radius: 2px;
            font-weight: 600;
        }
    `;D([De({attribute:!1})],b.prototype,"input",2);D([P()],b.prototype,"documents",2);D([P()],b.prototype,"stats",2);D([P()],b.prototype,"loading",2);D([P()],b.prototype,"selectedDocument",2);D([P()],b.prototype,"searchQuery",2);D([P()],b.prototype,"filterWorkspace",2);D([P()],b.prototype,"filterByActiveWorkspace",2);D([P()],b.prototype,"filteredDocuments",2);D([P()],b.prototype,"searchResults",2);D([P()],b.prototype,"reindexing",2);b=D([Te("lyra-rag-system-manager")],b);const M=C("RAGSystemExtension");function dt(o){v.initialize().catch(e=>{M.error(`Failed to initialize document index service: ${e}`)}),O({command:{id:"rag-system.index-file",name:"Index Document",description:"Index the currently selected file for search and retrieval",parameters:[{name:"includeContent",description:"Whether to include full content in index (default: true)",required:!1}]},handler:{canExecute:e=>F.get()instanceof E,execute:async e=>{const t=F.get();if(!(t instanceof E)){y("Please select a file to index");return}const a=e.params?.includeContent!==!1;await R.runAsync("Indexing document",async n=>{n.message=`Indexing ${t.getName()}...`;try{const i=await v.indexDocument(t,{includeContent:a});n.progress=100,k(`Document indexed: ${i.fileName}`)}catch(i){throw y(`Failed to index document: ${i}`),i}})}}}),O({command:{id:"rag-system.index-workspace",name:"Index Workspace",description:"Index all indexable files in the current workspace",parameters:[{name:"includeContent",description:"Whether to include full content in index (default: true)",required:!1},{name:"maxFileSize",description:"Maximum file size in bytes to index (default: 5MB)",required:!1}]},handler:{canExecute:e=>!0,execute:async e=>{const t=await V.getWorkspace();if(!t){y("No workspace selected");return}const a=e.params?.includeContent!==!1,n=e.params?.maxFileSize?parseInt(e.params.maxFileSize):void 0;await R.runAsync("Indexing workspace",async i=>{i.message="Collecting files...",i.progress=0;try{const s=await v.indexWorkspace(t,{includeContent:a,maxFileSize:n});i.progress=100,s.failed>0?y(`Indexing complete: ${s.indexed} indexed, ${s.failed} failed. Check console for details.`):k(`Workspace indexed: ${s.indexed} documents`)}catch(s){throw y(`Failed to index workspace: ${s}`),s}})}}}),O({command:{id:"rag-system.list-documents",name:"List Indexed Documents",description:"List all indexed documents in the current workspace",parameters:[]},handler:{canExecute:e=>!0,execute:async e=>{const a=(await V.getWorkspace())?.getName();await R.runAsync("Loading indexed documents",async n=>{try{const i=await v.listDocuments(a);n.progress=100,i.length===0?k("No documents indexed in this workspace"):(M.info(`Found ${i.length} indexed documents`),k(`Found ${i.length} indexed documents (check console for details)`))}catch(i){throw y(`Failed to list documents: ${i}`),i}})}}}),O({command:{id:"rag-system.delete-document",name:"Delete Document from Index",description:"Remove the selected file from the document index",parameters:[]},handler:{canExecute:e=>F.get()instanceof E,execute:async e=>{const t=F.get();if(!(t instanceof E)){y("Please select a file to remove from index");return}const n=t.getWorkspace().getName(),i=t.getWorkspacePath();await R.runAsync("Deleting document from index",async s=>{try{const c=await v.deleteDocumentByPath(n,i);s.progress=100,c?k(`Document removed from index: ${t.getName()}`):k(`Document not found in index: ${t.getName()}`)}catch(c){throw y(`Failed to delete document from index: ${c}`),c}})}}}),O({command:{id:"rag-system.clear-workspace",name:"Clear Workspace Index",description:"Remove all indexed documents from the current workspace",parameters:[]},handler:{canExecute:e=>!0,execute:async e=>{const t=await V.getWorkspace();if(!t){y("No workspace selected");return}const a=t.getName();await R.runAsync("Clearing workspace index",async n=>{try{const i=await v.deleteWorkspace(a);n.progress=100,k(`Removed ${i} documents from index`)}catch(i){throw y(`Failed to clear workspace index: ${i}`),i}})}}}),O({command:{id:"rag-system.get-stats",name:"Document Index Statistics",description:"Get statistics about the document index",parameters:[]},handler:{canExecute:e=>!0,execute:async e=>{await R.runAsync("Loading statistics",async t=>{try{const a=await v.getStats();t.progress=100,M.info(`Document index statistics: ${JSON.stringify(a)}`),k(`Index statistics: ${a.totalDocuments} total documents. Check console for details.`)}catch(a){throw y(`Failed to get statistics: ${a}`),a}})}}}),O({command:{id:"rag-system.reindex-file",name:"Reindex Document",description:"Reindex the selected file (useful after file changes)",parameters:[]},handler:{canExecute:e=>F.get()instanceof E,execute:async e=>{const t=F.get();if(!(t instanceof E)){y("Please select a file to reindex");return}await R.runAsync("Reindexing document",async a=>{a.message=`Reindexing ${t.getName()}...`;try{const n=await v.reindexDocument(t);a.progress=100,k(`Document reindexed: ${n.fileName}`)}catch(n){throw y(`Failed to reindex document: ${n}`),n}})}}}),M.info("RAG system extension loaded"),ee.registerEditorInputHandler({editorId:"system.rag-system-manager",label:"RAG System Manager",ranking:1e3,canHandle:e=>e.key===".system.rag-system",handle:async e=>(e.component=()=>x`
                <lyra-rag-system-manager .input=${e}></lyra-rag-system-manager>
            `,e)}),O({command:{id:"open-rag-system-manager",name:"Open RAG System Manager",description:"Opens the RAG system manager to view and manage indexed documents",parameters:[]},handler:{execute:e=>{const t={title:"RAG System Manager",data:{},key:".system.rag-system",icon:"database",state:{}};ee.loadEditor(t).catch(a=>{M.error(`Failed to open document index manager: ${a}`)})}},contribution:{target:Pe,icon:"database",label:"RAG System"}}),Ie.registerContribution("contextmenu:filebrowser",{name:"contextmenu.filebrowser.indexDocument",command:"rag-system.index-file",icon:"database",label:"Index Document",disabled:()=>!(F.get()instanceof E)}),z(()=>import("./rag-integration-BJObSNJd.js"),__vite__mapDeps([14,1,2,15,16])).then(e=>{e.integrateRAGWithAI(),M.info("RAG integration enabled")}).catch(e=>{M.warn(`Failed to load RAG integration: ${e}`)})}const ft=Object.freeze(Object.defineProperty({__proto__:null,default:dt},Symbol.toStringTag,{value:"Module"}));export{at as R,Q as S,te as a,ft as b,v as d,X as g,rt as r,ot as s};
