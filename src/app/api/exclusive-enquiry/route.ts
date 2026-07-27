import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { validateExclusiveEnquiry } from "@/lib/exclusive-enquiry";
import { getSettings } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { renderEnquiryEmail } from "@/lib/email-template";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = validateExclusiveEnquiry(body);
  if (!result.valid) {
    return NextResponse.json({ error: "Please check the highlighted fields", fields: result.errors }, { status: 400 });
  }

  const { arriving, nights, guests, occasion, name, email, phone, notes } = result.data;

  const settings = await getSettings();
  const ownerEmail = settings.email || "stay@rosarynest.com";
  const fromDomain = new URL(SITE_URL).hostname;

  const { html, text } = renderEnquiryEmail({
    heading: "New exclusive-use enquiry",
    intro: `${name} asked about taking over the whole property.`,
    rows: [
      { label: "Name", value: name },
      { label: "Email", value: email || "" },
      { label: "Phone", value: phone },
      { label: "Arriving", value: arriving },
      { label: "Nights", value: String(nights) },
      { label: "Guests", value: String(guests) },
      { label: "Occasion", value: occasion || "" },
    ],
    notesLabel: "Anything we should know",
    notes: notes || "",
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
        reply_to: email || undefined,
        subject: `New exclusive-use enquiry from ${name}`,
        html,
        text,
      }),
    });

    if (!res.ok) throw new Error(`Resend API error: ${res.status} ${await res.text()}`);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send exclusive-enquiry email:", error);
    return NextResponse.json(
      { error: "Could not send your enquiry right now. Please email us directly." },
      { status: 502 }
    );
  }
}
