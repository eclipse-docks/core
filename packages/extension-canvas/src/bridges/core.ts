import * as core from '@eclipse-docks/core';
import { registerCanvasBridge } from './register';

registerCanvasBridge(core, import.meta.url, 'core');
