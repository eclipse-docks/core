import {LitElement, PropertyValues, type CSSResultGroup} from "lit";
import {waTreeLabelSlotStretch} from "../externals/wa-tree-shadow-parts";
import {subscribe as event_subscribe, unsubscribe as event_unsubscribe, type SubscriptionToken} from "../core/events";
import {toastError, toastInfo} from "../core/toast";
import {commandRegistry, ExecuteParams} from "../core/commandregistry";
import {Signal, SignalWatcher} from "@lit-labs/signals";
import {watchSignal} from "../core/signals";

Object.defineProperty(LitElement.prototype, "model", {
    enumerable: true,
    configurable: true,
    writable: true
});

const DocksWidgetBase = SignalWatcher(LitElement) as unknown as typeof LitElement;

export abstract class DocksWidget extends DocksWidgetBase {
    static finalizeStyles(styles?: CSSResultGroup) {
        return [waTreeLabelSlotStretch, ...super.finalizeStyles(styles)];
    }

    private signalCleanups = new Set<() => void>();
    private eventSubscriptions = new Set<SubscriptionToken>();

    /** False when disconnect can be a move and an explicit close releases the widget. */
    protected releaseOnDisconnect = true;

    connectedCallback() {
        super.connectedCallback();
        this.doBeforeUI()
    }

    disconnectedCallback() {
        if (this.releaseOnDisconnect) this.doClose();
        super.disconnectedCallback();
        this.eventSubscriptions.forEach(token => event_unsubscribe(token));
        this.eventSubscriptions.clear();
        this.signalCleanups.forEach(cleanup => cleanup());
        this.signalCleanups.clear();
    }

    protected subscribe(topic: string, callback: Function): void {
        const token = event_subscribe(topic, callback.bind(this));
        this.eventSubscriptions.add(token);
    }

    protected showInfo(msg: string) {
        toastInfo(msg)
    }

    protected showError(msg: string) {
        toastError(msg)
    }

    protected nobubble(wrap: (event: Event) => void) {
        return (event: Event) => {
            event.stopPropagation();
            wrap.bind(this)(event);
        };
    }

    protected command(command: string, state: {} = {}) {
        return () => {
            void this.executeCommand(command, state);
        };
    }

    protected async executeCommand(command: string, params: ExecuteParams) {
        const execContext = commandRegistry.createExecutionContext(params);
        await commandRegistry.execute(command, execContext);
    }

    protected watch(signal: Signal.State<any> | Signal.Computed<any>, callback: (value: any) => void): void {
        const cleanup = watchSignal(signal as Signal.State<any>, callback.bind(this));
        this.signalCleanups.add(cleanup);
    }

    protected firstUpdated(_changedProperties: PropertyValues) {
        super.firstUpdated(_changedProperties);
        this.doInitUI()
    }

    protected updateIdle() {
        requestIdleCallback(() => this.requestUpdate())
    }

    public updateLater() {
        requestAnimationFrame(() => this.requestUpdate())
    }

    protected doBeforeUI() {
    }

    protected doInitUI() {
    }

    /** Release resources. Skipped on disconnect when {@link releaseOnDisconnect} is false. */
    protected doClose() {
    }

    withRefresh(callback: () => void) {
        callback()
        this.updateLater()
    }
}
