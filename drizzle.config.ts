import { defineConfig } from "drizzle-kit";

import config from "@/lib/config";

function parseDatabaseUrl(url: string) {
  const { hostname, port, pathname, username, password } = new URL(url);
  return {
    host: hostname,
    port: port ? parseInt(port, 10) : 5432,
    user: username,
    password: password,
    database: pathname.slice(1),
    ssl: false
  };
}

export default defineConfig({
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: parseDatabaseUrl(config.POSTGRES_URL),
  verbose: true,
  strict: true
});
