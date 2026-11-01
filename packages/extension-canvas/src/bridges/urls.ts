import type { CanvasBridges } from '../compile';
import { canvasBridgeHref as core } from './core';
import { canvasBridgeHref as events } from './events';
import { canvasBridgeHref as lit } from './lit';
import { canvasBridgeHref as parts } from './parts';
import { canvasBridgeHref as thirdParty } from './third-party';
import { canvasBridgeHref as webawesome } from './webawesome';
import { canvasBridgeHref as widgets } from './widgets';

export function canvasBridges(): CanvasBridges {
    return {
        lit,
        webawesome,
        core,
        coreSubpaths: {
            './externals/lit': lit,
            './externals/webawesome': webawesome,
            './externals/third-party': thirdParty,
            './parts': parts,
            './widgets': widgets,
            './core/events': events,
        },
    };
}
