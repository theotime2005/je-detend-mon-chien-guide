import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

import { knex } from "../../../db/knex-database-connection.js";
import { registerRoute } from "../../../src/authentication/routes/register-route.js";
import { ERRORS } from "../../../src/shared/constants.js";

describe("Acceptance | Authentication | Register", () => {
  let server;

  beforeEach(async function() {
    server = express();
    server.use(express.json());
    server.use(registerRoute);
    await knex("users").del();
  });

  describe("POST /api/authentication/register", () => {
    it("should return 200 http status code", async () => {
      // given
      const body = {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.net",
        password: "password123",
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
    });

    it("should return 409 status code", async () => {
      // given
      const user = {
        firstname: "Jane",
        lastname: "Doe",
        email: "jane.doe@example.net",
        hashedPassword: "hashedPassword123",
      };
      await knex("users").insert(user);

      const body = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: "password123",
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
});
