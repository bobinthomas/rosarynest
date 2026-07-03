import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Serves files uploaded to the R2 bucket (see /api/upload) back out at
// /media/<key>. Public — these are the same images/videos guests see on
// the site, not admin-only assets.
export async function GET(_request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const key = path.join("/");

  const { env } = await getCloudflareContext({ async: true });
  if (!env.MEDIA) {
    return NextResponse.json({ error: "Media storage not configured" }, { status: 404 });
  }

  const object = await env.MEDIA.get(key);
  if (!object) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return new NextResponse(object.body as ReadableStream, {
    headers: {
      "Content-Type": object.httpMetadata?.contentType ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
      "ETag": object.httpEtag,
    },
  });
}
