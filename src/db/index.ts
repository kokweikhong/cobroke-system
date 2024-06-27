import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import config from "@/config";
import * as schema from "@/db/schema";

export const connection = postgres({
  host: config.POSTGRES_HOST,
  user: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  port: config.POSTGRES_PORT,
  ssl: false,
});

// export const connection = postgres(process.env.POSTGRES_URL!);

console.log("POSTGRES_URL", config);

export const db = drizzle(connection, {
  schema,
  logger: true,
});

export type db = typeof db;

export default db;
