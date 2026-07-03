import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
