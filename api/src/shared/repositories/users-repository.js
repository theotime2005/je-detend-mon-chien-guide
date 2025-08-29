import { knex } from "../../../db/knex-database-connection.js";

async function findUserById(userId) {
  return await knex("users").where({ id: userId }).first() || null;
}

export { findUserById };
