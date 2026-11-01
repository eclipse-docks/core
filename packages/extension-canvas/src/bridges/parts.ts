import '@eclipse-docks/core/parts';
import { registerCanvasSubpath } from './register';

registerCanvasSubpath('./parts', {});
export const canvasBridgeHref = import.meta.url;
