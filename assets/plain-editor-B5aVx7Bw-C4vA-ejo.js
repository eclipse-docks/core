import{A as e,I as t,L as n,R as r,dt as i,ht as a,j as o,k as s,mt as c,o as l,r as u,z as d}from"./dist-BrDz_4P5.js";import{t as f}from"./preload-helper-ca-nBW7U.js";var p=class extends d{constructor(...e){super(...e),this.value=``,this.readOnly=!1,this.lineCount=1,this.gutterScrollHeight=0,this.textareaRef=s(),this.innerTextarea=null,this.gutterEl=null,this.resizeObserver=null,this.onTextScroll=()=>{let e=this.innerTextarea,t=this.gutterEl;!e||!t||t.scrollTop!==e.scrollTop&&(t.scrollTop=e.scrollTop)},this.onGutterScroll=()=>{let e=this.innerTextarea,t=this.gutterEl;!e||!t||e.scrollTop!==t.scrollTop&&(e.scrollTop=t.scrollTop)},this.onInput=e=>{this.value=e.target.value;let t=this.value.split(`
`).length;this.lineCount=Math.max(1,t),this.emitChange(),queueMicrotask(()=>this.syncScrollMetrics())}}willUpdate(e){if(e.has(`value`)){let e=this.value.split(`
`).length;this.lineCount=Math.max(1,e)}}updated(){queueMicrotask(()=>{this.cacheElements(),this.syncScrollMetrics(),this.attachScrollListeners()})}disconnectedCallback(){this.teardownScrollListeners(),super.disconnectedCallback()}cacheElements(){this.innerTextarea=this.textareaRef.value?.shadowRoot?.querySelector(`textarea`)??null,this.gutterEl=this.renderRoot?.querySelector(`.line-gutter`)??null}attachScrollListeners(){let e=this.innerTextarea,t=this.gutterEl;!e||!t||(e.removeEventListener(`scroll`,this.onTextScroll),e.addEventListener(`scroll`,this.onTextScroll,{passive:!0}),t.removeEventListener(`scroll`,this.onGutterScroll),t.addEventListener(`scroll`,this.onGutterScroll,{passive:!0}),this.resizeObserver||=new ResizeObserver(()=>{this.syncScrollMetrics()}),this.resizeObserver.disconnect(),this.resizeObserver.observe(e))}teardownScrollListeners(){this.innerTextarea?.removeEventListener(`scroll`,this.onTextScroll),this.gutterEl?.removeEventListener(`scroll`,this.onGutterScroll),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.innerTextarea=null,this.gutterEl=null}syncScrollMetrics(){let e=this.innerTextarea;if(!e)return;let t=e.scrollHeight;t!==this.gutterScrollHeight&&(this.gutterScrollHeight=t),this.onTextScroll()}emitChange(){this.dispatchEvent(new CustomEvent(`content-change`,{detail:{value:this.value},bubbles:!0,composed:!0}))}getValue(){return this.value}getSelection(){let e=this.textareaRef.value?.shadowRoot?.querySelector(`textarea`);if(!e)return null;let{selectionStart:t,selectionEnd:n,value:r}=e;return t===n?``:r.slice(t,n)}getSnippet(e=5){let t=this.textareaRef.value?.shadowRoot?.querySelector(`textarea`);if(!t)return null;let n=this.value,r=t.selectionStart,i=0;for(let e=0;e<n.length&&e<r;e++)n[e]===`
`&&(i++,e+1);let a=n.split(`
`),o=i,s=Math.max(0,o-e),c=Math.min(a.length,o+e+1);return{snippet:a.slice(s,c).join(`
`),cursorLine:o}}render(){let t=[];for(let e=1;e<=this.lineCount;e++)t.push(e);return c`
      <div class="wrap">
        <div class="line-gutter" aria-hidden="true">
          <div class="line-gutter-inner" style="min-height: ${this.gutterScrollHeight>0?`${this.gutterScrollHeight}px`:`100%`}">
            ${t.map(e=>c`<div class="ln">${e}</div>`)}
          </div>
        </div>
        <wa-textarea
          class="editor-ta"
          resize="none"
          .value=${this.value}
          ?readonly=${this.readOnly}
          @input=${this.onInput}
          ${e(this.textareaRef)}
        ></wa-textarea>
      </div>
    `}static{this.styles=a`
    :host {
      display: block;
      height: 100%;
      min-height: 0;
    }
    .wrap {
      display: flex;
      flex-direction: row;
      height: 100%;
      min-height: 0;
      gap: var(--wa-space-s, 0.5rem);
    }
    .line-gutter {
      flex: 0 0 auto;
      min-width: 2.5rem;
      min-height: 0;
      align-self: stretch;
      padding: 0;
      text-align: right;
      font-family: var(--wa-font-mono, ui-monospace, monospace);
      font-size: var(--wa-font-size-s, 0.875rem);
      /* Match wa-textarea value line metrics (gutter used 1.5 while controls use --wa-form-control-value-line-height, e.g. 1.2) */
      line-height: var(--wa-form-control-value-line-height, 1.5);
      color: var(--wa-color-neutral-50, #888);
      user-select: none;
      overflow-x: hidden;
      overflow-y: auto;
      scrollbar-width: none;
      box-sizing: border-box;
    }
    .line-gutter::-webkit-scrollbar {
      display: none;
    }
    .line-gutter-inner {
      box-sizing: border-box;
      line-height: inherit;
      /* Same vertical padding as wa-textarea inner control (see webawesome textarea.styles) */
      padding-block: calc(var(--wa-form-control-padding-block, 0.75em) - ((1lh - 1em) / 2));
      padding-inline: 0;
    }
    .ln {
      padding-right: var(--wa-space-xs, 0.25rem);
      box-sizing: border-box;
      line-height: inherit;
      min-height: 1lh;
    }
    .editor-ta {
      flex: 1 1 auto;
      align-self: stretch;
      min-width: 0;
      min-height: 0;
      width: 100%;
      height: 100%;
      font-family: var(--wa-font-mono, ui-monospace, monospace);
      font-size: var(--wa-font-size-s, 0.875rem);
      line-height: var(--wa-form-control-value-line-height, 1.5);
    }
    .editor-ta::part(base) {
      flex: 1 1 auto;
      min-height: 0;
      height: 100%;
      align-items: stretch;
      justify-items: stretch;
    }
    .editor-ta::part(textarea) {
      min-height: 100%;
      height: 100%;
      resize: none;
      line-height: inherit;
    }
  `}};o([n()],p.prototype,`value`,void 0),o([n({type:Boolean})],p.prototype,`readOnly`,void 0),o([t()],p.prototype,`lineCount`,void 0),o([t()],p.prototype,`gutterScrollHeight`,void 0),p=o([r(`docks-texteditor`)],p);var m=8*1024,h=m;async function g(e){if(e.size===0)return!1;let t=Math.min(e.size,h),n=new Uint8Array(await e.slice(0,t).arrayBuffer());for(let e=0;e<n.length;e++)if(n[e]===0)return!0;try{return new TextDecoder(`utf-8`,{fatal:!0}).decode(n),!1}catch{return!0}}function _(e){return e>=32&&e<=126?String.fromCharCode(e):`.`}function v(e){let t=``;for(let n=0;n<e.length;n++)t+=_(e[n]);return t.padEnd(16,` `)}function y(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].toString(16).padStart(2,`0`));return t.length<=8?t.join(` `):`${t.slice(0,8).join(` `)}  ${t.slice(8).join(` `)}`}function b(e){let t=e.replace(/[^0-9a-fA-F]/g,``),n=Math.floor(t.length/2),r=new Uint8Array(n);for(let e=0;e<n;e++)r[e]=parseInt(t.slice(e*2,e*2+2),16);return r}function x(e){let t=e.replace(/[^0-9a-fA-F]/g,``),n=[];for(let e=0;e+1<t.length;e+=2)n.push(parseInt(t.slice(e,e+2),16));return n}var S=/[0-9a-fA-F]/;function C(e,t){for(let n=Math.max(0,t);n<e.length;n++)if(S.test(e[n]))return n;return-1}function w(e,t){for(let n=Math.min(t,e.length-1);n>=0;n--)if(S.test(e[n]))return n;return-1}function T(e,t){if(e.length===0)return-1;if(t>=e.length)return w(e,e.length-1);if(t<0)return C(e,0);if(S.test(e[t]))return t;let n=C(e,t);return n>=0?n:w(e,t)}function E(e,t,n){let r=Math.min(t,n),i=Math.max(t,n);for(let t=r;t<i&&t<e.length;t++)if(S.test(e[t]))return t;return C(e,r)}function D(e,t){let n=C(e,t+1);return n>=0?n:e.length}function O(e,t,n,r){let i=r.toLowerCase();if(!/^[0-9a-f]$/.test(i))return null;let a=t===n?T(e,t):E(e,t,n);if(a<0||!S.test(e[a])&&(a=C(e,a),a<0))return null;let o=[...e];o[a]=i;let s=o.join(``);return{line:s,caret:D(s,a)}}function k(e,t){let n=w(e,t-1);return n>=0?n:t}function A(e,t){let n=t>=e.length?e.length-1:t,r=C(e,S.test(e[n])?n+1:n);return r>=0?r:t}function j(e){return e===0?1:Math.ceil(e/16)}function M(e,t,n){let r=x(n).slice(0,16),i=e.subarray(0,t),a=Math.min(16,Math.max(0,e.length-t)),o=e.subarray(t+a),s=Uint8Array.from(r),c=new Uint8Array(i.length+s.length+o.length);return c.set(i,0),c.set(s,i.length),c.set(o,i.length+s.length),c}var N=typeof InputEvent<`u`&&`inputType`in InputEvent.prototype,P=class extends d{constructor(...e){super(...e),this.initialBytes=new Uint8Array,this.seed=0,this.readOnly=!1,this.bytes=new Uint8Array,this.lastSeed=-1,this.onHexLineBeforeInput=(e,t)=>{if(this.readOnly||!N)return;let n=t;if(!n.isComposing){if(n.inputType===`insertText`&&n.data&&/^[0-9a-fA-F]$/.test(n.data)){n.preventDefault();let t=n.target,r=O(t.value,t.selectionStart??0,t.selectionEnd??0,n.data);if(!r)return;t.value=r.line,t.setSelectionRange(r.caret,r.caret),this.commitHexLine(e,r.line,t,r.caret);return}(n.inputType===`insertText`||n.inputType===`insertLineBreak`||n.inputType===`insertParagraph`||n.inputType===`insertFromPaste`)&&n.preventDefault()}},this.onHexLineKeydown=(e,t)=>{if(this.readOnly)return;let n=t.target;if(t.key===`Backspace`||t.key===`Delete`){t.preventDefault();let e=n.selectionStart??0;if(e!==(n.selectionEnd??0)){n.setSelectionRange(e,e);return}let r=t.key===`Backspace`?k(n.value,e):A(n.value,e);n.setSelectionRange(r,r);return}if(t.key===` `||t.key===`Spacebar`){t.preventDefault();let e=A(n.value,n.selectionStart??0);n.setSelectionRange(e,e);return}if(!N&&t.key.length===1&&!t.ctrlKey&&!t.metaKey&&!t.altKey){if(/[0-9a-fA-F]/.test(t.key)){t.preventDefault();let r=O(n.value,n.selectionStart??0,n.selectionEnd??0,t.key);if(!r)return;n.value=r.line,n.setSelectionRange(r.caret,r.caret),this.commitHexLine(e,r.line,n,r.caret);return}t.preventDefault()}},this.onHexLinePaste=(e,t)=>{this.readOnly||(t.preventDefault(),this.applyHexPaste(e,t))}}willUpdate(e){e.has(`seed`)&&this.seed!==this.lastSeed&&(this.lastSeed=this.seed,this.bytes=new Uint8Array(this.initialBytes))}emitChange(e){this.dispatchEvent(new CustomEvent(`content-change`,{detail:{bytes:e},bubbles:!0,composed:!0}))}commitHexLine(e,t,n,r){let i=M(this.bytes,e,t);this.bytes=i,this.emitChange(i),this.updateComplete.then(()=>{if(!n.isConnected)return;let t=y(i.subarray(e,Math.min(e+16,i.length)));n.value=t;let a=Math.min(r,t.length);n.setSelectionRange(a,a)})}applyHexPaste(e,t){let n=t.target;if(!n)return;let r=b(t.clipboardData?.getData(`text/plain`)??``),i=Math.min(r.length,16),a=y(r.subarray(0,i));this.commitHexLine(e,a,n,0)}getBytesSnapshot(){return new Uint8Array(this.bytes)}render(){let e=this.bytes.length,t=j(e||1),n=[];for(let e=0;e<16;e++)n.push(c`<span class="hex-col-head">${e.toString(16)}</span>`);let r=[];for(let e=0;e<t;e++){let t=e*16,n=this.bytes.subarray(t,Math.min(t+16,this.bytes.length)),i=t.toString(16).padStart(8,`0`),a=y(n),o=v(n);r.push(c`
        <div class="hex-row" part="hex-row">
          <span class="addr-col">${i}h</span>
          <div class="hex-cols" role="group" aria-label="hex bytes">
            <input
              type="text"
              class="hex-line-input"
              spellcheck="false"
              autocomplete="off"
              ?readonly=${this.readOnly}
              .value=${a}
              @beforeinput=${e=>this.onHexLineBeforeInput(t,e)}
              @keydown=${e=>this.onHexLineKeydown(t,e)}
              @paste=${e=>this.onHexLinePaste(t,e)}
              @cut=${e=>e.preventDefault()}
            />
          </div>
          <span class="ascii-col">${o}</span>
        </div>
      `)}return c`
      <div class="hex-shell">
        <div class="hex-header" part="hex-header">
          <span class="addr-col"></span>
          <div class="hex-cols hex-header-cols">${n}</div>
          <span class="ascii-header" title="ASCII">ASCII</span>
        </div>
        <wa-scroller class="hex-scroll" orientation="vertical">
          <div class="hex-body">${r}</div>
        </wa-scroller>
      </div>
    `}static{this.styles=a`
    :host {
      display: block;
      height: 100%;
      min-height: 0;
    }
    .hex-shell {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      padding: var(--wa-space-s, 0.5rem);
      font-family: var(--wa-font-mono, ui-monospace, monospace);
      font-size: var(--wa-font-size-s, 0.875rem);
      line-height: 1.5;
      width: fit-content;
      max-width: 100%;
      min-width: 0;
    }
    .hex-scroll {
      flex: 1 1 auto;
      min-height: 0;
    }
    .hex-header {
      display: grid;
      /* addr | hex (48 chars for 16 bytes) | ASCII preview (16 chars) */
      grid-template-columns: 5.5rem 48ch 16ch;
      gap: var(--wa-space-s, 0.5rem);
      align-items: end;
      padding-bottom: var(--wa-space-xs, 0.25rem);
      margin-bottom: var(--wa-space-xs, 0.25rem);
      border-bottom: 1px solid var(--wa-color-neutral-border, #444);
      color: var(--wa-color-neutral-50, #888);
      user-select: none;
    }
    .hex-header-cols {
      display: grid;
      grid-template-columns: repeat(16, 1fr);
      gap: 0;
      text-align: center;
      width: 48ch;
      min-width: 0;
    }
    .hex-col-head {
      font-size: var(--wa-font-size-xs, 0.75rem);
    }
    .ascii-header {
      text-align: left;
      width: 16ch;
      min-width: 16ch;
    }
    .hex-body {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .hex-row {
      display: grid;
      grid-template-columns: 5.5rem 48ch 16ch;
      gap: var(--wa-space-s, 0.5rem);
      align-items: center;
      min-height: 1.5em;
    }
    .addr-col {
      color: var(--wa-color-neutral-50, #888);
      text-align: right;
      user-select: none;
      padding-right: var(--wa-space-xs, 0.25rem);
    }
    .hex-cols {
      width: 48ch;
      min-width: 0;
      max-width: 100%;
    }
    .hex-line-input {
      box-sizing: border-box;
      width: 100%;
      max-width: none;
      margin: 0;
      padding: 0.1em 0.25em;
      border: 1px solid transparent;
      border-radius: var(--wa-border-radius-s, 2px);
      background: var(--wa-color-neutral-fill-quiet, rgba(128, 128, 128, 0.08));
      color: inherit;
      font: inherit;
      letter-spacing: 0.02em;
    }
    .hex-line-input:hover:not(:read-only) {
      border-color: var(--wa-color-neutral-border, #555);
    }
    .hex-line-input:focus {
      outline: var(--wa-focus-ring-width, 2px) solid var(--wa-color-focus, #3b82f6);
      outline-offset: 0;
      border-color: transparent;
    }
    .hex-line-input:read-only {
      opacity: 0.9;
    }
    .ascii-col {
      color: var(--wa-color-neutral-80, #bbb);
      white-space: pre;
      overflow: visible;
      width: 16ch;
      min-width: 16ch;
      padding-left: var(--wa-space-xs, 0.25rem);
      user-select: none;
    }
  `}};o([n({attribute:!1})],P.prototype,`initialBytes`,void 0),o([n({type:Number})],P.prototype,`seed`,void 0),o([n({type:Boolean})],P.prototype,`readOnly`,void 0),o([t()],P.prototype,`bytes`,void 0),P=o([r(`docks-hexeditor`)],P);var F=await u(Object.assign({"./i18n.de.json":()=>f(()=>import(`./i18n.de-Ddrm6naw-C69-Q6dv.js`),[]),"./i18n.en.json":()=>f(()=>import(`./i18n.en-Og49LNLR-BXm6bCq-.js`),[])}),!0),I=class extends l{constructor(...e){super(...e),this.scrollMode=`native`,this.readOnly=!1,this.ready=!1,this.hexMode=!1,this.textValue=``,this.bytes=new Uint8Array,this.hexSeed=0,this.hexInitialBytes=new Uint8Array,this.binaryViewTruncated=!1,this.binarySourceByteLength=0,this.textRef=s(),this.hexRef=s(),this.onTextChange=e=>{this.textValue=e.detail.value,this.bytes=new TextEncoder().encode(this.textValue),this.markDirty(!0)},this.onHexChange=e=>{this.bytes=e.detail.bytes,this.textValue=new TextDecoder(`utf-8`,{fatal:!1}).decode(this.bytes),this.markDirty(!0)},this.onHexViewToggle=e=>{let t=e.target.checked;t!==this.hexMode&&(t?(this.bytes=new TextEncoder().encode(this.textValue),this.hexInitialBytes=new Uint8Array(this.bytes),this.hexSeed+=1,this.hexMode=!0):(this.textValue=new TextDecoder(`utf-8`,{fatal:!1}).decode(this.bytes),this.hexMode=!1),this.requestUpdate())}}async doInitUI(){let e=await this.input.data.getContents({blob:!0});this.hexMode=await g(e),this.hexMode?(e.size>8192?(this.bytes=new Uint8Array(await e.slice(0,m).arrayBuffer()),this.binaryViewTruncated=!0,this.binarySourceByteLength=e.size):(this.bytes=new Uint8Array(await e.arrayBuffer()),this.binaryViewTruncated=!1,this.binarySourceByteLength=0),this.textValue=new TextDecoder(`utf-8`,{fatal:!1}).decode(this.bytes),this.hexInitialBytes=new Uint8Array(this.bytes),this.hexSeed=1):(this.bytes=new Uint8Array(await e.arrayBuffer()),this.binaryViewTruncated=!1,this.binarySourceByteLength=0,this.textValue=new TextDecoder(`utf-8`,{fatal:!1}).decode(this.bytes)),this.ready=!0}save(){if(this.binaryViewTruncated)return;let e=new Blob([new Uint8Array(this.bytes)]);this.input?.data.saveContents(e),this.markDirty(!1)}doClose(){this.ready=!1,this.binaryViewTruncated=!1,this.binarySourceByteLength=0}getContent(){if(this.hexMode){let e=this.hexRef.value?.getBytesSnapshot();return e?[...e].map(e=>e.toString(16).padStart(2,`0`)).join(` `):null}return this.textRef.value?.getValue()??this.textValue}getSelection(){return this.hexMode?null:this.textRef.value?.getSelection()??null}getSnippet(e=5){return this.hexMode?null:this.textRef.value?.getSnippet(e)??null}getLanguage(){return null}getFilePath(){return this.input?.data?.getWorkspacePath()??null}renderToolbar(){if(!this.ready)return i;let e=e=>e.toLocaleString(),t=this.binaryViewTruncated&&this.binarySourceByteLength>0?F.BINARY_VIEW_TRUNCATED({shown:e(m),total:e(this.binarySourceByteLength)}):null;return c`
      ${t?c`<span class="binary-trunc-msg" title=${t}>${t}</span>`:i}
      <label class="hex-toggle">
        <span class="hex-label">${F.HEX_VIEW_LABEL}</span>
        <wa-switch ?checked=${this.hexMode} @change=${this.onHexViewToggle}></wa-switch>
      </label>
    `}renderContent(){return this.ready?this.hexMode?c`
        <docks-hexeditor
          ${e(this.hexRef)}
          .initialBytes=${this.hexInitialBytes}
          .seed=${this.hexSeed}
          .readOnly=${this.readOnly||this.binaryViewTruncated}
          @content-change=${this.onHexChange}
        ></docks-hexeditor>
      `:c`
      <docks-texteditor
        ${e(this.textRef)}
        .value=${this.textValue}
        .readOnly=${this.readOnly||this.binaryViewTruncated}
        @content-change=${this.onTextChange}
      ></docks-texteditor>
    `:c`<div class="placeholder"></div>`}static{this.styles=a`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 0;
      height: 100%;
    }
    /* Fill tab panel: let the editor surface stretch with the layout grid */
    .part-content-inner {
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .part-content-inner > docks-texteditor,
    .part-content-inner > docks-hexeditor {
      flex: 1 1 auto;
      min-height: 0;
    }
    .placeholder {
      flex: 1;
      min-height: 2rem;
    }
    .binary-trunc-msg {
      flex: 1 1 auto;
      min-width: 0;
      margin-right: var(--wa-space-m, 0.75rem);
      font-size: var(--wa-font-size-xs, 0.75rem);
      color: var(--wa-color-neutral-50, #888);
      line-height: 1.3;
    }
    .hex-toggle {
      display: inline-flex;
      align-items: center;
      gap: var(--wa-space-s, 0.5rem);
      margin: 0;
      font-size: var(--wa-font-size-s, 0.875rem);
      flex-shrink: 0;
    }
    .hex-label {
      user-select: none;
    }
  `}};o([n({attribute:!1})],I.prototype,`input`,void 0),o([n({type:Boolean})],I.prototype,`readOnly`,void 0),o([t()],I.prototype,`ready`,void 0),o([t()],I.prototype,`hexMode`,void 0),o([t()],I.prototype,`textValue`,void 0),o([t()],I.prototype,`hexSeed`,void 0),o([t()],I.prototype,`hexInitialBytes`,void 0),o([t()],I.prototype,`binaryViewTruncated`,void 0),I=o([r(`docks-plain-editor`)],I);