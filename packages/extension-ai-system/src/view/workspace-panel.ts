import { css, customElement, html, LitElement, property, repeat, state, when } from '@eclipse-docks/core/externals/lit';
import type { Artifact, ArtifactType } from '../core/types';

const ARTIFACT_TYPE_ICON: Record<ArtifactType, string> = {
    code: 'code',
    json: 'brackets-curly',
    'file-list': 'list',
    plan: 'diagram-project',
    review: 'magnifying-glass',
    text: 'file-lines'
};

@customElement('docks-ai-workspace-panel')
export class AIWorkspacePanel extends LitElement {
    @property({ type: Array, attribute: false })
    public artifacts: Artifact[] = [];

    @state()
    private expanded = false;

    @state()
    private selectedArtifact?: Artifact;

    render() {
        if (this.artifacts.length === 0) return html``;

        return html`
            <div class="workspace-panel">
                <div class="panel-header" @click="${() => { this.expanded = !this.expanded; this.selectedArtifact = undefined; }}">
                    <wa-icon name="folder-open" label="Workspace"></wa-icon>
                    <span class="panel-title">Workspace</span>
                    <span class="count-badge">${this.artifacts.length} artifact${this.artifacts.length !== 1 ? 's' : ''}</span>
                    <wa-icon name="${this.expanded ? 'chevron-up' : 'chevron-down'}" label="toggle"></wa-icon>
                </div>
                ${when(this.expanded, () => html`
                    <div class="panel-body">
                        <div class="artifact-list">
                            ${repeat(this.artifacts, a => a.id, (artifact) => html`
                                <div
                                    class="artifact-item ${this.selectedArtifact?.id === artifact.id ? 'selected' : ''}"
                                    @click="${() => { this.selectedArtifact = this.selectedArtifact?.id === artifact.id ? undefined : artifact; }}">
                                    <wa-icon name="${ARTIFACT_TYPE_ICON[artifact.type] ?? 'file-lines'}" label="${artifact.type}"></wa-icon>
                                    <div class="artifact-meta">
                                        <span class="artifact-id">${artifact.id}</span>
                                        <span class="artifact-producer">by ${artifact.producedBy}</span>
                                    </div>
                                    <span class="artifact-type">${artifact.type}</span>
                                </div>
                                ${when(this.selectedArtifact?.id === artifact.id, () => html`
                                    <div class="artifact-content">
                                        <pre>${artifact.content}</pre>
                                    </div>
                                `)}
                            `)}
                        </div>
                    </div>
                `)}
            </div>
        `;
    }

    static styles = css`
        :host { display: block; }

        .workspace-panel {
            border: solid var(--wa-border-width-s) var(--wa-color-neutral-border-subtle);
            border-radius: var(--wa-border-radius-m);
            background: var(--wa-color-surface-default);
            margin: 0.5rem 0;
        }

        .panel-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 0.75rem;
            cursor: pointer;
            user-select: none;
        }

        .panel-title { font-weight: 500; }

        .count-badge {
            font-size: 0.8rem;
            color: var(--wa-color-text-quiet);
            margin-left: auto;
        }

        .panel-body {
            border-top: solid var(--wa-border-width-s) var(--wa-color-neutral-border-subtle);
        }

        .artifact-list { display: flex; flex-direction: column; }

        .artifact-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.4rem 0.75rem;
            cursor: pointer;
        }

        .artifact-item:hover { background: var(--wa-color-surface-lowered); }
        .artifact-item.selected { background: var(--wa-color-brand-fill-quiet); }

        .artifact-meta {
            display: flex;
            flex-direction: column;
            flex: 1;
            min-width: 0;
        }

        .artifact-id {
            font-size: 0.85rem;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .artifact-producer {
            font-size: 0.75rem;
            color: var(--wa-color-text-quiet);
        }

        .artifact-type {
            font-size: 0.75rem;
            padding: 0.1rem 0.3rem;
            background: var(--wa-color-surface-lowered);
            border-radius: var(--wa-border-radius-s);
        }

        .artifact-content {
            padding: 0.5rem 0.75rem;
            border-top: solid var(--wa-border-width-s) var(--wa-color-neutral-border-subtle);
            background: var(--wa-color-surface-lowered);
        }

        .artifact-content pre {
            margin: 0;
            white-space: pre-wrap;
            word-break: breaword;
            font-size: 0.8rem;
            max-height: 200px;
            overflow-y: auto;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-ai-workspace-panel': AIWorkspacePanel;
    }
}
