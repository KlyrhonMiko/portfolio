import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/koin',
        destination: 'https://koin-web-two.vercel.app/koin',
      },
      {
        source: '/koin/:path*',
        destination: 'https://koin-web-two.vercel.app/koin/:path*',
      },
      {
        source: '/null',
        destination: 'https://nulll-kly.vercel.app/null',
      },
      {
        source: '/null/:path*',
        destination: 'https://nulll-kly.vercel.app/null/:path*',
      },
    ];
  },
};

export default nextConfig;
