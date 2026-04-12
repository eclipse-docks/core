import '@eclipse-docks/extension-ai-system';
import '@eclipse-docks/extension-plain-editor';
// Register AI auxiliary tab before main.ts adds the e2e tab so order is [aiview, e2e]; avoids false positives when the tab group falls back to the first tab.
import '../../extension-ai-system/src/ai-system-extension.ts';
