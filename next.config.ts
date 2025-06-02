import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
experimental: {
turbo: {
resolveAlias: {
canvas: './empty-module.ts',
},
},},
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  
};

export default nextConfig;
