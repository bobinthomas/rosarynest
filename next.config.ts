import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/the-family", destination: "/about", permanent: true },
      { source: "/cottages/the-garden-cottage", destination: "/cottages/tarry-cottage", permanent: true },
      { source: "/cottages/the-lake-cottage", destination: "/cottages/sparrow-hut", permanent: true },
      { source: "/cottages/the-family-cottage", destination: "/cottages/scarlet-hut", permanent: true },
      { source: "/cottages/cottage-1", destination: "/cottages/eyrie-cottage", permanent: true },
    ];
  },
  async headers() {
    // Filenames here aren't content-hashed (unlike /_next/static, which Next
    // already caches aggressively on its own), so this stops short of
    // `immutable` — a re-deploy that changes an image at the same path
    // should still reach visitors within a day instead of being stuck
    // behind a year-long cache.
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        source: "/video/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
