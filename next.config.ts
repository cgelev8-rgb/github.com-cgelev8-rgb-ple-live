import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  trailingSlash: true,
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
    ];
  },
  async rewrites() {
    return {};
  },
};

export default nextConfig;
