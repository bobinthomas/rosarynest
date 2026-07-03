import { NextRequest, NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { getDb } from "@/db";
import { cottages } from "@/db/schema";
import { requireAdmin } from "@/lib/require-admin";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const db = await getDb();
  const rows = await db.select().from(cottages).orderBy(asc(cottages.displayOrder));
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = (await request.json()) as Record<string, any>;
  const db = await getDb();
  const [row] = await db
    .insert(cottages)
    .values({
      slug: body.slug,
      name: body.name,
      tagline: body.tagline ?? null,
      description: body.description,
      capacitySummary: body.capacitySummary ?? null,
      areaSqm: body.areaSqm ?? null,
      amenities: body.amenities ?? [],
      images: body.images ?? [],
      displayOrder: body.displayOrder ?? 0,
      status: body.status ?? "published",
    })
    .returning();

  return NextResponse.json(row, { status: 201 });
}
