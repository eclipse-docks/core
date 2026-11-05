import { css, html, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { DocksWidget, type DocksFloatingPanel } from '@eclipse-docks/core';
import { howToService } from './howto-service';
import { HowToContribution, HowToStep } from './howto-contribution';
import { subscribe } from '@eclipse-docks/core';
import { commandRegistry } from '@eclipse-docks/core';
import { toastError } from '@eclipse-docks/core';
import { TOPIC_CONTRIBUTEIONS_CHANGED } from '@eclipse-docks/core';
import { HOWTO_CONTRIBUTION_TARGET } from './howto-service';
import { appSettings } from '@eclipse-docks/core';
import { workspaceService, TOPIC_WORKSPACE_CONNECTED } from '@eclipse-docks/core';

// Event topic for showing the HowTo panel
export const TOPIC_SHOW_HOWTO_PANEL = 'howto/show-panel';
export const TOPIC_TOGGLE_HOWTO_PANEL = 'howto/toggle-panel';

// Constants
const SETTINGS_KEY = 'howto-panel';

interface StepState {
    step: HowToStep;
    status: 'pending' | 'active' | 'completed' | 'skipped' | 'failed';
    preConditionMet?: boolean;
    postConditionMet?: boolean;
}

@customElement('docks-howto-panel')
export class DocksHowToPanel extends DocksWidget {
    @state()
    private contributions: HowToContribution[] = [];

    @state()
    private activeContributionId: string | null = null;

    @state()
    private stepStates: Map<string, StepState[]> = new Map();

    @state()
    private isVisible: boolean = false;

    @query('docks-floating-panel')
    private floatingPanel?: DocksFloatingPanel;

    private howtoCleanup?: () => void;

    protected async doBeforeUI() {
        this.loadContributions();
        
        subscribe(TOPIC_CONTRIBUTEIONS_CHANGED, (event: any) => {
            if (event.target === HOWTO_CONTRIBUTION_TARGET) {
                this.loadContributions();
                this.requestUpdate();
            }
        });

        // Subscribe to show/toggle panel events
        subscribe(TOPIC_SHOW_HOWTO_PANEL, () => this.showPanel());
        subscribe(TOPIC_TOGGLE_HOWTO_PANEL, () => this.toggleVisibility());

        // Load position and visibility from dialogsettings
        await this.loadSettings();
        
        // If no workspace is selected and panel wasn't explicitly hidden, show it by default
        const hasWorkspace = workspaceService.isConnected();
        if (!hasWorkspace && this.isVisible === false) {
            // Check if user has explicitly hidden it (if settings exist and visible is false)
            const settings = await appSettings.getDialogSetting(SETTINGS_KEY);
            if (!settings || settings.visible === undefined) {
                // No explicit preference, show panel when no workspace
                this.isVisible = true;
                await this.saveSettings();
            }
        }
        
        // Subscribe to workspace connection to hide panel when workspace is connected (if it was auto-shown)
        subscribe(TOPIC_WORKSPACE_CONNECTED, () => {
            // Only auto-hide if it was auto-shown (no explicit visibility setting)
            const checkAutoHide = async () => {
                const settings = await appSettings.getDialogSetting(SETTINGS_KEY);
                if (!settings || settings.visible === undefined) {
                    // Was auto-shown, can auto-hide when workspace connects
                    // But let's keep it visible - user might want to see howtos even with workspace
                }
            };
            checkAutoHide();
        });
    }

    private loadContributions() {
        this.contributions = howToService.getAllContributions();
    }

    private async loadSettings() {
        const settings = await appSettings.getDialogSetting(SETTINGS_KEY);
        if (settings && settings.visible !== undefined) {
            this.isVisible = settings.visible;
        }
    }

    private async saveSettings() {
        const current = await appSettings.getDialogSetting(SETTINGS_KEY);
        const base = current !== null && typeof current === 'object' ? current : {};
        await appSettings.setDialogSetting(SETTINGS_KEY, {
            ...base,
            visible: this.isVisible,
        });
    }

    private expandPanel(): void {
        if (!this.floatingPanel) return;
        this.floatingPanel.minimized = false;
    }

    private async startHowTo(contributionId: string) {
        const contribution = howToService.getContribution(contributionId);
        if (!contribution) {
            toastError(`HowTo "${contributionId}" not found`);
            return;
        }

        // Clean up previous HowTo
        this.cleanupHowTo();

        this.activeContributionId = contributionId;
        this.expandPanel();

        // Initialize step states
        const states: StepState[] = contribution.steps.map(step => ({
            step,
            status: 'pending'
        }));

        this.stepStates.set(contributionId, states);
        
        // Call HowTo's initialize function if provided
        if (contribution.initialize) {
            const context = {
                requestUpdate: () => this.recheckActiveStepConditions(),
                contributionId: contributionId
            };
            this.howtoCleanup = contribution.initialize(context) || undefined;
        }
        
        this.requestUpdate();

        // Check initial pre-conditions
        await this.checkPreConditions(contributionId, 0);
    }

    private cleanupHowTo() {
        if (this.howtoCleanup) {
            this.howtoCleanup();
            this.howtoCleanup = undefined;
        }
    }

    private getStepState(contributionId: string, stepIndex: number): StepState | null {
        const states = this.stepStates.get(contributionId);
        return states && stepIndex < states.length ? states[stepIndex] : null;
    }

    private async checkPreConditions(contributionId: string, stepIndex: number) {
        const state = this.getStepState(contributionId, stepIndex);
        if (!state) return;

        if (!state.step.preCondition) {
            state.preConditionMet = true;
            this.requestUpdate();
            return;
        }

        try {
            state.preConditionMet = await state.step.preCondition();
            this.requestUpdate();
        } catch (error) {
            console.error(`Pre-condition check failed for step ${state.step.id}:`, error);
            state.preConditionMet = false;
            this.requestUpdate();
        }
    }

    private async checkPostConditions(contributionId: string, stepIndex: number) {
        const state = this.getStepState(contributionId, stepIndex);
        if (!state) return;

        if (!state.step.postCondition) {
            this.completeStep(contributionId, stepIndex);
            return;
        }

        try {
            const result = await state.step.postCondition();
            state.postConditionMet = result;
            state.status = result ? 'completed' : 'failed';
            
            if (result) {
                this.activateNextStep(contributionId, stepIndex);
            }
            this.requestUpdate();
        } catch (error) {
            console.error(`Post-condition check failed for step ${state.step.id}:`, error);
            state.postConditionMet = false;
            state.status = 'failed';
            this.requestUpdate();
        }
    }

    private completeStep(contributionId: string, stepIndex: number) {
        const state = this.getStepState(contributionId, stepIndex);
        if (!state) return;
        
        state.status = 'completed';
        this.activateNextStep(contributionId, stepIndex);
        this.requestUpdate();
    }

    private async activateNextStep(contributionId: string, stepIndex: number) {
        const states = this.stepStates.get(contributionId);
        if (!states || stepIndex + 1 >= states.length) return;
        
        const nextState = states[stepIndex + 1];
        nextState.status = 'active';
        await this.checkPreConditions(contributionId, stepIndex + 1);
    }

    /**
     * Re-checks conditions for active and pending steps when workspace or editor state changes
     */
    private async recheckActiveStepConditions() {
        if (!this.activeContributionId) return;

        const states = this.stepStates.get(this.activeContributionId);
        if (!states) return;

        // Find the active step
        const activeStepIndex = states.findIndex(state => state.status === 'active');
        
        if (activeStepIndex !== -1) {
            const activeState = states[activeStepIndex];
            const step = activeState.step;

            // Re-check post-condition if it exists and step is active
            if (step.postCondition) {
                try {
                    const result = await step.postCondition();
                    if (result && activeState.status === 'active') {
                        // Post-condition is met, complete the step and move to next
                        await this.checkPostConditions(this.activeContributionId, activeStepIndex);
                        return; // Step completed, no need to check pre-conditions
                    }
                } catch (error) {
                    // Ignore errors in post-condition checks during re-evaluation
                }
            }
        }

        // Re-check pre-conditions for pending steps (they might become available)
        for (let i = 0; i < states.length; i++) {
            const state = states[i];
            if (state.status === 'pending' && state.step.preCondition) {
                // Re-check pre-condition for pending steps
                await this.checkPreConditions(this.activeContributionId, i);
            }
        }

        this.requestUpdate();
    }

    private async executeStep(contributionId: string, stepIndex: number) {
        const state = this.getStepState(contributionId, stepIndex);
        if (!state) return;

        if (!await this.validatePreConditions(state, contributionId, stepIndex)) {
            return;
        }

        state.status = 'active';
        this.requestUpdate();

        if (state.step.command && !await this.executeStepCommand(state)) {
            return;
        }

        await this.checkPostConditions(contributionId, stepIndex);
    }

    private async validatePreConditions(state: StepState, contributionId: string, stepIndex: number): Promise<boolean> {
        if (!state.step.preCondition) {
            return true;
        }

        if (state.preConditionMet === undefined || state.preConditionMet === false) {
            await this.checkPreConditions(contributionId, stepIndex);
        }

        if (state.preConditionMet !== true) {
            toastError(`Pre-conditions not met for step: ${state.step.title}`);
            return false;
        }

        return true;
    }

    private async executeStepCommand(state: StepState): Promise<boolean> {
        if (!state.step.command) {
            return true;
        }

        try {
            const rawParams = state.step.commandParams;
            const params = typeof rawParams === 'function' ? await rawParams() : (rawParams || {});
            const execContext = commandRegistry.createExecutionContext(params);
            await commandRegistry.execute(state.step.command, execContext);
            return true;
        } catch (error) {
            console.error(`Failed to execute command for step ${state.step.id}:`, error);
            toastError(`Failed to execute step: ${state.step.title}`);
            state.status = 'failed';
            this.requestUpdate();
            return false;
        }
    }

    private async runStepCommand(contributionId: string, stepIndex: number) {
        const state = this.getStepState(contributionId, stepIndex);
        if (!state || !state.step.command) {
            return;
        }

        // Check pre-conditions if they exist
        if (state.step.preCondition) {
            const preConditionMet = await state.step.preCondition();
            if (!preConditionMet) {
                toastError(`Pre-conditions not met for step: ${state.step.title}`);
                return;
            }
        }

        // Execute the command
        const success = await this.executeStepCommand(state);
        if (success) {
            // Check post-conditions after command execution
            await this.checkPostConditions(contributionId, stepIndex);
        }
    }

    private skipStep(contributionId: string, stepIndex: number) {
        const state = this.getStepState(contributionId, stepIndex);
        if (!state || !state.step.optional) return;

        state.status = 'skipped';
        this.activateNextStep(contributionId, stepIndex);
        this.requestUpdate();
    }

    private closeHowTo() {
        this.cleanupHowTo();
        this.activeContributionId = null;
        this.stepStates.clear();
        this.requestUpdate();
    }

    private async showPanel() {
        this.isVisible = true;
        await this.saveSettings();
        this.requestUpdate();
        await this.updateComplete;
        this.expandPanel();
    }

    private async hidePanel() {
        this.isVisible = false;
        await this.saveSettings();
        this.requestUpdate();
    }

    private async toggleVisibility() {
        if (this.isVisible) {
            await this.hidePanel();
        } else {
            await this.showPanel();
        }
    }

    private renderStep(state: StepState, index: number, contributionId: string) {
        const { step, status, preConditionMet, postConditionMet } = state;
        const isActive = status === 'active';
        const isCompleted = status === 'completed';
        const isFailed = status === 'failed';
        const isPending = status === 'pending';
        const isSkipped = status === 'skipped';

        return html`
            <div class="step ${status}" ?data-active=${isActive}>
                <div class="step-header">
                    <div class="step-number">${index + 1}</div>
                    <div class="step-title">${step.title}</div>
                    <div class="step-status">
                        ${step.command ? html`
                            <wa-button 
                                size="s" 
                                appearance="plain" 
                                @click=${(e: Event) => {
                                    e.stopPropagation();
                                    this.runStepCommand(contributionId, index);
                                }}
                                title="Run step command"
                            >
                                <wa-icon name="play"></wa-icon>
                            </wa-button>
                        ` : nothing}
                        ${isCompleted ? html`<wa-icon name="check-circle" class="status-icon completed"></wa-icon>` : nothing}
                        ${isFailed ? html`<wa-icon name="xmark-circle" class="status-icon failed"></wa-icon>` : nothing}
                        ${isSkipped ? html`<wa-icon name="minus-circle" class="status-icon skipped"></wa-icon>` : nothing}
                        ${isPending ? html`<wa-icon name="circle" class="status-icon pending"></wa-icon>` : nothing}
                        ${isActive ? html`<wa-icon name="play-circle" class="status-icon active"></wa-icon>` : nothing}
                    </div>
                </div>
                <div class="step-description">${step.description}</div>
                ${step.preCondition && preConditionMet !== undefined ? html`
                    <div class="condition pre-condition ${preConditionMet ? 'met' : 'not-met'}">
                        <wa-icon name="${preConditionMet ? 'check' : 'xmark'}"></wa-icon>
                        <span>Pre-condition: ${preConditionMet ? 'Met' : 'Not met'}</span>
                    </div>
                ` : nothing}
                ${step.postCondition && postConditionMet !== undefined ? html`
                    <div class="condition post-condition ${postConditionMet ? 'met' : 'not-met'}">
                        <wa-icon name="${postConditionMet ? 'check' : 'xmark'}"></wa-icon>
                        <span>Post-condition: ${postConditionMet ? 'Met' : 'Not met'}</span>
                    </div>
                ` : nothing}
                ${isActive && step.optional ? html`
                    <div class="step-actions">
                        <wa-button size="s" appearance="outline" @click=${() => this.skipStep(contributionId, index)}>
                            <wa-icon name="forward"></wa-icon>
                            Skip
                        </wa-button>
                    </div>
                ` : nothing}
            </div>
        `;
    }

    render() {
        if (!this.isVisible) {
            return nothing;
        }

        const activeContribution = this.activeContributionId
            ? howToService.getContribution(this.activeContributionId)
            : null;

        const activeStepStates = this.activeContributionId
            ? this.stepStates.get(this.activeContributionId) || []
            : [];

        return html`
            <docks-floating-panel
                label="HowTo Workflows"
                icon="list-check"
                .persistKey=${SETTINGS_KEY}
                @floating-close=${() => { void this.hidePanel(); }}
            >
                    <div class="panel-content">
                        ${activeContribution ? html`
                            <div class="active-workflow">
                                <div class="workflow-header">
                                    <div class="workflow-title-section">
                                        <h3>${typeof activeContribution.title === 'function' 
                                            ? activeContribution.title() 
                                            : activeContribution.title}</h3>
                                        ${activeContribution.description ? html`
                                            <p class="workflow-description">${typeof activeContribution.description === 'function'
                                                ? activeContribution.description()
                                                : activeContribution.description}</p>
                                        ` : nothing}
                                    </div>
                                    <wa-button 
                                        size="s" 
                                        appearance="plain" 
                                        @click=${this.closeHowTo}
                                        title="Close HowTo"
                                    >
                                        <wa-icon name="xmark"></wa-icon>
                                    </wa-button>
                                </div>
                                <div class="steps-list">
                                    ${activeStepStates.map((state, index) => 
                                        this.renderStep(state, index, this.activeContributionId!)
                                    )}
                                </div>
                            </div>
                        ` : html`
                            <div class="workflows-list">
                                <h3>Available Workflows</h3>
                                ${this.contributions.length === 0 ? html`
                                    <div class="empty-state">
                                        <wa-icon name="list-check" style="font-size: 2em; opacity: 0.5; margin-bottom: 12px;"></wa-icon>
                                        <p>No HowTo workflows available yet.</p>
                                        <p style="font-size: 0.9em; opacity: 0.7;">Extensions can register workflows via the contribution registry.</p>
                                    </div>
                                ` : this.contributions.map(contrib => {
                                    const title = typeof contrib.title === 'function' ? contrib.title() : contrib.title;
                                    const description = contrib.description 
                                        ? (typeof contrib.description === 'function' ? contrib.description() : contrib.description)
                                        : null;
                                    return html`
                                    <div class="workflow-item" @click=${() => this.startHowTo(contrib.id)}>
                                        ${contrib.icon ? html`
                                            <wa-icon name="${contrib.icon}"></wa-icon>
                                        ` : html`
                                            <wa-icon name="list-check"></wa-icon>
                                        `}
                                        <div class="workflow-info">
                                            <div class="workflow-title">${title}</div>
                                            ${description ? html`
                                                <div class="workflow-desc">${description}</div>
                                            ` : nothing}
                                            <div class="workflow-meta">${contrib.steps.length} step${contrib.steps.length !== 1 ? 's' : ''}</div>
                                        </div>
                                    </div>
                                `})}
                            </div>
                        `}
                    </div>
            </docks-floating-panel>
        `;
    }

    static styles = css`
        :host {
            display: contents;
        }

        .panel-content {
            width: 400px;
            max-height: 600px;
            box-sizing: border-box;
            overflow-y: auto;
            padding: var(--wa-spacing-large, 16px);
        }

        .workflows-list h3 {
            margin: 0 0 var(--wa-spacing-medium, 12px) 0;
            font-size: var(--wa-font-size-medium, 14px);
            font-weight: 600;
            color: var(--wa-color-text-normal, var(--wa-color-neutral-80));
        }

        :host-context(.wa-light) .workflows-list h3 {
            color: var(--wa-color-text-normal, var(--wa-color-neutral-20));
        }

        .workflow-item {
            display: flex;
            align-items: flex-start;
            gap: var(--wa-spacing-medium, 12px);
            padding: var(--wa-spacing-medium, 12px);
            margin-bottom: var(--wa-spacing-small, 8px);
            background: var(--wa-color-surface-lowered, var(--wa-color-neutral-10));
            border: var(--wa-border-width-s, 1px) solid var(--wa-color-neutral-border-subtle, var(--wa-color-neutral-20));
            border-radius: var(--wa-border-radius-small, 6px);
            cursor: pointer;
            transition: all var(--wa-transition-medium, 0.2s);
        }

        :host-context(.wa-light) .workflow-item {
            background: var(--wa-color-surface-lowered, var(--wa-color-neutral-90));
            border-color: var(--wa-color-neutral-border-subtle, var(--wa-color-neutral-80));
        }

        .workflow-item:hover {
            background: var(--wa-color-mix-hover, var(--wa-color-neutral-15));
            border-color: var(--wa-color-neutral-border-loud, var(--wa-color-neutral-30));
        }

        :host-context(.wa-light) .workflow-item:hover {
            background: var(--wa-color-mix-hover, var(--wa-color-neutral-85));
            border-color: var(--wa-color-neutral-border-loud, var(--wa-color-neutral-70));
        }

        .workflow-info {
            flex: 1;
        }

        .workflow-title {
            font-weight: 600;
            margin-bottom: var(--wa-spacing-x-small, 4px);
            color: var(--wa-color-text-normal, var(--wa-color-neutral-90));
        }

        :host-context(.wa-light) .workflow-title {
            color: var(--wa-color-text-normal, var(--wa-color-neutral-10));
        }

        .workflow-desc {
            font-size: var(--wa-font-size-small, 12px);
            color: var(--wa-color-text-subtle, var(--wa-color-neutral-70));
            margin-bottom: var(--wa-spacing-x-small, 4px);
        }

        :host-context(.wa-light) .workflow-desc {
            color: var(--wa-color-text-subtle, var(--wa-color-neutral-30));
        }

        .workflow-meta {
            font-size: var(--wa-font-size-x-small, 11px);
            color: var(--wa-color-text-quiet, var(--wa-color-neutral-60));
        }

        :host-context(.wa-light) .workflow-meta {
            color: var(--wa-color-text-quiet, var(--wa-color-neutral-40));
        }

        .active-workflow {
            display: flex;
            flex-direction: column;
            gap: var(--wa-spacing-large, 16px);
        }

        .workflow-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: var(--wa-spacing-medium, 12px);
            margin-bottom: var(--wa-spacing-medium, 12px);
        }

        .workflow-title-section {
            flex: 1;
        }

        .workflow-header h3 {
            margin: 0 0 var(--wa-spacing-small, 8px) 0;
            font-size: var(--wa-font-size-large, 16px);
            font-weight: 600;
            color: var(--wa-color-text-normal, var(--wa-color-neutral-90));
        }

        :host-context(.wa-light) .workflow-header h3 {
            color: var(--wa-color-text-normal, var(--wa-color-neutral-10));
        }

        .workflow-description {
            margin: 0;
            font-size: var(--wa-font-size-medium, 13px);
            color: var(--wa-color-text-subtle, var(--wa-color-neutral-70));
        }

        :host-context(.wa-light) .workflow-description {
            color: var(--wa-color-text-subtle, var(--wa-color-neutral-30));
        }

        .steps-list {
            display: flex;
            flex-direction: column;
            gap: var(--wa-spacing-medium, 12px);
        }

        .step {
            padding: var(--wa-spacing-medium, 12px);
            background: var(--wa-color-surface-lowered, var(--wa-color-neutral-10));
            border: var(--wa-border-width-s, 1px) solid var(--wa-color-neutral-border-subtle, var(--wa-color-neutral-20));
            border-radius: var(--wa-border-radius-small, 6px);
            transition: all var(--wa-transition-medium, 0.2s);
        }

        :host-context(.wa-light) .step {
            background: var(--wa-color-surface-lowered, var(--wa-color-neutral-90));
            border-color: var(--wa-color-neutral-border-subtle, var(--wa-color-neutral-80));
        }

        .step[data-active="true"] {
            border-color: var(--wa-color-primary-50);
            background: var(--wa-color-primary-05);
        }

        :host-context(.wa-light) .step[data-active="true"] {
            background: var(--wa-color-primary-95);
            border-color: var(--wa-color-primary-50);
        }

        .step.completed {
            border-color: var(--wa-color-success-50);
            background: var(--wa-color-success-05);
        }

        :host-context(.wa-light) .step.completed {
            background: var(--wa-color-success-95);
            border-color: var(--wa-color-success-50);
        }

        .step.failed {
            border-color: var(--wa-color-danger-50);
            background: var(--wa-color-danger-05);
        }

        :host-context(.wa-light) .step.failed {
            background: var(--wa-color-danger-95);
            border-color: var(--wa-color-danger-50);
        }

        .step-header {
            display: flex;
            align-items: center;
            gap: var(--wa-spacing-medium, 12px);
            margin-bottom: var(--wa-spacing-small, 8px);
        }

        .step-number {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--wa-color-surface-lowered, var(--wa-color-neutral-20));
            border-radius: 50%;
            font-size: var(--wa-font-size-small, 12px);
            font-weight: 600;
            color: var(--wa-color-text-normal, var(--wa-color-neutral-80));
        }

        :host-context(.wa-light) .step-number {
            background: var(--wa-color-surface-lowered, var(--wa-color-neutral-80));
            color: var(--wa-color-text-normal, var(--wa-color-neutral-20));
        }

        .step-title {
            flex: 1;
            font-weight: 600;
            color: var(--wa-color-text-normal, var(--wa-color-neutral-90));
        }

        :host-context(.wa-light) .step-title {
            color: var(--wa-color-text-normal, var(--wa-color-neutral-10));
        }

        .step-status {
            display: flex;
            align-items: center;
            gap: var(--wa-spacing-small, 8px);
        }

        .status-icon {
            width: 20px;
            height: 20px;
        }

        .status-icon.completed {
            color: var(--wa-color-success-50);
        }

        .status-icon.failed {
            color: var(--wa-color-danger-50);
        }

        .status-icon.skipped {
            color: var(--wa-color-neutral-50);
        }

        .status-icon.active {
            color: var(--wa-color-primary-50);
        }

        .status-icon.pending {
            color: var(--wa-color-neutral-50);
        }

        .step-description {
            font-size: var(--wa-font-size-medium, 13px);
            color: var(--wa-color-text-subtle, var(--wa-color-neutral-70));
            margin-bottom: var(--wa-spacing-small, 8px);
            line-height: 1.4;
        }

        :host-context(.wa-light) .step-description {
            color: var(--wa-color-text-subtle, var(--wa-color-neutral-30));
        }

        .condition {
            display: flex;
            align-items: center;
            gap: var(--wa-spacing-x-small, 6px);
            font-size: var(--wa-font-size-small, 12px);
            padding: var(--wa-spacing-x-small, 6px) var(--wa-spacing-small, 8px);
            border-radius: var(--wa-border-radius-x-small, 4px);
            margin-bottom: var(--wa-spacing-small, 8px);
        }

        .condition.met {
            background: var(--wa-color-success-10);
            color: var(--wa-color-success-70);
        }

        :host-context(.wa-light) .condition.met {
            background: var(--wa-color-success-90);
            color: var(--wa-color-success-30);
        }

        .condition.not-met {
            background: var(--wa-color-danger-10);
            color: var(--wa-color-danger-70);
        }

        :host-context(.wa-light) .condition.not-met {
            background: var(--wa-color-danger-90);
            color: var(--wa-color-danger-30);
        }

        .step-actions {
            display: flex;
            gap: var(--wa-spacing-small, 8px);
            margin-top: var(--wa-spacing-small, 8px);
        }

        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: var(--wa-spacing-x-large, 40px) var(--wa-spacing-large, 20px);
            text-align: center;
            color: var(--wa-color-text-subtle, var(--wa-color-neutral-70));
        }

        :host-context(.wa-light) .empty-state {
            color: var(--wa-color-text-subtle, var(--wa-color-neutral-30));
        }

        .empty-state p {
            margin: var(--wa-spacing-small, 8px) 0;
        }
    `;
}

