import { afterAll, beforeEach } from "vitest";

import { knex } from "../db/knex-database-connection.js";

beforeEach(async () => {
  const tables = await knex("pg_tables")
    .select("tablename")
    .where("schemaname", "public");
  for (const { tablename } of tables) {
    await knex(tablename).truncate();
  }
});

afterAll(async () => {
  await knex.destroy();
});
