import "server-only";

import { createGeminiProvider } from "./gemini";
import type { AiProvider } from "./types";

export { AiBusyError } from "./types";
export type { AiProvider, GenerateJsonRequest } from "./types";

let cached: AiProvider | undefined;

/**
 * Returns the provider named by AI_PROVIDER (default "gemini").
 * To add another provider: create lib/ai/<name>.ts implementing AiProvider and add a case here.
 */
export function getAiProvider(): AiProvider {
  if (cached) return cached;
  const name = (process.env.AI_PROVIDER || "gemini").toLowerCase();
  switch (name) {
    case "gemini":
      cached = createGeminiProvider();
      return cached;
    default:
      throw new Error(`Unknown AI_PROVIDER "${name}". Supported: gemini.`);
  }
}
