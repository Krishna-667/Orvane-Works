import { createClient } from "@/lib/supabase/server";

/**
 * Fetch a single site_settings value by key.
 * Returns null if the key doesn't exist or on any error.
 * The value column is JSONB; for plain text keys the JSON will be a string.
 */
export async function getSiteSetting(key: string): Promise<string | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", key)
      .single();

    if (error || !data) return null;
    // value is JSONB — if stored as a JSON string, unwrap it
    if (typeof data.value === "string") return data.value;
    // If it's already a parsed primitive, cast to string
    return String(data.value);
  } catch {
    return null;
  }
}

/**
 * Admin: Upsert a site_settings key-value pair.
 * Value is stored as JSONB; plain strings are JSON-encoded.
 */
export async function upsertSiteSetting(key: string, value: string): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("site_settings")
      .upsert(
        { key, value: JSON.stringify(value), updated_at: new Date().toISOString() },
        { onConflict: "key" }
      );
    return !error;
  } catch {
    return false;
  }
}
