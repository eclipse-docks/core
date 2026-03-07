import { extensionRegistry } from "@eclipse-lyra/core";
import pkg from "../package.json";

extensionRegistry.registerExtension({
  id: pkg.name,
  name: "WebMCP",
  description: "Exposes app commands as WebMCP tools for browser agents and MCP clients",
  loader: () => import("./webmcp-extension"),
  icon: "plug",
  dependencies: ["@eclipse-lyra/extension-ai-system"],
  experimental: true,
});
