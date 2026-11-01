import * as lit from '@eclipse-docks/core/externals/lit';
import { registerCanvasBridge } from './register';

registerCanvasBridge('lit', lit, './externals/lit');
export const canvasBridgeHref = import.meta.url;
