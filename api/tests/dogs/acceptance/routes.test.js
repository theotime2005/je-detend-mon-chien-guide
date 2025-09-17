import request from "supertest";
import { describe, expect, it } from "vitest";

import { databaseBuilder } from "../../../db/database-builder/index.js";
import server from "../../../server.js";
import { encodedToken } from "../../../src/identities-access-management/services/token-service.js";

describe("Acceptance | Dogs | Dogs route", () => {
  describe("POST /api/dogs/", () => {
    it("should return 201 http status code", async () => {
      // given
      const user = await databaseBuilder.factory.buildUser();
      const token = await encodedToken({ userId: user.id });
      const data = {
        name: "Verlen",
        type: "Labradoodle",
      };

      // when
      const response = await request(server)
        .post("/api/dogs")
        .set("Authorization", `Bearer ${token}`)
        .send(data);

      // then
      expect(response.status).toBe(201);
    });
  });

  describe("GET /api/dogs/user", () => {
    it("should return the dog for userId", async () => {
      // given
      const user = await databaseBuilder.factory.buildUser();
      await databaseBuilder.factory.buildDog({ userId: user.id });
      const token = await encodedToken({ userId: user.id });

      // when
      const response = await request(server)
        .get("/api/dogs/user")
        .set("Authorization", `Bearer ${token}`);

      // then
      expect(response.status).toBe(200);

    });
  });
});
