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
        source: '/nulll',
        destination: 'https://nulll-kly.vercel.app/nulll',
      },
      {
        source: '/nulll/:path*',
        destination: 'https://nulll-kly.vercel.app/nulll/:path*',
      },
      {
        source: '/null',
        destination: 'https://nulll-kly.vercel.app/nulll',
      },
      {
        source: '/null/:path*',
        destination: 'https://nulll-kly.vercel.app/nulll/:path*',
      },
    ];
  },
};

export default nextConfig;
