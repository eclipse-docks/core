import { WebMCPService } from "./webmcp-service";

export default async (_uiContext: unknown): Promise<void> => {
  const service = new WebMCPService();
  await service.start();
};
