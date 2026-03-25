import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/fulfillment',
        destination: '/fulfillment/supplement-fulfillment',
        permanent: true,
      },
      {
        source: '/fulfillment/',
        destination: '/fulfillment/supplement-fulfillment',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {};
  },
};

export default nextConfig;
