import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

import { healthCheckRoute } from "../../../src/shared/routes/health-check-route.js";

describe("Acceptance | Shared | Routes | Health check", () => {
  let server;

  beforeEach(function() {
    server = express();
    server.use(healthCheckRoute);
  });

  describe("GET /health", () => {
    it("should return 200 http code and message", async () => {
      // given
      const message = "API is ok";

      // when
      const response = await request(server).get("/health");

      // then
      expect(response.statusCode).toBe(200);
      expect(response.text).to.be.equal(message);
    });
  });
});
