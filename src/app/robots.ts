import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { SITE_URL } from "@/lib/site";

// Any host other than the configured production domain (e.g. the
// *.workers.dev staging deployment) gets a blanket noindex, so a staging
// build never competes with rosarynest.in in search results.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host");
  const productionHost = new URL(SITE_URL).host;

  if (host && host !== productionHost) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api", "/media"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
