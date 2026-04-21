import{u as e}from"./fs-access-D-fDaJ8V-w6cEwJE-.js";import{B as t,J as n,M as r,N as i,R as a,V as o,X as s,Z as c,_ as l,_t as u,gt as d,j as f,q as p,r as m}from"./dist-DHeR2FNk.js";import{t as h}from"./preload-helper-ca-nBW7U.js";import"./lit-oEeQQU89.js";var g=await m(Object.assign({"./commandpalette.de.json":()=>h(()=>import(`./commandpalette.de-Bv--GkIv-_qQ2kd9j.js`),[]),"./commandpalette.en.json":()=>h(()=>import(`./commandpalette.en-BkZSMl1d-C2n9KEzI.js`),[])})),_=`commandpalette/open`,v=class extends o{constructor(...e){super(...e),this.inputValue=``,this.filteredCommands=[],this.allCommands=[],this.showParameterPrompt=!1,this.selectedCommand=null,this.parameterValues={},this.isPaletteOpen=!1,this.inputRef=f(),this.dialogRef=f()}doInitUI(){this.subscribe(_,()=>{this.openPalette()}),this.boundDocumentClickHandler=this.handleDocumentClick.bind(this),document.addEventListener(`click`,this.boundDocumentClickHandler)}async handleDocumentClick(e){if(!this.isPaletteOpen&&!this.showParameterPrompt)return;await this.updateComplete;let t=e.target;if(this.contains(t)||this.dialogRef.value&&this.dialogRef.value.contains(t))return;let n=t;for(;n;){if(n.tagName===`WA-DIALOG`)return;n=n.parentElement}this.closePalette(),this.closeParameterPrompt()}handleDialogClick(e){e.stopPropagation()}handleInputFocus(){requestAnimationFrame(()=>{this.isPaletteOpen=!0})}handleInputClick(e){e.stopPropagation(),this.openPalette()}handleInputMouseDown(e){e.stopPropagation()}updateCommandList(){let e=p.listCommands(this.executionContext||{});this.allCommands=Object.values(e).filter(e=>e.id!==`commandpalette.open`).map(e=>({id:e.id,name:e.name,description:e.description,icon:e.icon,keyBinding:e.keyBinding})),this.filteredCommands=[...this.allCommands]}async openPalette(){this.executionContext=p.createExecutionContext(),this.inputValue=``,this.updateCommandList(),this.showParameterPrompt=!1,this.isPaletteOpen=!0,await this.updateComplete,this.inputRef.value&&this.inputRef.value.focus()}closePalette(){this.isPaletteOpen=!1,this.inputValue=``,this.showParameterPrompt=!1,this.executionContext=void 0}handleInputChange(e){this.inputValue=e.target.value,this.filterCommands()}filterCommands(){if(!this.inputValue.trim())this.filteredCommands=[...this.allCommands];else{let e=this.inputValue.toLowerCase();this.filteredCommands=this.allCommands.filter(t=>t.name.toLowerCase().includes(e)||t.id.toLowerCase().includes(e)||t.description&&t.description.toLowerCase().includes(e))}}handleKeyDown(e){e.key===`Escape`&&(e.preventDefault(),this.closePalette())}handleCommandClick(e,t){t&&(e.stopPropagation(),this.inputValue=``,this.filterCommands(),this.runCommand(t))}handleContainerClick(e){e.stopPropagation()}runCommand(e){if(!e)return;let t=p.getCommand(e.id);t?.parameters&&t.parameters.length>0?(this.selectedCommand=t,this.parameterValues={},this.showParameterPrompt=!0):this.executeCommandWithParams(e.id,{})}async executeCommandWithParams(e,t){try{await p.execute(e,{...this.executionContext||{},params:t}),this.closePalette(),this.closeParameterPrompt()}catch(e){console.error(`Failed to execute command:`,e)}}closeParameterPrompt(){this.showParameterPrompt=!1,this.selectedCommand=null,this.parameterValues={}}handleParameterInput(e,t){this.parameterValues={...this.parameterValues,[e]:t}}executeWithParameters(){if(!this.selectedCommand)return;let e=this.selectedCommand.parameters?.filter(e=>e.required&&!this.parameterValues[e.name]).map(e=>e.name);if(e&&e.length>0){c(g.MISSING_REQUIRED_PARAMS({params:e.join(`, `)}));return}this.executeCommandWithParams(this.selectedCommand.id,this.parameterValues)}render(){return d`
      <wa-input
      appearance="filled"
        ${r(this.inputRef)}
        placeholder="${g.PLACEHOLDER}"
        .value=${this.inputValue}
        @input=${this.handleInputChange}
        @keydown=${this.handleKeyDown}
        @focus=${this.handleInputFocus}
        @click=${this.handleInputClick}
        @mousedown=${this.handleInputMouseDown}
        autocomplete="off"
        size="small"
      >
        <wa-icon slot="start" name="terminal" label="Terminal"></wa-icon>
      </wa-input>

      <div class="commands-container ${this.isPaletteOpen?`open`:``}" @click=${this.handleContainerClick}>
        ${this.filteredCommands.length>0?d`${this.filteredCommands.map(e=>d`
                <div class="command-item" @click=${t=>this.handleCommandClick(t,e)}>
                  ${e.icon?d`<div class="command-icon">
                        <wa-icon name="${e.icon}" label="${e.name}"></wa-icon>
                      </div>`:d`<div class="command-icon">
                        <wa-icon name="terminal" label="Command"></wa-icon>
                      </div>`}
                  <div class="command-info">
                    <div class="command-name">${e.name}</div>
                    <div class="command-id">${e.id}</div>
                    ${e.description?d`<div class="command-description">${e.description}</div>`:``}
                  </div>
                  ${e.keyBinding?d`<div class="command-keybinding">${e.keyBinding}</div>`:``}
                </div>
              `)}`:d`<div class="no-results">
              <wa-icon
                name="search"
                label="${g.NO_COMMANDS_FOUND}"
                style="font-size: 24px; margin-bottom: 4px; opacity: 0.3;"
              ></wa-icon>
              <div>${g.NO_COMMANDS_FOUND}</div>
            </div>`}
      </div>

      ${this.showParameterPrompt&&this.selectedCommand?d`<wa-dialog
            ${r(this.dialogRef)}
            label="${this.selectedCommand.name} - ${g.PARAMETERS}"
            open
            @wa-request-close=${this.closeParameterPrompt}
            @click=${this.handleDialogClick}
          >
            <div class="parameter-prompt-title">
              ${g.ENTER_PARAMETERS({commandName:this.selectedCommand.name})}
            </div>
            ${this.selectedCommand.parameters?.map(e=>d`<div class="parameter-field">
                <wa-input
                  label="${e.name}${e.required?` *`:``}"
                  hint=${e.description||``}
                  placeholder=${e.description||g.ENTER_PARAM({paramName:e.name})}
                  .value=${this.parameterValues[e.name]||``}
                  @input=${t=>this.handleParameterInput(e.name,t.target.value)}
                ></wa-input>
              </div>`)}
            <div class="parameter-actions">
              <wa-button variant="default" @click=${this.closeParameterPrompt}>${g.CANCEL}</wa-button>
              <wa-button variant="primary" @click=${this.executeWithParameters}>${g.EXECUTE}</wa-button>
            </div>
          </wa-dialog>`:``}
    `}doClose(){this.boundDocumentClickHandler&&=(document.removeEventListener(`click`,this.boundDocumentClickHandler),void 0)}static{this.styles=u`
    :host {
      /* inline-flex + no width:100% keeps this on one row with siblings inside wa-button-group (flex-wrap: wrap). */
      display: inline-flex;
      flex-direction: column;
      align-items: stretch;
      width: auto;
      flex: 0 1 auto;
      max-width: 600px;
      min-width: 300px;
      position: relative;
    }

    wa-input {
      max-width: 300px;
    }

    .commands-container {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 4px;
      background: var(--wa-color-neutral-05);
      border: 1px solid var(--wa-color-neutral-25);
      border-radius: 4px;
      max-height: 400px;
      overflow-y: auto;
      z-index: 1000;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.8);
      display: none;
    }

    :host-context(.wa-light) .commands-container {
      background: var(--wa-color-neutral-95);
      border: 1px solid var(--wa-color-neutral-75);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }

    .commands-container.open {
      display: block;
    }

    .command-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px;
      cursor: pointer;
      transition: background-color 0.15s;
      border-bottom: 1px solid var(--wa-color-neutral-15);
    }

    :host-context(.wa-light) .command-item {
      border-bottom: 1px solid var(--wa-color-neutral-85);
    }

    .command-item:last-child {
      border-bottom: none;
    }

    .command-item:hover {
      background: var(--wa-color-neutral-20);
    }

    :host-context(.wa-light) .command-item:hover {
      background: var(--wa-color-neutral-80);
    }

    .command-icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.7;
    }

    .command-info {
      flex: 1;
      min-width: 0;
    }

    .command-name {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 2px;
    }

    .command-id {
      font-size: 11px;
      opacity: 0.5;
      font-family: monospace;
      margin-bottom: 2px;
    }

    .command-description {
      font-size: 12px;
      opacity: 0.7;
    }

    .command-keybinding {
      flex-shrink: 0;
      margin-left: auto;
      padding: 2px 8px;
      background: var(--wa-color-neutral-15);
      border: 1px solid var(--wa-color-neutral-25);
      border-radius: 3px;
      font-size: 11px;
      font-family: monospace;
      opacity: 0.7;
    }

    :host-context(.wa-light) .command-keybinding {
      background: var(--wa-color-neutral-85);
      border: 1px solid var(--wa-color-neutral-75);
    }

    .no-results {
      padding: 20px;
      text-align: center;
      color: var(--wa-color-neutral-60);
    }

    :host-context(.wa-light) .no-results {
      color: var(--wa-color-neutral-40);
    }

    wa-dialog::part(panel) {
      max-width: 600px;
      width: 90vw;
    }

    wa-dialog::part(body) {
      padding: 20px;
    }

    .parameter-prompt-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .parameter-field {
      margin-bottom: 12px;
    }

    .parameter-field wa-input {
      width: 100%;
    }

    .parameter-actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      margin-top: 20px;
    }
  `}};i([a()],v.prototype,`inputValue`,void 0),i([a()],v.prototype,`filteredCommands`,void 0),i([a()],v.prototype,`allCommands`,void 0),i([a()],v.prototype,`showParameterPrompt`,void 0),i([a()],v.prototype,`selectedCommand`,void 0),i([a()],v.prototype,`parameterValues`,void 0),i([a()],v.prototype,`isPaletteOpen`,void 0),v=i([t(`docks-command-palette`)],v),s({command:{id:`commandpalette.open`,name:g.OPEN_COMMAND_PALETTE,description:g.OPEN_COMMAND_PALETTE_DESC,icon:`terminal`,keyBinding:`CTRL+SHIFT+P`},handler:{execute:()=>(e(_,null),null)}}),n.registerContribution(l,{name:`commandPalette.toolbar`,label:`Command Palette`,icon:`terminal`,component:()=>d`<docks-command-palette></docks-command-palette>`});