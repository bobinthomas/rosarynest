import { NextRequest, NextResponse } from "next/server";
import { validateExclusiveEnquiry } from "@/lib/exclusive-enquiry";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = validateExclusiveEnquiry(body);
  if (!result.valid) {
    return NextResponse.json({ error: "Please check the highlighted fields", fields: result.errors }, { status: 400 });
  }

  console.log("Exclusive-use enquiry received:", result.data);

  // TODO: send this enquiry to email/storage (e.g. via the EMAIL binding used
  // by /api/contact, or a D1 table) once that integration is decided. For now
  // it's only logged above so the form has a working, validated endpoint.

  return NextResponse.json({ ok: true });
}
