import Joi from "joi";

import { logger } from "../../shared/logger.js";
import { checkSchema } from "../../shared/middlewares/check-schema.js";
import { findUserByEmail, updateLastLoggedAt } from "../repositories/users-repository.js";
import { checkPassword } from "../services/password-service.js";
import { encodedToken } from "../services/token-service.js";

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

async function loginController(req, res) {
  if (!(await checkSchema(req, res, loginSchema))) return;
  try {
    const foundUser = await findUserByEmail(req.body.email);
    if (!(await checkPassword(req.body.password, foundUser.hashedPassword)) || !foundUser.isActive) {
      throw new Error("Invalid credentials");
    }
    await updateLastLoggedAt(foundUser.id);
    const token = await encodedToken({
      userId: foundUser.id,
    });
    return res.status(200).json({
      data: {
        userId: foundUser.id,
        token,
      },
    });
  } catch (err) {
    switch (err.message) {
    case "Invalid credentials":
      return res.status(401).json({
        error: {
          message: "Invalid credentials",
        },
      });
    default:
      logger.error(`Login error: ${err}`);
      return res.status(500).json({
        error: {
          message: "Internal server error",
        },
      });
    }
  }
}

export { loginController };
