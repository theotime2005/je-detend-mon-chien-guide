import { createPassword } from "../../src/authentication/services/password.service.js";
import { USER_TYPES } from "../../src/shared/constants.js";
import { databaseBuilder } from "../database-builder/index.js";

const hashedPassword = await createPassword("jedetend123");

async function createUserWithMasterType() {
  await databaseBuilder.factory.buildUser({
    firstname: "User",
    lastname: "Master",
    email: "user.master@example.net",
    hashedPassword,
    userType: USER_TYPES.MASTER_GUIDE_DOG,
  });
}

async function createUserWithCompanionType() {
  await databaseBuilder.factory.buildUser({
    firstname: "User",
    lastname: "Companion",
    email: "user.companion@example.net",
    hashedPassword,
    userType: USER_TYPES.COMPANION,
  });
}

async function seed() {
  console.log("seeding users...");
  await createUserWithCompanionType();
  await createUserWithMasterType();
}

export { seed };
