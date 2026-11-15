import sharp from "sharp";

/**
 * True when a picture has nothing to read: blank, a single flat colour, or too small.
 * Checked in code before the model sees it, because a model asked to "read" a blank
 * picture can invent a whole message (found by test image-06).
 */
export async function isBlankImage(base64: string): Promise<boolean> {
  try {
    const img = sharp(Buffer.from(base64, "base64"));
    const { width = 0, height = 0 } = await img.metadata();
    if (width < 32 || height < 32) return true;
    const { channels } = await img.stats();
    // Standard deviation of brightness per channel: near zero means one flat colour.
    return channels.slice(0, 3).every((c) => c.stdev < 3);
  } catch {
    // Not a decodable picture: let the normal path report it.
    return false;
  }
}
