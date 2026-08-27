const WEBMCP_TOOL_NAME_MAX_LENGTH = 128;

export function sanitizeWebMcpToolName(name: string): string {
  let sanitized = name
    .replace(/[^a-zA-Z0-9_.-]/g, "_")
    .replace(/^[^a-zA-Z]/, "cmd_$&")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");

  if (!sanitized) {
    sanitized = "tool";
  }

  if (sanitized.length > WEBMCP_TOOL_NAME_MAX_LENGTH) {
    sanitized = sanitized.slice(0, WEBMCP_TOOL_NAME_MAX_LENGTH);
  }

  return sanitized;
}
