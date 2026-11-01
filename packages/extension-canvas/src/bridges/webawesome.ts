import * as webawesome from '@eclipse-docks/core/externals/webawesome';
import { registerCanvasBridge } from './register';

registerCanvasBridge('webawesome', webawesome, './externals/webawesome');
export const canvasBridgeHref = import.meta.url;
