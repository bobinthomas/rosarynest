// Turns src/db/seed-data.ts into a plain SQL file (drizzle/seed.sql) that can be
// applied with `wrangler d1 execute --local --file`. Runs in plain Node (via tsx),
// so it does not touch any Cloudflare binding — just generates text.
import { writeFileSync } from "node:fs";
import {
  settingsSeed,
  cottagesSeed,
  experiencesSeed,
  postsSeed,
  faqsSeed,
  galleryItemsSeed,
} from "../src/db/seed-data";

function sqlString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

function sqlJson(value: unknown): string {
  return sqlString(JSON.stringify(value));
}

const lines: string[] = [
  "DELETE FROM settings;",
  "DELETE FROM cottages;",
  "DELETE FROM experiences;",
  "DELETE FROM posts;",
  "DELETE FROM faqs;",
  "DELETE FROM gallery_items;",
];

for (const [key, value] of Object.entries(settingsSeed)) {
  lines.push(`INSERT INTO settings (key, value) VALUES (${sqlString(key)}, ${sqlString(value)});`);
}

for (const c of cottagesSeed) {
  lines.push(
    `INSERT INTO cottages (slug, name, tagline, description, capacity_summary, area_sqm, amenities, images, display_order, status) VALUES (${sqlString(c.slug)}, ${sqlString(c.name)}, ${sqlString(c.tagline)}, ${sqlString(c.description)}, ${sqlString(c.capacitySummary)}, ${c.areaSqm}, ${sqlJson(c.amenities)}, ${sqlJson(c.images)}, ${c.displayOrder}, 'published');`
  );
}

for (const e of experiencesSeed) {
  lines.push(
    `INSERT INTO experiences (slug, title, summary, content, duration, cost, included, images, display_order, status) VALUES (${sqlString(e.slug)}, ${sqlString(e.title)}, ${sqlString(e.summary)}, ${sqlString(e.content)}, ${sqlString(e.duration)}, ${sqlString(e.cost)}, ${sqlJson(e.included)}, ${sqlJson(e.images)}, ${e.displayOrder}, 'published');`
  );
}

for (const p of postsSeed) {
  lines.push(
    `INSERT INTO posts (slug, title, excerpt, content, category, author, featured_image, status, published_at) VALUES (${sqlString(p.slug)}, ${sqlString(p.title)}, ${sqlString(p.excerpt)}, ${sqlString(p.content)}, ${sqlString(p.category)}, ${sqlString(p.author)}, ${sqlString(p.featuredImage)}, 'published', ${sqlString(p.publishedAt)});`
  );
}

for (const f of faqsSeed) {
  lines.push(
    `INSERT INTO faqs (question, answer, category, display_order) VALUES (${sqlString(f.question)}, ${sqlString(f.answer)}, ${sqlString(f.category)}, ${f.displayOrder});`
  );
}

for (const g of galleryItemsSeed) {
  lines.push(
    `INSERT INTO gallery_items (image_url, caption, category, display_order) VALUES (${sqlString(g.imageUrl)}, ${sqlString(g.caption)}, ${sqlString(g.category)}, ${g.displayOrder});`
  );
}

writeFileSync("drizzle/seed.sql", lines.join("\n") + "\n");
console.log(`Wrote drizzle/seed.sql with ${lines.length} statements.`);
