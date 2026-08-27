import type { ModelContext } from "./model-context";

export function getModelContext(): ModelContext | undefined {
  if (typeof document !== "undefined") {
    const { modelContext } = document;
    if (modelContext) {
      return modelContext;
    }
  }

  if (typeof navigator !== "undefined" && navigator.modelContext) {
    return navigator.modelContext;
  }

  return undefined;
}

export function isModelContextAvailable(): boolean {
  return getModelContext() !== undefined;
}
