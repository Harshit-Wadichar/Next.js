import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    GITHUB_ID: process.env.AUTH_GITHUB_ID ,
    GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET ,
  },

  images: {
    domains: ["avatars.githubusercontent.com"],
  },
   webpack: (config) => {
    config.externals = [...config.externals, '@prisma/client'];
    return config;
  },
};

export default nextConfig;