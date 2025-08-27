import { beforeEach, describe, expect, it, vi } from "vitest";

import * as authentication from "@/adapters/authentication.js";
import { USER_TYPES } from "@/constants.js";

describe("Unit |  Adapters | Authentication", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("#register", () => {
    it("should return true if server returns 200", async () => {
      // given
      const user = {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.net",
        password: "password",
        userType: USER_TYPES.MASTER_GUIDE_DOG.type,
      };
      vi.spyOn(global, "fetch").mockResolvedValue({
        status: 200,
      });

      // when
      const result = await authentication.registerUser(user);

      // then
      expect(result).toBe(true);
    });

    it("should return false if code is not 200", async () => {
      // given
      const user = {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.net",
        password: "password",
        userType: USER_TYPES.MASTER_GUIDE_DOG.type,
      };
      vi.spyOn(global, "fetch").mockResolvedValue({
        status: 409,
      });

      // when
      const result = await authentication.registerUser(user);

      // then
      expect(result).toBe(false);
    });

    it("should return false if an error occured", async () => {
      // given
      const user = {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.net",
        password: "password",
        userType: USER_TYPES.MASTER_GUIDE_DOG.type,
      };
      vi.spyOn(global, "fetch").mockRejectedValue(new Error("Network error"));

      // when
      const resultPromise = await authentication.registerUser(user);

      // then
      expect(resultPromise).toBe(false);
    });
  });
});
