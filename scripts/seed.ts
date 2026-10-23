/**
 * Orvane Studio Database Seed Script Runner
 * Reads ADMIN_EMAIL from process.env and outputs seed instructions / checks
 */

import fs from "fs";
import path from "path";

async function runSeed() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@orvane.studio";
  console.log(`[Orvane Seed] Initializing database seed...`);
  console.log(`[Orvane Seed] Target Administrator Email: ${adminEmail}`);

  const seedSqlPath = path.resolve(process.cwd(), "supabase/seed.sql");
  if (fs.existsSync(seedSqlPath)) {
    const sql = fs.readFileSync(seedSqlPath, "utf-8");
    console.log(`[Orvane Seed] Loaded ${seedSqlPath} (${sql.length} bytes)`);
    console.log(`[Orvane Seed] Ready to apply to Supabase Postgres.`);
  } else {
    console.error(`[Orvane Seed] seed.sql not found at ${seedSqlPath}`);
    process.exit(1);
  }
}

runSeed().catch((err) => {
  console.error(`[Orvane Seed] Error:`, err);
  process.exit(1);
});
