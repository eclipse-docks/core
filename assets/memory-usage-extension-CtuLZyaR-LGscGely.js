import{K as e,R as t,j as n,mt as r,o as i,p as a}from"./dist-D9JGqkI-.js";var o=class extends i{constructor(...e){super(...e),this.updateInterval=null}connectedCallback(){super.connectedCallback(),this.updateInterval=window.setInterval(()=>{this.requestUpdate()},2e3)}disconnectedCallback(){super.disconnectedCallback(),this.updateInterval!==null&&(clearInterval(this.updateInterval),this.updateInterval=null)}render(){let e=performance.memory;if(!e)return r``;let t=(e.totalJSHeapSize/1048576).toFixed(1),n=(e.jsHeapSizeLimit/1048576).toFixed(0),i=e.totalJSHeapSize/e.jsHeapSizeLimit*100,a=i.toFixed(0);return r`
            <span style="display: inline-flex; align-items: center; justify-content: center; height: 100%; padding-left: 0.5rem; gap: 0.25rem; font-size: 0.85em; color: var(--wa-color-neutral-text);" title="JS heap allocated (matches DevTools Memory tab). Main thread only (excludes web workers).">
                <wa-icon name="microchip" label="Memory usage"></wa-icon>
                <span style="display: flex; align-items: center; gap: 0.25rem;">
                    <span>${t} / ${n} MB</span>
                    <span style="position: relative; display: inline-block; width: 60px; height: 14px; vertical-align: middle;">
                        <span style="display: block; position: absolute; width: 100%; height: 100%; background: rgba(255,255,255,0.1); border-radius: 4px;"></span>
                        <span style="display: block; position: absolute; width: ${a}%; height: 100%; background: ${i>80?`#ff4444`:i>60?`#ffaa00`:`#44aa44`}; border-radius: 4px; transition: width 0.3s ease;"></span>
                        <span style="position: absolute; width: 100%; text-align: center; font-size: 0.7em; line-height: 14px; font-weight: 600; color: white; text-shadow: 0 0 2px rgba(0,0,0,0.8);">${a}%</span>
                    </span>
                </span>
            </span>
        `}};o=n([t(`lyra-memory-usage`)],o),e.registerContribution(a,{target:a,label:`Memory`,component:`<lyra-memory-usage></lyra-memory-usage>`});