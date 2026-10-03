export const STUDIO_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://klyrhon.me";
export const CREATIVE_SITE_URL = process.env.NEXT_PUBLIC_CREATIVE_SITE_URL || "https://creative.klyrhon.me";

export const creativeVersionHref = process.env.NODE_ENV === "production" ? CREATIVE_SITE_URL : "/creative";
export const studioVersionHref = process.env.NODE_ENV === "production" ? STUDIO_SITE_URL : "/";
