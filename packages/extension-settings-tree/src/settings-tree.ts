import { customElement, state, property } from "lit/decorators.js";
import { css, html, TemplateResult } from "lit";
import { PropertyValues } from "lit";
import { createRef, ref } from "lit/directives/ref.js";
import { repeat } from "lit/directives/repeat.js";
import { DocksPart, icon } from "@eclipse-docks/core";
import type { EditorInput } from "@eclipse-docks/core";
import { appSettings, TOPIC_SETTINGS_CHANGED } from "@eclipse-docks/core";
import type { SettingsJsonSchema } from "@eclipse-docks/core";
import { subscribe } from "@eclipse-docks/core";
import { promptDialog } from "@eclipse-docks/core";
import type { SettingsCategoryInfo } from "@eclipse-docks/core";

interface CategoryTreeNode {
    path: string;
    label: string;
    children: CategoryTreeNode[];
    expanded: boolean;
}

interface SettingRow {
    key: string;
    path: string;
    title: string;
    description: string;
    schema?: SettingsJsonSchema;
    value: unknown;
    parentPath?: string;
    groupLabel?: string;
}

@customElement('docks-settings-tree')
export class DocksSettingsTree extends DocksPart {
    @property({ attribute: false })
    public input?: EditorInput;

    @state()
    private settings: Record<string, unknown> = {};

    @state()
    private categoryTree: CategoryTreeNode[] = [];

    @state()
    private selectedPath: string | null = null;

    @state()
    private detailRows: SettingRow[] = [];

    @state()
    private detailTitle = '';

    @state()
    private searchQuery = '';

    private detailForPath: string | null = null;

    private treeRef = createRef<HTMLElement>();

    protected async doInitUI() {
        await this.loadSettings();
        subscribe(TOPIC_SETTINGS_CHANGED, () => this.loadSettings());
    }

    private async loadSettings() {
        if (this.isDirty()) return;
        this.settings = (await appSettings.getAll()) ?? {};
        this.buildCategoryTree();
        if (this.selectedPath) {
            this.updateDetailForPath(this.selectedPath);
        }
    }

    private buildCategoryTree(): void {
        const categories = appSettings.getCategories();
        const schemaIds = new Set(categories.map((c: SettingsCategoryInfo) => c.id));
        const nodes: CategoryTreeNode[] = [];

        for (const cat of categories) {
            const childSchema = cat.schema?.properties;
            const value = this.settings[cat.id];
            const children = this.buildChildNodes(`${cat.id}`, childSchema, value);
            const label = (cat.schema?.title as string) ?? cat.label;
            if (this.matchesSearch(label, cat.id)) {
                nodes.push({
                    path: cat.id,
                    label,
                    children,
                    expanded: true,
                });
            }
        }

        for (const key of Object.keys(this.settings)) {
            if (schemaIds.has(key)) continue;
            const value = this.settings[key];
            const children = this.buildChildNodes(key, undefined, value);
            if (this.matchesSearch(key, key)) {
                nodes.push({
                    path: key,
                    label: key,
                    children,
                    expanded: true,
                });
            }
        }

        this.categoryTree = nodes;
    }

    private buildChildNodes(
        parentPath: string,
        schemaProps: Record<string, SettingsJsonSchema> | undefined,
        value: unknown
    ): CategoryTreeNode[] {
        const children: CategoryTreeNode[] = [];
        if (schemaProps) {
            for (const [k, s] of Object.entries(schemaProps)) {
                const path = `${parentPath}.${k}`;
                const label = (s?.title as string) ?? k;
                const subValue = DocksSettingsTree.isRecord(value) ? value[k] : undefined;
                const subChildren = this.buildChildNodes(path, s?.properties, subValue);
                if (this.matchesSearch(label, path)) {
                    children.push({ path, label, children: subChildren, expanded: false });
                }
            }
        }
        if (DocksSettingsTree.isRecord(value) && !schemaProps) {
            for (const [k, v] of Object.entries(value)) {
                const path = `${parentPath}.${k}`;
                const subChildren = this.buildChildNodes(path, undefined, v);
                if (this.matchesSearch(k, path)) {
                    children.push({ path, label: k, children: subChildren, expanded: false });
                }
            }
        }
        return children;
    }

    private matchesSearch(label: string, path: string): boolean {
        if (!this.searchQuery.trim()) return true;
        const q = this.searchQuery.toLowerCase();
        return label.toLowerCase().includes(q) || path.toLowerCase().includes(q);
    }

    private static isRecord(v: unknown): v is Record<string, unknown> {
        return v !== null && typeof v === 'object' && !Array.isArray(v);
    }

    private refreshAfterEdit(): void {
        this.markDirty(true);
        if (this.selectedPath) this.updateDetailForPath(this.selectedPath);
    }

    private getValueAtPath(path: string): unknown {
        const parts = path.split('.').filter(Boolean);
        if (parts.length === 0) return this.settings;
        let current: unknown = this.settings;
        for (const part of parts) {
            if (current === null || current === undefined || typeof current !== 'object') return undefined;
            current = (current as Record<string, unknown>)[part];
        }
        return current;
    }

    private setAtInMemory(path: string, value: unknown): void {
        const parts = path.split('.').filter(Boolean);
        if (parts.length === 0) return;
        this.settings = this.deepSet(this.settings as Record<string, unknown>, parts, value) as Record<string, unknown>;
    }

    private deepSet(obj: Record<string, unknown> | unknown[], pathParts: string[], value: unknown): Record<string, unknown> | unknown[] {
        if (pathParts.length === 1) {
            const key = pathParts[0];
            if (Array.isArray(obj)) {
                const idx = parseInt(key, 10);
                if (isNaN(idx) || idx < 0) return obj;
                const arr = [...obj];
                arr[idx] = value;
                return arr;
            }
            return { ...(obj as Record<string, unknown>), [key]: value };
        }
        const [head, ...rest] = pathParts;
        if (Array.isArray(obj)) {
            const idx = parseInt(head, 10);
            if (isNaN(idx) || idx < 0) return obj;
            const arr = [...obj];
            const current = arr[idx];
            const next = current !== null && typeof current === 'object'
                ? (current as Record<string, unknown> | unknown[])
                : {};
            arr[idx] = this.deepSet(next as Record<string, unknown>, rest, value);
            return arr;
        }
        const o = obj as Record<string, unknown>;
        const current = o[head];
        const next = current !== null && typeof current === 'object'
            ? (current as Record<string, unknown> | unknown[])
            : {};
        return { ...o, [head]: this.deepSet(next as Record<string, unknown>, rest, value) };
    }

    private getArrayItemLabel(item: unknown, index: number): string {
        if (DocksSettingsTree.isRecord(item)) {
            if (typeof item.id === 'string') return item.id;
            if (typeof item.name === 'string') return item.name;
        }
        return `Item ${index}`;
    }

    private async updateDetailForPath(path: string): Promise<void> {
        const containerSchema = appSettings.getSchemaForSettingKey(path);
        const containerValue = this.getValueAtPath(path);
        const valueObj = DocksSettingsTree.isRecord(containerValue) ? containerValue : null;
        const isArray = Array.isArray(containerValue);

        let rows: SettingRow[];

        if (isArray) {
            const arr = containerValue as unknown[];
            const flat: SettingRow[] = [];
            arr.forEach((item, index) => {
                const subPath = `${path}.${index}`;
                const groupLabel = this.getArrayItemLabel(item, index);
                if (DocksSettingsTree.isRecord(item)) {
                    Object.keys(item).forEach(k => {
                        flat.push({
                            key: k,
                            path: `${subPath}.${k}`,
                            title: k,
                            description: '',
                            schema: undefined,
                            value: item[k],
                            parentPath: subPath,
                            groupLabel,
                        });
                    });
                } else {
                    flat.push({
                        key: String(index),
                        path: subPath,
                        title: groupLabel,
                        description: `Array element ${index}.`,
                        schema: undefined,
                        value: item,
                        parentPath: path,
                        groupLabel,
                    });
                }
            });
            rows = flat;
        } else if (valueObj !== null) {
            const schemaProps = containerSchema?.properties;
            const keys = schemaProps ? Object.keys(schemaProps) : Object.keys(valueObj);
            rows = keys.map(key => {
                const subPath = `${path}.${key}`;
                const propSchema = schemaProps?.[key];
                const value = valueObj[key];
                return {
                    key,
                    path: subPath,
                    title: (propSchema?.title as string) ?? key,
                    description: (propSchema?.description as string) ?? '',
                    schema: propSchema,
                    value,
                    parentPath: path,
                };
            });
        } else if (containerValue !== undefined && containerValue !== null && typeof containerValue !== 'object') {
            const segment = path.split('.').pop() ?? path;
            rows = [{
                key: segment,
                path,
                title: segment,
                description: 'Edit value (no schema).',
                schema: undefined,
                value: containerValue,
            }];
        } else {
            rows = [];
        }
        rows.forEach(r => { if (r.title === undefined) r.title = r.key; });

        if (this.selectedPath !== path) return;

        const category = appSettings.getCategories().find((c: SettingsCategoryInfo) => c.id === path);
        this.detailForPath = path;
        this.detailTitle = (category?.label ?? (containerSchema?.title as string)) ?? path;
        this.detailRows = rows;
    }

    private selectPath(path: string) {
        this.selectedPath = path;
        this.updateDetailForPath(path);
    }

    protected updated(changedProperties: PropertyValues) {
        super.updated?.(changedProperties);
        if (changedProperties.has('selectedPath') && this.selectedPath !== this.detailForPath) {
            if (this.selectedPath) this.updateDetailForPath(this.selectedPath);
            else {
                this.detailForPath = null;
                this.detailRows = [];
                this.detailTitle = '';
            }
        }
    }

    private setRowValue(row: SettingRow, value: unknown): void {
        this.setAtInMemory(row.path, value);
        this.refreshAfterEdit();
    }

    private setRowValueFromJson(row: SettingRow, raw: string): void {
        try {
            this.setRowValue(row, JSON.parse(raw));
        } catch {
            this.refreshAfterEdit();
        }
    }

    private renameKey(parentPath: string, oldKey: string, newKey: string): void {
        if (newKey.trim() === '' || newKey === oldKey) return;
        const parent = this.getValueAtPath(parentPath);
        if (!DocksSettingsTree.isRecord(parent)) return;
        const value = parent[oldKey];
        const updated = { ...parent };
        delete updated[oldKey];
        updated[newKey.trim()] = value;
        this.setAtInMemory(parentPath, updated);
        this.refreshAfterEdit();
    }

    private deleteKey(parentPath: string, key: string): void {
        const parent = this.getValueAtPath(parentPath);
        if (!DocksSettingsTree.isRecord(parent)) return;
        const updated = { ...parent };
        delete updated[key];
        this.setAtInMemory(parentPath, updated);
        this.refreshAfterEdit();
    }

    private async addKeyToGroup(groupParentPath: string): Promise<void> {
        const key = await promptDialog('New key name:', '');
        if (!key?.trim()) return;
        this.setAtInMemory(`${groupParentPath}.${key.trim()}`, null);
        this.refreshAfterEdit();
    }

    private deleteTopLevelKey(key: string): void {
        if (!(key in this.settings)) return;
        const updated = { ...this.settings };
        delete updated[key];
        this.settings = updated;
        this.markDirty(true);
        if (this.selectedPath === key) {
            this.selectedPath = null;
            this.detailForPath = null;
            this.detailRows = [];
            this.detailTitle = '';
        }
        this.buildCategoryTree();
        if (this.selectedPath) this.updateDetailForPath(this.selectedPath);
    }

    private renderDetailControl(row: SettingRow): TemplateResult {
        const schema = row.schema;
        const type = schema?.type;
        const enumValues = schema?.enum;
        const current = row.value;

        if (enumValues && Array.isArray(enumValues) && enumValues.length > 0) {
            const options = enumValues.map(v => String(v));
            const value = current !== undefined && current !== null ? String(current) : (schema?.default !== undefined ? String(schema.default) : options[0]);
            return html`
                <wa-select
                    value=${value}
                    @change=${(e: Event) => this.setRowValue(row, (e.target as HTMLSelectElement).value)}
                    size="small">
                    ${options.map(opt => html`<wa-option value=${opt}>${opt}</wa-option>`)}
                </wa-select>
            `;
        }

        if (type === 'boolean') {
            const checked = current === true || (current === undefined && schema?.default === true);
            return html`
                <wa-switch
                    ?checked=${checked}
                    @change=${(e: Event) => this.setRowValue(row, (e.target as HTMLInputElement).checked)}
                    size="small">
                </wa-switch>
            `;
        }

        if (type === 'number') {
            const num = typeof current === 'number' ? current : (typeof schema?.default === 'number' ? schema.default : 0);
            return html`
                <wa-number-input
                    .value=${String(num)}
                    @change=${(e: Event) => this.setRowValue(row, Number((e.target as HTMLInputElement).value))}
                    size="small">
                </wa-number-input>
            `;
        }

        const isObjectOrArray = current !== null && typeof current === 'object';
        if (isObjectOrArray && !schema && DocksSettingsTree.isRecord(current)) {
            return this.renderObjectFields(row.path, current, 0);
        }
        if (isObjectOrArray) {
            const str = JSON.stringify(current, null, 2);
            return html`
                <wa-textarea
                    .value=${str}
                    @blur=${(e: Event) => this.setRowValueFromJson(row, (e.target as HTMLTextAreaElement).value)}
                    rows="3">
                </wa-textarea>
            `;
        }
        return this.renderPrimitiveControl(row, current);
    }

    private renderPrimitiveControl(row: SettingRow, current: unknown): TemplateResult {
        const str = current !== undefined && current !== null ? String(current) : '';
        if (typeof current === 'boolean') {
            return html`
                <wa-switch
                    ?checked=${current}
                    @change=${(e: Event) => this.setRowValue(row, (e.target as HTMLInputElement).checked)}
                    size="small">
                </wa-switch>
            `;
        }
        if (typeof current === 'number') {
            return html`
                <wa-number-input
                    .value=${String(current)}
                    @change=${(e: Event) => this.setRowValue(row, Number((e.target as HTMLInputElement).value))}
                    size="small">
                </wa-number-input>
            `;
        }
        return html`
                <wa-input
                .value=${str}
                @input=${(e: Event) => this.setRowValue(row, (e.target as HTMLInputElement).value)}
                size="small">
            </wa-input>
        `;
    }

    private renderObjectFields(parentPath: string, obj: Record<string, unknown>, depth: number): TemplateResult {
        const maxDepth = 2;
        if (depth >= maxDepth) {
            const str = JSON.stringify(obj, null, 2);
            const row: SettingRow = { key: '', path: parentPath, title: '', description: '', value: obj };
            return html`
                <wa-textarea
                    .value=${str}
                    @blur=${(e: Event) => this.setRowValueFromJson(row, (e.target as HTMLTextAreaElement).value)}
                    rows="3">
                </wa-textarea>
            `;
        }
        const entries = Object.entries(obj);
        return html`
            <div class="nested-object" >
                ${entries.map(([k, v]) => {
                    const subPath = `${parentPath}.${k}`;
                    const subRow: SettingRow = { key: k, path: subPath, title: k, description: '', value: v, parentPath };
                    const isNestedObj = DocksSettingsTree.isRecord(v);
                    const isArray = Array.isArray(v);
                    return html`
                        <div class="nested-row">
                            <wa-input
                                .value=${k}
                                size="small"
                                style="width: 140px;"
                                @blur=${(e: Event) => {
                                    const newKey = (e.target as HTMLInputElement).value.trim();
                                    if (newKey && newKey !== k) this.renameKey(parentPath, k, newKey);
                                }}>
                            </wa-input>
                            <span class="nested-sep">:</span>
                            ${isNestedObj
                                ? this.renderObjectFields(subPath, v as Record<string, unknown>, depth + 1)
                                : isArray
                                    ? html`
                                        <wa-textarea
                                            .value=${JSON.stringify(v, null, 2)}
                                            rows="2"
                                            style="min-width: 200px;"
                                            @blur=${(e: Event) => this.setRowValueFromJson(subRow, (e.target as HTMLTextAreaElement).value)}>
                                        </wa-textarea>
                                    `
                                    : this.renderPrimitiveControl(subRow, v)}
                        </div>
                    `;
                })}
            </div>
        `;
    }

    private renderDetailPanel(): TemplateResult {
        if (!this.selectedPath) {
            return html`
                <div class="detail-placeholder">
                    ${icon("docks settings", { label: "Settings" })}
                    <p>Select a category from the tree</p>
                </div>
            `;
        }
        if (this.detailForPath !== this.selectedPath) {
            return html`
                <div class="detail-panel">
                    <div class="detail-heading-row">
                        <h2 class="detail-heading">${this.selectedPath}</h2>
                    </div>
                    <div class="detail-placeholder">
                        <p>Loading…</p>
                    </div>
                </div>
            `;
        }

        const filteredRows = this.detailRows.filter(row => {
            if (!this.searchQuery.trim()) return true;
            const q = this.searchQuery.toLowerCase();
            return row.title.toLowerCase().includes(q) || row.description.toLowerCase().includes(q);
        });

        const containerValue = this.selectedPath ? this.getValueAtPath(this.selectedPath) : undefined;
        const isObjectContainer = DocksSettingsTree.isRecord(containerValue);
        const isTopLevel = this.selectedPath !== null && !this.selectedPath.includes('.');
        const canAddToSelection = isObjectContainer || isTopLevel;

        return html`
            <div class="detail-panel">
                <div class="detail-heading-row">
                    <h2 class="detail-heading">${this.detailTitle}</h2>
                    ${canAddToSelection ? html`
                        <docks-command size="small" icon="plus" title="Add setting" .action=${() => this.addKeyToGroup(this.selectedPath!)}>Add</docks-command>
                    ` : ''}
                    ${isTopLevel ? html`
                        <docks-command size="small" icon="trash" title="Delete category" .action=${() => this.deleteTopLevelKey(this.selectedPath!)}></docks-command>
                    ` : ''}
                </div>
                <wa-scroller class="detail-scroller" orientation="vertical">
                    ${filteredRows.length === 0 ? html`
                        <div class="detail-empty">
                            ${this.detailRows.length === 0
                                ? html`<p>No settings in this category. Add keys in the JSON file or register a JSON Schema for this path.</p>`
                                : html`<p>No matching settings for the current search.</p>`}
                        </div>
                    ` : repeat(
                            filteredRows,
                            (row) => row.path,
                            (row, index) => {
                                const prev = index > 0 ? filteredRows[index - 1] : null;
                                const showGroup = row.groupLabel && prev?.groupLabel !== row.groupLabel;
                                const inGroup = !!row.groupLabel;
                                return html`
                                    ${showGroup ? html`
                                        <div class="detail-group-header">
                                            <span>${row.groupLabel}</span>
                                            <docks-command size="small" icon="plus" title="Add setting" .action=${() => this.addKeyToGroup(row.parentPath!)}>Add</docks-command>
                                        </div>
                                    ` : ''}
                                    <div class="setting-row ${inGroup ? 'setting-row-in-group' : ''}">
                                        <div class="setting-meta">
                                            ${row.parentPath != null ? html`
                                                <wa-input
                                                    .value=${row.key}
                                                    size="small"
                                                    class="editable-key setting-control-key"
                                                    @blur=${(e: Event) => {
                                                        const newKey = (e.target as HTMLInputElement).value.trim();
                                                        if (newKey && newKey !== row.key) this.renameKey(row.parentPath!, row.key, newKey);
                                                    }}>
                                                </wa-input>
                                            ` : html`<span class="setting-title">${row.title}</span>`}
                                            ${row.description ? html`<p class="setting-description">${row.description}</p>` : ''}
                                        </div>
                                        <div class="setting-control">${this.renderDetailControl(row)}</div>
                                        ${row.parentPath != null ? html`
                                            <docks-command size="small" icon="trash" title="Delete setting" .action=${() => this.deleteKey(row.parentPath!, row.key)}></docks-command>
                                        ` : ''}
                                    </div>
                                `;
                            }
                        )}
                </wa-scroller>
            </div>
        `;
    }

    private renderCategoryNode(node: CategoryTreeNode): TemplateResult {
        const hasChildren = node.children.length > 0;
        const isSelected = this.selectedPath === node.path;

        return html`
            <wa-tree-item ?expanded=${node.expanded}>
                <div
                    class="tree-node-content ${isSelected ? 'selected' : ''}"
                    @click=${() => this.selectPath(node.path)}
                    role="button"
                    tabindex="0"
                    @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this.selectPath(node.path)}>
                    <span class="tree-node-label">${node.label}</span>
                </div>
                ${hasChildren ? node.children.map(child => this.renderCategoryNode(child)) : ''}
            </wa-tree-item>
        `;
    }

    private setAllExpanded(expanded: boolean) {
        const tree = this.treeRef.value;
        if (tree) {
            tree.querySelectorAll('wa-tree-item').forEach((item: Element) => {
                (item as unknown as { expanded: boolean }).expanded = expanded;
            });
        }
        this.categoryTree = this.categoryTree.map(n => this.setExpanded(n, expanded));
        this.requestUpdate();
    }

    private setExpanded(node: CategoryTreeNode, expanded: boolean): CategoryTreeNode {
        return {
            ...node,
            expanded,
            children: node.children.map(c => this.setExpanded(c, expanded)),
        };
    }

    private async addKey() {
        const key = await promptDialog('Enter new top-level key name:', '');
        if (!key?.trim()) return;
        this.setAtInMemory(key.trim(), null);
        this.markDirty(true);
        this.buildCategoryTree();
    }

    override save() {
        appSettings.setAll(this.settings as Record<string, unknown>).then(() => {
            this.markDirty(false);
        }).catch(err => {
            console.error('Failed to save settings:', err);
        });
    }

    protected renderToolbar() {
        return html`
            <wa-input
                placeholder="Search settings"
                .value=${this.searchQuery}
                @input=${(e: Event) => {
                    this.searchQuery = (e.target as HTMLInputElement).value;
                    this.buildCategoryTree();
                }}
                size="small"
                class="toolbar-search">
            </wa-input>
            <docks-command size="small" icon="plus" title="Add Key" .action=${() => this.addKey()}>Add Key</docks-command>
            <docks-command size="small" icon="chevron-down" title="Expand All" .action=${() => this.setAllExpanded(true)}>Expand All</docks-command>
            <docks-command size="small" icon="chevron-right" title="Collapse All" .action=${() => this.setAllExpanded(false)}>Collapse All</docks-command>
        `;
    }

    protected renderContent() {
        return html`
            <div class="settings-editor-container">
                <wa-split-panel position="25" class="split-panel-fill">
                    <div slot="start" class="left-panel">
                        <wa-scroller class="tree-scroller" orientation="vertical">
                            ${this.categoryTree.length === 0 ? html`
                                <div class="empty-state">
                                    ${icon("docks settings", { label: "Settings" })}
                                    <p>No settings.</p>
                                </div>
                            ` : html`
                                <wa-tree ${ref(this.treeRef)}>
                                    ${this.categoryTree.map(node => this.renderCategoryNode(node))}
                                </wa-tree>
                            `}
                        </wa-scroller>
                    </div>
                    <div slot="end" class="right-panel">
                        ${this.renderDetailPanel()}
                    </div>
                </wa-split-panel>
            </div>
        `;
    }

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .settings-editor-container {
            flex: 1;
            min-height: 0;
            display: flex;
            flex-direction: column;
        }

        .left-panel, .right-panel {
            display: flex;
            flex-direction: column;
            min-height: 0;
            overflow: hidden;
        }

        .tree-scroller, .detail-scroller {
            flex: 1;
            min-height: 0;
        }

        .tree-node-content {
            cursor: pointer;
            user-select: none;
        }

        .tree-node-content.selected {
            font-weight: 600;
        }

        .detail-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            text-align: center;
            padding: 32px;
        }

        .detail-panel {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: hidden;
        }

        .detail-heading-row {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;
            padding: 0 16px;
        }

        .detail-heading {
            margin: 0;
            flex: 1;
        }

        .detail-scroller {
            padding: 0 16px 16px;
        }

        .detail-empty {
            padding: 24px 0;
        }

        .detail-group-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 12px;
            margin-bottom: 4px;
        }

        .detail-group-header:first-child {
            margin-top: 0;
        }

        .nested-row {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 6px;
        }

        .setting-row {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            align-items: flex-start;
            padding: 12px 0;
        }

        .setting-row-in-group {
            padding-left: 20px;
        }

        .setting-meta {
            flex: 0 0 auto;
            min-width: 140px;
        }

        .setting-title {
            font-weight: 600;
            display: block;
            margin-bottom: 4px;
        }

        .setting-control {
            flex: 1;
            min-width: 0;
            display: flex;
        }

        .setting-row command {
            flex-shrink: 0;
        }

        .setting-control wa-input,
        .setting-control wa-textarea,
        .setting-control wa-number-input,
        .setting-control wa-select {
            flex: 1;
            min-width: 0;
            width: 100%;
        }

        .setting-meta .setting-control-key {
            width: 160px;
        }

        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 32px;
            text-align: center;
        }

        .nested-object {
            margin-left: 8px;
            padding-left: 8px;
            border-left: 2px solid var(--wa-color-neutral-85);
        }

        .toolbar-search {
            width: 200px;
            margin-right: 8px;
        }

        .split-panel-fill {
            height: 100%;
        }
    `;
}
