import request from "supertest";
import { describe, expect, it } from "vitest";

import server from "../../../server.js";

describe("Acceptance | Shared | Routes | Health check", () => {

  describe("GET /health", () => {
    it("should return 200 http code and message", async () => {
      // given
      const message = "API is ok";

      // when
      const response = await request(server).get("/health");

      // then
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe(message);
    });
  });
});
