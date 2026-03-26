import{A as e,G as t,I as n,K as r,R as i,c as a,ht as o,j as s,k as c,mt as l,r as u,s as d}from"./dist-DG4qwUvd.js";import{t as f}from"./preload-helper-rov5CBGT.js";var p=/^[a-zA-Z_][a-zA-Z0-9_]*=.*$/;function m(e){let t=[],n=0,r=e.length;for(;n<r;){for(;n<r&&/\s/.test(e[n]);)n++;if(n>=r)break;if(e[n]===`"`){let i=n+1;for(;i<r&&e[i]!==`"`;)e[i]===`\\`&&i++,i++;t.push(e.slice(n+1,i).replace(/\\"/g,`"`)),n=i+1}else{let i=n;for(;n<r&&!/\s/.test(e[n])&&e[n]!==`"`;)n++;n>i&&t.push(e.slice(i,n))}}return t}function h(e){let t=[],n=/(\s*&&\s*|\s*\|\s*)/g,r=0,i;for(;(i=n.exec(e))!==null;){let a=e.slice(r,i.index).trim();if(a){let e=i[0].includes(`|`)?`|`:`&&`;t.push({segment:a,operator:e})}r=n.lastIndex}let a=e.slice(r).trim();return a&&t.push({segment:a,operator:null}),t}function g(e,t){let n={},r=[],i=t?.parameters?.map(e=>e.name)??[];for(let t of e)if(p.test(t)){let e=t.indexOf(`=`),r=t.slice(0,e),i=t.slice(e+1);i===`true`||i===`false`?n[r]=i===`true`:n[r]=i}else r.push(t);return i.forEach((e,t)=>{r[t]!==void 0&&!(e in n)&&(n[e]=r[t])}),n}function _(e,t){return h(e).map(({segment:e,operator:n})=>{let r=m(e);if(r.length===0)return{command:{commandId:``,params:{}},operator:n};let i=r[0],a=t.hasCommand(i)?t.getCommand(i):void 0;return{command:{commandId:i,params:g(r.slice(1),a)},operator:n}})}function v(e,t){if(e==null)return{};if(typeof e==`object`&&!Array.isArray(e))return e;let n=t?.output?.[0];return n?{[n.name]:e}:{}}async function y(e,n=t){let r=_(e,n),i=[],a=null,o;for(let e=0;e<r.length;e++){let{command:t,operator:s}=r[e];if(!t.commandId)continue;let c=n.hasCommand(t.commandId)?n.getCommand(t.commandId):void 0;if(!c)return{success:!1,results:i,error:`Command not found: ${t.commandId}`};let l={...v(a??void 0,o),...t.params},u=n.createExecutionContext(l);try{let e=n.execute(t.commandId,u),r=e instanceof Promise?await e:e;i.push(r),s===`|`?(a=v(r,c),o=c):(a=null,o=void 0)}catch(e){return{success:!1,results:i,error:e instanceof Error?e.message:String(e)}}}return{success:!0,results:i}}var b=await u(Object.assign({"./commandshell.de.json":()=>f(()=>import(`./commandshell.de-gsA1NABt-CjuPe0r4.js`),[]),"./commandshell.en.json":()=>f(()=>import(`./commandshell.en-uPRN5nMF-hy84Zsab.js`),[])})),x=class extends d{constructor(...e){super(...e),this.inputValue=``,this.history=[],this.running=!1,this.inputRef=c(),this.outputRef=c()}async handleRun(){let e=this.inputValue.trim();if(!e||this.running)return;this.inputValue=``,this.running=!0,this.requestUpdate();let t=await y(e);this.history=[...this.history,{command:e,result:t,timestamp:new Date}],this.running=!1,this.requestUpdate(),this.updateComplete.then(()=>{let e=this.outputRef.value;e&&(e.scrollTop=e.scrollHeight)})}handleKeyDown(e){e.key===`Enter`&&(e.preventDefault(),this.handleRun())}clearOutput(){this.history=[],this.requestUpdate()}formatResult(e){if(e.error)return e.error;if(e.results.length===0)return``;let t=e.results[e.results.length-1];return t==null?``:typeof t==`object`?JSON.stringify(t,null,2):String(t)}renderContent(){return l`
      <div class="shell-container">
        <div class="output-area" ${e(this.outputRef)}>
          ${this.history.length===0?l`<div class="empty-state">${b.COMMANDSHELL_EMPTY}</div>`:this.history.map(e=>l`
                  <div class="history-entry">
                    <div class="command-line">
                      <span class="prompt">$</span>
                      <span class="command">${e.command}</span>
                    </div>
                    <div
                      class="result ${e.result.success?``:`error`}"
                    >
                      ${e.result.success?this.formatResult(e.result)||`OK`:e.result.error}
                    </div>
                  </div>
                `)}
        </div>
        <div class="input-row">
          <span class="prompt">$</span>
          <wa-input
            ${e(this.inputRef)}
            placeholder="${b.COMMANDSHELL_PROMPT}"
            .value=${this.inputValue}
            @input=${e=>{this.inputValue=e.target.value}}
            @keydown=${this.handleKeyDown}
            autocomplete="off"
            size="small"
            class="shell-input"
          ></wa-input>
        </div>
      </div>
    `}renderToolbar(){return l`
      <lyra-command icon="trash" title="${b.COMMANDSHELL_CLEAR}" .action=${()=>this.clearOutput()}>
        ${b.COMMANDSHELL_CLEAR}
      </lyra-command>
    `}static{this.styles=o`
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
  `}};s([n()],x.prototype,`inputValue`,void 0),s([n()],x.prototype,`history`,void 0),s([n()],x.prototype,`running`,void 0),x=s([i(`lyra-command-shell`)],x),r.registerContribution(a,{name:`command-shell`,label:`Command Shell`,icon:`terminal`,component:e=>l`<lyra-command-shell id="${e}"></lyra-command-shell>`});