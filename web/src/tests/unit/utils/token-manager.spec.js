import { describe, expect, it } from "vitest";

import { STORAGE_VARIABLES } from "@/constants.js";
import * as authentication from "@/utils/token-manager.js";

describe("Unit | Utils | Token manager", () => {
  describe("#setLogin", () => {
    it("should set the token on localStorage", () => {
      // given
      const token = "abc123";

      // when
      authentication.setLogin(token);

      // then
      expect(localStorage.getItem(STORAGE_VARIABLES.token)).toBe(token);
    });
  });

  describe("#getLogin", () => {
    it("should return the token in localStorage", () => {
      // given
      const token = "abc123";
      localStorage.setItem(STORAGE_VARIABLES.token, token);

      // when
      const result = authentication.getLogin();

      // then
      expect(result).toBe(token);
    });
  });

  describe("#clearLogin", () => {
    it("should remove only the token", () => {
      // given
      const token = "abc123";
      localStorage.setItem(STORAGE_VARIABLES.token, token);
      localStorage.setItem("other_variable", "other_value");

      // when
      authentication.clearLogin();

      // then
      expect(localStorage.getItem(STORAGE_VARIABLES.token)).toBe(null);
    });
  });
});
