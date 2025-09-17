import { beforeEach, describe, expect, it, vi } from "vitest";

import { databaseBuilder } from "../../../../db/database-builder/index.js";
import getUserInfosController
  from "../../../../src/identities-access-management/controllers/get-user-infos-controller.js";

describe("Integration | Controller | Identities Access Management | Get user infos", () => {
  let res;

  beforeEach(() => {
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnValue(),
    };
  });

  it("should call status with 200 and json with user infos", async () => {
    // given
    const user = await databaseBuilder.factory.buildUser({ isActive: true });
    const req = { user: { userId: user.id } };

    // when
    await getUserInfosController(req, res);

    // then
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        userType: user.userType,
      },
    });
  });

  it("should throw an error if user not found", async () => {
    // given
    const req = { user: { userId: 123456789 } };

    // when
    await getUserInfosController(req, res);

    // then
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });
});
