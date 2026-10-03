import type { MetadataRoute } from "next";
import { STUDIO_SITE_URL } from "@/config/sites";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${STUDIO_SITE_URL}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${STUDIO_SITE_URL}/resume`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
