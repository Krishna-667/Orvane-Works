/**
 * Design-token contrast test
 * Verifies WCAG 2.2 AA contrast (≥ 4.5:1 for normal text, ≥ 3:1 for large/UI)
 * against every button, badge and chip variant colour pair defined in globals.css.
 *
 * Run: npx vitest run src/__tests__/design/contrast.test.ts
 */

import { describe, it, expect } from "vitest";

// ──────────────────────────────────────────────────────────────────────────────
// Minimal colour utilities (no external dependency needed)
// ──────────────────────────────────────────────────────────────────────────────

/** Parse a hex colour string (#rrggbb or #rgb) to { r, g, b } 0-255 */
function parseHex(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  if (h.length === 3) {
    return {
      r: parseInt(h[0] + h[0], 16),
      g: parseInt(h[1] + h[1], 16),
      b: parseInt(h[2] + h[2], 16),
    };
  }
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

/** Convert 0-255 channel to relative luminance contribution */
function linearise(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

/** Relative luminance per WCAG 2.x */
function luminance({ r, g, b }: { r: number; g: number; b: number }): number {
  return 0.2126 * linearise(r) + 0.7152 * linearise(g) + 0.0722 * linearise(b);
}

/** WCAG contrast ratio (1-21) */
function contrastRatio(fg: string, bg: string): number {
  const L1 = luminance(parseHex(fg));
  const L2 = luminance(parseHex(bg));
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ──────────────────────────────────────────────────────────────────────────────
// Resolved token colours (mirroring globals.css + tailwind.config.ts)
// ──────────────────────────────────────────────────────────────────────────────

// Light theme
const light = {
  primary: "#C8341B",         // hsl(9 76% 44%) – Vermilion
  primaryFg: "#FFFFFF",       // hsl(0 0% 100%) – White
  secondary: "#EFECE6",       // hsl(40 18% 92%)
  secondaryFg: "#111214",     // hsl(220 12% 7%)
  destructive: "#DC2626",     // hsl(0 72% 51%)
  destructiveFg: "#FFFFFF",
  muted: "#EFECE6",           // hsl(40 18% 92%)
  mutedFg: "#575A60",         // hsl(222 5% 36%)
  background: "#F6F3EE",      // Studio Cream
  foreground: "#111214",      // Deep Ink
  border: "#E5E0D8",
  // Accent / accent variant
  accentBg: "#FEF3F0",        // vermilion-50
  accentFg: "#9B2412",        // vermilion-800
  // Chip / badge selected (uses primary)
  chipSelectedBg: "#C8341B",
  chipSelectedFg: "#FFFFFF",
};

// Dark theme
const dark = {
  // CSS: --primary: 9 100% 59% = #FF4D30; --primary-foreground: 220 12% 7% = #111214
  primary: "#FF4D30",         // hsl(9 100% 59%) – High-contrast Vermilion (original token)
  primaryFg: "#111214",       // hsl(220 12% 7%) – Dark Ink (original token) → 5.9:1 on #FF4D30 ✓
  secondary: "#22252A",
  secondaryFg: "#F3F4F6",
  destructive: "#6B1414",
  destructiveFg: "#F3F4F6",
  muted: "#22252A",
  mutedFg: "#9CA3AF",
  background: "#121315",
  foreground: "#F3F4F6",
  border: "#2B2F36",
  accentBg: "#2C1814",
  accentFg: "#FF7A60",
  // Filter chip selected: bg-primary / text-primary-foreground
  chipSelectedBg: "#FF4D30",
  chipSelectedFg: "#111214",
};

// ──────────────────────────────────────────────────────────────────────────────
// Test pairs
// ──────────────────────────────────────────────────────────────────────────────

interface Pair {
  name: string;
  fg: string;
  bg: string;
  /** minimum required ratio; 3 for large/UI elements, 4.5 for body text */
  minRatio: number;
}

const lightPairs: Pair[] = [
  { name: "Button default (primary bg / white fg)", fg: light.primaryFg, bg: light.primary, minRatio: 4.5 },
  { name: "Button secondary", fg: light.secondaryFg, bg: light.secondary, minRatio: 4.5 },
  { name: "Button destructive", fg: light.destructiveFg, bg: light.destructive, minRatio: 4.5 },
  { name: "Button ghost / text-foreground on background", fg: light.foreground, bg: light.background, minRatio: 4.5 },
  { name: "Button outline text on card", fg: light.foreground, bg: "#FFFFFF", minRatio: 4.5 },
  { name: "Badge / chip selected (primary)", fg: light.chipSelectedFg, bg: light.chipSelectedBg, minRatio: 3 },
  { name: "Badge accent", fg: light.accentFg, bg: light.accentBg, minRatio: 4.5 },
  { name: "Filter chip unselected (muted fg on muted)", fg: light.mutedFg, bg: light.muted, minRatio: 3 },
  { name: "Disabled button (opacity applied externally; check base)", fg: light.primaryFg, bg: light.primary, minRatio: 3 },
];

const darkPairs: Pair[] = [
  { name: "[dark] Button default (primary #FF4D30 bg / ink fg #111214)", fg: dark.primaryFg, bg: dark.primary, minRatio: 4.5 },
  { name: "[dark] Button secondary", fg: dark.secondaryFg, bg: dark.secondary, minRatio: 4.5 },
  { name: "[dark] Button destructive", fg: dark.destructiveFg, bg: dark.destructive, minRatio: 4.5 },
  { name: "[dark] Button ghost on dark background", fg: dark.foreground, bg: dark.background, minRatio: 4.5 },
  { name: "[dark] Badge/chip selected (vermilion-500)", fg: dark.chipSelectedFg, bg: dark.chipSelectedBg, minRatio: 3 },
  { name: "[dark] Badge accent", fg: dark.accentFg, bg: dark.accentBg, minRatio: 4.5 },
  { name: "[dark] Filter chip unselected (muted fg on muted)", fg: dark.mutedFg, bg: dark.muted, minRatio: 3 },
];

// ──────────────────────────────────────────────────────────────────────────────
// Tests
// ──────────────────────────────────────────────────────────────────────────────

describe("Design token contrast – light theme", () => {
  for (const pair of lightPairs) {
    it(`${pair.name} meets ${pair.minRatio}:1`, () => {
      const ratio = contrastRatio(pair.fg, pair.bg);
      expect(
        ratio,
        `Got ${ratio.toFixed(2)}:1 for "${pair.name}" (fg=${pair.fg} bg=${pair.bg})`
      ).toBeGreaterThanOrEqual(pair.minRatio);
    });
  }
});

describe("Design token contrast – dark theme", () => {
  for (const pair of darkPairs) {
    it(`${pair.name} meets ${pair.minRatio}:1`, () => {
      const ratio = contrastRatio(pair.fg, pair.bg);
      expect(
        ratio,
        `Got ${ratio.toFixed(2)}:1 for "${pair.name}" (fg=${pair.fg} bg=${pair.bg})`
      ).toBeGreaterThanOrEqual(pair.minRatio);
    });
  }
});
