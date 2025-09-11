import Joi from "joi";

import { logger } from "../../shared/logger.js";
import { checkSchema } from "../../shared/middlewares/check-schema.js";
import { createDog } from "../repositories/dogs-repository.js";

const dogSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
});

async function createDogController(req, res) {
  if (!(await checkSchema(req, res, dogSchema))) return;
  try {
    const { name, type } = req.body;
    await createDog({
      userId: req.user.userId,
      name,
      type,
    });
    return res.status(201).send();
  } catch (error) {
    logger.error(`Error creating dog ${error}`);
    return res.status(500).send();
  }
}

export { createDogController };
