/** One request to a model: instructions, the user's turn, an optional image, and the JSON shape we require back. */
export type GenerateJsonRequest = {
  systemPrompt: string;
  userText: string;
  image?: { mimeType: string; base64: string };
  /** Plain JSON Schema object describing the required response. */
  jsonSchema: Record<string, unknown>;
};

/** Every AI provider implements this, so switching providers is a one-file change. */
export interface AiProvider {
  name: string;
  /** Returns the model's parsed JSON. Callers must validate it (see lib/schema.ts). */
  generateJson(request: GenerateJsonRequest): Promise<unknown>;
}

/** Thrown when the provider is rate limited or out of daily quota. */
export class AiBusyError extends Error {
  constructor() {
    super("The AI provider is rate limited or out of quota.");
    this.name = "AiBusyError";
  }
}
