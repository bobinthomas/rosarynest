import { NextRequest, NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { getDb } from "@/db";
import { faqs } from "@/db/schema";
import { requireAdmin } from "@/lib/require-admin";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const db = await getDb();
  const rows = await db.select().from(faqs).orderBy(asc(faqs.category), asc(faqs.displayOrder));
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = (await request.json()) as Record<string, any>;
  const db = await getDb();
  const [row] = await db
    .insert(faqs)
    .values({
      question: body.question,
      answer: body.answer,
      category: body.category ?? "General",
      displayOrder: body.displayOrder ?? 0,
    })
    .returning();

  return NextResponse.json(row, { status: 201 });
}
