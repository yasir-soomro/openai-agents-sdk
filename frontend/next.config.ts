import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiBaseUrl = (
      process.env.CUSTOMER_SUPPORT_API_URL ?? "http://127.0.0.1:8000"
    ).replace(/\/$/, "");

    return [
      {
        source: "/api/:path*",
        destination: `${apiBaseUrl}/api/:path*`,
      },
    ];
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
