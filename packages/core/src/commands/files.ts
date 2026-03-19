import { activeSelectionSignal } from "../core/appstate";
import { registerAll, type ExecutionContext } from "../core/commandregistry";
import { EditorContentProvider, editorRegistry } from "../core/editorregistry";
import { Directory, File, deleteIndexedDbWorkspaceData, workspaceService } from "../core/filesys";
import { toastError, toastInfo } from "../core/toast";
import { confirmDialog } from "../dialogs";

async function getWorkspaceAndPath(params: any, requirePath: boolean = true): Promise<{workspace: Directory, path: string} | null> {
    const workspace = await workspaceService.getWorkspace()
    if (!workspace) {
        return null
    }

    const path = params?.path
    if (requirePath && !path) {
        return null
    }

    return { workspace, path: path || '' }
}

/**
 * Type guard to check if an editor implements EditorContentProvider
 */
function isEditorContentProvider(editor: any): editor is EditorContentProvider {
    return editor &&
        typeof editor.getContent === 'function' &&
        typeof editor.getSelection === 'function' &&
        typeof editor.getSnippet === 'function' &&
        typeof editor.getLanguage === 'function' &&
        typeof editor.getFilePath === 'function';
}

/**
 * Helper to get a resource from path or active selection
 */
async function getResourceFromContext(context: ExecutionContext, params?: any): Promise<any> {
    let resource = undefined
    const path = params?.path || context.params?.["path"]
    
    if (path) {
        const workspaceDir = await workspaceService.getWorkspace()
        if (workspaceDir) {
            resource = await workspaceDir.getResource(path)
        }
    }

    if (!resource) {
        resource = activeSelectionSignal.get()
    }

    return resource
}

/**
 * Helper to read text file contents with error handling
 */
async function readTextFile(file: File): Promise<string | null> {
    try {
        const contents = await file.getContents()
        if (typeof contents !== 'string') {
            toastError("File is not a text file")
            return null
        }
        return contents
    } catch (err: any) {
        toastError(`Failed to read file: ${err.message}`)
        return null
    }
}

/**
 * Helper to create null editor response
 */
function createNullEditorResponse(includeCursorLine: boolean = false) {
    const base = {
        filePath: null,
        language: null
    }
    if (includeCursorLine) {
        return { ...base, snippet: null, cursorLine: null }
    }
    return base
}

async function getWorkspaceAndFile(params: any, requirePath: boolean = true): Promise<{workspace: Directory, path: string, file: File} | null> {
    const result = await getWorkspaceAndPath(params, requirePath)
    if (!result) {
        return null
    }

    const { workspace, path } = result

    if (!path) {
        return null
    }

    try {
        const resource = await workspace.getResource(path)
        if (!resource || !(resource instanceof File)) {
            return null
        }

        return { workspace, path, file: resource }
    } catch (err: any) {
        return null
    }
}

registerAll({
    command: {
        "id": "disconnect_folder",
        "name": "Disconnect folder",
        "description": "Disconnects a folder from the workspace"
    },
    handler: {
        execute: async () => {
            const selection = activeSelectionSignal.get()
            if (!(selection instanceof Directory && selection.getParent() === undefined)) {
                toastError("Select a folder root to disconnect.")
                return
            }
            try {
                const folderInfo = await workspaceService.getFolderInfoForDirectory(selection);
                if (folderInfo?.type === 'indexeddb') {
                    const deleteData = await confirmDialog(
                        `Also delete "${folderInfo.name}" from browser storage?\n\nIf not deleted, the folder data and blobs remain in IndexedDB.`
                    );
                    if (!deleteData) {
                        return;
                    }
                    await deleteIndexedDbWorkspaceData(selection);
                    toastInfo(`Deleted IndexedDB data for ${folderInfo.name}.`);
                }
                await workspaceService.disconnectFolder(selection)
            } catch (err: any) {
                toastError(err.message)
            }
        }
    },
    contribution: {
        target: "contextmenu:view.filebrowser",
        label: "Disconnect folder",
        icon: "folder-minus",
        disabled: () => {
            const selection = activeSelectionSignal.get();
            return !(selection instanceof Directory && selection.getParent() === undefined);
        }
    }
})

// Register local filesystem workspace contribution
registerAll({
    command: {
        "id": "load_workspace",
        "name": "Local Folder",
        "description": "Connect to a local folder using File System Access API",
        "parameters": []
    },
    handler: {
        execute: async _context => {
            // @ts-ignore
            await window.showDirectoryPicker({
                mode: "readwrite"
            }).then((dirHandle: FileSystemDirectoryHandle) => {
                return workspaceService.connectWorkspace(dirHandle);
            }).catch((err: Error) => {
                toastError(err.message)
            });
        }
    },
    contribution: {
        target: "filebrowser.connections",
        label: "Local Folder",
        icon: "folder-open"
    }
})

registerAll({
    command: {
        "id": "connect_opfs",
        "name": "OPFS",
        "description": "Connect to Origin Private File System (browser storage)",
        "parameters": []
    },
    handler: {
        execute: async () => {
            try {
                await workspaceService.connectFolder({ opfs: true });
            } catch (err: any) {
                toastError(err.message);
            }
        }
    },
    contribution: {
        target: "filebrowser.connections",
        label: "OPFS (Browser Storage)",
        icon: "database"
    }
})

registerAll({
    command: {
        "id": "connect_indexeddb",
        "name": "IndexedDB",
        "description": "Connect to IndexedDB-backed workspace (browser storage)",
        "parameters": [
            {
                "name": "name",
                "description": "Optional display name for this IndexedDB workspace root",
                "required": false
            }
        ]
    },
    handler: {
        execute: async (context: ExecutionContext) => {
            const nameParam = context.params?.["name"];
            try {
                await workspaceService.connectFolder({ indexeddb: true, name: nameParam });
            } catch (err: any) {
                toastError(err.message);
            }
        }
    },
    contribution: {
        target: "filebrowser.connections",
        label: "IndexedDB (Browser Storage)",
        icon: "database"
    }
})

registerAll({
    command: {
        "id": "refresh_resource",
        "name": "Refresh resource",
        "description": "Refreshes the connected folder of the selected resource, or the whole workspace if nothing is selected",
        "parameters": []
    },
    handler: {
        execute: async () => {
            const selection = activeSelectionSignal.get()
            if (selection) {
                selection.getWorkspace().touch()
                return
            }
            const workspace = await workspaceService.getWorkspace()
            if (!workspace) {
                toastError("No workspace selected.")
                return
            }
            workspace.touch()
        }
    }
})

registerAll({
    command: {
        "id": "open_editor",
        "name": "Open editor",
        "description": "Opens a file in an editor",
        "parameters": [
            {
                "name": "path",
                "description": "The path of the file to open within the workspace; if omitted, the active selection is opened",
                "required": false
            },
            {
                "name": "editorId",
                "description": "Open with this editor id; if omitted, use default editor",
                "required": false
            }
        ]
    },
    handler: {
        execute: async context => {
            const path = context.params?.["path"]
            const editorId = context.params?.["editorId"]
            let file: File | null = null
            if (path) {
                const result = await getWorkspaceAndFile({ path })
                file = result?.file ?? null
            } else {
                const selection = activeSelectionSignal.get()
                file = selection instanceof File ? selection : null
            }
            if (!file) return
            await editorRegistry.loadEditor(file, editorId)
        }
    }
})

registerAll({
    command: {
        "id": "get_active_editor_content",
        "name": "Get active editor content",
        "description": "Gets the complete contents of the currently active editor. Returns null if no editor is active or if the editor is not a code editor.",
        "parameters": [],
        "output": [
            {
                "name": "content",
                "description": "the complete contents of the active editor, or null if no editor is active"
            },
            {
                "name": "filePath",
                "description": "the workspace path of the file in the active editor, or null if no editor is active"
            },
            {
                "name": "language",
                "description": "the programming language of the active editor, or null if no editor is active"
            }
        ]
    },
    handler: {
        execute: async (context: ExecutionContext) => {
            const activeEditor = context.activeEditor as any
            if (!isEditorContentProvider(activeEditor)) {
                return { ...createNullEditorResponse(), content: null }
            }

            try {
                return {
                    content: activeEditor.getContent(),
                    filePath: activeEditor.getFilePath(),
                    language: activeEditor.getLanguage()
                }
            } catch (err: any) {
                return { ...createNullEditorResponse(), content: null }
            }
        }
    }
})

registerAll({
    command: {
        "id": "get_active_editor_selection",
        "name": "Get active editor selection",
        "description": "Gets the currently selected text in the active editor. Returns null if no editor is active, no selection exists, or if the editor is not a code editor.",
        "parameters": [],
        "output": [
            {
                "name": "selection",
                "description": "the selected text in the active editor, or null if no selection exists or no editor is active"
            },
            {
                "name": "filePath",
                "description": "the workspace path of the file in the active editor, or null if no editor is active"
            },
            {
                "name": "language",
                "description": "the programming language of the active editor, or null if no editor is active"
            }
        ]
    },
    handler: {
        execute: async (context: ExecutionContext) => {
            const activeEditor = context.activeEditor as any
            if (!isEditorContentProvider(activeEditor)) {
                return { ...createNullEditorResponse(), selection: null }
            }

            try {
                return {
                    selection: activeEditor.getSelection(),
                    filePath: activeEditor.getFilePath(),
                    language: activeEditor.getLanguage()
                }
            } catch (err: any) {
                return { ...createNullEditorResponse(), selection: null }
            }
        }
    }
})

registerAll({
    command: {
        "id": "get_active_editor_snippet",
        "name": "Get active editor snippet around cursor",
        "description": "Gets a code snippet from the active editor with n lines before and n lines after the cursor position. Useful for getting context around the cursor without loading the entire file.",
        "parameters": [
            {
                "name": "lines",
                "description": "number of lines to include before and after the cursor position (default: 5)",
                "type": "number",
                "required": false
            }
        ],
        "output": [
            {
                "name": "snippet",
                "description": "the code snippet with n lines before and after the cursor, or null if no editor is active"
            },
            {
                "name": "filePath",
                "description": "the workspace path of the file in the active editor, or null if no editor is active"
            },
            {
                "name": "language",
                "description": "the programming language of the active editor, or null if no editor is active"
            },
            {
                "name": "cursorLine",
                "description": "the line number where the cursor is positioned (1-based), or null if no editor is active"
            }
        ]
    },
    handler: {
        execute: async (context: ExecutionContext) => {
            const activeEditor = context.activeEditor as any
            if (!isEditorContentProvider(activeEditor)) {
                return createNullEditorResponse(true)
            }

            try {
                const numLines = context.params?.lines ? parseInt(context.params.lines, 10) : 5
                if (isNaN(numLines) || numLines < 0) {
                    return createNullEditorResponse(true)
                }

                const snippetResult = activeEditor.getSnippet(numLines)
                if (!snippetResult) {
                    return createNullEditorResponse(true)
                }

                return {
                    snippet: snippetResult.snippet,
                    filePath: activeEditor.getFilePath(),
                    language: activeEditor.getLanguage(),
                    cursorLine: snippetResult.cursorLine
                }
            } catch (err: any) {
                return createNullEditorResponse(true)
            }
        }
    }
})

