import * as core from '@eclipse-docks/core';
import { registerCanvasBridge } from './register';

registerCanvasBridge('core', core);
export const canvasBridgeHref = import.meta.url;
