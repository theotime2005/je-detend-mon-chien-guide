import process from "node:process";

import { disconnect, emptyAllTablesOfDatabase } from "./knex-database-connections.js";

async function main() {
  console.log("Emptying all tables...");
  await emptyAllTablesOfDatabase();
  console.log("Done!");
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await disconnect();
  }
})();
