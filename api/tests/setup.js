import { afterAll, afterEach, beforeEach, vi } from "vitest";

import { knex } from "../db/knex-database-connection.js";

beforeEach(async () => {
  const tables = await knex("pg_tables")
    .select("tablename")
    .where("schemaname", "public");
  for (const { tablename } of tables) {
    await knex(tablename).truncate();
  }
});

afterEach(function() {
  vi.restoreAllMocks();
});

afterAll(async () => {
  await knex.destroy();
});
