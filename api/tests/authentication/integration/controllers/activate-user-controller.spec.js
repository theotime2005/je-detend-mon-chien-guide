import { beforeEach, describe, expect, it, vi } from "vitest";

import { databaseBuilder } from "../../../../db/database-builder/index.js";
import { knex } from "../../../../db/knex-database-connection.js";
import { activateUserController } from "../../../../src/authentication/controllers/activate-user-controller.js";
import { encodedToken } from "../../../../src/authentication/services/token-service.js";
import { ERRORS } from "../../../../src/shared/constants.js";

describe("Integration | Authentication | Controllers | Activate user controller", () => {
  let res;

  beforeEach(() => {
    res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };
  });

  it("should activate user successfully", async () => {
    // given
    const user = await databaseBuilder.factory.buildUser({ isActive: false });
    const token = await encodedToken({ userId: user.id });
    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    // when
    await activateUserController(req, res);

    // then
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
    const activatedUser = await knex("users").where({ id: user.id }).first();
    expect(activatedUser.isActive).toBe(true);
  });

  describe("error cases", () => {
    describe("when user does not exists", () => {
      it(`should return 404 status code and ${ERRORS.USER_NOT_FOUND} error`, async () => {
        // given
        const token = await encodedToken({ userId: 12345 });
        const req = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        };

        // when
        await activateUserController(req, res);

        // then
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({ message: ERRORS.USER_NOT_FOUND });
      });
    });

    describe("when user is already activated", () => {
      it(`should return 400 status code and ${ERRORS.USER_ALREADY_ACTIVE} error`, async () => {
        // given
        const { id } = await databaseBuilder.factory.buildUser();
        const token = await encodedToken({ userId: id });
        const req = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        };

        // when
        await activateUserController(req, res);

        // then
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({ message: ERRORS.USER_ALREADY_ACTIVE });
      });
    });
  });
});
