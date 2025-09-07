import { beforeEach, describe, expect, it, vi } from "vitest";

import * as authentication from "@/adapters/authentication.js";
import { STORAGE_VARIABLES, USER_TYPES } from "@/constants.js";

describe("Unit |  Adapters | Authentication", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("#registerUser", () => {
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
        status: 201,
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

    it("should return false if an error occurred", async () => {
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

  describe("#activateUser", () => {
    it("should return true if request response with 204", async () => {
      // given
      const token = "abc123";
      vi.spyOn(global, "fetch").mockResolvedValue({
        status: 204,
      });

      // when
      const result = await authentication.activateUser(token);

      // then
      expect(fetch).toHaveBeenCalledWith("/api/authentication/register", {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      expect(result).toBe(true);
    });

    it("should return false if request response code is not 204", async () => {
      // given
      const token = "abc123";
      vi.spyOn(global, "fetch").mockResolvedValue({
        status: 400,
      });

      // when
      const result = await authentication.activateUser(token);

      // then
      expect(result).toBe(false);
    });

    it("should return false if an error occurred", async () => {
      // given
      const token = "abc123";
      vi.spyOn(global, "fetch").mockRejectedValue(new Error("Network error"));

      // when
      const result = await authentication.activateUser(token);

      // then
      expect(result).toBe(false);
    });
  });

  describe("#loginUser", () => {
    beforeEach(() => {
      localStorage.clear();
    });
    it("should save token in localStorage", async () => {
      // given
      const user = {
        email: "john.doe@example.net",
        password: "password123",
      };
      vi.spyOn(global, "fetch").mockResolvedValue({
        status: 200,
        json: vi.fn().mockResolvedValue({
          data: {
            userId: 1,
            token: "abc123",
          },
        }),
      });

      // when
      const result = await authentication.loginUser(user);

      // then
      expect(result).toBe(true);
      const token = localStorage.getItem(STORAGE_VARIABLES.token);
      expect(token).toBe("abc123");
    });

    it("should return message when invalid credentials", async () => {
      // given
      const user = {
        email: "john.doe@example.net",
        password: "password123",
      };
      vi.spyOn(global, "fetch").mockResolvedValue({
        status: 401,
      });

      // when
      const result = await authentication.loginUser(user);

      // then
      expect(result).toBe("Email ou mot de passe incorrect.");
      const token = localStorage.getItem(STORAGE_VARIABLES.token);
      expect(token).toBeNull();
    });

    it("should return message if an error occurred", async () => {
      // given
      const user = {
        email: "john.doe@example.net",
        password: "password123",
      };
      vi.spyOn(global, "fetch").mockRejectedValue(new Error("Network error"));

      // when
      const result = await authentication.loginUser(user);

      // then
      expect(result).toBe("Une erreur est survenue");
    });
  });
});
