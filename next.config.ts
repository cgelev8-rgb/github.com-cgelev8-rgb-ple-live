import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
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
