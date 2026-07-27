import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getSettings } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { renderEnquiryEmail } from "@/lib/email-template";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Record<string, string | undefined>;
  const { name, email, phone, topic, message } = body ?? {};

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
  }

  const settings = await getSettings();
  const ownerEmail = settings.email || "stay@rosarynest.com";
  // The "from" address must be on a domain verified with Resend, which won't
  // match the recipient's domain if it's a personal inbox (e.g. Gmail) — so
  // it's always the site's own domain, independent of where the
  // notification is actually delivered.
  const fromDomain = new URL(SITE_URL).hostname;

  const { html, text } = renderEnquiryEmail({
    heading: "New enquiry from the website",
    intro: `${name} sent a message through the contact form.`,
    rows: [
      { label: "Name", value: name },
      { label: "Email", value: email },
      { label: "Phone", value: phone || "" },
      { label: "Topic", value: topic || "" },
    ],
    notesLabel: "Message",
    notes: message,
  });

  try {
    const { env } = await getCloudflareContext({ async: true });
    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY is not set in this environment");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: ownerEmail,
        from: `RosaryNest Website <notifications@${fromDomain}>`,
        reply_to: email,
        subject: `New enquiry from ${name}`,
        html,
        text,
      }),
    });

    if (!res.ok) throw new Error(`Resend API error: ${res.status} ${await res.text()}`);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { error: "Could not send your message right now. Please email us directly." },
      { status: 502 }
    );
  }
}
