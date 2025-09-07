import { knex } from "../../../db/knex-database-connection.js";

const TABLE_NAME = "dogs";

async function createDog({
  userId,
  name,
  type,
}) {
  const [id] = await knex(TABLE_NAME).insert({
    userId,
    name,
    type,
    created_at: new Date(),
    updated_at: new Date(),
  }).returning("id");
  return id;
}

async function findDogByUserId(userId) {
  const dog = await knex(TABLE_NAME).where({ userId }).first();
  if (!dog) {
    throw new Error("Dog not found for this user");
  }
  return dog;
}

async function findDogByDogId(dogId) {
  const dog = await knex(TABLE_NAME).where({ id: dogId }).first();
  if (!dog) {
    throw new Error("Dog not found");
  }
  return dog;
}

async function removeDogByUserId(userId) {
  return await knex(TABLE_NAME).where({ userId }).del();
}

async function removeDogByDogId(dogId) {
  return await knex(TABLE_NAME).where({ id: dogId }).del();
}

export { createDog, findDogByDogId, findDogByUserId, removeDogByDogId, removeDogByUserId };
