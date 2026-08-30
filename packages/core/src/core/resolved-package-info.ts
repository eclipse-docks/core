/** Metadata for one npm package resolved at build time from its installed package.json. */
export interface ResolvedDependencyInfo {
    license?: string;
    homepage?: string;
    repository?: string;
    description?: string;
}

export type ResolvedDependencyMap = Record<string, ResolvedDependencyInfo>;

export function normalizeDependencyInfo(
    value: ResolvedDependencyInfo | undefined,
): ResolvedDependencyInfo | undefined {
    return value;
}
