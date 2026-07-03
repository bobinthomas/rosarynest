import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { posts } from "@/db/schema";
import { requireAdmin } from "@/lib/require-admin";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const db = await getDb();
  const rows = await db.select().from(posts).orderBy(desc(posts.publishedAt));
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = (await request.json()) as Record<string, any>;
  const db = await getDb();
  const [row] = await db
    .insert(posts)
    .values({
      slug: body.slug,
      title: body.title,
      excerpt: body.excerpt ?? null,
      content: body.content,
      category: body.category ?? null,
      author: body.author ?? null,
      featuredImage: body.featuredImage ?? null,
      status: body.status ?? "published",
      publishedAt: body.publishedAt ?? new Date().toISOString().slice(0, 10),
    })
    .returning();

  return NextResponse.json(row, { status: 201 });
}
