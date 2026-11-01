import '@eclipse-docks/core/widgets';
import { registerCanvasSubpath } from './register';

registerCanvasSubpath('./widgets', {});
export const canvasBridgeHref = import.meta.url;
