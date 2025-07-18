import request from "supertest";
import { describe, expect, it } from "vitest";

import { databaseBuilder } from "../../../db/database-builder/index.js";
import server from "../../../server.js";

describe("Acceptance |  Authentication | Route | login", () => {
  describe("POST /api/authentication/login", () => {
    it("should return 200 http status code", async () => {
      // given
      const user = await databaseBuilder.factory.buildUser();

      const body = {
        email: user.email,
        password: "password",
      };

      // when
      const response = await request(server)
        .post("/api/authentication/login")
        .send(body);

      // then
      expect(response.statusCode).toBe(200);
      const expectedResponse = {
        data: {
          userId: user.id,
          token: expect.any(String),
        },
      };
      expect(response.body).toEqual(expectedResponse);
    });

    describe("error cases", () => {
      it("should return 401 when user not found", async () => {
        // given
        const body = {
          email: "mysuperemail@example.net",
          password: "password",
        };

        // when
        const response = await request(server)
          .post("/api/authentication/login")
          .send(body);

        // then
        expect(response.statusCode).toBe(401);
      });

      it("should return 401 when password is incorrect", async () => {
        // given
        await databaseBuilder.factory.buildUser({
          email: "mysuperemail@example.net",
          password: "helloworld",
        });

        const body = {
          email: "mysuperemail@example.net",
          password: "password",
        };

        // when
        const response = await request(server)
          .post("/api/authentication/login")
          .send(body);

        // then
        expect(response.statusCode).toBe(401);
        expect(response.body.error.message).toEqual("Invalid credentials");
      });
    });
  });
});
