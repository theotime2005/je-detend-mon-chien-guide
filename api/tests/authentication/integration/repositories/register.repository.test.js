import { describe, expect, it } from "vitest";

import { knex } from "../../../../db/knex-database-connection.js";
import * as registerRepository from "../../../../src/authentication/repositories/register.repository.js";
import { USER_TYPES } from "../../../../src/shared/constants.js";

describe("Integration | Authentication | Repository | Register", () => {

  describe("#createUser", () => {
    it("should return the user id", async () => {
      // given
      const firstname = "John";
      const lastname = "Doe";
      const email = "john.doe@example.net";
      const hashedPassword = "password123";
      const userType = USER_TYPES.MASTER_GUIDE_DOG;

      // when
      const { id } = await registerRepository.createUser({ firstname, lastname, email, hashedPassword, userType });

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
      await knex("users").insert(existingUser);

      // when
      const promise = registerRepository.createUser(existingUser);

      // then
      await expect(promise).rejects.toThrow(new Error("this email is already in database"));
    });
  });
});
