# Packages overview

| Package | Role |
|---------|------|
| **@eclipse-docks/core** | Platform: registries (extensions, contributions, commands), services (workspace, settings, dialogs, tasks, events), UI parts and widgets. Import this in apps and extensions. |
| **@eclipse-docks/create-app** | Scaffolder: run `npm create @eclipse-docks/app` to generate a new app (monorepo with app + example extension). |
| **@eclipse-docks/app** | Default app in this repo: defines the app and imports extensions. Use as reference when working in the monorepo. |
| **@eclipse-docks/extension-ai-system** | AI integration (chat, prompts, context). |
| **@eclipse-docks/extension-command-palette** | Command palette UI. |
| **@eclipse-docks/extension-settings-tree** | Settings tree UI. |
| **@eclipse-docks/extension-monaco-editor** | Monaco code editor. |
| **@eclipse-docks/extension-md-editor** | Markdown editor. |
| **@eclipse-docks/extension-media-viewer** | Media (image, etc.) viewer. |
| **@eclipse-docks/extension-notebook** | Notebook runtime and UI. |
| **@eclipse-docks/extension-python-runtime** | Python runtime (e.g. Pyodide). |
| **@eclipse-docks/extension-webllm** | Web LLM integration. |
| **@eclipse-docks/extension-in-browser-ml** | In-browser ML (e.g. transformers). |
| **@eclipse-docks/extension-rag-system** | RAG (retrieval-augmented generation) and document indexing. |
| **@eclipse-docks/extension-howto-system** | How-to / tutorial system. |
| **@eclipse-docks/extension-webdav** | WebDAV workspace and commands. |
| **@eclipse-docks/extension-download** | Download arbitrary resources from any URL to the workspace. (superseded by `@eclipse-docks/extension-utils`'s `wget` command) |
| **@eclipse-docks/extension-unzip** | Unzip support. (superseded by `@eclipse-docks/extension-utils`) |
| **@eclipse-docks/extension-memory-usage** | Memory usage display. |
| **@eclipse-docks/extension-certs** | Certificate handling. (superseded by `@eclipse-docks/extension-utils`) |
| **@eclipse-docks/extension-utils** | Convenience utility extension combining wget-style download, unzip, and certificate tools. |
| **@eclipse-docks/extension-github-service** | GitHub service integration. |

Add only the extensions your app needs to `AppDefinition.extensions` and import their packages so they register with the framework.
