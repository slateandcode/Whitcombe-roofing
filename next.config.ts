import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A lockfile further up the folder tree confuses root detection.
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
