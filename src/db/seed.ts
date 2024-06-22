import { Table, getTableName, sql } from "drizzle-orm";
// import env from '@/env';
import { db, connection } from "@/db";
import * as schema from "@/db/schema";
import * as seeds from "@/db/seeds";

// if (!env.DB_SEEDING) {
//   throw new Error('You must set DB_SEEDING to "true" when running seeds');
// }

async function resetTable(db: db, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`)
  );
}

async function main() {
  for (const table of [schema.users, schema.listings]) {
    // await db.delete(table); // clear tables without truncating / resetting ids
    await resetTable(db, table);
  }

  await seeds.users(db);
  await seeds.listings(db);
  await seeds.propertyAddresses(db);
  await seeds.clients(db);
  await seeds.residentials(db);
  await seeds.commercials(db);
  await seeds.industrials(db);
  await seeds.lands(db);

  await connection.end();
}

main();
