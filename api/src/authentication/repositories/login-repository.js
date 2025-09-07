import { knex } from "../../../db/knex-database-connection.js";

async function findUserByEmail(email) {
  const user = await knex("users").where({ email }).first();
  if (!user) {
    throw new Error("Invalid credentials");
  }
  return user;
}

async function updateLastLoggedAt(userId) {
  return knex("users").update({ lastLoggedAt: new Date() }).where({ id: userId });
}

export { findUserByEmail, updateLastLoggedAt };
