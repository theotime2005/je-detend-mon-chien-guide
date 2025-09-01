import { describe, expect, it, vi } from "vitest";

import checkUser from "@/adapters/authenticated/check-user.js";
import * as tokenManager from "@/utils/token-manager.js";

describe("Unit | Adapter | Authenticated | Check User", () => {
  it("should return data from request", async () => {
    // given
    vi.spyOn(tokenManager, "getLogin").mockReturnValue("abc123");
    const user = {
      firstname: "John",
      lastname: "Doe",
    };
    vi.spyOn(global, "fetch").mockResolvedValue({
      status: 200,
      json: vi.fn().mockResolvedValue({
        data: user,
      }),
    });

    // when
    const result = await checkUser();

    // then
    expect(result).toEqual(user);
  });

  it("should return false if not token", async () => {
    // given
    vi.spyOn(tokenManager, "getLogin").mockReturnValue(null);

    // when
    const result = await checkUser();

    // then
    expect(result).toBe(false);
  });

  it("should return false if request fails", async () => {
    // given
    vi.spyOn(tokenManager, "getLogin").mockReturnValue("abc123");
    vi.spyOn(global, "fetch").mockResolvedValue({
      status: 401,
      json: vi.fn().mockResolvedValue({}),
    });

    // when
    const result = await checkUser();

    // then
    expect(result).toBe(false);
  });

  it("should return false if status code is not 200", async () => {
    // given
    vi.spyOn(tokenManager, "getLogin").mockReturnValue("abc123");
    vi.spyOn(global, "fetch").mockResolvedValue({
      status: 500,
      json: vi.fn().mockResolvedValue({}),
    });

    // when
    const result = await checkUser();

    // then
    expect(result).toBe(false);
  });

  it("should return false if an error occurred", async () => {
    // given
    vi.spyOn(tokenManager, "getLogin").mockReturnValue("abc123");
    vi.spyOn(global, "fetch").mockRejectedValue(new Error("Network error"));

    // when
    const result = await checkUser();

    // then
    expect(result).toBe(false);
  });
});
