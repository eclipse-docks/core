import{Cr as e,Er as t,Gt as n,Kt as r,On as i,Sn as a,Wt as o,ct as s,fn as c,h as l,ir as u,kn as d,mr as f,qt as p,sr as m,xn as h}from"./canvas-bridge-core.js-DFQjSuZd.js";import"./canvas-bridge-lit.js-BKw8QR55.js";var g=await l(Object.assign({"./commandpalette.de.json":()=>p(()=>import(`./commandpalette.de-CfNsMLz3-BWEa1BDT.js`),[]),"./commandpalette.en.json":()=>p(()=>import(`./commandpalette.en--62LK3F9-DGmJoptX.js`),[])})),_=`commandpalette/open`,v=class extends c{constructor(...e){super(...e),this.inputValue=``,this.filteredCommands=[],this.allCommands=[],this.showParameterPrompt=!1,this.selectedCommand=null,this.parameterValues={},this.isPaletteOpen=!1,this.inputRef=o(),this.dialogRef=o()}doInitUI(){this.subscribe(_,()=>{this.openPalette()}),this.boundDocumentClickHandler=this.handleDocumentClick.bind(this),document.addEventListener(`click`,this.boundDocumentClickHandler)}async handleDocumentClick(e){if(!this.isPaletteOpen&&!this.showParameterPrompt)return;await this.updateComplete;let t=e.composedPath();if(t.includes(this))return;let n=this.dialogRef.value;if(n&&t.includes(n))return;let r=t[0];for(;r;){if(r.tagName===`WA-DIALOG`)return;r=r.parentElement}this.closePalette(),this.closeParameterPrompt()}handleDialogClick(e){e.stopPropagation()}handleInputFocus(){requestAnimationFrame(()=>{this.isPaletteOpen=!0})}handleInputClick(e){e.stopPropagation(),this.openPalette()}handleInputMouseDown(e){e.stopPropagation()}updateCommandList(){let e=h.listCommands(this.executionContext||{});this.allCommands=Object.values(e).filter(e=>e.id!==`commandpalette.open`).map(e=>({id:e.id,name:e.name,description:e.description,icon:e.icon,keyBinding:e.keyBinding})),this.filteredCommands=[...this.allCommands]}async openPalette(){this.executionContext=h.createExecutionContext(),this.inputValue=``,this.updateCommandList(),this.showParameterPrompt=!1,this.isPaletteOpen=!0,await this.updateComplete,this.inputRef.value&&this.inputRef.value.focus()}closePalette(){this.isPaletteOpen=!1,this.inputValue=``,this.showParameterPrompt=!1,this.executionContext=void 0}handleInputChange(e){let t=e.target;this.inputValue=t.value,this.filterCommands()}filterCommands(){if(!this.inputValue.trim())this.filteredCommands=[...this.allCommands];else{let e=this.inputValue.toLowerCase();this.filteredCommands=this.allCommands.filter(t=>t.name.toLowerCase().includes(e)||t.id.toLowerCase().includes(e)||t.description&&t.description.toLowerCase().includes(e))}}handleKeyDown(e){e.key===`Escape`&&(e.preventDefault(),this.closePalette())}handleCommandClick(e,t){t&&(e.stopPropagation(),this.inputValue=``,this.filterCommands(),this.runCommand(t))}handleContainerClick(e){e.stopPropagation()}runCommand(e){if(!e)return;let t=h.getCommand(e.id);t?.parameters&&t.parameters.length>0?(this.selectedCommand=t,this.parameterValues={},this.showParameterPrompt=!0):this.executeCommandWithParams(e.id,{})}async executeCommandWithParams(e,t){try{await h.execute(e,{...this.executionContext||{},params:t}),this.closePalette(),this.closeParameterPrompt()}catch(e){console.error(`Failed to execute command:`,e)}}closeParameterPrompt(){this.showParameterPrompt=!1,this.selectedCommand=null,this.parameterValues={}}handleParameterInput(e,t){this.parameterValues={...this.parameterValues,[e]:t}}executeWithParameters(){if(!this.selectedCommand)return;let e=this.selectedCommand.parameters?.filter(e=>e.required&&!this.parameterValues[e.name]).map(e=>e.name);if(e&&e.length>0){d(g.MISSING_REQUIRED_PARAMS({params:e.join(`, `)}));return}this.executeCommandWithParams(this.selectedCommand.id,this.parameterValues)}render(){return f`
      <wa-popup
        placement="bottom-start"
        distance="4"
        sync="width"
        shift
        flip
        ?active=${this.isPaletteOpen}
      >
        <wa-input
          slot="anchor"
          appearance="filled"
          ${n(this.inputRef)}
          placeholder="${g.PLACEHOLDER}"
          .value=${this.inputValue}
          @input=${this.handleInputChange}
          @keydown=${this.handleKeyDown}
          @focus=${this.handleInputFocus}
          @click=${this.handleInputClick}
          @mousedown=${this.handleInputMouseDown}
          autocomplete="off"
          size="s"
        >
          <wa-icon slot="start" name="terminal" label="Terminal"></wa-icon>
        </wa-input>

        <div class="commands-container" @click=${this.handleContainerClick}>
        ${this.filteredCommands.length>0?f`${this.filteredCommands.map(e=>f`
                <div class="command-item" @click=${t=>this.handleCommandClick(t,e)}>
                  ${e.icon?f`<div class="command-icon">
                        <wa-icon name="${e.icon}" label="${e.name}"></wa-icon>
                      </div>`:f`<div class="command-icon">
                        <wa-icon name="terminal" label="Command"></wa-icon>
                      </div>`}
                  <div class="command-info">
                    <div class="command-name">${e.name}</div>
                    <div class="command-id">${e.id}</div>
                    ${e.description?f`<div class="command-description">${e.description}</div>`:``}
                  </div>
                  ${e.keyBinding?f`<div class="command-keybinding">${e.keyBinding}</div>`:``}
                </div>
              `)}`:f`<div class="no-results">
              <wa-icon
                name="search"
                label="${g.NO_COMMANDS_FOUND}"
                style="font-size: 24px; margin-bottom: 4px; opacity: 0.3;"
              ></wa-icon>
              <div>${g.NO_COMMANDS_FOUND}</div>
            </div>`}
        </div>
      </wa-popup>

      ${this.showParameterPrompt&&this.selectedCommand?f`<wa-dialog
            ${n(this.dialogRef)}
            label="${this.selectedCommand.name} - ${g.PARAMETERS}"
            open
            @wa-request-close=${this.closeParameterPrompt}
            @click=${this.handleDialogClick}
          >
            <div class="parameter-prompt-title">
              ${g.ENTER_PARAMETERS({commandName:this.selectedCommand.name})}
            </div>
            ${this.selectedCommand.parameters?.map(e=>f`<div class="parameter-field">
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
    `}doClose(){this.boundDocumentClickHandler&&=(document.removeEventListener(`click`,this.boundDocumentClickHandler),void 0)}static{this.styles=e`
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
      box-sizing: border-box;
      background: var(--wa-color-surface-raised);
      border: 1px solid var(--wa-color-surface-border);
      border-radius: 4px;
      max-height: 400px;
      overflow-y: auto;
      box-shadow: 0 8px 24px var(--wa-color-shadow);
    }

    .command-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px;
      cursor: pointer;
      transition: background-color 0.15s;
      border-bottom: 1px solid var(--wa-color-neutral-border-quiet);
    }

    .command-item:last-child {
      border-bottom: none;
    }

    .command-item:hover {
      background: var(--wa-color-neutral-fill-normal);
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
      background: var(--wa-color-neutral-fill-quiet);
      border: 1px solid var(--wa-color-neutral-border-quiet);
      border-radius: 3px;
      font-size: 11px;
      font-family: monospace;
      opacity: 0.7;
    }

    .no-results {
      padding: 20px;
      text-align: center;
      color: var(--wa-color-neutral-text-subtle);
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
  `}};r([u()],v.prototype,`inputValue`,void 0),r([u()],v.prototype,`filteredCommands`,void 0),r([u()],v.prototype,`allCommands`,void 0),r([u()],v.prototype,`showParameterPrompt`,void 0),r([u()],v.prototype,`selectedCommand`,void 0),r([u()],v.prototype,`parameterValues`,void 0),r([u()],v.prototype,`isPaletteOpen`,void 0),v=r([m(`docks-command-palette`)],v),i({command:{id:`commandpalette.open`,name:String(g.OPEN_COMMAND_PALETTE),description:String(g.OPEN_COMMAND_PALETTE_DESC),icon:`terminal`,keyBinding:`CTRL+SHIFT+P`},handler:{execute:()=>(t(_,null),null)}}),a.registerContribution(s,{name:`commandPalette.toolbar`,label:`Command Palette`,icon:`terminal`,component:()=>f`<docks-command-palette></docks-command-palette>`});