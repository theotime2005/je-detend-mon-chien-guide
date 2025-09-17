import jwt from "jsonwebtoken";
import { describe, expect, it, vi } from "vitest";

import { config } from "../../../../config.js";
import { decodedToken, encodedToken } from "../../../../src/identities-access-management/services/token-service.js";

describe("token.service", () => {
  const payload = { id: 1, email: "test@example.com" };

  describe("#encodedToken", () => {
    it("should return a valid token for valid data", async () => {
      // given
      const data = payload;
      // when
      const token = await encodedToken(data);
      // then
      expect(typeof token).toBe("string");
      const decoded = jwt.verify(token, config.jwt.tokenSecret);
      expect(decoded.id).toBe(data.id);
      expect(decoded.email).toBe(data.email);
    });

    it("should throw an error if encoding fails", async () => {
      // given
      vi.spyOn(jwt, "sign").mockImplementation(() => { throw new Error("fail"); });
      // when & then
      await expect(encodedToken(payload)).rejects.toThrow("Token encoding failed");
    });
  });

  describe("#decodedToken", () => {
    it("should return decoded data for a valid token", async () => {
      // given
      const token = jwt.sign(payload, config.jwt.tokenSecret, { expiresIn: config.jwt.expirationTime });
      // when
      const decoded = await decodedToken(token);
      // then
      expect(decoded.id).toBe(payload.id);
      expect(decoded.email).toBe(payload.email);
    });

    it("should throw an error if decoding fails", async () => {
      // given
      const invalidToken = "invalid.token";
      // when & then
      await expect(decodedToken(invalidToken)).rejects.toThrow("Token decoding failed");
    });
  });
});
