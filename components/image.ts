"use client";

const MAX_SIDE = 1600;

/**
 * Shrinks a photo or screenshot in the browser before upload, so it stays well under
 * the server's size limit and uploads quickly on a phone. Returns JPEG base64.
 */
export async function prepareImage(file: File): Promise<{ mimeType: "image/jpeg"; base64: string; previewUrl: string }> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
  return { mimeType: "image/jpeg", base64: dataUrl.slice(dataUrl.indexOf(",") + 1), previewUrl: dataUrl };
}
