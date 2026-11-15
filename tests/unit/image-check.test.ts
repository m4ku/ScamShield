import { readFile } from "node:fs/promises";

import sharp from "sharp";
import { describe, expect, it } from "vitest";

import { isBlankImage } from "../../lib/image-check";

const fixture = async (name: string) =>
  (await readFile(new URL(`../fixtures/${name}`, import.meta.url))).toString("base64");

const solid = async (r: number, g: number, b: number, size = 400) =>
  (await sharp({ create: { width: size, height: size, channels: 3, background: { r, g, b } } }).png().toBuffer()).toString(
    "base64",
  );

describe("isBlankImage: nothing to read is caught before the AI sees it", () => {
  it("flags a blank white picture", async () => {
    expect(await isBlankImage(await fixture("25-blank.png"))).toBe(true);
  });

  it("flags a flat dark or coloured picture", async () => {
    expect(await isBlankImage(await solid(0, 0, 0))).toBe(true);
    expect(await isBlankImage(await solid(30, 120, 200))).toBe(true);
  });

  it("flags a tiny picture", async () => {
    expect(await isBlankImage(await solid(10, 200, 10, 8))).toBe(true);
  });

  it("lets real screenshots, letters and photos through", async () => {
    for (const name of ["06-tech-support.png", "07-immigration-letter.png", "21-zh-delivery.png", "24-blurry.png", "99-not-a-message.png"]) {
      expect(await isBlankImage(await fixture(name))).toBe(false);
    }
  });

  it("does not throw on garbage", async () => {
    expect(await isBlankImage(Buffer.from("not an image").toString("base64"))).toBe(false);
  });
});
