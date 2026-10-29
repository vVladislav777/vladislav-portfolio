import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { works } from "@/data/works";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/works`, priority: 0.8 },
    ...works.map((w) => ({ url: `${site.url}/works/${w.slug}`, priority: 0.6 })),
  ];
}
