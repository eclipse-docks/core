import type { File } from '@eclipse-docks/core';
import { createLogger } from '@eclipse-docks/core';
import { cognitiveRuntime, parseModelIds } from '@eclipse-docks/extension-ai-system/api';
import type { IDocumentExtractor, DocumentExtractionOptions } from './document-extractor-interface';

const logger = createLogger('LLMOCRExtractor');
const DEFAULT_MISTRAL_OCR = 'https://api.mistral.ai/v1/ocr';

/**
 * LLM-based OCR extractor for document files using Mistral OCR.
 */
export class LLMOCRExtractor implements IDocumentExtractor {
  canExtract(fileType: string): boolean {
    return ['pdf', 'png', 'jpg', 'jpeg', 'tiff', 'tif'].includes(fileType.toLowerCase());
  }

  async extractText(file: File, options: DocumentExtractionOptions = {}): Promise<string> {
    const fileName = file.getName();
    const fileType = options?.fileType || fileName.split('.').pop()?.toLowerCase() || 'pdf';

    await cognitiveRuntime.whenReady();
    const settings = cognitiveRuntime.getProvidersSettings();
    const ocrProvider = settings.providers.find((p) => {
      if (!p.enabled) return false;
      if (p.extra?.ocrApiEndpoint) return true;
      return p.id.toLowerCase().includes('mistral') && Boolean(p.apiKey.trim());
    });

    const ocrEndpoint = ocrProvider?.extra?.ocrApiEndpoint || (ocrProvider ? DEFAULT_MISTRAL_OCR : undefined);
    if (!ocrProvider || !ocrEndpoint) {
      throw new Error(
        'Mistral OCR provider not configured. Add a mistral provider with an API key in AI Settings (optional extra.ocrApiEndpoint).',
      );
    }

    try {
      const fileBlob = (await file.getContents({ blob: true })) as Blob;
      const base64Content = await this.blobToBase64(fileBlob);
      const mimeType = this.getMimeType(fileType);
      const model =
        ocrProvider.extra?.ocrModel || parseModelIds(ocrProvider.models)[0] || 'mistral-ocr-latest';

      const response = await fetch(ocrEndpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ocrProvider.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          document: {
            type: 'document_url',
            document_url: `data:${mimeType};base64,${base64Content}`,
          },
          include_image_base64: false,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`OCR request failed: HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      if (!result.pages || !Array.isArray(result.pages)) {
        throw new Error('Invalid OCR response format: missing pages array');
      }

      const includePageNumbers = options.includePageNumbers !== false;
      const pageSeparator = options.pageSeparator || '\n\n';
      const textParts = result.pages
        .map((page: { markdown?: string; text?: string }, index: number) => {
          const pageText = page?.markdown || page?.text || '';
          if (!pageText.trim()) return null;
          return includePageNumbers ? `[Page ${index + 1}]\n${pageText}` : pageText;
        })
        .filter((text: string | null): text is string => text != null);

      if (textParts.length === 0) {
        throw new Error('No text content found in OCR response');
      }

      const extractedText = textParts.join(pageSeparator);
      logger.debug(`Extracted ${result.pages.length} pages from ${fileType} file: ${fileName}`);
      return extractedText;
    } catch (error) {
      logger.warn(`Failed to extract text using OCR from ${fileName}: ${error}`);
      throw new Error(`OCR text extraction failed: ${error}`);
    }
  }

  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]!);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private getMimeType(fileType: string): string {
    const mimeTypes: Record<string, string> = {
      pdf: 'application/pdf',
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      tiff: 'image/tiff',
      tif: 'image/tiff',
    };
    return mimeTypes[fileType.toLowerCase()] || 'application/octet-stream';
  }
}
