import { findUserById } from "../../identities-access-management/repositories/users-repository.js";
import { logger } from "../logger.js";

async function userController(req, res) {
  try {
    const user = await findUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (error) {
    logger.error(`User error: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default userController;
