import { logger } from "../../shared/logger.js";
import { findDogByUserId } from "../repositories/dogs-repository.js";

async function getDogForUserController(req, res) {
  const { userId } = req.user;
  try {
    const data = await findDogByUserId(userId);
    return res.status(200).json({
      userId,
      data,
    });
  } catch (error) {
    logger.error(`Error in getDogForUserController: ${error}`);
    switch (error.message) {
    case "Dog not found for this user":
      return res.status(404).send();
    default:
      return res.status(500).send();
    }
  }
}

export { getDogForUserController };
