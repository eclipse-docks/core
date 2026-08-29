import { createLogger, workspaceService, File, Directory } from "@eclipse-docks/core";

const logger = createLogger('PyService');
import type { PyWorkerMessage, PyWorkerResponse } from "./pyworker";
import PyWorker from "./pyworker?worker&inline";

let messageId = 0;

export class PyEnv {
    private worker?: Worker;
    private vars: any;
    private pendingMessages: Map<string, { resolve: (value: any) => void, reject: (error: any) => void }> = new Map();
    private stdoutCallback?: (text: string) => void;
    private stderrCallback?: (text: string) => void;
    private interruptBuffer?: Uint8Array;

    public async init(vars?: any) {
        this.vars = vars ?? {};

        const worker = new PyWorker();
        this.worker = worker;

        worker.onmessage = (event: MessageEvent<PyWorkerResponse>) => {
            this.handleWorkerMessage(event.data);
        };

        worker.onerror = (ev: ErrorEvent) => {
            const where = [ev.message, ev.filename, ev.lineno, ev.colno].filter(Boolean).join(' ');
            const head = `Python worker failed (script load or uncaught exception)${where ? `: ${where}` : ''}`;
            if (ev.error instanceof Error) {
                logger.error(head, ev.error);
            } else {
                logger.error(head);
            }
        };

        await this.sendMessage('init', { vars: this.vars });
    }

    private async handleWorkspaceRequest(response: PyWorkerResponse) {
        const { id, payload } = response;
        const { op, path, ...extra } = payload ?? {};
        const send = (success: boolean, data?: unknown, error?: string) => {
            this.worker!.postMessage({
                id,
                type: 'workspaceResponse',
                payload: { success, data, error }
            } as PyWorkerMessage);
        };

        try {
            const workspace = await workspaceService.getWorkspace();
            if (!workspace) {
                send(false, undefined, 'No workspace selected');
                return;
            }

            const resolvePath = (p: string) => (p === '' || p === '.') ? '' : p;

            switch (op) {
                case 'read': {
                    const resource = await workspace.getResource(resolvePath(path));
                    if (!resource || !(resource instanceof File)) {
                        send(false, undefined, `File not found: ${path}`);
                        return;
                    }
                    const binary = !!extra.binary;
                    if (binary) {
                        const blob = await (resource as File).getContents({ blob: true });
                        const buf = blob instanceof Blob ? await blob.arrayBuffer() : new ArrayBuffer(0);
                        send(true, buf);
                    } else {
                        const content = await (resource as File).getContents();
                        send(true, typeof content === 'string' ? content : String(content ?? ''));
                    }
                    return;
                }
                case 'read_range': {
                    const resource = await workspace.getResource(resolvePath(path));
                    if (!resource || !(resource instanceof File)) {
                        send(false, undefined, `File not found: ${path}`);
                        return;
                    }
                    const offset = Math.max(0, Number(extra.offset) || 0);
                    const length = Math.max(0, Number(extra.length) || 0);
                    const binary = extra.binary !== false;
                    if (length === 0) {
                        send(true, binary ? new ArrayBuffer(0) : '');
                        return;
                    }
                    const file = resource as File;
                    const uri = await file.getContents({ uri: true });
                    if (typeof uri === 'string' && (uri.startsWith('http://') || uri.startsWith('https://'))) {
                        const end = offset + length - 1;
                        const res = await fetch(uri, { headers: { Range: `bytes=${offset}-${end}` } });
                        if (!res.ok && res.status !== 206) {
                            send(false, undefined, `Range read failed: ${res.status} ${res.statusText}`);
                            return;
                        }
                        send(true, await res.arrayBuffer());
                        return;
                    }
                    if (binary) {
                        const blob = await file.getContents({ blob: true });
                        const buf = blob instanceof Blob ? await blob.arrayBuffer() : new ArrayBuffer(0);
                        send(true, buf.slice(offset, offset + length));
                        return;
                    }
                    const content = await file.getContents();
                    const text = typeof content === 'string' ? content : String(content ?? '');
                    send(true, text.slice(offset, offset + length));
                    return;
                }
                case 'write': {
                    let content = extra.content;
                    if (content instanceof ArrayBuffer || ArrayBuffer.isView(content)) {
                        content = new Blob([content as unknown as BlobPart]);
                    }
                    const target = await workspace.getResource(resolvePath(path), { create: true });
                    if (!target || !(target instanceof File)) {
                        send(false, undefined, `Failed to create file: ${path}`);
                        return;
                    }
                    await (target as File).saveContents(content);
                    send(true);
                    return;
                }
                case 'list': {
                    const resource = await workspace.getResource(resolvePath(path));
                    if (!resource || !(resource instanceof Directory)) {
                        send(false, undefined, `Directory not found: ${path}`);
                        return;
                    }
                    const children = await (resource as Directory).listChildren(false);
                    send(true, children.map((r) => r.getName()));
                    return;
                }
                case 'exists': {
                    const resource = await workspace.getResource(resolvePath(path));
                    send(true, resource != null);
                    return;
                }
                case 'is_file': {
                    const resource = await workspace.getResource(resolvePath(path));
                    send(true, resource instanceof File);
                    return;
                }
                case 'is_dir': {
                    const resource = await workspace.getResource(resolvePath(path));
                    send(true, resource instanceof Directory);
                    return;
                }
                case 'get_uri': {
                    const resource = await workspace.getResource(resolvePath(path));
                    if (!resource || !(resource instanceof File)) {
                        send(false, undefined, `File not found: ${path}`);
                        return;
                    }
                    const uri = await (resource as File).getContents({ uri: true });
                    send(true, typeof uri === 'string' ? uri : undefined);
                    return;
                }
                case 'revoke_uri': {
                    const uri = extra.uri;
                    if (typeof uri === 'string') {
                        URL.revokeObjectURL(uri);
                    }
                    send(true);
                    return;
                }
                default:
                    send(false, undefined, `Unknown workspace op: ${op}`);
            }
        } catch (err) {
            send(false, undefined, err instanceof Error ? err.message : String(err));
        }
    }

    private handleWorkerMessage(response: PyWorkerResponse) {
        // Handle interrupt buffer initialization
        if (response.id === 'interrupt-buffer') {
            const buf = response.type === 'success' ? response.payload : undefined;
            this.interruptBuffer =
                buf instanceof SharedArrayBuffer ? new Uint8Array(buf) : undefined;
            return;
        }
        
        if (response.type === 'workspaceRequest') {
            this.handleWorkspaceRequest(response);
            return;
        }

        // Handle input requests
        if (response.type === 'inputRequest') {
            const promptText = response.payload.prompt || 'Input:';
            const userInput = window.prompt(promptText);
            
            // Send response back to worker
            this.worker!.postMessage({
                id: response.id,
                type: 'inputResponse',
                payload: {
                    value: userInput,
                    cancelled: userInput === null
                }
            } as PyWorkerMessage);
            return;
        }
        
        // Handle stdout/stderr streams
        if (response.type === 'stdout') {
            if (this.stdoutCallback) {
                this.stdoutCallback(response.payload);
            } else {
                logger.debug(response.payload);
            }
            return;
        }
        
        if (response.type === 'stderr') {
            if (this.stderrCallback) {
                this.stderrCallback(response.payload);
            } else {
                logger.error(response.payload);
            }
            return;
        }
        
        // Handle console messages from worker
        if (response.type === 'console') {
            const { level, message } = response.payload;
            // Forward to log terminal
            if (typeof window !== 'undefined' && (window as any).logToTerminal) {
                (window as any).logToTerminal('Python Worker', message, level);
            }
            return;
        }

        // Handle regular responses
        const pending = this.pendingMessages.get(response.id);
        if (pending) {
            this.pendingMessages.delete(response.id);
            
            if (response.type === 'success') {
                pending.resolve(response.payload);
            } else if (response.type === 'error') {
                pending.reject(new Error(response.payload.message));
            }
        }
    }

    private async sendMessage(type: PyWorkerMessage['type'], payload?: any): Promise<any> {
        if (!this.worker) {
            throw new Error('PyEnv not initialized yet: see init()');
        }

        const id = `msg-${messageId++}`;
        const message: PyWorkerMessage = { id, type, payload };

        return new Promise((resolve, reject) => {
            this.pendingMessages.set(id, { resolve, reject });
            this.worker!.postMessage(message);
        });
    }

    public setStdoutCallback(callback: (text: string) => void) {
        this.stdoutCallback = callback;
    }

    public setStderrCallback(callback: (text: string) => void) {
        this.stderrCallback = callback;
    }

    public async runFunction(name: string, args: any) {
        return await this.sendMessage('runFunction', { name, args });
    }

    public async setGlobal(key: string, value: any) {
        await this.sendMessage('setGlobal', { key, value });
    }

    public async loadPackages(packages: string[]) {
        if (packages.length > 0) {
            await this.sendMessage('loadPackages', { packages });
        }
    }

    public async execCode(code: string) {
        return await this.sendMessage('execCode', { code });
    }

    public async execScript(path: string, _installDependencies: boolean = false) {
        const moduleName = path.split(".")[0];
        const entryName = path.includes(":") ? path.split(":").reverse()[0] : undefined;
        return await this.execModule(moduleName, entryName);
    }

    public async execModule(moduleName: string, entryName?: string) {
        return await this.sendMessage('execModule', {
            moduleName,
            entryName,
            vars: this.vars
        });
    }

    public async getVersion() {
        return await this.sendMessage('getVersion');
    }

    /**
     * Check if interrupt functionality is available (requires SharedArrayBuffer).
     */
    public canInterrupt(): boolean {
        return this.interruptBuffer !== undefined;
    }

    /**
     * Interrupts any currently running Python code.
     * This will cause a KeyboardInterrupt to be raised in the Python code.
     * Only works if SharedArrayBuffer is available (check with canInterrupt()).
     */
    public interrupt() {
        if (this.interruptBuffer) {
            // Set the interrupt flag (2 = SIGINT)
            this.interruptBuffer[0] = 2;
        }
    }

    close() {
        if (this.worker) {
            this.worker.terminate();
            this.worker = undefined;
        }
        this.pendingMessages.clear();
    }
}
