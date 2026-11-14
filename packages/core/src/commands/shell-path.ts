/** Workspace-relative path with leading and trailing slashes removed. */
export function stripWorkspacePath(path: string): string {
    return path.replace(/^\/+|\/+$/g, "");
}

/**
 * Resolve `input` against a workspace-relative cwd.
 * A leading slash replaces the cwd. `..` that would leave the workspace root returns null.
 */
export function resolveWorkspacePath(cwd: string, input: string): string | null {
    const raw = input.trim();
    if (!raw) return stripWorkspacePath(cwd);
    if (raw.startsWith("/")) {
        return walk([], raw.replace(/^\/+/, ""));
    }
    return walk(stripWorkspacePath(cwd).split("/").filter(Boolean), raw);
}

function walk(parts: string[], relative: string): string | null {
    const next = [...parts];
    for (const segment of relative.split("/")) {
        if (!segment || segment === ".") continue;
        if (segment === "..") {
            if (next.length === 0) return null;
            next.pop();
            continue;
        }
        next.push(segment);
    }
    return next.join("/");
}

/** Path form shell-tagged handlers treat as workspace-absolute (leading slash). */
export function explicitWorkspacePath(resolved: string): string {
    return resolved ? `/${resolved}` : "/";
}

/** True when the path already names a connected workspace root, so cwd must not prefix it. */
export function namesWorkspaceRoot(path: string, rootNames: readonly string[]): boolean {
    if (path.trim().startsWith("/")) return false;
    const first = stripWorkspacePath(path).split("/").filter(Boolean)[0];
    return Boolean(first && rootNames.includes(first));
}
