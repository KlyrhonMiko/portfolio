import type { MetadataRoute } from "next";
import { CREATIVE_SITE_URL } from "@/config/sites";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${CREATIVE_SITE_URL}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
