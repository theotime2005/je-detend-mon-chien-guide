import { decodedToken } from "../../authentication/services/token-service.js";
import { ERRORS } from "../constants.js";

/**
 * Authorize the access from token
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function checkUserToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: ERRORS.NO_TOKEN_PROVIDED });
  }
  const token = req.headers["authorization"].split(" ")[1];

  try {
    const decoded = await decodedToken(token);
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ message: ERRORS.INVALID_TOKEN });
  }
}

export { checkUserToken };
