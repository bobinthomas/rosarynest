import { NextRequest, NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { getDb } from "@/db";
import { experiences } from "@/db/schema";
import { requireAdmin } from "@/lib/require-admin";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const db = await getDb();
  const rows = await db.select().from(experiences).orderBy(asc(experiences.displayOrder));
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = (await request.json()) as Record<string, any>;
  const db = await getDb();
  const [row] = await db
    .insert(experiences)
    .values({
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
    })
    .returning();

  return NextResponse.json(row, { status: 201 });
}
