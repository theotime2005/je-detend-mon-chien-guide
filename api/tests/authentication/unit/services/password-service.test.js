import { describe, expect, it } from "vitest";

import { checkPassword, createPassword } from "../../../../src/authentication/services/password-service.js";


describe("password.service", () => {
  describe("#createPassword", () => {
    it("should return a hash different from the plain password", async () => {
      // given
      const password = "mySuperSecretPassword";

      // when
      const hash = await createPassword(password);

      // then
      expect(hash).not.toBe(password);
      expect(typeof hash).toBe("string");
      expect(hash.length).toBeGreaterThan(10);
    });
  });

  describe("#checkPassword", () => {
    it("should return true if the password matches the hash", async () => {
      // given
      const password = "testPassword";
      const hash = await createPassword(password);

      // when
      const isMatch = await checkPassword(password, hash);

      // then
      expect(isMatch).toBe(true);
    });

    it("should return false if the password does not match the hash", async () => {
      // given
      const password = "testPassword";
      const hash = await createPassword(password);

      // when
      const isMatch = await checkPassword("otherPassword", hash);

      // then
      expect(isMatch).toBe(false);
    });
  });
});
