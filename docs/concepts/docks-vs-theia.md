# Eclipse Docks vs Eclipse Theia

[Eclipse Docks](https://github.com/eclipse-docks/core) and [Eclipse Theia](https://theia-ide.org/) are both **Eclipse Foundation** technology projects for building tools and IDEs. They solve different problems: **Theia** is a **platform** close to **VS Code** (including a Node backend and VS Code extension compatibility); **Docks** is a **lightweight browser shell** for modular, IDE-**like** and dashboard-style apps with **your** backends.

Neither product replaces the other in every scenario. Use this page to compare them in depth.

## At a glance

| | **Eclipse Docks** | **Eclipse Theia** |
| --- | --- | --- |
| **Runtime shape** | **Browser SPA** — core UI and extensions run in the client; integrate backends with `fetch` or your own APIs. | **Frontend + backend** — UI plus a **Node.js** server; **JSON-RPC / WebSockets / HTTP** ([architecture](https://theia-ide.org/docs/architecture/)). |
| **Typical deployment** | Static or hosted web app (e.g. Vite build); **no** required IDE server in the framework. | Desktop (**Electron**), browser + **remote** server, or hybrid — [Theia docs](https://theia-ide.org/docs/). |
| **Scalability** | Shell ships as **static assets** (CDN, caching). No Docks-specific server tier for the UI; work is **per browser** or on **APIs you own**. | **Node backend** is part of many setups; **cloud / multi-user** deployments must **scale** that tier (connections, language services, file access, etc.). |
| **Extension model** | **npm** packages; `extensionRegistry`, contributions, commands. | **Theia extensions**, **VS Code extensions**, plugins — [extensions](https://theia-ide.org/docs/extensions/). |
| **VS Code extensions / Open VSX** | **Planned:** **browser-only** extensions from [Open VSX](https://open-vsx.org/) with a **subset** of the `vscode` API (not full VS Code parity). | **Built-in:** VS Code compatibility and **Open VSX** as first-class. |
| **Out-of-the-box IDE depth** | **Composable:** Monaco, LSP, terminal, etc. as **optional** extensions you wire. | **Platform:** language services, terminal, Git, debug — closer to a **full IDE shell** when you need that breadth. |
| **Desktop / offline / PWA** | **Web-first.** Apps are **PWA-ready** (standard SPA): you can add a **web app manifest**, **service worker**, and **offline** behavior for the shell and cached assets. Optional **desktop** = wrap the SPA (e.g. Electron/Tauri). | **Electron** and hybrid deployments are **first-class** [Theia docs](https://theia-ide.org/docs/). Browser Theia often still expects an **online** backend for full IDE features. |
| **Language / remote tooling** | You decide where heavy work runs: **browser** (e.g. WASM), **your** servers, or hybrid — **bring your own** architecture. | Often **centralizes** language and file access on the **Theia backend** in cloud scenarios. |
| **Maturity & ecosystem** | Newer project; smaller ecosystem; good when you want a **small, readable** core. | Longer track record; **larger** ecosystem, examples, and product adoptions. |
| **Best fit** | Custom **dashboards**, domain **web** tools, IDE-**like** UX with a **small** core and full control of the shell. | Products that should feel like **VS Code** or a **cloud / desktop IDE** with **two-process** architecture and VS Code extension compatibility. |
| **Standards & longevity** | **Shell** is **browser-native** (Web APIs, ES modules, web components). You ride the **same** long-term curve as the **open web platform**—PWA, **Workers**, **WASM**, storage, security—without a **mandatory** non-browser IDE process for the UI. | Strong **web** frontend, but the **product** story includes **Node**, **VS Code** APIs, and **Theia**’s own evolution—you optimize for that **stack**, not only TC39/W3C. |

## Browser standards and future-proofing

No architecture is **guaranteed** future-proof: products still depend on **npm packages**, **tooling** (Vite, TypeScript), and **browser** engines that change over time.

**Eclipse Docks** (as a **pure client shell**) aligns the **application tier** with **standards-track** technology: the UI runs where **HTML, CSS, JavaScript, and Web APIs** run. New capabilities—**better WASM**, **smarter** service workers, **fine-grained** permissions, **faster** IndexedDB/OPFS—accrue to your app **without** redesigning a proprietary **in-framework** desktop runtime for the shell. Tradeoff: you **compose** IDE features yourself (Monaco, LSP, etc.) rather than inheriting a full IDE host.

**Theia** future-proofs in a **different** dimension: it tracks **VS Code** extension APIs, **LSP**, and a **mature** IDE **backend** model. That is **excellent** if your product roadmap is “stay close to VS Code.” It is a **larger** bet on that **ecosystem** than on “browser-only” minimalism.

Choose **Docks** when you want **maximum** alignment with **portable, browser-first** delivery; choose **Theia** when you want **maximum** alignment with the **VS Code / cloud IDE** platform.

## How to choose

- Prefer **Theia** when you need a **VS Code–class** platform: **backend**, **Open VSX**, full **VS Code extension** host, and established **cloud IDE** patterns.
- Prefer **Docks** when you want a **minimal web-first shell** (tabs, commands, workspace) and **your** APIs; **Open VSX** browser extensions are **planned** as a **gradual**, subset-API path—not parity with every VS Code extension.

## See also

- [Architecture](/concepts/architecture) — Eclipse Docks layers and concepts.
- [Security and safety](/concepts/security) — trust model for extensions and the browser.
- [Eclipse Theia — Architecture](https://theia-ide.org/docs/architecture/) — official Theia overview.
