import "server-only";

import { ApiError, GoogleGenAI } from "@google/genai";

import { AiBusyError, type AiProvider, type GenerateJsonRequest } from "./types";

const DEFAULT_MODEL = "gemini-3.1-flash-lite";

export function createGeminiProvider(): AiProvider {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set. Copy .env.example to .env and add your key.");
  }
  const ai = new GoogleGenAI({ apiKey });
  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;

  return {
    name: "gemini",
    async generateJson({ systemPrompt, userText, image, jsonSchema }: GenerateJsonRequest) {
      const parts = [
        ...(image ? [{ inlineData: { mimeType: image.mimeType, data: image.base64 } }] : []),
        { text: userText },
      ];

      const call = () =>
        ai.models.generateContent({
          model,
          contents: [{ role: "user", parts }],
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
            responseJsonSchema: jsonSchema,
            temperature: 0,
          },
        });

      try {
        let response;
        try {
          response = await call();
        } catch (err) {
          // A brief "overloaded" (503) or rate limit (429) often clears in a second: retry once.
          if (!(err instanceof ApiError && (err.status === 429 || err.status === 503))) throw err;
          await new Promise((r) => setTimeout(r, 1200));
          response = await call();
        }
        const text = response.text;
        if (!text) throw new Error("The model returned an empty response.");
        return JSON.parse(text) as unknown;
      } catch (err) {
        if (err instanceof ApiError && (err.status === 429 || err.status === 503)) throw new AiBusyError();
        throw err;
      }
    },
  };
}
