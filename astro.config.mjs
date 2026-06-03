// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

const SITE = "https://expensy.com";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({
      filter(url) {
        // Exclude error pages and contact from sitemap
        const full = new URL(url);
        const exclude = ["/404/", "/500/", "/contact/"];
        return !exclude.includes(full.pathname);
      },
      serialize(item) {
        if (item.url === `${SITE}/`) {
          item.priority = 1.0;
          item.changefreq = "weekly";
        } else if (
          item.url.includes("/expense-categories") ||
          item.url.includes("/how-to-track-expenses")
        ) {
          item.priority = 0.9;
          item.changefreq = "monthly";
        } else {
          item.priority = 0.8;
          item.changefreq = "monthly";
        }
        return item;
      },
      lastmod: new Date("2026-06-03"),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});