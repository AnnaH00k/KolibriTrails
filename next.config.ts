import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Fix lockfile warning by explicitly setting the workspace root
  outputFileTracingRoot: process.cwd(),
  // Set basePath for GitHub Pages
  // The workflow also injects this, but we set it explicitly as a fallback
  // For local development, NEXT_PUBLIC_BASE_PATH will be undefined, so basePath will be empty
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

export default nextConfig;
