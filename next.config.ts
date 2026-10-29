import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components выключены: сайт полностью статический, а Activity
  // (скрытые, но смонтированные страницы) мешает сценам GSAP и курсору.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
