// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://expensy.com",
  integrations: [
    sitemap({
      serialize(item) {
        // Don't index contact page
        if (item.url.includes("/contact")) return undefined;
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});