import{i as O,_ as g,b as C,r as v,f as $,P as E,d,L as P,J as w,h as L,K as y,t as R}from"./config-BKOw6mlE-12B-e_Rm.js";const A=/^[a-zA-Z_][a-zA-Z0-9_]*=.*$/;function D(t){const s=[];let e=0;const r=t.length;for(;e<r;){for(;e<r&&/\s/.test(t[e]);)e++;if(e>=r)break;if(t[e]==='"'){let n=e+1;for(;n<r&&t[n]!=='"';)t[n]==="\\"&&n++,n++;s.push(t.slice(e+1,n).replace(/\\"/g,'"')),e=n+1}else{let n=e;for(;e<r&&!/\s/.test(t[e])&&t[e]!=='"';)e++;e>n&&s.push(t.slice(n,e))}}return s}function M(t){const s=[],e=/(\s*&&\s*|\s*\|\s*)/g;let r=0,n;for(;(n=e.exec(t))!==null;){const a=t.slice(r,n.index).trim();if(a){const i=n[0].includes("|")?"|":"&&";s.push({segment:a,operator:i})}r=e.lastIndex}const o=t.slice(r).trim();return o&&s.push({segment:o,operator:null}),s}function I(t,s){const e={},r=[],n=s?.parameters?.map(o=>o.name)??[];for(const o of t)if(A.test(o)){const a=o.indexOf("="),i=o.slice(0,a),l=o.slice(a+1);l==="true"||l==="false"?e[i]=l==="true":e[i]=l}else r.push(o);return n.forEach((o,a)=>{r[a]!==void 0&&!(o in e)&&(e[o]=r[a])}),e}function S(t,s){return M(t).map(({segment:r,operator:n})=>{const o=D(r);if(o.length===0)return{command:{commandId:"",params:{}},operator:n};const a=o[0],i=s.hasCommand(a)?s.getCommand(a):void 0,l=o.slice(1),m=I(l,i);return{command:{commandId:a,params:m},operator:n}})}function _(t,s){if(t==null)return{};if(typeof t=="object"&&!Array.isArray(t))return t;const e=s?.output?.[0];return e?{[e.name]:t}:{}}async function T(t,s=L){const e=S(t,s),r=[];let n=null,o;for(let a=0;a<e.length;a++){const{command:i,operator:l}=e[a];if(!i.commandId)continue;const m=s.hasCommand(i.commandId)?s.getCommand(i.commandId):void 0;if(!m)return{success:!1,results:r,error:`Command not found: ${i.commandId}`};const x={..._(n??void 0,o),...i.params},b=s.createExecutionContext(x);try{const c=s.execute(i.commandId,b),p=c instanceof Promise?await c:c;r.push(p),l==="|"?(n=_(p,m),o=m):(n=null,o=void 0)}catch(c){const p=c instanceof Error?c.message:String(c);return{success:!1,results:r,error:p}}}return{success:!0,results:r}}var k=Object.defineProperty,N=Object.getOwnPropertyDescriptor,f=(t,s,e,r)=>{for(var n=r>1?void 0:r?N(s,e):s,o=t.length-1,a;o>=0;o--)(a=t[o])&&(n=(r?a(s,e,n):a(n))||n);return r&&n&&k(s,e,n),n};const h=await O(Object.assign({"./commandshell.de.json":()=>g(()=>import("./commandshell.de-DouHHcwu-BRBNIYfG.js"),[]),"./commandshell.en.json":()=>g(()=>import("./commandshell.en-BlQdyscF-DaVYalLa.js"),[])}));let u=class extends P{constructor(){super(...arguments),this.inputValue="",this.history=[],this.running=!1,this.inputRef=w(),this.outputRef=w()}async handleRun(){const t=this.inputValue.trim();if(!t||this.running)return;this.inputValue="",this.running=!0,this.requestUpdate();const s=await T(t);this.history=[...this.history,{command:t,result:s,timestamp:new Date}],this.running=!1,this.requestUpdate(),this.updateComplete.then(()=>{const e=this.outputRef.value;e&&(e.scrollTop=e.scrollHeight)})}handleKeyDown(t){t.key==="Enter"&&(t.preventDefault(),this.handleRun())}clearOutput(){this.history=[],this.requestUpdate()}formatResult(t){if(t.error)return t.error;if(t.results.length===0)return"";const s=t.results[t.results.length-1];return s==null?"":typeof s=="object"?JSON.stringify(s,null,2):String(s)}renderContent(){return d`
      <div class="shell-container">
        <div class="output-area" ${y(this.outputRef)}>
          ${this.history.length===0?d`<div class="empty-state">${h.COMMANDSHELL_EMPTY}</div>`:this.history.map(t=>d`
                  <div class="history-entry">
                    <div class="command-line">
                      <span class="prompt">$</span>
                      <span class="command">${t.command}</span>
                    </div>
                    <div
                      class="result ${t.result.success?"":"error"}"
                    >
                      ${t.result.success?this.formatResult(t.result)||"OK":t.result.error}
                    </div>
                  </div>
                `)}
        </div>
        <div class="input-row">
          <span class="prompt">$</span>
          <wa-input
            ${y(this.inputRef)}
            placeholder="${h.COMMANDSHELL_PROMPT}"
            .value=${this.inputValue}
            @input=${t=>{this.inputValue=t.target.value}}
            @keydown=${this.handleKeyDown}
            autocomplete="off"
            size="small"
            class="shell-input"
          ></wa-input>
        </div>
      </div>
    `}renderToolbar(){return d`
      <lyra-command icon="trash" title="${h.COMMANDSHELL_CLEAR}" .action=${()=>this.clearOutput()}>
        ${h.COMMANDSHELL_CLEAR}
      </lyra-command>
    `}};u.styles=C`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }

    .shell-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }

    .output-area {
      flex: 1;
      overflow-y: auto;
      padding: 0.5rem;
      font-family: var(--wa-font-mono);
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .empty-state {
      color: var(--wa-color-neutral-text-subtle);
      font-style: italic;
      padding: 0.5rem;
    }

    .history-entry {
      margin-bottom: 0.75rem;
    }

    .command-line {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
      margin-bottom: 0.25rem;
    }

    .prompt {
      color: var(--wa-color-primary-text);
      font-weight: 600;
    }

    .command {
      color: var(--wa-color-neutral-text);
      word-break: breaall;
    }

    .result {
      padding-left: 1.5rem;
      color: var(--wa-color-neutral-text-subtle);
      font-size: 0.8rem;
      white-space: pre-wrap;
      word-break: breaword;
    }

    .result.error {
      color: var(--wa-color-danger-text);
    }

    .input-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      border-top: 1px solid var(--wa-color-neutral-border);
      background: var(--wa-color-neutral-background);
    }

    .input-row .prompt {
      flex-shrink: 0;
    }

    .shell-input {
      flex: 1;
      min-width: 0;
    }
  `;f([v()],u.prototype,"inputValue",2);f([v()],u.prototype,"history",2);f([v()],u.prototype,"running",2);u=f([R("lyra-command-shell")],u);$.registerContribution(E,{name:"command-shell",label:"Command Shell",icon:"terminal",component:t=>d`<lyra-command-shell id="${t}"></lyra-command-shell>`});
