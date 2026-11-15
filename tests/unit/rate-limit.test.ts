import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const { allowRequest } = await import("../../lib/rate-limit");

const from = (ip: string) => new Request("https://example.test/api/check", { method: "POST", headers: { "x-forwarded-for": ip } });

describe("allowRequest", () => {
  it("allows a burst up to the limit, then refuses", () => {
    const ok = Array.from({ length: 15 }, () => allowRequest(from("203.0.113.1"), "check"));
    expect(ok.every(Boolean)).toBe(true);
    expect(allowRequest(from("203.0.113.1"), "check")).toBe(false);
  });

  it("counts each visitor separately", () => {
    for (let i = 0; i < 20; i++) allowRequest(from("203.0.113.2"), "check");
    expect(allowRequest(from("203.0.113.3"), "check")).toBe(true);
  });

  it("counts follow-ups separately from checks", () => {
    for (let i = 0; i < 20; i++) allowRequest(from("203.0.113.4"), "check");
    expect(allowRequest(from("203.0.113.4"), "followup")).toBe(true);
  });

  it("allows again after a minute", () => {
    vi.useFakeTimers();
    for (let i = 0; i < 20; i++) allowRequest(from("203.0.113.5"), "check");
    expect(allowRequest(from("203.0.113.5"), "check")).toBe(false);
    vi.advanceTimersByTime(61_000);
    expect(allowRequest(from("203.0.113.5"), "check")).toBe(true);
    vi.useRealTimers();
  });
});
