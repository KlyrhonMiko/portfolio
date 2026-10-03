import { CREATIVE_SITE_URL } from "@/config/sites";

export function GET() {
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${CREATIVE_SITE_URL}/sitemap.xml\n`, {
    headers: { "Content-Type": "text/plain" },
  });
}
