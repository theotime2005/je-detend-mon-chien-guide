import Joi from "joi";

import { ERRORS, USER_TYPES } from "../../shared/constants.js";
import * as registerRepository from "../repositories/register.repository.js";
import { createPassword } from "../services/password.service.js";

const createUserSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  userType: Joi.string().required().valid(...Object.values(USER_TYPES)),
});

export async function createUser(req, res) {
  const { error } = createUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      code: ERRORS.INVALID_DATA_FORMAT,
    });
  }
  try {
    const { firstname, lastname, email, password, userType } = req.body;
    const hashedPassword = await createPassword(password);
    await registerRepository.createUser({
      firstname,
      lastname,
      email,
      hashedPassword,
      userType,
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
      console.error(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
