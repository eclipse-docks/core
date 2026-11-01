import * as thirdParty from '@eclipse-docks/core/externals/third-party';
import { registerCanvasSubpath } from './register';

registerCanvasSubpath('./externals/third-party', thirdParty);
export const canvasBridgeHref = import.meta.url;
