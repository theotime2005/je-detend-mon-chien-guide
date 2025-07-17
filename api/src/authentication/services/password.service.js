import bcrypt from "bcrypt";

import { config } from "../../../config.js";

async function createPassword(password) {
  const saltRounds = config.users.passwordHash;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
}

async function checkPassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

export { checkPassword, createPassword };
