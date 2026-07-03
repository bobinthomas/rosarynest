import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getCottages, getExperiences, getPosts } from "@/lib/content";

// Content (cottages, experiences, posts) is edited live via the admin panel
// after deployment, so this must be generated per-request, not baked in at
// build time.
export const dynamic = "force-dynamic";

const staticPaths = [
  "",
  "the-land",
  "the-family",
  "cottages",
  "experiences",
  "journal",
  "plan-your-stay",
  "plan-your-stay/how-to-reach",
  "plan-your-stay/best-time",
  "plan-your-stay/faq",
  "gallery",
  "contact",
  "book",
  "privacy",
  "terms",
  "house-rules",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cottages, experiences, posts] = await Promise.all([
    getCottages(),
    getExperiences(),
    getPosts(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE_URL}/${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const cottageEntries: MetadataRoute.Sitemap = cottages.map((c) => ({
    url: `${SITE_URL}/cottages/${c.slug}`,
    lastModified: new Date(c.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const experienceEntries: MetadataRoute.Sitemap = experiences.map((e) => ({
    url: `${SITE_URL}/experiences/${e.slug}`,
    lastModified: new Date(e.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/journal/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...cottageEntries, ...experienceEntries, ...postEntries];
}
