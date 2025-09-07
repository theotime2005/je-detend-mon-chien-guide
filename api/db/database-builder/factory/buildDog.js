import { knex } from "../../knex-database-connection.js";

async function buildDog({
  userId = null,
  name = "Uno",
  type = "Labrador",
}) {
  const [values] = await knex("dogs").insert({
    name, type, userId,
  }).returning("*");

  return values;
}

export { buildDog };
