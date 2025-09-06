import { flushPromises, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createRouter, createWebHistory } from "vue-router";

import { activateUser } from "@/adapters/authentication.js";
import ActivationView from "@/views/authentication/ActivationView.vue";

vi.mock("@/adapters/authentication.js", () => ({
  activateUser: vi.fn(),
}));

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/authentication/login", component: { template: "<div>Login</div>" } },
    { path: "/authentication/register", component: { template: "<div>Register</div>" } },
  ],
});

describe("Acceptance | Views | Authentication | Activation", () => {
  beforeEach(async () => {
    vi.resetAllMocks();
    router.push({ path: "/", query: { token: "mock-token" } });
    await router.isReady();
  });

  it("should render success message when activation succeeds", async () => {
    // given
    activateUser.mockResolvedValue(true);

    // when
    const wrapper = mount(ActivationView, {
      global: { plugins: [router] },
    });

    await flushPromises();

    expect(activateUser).toHaveBeenCalledWith("mock-token");
    expect(wrapper.text()).toContain("Votre compte a bien été activé");
    expect(wrapper.find("a").attributes("href")).toBe("/authentication/login");
  });

  it("should render error message when activation fails", async () => {
    // given
    activateUser.mockResolvedValue(false);

    // when
    const wrapper = mount(ActivationView, {
      global: { plugins: [router] },
    });

    await flushPromises();

    // then
    expect(activateUser).toHaveBeenCalledWith("mock-token");
    expect(wrapper.text()).toContain("Votre compte n'a pas pu être activé");
    expect(wrapper.find("a").attributes("href")).toBe("/authentication/register");
  });
});
