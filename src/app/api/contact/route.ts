import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getSettings } from "@/lib/content";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Record<string, string | undefined>;
  const { name, email, phone, topic, message } = body ?? {};

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
  }

  const settings = await getSettings();
  const ownerEmail = settings.email || "stay@rosarynest.in";
  const fromDomain = ownerEmail.split("@")[1] ?? "rosarynest.in";

  const html = `
    <h2>New enquiry from the website</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>
    <p><strong>Topic:</strong> ${escapeHtml(topic || "—")}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;
  const text = `New enquiry from the website\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}\nTopic: ${topic || "—"}\n\nMessage:\n${message}`;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env.EMAIL) throw new Error("EMAIL binding not available in this environment");

    await env.EMAIL.send({
      to: ownerEmail,
      from: { email: `notifications@${fromDomain}`, name: "RosaryNest Website" },
      replyTo: email,
      subject: `New enquiry from ${name}`,
      html,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { error: "Could not send your message right now. Please email us directly." },
      { status: 502 }
    );
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
