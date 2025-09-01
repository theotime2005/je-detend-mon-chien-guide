import { describe, expect, it, vi } from "vitest";

import checkUser from "@/adapters/authenticated/check-user.js";
import { useAuthenticatedStore } from "@/stores/authenticated.js";

vi.mock("@/adapters/authenticated/check-user.js");

describe("Integration | Store | Authenticated", () => {
  describe("#getAuthenticated", () => {
    it("should set correctly values of firstname and lastname", async () => {
      // given
      const data = {
        firstname: "John",
        lastname: "Doe",
      };
      checkUser.mockResolvedValue(data);

      // when
      const result = useAuthenticatedStore();
      await result.getAuthenticated();

      // then
      expect(result.firstname).toBe(data.firstname);
      expect(result.lastname).toBe(data.lastname);
    });

    it("should return false if no data provided", async () => {
      // given
      checkUser.mockResolvedValue(null);

      // when
      const result = useAuthenticatedStore();
      const isAuthenticated = await result.getAuthenticated();

      // then
      expect(isAuthenticated).toBe(false);
      expect(result.firstname).toBe(null);
      expect(result.lastname).toBe(null);
    });
  });
});
