import { ERRORS } from "../constants.js";

/**
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function checkRoute(req, res, next) {
  if ((req.method === "PUT" || req.method === "POST") && !req.body) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Request body is required for PUT and POST requests.",
      code: ERRORS.REQUIRED_BODY,
    });
  }
  return next();
}

export { checkRoute };
