import { eq, asc, desc } from "drizzle-orm";
import { getDb } from "@/db";
import { settings, cottages, experiences, posts, faqs, galleryItems } from "@/db/schema";

export async function getSettings(): Promise<Record<string, string>> {
  const db = await getDb();
  const rows = await db.select().from(settings);
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export async function getCottages() {
  const db = await getDb();
  return db.select().from(cottages).where(eq(cottages.status, "published")).orderBy(asc(cottages.displayOrder));
}

export async function getCottageBySlug(slug: string) {
  const db = await getDb();
  const rows = await db.select().from(cottages).where(eq(cottages.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getExperiences() {
  const db = await getDb();
  return db
    .select()
    .from(experiences)
    .where(eq(experiences.status, "published"))
    .orderBy(asc(experiences.displayOrder));
}

export async function getExperienceBySlug(slug: string) {
  const db = await getDb();
  const rows = await db.select().from(experiences).where(eq(experiences.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getPosts(limit?: number) {
  const db = await getDb();
  const query = db
    .select()
    .from(posts)
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.publishedAt));
  return limit ? query.limit(limit) : query;
}

export async function getPostBySlug(slug: string) {
  const db = await getDb();
  const rows = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getFaqs() {
  const db = await getDb();
  return db.select().from(faqs).orderBy(asc(faqs.category), asc(faqs.displayOrder));
}

export async function getGalleryItems() {
  const db = await getDb();
  return db.select().from(galleryItems).orderBy(asc(galleryItems.displayOrder));
}
