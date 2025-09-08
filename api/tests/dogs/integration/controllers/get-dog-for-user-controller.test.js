import { beforeEach, describe, expect, it, vi } from "vitest";

import { databaseBuilder } from "../../../../db/database-builder/index.js";
import { getDogForUserController } from "../../../../src/dogs/controllers/get-dog-for-user-controller.js";

describe("Integration | Dogs | Controller | Get dog for user controller", () => {
  let res, next;

  beforeEach(() => {
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockResolvedValue(),
      send: vi.fn().mockResolvedValue(),
    };
    next = vi.fn();
  });

  it("should return the dog", async () => {
    // given
    const user = await databaseBuilder.factory.buildUser();
    const dog = await databaseBuilder.factory.buildDog({ userId: user.id });
    const req = {
      user: { userId: user.id },
    };

    // when
    await getDogForUserController(req, res, next);

    // then
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      userId: user.id,
      data: {
        id: dog.id,
        name: dog.name,
        type: dog.type,
        userId: dog.userId,
        created_at: dog.created_at,
        updated_at: dog.updated_at,
      },
    });
  });

  it("should return 404 if not found", async () => {
    // given
    const userId = 123;
    const req = {
      user: { userId },
    };

    // when
    await getDogForUserController(req, res, next);

    // then
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
