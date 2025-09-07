import { ERRORS } from "../constants.js";

async function checkSchema(req, res, schema) {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      message: error.details[0].message,
      code: ERRORS.INVALID_DATA_FORMAT,
    });
    return false;
  }
  return true;
}

export { checkSchema };
