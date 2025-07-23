import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";

import packageInfo from "../../../../package.json";
import FooterComponent from "../../../components/FooterComponent.vue";

describe("FooterComponent component", () => {
  it("Given the system time is set to 2025-01-01, when the component is mounted, then it displays the current year and author", () => {
    // given
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-01"));

    // when
    const wrapper = mount(FooterComponent);

    // then
    const text = wrapper.find("footer p").text();
    expect(text).toContain(`© 2025 ${packageInfo.author}`);

    vi.useRealTimers();
  });

  it("Given the package version, when the component is mounted, then it displays the version", () => {
    // when
    const wrapper = mount(FooterComponent);

    // then
    const text = wrapper.findAll("footer p")[1].text();
    expect(text).toContain(`Version ${packageInfo.version}`);
  });
});
