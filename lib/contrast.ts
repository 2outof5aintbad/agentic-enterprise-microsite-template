// Returns "#000000" or "#FFFFFF" — whichever has higher contrast ratio against the given hex color.
// Uses WCAG relative luminance formula.
export function contrastColor(hex: string): "#000000" | "#FFFFFF" {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  const L = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

  // Contrast ratio vs white = (L + 0.05) / 0.05, vs black = 1.05 / (L + 0.05)
  return L > 0.179 ? "#000000" : "#FFFFFF";
}
