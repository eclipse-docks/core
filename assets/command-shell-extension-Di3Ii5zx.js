import{_ as g,b as O,e as v,j as w,k as y,d,t as $}from"./vendor-3BPrCeYx.js";import{f as C,i as E,L as P,c as L,P as R}from"./monaco-Ck3pLLYn.js";const A=/^[a-zA-Z_][a-zA-Z0-9_]*=.*$/;function D(t){const s=[];let e=0;const n=t.length;for(;e<n;){for(;e<n&&/\s/.test(t[e]);)e++;if(e>=n)break;if(t[e]==='"'){let r=e+1;for(;r<n&&t[r]!=='"';)t[r]==="\\"&&r++,r++;s.push(t.slice(e+1,r).replace(/\\"/g,'"')),e=r+1}else{let r=e;for(;e<n&&!/\s/.test(t[e])&&t[e]!=='"';)e++;e>r&&s.push(t.slice(r,e))}}return s}function M(t){const s=[],e=/(\s*&&\s*|\s*\|\s*)/g;let n=0,r;for(;(r=e.exec(t))!==null;){const a=t.slice(n,r.index).trim();if(a){const i=r[0].includes("|")?"|":"&&";s.push({segment:a,operator:i})}n=e.lastIndex}const o=t.slice(n).trim();return o&&s.push({segment:o,operator:null}),s}function I(t,s){const e={},n=[],r=s?.parameters?.map(o=>o.name)??[];for(const o of t)if(A.test(o)){const a=o.indexOf("="),i=o.slice(0,a),l=o.slice(a+1);l==="true"||l==="false"?e[i]=l==="true":e[i]=l}else n.push(o);return r.forEach((o,a)=>{n[a]!==void 0&&!(o in e)&&(e[o]=n[a])}),e}function S(t,s){return M(t).map(({segment:n,operator:r})=>{const o=D(n);if(o.length===0)return{command:{commandId:"",params:{}},operator:r};const a=o[0],i=s.hasCommand(a)?s.getCommand(a):void 0,l=o.slice(1),m=I(l,i);return{command:{commandId:a,params:m},operator:r}})}function _(t,s){if(t==null)return{};if(typeof t=="object"&&!Array.isArray(t))return t;const e=s?.output?.[0];return e?{[e.name]:t}:{}}async function T(t,s=C){const e=S(t,s),n=[];let r=null,o;for(let a=0;a<e.length;a++){const{command:i,operator:l}=e[a];if(!i.commandId)continue;const m=s.hasCommand(i.commandId)?s.getCommand(i.commandId):void 0;if(!m)return{success:!1,results:n,error:`Command not found: ${i.commandId}`};const x={..._(r??void 0,o),...i.params},b=s.createExecutionContext(x);try{const c=s.execute(i.commandId,b),p=c instanceof Promise?await c:c;n.push(p),l==="|"?(r=_(p,m),o=m):(r=null,o=void 0)}catch(c){const p=c instanceof Error?c.message:String(c);return{success:!1,results:n,error:p}}}return{success:!0,results:n}}var k=Object.defineProperty,j=Object.getOwnPropertyDescriptor,f=(t,s,e,n)=>{for(var r=n>1?void 0:n?j(s,e):s,o=t.length-1,a;o>=0;o--)(a=t[o])&&(r=(n?a(s,e,r):a(r))||r);return n&&r&&k(s,e,r),r};const h=await E(Object.assign({"./commandshell.de.json":()=>g(()=>import("./commandshell.de-BRBNIYfG.js"),[]),"./commandshell.en.json":()=>g(()=>import("./commandshell.en-DaVYalLa.js"),[])}));let u=class extends P{constructor(){super(...arguments),this.inputValue="",this.history=[],this.running=!1,this.inputRef=w(),this.outputRef=w()}async handleRun(){const t=this.inputValue.trim();if(!t||this.running)return;this.inputValue="",this.running=!0,this.requestUpdate();const s=await T(t);this.history=[...this.history,{command:t,result:s,timestamp:new Date}],this.running=!1,this.requestUpdate(),this.updateComplete.then(()=>{const e=this.outputRef.value;e&&(e.scrollTop=e.scrollHeight)})}handleKeyDown(t){t.key==="Enter"&&(t.preventDefault(),this.handleRun())}clearOutput(){this.history=[],this.requestUpdate()}formatResult(t){if(t.error)return t.error;if(t.results.length===0)return"";const s=t.results[t.results.length-1];return s==null?"":typeof s=="object"?JSON.stringify(s,null,2):String(s)}render(){return d`
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
    `}};u.styles=O`
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
  `;f([v()],u.prototype,"inputValue",2);f([v()],u.prototype,"history",2);f([v()],u.prototype,"running",2);u=f([$("lyra-command-shell")],u);L.registerContribution(R,{name:"command-shell",label:"Command Shell",icon:"terminal",component:t=>d`<lyra-command-shell id="${t}"></lyra-command-shell>`});
