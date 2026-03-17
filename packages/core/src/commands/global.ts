import { registerAll } from "../core/commandregistry";
import { CommandContribution } from "../core/contributionregistry";
import { TOOLBAR_MAIN_RIGHT } from "../core/constants";
import { EditorInput, editorRegistry } from "../core/editorregistry";
import { html } from "lit";
import { toastError, toastInfo } from "../core/toast";
import { activeEditorSignal, activePartSignal } from "../core/appstate";
import { appSettings } from "../core/settingsservice";
import { extensionRegistry } from "../core/extensionregistry";
import type { Extension } from "../core/extensionregistry";
import { marketplaceRegistry } from "../core/marketplaceregistry";
import "./files";
import "./version-info";

registerAll({
    command: {
        "id": "save",
        "name": "Save editor",
        "description": "Saves the active/focused editor",
        "keyBinding": "CTRL+S",
        "parameters": []
    },
    handler: {
        execute: async context => {
            const part = context.activeEditor || context.activePart
            if (part && part.isDirty()) {
                part.save()
            }
        }
    },
    contribution: {
        target: "toolbar:.system.editors",
        icon: "floppy-disk",
        label: "Save active editor",
        slot: "start",
        disabled: () => {
            const editor = activeEditorSignal.get()
            return !editor || !editor.isDirty()
        }
    } as CommandContribution
})

const THEME_SETTINGS_KEY = "theme"

async function applyTheme(themeClass: 'wa-dark' | 'wa-light'): Promise<void> {
    const root = document.documentElement
    root.classList.remove('wa-dark', 'wa-light')
    root.classList.add(themeClass)
}

async function loadTheme(): Promise<void> {
    const theme = await appSettings.get(THEME_SETTINGS_KEY)
    await applyTheme(theme || 'wa-dark')
}

async function saveTheme(themeClass: 'wa-dark' | 'wa-light'): Promise<void> {
    await appSettings.set(THEME_SETTINGS_KEY, themeClass)
}

registerAll({
    command: {
        "id": "switch_theme",
        "name": "Switch theme",
        "description": "Switches between dark and light theme",
        "parameters": []
    },
    handler: {
        execute: async _context => {
            const isDark = document.documentElement.classList.contains("wa-dark")
            const newTheme = isDark ? 'wa-light' : 'wa-dark'
            await applyTheme(newTheme)
            await saveTheme(newTheme)
        }
    },
    contribution: {
        target: TOOLBAR_MAIN_RIGHT,
        icon: "circle-half-stroke",
        label: "Theme Switcher",
    }
})

// Load theme on module initialization
loadTheme().catch(err => {
    console.error('Failed to load theme preference:', err)
})

registerAll({
    command: {
        "id": "fullscreen",
        "name": "Toggle fullscreen",
        "description": "Toggles fullscreen mode",
        "parameters": []
    },
    handler: {
        execute: async _context => {
            if (document.fullscreenElement === document.body) {
                await document.exitFullscreen()
            } else {
                await document.body.requestFullscreen()
            }
        }
    },
    contribution: {
        target: TOOLBAR_MAIN_RIGHT,
        icon: "expand",
        label: "Fullscreen",
    }
})

registerAll({
    command: {
        "id": "open_extensions",
        "name": "Open Extensions",
        "description": "Opens the extensions registry",
        "parameters": []
    },
    handler: {
        execute: _context => {
            const editorInput: EditorInput = {
                title: "Extensions",
                data: {},
                key: "system.extensions",
                icon: "puzzle-piece",
                state: {},
                noOverflow: true,
                component: () => html`<lyra-extensions></lyra-extensions>`,
            }
            editorRegistry.loadEditor(editorInput, "extensions-editor").then()
        }
    },
    contribution: {
        target: TOOLBAR_MAIN_RIGHT,
        icon: "puzzle-piece",
        label: "Open Extensions",
    }
})

registerAll({
    command: {
        "id": "list_extensions",
        "name": "List extensions",
        "description": "Lists all available extensions with their status (enabled/disabled)",
        "parameters": [],
        "output": [
            {
                "name": "extensions",
                "description": "array of extension objects with id, name, description, experimental flag, and enabled status"
            }
        ]
    },
    handler: {
        execute: async (_context: any) => {
            const extensions = extensionRegistry.getExtensions().map((e: Extension) => {
                return {
                    id: e.id,
                    name: e.name,
                    description: e.description,
                    experimental: e.experimental,
                    enabled: extensionRegistry.isEnabled(e.id)
                }
            });
            return extensions;
        }
    }
})

registerAll({
    command: {
        "id": "toast_message",
        "name": "Toast message to user",
        "description": "Shows a toast message",
        "parameters": [
            {
                "name": "message",
                "description": "the message to toast",
                "required": true
            },
            {
                "name": "type",
                "description": "the toast type: info (default), or error",
                "required": false
            }
        ]
    },
    handler: {
        execute: ({ params: { message, type } }: any) => {
            if (!message) {
                return
            }
            if (type === "error") {
                toastError(message)
            } else {
                toastInfo(message)
            }
        }
    }
})

