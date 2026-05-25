import { defineConfig } from "astro/config";

export default defineConfig({
  outDir: "./root",
  build: {
    format: "file"
  }
});
