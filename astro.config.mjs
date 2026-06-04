// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import vercel from '@astrojs/vercel';


const SITE = "https://www.expensy.online/";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: "static",
  integrations: [
    sitemap({
      filter(url) {
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
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});