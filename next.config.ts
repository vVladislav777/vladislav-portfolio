import type { NextConfig } from "next";

// Сборка для GitHub Pages: статический экспорт в папку out/ и префикс пути
// репозитория (сайт живёт по адресу https://<user>.github.io/<repo>/).
// Включается переменной GITHUB_PAGES=true в workflow; локально всё как обычно.
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? (process.env.PAGES_BASE_PATH ?? "") : "";

const nextConfig: NextConfig = {
  // Cache Components выключены: сайт полностью статический, а Activity
  // (скрытые, но смонтированные страницы) мешает курсору и анимациям.
  ...(isPages && { output: "export" as const, trailingSlash: true }),
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    unoptimized: true,
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
