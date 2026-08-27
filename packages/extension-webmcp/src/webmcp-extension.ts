import { WebMCPService } from "./webmcp-service";

let activeService: WebMCPService | null = null;

export default async (_uiContext: unknown): Promise<void> => {
  if (activeService) {
    activeService.stop();
  }

  activeService = new WebMCPService();
  await activeService.start();
};
