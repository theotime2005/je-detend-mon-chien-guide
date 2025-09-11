import { beforeEach, describe, expect, it, vi } from "vitest";

import { databaseBuilder } from "../../../../db/database-builder/index.js";
import { knex } from "../../../../db/knex-database-connection.js";
import { createDogController } from "../../../../src/dogs/controllers/create-dog-controller.js";

describe("Integration | Dogs | Controllers | Create dog controller", () => {
  let res, next;

  beforeEach(() => {
    res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };
    next = vi.fn();
  });

  it("should create dog successfully", async () => {
    // given
    const user = await databaseBuilder.factory.buildUser();
    const req = {
      user: {
        userId: user.id,
      },
      body: {
        name: "Uno",
        type: "Labrador",
      },
    };

    // when
    await createDogController(req, res, next);

    // then
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalled();
    const createdDog = await knex("dogs").where({ userId: user.id }).first();
    expect(createdDog).toBeDefined();
  });
});
