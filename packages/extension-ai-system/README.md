# `@eclipse-docks/extension-ai-system`

AI chat runtime for Eclipse Docks: sessions, model routing, tool broker with approval modes, and a UI-agnostic event bus. Consumers use `@eclipse-docks/extension-ai-system/api`.

## Status

The **harness** (prompt → specialist loop → tools → approvals → streaming UI) is the working product path.

Composer supports **attachments** (paperclip / drag-drop / Ctrl+V, up to 8). Payloads live on the **session**. The shared in-memory root is domain-agnostic: callers register **live file callbacks** that resolve payloads on read (no copies). AI places refs under `in-memory/<sessionId>/…` and optionally projects the mount to the active session folder. The root is not mounted by default. Image data-URL files are presented for vision on read.

Supported: text files (≤~100k chars stored) and visual media (jpeg/png/gif/webp/svg/ico/bmp/avif/tiff, ≤4MB). SVG keeps source text plus a preview data URL. Audio/video rejected. Storage bootstrap commands (`connect_opfs`, `load_workspace`, …) are not exposed as LLM tools.

## Finalize implementation

### Specialist roles & Plan/Build

- [ ] Role picker in `docks-ai-view` (`plan` / `explore` / `build` / `general`)
- [ ] Explicit Plan → approve → Build handoff (checkpoint + user gate), not only read-only tool filters
- [ ] Compact / title / summary specialists invoked automatically with economy models

### Tool broker & approvals

- [ ] Persist allow/deny rules and approval mode across reloads
- [ ] Cache risk classifications per tool (or signature) to avoid a classify call every batch in `auto_safe`
- [ ] Show why a tool was classified critical in the approval UI
- [ ] Align WebMCP / other `cmd_*` callers with first-class command tool names

### Model router & transport

- [ ] Persist router utility scores with AI state
- [ ] Move tool + reasoning to Responses API (or equivalent) so `reasoning_effort` and tools can coexist
- [ ] Re-enable effort levels when tools are required, once transport allows
- [ ] Expose manual effort override consistently with Models.dev capabilities

### Sessions, context & compaction

- [x] Inject `compactionSummary` into provider messages; LLM summarize on compact (extractive fallback)
- [ ] Auto-compact threshold tunable in settings
- [ ] Keep context-usage estimate in sync with what is actually sent to the provider (enhancers)

### Consumer API & docs

- [ ] Document `./api` surface (runtime, `TOPIC`, enhancers, external providers, settings helpers)
- [ ] Fix stale references (`cmd_*` tool prefix, command ids) in internal docs
- [ ] e2e coverage for approval modes, external provider registration, and prompt enhancers

### Cleanup

- [ ] Remove or quarantine any leftover unused modules if still present in the tree
- [ ] Trim public exports to the stable façade
