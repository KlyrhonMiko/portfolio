import { NextRequest, NextResponse } from "next/server";
import { CREATIVE_SITE_URL } from "@/config/sites";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0];
  if (hostname !== new URL(CREATIVE_SITE_URL).hostname) return NextResponse.next();

  const paths: Record<string, string> = {
    "/": "/creative",
    "/sitemap.xml": "/creative/sitemap.xml",
    "/robots.txt": "/creative/robots.txt",
  };
  const destination = paths[request.nextUrl.pathname];
  if (!destination) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = destination;
  return NextResponse.rewrite(url);
}

export const config = { matcher: ["/", "/sitemap.xml", "/robots.txt"] };
