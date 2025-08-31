import { describe, expect, it } from "vitest";

import { databaseBuilder } from "../../../../db/database-builder/index.js";
import * as usersRepository from "../../../../src/shared/repositories/users-repository.js";

describe("Integration | Shared | Repositories | Users Repository", () => {
  it("should return user information when exists", async () => {
    // given
    const userCreated = await databaseBuilder.factory.buildUser();

    // when
    const user = await usersRepository.findUserById(userCreated.id);

    // then
    expect(user).toEqual(userCreated);
  });

  it("should return null if user does not exist", async () => {
    // given
    const nonExistentUserId = 9999;

    // when
    const user = await usersRepository.findUserById(nonExistentUserId);

    // then
    expect(user).toBeNull();
  });
});
