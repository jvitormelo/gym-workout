import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    alias: {
      "@/": "/src/",
    },
    api: {
      port: 3030,
    },
    css: true,
    environment: "happy-dom",
    globals: true,
    fakeTimers: {
      shouldAdvanceTime: true,
    },
  },
});
