import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Terms — RosaryNest",
  description:
    "Booking terms for RosaryNest in Munnar — check-in and check-out times, in plain English.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero kicker="Legal" title="Terms" emphasis="of stay." />
      <div className="post-body" style={{ paddingBottom: 120 }} data-reveal-group>
        <p data-reveal="body" style={{ "--reveal-i": 0 } as React.CSSProperties}>
          Write to us at stay@rosarynest.com and we&#39;ll walk you through booking and cancellation.
        </p>
        <p data-reveal="fade" style={{ "--reveal-i": 1 } as React.CSSProperties}>
          Check-in is from 2 pm, check-out by 11 am. Rates are per cottage, per night, and include
          breakfast. We reserve the right to decline a booking at our discretion, and will always
          tell you honestly why.
        </p>
      </div>
    </>
  );
}
