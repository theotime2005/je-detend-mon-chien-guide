import request from "supertest";
import { describe, expect, it } from "vitest";

import { databaseBuilder } from "../../../db/database-builder/index.js";
import { knex } from "../../../db/knex-database-connection.js";
import server from "../../../server.js";
import { ERRORS, USER_TYPES } from "../../../src/shared/constants.js";

describe("Acceptance | Authentication | Register", () => {

  describe("POST /api/authentication/register", () => {
    it("should return 200 http status code", async () => {
      // given
      const body = {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.net",
        password: "password123",
        userType: USER_TYPES.MASTER_GUIDE_DOG,
      };

      // when
      const response = await request(server)
        .post("/api/authentication/register")
        .send(body);

      // then
      expect(response.statusCode).toBe(201);
      const user = await knex("users").where({ email: body.email }).first();
      expect(user).toBeDefined();
      expect(user.firstname).toBe(body.firstname);
      expect(user.lastname).toBe(body.lastname);
      expect(user.email).toBe(body.email);
      expect(user.userType).toBe(body.userType);
    });

    it("should return 409 status code", async () => {
      // given
      const user = {
        firstname: "Jane",
        lastname: "Doe",
        email: "jane.doe@example.net",
        hashedPassword: "hashedPassword123",
        userType: USER_TYPES.MASTER_GUIDE_DOG,
      };
      await knex("users").insert(user);

      const body = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: "password123",
        userType: user.userType,
      };
      // when
      const response = await request(server).post("/api/authentication/register").send(body);

      // then
      expect(response.statusCode).toBe(409);
      expect(response.body.code).toBe("EXISTS");
    });

    it("should return 400 status if body is invalid", async () => {
      // given
      const body = {
        firstname: "John",
        lastname: "Doe",
        password: "password123",
      };

      // when
      const response = await request(server).post("/api/authentication/register").send(body);

      // then
      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe(ERRORS.INVALID_DATA_FORMAT);
    });
  });

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

      it("should return 401 when user is not active", async () => {
        // given
        await databaseBuilder.factory.buildUser({
          email: "mysuperemail@example.net",
          password: "helloworld",
          isActive: false,
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
