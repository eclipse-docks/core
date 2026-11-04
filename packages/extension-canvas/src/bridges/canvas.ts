import * as lit from '@eclipse-docks/core/externals/lit';
import * as webawesome from '@eclipse-docks/core/externals/webawesome';
import { CanvasView } from '../canvas-module';
import { registerCanvasBridge } from './register';

registerCanvasBridge({ ...lit, ...webawesome, CanvasView }, import.meta.url, 'canvas');
