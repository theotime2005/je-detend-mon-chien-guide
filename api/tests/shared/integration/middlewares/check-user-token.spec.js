import { beforeEach, describe, expect, it, vi } from "vitest";

import { encodedToken } from "../../../../src/authentication/services/token-service.js";
import { ERRORS } from "../../../../src/shared/constants.js";
import { checkUserToken } from "../../../../src/shared/middlewares/check-user-token.js";

describe("Integration | Middlewares | Check user token", () => {
  let res, next;

  beforeEach(() => {
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    next = vi.fn();
  });

  it("should return 401 when there is no token ", async () => {
    // given
    const req = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // when
    await checkUserToken(req, res, next);

    // then
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: ERRORS.NO_TOKEN_PROVIDED });
  });

  it("should return 401 when token is invalid", async () => {
    // given
    const req = {
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer abcdefg",
      },
    };

    // when
    await checkUserToken(req, res, next);

    // then
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: ERRORS.INVALID_TOKEN });
  });

  it("should return next and update req when token is valid", async () => {
    // given
    const token = await encodedToken({
      message: "test succeeded",
    });
    const req = {
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    };

    // when
    await checkUserToken(req, res, next);

    // then
    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
    expect(req.user.message).toBe("test succeeded");
  });
});
