import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { experiences } from "@/db/schema";
import { requireAdmin } from "@/lib/require-admin";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const db = await getDb();
  const rows = await db.select().from(experiences).where(eq(experiences.id, Number(id))).limit(1);
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
    .update(experiences)
    .set({
      slug: body.slug,
      title: body.title,
      summary: body.summary ?? null,
      content: body.content,
      duration: body.duration ?? null,
      cost: body.cost ?? null,
      included: body.included ?? [],
      images: body.images ?? [],
      displayOrder: body.displayOrder ?? 0,
      status: body.status ?? "published",
      updatedAt: new Date().toISOString(),
    })
    .where(eq(experiences.id, Number(id)))
    .returning();

  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(row);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const db = await getDb();
  await db.delete(experiences).where(eq(experiences.id, Number(id)));
  return NextResponse.json({ ok: true });
}
