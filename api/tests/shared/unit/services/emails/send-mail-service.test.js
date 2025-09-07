import nodemailer from "nodemailer";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { config } from "../../../../../config.js";
import { sendMailService } from "../../../../../src/shared/services/emails/send-mail-service.js";

const { email } = config;

vi.mock("nodemailer");

describe("Unit | Shared | Services | Send mail", () => {
  beforeEach(() => {
    email.auth.user = "john.doe@example.net";
    nodemailer.createTransport.mockReturnValue({
      sendMail: vi.fn().mockResolvedValue(true),
    });
  });
  describe("when mail is disabled", () => {
    it("should return the email object with text", async () => {
      // given
      email.enabled = false;
      const req = {
        to: "alex-terieur@example.net",
        subject: "The subject",
        text: "This is the text",
      };

      // when
      const result = await sendMailService(req);

      // then
      expect(result).toEqual({
        info: "Email sending disabled",
        data: {
          from: "john.doe@example.net",
          to: "alex-terieur@example.net",
          subject: "The subject",
          text: "This is the text",
        },
      });
    });

    it("should return the email object with html", async () => {
      // given
      email.enabled = false;
      const req = {
        to: "alex-terieur@example.net",
        subject: "The subject",
        html: "This is the text",
      };

      // when
      const result = await sendMailService(req);

      // then
      expect(result).toEqual({
        info: "Email sending disabled",
        data: {
          from: "john.doe@example.net",
          to: "alex-terieur@example.net",
          subject: "The subject",
          html: "This is the text",
        },
      });
    });
  });

  describe("when mail is enabled", () => {
    beforeEach(() => {
      email.enabled = true;
    });
    it("should send email correctly with text", async () => {
      // given
      const req = {
        to: "alex-terieur@example.net",
        subject: "The subject",
        text: "This is the text",
      };

      // when
      const result = await sendMailService(req);

      // then
      expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith({
        from: "john.doe@example.net",
        to: "alex-terieur@example.net",
        subject: "The subject",
        text: "This is the text",
      });
      expect(result).toBe(true);
    });

    it("should send email correctly with html", async () => {
      // given
      const req = {
        to: "alex-terieur@example.net",
        subject: "The subject",
        html: "This is the text",
      };

      // when
      const result = await sendMailService(req);

      // then
      expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith({
        from: "john.doe@example.net",
        to: "alex-terieur@example.net",
        subject: "The subject",
        html: "This is the text",
      });
      expect(result).toBe(true);
    });

    it("should return error", async () => {
      // given
      nodemailer.createTransport().sendMail.mockRejectedValue("Network error");
      const req = {
        to: "alex-terieur@example.net",
        subject: "The subject",
        html: "This is the text",
      };

      // when
      const promise = sendMailService(req);

      // then
      await expect(promise).rejects.toBe("Network error");
    });
  });
});
