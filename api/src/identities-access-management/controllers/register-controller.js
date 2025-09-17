import Joi from "joi";

import { USER_TYPES } from "../../shared/constants.js";
import { logger } from "../../shared/logger.js";
import { checkSchema } from "../../shared/middlewares/check-schema.js";
import { createUser } from "../repositories/users-repository.js";
import { createPassword } from "../services/password-service.js";
import { sendMailToActivateUserService } from "../services/send-mail-to-activate-user-service.js";

const createUserSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  userType: Joi.string().required().valid(...Object.values(USER_TYPES)),
});

export async function registerController(req, res) {
  if (!(await checkSchema(req, res, createUserSchema))) return;
  try {
    const { firstname, lastname, email, password, userType } = req.body;
    const hashedPassword = await createPassword(password);
    const { id } = await createUser({
      firstname,
      lastname,
      email,
      hashedPassword,
      userType,
    });
    await sendMailToActivateUserService({
      userId: id,
      firstname,
      lastname,
      email,
    });
    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    switch (err.message) {
    case "this email is already in database":
      return res.status(409).json({
        message: "This email is already in use",
        code: "EXISTS",
      });
    default:
      logger.error(`Error in createUser: ${err}`);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
