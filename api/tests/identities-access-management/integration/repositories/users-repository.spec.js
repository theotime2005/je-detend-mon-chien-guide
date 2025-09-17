import { beforeEach, describe, expect, it, vi } from "vitest";

import { databaseBuilder } from "../../../../db/database-builder/index.js";
import { knex } from "../../../../db/knex-database-connection.js";
import * as usersRepository from "../../../../src/identities-access-management/repositories/users-repository.js";
import { USER_TYPES } from "../../../../src/shared/constants.js";

describe("Integration | Identities Access Management | Repositories | Users Repository", () => {
  describe("#findUserByUserId", () => {
    it("should return user information when exists", async () => {
      // given
      const userCreated = await databaseBuilder.factory.buildUser();

      // when
      const user = await usersRepository.findUserById(userCreated.id);

      // then
      expect(user).toEqual(userCreated);
    });

    it("should return null if user does not exist", async () => {
      // given
      const nonExistentUserId = 9999;

      // when
      const user = await usersRepository.findUserById(nonExistentUserId);

      // then
      expect(user).toBeNull();
    });
  });

  describe("#findUserByEmail", () => {
    it("should return the user", async () => {
      // given
      const user = await databaseBuilder.factory.buildUser();

      // when
      const foundUser = await usersRepository.findUserByEmail(user.email);

      // then
      expect(foundUser).toBeDefined();
      expect(foundUser.firstname).toEqual(user.firstname);
      expect(foundUser.lastname).toEqual(user.lastname);
      expect(foundUser.email).toEqual(user.email);
      expect(foundUser.hashedPassword).toEqual(user.hashedPassword);
    });

    it("should throw an error if user is not found", async () => {
      // given
      const email = "mysuperemail@example.net";
      await databaseBuilder.factory.buildUser({ email: "myotheremail@example.net" });

      // when
      const foundUser = usersRepository.findUserByEmail(email);

      // then
      await expect(foundUser).rejects.toThrowError("Invalid credentials");
    });
  });

  describe("#updateLastLoggedAt", () => {
    let now;
    beforeEach(function() {
      now = new Date("2023-01-01T00:00:00Z");
      vi.spyOn(global, "Date").mockImplementation(() => now);
    });

    it("should update date when is null", async () => {
      // given
      const user = await databaseBuilder.factory.buildUser();

      // when
      await usersRepository.updateLastLoggedAt(user.id);

      // then
      const updatedUser = await knex("users").where({ id: user.id }).first();
      expect(updatedUser.lastLoggedAt).toEqual(now);
    });

    it("should update date when already exists", async () => {
      // given
      const oldDate = new Date("2022-01-01T00:00:00Z");
      const { id } = await databaseBuilder.factory.buildUser({ lastLoggedAt: oldDate });

      // when
      await usersRepository.updateLastLoggedAt(id);

      // then
      const updatedUser = await knex("users").where({ id }).first();
      expect(updatedUser.lastLoggedAt).toEqual(now);
    });
  });

  describe("#createUser", () => {
    it("should return the user id", async () => {
      // given
      const firstname = "John";
      const lastname = "Doe";
      const email = "john.doe@example.net";
      const hashedPassword = "password123";
      const userType = USER_TYPES.MASTER_GUIDE_DOG;

      // when
      const { id } = await usersRepository.createUser({ firstname, lastname, email, hashedPassword, userType });

      // then
      const user = await knex("users").where({ id }).first();
      expect(user).toBeDefined();
      expect(user.firstname).toBe(firstname);
      expect(user.lastname).toBe(lastname);
      expect(user.email).toBe(email);
      expect(user.hashedPassword).toBe(hashedPassword);
      expect(user.userType).toBe(userType);
    });

    it("should throw an error if user email already exists", async () => {
      // given
      const existingUser = {
        firstname: "Jane",
        lastname: "Doe",
        email: "john.doe@example.net",
        hashedPassword: "password123",
        userType: USER_TYPES.MASTER_GUIDE_DOG,
      };
      await databaseBuilder.factory.buildUser(existingUser);

      // when
      const promise = usersRepository.createUser(existingUser);

      // then
      await expect(promise).rejects.toThrow(new Error("this email is already in database"));
    });
  });

  describe("#activateUserByUserId", () => {
    it("should update isActive column", async () => {
      // given
      const userWithNoChange = await databaseBuilder.factory.buildUser({ email: "no-change@example.net", isActive: false });
      const userToChange = await databaseBuilder.factory.buildUser({ email: "change@example.net", isActive: false });

      // when
      await usersRepository.activateUserByUserId(userToChange.id);

      // then
      const userWithNoChangeFromDb = await knex("users").where({ id: userWithNoChange.id }).first();
      expect(userWithNoChangeFromDb.isActive).toBe(false);

      const userToChangeFromDb = await knex("users").where({ id: userToChange.id }).first();
      expect(userToChangeFromDb.isActive).toBe(true);
    });
  });
});
