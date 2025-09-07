import jwt from "jsonwebtoken";

import { config } from "../../../config.js";

async function encodedToken(data) {
  try {
    const token = jwt.sign(data, config.jwt.tokenSecret, {
      expiresIn: config.jwt.expirationTime,
    });
    return token;
  } catch {
    throw new Error("Token encoding failed");
  }
}

async function decodedToken(token) {
  try {
    const decoded = jwt.verify(token, config.jwt.tokenSecret);
    return decoded;
  } catch {
    throw new Error("Token decoding failed");
  }
}

export { decodedToken, encodedToken };
