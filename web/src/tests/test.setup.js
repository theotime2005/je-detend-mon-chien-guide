import { afterEach, vi } from "vitest";

afterEach(() => {
  vi.clearAllMocks();
  vi.clearAllTimers();
  localStorage.clear();
});
