import { config } from "../../../config.js";
import { logger } from "../../shared/logger.js";
import { createMailBodyService } from "../../shared/services/emails/create-mail-body-service.js";
import { sendMailService } from "../../shared/services/emails/send-mail-service.js";
import { encodedToken } from "./token-service.js";

const REGISTER_TEMPLATE = "confirm-register";
const SUBJECT = "Confirmation d'inscription";

async function sendMailToActivateUserService({
  userId,
  email,
  firstname,
  lastname,
}) {
  try {
    const token = await encodedToken({ userId });
    const activateLink = config.baseUrl + `authentication/activate?token=${token}`;
    const emailBody = await createMailBodyService(REGISTER_TEMPLATE, {
      firstname,
      lastname,
      activateLink,
    });
    await sendMailService({
      to: email,
      subject: SUBJECT,
      html: emailBody,
    });
  } catch (error) {
    logger.error("Error sending activation email", error);
    throw Error;
  }
}

export { sendMailToActivateUserService };
