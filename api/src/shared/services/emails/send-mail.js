import nodemailer from "nodemailer";

import { config } from "../../../../config.js";
import { logger } from "../../logger.js";

const { email } = config;

async function sendMail(req) {
  if (!req.to) {
    throw new Error("Recipient email address is required");
  }

  const mailOptions = {
    from: email.auth.user,
    to: req.to,
    subject: req.subject || "No Subject",
  };

  if (req.text) {
    mailOptions.text = req.text;
  } else if (req.html) {
    mailOptions.html = req.html;
  }

  if (!email.enabled) {
    logger.info("Email disabled. Mail not sent. Mail info:", mailOptions);
    return {
      info: "Email sending disabled",
      data: mailOptions,
    };
  }

  const transporter = nodemailer.createTransport({
    service: email.service,
    auth: email.auth,
  });

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    logger.error("Error sending email:", error);
    throw error;
  }
}

export { sendMail };
