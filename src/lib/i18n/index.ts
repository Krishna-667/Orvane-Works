import { en, type TranslationType } from "./en";

export type Locale = "en" | "ta";

// Default locale dictionary
export function getDictionary(locale: Locale = "en"): TranslationType {
  // Tamil dictionary will fall back to English for any un-translated keys
  if (locale === "ta") {
    // When full Tamil translations are populated, import ta and merge
    return en;
  }
  return en;
}

export const t = en;
