import { createPinia, setActivePinia } from "pinia";
import { afterEach, beforeEach, vi } from "vitest";

beforeEach(() => {
  setActivePinia(createPinia());
});

afterEach(() => {
  vi.clearAllMocks();
  vi.clearAllTimers();
  localStorage.clear();
});
