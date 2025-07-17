import { knex } from "../../../db/knex-database-connection.js";

const TABLE_NAME = "users";

async function createUser({ firstname, lastname, email, hashedPassword }) {
  const existingUser = await knex(TABLE_NAME).where({ email });
  if (existingUser.length) {
    throw new Error("this email is already in database");
  }
  const [id] = await knex(TABLE_NAME).insert({
    firstname,
    lastname,
    email,
    hashedPassword,
    created_at: new Date(),
    updated_at: new Date(),
  }).returning("id");
  return id;
}

export { createUser };
