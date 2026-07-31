import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/koin',
        destination: 'https://koin-web-two.vercel.app/',
      },
      {
        source: '/koin/:path*',
        destination: 'https://koin-web-two.vercel.app/:path*',
      },
    ];
  },
};

export default nextConfig;
