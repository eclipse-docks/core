import { extensionRegistry } from "@eclipse-docks/core";
import pkg from "../package.json";

extensionRegistry.registerExtension({
  id: pkg.name,
  name: "WebMCP",
  description: "Exposes app commands as WebMCP tools for browser agents and MCP clients",
  loader: () => import("./webmcp-extension"),
  icon: "plug",
  dependencies: ["@eclipse-docks/extension-ai-system"],
  experimental: true,
});
