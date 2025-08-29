import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

import LoginView from "@/views/authentication/LoginView.vue";

const pushMock = vi.fn();

vi.mock("vue-router", () => ({
  useRoute: vi.fn(),
  useRouter: () => ({ push: pushMock }),
}));

describe("Acceptance | Views | Login view", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display all elements", () => {
    // given
    const wrapper = mount(LoginView);

    // then
    expect(wrapper.find("h1").text()).toBe("Connexion");
    expect(wrapper.find("input[type=\"email\"]").exists()).toBe(true);
    expect(wrapper.find("input[type=\"password\"]").exists()).toBe(true);
    expect(wrapper.find("button[type=\"submit\"]").text()).toBe("Connexion");
  });

  describe("send form", () => {
    let wrapper;

    beforeEach(async () => {
      wrapper = mount(LoginView);
      await wrapper.find("input[type='email']").setValue("john.doe@example.net");
      await wrapper.find("input[type='password']").setValue("password123");
    });

    it("should call router.push if login succeeded", async () => {
      // given
      vi.spyOn(global, "fetch").mockResolvedValue({
        status: 200,
        json: vi.fn().mockResolvedValue({
          data: {
            token: "abc123",
            userId: 1,
          },
        }),
      });

      // when
      await wrapper.find("form").trigger("submit.prevent");

      // then
      expect(pushMock).toHaveBeenCalled();
    });

    it("should display invalid credentials", async () => {
      // given
      vi.spyOn(global, "fetch").mockResolvedValue({
        status: 401,
        json: vi.fn().mockResolvedValue({
          message: "Invalid credentials",
        }),
      });

      // when
      await wrapper.find("form").trigger("submit.prevent");

      // then
      expect(wrapper.text()).toContain("Email ou mot de passe incorrect.");
    });

    it("should display error message if an error occured", async () => {
      // given
      vi.spyOn(global, "fetch").mockResolvedValue({
        status: 500,
        json: vi.fn().mockResolvedValue({
          message: "Server error",
        }),
      });

      // when
      await wrapper.find("form").trigger("submit.prevent");

      // then
      expect(wrapper.text()).toContain("Une erreur est survenue");
    });
  });
});
