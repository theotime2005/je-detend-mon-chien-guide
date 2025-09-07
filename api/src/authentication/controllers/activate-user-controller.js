import { ERRORS } from "../../shared/constants.js";
import { logger } from "../../shared/logger.js";
import { findUserById } from "../../shared/repositories/users-repository.js";
import { activateUserByUserId } from "../repositories/register.repository.js";
import { decodedToken } from "../services/token.service.js";

async function activateUserController(req, res) {
  if (!req.headers.authorization) {
    return res.status(400).send({ message: ERRORS.NO_TOKEN_PROVIDED });
  }
  try {
    const token = await decodedToken(req.headers.authorization.split(" ")[1]);
    const user = await findUserById(token.userId);
    if (!user) {
      return res.status(404).send({ message: ERRORS.USER_NOT_FOUND });
    }
    if (user.isActive) {
      return res.status(400).send({ message: ERRORS.USER_ALREADY_ACTIVE });
    }
    await activateUserByUserId(user.id);
    return res.status(204).send();
  } catch (error) {
    logger.error(`Error in activateUserController: ${error}`);
    return res.status(500).send({ message: ERRORS.INTERNAL_SERVER_ERROR });
  }
}

export { activateUserController };
