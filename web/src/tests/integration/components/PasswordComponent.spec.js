import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import PasswordComponent from "@/components/PasswordComponent.vue";

describe("Integration | Components | Password Component", () => {
  it("should display text input and button to show password", () => {
    // given
    const wrapper = mount(PasswordComponent);

    // when
    const input = wrapper.find("input[type=\"password\"]");
    const button = wrapper.find("button");

    // then
    expect(input.exists()).toBe(true);
    expect(button.exists()).toBe(true);
  });

  describe("check label rendering", () => {
    it("should display label for password if is in props", () => {
      // given
      const wrapper = mount(PasswordComponent, {
        props: {
          label: "Confirmer le mot de passe",
        },
      });

      // when
      const label = wrapper.find("label");

      // then
      expect(label.exists()).toBe(true);
      expect(label.text()).toBe("Confirmer le mot de passe");
    });

    it("should display default label if not past", () => {
      // given
      const defaultLabel = "Mot de passe";
      const wrapper = mount(PasswordComponent);

      // when
      const label = wrapper.find("label");

      // then
      expect(label.exists()).toBe(true);
      expect(label.text()).toBe(defaultLabel);
    });
  });

  describe("check id password", () => {
    it("should have default id if property is empty", () => {
      // given
      const defaultId = "password";
      const wrapper = mount(PasswordComponent);

      // when
      const input = wrapper.find("input");

      // then
      expect(input.exists()).toBe(true);
      expect(input.attributes("id")).toBe(defaultId);
    });

    it("should have id in property", () => {
      // given
      const id = "my-password";
      const wrapper = mount(PasswordComponent, {
        props: {
          passwordId: id,
        },
      });

      // when
      const input = wrapper.find("input");

      // then
      expect(input.exists()).toBe(true);
      expect(input.attributes("id")).toBe(id);
    });
  });

  describe("show and hide password", () => {
    it("should check that password is not visible", () => {
      // given
      const wrapper = mount(PasswordComponent);

      // when
      const input = wrapper.find("input[type=\"password\"]");
      const button = wrapper.find("button");

      // then
      expect(input.exists()).toBe(true);
      expect(button.exists()).toBe(true);
      expect(input.element.type).toBe("password");
      expect(button.text()).toBe("Afficher le mot de passe");
    });

    it("should change input type when click on the button", async () => {
      // given
      const wrapper = mount(PasswordComponent);

      // when
      const button = wrapper.find("button");
      await button.trigger("click");

      // then
      const input = wrapper.find("input[type=\"text\"]");
      expect(input.exists()).toBe(true);
      expect(button.text()).toBe("Masquer le mot de passe");
    });
  });
});
