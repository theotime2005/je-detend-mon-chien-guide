import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";

import { USER_TYPES } from "@/constants.js";
import RegisterView from "@/views/authentication/RegisterView.vue";
describe("Acceptance | Views | Authentication | Register View", () => {
  it("should display all elements on page", () => {
    // given
    const wrapper = mount(RegisterView);

    // when
    const firstname = wrapper.find("input[id=\"firstname\"]");
    const lastname = wrapper.find("input[id=\"lastname\"]");
    const email = wrapper.find("input[id=\"email\"]");
    const password = wrapper.find("input[id=\"password\"]");
    const passwordConfirmation = wrapper.find("input[id=\"passwordConfirmation\"]");
    const userTypeSelect = wrapper.find("select[id=\"userType\"]");
    const agreements = wrapper.find("input[id=\"agreements\"]");
    const submitButton = wrapper.find("button[type=\"submit\"]");

    // then
    expect(firstname.exists()).toBe(true);
    expect(lastname.exists()).toBe(true);
    expect(email.exists()).toBe(true);
    expect(password.exists()).toBe(true);
    expect(passwordConfirmation.exists()).toBe(true);
    expect(userTypeSelect.exists()).toBe(true);
    expect(agreements.exists()).toBe(true);
    expect(submitButton.exists()).toBe(true);
  });

  describe("password", () => {
    it("should display message if passwords are not same", async () => {
      // given
      const wrapper = mount(RegisterView);
      const firstname = wrapper.find("input[id=\"firstname\"]");
      const lastname = wrapper.find("input[id=\"lastname\"]");
      const email = wrapper.find("input[id=\"email\"]");
      const password = wrapper.find("input[id=\"password\"]");
      const passwordConfirmation = wrapper.find("input[id=\"passwordConfirmation\"]");
      const userType = wrapper.find("select[id=\"userType\"]");
      const agreements = wrapper.find("input[id=\"agreements\"]");

      // when
      await firstname.setValue("John");
      await lastname.setValue("Doe");
      await email.setValue("john.doe@example.net");
      await password.setValue("password123");
      await passwordConfirmation.setValue("password124");
      await userType.setValue(USER_TYPES.MASTER_GUIDE_DOG.type);
      await agreements.setChecked(true);
      const form = wrapper.find("form");
      await form.trigger("submit.prevent");

      // then
      const errorMessage = wrapper.find("p.error-message");
      expect(errorMessage.exists()).toBe(true);
      expect(errorMessage.text()).toBe("Les mots de passe ne correspondent pas");
    });

    it("should display message if password does not respect rules", async () => {
      // given
      const passwordCharacter = "JedetenD-";
      const wrapper = mount(RegisterView);
      const firstname = wrapper.find("input[id=\"firstname\"]");
      const lastname = wrapper.find("input[id=\"lastname\"]");
      const email = wrapper.find("input[id=\"email\"]");
      const password = wrapper.find("input[id=\"password\"]");
      const passwordConfirmation = wrapper.find("input[id=\"passwordConfirmation\"]");
      const userType = wrapper.find("select[id=\"userType\"]");
      const agreements = wrapper.find("input[id=\"agreements\"]");

      // when
      await firstname.setValue("John");
      await lastname.setValue("Doe");
      await email.setValue("john.doe@example.net");
      await password.setValue(passwordCharacter);
      await passwordConfirmation.setValue(passwordCharacter);
      await userType.setValue(USER_TYPES.MASTER_GUIDE_DOG.type);
      await agreements.setChecked(true);
      const form = wrapper.find("form");
      await form.trigger("submit.prevent");

      // then
      const errorMessage = wrapper.find("p.error-message");
      expect(errorMessage.exists()).toBe(true);
      expect(errorMessage.text()).toBe("Le mot de passe ne respecte pas les critères de sécurité");
    });
  });

  it("should display success message", async () => {
    // given
    const passwordCharacters = "JedetenD-123";
    const mockFetch = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      status: 201,
      ok: true,
    });

    const wrapper = mount(RegisterView);
    const firstname = wrapper.find("input[id=\"firstname\"]");
    const lastname = wrapper.find("input[id=\"lastname\"]");
    const email = wrapper.find("input[id=\"email\"]");
    const password = wrapper.find("input[id=\"password\"]");
    const passwordConfirmation = wrapper.find("input[id=\"passwordConfirmation\"]");
    const userType = wrapper.find("select[id=\"userType\"]");
    const agreements = wrapper.find("input[id=\"agreements\"]");

    // when
    await firstname.setValue("John");
    await lastname.setValue("Doe");
    await email.setValue("john.doe@example.net");
    await password.setValue(passwordCharacters);
    await passwordConfirmation.setValue(passwordCharacters);
    await userType.setValue(USER_TYPES.MASTER_GUIDE_DOG.type);
    await agreements.setChecked(true);
    const form = wrapper.find("form");
    await form.trigger("submit.prevent");

    // then
    expect(mockFetch).toHaveBeenCalledWith("/api/authentication/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.net",
        password: passwordCharacters,
        userType: USER_TYPES.MASTER_GUIDE_DOG.type,
      }),
    });

    const successMessage = wrapper.find("p");
    expect(successMessage.exists()).toBe(true);
    expect(successMessage.text()).toBe("Un email de confirmation vous a été envoyé à l'adresse john.doe@example.net. Veuillez cliquer sur le lien contenu dans cet email pour activer votre compte.");
    mockFetch.mockRestore();
  });
});
