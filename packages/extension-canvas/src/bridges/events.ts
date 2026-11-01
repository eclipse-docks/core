import * as events from '@eclipse-docks/core/core/events';
import { registerCanvasSubpath } from './register';

registerCanvasSubpath('./core/events', events);
export const canvasBridgeHref = import.meta.url;
