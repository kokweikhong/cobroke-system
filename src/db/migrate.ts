import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, connection } from "@/db";

async function main() {
  await migrate(db, { migrationsFolder: "./src/db/migrations" });

  await connection.end();
}

main();
