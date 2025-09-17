import request from "supertest";
import { describe, expect, it } from "vitest";

import { databaseBuilder } from "../../../db/database-builder/index.js";
import server from "../../../server.js";
import { encodedToken } from "../../../src/identities-access-management/services/token-service.js";

describe("Acceptance | Shared | User", () => {
  describe("GET /api/authenticated", () => {
    it("should return 200 http code, firstname and lastname", async () => {
      // given
      const user = await databaseBuilder.factory.buildUser();
      const token = await encodedToken({
        userId: user.id,
      });

      // when
      const response = await request(server)
        .get("/api/authenticated")
        .set("Authorization", `Bearer ${token}`);

      // then
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        data: {
          firstname: user.firstname,
          lastname: user.lastname,
        },
      });
    });

    it("should return 404 if user not found", async () => {
      // given
      const userId = 123;

      // when
      const response = await request(server)
        .get("/api/authenticated")
        .set("Authorization", `Bearer ${await encodedToken({ userId })}`);

      // then
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        message: "User not found",
      });
    });

    it("should return 401 if token is not valid", async () => {
      // when
      const response = await request(server)
        .get("/api/authenticated")
        .set("Authorization", "Bearer invalid_token");

      // then
      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        message: "Invalid token",
      });
    });

    it("should return 401 if token is not provided", async () => {
      // when
      const response = await request(server)
        .get("/api/authenticated");

      // then
      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        message: "No token provided",
      });
    });
  });
});
