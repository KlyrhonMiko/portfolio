import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/koin',
        destination: 'https://koin.klyrhon.tech',
        permanent: true,
      },
      {
        source: '/koin/:path*',
        destination: 'https://koin.klyrhon.tech/:path*',
        permanent: true,
      },
      {
        source: '/pars',
        destination: 'https://pars.klyrhon.tech',
        permanent: true,
      },
      {
        source: '/pars/:path*',
        destination: 'https://pars.klyrhon.tech/:path*',
        permanent: true,
      },
      {
        source: '/nulll',
        destination: 'https://nulll.klyrhon.tech',
        permanent: true,
      },
      {
        source: '/nulll/:path*',
        destination: 'https://nulll.klyrhon.tech/:path*',
        permanent: true,
      },
      {
        source: '/null',
        destination: 'https://nulll.klyrhon.tech',
        permanent: true,
      },
      {
        source: '/null/:path*',
        destination: 'https://nulll.klyrhon.tech/:path*',
        permanent: true,
      },
      {
        source: '/skills',
        destination: 'https://skills.klyrhon.tech',
        permanent: true,
      },
      {
        source: '/skills/:path*',
        destination: 'https://skills.klyrhon.tech/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
