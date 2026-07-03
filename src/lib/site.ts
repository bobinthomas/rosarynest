// Central source of truth for the site's public URL — used for canonical
// tags, Open Graph URLs, structured data, and the sitemap/robots routes.
// Set NEXT_PUBLIC_SITE_URL once the real production domain is live; this
// placeholder matches the domain already used for email (stay@rosarynest.in).
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rosarynest.in";
