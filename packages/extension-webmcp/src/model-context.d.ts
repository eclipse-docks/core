/**
 * Type augmentation for the Web Model Context API (WebMCP).
 * @see https://webmachinelearning.github.io/webmcp/
 */

export interface ToolAnnotations {
  readOnlyHint?: boolean;
  untrustedContentHint?: boolean;
}

export interface ToolExecuteCallbackOptions {
  signal: AbortSignal;
}

export type ToolExecuteCallback = (
  inputObject: Record<string, unknown>,
  options: ToolExecuteCallbackOptions
) => Promise<unknown>;

export interface ModelContextTool {
  name: string;
  title?: string;
  description: string;
  inputSchema?: Record<string, unknown>;
  execute: ToolExecuteCallback;
  annotations?: ToolAnnotations;
}

export interface ModelContextRegisterToolOptions {
  exposedTo?: string[];
  signal?: AbortSignal;
}

export interface ModelContextGetToolOptions {
  fromOrigins?: string[];
}

export interface RegisteredTool {
  name: string;
  title?: string;
  description: string;
  inputSchema?: Record<string, unknown>;
  window: Window;
  origin: string;
  annotations?: ToolAnnotations;
}

export interface ModelContextExecuteToolOptions {
  signal?: AbortSignal;
}

export interface ModelContext extends EventTarget {
  registerTool(
    tool: ModelContextTool,
    options?: ModelContextRegisterToolOptions
  ): Promise<void>;
  getTools(options?: ModelContextGetToolOptions): Promise<RegisteredTool[]>;
  executeTool(
    tool: RegisteredTool,
    inputObject?: Record<string, unknown>,
    options?: ModelContextExecuteToolOptions
  ): Promise<string>;
  ontoolchange: ((this: ModelContext, ev: Event) => unknown) | null;
}

declare global {
  interface Document {
    readonly modelContext: ModelContext;
  }

  interface Navigator {
    /** @deprecated Prefer document.modelContext; retained for transitional user agents. */
    modelContext?: ModelContext;
  }
}

export {};
