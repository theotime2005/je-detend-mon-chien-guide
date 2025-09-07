import { createPassword } from "../../src/authentication/services/password-service.js";
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
    isActive: true,
  });
}

async function createUserWithDog() {
  const { id } = await databaseBuilder.factory.buildUser({
    firstname: "dog",
    lastname: "master",
    email: "dog.master@example.net",
    hashedPassword,
    lastLoggedAt: new Date(),
  });
  await databaseBuilder.factory.buildDog({
    userId: id,
    name: "Dogo",
    type: "Labrador",
  });
}

async function createUserWithCompanionType() {
  await databaseBuilder.factory.buildUser({
    firstname: "User",
    lastname: "Companion",
    email: "user.companion@example.net",
    hashedPassword,
    userType: USER_TYPES.COMPANION,
    isActive: true,
  });
}

async function createUserNotActive() {
  await databaseBuilder.factory.buildUser({
    firstname: "User",
    lastname: "NotActive",
    email: "user.notactive@example.net",
    hashedPassword,
    isActive: false,
  });
}

async function createUserWithShouldChangePassword() {
  await databaseBuilder.factory.buildUser({
    firstname: "User",
    lastname: "ShouldChangePassword",
    email: "user.shouldchangepassword@example.net",
    hashedPassword,
    shouldChangePassword: true,
    isActive: true,
  });
}

async function seed() {
  console.log("seeding users...");
  await createUserWithCompanionType();
  await createUserWithMasterType();
  await createUserWithDog();
  await createUserNotActive();
  await createUserWithShouldChangePassword();
}

export { seed };
