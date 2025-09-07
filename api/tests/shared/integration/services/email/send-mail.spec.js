import nodemailer from "nodemailer";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { config } from "../../../../../config.js";
import { logger } from "../../../../../src/shared/logger.js";
import { sendMail } from "../../../../../src/shared/services/emails/send-mail.js";

describe("Integration | Shared | Services | Email | Send Mail", () => {
  beforeEach(() => {
    config.logging.enabled = true;
    config.email.enabled = true;
    config.email.testAccount = true;
    vi.spyOn(logger, "info");
  });

  it("should send email and log url to visualize", async () => {
    // given
    const req = {
      to: "john.doe@example.net",
      subject: "The subject",
      text: "This is the text",
    };

    // when
    const result = await sendMail(req);

    // then
    const url = nodemailer.getTestMessageUrl(result);
    expect(logger.info).toHaveBeenCalledWith(`Email available on ${url}`);
  });
});
