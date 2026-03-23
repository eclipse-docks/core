const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/python-editor-iVP5dGvj-pf16utmV.js","assets/config-p6NjMHC3-D3NDp0il.js","assets/config-p6NjMHC3-Cw9IDlk8.css","assets/pyservice-CouhQq0D-DyQSByeW.js","assets/package-manager-DTcpwrMr-BaGrkPBn.js","assets/index-FX7Uqu1L.js","assets/notebook-kernel-api--RBL5TaE-2imfStcI.js"])))=>i.map(i=>d[i]);
import{f as y,k as l,y as h,q as g,d as u,W as f,_ as m}from"./config-p6NjMHC3-D3NDp0il.js";import"./index-FX7Uqu1L.js";import{P as r}from"./pyservice-CouhQq0D-DyQSByeW.js";import{p as c}from"./package-manager-DTcpwrMr-BaGrkPBn.js";import{T as v}from"./notebook-kernel-api--RBL5TaE-2imfStcI.js";class P{constructor(){this.id="python",this.label="Python",this.language="python",this.pyenv=null,this.requiredPackages=[]}async connect(t){if(!this.pyenv){this.requiredPackages=t?.requiredPackages??[],this.pyenv=new r,await this.pyenv.init(),this.requiredPackages.length>0&&await this.pyenv.loadPackages(this.requiredPackages);try{await this.pyenv.execCode(`
try:
    import matplotlib
    matplotlib.use('agg')
    import matplotlib.pyplot as plt
    import io
    import base64
    _original_show = plt.show
    _display_data = None
    def _patched_show(*args, **kwargs):
        global _display_data
        if plt.get_fignums():
            fig = plt.gcf()
            buffer = io.BytesIO()
            fig.savefig(buffer, format='png', bbox_inches='tight', dpi=100)
            buffer.seek(0)
            _display_data = base64.b64encode(buffer.read()).decode('utf-8')
            plt.close(fig)
        pass
    plt.show = _patched_show
except ImportError:
    pass
`)}catch{}}}async execute(t){if(this.pyenv||await this.connect(),!this.pyenv)return{error:"Python kernel not initialized"};try{const e=await this.pyenv.execCode(t),a=[];if(e&&typeof e=="object"&&"console"in e){const i=e.console;if(Array.isArray(i)&&i.length>0){const o=i.filter(p=>p&&String(p).trim());o.length>0&&a.push(...o.map(String))}}let s;try{const i=await this.pyenv.execCode('_display_data if "_display_data" in dir() else None'),o=i&&typeof i=="object"&&i!==null&&"result"in i?i.result:i;o!=null&&String(o)!=="None"&&String(o)!=="undefined"&&(s=String(o),await this.pyenv.execCode("_display_data = None"))}catch{}if(!s){const i=e&&typeof e=="object"&&e!==null&&"result"in e?e.result:e;if(i!=null&&String(i)!=="undefined"){const o=String(i);o&&o!=="undefined"&&a.push(o)}}return{data:a.length>0?a.join(`
`):void 0,imageData:s}}catch(e){return{error:e instanceof Error?e.message:String(e)}}}async getVersion(){if(this.pyenv)try{return await this.pyenv.getVersion()??void 0}catch{return}}interrupt(){this.pyenv?.interrupt?.()}async restart(){this.pyenv&&(this.pyenv.close(),this.pyenv=null),await this.connect()}openPackageManager(t){this.pyenv&&c.showPackageManager({packages:t?.requiredPackages??[],pyenv:this.pyenv,onPackageAdded:t?.onPackageAdded,onPackageRemoved:t?.onPackageRemoved})}close(){this.pyenv&&(this.pyenv.close(),this.pyenv=null)}}const _={id:"python",label:"Python",language:"python",loadKernel:async()=>new P},k="# @py-packages:",d=/^#\s*@py-packages:\s*(.+)$/i;function b(n){const e=(n.split(`
`)[0]??"").match(d);return e?e[1].split(",").map(a=>a.trim()).filter(a=>a.length>0):[]}function M(n,t){const e=n.split(`
`),a=e.findIndex(i=>d.test(i)),s=t.length>0?`${k} ${t.join(", ")}`:null;return a>=0?s?e[a]=s:e.splice(a,1):s&&e.unshift(s),e.join(`
`)}y.registerContribution(v,_);l({command:{id:"python",name:"Run Python Script",description:"Executes a Python script given its file path",parameters:[{name:"script",description:"the path to a Python script to run",required:!1}]},handler:{execute:async n=>{const t=n.params?.script;if(!t)return;const e=new r;await e.init(void 0,{params:n.params}),await e.execScript(t)}}});l({command:{id:"python.openEditorPackageManager",name:"Manage packages",description:"Manage Python packages for the editor environment",parameters:[]},handler:{canExecute:n=>!!n.activeEditor?.isLanguage?.("python"),execute:async n=>{const t=n.activeEditor;if(!t){h("No active editor");return}const e=t?.getContent?.()??"",a=b(e),s=t.getPyEnv?.();c.showPackageManager({packages:a,pyenv:s})}}});g.registerEditorInputHandler({editorId:"system.python-editor",label:"Python",icon:"lyra python",lazyInit:async()=>{await m(()=>import("./python-editor-iVP5dGvj-pf16utmV.js"),__vite__mapDeps([0,1,2,3,4,5,6]))},canHandle:n=>n instanceof f&&n.getName().toLowerCase().endsWith(".py"),ranking:1e3,handle:async n=>{const t={title:n.getWorkspacePath(),data:n,key:n.getWorkspacePath(),icon:"python",state:{},component:()=>null};return t.component=e=>u`<lyra-python-editor id="${e}" .input=${t}></lyra-python-editor>`,t}});const N=Object.freeze(Object.defineProperty({__proto__:null,PyEnv:r,pythonPackageManagerService:c},Symbol.toStringTag,{value:"Module"}));export{N as a,M as c,b as p};
