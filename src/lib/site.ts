// Central source of truth for the site's public URL — used for canonical
// tags, Open Graph URLs, structured data, and the sitemap/robots routes.
// NEXT_PUBLIC_SITE_URL should be set explicitly in the Cloudflare Worker's
// vars for production; this fallback matches the real production domain.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rosarynest.com";
