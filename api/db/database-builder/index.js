import { buildUser } from "./factory/build-user.js";
import { buildDog } from "./factory/buildDog.js";

const databaseBuilder = {
  factory: {
    buildUser,
    buildDog,
  },
};

export { databaseBuilder };
