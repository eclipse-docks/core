import{C as E,J as P,q as R,l as v,K as $,u as g,B as w,j as d,m as k,f as x,S as O}from"./main-CosDFh9I.js";const _="commandshell",A={PROMPT:"Run commands",EMPTY:"Type a command and press Enter. Examples: open_editor path=test.txt, touch xy.txt && open_editor xy.txt",CLEAR:"Clear"},S={PROMPT:"Befehle ausführen",EMPTY:"Geben Sie einen Befehl ein und drücken Sie Enter.",CLEAR:"Löschen"},T={namespace:_,en:A,de:S},I=/^[a-zA-Z_][a-zA-Z0-9_]*=.*$/;function L(e){const n=[];let t=0;const r=e.length;for(;t<r;){for(;t<r&&/\s/.test(e[t]);)t++;if(t>=r)break;if(e[t]==='"'){let s=t+1;for(;s<r&&e[s]!=='"';)e[s]==="\\"&&s++,s++;n.push(e.slice(t+1,s).replace(/\\"/g,'"')),t=s+1}else{let s=t;for(;t<r&&!/\s/.test(e[t])&&e[t]!=='"';)t++;t>s&&n.push(e.slice(s,t))}}return n}function M(e){const n=[],t=/(\s*&&\s*|\s*\|\s*)/g;let r=0,s;for(;(s=t.exec(e))!==null;){const a=e.slice(r,s.index).trim();if(a){const i=s[0].includes("|")?"|":"&&";n.push({segment:a,operator:i})}r=t.lastIndex}const o=e.slice(r).trim();return o&&n.push({segment:o,operator:null}),n}function D(e,n){const t={},r=[],s=n?.parameters?.map(o=>o.name)??[];for(const o of e)if(I.test(o)){const a=o.indexOf("="),i=o.slice(0,a),l=o.slice(a+1);l==="true"||l==="false"?t[i]=l==="true":t[i]=l}else r.push(o);return s.forEach((o,a)=>{r[a]!==void 0&&!(o in t)&&(t[o]=r[a])}),t}function z(e,n){return M(e).map(({segment:r,operator:s})=>{const o=L(r);if(o.length===0)return{command:{commandId:"",params:{}},operator:s};const a=o[0],i=n.hasCommand(a)?n.getCommand(a):void 0,l=o.slice(1),m=D(l,i);return{command:{commandId:a,params:m},operator:s}})}function y(e,n){if(e==null)return{};if(typeof e=="object"&&!Array.isArray(e))return e;const t=n?.output?.[0];return t?{[t.name]:e}:{}}async function K(e,n=E){const t=z(e,n),r=[];let s=null,o;for(let a=0;a<t.length;a++){const{command:i,operator:l}=t[a];if(!i.commandId)continue;const m=n.hasCommand(i.commandId)?n.getCommand(i.commandId):void 0;if(!m)return{success:!1,results:r,error:`Command not found: ${i.commandId}`};const b={...y(s??void 0,o),...i.params},C=n.createExecutionContext(b);try{const c=n.execute(i.commandId,C),p=c instanceof Promise?await c:c;r.push(p),l==="|"?(s=y(p,m),o=m):(s=null,o=void 0)}catch(c){const p=c instanceof Error?c.message:String(c);return{success:!1,results:r,error:p}}}return{success:!0,results:r}}var V=Object.defineProperty,j=Object.getOwnPropertyDescriptor,f=(e,n,t,r)=>{for(var s=r>1?void 0:r?j(n,t):n,o=e.length-1,a;o>=0;o--)(a=e[o])&&(s=(r?a(n,t,s):a(s))||s);return r&&s&&V(n,t,s),s};const h=P("commandshell");let u=class extends ${constructor(){super(...arguments),this.inputValue="",this.history=[],this.running=!1,this.inputRef=g(),this.outputRef=g()}async handleRun(){const e=this.inputValue.trim();if(!e||this.running)return;this.inputValue="",this.running=!0,this.requestUpdate();const n=await K(e);this.history=[...this.history,{command:e,result:n,timestamp:new Date}],this.running=!1,this.requestUpdate(),this.updateComplete.then(()=>{const t=this.outputRef.value;t&&(t.scrollTop=t.scrollHeight)})}handleKeyDown(e){e.key==="Enter"&&(e.preventDefault(),this.handleRun())}clearOutput(){this.history=[],this.requestUpdate()}formatResult(e){if(e.error)return e.error;if(e.results.length===0)return"";const n=e.results[e.results.length-1];return n==null?"":typeof n=="object"?JSON.stringify(n,null,2):String(n)}render(){return d`
      <div class="shell-container">
        <div class="output-area" ${w(this.outputRef)}>
          ${this.history.length===0?d`<div class="empty-state">${h("EMPTY")}</div>`:this.history.map(e=>d`
                  <div class="history-entry">
                    <div class="command-line">
                      <span class="prompt">$</span>
                      <span class="command">${e.command}</span>
                    </div>
                    <div
                      class="result ${e.result.success?"":"error"}"
                    >
                      ${e.result.success?this.formatResult(e.result)||"OK":e.result.error}
                    </div>
                  </div>
                `)}
        </div>
        <div class="input-row">
          <span class="prompt">$</span>
          <wa-input
            ${w(this.inputRef)}
            placeholder="${h("PROMPT")}"
            .value=${this.inputValue}
            @input=${e=>{this.inputValue=e.target.value}}
            @keydown=${this.handleKeyDown}
            autocomplete="off"
            size="small"
            class="shell-input"
          ></wa-input>
        </div>
      </div>
    `}renderToolbar(){return d`
      <k-command icon="trash" title="${h("CLEAR")}" .action=${()=>this.clearOutput()}>
        ${h("CLEAR")}
      </k-command>
    `}};u.styles=R`
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
      word-break: break-all;
    }

    .result {
      padding-left: 1.5rem;
      color: var(--wa-color-neutral-text-subtle);
      font-size: 0.8rem;
      white-space: pre-wrap;
      word-break: break-word;
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
  `;f([v()],u.prototype,"inputValue",2);f([v()],u.prototype,"history",2);f([v()],u.prototype,"running",2);u=f([k("k-command-shell")],u);x.registerContribution(O,T);x.registerContribution("system.fastviews-bottomend",{name:"command-shell",label:"Command Shell",icon:"terminal",component:e=>d`<k-command-shell id="${e}"></k-command-shell>`});
