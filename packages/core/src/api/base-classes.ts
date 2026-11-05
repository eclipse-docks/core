// Re-export framework base classes for app usage
export { DocksPart } from '../parts/part';
export { DocksContainer } from '../parts/container';
export { DocksDialogContent } from '../parts/dialog-content';
export { DocksStandardLayout } from '../layouts/standard-layout';
export { DocksWidget } from '../widgets/widget';
export { DocksFloatingPanel } from '../widgets/floating-panel';
export { DocksElement } from '../parts/element';
// Import to register the custom element
import '../layouts/standard-layout';

