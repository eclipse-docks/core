/// <reference types="vite/client" />

declare module '*?worker' {
  const WorkerFactory: new () => Worker;
  export default WorkerFactory;
}
declare module '*?worker&inline' {
  const WorkerFactory: new () => Worker;
  export default WorkerFactory;
}
declare module '*?worker&url' {
  const workerUrl: string;
  export default workerUrl;
}
declare module '*?url&no-inline' {
  const assetUrl: string;
  export default assetUrl;
}
