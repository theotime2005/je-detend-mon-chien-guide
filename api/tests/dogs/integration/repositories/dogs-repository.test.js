import { describe, expect, it } from "vitest";

import { databaseBuilder } from "../../../../db/database-builder/index.js";
import { knex } from "../../../../db/knex-database-connection.js";
import * as dogRepository from "../../../../src/dogs/repositories/dogs-repository.js";

describe("Integration | Dogs | repositories | Dogs repository", () => {
  describe("#createDog", () => {
    it("should create dog correctly", async () => {
      // given
      const user = await databaseBuilder.factory.buildUser();

      // when
      const { id } = await dogRepository.createDog({
        userId: user.id,
        name: "Uno",
        type: "Golden",
      });

      // then
      const dog = await knex("dogs").where({ id }).first();
      expect(dog).toBeDefined();
      expect(dog.userId).toBe(user.id);
      expect(dog.name).toBe("Uno");
      expect(dog.type).toBe("Golden");
    });
  });

  describe("#findDogByUserId", () => {
    it("should return dog with userId", async () => {
      // given
      const user = await databaseBuilder.factory.buildUser();
      const dog = await databaseBuilder.factory.buildDog({ userId: user.id });

      // when
      const findDog = await dogRepository.findDogByUserId(user.id);

      // then
      expect(findDog).toBeDefined();
      expect(findDog.id).toBe(dog.id);
      expect(findDog.userId).toBe(user.id);
      expect(findDog.name).toBe(dog.name);
      expect(findDog.type).toBe(dog.type);
    });

    it("should throw an error if dog not found", async () => {
      // given
      const user = await databaseBuilder.factory.buildUser();

      // when
      const findDog = dogRepository.findDogByUserId(user.id);

      // then
      await expect(findDog).rejects.toThrowError("Dog not found for this user");
    });
  });

  describe("#findDogByDogId", () => {
    it("should return dog information", async () => {
      // given
      const dog = await databaseBuilder.factory.buildDog({ userId: null });

      // when
      const findDog = await dogRepository.findDogByDogId(dog.id);

      // then
      expect(findDog).toBeDefined();
      expect(findDog.id).toBe(dog.id);
      expect(findDog.name).toBe(dog.name);
      expect(findDog.type).toBe(dog.type);
    });

    it("should throw an error if dog not found", async () => {
      // when
      const dog = dogRepository.findDogByDogId(9999);

      // then
      await expect(dog).rejects.toThrowError("Dog not found");
    });
  });

  describe("#removeDogByUserId", () => {
    it("should remove dog with userId", async () => {
      // given
      const user = await databaseBuilder.factory.buildUser();
      await databaseBuilder.factory.buildDog({ userId: user.id });

      // when
      await dogRepository.removeDogByUserId(user.id);

      // then
      const dog = await knex("dogs").where({ userId: user.id }).first();
      expect(dog).toBeUndefined();
    });
  });

  describe("#removeDogByDogId", () => {
    it("should ", async () => {
      // given
      const dogToDelete = await databaseBuilder.factory.buildDog({ userId: null });

      // when
      await dogRepository.removeDogByDogId(dogToDelete.id);

      // then
      const dog = await knex("dogs").where({ id: dogToDelete.id }).first();
      expect(dog).toBeUndefined();
    });
  });
});
