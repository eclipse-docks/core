# `@eclipse-docks/extension-ai-system`

Cognitive chat runtime for Eclipse Docks: sessions, model routing, tool broker with approval modes, and a UI-agnostic event bus. Consumers use `@eclipse-docks/extension-ai-system/api`.

## Status

The **harness** (prompt → specialist loop → tools → approvals → streaming UI) is the working product path.

**ICOM Core** (`runtime/core`) and **ACT-R memory** (`runtime/memory` + session buffers) are wired into each turn but do not yet drive model policy, tool policy, or prompt content in a meaningful way. Treat them as scaffolding until the todos below land.

See also `docs/internal/icom-agentic-runtime.md` for the layer map.

## Finalize implementation

### ICOM Core — make motivation real

- [ ] Feed intent / dominant need / valence into the specialist system prompt (not only `goal ≈ user text`)
- [ ] Let needs/valence influence routing (e.g. `safety` → prefer ask / lower-risk tools; `clarity` → explore/plan)
- [ ] Update need urgency from turn outcomes (tool failure, user correction, success) via `bumpNeed`
- [ ] Surface `TOPIC.coreTick` in the UI (optional debug panel: conscious valence, need, intent)
- [ ] Decide whether subconscious state affects anything beyond blending, or drop it until needed

### ACT-R memory — close the loop

- [ ] Inject top retrieved chunks into the LLM context (system or dedicated message), not only the `retrieval` buffer for `coreTick`
- [ ] Call `decay()` on a schedule (per turn or idle) so activation ranking matters over time
- [ ] Use `imaginal` / `motor` buffers or remove them from `BufferMap` until there is a real producer/consumer
- [ ] Persist utility-relevant episodic structure (what worked) and retrieve by task similarity, not only keyword overlap
- [ ] Pin / forget UX for workspace-scoped chunks (or API for extensions)

### Specialist roles & Plan/Build

- [ ] Role picker in `docks-cognitive-view` (`plan` / `explore` / `build` / `general`)
- [ ] Default role from ICOM intent / need instead of hard-coded `build`
- [ ] Explicit Plan → approve → Build handoff (checkpoint + user gate), not only read-only tool filters
- [ ] Compact / title / summary specialists invoked automatically with economy models

### Tool broker & approvals

- [ ] Persist allow/deny rules and approval mode across reloads
- [ ] Cache risk classifications per tool (or signature) to avoid a classify call every batch in `auto_safe`
- [ ] Show why a tool was classified critical in the approval UI
- [ ] Align WebMCP / other `cmd_*` callers with first-class command tool names

### Model router & transport

- [ ] Persist router utility scores with cognitive state
- [ ] Move tool + reasoning to Responses API (or equivalent) so `reasoning_effort` and tools can coexist
- [ ] Re-enable effort levels when tools are required, once transport allows
- [ ] Expose manual effort override consistently with Models.dev capabilities

### Sessions, context & compaction

- [x] Inject `compactionSummary` into provider messages; LLM summarize on compact (extractive fallback)
- [ ] Auto-compact threshold tunable in settings; compact summary should include ACT-R goal/retrieval highlights
- [ ] Keep context-usage estimate in sync with what is actually sent to the provider (retrieved chunks, enhancers)
- [ ] Checkpoint restore should rehydrate Core state, not only session buffers/history

### Consumer API & docs

- [ ] Document `./api` surface (runtime, `TOPIC`, enhancers, external providers, settings helpers)
- [ ] Fix stale references (`cmd_*` tool prefix, command ids) in internal docs
- [ ] e2e coverage for approval modes, external provider registration, and prompt enhancers

### Cleanup

- [ ] Remove or quarantine any leftover pre-cognitive modules if still present in the tree
- [ ] Trim public exports to the stable façade; keep Core/memory internals package-private unless consumers need them
