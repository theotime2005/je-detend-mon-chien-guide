import { knex } from "../../../db/knex-database-connection.js";

const TABLE_NAME = "users";

async function findUserById(userId) {
  return await knex("users").where({ id: userId }).first() || null;
}

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

async function createUser({ firstname, lastname, email, hashedPassword, userType }) {
  const existingUser = await knex(TABLE_NAME).where({ email });
  if (existingUser.length) {
    throw new Error("this email is already in database");
  }
  const [id] = await knex(TABLE_NAME).insert({
    firstname,
    lastname,
    email,
    hashedPassword,
    userType,
    created_at: new Date(),
    updated_at: new Date(),
  }).returning("id");
  return id;
}

async function activateUserByUserId(userId) {
  return await knex(TABLE_NAME).where({ id: userId }).update({ isActive: true, updated_at: new Date() });
}

export { activateUserByUserId, createUser, findUserByEmail, findUserById, updateLastLoggedAt };
