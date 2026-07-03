import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { faqs } from "@/db/schema";
import { requireAdmin } from "@/lib/require-admin";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const body = (await request.json()) as Record<string, any>;
  const db = await getDb();
  const [row] = await db
    .update(faqs)
    .set({
      question: body.question,
      answer: body.answer,
      category: body.category ?? "General",
      displayOrder: body.displayOrder ?? 0,
    })
    .where(eq(faqs.id, Number(id)))
    .returning();

  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(row);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const db = await getDb();
  await db.delete(faqs).where(eq(faqs.id, Number(id)));
  return NextResponse.json({ ok: true });
}
