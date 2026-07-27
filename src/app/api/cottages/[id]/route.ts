import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { cottages } from "@/db/schema";
import { requireAdmin } from "@/lib/require-admin";
import { extractYouTubeId } from "@/lib/youtube";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const db = await getDb();
  const rows = await db.select().from(cottages).where(eq(cottages.id, Number(id))).limit(1);
  if (!rows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(rows[0]);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const body = (await request.json()) as Record<string, any>;

  if (body.videoYoutubeUrl && !extractYouTubeId(body.videoYoutubeUrl)) {
    return NextResponse.json({ error: "Enter a valid YouTube link." }, { status: 400 });
  }

  const db = await getDb();
  const [row] = await db
    .update(cottages)
    .set({
      slug: body.slug,
      name: body.name,
      tagline: body.tagline ?? null,
      description: body.description,
      capacitySummary: body.capacitySummary ?? null,
      areaSqm: body.areaSqm ?? null,
      nightlyRate: body.nightlyRate ?? null,
      amenities: body.amenities ?? [],
      images: body.images ?? [],
      videoYoutubeUrl: body.videoYoutubeUrl || null,
      videoPosterUrl: body.videoPosterUrl || null,
      videoCaption: body.videoCaption || null,
      displayOrder: body.displayOrder ?? 0,
      status: body.status ?? "published",
      updatedAt: new Date().toISOString(),
    })
    .where(eq(cottages.id, Number(id)))
    .returning();

  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(row);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const db = await getDb();
  await db.delete(cottages).where(eq(cottages.id, Number(id)));
  return NextResponse.json({ ok: true });
}
