import { defineConfig } from "drizzle-kit";
import config from "@/config";

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: config.POSTGRES_HOST,
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    database: config.POSTGRES_DB,
    port: config.POSTGRES_PORT,
    ssl: false,
  },
  verbose: true,
  strict: true,
});
