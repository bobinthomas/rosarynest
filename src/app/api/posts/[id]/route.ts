import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { posts } from "@/db/schema";
import { requireAdmin } from "@/lib/require-admin";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const db = await getDb();
  const rows = await db.select().from(posts).where(eq(posts.id, Number(id))).limit(1);
  if (!rows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(rows[0]);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const body = (await request.json()) as Record<string, any>;
  const db = await getDb();
  const [row] = await db
    .update(posts)
    .set({
      slug: body.slug,
      title: body.title,
      excerpt: body.excerpt ?? null,
      content: body.content,
      category: body.category ?? null,
      author: body.author ?? null,
      featuredImage: body.featuredImage ?? null,
      status: body.status ?? "published",
      publishedAt: body.publishedAt,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(posts.id, Number(id)))
    .returning();

  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(row);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const db = await getDb();
  await db.delete(posts).where(eq(posts.id, Number(id)));
  return NextResponse.json({ ok: true });
}
