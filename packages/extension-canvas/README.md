# `@eclipse-docks/extension-canvas`

Interactive canvases for Eclipse Docks. A canvas is a `.canvas.js` module that default-exports a `CanvasView`. The preview compiler bundles that module and its relative imports as JavaScript.

## Future iteration

- [ ] Accept `.canvas.ts`. Transpile each TypeScript file with `transpileModule` inside `compileCanvas`, then pass the JavaScript to the existing module graph. Do this in the compiler, not through Monaco's TypeScript worker: compile also runs with no editor open and must cover every imported file. Point the host, sidecars, and canvas skills at the `.canvas.ts` extension, and set the editor language to `typescript`.
