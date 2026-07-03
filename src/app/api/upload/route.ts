import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { requireAdmin } from "@/lib/require-admin";

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "")}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { env } = await getCloudflareContext({ async: true });
  if (env.MEDIA) {
    // Production: real R2 bucket.
    await env.MEDIA.put(safeName, buffer, { httpMetadata: { contentType: file.type } });
    return NextResponse.json({ url: `/media/${safeName}` }, { status: 201 });
  }

  // Local dev fallback: write straight into /public/uploads so it's servable immediately.
  // Not available once deployed to Cloudflare — configure R2 for that (see wrangler.jsonc).
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  await writeFile(path.join(uploadsDir, safeName), buffer);
  return NextResponse.json({ url: `/uploads/${safeName}` }, { status: 201 });
}
