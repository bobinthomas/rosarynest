import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const settings = sqliteTable("settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
});

export const cottages = sqliteTable("cottages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline"),
  description: text("description").notNull(),
  capacitySummary: text("capacity_summary"),
  areaSqm: integer("area_sqm"),
  amenities: text("amenities", { mode: "json" }).$type<string[]>().notNull().default(sql`'[]'`),
  nightlyRate: integer("nightly_rate"),
  images: text("images", { mode: "json" }).$type<string[]>().notNull().default(sql`'[]'`),
  videoYoutubeUrl: text("video_youtube_url"),
  videoPosterUrl: text("video_poster_url"),
  videoCaption: text("video_caption"),
  displayOrder: integer("display_order").notNull().default(0),
  status: text("status").notNull().default("published"),
  createdAt: text("created_at").notNull().default(sql`(current_timestamp)`),
  updatedAt: text("updated_at").notNull().default(sql`(current_timestamp)`),
});

export const experiences = sqliteTable("experiences", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary"),
  content: text("content").notNull(),
  duration: text("duration"),
  cost: text("cost"),
  included: text("included", { mode: "json" }).$type<string[]>().notNull().default(sql`'[]'`),
  images: text("images", { mode: "json" }).$type<string[]>().notNull().default(sql`'[]'`),
  displayOrder: integer("display_order").notNull().default(0),
  status: text("status").notNull().default("published"),
  createdAt: text("created_at").notNull().default(sql`(current_timestamp)`),
  updatedAt: text("updated_at").notNull().default(sql`(current_timestamp)`),
});

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: text("category"),
  author: text("author"),
  featuredImage: text("featured_image"),
  status: text("status").notNull().default("published"),
  publishedAt: text("published_at").notNull().default(sql`(current_timestamp)`),
  createdAt: text("created_at").notNull().default(sql`(current_timestamp)`),
  updatedAt: text("updated_at").notNull().default(sql`(current_timestamp)`),
});

export const faqs = sqliteTable("faqs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category").notNull().default("General"),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`(current_timestamp)`),
});

export const galleryItems = sqliteTable("gallery_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  category: text("category").notNull().default("land"),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`(current_timestamp)`),
});
