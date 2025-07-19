import { beforeEach, describe, expect, it, vi } from "vitest";

import { databaseBuilder } from "../../../../db/database-builder/index.js";
import { knex } from "../../../../db/knex-database-connection.js";
import * as loginRepository from "../../../../src/authentication/repositories/login.repository.js";

describe("Integration | Authentication | Repositories | Login Repository", () => {
  describe("#findUserByEmail", () => {
    it("should return the user", async () => {
      // given
      const user = await databaseBuilder.factory.buildUser();

      // when
      const foundUser = await loginRepository.findUserByEmail(user.email);

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
      const foundUser = loginRepository.findUserByEmail(email);

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
      await loginRepository.updateLastLoggedAt(user.id);

      // then
      const updatedUser = await knex("users").where({ id: user.id }).first();
      expect(updatedUser.lastLoggedAt).toEqual(now);
    });

    it("should update date when already exists", async () => {
      // given
      const oldDate = new Date("2022-01-01T00:00:00Z");
      const { id } = await databaseBuilder.factory.buildUser({ lastLoggedAt: oldDate });

      // when
      await loginRepository.updateLastLoggedAt(id);

      // then
      const updatedUser = await knex("users").where({ id }).first();
      expect(updatedUser.lastLoggedAt).toEqual(now);
    });
  });
});
