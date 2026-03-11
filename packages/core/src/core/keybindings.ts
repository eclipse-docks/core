/**
 * Key Binding Manager for geo!space
 *
 * Handles keyboard shortcuts and binds them to commands.
 * Supports standard modifiers: CTRL, ALT, SHIFT, META (CMD on Mac)
 */

import logger from "./logger";
import { subscribe } from "./events";
import { commandRegistry, TOPIC_COMMAND_REGISTERED } from "./commandregistry";
import { rootContext } from "./di";

import type { Command } from "./commandregistry";

export type ModifierField = 'ctrl' | 'alt' | 'shift' | 'meta';

export interface KeyBinding {
    commandId: string;
    key: string;
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
    meta?: boolean;
}

const MODIFIER_FIELDS: ModifierField[] = ['alt', 'ctrl', 'meta', 'shift'];

const MODIFIER_ALIASES: Record<string, ModifierField> = {
    CTRL: 'ctrl', CONTROL: 'ctrl',
    ALT: 'alt', OPTION: 'alt',
    SHIFT: 'shift',
    META: 'meta', CMD: 'meta', COMMAND: 'meta', WIN: 'meta', WINDOWS: 'meta',
};

const MODIFIER_DISPLAY: Record<ModifierField, string> = {
    ctrl: 'Ctrl', alt: 'Alt', shift: 'Shift', meta: 'Cmd',
};

const KEY_NORMALIZE: Record<string, string> = {
    SPACE: ' ', ESC: 'ESCAPE', RETURN: 'ENTER',
    LEFT: 'ARROWLEFT', RIGHT: 'ARROWRIGHT', UP: 'ARROWUP', DOWN: 'ARROWDOWN',
    DEL: 'DELETE', INS: 'INSERT', PAGEUP: 'PAGEUP', PAGEDOWN: 'PAGEDOWN',
};

const KNOWN_MODIFIERS = new Set<string>(Object.keys(MODIFIER_ALIASES));

function normalizeKey(key: string): string {
    return KEY_NORMALIZE[key] ?? key;
}

export class KeyBindingManager {
    private bindings: Map<string, KeyBinding[]> = new Map();
    private enabled: boolean = true;

    constructor() {
        document.addEventListener('keydown', this.handleKeyDown.bind(this), true);
        this.registerExistingCommandBindings();
        subscribe(TOPIC_COMMAND_REGISTERED, (command: Command) => {
            if (command.keyBinding) {
                this.registerKeyBinding(command.id, command.keyBinding);
            }
        });
    }

    private registerExistingCommandBindings() {
        const commands = commandRegistry.listCommands();
        Object.values(commands).forEach((command: Command) => {
            if (command.keyBinding) {
                this.registerKeyBinding(command.id, command.keyBinding);
            }
        });
    }

    /**
     * Parse a key binding string like "CTRL+SHIFT+P" or "ALT+S"
     */
    parseKeyBinding(keyBindingString: string): KeyBinding | null {
        if (!keyBindingString || keyBindingString.trim() === '') {
            return null;
        }

        const parts = keyBindingString.toUpperCase().split('+').map(p => p.trim());
        if (parts.length === 0) {
            return null;
        }

        const key = parts[parts.length - 1];
        const modifiers = parts.slice(0, -1);
        if (parts.length === 1 && KNOWN_MODIFIERS.has(key)) {
            return null;
        }

        const binding: Partial<KeyBinding> = { ctrl: false, alt: false, shift: false, meta: false };
        for (const modifier of modifiers) {
            const field = MODIFIER_ALIASES[modifier];
            if (field === undefined) return null;
            binding[field] = true;
        }
        binding.key = normalizeKey(key);
        return binding as KeyBinding;
    }

    /**
     * Create a unique key for a binding
     */
    private getBindingKey(binding: KeyBinding): string {
        const parts = [...MODIFIER_FIELDS.filter(f => binding[f]), binding.key.toUpperCase()];
        return parts.join('+');
    }

    /**
     * Register a key binding for a command
     */
    registerKeyBinding(commandId: string, keyBindingString: string): boolean {
        const binding = this.parseKeyBinding(keyBindingString);
        
        if (!binding) {
            logger.error(`Invalid key binding: ${keyBindingString}`);
            return false;
        }

        binding.commandId = commandId;
        
        const bindingKey = this.getBindingKey(binding);
        
        if (!this.bindings.has(bindingKey)) {
            this.bindings.set(bindingKey, []);
        }
        
        const existing = this.bindings.get(bindingKey)!;
        const sameCommand = existing.find(b => b.commandId === commandId);
        if (sameCommand) {
            logger.error(`Key binding ${keyBindingString} already registered for command ${commandId}`);
            return false;
        }
        const otherCommand = existing.find(b => b.commandId !== commandId);
        if (otherCommand) {
            logger.warn(`Key binding ${keyBindingString} already used by command ${otherCommand.commandId}; refusing for ${commandId}`);
            return false;
        }

        existing.push(binding);
        return true;
    }

    /**
     * Unregister a key binding
     */
    unregisterKeyBinding(commandId: string, keyBindingString?: string): void {
        if (keyBindingString) {
            const binding = this.parseKeyBinding(keyBindingString);
            if (binding) {
                const bindingKey = this.getBindingKey(binding);
                const bindings = this.bindings.get(bindingKey);
                if (bindings) {
                    const filtered = bindings.filter(b => b.commandId !== commandId);
                    if (filtered.length === 0) {
                        this.bindings.delete(bindingKey);
                    } else {
                        this.bindings.set(bindingKey, filtered);
                    }
                }
            }
        } else {
            // Remove all bindings for this command
            for (const [key, bindings] of this.bindings.entries()) {
                const filtered = bindings.filter(b => b.commandId !== commandId);
                if (filtered.length === 0) {
                    this.bindings.delete(key);
                } else {
                    this.bindings.set(key, filtered);
                }
            }
        }
    }

    /**
     * Get all key bindings for a command
     */
    getKeyBindingsForCommand(commandId: string): string[] {
        const result: string[] = [];
        for (const bindings of this.bindings.values()) {
            for (const binding of bindings) {
                if (binding.commandId === commandId) {
                    result.push(this.formatKeyBinding(binding));
                }
            }
        }
        return result.sort();
    }

    /**
     * Format a key binding for display
     */
    formatKeyBinding(binding: KeyBinding): string {
        const parts = MODIFIER_FIELDS.filter(f => binding[f]).map(f => MODIFIER_DISPLAY[f]);
        const key = binding.key.length === 1
            ? binding.key.toUpperCase()
            : binding.key.charAt(0).toUpperCase() + binding.key.slice(1).toLowerCase();
        parts.push(key);
        return parts.join('+');
    }

    /**
     * Handle keyboard events
     */
    private handleKeyDown(event: KeyboardEvent): void {
        if (!this.enabled) {
            return;
        }
        // event.key can be empty or layout-specific with some IMEs or dead keys
        const eventBinding: KeyBinding = {
            commandId: '',
            key: normalizeKey(event.key.toUpperCase()),
            ctrl: event.ctrlKey,
            alt: event.altKey,
            shift: event.shiftKey,
            meta: event.metaKey
        };
        const bindingKey = this.getBindingKey(eventBinding);
        const bindings = this.bindings.get(bindingKey);

        if (bindings && bindings.length > 0) {
            const binding = bindings[0];
            try {
                event.preventDefault();
                event.stopPropagation();
                const context = commandRegistry.createExecutionContext({});
                commandRegistry.execute(binding.commandId, context);
                logger.debug(`Executed command via key binding: ${binding.commandId}`);
            } catch (error: any) {
                logger.error(`Failed to execute command ${binding.commandId}: ${error.message}`);
            }
        }
    }

    /**
     * Enable or disable key binding handling
     */
    setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    /**
     * Check if key binding handling is enabled
     */
    isEnabled(): boolean {
        return this.enabled;
    }

    /**
     * Get all registered key bindings
     */
    getAllBindings(): Map<string, KeyBinding[]> {
        const copy = new Map<string, KeyBinding[]>();
        for (const [key, bindings] of this.bindings) {
            copy.set(key, [...bindings]);
        }
        return copy;
    }

    /**
     * Clear all key bindings
     */
    clearAll(): void {
        this.bindings.clear();
    }
}

export const keyBindingManager = new KeyBindingManager();
rootContext.put("keyBindingManager", keyBindingManager);

