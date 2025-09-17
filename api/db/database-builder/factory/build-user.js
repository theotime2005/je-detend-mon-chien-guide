import { createPassword } from "../../../src/identities-access-management/services/password-service.js";
import { USER_TYPES } from "../../../src/shared/constants.js";
import { knex } from "../../knex-database-connection.js";


async function buildUser({
  firstname = "John",
  lastname = "Doe",
  email = "john.doe@example.net",
  password = "password",
  hashedPassword = null,
  userType = USER_TYPES.MASTER_GUIDE_DOG,
  isActive = true,
  shouldChangePassword = false,
  lastLoggedAt = null,
} = {}) {
  if (!hashedPassword) {
    hashedPassword = await createPassword(password);
  }
  const [values] = await knex("users").insert({
    firstname,
    lastname,
    email,
    hashedPassword,
    userType,
    lastLoggedAt,
    isActive,
    shouldChangePassword,
  }).returning("*");

  return values;
}

export { buildUser };
