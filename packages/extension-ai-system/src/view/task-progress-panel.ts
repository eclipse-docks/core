import { css, customElement, html, LitElement, property, repeat, state, when } from '@eclipse-docks/core/externals/lit';
import type { TaskPlan, TaskStep, StepStatus } from '../core/types';

const STATUS_ICON: Record<StepStatus, string> = {
    running: 'spinner',
    completed: 'check-circle',
    failed: 'exclamation-circle',
    skipped: 'forward',
    pending: 'circle'
};

const STATUS_COLOR: Record<StepStatus, string> = {
    running: 'var(--wa-color-brand-50)',
    completed: 'var(--wa-color-success-60)',
    failed: 'var(--wa-color-danger-60)',
    skipped: 'var(--wa-color-neutral-40)',
    pending: 'var(--wa-color-neutral-40)'
};

@customElement('docks-ai-task-progress-panel')
export class AITaskProgressPanel extends LitElement {
    @property({ type: Object, attribute: false })
    public plan?: TaskPlan;

    @state()
    private expanded = true;

    render() {
        if (!this.plan) return html``;

        const completedCount = this.plan.steps.filter(s => s.status === 'completed').length;
        const totalCount = this.plan.steps.length;
        const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

        return html`
            <div class="taspanel">
                <div class="panel-header" @click="${() => { this.expanded = !this.expanded; }}">
                    <wa-icon name="diagram-project" label="Task Plan"></wa-icon>
                    <span class="panel-title">Task Plan</span>
                    <span class="progress-text">${completedCount}/${totalCount}</span>
                    <wa-progress-bar value="${progress}" class="progress-bar"></wa-progress-bar>
                    <wa-icon name="${this.expanded ? 'chevron-up' : 'chevron-down'}" label="toggle"></wa-icon>
                </div>
                ${when(this.expanded, () => html`
                    <div class="panel-body">
                        ${repeat(this.plan!.steps, s => s.id, (step) => html`
                            <div class="step-row">
                                <wa-icon
                                    name="${STATUS_ICON[step.status] ?? 'circle'}"
                                    style="color: ${STATUS_COLOR[step.status] ?? 'var(--wa-color-neutral-40)'}; ${step.status === 'running' ? 'animation: spin 1s linear infinite;' : ''}">
                                </wa-icon>
                                <div class="step-info">
                                    <span class="step-role">${step.role}</span>
                                    <span class="step-task">${step.subTask}</span>
                                </div>
                                ${when(step.revisions > 0, () => html`
                                    <span class="revisions-badge">${step.revisions} rev</span>
                                `)}
                            </div>
                        `)}
                    </div>
                `)}
            </div>
        `;
    }

    static styles = css`
        :host { display: block; }

        .taspanel {
            border: solid var(--wa-border-width-s) var(--wa-color-brand-border-quiet);
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

        .panel-title {
            font-weight: 500;
            flex: 0 0 auto;
        }

        .progress-text {
            font-size: 0.8rem;
            color: var(--wa-color-text-quiet);
        }

        .progress-bar {
            flex: 1;
            min-width: 60px;
        }

        .panel-body {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            padding: 0.5rem 0.75rem;
            border-top: solid var(--wa-border-width-s) var(--wa-color-neutral-border-subtle);
        }

        .step-row {
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
            padding: 0.25rem 0;
        }

        .step-info {
            display: flex;
            flex-direction: column;
            gap: 0.125rem;
            flex: 1;
            min-width: 0;
        }

        .step-role {
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--wa-color-text-quiet);
            text-transform: uppercase;
        }

        .step-task {
            font-size: 0.85rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .revisions-badge {
            font-size: 0.7rem;
            padding: 0.1rem 0.3rem;
            background: var(--wa-color-warning-fill-quiet);
            border-radius: var(--wa-border-radius-s);
            color: var(--wa-color-warning-70);
            flex-shrink: 0;
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-ai-task-progress-panel': AITaskProgressPanel;
    }
}
