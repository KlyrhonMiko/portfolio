import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/koin',
        destination: 'https://koin.klyrhon.me',
        permanent: true,
      },
      {
        source: '/koin/:path*',
        destination: 'https://koin.klyrhon.me/:path*',
        permanent: true,
      },
      {
        source: '/pars',
        destination: 'https://pars.klyrhon.me',
        permanent: true,
      },
      {
        source: '/pars/:path*',
        destination: 'https://pars.klyrhon.me/:path*',
        permanent: true,
      },
      {
        source: '/nulll',
        destination: 'https://nulll.klyrhon.me',
        permanent: true,
      },
      {
        source: '/nulll/:path*',
        destination: 'https://nulll.klyrhon.me/:path*',
        permanent: true,
      },
      {
        source: '/null',
        destination: 'https://nulll.klyrhon.me',
        permanent: true,
      },
      {
        source: '/null/:path*',
        destination: 'https://nulll.klyrhon.me/:path*',
        permanent: true,
      },
      {
        source: '/skills',
        destination: 'https://skills.klyrhon.me',
        permanent: true,
      },
      {
        source: '/skills/:path*',
        destination: 'https://skills.klyrhon.me/:path*',
        permanent: true,
      },
    ];
};

export default nextConfig;
