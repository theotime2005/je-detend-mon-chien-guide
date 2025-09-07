import { describe, expect, it, vi } from "vitest";

import {
  sendMailToActivateUserService,
} from "../../../../src/authentication/services/send-mail-to-activate-user-service.js";
import { encodedToken } from "../../../../src/authentication/services/token-service.js";
import { createMailBodyService } from "../../../../src/shared/services/emails/create-mail-body-service.js";
import { sendMailService } from "../../../../src/shared/services/emails/send-mail-service.js";

vi.mock("../../../../src/authentication/services/token-service.js");
vi.mock("../../../../src/shared/services/emails/create-mail-body-service.js");
vi.mock("../../../../src/shared/services/emails/send-mail-service.js");

describe("Unit | Authentication | Services | Send mail to activate user service", () => {
  it("should create token, create mail body and send mail", async () => {
    // given
    const data = {
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.net",
    };
    const userId = 123;
    encodedToken.mockResolvedValue("token");
    createMailBodyService.mockResolvedValue("document");

    // when
    await sendMailToActivateUserService({ ...data, userId });

    // then
    expect(encodedToken).toHaveBeenCalledWith({ userId });
    expect(createMailBodyService).toHaveBeenCalledWith("confirm-register", { firstname: data.firstname, lastname: data.lastname, activateLink: "http://localhost/#/authentication/activate?token=token" });
    expect(sendMailService).toHaveBeenCalledWith({ to: data.email, subject: "Confirmation d'inscription", html: "document" });
  });
});
