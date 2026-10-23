import { describe, it, expect } from "vitest";
import { formatINR, formatDate, cn } from "../lib/utils";

describe("Utility Functions", () => {
  it("formats Indian Rupee currency correctly with rupee symbol and comma grouping", () => {
    const formatted = formatINR(150000);
    // Should format in Indian numbering style (e.g. ₹1,50,000)
    expect(formatted).toContain("1,50,000");
  });

  it("formats dates properly into readable format", () => {
    const date = new Date("2026-05-15T00:00:00Z");
    const formatted = formatDate(date);
    expect(formatted).toContain("2026");
    expect(formatted).toContain("May");
  });

  it("merges tailwind classes cleanly using cn()", () => {
    const result = cn("px-4 py-2", "px-6", { "bg-primary": true });
    expect(result).toBe("py-2 px-6 bg-primary");
  });
});
