import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/the-family", destination: "/about", permanent: true },
      { source: "/cottages/the-garden-cottage", destination: "/cottages/tarry-cottage", permanent: true },
      { source: "/cottages/the-lake-cottage", destination: "/cottages/sparrow-hut", permanent: true },
      { source: "/cottages/the-family-cottage", destination: "/cottages/sparrow-hut", permanent: true },
      { source: "/cottages/cottage-1", destination: "/cottages/eyrie-cottage", permanent: true },
      // www -> apex. Done here rather than in middleware/proxy: Next.js 16's
      // proxy convention always compiles to the Node.js runtime with no way
      // to force Edge, and @opennextjs/cloudflare (as of 1.20.1) rejects
      // Node.js middleware outright at build time. This config-level
      // redirect runs in Next's normal routing layer instead, which is
      // unaffected by that limitation.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.rosarynest.com" }],
        destination: "https://rosarynest.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    // Filenames here aren't content-hashed (unlike /_next/static, which Next
    // already caches aggressively on its own), so this stops short of
    // `immutable` — a re-deploy that changes an image at the same path
    // should still reach visitors within a day instead of being stuck
    // behind a year-long cache.
    //
    // NOTE: on the deployed Cloudflare Worker, requests under /images/* and
    // /video/* are served directly by the Workers Assets binding and never
    // reach this Next.js handler, so these rules only take effect in local
    // dev (`next dev`). The equivalent production rule lives in
    // `public/_headers` (Cloudflare's static-asset headers convention) —
    // keep both in sync if this changes.
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        source: "/video/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        // Actual page/route requests (unlike /images and /video above) are
        // dynamically rendered by this Next.js handler in the Worker, not
        // served by the static Assets binding, so these do take effect in
        // production. CSP is Report-Only for now — it gives real visibility
        // into what a strict policy would need to allow without risking
        // blocking something on a live site that hasn't been fully
        // inventoried (third-party embeds, admin-panel JS, etc.). Tighten to
        // an enforcing Content-Security-Policy once that's confirmed clean.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://i.ytimg.com",
              "font-src 'self' data:",
              "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
              "connect-src 'self' https://cloudflareinsights.com",
              "object-src 'none'",
              "base-uri 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
