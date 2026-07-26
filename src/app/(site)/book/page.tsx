import { getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Reserve — RosaryNest",
  description:
    "Check availability and book directly at RosaryNest in Munnar. Direct bookings include welcome drinks and our best rate, with no agent commission.",
  path: "/book",
});

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [params, settings] = await Promise.all([searchParams, getSettings()]);
  const bookingEngineUrl = process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL;

  const query = new URLSearchParams();
  for (const key of ["arrival", "departure", "guests", "cottage"]) {
    const value = params[key];
    if (typeof value === "string" && value) query.set(key, value);
  }
  const iframeSrc = bookingEngineUrl
    ? `${bookingEngineUrl}${bookingEngineUrl.includes("?") ? "&" : "?"}${query.toString()}`
    : null;

  return (
    <>
      <section className="compact-hero">
        <div className="kicker" data-reveal="eyebrow">Reserve</div>
        <h1 data-reveal="heading">Check availability <em>and book.</em></h1>
        <p className="subhead" data-reveal="body">Direct bookings include welcome drinks and our best rate.</p>
      </section>

      <section className="booking-frame">
        <div className="iframe-shell" data-reveal="fade">
          <span className="iframe-label">Reservation system · powered by Stayflexi</span>
          {iframeSrc ? (
            <iframe
              src={iframeSrc}
              title="RosaryNest booking engine"
              style={{ width: "100%", minHeight: 640, border: 0 }}
            />
          ) : (
            <div style={{ padding: 48, textAlign: "center", color: "var(--mute)", fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.08em" }}>
              Booking engine not yet configured. Set NEXT_PUBLIC_BOOKING_ENGINE_URL once your Stayflexi
              property is set up — arrival, departure, guests, and cottage are already passed through
              as query parameters ({query.toString() || "none supplied"}).
            </div>
          )}
        </div>
      </section>

      <section className="supporting" data-reveal-group>
        <div className="sup-col" style={{ "--reveal-i": 0 } as React.CSSProperties}>
          <h4 data-reveal="heading">i. Why book direct</h4>
          <div className="title" data-reveal="eyebrow">A small <em>and quiet bonus.</em></div>
          <p data-reveal="body">
            Direct bookings come with our best rate, a welcome drink in your cottage on arrival, and
            a room upgrade whenever the property allows it. We never pay an agent commission we
            don&#39;t first offer to you.
          </p>
        </div>
        <div className="sup-col" style={{ "--reveal-i": 1 } as React.CSSProperties}>
          <h4 data-reveal="heading">ii. Need help booking?</h4>
          <div className="title" data-reveal="eyebrow">Talk to <em>a person here.</em></div>
          <p data-reveal="body">
            Some bookings — group stays, special dates, dietary or accessibility needs — work better
            as a conversation. We&#39;re around.
          </p>
          <p className="channel"><a href={`tel:${settings.phone}`}>{settings.phone}</a></p>
          <p className="channel"><a href={`mailto:${settings.email}`}>{settings.email}</a></p>
        </div>
        <div className="sup-col" style={{ "--reveal-i": 2 } as React.CSSProperties}>
          <h4 data-reveal="heading">iii. Cancellation, briefly</h4>
          <div className="title" data-reveal="eyebrow">Plain English, <em>no fine print.</em></div>
          <p data-reveal="body">
            Write to us at <a href="mailto:stay@rosarynest.in">stay@rosarynest.in</a> and we&#39;ll walk
            you through booking and cancellation.
          </p>
        </div>
      </section>

      <section className="trust">
        <div className="label" data-reveal="eyebrow">Secure payments via</div>
        <div className="logos" data-reveal="fade">
          <span>Razorpay</span>
          <span>·</span>
          <span>Visa</span>
          <span>·</span>
          <span>Mastercard</span>
          <span>·</span>
          <span>UPI</span>
        </div>
        <div className="reassure" data-reveal="fade">Your details are encrypted at every step, and never stored on our servers.</div>
      </section>
    </>
  );
}
