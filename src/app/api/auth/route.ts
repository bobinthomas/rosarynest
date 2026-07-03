import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials, setSessionCookie, clearSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { username, password } = (await request.json()) as { username?: string; password?: string };

  if (typeof username !== "string" || typeof password !== "string" || !verifyCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  await setSessionCookie(username);
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
