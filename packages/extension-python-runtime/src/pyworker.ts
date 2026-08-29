// Python Web Worker - Runs Pyodide in a separate thread
import pyoPackageJson from "pyodide/package.json";
import {loadPyodide, PyodideInterface} from "pyodide";

let pyodide: PyodideInterface | null = null;
let interruptBuffer: Uint8Array | null = null;
let inputCounter = 0;
let workspaceRequestCounter = 0;
const pendingInputRequests: Map<string, { resolve: (value: string) => void, reject: (error: any) => void }> = new Map();
const pendingWorkspaceRequests: Map<string, { resolve: (value: any) => void, reject: (error: any) => void }> = new Map();

// Store original console methods before interception
const originalConsole = {
    log: console.log.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    debug: console.debug.bind(console)
};

// Helper to format console arguments
function formatArg(arg: any): string {
    if (arg === null) return 'null';
    if (arg === undefined) return 'undefined';
    if (typeof arg === 'string') return arg;
    if (typeof arg === 'number' || typeof arg === 'boolean') return String(arg);
    if (arg instanceof Error) return `${arg.name}: ${arg.message}`;
    
    try {
        return JSON.stringify(arg);
    } catch {
        return String(arg);
    }
}

// Intercept worker console and forward to main thread
console.log = function(...args: any[]) {
    originalConsole.log.apply(console, args);
    self.postMessage({
        id: 'console-log',
        type: 'console',
        payload: { level: 'info', message: args.map(a => formatArg(a)).join(' ') }
    });
};

console.info = function(...args: any[]) {
    originalConsole.info.apply(console, args);
    self.postMessage({
        id: 'console-log',
        type: 'console',
        payload: { level: 'info', message: args.map(a => formatArg(a)).join(' ') }
    });
};

console.warn = function(...args: any[]) {
    originalConsole.warn.apply(console, args);
    self.postMessage({
        id: 'console-log',
        type: 'console',
        payload: { level: 'warning', message: args.map(a => formatArg(a)).join(' ') }
    });
};

console.error = function(...args: any[]) {
    originalConsole.error.apply(console, args);
    self.postMessage({
        id: 'console-log',
        type: 'console',
        payload: { level: 'error', message: args.map(a => formatArg(a)).join(' ') }
    });
};

console.debug = function(...args: any[]) {
    originalConsole.debug.apply(console, args);
    self.postMessage({
        id: 'console-log',
        type: 'console',
        payload: { level: 'debug', message: args.map(a => formatArg(a)).join(' ') }
    });
};

// Message types for worker communication
export interface PyWorkerMessage {
    id: string;
    type: 'init' | 'execCode' | 'execModule' | 'runFunction' | 'setGlobal' | 'loadPackages' | 'getVersion' | 'inputResponse' | 'workspaceResponse';
    payload?: any;
}

export interface PyWorkerResponse {
    id: string;
    type: 'success' | 'error' | 'stdout' | 'stderr' | 'inputRequest' | 'console' | 'workspaceRequest';
    payload?: any;
}

// Console output capture
const consoleBuffer: string[] = [];

function sendMessage(response: PyWorkerResponse) {
    self.postMessage(response);
}

function createWorkspaceRequest(op: string, path?: string, extra?: Record<string, unknown>): Promise<any> {
    const id = `ws-${workspaceRequestCounter++}`;
    return new Promise((resolve, reject) => {
        pendingWorkspaceRequests.set(id, { resolve, reject });
        sendMessage({
            id,
            type: 'workspaceRequest',
            payload: { op, path: path ?? '', ...extra }
        });
    });
}

function createDocksBridge() {
    return {
        read_file: (path: string, binary?: boolean) =>
            createWorkspaceRequest('read', path, { binary: !!binary }),
        read_file_range: (path: string, offset: number, length: number, binary?: boolean) =>
            createWorkspaceRequest('read_range', path, { offset, length, binary: binary !== false }),
        write_file: (path: string, content: string | ArrayBuffer | Uint8Array) =>
            createWorkspaceRequest('write', path, { content }),
        list_dir: (path: string) =>
            createWorkspaceRequest('list', path || '.'),
        exists: (path: string) =>
            createWorkspaceRequest('exists', path),
        is_file: (path: string) =>
            createWorkspaceRequest('is_file', path),
        is_dir: (path: string) =>
            createWorkspaceRequest('is_dir', path),
        get_uri: (path: string) =>
            createWorkspaceRequest('get_uri', path),
        revoke_uri: (uri: string) =>
            createWorkspaceRequest('revoke_uri', undefined, { uri }),
        fetch: async (pathOrUri: string) => {
            const isBlobUrl = typeof pathOrUri === 'string' && pathOrUri.startsWith('blob:');
            let url: string;
            if (isBlobUrl) {
                url = pathOrUri;
            } else {
                url = await createWorkspaceRequest('get_uri', pathOrUri);
            }
            const r = await fetch(url);
            if (!isBlobUrl) {
                await createWorkspaceRequest('revoke_uri', undefined, { uri: url });
            }
            return r;
        },
        uri: (path: string) => {
            const state: { _url?: string } = {};
            return {
                async __aenter__() {
                    state._url = await createWorkspaceRequest('get_uri', path);
                    return state._url;
                },
                async __aexit__(_excType?: unknown, _excVal?: unknown, _excTb?: unknown) {
                    if (state._url) {
                        await createWorkspaceRequest('revoke_uri', undefined, { uri: state._url });
                        state._url = undefined;
                    }
                }
            };
        }
    };
}

// Initialize Pyodide
async function initPyodide(payload: { vars?: any }) {
    const poVersion = pyoPackageJson.version;
    pyodide = await loadPyodide({
        indexURL: `https://cdn.jsdelivr.net/pyodide/v${poVersion}/full/`
    });
    
    // Set up interrupt buffer for cancellation support (if available)
    // SharedArrayBuffer requires cross-origin isolation headers:
    // - Cross-Origin-Opener-Policy: same-origin
    // - Cross-Origin-Embedder-Policy: require-corp
    if (typeof SharedArrayBuffer !== 'undefined') {
        try {
            const interruptBufferShared = new SharedArrayBuffer(1);
            interruptBuffer = new Uint8Array(interruptBufferShared);
            pyodide.setInterruptBuffer(interruptBuffer);
            
            // Send the interrupt buffer to main thread
            sendMessage({
                id: 'interrupt-buffer',
                type: 'success',
                payload: interruptBufferShared
            });
        } catch (error) {
            console.warn('Failed to set up interrupt buffer:', error);
            sendMessage({
                id: 'interrupt-buffer',
                type: 'success',
                payload: undefined,
            });
        }
    } else {
        console.warn('SharedArrayBuffer not available - interrupt functionality will be limited');
        sendMessage({
            id: 'interrupt-buffer',
            type: 'success',
            payload: undefined,
        });
    }
    
    // Set up input() function to request input from main thread
    pyodide.globals.set('input', (promptText?: string) => {
        const inputId = `input-${inputCounter++}`;
        
        // Send input request to main thread
        sendMessage({
            id: inputId,
            type: 'inputRequest',
            payload: { prompt: promptText || '' }
        });
        
        // Return a promise that will be resolved when main thread responds
        return new Promise<string>((resolve, reject) => {
            pendingInputRequests.set(inputId, { resolve, reject });
        });
    });
    
    // Set up stdout/stderr capture
    pyodide.setStderr({
        batched: (s: string) => {
            // Store without prefix for cleaner output
            consoleBuffer.push(s);
            sendMessage({
                id: 'stream',
                type: 'stderr',
                payload: s
            });
        }
    });
    
    pyodide.setStdout({
        batched: (s: string) => {
            // Store without prefix for cleaner output
            consoleBuffer.push(s);
            sendMessage({
                id: 'stream',
                type: 'stdout',
                payload: s
            });
        }
    });
    
    const docksBridge = createDocksBridge();
    pyodide.globals.set('__docks_bridge__', docksBridge);
    // make the bridge available to the Python code as a module: > import docks
    pyodide.runPython(`
import sys
import types
__bridge__ = __docks_bridge__
__m__ = types.ModuleType('docks')
for __a__ in ('read_file', 'read_file_range', 'write_file', 'list_dir', 'exists', 'is_file', 'is_dir', 'get_uri', 'revoke_uri', 'fetch', 'uri'):
    setattr(__m__, __a__, getattr(__bridge__, __a__))
sys.modules['docks'] = __m__
del __docks_bridge__, __bridge__, __m__, __a__
`);

    if (payload.vars) {
        for (const [key, value] of Object.entries(payload.vars)) {
            pyodide.globals.set(key, value);
        }
    }
}

// Load Python packages
async function loadPackages(payload: { packages: string[] }) {
    if (!pyodide) throw new Error('Pyodide not initialized');
    
    if (payload.packages.length > 0) {
        await pyodide.loadPackage(payload.packages, {
            checkIntegrity: false
        });
    }
}

// Convert Python result to JavaScript-cloneable value
function convertResult(result: any): any {
    if (result === undefined || result === null) {
        return result;
    }
    
    // Handle primitives (string, number, boolean)
    const resultType = typeof result;
    if (resultType === 'string' || resultType === 'number' || resultType === 'boolean') {
        return result;
    }
    
    // Check if it's a PyProxy (Python object) by checking for common PyProxy methods
    if (result && typeof result === 'object') {
        // PyProxy objects have toJs() method
        if (typeof result.toJs === 'function') {
            try {
                // Convert to JavaScript object
                const jsValue = result.toJs({ 
                    dict_converter: Object.fromEntries,
                    create_pyproxies: false 
                });
                
                // Clean up PyProxy
                if (typeof result.destroy === 'function') {
                    result.destroy();
                }
                
                return jsValue;
            } catch (error) {
                // If conversion fails, stringify it
                try {
                    const strValue = String(result);
                    if (typeof result.destroy === 'function') {
                        result.destroy();
                    }
                    return strValue;
                } catch {
                    return '[Python object]';
                }
            }
        }
        
        // Try to clone regular JS objects
        try {
            // This will throw if object is not cloneable
            structuredClone(result);
            return result;
        } catch {
            // If not cloneable, try to stringify
            try {
                return JSON.parse(JSON.stringify(result));
            } catch {
                return String(result);
            }
        }
    }
    
    // Fallback for any other type
    return result;
}

// Execute Python code
async function execCode(payload: { code: string }) {
    if (!pyodide) throw new Error('Pyodide not initialized');
    
    consoleBuffer.length = 0;
    
    // Reset interrupt buffer before execution
    if (interruptBuffer) {
        interruptBuffer[0] = 0;
    }
    
    let result;
    try {
        result = await pyodide.runPythonAsync(payload.code);
    } catch (error) {
        // Reset interrupt buffer after error (including KeyboardInterrupt)
        if (interruptBuffer) {
            interruptBuffer[0] = 0;
        }
        // Error will be caught by outer try-catch, but make sure console is captured
        throw error;
    }
    
    if (interruptBuffer) {
        interruptBuffer[0] = 0;
    }
    
    return {
        result: convertResult(result),
        console: consoleBuffer.slice()
    };
}

// Execute Python module
async function execModule(payload: { moduleName: string; entryName?: string; vars?: any }) {
    if (!pyodide) throw new Error('Pyodide not initialized');
    
    consoleBuffer.length = 0;
    const mod = pyodide.pyimport(payload.moduleName);
    const entryName = payload.entryName ?? 'main';
    
    let result;
    if (entryName in mod) {
        const func = mod[entryName];
        if (!(func instanceof Function)) {
            throw new Error(`Module entry point is not a function: ${entryName}`);
        }
        result = func.callKwargs(payload.vars || {});
    }
    
    return {
        result: convertResult(result),
        console: consoleBuffer.slice()
    };
}

// Run a Python function
async function runFunction(payload: { name: string; args: any }) {
    if (!pyodide) throw new Error('Pyodide not initialized');
    
    consoleBuffer.length = 0;
    const func = pyodide.globals.get(payload.name);
    const result = func.callKwargs(payload.args);
    func.destroy();
    
    return {
        result: convertResult(result),
        console: consoleBuffer.slice()
    };
}

// Set a global variable
async function setGlobal(payload: { key: string; value: any }) {
    if (!pyodide) throw new Error('Pyodide not initialized');
    pyodide.globals.set(payload.key, payload.value);
}

// Get Python version (e.g. "3.12.0")
async function getVersion() {
    if (!pyodide) throw new Error('Pyodide not initialized');
    const result = await pyodide.runPythonAsync("import sys; sys.version.split()[0]");
    return result != null ? String(result) : String(pyodide.version);
}

// Message handler
self.onmessage = async (event: MessageEvent<PyWorkerMessage>) => {
    const { id, type, payload } = event.data;
    
    if (type === 'inputResponse') {
        const pending = pendingInputRequests.get(id);
        if (pending) {
            pendingInputRequests.delete(id);
            if (payload.cancelled) {
                pending.resolve('');
            } else {
                pending.resolve(payload.value || '');
            }
        }
        return;
    }

    if (type === 'workspaceResponse') {
        const pending = pendingWorkspaceRequests.get(id);
        if (pending) {
            pendingWorkspaceRequests.delete(id);
            if (payload?.success === false) {
                pending.reject(new Error(payload.error ?? 'Workspace request failed'));
            } else {
                pending.resolve(payload?.data);
            }
        }
        return;
    }

    try {
        let result;
        
        switch (type) {
            case 'init':
                await initPyodide(payload);
                result = { initialized: true };
                break;
            case 'loadPackages':
                await loadPackages(payload);
                result = { loaded: true };
                break;
            case 'execCode':
                result = await execCode(payload);
                break;
            case 'execModule':
                result = await execModule(payload);
                break;
            case 'runFunction':
                result = await runFunction(payload);
                break;
            case 'setGlobal':
                await setGlobal(payload);
                result = { set: true };
                break;
            case 'getVersion':
                result = await getVersion();
                break;
            default:
                throw new Error(`Unknown message type: ${type}`);
        }
        
        sendMessage({
            id,
            type: 'success',
            payload: result
        });
    } catch (error) {
        sendMessage({
            id,
            type: 'error',
            payload: {
                message: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined
            }
        });
    }
};
